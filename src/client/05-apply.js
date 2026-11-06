/**
 * dsh-claude-mode — Client plugin body.
 *
 * Registers, through official services and slots only:
 *   1. two reversible token themes (neutral charcoal / neutral light),
 *   2. a run/status bar above the composer (themed status line, prompt-history
 *      recall, sidebar toggle, and the palette's draft bridge),
 *   3. a Conversation header button,
 *   4. a per-turn completion footer,
 *   5. a full-screen command palette overlay,
 *   6. a keyboard-shortcut sheet overlay,
 *   7. a sidebar plugin-icon manager (fold/unfold panel icons in the sidebar More menu),
 *   8. a Settings section with its nav icon.
 *
 * Nothing here edits host files, replaces the app root, or reads another
 * plugin's DOM. Every registration is owned by this plugin's effect scope, so
 * disabling the bundle removes them and restores the previous theme.
 */

/**
 * Apply the Client half.
 *
 * @param {object} ctx - restricted Cordis client context.
 */
export function applyClaudeMode(ctx) {
  /* ---------------------------------------------------------------- */
  /* Locale                                                            */
  /* ---------------------------------------------------------------- */
  ctx.effect(function () {
    return ctx.locale.register(NS, DICTIONARIES)
  }, 'dsh-claude-mode: locale dictionaries')
  const t = ctx.locale.bind(NS)

  /** Current locale id, used to pick the matching verb/completion pools. */
  function getLocale() {
    try {
      const snapshot = ctx.locale.getLocale()
      if (!snapshot) return ''
      return snapshot.active || snapshot.id || snapshot.locale || snapshot.current || ''
    } catch {
      return ''
    }
  }

  /* ---------------------------------------------------------------- */
  /* Settings store and shared services                                */
  /* ---------------------------------------------------------------- */
  const store = createSettingsStore(loadSettings())

  /** Collapse/expand the Host's left sidebar through the layout service. */
  function toggleSidebar() {
    try {
      const layout = ctx.get('layout')
      if (layout && typeof layout.toggleSidebar === 'function') layout.toggleSidebar()
    } catch (error) {
      if (typeof console !== 'undefined') console.warn('[dsh-claude-mode] sidebar toggle unavailable', error)
    }
  }

  /* The run bar renders before this body finishes wiring on some hosts; the
     runtime bridge keeps the button hidden until the service is reachable. */
  runtime.toggleSidebar = toggleSidebar

  /**
   * Open the sidebar's panel-list More menu, where the plugin-icon manager
   * lives. Clicking the host's own trigger keeps the popover behavior (focus,
   * dismissal, positioning) owned by the Host.
   */
  function openPanelManager() {
    try {
      const buttons = Array.from(document.querySelectorAll('button[aria-haspopup="menu"]'))
      for (const button of buttons) {
        if (button.getAttribute('aria-expanded') === 'true') return
      }
      const inSidebar = buttons.find(function (button) {
        const rect = button.getBoundingClientRect()
        return rect.width > 0 && rect.left >= 0 && rect.left < 320
      })
      if (inSidebar) {
        inSidebar.click()
        return
      }
      if (buttons.length > 0) buttons[0].click()
    } catch (error) {
      /* the menu is a progressive enhancement; a missing trigger is harmless */
    }
  }

  /* ---------------------------------------------------------------- */
  /* Theme layer                                                       */
  /* ---------------------------------------------------------------- */
  /* The Host user-settings schema accepts only the built-in
     light/dark/system preferences, so a plugin-registered theme id can
     never persist. The supported path is the token override layer: it
     carries both palettes, the active base scheme picks one, and
     setTheme() only ever writes a built-in preference. */
  const themeApi = ctx.get('theme')
  const media = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : undefined
  const overridePairs = (function () {
    const pairs = {}
    for (const name of Object.keys(DARK_TOKENS)) {
      pairs[name] = {
        light: Object.prototype.hasOwnProperty.call(LIGHT_TOKENS, name) ? LIGHT_TOKENS[name] : DARK_TOKENS[name],
        dark: DARK_TOKENS[name],
      }
    }
    return pairs
  })()
  let layerDisposer
  let appliedScheme
  let previousScheme

  /** Preference the settings ask for ('system' means follow the OS). */
  function desiredScheme(settings) {
    if (!settings || settings.enabled === false) return null
    if (settings.theme === 'dark') return 'dark'
    if (settings.theme === 'light') return 'light'
    return 'system'
  }

  /** Read the live theme preference without throwing. */
  function currentPreference() {
    try {
      if (!themeApi || typeof themeApi.getTheme !== 'function') return undefined
      return themeApi.getTheme().preference
    } catch {
      return undefined
    }
  }

  /** Install the token layer once. */
  function ensureLayer() {
    if (layerDisposer !== undefined) return true
    if (!themeApi || typeof themeApi.overrideTokens !== 'function') return false
    try {
      layerDisposer = themeApi.overrideTokens(NS, overridePairs)
      return true
    } catch (error) {
      if (typeof console !== 'undefined') console.warn('[dsh-claude-mode] theme layer unavailable', error)
      return false
    }
  }

  /** Remove the token layer, restoring the host palette. */
  function dropLayer() {
    if (layerDisposer === undefined) return
    try {
      layerDisposer()
    } catch {
      /* an already-removed layer is fine */
    }
    layerDisposer = undefined
  }

  /** Apply the layer and the matching built-in preference, or restore both. */
  function syncTheme() {
    const settings = store.get()
    const desired = desiredScheme(settings)
    try {
      if (desired !== null) {
        if (previousScheme === undefined) {
          const saved = loadPreviousTheme()
          if (saved) {
            previousScheme = saved
          } else {
            const current = currentPreference()
            if (current) {
              previousScheme = current
              savePreviousTheme(current)
            }
          }
        }
        ensureLayer()
        if (typeof themeApi.setTheme === 'function' && currentPreference() !== desired && themeApi.setTheme) {
          themeApi.setTheme(desired)
        }
        appliedScheme = desired
        return
      }
      dropLayer()
      if (appliedScheme !== undefined && currentPreference() === appliedScheme && typeof themeApi.setTheme === 'function') {
        themeApi.setTheme(previousScheme || 'system')
      }
      appliedScheme = undefined
      previousScheme = undefined
      savePreviousTheme(undefined)
    } catch (error) {
      if (typeof console !== 'undefined') console.warn('[dsh-claude-mode] theme sync failed', error)
    }
  }

  ctx.effect(function () {
    const disposeSettings = store.subscribe(syncTheme)
    const onMediaChange = function () {
      if (store.get().theme === 'auto') syncTheme()
    }
    const disposeMedia = media && typeof media.addEventListener === 'function'
      ? (media.addEventListener('change', onMediaChange), function () {
        media.removeEventListener('change', onMediaChange)
      })
      : undefined
    syncTheme()
    return function () {
      disposeSettings()
      if (disposeMedia) disposeMedia()
      try {
        dropLayer()
        if (appliedScheme !== undefined && typeof themeApi.setTheme === 'function') {
          themeApi.setTheme(previousScheme || 'system')
        }
      } catch {
        /* teardown must not throw */
      }
    }
  }, 'dsh-claude-mode: theme layer')
  /* ---------------------------------------------------------------- */
  /* Command palette actions                                           */
  /* ---------------------------------------------------------------- */
  function buildActions(settings, translate) {
    const tr = typeof translate === 'function' ? translate : t
    const themeLabel = settings.theme === 'dark'
      ? tr('common.theme.dark')
      : settings.theme === 'light' ? tr('common.theme.light') : tr('common.theme.auto')
    const actions = []
    actions.push({
      id: 'mode',
      section: 'appearance',
      title: settings.enabled ? tr('action.mode.on') : tr('action.mode.off'),
      detail: settings.enabled ? tr('action.mode.detail.on') : tr('action.mode.detail.off'),
      keywords: 'claude mode enable disable 模式 开关',
      state: settings.enabled ? tr('palette.toggle.on') : tr('palette.toggle.off'),
      run: function () {
        store.set({ enabled: !store.get().enabled })
      },
    })
    for (const choice of ['auto', 'dark', 'light']) {
      actions.push({
        id: 'theme-' + choice,
        section: 'appearance',
        title: tr('action.theme.' + choice),
        detail: settings.theme === choice ? tr('action.theme.detail', { value: themeLabel }) : '',
        keywords: 'theme appearance 主题 配色 颜色 ' + choice,
        state: settings.theme === choice ? tr('palette.toggle.on') : '',
        run: function () {
          store.set({ theme: choice })
        },
      })
    }
    actions.push({
      id: 'statusbar',
      section: 'behavior',
      title: settings.statusBar ? tr('action.statusBar.on') : tr('action.statusBar.off'),
      detail: tr('action.statusBar.detail'),
      keywords: 'status bar run 状态条 运行',
      state: settings.statusBar ? tr('palette.toggle.on') : tr('palette.toggle.off'),
      run: function () {
        store.set({ statusBar: !store.get().statusBar })
      },
    })
    actions.push({
      id: 'turnfooter',
      section: 'behavior',
      title: settings.turnFooter ? tr('action.turnFooter.on') : tr('action.turnFooter.off'),
      detail: tr('action.turnFooter.detail'),
      keywords: 'turn footer duration 回合 页脚 用时',
      state: settings.turnFooter ? tr('palette.toggle.on') : tr('palette.toggle.off'),
      run: function () {
        store.set({ turnFooter: !store.get().turnFooter })
      },
    })
    actions.push({
      id: 'animations',
      section: 'behavior',
      title: settings.animations ? tr('action.animations.on') : tr('action.animations.off'),
      detail: tr('action.animations.detail'),
      keywords: 'motion animation 动画 动效',
      state: settings.animations ? tr('palette.toggle.on') : tr('palette.toggle.off'),
      run: function () {
        store.set({ animations: !store.get().animations })
      },
    })
    actions.push({
      id: 'sound',
      section: 'behavior',
      title: settings.sound ? tr('action.sound.on') : tr('action.sound.off'),
      detail: tr('action.sound.detail'),
      keywords: 'sound chime audio notify 提示音 声音 完成 通知',
      state: settings.sound ? tr('palette.toggle.on') : tr('palette.toggle.off'),
      run: function () {
        const next = !store.get().sound
        store.set({ sound: next })
        if (next) playCompletionChime()
      },
    })
    actions.push({
      id: 'sidebar',
      section: 'behavior',
      title: tr('action.sidebar.toggle'),
      detail: tr('action.sidebar.detail'),
      keywords: 'sidebar collapse expand rail 侧边栏 折叠 收起 展开',
      run: function () {
        toggleSidebar()
      },
    })
    actions.push({
      id: 'panelmenu',
      section: 'behavior',
      title: tr('action.panelmenu.label'),
      detail: tr('action.panelmenu.detail'),
      keywords: 'panel icons plugins sidebar collapse expand 插件 图标 折叠 收起 侧边栏',
      run: function () {
        openPanelManager()
      },
    })
    actions.push({
      id: 'shortcuts',
      section: 'behavior',
      title: tr('action.shortcuts.label'),
      detail: tr('action.shortcuts.detail'),
      keywords: 'keyboard shortcuts help keys 快捷键 帮助 一览',
      run: function () {
        openShortcuts()
      },
    })
    if (runtime.running) {
      actions.push({
        id: 'interrupt',
        section: 'session',
        title: tr('action.interrupt.label'),
        detail: tr('action.interrupt.detail'),
        keywords: 'stop cancel interrupt esc 中断 停止',
        run: function () {
          interrupt(ctx, runtime.sessionId)
        },
      })
    }
    actions.push({
      id: 'new-session',
      section: 'session',
      title: tr('action.newSession.label'),
      detail: tr('action.newSession.detail'),
      keywords: 'new session 新建 会话',
      run: function () {
        startNewSession(ctx)
      },
    })
    return actions
  }

  /* ---------------------------------------------------------------- */
  /* Widgets                                                           */
  /* ---------------------------------------------------------------- */
  const RunBar = createRunBar(ctx, store, t, getLocale)
  const HeaderButton = createHeaderButton(ctx, store, t)
  const ReadAloud = createReadAloud(ctx, store, t, getLocale)
  const TurnFooter = createTurnFooter(ctx, store, t, getLocale)
  const Palette = createPalette(ctx, store, t, buildActions)
  const ShortcutsSheet = createShortcuts(ctx, store, t)
  const PanelMenu = createPanelMenu(ctx, store, t)
  const SettingsSection = createSettingsSection(ctx, store, t)
  const StyleHost = function StyleHost() {
    return React.createElement('style', { 'data-dsh-claude-mode': '', dangerouslySetInnerHTML: { __html: STYLES } })
  }

  /* ---------------------------------------------------------------- */
  /* Slot registrations                                                */
  /* ---------------------------------------------------------------- */
  function registerSlot(key, factory) {
    try {
      return ctx.slots.inject(key, function () {
        try {
          return factory()
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') console.error('[ccm] slot registration failed: ' + key, error)
          throw error
        }
      })
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.error === 'function') console.error('[ccm] slot inject failed: ' + key, error)
      return undefined
    }
  }

  registerSlot('conversation.input.dock', function () {
    return ctx.slots.register({
      name: 'conversation.input.dock',
      id: 'claude-mode.runbar',
      order: 30,
      locale: NS,
    }, RunBar)
  })

  registerSlot('conversation.session.header.utilities', function () {
    return ctx.slots.register({
      name: 'conversation.session.header.utilities',
      id: 'claude-mode.header',
      order: 20,
      label: function () {
        return t('header.open')
      },
      locale: NS,
    }, HeaderButton)
  })

  /* Read-aloud entry on every finalized assistant message. Hosts that predate
     the assistant-actions strip simply skip this registration. */
  registerSlot('conversation.chat.assistant-actions', function () {
    return ctx.slots.register({
      name: 'conversation.chat.assistant-actions',
      id: 'claude-mode.read-aloud',
      order: 20,
      label: function () {
        return t('action.readAloud')
      },
      locale: NS,
    }, ReadAloud)
  })

  /* Compatibility: newer Hosts declare `conversation.chat.turnTail` as a list
     slot; older Hosts declare it as a chain slot whose registration needs a
     `select` predicate. Try the list shape first, then retry the chain shape
     only when the Host reports that exact requirement. */
  function turnTailSelected(owner) {
    const settings = store.get()
    if (!settings.enabled || settings.turnFooter === false) return false
    const turn = owner && owner.turn
    if (!turn || turn.status !== 'closed') return false
    const start = turn.start && typeof turn.start.time === 'number' ? turn.start.time : undefined
    const end = turn.end && typeof turn.end.time === 'number' ? turn.end.time : undefined
    if (start === undefined || end === undefined) return false
    return end - start >= 1000
  }

  function registerTurnTail() {
    const base = {
      name: 'conversation.chat.turnTail',
      id: 'claude-mode.turn-footer',
      order: 50,
      locale: NS,
    }
    try {
      return ctx.slots.inject('conversation.chat.turnTail', function () {
        try {
          return ctx.slots.register(base, TurnFooter)
        } catch (error) {
          const message = String(error && error.message ? error.message : error)
          if (!/requires options\.select/.test(message)) throw error
          return ctx.slots.register({ ...base, select: turnTailSelected }, TurnFooter)
        }
      })
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.error === 'function') console.error('[ccm] slot inject failed: conversation.chat.turnTail', error)
      return undefined
    }
  }

  registerTurnTail()

  /* The stylesheet rides the always-mounted overlay entry, so it exists even
     while the palette itself renders nothing. */
  registerSlot('shell.overlay', function () {
    return ctx.slots.register({
      name: 'shell.overlay',
      id: 'claude-mode.styles',
      order: 5,
    }, StyleHost)
  })

  registerSlot('shell.overlay', function () {
    return ctx.slots.register({
      name: 'shell.overlay',
      id: 'claude-mode.palette',
      order: 40,
      locale: NS,
    }, Palette)
  })

  registerSlot('shell.overlay', function () {
    return ctx.slots.register({
      name: 'shell.overlay',
      id: 'claude-mode.shortcuts',
      order: 45,
      locale: NS,
    }, ShortcutsSheet)
  })

  /* Sidebar plugin-icon manager: only newer Hosts declare
     `sidebar.panellist.actions` (the panel list's More menu). Older Hosts
     have no panel pinning at all, so this registration is best-effort and
     silent — the rest of the plugin stays functional. */
  try {
    ctx.slots.inject('sidebar.panellist.actions', function () {
      try {
        return ctx.slots.register({
          name: 'sidebar.panellist.actions',
          id: 'claude-mode.panel-menu',
          order: 10,
          locale: NS,
        }, PanelMenu)
      } catch (error) {
        /* Host declares the slot without panel metadata; skip the section. */
        return undefined
      }
    })
  } catch (error) {
    /* Host predates the panel-list More menu. */
  }

  registerSlot('settings.section', function () {
    return ctx.slots.register({
      name: 'settings.section',
      id: 'claude-mode',
      order: 70,
      label: function () {
        return t('settings.nav')
      },
      locale: NS,
    }, SettingsSection)
  })

  registerSlot('settings.section.icon', function () {
    return ctx.slots.register({
      name: 'settings.section.icon',
      id: 'claude-mode',
      order: 70,
    }, SettingsIcon)
  })
}