/* Boot the shipped bundle against the fixture shell and publish a snapshot API
   the acceptance driver reads over CDP (browser_evaluate). */
;(function () {
  'use strict'

  /* A React small enough to render the one component this acceptance needs:
     the always-mounted overlay that carries the plugin stylesheet. Anything
     the Host would render through its own renderer is not exercised here. */
  function renderNode(node, container) {
    if (node === null || node === undefined || node === false || node === true) return
    if (Array.isArray(node)) { node.forEach(function (child) { renderNode(child, container) }); return }
    if (typeof node === 'string' || typeof node === 'number') { container.appendChild(document.createTextNode(String(node))); return }
    if (typeof node.type === 'function') { renderNode(node.type(node.props || {}), container); return }
    if (typeof node.type !== 'string') return
    var element = document.createElement(node.type)
    var props = node.props || {}
    Object.keys(props).forEach(function (key) {
      var value = props[key]
      if (key === 'dangerouslySetInnerHTML') { element.innerHTML = String((value && value.__html) || ''); return }
      if (key === 'children' || value === undefined || value === null) return
      if (typeof value === 'function' || typeof value === 'object' && key !== 'style') return
      if (key === 'style') { Object.assign(element.style, value); return }
      if (key === 'className') { element.className = String(value); return }
      element.setAttribute(key, String(value))
    })
    var children = props.children
    if (children !== undefined) renderNode(children, element)
    container.appendChild(element)
  }

  var React = {
    createElement: function (type, props) {
      var children = Array.prototype.slice.call(arguments, 2)
      return { type: type, props: Object.assign({}, props, { children: children.length === 1 ? children[0] : children }) }
    },
    useState: function () { return [undefined, function () {}] },
    useEffect: function () {},
    useMemo: function () { return undefined },
    useCallback: function (fn) { return fn },
    useRef: function () { return { current: undefined } },
    useContext: function () { return {} },
    createContext: function () { return {} },
    createContext2: function () { return {} },
    memo: function (component) { return component },
    Fragment: 'div',
  }

  var tests = window.__CCM_TESTS__
  var entry = tests.entry
  var registered = []
  var effects = []

  /* Entries as the Host registers them: two plugins share order 24, and the
     registration order below is the reverse of the ids' alphabetical order, so
     a stable rail cannot be reached by registration order alone. */
  var entries = [
    { options: { id: 'dsh-security-selftest', order: 24, label: function () { return '安全检测' } } },
    { options: { id: 'dsh-design-studio', order: 24, label: function () { return '设计台' } } },
    { options: { id: 'plugins', order: 0, label: function () { return '插件' } } },
  ]

  var slots = {
    entriesOfSlot: function (key) { return key === 'sidebar.panellist' ? entries : [] },
    inject: function (key, callback) { callback() },
    register: function (options, component) {
      registered.push({ name: options && options.name, id: options && options.id, order: options && options.order, component: component })
    },
  }

  function describe(node) {
    if (!node) return 'null'
    if (node.id) return '#' + node.id
    var label = node.getAttribute && node.getAttribute('aria-label')
    return node.tagName.toLowerCase() + (label ? '["' + label + '"]' : '')
  }

  function rowLabel(node) {
    if (!node) return ''
    var own = node.getAttribute('aria-label')
    if (own) return own
    var inner = node.querySelector ? node.querySelector('button[aria-label]') : null
    return inner ? inner.getAttribute('aria-label') || '' : ''
  }

  function attribute(name) {
    return document.documentElement.getAttribute(name)
  }

  function snapshot() {
    var brand = document.getElementById('brand')
    var copy = document.getElementById('copyVersion')
    var rail = document.getElementById('panelList')
    var kids = Array.prototype.slice.call(rail.children)
    var brandRect = brand.getBoundingClientRect()
    var copyRect = copy.getBoundingClientRect()
    return {
      flags: {
        brand: attribute('data-ccm-dedupe-brand'),
        glyphs: attribute('data-ccm-dedupe-glyphs'),
        unpin: attribute('data-ccm-dedupe-unpin'),
        order: attribute('data-ccm-dedupe-order'),
      },
      brand: {
        mark: brand.getAttribute('data-ccm-brand-quiet'),
        tabindex: brand.getAttribute('tabindex'),
        ariaDisabled: brand.getAttribute('aria-disabled'),
        pointerEvents: getComputedStyle(brand).pointerEvents,
        cursor: getComputedStyle(brand).cursor,
      },
      copy: {
        pointerEvents: getComputedStyle(copy).pointerEvents,
        cursor: getComputedStyle(copy).cursor,
      },
      hitTest: {
        brandCenter: describe(document.elementFromPoint(brandRect.left + 14, brandRect.top + brandRect.height / 2)),
        copyCenter: describe(document.elementFromPoint(copyRect.left + copyRect.width / 2, copyRect.top + copyRect.height / 2)),
      },
      rows: kids.map(function (kid) {
        return {
          label: rowLabel(kid),
          entryMark: kid.getAttribute('data-ccm-panel-entry'),
          inlineOrder: kid.style.order,
          computedOrder: getComputedStyle(kid).order,
          top: Math.round(kid.getBoundingClientRect().top),
        }
      }),
      visualOrder: kids
        .slice()
        .sort(function (a, b) { return a.getBoundingClientRect().top - b.getBoundingClientRect().top })
        .map(rowLabel),
      unpin: Array.prototype.map.call(document.querySelectorAll('.unpin'), function (button) {
        var style = getComputedStyle(button)
        return {
          label: button.getAttribute('aria-label'),
          mark: button.getAttribute('data-ccm-quiet-unpin'),
          opacity: style.opacity,
          transitionProperty: style.transitionProperty,
          transitionDuration: style.transitionDuration,
          focused: document.activeElement === button,
        }
      }),
      glyphs: {
        leftRail: getComputedStyle(document.querySelector('#railToggle svg')).transform,
        rightExpand: getComputedStyle(document.querySelector('#rightExpand svg')).transform,
        rightToggle: getComputedStyle(document.querySelector('#rightToggle svg')).transform,
      },
      logs: tests.logs.slice(),
      registered: registered.map(function (row) { return row.name + '#' + row.id }),
    }
  }

  var ctx = {
    slots: slots,
    effect: function (fn, label) {
      var dispose = fn()
      if (typeof dispose === 'function') effects.push({ label: String(label || ''), dispose: dispose })
      return function () { if (typeof dispose === 'function') dispose() }
    },
    get: function (name) {
      if (name === 'theme') {
        return { overrideTokens: function () { return function () {} }, setTheme: function () {}, getTheme: function () { return 'system' } }
      }
      return undefined
    },
    locale: {
      register: function () { return function () {} },
      bind: function () {
        return function (key, params) { return params ? key + ':' + JSON.stringify(params) : key }
      },
      getLocale: function () { return { active: 'zh-CN' } },
    },
  }

  var ACC = {
    before: snapshot(),
    after: undefined,
    effectLabels: [],
    snapshot: snapshot,
    disposeAll: function () {
      effects.slice().forEach(function (row) { row.dispose() })
      effects.length = 0
      return snapshot()
    },
    disposeShell: function () {
      for (var index = 0; index < effects.length; index += 1) {
        if (effects[index].label.indexOf('de-duplication') !== -1) {
          effects[index].dispose()
          effects.splice(index, 1)
          break
        }
      }
      return snapshot()
    },
    report: function () {
      var after = ACC.after || snapshot()
      return [
        'flags          ' + JSON.stringify(after.flags),
        'brand          pe=' + after.brand.pointerEvents + ' tabindex=' + after.brand.tabindex + ' aria-disabled=' + after.brand.ariaDisabled,
        'copy-version   pe=' + after.copy.pointerEvents,
        'hit-test       brand→' + after.hitTest.brandCenter + '  copy→' + after.hitTest.copyCenter,
        'rail order     ' + after.visualOrder.join(' → '),
        'inline order   ' + after.rows.map(function (row) { return row.label + '=' + row.inlineOrder }).join(' '),
        'unpin opacity  ' + after.unpin.map(function (row) { return row.opacity }).join(' '),
        'right glyphs   ' + JSON.stringify(after.glyphs),
        'style element  ' + (document.querySelector('style[data-dsh-claude-mode]') ? 'mounted (' + document.querySelector('style[data-dsh-claude-mode]').textContent.length + ' chars)' : 'missing'),
        'logs           ' + JSON.stringify(after.logs),
      ].join('\n')
    },
  }
  window.__ACC__ = ACC

  ACC.effectLabels = effects.map(function (row) { return row.label })
  var module = entry.factory(function () { return React })
  module.apply(ctx)
  ACC.effectLabels = effects.map(function (row) { return row.label })
  ACC.inject = Array.prototype.slice.call(module.inject)

  /* Mount the always-on overlay entry that carries the plugin stylesheet, the
     way the Host would on first paint. */
  ACC.mounted = []
  registered.forEach(function (row) {
    if (row.id !== 'claude-mode.styles' || typeof row.component !== 'function') return
    renderNode(row.component({}), document.head)
    ACC.mounted.push(row.id)
  })

  ACC.after = snapshot()

  /**
   * Self-check, so this harness is repeatable without a test framework: every
   * assertion below is measured by the browser itself (computed style, hit
   * testing, layout positions), not asserted against the code under test.
   * Resolves to `{ pass, checks, failures }`; hover reveal stays a driver step
   * because CSS `:hover` needs a real pointer.
   */
  ACC.verify = async function verify() {
    var wait = function (ms) { return new Promise(function (resolve) { setTimeout(resolve, ms) }) }
    var checks = []
    var failures = []
    var check = function (name, actual, expected) {
      var ok = JSON.stringify(actual) === JSON.stringify(expected)
      checks.push({ name: name, actual: actual, expected: expected, ok: ok })
      if (!ok) failures.push(name + ': ' + JSON.stringify(actual) + ' != ' + JSON.stringify(expected))
    }

    /* The stylesheet transitions opacity for 120ms; read settled values. */
    await wait(240)
    ACC.after = snapshot()

    var root = document.documentElement
    var brand = document.getElementById('brand')
    var copy = document.getElementById('copyVersion')
    var rail = document.getElementById('panelList')

    check('html flag: 品牌去重', root.getAttribute('data-ccm-dedupe-brand'), '')
    check('html flag: 右侧图标', root.getAttribute('data-ccm-dedupe-glyphs'), '')
    check('html flag: 取消固定悬浮', root.getAttribute('data-ccm-dedupe-unpin'), '')
    check('html flag: 面板顺序', root.getAttribute('data-ccm-dedupe-order'), '')

    check('品牌行标记', brand.getAttribute('data-ccm-brand-quiet'), '')
    check('品牌行 tabindex', brand.getAttribute('tabindex'), '-1')
    check('品牌行 aria-disabled', brand.getAttribute('aria-disabled'), 'true')
    check('品牌行 pointer-events', getComputedStyle(brand).pointerEvents, 'none')
    check('版本号 pointer-events', getComputedStyle(copy).pointerEvents, 'auto')

    var brandRect = brand.getBoundingClientRect()
    var copyRect = copy.getBoundingClientRect()
    var atBrand = document.elementFromPoint(brandRect.left + 14, brandRect.top + brandRect.height / 2)
    var atCopy = document.elementFromPoint(copyRect.left + copyRect.width / 2, copyRect.top + copyRect.height / 2)
    check('品牌行命中测试不再命中按钮', atBrand === brand, false)
    check('版本号命中测试仍命中自己', atCopy === copy, true)

    var kids = Array.prototype.slice.call(rail.children)
    check('面板行标记', kids.map(function (kid) { return kid.getAttribute('data-ccm-panel-entry') }), ['', '', '', null])
    check('面板行 order', kids.map(function (kid) { return kid.style.order }), ['0', '2', '1', '1000'])
    check('面板行视觉顺序', kids
      .slice()
      .sort(function (a, b) { return a.getBoundingClientRect().top - b.getBoundingClientRect().top })
      .map(rowLabel), ['插件', '设计台', '安全检测', '更多'])

    check('取消固定标记', Array.prototype.map.call(document.querySelectorAll('.unpin'), function (button) {
      return button.getAttribute('data-ccm-quiet-unpin')
    }), ['', '', ''])

    /* The pointer may be parked on a row by the driver, so the expectation is
       "visible exactly when the row is hovered or the button is focused" —
       measured against the browser's own hover/focus state. */
    var entries = kids.filter(function (kid) { return kid.getAttribute('data-ccm-panel-entry') !== null })
    var rowState = entries.map(function (row) {
      var button = row.querySelector('.unpin')
      return {
        label: rowLabel(row),
        hovered: row.matches(':hover'),
        focused: button.matches(':focus'),
        opacity: getComputedStyle(button).opacity,
      }
    })
    check('至多一行处于悬停', rowState.filter(function (row) { return row.hovered }).length <= 1, true)
    check('取消固定按悬停/聚焦显隐', rowState.map(function (row) { return row.opacity }),
      rowState.map(function (row) { return row.hovered || row.focused ? '1' : '0' }))

    /* Keyboard reach must still reveal the control. */
    var idleRow = entries.filter(function (row) { return !row.matches(':hover') })[0]
    var idleUnpin = idleRow.querySelector('.unpin')
    idleUnpin.focus()
    await wait(240)
    check('取消固定聚焦可见', getComputedStyle(idleUnpin).opacity, '1')
    idleUnpin.blur()
    await wait(240)
    check('取消固定失焦复隐', getComputedStyle(idleUnpin).opacity, '0')

    var rightExpand = document.querySelector('#rightExpand svg')
    var rightToggle = document.querySelector('#rightToggle svg')
    var leftRail = document.querySelector('#railToggle svg')
    check('右栏展开图标旋转 180°', getComputedStyle(rightExpand).transform, 'matrix(-1, 0, 0, -1, 0, 0)')
    check('右栏收起图标旋转 180°', getComputedStyle(rightToggle).transform, 'matrix(-1, 0, 0, -1, 0, 0)')
    check('右栏不再与左栏镜像相同', getComputedStyle(rightExpand).transform !== getComputedStyle(leftRail).transform, true)

    check('插件未记录 warn/error', tests.logs.length, 0)
    check('样式表已挂载', !!document.querySelector('style[data-dsh-claude-mode]'), true)

    /* Unloading must hand the Host surface back untouched. */
    var restored = ACC.disposeShell()
    await wait(240)
    check('卸载后 flags 清空', restored.flags, { brand: null, glyphs: null, unpin: null, order: null })
    check('卸载后品牌行还原', {
      mark: brand.getAttribute('data-ccm-brand-quiet'),
      tabindex: brand.getAttribute('tabindex'),
      ariaDisabled: brand.getAttribute('aria-disabled'),
      pointerEvents: getComputedStyle(brand).pointerEvents,
    }, { mark: null, tabindex: null, ariaDisabled: null, pointerEvents: 'auto' })
    check('卸载后行内 order 清空', kids.map(function (kid) { return kid.style.order }), ['', '', '', ''])
    check('卸载后恢复宿主顺序', kids
      .slice()
      .sort(function (a, b) { return a.getBoundingClientRect().top - b.getBoundingClientRect().top })
      .map(rowLabel), ['插件', '安全检测', '设计台', '更多'])
    check('卸载后取消固定复现', Array.prototype.map.call(document.querySelectorAll('.unpin'), function (button) {
      return getComputedStyle(button).opacity
    }), ['1', '1', '1'])
    check('卸载后图标还原为宿主镜像', getComputedStyle(rightExpand).transform, 'matrix(-1, 0, 0, 1, 0, 0)')

    var verdict = { pass: failures.length === 0, checks: checks, failures: failures }
    document.body.setAttribute('data-acc-verdict', verdict.pass ? 'pass' : 'fail')
    document.getElementById('report').textContent = ACC.report() + '\n\nverdict        ' + (verdict.pass ? 'PASS' : 'FAIL') + ' (' + checks.length + ' checks)'
      + (failures.length ? '\n' + failures.join('\n') : '')
    return verdict
  }

  document.getElementById('report').textContent = ACC.report()
  document.body.setAttribute('data-acc-ready', '1')
})()
