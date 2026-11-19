/**
 * A DOM small enough to read, faithful enough to matter.
 *
 * The selectors the shell layer uses are the ones the Host's own markup
 * answers: `nav`, `[data-*]`, `button[aria-label]`, `button[aria-haspopup="menu"]`.
 * `matchSimple` implements exactly that vocabulary and throws on anything else,
 * so a selector that drifts past the Host contract fails loudly in tests
 * instead of silently matching nothing in the app.
 */

/** Walk descendants (child elements only). */
export function walk(node, visit) {
  for (const child of node.children) {
    visit(child)
    walk(child, visit)
  }
}

/** Mirror of the selector shapes `createNode().querySelector` accepts. */
export function matchSimple(node, selector) {
  const parsed = /^([a-zA-Z]*)(?:\[([a-zA-Z-]+)(?:="([^"]*)")?\])?$/.exec(String(selector).trim())
  if (!parsed) throw new Error('unsupported selector in test DOM: ' + selector)
  const [, tag, attr, value] = parsed
  if (tag && node.tagName !== tag.toUpperCase()) return false
  if (attr === undefined) return true
  if (!Object.prototype.hasOwnProperty.call(node.attributes, attr)) return false
  if (value === undefined) return true
  return node.attributes[attr] === value
}

/** Create one element with attribute, style and selector support. */
export function createNode(tag, attrs, children) {
  const node = {
    tagName: tag.toUpperCase(),
    attributes: { ...(attrs || {}) },
    children: [],
    parent: undefined,
    style: { order: '' },
    getAttribute(name) { return Object.prototype.hasOwnProperty.call(this.attributes, name) ? this.attributes[name] : null },
    setAttribute(name, value) { this.attributes[name] = String(value) },
    removeAttribute(name) { delete this.attributes[name] },
    matches(selector) { return matchSimple(this, selector) },
    closest(selector) {
      let current = this
      while (current) {
        if (matchSimple(current, selector)) return current
        current = current.parent
      }
      return null
    },
    querySelectorAll(selector) {
      const found = []
      walk(this, function (candidate) {
        if (matchSimple(candidate, selector)) found.push(candidate)
      })
      return found
    },
    querySelector(selector) {
      const found = this.querySelectorAll(selector)
      return found.length > 0 ? found[0] : null
    },
  }
  for (const child of children || []) {
    child.parent = node
    node.children.push(child)
  }
  return node
}

/** `<button>` shorthand. */
export function button(attrs, children) {
  return createNode('button', attrs, children)
}

/**
 * The composed left shell, as the Host renders it: a brand row (the window
 * drag surface holding the brand button and the collapse toggle), a New
 * Session row, and a panel nav whose rows each carry an unpin button plus a
 * trailing More anchor.
 *
 * @param labels - visible panel labels in Host render order.
 */
export function createShell(labels) {
  const documentElement = createNode('html', {}, [])
  const brand = button({ 'aria-label': '新建会话' }, [createNode('span', { 'data-copy-version': '1.2.0' }, [])])
  const toggle = button({ 'data-sidebar-toggle': '', 'aria-label': '收起侧边栏' }, [])
  const logoRow = createNode('div', { 'data-window-drag': '' }, [brand, toggle])
  const newRow = button({ 'aria-label': '新建会话' }, [])
  const entries = labels.map(function (label) {
    const row = button({ 'aria-label': label }, [])
    const unpin = button({ 'aria-label': '取消固定 ' + label }, [])
    return createNode('div', {}, [row, unpin])
  })
  const more = button({ 'aria-label': '更多', 'aria-haspopup': 'menu' }, [])
  const nav = createNode('nav', {}, entries.concat([more]))
  const regionArea = createNode('div', { class: '' }, [])
  const column = createNode('div', { class: 'sidebarCol' }, [
    createNode('div', {}, [logoRow, newRow, nav, regionArea]),
  ])
  const body = createNode('body', {}, [column])
  const document = {
    documentElement,
    body,
    querySelector(selector) { return body.querySelector(selector) },
    querySelectorAll(selector) { return body.querySelectorAll(selector) },
  }
  return { document, column, logoRow, brand, toggle, newRow, nav, entries, more }
}

/** Entries shaped like `ctx.slots.entriesOfSlot('sidebar.panellist')`. */
export function railEntries(rows) {
  return rows.map(function (row) {
    return { options: { id: row.id, order: row.order, label: () => row.label } }
  })
}

/** `ctx.slots` stub that answers one slot key with fixed entries. */
export function fakeSlots(entries) {
  const registered = []
  return {
    registered,
    entriesOfSlot(key) { return key === 'sidebar.panellist' ? entries : [] },
    inject(key, callback) {
      callback()
    },
    register(options, component) {
      registered.push({ name: options && options.name, id: options && options.id, order: options && options.order, component })
    },
  }
}
