import test from 'node:test'
import assert from 'node:assert/strict'

import {
  DEDUPE_FLAGS,
  DEDUPE_MARKS,
  DEDUPE_TAIL_RANK,
  installDedupe,
  planPanelOrder,
  resolvePanelLabel,
} from '../../src/client/045-dedupe.js'
import { DEFAULT_SETTINGS, createSettingsStore, normalizeSettings } from '../../src/client/02-state.js'
import { createNode, createShell, fakeSlots, railEntries } from '../helpers/mini-dom.mjs'

function fakeContext(entries) {
  return {
    slots: {
      entriesOfSlot(key) {
        assert.equal(key, 'sidebar.panellist')
        return entries
      },
    },
  }
}

test('planPanelOrder keeps host order and breaks ties by id', () => {
  const plan = planPanelOrder(railEntries([
    { id: 'dsh-design-studio', order: 24, label: '设计台' },
    { id: 'dsh-security-selftest', order: 24, label: '安全检测' },
    { id: 'plugins', order: 0, label: '插件' },
  ]))
  assert.deepEqual(plan.rows.map(row => row.id), ['plugins', 'dsh-design-studio', 'dsh-security-selftest'])
  assert.equal(plan.ranks['设计台'], 1)
  assert.equal(plan.ranks['安全检测'], 2)
  assert.deepEqual(plan.tieGroups, [{ order: 24, ids: ['dsh-design-studio', 'dsh-security-selftest'] }])
})

test('planPanelOrder is independent of registration order', () => {
  const first = planPanelOrder(railEntries([
    { id: 'dsh-purge-plus', order: 26, label: '破甲中心' },
    { id: 'codebase-intelligence', order: 26, label: '代码库情报' },
  ]))
  const second = planPanelOrder(railEntries([
    { id: 'codebase-intelligence', order: 26, label: '代码库情报' },
    { id: 'dsh-purge-plus', order: 26, label: '破甲中心' },
  ]))
  assert.deepEqual(first.ranks, second.ranks)
  assert.deepEqual(first.ranks, { '代码库情报': 0, '破甲中心': 1 })
})

test('planPanelOrder skips entries it cannot match back to a row', () => {
  const plan = planPanelOrder([
    { options: { id: 'a', order: 1, label: '甲' } },
    { options: { id: '', order: 2, label: '乙' } },
    { options: { id: 'c', order: 3 } },
    { options: { id: 'd', order: 4, label: () => { throw new Error('thunk') } } },
    null,
  ])
  assert.deepEqual(plan.rows.map(row => row.id), ['a'])
  assert.deepEqual(plan.ranks, { '甲': 0 })
  assert.deepEqual(plan.tieGroups, [])
  assert.deepEqual(planPanelOrder(undefined).ranks, {})
})

test('resolvePanelLabel reads thunks and ignores empty values', () => {
  assert.equal(resolvePanelLabel(() => '插件'), '插件')
  assert.equal(resolvePanelLabel('插件'), '插件')
  assert.equal(resolvePanelLabel(() => 42), '')
  assert.equal(resolvePanelLabel(() => { throw new Error('boom') }), '')
  assert.equal(resolvePanelLabel(undefined), '')
})

test('installDedupe narrows the brand row and marks panel rows', () => {
  const shell = createShell(['插件', '定时任务'])
  const store = createSettingsStore(DEFAULT_SETTINGS)
  const dispose = installDedupe(fakeContext([]), store, { document: shell.document })

  assert.equal(shell.document.documentElement.getAttribute(DEDUPE_FLAGS.brand), '')
  assert.equal(shell.brand.getAttribute(DEDUPE_MARKS.brand), '')
  assert.equal(shell.brand.getAttribute('tabindex'), '-1')
  assert.equal(shell.brand.getAttribute('aria-disabled'), 'true')
  // The collapse toggle shares the logo row and must keep its own behavior.
  assert.equal(shell.toggle.getAttribute(DEDUPE_MARKS.brand), null)
  assert.equal(shell.toggle.getAttribute('tabindex'), null)
  // The New Session row keeps working: it is the single door that remains.
  assert.equal(shell.newRow.getAttribute(DEDUPE_MARKS.brand), null)

  assert.equal(shell.entries[0].getAttribute(DEDUPE_MARKS.entry), '')
  assert.equal(shell.entries[0].children[1].getAttribute(DEDUPE_MARKS.unpin), '')
  // The brand button's copy-version child stays addressable; the stylesheet
  // re-enables pointer events for it by attribute.
  assert.equal(shell.brand.children[0].getAttribute('data-copy-version'), '1.2.0')

  dispose()
  assert.equal(shell.document.documentElement.getAttribute(DEDUPE_FLAGS.brand), null)
  assert.equal(shell.brand.getAttribute(DEDUPE_MARKS.brand), null)
  assert.equal(shell.brand.getAttribute('tabindex'), null)
  assert.equal(shell.brand.getAttribute('aria-disabled'), null)
  assert.equal(shell.entries[0].getAttribute(DEDUPE_MARKS.entry), null)
  assert.equal(shell.entries[0].children[1].getAttribute(DEDUPE_MARKS.unpin), null)
})

test('installDedupe ranks the rail and keeps the More anchor last', () => {
  const shell = createShell(['插件', '安全检测', '设计台'])
  const store = createSettingsStore(DEFAULT_SETTINGS)
  const entries = railEntries([
    { id: 'dsh-design-studio', order: 24, label: '设计台' },
    { id: 'dsh-security-selftest', order: 24, label: '安全检测' },
    { id: 'plugins', order: 0, label: '插件' },
  ])
  const dispose = installDedupe(fakeContext(entries), store, { document: shell.document })

  // Ranks follow (order, id): 插件 0 < 设计台 1 < 安全检测 2, while the More
  // anchor is pushed past every panel so it stays the last row.
  assert.deepEqual(shell.nav.children.map(child => child.style.order), ['0', '2', '1', String(DEDUPE_TAIL_RANK)])
  assert.equal(shell.document.documentElement.getAttribute(DEDUPE_FLAGS.order), '')

  dispose()
  assert.deepEqual(shell.nav.children.map(child => child.style.order), ['', '', '', ''])
})

test('installDedupe leaves the rail alone when entries are unreadable', () => {
  const shell = createShell(['插件', '安全检测'])
  const store = createSettingsStore(DEFAULT_SETTINGS)
  const dispose = installDedupe({ slots: {} }, store, { document: shell.document })
  // No entries means no rank to apply: the rows keep the Host's own order.
  assert.deepEqual(shell.nav.children.map(child => child.style.order), ['', '', ''])
  assert.equal(shell.brand.getAttribute(DEDUPE_MARKS.brand), '')
  dispose()
  assert.deepEqual(shell.nav.children.map(child => child.style.order), ['', '', ''])
})

test('installDedupe reacts to settings and to the master switch', () => {
  const shell = createShell(['插件', '安全检测'])
  const store = createSettingsStore(DEFAULT_SETTINGS)
  const dispose = installDedupe(fakeContext(railEntries([
    { id: 'a', order: 1, label: '插件' },
    { id: 'b', order: 2, label: '安全检测' },
  ])), store, { document: shell.document })

  store.set({ dedupeBrand: false })
  assert.equal(shell.document.documentElement.getAttribute(DEDUPE_FLAGS.brand), null)
  assert.equal(shell.brand.getAttribute(DEDUPE_MARKS.brand), null)

  store.set({ stablePanels: false })
  assert.equal(shell.document.documentElement.getAttribute(DEDUPE_FLAGS.order), null)
  assert.deepEqual(shell.nav.children.map(child => child.style.order), ['', '', ''])

  store.set({ enabled: false })
  for (const flag of Object.values(DEDUPE_FLAGS)) {
    assert.equal(shell.document.documentElement.getAttribute(flag), null)
  }

  store.set({ enabled: true })
  assert.equal(shell.document.documentElement.getAttribute(DEDUPE_FLAGS.unpin), '')
  dispose()
})

test('installDedupe is a no-op without a document and never throws on odd hosts', () => {
  assert.equal(typeof installDedupe({}, createSettingsStore(DEFAULT_SETTINGS), {}), 'function')
  const bare = { documentElement: createNode('html', {}, []), body: createNode('body', {}, []) }
  const dispose = installDedupe({ slots: { entriesOfSlot() { throw new Error('nope') } } }, createSettingsStore(DEFAULT_SETTINGS), { document: bare })
  dispose()
  const shell = createShell(['插件'])
  const disposeBroken = installDedupe({ slots: { entriesOfSlot() { throw new Error('nope') } } }, createSettingsStore(DEFAULT_SETTINGS), {
    document: { documentElement: shell.document.documentElement, body: null, querySelector: () => null, querySelectorAll: () => [] },
  })
  disposeBroken()
})

test('installDedupe follows host re-renders through the mutation observer', async () => {
  const shell = createShell(['插件'])
  const store = createSettingsStore(DEFAULT_SETTINGS)
  const observed = []
  const queue = []
  let fire
  class FakeObserver {
    constructor(callback) {
      fire = callback
    }
    observe(target, options) {
      observed.push({ target, options })
    }
    disconnect() {
      observed.push({ disconnected: true })
    }
  }
  const flush = async function () {
    while (queue.length > 0) queue.shift()()
    await new Promise(resolve => setTimeout(resolve, 0))
  }
  const dispose = installDedupe(fakeContext(railEntries([
    { id: 'a', order: 1, label: '插件' },
    { id: 'b', order: 2, label: '安全检测' },
  ])), store, {
    document: shell.document,
    MutationObserver: FakeObserver,
    // Real animation frames run after the callback returns, so the queue keeps them.
    window: { requestAnimationFrame: (fn) => queue.push(fn), cancelAnimationFrame: () => {} },
  })
  assert.equal(observed[0].target, shell.document.body)
  assert.equal(observed[0].options.subtree, true)

  // The Host re-renders a new panel row; one observer flush re-marks it.
  const row = createNode('button', { 'aria-label': '安全检测' }, [])
  const unpin = createNode('button', { 'aria-label': '取消固定 安全检测' }, [])
  const fresh = createNode('div', {}, [row, unpin])
  shell.nav.children.push(fresh)
  fire()
  await flush()
  assert.equal(fresh.getAttribute(DEDUPE_MARKS.entry), '')
  assert.equal(unpin.getAttribute(DEDUPE_MARKS.unpin), '')
  assert.equal(fresh.style.order, '1')

  // Many mutations inside one frame collapse into a single pass.
  fire()
  fire()
  fire()
  assert.equal(queue.length, 1)
  await flush()
  dispose()
  assert.equal(observed[observed.length - 1].disconnected, true)
})

test('shell de-duplication settings default on and survive a round trip', () => {
  for (const key of ['dedupeBrand', 'dedupeGlyphs', 'dedupeUnpin', 'stablePanels']) {
    assert.equal(DEFAULT_SETTINGS[key], true)
    assert.equal(normalizeSettings({})[key], true)
    assert.equal(normalizeSettings({ [key]: false })[key], false)
    assert.equal(normalizeSettings({ [key]: 'off' })[key], true)
  }
})

test('fakeSlots mirrors the host registration surface used by the bundle', () => {
  const slots = fakeSlots([])
  slots.inject('conversation.input.dock', () => slots.register({ name: 'conversation.input.dock', id: 'x' }, null))
  assert.equal(slots.registered.length, 1)
  assert.equal(slots.registered[0].id, 'x')
})
