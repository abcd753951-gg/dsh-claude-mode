import test from 'node:test'
import assert from 'node:assert/strict'

import {
  DARK_TOKENS,
  LIGHT_TOKENS,
  THEME_DARK,
  THEME_LIGHT,
  THEME_IDS,
  THEME_TOKENS,
} from '../../src/client/01-theme.js'
import {
  DICTIONARIES,
  DEFAULT_SETTINGS,
  COMPLETION_WORDS_EN,
  COMPLETION_WORDS_ZH,
  SPINNER_FRAMES,
  SPINNER_REST_FRAME,
  SPINNER_VERBS_EN,
  SPINNER_VERBS_ZH,
  completionWordFor,
  buildPromptDraft,
  collectPromptHistory,
  createSettingsStore,
  dictionaryFor,
  extractNextStep,
  format,
  formatDuration,
  formatElapsed,
  hash32,
  isChineseLocale,
  latestToolResultText,
  loadPreviousTheme,
  latestAssistantText,
  mapSessionSearchResults,
  mapPinnedSessions,
  normalizePilotStats,
  normalizeSettings,
  pickSpinnerVerb,
  pilotBoost,
  promptContextFromChat,
  recordPilotEvent,
  runtime,
  savePreviousTheme,
  suggestionSuppressed,
  assistantTextForMessage,
  spinnerFrame,
  spinnerFrameIndex,
  splitSpeechText,
  stepPromptHistory,
  suggestPromptCompletion,
  suggestNextPrompt,
  wordPoolsFor,
} from '../../src/client/02-state.js'
import {
  createPanelMenu,
  createRunBar,
  createSettingsSection,
  createTurnFooter,
  fuzzyScore,
  groupItems,
  rankItems,
  selectChatActivity,
  shortcutGroups,
  startNewSession,
} from '../../src/client/04-components.js'
import { STYLES } from '../../src/client/03-styles.js'
import { format as formatCopy, DICTIONARIES as DICTS } from '../../src/client/02-state.js'
/* ------------------------------------------------------------------ */
/* Theme token packs                                                   */
/* ------------------------------------------------------------------ */
test('both theme packs are complete and symmetric', () => {
  const darkKeys = Object.keys(DARK_TOKENS).sort()
  const lightKeys = Object.keys(LIGHT_TOKENS).sort()
  assert.ok(darkKeys.length > 150, `expected a deep token pack, got ${darkKeys.length}`)
  assert.deepEqual(lightKeys, darkKeys)
  for (const key of darkKeys) {
    assert.equal(typeof DARK_TOKENS[key], 'string')
    assert.equal(typeof LIGHT_TOKENS[key], 'string')
    assert.ok(DARK_TOKENS[key].length > 0, `empty dark token ${key}`)
    assert.ok(LIGHT_TOKENS[key].length > 0, `empty light token ${key}`)
  }
})

test('theme ids and token tables are wired', () => {
  assert.deepEqual(THEME_IDS, [THEME_DARK, THEME_LIGHT])
  assert.equal(THEME_TOKENS[THEME_DARK], DARK_TOKENS)
  assert.equal(THEME_TOKENS[THEME_LIGHT], LIGHT_TOKENS)
  assert.notEqual(THEME_DARK, THEME_LIGHT)
})

test('host sidebar scroll override keeps the workspace reachable', () => {
  assert.match(STYLES, /\[class\*="sidebarCol"\][\s\S]*?overflow-y:\s*auto\s*!important/)
  assert.match(STYLES, /\[class\*="sidebarCol"\] > div > div:first-child[\s\S]*?height:\s*100%\s*!important/)
  assert.match(STYLES, /\[class\*="regionArea"\][\s\S]*?min-height:\s*280px/)
  assert.match(STYLES, /\[class\*="panelList"\][\s\S]*?flex:\s*0 0 auto\s*!important/)
})

test('signature tokens carry the plugin palette', () => {
  assert.equal(DARK_TOKENS['--dsw-alias-bg-base'], '#131313')
  assert.equal(LIGHT_TOKENS['--dsw-alias-bg-base'], '#fafafa')
  assert.equal(DARK_TOKENS['--dsw-alias-brand-primary'], '#d77757')
  assert.equal(LIGHT_TOKENS['--dsw-alias-brand-primary'], '#d77757')
  assert.equal(DARK_TOKENS['--dsw-specific-bubble'], '#373737')
  assert.equal(LIGHT_TOKENS['--dsw-specific-bubble'], '#f0f0f0')
  assert.equal(DARK_TOKENS['--dsw-specific-input-major'], '#262626')
  assert.equal(LIGHT_TOKENS['--dsw-specific-input-major'], '#f5f5f5')
  assert.equal(DARK_TOKENS['--dsw-alias-bg-document-selection'], '#264f78')
  assert.equal(LIGHT_TOKENS['--dsw-alias-bg-document-selection'], '#b4d5ff')
  assert.equal(DARK_TOKENS['--dsw-alias-state-error-primary'], '#ff6b80')
  assert.equal(LIGHT_TOKENS['--dsw-alias-state-success-primary'], '#2c7a39')
  assert.equal(DARK_TOKENS['--dsw-radius-panel'], '24px')
})

/* ------------------------------------------------------------------ */
/* Locale dictionaries                                                 */
/* ------------------------------------------------------------------ */
test('zh and en dictionaries carry identical key sets', () => {
  const zh = Object.keys(DICTIONARIES.zh).sort()
  const en = Object.keys(DICTIONARIES.en).sort()
  assert.deepEqual(en, zh)
  for (const key of zh) {
    assert.ok(DICTIONARIES.zh[key].length > 0, `empty zh value for ${key}`)
    assert.ok(DICTIONARIES.en[key].length > 0, `empty en value for ${key}`)
  }
})

test('dictionaryFor follows the active locale', () => {
  assert.equal(dictionaryFor('zh'), DICTIONARIES.zh)
  assert.equal(dictionaryFor('zh-CN'), DICTIONARIES.zh)
  assert.equal(dictionaryFor('en'), DICTIONARIES.en)
  assert.equal(dictionaryFor('ja'), DICTIONARIES.en)
  assert.equal(dictionaryFor(undefined), DICTIONARIES.en)
})

test('format interpolates named placeholders and keeps unknown ones', () => {
  assert.equal(format('已排队 {count} 条', { count: 2 }), '已排队 2 条')
  assert.equal(format('用时 {duration}'), '用时 {duration}')
  assert.equal(format('', { a: 1 }), '')
  assert.equal(format(undefined), '')
})

/* ------------------------------------------------------------------ */
/* Settings store                                                      */
/* ------------------------------------------------------------------ */
test('normalizeSettings clamps unknown values onto defaults', () => {
  assert.deepEqual(normalizeSettings(undefined), DEFAULT_SETTINGS)
  assert.deepEqual(normalizeSettings({}), DEFAULT_SETTINGS)
  assert.deepEqual(
    normalizeSettings({ enabled: false, theme: 'light', statusBar: false, turnFooter: false, animations: false, sound: true, ghost: false, ghostContext: false, aiPrompt: false }),
    { enabled: false, theme: 'light', statusBar: false, turnFooter: false, animations: false, sound: true, ghost: false, ghostContext: false, aiPrompt: false },
  )
  assert.equal(normalizeSettings(undefined).aiPrompt, true)
  const coerced = normalizeSettings({ theme: 'neon', enabled: 1, animation: 0 })
  assert.equal(coerced.theme, 'auto')
  assert.equal(coerced.enabled, true)
  assert.equal(coerced.sound, false)
  assert.equal(normalizeSettings({ sound: 'yes' }).sound, false)
})

test('settings store notifies subscribers only on real changes and resets', () => {
  const store = createSettingsStore(DEFAULT_SETTINGS)
  let notifications = 0
  const dispose = store.subscribe(() => {
    notifications += 1
  })
  assert.equal(store.get().enabled, true)
  store.set({ enabled: true })
  assert.equal(notifications, 0)
  store.set({ enabled: false })
  assert.equal(notifications, 1)
  assert.equal(store.get().enabled, false)
  store.set({ theme: 'dark' })
  assert.equal(notifications, 2)
  store.reset()
  assert.equal(notifications, 3)
  assert.deepEqual(store.get(), DEFAULT_SETTINGS)
  dispose()
  store.set({ enabled: false })
  assert.equal(notifications, 3)
})

test('previous theme persistence round-trips through the guarded storage helpers', () => {
  // Node has no window/localStorage: the helpers must stay silent and no-op.
  assert.equal(loadPreviousTheme(), undefined)
  assert.doesNotThrow(() => savePreviousTheme('dark'))
})

/* ------------------------------------------------------------------ */
/* Formatting and ranking                                              */
/* ------------------------------------------------------------------ */
test('formatDuration matches the short Claude Code shape', () => {
  assert.equal(formatDuration(0), '1s')
  assert.equal(formatDuration(2500), '3s')
  assert.equal(formatDuration(65000), '1m 5s')
  assert.equal(formatDuration(120000), '2m')
  assert.equal(formatDuration(3900000), '1h 5m')
})

test('formatElapsed keeps the run-bar form', () => {
  assert.equal(formatElapsed(0), '0s')
  assert.equal(formatElapsed(59900), '59s')
  assert.equal(formatElapsed(65000), '1m 5s')
})

test('fuzzyScore prefers prefixes, then subsequences, then misses', () => {
  const prefix = fuzzyScore('claude 亮色', 'claude')
  const substring = fuzzyScore('主题 claude 暗色', 'claude')
  const subsequence = fuzzyScore('命令面板 claude 模式', 'cld')
  assert.ok(prefix > substring)
  assert.ok(substring > 0)
  assert.ok(subsequence > 0)
  assert.equal(fuzzyScore('新会话', 'zzz'), 0)
  assert.equal(fuzzyScore('anything', ''), 1)
})

test('rankItems prefers title hits over detail hits', () => {
  const items = [
    { id: 'a', title: '关闭运行状态条', detail: '主题 claude 暗色', keywords: '' },
    { id: 'b', title: '主题：Claude 暗色', detail: '当前：暗色', keywords: 'theme' },
  ]
  const ranked = rankItems(items, '暗色')
  assert.equal(ranked[0].id, 'b')
  assert.deepEqual(rankItems(items, ''), items)
  assert.deepEqual(rankItems(items, 'nothing-matches'), [])
})

test('groupItems keeps the appearance/behavior/session order', () => {
  const grouped = groupItems([
    { id: 'x', section: 'session', title: 's' },
    { id: 'y', section: 'appearance', title: 'a' },
    { id: 'z', section: 'behavior', title: 'b' },
    { id: 'w', section: 'appearance', title: 'a2' },
  ])
  assert.deepEqual(grouped.map((group) => group.section), ['appearance', 'behavior', 'session'])
  assert.deepEqual(grouped[0].items.map((item) => item.id), ['y', 'w'])
  assert.deepEqual(grouped[2].items.map((item) => item.id), ['x'])
})

/* ------------------------------------------------------------------ */
/* Claude Code-derived behavior tables                                 */
/* ------------------------------------------------------------------ */
test('word pools are well-formed and locale-routed', () => {
  assert.equal(SPINNER_VERBS_EN.length, 187)
  assert.equal(new Set(SPINNER_VERBS_EN).size, SPINNER_VERBS_EN.length)
  assert.ok(SPINNER_VERBS_EN.includes('Cooking'))
  assert.ok(!SPINNER_VERBS_EN.includes('Clauding'))
  assert.ok(SPINNER_VERBS_ZH.length >= 60)
  assert.equal(new Set(SPINNER_VERBS_ZH).size, SPINNER_VERBS_ZH.length)
  assert.equal(COMPLETION_WORDS_EN.length, 8)
  assert.equal(COMPLETION_WORDS_ZH.length, 8)
  assert.equal(wordPoolsFor('zh-CN').chinese, true)
  assert.equal(wordPoolsFor('en-US').chinese, false)
  assert.equal(isChineseLocale('zh'), true)
  assert.equal(isChineseLocale('en-US'), false)
  assert.equal(isChineseLocale(undefined), false)
})

test('verb and completion picks are stable per seed and match the locale pool', () => {
  const enVerb = pickSpinnerVerb('session-a:1700000000000', 'en')
  assert.equal(enVerb, pickSpinnerVerb('session-a:1700000000000', 'en'))
  assert.ok(SPINNER_VERBS_EN.includes(enVerb))
  const zhVerb = pickSpinnerVerb('session-a:1700000000000', 'zh')
  assert.ok(zhVerb.endsWith('中'))
  assert.ok(SPINNER_VERBS_ZH.includes(zhVerb.slice(0, -1)))
  assert.ok(COMPLETION_WORDS_EN.includes(completionWordFor(1700000000000, 'en')))
  assert.ok(COMPLETION_WORDS_ZH.includes(completionWordFor(1700000000000, 'zh')))
  assert.equal(hash32('abc'), hash32('abc'))
  assert.ok(hash32('abc') >= 0 && hash32('abc') <= 0xffffffff)
})

test('status star frames pulse forward and back over two seconds', () => {
  assert.deepEqual([...SPINNER_FRAMES], ['·', '✢', '✳', '✶', '✻', '✽'])
  assert.equal(SPINNER_REST_FRAME, '✻')
  assert.equal(spinnerFrameIndex(-50), 0)
  assert.equal(spinnerFrameIndex(0), 0)
  assert.equal(spinnerFrameIndex(500), 2)
  assert.equal(spinnerFrameIndex(1000), 5)
  assert.equal(spinnerFrameIndex(1500), 3)
  assert.equal(spinnerFrameIndex(2000), 0)
  assert.equal(spinnerFrame(0), '·')
  assert.equal(spinnerFrame(1000), '✽')
})

test('selectChatActivity derives running phases from the chat legacy slice', () => {
  assert.equal(selectChatActivity(undefined), 'waiting|0|0')
  assert.equal(selectChatActivity({}), 'waiting|0|0')
  assert.equal(selectChatActivity({ legacy: { runningCalls: [{ time: 1234 }] } }), 'tool|1|1234')
  assert.equal(
    selectChatActivity({ legacy: { runningCalls: [], partial: { blocks: [{ kind: 'reasoning', text: 'x' }] } } }),
    'thinking|0|0',
  )
  assert.equal(
    selectChatActivity({ legacy: { runningCalls: [], partial: { blocks: [{ kind: 'text', text: 'x' }] } } }),
    'responding|0|0',
  )
  assert.equal(
    selectChatActivity({ legacy: { runningCalls: [], partial: { blocks: [{ kind: 'tool-call' }] } } }),
    'tool-input|0|0',
  )
})

/* ------------------------------------------------------------------ */
/* Prompt history and shortcut sheet                                   */
/* ------------------------------------------------------------------ */
test('collectPromptHistory returns newest-first deduplicated prompt text', () => {
  const nodes = [
    { kind: 'user', seq: 1, content: [{ type: 'text', text: 'first prompt' }] },
    { kind: 'assistant', seq: 2, blocks: [{ kind: 'text', text: 'answer' }] },
    { kind: 'user', seq: 3, content: [{ type: 'text', text: 'second prompt' }] },
    { kind: 'steering', seq: 4, content: [{ type: 'text', text: 'steer now' }] },
    { kind: 'context', seq: 5, content: [{ type: 'text', text: 'ignored context' }] },
    { kind: 'user', seq: 6, content: [{ type: 'text', text: 'second prompt' }] },
  ]
  assert.deepEqual(collectPromptHistory(nodes), ['second prompt', 'steer now', 'first prompt'])
  assert.deepEqual(collectPromptHistory(nodes, 1), ['second prompt'])
  assert.deepEqual(collectPromptHistory(undefined), [])
  assert.deepEqual(collectPromptHistory([]), [])
})

test('stepPromptHistory walks older/newer and restores the draft', () => {
  const prompts = ['newest', 'older', 'oldest']
  let step = stepPromptHistory({ active: false, index: -1, draft: '' }, -1, prompts, '')
  assert.deepEqual(step, { state: { active: true, index: 0, draft: '' }, text: 'newest' })
  step = stepPromptHistory(step.state, -1, prompts, '')
  assert.equal(step.text, 'older')
  step = stepPromptHistory(step.state, -1, prompts, '')
  assert.equal(step.text, 'oldest')
  step = stepPromptHistory(step.state, -1, prompts, '')
  assert.equal(step.text, 'oldest')
  step = stepPromptHistory(step.state, 1, prompts, '')
  assert.equal(step.text, 'older')
  step = stepPromptHistory(step.state, 1, prompts, '')
  assert.equal(step.text, 'newest')
  step = stepPromptHistory(step.state, 1, prompts, '')
  assert.deepEqual(step, { state: { active: false, index: -1, draft: '' }, text: '' })

  assert.equal(stepPromptHistory({ active: false, index: -1, draft: '' }, 1, prompts, '').text, null)
  assert.equal(stepPromptHistory({ active: false, index: -1, draft: '' }, -1, [], '').text, null)
  const started = stepPromptHistory({ active: false, index: -1, draft: '' }, -1, prompts, 'my draft')
  assert.equal(started.state.draft, 'my draft')
})

test('suggestPromptCompletion prefers history, then starter prompts', () => {
  const history = ['请审查当前仓库的性能瓶颈', 'Review the pull request diff']
  const zh = suggestPromptCompletion('请审', history, 'zh-CN')
  assert.equal(zh.full, '请审查当前仓库的性能瓶颈')
  assert.equal(zh.tail, '查当前仓库的性能瓶颈')
  const builtin = suggestPromptCompletion('请把', history, 'zh-CN')
  assert.equal(builtin.full, '请把这段需求拆成可执行的开发计划，并标注风险')
  const en = suggestPromptCompletion('Add', [], 'en')
  assert.equal(en.full, 'Add unit tests for this feature, including edge cases')
  assert.equal(suggestPromptCompletion('R', [], 'en'), null)
  assert.equal(suggestPromptCompletion('/help', [], 'zh-CN'), null)
  assert.equal(suggestPromptCompletion('line\nbreak', [], 'zh-CN'), null)
  assert.equal(suggestPromptCompletion('完全不匹配', [], 'zh-CN'), null)
})

test('latestAssistantText reads finalized assistant blocks and fallbacks', () => {
  const direct = {
    legacy: {
      nodes: [
        { kind: 'assistant', blocks: [{ kind: 'reasoning', text: 'thinking' }, { kind: 'text', text: '最终结论' }] },
      ],
    },
  }
  assert.equal(latestAssistantText(direct), '最终结论')
  const tail = {
    legacy: {
      nodes: [
        { kind: 'turn-tail', data: { closing: { blocks: [{ kind: 'text', text: '旧回合' }] } } },
        { kind: 'assistant', blocks: [{ kind: 'text', text: '新回复' }] },
      ],
    },
  }
  assert.equal(latestAssistantText(tail), '新回复')
  assert.equal(latestAssistantText({} ), '')
  assert.equal(latestAssistantText(undefined), '')
})

test('suggestNextPrompt is a full-draft alias, not a short-ghost engine', () => {
  const next = suggestNextPrompt({ assistantText: '测试通过。下一步：补齐发布文档。', locale: 'zh-CN' })
  assert.equal(next.kind, 'next-step')
  assert.ok(next.full.length > 60)
  assert.match(next.full, /补齐发布文档/)
  const errorDraft = suggestNextPrompt({ assistantText: '运行时报错：TypeError', locale: 'zh-CN' })
  assert.equal(errorDraft.kind, 'error')
  assert.ok(errorDraft.full.length > 40)
  assert.equal(suggestNextPrompt({ running: true, assistantText: '下一步：做点什么', locale: 'zh-CN' }), null)
})

test('buildPromptDraft writes a full prompt instead of a short ghost', () => {
  const next = buildPromptDraft({
    assistantText: '测试通过。下一步：补齐发布文档。',
    locale: 'zh-CN',
  })
  assert.equal(next.kind, 'next-step')
  assert.ok(next.full.length > 60)
  assert.match(next.full, /补齐发布文档/)
  assert.match(next.full, /验收/)
  assert.match(next.full, /风险/)
  assert.notEqual(next.full, '补齐发布文档')

  const question = buildPromptDraft({ assistantText: '你希望我先改前端还是后端？', locale: 'zh-CN' })
  assert.equal(question.kind, 'question')
  assert.ok(question.full.length > 50)
  assert.match(question.full, /推荐|理由/)

  const completed = buildPromptDraft({ assistantText: '已完成修复，测试全部通过。', locale: 'zh-CN' })
  assert.equal(completed.kind, 'completed')
  assert.match(completed.full, /验证|测试/)
  assert.match(completed.full, /提交/)

  const blank = buildPromptDraft({ locale: 'zh-CN', sessionId: 'blank' })
  assert.equal(blank.kind, 'starter')
  assert.ok(blank.full.length > 50)
  assert.match(blank.full, /目标|约束|风险/)

  const en = buildPromptDraft({ assistantText: 'Next step: run the failing test', locale: 'en' })
  assert.equal(en.kind, 'next-step')
  assert.ok(en.full.split(/\s+/).length > 10)
  assert.match(en.full, /acceptance|verification/i)

  const error = buildPromptDraft({ assistantText: '运行时报错：TypeError: x is undefined', locale: 'zh-CN' })
  assert.equal(error.kind, 'error')
  assert.ok(error.full.length > 40)
  assert.match(error.full, /复现|根因/)
  assert.equal(buildPromptDraft({ running: true, assistantText: '下一步：做点什么', locale: 'zh-CN' }), null)
})

test('every settled context gets a complete draft, including errors and generic replies', () => {
  const contexts = [
    {},
    { sessionTitle: '重构任务' },
    { lastUserPrompt: '继续实现这个模块' },
    { assistantText: '这是一个普通回答，没有显式下一步。' },
    { assistantText: '运行时报错：TypeError: x is undefined' },
    { toolText: 'Error: cannot read property foo', toolFresh: true },
    { assistantText: '```\n下一步：不要执行这段\n```\n回答结束。' },
    { assistantText: '已完成修复，测试通过。' },
  ]
  for (const input of contexts) {
    const draft = buildPromptDraft(Object.assign({ locale: 'zh-CN' }, input))
    assert.ok(draft, 'missing draft for ' + JSON.stringify(input))
    assert.ok(draft.full.length >= 40)
    assert.ok(draft.contextual)
  }
  assert.equal(buildPromptDraft({ running: true, locale: 'zh-CN' }), null)
})


test('extractNextStep prefers an explicit labeled step and trims the sentence', () => {
  const text = '已完成\n\n下一步：把这两条不够稳定的实时断言改成可跳过；PCR 再换供应商。\n\n— footer'
  assert.equal(extractNextStep(text, true), '把这两条不够稳定的实时断言改成可跳过')
  assert.equal(extractNextStep('- **下一步：** 补上边界测试', true), '补上边界测试')
  assert.equal(extractNextStep('Next step: run the failing test', false), 'run the failing test')
  assert.equal(extractNextStep('没有明确的下一步。', true), '')
})

test('extractNextStep handles bold, list, heading, English and last-wins', () => {
  assert.equal(extractNextStep('**下一步：** 补齐发布文档', true), '补齐发布文档')
  assert.equal(extractNextStep('- 下一步：跑一遍端到端测试', true), '跑一遍端到端测试')
  assert.equal(extractNextStep('### 下一步\n- 把 README 的安装步骤补全', true), '把 README 的安装步骤补全')
  assert.equal(extractNextStep('Next step:\n- update the changelog', false), 'update the changelog')
  assert.equal(extractNextStep('下一步：旧的计划\n补充说明\n下一步：新的动作', true), '新的动作')
})

test('prompt pilot counts stay bounded and suppression is time-scoped', () => {
  let stats = normalizePilotStats(null)
  stats = recordPilotEvent(stats, 'next-step', 'shown', 1000, 'k1')
  stats = recordPilotEvent(stats, 'next-step', 'shown', 1001, 'k1')
  stats = recordPilotEvent(stats, 'next-step', 'shown', 1001, 'k1')
  stats = recordPilotEvent(stats, 'next-step', 'accepted', 1002, 'k1')
  assert.equal(stats.kinds['next-step'].shown, 3)
  assert.equal(stats.kinds['next-step'].accepted, 1)
  assert.ok(pilotBoost(stats, 'next-step') > 0)
  // Acceptance is not a dismissal: deleting the accepted draft must re-offer it.
  assert.equal(suggestionSuppressed(stats, 'k1', 1003), false)
  stats = recordPilotEvent(stats, 'next-step', 'dismissed', 1003, 'k2')
  assert.equal(suggestionSuppressed(stats, 'k2', 1004), true)
  assert.equal(suggestionSuppressed(stats, 'k2', 70000), false)
  const normalized = normalizePilotStats({ kinds: { x: { shown: -2, accepted: '3', dismissed: 99999999 } } })
  assert.deepEqual(normalized.kinds.x, { shown: 0, accepted: 3, dismissed: 1000000 })
})

test('promptContextFromChat reads assistant text, tool output and prompts', () => {
  const snapshot = {
    legacy: {
      nodes: [
        { kind: 'user', content: [{ type: 'text', text: '请跑测试' }] },
        { kind: 'tool-result', data: { content: [{ type: 'text', text: 'Error: boom' }] } },
        { kind: 'assistant', blocks: [{ kind: 'text', text: '测试失败了' }] },
      ],
    },
  }
  const context = promptContextFromChat(snapshot)
  assert.equal(context.assistantText, '测试失败了')
  assert.equal(context.toolText, 'Error: boom')
  assert.equal(context.lastUserPrompt, '请跑测试')
  assert.equal(context.assistantFresh, true)
  assert.equal(context.toolFresh, true)
  assert.deepEqual(context.history, ['请跑测试'])
  assert.equal(latestToolResultText(snapshot), 'Error: boom')
  const stale = promptContextFromChat({
    legacy: {
      nodes: [
        { kind: 'assistant', blocks: [{ kind: 'text', text: '旧回复' }] },
        { kind: 'user', content: [{ type: 'text', text: '新问题' }] },
      ],
    },
  })
  assert.equal(stale.assistantFresh, false)
})

test('shortcut sheet groups cover input, navigation and interface rows', () => {
  const dict = DICTIONARIES.zh
  const t = (key) => (dict[key] === undefined ? key : dict[key])
  const groups = shortcutGroups(t)
  assert.deepEqual(groups.map((group) => group.key), ['input', 'navigation', 'interface'])
  for (const group of groups) {
    assert.ok(group.title.length > 0)
    assert.ok(group.rows.length >= 2)
    for (const row of group.rows) {
      assert.ok(row.keys.length >= 1)
      assert.ok(row.label.length > 0)
    }
  }
  assert.equal(groups[0].rows[2].label, '历史提示词（↑ 更早 / ↓ 更新）')
  assert.equal(groups[1].rows[1].label, '新建会话')
  assert.equal(groups[1].rows[3].label, '切换左侧边栏')
})

test('chat search keeps one row per Session and flattens snippets', () => {
  const rows = mapSessionSearchResults([
    { sessionId: 's1', snippet: 'first\n  hit about plugins' },
    { sessionId: 's1', snippet: 'duplicate hit' },
    { sessionId: 's2', snippet: 'second hit' },
    { sessionId: undefined, snippet: 'orphan' },
    { sessionId: 's3', snippet: '   ' },
  ])
  assert.equal(rows.length, 2)
  assert.equal(rows[0].sessionId, 's1')
  assert.equal(rows[0].snippet, 'first hit about plugins')
  assert.equal(rows[1].snippet, 'second hit')
  const long = mapSessionSearchResults([{ sessionId: 's4', snippet: 'x'.repeat(200) }])
  assert.ok(long[0].snippet.endsWith('…'))
  assert.ok(long[0].snippet.length <= 96)
})

test('pinned sessions resolve titles and owning workspaces', () => {
  const rows = mapPinnedSessions({
    pinnedSessionIds: ['s1', 's2', 'missing'],
    items: [
      { title: 'Alpha', sessionIds: ['s1'] },
      { title: 'Beta', sessionIds: ['s2'] },
    ],
  }, {
    byId: {
      s1: { projectionValues: { title: '第一项\n置顶' } },
      s2: { title: 'Second pinned' },
    },
  })
  assert.deepEqual(rows.map((row) => [row.sessionId, row.title, row.workspaceTitle]), [
    ['s1', '第一项 置顶', 'Alpha'],
    ['s2', 'Second pinned', 'Beta'],
  ])
  assert.deepEqual(mapPinnedSessions(undefined, undefined), [])
  assert.deepEqual(mapPinnedSessions({ pinnedSessionIds: ['s1'], items: [] }, { byId: {} }), [])
})

test('assistantTextForMessage finds the closing turn-tail blocks', () => {
  const snapshot = {
    nodes: new Map([
      ['assistant', { kind: 'assistant-step', data: { blocks: [{ kind: 'text', text: 'other' }] } }],
      ['tail', {
        kind: 'turn-tail',
        data: {
          closing: {
            finalNode: { messageId: 'm1' },
            blocks: [{ kind: 'reasoning', text: 'thinking' }, { kind: 'text', text: 'Hello' }, { kind: 'text', text: 'world' }],
          },
        },
      }],
    ]),
    legacy: { nodes: [] },
  }
  assert.equal(assistantTextForMessage(snapshot, 'm1'), 'Hello\nworld')
  assert.equal(assistantTextForMessage(snapshot, 'missing'), '')
  assert.equal(assistantTextForMessage(undefined, 'm1'), '')
})

test('splitSpeechText preserves prose and bounds every chunk', () => {
  assert.deepEqual(splitSpeechText('short reply'), ['short reply'])
  assert.deepEqual(splitSpeechText('   '), [])
  const long = Array.from({ length: 300 }, (_, index) => `Sentence ${index}.`).join(' ')
  const chunks = splitSpeechText(long, 400)
  assert.ok(chunks.length > 1)
  for (const chunk of chunks) {
    assert.ok(chunk.length <= 400, `chunk too long: ${chunk.length}`)
    assert.ok(chunk.length > 0)
  }
  const flat = (value) => value.replace(/\s+/g, '')
  assert.equal(flat(chunks.join(' ')), flat(long))
})

test('startNewSession calls the workspace service and degrades silently', () => {
  let started = 0
  const ctx = { get: (key) => key === 'uiWorkspace' ? { startSession: () => { started += 1 } } : undefined }
  assert.equal(startNewSession(ctx), true)
  assert.equal(started, 1)
  assert.equal(startNewSession({ get: () => undefined }), false)
  assert.equal(startNewSession({ get: () => { throw new Error('no service') } }), false)
})

test('chat search results group between Session and prompt history', () => {
  const groups = groupItems([
    { id: 'a', section: 'session' },
    { id: 'b', section: 'search' },
    { id: 'c', section: 'history' },
  ])
  assert.deepEqual(groups.map((group) => group.section), ['session', 'search', 'history'])
})

/* ------------------------------------------------------------------ */
/* Component render shape (no DOM: a minimal React stub)               */
/* ------------------------------------------------------------------ */
function reactStub() {
  const createElement = (type, props, ...children) => {
    if (typeof type === 'function') {
      const merged = { ...(props || {}) }
      if (children.length === 1) merged.children = children[0]
      else if (children.length > 1) merged.children = children
      return type(merged)
    }
    const flat = []
    const push = (items) => {
      for (const item of items) {
        if (Array.isArray(item)) push(item)
        else if (item !== null && item !== undefined && item !== false) flat.push(item)
      }
    }
    push(children)
    return { type, props: { ...(props || {}), children: flat.length <= 1 ? flat[0] : flat } }
  }
  return {
    createElement,
    useState: (initial) => [typeof initial === 'function' ? initial() : initial, () => {}],
    useEffect: () => {},
    useRef: (value) => ({ current: value }),
    useCallback: (fn) => fn,
    useMemo: (fn) => fn(),
    useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot(),
  }
}

function textOf(node) {
  if (node === null || node === undefined || node === false) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (node.props) return textOf(node.props.children)
  return ''
}

function collectByClass(node, cls, found = []) {
  if (node === null || node === undefined || typeof node !== 'object') return found
  if (Array.isArray(node)) {
    for (const child of node) collectByClass(child, cls, found)
    return found
  }
  const className = node.props && node.props.className
  if (typeof className === 'string' && className.includes(cls)) found.push(node)
  if (node.props) collectByClass(node.props.children, cls, found)
  return found
}

function withReactStub(run) {
  const previous = globalThis.React
  globalThis.React = reactStub()
  try {
    return run()
  } finally {
    globalThis.React = previous
  }
}

function translateFor(locale) {
  const dict = DICTS[locale === 'zh' ? 'zh' : 'en']
  return (key, values) => formatCopy(dict[key] === undefined ? key : dict[key], values)
}

test('run bar renders the expected running shape in zh', () => {
  withReactStub(() => {
    const store = createSettingsStore(DEFAULT_SETTINGS)
    const RunBar = createRunBar({ get: () => undefined }, store, translateFor('zh'), () => 'zh-CN')
    const started = Date.now() - 4000
    const tree = RunBar({
      session: { running: true, sessionId: 'session-1' },
      input: { queue: [{}, {}] },
      sessionId: 'session-1',
      useChat: (selector) => selector({ legacy: { runningCalls: [{ time: started }], partial: null } }),
    })
    const text = textOf(tree)
    assert.match(text, /中…/)
    assert.match(text, /Esc 中断/)
    assert.match(text, /·/)
    assert.match(text, /工具运行 \d+s/)
    assert.match(text, /2 条排队/)
    assert.ok(text.includes('↑'))
  })
})

test('run bar falls back to a static star when animations are off', () => {
  withReactStub(() => {
    const store = createSettingsStore({ ...DEFAULT_SETTINGS, animations: false })
    const RunBar = createRunBar({ get: () => undefined }, store, translateFor('en'), () => 'en')
    const tree = RunBar({
      session: { running: true, sessionId: 'session-2' },
      input: { queue: [] },
      sessionId: 'session-2',
      useChat: (selector) => selector(undefined),
    })
    const glyphs = collectByClass(tree, 'ccm-glyph').map((node) => textOf(node))
    assert.ok(glyphs.includes('✻'), `expected a static star, got ${glyphs.join(',')}`)
    assert.match(textOf(tree), /esc to interrupt/)
    assert.match(textOf(tree), /\(esc to interrupt·0s\)/)
  })
})

test('idle run bar advertises history, shortcuts, and the sidebar rail toggle', () => {
  withReactStub(() => {
    const previousToggle = runtime.toggleSidebar
    runtime.toggleSidebar = () => {}
    try {
      const store = createSettingsStore(DEFAULT_SETTINGS)
      const RunBar = createRunBar({ get: () => undefined }, store, translateFor('zh'), () => 'zh-CN')
      const tree = RunBar({
        session: { running: false, sessionId: 'session-idle' },
        input: { queue: [] },
        sessionId: 'session-idle',
        useChat: (selector) => selector(undefined),
        inputActions: { setDraft() {} },
      })
      const text = textOf(tree)
      assert.match(text, /历史/)
      assert.match(text, /快捷键/)
      assert.equal(collectByClass(tree, 'ccm-runbar-hint').filter((node) => String(node.props.className).split(/\s+/).includes('ccm-runbar-hint')).length, 7)
      assert.equal(collectByClass(tree, 'ccm-sidebtn').length, 1)
    } finally {
      runtime.toggleSidebar = previousToggle
    }
  })
})

test('panel menu folds individual icons and provides bulk collapse/expand', () => {
  withReactStub(() => {
    const store = createSettingsStore(DEFAULT_SETTINGS)
    const PanelMenu = createPanelMenu({}, store, translateFor('zh'))
    const calls = []
    const tree = PanelMenu({
      entries: [
        { id: 'rea', label: 'REA 分析', pinned: true, active: false },
        { id: 'market', label: '瞰市', pinned: false, active: true },
      ],
      onOpen: (id) => calls.push(['open', id]),
      onPinnedChange: (id, pinned) => calls.push(['pin', id, pinned]),
      onDismiss: () => calls.push(['dismiss']),
    })
    const text = textOf(tree)
    assert.match(text, /插件图标/)
    assert.match(text, /1\/2 个显示/)
    assert.match(text, /REA 分析/)

    const toggles = collectByClass(tree, 'ccm-panelmenu-toggle')
    assert.equal(toggles.length, 2)
    assert.equal(textOf(toggles[0]), '隐藏')
    assert.equal(textOf(toggles[1]), '显示')
    toggles[0].props.onClick()
    assert.deepEqual(calls.pop(), ['pin', 'rea', false])
    toggles[1].props.onClick()
    assert.deepEqual(calls.pop(), ['pin', 'market', true])

    const bulk = collectByClass(tree, 'ccm-panelmenu-bulkbtn')
    assert.equal(bulk.length, 2)
    bulk[0].props.onClick()
    assert.deepEqual(calls.slice(-2), [['pin', 'rea', false], ['pin', 'market', false]])
    calls.length = 0
    bulk[1].props.onClick()
    assert.deepEqual(calls, [['pin', 'rea', true], ['pin', 'market', true]])

    calls.length = 0
    const openButtons = collectByClass(tree, 'ccm-panelmenu-open')
    openButtons[0].props.onClick()
    assert.deepEqual(calls, [['open', 'rea'], ['dismiss']])

    const hidden = createSettingsStore({ ...DEFAULT_SETTINGS, enabled: false })
    const DisabledMenu = createPanelMenu({}, hidden, translateFor('zh'))
    assert.equal(DisabledMenu({ entries: [] }), null)
  })
})

test('settings section exposes both prompt-pilot switches and version', () => {
  withReactStub(() => {
    const store = createSettingsStore(DEFAULT_SETTINGS)
    const Section = createSettingsSection({}, store, translateFor('zh'))
    const tree = Section({})
    const text = textOf(tree)
    assert.match(text, /输入提示补全/)
    assert.match(text, /空输入框上下文推荐/)
    assert.match(text, /AI 完善提示词/)
    assert.match(text, /同一上下文只调用一次/)
    assert.match(text, /数据与存储/)
    assert.match(text, /不会移动正在使用的数据/)
    assert.match(text, /1\.1\.2/)
  })
})

test('turn footer stamps a rotating completion word and duration', () => {
  withReactStub(() => {
    const base = 1700000000000
    const zhStore = createSettingsStore(DEFAULT_SETTINGS)
    const ZhFooter = createTurnFooter({}, zhStore, translateFor('zh'), () => 'zh-CN')
    const zhText = textOf(ZhFooter({
      turn: { status: 'closed', start: { time: base }, end: { time: base + 62000 }, steps: [1, 2, 3] },
    }))
    assert.match(zhText, /(烘焙|酿造|搅拌|推敲|烹饪|咀嚼|煸炒|打磨)了 1m 2s/)
    assert.match(zhText, /3 步/)

    const enStore = createSettingsStore(DEFAULT_SETTINGS)
    const EnFooter = createTurnFooter({}, enStore, translateFor('en'), () => 'en')
    const enText = textOf(EnFooter({
      turn: { status: 'closed', start: { time: base }, end: { time: base + 62000 }, steps: [1] },
    }))
    assert.match(enText, /(Baked|Brewed|Churned|Cogitated|Cooked|Crunched|Sautéed|Worked) for 1m 2s/)

    assert.equal(ZhFooter({ turn: { status: 'closed', start: { time: base }, end: { time: base + 120 } } }), null)
    const disabledStore = createSettingsStore({ ...DEFAULT_SETTINGS, turnFooter: false })
    const DisabledFooter = createTurnFooter({}, disabledStore, translateFor('zh'), () => 'zh')
    assert.equal(DisabledFooter({
      turn: { status: 'closed', start: { time: base }, end: { time: base + 62000 } },
    }), null)
  })
})


