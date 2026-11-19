import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createContext, runInContext } from 'node:vm'

import { createShell, fakeSlots, railEntries } from '../helpers/mini-dom.mjs'

const BUNDLE = readFileSync(new URL('../../client.js', import.meta.url), 'utf8')
const PACKAGE = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8'))

/** Minimal React: nothing renders in these tests, only registration runs. */
const React = {
  createElement: () => null,
  useState: () => [undefined, () => {}],
  useEffect: () => {},
  useMemo: () => undefined,
  useCallback: (fn) => fn,
  useRef: () => ({ current: undefined }),
  useContext: () => ({}),
  createContext: () => ({}),
  memo: (component) => component,
  Fragment: {},
}

/**
 * Execute the shipped bundle the way the Host does, then apply it against a
 * composed shell. This is the artifact-level check: it proves the generated
 * `client.js` — not just the sources — loads, resolves `installDedupe` from the
 * concatenated scope, registers through the slot surface, and reaches the DOM.
 */
function loadBundle(shell, entries) {
  const messages = []
  const effects = []
  const slots = fakeSlots(entries || railEntries([
    { id: 'dsh-design-studio', order: 24, label: '设计台' },
    { id: 'dsh-security-selftest', order: 24, label: '安全检测' },
    { id: 'plugins', order: 0, label: '插件' },
  ]))
  const storage = new Map()
  const sandbox = {
    console: {
      log: (...args) => messages.push(['log', ...args]),
      warn: (...args) => messages.push(['warn', ...args]),
      error: (...args) => messages.push(['error', ...args]),
      info: (...args) => messages.push(['info', ...args]),
      debug: (...args) => messages.push(['debug', ...args]),
    },
    document: shell.document,
    localStorage: {
      getItem: (key) => (storage.has(key) ? storage.get(key) : null),
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key),
    },
    navigator: { language: 'zh-CN', languages: ['zh-CN'] },
    matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
    requestAnimationFrame: (fn) => { fn(); return 1 },
    cancelAnimationFrame: () => {},
    setTimeout,
    clearTimeout,
    __entries: [],
  }
  const context = createContext(sandbox)
  sandbox.window = {
    __ModuleLoader__: {
      load(entry) {
        sandbox.__entries.push(entry)
      },
    },
    matchMedia: sandbox.matchMedia,
    requestAnimationFrame: sandbox.requestAnimationFrame,
    cancelAnimationFrame: sandbox.cancelAnimationFrame,
    setTimeout,
    clearTimeout,
    document: shell.document,
    navigator: sandbox.navigator,
    console: sandbox.console,
  }
  runInContext(BUNDLE, context, { filename: 'client.js' })

  const entry = sandbox.__entries[0]
  assert.ok(entry, 'the bundle registers itself with the module loader')
  assert.equal(entry.id, 'dsh-claude-mode')

  const module = entry.factory((specifier) => {
    assert.equal(specifier, 'react')
    return React
  })
  assert.deepEqual(Array.from(module.inject), ['slots', 'locale', 'sessions', 'theme'])

  const ctx = {
    slots,
    effect(fn) {
      const dispose = fn()
      if (typeof dispose === 'function') effects.push(dispose)
      return () => { dispose && dispose() }
    },
    get(name) {
      if (name === 'theme') {
        return {
          overrideTokens: () => () => {},
          setTheme: () => {},
          getTheme: () => 'system',
        }
      }
      return undefined
    },
    locale: {
      register: () => () => {},
      bind: () => (key, params) => (params ? key + ':' + JSON.stringify(params) : key),
      getLocale: () => ({ active: 'zh-CN' }),
    },
  }
  module.apply(ctx)
  return { messages, effects, slots, storage }
}

test('the shipped bundle applies and narrows the composed shell', () => {
  const shell = createShell(['插件', '安全检测', '设计台'])
  const { messages, effects, slots } = loadBundle(shell)

  // No host-contract failure may be swallowed at apply time.
  assert.deepEqual(messages, [], 'apply must not log warnings or errors')
  assert.ok(effects.length >= 3, 'locale, theme and shell effects are owned and disposable')

  // Shell de-duplication reached the DOM through the real bundle.
  assert.equal(shell.document.documentElement.getAttribute('data-ccm-dedupe-brand'), '')
  assert.equal(shell.document.documentElement.getAttribute('data-ccm-dedupe-glyphs'), '')
  assert.equal(shell.document.documentElement.getAttribute('data-ccm-dedupe-unpin'), '')
  assert.equal(shell.document.documentElement.getAttribute('data-ccm-dedupe-order'), '')
  assert.equal(shell.brand.getAttribute('data-ccm-brand-quiet'), '')
  assert.equal(shell.brand.getAttribute('tabindex'), '-1')
  assert.equal(shell.brand.getAttribute('aria-disabled'), 'true')
  assert.deepEqual(shell.nav.children.map(child => child.style.order), ['0', '2', '1', '1000'])

  // Every documented slot seat is filled by the generated bundle.
  const seats = slots.registered.map(row => row.name + '#' + row.id)
  for (const expected of [
    'conversation.input.dock#claude-mode.runbar',
    'conversation.input.overlay#claude-mode.ghost',
    'conversation.session.header.utilities#claude-mode.header',
    'conversation.chat.assistant-actions#claude-mode.read-aloud',
    'sidebar.footer.action#claude-mode.pinned',
    'conversation.chat.turnTail#claude-mode.turn-footer',
    'settings.section#claude-mode',
    'settings.section.icon#claude-mode',
  ]) {
    assert.ok(seats.includes(expected), 'missing slot seat: ' + expected)
  }
})

test('the bundle reports its own version and clears the shell on dispose', () => {
  const shell = createShell(['插件', '安全检测'])
  const { effects } = loadBundle(shell)
  assert.equal(shell.document.documentElement.getAttribute('data-ccm-dedupe-brand'), '')
  for (const dispose of effects) dispose()
  // Disposing every effect restores the Host surface.
  for (const flag of ['data-ccm-dedupe-brand', 'data-ccm-dedupe-glyphs', 'data-ccm-dedupe-unpin', 'data-ccm-dedupe-order']) {
    assert.equal(shell.document.documentElement.getAttribute(flag), null, 'flag left behind: ' + flag)
  }
  assert.equal(shell.brand.getAttribute('data-ccm-brand-quiet'), null)
  assert.deepEqual(shell.nav.children.map(child => child.style.order), ['', '', ''])
})

test('the bundle ships the current version and survives a host without rail entries', () => {
  const shell = createShell([])
  const { messages } = loadBundle(shell, [])
  assert.deepEqual(messages, [])
  // No entries means no ranks: the Host's own order is left alone.
  assert.deepEqual(shell.nav.children.map(child => child.style.order), [''])
  assert.ok(BUNDLE.includes("VERSION = '" + PACKAGE.version + "'"), 'client bundle version matches package.json')
})
