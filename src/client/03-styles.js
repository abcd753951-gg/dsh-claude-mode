/**
 * dsh-claude-mode — scoped stylesheet.
 *
 * Every selector is namespaced with `.ccm-` so the host UI is untouched.
 * Colors, radii, and elevations resolve through the active theme tokens, which
 * means the widgets follow the host theme (including when Claude mode is off
 * and the user is on a built-in theme).
 */

/** Stylesheet text inserted once through the Client `styles` builtin. */
export const STYLES = `
/* Unicode status star (✻ U+273B) rendered as a text glyph; the frame is
   swapped by the component, never by a CSS transform, so the pulse keeps its
   six-frame rotation. */
.ccm-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  color: var(--dsw-alias-brand-primary);
  font-family: "Segoe UI Symbol", "Apple Symbols", "Noto Sans Symbols 2", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1;
  font-variant-emoji: text;
  text-align: center;
  white-space: nowrap;
}
.ccm-mono {
  font-family: "SF Mono", "JetBrains Mono", "Fira Code", Consolas, "Liberation Mono", Menlo, monospace;
  font-variant-ligatures: none;
}

/* ------------------------------------------------------------------ */
/* Run / status bar above the composer                                 */
/* ------------------------------------------------------------------ */
.ccm-runbar {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 28px;
  padding: 2px 6px 4px;
  max-width: var(--ccm-content-width, 820px);
  margin: 0 auto;
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
  line-height: 18px;
  user-select: none;
  animation: ccm-fade-in 180ms ease-out both;
}
.ccm-runbar-main {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  white-space: nowrap;
}
.ccm-runbar-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--dsw-alias-label-secondary);
}
.ccm-runbar.is-running .ccm-runbar-status { color: var(--dsw-alias-label-primary); }
.ccm-runbar.is-idle .ccm-glyph { opacity: 0.75; }
.ccm-runbar-elapsed {
  color: var(--dsw-alias-label-tertiary);
  font-variant-numeric: tabular-nums;
}
/* Parenthetical meta: (esc to interrupt · 1m 2s · running tool
   for 3s). The interrupt token stays a real button for pointer and keyboard. */
.ccm-runbar-meta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-caption);
  font-variant-numeric: tabular-nums;
}
.ccm-runbar-meta-sep { opacity: 0.55; }
.ccm-meta-interrupt {
  display: inline;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: inherit;
  cursor: pointer;
}
.ccm-meta-interrupt:hover {
  color: var(--dsw-alias-label-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.ccm-meta-interrupt:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.ccm-runbar-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}
.ccm-runbar-hints {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-caption);
  white-space: nowrap;
}
.ccm-runbar-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Docked hint row uses the same visual rhythm without border chrome. */
.ccm-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-bottom-color: var(--dsw-alias-border-l3);
  border-radius: 5px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 10.5px;
  line-height: 1;
  font-family: "SF Mono", "JetBrains Mono", Consolas, monospace;
}

/* ------------------------------------------------------------------ */
/* Composer chip + interrupt button                                    */
/* ------------------------------------------------------------------ */
.ccm-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  padding: 0 8px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
}
.ccm-chip:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-primary);
  border-color: var(--dsw-alias-border-l2);
}
.ccm-chip:focus-visible,
.ccm-iconbtn:focus-visible,
.ccm-palette-item:focus-visible,
.ccm-switch:focus-visible,
.ccm-segment button:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.ccm-chip .ccm-glyph { width: 12px; height: 12px; font-size: 11px; }
.ccm-chip.is-running { color: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); }
.ccm-chip-sub { color: var(--dsw-alias-label-caption); }

.ccm-queue {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--dsw-alias-state-warn-tertiary);
  color: var(--dsw-alias-state-warn-label);
  font-size: 11.5px;
  cursor: default;
}

/* ------------------------------------------------------------------ */
/* Conversation header button                                          */
/* ------------------------------------------------------------------ */
.ccm-iconbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-sm);
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}
.ccm-iconbtn:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-primary);
}
.ccm-iconbtn.is-running { color: var(--dsw-alias-brand-primary); }
.ccm-iconbtn .ccm-glyph { width: 16px; height: 16px; font-size: 15px; }

/* Read-aloud entry inside the host's assistant IconActions strip. It keeps
   that strip's 28px rhythm and only adds a speaking state. */
.ccm-readaloud {
  width: 26px;
  height: 26px;
  color: var(--dsw-alias-label-secondary);
}
.ccm-readaloud:hover { color: var(--dsw-alias-label-primary); }
.ccm-readaloud.is-speaking { color: var(--dsw-alias-brand-primary); }
.ccm-readaloud .ccm-action-icon { display: block; }
.ccm-readaloud[data-speaking="true"] { opacity: 1; }

/* ------------------------------------------------------------------ */
/* Command palette                                                     */
/* ------------------------------------------------------------------ */
.ccm-palette-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2400;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 14vh 16px 16px;
  background: var(--dsw-alias-bg-mask-1);
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);
  animation: ccm-fade-in 120ms ease-out both;
}
.ccm-palette {
  display: flex;
  flex-direction: column;
  width: min(660px, 100%);
  max-height: min(62vh, 620px);
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-xl);
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsw-shadow-lv3);
  animation: ccm-pop-in 150ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.ccm-palette-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px 10px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
}
.ccm-palette-head .ccm-glyph { width: 16px; height: 16px; font-size: 15px; }
.ccm-palette-input {
  flex: 1 1 auto;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font-size: 15px;
  line-height: 22px;
  font-family: inherit;
}
.ccm-palette-input::placeholder { color: var(--dsw-alias-label-caption); }
.ccm-palette-hint {
  flex: 0 0 auto;
  color: var(--dsw-alias-label-caption);
  font-size: 11px;
}
.ccm-palette-list {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 6px;
  scrollbar-width: thin;
}
.ccm-palette-section {
  padding: 10px 10px 4px;
  color: var(--dsw-alias-label-caption);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.ccm-palette-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: 0;
  border-radius: var(--dsw-radius-md);
  background: transparent;
  color: var(--dsw-alias-label-primary);
  text-align: left;
  cursor: pointer;
}
.ccm-palette-item .ccm-glyph { color: var(--dsw-alias-label-tertiary); width: 15px; height: 15px; font-size: 13px; }
.ccm-palette-item-main { display: flex; flex-direction: column; min-width: 0; flex: 1 1 auto; }
.ccm-palette-item-title {
  font-size: 13.5px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ccm-palette-item-detail {
  font-size: 11.5px;
  line-height: 16px;
  color: var(--dsw-alias-label-tertiary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ccm-palette-item.is-active {
  background: var(--dsw-alias-interactive-bg-hover-accent);
}
.ccm-palette-item.is-active .ccm-glyph { color: var(--dsw-alias-brand-primary); }
.ccm-palette-item-state {
  flex: 0 0 auto;
  color: var(--dsw-alias-label-caption);
  font-size: 11px;
}
.ccm-palette-empty {
  padding: 22px 14px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 13px;
  text-align: center;
}
.ccm-palette-foot {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 14px;
  border-top: 1px solid var(--dsw-alias-border-l1);
  color: var(--dsw-alias-label-caption);
  font-size: 11px;
}
.ccm-palette-foot-item { display: inline-flex; align-items: center; gap: 5px; }
.ccm-palette-foot-status { margin-left: auto; color: var(--dsw-alias-brand-primary); }

/* ------------------------------------------------------------------ */
/* Turn footer                                                         */
/* ------------------------------------------------------------------ */
.ccm-turn-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 2px 0 6px;
  padding-left: 2px;
  color: var(--dsw-alias-label-caption);
  font-size: 11.5px;
  line-height: 16px;
  user-select: none;
  animation: ccm-fade-in 200ms ease-out both;
}
.ccm-turn-footer .ccm-glyph { width: 12px; height: 12px; font-size: 11px; color: var(--dsw-alias-brand-primary); opacity: 0.9; }
.ccm-turn-footer-sep { opacity: 0.6; padding: 0 2px; }

/* ------------------------------------------------------------------ */
/* Settings section                                                    */
/* ------------------------------------------------------------------ */
.ccm-settings {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 4px 4px 32px;
  max-width: 720px;
  color: var(--dsw-alias-label-primary);
}
.ccm-settings-head { display: flex; flex-direction: column; gap: 4px; }
.ccm-settings-title { font-size: 20px; line-height: 28px; font-weight: 600; }
.ccm-settings-subtitle { color: var(--dsw-alias-label-tertiary); font-size: 13px; line-height: 20px; }
.ccm-settings-group {
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-lg);
  background: var(--dsw-alias-bg-layer-1);
  overflow: hidden;
}
.ccm-settings-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
}
.ccm-settings-row:last-child { border-bottom: 0; }
.ccm-settings-row-main { display: flex; flex-direction: column; gap: 2px; flex: 1 1 auto; min-width: 0; }
.ccm-settings-row-title { font-size: 13.5px; line-height: 20px; font-weight: 500; }
.ccm-settings-row-hint { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary); }
.ccm-settings-row-control { flex: 0 0 auto; padding-top: 1px; }
.ccm-settings-inline { display: flex; align-items: center; gap: 8px; }
.ccm-btn-quiet { height: 25px; padding: 0 9px; font-size: 11.5px; }
.ccm-settings-note {
  font-size: 11.5px;
  color: var(--dsw-alias-label-caption);
  line-height: 17px;
  padding: 0 16px 12px;
}
.ccm-switch {
  position: relative;
  width: 36px;
  height: 21px;
  padding: 0;
  border: 1px solid var(--dsw-alias-border-l3);
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-3);
  cursor: pointer;
  transition: background 140ms ease, border-color 140ms ease;
}
.ccm-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 15px;
  height: 15px;
  border-radius: 999px;
  background: var(--dsw-alias-label-tertiary);
  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), background 140ms ease;
}
.ccm-switch[aria-checked="true"] {
  background: var(--dsw-alias-brand-primary);
  border-color: var(--dsw-alias-brand-primary);
}
.ccm-switch[aria-checked="true"]::after {
  transform: translateX(15px);
  background: var(--dsw-alias-label-primary-foreground);
}
.ccm-segment {
  display: inline-flex;
  padding: 2px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-layer-2);
}
.ccm-segment button {
  height: 24px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}
.ccm-segment button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: var(--dsw-shadow-lv1);
}
.ccm-settings-footer { display: flex; align-items: center; gap: 12px; }
.ccm-btn {
  height: 30px;
  padding: 0 12px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font-size: 12.5px;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease;
}
.ccm-btn:hover { background: var(--dsw-alias-interactive-bg-hover); border-color: var(--dsw-alias-border-l3); }
.ccm-settings-about {
  padding: 14px 16px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-lg);
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.ccm-settings-about strong { color: var(--dsw-alias-label-primary); font-weight: 500; }
.ccm-settings-version { color: var(--dsw-alias-label-caption); font-size: 11px; margin-top: 6px; }
.ccm-kv { display: inline-flex; align-items: center; gap: 8px; }
.ccm-kv-label { color: var(--dsw-alias-label-secondary); font-size: 12px; }

.ccm-sidebtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-label-caption);
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}
.ccm-sidebtn:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-secondary);
}
.ccm-sidebtn:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}

/* ------------------------------------------------------------------ */
/* Keyboard shortcut sheet                                             */
/* ------------------------------------------------------------------ */
.ccm-shortcuts { width: min(560px, 100%); }
.ccm-shortcuts-head-main { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.ccm-shortcuts-title { font-size: 14px; line-height: 20px; font-weight: 500; color: var(--dsw-alias-label-primary); }
.ccm-shortcuts-subtitle { font-size: 11.5px; line-height: 16px; color: var(--dsw-alias-label-tertiary); }
.ccm-shortcuts-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 20px;
  padding: 10px 14px 12px;
  overflow-y: auto;
  scrollbar-width: thin;
}
.ccm-shortcuts-group { display: flex; flex-direction: column; gap: 2px; min-width: 0; padding: 4px 0; }
.ccm-shortcuts-group-title {
  padding: 4px 0 6px;
  color: var(--dsw-alias-label-caption);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.ccm-shortcut-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 24px;
}
.ccm-shortcut-keys { display: inline-flex; align-items: center; gap: 4px; flex: 0 0 auto; }
.ccm-shortcut-label { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; text-align: right; }

/* ------------------------------------------------------------------ */
/* Sidebar plugin-icon manager (inside the Host's panel More menu)     */
/* ------------------------------------------------------------------ */
.ccm-panelmenu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 220px;
  max-width: 100%;
  padding: 6px 4px 8px;
  color: var(--dsw-alias-label-primary);
}
.ccm-panelmenu-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  padding: 2px 6px;
}
.ccm-panelmenu-title { font-size: 12px; font-weight: 500; color: var(--dsw-alias-label-primary); }
.ccm-panelmenu-count { font-size: 11px; color: var(--dsw-alias-label-caption); font-variant-numeric: tabular-nums; }
.ccm-panelmenu-bulk { display: flex; gap: 6px; padding: 0 4px; }
.ccm-panelmenu-bulkbtn {
  flex: 1 1 0;
  height: 26px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 7px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}
.ccm-panelmenu-bulkbtn:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-primary);
}
.ccm-panelmenu-bulkbtn:disabled { opacity: 0.45; cursor: default; }
.ccm-panelmenu-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  max-height: 240px;
  overflow-y: auto;
  padding: 2px;
  scrollbar-width: thin;
}
.ccm-panelmenu-row { display: flex; align-items: center; gap: 4px; border-radius: 7px; padding: 1px; }
.ccm-panelmenu-row:hover { background: var(--dsw-alias-interactive-bg-hover); }
.ccm-panelmenu-open {
  display: flex;
  align-items: center;
  gap: 7px;
  flex: 1 1 auto;
  min-width: 0;
  height: 27px;
  padding: 0 6px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}
.ccm-panelmenu-dot { flex: 0 0 auto; font-size: 9px; color: var(--dsw-alias-brand-primary); }
.ccm-panelmenu-row.is-hidden .ccm-panelmenu-dot { color: var(--dsw-alias-label-caption); }
.ccm-panelmenu-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ccm-panelmenu-row.is-active .ccm-panelmenu-name { color: var(--dsw-alias-brand-primary); }
.ccm-panelmenu-toggle {
  flex: 0 0 auto;
  height: 22px;
  padding: 0 7px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: transparent;
  color: var(--dsw-alias-label-caption);
  font-size: 10.5px;
  cursor: pointer;
  transition: color 120ms ease, border-color 120ms ease;
}
.ccm-panelmenu-toggle:hover { color: var(--dsw-alias-label-secondary); border-color: var(--dsw-alias-border-l3); }
.ccm-panelmenu-row.is-hidden .ccm-panelmenu-toggle {
  color: var(--dsw-alias-brand-primary);
  border-color: var(--dsw-alias-brand-primary);
}
.ccm-panelmenu-open:focus-visible,
.ccm-panelmenu-toggle:focus-visible,
.ccm-panelmenu-bulkbtn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.ccm-panelmenu-empty { padding: 8px 6px; font-size: 11.5px; color: var(--dsw-alias-label-caption); }
.ccm-panelmenu-hint { padding: 0 6px; font-size: 10.5px; line-height: 15px; color: var(--dsw-alias-label-caption); }

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */
@keyframes ccm-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes ccm-pop-in {
  from { opacity: 0; transform: translateY(-6px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.ccm-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--dsw-alias-brand-primary);
  animation: ccm-pulse 1.6s ease-in-out infinite;
}
@keyframes ccm-pulse {
  0%, 100% { opacity: 0.35; transform: scale(0.85); }
  50% { opacity: 1; transform: scale(1); }
}
.ccm-no-motion .ccm-glyph,
.ccm-no-motion .ccm-pulse-dot,
.ccm-no-motion .ccm-runbar,
.ccm-no-motion .ccm-palette,
.ccm-no-motion .ccm-palette-backdrop,
.ccm-no-motion .ccm-turn-footer { animation: none !important; }
.ccm-no-motion .ccm-switch::after,
.ccm-no-motion .ccm-palette-item,
.ccm-no-motion .ccm-chip,
.ccm-no-motion .ccm-meta-interrupt { transition: none !important; }

@media (prefers-reduced-motion: reduce) {
  .ccm-glyph,
  .ccm-pulse-dot,
  .ccm-runbar,
  .ccm-palette,
  .ccm-palette-backdrop,
  .ccm-turn-footer { animation: none !important; }
  .ccm-switch::after,
  .ccm-palette-item,
  .ccm-chip,
  .ccm-meta-interrupt { transition: none !important; }
}

@media (max-width: 640px) {
  .ccm-palette-backdrop { padding: 8vh 10px 10px; }
  .ccm-runbar-hints { display: none; }
  .ccm-settings-row { flex-direction: column; gap: 8px; }
  .ccm-settings-row-control { align-self: flex-start; }
}

@media (max-width: 560px) {
  .ccm-shortcuts-body { grid-template-columns: 1fr; }
}
`
