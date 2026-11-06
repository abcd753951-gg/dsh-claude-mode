/**
 * dsh-claude-mode — React components registered into official slots.
 *
 * All components are defensive by design: a missing service, prop, or token
 * degrades a widget instead of crashing the slot entry. The status star and
 * completion footer uses a fixed six-frame glyph pulse: a six-frame
 * Unicode pulse for the running star, and one per-turn completion word before
 * the duration.
 */

import { assistantTextForMessage, collectPromptHistory, completionWordFor, format, formatDuration, formatElapsed, mapSessionSearchResults, openPalette, openShortcuts, pickSpinnerVerb, playCompletionChime, runtime, SPINNER_REST_FRAME, spinnerFrame, splitSpeechText, stepPromptHistory, subscribePalette, subscribeShortcuts } from './02-state.js'

/** Rendered plugin version (also shown in the Settings about card). */
export const VERSION = '0.5.0'

/** Composer helpers used by the history-recall and shortcut gestures. */
function activeComposerElement() {
  try {
    const element = document.activeElement
    if (!element || !element.isContentEditable) return null
    if (element.closest && element.closest('[role="dialog"], .ccm-palette, .ccm-shortcuts')) return null
    return element
  } catch {
    return null
  }
}

/** Current plain text of the focused composer (empty when unreadable). */
function composerText(element) {
  try {
    return String((element && element.textContent) || '').trim()
  } catch {
    return ''
  }
}

/** Whether a host popup (slash menu, autocomplete) currently owns the arrows. */
function hostMenuOpen() {
  try {
    const nodes = document.querySelectorAll('[role="listbox"], [role="menu"]')
    for (const node of nodes) {
      if (node.closest && node.closest('.ccm-palette, .ccm-shortcuts')) continue
      if (node.offsetParent !== null) return true
    }
  } catch {
    /* ignore */
  }
  return false
}

/** Put the caret back into the composer after a programmatic draft write. */
function focusComposer() {
  try {
    const element = document.querySelector('[contenteditable="true"]')
    if (element && !(element.closest && element.closest('[role="dialog"]'))) element.focus()
  } catch {
    /* ignore */
  }
}

/** Trim one history row to a single short palette title. */
function shortenText(text, max) {
  const flat = String(text == null ? '' : text).replace(/\s+/g, ' ').trim()
  if (!flat) return ''
  return flat.length > max ? flat.slice(0, Math.max(1, max - 1)) + '…' : flat
}

/** Whether the sidebar toggle is available in this Host. */
function toggleSidebar() {
  try {
    if (typeof runtime.toggleSidebar === 'function') runtime.toggleSidebar()
  } catch {
    /* ignore */
  }
}

/** Start a blank Session through the workspace service (best-effort). */
export function startNewSession(ctx) {
  try {
    const uiWorkspace = ctx.get('uiWorkspace')
    if (uiWorkspace && typeof uiWorkspace.startSession === 'function') {
      uiWorkspace.startSession()
      return true
    }
  } catch (error) {
    if (typeof console !== 'undefined') console.warn('[dsh-claude-mode] new session unavailable', error)
  }
  return false
}

/** Open a known Session from a palette result (best-effort). */
function openSessionById(ctx, sessionId) {
  try {
    const uiWorkspace = ctx.get('uiWorkspace')
    if (uiWorkspace && typeof uiWorkspace.openSession === 'function') {
      uiWorkspace.openSession(sessionId)
      return true
    }
  } catch (error) {
    if (typeof console !== 'undefined') console.warn('[dsh-claude-mode] open session unavailable', error)
  }
  return false
}

/** The status star (U+273B), rendered as a text glyph. */
function Glyph(props) {
  const size = props && props.size
  const frame = (props && props.frame) || SPINNER_REST_FRAME
  const style = size ? { width: size + 'px', height: size + 'px', fontSize: Math.max(10, size - 2) + 'px' } : undefined
  return React.createElement('span', { className: 'ccm-glyph', style, 'aria-hidden': 'true' }, frame)
}

/** One keyboard cap. */
function Kbd(props) {
  return React.createElement('kbd', { className: 'ccm-kbd' }, props.children)
}

/**
 * Subscribe to the plugin settings store.
 *
 * @param {object} store - settings store from 02-state.
 * @returns {object} current settings.
 */
function useSettings(store) {
  const subscribe = React.useCallback((listener) => store.subscribe(listener), [store])
  const getSnapshot = React.useCallback(() => store.get(), [store])
  if (typeof React.useSyncExternalStore === 'function') {
    return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  }
  /* Fallback for a React build without the hook: still update on changes. */
  const [value, setValue] = React.useState(getSnapshot)
  React.useEffect(() => subscribe(() => setValue(getSnapshot())), [subscribe, getSnapshot])
  return value
}

/** Motion class name shared by every widget (honours the animations toggle). */
function motionClass(settings) {
  return settings.animations ? '' : ' ccm-no-motion'
}

/** Whether the OS asks for reduced motion. */
function useReducedMotion() {
  const [reduced, setReduced] = React.useState(function () {
    try {
      return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    } catch {
      return false
    }
  })
  React.useEffect(function () {
    let media
    try {
      media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : undefined
    } catch {
      media = undefined
    }
    if (!media) return undefined
    const onChange = function () {
      setReduced(Boolean(media.matches))
    }
    if (typeof media.addEventListener === 'function') media.addEventListener('change', onChange)
    else if (typeof media.addListener === 'function') media.addListener(onChange)
    return function () {
      if (typeof media.removeEventListener === 'function') media.removeEventListener('change', onChange)
      else if (typeof media.removeListener === 'function') media.removeListener(onChange)
    }
  }, [])
  return reduced
}

/* ---------------------------------------------------------------------- */
/* Chat activity probe                                                    */
/* ---------------------------------------------------------------------- */

/**
 * Collapse the Chat snapshot into a primitive activity key so a selector hook
 * can subscribe without allocating a new object each render.
 *
 * Returns `kind|runningCallCount|firstCallStartTime`.
 */
export function selectChatActivity(chat) {
  try {
    const legacy = chat && chat.legacy
    if (!legacy) return 'waiting|0|0'
    const calls = Array.isArray(legacy.runningCalls) ? legacy.runningCalls : []
    if (calls.length > 0) {
      const first = calls[0] || {}
      return 'tool|' + calls.length + '|' + (Number(first.time) || 0)
    }
    const partial = legacy.partial
    const blocks = partial && Array.isArray(partial.blocks) ? partial.blocks : []
    let hasText = false
    let hasReasoning = false
    let hasTool = false
    for (const block of blocks) {
      if (!block || typeof block !== 'object') continue
      if (block.kind === 'tool-call') hasTool = true
      else if (block.kind === 'text' && block.text) hasText = true
      else if (block.kind === 'reasoning' && block.text) hasReasoning = true
    }
    return (hasTool ? 'tool-input' : hasText ? 'responding' : hasReasoning ? 'thinking' : 'waiting') + '|0|0'
  } catch {
    return 'waiting|0|0'
  }
}

/** Identity selector: subscribe to the whole Chat snapshot (prompt history). */
function selectChatSnapshot(chat) {
  return chat
}

/** Hook fallback for hosts without the Chat target: never subscribes. */
function useNoChat(selector) {
  return selector(undefined)
}

/* ---------------------------------------------------------------------- */
/* Run / status bar                                                        */
/* ---------------------------------------------------------------------- */

/**
 * Elapsed clock for the running turn.
 *
 * The elapsed value is updated every 100 ms while motion is on (the pulse
 * cadence), otherwise once a second. The start timestamp
 * survives an animations-toggle re-run so the timer does not jump back to 0.
 */
function useRunClock(running, animate) {
  const startedRef = React.useRef(0)
  const [clock, setClock] = React.useState({ startedAt: 0, elapsed: 0 })
  React.useEffect(function () {
    if (!running) {
      startedRef.current = 0
      setClock({ startedAt: 0, elapsed: 0 })
      return undefined
    }
    if (!startedRef.current) startedRef.current = Date.now()
    const startedAt = startedRef.current
    const tick = function () {
      const elapsed = Date.now() - startedAt
      setClock({ startedAt, elapsed })
    }
    tick()
    const id = window.setInterval(tick, animate ? 100 : 1000)
    return function () {
      window.clearInterval(id)
    }
  }, [running, animate])
  return clock
}

/**
 * Build the run bar component (registered into `conversation.input.dock`).
 *
 * Beyond the status line, this entry owns three composer
 * gestures the Host does not provide: prompt-history recall with Up/Down (a
 * finalized user/steering node list from the Chat snapshot), the sidebar
 * toggle (Alt+B / the small rail button), and the draft bridge the palette uses
 * to fill previous prompts.
 *
 * @param {object} ctx - plugin client context.
 * @param {object} store - settings store.
 * @param {Function} t - bound translator.
 * @param {Function} getLocale - current locale id reader.
 */
export function createRunBar(ctx, store, t, getLocale) {
  return function RunBar(props) {
    const settings = useSettings(store)
    const reducedMotion = useReducedMotion()
    const session = props.session || props.sessionSnapshot
    const input = props.input || {}
    const running = Boolean(session && session.running)
    const queue = Array.isArray(input.queue) ? input.queue.length : 0
    const sessionId = props.sessionId || (session && session.sessionId)
    const animate = settings.animations !== false && !reducedMotion
    const clock = useRunClock(running, animate)
    const useChat = typeof props.useChat === 'function' ? props.useChat : useNoChat
    const activity = useChat(selectChatActivity)
    const chatSnapshot = useChat(selectChatSnapshot)
    const locale = typeof getLocale === 'function' ? getLocale() : ''
    const historyKey = (function () {
      const legacy = chatSnapshot && chatSnapshot.legacy
      const nodes = legacy && Array.isArray(legacy.nodes) ? legacy.nodes : []
      const last = nodes.length > 0 ? nodes[nodes.length - 1] : undefined
      return nodes.length + ':' + (last && typeof last.seq === 'number' ? last.seq : 0)
    })()
    const prompts = React.useMemo(function () {
      const legacy = chatSnapshot && chatSnapshot.legacy
      const nodes = legacy && Array.isArray(legacy.nodes) ? legacy.nodes : []
      return collectPromptHistory(nodes, 50)
    }, [historyKey])
    const promptsRef = React.useRef(prompts)
    const inputActionsRef = React.useRef(props.inputActions)
    const historyRef = React.useRef({ active: false, index: -1, draft: '' })
    promptsRef.current = prompts
    inputActionsRef.current = props.inputActions

    React.useEffect(function () {
      runtime.sessionId = sessionId
      runtime.running = running
    }, [sessionId, running])

    /* A small completion cue for finished turns; the Web equivalent
       is a two-note WebAudio chime, off by default and never allowed to throw. */
    const previousRunning = React.useRef(running)
    React.useEffect(function () {
      const wasRunning = previousRunning.current
      previousRunning.current = running
      if (wasRunning && !running) {
        const current = store.get()
        if (current.enabled && current.sound) playCompletionChime()
      }
    }, [running])

    React.useEffect(function () {
      runtime.promptHistory = prompts
      runtime.historyVersion = (Number(runtime.historyVersion) || 0) + 1
    }, [prompts])

    React.useEffect(function () {
      runtime.fillDraft = function (text) {
        const actions = inputActionsRef.current
        if (actions && typeof actions.setDraft === 'function') {
          try {
            actions.setDraft(String(text == null ? '' : text))
          } catch {
            /* the host refused this programmatic write */
          }
        }
        focusComposer()
      }
      return function () {
        runtime.fillDraft = null
      }
    }, [])

    React.useEffect(function () {
      const applyDraft = function (text) {
        const actions = inputActionsRef.current
        if (actions && typeof actions.setDraft === 'function') {
          try {
            actions.setDraft(String(text == null ? '' : text))
          } catch {
            /* the host refused this programmatic write */
          }
        }
      }
      const onKeyDown = function (event) {
        if (!store.get().enabled) return
        if (event.defaultPrevented || event.isComposing) return
        if (event.ctrlKey || event.metaKey) return
        if (event.altKey) {
          if (!event.shiftKey && (event.key === 'b' || event.key === 'B')) {
            if (document.querySelector('.ccm-palette, .ccm-shortcuts')) return
            event.preventDefault()
            toggleSidebar()
          }
          return
        }
        const composer = activeComposerElement()
        if (!composer) return
        if (document.querySelector('.ccm-palette, .ccm-shortcuts')) return
        if (event.shiftKey) return
        const empty = composerText(composer).length === 0
        if (event.key === 'ArrowUp') {
          if (!empty && !historyRef.current.active) return
          if (hostMenuOpen()) return
          const step = stepPromptHistory(historyRef.current, -1, promptsRef.current, composerText(composer))
          if (step.text === null) return
          event.preventDefault()
          event.stopPropagation()
          historyRef.current = step.state
          applyDraft(step.text)
          return
        }
        if (event.key === 'ArrowDown') {
          if (!historyRef.current.active) return
          const step = stepPromptHistory(historyRef.current, 1, promptsRef.current, '')
          event.preventDefault()
          event.stopPropagation()
          historyRef.current = step.state
          if (step.text !== null) applyDraft(step.text)
          return
        }
        if (historyRef.current.active && event.key.length === 1) {
          historyRef.current = { active: false, index: -1, draft: '' }
        }
      }
      window.addEventListener('keydown', onKeyDown, true)
      return function () {
        window.removeEventListener('keydown', onKeyDown, true)
      }
    }, [])

    if (!settings.enabled || settings.statusBar === false) return null

    const parts = []
    if (running) {
      const verb = pickSpinnerVerb(clock.startedAt ? sessionId + ':' + clock.startedAt : sessionId || '', locale)
      const frame = animate ? spinnerFrame(clock.elapsed) : SPINNER_REST_FRAME
      const pieces = [React.createElement(Glyph, { key: 'g', frame })]
      pieces.push(React.createElement('span', { key: 's', className: 'ccm-runbar-status' }, verb + '…'))
      const meta = []
      meta.push(React.createElement('button', {
        key: 'i',
        type: 'button',
        className: 'ccm-meta-interrupt',
        title: t('action.interrupt.label'),
        'aria-label': t('action.interrupt.label'),
        onClick: function () {
          interrupt(ctx, sessionId)
        },
      }, t('runbar.meta.interrupt')))
      meta.push(React.createElement('span', { key: 's1', className: 'ccm-runbar-meta-sep' }, '·'))
      meta.push(React.createElement('span', { key: 'e' }, formatElapsed(clock.elapsed)))
      const activityParts = String(activity || '').split('|')
      const activityKind = activityParts[0]
      const toolStartedAt = Number(activityParts[2]) || 0
      if (activityKind === 'tool' && toolStartedAt > 0) {
        const toolElapsed = Date.now() - toolStartedAt
        if (toolElapsed >= 1000) {
          meta.push(React.createElement('span', { key: 's2', className: 'ccm-runbar-meta-sep' }, '·'))
          meta.push(React.createElement('span', { key: 't' }, t('runbar.meta.tool', { duration: formatDuration(toolElapsed) })))
        }
      }
      pieces.push(React.createElement('span', { key: 'm', className: 'ccm-runbar-meta' }, [
        React.createElement('span', { key: 'o' }, '('),
        ...meta,
        React.createElement('span', { key: 'c' }, ')'),
      ]))
      parts.push(...pieces)
    } else {
      parts.push(
        React.createElement(Glyph, { key: 'g' }),
        React.createElement('span', { key: 'r', className: 'ccm-runbar-status' }, t('runbar.ready')),
        React.createElement('span', { key: 'h', className: 'ccm-runbar-hints' }, [
          React.createElement('span', { key: 'send', className: 'ccm-runbar-hint' }, React.createElement(Kbd, null, '↵'), t('runbar.hint.send')),
          React.createElement('span', { key: 'nl', className: 'ccm-runbar-hint' }, React.createElement(Kbd, null, '⇧↵'), t('runbar.hint.newline')),
          React.createElement('span', { key: 'hist', className: 'ccm-runbar-hint' }, React.createElement(Kbd, null, '↑'), t('runbar.hint.history')),
          React.createElement('span', { key: 'cmd', className: 'ccm-runbar-hint' }, React.createElement(Kbd, null, '/'), t('runbar.hint.command')),
          React.createElement('span', { key: 'file', className: 'ccm-runbar-hint' }, React.createElement(Kbd, null, '@'), t('runbar.hint.file')),
          React.createElement('span', { key: 'pal', className: 'ccm-runbar-hint' }, React.createElement(Kbd, null, '⌃K'), t('runbar.hint.palette')),
          React.createElement('span', { key: 'help', className: 'ccm-runbar-hint' }, React.createElement(Kbd, null, '?'), t('runbar.hint.shortcuts')),
        ]),
      )
    }

    const actions = []
    if (queue > 0) {
      actions.push(React.createElement('span', {
        key: 'q',
        className: 'ccm-queue',
        title: t('runbar.queueHint'),
      }, '↑ ', format(t('runbar.queued'), { count: queue })))
    }
    actions.push(React.createElement('button', {
      key: 'p',
      type: 'button',
      className: 'ccm-chip',
      title: t('header.open') + ' · ⌃K',
      onClick: function () {
        openPalette()
      },
    }, React.createElement(Glyph, null), t('brand.mark'), React.createElement('span', { className: 'ccm-chip-sub' }, '⌃K')))
    if (typeof runtime.toggleSidebar === 'function') {
      actions.push(React.createElement('button', {
        key: 'sb',
        type: 'button',
        className: 'ccm-sidebtn',
        title: t('runbar.sidebar'),
        'aria-label': t('runbar.sidebar'),
        onClick: toggleSidebar,
      }, '«'))
    }

    return React.createElement('div', {
      className: 'ccm-runbar ' + (running ? 'is-running' : 'is-idle') + motionClass(settings),
      'data-claude-mode': '',
      'data-running': running || undefined,
    }, [
      React.createElement('div', { key: 'm', className: 'ccm-runbar-main' }, parts),
      React.createElement('div', { key: 'a', className: 'ccm-runbar-actions' }, actions),
    ])
  }
}

/** Cancel the running turn of one session through the public session facade. */
function interrupt(ctx, sessionId) {
  try {
    const sessions = ctx.get('sessions')
    if (!sessions || !sessionId) return
    const binding = typeof sessions.binding === 'function' ? sessions.binding(sessionId) : undefined
    const session = binding && binding.session
    if (session && typeof session.cancel === 'function') {
      Promise.resolve(session.cancel()).catch(function (error) {
        if (typeof console !== 'undefined') console.warn('[dsh-claude-mode] interrupt failed', error)
      })
      return
    }
    const scope = typeof sessions.scope === 'function' ? sessions.scope(sessionId) : undefined
    const conversation = scope && scope.conversation
    if (conversation && typeof conversation.cancel === 'function') {
      Promise.resolve(conversation.cancel()).catch(function () {})
    }
  } catch (error) {
    if (typeof console !== 'undefined') console.warn('[dsh-claude-mode] interrupt unavailable', error)
  }
}

/* ---------------------------------------------------------------------- */
/* Conversation header button                                              */
/* ---------------------------------------------------------------------- */

/** Selector returning whether the Session is currently running. */
function selectRunning(state) {
  return Boolean(state && state.running)
}

/** Build the header button component (registered into header utilities). */
export function createHeaderButton(ctx, store, t) {
  return function HeaderButton(props) {
    const settings = useSettings(store)
    const reducer = typeof props.useSession === 'function' ? props.useSession : function () { return undefined }
    const running = Boolean(reducer(selectRunning))
    const sessionId = props.sessionId
    React.useEffect(function () {
      runtime.sessionId = sessionId
      runtime.running = running
    }, [sessionId, running])
    if (!settings.enabled) return null
    return React.createElement('button', {
      type: 'button',
      className: 'ccm-iconbtn' + (running ? ' is-running' : '') + motionClass(settings),
      title: running ? t('header.running') : t('header.open'),
      'aria-label': t('header.open'),
      'data-claude-mode': '',
      onClick: function () {
        openPalette()
      },
    }, React.createElement(Glyph))
  }
}

/* ---------------------------------------------------------------------- */
/* Assistant read-aloud action                                            */
/* ---------------------------------------------------------------------- */

/** Speaker glyph for the read-aloud action. */
function SpeakerIcon() {
  return React.createElement('svg', {
    className: 'ccm-action-icon',
    viewBox: '0 0 16 16',
    width: 16,
    height: 16,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }, [
    React.createElement('path', { key: 'b', d: 'M2.4 6.1h2.1L7.7 3.5v9l-3.2-2.6H2.4z' }),
    React.createElement('path', { key: 'w1', d: 'M10.1 5.7a3.2 3.2 0 0 1 0 4.6' }),
    React.createElement('path', { key: 'w2', d: 'M12.1 4a5.6 5.6 0 0 1 0 8' }),
  ])
}

/** Stop glyph shown while the reply is being read. */
function StopReadingIcon() {
  return React.createElement('svg', {
    className: 'ccm-action-icon',
    viewBox: '0 0 16 16',
    width: 16,
    height: 16,
    fill: 'currentColor',
    'aria-hidden': 'true',
  }, React.createElement('rect', { x: 4, y: 4, width: 8, height: 8, rx: 1.4 }))
}

/**
 * Build the read-aloud entry for one finalized assistant message.
 *
 * The read-aloud action uses the Web Speech API. It reads the message text
 * out of the Chat snapshot by durable message id, chunks long replies, and
 * toggles to Stop while speaking. Missing voices or an unsupported browser
 * remove the entry instead of leaving a dead button.
 */
export function createReadAloud(ctx, store, t, getLocale) {
  return function ReadAloud(props) {
    const settings = useSettings(store)
    const messageId = props && props.messageId
    const useChat = typeof props.useChat === 'function' ? props.useChat : function () { return undefined }
    const text = useChat(function (snapshot) {
      return assistantTextForMessage(snapshot, messageId)
    }) || ''
    const [speaking, setSpeaking] = React.useState(false)
    const generation = React.useRef(0)
    const speakingRef = React.useRef(false)

    React.useEffect(function () {
      generation.current += 1
      speakingRef.current = false
      setSpeaking(false)
      return function () {
        const wasSpeaking = speakingRef.current
        generation.current += 1
        speakingRef.current = false
        if (!wasSpeaking) return
        try {
          if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
        } catch {
          /* a browser without speech synthesis */
        }
      }
    }, [messageId])

    const chunks = React.useMemo(function () {
      return splitSpeechText(text, 1200)
    }, [text])

    if (!settings.enabled) return null
    if (typeof window === 'undefined' || !window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== 'function') return null
    if (!text || chunks.length === 0) return null

    const synth = window.speechSynthesis

    const stop = function () {
      generation.current += 1
      speakingRef.current = false
      setSpeaking(false)
      try {
        synth.cancel()
      } catch {
        /* ignore */
      }
    }

    const speak = function () {
      const current = ++generation.current
      try {
        synth.cancel()
      } catch {
        /* ignore */
      }
      setSpeaking(true)
      speakingRef.current = true
      const locale = typeof getLocale === 'function' ? String(getLocale() || '') : ''
      const lang = locale.toLowerCase().indexOf('zh') === 0 ? 'zh-CN' : 'en-US'
      const voices = typeof synth.getVoices === 'function' ? synth.getVoices() : []
      const voice = voices.find(function (candidate) {
        return candidate && candidate.lang === lang
      }) || voices.find(function (candidate) {
        return candidate && String(candidate.lang || '').toLowerCase().indexOf(lang.slice(0, 2)) === 0
      })
      let index = 0
      const finish = function () {
        if (generation.current !== current) return
        speakingRef.current = false
        setSpeaking(false)
      }
      const next = function () {
        if (generation.current !== current) return
        if (index >= chunks.length) {
          finish()
          return
        }
        const chunk = chunks[index]
        index += 1
        let utterance
        try {
          utterance = new window.SpeechSynthesisUtterance(chunk)
        } catch {
          finish()
          return
        }
        utterance.lang = lang
        utterance.rate = 1
        if (voice) utterance.voice = voice
        utterance.onend = function () {
          if (generation.current !== current) return
          next()
        }
        utterance.onerror = finish
        try {
          synth.speak(utterance)
        } catch {
          finish()
        }
      }
      next()
    }

    const label = speaking ? t('action.stopReading') : t('action.readAloud')
    return React.createElement('button', {
      type: 'button',
      className: 'ccm-iconbtn ccm-readaloud' + (speaking ? ' is-speaking' : ''),
      title: label + (chunks.length > 1 ? ' · ' + chunks.length : ''),
      'aria-label': label,
      'aria-pressed': speaking ? 'true' : 'false',
      'data-speaking': speaking ? 'true' : undefined,
      'data-claude-mode': '',
      onClick: speaking ? stop : speak,
    }, speaking ? React.createElement(StopReadingIcon) : React.createElement(SpeakerIcon))
  }
}

/* ---------------------------------------------------------------------- */
/* Turn footer                                                             */
/* ---------------------------------------------------------------------- */

/**
 * Build the turn-footer component (registered into `conversation.chat.turnTail`).
 *
 * @param {object} ctx - plugin client context.
 * @param {object} store - settings store.
 * @param {Function} t - bound translator.
 * @param {Function} getLocale - current locale id reader.
 */
export function createTurnFooter(ctx, store, t, getLocale) {
  return function TurnFooter(props) {
    const settings = useSettings(store)
    const turn = props.turn || {}
    // Hooks must run unconditionally; compute after the hook calls.
    const status = turn.status
    const steps = Array.isArray(turn.steps) ? turn.steps.length : 0
    const start = turn.start && typeof turn.start.time === 'number' ? turn.start.time : undefined
    const end = turn.end && typeof turn.end.time === 'number' ? turn.end.time : undefined
    if (!settings.enabled || settings.turnFooter === false) return null
    if (status !== 'closed' || start === undefined || end === undefined) return null
    const duration = end - start
    if (!(duration >= 1000)) return null
    const locale = typeof getLocale === 'function' ? getLocale() : ''
    const word = completionWordFor(start, locale)
    const values = []
    values.push(t('turn.completed', { word, duration: formatDuration(duration) }))
    if (steps > 0) values.push(t('turn.steps', { count: steps }))
    return React.createElement('div', {
      className: 'ccm-turn-footer' + motionClass(settings),
      'data-claude-mode': '',
    }, [
      React.createElement(Glyph, { key: 'g' }),
      React.createElement('span', { key: 'i' }, values.join(' · ')),
    ])
  }
}

/* ---------------------------------------------------------------------- */
/* Command palette                                                         */
/* ---------------------------------------------------------------------- */

/**
 * Build the command palette component (registered into `shell.overlay`).
 *
 * @param {object} ctx - plugin client context.
 * @param {object} store - settings store.
 * @param {Function} t - bound translator.
 * @param {Function} actions - action builder `(settings, t) => Action[]`.
 */
export function createPalette(ctx, store, t, buildActions) {
  return function Palette() {
    const settings = useSettings(store)
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState('')
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [sessionResults, setSessionResults] = React.useState([])
    const [searching, setSearching] = React.useState(false)
    const inputRef = React.useRef(null)
    const listRef = React.useRef(null)
    const openRef = React.useRef(false)
    const activeRef = React.useRef(0)

    openRef.current = open
    activeRef.current = activeIndex

    const close = React.useCallback(function () {
      setOpen(false)
      setQuery('')
      setActiveIndex(0)
    }, [])

    React.useEffect(function () {
      const dispose = subscribePalette(function () {
        setOpen(true)
        setQuery('')
        setActiveIndex(0)
      })
      const onKeyDown = function (event) {
        if (event.defaultPrevented || event.isComposing) return
        const modifier = event.ctrlKey || event.metaKey
        if (modifier && !event.altKey && !event.shiftKey && (event.key === 'k' || event.key === 'K')) {
          event.preventDefault()
          if (openRef.current) close()
          else {
            setOpen(true)
            setQuery('')
            setActiveIndex(0)
          }
          return
        }
        if (event.altKey && !modifier && !event.shiftKey && (event.key === 'n' || event.key === 'N')) {
          if (!store.get().enabled) return
          const hostModal = Array.from(document.querySelectorAll('[role="dialog"][aria-modal="true"]')).find(function (node) {
            return !node.classList.contains('ccm-palette')
          })
          if (hostModal) return
          event.preventDefault()
          if (openRef.current) close()
          startNewSession(ctx)
          return
        }
        if (!openRef.current) return
        if (event.key === 'Escape') {
          event.preventDefault()
          close()
          return
        }
        const items = itemsRef.current
        if (!items.length) return
        if (event.key === 'ArrowDown' || event.key === 'Tab') {
          event.preventDefault()
          setActiveIndex(function (index) { return (index + 1) % items.length })
          return
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          setActiveIndex(function (index) { return (index - 1 + items.length) % items.length })
          return
        }
        if (event.key === 'Enter') {
          event.preventDefault()
          const item = items[activeRef.current]
          if (item) runItem(item)
        }
      }
      window.addEventListener('keydown', onKeyDown, true)
      return function () {
        window.removeEventListener('keydown', onKeyDown, true)
        dispose()
      }
    }, [close])

    const historyVersion = Number(runtime.historyVersion) || 0
    const allItems = React.useMemo(function () {
      const base = buildActions(settings, t)
      const history = Array.isArray(runtime.promptHistory) ? runtime.promptHistory.slice(0, 12) : []
      const historyItems = []
      for (let index = 0; index < history.length; index += 1) {
        const text = String(history[index] == null ? '' : history[index])
        const title = shortenText(text, 64)
        if (!title) continue
        historyItems.push({
          id: 'history:' + index,
          section: 'history',
          title,
          detail: t('palette.history.fill'),
          keywords: text,
          run: function () {
            if (typeof runtime.fillDraft === 'function') runtime.fillDraft(text)
          },
        })
      }
      return base.concat(historyItems)
    }, [settings, t, historyVersion])
    const searchItems = React.useMemo(function () {
      return sessionResults.map(function (row) {
        return {
          id: 'session-search:' + row.sessionId,
          section: 'search',
          title: row.snippet,
          detail: t('palette.search.open'),
          keywords: row.snippet,
          run: function () {
            openSessionById(ctx, row.sessionId)
          },
        }
      })
    }, [sessionResults, t])
    const items = React.useMemo(function () {
      const ranked = rankItems(allItems, query)
      if (!query.trim()) return ranked
      return ranked.concat(searchItems)
    }, [allItems, query, searchItems])
    const itemsRef = React.useRef(items)
    itemsRef.current = items

    React.useEffect(function () {
      if (!open) return undefined
      setActiveIndex(0)
      const timer = window.setTimeout(function () {
        if (inputRef.current) inputRef.current.focus()
      }, 0)
      return function () { window.clearTimeout(timer) }
    }, [open, query])

    React.useEffect(function () {
      if (!open) {
        setSessionResults([])
        setSearching(false)
        return undefined
      }
      const phrase = query.trim()
      if (phrase.length < 2) {
        setSessionResults([])
        setSearching(false)
        return undefined
      }
      let disposed = false
      let controller
      try {
        controller = new AbortController()
      } catch {
        controller = undefined
      }
      setSessionResults([])
      let settled = false
      const finish = function () {
        settled = true
        window.clearTimeout(searchTimeout)
        if (!disposed) setSearching(false)
      }
      const searchTimeout = window.setTimeout(function () {
        if (!disposed && !settled) setSearching(false)
      }, 12000)
      const timer = window.setTimeout(function () {
        if (disposed) return
        setSearching(true)
        let pending
        try {
          const sessions = ctx.get('sessions')
          if (!sessions || typeof sessions.search !== 'function') {
            finish()
            return
          }
          pending = sessions.search(phrase, controller ? controller.signal : undefined)
        } catch {
          finish()
          return
        }
        Promise.resolve(pending).then(function (result) {
          if (disposed) return
          if (!result || result.ok === false) {
            setSessionResults([])
            return
          }
          const value = result.ok === true ? result.value : result
          const items = value && Array.isArray(value.items) ? value.items : []
          setSessionResults(mapSessionSearchResults(items, 8))
        }).catch(function () {
          if (!disposed) setSessionResults([])
        }).finally(function () {
          finish()
        })
      }, 240)
      return function () {
        disposed = true
        window.clearTimeout(timer)
        window.clearTimeout(searchTimeout)
        if (controller) {
          try {
            controller.abort()
          } catch {
            /* ignore */
          }
        }
      }
    }, [open, query])

    React.useEffect(function () {
      if (!open || !listRef.current) return undefined
      const rows = listRef.current.querySelectorAll('[data-ccm-index]')
      const row = rows[activeIndex]
      if (row && typeof row.scrollIntoView === 'function') {
        row.scrollIntoView({ block: 'nearest' })
      }
      return undefined
    }, [activeIndex, open, items.length])

    if (!open) return null

    const groups = groupItems(items)
    let rowIndex = -1
    const children = []
    for (const group of groups) {
      children.push(React.createElement('div', { key: 'g:' + group.section, className: 'ccm-palette-section' }, t('palette.section.' + group.section)))
      for (const item of group.items) {
        rowIndex += 1
        const index = rowIndex
        children.push(React.createElement('button', {
          key: 'i:' + item.id,
          type: 'button',
          'data-ccm-index': index,
          className: 'ccm-palette-item' + (index === activeIndex ? ' is-active' : ''),
          onMouseEnter: function () { setActiveIndex(index) },
          onClick: function () { runItem(item) },
        }, [
          React.createElement(Glyph, { key: 'g' }),
          React.createElement('span', { key: 'm', className: 'ccm-palette-item-main' }, [
            React.createElement('span', { key: 't', className: 'ccm-palette-item-title' }, item.title),
            item.detail ? React.createElement('span', { key: 'd', className: 'ccm-palette-item-detail' }, item.detail) : null,
          ]),
          item.state ? React.createElement('span', { key: 's', className: 'ccm-palette-item-state' }, item.state) : null,
        ]))
      }
    }

    const runItem = function (item) {
      try {
        item.run()
      } catch (error) {
        if (typeof console !== 'undefined') console.warn('[dsh-claude-mode] action failed', error)
      }
      if (item.keepOpen !== true) close()
    }

    const body = items.length
      ? children
      : [React.createElement('div', { key: 'empty', className: 'ccm-palette-empty' }, query ? t('palette.noResults') : t('palette.empty'))]

    return React.createElement('div', {
      className: 'ccm-palette-backdrop' + motionClass(settings),
      'data-claude-mode': '',
      onMouseDown: function (event) {
        if (event.target === event.currentTarget) close()
      },
    }, React.createElement('div', {
      className: 'ccm-palette',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': t('palette.title'),
    }, [
      React.createElement('div', { key: 'head', className: 'ccm-palette-head' }, [
        React.createElement(Glyph, { key: 'g' }),
        React.createElement('input', {
          key: 'in',
          ref: inputRef,
          className: 'ccm-palette-input',
          type: 'text',
          value: query,
          placeholder: t('palette.placeholder'),
          'aria-label': t('palette.placeholder'),
          spellCheck: false,
          autoComplete: 'off',
          onChange: function (event) { setQuery(event.target.value) },
        }),
        React.createElement('span', { key: 'h', className: 'ccm-palette-hint' }, t('brand.mark')),
      ]),
      React.createElement('div', { key: 'list', ref: listRef, className: 'ccm-palette-list', role: 'listbox' }, body),
      React.createElement('div', { key: 'foot', className: 'ccm-palette-foot' }, [
        React.createElement('span', { key: 'n', className: 'ccm-palette-foot-item' }, React.createElement(Kbd, null, '↑↓'), t('palette.footer.navigate')),
        React.createElement('span', { key: 'r', className: 'ccm-palette-foot-item' }, React.createElement(Kbd, null, '↵'), t('palette.footer.run')),
        React.createElement('span', { key: 'c', className: 'ccm-palette-foot-item' }, React.createElement(Kbd, null, 'Esc'), t('palette.footer.close')),
        searching ? React.createElement('span', { key: 's', className: 'ccm-palette-foot-status' }, t('palette.search.loading')) : null,
      ]),
    ]))
  }
}

/** Rank actions by a simple subsequence match, preferring title hits. */
export function rankItems(items, query) {
  const needle = String(query || '').trim().toLowerCase()
  if (!needle) return items
  const scored = []
  for (const item of items) {
    const titleScore = fuzzyScore(String(item.title || '').toLowerCase(), needle) * 4
    const bodyScore = fuzzyScore(((item.detail || '') + ' ' + (item.keywords || '')).toLowerCase(), needle)
    const score = Math.max(titleScore, bodyScore > 0 ? bodyScore + 200 : 0)
    if (score > 0) scored.push({ item, score })
  }
  scored.sort(function (left, right) { return right.score - left.score })
  return scored.map(function (entry) { return entry.item })
}

/** Subsequence score; 0 means no match. Prefix/substring matches score higher. */
export function fuzzyScore(haystack, needle) {
  if (!needle) return 1
  const index = haystack.indexOf(needle)
  if (index >= 0) return 1000 - index
  let cursor = 0
  let score = 1
  let streak = 0
  for (const character of needle) {
    const found = haystack.indexOf(character, cursor)
    if (found < 0) return 0
    if (found === cursor) streak += 1
    else streak = 0
    score += 10 + streak * 5 - Math.min(found - cursor, 20)
    cursor = found + 1
  }
  return Math.max(1, score)
}

/** Group ranked actions by section, preserving section order. */
export function groupItems(items) {
  const order = ['appearance', 'behavior', 'session', 'search', 'history']
  const groups = new Map()
  for (const item of items) {
    const section = item.section || 'session'
    if (!groups.has(section)) groups.set(section, [])
    groups.get(section).push(item)
  }
  const result = []
  for (const section of order) {
    if (groups.has(section)) result.push({ section, items: groups.get(section) })
  }
  for (const [section, group] of groups) {
    if (!order.includes(section)) result.push({ section, items: group })
  }
  return result
}

/* ---------------------------------------------------------------------- */
/* Keyboard shortcut sheet                                                 */
/* ---------------------------------------------------------------------- */

/** Section/row data of the shortcut sheet (pure so it can be unit-tested). */
export function shortcutGroups(t) {
  const label = function (key) {
    return t(key)
  }
  return [
    {
      key: 'input',
      title: label('shortcuts.group.input'),
      rows: [
        { keys: ['↵'], label: label('shortcuts.send') },
        { keys: ['⇧', '↵'], label: label('shortcuts.newline') },
        { keys: ['↑', '↓'], label: label('shortcuts.history') },
      ],
    },
    {
      key: 'navigation',
      title: label('shortcuts.group.navigation'),
      rows: [
        { keys: ['⌃', 'K'], label: label('shortcuts.palette') },
        { keys: ['⌥', 'N'], label: label('shortcuts.newSession') },
        { keys: ['?'], label: label('shortcuts.help') },
        { keys: ['⌥', 'B'], label: label('shortcuts.sidebar') },
        { keys: ['Esc'], label: label('shortcuts.interrupt') },
      ],
    },
    {
      key: 'interface',
      title: label('shortcuts.group.interface'),
      rows: [
        { keys: ['⌃', 'K'], label: label('shortcuts.theme') },
        { keys: ['Esc'], label: label('shortcuts.close') },
      ],
    },
  ]
}

/**
 * Build the shortcut sheet (registered into `shell.overlay`).
 *
 * The `?` gesture mirrors Claude Code's empty-composer help: only a focused,
 * empty composer opens the sheet, so typing a question mark still works after
 * the first character.
 */
export function createShortcuts(ctx, store, t) {
  return function Shortcuts() {
    const settings = useSettings(store)
    const [open, setOpen] = React.useState(false)
    const openRef = React.useRef(false)
    openRef.current = open

    React.useEffect(function () {
      const close = function () {
        setOpen(false)
      }
      const dispose = subscribeShortcuts(function () {
        setOpen(true)
      })
      const onKeyDown = function (event) {
        if (event.key === 'Escape' && openRef.current) {
          event.preventDefault()
          close()
          return
        }
        if (!store.get().enabled) return
        if (event.defaultPrevented || event.isComposing) return
        if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
        if (event.key !== '?') return
        if (openRef.current) return
        if (document.querySelector('.ccm-palette')) return
        const composer = activeComposerElement()
        if (!composer || composerText(composer).length > 0) return
        event.preventDefault()
        event.stopPropagation()
        setOpen(true)
      }
      window.addEventListener('keydown', onKeyDown, true)
      return function () {
        window.removeEventListener('keydown', onKeyDown, true)
        dispose()
      }
    }, [])

    if (!open || !settings.enabled) return null

    const groups = shortcutGroups(t)
    return React.createElement('div', {
      className: 'ccm-palette-backdrop ccm-shortcuts-backdrop' + motionClass(settings),
      'data-claude-mode': '',
      onMouseDown: function (event) {
        if (event.target === event.currentTarget) setOpen(false)
      },
    }, React.createElement('div', {
      className: 'ccm-palette ccm-shortcuts',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': t('shortcuts.title'),
    }, [
      React.createElement('div', { key: 'head', className: 'ccm-palette-head' }, [
        React.createElement(Glyph, { key: 'g' }),
        React.createElement('div', { key: 't', className: 'ccm-shortcuts-head-main' }, [
          React.createElement('div', { key: 'title', className: 'ccm-shortcuts-title' }, t('shortcuts.title')),
          React.createElement('div', { key: 'sub', className: 'ccm-shortcuts-subtitle' }, t('shortcuts.subtitle')),
        ]),
      ]),
      React.createElement('div', { key: 'body', className: 'ccm-shortcuts-body' }, groups.map(function (group) {
        return React.createElement('div', { key: group.key, className: 'ccm-shortcuts-group' }, [
          React.createElement('div', { key: 'h', className: 'ccm-shortcuts-group-title' }, group.title),
          ...group.rows.map(function (row, index) {
            return React.createElement('div', { key: group.key + ':' + index, className: 'ccm-shortcut-row' }, [
              React.createElement('span', { key: 'k', className: 'ccm-shortcut-keys' }, row.keys.map(function (key, keyIndex) {
                return React.createElement(Kbd, { key: keyIndex }, key)
              })),
              React.createElement('span', { key: 'l', className: 'ccm-shortcut-label' }, row.label),
            ])
          }),
        ])
      })),
      React.createElement('div', { key: 'foot', className: 'ccm-palette-foot' }, [
        React.createElement('span', { key: 'f', className: 'ccm-palette-foot-item' }, React.createElement(Kbd, null, 'Esc'), t('shortcuts.footer')),
      ]),
    ]))
  }
}

/* ---------------------------------------------------------------------- */
/* Sidebar plugin-icon manager                                             */
/* ---------------------------------------------------------------------- */

/**
 * Build the "plugin icon" section of the sidebar's More menu.
 *
 * Hosts that support panel pinning declare `sidebar.panellist.actions` and pass
 * every customizable panel with its pinned state plus the pin mutation. With
 * enough plugins installed those icons squeeze the workspace list, so this
 * section adds per-icon folding plus one-click collapse/expand for all icons.
 * Hidden icons stay listed here and can be expanded again at any time.
 */
export function createPanelMenu(ctx, store, t) {
  return function PanelMenu(props) {
    const settings = useSettings(store)
    if (!settings.enabled) return null
    const entries = Array.isArray(props.entries) ? props.entries.filter(Boolean) : []
    const pinnedCount = entries.filter(function (entry) { return entry.pinned }).length
    const total = entries.length
    const open = typeof props.onOpen === 'function' ? props.onOpen : function () {}
    const setPinned = typeof props.onPinnedChange === 'function' ? props.onPinnedChange : function () {}
    const dismiss = typeof props.onDismiss === 'function' ? props.onDismiss : function () {}
    const setAll = function (value) {
      for (const entry of entries) setPinned(entry.id, value)
    }

    const children = [
      React.createElement('div', { key: 'head', className: 'ccm-panelmenu-head' }, [
        React.createElement('span', { key: 't', className: 'ccm-panelmenu-title' }, t('panelmenu.title')),
        React.createElement('span', { key: 'c', className: 'ccm-panelmenu-count' }, format(t('panelmenu.count'), { pinned: pinnedCount, total })),
      ]),
      React.createElement('div', { key: 'bulk', className: 'ccm-panelmenu-bulk' }, [
        React.createElement('button', {
          key: 'hide',
          type: 'button',
          className: 'ccm-panelmenu-bulkbtn',
          disabled: pinnedCount === 0,
          onClick: function () { setAll(false) },
        }, t('panelmenu.hideAll')),
        React.createElement('button', {
          key: 'show',
          type: 'button',
          className: 'ccm-panelmenu-bulkbtn',
          disabled: entries.length === 0 || pinnedCount === total,
          onClick: function () { setAll(true) },
        }, t('panelmenu.showAll')),
      ]),
    ]

    if (entries.length === 0) {
      children.push(React.createElement('div', { key: 'empty', className: 'ccm-panelmenu-empty' }, t('panelmenu.empty')))
    } else {
      children.push(React.createElement('div', { key: 'list', className: 'ccm-panelmenu-list' }, entries.map(function (entry) {
        return React.createElement('div', {
          key: entry.id,
          className: 'ccm-panelmenu-row' + (entry.active ? ' is-active' : '') + (entry.pinned ? '' : ' is-hidden'),
        }, [
          React.createElement('button', {
            key: 'open',
            type: 'button',
            className: 'ccm-panelmenu-open',
            title: t('panelmenu.open'),
            onClick: function () {
              open(entry.id)
              dismiss()
            },
          }, [
            React.createElement('span', { key: 'd', className: 'ccm-panelmenu-dot', 'aria-hidden': 'true' }, entry.pinned ? '●' : '○'),
            React.createElement('span', { key: 'n', className: 'ccm-panelmenu-name' }, String(entry.label == null ? entry.id : entry.label)),
          ]),
          React.createElement('button', {
            key: 'pin',
            type: 'button',
            className: 'ccm-panelmenu-toggle',
            'aria-pressed': entry.pinned ? 'true' : 'false',
            title: entry.pinned ? t('panelmenu.hide') : t('panelmenu.show'),
            onClick: function () {
              setPinned(entry.id, !entry.pinned)
            },
          }, entry.pinned ? t('panelmenu.hide') : t('panelmenu.show')),
        ])
      })))
    }

    children.push(React.createElement('div', { key: 'hint', className: 'ccm-panelmenu-hint' }, t('panelmenu.hint')))

    return React.createElement('div', {
      className: 'ccm-panelmenu',
      'data-claude-mode': '',
      role: 'group',
      'aria-label': t('panelmenu.title'),
    }, children)
  }
}

/* ---------------------------------------------------------------------- */
/* Settings section                                                        */
/* ---------------------------------------------------------------------- */

/** Build the Settings page component (registered into `settings.section`). */
export function createSettingsSection(ctx, store, t) {
  return function SettingsSection() {
    const settings = useSettings(store)
    const applied = settings.enabled

    const row = function (key, title, hint, control) {
      return React.createElement('div', { key, className: 'ccm-settings-row' }, [
        React.createElement('div', { key: 'm', className: 'ccm-settings-row-main' }, [
          React.createElement('div', { key: 't', className: 'ccm-settings-row-title' }, title),
          hint ? React.createElement('div', { key: 'h', className: 'ccm-settings-row-hint' }, hint) : null,
        ]),
        React.createElement('div', { key: 'c', className: 'ccm-settings-row-control' }, control),
      ])
    }

    const toggle = function (key, checked, onChange, label) {
      return React.createElement('button', {
        key,
        type: 'button',
        role: 'switch',
        'aria-checked': checked ? 'true' : 'false',
        'aria-label': label,
        className: 'ccm-switch',
        onClick: function () { onChange(!checked) },
      })
    }

    const segment = function (key, value, onChange, options) {
      return React.createElement('div', { key, className: 'ccm-segment', role: 'group' }, options.map(function (option) {
        return React.createElement('button', {
          key: option.value,
          type: 'button',
          'aria-pressed': value === option.value ? 'true' : 'false',
          onClick: function () { onChange(option.value) },
        }, option.label)
      }))
    }

    const themeOptions = [
      { value: 'auto', label: t('settings.theme.auto') },
      { value: 'dark', label: t('settings.theme.dark') },
      { value: 'light', label: t('settings.theme.light') },
    ]

    return React.createElement('div', { className: 'ccm-settings', 'data-claude-mode': '' }, [
      React.createElement('div', { key: 'head', className: 'ccm-settings-head' }, [
        React.createElement('div', { key: 't', className: 'ccm-settings-title' }, t('settings.title')),
        React.createElement('div', { key: 's', className: 'ccm-settings-subtitle' }, t('settings.subtitle')),
      ]),
      React.createElement('div', { key: 'master', className: 'ccm-settings-group' }, [
        row('master', t('settings.master.title'), t('settings.master.hint'),
          toggle('master-switch', settings.enabled, function (next) { store.set({ enabled: next }) }, t('settings.master.title'))),
        row('theme', t('settings.theme.title'), t('settings.theme.hint'),
          segment('theme-seg', settings.theme, function (next) { store.set({ theme: next }) }, themeOptions)),
        applied
          ? React.createElement('div', { key: 'note', className: 'ccm-settings-note' }, '● ' + t('settings.applied'))
          : React.createElement('div', { key: 'note', className: 'ccm-settings-note' }, '○ ' + (settings.enabled ? t('settings.pending') : t('settings.master.hint'))),
      ]),
      React.createElement('div', { key: 'behavior', className: 'ccm-settings-group' }, [
        row('statusbar', t('settings.statusBar.title'), t('settings.statusBar.hint'),
          toggle('statusbar-switch', settings.statusBar, function (next) { store.set({ statusBar: next }) }, t('settings.statusBar.title'))),
        row('turnfooter', t('settings.turnFooter.title'), t('settings.turnFooter.hint'),
          toggle('turnfooter-switch', settings.turnFooter, function (next) { store.set({ turnFooter: next }) }, t('settings.turnFooter.title'))),
        row('animations', t('settings.animations.title'), t('settings.animations.hint'),
          toggle('animations-switch', settings.animations, function (next) { store.set({ animations: next }) }, t('settings.animations.title'))),
        row('sound', t('settings.sound.title'), t('settings.sound.hint'),
          React.createElement('div', { className: 'ccm-settings-inline' }, [
            toggle('sound-switch', settings.sound, function (next) { store.set({ sound: next }) }, t('settings.sound.title')),
            React.createElement('button', {
              key: 'preview',
              type: 'button',
              className: 'ccm-btn ccm-btn-quiet',
              onClick: function () { playCompletionChime() },
            }, t('settings.sound.preview')),
          ])),
      ]),
      React.createElement('div', { key: 'shortcuts', className: 'ccm-settings-group' }, [
        row('sc-palette', t('settings.shortcut.palette'), t('settings.shortcut.hint'),
          React.createElement('span', { className: 'ccm-kv' }, React.createElement(Kbd, null, '⌃K'))),
        row('sc-new', t('settings.shortcut.newSession'), null,
          React.createElement('span', { className: 'ccm-kv' }, React.createElement(Kbd, null, '⌥N'))),
        row('sc-interrupt', t('settings.shortcut.interrupt'), null,
          React.createElement('span', { className: 'ccm-kv' }, React.createElement(Kbd, null, 'Esc'))),
      ]),
      React.createElement('div', { key: 'footer', className: 'ccm-settings-footer' }, [
        React.createElement('button', {
          key: 'reset',
          type: 'button',
          className: 'ccm-btn',
          onClick: function () { store.reset() },
        }, t('settings.reset')),
      ]),
      React.createElement('div', { key: 'about', className: 'ccm-settings-about' }, [
        React.createElement('strong', { key: 't' }, t('settings.about.title')),
        React.createElement('div', { key: 'b' }, t('settings.about.body')),
        React.createElement('div', { key: 'v', className: 'ccm-settings-version' }, format(t('settings.version'), { version: VERSION })),
      ]),
    ])
  }
}

/** Settings navigation icon (registered into `settings.section.icon`). */
export function SettingsIcon() {
  return React.createElement(Glyph, { size: 16 })
}



