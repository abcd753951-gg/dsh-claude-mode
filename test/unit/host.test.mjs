import test from 'node:test'
import assert from 'node:assert/strict'
import { Readable } from 'node:stream'

import {
  AI_PROMPT_MAX_TOKENS,
  AI_PROMPT_MAX_TOKENS_CAP,
  apply,
  lowestReasoningEffort,
  mapAiFailureReason,
  nextPromptBudget,
  promptCacheKey,
  resolvePromptSelection,
} from '../../index.js'

/* The suggestion route is exercised with a fake `llm` service: no network. */

const ZH_PROMPT = '继续当前任务。请先确认目标、范围和验收标准，再列出下一步的具体动作并执行；完成后运行相关验证，汇报结果、风险和仍待确认的问题。'
const BODY = {
  locale: 'zh-CN',
  context: {
    sessionTitle: '金融数据插件',
    lastUserPrompt: '继续优化实时行情',
    assistantText: '已完成第一阶段，下一步：把高频轮询改成低频聚合。',
    localPrompt: '继续当前任务。先确认目标、范围和验收标准。',
  },
}
const LOW_HIGH = { reasoning: { efforts: [{ id: 'low', name: 'Low' }, { id: 'high', name: 'High' }] } }

function textChunks(text) {
  return [
    { type: 'text-delta', index: 0, text },
    { type: 'usage', usage: { inputTokens: 10, outputTokens: 20 } },
    { type: 'finish', reason: { kind: 'stop' } },
  ]
}

function createHarness(options = {}) {
  const state = { route: null, calls: [], prepared: [] }
  const defaultSelection = options.defaultSelection === undefined
    ? { provider: 'fallback', model: 'fallback-model' }
    : options.defaultSelection
  const modelInfo = options.modelInfo || {}
  const streamFor = options.stream || (() => textChunks(options.text || ZH_PROMPT))
  const record = function (callOptions) {
    const index = state.calls.length
    state.calls.push(callOptions)
    const chunks = streamFor(callOptions, index)
    return (async function* () {
      for (const chunk of chunks) yield chunk
    })()
  }
  const llm = {}
  if (options.legacy === true) {
    llm.stream = record
  } else {
    llm.prepareCall = async function (config, _signal, configure) {
      if (options.prepareError) {
        const error = options.prepareError(config, state.prepared.length)
        if (error) throw error
      }
      const controls = configure ? configure(config, modelInfo) : config
      const resolved = Object.freeze({ ...config, ...controls, provider: config.provider, model: config.model })
      state.prepared.push(resolved)
      return {
        config: resolved,
        stream(callOptions) {
          // Mirror the Host contract: prepared.stream() rejects a request whose
          // call-config fields drifted from the resolved prepared config.
          const drifted = ['provider', 'model', 'reasoningEffort', 'temperature', 'maxTokens']
            .some((key) => callOptions[key] !== resolved[key])
          if (drifted) throw new Error('prepared LLM call config changed before adapter dispatch')
          return record(callOptions)
        },
      }
    }
  }
  const webServer = {
    register(route) {
      state.route = route
      return () => {}
    },
  }
  const child = {
    webServer,
    llm,
    agentDefaultModel: { currentSelection: () => defaultSelection },
    logger: { warn() {} },
    effect(fn) { return fn() },
    get(name) { return name === 'agents' ? options.agents || null : undefined },
  }
  apply({ inject(_names, callback) { callback(child) } })
  return { state, handler: state.route && state.route.handler }
}

function callRoute(handler, body, headers = {}, method = 'POST') {
  const text = typeof body === 'string' ? body : JSON.stringify(body || {})
  const req = Readable.from(text ? [Buffer.from(text)] : [])
  req.method = method
  req.headers = Object.assign({ 'x-dsh-claude-mode': '1' }, headers)
  req.destroy = () => {}
  const res = {
    status: 0,
    body: '',
    writeHead(status) { this.status = status },
    end(body) { this.body = String(body == null ? '' : body) },
  }
  return Promise.resolve(handler(req, res)).then(() => res)
}

function payloadOf(response) {
  return JSON.parse(response.body)
}

/* ------------------------------------------------------------------ */
/* Pure helpers                                                        */
/* ------------------------------------------------------------------ */

test('lowestReasoningEffort pins the first advertised effort', () => {
  assert.equal(lowestReasoningEffort(LOW_HIGH), 'low')
  assert.equal(lowestReasoningEffort({ reasoning: { efforts: [] } }), '')
  assert.equal(lowestReasoningEffort({}), '')
  assert.equal(lowestReasoningEffort(null), '')
})

test('nextPromptBudget doubles once and respects the cap', () => {
  assert.equal(AI_PROMPT_MAX_TOKENS, 1600)
  assert.equal(nextPromptBudget(AI_PROMPT_MAX_TOKENS), 3200)
  assert.equal(nextPromptBudget(1500), 3000)
  assert.equal(nextPromptBudget(3000), AI_PROMPT_MAX_TOKENS_CAP)
  assert.equal(nextPromptBudget(AI_PROMPT_MAX_TOKENS_CAP), AI_PROMPT_MAX_TOKENS_CAP)
  assert.equal(nextPromptBudget(undefined), 3200)
})

test('mapAiFailureReason turns routing failures into actionable Chinese', () => {
  assert.match(
    mapAiFailureReason({ code: 'UNKNOWN_MODEL', message: 'pi-ai provider "x" has no configured model "y"' }),
    /cordis\.patch\.yml 的 llm-pi-ai models\[\]/,
  )
  assert.match(
    mapAiFailureReason({ code: 'NO_ADAPTER', message: 'no adapter registered for provider "x"' }),
    /llm-pi-ai providers/,
  )
  assert.match(
    mapAiFailureReason({ code: 'UNSUPPORTED_REASONING_EFFORT', message: 'does not support reasoning effort "high"' }),
    /推理强度/,
  )
  assert.equal(mapAiFailureReason({ message: 'network unavailable' }), 'network unavailable')
  assert.equal(mapAiFailureReason('boom'), 'boom')
})

test('prompt selection prefers the live Session model over the deployment default', () => {
  const webCtx = {
    get: () => ({
      get: () => ({ model: { current: () => ({ provider: 'live', model: 'live-model' }) } }),
    }),
  }
  const defaultModel = { currentSelection: () => ({ provider: 'default', model: 'default-model' }) }
  assert.deepEqual(resolvePromptSelection(webCtx, defaultModel, 's1'), { provider: 'live', model: 'live-model' })
  assert.deepEqual(resolvePromptSelection(webCtx, defaultModel, ''), { provider: 'default', model: 'default-model' })
  const noAgent = { get: () => ({ get: () => undefined }) }
  assert.deepEqual(resolvePromptSelection(noAgent, defaultModel, 's1'), { provider: 'default', model: 'default-model' })
  const brokenRegistry = { get: () => { throw new Error('boom') } }
  assert.deepEqual(resolvePromptSelection(brokenRegistry, defaultModel, 's1'), { provider: 'default', model: 'default-model' })
  const noCurrent = { get: () => ({ get: () => ({ model: { current: () => undefined } }) }) }
  assert.deepEqual(resolvePromptSelection(noCurrent, defaultModel, 's1'), { provider: 'default', model: 'default-model' })
  const emptyDefault = { currentSelection: () => ({ provider: '', model: '' }) }
  assert.equal(resolvePromptSelection(webCtx, emptyDefault, ''), null)
})

test('prompt cache identity includes the Session id', () => {
  const selection = { provider: 'p', model: 'm' }
  const a = { sessionId: 'session-a', lastUserPrompt: '继续' }
  const b = { sessionId: 'session-b', lastUserPrompt: '继续' }
  assert.equal(promptCacheKey(a, selection), promptCacheKey({ ...a }, { ...selection }))
  assert.notEqual(promptCacheKey(a, selection), promptCacheKey(b, selection))
})

/* ------------------------------------------------------------------ */
/* Route behavior                                                      */
/* ------------------------------------------------------------------ */

test('AI route follows the live Session model and pins the lowest effort', async () => {
  const harness = createHarness({
    agents: { get: (id) => (id === 's1' ? { model: { current: () => ({ provider: 'sess-provider', model: 'sess-model' }) } } : undefined) },
    modelInfo: LOW_HIGH,
  })
  const response = await callRoute(harness.handler, { sessionId: 's1', ...BODY })
  const payload = payloadOf(response)
  assert.equal(payload.ok, true)
  assert.equal(payload.prompt, ZH_PROMPT)
  assert.equal(payload.model, 'sess-model')
  assert.equal(payload.provider, 'sess-provider')
  assert.equal(harness.state.calls.length, 1)
  const call = harness.state.calls[0]
  assert.equal(call.provider, 'sess-provider')
  assert.equal(call.model, 'sess-model')
  assert.equal(call.reasoningEffort, 'low')
  assert.equal(call.temperature, 0.4)
  assert.equal(call.maxTokens, AI_PROMPT_MAX_TOKENS)
  assert.equal(call.purpose, 'claude-mode-prompt-suggestion')
  assert.equal(harness.state.prepared[0].reasoningEffort, 'low')
})

test('AI route falls back to the deployment default without a live Session', async () => {
  const harness = createHarness()
  const response = await callRoute(harness.handler, { ...BODY, sessionId: 'unknown-session' })
  const payload = payloadOf(response)
  assert.equal(payload.ok, true)
  assert.equal(harness.state.calls[0].provider, 'fallback')
  assert.equal(harness.state.calls[0].reasoningEffort, undefined)
})

test('AI route keeps working on a Host without prepareCall', async () => {
  const harness = createHarness({ legacy: true })
  const payload = payloadOf(await callRoute(harness.handler, BODY))
  assert.equal(payload.ok, true)
  assert.equal(payload.prompt, ZH_PROMPT)
  assert.equal(harness.state.calls.length, 1)
  assert.equal(harness.state.calls[0].maxTokens, AI_PROMPT_MAX_TOKENS)
  assert.equal(harness.state.calls[0].reasoningEffort, undefined)
})

test('AI route retries once with a doubled budget when thinking consumes it', async () => {
  const harness = createHarness({
    modelInfo: LOW_HIGH,
    stream: (_call, index) => (index === 0 ? [{ type: 'finish', reason: { kind: 'max-tokens' } }] : textChunks(ZH_PROMPT)),
  })
  const payload = payloadOf(await callRoute(harness.handler, BODY))
  assert.equal(payload.prompt, ZH_PROMPT)
  assert.equal(harness.state.calls.length, 2)
  assert.equal(harness.state.calls[0].maxTokens, AI_PROMPT_MAX_TOKENS)
  assert.equal(harness.state.calls[1].maxTokens, 3200)
  assert.equal(harness.state.calls[1].reasoningEffort, 'low')
})

test('AI route falls back when the retry still has no visible text', async () => {
  const harness = createHarness({ stream: () => [{ type: 'finish', reason: { kind: 'max-tokens' } }] })
  const payload = payloadOf(await callRoute(harness.handler, BODY))
  assert.equal(payload.prompt, null)
  assert.equal(payload.reason, 'reasoning-consumed-output')
  assert.equal(harness.state.calls.length, 2)
  assert.equal(harness.state.calls[1].maxTokens, 3200)
})

test('AI route drops temperature once when the stream rejects it', async () => {
  const harness = createHarness({
    stream: (_call, index) => (index === 0
      ? [{ type: 'finish', reason: { kind: 'error', failure: { message: 'temperature is not supported by this model', code: 'INVALID_ARGS' } } }]
      : textChunks(ZH_PROMPT)),
  })
  const payload = payloadOf(await callRoute(harness.handler, BODY))
  assert.equal(payload.prompt, ZH_PROMPT)
  assert.equal(harness.state.calls.length, 2)
  assert.equal(harness.state.calls[0].temperature, 0.4)
  assert.equal(harness.state.calls[1].temperature, undefined)
  assert.equal(harness.state.prepared[1].temperature, undefined)
})

test('AI route drops temperature when preparation rejects it', async () => {
  const harness = createHarness({
    prepareError: (config) => (config.temperature === undefined ? null : new Error('unsupported parameter: temperature')),
  })
  const payload = payloadOf(await callRoute(harness.handler, BODY))
  assert.equal(payload.prompt, ZH_PROMPT)
  assert.equal(harness.state.calls.length, 1)
  assert.equal(harness.state.prepared[0].temperature, undefined)
})

test('AI route maps routing errors and passes other failures through', async () => {
  const cases = [
    ['UNKNOWN_MODEL', /cordis\.patch\.yml/],
    ['NO_ADAPTER', /llm-pi-ai providers/],
    ['UNSUPPORTED_REASONING_EFFORT', /推理强度/],
  ]
  for (const [code, pattern] of cases) {
    const harness = createHarness({
      prepareError: () => Object.assign(new Error('backend failure'), { code }),
    })
    const payload = payloadOf(await callRoute(harness.handler, BODY))
    assert.equal(payload.ok, false)
    assert.match(payload.reason, pattern)
  }
  const plain = createHarness({ prepareError: () => new Error('provider unavailable') })
  const payload = payloadOf(await callRoute(plain.handler, BODY))
  assert.equal(payload.ok, false)
  assert.equal(payload.reason, 'provider unavailable')
})

test('AI route degrades to no-model without calling the model', async () => {
  const harness = createHarness({ defaultSelection: null })
  const payload = payloadOf(await callRoute(harness.handler, BODY))
  assert.equal(payload.prompt, null)
  assert.equal(payload.reason, 'no-model')
  assert.equal(harness.state.calls.length, 0)
})
