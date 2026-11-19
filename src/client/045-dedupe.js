/**
 * dsh-claude-mode — Shell de-duplication layer.
 *
 * The Host ships a few controls twice: the sidebar brand row is itself a New
 * Session button beside the real New Session row, the right column reuses the
 * left rail's collapse glyph (mirrored), every panel row keeps a permanent
 * unpin button next to the pin switch in the More menu, and the panel rail is
 * sorted by `order` alone, so plugins that registered the same number swap
 * places whenever registration order changes.
 *
 * This layer observes the composed shell through the DOM the Host already
 * publishes and narrows each duplicate to one door. It writes only:
 *
 *   - `data-ccm-*` flags on `<html>` (the stylesheet keys off them),
 *   - `data-ccm-*` marks and `tabindex` on the brand row,
 *   - `style.order` on the panel rail's children,
 *
 * and restores every one of them when the setting turns off or the plugin
 * unloads. Nothing is removed from the tree, so the Host's own React state,
 * tooltips and keyboard paths stay authoritative.
 */

/** `<html>` flag per rule; the stylesheet section keys off these. */
export const DEDUPE_FLAGS = Object.freeze({
  brand: 'data-ccm-dedupe-brand',
  glyphs: 'data-ccm-dedupe-glyphs',
  unpin: 'data-ccm-dedupe-unpin',
  order: 'data-ccm-dedupe-order',
})

/** Marks this layer writes onto Host nodes. */
export const DEDUPE_MARKS = Object.freeze({
  brand: 'data-ccm-brand-quiet',
  entry: 'data-ccm-panel-entry',
  unpin: 'data-ccm-quiet-unpin',
})

/** Rank handed to rail children that are not a known panel (the More anchor). */
export const DEDUPE_TAIL_RANK = 1000

/** Resolve a slot label, which may be a thunk the owner resolves per render. */
export function resolvePanelLabel(label) {
  try {
    const value = typeof label === 'function' ? label() : label
    return typeof value === 'string' ? value : ''
  } catch {
    return ''
  }
}

/**
 * planPanelOrder — a deterministic rank per panel, keyed by visible label.
 *
 * The Host sorts by `order` and keeps registration order for ties, which is
 * not stable across restarts. Ties break by panel id here, so the rail shows
 * the same order every launch. Entries without an id or a resolvable label
 * are skipped: a rail row can only be matched back to its entry by label.
 *
 * @param entries - `ctx.slots.entriesOfSlot('sidebar.panellist')` rows.
 * @returns `{ rows, ranks, tieGroups }` — sorted rows, label→rank, tied id groups.
 */
export function planPanelOrder(entries) {
  const list = Array.isArray(entries) ? entries : []
  const rows = []
  for (let index = 0; index < list.length; index += 1) {
    const entry = list[index]
    const options = entry && typeof entry === 'object' && entry.options ? entry.options : entry
    if (!options || typeof options !== 'object') continue
    const id = typeof options.id === 'string' ? options.id : ''
    const label = resolvePanelLabel(options.label)
    if (id === '' || label === '') continue
    rows.push({
      id,
      label,
      order: typeof options.order === 'number' ? options.order : 0,
      index,
    })
  }
  rows.sort(function (a, b) {
    if (a.order !== b.order) return a.order - b.order
    if (a.id !== b.id) return a.id < b.id ? -1 : 1
    return a.index - b.index
  })
  const ranks = {}
  const byOrder = new Map()
  for (let rank = 0; rank < rows.length; rank += 1) {
    const row = rows[rank]
    ranks[row.label] = rank
    const bucket = byOrder.get(row.order)
    if (bucket === undefined) byOrder.set(row.order, [row.id])
    else bucket.push(row.id)
  }
  const tieGroups = []
  for (const [order, ids] of byOrder) {
    if (ids.length > 1) tieGroups.push({ order, ids })
  }
  return { rows, ranks, tieGroups }
}

/** Accessible name of a rail child, whether it is the row button or a wrapper. */
function rowLabel(node) {
  if (!node || typeof node.getAttribute !== 'function') return ''
  const own = node.getAttribute('aria-label')
  if (own) return own
  if (typeof node.querySelector !== 'function') return ''
  const inner = node.querySelector('button[aria-label]')
  return inner && typeof inner.getAttribute === 'function' ? inner.getAttribute('aria-label') || '' : ''
}

/** Every `nav` on the page, as an array (older hosts may lack `Array.from` support paths). */
function pageNavs(doc) {
  try {
    const found = typeof doc.querySelectorAll === 'function' ? doc.querySelectorAll('nav') : []
    return Array.from(found || [])
  } catch {
    return []
  }
}

/**
 * The panel rail is the one nav whose last row opens a menu; nothing else in
 * the shell pairs a nav (panel rows) with an `aria-haspopup` launcher.
 */
function panelRail(nav) {
  try {
    if (typeof nav.querySelector !== 'function') return undefined
    return nav.querySelector('button[aria-haspopup="menu"]') ? nav : undefined
  } catch {
    return undefined
  }
}

/**
 * Narrow the sidebar brand row to a display surface.
 *
 * On desktop Windows the logo row holds the brand button and the collapse
 * toggle; macOS keeps the brand inert already, and the collapsed rail renders
 * no brand at all. The button stays in the tree so the product name and the
 * copy-version affordance survive — the stylesheet only takes its
 * `pointer-events` away and gives them back to `[data-copy-version]`, while
 * `aria-disabled` tells assistive tech the row no longer acts.
 */
function applyBrand(doc, enabled, saved) {
  try {
    const toggle = typeof doc.querySelector === 'function' ? doc.querySelector('[data-sidebar-toggle]') : null
    if (!toggle || typeof toggle.closest !== 'function') return
    const row = toggle.closest('[data-window-drag]')
    if (!row || typeof row.querySelectorAll !== 'function') return
    for (const button of Array.from(row.querySelectorAll('button') || [])) {
      if (button === toggle) continue
      if (enabled) {
        if (!saved.has(button)) {
          saved.set(button, {
            tabindex: button.getAttribute('tabindex'),
            ariaDisabled: button.getAttribute('aria-disabled'),
          })
        }
        button.setAttribute(DEDUPE_MARKS.brand, '')
        button.setAttribute('tabindex', '-1')
        button.setAttribute('aria-disabled', 'true')
      } else if (saved.has(button)) {
        button.removeAttribute(DEDUPE_MARKS.brand)
        const previous = saved.get(button)
        if (previous.tabindex === null || previous.tabindex === undefined) button.removeAttribute('tabindex')
        else button.setAttribute('tabindex', previous.tabindex)
        if (previous.ariaDisabled === null || previous.ariaDisabled === undefined) button.removeAttribute('aria-disabled')
        else button.setAttribute('aria-disabled', previous.ariaDisabled)
        saved.delete(button)
      }
    }
  } catch {
    /* a host that re-renders mid-pass is not an error */
  }
}

/**
 * Mark panel rows and their unpin buttons, so the stylesheet can reveal the
 * unpin control on row hover instead of showing two buttons per row.
 */
function applyUnpinMarks(doc, enabled) {
  for (const nav of pageNavs(doc)) {
    if (panelRail(nav) === undefined) continue
    const kids = Array.from(nav.children || [])
    for (const kid of kids) {
      if (!kid || typeof kid.querySelectorAll !== 'function') continue
      const buttons = Array.from(kid.querySelectorAll('button') || [])
      if (buttons.length !== 2) {
        if (typeof kid.removeAttribute === 'function') {
          kid.removeAttribute(DEDUPE_MARKS.entry)
          buttons[0] && typeof buttons[0].removeAttribute === 'function' && buttons[0].removeAttribute(DEDUPE_MARKS.unpin)
        }
        continue
      }
      if (enabled) {
        kid.setAttribute(DEDUPE_MARKS.entry, '')
        buttons[1].setAttribute(DEDUPE_MARKS.unpin, '')
      } else {
        kid.removeAttribute(DEDUPE_MARKS.entry)
        buttons[1].removeAttribute(DEDUPE_MARKS.unpin)
      }
    }
  }
}

/** Read the panel entries the Host registered for the left rail. */
function readPanelRanks(ctx) {
  try {
    const slots = ctx && ctx.slots
    if (!slots || typeof slots.entriesOfSlot !== 'function') return undefined
    const plan = planPanelOrder(slots.entriesOfSlot('sidebar.panellist'))
    return plan.rows.length > 1 ? plan.ranks : undefined
  } catch {
    return undefined
  }
}

/**
 * Apply the planned rank to each rail child.
 *
 * `style.order` is the only handle the Host leaves on a rail row besides its
 * accessible name, and `.panelList` is a flex column, so the value lands where
 * the sort would have. Unknown rows (the More anchor) go last.
 */
function applyOrder(doc, ranks, saved) {
  for (const nav of pageNavs(doc)) {
    if (panelRail(nav) === undefined) continue
    for (const kid of Array.from(nav.children || [])) {
      if (!kid || !kid.style) continue
      const label = rowLabel(kid)
      const rank = ranks !== undefined && Object.prototype.hasOwnProperty.call(ranks, label)
        ? ranks[label]
        : DEDUPE_TAIL_RANK
      if (!saved.has(kid)) saved.set(kid, kid.style.order || '')
      kid.style.order = String(rank)
    }
  }
}

/** Put every rail child back where the Host rendered it. */
function restoreOrder(doc, saved) {
  for (const nav of pageNavs(doc)) {
    for (const kid of Array.from(nav.children || [])) {
      if (!kid || !kid.style || !saved.has(kid)) continue
      const previous = saved.get(kid)
      kid.style.order = previous === undefined ? '' : previous
      saved.delete(kid)
    }
  }
}

/**
 * installDedupe — bind the layer to the settings store and the composed shell.
 *
 * @param ctx - restricted Cordis client context (`ctx.slots` reads the rail entries).
 * @param store - the plugin settings store.
 * @param deps - optional `{ document, window }` for tests.
 * @returns disposer that removes the flags, marks and inline order.
 */
export function installDedupe(ctx, store, deps) {
  const doc = (deps && deps.document) || (typeof document !== 'undefined' ? document : undefined)
  const win = (deps && deps.window) || (typeof window !== 'undefined' ? window : undefined)
  if (!doc || !doc.documentElement) return function () {}

  const brandSaved = new WeakMap()
  const orderSaved = new WeakMap()
  const observerApi = deps && deps.MutationObserver ? deps.MutationObserver
    : win && typeof win.MutationObserver === 'function' ? win.MutationObserver
      : typeof MutationObserver === 'function' ? MutationObserver : undefined
  const raf = win && typeof win.requestAnimationFrame === 'function'
    ? function (fn) { return win.requestAnimationFrame(fn) }
    : function (fn) { return setTimeout(fn, 16) }
  const cancelRaf = win && typeof win.cancelAnimationFrame === 'function'
    ? function (id) { win.cancelAnimationFrame(id) }
    : function (id) { clearTimeout(id) }

  let scheduled
  let disposed = false

  function sync() {
    if (disposed) return
    let settings
    try {
      settings = store.get()
    } catch {
      settings = undefined
    }
    const active = !settings || settings.enabled !== false
    const brand = active && (!settings || settings.dedupeBrand !== false)
    const glyphs = active && (!settings || settings.dedupeGlyphs !== false)
    const unpin = active && (!settings || settings.dedupeUnpin !== false)
    const order = active && (!settings || settings.stablePanels !== false)
    const root = doc.documentElement
    try {
      for (const [flag, on] of [
        [DEDUPE_FLAGS.brand, brand],
        [DEDUPE_FLAGS.glyphs, glyphs],
        [DEDUPE_FLAGS.unpin, unpin],
        [DEDUPE_FLAGS.order, order],
      ]) {
        if (on) root.setAttribute(flag, '')
        else root.removeAttribute(flag)
      }
    } catch {
      /* a locked-down document keeps the previous flags */
    }
    applyBrand(doc, brand, brandSaved)
    applyUnpinMarks(doc, unpin)
    if (order) {
      const ranks = readPanelRanks(ctx)
      if (ranks === undefined) restoreOrder(doc, orderSaved)
      else applyOrder(doc, ranks, orderSaved)
    } else {
      restoreOrder(doc, orderSaved)
    }
  }

  function schedule() {
    if (disposed || scheduled !== undefined) return
    scheduled = raf(function () {
      scheduled = undefined
      sync()
    })
  }

  let observer
  try {
    const body = doc.body
    if (observerApi && body) {
      observer = new observerApi(schedule)
      observer.observe(body, { childList: true, subtree: true })
    }
  } catch {
    observer = undefined
  }

  let unsubscribe
  try {
    /* Settings land straight away: a toggle must not wait for a frame. */
    unsubscribe = typeof store.subscribe === 'function' ? store.subscribe(sync) : undefined
  } catch {
    unsubscribe = undefined
  }

  sync()

  return function dispose() {
    if (disposed) return
    disposed = true
    if (scheduled !== undefined) {
      cancelRaf(scheduled)
      scheduled = undefined
    }
    if (observer) {
      try {
        observer.disconnect()
      } catch {
        /* already disconnected */
      }
    }
    if (typeof unsubscribe === 'function') {
      try {
        unsubscribe()
      } catch {
        /* the store may already be gone */
      }
    }
    try {
      for (const flag of Object.values(DEDUPE_FLAGS)) doc.documentElement.removeAttribute(flag)
    } catch {
      /* ignore */
    }
    applyBrand(doc, false, brandSaved)
    applyUnpinMarks(doc, false)
    restoreOrder(doc, orderSaved)
  }
}
