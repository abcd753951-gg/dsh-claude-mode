# Claude mode (dsh-claude-mode)

A pure-slot Claude Code-style interaction layer for DeepSeek Harness: a neutral-grey + terracotta theme pair, a pulsing status star, a command palette, rotating turn-completion footers, and keyboard-first flows. No host files are edited and the app root is never replaced; disabling or uninstalling restores the previous theme and removes every widget.

0.5.0 adds four interactions: chat-history search inside the palette, read-aloud for assistant replies, a turn-completion chime, and `Alt+N` for a new session. See [the design notes](docs/DESIGN.md).

> Independent implementation built only on DeepSeek Harness public slots and services. It bundles no third-party source code, trademark, icon, or artwork; the palette and interactions are this plugin's own presentation layer and it is not affiliated with Anthropic. See [NOTICE](NOTICE).

![Dark session](docs/preview/dark-session.png)

## What ships

| Capability | Slot / service | Behavior |
| --- | --- | --- |
| Dual theme | `theme.overrideTokens` token layer | Two ~200-token `--dsw-*` packs (neutral charcoal / neutral light). Brand `#d77757`, user bubble `#373737/#f0f0f0`, composer `#262626/#f5f5f5`, selection `#264f78/#b4d5ff`, state and diff colors come from the plugin's unified design tokens. Token-only override; no host CSS is touched. |
| Run status bar | `conversation.input.dock` | Idle hints (`↵ send · ⇧↵ newline · ↑ history · / commands · @ files · ⌃K palette · ? shortcuts`); while running: `✻ <verb>… (esc to interrupt · 12s · running tool for 3s)` — a six-frame Unicode star pulsing forward and back over two seconds (100 ms refresh), plus live tool duration from the Chat snapshot. |
| Prompt history | run-bar keydown + command palette | With an empty composer, `↑` recalls previous prompts and `↓` moves newer / restores the saved draft (finalized user/steering nodes from the Chat snapshot, deduped, newest first). The `⌃K` palette adds a "Prompt history" group (12 most recent, fuzzy-searchable, selecting fills the composer). |
| Shortcut sheet | `shell.overlay` | With an empty composer, `?` (or the palette action) opens a sheet grouped into Input / Navigation / Interface; `Esc` or the backdrop closes it. Matches Claude Code's `? for shortcuts`, which only triggers on empty input. The sheet now lists `Alt+N` too. |
| Chat-history search | `sessions.search` + palette | Typing at least two characters in `⌃K` debounces a call into the host's full-text session index; hits appear under "Chats" with a snippet and `↵` opens that session. `Alt`/closing aborts the request and a 12-second timeout clears the loading state. The host's `session-query-sqlite` defaults to `openAt: never`, so this group only returns rows when the deployment enables the index; otherwise it silently disappears. |
| Read-aloud | `conversation.chat.assistant-actions` | Every finalized assistant message gets a speaker button in its action strip. It reads the message prose with the Web Speech API and toggles to Stop; Chinese/English follows the UI locale and long replies are chunked into ≤1200-character utterances. Browsers without speech synthesis omit the button. |
| Completion chime | run-bar transition + settings | When a running turn ends and the toggle is on, a two-note WebAudio chime (E5→B5) plays, audible even with the window unfocused. Off by default; preview in Settings and toggle from the palette. Playback failures are swallowed. |
| New-session shortcut | `uiWorkspace.startSession` + global key | `Alt+N` opens a blank session from any non-modal screen, equivalent to the palette's "New session"; the shortcut sheet and Settings list the binding. |
| Collapsible sidebar | `layout` service | The run-bar `«` button, the palette action, and `Alt+B` call `ctx.layout.toggleSidebar()`; the host then renders its 56 px control rail so the sidebar stops eating conversation width. |
| Folding plugin icons | `sidebar.panellist.actions` | Too many plugin icons above the workspace list squeeze the session list. A new "Plugin icons" section in the sidebar's More menu adds per-icon Show/Hide, one-click Collapse all / Expand all, and an `N/M shown` count; hidden icons stay in that menu and can be restored. The palette also offers "Manage sidebar plugin icons". |
| Command palette | `shell.overlay` | `Ctrl+K` / `⌘K`: fuzzy search, grouped sections (appearance / interaction / session / chats / history), ↑↓·Tab/Enter/Esc, hover and click, backdrop close. Actions: mode toggle, three theme choices, status-bar/footer/motion/sound toggles, sidebar toggle, plugin-icon manager, shortcut sheet, interrupt, new session; two or more characters also search chat history. |
| Turn footer | `conversation.chat.turnTail` | `✻ Baked for 1m 2s · 3 steps`; the completion word rotates per turn through `Baked / Brewed / Churned / Cogitated / Cooked / Crunched / Sautéed / Worked` (or `烘焙/酿造/搅拌/推敲/烹饪/咀嚼/煸炒/打磨` in zh). Registers against both the modern list slot and the older chain slot. |
| Header button | `conversation.session.header.utilities` | Top-right `✻` opens the palette; accented while running. |
| Settings page | `settings.section` + `settings.section.icon` | Master switch, theme segment, widget/motion/sound toggles, sound preview, shortcut reference, reset, about/version. |
| Motion | component CSS/JS | Frame-by-frame star pulse, panel entrance, control transitions; respects `prefers-reduced-motion` and the plugin motion toggle (static `✻` when off). |

![Dark palette](docs/preview/dark-palette.png)

## Install

Ask the agent to install the local directory bundle:

```text
plugin_manager install_bundle, target = <absolute path to this checkout>
```

The bundle is written into the current profile (default `desktop`). Reload the Web GUI (or the desktop window) to see it; uninstalling removes the theme layer and every widget.

The directory is also a normal npm package: both `dsh.bundle.patch` and `dsh.client` are declared.

## Usage

- `Ctrl+K` / `⌘K`: command palette; type two or more characters to search chat history.
- `Alt+N`: open a blank session.
- The speaker in an assistant action strip reads that reply aloud; click again to stop.
- Top-right `✻`: command palette.
- `esc to interrupt` in the run bar: cancel the running turn, keeping finished tool results and queued messages.
- Settings → Claude mode: switches, theme segment, completion-sound preview, reset.
- "Follow system" swaps between the neutral charcoal and neutral light packs with the OS scheme.

![Chat-history search](docs/preview/palette-chat-search.png)

![Read-aloud action](docs/preview/assistant-readaloud.png)

![Completion-sound setting](docs/preview/settings-sound.png)

![New shortcuts](docs/preview/shortcuts-new.png)

![Light session](docs/preview/light-session.png)

![Folding plugin icons](docs/preview/sidebar-panels.png)

![Shortcut sheet](docs/preview/shortcuts-light.png)

![Prompt-history group](docs/preview/palette-history.png)

## Design rules

1. **Public extension points only**: the `theme` token layer; `conversation.input.dock`, `conversation.chat.turnTail`, `conversation.chat.assistant-actions`, `conversation.session.header.utilities`, `shell.overlay`, `sidebar.panellist.actions`, `settings.section` (+ icon); the `sessions.search` and `uiWorkspace` services; and the `locale` service. No occupied keyed slot is replaced.
2. **Reversible**: the theme is an override layer that is removed when the master switch is turned off; all widgets die with the plugin context.
3. **Never take over the conversation view**: chat nodes, tool cards, approvals, composer, and queue stay host-rendered.
4. **Accessible**: palette is a labeled modal, switches are `role="switch"`, segments use `aria-pressed`, the pulse honours reduced motion, and focus rings are visible.
5. **No brand assets**: the star is the Unicode character `✻` (U+273B); no Anthropic icon, font, or screenshot is bundled.

## Known edges

- The conversation view is not replaced: thinking blocks, tool cards, diffs, and approvals remain host-rendered (which also keeps uninstall and host upgrades safe).
- An approval/question card can temporarily occupy the composer area, hiding the run bar; the card itself offers allow/deny/stop.
- The `?` gesture only triggers on a focused, empty composer; with text present it stays a normal question mark. `Ctrl+R` (reload) and `Ctrl+S` (save) are not hijacked — prompt search lives inside the `⌃K` palette.
- The sidebar toggle needs the host `layout` service; without it the run-bar `«` button hides and the palette action degrades to a no-op.
- Plugin-icon folding needs the host's panel-pin plumbing: DSH 0.2.x exposes panel visibility and callbacks through `sidebar.panellist.actions`, so the plugin only adds a manager section to the More menu. Older hosts without that slot silently omit the section. The built-in More menu does not offer pin controls; this section adds that capability.
- Chat-history search needs the host full-text index: `sessions.search` only returns rows after a deployment changes `session-query-sqlite`'s `openAt` from `never` to `first-search` or `startup` (DSH ships it disabled and the Web sidebar searches titles/workspaces only). The plugin degrades silently, never fakes results, and shows "Searching chat history…" for at most 12 seconds while the first index build runs.
- Read-aloud needs browser speech synthesis; without `speechSynthesis` the button is absent. Voice and rate are chosen by the OS/browser; the plugin only prefers a voice matching the UI language. Changing message or unmounting cancels speech.
- The completion chime is off by default; a browser-suspended AudioContext fails silently and never affects the turn.
- `Alt+N` yields to any host binding that already handled the event.
- Settings live in the Web GUI origin; changing the `dsh web` port is a different origin and therefore a fresh settings scope.
- The theme layer needs the host `theme` service; without it the other widgets still work but keep the host colors.

## Development

```bash
npm run build:client   # generate client.js from src/client/*.js
npm run check          # syntax + bundle freshness
npm test               # 31 unit tests (tokens, i18n, store, ranking, word pools, frames, activity, history recall, chat-search mapping, read-aloud text/chunking, shortcut sheet, panel-icon manager, renders)
node --check index.js && node --check client.js
```

## Compatibility

- Verified on **DSH 0.2.2-rc.1** (Desktop) and **0.1.2-rc.1** (`dsh web`); the turn footer registers under both slot declarations.
- Every dependency is a public slot or service. If a host rename happens, the affected widget degrades (disappears) instead of breaking the host.

## License

MIT. The interaction and visual layer are an independent implementation; "Claude" is used descriptively. See [NOTICE](NOTICE) and [the design notes](docs/DESIGN.md).
