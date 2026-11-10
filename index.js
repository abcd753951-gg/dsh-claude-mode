/**
 * dsh-claude-mode — Host half.
 *
 * The UI lives in the Client half. This Host row adds one same-origin route used
 * by the optional "AI 完善提示词" flow. It reads the current conversation only
 * through the context the browser posts, calls the Host `llm` service with a
 * bounded output budget, and never registers tools, prompts, or background
 * work in the user's Agent.
 */

import { createHash } from 'node:crypto'
import { auditData, formatBytes } from './lib/data-audit.mjs'
import { buildMigrationPlan } from './lib/data-plan.mjs'
import { buildCleanupPlan } from './lib/data-clean.mjs'

/** Stable package / loader row name. */
export const name = 'dsh-claude-mode'

/** A fixed path so a hijacked page cannot redirect the model call elsewhere. */
const AI_ROUTE = '/dsh-claude-mode/ai-prompt'
const DATA_ROUTE = '/dsh-claude-mode/data'
const GATE_HEADER = 'x-dsh-claude-mode'
const MAX_BODY = 32 * 1024
const MAX_DATA_BODY = 64 * 1024
const CACHE_TTL_MS = 10 * 60 * 1000
const DATA_CACHE_TTL_MS = 30 * 1000
const CACHE_MAX = 32
const MAX_PROMPT_CHARS = 1200

/** The Host row stays inert until the web carrier appears. */
export function apply(ctx) {
  if (!ctx || typeof ctx.inject !== 'function') return
  // Data audit/plan are local-only and must work even when no model is
  // configured, so they get their own injection seam.
  ctx.inject(['webServer'], (webCtx) => {
    const webServer = webCtx && webCtx.webServer
    if (!webServer || typeof webServer.register !== 'function') return
    let auditCache = null
    let auditAt = 0
    const getAudit = async function (refresh) {
      const now = Date.now()
      if (!refresh && auditCache && now - auditAt < DATA_CACHE_TTL_MS) return auditCache
      const audit = await auditData()
      auditCache = audit
      auditAt = Date.now()
      return audit
    }
    const handler = createDataHandler(webCtx, getAudit)
    return webCtx.effect(() => webServer.register({
      kind: 'prefix',
      path: DATA_ROUTE,
      handler,
    }))
  })
  ctx.inject(['webServer', 'llm', 'agentDefaultModel'], (webCtx) => {
    const webServer = webCtx && webCtx.webServer
    const llm = webCtx && webCtx.llm
    const defaultModel = webCtx && webCtx.agentDefaultModel
    if (!webServer || !llm || !defaultModel || typeof webServer.register !== 'function') return
    const cache = new Map()
    let lastCallAt = 0
    const handler = createHandler(webCtx, llm, defaultModel, cache, () => {
      const now = Date.now()
      if (now - lastCallAt < 1200) return false
      lastCallAt = now
      return true
    })
    return webCtx.effect(() => webServer.register({
      kind: 'exact',
      path: AI_ROUTE,
      handler,
    }))
  })
}

/** Build the node-style route handler used by `webServer.register`. */
function createHandler(webCtx, llm, defaultModel, cache, allowCall) {
  return async function handler(req, res) {
    if ((req.method || 'GET').toUpperCase() !== 'POST') {
      sendJson(res, 405, { ok: false, error: 'method not allowed' })
      return
    }
    if (!req.headers || String(req.headers[GATE_HEADER] || '') !== '1') {
      sendJson(res, 403, { ok: false, error: 'same-origin header required' })
      return
    }
    let raw
    try {
      raw = await readBody(req, MAX_BODY)
    } catch (error) {
      sendJson(res, 413, { ok: false, error: String(error && error.message ? error.message : error) })
      return
    }
    let body
    try {
      body = raw ? JSON.parse(raw) : null
    } catch {
      sendJson(res, 400, { ok: false, error: 'invalid JSON' })
      return
    }
    const input = normalizeInput(body)
    if (!input.assistantText && !input.lastUserPrompt && !input.sessionTitle && !input.localPrompt) {
      sendJson(res, 200, { ok: true, prompt: null, reason: 'empty-context' })
      return
    }
    const selection = safeSelection(defaultModel)
    if (!selection || !selection.provider || !selection.model) {
      sendJson(res, 200, { ok: true, prompt: null, reason: 'no-model' })
      return
    }
    const key = createHash('sha256').update(JSON.stringify({ input, selection })).digest('hex')
    const cached = cache.get(key)
    if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
      sendJson(res, 200, { ok: true, prompt: cached.prompt, model: cached.model, cached: true, usage: cached.usage })
      return
    }
    if (typeof allowCall === 'function' && !allowCall()) {
      sendJson(res, 429, { ok: false, error: 'rate limited; retry later' })
      return
    }
    try {
      const result = await generatePrompt(llm, selection, input)
      if (!result.prompt) {
        sendJson(res, 200, { ok: true, prompt: null, reason: result.reason || 'no-suggestion' })
        return
      }
      cache.set(key, { at: Date.now(), prompt: result.prompt, usage: result.usage, model: selection.model })
      trimCache(cache)
      sendJson(res, 200, {
        ok: true,
        prompt: result.prompt,
        model: selection.model,
        provider: selection.provider,
        usage: result.usage,
        cached: false,
      })
    } catch (error) {
      if (webCtx && webCtx.logger && typeof webCtx.logger.warn === 'function') {
        webCtx.logger.warn('[dsh-claude-mode] AI prompt generation failed: ' + messageOf(error))
      }
      sendJson(res, 200, { ok: false, error: 'generation failed', reason: messageOf(error) })
    }
  }
}

/** Build the read-only data audit / migration-plan route handler. */
function createDataHandler(webCtx, getAudit) {
  return async function handler(req, res) {
    try {
      const method = String(req.method || 'GET').toUpperCase()
      if (!req.headers || String(req.headers[GATE_HEADER] || '') !== '1') {
        sendJson(res, 403, { ok: false, error: 'same-origin header required' })
        return
      }
      const url = new URL(String(req.url || DATA_ROUTE), 'http://127.0.0.1')
      const pathname = url.pathname.replace(/\/+$/, '')
      if (pathname === DATA_ROUTE + '/audit' || pathname === DATA_ROUTE + '/audit.json') {
        if (method !== 'GET' && method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const audit = await getAudit(url.searchParams.get('refresh') === '1')
        sendJson(res, 200, decorateAudit(audit))
        return
      }
      if (pathname === DATA_ROUTE + '/plan') {
        if (method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        let raw
        try {
          raw = await readBody(req, MAX_DATA_BODY)
        } catch (error) {
          sendJson(res, 413, { ok: false, error: 'request body too large' })
          return
        }
        let body
        try {
          body = raw ? JSON.parse(raw) : null
        } catch {
          sendJson(res, 400, { ok: false, error: 'invalid JSON' })
          return
        }
        const audit = await getAudit(false)
        try {
          const plan = buildMigrationPlan({
            targetRoot: body && body.targetRoot,
            audit,
          })
          sendJson(res, 200, decoratePlan(plan))
        } catch (error) {
          sendJson(res, 400, { ok: false, error: messageOf(error) })
        }
        return
      }
      if (pathname === DATA_ROUTE + '/cleanup') {
        if (method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        let raw
        try {
          raw = await readBody(req, MAX_DATA_BODY)
        } catch (error) {
          sendJson(res, 413, { ok: false, error: 'request body too large' })
          return
        }
        let body
        try {
          body = raw ? JSON.parse(raw) : null
        } catch {
          sendJson(res, 400, { ok: false, error: 'invalid JSON' })
          return
        }
        const audit = await getAudit(false)
        try {
          const plan = buildCleanupPlan({
            audit,
            olderThanDays: body && body.olderThanDays,
          })
          sendJson(res, 200, plan)
        } catch (error) {
          sendJson(res, 400, { ok: false, error: messageOf(error) })
        }
        return
      }
      sendJson(res, 404, { ok: false, error: 'not found' })
    } catch (error) {
      if (webCtx && webCtx.logger && typeof webCtx.logger.warn === 'function') {
        webCtx.logger.warn('[dsh-claude-mode] data audit failed: ' + messageOf(error))
      }
      sendJson(res, 500, { ok: false, error: 'data audit failed', reason: messageOf(error) })
    }
  }
}

function decorateAudit(audit) {
  const categories = Array.isArray(audit && audit.categories) ? audit.categories : []
  const approx = categories.some((entry) => entry && entry.approx)
  const decorate = function (entry) {
    return Object.assign({}, entry, { bytesLabel: formatBytes(entry.bytes) })
  }
  return Object.assign({}, audit, {
    home: audit && audit.home ? decorate(audit.home) : null,
    categories: categories.map(decorate),
    children: Array.isArray(audit && audit.children) ? audit.children.map(decorate) : [],
    drives: Array.isArray(audit && audit.drives)
      ? audit.drives.map((drive) => Object.assign({}, drive, {
        freeLabel: formatBytes(drive.free),
        totalLabel: formatBytes(drive.total),
      }))
      : [],
    managedLabel: (approx ? '≥ ' : '') + formatBytes(audit && audit.managedBytes),
    unmanagedLabel: (approx ? '≥ ' : '') + formatBytes(audit && audit.unmanagedBytes),
  })
}

function decoratePlan(plan) {
  return Object.assign({}, plan, {
    actions: Array.isArray(plan.actions)
      ? plan.actions.map((action) => Object.assign({}, action, { bytesLabel: formatBytes(action.bytes) }))
      : [],
  })
}

/** Read one bounded request body. */
function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) {
        reject(new Error('body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

/** Write one small JSON response. */
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  })
  res.end(body)
}

/** Keep only the fields the model suggestion actually needs. */
function normalizeInput(body) {
  const source = body && typeof body === 'object' ? body : {}
  const context = source.context && typeof source.context === 'object' ? source.context : {}
  const locale = String(source.locale || 'zh-CN').slice(0, 24)
  const chinese = /^zh/i.test(locale) || /[\u4e00-\u9fff]/.test(String(context.lastUserPrompt || context.assistantText || ''))
  return {
    locale,
    chinese,
    sessionTitle: clip(context.sessionTitle, 160),
    lastUserPrompt: clip(context.lastUserPrompt, 1400),
    assistantText: clip(context.assistantText, 3600),
    toolText: clip(context.toolText, 1200),
    localPrompt: clip(context.localPrompt, 1000),
    assistantFresh: context.assistantFresh !== false,
  }
}

function clip(value, max) {
  const text = String(value == null ? '' : value).replace(/\s+\n/g, '\n').trim()
  return text.slice(0, Math.max(0, max))
}

function safeSelection(defaultModel) {
  try {
    const selection = defaultModel.currentSelection()
    if (!selection || typeof selection !== 'object') return null
    return {
      provider: String(selection.provider || ''),
      model: String(selection.model || ''),
      ...(selection.reasoningEffort ? { reasoningEffort: selection.reasoningEffort } : {}),
    }
  } catch {
    return null
  }
}

function trimCache(cache) {
  while (cache.size > CACHE_MAX) {
    let oldestKey = null
    let oldestAt = Infinity
    for (const [key, value] of cache) {
      if (value.at < oldestAt) {
        oldestAt = value.at
        oldestKey = key
      }
    }
    if (oldestKey === null) break
    cache.delete(oldestKey)
  }
}

function messageOf(error) {
  return String(error && error.message ? error.message : error).slice(0, 500)
}

/** Ask the Host model for one complete next prompt, bounded and tool-free. */
async function generatePrompt(llm, selection, input) {
  const system = input.chinese
    ? [
        '你是中文提示词编辑助手。根据给出的会话上下文，写出用户下一步最可能直接发送的一条完整提示词。',
        '只输出提示词正文，不写解释、编号、标题、代码块、引号或前后缀。',
        '这条提示词要具体、可执行、信息完整：包含明确目标、已知上下文、范围、约束、执行步骤，以及验收或验证方式。',
        '不要编造上下文中没有出现的文件、数字、命令或结论；不要使用“我建议/你可以/我会”等助手口吻。',
        '语言跟随用户最近使用的语言，长度约 120-320 个中文字符。',
        '如果上下文不足以写出有价值的提示词，只输出 SKIP。',
      ].join('\n')
    : [
        'You are a prompt editor. Based on the conversation context, write the user\'s most likely next complete prompt.',
        'Output only the prompt text: no explanation, numbering, title, code fence, quotes, or wrapper.',
        'Make it specific, executable, and complete: goal, known context, scope, constraints, execution steps, and acceptance/verification.',
        'Do not invent files, numbers, commands, or conclusions absent from the context; do not use assistant voice ("I suggest", "you could", "I will").',
        'Match the user\'s recent language and keep it about 80-200 words.',
        'If the context is insufficient for a useful prompt, output exactly SKIP.',
      ].join('\n')
  const user = input.chinese
    ? [
        '会话标题：' + (input.sessionTitle || '（无）'),
        '用户最近提示词：' + (input.lastUserPrompt || '（无）'),
        '最新助手回复：' + (input.assistantText || '（无）'),
        '最近工具结果：' + (input.toolText || '（无）'),
        '本地草稿（可改写，不要照抄）：' + (input.localPrompt || '（无）'),
      ].join('\n')
    : [
        'Session title: ' + (input.sessionTitle || '(none)'),
        'Latest user prompt: ' + (input.lastUserPrompt || '(none)'),
        'Latest assistant reply: ' + (input.assistantText || '(none)'),
        'Latest tool result: ' + (input.toolText || '(none)'),
        'Local draft (rewrite; do not copy verbatim): ' + (input.localPrompt || '(none)'),
      ].join('\n')
  const callConfig = {
    provider: selection.provider,
    model: selection.model,
    maxTokens: 650,
    temperature: 0.4,
  }
  const prepared = typeof llm.prepareCall === 'function'
    ? await llm.prepareCall(callConfig, AbortSignal.timeout(25000))
    : null
  const base = prepared && prepared.config ? prepared.config : callConfig
  const options = {
    ...base,
    provider: selection.provider,
    model: selection.model,
    system,
    messages: [{ role: 'user', content: [{ type: 'text', text: user }] }],
    maxTokens: Number.isFinite(base.maxTokens) ? base.maxTokens : 650,
    temperature: Number.isFinite(base.temperature) ? base.temperature : 0.4,
    purpose: 'claude-mode-prompt-suggestion',
    signal: AbortSignal.timeout(25000),
  }
  const text = []
  let usage = null
  let finish = null
  const stream = prepared ? prepared.stream(options) : llm.stream(options)
  for await (const chunk of stream) {
    if (!chunk || typeof chunk !== 'object') continue
    if (chunk.type === 'text-delta' && typeof chunk.text === 'string') text.push(chunk.text)
    else if (chunk.type === 'usage') usage = chunk.usage
    else if (chunk.type === 'finish') finish = chunk.reason
  }
  if (finish && (finish.kind === 'error' || finish.kind === 'aborted')) {
    throw new Error(finish.failure && finish.failure.message ? finish.failure.message : finish.kind)
  }
  if (finish && finish.kind === 'max-tokens' && text.length === 0) {
    return { prompt: null, reason: 'reasoning-consumed-output' }
  }
  const cleaned = cleanModelPrompt(text.join(''))
  if (!cleaned || /^SKIP\b/i.test(cleaned)) return { prompt: null, reason: 'model-skipped' }
  // A model can still return a terse phrase despite the system instruction.
  // Treat that as "no AI improvement" so the client keeps its complete local
  // draft instead of replacing it with a short sentence.
  const enough = input.chinese ? cleaned.length >= 40 : cleaned.split(/\s+/).filter(Boolean).length >= 18
  if (!enough) return { prompt: null, reason: 'too-short' }
  return { prompt: cleaned, usage }
}

function cleanModelPrompt(value) {
  let text = String(value == null ? '' : value).trim()
  text = text.replace(/^```[a-z-]*\s*/i, '').replace(/\s*```$/i, '')
  text = text.replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim()
  text = text.replace(/^(?:提示词建议|Suggested prompt)\s*[:：]\s*/i, '').trim()
  if (text.length > MAX_PROMPT_CHARS) text = text.slice(0, MAX_PROMPT_CHARS).trim()
  return text
}
