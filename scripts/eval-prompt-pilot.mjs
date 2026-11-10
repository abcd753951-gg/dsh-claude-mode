#!/usr/bin/env node
/**
 * Prompt Pilot evaluation.
 *
 * Three surfaces, no live model:
 * 1. The deterministic local draft: content shape, silence rules, caps, latency.
 * 2. The Host AI route under a fake `llm` service: auth, body bounds, context
 *    clipping, output cleaning, cache, rate limit, and failure fallbacks.
 * 3. Static audits: the local generator has no network binding; the only fetch
 *    is the same-origin AI route.
 *
 * Usage: node scripts/eval-prompt-pilot.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { Readable } from 'node:stream'
import { fileURLToPath } from 'node:url'
import {
  PROMPT_PILOT_BUDGET,
  buildPromptDraft,
  normalizePilotStats,
  promptContextFromChat,
  recordPilotEvent,
  suggestionSuppressed,
} from '../src/client/02-state.js'
import { apply as applyHost } from '../index.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const localeZh = 'zh-CN'
const nextStep = '结论先放在这里。\n\n下一步：把这两条不够稳定的实时断言改成可跳过；PCR 再换供应商。'
const longAssistant = '背景资料。'.repeat(1200) + nextStep

const cases = [
  { id: 'explicit-zh-next-step', input: { assistantText: nextStep, lastUserPrompt: '请继续优化', sessionTitle: '金融数据插件' }, expect: { kind: 'next-step', includes: '把这两条' } },
  { id: 'bold-next-step', input: { assistantText: '**下一步：** 补齐发布文档。' }, expect: { kind: 'next-step', includes: '补齐发布文档' } },
  { id: 'list-next-step', input: { assistantText: '- 下一步：跑一遍端到端测试' }, expect: { kind: 'next-step', includes: '跑一遍端到端测试' } },
  { id: 'heading-next-step', input: { assistantText: '### 下一步\n- 把 README 的安装步骤补全' }, expect: { kind: 'next-step', includes: '把 README' } },
  { id: 'english-next-step', input: { assistantText: 'Next step: run the failing test', locale: 'en' }, expect: { kind: 'next-step', includes: 'run the failing test' } },
  { id: 'error-zh-diagnostic', input: { assistantText: '运行时报错：TypeError: x is undefined' }, expect: { kind: 'error', includes: '复现' } },
  { id: 'error-en-diagnostic', input: { assistantText: 'The build failed with an error in the parser', locale: 'en' }, expect: { kind: 'error', includes: 'Reproduce' } },
  { id: 'error-with-next-step', input: { assistantText: '报错：TypeError\n下一步：修复登录接口' }, expect: { kind: 'next-step', includes: '修复登录接口' } },
  { id: 'no-error-completed', input: { assistantText: '没有报错，测试全部通过。' }, expect: { kind: 'completed', includes: '提交' } },
  { id: 'question-options', input: { assistantText: '你希望我先改前端还是后端？' }, expect: { kind: 'question', includes: '推荐' } },
  { id: 'question-yes-no', input: { assistantText: '需要我继续跑一遍全量测试吗？' }, expect: { kind: 'question', includes: '验证' } },
  { id: 'question-before-next-step', input: { assistantText: '你希望我继续吗？\n\n下一步：补齐发布文档。' }, expect: { kind: 'next-step', includes: '补齐发布文档' } },
  { id: 'completed-without-error', input: { assistantText: '已完成修复，测试全部通过。' }, expect: { kind: 'completed', includes: '提交' } },
  { id: 'plan-signal', input: { assistantText: '建议按这个计划推进：先补测试，再更新文档。' }, expect: { kind: 'plan', includes: '第一步' } },
  { id: 'changed-files', input: { assistantText: '我修改了 src/a.js 和 src/b.js，diff 如下。' }, expect: { kind: 'review-changes', includes: '改动' } },
  { id: 'review-intent', input: { lastUserPrompt: '请审查这个仓库的代码' }, expect: { kind: 'follow-up-review', includes: '审查' } },
  { id: 'test-intent', input: { lastUserPrompt: '给这个模块补测试' }, expect: { kind: 'follow-up-tests', includes: '测试' } },
  { id: 'deploy-intent', input: { lastUserPrompt: '准备发布到生产环境' }, expect: { kind: 'follow-up-deploy', includes: '发布' } },
  { id: 'session-title-only', input: { sessionTitle: '金融终端重构' }, expect: { kind: 'session-title', includes: '金融终端重构' } },
  { id: 'blank-starter', input: { sessionId: 'blank-1' }, expect: { kind: 'starter', includes: '目标' } },
  {
    id: 'stale-assistant',
    input: { assistantText: '下一步：按旧回复继续', assistantFresh: false, lastUserPrompt: '请换一个方向审查代码' },
    expect: { kind: 'follow-up-review', notIncludes: '按旧回复' },
  },
  { id: 'running', input: { assistantText: nextStep, running: true }, expect: { kind: null } },
  { id: 'recommendation-lead', input: { assistantText: '下一步：我建议：把 PCR 改成基于认购认沽成交额的本地聚合；随后观察。' }, expect: { kind: 'next-step', includes: 'PCR' } },
  { id: 'tool-error-fresh-diagnostic', input: { toolText: 'Error: cannot read property foo', toolFresh: true, locale: 'en' }, expect: { kind: 'error', includes: 'Reproduce' } },
  { id: 'stale-tool-error', input: { toolText: 'Error: old failure', toolFresh: false, lastUserPrompt: '请审查代码' }, expect: { kind: 'follow-up-review' } },
  { id: 'fenced-next-step-is-ignored', input: { assistantText: '```\n下一步：不要执行这段\n```\n回答结束。' }, expect: { kind: 'assistant-followup', notIncludes: '不要执行' } },
  {
    id: 'does-not-repeat-last-prompt',
    input: { lastUserPrompt: '把发现的问题按严重程度排序，并直接修复高优先级项' },
    expect: { kind: 'follow-up-review', notEquals: '把发现的问题按严重程度排序，并直接修复高优先级项' },
  },
  {
    id: 'long-context-budget',
    input: {
      assistantText: longAssistant,
      toolText: '日志'.repeat(5000),
      lastUserPrompt: '继续'.repeat(1000),
      sessionTitle: '长上下文'.repeat(100),
    },
    expect: { kind: 'next-step', includes: '把这两条' },
  },
  { id: 'english-starter', input: { locale: 'en' }, expect: { kind: 'starter', includes: 'project structure' } },
  { id: 'english-plan', input: { assistantText: 'Here is the plan and the next steps.', locale: 'en' }, expect: { kind: 'plan', includes: 'plan' } },
]

const results = []
for (const entry of cases) {
  const input = Object.assign({}, entry.input, { locale: entry.locale || entry.input.locale || localeZh })
  const actual = buildPromptDraft(input)
  const expected = entry.expect
  const chinese = /[\u4e00-\u9fff]/.test(entry.input.lastUserPrompt || entry.input.assistantText || '') || input.locale === localeZh
  const checks = []
  if (expected.kind === null) {
    checks.push(['kind', actual === null])
  } else {
    checks.push(['kind', Boolean(actual) && actual.kind === expected.kind])
  }
  if (actual) {
    if (expected.includes) checks.push(['includes', actual.full.includes(expected.includes)])
    if (expected.notIncludes) checks.push(['notIncludes', !actual.full.includes(expected.notIncludes)])
    if (expected.notEquals) checks.push(['notEquals', actual.full !== expected.notEquals])
    checks.push(['notShort', chinese ? Array.from(actual.full).length >= 35 : actual.full.split(/\s+/).length >= 18])
    checks.push(['completeShape', /(验收|验证|范围|目标|风险|结果|acceptance|verification|scope|risk|result)/i.test(actual.full)])
    checks.push(['noAssistantVoice', !/^(?:我建议|我会|你可以|Claude|As an AI|Assistant)/i.test(actual.full)])
    checks.push(['noPlaceholder', !/\[(?:TODO|TARGET|PLACEHOLDER|INSERT)/i.test(actual.full)])
    checks.push(['notQuestionOnly', !/[?？]\s*$/.test(actual.full)])
  }
  results.push({
    id: entry.id,
    expected: expected.kind,
    actual: actual ? actual.kind : null,
    full: actual ? actual.full : '',
    chinese,
    passed: checks.every((check) => check[1]),
  })
}

const passed = results.filter((row) => row.passed).length
const failed = results.length - passed

/* Acceptance must not suppress a suggestion; deleting the draft must re-offer it. */
const acceptedStats = recordPilotEvent(
  recordPilotEvent(normalizePilotStats(null), 'next-step', 'shown', 1000, 'accepted-key'),
  'next-step',
  'accepted',
  1001,
  'accepted-key',
)
const acceptReoffers = suggestionSuppressed(acceptedStats, 'accepted-key', 1002) === false

/* Latency: representative stable context, 5000 local calls. */
const benchInput = {
  assistantText: nextStep,
  toolText: 'tests 61 passed; 1 flaky live-network test',
  lastUserPrompt: '继续优化界面',
  sessionTitle: '金融数据聚合插件开发与全面接入',
  locale: localeZh,
}
for (let index = 0; index < 200; index += 1) buildPromptDraft(benchInput)
const latencies = []
const benchmarkStart = process.hrtime.bigint()
for (let index = 0; index < 5000; index += 1) {
  const one = process.hrtime.bigint()
  buildPromptDraft(benchInput)
  latencies.push(Number(process.hrtime.bigint() - one) / 1e6)
}
const benchmarkMs = Number(process.hrtime.bigint() - benchmarkStart) / 1e6
latencies.sort((left, right) => left - right)
const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0

/* Context cap: huge inputs must not make the local call unbounded. */
const hugeInput = {
  assistantText: '背景。'.repeat(50000) + nextStep,
  toolText: '工具输出。'.repeat(50000),
  lastUserPrompt: '用户输入。'.repeat(50000),
  sessionTitle: '标题'.repeat(5000),
  locale: localeZh,
}
const hugeStart = process.hrtime.bigint()
const hugeResult = buildPromptDraft(hugeInput)
const hugeMs = Number(process.hrtime.bigint() - hugeStart) / 1e6
const hugeOk = Boolean(hugeResult) && hugeResult.full.length <= 700 && hugeMs < 100

/* Freshness through the Chat snapshot, not just a direct flag. */
const snapshotContext = promptContextFromChat({
  legacy: {
    nodes: [
      { kind: 'assistant', blocks: [{ kind: 'text', text: '下一步：按旧回复继续' }] },
      { kind: 'user', content: [{ type: 'text', text: '换一个方向审查' }] },
    ],
  },
})
const freshnessOk = snapshotContext.assistantFresh === false

/* ------------------------------------------------------------------ */
/* Host AI route: fake `llm` service, no network.                      */
/* ------------------------------------------------------------------ */

function createHarness(options = {}) {
  const captured = { route: null, calls: [], disposed: 0 }
  const selection = options.selection || { provider: 'mock', model: 'mock-model' }
  const makeStream = options.stream || function (callOptions) {
    return (async function* () {
      yield { type: 'text-delta', index: 0, text: '继续当前任务。请先确认目标、范围和验收标准，再列出下一步的具体动作并执行；完成后运行相关验证，汇报结果、风险和仍待确认的问题。' }
      yield { type: 'usage', usage: { inputTokens: 20, outputTokens: 30 } }
      yield { type: 'finish', reason: { kind: 'stop' } }
    })()
  }
  const llm = {
    async prepareCall(config) {
      return {
        config,
        stream(callOptions) {
          captured.calls.push(callOptions)
          if (options.throwOnStream) throw new Error(options.throwOnStream)
          return makeStream(callOptions)
        },
      }
    },
  }
  const defaultModel = { currentSelection: () => selection }
  const webServer = {
    register(route) {
      captured.route = route
      return () => { captured.disposed += 1 }
    },
  }
  const child = {
    webServer,
    llm,
    agentDefaultModel: defaultModel,
    logger: { warn() {} },
    effect(fn) { return fn() },
  }
  applyHost({ inject(names, callback) { callback(child) } })
  return { captured, handler: captured.route && captured.route.handler, llm, webServer }
}

function callRoute(handler, body, headers = {}, method = 'POST') {
  const text = typeof body === 'string' ? body : JSON.stringify(body || {})
  const req = Readable.from(text ? [Buffer.from(text)] : [])
  req.method = method
  req.headers = Object.assign({ 'x-dsh-claude-mode': '1' }, headers)
  req.destroy = () => {}
  const res = {
    status: 0,
    headers: null,
    body: '',
    writeHead(status, headers) { this.status = status; this.headers = headers },
    end(body) { this.body = String(body == null ? '' : body) },
  }
  return Promise.resolve(handler(req, res)).then(() => res)
}

const aiChecks = []
function checkAi(name, condition, detail = '') {
  aiChecks.push({ name, pass: Boolean(condition), detail })
}

const gateHarness = createHarness()
const gate = await callRoute(gateHarness.handler, { context: { lastUserPrompt: '继续' } }, { 'x-dsh-claude-mode': '' })
checkAi('reject missing same-origin gate', gate.status === 403, 'status=' + gate.status)

const methodHarness = createHarness()
const method = await callRoute(methodHarness.handler, '', {}, 'GET')
checkAi('reject non-POST', method.status === 405, 'status=' + method.status)

const invalidHarness = createHarness()
const invalid = await callRoute(invalidHarness.handler, '{not json')
checkAi('reject invalid JSON', invalid.status === 400, 'status=' + invalid.status)

const emptyHarness = createHarness()
const empty = await callRoute(emptyHarness.handler, { context: {} })
checkAi('empty context returns no suggestion without a model call', empty.status === 200 && JSON.parse(empty.body).prompt === null && emptyHarness.captured.calls.length === 0)

const okHarness = createHarness()
const okBody = {
  locale: 'zh-CN',
  context: {
    sessionTitle: '金融数据插件',
    lastUserPrompt: '继续优化实时行情',
    assistantText: '已完成第一阶段，下一步：把高频轮询改成低频聚合。',
    toolText: 'tests 61 passed',
    localPrompt: '继续当前任务。先确认目标、范围和验收标准。',
  },
}
const ok = await callRoute(okHarness.handler, okBody)
const okPayload = JSON.parse(ok.body)
const okCall = okHarness.captured.calls[0]
checkAi('valid call returns a prompt', ok.status === 200 && okPayload.ok === true && okPayload.prompt.length > 20)
checkAi('auth gate and route registered', Boolean(okHarness.captured.route) && okHarness.captured.route.path === '/dsh-claude-mode/ai-prompt')
checkAi('bounded output budget', okCall && okCall.maxTokens === 650)
checkAi('no tools on the suggestion call', okCall && okCall.tools === undefined)
checkAi('system instructs a full prompt, not a short phrase', okCall && /完整|目标|验收/.test(okCall.system) && /SKIP/.test(okCall.system))
checkAi('conversation context reaches the model', okCall && /金融数据插件/.test(okCall.messages[0].content[0].text))

const cache = await callRoute(okHarness.handler, okBody)
checkAi('same context reuses the host cache', JSON.parse(cache.body).cached === true && okHarness.captured.calls.length === 1)

const hugeHarness = createHarness()
const hugeAi = await callRoute(hugeHarness.handler, {
  context: {
    assistantText: '很长'.repeat(800),
    lastUserPrompt: '继续'.repeat(800),
    toolText: '日志'.repeat(800),
    localPrompt: '本'.repeat(800),
  },
})
const hugeCall = hugeHarness.captured.calls[0]
checkAi('host clips oversized context before the model call', hugeAi.status === 200 && hugeCall && hugeCall.messages[0].content[0].text.length <= 12000, 'status=' + hugeAi.status)

const cleanHarness = createHarness({
  stream: function () {
    return (async function* () {
      yield { type: 'text-delta', index: 0, text: '```text\n“继续实现当前目标。请先确认改动范围、约束和验收标准，再完成代码与测试；最后运行验证并汇报结果、风险和下一步。”\n```' }
      yield { type: 'finish', reason: { kind: 'stop' } }
    })()
  },
})
const cleaned = JSON.parse((await callRoute(cleanHarness.handler, { context: { lastUserPrompt: '继续' } })).body)
checkAi('strips fences and wrapper quotes', cleaned.prompt && !/```|^“|”$/.test(cleaned.prompt))

const skipHarness = createHarness({
  stream: function () {
    return (async function* () {
      yield { type: 'text-delta', index: 0, text: 'SKIP' }
      yield { type: 'finish', reason: { kind: 'stop' } }
    })()
  },
})
const skipped = JSON.parse((await callRoute(skipHarness.handler, { context: { lastUserPrompt: '继续' } })).body)
checkAi('SKIP becomes no suggestion', skipped.ok === true && skipped.prompt === null)

const shortHarness = createHarness({
  stream: function () {
    return (async function* () {
      yield { type: 'text-delta', index: 0, text: '好，继续' }
      yield { type: 'finish', reason: { kind: 'stop' } }
    })()
  },
})
const shortAi = JSON.parse((await callRoute(shortHarness.handler, { context: { lastUserPrompt: '继续' } })).body)
checkAi('too-short model output falls back instead of replacing the local draft', shortAi.ok === true && shortAi.prompt === null)

const errorHarness = createHarness({ throwOnStream: 'provider unavailable' })
const errored = await callRoute(errorHarness.handler, { context: { lastUserPrompt: '继续' } })
checkAi('model failure returns a clean fallback signal, not a crash', errored.status === 200 && JSON.parse(errored.body).ok === false)

const noModelHarness = createHarness({ selection: { provider: '', model: '' } })
const noModel = await callRoute(noModelHarness.handler, { context: { lastUserPrompt: '继续' } })
checkAi('missing model returns no suggestion without a call', JSON.parse(noModel.body).prompt === null && noModelHarness.captured.calls.length === 0)

const rateHarness = createHarness()
const rate1 = await callRoute(rateHarness.handler, { context: { lastUserPrompt: '第一个上下文' } })
const rate2 = await callRoute(rateHarness.handler, { context: { lastUserPrompt: '第二个上下文' } })
checkAi('rate limit protects immediate distinct calls', rate1.status === 200 && rate2.status === 429)

const aiFailed = aiChecks.filter((item) => !item.pass).length

/* Static audit: local generator has no network; every fetch is a same-origin plugin route. */
const localSource = fs.readFileSync(path.join(root, 'src/client/02-state.js'), 'utf8')
const componentSource = fs.readFileSync(path.join(root, 'src/client/04-components.js'), 'utf8')
const localNetwork = /\b(fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/.test(localSource)
const fetchSites = Array.from(componentSource.matchAll(/\bfetch\s*\(/g)).length
const routeText = /const AI_PROMPT_ROUTE = '\/dsh-claude-mode\/ai-prompt'/.test(componentSource)
const dataRouteText = /const DATA_ROUTE = '\/dsh-claude-mode\/data'/.test(componentSource)
const staticOk = !localNetwork && fetchSites === 2 && routeText && dataRouteText

const qualityChecks = {
  '每条建议都是完整草稿（长度、目标/验收信息）': results.every((row) => !row.actual || row.passed),
  '没有短句回退路径': results.every((row) => !row.actual || (row.chinese ? Array.from(row.full).length >= 35 : row.full.split(/\s+/).length >= 18)),
  '报错时仍给出完整诊断草稿': results.filter((row) => row.expected === 'error').every((row) => row.actual === 'error' && row.full.length >= 40),
  '接受后删除草稿可再次出现（不做 accepted 冷却）': acceptReoffers,
  '上下文预算有硬上限': hugeOk,
  'Chat 新鲜度检查': freshnessOk,
  '本地生成器无网络绑定': !localNetwork,
  '所有 fetch 都指向同源插件路由': fetchSites === 2 && routeText && dataRouteText,
}

const allPass = failed === 0 && aiFailed === 0 && Object.values(qualityChecks).every(Boolean)

const report = [
  '# Prompt Pilot 完整评估',
  '',
  `- 生成时间：${new Date().toISOString()}`,
  `- Node：${process.version}`,
  `- 命令：\`node scripts/eval-prompt-pilot.mjs\``,
  `- 结果：**${allPass ? 'PASS' : 'FAIL'}**`,
  '',
  '## 本地完整草稿用例',
  '',
  '| 用例 | 期望类别 | 实际类别 | 长度 | 结果 | 实际草稿 |',
  '| --- | --- | --- | ---: | --- | --- |',
  ...results.map((row) => `| ${row.id} | ${row.expected || 'null'} | ${row.actual || 'null'} | ${row.chinese ? Array.from(row.full).length + ' 字' : row.full.split(/\s+/).filter(Boolean).length + ' 词'} | ${row.passed ? 'PASS' : 'FAIL'} | ${row.full.replace(/\|/g, '\\|')} |`),
  '',
  `- 通过：${passed}/${results.length}`,
  `- 失败：${failed}`,
  '',
  '## 质量约束',
  '',
  ...Object.entries(qualityChecks).map(([name, ok]) => `- ${name}：${ok ? 'PASS' : 'FAIL'}`),
  '',
  '## 本地性能与预算',
  '',
  `- 5000 次本地草稿生成：${benchmarkMs.toFixed(1)} ms，平均 ${(benchmarkMs / 5000).toFixed(3)} ms，p95 ${p95.toFixed(3)} ms`,
  `- 超长上下文调用：${hugeMs.toFixed(3)} ms，返回长度 ${hugeResult ? hugeResult.full.length : 0}，上限检查：${hugeOk ? 'PASS' : 'FAIL'}`,
  `- 本地上下文硬上限：assistant=${PROMPT_PILOT_BUDGET.assistant} 字符，tool=${PROMPT_PILOT_BUDGET.tool} 字符，lastUser=${PROMPT_PILOT_BUDGET.lastUser} 字符，title=${PROMPT_PILOT_BUDGET.title} 字符`,
  '- 本地草稿：0 模型 token、0 网络调用；只有启用 AI 完善且同上下文缓存未命中时才发一次请求，输出预算 650 tokens。',
  '',
  '## Host AI 路由合约（fake llm，无网络）',
  '',
  '| 检查 | 结果 | 说明 |',
  '| --- | --- | --- |',
  ...aiChecks.map((item) => `| ${item.name} | ${item.pass ? 'PASS' : 'FAIL'} | ${String(item.detail || '').replace(/\|/g, '\\|')} |`),
  '',
  `- 通过：${aiChecks.length - aiFailed}/${aiChecks.length}`,
  '',
  '## 结论',
  '',
  allPass
    ? '本地完整草稿、AI 路由鉴权/缓存/预算/失败回退、接受后重现、上下文上限和静态网络审计全部通过。AI 路径按“同一上下文只调用一次”计费；离线时保留完整的本地草稿。'
    : '存在未通过项，不能视为生产就绪。',
  '',
].join('\n')

fs.writeFileSync(path.join(root, 'docs', 'PROMPT-PILOT-EVAL.md'), report)
console.log(report)
if (!allPass) process.exitCode = 1
