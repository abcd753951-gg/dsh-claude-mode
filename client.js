/* dsh-claude-mode client bundle — generated from src/client/*.js; do not edit directly. */
window.__ModuleLoader__.load({
  id: 'dsh-claude-mode',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    /**
     * dsh-claude-mode — Claude Code 风格的中性主题与交互层。
     *
     * This file is generated from src/client/*.js by scripts/build-client.mjs.
     * Edit the sources, then run `npm run build:client`.
     */

/**
 * dsh-claude-mode — theme token packs.
 *
 * The Harness theme service applies every token in `active.tokens` as an
 * inline CSS custom property on `document.body`, so this layer can override
 * the whole `--dsw-*` design system rather than only the documented alias
 * subset. Two packs are carried: a neutral-charcoal "Claude midnight" and a
 * neutral-light "Claude daylight"; the active base scheme picks one and
 * `setTheme()` only ever writes a built-in light/dark/system preference.
 *
 * Design notes: the concrete values in this file form a self-contained
 * neutral-charcoal / neutral-light palette for the brand accent, user-message
 * block, composer surface, text selection, state and diff roles. The palette
 * and glyphs are this plugin's own presentation layer; the status glyph is a
 * standard Unicode character. This plugin is an independent implementation
 * and is not affiliated with Anthropic.
 */

/** Stable theme ids. */
const THEME_DARK = 'claude-mode-dark'
const THEME_LIGHT = 'claude-mode-light'

/** Both ids, for membership checks. */
const THEME_IDS = [THEME_DARK, THEME_LIGHT]

/**
 * Build one concrete token dictionary from a palette.
 *
 * @param {object} p - palette roles for one color scheme.
 * @returns {Record<string, string>} token name -> CSS value.
 */
function build(p) {
  return {
    /* ---------------------------------------------------------------- */
    /* Surfaces                                                          */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-bg-base': p.bg0,
    '--dsw-alias-bg-layer-1': p.bg1,
    '--dsw-alias-bg-layer-2': p.bg2,
    '--dsw-alias-bg-layer-3': p.bg3,
    '--dsw-alias-bg-overlay': p.bg4,
    '--dsw-alias-bg-skeleton': p.skeleton,
    '--dsw-alias-bg-mask-1': p.mask1,
    '--dsw-alias-bg-mask-2': p.mask2,
    '--dsw-alias-bg-mask-3': p.mask3,
    '--dsw-alias-bg-mask-photo': p.maskPhoto,
    '--dsw-alias-bg-mask-drop': p.maskDrop,
    '--dsw-alias-bg-document-preview': p.bg2,
    '--dsw-alias-bg-document-selection': p.docSelection,
    '--dsw-alias-bg-module-platform': p.bg0,
    '--dsw-alias-bg-multi-select': p.bg2,

    /* ---------------------------------------------------------------- */
    /* Labels                                                            */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-label-primary': p.text1,
    '--dsw-alias-label-primary-dimmed': p.text1Dim,
    '--dsw-alias-label-primary-inverted': p.textInvert,
    '--dsw-alias-label-primary-foreground': p.onAccent,
    '--dsw-alias-label-primary-bluish': p.text1,
    '--dsw-alias-label-secondary': p.text2,
    '--dsw-alias-label-tertiary': p.text3,
    '--dsw-alias-label-caption': p.text4,
    '--dsw-alias-label-dimmed': p.text4,
    '--dsw-alias-label-document-preview': p.text2,
    '--dsw-alias-label-shimmer': p.shimmer,
    '--dsw-alias-label-deep-diving': p.accent,
    '--dsw-alias-label-deep-diving-shimmer': p.deepDiveShimmer,

    /* ---------------------------------------------------------------- */
    /* Borders and dividers                                              */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-border-l1': p.border1,
    '--dsw-alias-border-l2': p.border2,
    '--dsw-alias-border-l3': p.border3,
    '--dsw-alias-border-l4': p.border4,
    '--dsw-alias-border-l2-darkmode-thin': p.border2,
    '--dsw-alias-border-inverted': 'transparent',
    '--dsw-alias-border-inverted2': 'transparent',

    /* ---------------------------------------------------------------- */
    /* Brand and links                                                   */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-brand-primary': p.accent,
    '--dsw-alias-brand-primary-invert': p.text1,
    '--dsw-alias-brand-primary-new-colorprimary-new-color': p.accent,
    '--dsw-alias-brand-text': p.text1,
    '--dsw-alias-link': p.link,

    /* ---------------------------------------------------------------- */
    /* States                                                            */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-state-idle-primary': p.idle,
    '--dsw-alias-state-success-primary': p.green,
    '--dsw-alias-state-success-secondary': p.greenSoft,
    '--dsw-alias-state-success-tertiary': p.greenBg,
    '--dsw-alias-state-warn-primary': p.amber,
    '--dsw-alias-state-warn-secondary': p.amberSoft,
    '--dsw-alias-state-warn-tertiary': p.amberBg,
    '--dsw-alias-state-warn-label': p.amber,
    '--dsw-alias-state-error-primary': p.red,
    '--dsw-alias-state-error-secondary': p.redSoft,
    '--dsw-alias-state-done-primary': p.violet,
    '--dsw-alias-state-business-primary': p.accent,
    '--dsw-alias-state-business-tertiary': p.accentBg,

    /* ---------------------------------------------------------------- */
    /* Buttons                                                           */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-button-primary-fill': p.accentStrong,
    '--dsw-alias-button-primary-hover': p.accentStrongHover,
    '--dsw-alias-button-primary-dimmed': p.bg3,
    '--dsw-alias-button-ghost-active-fill': p.bg3,
    '--dsw-alias-button-ghost-active-hover': p.bg4,
    '--dsw-alias-button-ghost-active-border': p.text3,
    '--dsw-alias-button-elevated-fill': p.bg2,
    '--dsw-alias-button-floating-fill': p.bg2,
    '--dsw-alias-button-floating-hover': p.bg3,
    '--dsw-alias-button-contrast-fill': p.bg4,
    '--dsw-alias-button-tool-bar-fill': p.toolbar,
    '--dsw-alias-button-tool-bar-hover': p.toolbarHover,
    '--dsw-alias-button-tool-bar-fill-invisible': p.toolbarInvisible,
    '--dsw-alias-button-info-fill': p.accentStrong,
    '--dsw-alias-button-info-hover': p.accentStrongHover,

    /* ---------------------------------------------------------------- */
    /* Interaction                                                       */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-interactive-bg-hover': p.hover,
    '--dsw-alias-interactive-bg-active': p.active,
    '--dsw-alias-interactive-bg-hover-solid': p.bg2,
    '--dsw-alias-interactive-bg-hover-accent': p.hoverAccent,
    '--dsw-alias-interactive-bg-hover-danger': p.hoverDanger,
    '--dsw-alias-turn-trigger-bg': p.turnTrigger,
    '--dsw-alias-turn-trigger-bg-hover': p.turnTriggerHover,

    /* ---------------------------------------------------------------- */
    /* Markdown, code and diffs                                          */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-markdown-code-block': p.codeBg,
    '--dsw-alias-markdown-code-block-banner': p.codeBanner,
    '--dsw-alias-markdown-inline-code': p.inlineCode,
    '--dsw-alias-markdown-code-segment-selected': p.codeSegment,
    '--dsw-alias-markdown-code-segment-unselected': p.codeBg,
    '--dsw-alias-markdown-tag': p.inlineCode,
    '--dsw-alias-markdown-placeholder': p.inlineCode,
    '--dsw-alias-markdown-citation': p.inlineCode,
    '--dsw-alias-code-diff-added': p.diffAddedBg,
    '--dsw-alias-code-diff-deleted': p.diffDeletedBg,
    '--dsw-alias-file-diff-added-bg': p.diffAddedBgStrong,
    '--dsw-alias-file-diff-added-gutter': p.diffAddedGutter,
    '--dsw-alias-file-diff-added-marker': p.diffAddedWord,
    '--dsw-alias-file-diff-deleted-bg': p.diffDeletedBgStrong,
    '--dsw-alias-file-diff-deleted-gutter': p.diffDeletedGutter,
    '--dsw-alias-file-diff-deleted-marker': p.diffDeletedWord,

    /* ---------------------------------------------------------------- */
    /* Menus, tooltips, toasts, scrollbars                               */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-menu-icon': p.text2,
    '--dsw-alias-menu-group-header-fill': p.menuGroup,
    '--dsw-alias-tooltip-bg': p.tooltipBg,
    '--dsw-alias-tooltip-key-bg': p.tooltipKeyBg,
    '--dsw-alias-toast-bg': p.tooltipBg,
    '--dsw-alias-toast-label': p.toastLabel,
    '--dsw-alias-scrollbar-bg-l1': p.scroll1,
    '--dsw-alias-scrollbar-bg-l2': p.scroll2,
    '--dsw-alias-scrollbar-hover-l1': p.scrollHover,
    '--dsw-alias-scrollbar-hover-l2': p.scrollHover,

    /* ---------------------------------------------------------------- */
    /* Cards, illustrations, onboarding, switch                          */
    /* ---------------------------------------------------------------- */
    '--dsw-alias-switch-thumb': p.switchThumb,
    '--dsw-alias-settings-card-fill': p.bg2,
    '--dsw-alias-settings-card-stroke': p.border2,
    '--dsw-alias-illustration-surface': p.artSurface,
    '--dsw-alias-illustration-shadow': p.artShadow,
    '--dsw-alias-illustration-backing': p.artBacking,
    '--dsw-alias-illustration-background': p.artSurface,
    '--dsw-alias-illustration-inset': p.artInset,
    '--dsw-alias-illustration-detail': p.artDetail,
    '--dsw-alias-onboarding-accent': p.accent,
    '--dsw-alias-onboarding-card-fill': p.cardFill,
    '--dsw-alias-onboarding-secondary-fill': p.bg2,
    '--dsw-alias-onboarding-checkbox-border': p.border3,

    /* ---------------------------------------------------------------- */
    /* Specific surfaces                                                 */
    /* ---------------------------------------------------------------- */
    '--dsw-specific-sidebar-fill': p.sidebar,
    '--dsw-specific-selector': p.bg2,
    '--dsw-specific-bubble': p.bubble,
    '--dsw-specific-bubble-highlight': p.bubbleHighlight,
    '--dsw-specific-menu': p.menu,
    '--dsw-specific-input-major': p.composer,
    '--dsw-specific-login-input': p.bg2,
    '--dsw-specific-tip': p.bg2,
    '--dsw-specific-sidebar-nav-item-active': p.bg2,
    '--dsw-specific-sidebar-nav-item-active-accent': p.navAccent,

    /* ---------------------------------------------------------------- */
    /* Brand palette (terracotta ramp)                                   */
    /* ---------------------------------------------------------------- */
    '--dsw-static-deepseek-50': p.ramp50,
    '--dsw-static-deepseek-100': p.ramp100,
    '--dsw-static-deepseek-200': p.ramp200,
    '--dsw-static-deepseek-300': p.ramp300,
    '--dsw-static-deepseek-400': p.ramp400,
    '--dsw-static-deepseek-450': p.ramp450,
    '--dsw-static-deepseek-500': p.ramp500,
    '--dsw-static-deepseek-600': p.ramp600,
    '--dsw-static-deepseek-700-delete': p.ramp700,
    '--dsw-static-deepseek-800': p.ramp800,
    '--dsw-static-deepseek-900': p.ramp900,

    '--dsw-static-blue-50': p.ramp50,
    '--dsw-static-blue-50p': p.ramp50,
    '--dsw-static-blue-75': p.ramp75,
    '--dsw-static-blue-100': p.ramp100,
    '--dsw-static-blue-300': p.ramp300,
    '--dsw-static-blue-400': p.ramp400,
    '--dsw-static-blue-450': p.ramp450,
    '--dsw-static-blue-500': p.ramp500,
    '--dsw-static-blue-600': p.ramp600,
    '--dsw-static-blue-800': p.ramp800,
    '--dsw-static-blue-900': p.ramp900,
    '--dsw-static-blue-950': p.ramp900,

    /* Neutral primitives keep direct primitive consumers on the same ramp. */
    '--dsw-static-neutral-00': p.gray0,
    '--dsw-static-neutral-50': p.gray50,
    '--dsw-static-neutral-100': p.gray100,
    '--dsw-static-neutral-150': p.gray150,
    '--dsw-static-neutral-200': p.gray200,
    '--dsw-static-neutral-250': p.gray250,
    '--dsw-static-neutral-300': p.gray300,
    '--dsw-static-neutral-400': p.gray400,
    '--dsw-static-neutral-500': p.gray500,
    '--dsw-static-neutral-550': p.gray550,
    '--dsw-static-neutral-600': p.gray600,
    '--dsw-static-neutral-700': p.gray700,
    '--dsw-static-neutral-800': p.gray800,
    '--dsw-static-neutral-850': p.gray850,
    '--dsw-static-neutral-900': p.gray900,
    '--dsw-static-neutral-1000': p.gray1000,
    '--dsw-static-neutral-bluish-00': p.gray0,
    '--dsw-static-neutral-bluish-50': p.gray50,
    '--dsw-static-neutral-bluish-55': p.gray50,
    '--dsw-static-neutral-bluish-60': p.gray60,
    '--dsw-static-neutral-bluish-75': p.gray75,
    '--dsw-static-neutral-bluish-90': p.gray90,
    '--dsw-static-neutral-bluish-100': p.gray100,
    '--dsw-static-neutral-bluish-150': p.gray150,
    '--dsw-static-neutral-bluish-200': p.gray200,
    '--dsw-static-neutral-bluish-300': p.gray300,
    '--dsw-static-neutral-bluish-310': p.gray300,
    '--dsw-static-neutral-bluish-400': p.gray400,
    '--dsw-static-neutral-bluish-500': p.gray500,
    '--dsw-static-neutral-bluish-600': p.gray600,
    '--dsw-static-neutral-bluish-700': p.gray700,
    '--dsw-static-neutral-bluish-750': p.gray750,
    '--dsw-static-neutral-bluish-800': p.gray800,
    '--dsw-static-neutral-bluish-850': p.gray850,
    '--dsw-static-neutral-bluish-875': p.gray875,
    '--dsw-static-neutral-bluish-900': p.gray900,
    '--dsw-static-neutral-bluish-950': p.gray950,
    '--dsw-static-neutral-bluish-1000': p.gray1000,

    /* ---------------------------------------------------------------- */
    /* Geometry, elevation, backdrop, gradients                          */
    /* ---------------------------------------------------------------- */
    '--dsw-radius-xs': '4px',
    '--dsw-radius-sm': '6px',
    '--dsw-radius-md': '10px',
    '--dsw-radius-lg': '14px',
    '--dsw-radius-xl': '18px',
    '--dsw-radius-panel': '24px',
    '--dsw-shadow-lv1': p.shadow1,
    '--dsw-shadow-lv1-blur': p.shadow1Blur,
    '--dsw-shadow-lv2': p.shadow2,
    '--dsw-shadow-lv3': p.shadow3,
    '--dsw-elevation-soft': p.elevSoft,
    '--dsw-elevation-panel': p.elevPanel,
    '--dsw-elevation-prominent': p.elevProminent,
    '--dsw-elevation-stroke': p.elevStroke,
    '--dsw-elevation-stroke-color': p.elevStrokeColor,
    '--dsw-menu-surface-fill': p.menu,
    '--dsw-menu-backdrop-filter': p.menuBlur,
    '--dsw-linear-gradient-think': p.gradThink,
    '--dsw-linear-think-select': p.gradThinkSelect,
    '--dsw-gradient-onboarding-blue-stops': p.gradBrand,
    '--dsw-gradient-onboarding-violet-stops': p.gradBrand,
    '--dsw-gradient-onboarding-cyan-stops': p.gradBrand,
  }
}

/** Shared neutral primitive ramp (identical in both schemes). */
const NEUTRAL = {
  gray0: '#ffffff',
  gray50: '#fafafa',
  gray60: '#f7f7f7',
  gray75: '#f2f2f2',
  gray90: '#ededed',
  gray100: '#e8e8e8',
  gray150: '#dfdfdf',
  gray200: '#d6d6d6',
  gray250: '#cccccc',
  gray300: '#c2c2c2',
  gray400: '#adadad',
  gray500: '#999999',
  gray550: '#8c8c8c',
  gray600: '#7f7f7f',
  gray700: '#666666',
  gray750: '#5a5a5a',
  gray800: '#4d4d4d',
  gray850: '#414141',
  gray875: '#3a3a3a',
  gray900: '#333333',
  gray950: '#262626',
  gray1000: '#1a1a1a',
}

/** Terracotta ramp anchored on the accent #D77757. */
const RAMP = {
  ramp50: '#fdf4f0',
  ramp75: '#fbebe4',
  ramp100: '#f8ded1',
  ramp200: '#f2c9b4',
  ramp300: '#ecb097',
  ramp400: '#e69476',
  ramp450: '#df8563',
  ramp500: '#d77757',
  ramp600: '#c15f3c',
  ramp700: '#a4563c',
  ramp800: '#8f4f39',
  ramp900: '#3a241c',
}

/* ---------------------------------------------------------------------- */
/* Neutral charcoal scheme                                                   */
/* ---------------------------------------------------------------------- */
const DARK = {
  ...NEUTRAL,
  ...RAMP,
  bg0: '#131313',
  bg1: '#1d1d1d',
  bg2: '#262626',
  bg3: '#313131',
  bg4: '#3a3a3a',
  sidebar: '#171717',
  composer: '#262626',
  codeBg: '#1a1a1a',
  codeBanner: '#212121',
  inlineCode: '#2a2a2a',
  codeSegment: '#313131',
  bubble: '#373737',
  bubbleHighlight: '#464646',
  menu: 'rgba(38, 38, 38, 0.94)',
  menuGroup: 'rgba(38, 38, 38, 0.97)',
  menuBlur: 'blur(28px) saturate(140%)',

  text1: '#f2f2f2',
  text1Dim: '#dcdcdc',
  text2: '#bdbdbd',
  text3: '#999999',
  text4: '#6e6e6e',
  textInvert: '#131313',
  onAccent: '#1c1410',
  shimmer: 'color-mix(in srgb, #ffffff 28%, transparent)',
  deepDiveShimmer: 'color-mix(in srgb, #d77757 50%, #f2f2f2)',
  switchThumb: '#f2f2f2',

  border1: 'rgba(255, 255, 255, 0.07)',
  border2: 'rgba(255, 255, 255, 0.12)',
  border3: 'rgba(255, 255, 255, 0.18)',
  border4: 'rgba(255, 255, 255, 0.27)',

  accent: '#d77757',
  accentHover: '#eb9f7f',
  accentStrong: '#c15f3c',
  accentStrongHover: '#a94f30',
  accentBg: 'rgba(215, 119, 87, 0.16)',
  link: '#b1b9f9',
  green: '#4eba65',
  greenSoft: '#74cf88',
  greenBg: 'rgba(78, 186, 101, 0.16)',
  amber: '#ffc107',
  amberSoft: '#ffd54f',
  amberBg: 'rgba(255, 193, 7, 0.14)',
  red: '#ff6b80',
  redSoft: '#ff95a3',
  violet: '#af87ff',
  idle: '#505050',

  hover: 'rgba(255, 255, 255, 0.055)',
  active: 'rgba(255, 255, 255, 0.09)',
  hoverAccent: 'rgba(215, 119, 87, 0.16)',
  hoverDanger: 'rgba(255, 107, 128, 0.14)',
  turnTrigger: 'rgba(255, 255, 255, 0.055)',
  turnTriggerHover: 'rgba(255, 255, 255, 0.09)',

  toolbar: 'rgba(38, 38, 38, 0.72)',
  toolbarHover: 'rgba(54, 54, 54, 0.88)',
  toolbarInvisible: 'rgba(19, 19, 19, 0.45)',

  diffAddedBg: 'rgba(56, 166, 96, 0.16)',
  diffAddedBgStrong: '#225c2b',
  diffAddedGutter: 'rgba(56, 166, 96, 0.32)',
  diffAddedWord: '#38a660',
  diffDeletedBg: 'rgba(179, 89, 107, 0.16)',
  diffDeletedBgStrong: '#7a2954',
  diffDeletedGutter: 'rgba(179, 89, 107, 0.32)',
  diffDeletedWord: '#b3596b',

  tooltipBg: '#262626',
  tooltipKeyBg: '#3a3a3a',
  toastLabel: '#f2f2f2',
  scroll1: '#3a3a3a',
  scroll2: '#4a4a4a',
  scrollHover: '#5c5c5c',
  skeleton: 'rgba(255, 255, 255, 0.045)',

  mask1: 'rgba(0, 0, 0, 0.58)',
  mask2: 'rgba(0, 0, 0, 0.20)',
  mask3: 'rgba(0, 0, 0, 0.68)',
  maskPhoto: 'rgba(0, 0, 0, 0.82)',
  maskDrop: 'rgba(19, 19, 19, 0.72)',
  docSelection: '#264f78',

  artSurface: '#262626',
  artShadow: '#1d1d1d',
  artBacking: '#3a3a3a',
  artInset: '#2b2b2b',
  artDetail: '#4a4a4a',
  cardFill: 'color-mix(in srgb, #262626 85%, transparent)',
  navAccent: 'rgba(215, 119, 87, 0.16)',

  shadow1: '0 2px 4px 0 rgba(0, 0, 0, 0.36)',
  shadow1Blur: '0 4px 12px 0 rgba(0, 0, 0, 0.30)',
  shadow2: '0 4px 12px 0 rgba(0, 0, 0, 0.32), 0 2px 8px 0 rgba(0, 0, 0, 0.26)',
  shadow3: '0 0 1px 0 rgba(0, 0, 0, 0.5), 0 12px 32px 0 rgba(0, 0, 0, 0.48)',
  elevSoft: '0 0 0 0.5px rgba(255, 255, 255, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.28), 0 0 24px 0 rgba(0, 0, 0, 0.20)',
  elevPanel: '0 0 0 0.5px rgba(255, 255, 255, 0.08), 0 3px 8px 0 rgba(0, 0, 0, 0.26), 0 0 16px 0 rgba(0, 0, 0, 0.18)',
  elevProminent: '0 0 0 0.5px rgba(255, 255, 255, 0.10), 0 3px 8px 0 rgba(0, 0, 0, 0.32), 0 0 20px 0 rgba(0, 0, 0, 0.24)',
  elevStroke: '0 0 0 0.5px rgba(255, 255, 255, 0.10)',
  elevStrokeColor: 'rgba(255, 255, 255, 0.10)',
  gradThink: 'linear-gradient(180deg, #1d1d1d 20.19%, rgba(29, 29, 29, 0) 100%)',
  gradThinkSelect: 'linear-gradient(180deg, #262626 20.19%, rgba(38, 38, 38, 0) 100%)',
  gradBrand: '#8f4f39 18.75%, #c15f3c 51.78%, #e69476 86.252%, #8f4f39',
}

/* ---------------------------------------------------------------------- */
/* Neutral light scheme                                                      */
/* ---------------------------------------------------------------------- */
const LIGHT = {
  ...NEUTRAL,
  ...RAMP,
  bg0: '#fafafa',
  bg1: '#ffffff',
  bg2: '#f3f3f3',
  bg3: '#ebebeb',
  bg4: '#e3e3e3',
  sidebar: '#f5f5f5',
  composer: '#f5f5f5',
  codeBg: '#f6f6f6',
  codeBanner: '#f0f0f0',
  inlineCode: '#f0f0f0',
  codeSegment: '#e8e8e8',
  bubble: '#f0f0f0',
  bubbleHighlight: '#e6e6e6',
  menu: 'rgba(255, 255, 255, 0.95)',
  menuGroup: 'rgba(255, 255, 255, 0.98)',
  menuBlur: 'blur(28px) saturate(150%)',

  text1: '#0f0f0f',
  text1Dim: '#262626',
  text2: '#4a4a4a',
  text3: '#666666',
  text4: '#afafaf',
  textInvert: '#fafafa',
  onAccent: '#ffffff',
  shimmer: 'color-mix(in srgb, #0f0f0f 30%, transparent)',
  deepDiveShimmer: 'color-mix(in srgb, #c15f3c 45%, #4a4a4a)',
  switchThumb: '#ffffff',

  border1: 'rgba(15, 15, 15, 0.08)',
  border2: 'rgba(15, 15, 15, 0.13)',
  border3: 'rgba(15, 15, 15, 0.19)',
  border4: 'rgba(15, 15, 15, 0.27)',

  accent: '#d77757',
  accentHover: '#c15f3c',
  accentStrong: '#b45434',
  accentStrongHover: '#9d4529',
  accentBg: 'rgba(215, 119, 87, 0.12)',
  link: '#5769f7',
  green: '#2c7a39',
  greenSoft: '#4a9a68',
  greenBg: 'rgba(44, 122, 57, 0.12)',
  amber: '#966c1e',
  amberSoft: '#b5822f',
  amberBg: 'rgba(150, 108, 30, 0.12)',
  red: '#ab2b3f',
  redSoft: '#c9505f',
  violet: '#8700ff',
  idle: '#afafaf',

  hover: 'rgba(15, 15, 15, 0.05)',
  active: 'rgba(15, 15, 15, 0.08)',
  hoverAccent: 'rgba(215, 119, 87, 0.10)',
  hoverDanger: 'rgba(171, 43, 63, 0.08)',
  turnTrigger: 'rgba(15, 15, 15, 0.045)',
  turnTriggerHover: 'rgba(15, 15, 15, 0.075)',

  toolbar: 'rgba(255, 255, 255, 0.78)',
  toolbarHover: 'rgba(255, 255, 255, 0.94)',
  toolbarInvisible: 'rgba(250, 250, 250, 0.55)',

  diffAddedBg: 'rgba(44, 122, 57, 0.10)',
  diffAddedBgStrong: '#c7e1cb',
  diffAddedGutter: 'rgba(47, 157, 68, 0.22)',
  diffAddedWord: '#2f9d44',
  diffDeletedBg: 'rgba(171, 43, 63, 0.10)',
  diffDeletedBgStrong: '#fdd2d8',
  diffDeletedGutter: 'rgba(209, 69, 75, 0.22)',
  diffDeletedWord: '#d1454b',

  tooltipBg: '#262626',
  tooltipKeyBg: '#3a3a3a',
  toastLabel: '#f2f2f2',
  scroll1: '#dcdcdc',
  scroll2: '#e7e7e7',
  scrollHover: '#c9c9c9',
  skeleton: 'rgba(15, 15, 15, 0.05)',

  mask1: 'rgba(15, 15, 15, 0.40)',
  mask2: 'rgba(15, 15, 15, 0.10)',
  mask3: 'rgba(15, 15, 15, 0.52)',
  maskPhoto: 'rgba(0, 0, 0, 0.82)',
  maskDrop: 'rgba(250, 250, 250, 0.72)',
  docSelection: '#b4d5ff',

  artSurface: '#f3f3f3',
  artShadow: '#e3e3e3',
  artBacking: '#d6d6d6',
  artInset: '#ebebeb',
  artDetail: '#c2c2c2',
  cardFill: 'color-mix(in srgb, #ffffff 80%, transparent)',
  navAccent: 'rgba(215, 119, 87, 0.10)',

  shadow1: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  shadow1Blur: '0 4px 12px 0 rgba(0, 0, 0, 0.04)',
  shadow2: '0 4px 12px 0 rgba(0, 0, 0, 0.04), 0 2px 8px 0 rgba(0, 0, 0, 0.05)',
  shadow3: '0 0 1px 0 rgba(0, 0, 0, 0.12), 0 12px 32px 0 rgba(0, 0, 0, 0.10)',
  elevSoft: '0 0 0 0.5px rgba(15, 15, 15, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.05), 0 0 24px 0 rgba(0, 0, 0, 0.04)',
  elevPanel: '0 0 0 0.5px rgba(15, 15, 15, 0.08), 0 3px 8px 0 rgba(0, 0, 0, 0.04), 0 0 16px 0 rgba(0, 0, 0, 0.03)',
  elevProminent: '0 0 0 0.5px rgba(15, 15, 15, 0.10), 0 3px 8px 0 rgba(0, 0, 0, 0.05), 0 0 20px 0 rgba(0, 0, 0, 0.04)',
  elevStroke: '0 0 0 0.5px rgba(15, 15, 15, 0.10)',
  elevStrokeColor: 'rgba(15, 15, 15, 0.10)',
  gradThink: 'linear-gradient(180deg, #ffffff 20.19%, rgba(255, 255, 255, 0) 100%)',
  gradThinkSelect: 'linear-gradient(180deg, #f3f3f3 20.19%, rgba(243, 243, 243, 0) 100%)',
  gradBrand: '#a4563c 18.75%, #c15f3c 51.78%, #e69476 86.252%, #a4563c',
}

/** Complete dark-theme token dictionary. */
const DARK_TOKENS = Object.freeze(build(DARK))

/** Complete light-theme token dictionary. */
const LIGHT_TOKENS = Object.freeze(build(LIGHT))

/** Both concrete dictionaries keyed by theme id. */
const THEME_TOKENS = Object.freeze({
  [THEME_DARK]: DARK_TOKENS,
  [THEME_LIGHT]: LIGHT_TOKENS,
})

/**
 * dsh-claude-mode — locale dictionaries, persisted settings store, the shared
 * runtime facts widgets exchange, and the word/animation data tables used by
 * the status star and completion footer.
 *
 * The English verb pool is a plain dictionary-word list; the Chinese pool is an
 * independent set with the same whimsical register. This plugin is an
 * independent implementation and is not affiliated with Anthropic.
 */

/** Locale namespace owned by this plugin. */
const NS = 'claude-mode'

/** Copy for the two shipped built-in locales. Key sets are identical. */
const DICTIONARIES = {
  zh: {
    'meta.title': 'Claude 模式',
    'meta.description': 'Claude Code 风格的界面与交互层：中性灰配陶土橙、脉冲状态星、提示词历史、快捷键一览、侧边栏与插件图标折叠、命令面板（含聊天记录搜索）、朗读与完成提示音、回合完成页脚。',
    'brand.mark': 'Claude 模式',
    'header.open': 'Claude 命令面板',
    'header.running': 'Claude 模式 · 正在运行',
    'palette.title': 'Claude 命令面板',
    'palette.placeholder': '搜索命令、主题或动作…',
    'palette.empty': '输入以筛选命令',
    'palette.noResults': '没有匹配的命令',
    'palette.footer.navigate': '↑↓ 选择',
    'palette.footer.run': '↵ 执行',
    'palette.footer.close': 'Esc 关闭',
    'palette.section.appearance': '外观',
    'palette.section.pinned': '置顶会话',
    'palette.section.behavior': '交互',
    'palette.section.session': '会话',
    'palette.section.search': '聊天记录',
    'palette.section.history': '历史提示',
    'palette.history.fill': '填入输入框',
    'palette.search.open': '打开会话',
    'palette.search.loading': '正在搜索聊天记录…',
    'palette.toggle.on': '已开启',
    'palette.toggle.off': '已关闭',
    'action.mode.on': '关闭 Claude 模式',
    'action.mode.off': '开启 Claude 模式',
    'action.mode.detail.on': '恢复安装前的主题与组件',
    'action.mode.detail.off': '应用 Claude Code 风格主题、运行状态条与命令面板',
    'action.theme.auto': '主题跟随系统',
    'action.theme.dark': '主题：Claude 暗色',
    'action.theme.light': '主题：Claude 亮色',
    'action.theme.detail': '当前：{value}',
    'action.statusBar.on': '关闭运行状态条',
    'action.statusBar.off': '开启运行状态条',
    'action.statusBar.detail': '输入框上方的运行提示与快捷键提示',
    'action.turnFooter.on': '关闭回合页脚',
    'action.turnFooter.off': '开启回合页脚',
    'action.turnFooter.detail': '在每个回合末尾显示完成词与用时',
    'action.animations.on': '关闭动画',
    'action.animations.off': '开启动画',
    'action.animations.detail': '状态星脉冲、面板入场与过渡',
    'action.sound.on': '关闭完成提示音',
    'action.sound.off': '开启完成提示音',
    'action.sound.detail': '回合结束且窗口未聚焦时也容易听见的两声轻提示',
    'action.ghost.on': '关闭输入提示补全',
    'action.ghost.off': '开启输入提示补全',
    'action.ghost.detail': '空输入框按当前对话推荐下一句，输入前缀时补全尾文；按 Tab 接受',
    'action.ghostContext.on': '关闭空输入框上下文推荐',
    'action.ghostContext.off': '开启空输入框上下文推荐',
    'action.ghostContext.detail': '为空输入框按最近回复和当前会话上下文推荐下一句',
    'action.readAloud': '朗读这条回复',
    'action.stopReading': '停止朗读',
    'action.interrupt.label': '中断当前运行',
    'action.interrupt.detail': '保留已完成的工具结果与排队消息',
    'action.newSession.label': '新建会话',
    'action.newSession.detail': '在当前工作区打开一个空白会话（Alt+N）',
    'action.palette.label': '打开 Claude 命令面板',
    'action.palette.detail': 'Ctrl+K',
    'action.sidebar.toggle': '切换左侧边栏',
    'action.sidebar.detail': '收起或展开工作区 / 会话栏（Alt+B）',
    'action.panelmenu.label': '管理左侧插件图标',
    'action.panelmenu.detail': '收起多余图标，把侧边栏空间还给工作区',
    'action.pinned.label': '置顶会话',
    'action.pinned.detail': '在命令面板顶部快速打开置顶会话',
    'action.shortcuts.label': '查看键盘快捷键',
    'action.shortcuts.detail': '在输入框内按 ? 也可打开',
    'palette.noSession': '没有可中断的运行',
    'runbar.ready': '就绪',
    'runbar.meta.interrupt': 'Esc 中断',
    'runbar.meta.tool': '工具运行 {duration}',
    'runbar.queued': '{count} 条排队',
    'runbar.queueHint': '↑ 编辑排队消息，↵ 立即发送',
    'runbar.hint.send': '发送',
    'runbar.hint.newline': '换行',
    'runbar.hint.history': '历史',
    'runbar.hint.command': '命令',
    'runbar.hint.file': '文件',
    'runbar.hint.palette': '面板',
    'runbar.hint.shortcuts': '快捷键',
    'runbar.sidebar': '切换左侧边栏',
    'runbar.elapsed': '{seconds}s',
    'shortcuts.title': '键盘快捷键',
    'shortcuts.subtitle': '输入、导航与界面操作一览',
    'shortcuts.group.input': '输入',
    'shortcuts.group.navigation': '导航',
    'shortcuts.group.interface': '界面',
    'shortcuts.send': '发送消息',
    'shortcuts.newline': '换行',
    'shortcuts.history': '历史提示词（↑ 更早 / ↓ 更新）',
    'shortcuts.ghost': '接受浅色输入补全',
    'shortcuts.ghostDismiss': '收起输入建议',
    'shortcuts.palette': '打开命令面板',
    'shortcuts.help': '打开快捷键一览',
    'shortcuts.sidebar': '切换左侧边栏',
    'shortcuts.newSession': '新建会话',
    'shortcuts.searchChats': '命令面板中搜索聊天记录',
    'shortcuts.interrupt': '中断当前回合',
    'shortcuts.close': '关闭弹层',
    'shortcuts.theme': '切换主题（命令面板内）',
    'shortcuts.footer': 'Esc 关闭',
    'panelmenu.title': '插件图标',
    'panelmenu.count': '{pinned}/{total} 个显示',
    'panelmenu.hideAll': '全部收起',
    'panelmenu.showAll': '全部展开',
    'panelmenu.show': '显示',
    'panelmenu.hide': '隐藏',
    'panelmenu.open': '打开',
    'panelmenu.empty': '没有可管理的插件图标',
    'panelmenu.hint': '收起的图标保留在此菜单里，侧边栏空间还给工作区。',
    'turn.completed': '{word}了 {duration}',
    'turn.steps': '{count} 步',
    'settings.nav': 'Claude 模式',
    'settings.title': 'Claude 模式',
    'settings.subtitle': 'Claude Code 风格的主题与键盘优先交互层',
    'settings.master.title': '启用 Claude 模式',
    'settings.master.hint': '应用 Claude Code 风格主题、运行状态条、命令面板与回合页脚；关闭后恢复安装前的主题。',
    'settings.theme.title': '主题',
    'settings.theme.hint': '暗色为中性格炭黑，亮色为中性浅灰；跟随系统会随操作系统亮暗自动切换。',
    'settings.theme.auto': '跟随系统',
    'settings.theme.dark': '暗色',
    'settings.theme.light': '亮色',
    'settings.behavior.title': '界面组件',
    'settings.statusBar.title': '运行状态条',
    'settings.statusBar.hint': '在输入框上方显示运行动词、脉冲状态星、中断入口与快捷键提示。',
    'settings.turnFooter.title': '回合页脚',
    'settings.turnFooter.hint': '在完成的回合末尾显示轮换完成词与用时，例如「烘焙了 1m 2s」。',
    'settings.animations.title': '动效',
    'settings.animations.hint': '状态星脉冲、面板入场与过渡；遵循系统「减少动态效果」设置。',
    'settings.sound.title': '完成提示音',
    'settings.sound.hint': '回合完成时播放两声轻提示音；可在下面试听，默认关闭。',
    'settings.sound.preview': '试听',
    'settings.ghost.title': '输入提示补全',
    'settings.ghost.hint': '输入框为空时显示完整提示词建议；输入前缀时在光标后补全尾文。按 Tab 接受，Esc 收起，继续输入或失焦会自动收起。',
    'settings.ghostContext.title': '空输入框上下文推荐',
    'settings.ghostContext.hint': '只在输入框为空时生效：读取最新回复、最近提示词与会话标题。开启 AI 完善时交给当前模型生成完整提示词；关闭后只用本地模板。关闭本项后只保留前缀补全。',
    'settings.aiPrompt.title': 'AI 完善提示词',
    'settings.aiPrompt.hint': '把最近回复、最近提示词与会话标题交给当前模型，生成一条目标、范围、约束和验收方式更完整的下一步提示词。同一上下文只调用一次并复用缓存；关闭后不发起模型调用。',
    'ghost.ai.pending': 'AI 正在完善提示词…',
    'ghost.ai.ready': 'AI 提示词建议',
    'ghost.local.ready': '提示词建议',
    'ghost.ai.fallback': '提示词建议（本地）',
    'ghost.ai.hint': 'AI 只为这个上下文调用一次',
    'ghost.local.hint': '本地生成，不发起模型调用',
    'ghost.footer': 'Tab 接受 · Esc 收起',
    'settings.data.title': '数据与存储',
    'settings.data.hint': '审计 DSH 主目录、桌面数据、更新与包缓存、临时目录；只读扫描，不会移动正在使用的数据。',
    'settings.data.scanning': '正在扫描本地数据…',
    'settings.data.failed': '数据审计失败',
    'settings.data.refresh': '刷新审计',
    'settings.data.target': '迁移到',
    'settings.data.targetHint': '目标根目录；建议放在空间充足的非系统盘。',
    'settings.data.targetPlaceholder': 'E:\\DeepSeek-Harness-Data',
    'settings.data.plan': '生成迁移脚本',
    'settings.data.planning': '正在生成…',
    'settings.data.planFailed': '生成迁移脚本失败',
    'settings.data.download': '下载 .ps1',
    'settings.data.direct': '仍在 C 盘',
    'settings.data.managed': '已托管',
    'settings.data.otherDrive': '已在其他盘',
    'settings.data.missing': '不存在',
    'settings.data.home': '主数据目录',
    'settings.data.children': '主目录占用',
    'settings.data.locations': '各位置',
    'settings.data.generated': '已生成 {count} 个迁移项',
    'settings.data.warnings': '注意',
    'settings.data.instructions': '执行步骤',
    'settings.data.free': '可用 {free} / {total}',
    'settings.data.summary': '已托管 {managed} · C 盘未托管 {unmanaged}',
    'settings.data.approxHint': '“≥”表示扫描达到时间或条目上限，实际占用至少这么大，通常更大；刷新后重新测量。',
    'settings.data.cleanupHint': '临时目录只清理旧的 dsh-* 项，不做 junction；先在普通 PowerShell 里 dry-run 检查。',
    'settings.data.cleanupDays': '清理早于（天）',
    'settings.data.cleanup': '生成清理脚本',
    'settings.data.cleaning': '正在生成…',
    'settings.data.cleanupFailed': '生成清理脚本失败',
    'settings.data.cleanupSummary': '只清理 {days} 天前的 dsh-* / dsh_* 临时项；脚本默认只列出，不会删除。',
    'settings.data.downloadCleanup': '下载清理脚本 .ps1',
    'settings.data.cat.harness-home': 'DSH 主数据目录',
    'settings.data.cat.desktop-profile': 'DSH 桌面端数据',
    'settings.data.cat.updater-cache': 'DSH 更新器缓存',
    'settings.data.cat.pnpm-store': 'pnpm 全局目录',
    'settings.data.cat.pnpm-cache': 'pnpm 缓存',
    'settings.data.cat.npm-cache': 'npm 缓存',
    'settings.data.cat.temp': 'DSH 临时目录',
    'settings.data.cat.system-temp': '系统临时目录',
    'settings.data.cat.profiles': 'profiles',
    'settings.data.cat.sessions': 'sessions',
    'settings.data.cat.attachments': 'attachments',
    'settings.data.cat.cache': 'cache',
    'settings.data.cat.logs': 'logs',
    'settings.data.cat.dsh-runtimes': 'dsh-runtimes',
    'settings.data.cat.speech-to-text': 'speech-to-text',
    'settings.data.cat.storages': 'storages',
    'settings.data.cat.skills': 'skills',
    'settings.shortcut.title': '快捷键',
    'settings.shortcut.hint': '在输入框内也可用；宿主若占用同名快捷键，以宿主为准。',
    'settings.shortcut.palette': '命令面板',
    'settings.shortcut.newSession': '新建会话',
    'settings.shortcut.interrupt': '中断运行',
    'settings.reset': '恢复默认设置',
    'settings.applied': '已应用',
    'settings.pending': '已记录，主题将在下次载入生效',
    'settings.about.title': '关于',
    'settings.about.body': '纯官方插槽与服务实现：不修改宿主文件、不替换应用根节点，卸载后主题与组件自动还原。配色、字形与交互为独立实现，与 Anthropic 无隶属关系。',
    'settings.version': '版本 {version}',
    'common.on': '开',
    'common.off': '关',
    'common.theme.dark': '暗色',
    'common.theme.light': '亮色',
    'common.theme.auto': '跟随系统',
  },
  en: {
    'meta.title': 'Claude mode',
    'meta.description': 'A Claude Code-style interaction layer: neutral greys with terracotta, a pulsing status star, prompt-history recall, a shortcut sheet, collapsible sidebar and plugin icons, a command palette with chat search, read-aloud and completion sounds, and turn-completion footers.',
    'brand.mark': 'Claude mode',
    'header.open': 'Claude command palette',
    'header.running': 'Claude mode · running',
    'palette.title': 'Claude command palette',
    'palette.placeholder': 'Search commands, themes, or actions…',
    'palette.empty': 'Type to filter commands',
    'palette.noResults': 'No matching commands',
    'palette.footer.navigate': '↑↓ select',
    'palette.footer.run': '↵ run',
    'palette.footer.close': 'Esc close',
    'palette.section.appearance': 'Appearance',
    'palette.section.pinned': 'Pinned chats',
    'palette.section.behavior': 'Interaction',
    'palette.section.session': 'Session',
    'palette.section.search': 'Chats',
    'palette.section.history': 'Prompt history',
    'palette.history.fill': 'Fill the composer',
    'palette.search.open': 'Open chat',
    'palette.search.loading': 'Searching chat history…',
    'palette.toggle.on': 'On',
    'palette.toggle.off': 'Off',
    'action.mode.on': 'Turn off Claude mode',
    'action.mode.off': 'Turn on Claude mode',
    'action.mode.detail.on': 'Restore the theme and widgets from before install',
    'action.mode.detail.off': 'Apply the Claude Code-style theme, run status bar, and command palette',
    'action.theme.auto': 'Theme: follow system',
    'action.theme.dark': 'Theme: Claude midnight',
    'action.theme.light': 'Theme: Claude daylight',
    'action.theme.detail': 'Current: {value}',
    'action.statusBar.on': 'Hide the run status bar',
    'action.statusBar.off': 'Show the run status bar',
    'action.statusBar.detail': 'Run state and shortcut hints above the composer',
    'action.turnFooter.on': 'Hide turn footers',
    'action.turnFooter.off': 'Show turn footers',
    'action.turnFooter.detail': 'Show the completion word and duration at the end of each turn',
    'action.animations.on': 'Turn off animations',
    'action.animations.off': 'Turn on animations',
    'action.animations.detail': 'Pulsing status star, panel entrance, and transitions',
    'action.sound.on': 'Turn off the completion sound',
    'action.sound.off': 'Turn on the completion sound',
    'action.sound.detail': 'Two soft notes when a turn finishes, audible even when the window is unfocused',
    'action.ghost.on': 'Turn off inline prompt completion',
    'action.ghost.off': 'Turn on inline prompt completion',
    'action.ghost.detail': 'Suggest the next prompt from context when the composer is empty, or complete a typed prefix; press Tab to accept',
    'action.ghostContext.on': 'Turn off empty-composer context suggestions',
    'action.ghostContext.off': 'Turn on empty-composer context suggestions',
    'action.ghostContext.detail': 'Suggest the next prompt from the latest reply and Session context when the composer is empty',
    'action.readAloud': 'Read this reply aloud',
    'action.stopReading': 'Stop reading',
    'action.interrupt.label': 'Interrupt the running turn',
    'action.interrupt.detail': 'Finished tool results and queued messages are kept',
    'action.newSession.label': 'New session',
    'action.newSession.detail': 'Open a blank session in the current workspace (Alt+N)',
    'action.palette.label': 'Open the Claude command palette',
    'action.palette.detail': 'Ctrl+K',
    'action.sidebar.toggle': 'Toggle the left sidebar',
    'action.sidebar.detail': 'Collapse or expand the workspace / session column (Alt+B)',
    'action.panelmenu.label': 'Manage sidebar plugin icons',
    'action.panelmenu.detail': 'Fold extra icons so the sidebar keeps room for workspaces',
    'action.pinned.label': 'Pinned chats',
    'action.pinned.detail': 'Open pinned chats from the top of the command palette',
    'action.shortcuts.label': 'Show keyboard shortcuts',
    'action.shortcuts.detail': 'Press ? in an empty composer too',
    'palette.noSession': 'Nothing is running',
    'runbar.ready': 'Ready',
    'runbar.meta.interrupt': 'esc to interrupt',
    'runbar.meta.tool': 'running tool for {duration}',
    'runbar.queued': '{count} queued',
    'runbar.queueHint': 'Press ↑ to edit queued messages, ↵ to send them immediately',
    'runbar.hint.send': 'send',
    'runbar.hint.newline': 'newline',
    'runbar.hint.history': 'history',
    'runbar.hint.command': 'commands',
    'runbar.hint.file': 'files',
    'runbar.hint.palette': 'palette',
    'runbar.hint.shortcuts': 'shortcuts',
    'runbar.sidebar': 'Toggle the left sidebar',
    'runbar.elapsed': '{seconds}s',
    'shortcuts.title': 'Keyboard shortcuts',
    'shortcuts.subtitle': 'Input, navigation, and interface actions',
    'shortcuts.group.input': 'Input',
    'shortcuts.group.navigation': 'Navigation',
    'shortcuts.group.interface': 'Interface',
    'shortcuts.send': 'Send the message',
    'shortcuts.newline': 'Insert a newline',
    'shortcuts.history': 'Prompt history (↑ older / ↓ newer)',
    'shortcuts.ghost': 'Accept the light inline completion',
    'shortcuts.ghostDismiss': 'Dismiss the inline suggestion',
    'shortcuts.palette': 'Open the command palette',
    'shortcuts.help': 'Open this shortcut sheet',
    'shortcuts.sidebar': 'Toggle the left sidebar',
    'shortcuts.newSession': 'New session',
    'shortcuts.searchChats': 'Search chat history in the command palette',
    'shortcuts.interrupt': 'Interrupt the running turn',
    'shortcuts.close': 'Close the open sheet',
    'shortcuts.theme': 'Switch theme (from the palette)',
    'shortcuts.footer': 'Esc close',
    'panelmenu.title': 'Plugin icons',
    'panelmenu.count': '{pinned}/{total} shown',
    'panelmenu.hideAll': 'Collapse all',
    'panelmenu.showAll': 'Expand all',
    'panelmenu.show': 'Show',
    'panelmenu.hide': 'Hide',
    'panelmenu.open': 'Open',
    'panelmenu.empty': 'No plugin icons to manage',
    'panelmenu.hint': 'Hidden icons stay in this menu; the sidebar space goes back to workspaces.',
    'turn.completed': '{word} for {duration}',
    'turn.steps': '{count} steps',
    'settings.nav': 'Claude mode',
    'settings.title': 'Claude mode',
    'settings.subtitle': 'A Claude Code-style surface with keyboard-first interaction',
    'settings.master.title': 'Enable Claude mode',
    'settings.master.hint': 'Applies the Claude Code-style theme, run status bar, command palette, and turn footers. Turning it off restores the theme from before install.',
    'settings.theme.title': 'Theme',
    'settings.theme.hint': 'Midnight is neutral charcoal; daylight is neutral light grey. Follow system switches with the OS color scheme.',
    'settings.theme.auto': 'Follow system',
    'settings.theme.dark': 'Midnight',
    'settings.theme.light': 'Daylight',
    'settings.behavior.title': 'Widgets',
    'settings.statusBar.title': 'Run status bar',
    'settings.statusBar.hint': 'Shows the running verb, pulsing status star, interrupt entry, and shortcut hints above the composer.',
    'settings.turnFooter.title': 'Turn footers',
    'settings.turnFooter.hint': 'Shows the rotating completion word and duration at the end of finished turns, e.g. "Cooked for 1m 2s".',
    'settings.animations.title': 'Motion',
    'settings.animations.hint': 'Status-star pulse, panel entrance, and transitions. Respects the system reduce-motion setting.',
    'settings.sound.title': 'Completion sound',
    'settings.sound.hint': 'Two soft notes when a turn finishes; preview it below. Off by default.',
    'settings.sound.preview': 'Preview',
    'settings.ghost.title': 'Inline prompt completion',
    'settings.ghost.hint': 'With an empty composer, show a complete prompt suggestion; with a typed prefix, complete the rest. Press Tab to accept, Esc to dismiss, or keep typing / blur to dismiss.',
    'settings.ghostContext.title': 'Empty-composer context suggestions',
    'settings.ghostContext.hint': 'Only applies while the composer is empty: reads the latest reply, recent prompts, and Session title. With AI completion on, the current model writes a full prompt; otherwise a local template is used. Turn this off to keep prefix completion only.',
    'settings.aiPrompt.title': 'AI prompt completion',
    'settings.aiPrompt.hint': 'Sends the latest reply, recent prompts, and Session title to the current model to write a fuller next prompt with goal, scope, constraints, and acceptance checks. One call per context, then cached; turn this off to avoid model calls.',
    'ghost.ai.pending': 'AI is completing the prompt…',
    'ghost.ai.ready': 'AI prompt suggestion',
    'ghost.local.ready': 'Prompt suggestion',
    'ghost.ai.fallback': 'Prompt suggestion (local)',
    'ghost.ai.hint': 'One AI call for this context',
    'ghost.local.hint': 'Local template; no model call',
    'ghost.footer': 'Tab accept · Esc dismiss',
    'settings.data.title': 'Data & storage',
    'settings.data.hint': 'Audits the DSH home, desktop data, update/package caches and temp folder. Read-only: it never moves data in use.',
    'settings.data.scanning': 'Scanning local data…',
    'settings.data.failed': 'Data audit failed',
    'settings.data.refresh': 'Refresh audit',
    'settings.data.target': 'Migrate to',
    'settings.data.targetHint': 'Target root; use a roomy non-system drive.',
    'settings.data.targetPlaceholder': 'E:\\DeepSeek-Harness-Data',
    'settings.data.plan': 'Generate migration script',
    'settings.data.planning': 'Generating…',
    'settings.data.planFailed': 'Could not generate the migration script',
    'settings.data.download': 'Download .ps1',
    'settings.data.direct': 'Still on C:',
    'settings.data.managed': 'Managed',
    'settings.data.otherDrive': 'On another drive',
    'settings.data.missing': 'Missing',
    'settings.data.home': 'Home',
    'settings.data.children': 'Home usage',
    'settings.data.locations': 'Locations',
    'settings.data.generated': '{count} migration action(s)',
    'settings.data.warnings': 'Notes',
    'settings.data.instructions': 'Steps',
    'settings.data.free': '{free} free / {total}',
    'settings.data.summary': 'Managed {managed} · unmanaged on C: {unmanaged}',
    'settings.data.approxHint': '“≥” means the scan hit a time or entry cap; the real size is at least this and may be larger. Refresh to re-measure.',
    'settings.data.cleanupHint': 'TEMP is cleaned, not junctioned: review a dry-run in a normal PowerShell first.',
    'settings.data.cleanupDays': 'Older than (days)',
    'settings.data.cleanup': 'Generate cleanup script',
    'settings.data.cleaning': 'Generating…',
    'settings.data.cleanupFailed': 'Could not generate the cleanup script',
    'settings.data.cleanupSummary': 'Only dsh-* / dsh_* temp items older than {days} days; the script lists candidates by default.',
    'settings.data.downloadCleanup': 'Download cleanup .ps1',
    'settings.data.cat.harness-home': 'DSH home',
    'settings.data.cat.desktop-profile': 'DSH desktop data',
    'settings.data.cat.updater-cache': 'DSH updater cache',
    'settings.data.cat.pnpm-store': 'pnpm global dir',
    'settings.data.cat.pnpm-cache': 'pnpm cache',
    'settings.data.cat.npm-cache': 'npm cache',
    'settings.data.cat.temp': 'DSH temp folder',
    'settings.data.cat.system-temp': 'System temp folder',
    'settings.data.cat.profiles': 'profiles',
    'settings.data.cat.sessions': 'sessions',
    'settings.data.cat.attachments': 'attachments',
    'settings.data.cat.cache': 'cache',
    'settings.data.cat.logs': 'logs',
    'settings.data.cat.dsh-runtimes': 'dsh-runtimes',
    'settings.data.cat.speech-to-text': 'speech-to-text',
    'settings.data.cat.storages': 'storages',
    'settings.data.cat.skills': 'skills',
    'settings.shortcut.title': 'Shortcuts',
    'settings.shortcut.hint': 'Available while typing in the composer too; host bindings win on conflicts.',
    'settings.shortcut.palette': 'Command palette',
    'settings.shortcut.newSession': 'New session',
    'settings.shortcut.interrupt': 'Interrupt turn',
    'settings.reset': 'Reset to defaults',
    'settings.applied': 'Applied',
    'settings.pending': 'Saved; the theme applies on the next load',
    'settings.about.title': 'About',
    'settings.about.body': 'Built only from official slots and services: no host files are edited and the app root is never replaced; uninstalling restores the theme and widgets. The palette, glyphs, and interactions are an independent implementation and this plugin is not affiliated with Anthropic.',
    'settings.version': 'Version {version}',
    'common.on': 'On',
    'common.off': 'Off',
    'common.theme.dark': 'Midnight',
    'common.theme.light': 'Daylight',
    'common.theme.auto': 'Follow system',
  },
}

/** Pick a locale dictionary for a locale id. */
function dictionaryFor(locale) {
  return isChineseLocale(locale) ? DICTIONARIES.zh : DICTIONARIES.en
}

/** Whether a locale id should read the Chinese copy/word pools. */
function isChineseLocale(locale) {
  return String(locale || '').toLowerCase().startsWith('zh')
}

/** Resolve one template string with `{name}` placeholders. */
function format(text, values) {
  const source = String(text == null ? '' : text)
  if (!values) return source
  return source.replace(/\{(\w+)\}/g, (all, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : all,
  )
}

/* ---------------------------------------------------------------------- */
/* Word and animation tables                                             */
/* ---------------------------------------------------------------------- */

/**
 * Status-star glyph frames: six frames pulse forward and back over two
 * seconds.
 */
const SPINNER_FRAMES = Object.freeze(['·', '✢', '✳', '✶', '✻', '✽'])

/** Frame shown when motion is disabled or the turn is idle. */
const SPINNER_REST_FRAME = '✻'

/**
 * English spinner verbs: a whimsical, hands-on rotation. The brand pun
 * ("Clauding") is replaced by "Coding" so the plugin does not lean on
 * Anthropic's name.
 */
const SPINNER_VERBS_EN = Object.freeze([
  'Accomplishing', 'Actioning', 'Actualizing', 'Architecting', 'Baking', 'Beaming',
  "Beboppin'", 'Befuddling', 'Billowing', 'Blanching', 'Bloviating', 'Boogieing',
  'Boondoggling', 'Booping', 'Bootstrapping', 'Brewing', 'Bunning', 'Burrowing',
  'Calculating', 'Caramelizing', 'Cascading', 'Catapulting', 'Cerebrating', 'Channeling',
  'Choreographing', 'Churning', 'Coding', 'Coalescing', 'Cogitating', 'Combobulating',
  'Composing', 'Computing', 'Concocting', 'Considering', 'Contemplating', 'Cooking',
  'Crafting', 'Creating', 'Crunching', 'Crystallizing', 'Cultivating', 'Deciphering',
  'Deliberating', 'Determining', 'Dilly-dallying', 'Discombobulating', 'Doing', 'Doodling',
  'Drizzling', 'Ebbing', 'Effecting', 'Elucidating', 'Embellishing', 'Enchanting',
  'Envisioning', 'Fermenting', 'Fiddle-faddling', 'Finagling', 'Flambéing',
  'Flibbertigibbeting', 'Flowing', 'Flummoxing', 'Fluttering', 'Forging', 'Forming',
  'Frolicking', 'Frosting', 'Gallivanting', 'Galloping', 'Garnishing', 'Generating',
  'Gesticulating', 'Germinating', 'Gitifying', 'Grooving', 'Gusting', 'Harmonizing',
  'Hashing', 'Hatching', 'Herding', 'Honking', 'Hullaballooing', 'Hyperspacing', 'Ideating',
  'Imagining', 'Improvising', 'Incubating', 'Inferring', 'Infusing', 'Ionizing',
  'Jitterbugging', 'Julienning', 'Kerfuffling', 'Kneading', 'Leavening', 'Levitating',
  'Lollygagging', 'Manifesting', 'Marinating', 'Meandering', 'Metamorphosing', 'Misting',
  'Moonwalking', 'Moseying', 'Mulling', 'Mustering', 'Nebulizing', 'Nesting',
  'Newspapering', 'Noodling', 'Nucleating', 'Onioning', 'Orbiting', 'Orchestrating',
  'Osmosing', 'Perambulating', 'Percolating', 'Perusing', 'Philosophizing',
  'Photosynthesizing', 'Polishing', 'Pollinating', 'Pondering', 'Pontificating',
  'Pouncing', 'Precipitating', 'Prestidigitating', 'Processing', 'Proofing',
  'Propagating', 'Puttering', 'Puzzling', 'Quantumizing', 'Razzle-dazzling',
  'Razzmatazzing', 'Recombobulating', 'Reticulating', 'Roosting', 'Ruminating',
  'Sautéing', 'Scampering', 'Schlepping', 'Scurrying', 'Seasoning', 'Shenaniganing',
  'Shimmying', 'Simmering', 'Skedaddling', 'Sketching', 'Slithering', 'Smooshing',
  'Sock-hopping', 'Spelunking', 'Spinning', 'Sprouting', 'Stewing', 'Sublimating',
  'Swirling', 'Swooping', 'Symbioting', 'Synthesizing', 'Tempering', 'Thinking',
  'Thundering', 'Tinkering', 'Tomfoolering', 'Topsy-turvying', 'Transfiguring',
  'Transmogrifying', 'Transmuting', 'Twisting', 'Undulating', 'Unfurling', 'Unraveling',
  'Vibing', 'Waddling', 'Wandering', 'Warping', 'Whatchamacalliting', 'Whirlpooling',
  'Whirring', 'Whisking', 'Wibbling', 'Working', 'Wrangling', 'Zesting', 'Zigzagging',
])

/**
 * Chinese spinner verbs: an independent pool with the same whimsical,
 * hands-on register as the English rotation. Rendered as `<verb>中…`.
 */
const SPINNER_VERBS_ZH = Object.freeze([
  '斟酌', '推敲', '打磨', '酝酿', '发酵', '捣鼓', '鼓捣', '拾掇', '捯饬', '倒腾',
  '摆弄', '端详', '琢磨', '踅摸', '寻思', '盘算', '合计', '张罗', '梳理', '编织',
  '缝补', '拆解', '拼装', '校准', '勘探', '打捞', '巡游', '游走', '踱步', '潜行',
  '跃迁', '盘旋', '俯冲', '翱翔', '摆渡', '烹调', '熬煮', '蒸馏', '萃取', '冲泡',
  '晾晒', '淬火', '抛光', '錾刻', '描摹', '速写', '排布', '清点', '校对', '检索',
  '翻找', '嗅探', '探路', '搭桥', '理线', '抹平', '拧紧', '掂量', '比划', '试音',
  '调弦', '调色', '上釉', '烧制', '风干', '播种', '育苗', '采撷', '拾穗', '垂钓',
  '格物', '溯源', '归因', '建模', '求解', '验证', '复现', '回放',
])

/**
 * Completion words stamped before the turn duration: a compact past-participle
 * set plus a Chinese set with the same cooking/handling flavor.
 */
const COMPLETION_WORDS_EN = Object.freeze([
  'Baked', 'Brewed', 'Churned', 'Cogitated', 'Cooked', 'Crunched', 'Sautéed', 'Worked',
])

const COMPLETION_WORDS_ZH = Object.freeze([
  '烘焙', '酿造', '搅拌', '推敲', '烹饪', '咀嚼', '煸炒', '打磨',
])

/**
 * Starter prompts offered as light inline completions when the composer is
 * empty of history. They are intentionally plain, task-shaped prompts rather
 * than instructions aimed at a particular model.
 */
const PROMPT_SUGGESTIONS_EN = Object.freeze([
  'Review the current repository for high-risk issues and propose concrete fixes',
  "Summarize this project's architecture, key modules, and data flow",
  'Add unit tests for this feature, including edge cases',
  "Explain this code's execution flow and key design tradeoffs",
  'Turn this requirement into an executable plan with risks and milestones',
  'Check the latest changes for regressions and list verification commands',
  "Profile this page's load performance, find the bottleneck, then optimize",
  'Write a clear README with install, usage, examples, and troubleshooting',
  'Compare these two implementations and recommend the better fit',
  'Find the root cause of this error, reproduce it, then fix it',
  'Write a changelog and acceptance checklist for this change',
  'Condense this document into one page while keeping key numbers and links',
])

const PROMPT_SUGGESTIONS_ZH = Object.freeze([
  '请审查当前仓库的代码，找出高风险问题并给出修复建议',
  '请总结当前项目的架构、关键模块和数据流',
  '请为这个功能补一套单元测试，覆盖边界条件',
  '请解释这段代码的执行流程和关键设计取舍',
  '请把这段需求拆成可执行的开发计划，并标注风险',
  '请检查最近的改动是否引入回归，并给出验证命令',
  '请优化这个页面的加载性能，先定位瓶颈再改',
  '请帮我写一份清晰的 README，包含安装、使用和示例',
  '请对比这两个实现，指出差异和更适合当前项目的方案',
  '请根据报错定位根因，先复现再修复',
  '请为这次改动写一段 changelog 和验收清单',
  '请把这份文档压缩成一页要点，保留关键数字和链接',
])

/**
 * Starter prompts for a completely blank composer. They stay generic enough to
 * be useful before the first turn, instead of assuming an existing codebase.
 */
const EMPTY_COMPOSER_EN = Object.freeze([
  'summarize this project',
  'run the tests',
  'review recent changes',
  'check the project structure',
])

const EMPTY_COMPOSER_ZH = Object.freeze([
  '梳理一下当前项目',
  '跑一遍测试',
  '看一下最近的改动',
  '检查一下项目结构',
])

/** The verb/completion pools that match one locale id. */
function wordPoolsFor(locale) {
  return isChineseLocale(locale)
    ? { verbs: SPINNER_VERBS_ZH, completions: COMPLETION_WORDS_ZH, chinese: true }
    : { verbs: SPINNER_VERBS_EN, completions: COMPLETION_WORDS_EN, chinese: false }
}

/** Stable 32-bit string hash (FNV-1a), used to pick one word per turn. */
function hash32(value) {
  const text = String(value == null ? '' : value)
  let hash = 2166136261
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** Pick the turn's spinner verb from a stable seed (session + start time). */
function pickSpinnerVerb(seed, locale) {
  const { verbs, chinese } = wordPoolsFor(locale)
  const verb = verbs[hash32(seed) % verbs.length]
  return chinese ? verb + '中' : verb
}

/** Pick the turn's completion word from a stable seed (turn start time/seq). */
function completionWordFor(seed, locale) {
  const { completions } = wordPoolsFor(locale)
  return completions[hash32(seed) % completions.length]
}

/**
 * Frame index for the pulsing status star.
 *
 * The glyph follows elapsed animation time with a cosine:
 * `round(((1 - cos(2π·t/2000)) / 2) * (frames - 1))`, i.e. forward then back
 * over two seconds, refreshed every 100 ms.
 */
function spinnerFrameIndex(elapsedMs) {
  const elapsed = Math.max(0, Number(elapsedMs) || 0)
  const phase = (1 - Math.cos((Math.PI * elapsed) / 1000)) / 2
  return Math.min(SPINNER_FRAMES.length - 1, Math.max(0, Math.round(phase * (SPINNER_FRAMES.length - 1))))
}

/** Glyph frame for one elapsed animation time. */
function spinnerFrame(elapsedMs) {
  return SPINNER_FRAMES[spinnerFrameIndex(elapsedMs)]
}

/* ---------------------------------------------------------------------- */
/* Settings store                                                         */
/* ---------------------------------------------------------------------- */

/** localStorage key for durable plugin settings. */
const SETTINGS_KEY = 'dsh.claude-mode.settings.v1'

/** localStorage key for the theme preference that preceded Claude mode. */
const PREVIOUS_THEME_KEY = 'dsh.claude-mode.previous-theme.v1'

/** Default settings; also the reset target. */
const DEFAULT_SETTINGS = Object.freeze({
  enabled: true,
  theme: 'auto',
  statusBar: true,
  turnFooter: true,
  animations: true,
  sound: false,
  ghost: true,
  ghostContext: true,
  aiPrompt: true,
})

/** Clamp one stored settings object into the known shape. */
function normalizeSettings(input) {
  const source = input && typeof input === 'object' ? input : {}
  const theme = source.theme === 'dark' || source.theme === 'light' ? source.theme : 'auto'
  return {
    enabled: source.enabled !== false,
    theme,
    statusBar: source.statusBar !== false,
    turnFooter: source.turnFooter !== false,
    animations: source.animations !== false,
    sound: source.sound === true,
    ghost: source.ghost !== false,
    ghostContext: source.ghostContext !== false,
    aiPrompt: source.aiPrompt !== false,
  }
}

/** Read a JSON value from localStorage without throwing in restricted contexts. */
function readJson(key) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return undefined
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}

/** Write a JSON value to localStorage without throwing. */
function writeJson(key, value) {
  try {
    if (value === undefined) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private-mode or storage-quota failures keep the in-memory value */
  }
}

/** Read the persisted settings. */
function loadSettings() {
  return normalizeSettings(readJson(SETTINGS_KEY))
}

/** Persist settings. */
function saveSettings(settings) {
  writeJson(SETTINGS_KEY, normalizeSettings(settings))
}

/** Read the saved pre-install theme preference, if any. */
function loadPreviousTheme() {
  const value = readJson(PREVIOUS_THEME_KEY)
  return typeof value === 'string' && value ? value : undefined
}

/** Persist the pre-install theme preference. */
function savePreviousTheme(value) {
  writeJson(PREVIOUS_THEME_KEY, value || undefined)
}

/**
 * createSettingsStore — a minimal external store shared by every widget.
 * Components subscribe through React.useSyncExternalStore.
 */
function createSettingsStore(initial) {
  let state = normalizeSettings(initial)
  const listeners = new Set()
  const store = {
    get() {
      return state
    },
    set(patch) {
      const next = normalizeSettings({ ...state, ...patch })
      const changed = Object.keys(next).some((key) => next[key] !== state[key])
      if (!changed) return state
      state = next
      saveSettings(state)
      for (const listener of Array.from(listeners)) {
        try {
          listener()
        } catch (error) {
          // A broken subscriber must not take down the settings write path.
          if (typeof console !== 'undefined' && console.error) console.error('[dsh-claude-mode] subscriber failed', error)
        }
      }
      return state
    },
    reset() {
      state = normalizeSettings(DEFAULT_SETTINGS)
      saveSettings(state)
      for (const listener of Array.from(listeners)) {
        try {
          listener()
        } catch {
          /* ignore */
        }
      }
      return state
    },
    subscribe(listener) {
      if (typeof listener !== 'function') return () => {}
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
  return store
}

/* ---------------------------------------------------------------------- */
/* Runtime facts shared across slots                                      */
/* ---------------------------------------------------------------------- */

/**
 * Facts only session-scoped widgets can know. The palette is root-scoped, so
 * it reads these at action time instead of subscribing.
 */
const runtime = {
  /** Selected Session id as last seen by a session-scoped widget. */
  sessionId: undefined,
  /** Newest-first prompt texts of the selected Session, mirrored for the palette. */
  promptHistory: [],
  /** Bumped whenever promptHistory changes, so the palette can refresh its rows. */
  historyVersion: 0,
  /** Replace the composer draft (installed by the run bar, which owns inputActions). */
  fillDraft: null,
  /** Toggle the left sidebar through ctx.layout (installed by the plugin body). */
  toggleSidebar: null,
}

/* ---------------------------------------------------------------------- */
/* Shortcuts sheet channel                                                */
/* ---------------------------------------------------------------------- */

const shortcutsListeners = new Set()

/** Open the keyboard-shortcut sheet from anywhere in this plugin. */
function openShortcuts() {
  for (const listener of Array.from(shortcutsListeners)) {
    try {
      listener(true)
    } catch {
      /* ignore */
    }
  }
}

/** Subscribe to shortcut-sheet open requests. */
function subscribeShortcuts(listener) {
  shortcutsListeners.add(listener)
  return () => {
    shortcutsListeners.delete(listener)
  }
}

/* ---------------------------------------------------------------------- */
/* Command palette channel                                                */
/* ---------------------------------------------------------------------- */

/** Module-level listener set for palette open/close requests. */
const paletteListeners = new Set()

/** Open the command palette from anywhere in this plugin. */
function openPalette() {
  for (const listener of Array.from(paletteListeners)) {
    try {
      listener(true)
    } catch {
      /* ignore */
    }
  }
}

/** Subscribe to palette open requests. */
function subscribePalette(listener) {
  paletteListeners.add(listener)
  return () => {
    paletteListeners.delete(listener)
  }
}

/* ---------------------------------------------------------------------- */
/* Formatting helpers                                                     */
/* ---------------------------------------------------------------------- */

/** Human duration for the turn footer (short form). */
function formatDuration(ms) {
  const total = Math.max(0, Math.round(Number(ms) || 0) / 1000)
  if (total < 60) return `${Math.max(1, Math.round(total))}s`
  const minutes = Math.floor(total / 60)
  const seconds = Math.round(total % 60)
  if (minutes < 60) return seconds === 0 ? `${minutes}m` : `${minutes}m ${seconds}s`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ${minutes % 60}m`
}

/** Human elapsed seconds for the run bar. */
function formatElapsed(ms) {
  const seconds = Math.max(0, Math.floor((Number(ms) || 0) / 1000))
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

/** Join the text blocks of one ContentBlock list (images and other blocks skipped). */
function textFromContent(content) {
  if (!Array.isArray(content)) return ''
  const parts = []
  for (const block of content) {
    if (!block) continue
    if (typeof block === 'string') {
      parts.push(block)
      continue
    }
    if (block.type === 'text' && typeof block.text === 'string' && block.text) parts.push(block.text)
    else if (typeof block.text === 'string' && block.text) parts.push(block.text)
  }
  return parts.join('\n').trim()
}

/** Join the visible prose of one finished Assistant lifecycle (Chat blocks use `kind`). */
function speechTextFromBlocks(blocks) {
  if (!Array.isArray(blocks)) return ''
  const parts = []
  for (const block of blocks) {
    if (!block) continue
    if (typeof block === 'string') {
      parts.push(block)
      continue
    }
    if ((block.kind === 'text' || block.type === 'text') && typeof block.text === 'string' && block.text) {
      parts.push(block.text)
    }
  }
  return parts.join('\n').trim()
}

/**
 * Read the prose of one finalized assistant message from the Chat snapshot.
 *
 * The assistant-actions slot only receives the durable `messageId`; the turn
 * tail node's `data.closing` carries both that id and the visible blocks. The
 * lookup also accepts localized assistant-step nodes and the legacy node list
 * so read-aloud keeps working when the Host reshuffles its snapshot.
 */
function assistantTextForMessage(snapshot, messageId) {
  if (!snapshot || messageId === undefined || messageId === null) return ''
  const wanted = String(messageId)
  const matches = function (node) {
    if (!node) return ''
    if (node.kind === 'turn-tail') {
      const closing = node.data && node.data.closing
      const finalNode = closing && closing.finalNode
      if (finalNode && finalNode.messageId !== undefined && String(finalNode.messageId) === wanted) {
        return speechTextFromBlocks(closing.blocks)
      }
      return ''
    }
    if (node.kind === 'assistant-step' || node.kind === 'assistant') {
      const data = node.data || {}
      const id = data.messageId !== undefined ? data.messageId : node.messageId
      if (id !== undefined && String(id) === wanted) return speechTextFromBlocks(data.blocks)
    }
    return ''
  }

  try {
    const nodes = snapshot.nodes
    if (nodes && typeof nodes.values === 'function') {
      for (const node of nodes.values()) {
        const text = matches(node)
        if (text) return text
      }
    }
    const legacy = snapshot.legacy && Array.isArray(snapshot.legacy.nodes) ? snapshot.legacy.nodes : []
    for (const node of legacy) {
      const text = matches(node)
      if (text) return text
    }
  } catch {
    /* a Host snapshot shape we do not recognize */
  }
  return ''
}

/** Hard input caps for the local prompt pilot; kept tiny so no session dump happens. */
const PROMPT_PILOT_BUDGET = Object.freeze({
  assistant: 4000,
  tool: 1600,
  lastUser: 1200,
  title: 120,
})

/**
 * Read the newest finalized assistant prose from the Chat snapshot.
 *
 * The composer's next-prompt suggestion should follow the reply the user just
 * read, so this checks turn tails first and falls back to assistant-step nodes
 * and the live partial (the caller decides whether a running turn is eligible).
 *
 * @param {object} snapshot - Chat snapshot.
 * @returns {string} newest assistant text, or an empty string.
 */
function latestAssistantText(snapshot) {
  try {
    const legacy = snapshot && snapshot.legacy
    const nodes = legacy && Array.isArray(legacy.nodes) ? legacy.nodes : []
    for (let index = nodes.length - 1; index >= 0; index -= 1) {
      const node = nodes[index]
      if (!node || typeof node !== 'object') continue
      if (node.kind === 'turn-tail') {
        const closing = node.data && node.data.closing
        const text = speechTextFromBlocks(closing && closing.blocks)
        if (text) return text
      }
      if (node.kind === 'assistant-step' || node.kind === 'assistant') {
        const blocks = (node.data && node.data.blocks) || node.blocks
        const text = speechTextFromBlocks(blocks)
        if (text) return text
      }
    }
    const partial = legacy && legacy.partial
    return speechTextFromBlocks(partial && partial.blocks) || ''
  } catch {
    return ''
  }
}

/**
 * Read the newest tool result text from the Chat snapshot without assuming one
 * transport shape. Tool output is only used as a weak signal for the prompt
 * pilot; its first error line can make a follow-up suggestion more specific.
 *
 * @param {object} snapshot - Chat snapshot.
 * @returns {string} newest tool-result prose, or an empty string.
 */
function latestToolResultText(snapshot) {
  try {
    const legacy = snapshot && snapshot.legacy
    const nodes = legacy && Array.isArray(legacy.nodes) ? legacy.nodes : []
    for (let index = nodes.length - 1; index >= 0; index -= 1) {
      const node = nodes[index]
      if (!node || typeof node !== 'object') continue
      if (node.kind !== 'tool-result' && node.kind !== 'tool' && node.kind !== 'tool-call-result') continue
      const blocks = (node.data && node.data.blocks) || node.blocks
      let text = speechTextFromBlocks(blocks)
      if (!text) {
        const content = (node.data && (node.data.content || node.data.result)) || node.content
        if (Array.isArray(content)) text = textFromContent(content)
        else if (typeof content === 'string') text = content
      }
      if (!text && node.data && typeof node.data.text === 'string') text = node.data.text
      if (!text && typeof node.text === 'string') text = node.text
      if (text) return String(text).slice(-1600)
    }
  } catch {
    /* a Host snapshot shape we do not recognize */
  }
  return ''
}

/**
 * Gather the compact, local-only context the prompt pilot may read.
 *
 * Keeping this in one pure function means the UI never reaches into random
 * snapshot fields and the ranking can be tested with plain objects.
 *
 * @param {object} snapshot - Chat snapshot.
 * @returns {{assistantText: string, toolText: string, history: string[], lastUserPrompt: string}}
 */
function promptContextFromChat(snapshot) {
  const legacy = snapshot && snapshot.legacy
  const nodes = legacy && Array.isArray(legacy.nodes) ? legacy.nodes : []
  let lastUserIndex = -1
  let lastAssistantIndex = -1
  let lastToolIndex = -1
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]
    if (!node || typeof node !== 'object') continue
    if (node.kind === 'user' || node.kind === 'steering') lastUserIndex = index
    else if (node.kind === 'assistant' || node.kind === 'assistant-step' || node.kind === 'turn-tail') lastAssistantIndex = index
    else if (node.kind === 'tool-result' || node.kind === 'tool' || node.kind === 'tool-call-result') lastToolIndex = index
  }
  const history = collectPromptHistory(nodes, 3).map(function (prompt) {
    return String(prompt).slice(0, PROMPT_PILOT_BUDGET.lastUser)
  })
  return {
    assistantText: latestAssistantText(snapshot).slice(-PROMPT_PILOT_BUDGET.assistant),
    toolText: latestToolResultText(snapshot).slice(-PROMPT_PILOT_BUDGET.tool),
    history,
    lastUserPrompt: history[0] || '',
    // A reply or tool result that predates the newest user turn is stale. It
    // remains useful context, but must not outrank the new user's intent.
    assistantFresh: lastAssistantIndex < 0 || lastUserIndex < 0 || lastAssistantIndex > lastUserIndex,
    toolFresh: lastToolIndex < 0 || lastUserIndex < 0 || lastToolIndex > lastUserIndex,
    lastNodeKind: nodes.length > 0 && nodes[nodes.length - 1] ? String(nodes[nodes.length - 1].kind || '') : '',
  }
}

/** Split prose into utterance-sized chunks at sentence or word boundaries. */
function splitSpeechText(text, max = 1200) {
  const flat = String(text == null ? '' : text).replace(/\s+/g, ' ').trim()
  if (!flat) return []
  const size = Math.max(80, Number(max) || 1200)
  if (flat.length <= size) return [flat]
  const chunks = []
  let rest = flat
  while (rest.length > size) {
    let cut = -1
    const window = rest.slice(0, size + 1)
    for (const match of window.matchAll(/[。！？.!?]\s+|[,;:，；：]\s+|\s+/g)) {
      if (match.index !== undefined && match.index > 0 && match.index <= size) cut = match.index + match[0].length
    }
    if (cut <= 0) cut = size
    const chunk = rest.slice(0, cut).trim()
    if (chunk) chunks.push(chunk)
    rest = rest.slice(cut).trim()
  }
  if (rest) chunks.push(rest)
  return chunks
}

/** Parse the Host session-search result into deduplicated palette rows. */
function mapSessionSearchResults(items, limit = 8) {
  const rows = []
  const seen = new Set()
  if (!Array.isArray(items)) return rows
  const max = Math.max(1, Number(limit) || 8)
  for (const item of items) {
    if (!item || item.sessionId === undefined || item.sessionId === null) continue
    const sessionId = String(item.sessionId)
    const snippet = String(item.snippet == null ? '' : item.snippet).replace(/\s+/g, ' ').trim()
    if (!sessionId || !snippet || seen.has(sessionId)) continue
    seen.add(sessionId)
    rows.push({ sessionId, snippet: snippet.length > 96 ? snippet.slice(0, 95) + '…' : snippet })
    if (rows.length >= max) break
  }
  return rows
}

/**
 * Resolve the Host's global pinned-session ids into palette rows.
 *
 * DSH keeps pins registry-global, but its sidebar only leads each expanded
 * workspace with pinned rows. When a pinned Session lives in a collapsed
 * workspace it has no visible entry anywhere, so the palette needs its own
 * small pinned section built from the same workspace and Session snapshots.
 */
function mapPinnedSessions(workspaceSnapshot, sessionSnapshot, limit = 8) {
  const rows = []
  const pinned = Array.isArray(workspaceSnapshot && workspaceSnapshot.pinnedSessionIds)
    ? workspaceSnapshot.pinnedSessionIds
    : []
  const sessions = (sessionSnapshot && sessionSnapshot.byId) || {}
  const workspaces = Array.isArray(workspaceSnapshot && workspaceSnapshot.items)
    ? workspaceSnapshot.items
    : []
  const owners = new Map()
  for (const workspace of workspaces) {
    if (!workspace || !Array.isArray(workspace.sessionIds)) continue
    for (const sessionId of workspace.sessionIds) owners.set(String(sessionId), workspace)
  }
  const max = Math.max(1, Number(limit) || 8)
  const seen = new Set()
  for (const rawId of pinned) {
    if (rawId === undefined || rawId === null) continue
    const sessionId = String(rawId)
    if (!sessionId || seen.has(sessionId)) continue
    const entry = sessions[sessionId]
    if (!entry) continue
    const title = String(
      (entry.projectionValues && entry.projectionValues.title) ||
      entry.title ||
      entry.preview ||
      '',
    ).replace(/\s+/g, ' ').trim()
    if (!title) continue
    seen.add(sessionId)
    const owner = owners.get(sessionId)
    rows.push({
      sessionId,
      title: title.length > 80 ? title.slice(0, 79) + '…' : title,
      workspaceTitle: owner && owner.title ? String(owner.title) : '',
    })
    if (rows.length >= max) break
  }
  return rows
}

/* ---------------------------------------------------------------------- */
/* Completion sound                                                       */
/* ---------------------------------------------------------------------- */

let chimeContext
let lastChimeAt = 0

/**
 * Play the two-note completion chime.
 *
 * WebAudio is created lazily and every failure is swallowed: the sound is an
 * optional flourish, never a reason for a turn to look broken. The short
 * throttle keeps rapid turn boundaries from stacking notes.
 */
function playCompletionChime() {
  try {
    const now = Date.now()
    if (now - lastChimeAt < 1500) return false
    const Ctor = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : undefined
    if (!Ctor) return false
    if (!chimeContext) chimeContext = new Ctor()
    if (chimeContext.state === 'suspended' && typeof chimeContext.resume === 'function') {
      chimeContext.resume().catch(function () {})
    }
    const start = chimeContext.currentTime
    const master = chimeContext.createGain()
    master.gain.value = 1
    master.connect(chimeContext.destination)
    const note = function (frequency, offset, duration) {
      const oscillator = chimeContext.createOscillator()
      const envelope = chimeContext.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      envelope.gain.setValueAtTime(0.0001, start + offset)
      envelope.gain.exponentialRampToValueAtTime(0.14, start + offset + 0.02)
      envelope.gain.exponentialRampToValueAtTime(0.0001, start + offset + duration)
      oscillator.connect(envelope)
      envelope.connect(master)
      oscillator.start(start + offset)
      oscillator.stop(start + offset + duration + 0.03)
    }
    note(659.25, 0, 0.28)
    note(987.77, 0.14, 0.42)
    lastChimeAt = now
    return true
  } catch {
    return false
  }
}

/**
 * Newest-first prompt history from finalized Chat nodes.
 *
 * The Chat snapshot exposes finalized user/steering nodes, so Up/Down recall
 * can be rebuilt without touching the host editor.
 *
 * @param {readonly object[]} nodes - Chat legacy nodes in log order.
 * @param {number} limit - maximum number of prompts to keep.
 * @returns {string[]} deduplicated prompt texts, newest first.
 */
function collectPromptHistory(nodes, limit = 50) {
  const result = []
  const seen = new Set()
  if (!Array.isArray(nodes)) return result
  const max = Math.max(1, Number(limit) || 50)
  for (let index = nodes.length - 1; index >= 0; index -= 1) {
    const node = nodes[index]
    if (!node || (node.kind !== 'user' && node.kind !== 'steering')) continue
    const text = textFromContent(node.content)
    if (!text || seen.has(text)) continue
    seen.add(text)
    result.push(text)
    if (result.length >= max) break
  }
  return result
}

/**
 * Backward-compatible alias for the full prompt draft.
 *
 * The old short-ghost engine is intentionally gone: an empty composer now gets
 * a complete draft (the local fallback, or the seed for the optional AI pass),
 * so callers of the old name receive the same complete text.
 *
 * @param {object} input - conversation context accepted by buildPromptDraft.
 * @returns {object|null} complete prompt suggestion.
 */
function suggestNextPrompt(input) {
  return buildPromptDraft(input)
}

/**
 * Build a complete, detailed prompt draft for the empty composer.
 *
 * This is the local fallback and the seed for the optional AI pass. Unlike the
 * old one-line ghost, it deliberately writes a full instruction: goal, known
 * context, scope, execution, and verification. The AI route can rewrite it;
 * when the route is off or unavailable the user still gets a useful draft.
 *
 * @param {{assistantText?: string, toolText?: string, lastUserPrompt?: string, sessionTitle?: string, sessionId?: string, running?: boolean, locale?: string, stats?: object, assistantFresh?: boolean, toolFresh?: boolean}} input
 * @returns {{full: string, tail: string, contextual: true, kind: string, confidence: number, score: number, key: number, alternatives: string[]}|null}
 */
function buildPromptDraft(input) {
  const source = input && typeof input === 'object' ? input : {}
  if (source.running) return null
  const assistantRaw = String(source.assistantText == null ? '' : source.assistantText).slice(-PROMPT_PILOT_BUDGET.assistant)
  const toolRaw = String(source.toolText == null ? '' : source.toolText).slice(-PROMPT_PILOT_BUDGET.tool)
  const assistant = flattenPrompt(assistantRaw).slice(-1800)
  const toolText = flattenPrompt(toolRaw).slice(-800)
  const lastUser = flattenPrompt(String(source.lastUserPrompt == null ? '' : source.lastUserPrompt).slice(-PROMPT_PILOT_BUDGET.lastUser))
  const title = flattenPrompt(String(source.sessionTitle == null ? '' : source.sessionTitle).slice(0, PROMPT_PILOT_BUDGET.title))
  const chinese = /[\u4e00-\u9fff]/.test(lastUser || assistant) || isChineseLocale(source.locale)
  const assistantFresh = source.assistantFresh !== false
  const toolFresh = source.toolFresh !== false
  const staleWeight = 0.55
  const nextStep = assistantFresh ? extractNextStep(assistantRaw, chinese) : ''
  const questionTail = /[?？]\s*$/.test(assistant) ||
    /(请确认|需要你确认|你希望|要不要|可以吗|是否继续|告诉我|shall i|should i|do you want|would you like|let me know)/i.test(assistant)
  const noError = /(没有错误|无错误|没有报错|无报错|0 ?个?错误|no errors?|no failures?|all tests? pass)/i.test(assistant)
  const error = !noError && /(报错|错误|异常|失败|未能|无法|\berror\b|\berrors\b|\bfailed\b|\bfailure\b|\bexception\b|\btraceback\b)/i.test(assistant)
  const toolError = !error && toolText && !/no errors?|全部通过|没有错误/i.test(toolText) &&
    /(报错|错误|异常|失败|未能|无法|\berror\b|\bfailed\b|\bfailure\b|\bexception\b|\btraceback\b)/i.test(toolText)

  const make = function (kind, confidence) {
    const full = chinese ? FULL_PROMPTS_ZH[kind] : FULL_PROMPTS_EN[kind]
    if (!full) return null
    const text = flattenPrompt(full)
    if (!text || text.toLowerCase() === lastUser.toLowerCase()) return null
    return {
      full: text,
      tail: text,
      contextual: true,
      kind: kind,
      confidence: confidence,
      score: Math.max(0, Math.min(1, confidence + pilotBoost(source.stats, kind))),
      key: hash32(kind + '|' + text + '|' + assistant.slice(-120) + '|' + lastUser),
      alternatives: [],
    }
  }

  if (nextStep) {
    const text = chinese
      ? '继续当前任务。下一步：' + nextStep + '。开始前先确认最新结论、改动范围和验收标准；完成后运行相关验证，并汇报结果、风险和下一步。'
      : 'Continue the current task. Next step: ' + nextStep + '. Before starting, confirm the latest conclusion, the change scope, and the acceptance checks; when done, run the relevant verification and report the result, risks, and the next step.'
    return draftResult('next-step', text, chinese, assistantFresh ? 0.96 : 0.96 * staleWeight, assistant, lastUser, source.stats)
  }
  // A failed turn is exactly when a complete diagnostic prompt is most useful;
  // an empty composer should not silently drop the suggestion after an error.
  if ((assistantFresh && error) || (toolFresh && toolError)) {
    return make('error', 0.54)
  }
  if (questionTail) {
    return make('question', assistantFresh ? 0.86 : 0.86 * staleWeight)
  }
  if (/(已(完成|修复|实现|更新|交付)|全部通过|测试通过|\b(done|completed|finished|fixed|implemented|passed)\b)/i.test(assistant)) {
    return make('completed', assistantFresh ? 0.76 : 0.76 * staleWeight)
  }
  if (/(计划|步骤|待办|方案|roadmap|\bplan\b|\bnext steps?\b)/i.test(assistant)) {
    return make('plan', assistantFresh ? 0.7 : 0.7 * staleWeight)
  }
  if (/(修改了|改动了|变更了|diff\b|changed files?|git status|文件.*改)/i.test(assistant)) {
    return make('review-changes', assistantFresh ? 0.68 : 0.68 * staleWeight)
  }

  const followUp = classifyPromptForFollowUp(lastUser, chinese)
  if (followUp) {
    const kind = /审|review|audit|risk|issue|bug|问题/.test(lastUser) ? 'review'
      : /测试|单测|test|coverage|回归/.test(lastUser) ? 'tests'
        : /性能|优化|慢|卡|performance|optimi[sz]e/.test(lastUser) ? 'performance'
          : /readme|文档|说明|doc|注释/.test(lastUser) ? 'docs'
            : /解释|为什么|原理|explain|why|怎么工作/.test(lastUser) ? 'explain'
              : /部署|发布|上线|回滚|deploy|release|rollback/.test(lastUser) ? 'deploy'
                : /架构|重构|设计|architecture|refactor|design/.test(lastUser) ? 'architecture'
                  : /实现|开发|改|修复|新增|build|implement|fix|add/.test(lastUser) ? 'implement' : 'continue'
    return make('follow-up-' + kind, 0.62)
  }
  if (!assistant && title) {
    const text = chinese
      ? '继续当前任务「' + title + '」：先总结已完成部分和未完成项，再给出一个具体的下一步并执行；完成后运行验证并汇报结果。'
      : 'Continue the current task "' + title + '": summarize what is done and what is left, then take one concrete next step and execute it; run verification and report the result.'
    return draftResult('session-title', text, chinese, 0.45, assistant, lastUser, source.stats)
  }
  // A generic but still complete fallback: if a reply exists without a stronger
  // signal, ask for a concrete next step instead of showing nothing.
  if (assistant) return make('assistant-followup', 0.38)
  if (!assistant && !lastUser) {
    return make('starter', 0.42)
  }
  return make('starter', 0.34)
}

/** Shape one fully written local prompt into the suggestion contract. */
function draftResult(kind, full, chinese, confidence, assistant, lastUser, stats) {
  const text = flattenPrompt(full)
  if (!text) return null
  return {
    full: text,
    tail: text,
    contextual: true,
    kind: kind,
    confidence: confidence,
    score: Math.max(0, Math.min(1, confidence + pilotBoost(stats, kind))),
    key: hash32(kind + '|' + text + '|' + assistant.slice(-120) + '|' + lastUser),
    alternatives: [],
  }
}

const FULL_PROMPTS_ZH = Object.freeze({
  question: '按你刚才的建议继续：请先说明你推荐哪个方案以及关键理由，再直接执行；完成后运行相关验证，并汇报结果、风险和下一步。',
  completed: '基于刚才完成的结果继续：检查改动是否覆盖目标，运行相关测试或构建并整理可复现步骤；确认通过后提交并推送，最后汇报结果、风险和下一步。',
  plan: '按上面的计划开始执行：先完成第一步并说明目标、范围和验收标准；每完成一步运行验证，最后汇总结果、风险与剩余项。',
  'review-changes': '请审查刚才的改动：先列出改动范围和目的，再运行相关测试或构建，指出风险、遗漏和回滚方式；确认无误后整理提交信息。',
  'follow-up-review': '请继续审查当前实现：重点检查边界条件、错误处理、权限与数据一致性；给出按优先级排序的问题和具体修复建议，并运行相关验证。',
  'follow-up-tests': '请补充边界和失败路径测试：说明覆盖点，构造输入并运行测试；测试通过后汇报新增用例和仍存在的风险。',
  'follow-up-performance': '请先测量性能：给出基准场景、关键指标和可复现命令，定位瓶颈后再优化；优化后重跑基准并对比结果。',
  'follow-up-docs': '请更新相关文档：先核对当前行为与命令，再补充使用步骤、配置项和限制；最后检查示例命令可执行。',
  'follow-up-explain': '请继续解释这个机制：先给出结论，再用最小示例逐步说明关键路径、边界和常见误解；最后列出仍需验证的假设。',
  'follow-up-deploy': '请准备发布：先核对版本、配置和回滚步骤，再运行发布前验证；列出风险、依赖和回滚方案，确认后再执行。',
  'follow-up-architecture': '请先梳理当前结构：列出模块边界、数据流和耦合点，指出两个最值得调整的地方；给出最小改动方案和验证方式。',
  'follow-up-implement': '请继续实现当前目标：先说明改动范围和验收标准，再完成代码与测试；最后运行验证并汇报结果、风险和下一步。',
  'follow-up-continue': '请继续当前任务：先总结已完成部分和未完成项，再给出一个具体下一步并执行；完成后运行验证并汇报结果。',
  error: '先复现并定位刚才的失败：给出报错摘要、复现命令和根因假设；修复后运行同一验证，对比修复前后的结果并说明剩余风险。',
  'assistant-followup': '基于上面的结论继续：先总结已经确认的结果和未决问题，再提出一个具体下一步并执行；完成后运行验证并汇报结果、风险和下一步。',
  starter: '请先通读当前项目结构和关键入口，说明你理解的目标、约束和风险，再提出一个可执行的第一步；先不要改代码，等我确认方案。',
})

const FULL_PROMPTS_EN = Object.freeze({
  question: 'Continue with your recommendation: first state which option you recommend and why, then execute it; afterwards run the relevant verification and report the result, risks, and next step.',
  completed: 'Continue from the completed work: check that the change covers the goal, run the relevant tests or build, and record reproducible steps; once it passes, commit and push, then report the result, risks, and next step.',
  plan: 'Start executing the plan above: complete the first step and state its goal, scope, and acceptance checks; verify after each step, then summarize the result, risks, and remaining work.',
  'review-changes': 'Review the change just made: list its scope and purpose, run the relevant tests or build, and call out risks, gaps, and rollback steps; then prepare the commit message.',
  'follow-up-review': 'Continue reviewing the implementation: focus on edge cases, error handling, permissions, and data consistency; prioritize concrete defects, fix them, and run the relevant verification.',
  'follow-up-tests': 'Add edge-case and failure-path tests: state what is covered, build the inputs, and run the suite; then report the new cases and any remaining risks.',
  'follow-up-performance': 'Measure performance first: define the benchmark, key metrics, and reproducible command, locate the bottleneck, then optimize; rerun the benchmark and compare before and after.',
  'follow-up-docs': 'Update the documentation: confirm the current behavior and commands, add usage steps, configuration, and limitations, then check that every example command works.',
  'follow-up-explain': 'Explain the mechanism further: give the conclusion first, then walk through the critical path, boundaries, and common misconceptions with a minimal example; end with assumptions still to verify.',
  'follow-up-deploy': 'Prepare the release: verify the version, configuration, and rollback steps, then run the pre-release checks; list the risks, dependencies, and rollback plan before executing.',
  'follow-up-architecture': 'Map the current structure first: list module boundaries, data flow, and coupling points, name the two changes worth making, and propose the smallest safe change with verification.',
  'follow-up-implement': 'Continue implementing the current goal: state the scope and acceptance checks, complete the code and tests, then run verification and report the result, risks, and next step.',
  'follow-up-continue': 'Continue the current task: summarize what is done and what is left, then take one concrete next step; run verification and report the result.',
  error: 'Reproduce and localize the failure: give the error summary, the reproduction command, and a root-cause hypothesis; after fixing it, run the same verification, compare before and after, and state the remaining risks.',
  'assistant-followup': 'Continue from the conclusion above: summarize what is confirmed and what is unresolved, then take one concrete next step; run verification and report the result, risks, and next step.',
  starter: 'First read the current project structure and key entry points, then state the goal, constraints, and risks you understand and propose one executable first step. Do not change code until I confirm the plan.',
})



/** Collapse whitespace for a stable, single-line suggestion comparison. */
function flattenPrompt(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim()
}

/** Remove one markdown list marker / emphasis wrapper from a line. */
function stripMarkdownLine(value) {
  return String(value == null ? '' : value)
    .replace(/^\s*(?:#{1,6}\s*|[-*•>]+|\d+[.)、])\s*/, '')
    .replace(/\*\*/g, '')
    .trim()
}

/** Trim one extracted action into a single actionable sentence. */
function cleanActionText(value) {
  let text = flattenPrompt(value)
  text = text.replace(/^[-*•>]+/, '').replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim()
  const cut = text.search(/[。！？!?；;]/)
  if (cut > 4) text = text.slice(0, cut).trim()
  if (text.length > 96) text = text.slice(0, 95).trim() + '…'
  return text
}

/**
 * Extract the assistant's explicit next step, preferring labeled lines over a
 * sentence buried in prose. "Next step: run the failing test" becomes a real
 * suggestion instead of the generic "continue" fallback.
 */
function extractNextStep(text, chinese) {
  const raw = String(text == null ? '' : text).replace(/\r/g, '').replace(/```[\s\S]*?```/g, '')
  const lines = raw.split('\n').map(stripMarkdownLine).filter(Boolean)
  const label = /^(下一步|接下来|后续建议|后续步骤|后续|建议先|next steps?|next)\s*(?:[:：\-—]\s*)?(.*)$/i
  // Prefer the last explicit step: a long answer may mention an earlier plan
  // and then revise it in the closing paragraph.
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const match = lines[index].match(label)
    if (!match) continue
    let rest = cleanActionText(match[2] || '')
    if (!rest) {
      for (let next = index + 1; next < lines.length; next += 1) {
        if (lines[next]) {
          rest = cleanActionText(lines[next])
          break
        }
      }
    }
    if (rest.length >= 4 && !/^(是|为|：|:)/.test(rest)) {
      if (/^(如果|若|是否|你希望|需要你)/.test(rest)) return ''
      return rest
    }
  }
  const inline = Array.from(raw.matchAll(/(?:下一步|next step)[^。！？!?\n]{4,180}/gi))
  for (let index = inline.length - 1; index >= 0; index -= 1) {
    const rest = cleanActionText(inline[index][0].replace(/^(下一步|next step)\s*[:：\-—]?\s*/i, ''))
    if (rest.length >= 4) return rest
  }
  return ''
}

/** Classify the last user prompt into the most useful follow-up shape. */
function classifyPromptForFollowUp(value, chinese) {
  const text = flattenPrompt(value)
  if (!text) return ''
  if (chinese) {
    if (/(审查|检查|review|审计|风险|问题|bug)/i.test(text)) return '修高优先级问题'
    if (/(测试|单测|test|coverage|回归)/i.test(text)) return '补边界测试'
    if (/(性能|优化|慢|卡|performance|optimi[sz]e)/i.test(text)) return '先测性能'
    if (/(计划|拆解|方案|步骤|plan|roadmap)/i.test(text)) return '开始第一步'
    if (/(readme|文档|说明|doc|注释)/i.test(text)) return '补一下文档'
    if (/(解释|为什么|原理|explain|why|怎么工作)/i.test(text)) return '再举个例子'
    if (/(部署|发布|上线|回滚|deploy|release|rollback)/i.test(text)) return '准备发布'
    if (/(架构|重构|设计|architecture|refactor|design)/i.test(text)) return '先理清结构'
    if (/(实现|开发|改|修复|新增|build|implement|fix|add)/i.test(text)) return '继续实现'
    return '继续'
  }
  if (/(review|audit|risk|issue|bug|check)/i.test(text)) return 'fix high-priority issues'
  if (/(test|coverage|regression)/i.test(text)) return 'add edge tests'
  if (/(performance|optimi[sz]e|slow|latency)/i.test(text)) return 'measure performance first'
  if (/(plan|roadmap|steps|break down)/i.test(text)) return 'start with step one'
  if (/(readme|docs?|documentation|comments?)/i.test(text)) return 'update the docs'
  if (/(explain|why|how does|how it works)/i.test(text)) return 'give an example'
  if (/(deploy|release|rollback)/i.test(text)) return 'prepare the release'
  if (/(architecture|refactor|design)/i.test(text)) return 'map the structure first'
  if (/(implement|build|fix|add|change)/i.test(text)) return 'finish the implementation'
  return 'continue'
}

/* ---------------------------------------------------------------------- */
/* Prompt-pilot local feedback                                            */
/* ---------------------------------------------------------------------- */

/** localStorage key for aggregate, content-free suggestion feedback. */
const PILOT_STATS_KEY = 'dsh.claude-mode.prompt-pilot.v1'

const PILOT_KINDS_MAX = 24
const PILOT_COUNT_MAX = 1000000

/** Normalize persisted prompt-pilot counts into a bounded, known shape. */
function normalizePilotStats(input) {
  const source = input && typeof input === 'object' ? input : {}
  const kinds = {}
  const rawKinds = source.kinds && typeof source.kinds === 'object' ? source.kinds : {}
  const names = Object.keys(rawKinds).slice(0, PILOT_KINDS_MAX)
  for (const name of names) {
    if (name === '__proto__' || name === 'prototype' || name === 'constructor') continue
    const item = rawKinds[name] && typeof rawKinds[name] === 'object' ? rawKinds[name] : {}
    const count = function (value) {
      const number = Math.floor(Number(value) || 0)
      return number > 0 ? Math.min(PILOT_COUNT_MAX, number) : 0
    }
    kinds[String(name).slice(0, 40)] = {
      shown: count(item.shown),
      accepted: count(item.accepted),
      dismissed: count(item.dismissed),
    }
  }
  const last = function (value) {
    const item = value && typeof value === 'object' ? value : {}
    return { key: String(item.key || ''), at: Math.max(0, Number(item.at) || 0) }
  }
  return {
    version: 1,
    kinds: kinds,
    lastAccepted: last(source.lastAccepted),
    lastDismissed: last(source.lastDismissed),
  }
}

/** One accepted/dismissed ratio, bounded so feedback never dominates content. */
function pilotBoost(stats, kind) {
  const normalized = normalizePilotStats(stats)
  const item = normalized.kinds[String(kind)]
  if (!item || item.shown < 3) return 0
  const acceptance = item.accepted / item.shown
  const dismissal = item.dismissed / item.shown
  return Math.max(-0.04, Math.min(0.08, acceptance * 0.1 - dismissal * 0.05))
}

/** Update one aggregate counter without storing any prompt text. */
function recordPilotEvent(stats, kind, event, at = Date.now(), key = '') {
  const normalized = normalizePilotStats(stats)
  const name = String(kind || 'unknown').slice(0, 40)
  const item = normalized.kinds[name] || { shown: 0, accepted: 0, dismissed: 0 }
  const next = { shown: item.shown, accepted: item.accepted, dismissed: item.dismissed }
  if (event === 'shown' || event === 'accepted' || event === 'dismissed') {
    next[event] = Math.min(PILOT_COUNT_MAX, next[event] + 1)
  }
  const result = {
    version: 1,
    kinds: Object.assign({}, normalized.kinds),
    lastAccepted: normalized.lastAccepted,
    lastDismissed: normalized.lastDismissed,
  }
  result.kinds[name] = next
  if (event === 'accepted') result.lastAccepted = { key: String(key || ''), at: Math.max(0, Number(at) || 0) }
  if (event === 'dismissed') result.lastDismissed = { key: String(key || ''), at: Math.max(0, Number(at) || 0) }
  return result
}

/** Whether a suggestion key was recently accepted/dismissed and should rest. */
function suggestionSuppressed(stats, key, now = Date.now(), limits = {}) {
  const normalized = normalizePilotStats(stats)
  const dismissedFor = Math.max(0, Number(limits.dismissed) || 60000)
  const wanted = String(key == null ? '' : key)
  if (!wanted) return false
  // Accepting is not a reason to hide the same suggestion forever: if the
  // user deletes the accepted draft, the next prompt should come back. Only
  // an explicit Esc dismissal cools the key down.
  const dismissed = normalized.lastDismissed
  if (dismissed.key === wanted && now - dismissed.at >= 0 && now - dismissed.at < dismissedFor) return true
  return false
}

/**
 * Find one inline prompt completion for the current draft.
 *
 * The lookup is deliberately cheap and local: recent prompts first, then a
 * small set of task-shaped starter prompts. A completion only appears when the
 * draft is a prefix and the remainder would fit on the same line; the caller
 * owns the caret and focus checks.
 *
 * @param {string} draft - current composer text.
 * @param {string[]} history - newest-first prompts from the active Session.
 * @param {string} locale - locale id used to pick starter prompts.
 * @returns {{full: string, tail: string}|null} accepted text and its ghost tail.
 */
function suggestPromptCompletion(draft, history, locale) {
  const raw = String(draft == null ? '' : draft)
  const probe = raw.trim()
  if (probe.length < 2 || /[\r\n]/.test(probe)) return null
  if (probe[0] === '/' || probe[0] === '@') return null
  const lower = probe.toLowerCase()
  const builtins = isChineseLocale(locale) ? PROMPT_SUGGESTIONS_ZH : PROMPT_SUGGESTIONS_EN
  const seen = new Set()
  const pools = [Array.isArray(history) ? history : [], builtins]
  for (const pool of pools) {
    for (const value of pool) {
      const full = String(value == null ? '' : value).replace(/\s+/g, ' ').trim()
      if (!full || full.length <= probe.length || seen.has(full)) continue
      seen.add(full)
      if (!full.toLowerCase().startsWith(lower)) continue
      return { full, tail: full.slice(probe.length) }
    }
  }
  return null
}

/**
 * Step one prompt-history recall gesture.
 *
 * @param {{active: boolean, index: number, draft: string}} state - navigation state.
 * @param {number} direction - -1 for older (Up), 1 for newer (Down).
 * @param {string[]} prompts - newest-first prompt list.
 * @param {string} currentText - current composer text, captured when navigation starts.
 * @returns {{state: {active: boolean, index: number, draft: string}, text: string|null}}
 *   `text: null` means the composer should not be touched.
 */
function stepPromptHistory(state, direction, prompts, currentText = '') {
  const list = Array.isArray(prompts) ? prompts : []
  const base = state && typeof state === 'object' && typeof state.index === 'number'
    ? state
    : { active: false, index: -1, draft: '' }
  if (direction < 0) {
    if (list.length === 0) return { state: base, text: null }
    if (!base.active) {
      return { state: { active: true, index: 0, draft: String(currentText || '') }, text: list[0] }
    }
    const index = Math.min(base.index + 1, list.length - 1)
    return { state: { ...base, index }, text: list[index] }
  }
  if (!base.active) return { state: base, text: null }
  if (base.index <= 0) {
    return { state: { active: false, index: -1, draft: '' }, text: base.draft }
  }
  const index = base.index - 1
  return { state: { ...base, index }, text: list[index] }
}

/**
 * dsh-claude-mode — scoped stylesheet.
 *
 * Every plugin widget selector is namespaced with `.ccm-`. The one deliberate
 * exception is the host sidebar scroll override, scoped by the host's
 * `sidebarCol` class fragment so expanding plugin panels cannot hide the
 * workspace; it is restored when the plugin context is destroyed.
 * Colors, radii, and elevations resolve through the active theme tokens, which
 * means the widgets follow the host theme (including when Claude mode is off
 * and the user is on a built-in theme).
 */

/** Stylesheet text inserted once through the Client `styles` builtin. */
const STYLES = `
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

/* Inline prompt completion ghost appended to document.body. Fixed positioning
   and viewport coordinates come from the component; only paint lives here. */
.ccm-ghost {
  position: fixed;
  z-index: 2200;
  display: none;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  pointer-events: none;
  user-select: none;
  color: var(--dsw-alias-label-secondary, #6b6b6b);
  opacity: 0.96;
  font-family: var(--dsh-font-family, inherit);
}

/* Screen-reader announcement for a context-aware suggestion. */
.ccm-ghost-live {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* Empty-composer suggestions replace the Host placeholder with the ghost
   sentence. Current hosts render that placeholder as a sibling node; the
   pseudo-element and attribute rules cover older renderers. */
[data-composer-input="true"].ccm-ghost-placeholder ~ [data-composer-placeholder="true"] {
  visibility: hidden !important;
}

[data-composer-input="true"].ccm-ghost-placeholder::before,
[data-composer-input="true"].ccm-ghost-placeholder::after {
  content: none !important;
}

@media (prefers-contrast: more) {
  .ccm-ghost {
    color: var(--dsw-alias-label-secondary, #555);
    opacity: 1;
  }
}

/* Complete, multi-line prompt suggestion. Long prompts must stay readable:
   the body wraps, scrolls inside a capped card, and keeps the composer focused
   because pointerdown is cancelled by the component. */
.ccm-ai-preview {
  position: fixed;
  z-index: 2400;
  display: none;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
  max-height: min(360px, 44vh);
  padding: 12px 14px 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-lg, 10px);
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.08);
  color: var(--dsw-alias-label-primary);
  pointer-events: auto;
  user-select: text;
  font-family: var(--dsh-font-family, inherit);
}

.ccm-ai-preview-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.ccm-ai-preview-title {
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  color: var(--dsw-alias-brand-primary);
  letter-spacing: 0.01em;
}

.ccm-ai-preview-hint {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-caption);
  font-size: 11px;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ccm-ai-preview-body {
  min-height: 0;
  overflow-y: auto;
  padding-right: 3px;
  color: var(--dsw-alias-label-primary);
  font-size: 15px;
  line-height: 23px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.ccm-ai-preview-foot {
  flex: 0 0 auto;
  padding-top: 6px;
  border-top: 1px solid var(--dsw-alias-border-l1);
  color: var(--dsw-alias-label-caption);
  font-size: 11px;
  line-height: 16px;
}

@media (prefers-contrast: more) {
  .ccm-ai-preview {
    border-color: var(--dsw-alias-label-secondary);
  }
  .ccm-ai-preview-body {
    color: var(--dsw-alias-label-primary);
  }
}

@media (max-width: 560px) {
  .ccm-ai-preview {
    max-height: min(320px, 46vh);
    padding: 10px 12px 9px;
  }
  .ccm-ai-preview-body {
    font-size: 15px;
    line-height: 22px;
  }
}


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
/* Data & storage audit: read-only cards plus a downloadable migration plan. */
.ccm-data { padding: 12px 14px 14px; gap: 10px; }
.ccm-data-head { display: flex; align-items: flex-start; gap: 12px; }
.ccm-data-head-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.ccm-data-state { min-height: 18px; color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 18px; }
.ccm-data-home { display: flex; flex-direction: column; gap: 5px; padding: 10px 0 4px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.ccm-data-home-head, .ccm-data-row { display: flex; align-items: center; gap: 10px; min-width: 0; }
.ccm-data-home-head { justify-content: space-between; }
.ccm-data-home-head .ccm-data-row-title { flex: 1 1 auto; }
.ccm-data-cleanup { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; padding-top: 10px; border-top: 1px solid var(--dsw-alias-border-l1); }
.ccm-data-days { box-sizing: border-box; width: 68px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; padding: 5px 7px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; line-height: 18px; }
.ccm-data-days:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.ccm-data-row { padding: 7px 0; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.ccm-data-row:last-child { border-bottom: 0; }
.ccm-data-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
.ccm-data-row-title { min-width: 0; overflow: hidden; color: var(--dsw-alias-label-primary); font-size: 13px; font-weight: 500; line-height: 19px; text-overflow: ellipsis; white-space: nowrap; }
.ccm-data-row-right { display: flex; align-items: center; gap: 8px; flex: 0 0 auto; }
.ccm-data-paths { display: flex; align-items: center; gap: 6px; min-width: 0; flex-wrap: wrap; }
.ccm-data-path { min-width: 0; max-width: 100%; overflow: hidden; color: var(--dsw-alias-label-tertiary); font-family: var(--dsh-font-mono, ui-monospace, monospace); font-size: 11px; line-height: 17px; text-overflow: ellipsis; white-space: nowrap; }
.ccm-data-arrow { color: var(--dsw-alias-label-caption); font-size: 11px; }
.ccm-data-badge { flex: 0 0 auto; border-radius: 999px; padding: 2px 7px; font-size: 11px; line-height: 16px; white-space: nowrap; }
.ccm-data-badge.is-managed { color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-2); }
.ccm-data-badge.is-direct { color: #a34a1f; background: rgba(215, 119, 87, 0.14); }
.ccm-data-badge.is-other { color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-2); }
.ccm-data-badge.is-missing { color: var(--dsw-alias-label-caption); background: transparent; }
.ccm-data-size { flex: 0 0 auto; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; font-variant-numeric: tabular-nums; }
.ccm-data-drives { display: flex; flex-wrap: wrap; gap: 6px; }
.ccm-data-drive { border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; padding: 2px 7px; color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 17px; }
.ccm-data-subhead { margin-top: 4px; color: var(--dsw-alias-label-tertiary); font-size: 11px; font-weight: 600; letter-spacing: 0.04em; line-height: 16px; text-transform: uppercase; }
.ccm-data-chips { display: flex; flex-wrap: wrap; gap: 5px; }
.ccm-data-chip { display: inline-flex; align-items: center; gap: 5px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; padding: 2px 6px; color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 17px; }
.ccm-data-chip-value { color: var(--dsw-alias-label-caption); font-variant-numeric: tabular-nums; }
.ccm-data-target { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
.ccm-data-target-label { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
.ccm-data-input { box-sizing: border-box; width: 100%; max-width: 520px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; padding: 6px 8px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; line-height: 18px; }
.ccm-data-input:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.ccm-data-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ccm-data-plan-summary { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
.ccm-data-plan-action { display: flex; flex-direction: column; gap: 2px; padding: 6px 0; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.ccm-data-note { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
.ccm-data-note strong { font-weight: 600; color: var(--dsw-alias-label-primary); }
.ccm-data-steps { margin: 0; padding-left: 18px; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
.ccm-data-steps li { margin: 2px 0; }
.ccm-data .ccm-btn { flex: 0 0 auto; }

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
/* Host sidebar: one scrolling column                                  */
/* ------------------------------------------------------------------ */
/* The host sidebar is a fixed-height flex column: its panel list can grow
   past the viewport when many plugin icons are expanded, shrinking the
   workspace/session region instead of scrolling. Keep the normal fill layout,
   give the region a readable floor, and let the whole left column scroll once
   the panel list makes the content taller than the viewport. */
[class*="sidebarCol"] {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35)) transparent;
}
[class*="sidebarCol"] > div > div:first-child {
  height: 100% !important;
  min-height: 100% !important;
}
[class*="sidebarCol"] [class*="panelList"] { flex: 0 0 auto !important; }
[class*="sidebarCol"] [class*="regionArea"] {
  flex: 1 1 auto !important;
  min-height: 280px !important;
}
[class*="sidebarCol"] [class*="footArea"] { flex: 0 0 auto !important; }
[class*="sidebarCol"]::-webkit-scrollbar { width: 8px; height: 8px; }
[class*="sidebarCol"]::-webkit-scrollbar-track { background: transparent; }
[class*="sidebarCol"]::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 999px;
  background: var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.35));
  background-clip: padding-box;
}
[class*="sidebarCol"]::-webkit-scrollbar-thumb:hover { background: var(--dsw-alias-label-caption, rgba(127, 127, 127, 0.55)); background-clip: padding-box; }

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

/**
 * dsh-claude-mode — React components registered into official slots.
 *
 * All components are defensive by design: a missing service, prop, or token
 * degrades a widget instead of crashing the slot entry. The status star and
 * completion footer uses a fixed six-frame glyph pulse: a six-frame
 * Unicode pulse for the running star, and one per-turn completion word before
 * the duration.
 */

/** Rendered plugin version (also shown in the Settings about card). */
const VERSION = '1.1.3'

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

/** Whether a DOM node currently paints; hidden React leftovers should not block. */
function isElementVisible(node) {
  try {
    return Boolean(node && (node.offsetParent !== null || (node.getClientRects && node.getClientRects().length > 0)))
  } catch {
    return false
  }
}

/** Whether a host popup (slash menu, autocomplete) currently owns the arrows. */
function hostMenuOpen() {
  try {
    const nodes = document.querySelectorAll('[role="listbox"], [role="menu"]')
    for (const node of nodes) {
      if (node.closest && node.closest('.ccm-palette, .ccm-shortcuts')) continue
      if (isElementVisible(node)) return true
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

/** Locate the host's resident composer editor. */
function composerEditor() {
  try {
    const editor = document.querySelector('[contenteditable="true"][data-composer-input="true"]')
    if (editor && editor.offsetParent !== null && !(editor.closest && editor.closest('[role="dialog"]'))) return editor
    const fallback = document.querySelector('[contenteditable="true"]')
    if (fallback && !(fallback.closest && fallback.closest('[role="dialog"]'))) return fallback
  } catch {
    /* ignore */
  }
  return null
}

/** Caret rectangle only while the caret sits at the end of the composer. */
function caretAtComposerEnd(editor) {
  try {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) return null
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.startContainer)) return null
    const tail = document.createRange()
    tail.setStart(range.startContainer, range.startOffset)
    tail.setEnd(editor, editor.childNodes.length)
    if (tail.toString().replace(/\s+/g, '') !== '') return null
    const rects = range.getClientRects()
    let rect = rects && rects.length > 0 ? rects[rects.length - 1] : range.getBoundingClientRect()
    if (!rect || (!rect.width && !rect.height)) {
      const box = editor.getBoundingClientRect()
      if (!box.width || !box.height) return null
      const lineHeight = parseFloat(getComputedStyle(editor).lineHeight) || 20
      rect = { left: box.left + 8, top: box.top + 8, width: 0, height: lineHeight }
    }
    return rect
  } catch {
    return null
  }
}

/**
 * Rect at the start of an empty composer, used for a full-sentence suggestion.
 * An empty contenteditable has no useful selection rect in Chromium, so the
 * editor's own padding box is the reliable origin.
 */
function composerStartRect(editor) {
  try {
    const box = editor.getBoundingClientRect()
    const style = getComputedStyle(editor)
    const lineHeight = parseFloat(style.lineHeight) || 20
    return {
      left: box.left + (parseFloat(style.paddingLeft) || 8),
      top: box.top + (parseFloat(style.paddingTop) || 8),
      height: lineHeight,
    }
  } catch {
    return null
  }
}

/** Current Session title from the Host document title (empty for a blank one). */
function sessionTitleFromDocument() {
  try {
    const raw = String(document.title || '')
      .replace(/\s*[—–-]\s*DeepSeek Harness\s*$/i, '')
      .trim()
    if (!raw || /^(DeepSeek Harness|新会话|未命名|New session|Untitled)$/i.test(raw)) return ''
    return raw
  } catch {
    return ''
  }
}

/** Read aggregate prompt-pilot feedback; no prompt text is persisted. */
function readPromptPilotStats() {
  try {
    const raw = window.localStorage.getItem(PILOT_STATS_KEY)
    return normalizePilotStats(raw ? JSON.parse(raw) : null)
  } catch {
    return normalizePilotStats(null)
  }
}

/** Persist aggregate prompt-pilot feedback, swallowing private-mode errors. */
function savePromptPilotStats(stats) {
  try {
    window.localStorage.setItem(PILOT_STATS_KEY, JSON.stringify(normalizePilotStats(stats)))
  } catch {
    /* storage can be unavailable in private or embedded contexts */
  }
}

/**
 * Optional AI pass for the empty composer. The Host row exposes one same-origin
 * route; the client only calls it when the local, detailed draft is already on
 * screen, and caches the result per context so a delete-after-accept or a
 * second focus never pays for the same prompt twice.
 */
const AI_PROMPT_ROUTE = '/dsh-claude-mode/ai-prompt'
const AI_CACHE_TTL = 10 * 60 * 1000
const AI_CACHE_MAX = 8
const AI_PROMPT_MAX = 1400

function aiContextKey(context, locale, localPrompt) {
  return hash32([
    String(locale || ''),
    String(context && context.assistantText || '').slice(-4000),
    String(context && context.toolText || '').slice(-1200),
    String(context && context.lastUserPrompt || ''),
    String(context && context.sessionTitle || ''),
    String(localPrompt || ''),
  ].join('|'))
}

function requestAiPrompt(context, locale, localPrompt, signal, sessionId) {
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
    return Promise.reject(new Error('fetch unavailable'))
  }
  const body = {
    locale: String(locale || 'zh-CN'),
    // Let the Host route this auxiliary call through the live Session model
    // instead of the deployment default.
    sessionId: String(sessionId || '').slice(0, 128),
    context: {
      sessionTitle: String(context && context.sessionTitle || '').slice(0, 160),
      lastUserPrompt: String(context && context.lastUserPrompt || '').slice(-1600),
      assistantText: String(context && context.assistantText || '').slice(-6000),
      toolText: String(context && context.toolText || '').slice(-1600),
      localPrompt: String(localPrompt || '').slice(0, 1600),
      assistantFresh: !context || context.assistantFresh !== false,
    },
  }
  return window.fetch(AI_PROMPT_ROUTE, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: {
      'content-type': 'application/json',
      'x-dsh-claude-mode': '1',
    },
    body: JSON.stringify(body),
    signal,
  }).then(function (response) {
    if (!response.ok) throw new Error('AI prompt HTTP ' + response.status)
    return response.json()
  }).then(function (payload) {
    if (!payload || payload.ok !== true) throw new Error(String(payload && payload.reason || 'AI prompt failed'))
    const text = String(payload.prompt || '').trim()
    return text ? text.slice(0, AI_PROMPT_MAX) : ''
  })
}

/* ---------------------------------------------------------------------- */
/* Data & storage audit                                                    */
/* ---------------------------------------------------------------------- */

const DATA_ROUTE = '/dsh-claude-mode/data'

function requestSameOriginJson(url, options, timeoutMs) {
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
    return Promise.reject(new Error('fetch unavailable'))
  }
  const controller = typeof AbortController === 'function' ? new AbortController() : null
  const timer = controller ? window.setTimeout(function () { controller.abort() }, timeoutMs || 20000) : 0
  const init = Object.assign({}, options || {}, {
    credentials: 'same-origin',
    cache: 'no-store',
    headers: Object.assign({ 'x-dsh-claude-mode': '1' }, (options && options.headers) || {}),
    ...(controller ? { signal: controller.signal } : {}),
  })
  return window.fetch(url, init).then(function (response) {
    if (!response.ok) throw new Error('HTTP ' + response.status)
    return response.json()
  }).then(function (payload) {
    if (!payload || payload.ok !== true) throw new Error(String(payload && (payload.reason || payload.error) || 'request failed'))
    return payload
  }).finally(function () {
    if (timer) window.clearTimeout(timer)
  })
}

function requestDataAudit(force) {
  return requestSameOriginJson(DATA_ROUTE + '/audit' + (force ? '?refresh=1' : ''), { method: 'GET' }, 20000)
}

function requestDataPlan(targetRoot) {
  return requestSameOriginJson(DATA_ROUTE + '/plan', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ targetRoot: String(targetRoot || '') }),
  }, 20000)
}

function requestDataCleanup(olderThanDays) {
  return requestSameOriginJson(DATA_ROUTE + '/cleanup', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ olderThanDays: Number(olderThanDays) || 7 }),
  }, 20000)
}

function downloadTextFile(filename, text) {
  try {
    const blob = new Blob(['\uFEFF' + String(text || '')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    anchor.style.display = 'none'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(function () { URL.revokeObjectURL(url) }, 1500)
  } catch {
    /* download is a convenience; the settings surface still shows the plan */
  }
}

/**
 * Inline prompt completion for the resident composer.
 *
 * The editor stays host-owned: this entry appends one fixed, pointer-events-none
 * ghost span to the document body (the slot explicitly requires body-level fixed
 * overlays), measures the caret only when it is at the end of the draft, and
 * accepts with Tab through the composer's own draft action. The ghost is light
 * secondary text; accepted text is ordinary composer text.
 */
function createGhostSuggestion(ctx, store, t, getLocale) {
  return function GhostSuggestion(props) {
    const settings = useSettings(store)
    const useInput = typeof props.useInput === 'function' ? props.useInput : function () { return undefined }
    // Subscribe to the draft so the component re-renders with the host input
    // state; the DOM listeners below handle caret moves between renders.
    const inputDraft = useInput(function (state) {
      return state && typeof state.draft === 'string' ? state.draft : ''
    })
    // Context source for the empty-composer suggestion: the same Chat snapshot
    // the run bar uses, read here so a finished reply can refresh the ghost
    // without requiring another keystroke.
    const useChat = typeof props.useChat === 'function' ? props.useChat : useNoChat
    const chatSnapshot = useChat(selectChatSnapshot)
    const chatRef = React.useRef(chatSnapshot)
    const refreshRef = React.useRef(null)
    chatRef.current = chatSnapshot
    React.useEffect(function () {
      if (refreshRef.current) refreshRef.current()
    }, [chatSnapshot, inputDraft])

    React.useEffect(function () {
      if (!settings.enabled || settings.ghost === false) return undefined
      const element = document.createElement('span')
      element.className = 'ccm-ghost'
      element.setAttribute('aria-hidden', 'true')
      element.setAttribute('data-claude-mode', '')
      element.style.display = 'none'
      document.body.appendChild(element)
      const live = document.createElement('span')
      live.className = 'ccm-ghost-live'
      live.setAttribute('data-claude-mode', '')
      live.setAttribute('role', 'status')
      live.setAttribute('aria-live', 'polite')
      live.setAttribute('aria-atomic', 'true')
      document.body.appendChild(live)

      const panel = document.createElement('div')
      panel.className = 'ccm-ai-preview'
      panel.setAttribute('data-claude-mode', '')
      panel.setAttribute('role', 'note')
      panel.style.display = 'none'
      const panelHead = document.createElement('div')
      panelHead.className = 'ccm-ai-preview-head'
      const panelTitle = document.createElement('span')
      panelTitle.className = 'ccm-ai-preview-title'
      const panelHint = document.createElement('span')
      panelHint.className = 'ccm-ai-preview-hint'
      panelHead.appendChild(panelTitle)
      panelHead.appendChild(panelHint)
      const panelBody = document.createElement('div')
      panelBody.className = 'ccm-ai-preview-body'
      const panelFoot = document.createElement('div')
      panelFoot.className = 'ccm-ai-preview-foot'
      panel.appendChild(panelHead)
      panel.appendChild(panelBody)
      panel.appendChild(panelFoot)
      panel.addEventListener('mousedown', function (event) {
        // Keep the composer focused while the user scrolls or reads the card.
        event.preventDefault()
      })
      document.body.appendChild(panel)

      let candidate = null
      let frame = 0
      let heartbeat = 0
      let dwellTimer = 0
      let disposed = false
      let emptyEditor = null
      let placeholderValue
      let placeholderActive = false
      let focusAt = 0
      let lastShownKey = null
      let lastAnnouncement = ''
      let stats = readPromptPilotStats()
      let panelVisible = false
      let panelKey = null
      let panelLabelKey = ''
      let aiPendingKey = null
      let aiRequestController = null
      let aiRequestTimer = 0
      const aiCache = new Map()
      const aiFailures = new Map()
      const AI_FAILURE_TTL = 60 * 1000
      const label = function (key, fallback) {
        try {
          const value = t(key)
          return value && value !== key ? value : fallback
        } catch {
          return fallback
        }
      }
      const hintFor = function (labelKey) {
        return labelKey === 'ghost.local.ready' || labelKey === 'ghost.ai.fallback'
          ? label('ghost.local.hint', '本地生成，不发起模型调用')
          : label('ghost.ai.hint', 'AI 只为这个上下文调用一次')
      }
      const trimAiCache = function () {
        while (aiCache.size > AI_CACHE_MAX) {
          let oldestKey = null
          let oldestAt = Infinity
          for (const [key, value] of aiCache) {
            if (value.at < oldestAt) {
              oldestAt = value.at
              oldestKey = key
            }
          }
          if (oldestKey === null) break
          aiCache.delete(oldestKey)
        }
      }
      const hidePanel = function () {
        panelVisible = false
        panelKey = null
        panelLabelKey = ''
        panel.style.display = 'none'
        panelTitle.textContent = ''
        panelBody.textContent = ''
        panelFoot.textContent = ''
      }
      const positionPanel = function (editor) {
        if (!panelVisible || !editor) return
        const margin = 8
        const width = Math.max(220, Math.min(620, window.innerWidth - margin * 2))
        panel.style.width = width + 'px'
        const box = editor.getBoundingClientRect()
        const height = panel.offsetHeight
        let top = box.top - height - 10
        if (top < margin) top = box.bottom + 10
        if (top + height > window.innerHeight - margin) top = Math.max(margin, window.innerHeight - height - margin)
        const left = Math.max(margin, Math.min(box.left, window.innerWidth - width - margin))
        panel.style.left = left + 'px'
        panel.style.top = top + 'px'
      }
      const refreshPanel = function (editor, text, labelKey, meta) {
        if (!panelVisible || !text) return
        panelTitle.textContent = label(labelKey, labelKey === 'ghost.ai.ready' ? 'AI 提示词建议' : '提示词建议')
        panelHint.textContent = hintFor(labelKey)
        panelBody.textContent = text
        panelLabelKey = labelKey
        if (candidate) {
          candidate.full = text
          candidate.tail = text
          candidate.ai = Boolean(meta && meta.ai)
        }
        positionPanel(editor)
        announce(text)
      }
      const showPanel = function (editor, text, opts) {
        const options = opts || {}
        if (!panel.isConnected) document.body.appendChild(panel)
        if (!element.isConnected) document.body.appendChild(element)
        panelTitle.textContent = label(options.labelKey || 'ghost.local.ready', '提示词建议')
        panelHint.textContent = hintFor(options.labelKey || 'ghost.local.ready')
        panelBody.textContent = text
        panelFoot.textContent = label('ghost.footer', 'Tab 接受 · Esc 收起')
        panel.style.display = 'flex'
        panelVisible = true
        panelKey = options.key == null ? null : String(options.key)
        panelLabelKey = options.labelKey || 'ghost.local.ready'
        positionPanel(editor)
        element.style.display = 'none'
        element.textContent = ''
        candidate = {
          full: text,
          tail: text,
          contextual: true,
          kind: options.kind || 'next-step',
          key: options.key == null ? null : String(options.key),
          ai: Boolean(options.ai),
        }
        announce(text)
      }
      const markFallback = function (suggestion) {
        if (!panelVisible || panelLabelKey !== 'ghost.ai.pending') return
        if (suggestion && panelKey !== String(suggestion.key)) return
        panelTitle.textContent = label('ghost.ai.fallback', '提示词建议（本地）')
        panelHint.textContent = hintFor('ghost.ai.fallback')
        panelLabelKey = 'ghost.ai.fallback'
      }
      const requestAi = function (editor, suggestion, context) {
        const current = store.get()
        if (current.aiPrompt === false || !suggestion || !suggestion.full) return
        const key = aiContextKey(context, getLocale(), suggestion.full)
        const cached = aiCache.get(key)
        if (cached && Date.now() - cached.at < AI_CACHE_TTL) {
          refreshPanel(editor, cached.prompt, 'ghost.ai.ready', { ai: true })
          return
        }
        const failedAt = aiFailures.get(key)
        if (failedAt && Date.now() - failedAt < AI_FAILURE_TTL) {
          markFallback(suggestion)
          return
        }
        if (aiPendingKey === key) return
        if (aiRequestController) aiRequestController.abort()
        const controller = typeof AbortController === 'function' ? new AbortController() : null
        aiRequestController = controller
        aiPendingKey = key
        const recordFailure = function () {
          aiFailures.set(key, Date.now())
          while (aiFailures.size > AI_CACHE_MAX) {
            let oldestKey = null
            let oldestAt = Infinity
            for (const [entryKey, at] of aiFailures) {
              if (at < oldestAt) {
                oldestAt = at
                oldestKey = entryKey
              }
            }
            if (oldestKey === null) break
            aiFailures.delete(oldestKey)
          }
        }
        if (aiRequestTimer) window.clearTimeout(aiRequestTimer)
        aiRequestTimer = window.setTimeout(function () {
          if (controller) controller.abort()
        }, 20000)
        requestAiPrompt(
          context,
          getLocale(),
          suggestion.full,
          controller ? controller.signal : undefined,
          props.sessionId || runtime.sessionId,
        )
          .then(function (prompt) {
            if (!prompt) {
              recordFailure()
              if (disposed || !panelVisible || panelKey !== String(suggestion.key)) return
              markFallback(suggestion)
              return
            }
            aiFailures.delete(key)
            aiCache.set(key, { prompt: prompt, at: Date.now() })
            trimAiCache()
            if (disposed || !panelVisible || panelKey !== String(suggestion.key)) return
            if (editor !== composerEditor() || document.activeElement !== editor) return
            if (String(editor.textContent || '').trim() !== '') return
            refreshPanel(editor, prompt, 'ghost.ai.ready', { ai: true })
          })
          .catch(function () {
            recordFailure()
            if (disposed || !panelVisible || panelKey !== String(suggestion.key)) return
            markFallback(suggestion)
          })
          .finally(function () {
            if (aiRequestTimer) {
              window.clearTimeout(aiRequestTimer)
              aiRequestTimer = 0
            }
            if (aiRequestController === controller) aiRequestController = null
            if (aiPendingKey === key) aiPendingKey = null
          })
      }

      const restorePlaceholder = function () {
        if (!placeholderActive) return
        const editor = emptyEditor
        const value = placeholderValue
        placeholderActive = false
        emptyEditor = null
        placeholderValue = undefined
        if (!editor) return
        try {
          editor.classList.remove('ccm-ghost-placeholder')
          // Only undo the attribute value this entry blanked; a Host re-render
          // may already have installed a newer placeholder string.
          if (value !== undefined && editor.getAttribute('data-placeholder') === '') {
            if (value === null) editor.removeAttribute('data-placeholder')
            else editor.setAttribute('data-placeholder', value)
          }
        } catch {
          /* the Host replaced its editor */
        }
      }

      const hide = function () {
        candidate = null
        element.style.display = 'none'
        element.textContent = ''
        live.textContent = ''
        lastAnnouncement = ''
        hidePanel()
        restorePlaceholder()
      }

      const hidePlaceholder = function (editor) {
        if (placeholderActive) {
          try {
            if (editor.getAttribute('data-placeholder') !== '') editor.setAttribute('data-placeholder', '')
          } catch {
            /* ignore */
          }
          return
        }
        try {
          placeholderValue = editor.getAttribute('data-placeholder')
          emptyEditor = editor
          placeholderActive = true
          editor.classList.add('ccm-ghost-placeholder')
          if (placeholderValue !== null) editor.setAttribute('data-placeholder', '')
        } catch {
          /* ignore */
        }
      }

      const announce = function (text) {
        if (!text) return
        const prefix = String(getLocale() || '').toLowerCase().indexOf('zh') === 0 ? '输入建议：' : 'Suggestion: '
        const message = prefix + text
        if (message === lastAnnouncement) return
        lastAnnouncement = message
        live.textContent = message
      }

      const showGhost = function (editor, displayText, fullText, rect, contextual, kind, key) {
        hidePanel()
        const style = getComputedStyle(editor)
        const lineHeight = parseFloat(style.lineHeight) || rect.height || 20
        const editorBox = editor.getBoundingClientRect()
        element.textContent = displayText
        element.style.display = 'inline-block'
        element.style.left = rect.left + 'px'
        element.style.top = (rect.top + Math.max(0, (rect.height - lineHeight) / 2)) + 'px'
        element.style.height = lineHeight + 'px'
        element.style.lineHeight = lineHeight + 'px'
        element.style.maxWidth = Math.max(80, editorBox.right - rect.left - 8) + 'px'
        element.style.font = style.font
        element.style.letterSpacing = style.letterSpacing
        candidate = {
          full: fullText,
          tail: displayText,
          contextual: Boolean(contextual),
          kind: kind || 'prefix',
          key: key == null ? null : String(key),
        }
        if (contextual) announce(fullText)
      }

      const accept = function () {
        if (!candidate) return
        const accepted = candidate
        if (accepted.contextual && accepted.kind) {
          stats = recordPilotEvent(stats, accepted.kind, 'accepted', Date.now(), accepted.key || '')
          savePromptPilotStats(stats)
        }
        hide()
        try {
          if (typeof runtime.fillDraft === 'function') {
            runtime.fillDraft(accepted.full)
          } else if (props.inputActions && typeof props.inputActions.setDraft === 'function') {
            props.inputActions.setDraft(accepted.full)
          }
        } catch {
          /* the Host refused this programmatic write */
        }
      }

      const dismiss = function () {
        if (!candidate) return
        const dismissed = candidate
        if (dismissed.contextual && dismissed.kind) {
          stats = recordPilotEvent(stats, dismissed.kind, 'dismissed', Date.now(), dismissed.key || '')
          savePromptPilotStats(stats)
        }
        hide()
      }

      const update = function () {
        frame = 0
        if (disposed) return
        try {
          const current = store.get()
          if (!current.enabled || current.ghost === false) return hide()
          const editor = composerEditor()
          const active = document.activeElement
          if (!editor || !(active === editor || (active && editor.contains(active)))) {
            focusAt = 0
            return hide()
          }
          if (!focusAt) focusAt = Date.now()
          const palette = document.querySelector('.ccm-palette')
          if (isElementVisible(palette)) return hide()
          if (hostMenuOpen()) return hide()
          const hostModal = Array.from(document.querySelectorAll('[role="dialog"][aria-modal="true"]')).find(function (node) {
            return !node.classList.contains('ccm-palette') && !node.classList.contains('ccm-shortcuts') && isElementVisible(node)
          })
          if (hostModal) return hide()
          const draftText = String(editor.textContent || '')
          const legacy = chatRef.current && chatRef.current.legacy
          const nodes = legacy && Array.isArray(legacy.nodes) ? legacy.nodes : []
          const prompts = collectPromptHistory(nodes, 50)
          if (!draftText.trim()) {
            if (current.ghostContext === false) return hide()
            if (runtime.running) return hide()
            // Give the composer a short focus dwell before replacing its
            // placeholder, so a passing click does not flash a suggestion.
            const dwell = Date.now() - focusAt
            if (dwell < 350) {
              hide()
              scheduleDwell(350 - dwell)
              return
            }
            const context = promptContextFromChat(chatRef.current)
            const sessionTitle = sessionTitleFromDocument()
            const promptInput = {
              assistantText: context.assistantText,
              toolText: context.toolText,
              assistantFresh: context.assistantFresh,
              toolFresh: context.toolFresh,
              lastUserPrompt: context.lastUserPrompt,
              sessionTitle: sessionTitle,
              sessionId: props.sessionId,
              running: runtime.running,
              locale: getLocale(),
              stats: stats,
            }
            const suggestion = buildPromptDraft(promptInput)
            if (!suggestion || !suggestion.full) return hide()
            if (suggestionSuppressed(stats, suggestion.key)) return hide()
            const aiKey = aiContextKey(
              Object.assign({}, context, { sessionTitle: sessionTitle }),
              getLocale(),
              suggestion.full,
            )
            const cached = current.aiPrompt === false ? null : aiCache.get(aiKey)
            const cachedPrompt = cached && Date.now() - cached.at < AI_CACHE_TTL ? cached.prompt : ''
            if (panelVisible && panelKey === String(suggestion.key)) {
              if (!panel.isConnected) document.body.appendChild(panel)
              if (!element.isConnected) document.body.appendChild(element)
              positionPanel(editor)
              return
            }
            hidePlaceholder(editor)
            showPanel(editor, cachedPrompt || suggestion.full, {
              key: suggestion.key,
              kind: suggestion.kind,
              labelKey: cachedPrompt ? 'ghost.ai.ready' : current.aiPrompt === false ? 'ghost.local.ready' : 'ghost.ai.pending',
              ai: Boolean(cachedPrompt),
            })
            if (!cachedPrompt && current.aiPrompt !== false) {
              requestAi(editor, suggestion, Object.assign({}, context, { sessionTitle: sessionTitle }))
            }
            if (lastShownKey !== String(suggestion.key)) {
              lastShownKey = String(suggestion.key)
              stats = recordPilotEvent(stats, suggestion.kind, 'shown', Date.now(), lastShownKey)
              savePromptPilotStats(stats)
            }
            return
          }
          restorePlaceholder()
          const match = suggestPromptCompletion(draftText, prompts.length > 0 ? prompts : runtime.promptHistory, getLocale())
          if (!match || !match.tail) return hide()
          const caret = caretAtComposerEnd(editor)
          if (!caret) return hide()
          showGhost(editor, match.tail, match.full, caret, false, 'prefix', null)
        } catch (error) {
          // A malformed Chat snapshot or a Host re-render must never leave the
          // suggestion pipeline permanently stuck. Hide and try again on the
          // next heartbeat.
          hide()
          if (typeof console !== 'undefined' && console.warn) {
            console.warn('[dsh-claude-mode] prompt suggestion update failed', error)
          }
        }
      }

      const schedule = function () {
        if (disposed || frame) return
        frame = window.requestAnimationFrame(update)
      }
      const scheduleDwell = function (delay) {
        if (disposed || dwellTimer) return
        dwellTimer = window.setTimeout(function () {
          dwellTimer = 0
          schedule()
        }, Math.max(0, delay))
      }
      const clearDwell = function () {
        if (!dwellTimer) return
        window.clearTimeout(dwellTimer)
        dwellTimer = 0
      }
      refreshRef.current = schedule

      const onFocusIn = function (event) {
        const editor = composerEditor()
        if (editor && (event.target === editor || (event.target && editor.contains(event.target)))) {
          focusAt = Date.now()
        }
        schedule()
      }
      const onFocusOut = function (event) {
        const editor = composerEditor()
        if (!editor || event.target === editor) {
          focusAt = 0
          clearDwell()
        }
        schedule()
      }
      const onKeyDown = function (event) {
        if (disposed || !candidate) return
        if (event.defaultPrevented || event.isComposing) return
        if (!store.get().enabled || store.get().ghost === false) return
        if (event.key === 'Escape') {
          if (!candidate.contextual || runtime.running) return
          if (hostMenuOpen()) return
          event.preventDefault()
          event.stopPropagation()
          dismiss()
          return
        }
        if (event.key !== 'Tab' || event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return
        if (hostMenuOpen()) return
        event.preventDefault()
        event.stopPropagation()
        accept()
      }

      document.addEventListener('input', schedule, true)
      document.addEventListener('focusin', onFocusIn, true)
      document.addEventListener('focusout', onFocusOut, true)
      document.addEventListener('selectionchange', schedule, true)
      document.addEventListener('pointerdown', schedule, true)
      document.addEventListener('keyup', schedule, true)
      document.addEventListener('visibilitychange', schedule, true)
      window.addEventListener('focus', schedule)
      window.addEventListener('scroll', schedule, true)
      window.addEventListener('resize', schedule)
      window.addEventListener('keydown', onKeyDown, true)
      // Host menus, palettes, and React re-renders can swallow the one event
      // that would have reopened the card. A cheap heartbeat keeps the empty
      // composer suggestion observable without depending on a specific Host
      // renderer event order.
      heartbeat = window.setInterval(schedule, 350)
      schedule()

      return function () {
        disposed = true
        if (refreshRef.current === schedule) refreshRef.current = null
        clearDwell()
        if (heartbeat) {
          window.clearInterval(heartbeat)
          heartbeat = 0
        }
        if (aiRequestTimer) {
          window.clearTimeout(aiRequestTimer)
          aiRequestTimer = 0
        }
        if (aiRequestController) {
          aiRequestController.abort()
          aiRequestController = null
        }
        window.cancelAnimationFrame(frame)
        document.removeEventListener('input', schedule, true)
        document.removeEventListener('focusin', onFocusIn, true)
        document.removeEventListener('focusout', onFocusOut, true)
        document.removeEventListener('selectionchange', schedule, true)
        document.removeEventListener('pointerdown', schedule, true)
        document.removeEventListener('keyup', schedule, true)
        document.removeEventListener('visibilitychange', schedule, true)
        window.removeEventListener('focus', schedule)
        window.removeEventListener('scroll', schedule, true)
        window.removeEventListener('resize', schedule)
        window.removeEventListener('keydown', onKeyDown, true)
        hide()
        element.remove()
        live.remove()
        panel.remove()
      }
    }, [settings.enabled, settings.ghost, settings.ghostContext, settings.aiPrompt, props.inputActions])

    return null
  }
}
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
function startNewSession(ctx) {
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
function selectChatActivity(chat) {
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
function createRunBar(ctx, store, t, getLocale) {
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
function createHeaderButton(ctx, store, t) {
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
/* Sidebar pinned-chat shortcut                                            */
/* ---------------------------------------------------------------------- */

/** Pin glyph for the sidebar footer shortcut. */
function PinIcon() {
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
    React.createElement('path', { key: 'p', d: 'M9.1 2.1a3.4 3.4 0 0 0-3.4 3.4c0 1.2.6 2.3 1.5 3v3.2L9.1 14l1.9-2.3V8.5a3.6 3.6 0 0 0 1.5-3A3.4 3.4 0 0 0 9.1 2.1Z' }),
    React.createElement('path', { key: 'l', d: 'M9.1 8.5v2.2' }),
  ])
}

/** Sidebar footer button that opens the palette at its pinned-chat section. */
function createPinnedButton(ctx, store, t) {
  return function PinnedButton() {
    const settings = useSettings(store)
    if (!settings.enabled) return null
    const label = t('action.pinned.label')
    return React.createElement('button', {
      type: 'button',
      className: 'ccm-iconbtn ccm-pinned-btn',
      title: label,
      'aria-label': label,
      'data-claude-mode': '',
      onClick: openPalette,
    }, React.createElement(PinIcon))
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
function createReadAloud(ctx, store, t, getLocale) {
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
function createTurnFooter(ctx, store, t, getLocale) {
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
function createPalette(ctx, store, t, buildActions) {
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
    const pinnedItems = React.useMemo(function () {
      if (!open) return []
      try {
        const workspaces = ctx.get('workspaces')
        const sessions = ctx.get('sessions')
        if (!workspaces || !workspaces.list || typeof workspaces.list.getSnapshot !== 'function') return []
        if (!sessions || !sessions.list || typeof sessions.list.getSnapshot !== 'function') return []
        return mapPinnedSessions(
          workspaces.list.getSnapshot(),
          sessions.list.getSnapshot(),
          8,
        ).map(function (row) {
          return {
            id: 'pinned:' + row.sessionId,
            section: 'pinned',
            title: shortenText(row.title, 64),
            detail: row.workspaceTitle || t('palette.section.pinned'),
            keywords: row.title + ' 置顶 pinned',
            run: function () {
              openSessionById(ctx, row.sessionId)
            },
          }
        })
      } catch {
        return []
      }
    }, [open, t, historyVersion])
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
      const visiblePinned = query.trim() ? rankItems(pinnedItems, query) : pinnedItems
      if (!query.trim()) return visiblePinned.concat(ranked)
      return visiblePinned.concat(ranked).concat(searchItems)
    }, [allItems, query, searchItems, pinnedItems])
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
function rankItems(items, query) {
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
function fuzzyScore(haystack, needle) {
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
function groupItems(items) {
  const order = ['pinned', 'appearance', 'behavior', 'session', 'search', 'history']
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
function shortcutGroups(t) {
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
        { keys: ['Tab'], label: label('shortcuts.ghost') },
        { keys: ['Esc'], label: label('shortcuts.ghostDismiss') },
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
function createShortcuts(ctx, store, t) {
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
function createPanelMenu(ctx, store, t) {
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

/**
 * Local data audit and migration-script panel.
 *
 * The Host endpoint is read-only. The panel only downloads a script; it never
 * moves a live directory itself because DSH must be stopped for that step.
 */
function DataStorageSection(props) {
  const t = props.t
  const [audit, setAudit] = React.useState(null)
  const [status, setStatus] = React.useState('loading')
  const [error, setError] = React.useState('')
  const [target, setTarget] = React.useState('E:\\DeepSeek-Harness-Data')
  const [plan, setPlan] = React.useState(null)
  const [planStatus, setPlanStatus] = React.useState('idle')
  const [planError, setPlanError] = React.useState('')
  const [cleanupDays, setCleanupDays] = React.useState(7)
  const [cleanup, setCleanup] = React.useState(null)
  const [cleanupStatus, setCleanupStatus] = React.useState('idle')
  const [cleanupError, setCleanupError] = React.useState('')

  const load = function (force) {
    setStatus('loading')
    setError('')
    requestDataAudit(force).then(function (payload) {
      setAudit(payload)
      setStatus('ready')
    }).catch(function (failure) {
      setError(String(failure && failure.message ? failure.message : failure))
      setStatus('error')
    })
  }

  React.useEffect(function () {
    load(false)
  }, [])

  const makePlan = function () {
    setPlanStatus('loading')
    setPlanError('')
    requestDataPlan(target).then(function (payload) {
      setPlan(payload)
      setPlanStatus('ready')
    }).catch(function (failure) {
      setPlanError(String(failure && failure.message ? failure.message : failure))
      setPlanStatus('error')
    })
  }

  const makeCleanup = function () {
    setCleanupStatus('loading')
    setCleanupError('')
    requestDataCleanup(cleanupDays).then(function (payload) {
      setCleanup(payload)
      setCleanupStatus('ready')
    }).catch(function (failure) {
      setCleanupError(String(failure && failure.message ? failure.message : failure))
      setCleanupStatus('error')
    })
  }

  const sizeLabel = function (entry) {
    const value = entry && entry.bytesLabel ? entry.bytesLabel : '—'
    return entry && entry.approx ? '≥ ' + value : value
  }

  const categoryLabel = function (entry) {
    const key = entry && entry.systemTemp
      ? 'settings.data.cat.system-temp'
      : 'settings.data.cat.' + String(entry && entry.id || '')
    try {
      const translated = t(key)
      if (translated && translated !== key) return translated
    } catch {
      /* ignore */
    }
    return String(entry && entry.label || entry && entry.id || '')
  }

  const categoryStatus = function (entry) {
    if (!entry || !entry.exists) return { key: 'missing', label: t('settings.data.missing') }
    if (entry.managed) return { key: 'managed', label: t('settings.data.managed') }
    if (String(entry.drive || '').toUpperCase() === 'C:') return { key: 'direct', label: t('settings.data.direct') }
    return { key: 'other', label: t('settings.data.otherDrive') }
  }

  const children = []
  const categories = []
  if (audit) {
    if (audit.home) {
      const homeStatus = categoryStatus(audit.home)
      children.push(React.createElement('div', { key: 'home', className: 'ccm-data-home' }, [
        React.createElement('div', { key: 'head', className: 'ccm-data-home-head' }, [
          React.createElement('span', { key: 't', className: 'ccm-data-row-title' }, t('settings.data.home')),
          React.createElement('span', { key: 's', className: 'ccm-data-badge is-' + homeStatus.key }, homeStatus.label),
          React.createElement('span', { key: 'size', className: 'ccm-data-size' }, sizeLabel(audit.home)),
        ]),
        React.createElement('div', { key: 'paths', className: 'ccm-data-paths' }, [
          React.createElement('code', { key: 'p', className: 'ccm-data-path' }, audit.home.path),
          React.createElement('span', { key: 'arrow', className: 'ccm-data-arrow', 'aria-hidden': 'true' }, '→'),
          React.createElement('code', { key: 'm', className: 'ccm-data-path' }, audit.home.physical),
        ]),
      ]))
    }
    if (Array.isArray(audit.drives)) {
      children.push(React.createElement('div', { key: 'drives', className: 'ccm-data-drives' }, audit.drives.map(function (drive) {
        return React.createElement('span', { key: drive.drive, className: 'ccm-data-drive' },
          drive.drive + '  ' + format(t('settings.data.free'), { free: drive.freeLabel, total: drive.totalLabel }))
      })))
    }
    children.push(React.createElement('div', { key: 'summary', className: 'ccm-data-plan-summary' },
      format(t('settings.data.summary'), {
        managed: audit.managedLabel || '—',
        unmanaged: audit.unmanagedLabel || '—',
      })))
    children.push(React.createElement('div', { key: 'approx-hint', className: 'ccm-settings-row-hint' }, t('settings.data.approxHint')))
    if (Array.isArray(audit.categories)) {
      categories.push(React.createElement('div', { key: 'cat-head', className: 'ccm-data-subhead' }, t('settings.data.locations')))
      for (const entry of audit.categories) {
        const state = categoryStatus(entry)
        categories.push(React.createElement('div', { key: entry.id, className: 'ccm-data-row' }, [
          React.createElement('div', { key: 'm', className: 'ccm-data-row-main' }, [
            React.createElement('div', { key: 'title', className: 'ccm-data-row-title' }, categoryLabel(entry)),
            React.createElement('code', { key: 'path', className: 'ccm-data-path', title: entry.path }, entry.path),
          ]),
          React.createElement('div', { key: 'right', className: 'ccm-data-row-right' }, [
            React.createElement('span', { key: 'size', className: 'ccm-data-size' }, sizeLabel(entry)),
            React.createElement('span', { key: 'state', className: 'ccm-data-badge is-' + state.key }, state.label),
          ]),
        ]))
      }
    }
    if (Array.isArray(audit.children) && audit.children.length) {
      categories.push(React.createElement('div', { key: 'children-head', className: 'ccm-data-subhead' }, t('settings.data.children')))
      categories.push(React.createElement('div', { key: 'children', className: 'ccm-data-chips' }, audit.children.map(function (child) {
        return React.createElement('span', { key: child.id, className: 'ccm-data-chip' }, [
          React.createElement('span', { key: 'n' }, categoryLabel(child)),
          React.createElement('span', { key: 'v', className: 'ccm-data-chip-value' }, sizeLabel(child)),
        ])
      })))
    }
  }

  const planNode = []
  if (plan) {
    planNode.push(React.createElement('div', { key: 'summary', className: 'ccm-data-plan-summary' },
      format(t('settings.data.generated'), { count: plan.actions ? plan.actions.length : 0 })))
    if (Array.isArray(plan.actions)) {
      for (const action of plan.actions) {
        planNode.push(React.createElement('div', { key: 'a-' + action.id, className: 'ccm-data-plan-action' }, [
          React.createElement('span', { key: 'l', className: 'ccm-data-row-title' }, action.label || action.id),
          React.createElement('code', { key: 'p', className: 'ccm-data-path' }, action.source + ' → ' + action.target),
          React.createElement('span', { key: 's', className: 'ccm-data-size' }, sizeLabel(action)),
        ]))
      }
    }
    if (Array.isArray(plan.warnings) && plan.warnings.length) {
      planNode.push(React.createElement('div', { key: 'warn', className: 'ccm-data-note' }, [
        React.createElement('strong', { key: 't' }, t('settings.data.warnings') + '：'),
        React.createElement('span', { key: 'b' }, plan.warnings.join(' ')),
      ]))
    }
    if (Array.isArray(plan.instructions) && plan.instructions.length) {
      planNode.push(React.createElement('ol', { key: 'steps', className: 'ccm-data-steps' }, plan.instructions.map(function (step, index) {
        return React.createElement('li', { key: 's-' + index }, step)
      })))
    }
    if (plan.script) {
      planNode.push(React.createElement('button', {
        key: 'download',
        type: 'button',
        className: 'ccm-btn ccm-btn-quiet',
        onClick: function () { downloadTextFile('dsh-data-migration.ps1', plan.script) },
      }, t('settings.data.download')))
    }
  }

  const cleanupNode = []
  if (cleanup) {
    cleanupNode.push(React.createElement('div', { key: 'summary', className: 'ccm-data-plan-summary' },
      format(t('settings.data.cleanupSummary'), { days: cleanup.olderThanDays })))
    if (Array.isArray(cleanup.warnings) && cleanup.warnings.length) {
      cleanupNode.push(React.createElement('div', { key: 'warn', className: 'ccm-data-note' }, [
        React.createElement('strong', { key: 't' }, t('settings.data.warnings') + '：'),
        React.createElement('span', { key: 'b' }, cleanup.warnings.join(' ')),
      ]))
    }
    if (cleanup.script) {
      cleanupNode.push(React.createElement('button', {
        key: 'download',
        type: 'button',
        className: 'ccm-btn ccm-btn-quiet',
        onClick: function () { downloadTextFile('dsh-temp-cleanup.ps1', cleanup.script) },
      }, t('settings.data.downloadCleanup')))
    }
  }
  const canClean = Boolean(audit && Array.isArray(audit.categories)
    && audit.categories.some(function (entry) { return entry && entry.cleanable && entry.exists }))

  return React.createElement('div', { key: 'data-storage', className: 'ccm-settings-group ccm-data' }, [
    React.createElement('div', { key: 'head', className: 'ccm-data-head' }, [
      React.createElement('div', { key: 'm', className: 'ccm-data-head-main' }, [
        React.createElement('div', { key: 't', className: 'ccm-settings-row-title' }, t('settings.data.title')),
        React.createElement('div', { key: 'h', className: 'ccm-settings-row-hint' }, t('settings.data.hint')),
      ]),
      React.createElement('button', {
        key: 'refresh',
        type: 'button',
        className: 'ccm-btn ccm-btn-quiet',
        disabled: status === 'loading',
        onClick: function () { load(true) },
      }, t('settings.data.refresh')),
    ]),
    React.createElement('div', { key: 'state', className: 'ccm-data-state', role: 'status', 'aria-live': 'polite' },
      status === 'loading' ? t('settings.data.scanning') : status === 'error' ? t('settings.data.failed') + '：' + error : ''),
    children,
    categories,
    React.createElement('div', { key: 'target', className: 'ccm-data-target' }, [
      React.createElement('label', { key: 'l', className: 'ccm-data-target-label', htmlFor: 'ccm-data-target-input' }, t('settings.data.target')),
      React.createElement('input', {
        key: 'i',
        id: 'ccm-data-target-input',
        className: 'ccm-data-input',
        value: target,
        spellCheck: 'false',
        onChange: function (event) { setTarget(event.target.value) },
      }),
      React.createElement('div', { key: 'hint', className: 'ccm-settings-row-hint' }, t('settings.data.targetHint')),
    ]),
    React.createElement('div', { key: 'actions', className: 'ccm-data-actions' }, [
      React.createElement('button', {
        key: 'plan',
        type: 'button',
        className: 'ccm-btn',
        disabled: planStatus === 'loading' || !audit,
        onClick: makePlan,
      }, planStatus === 'loading' ? t('settings.data.planning') : t('settings.data.plan')),
    ]),
    planError ? React.createElement('div', { key: 'plan-error', className: 'ccm-data-note' }, t('settings.data.planFailed') + '：' + planError) : null,
    planNode,
    canClean ? React.createElement('div', { key: 'cleanup', className: 'ccm-data-cleanup' }, [
      React.createElement('div', { key: 'h', className: 'ccm-data-target-label' }, t('settings.data.cleanupHint')),
      React.createElement('div', { key: 'controls', className: 'ccm-data-actions' }, [
        React.createElement('label', { key: 'l', className: 'ccm-data-target-label', htmlFor: 'ccm-data-cleanup-days' }, t('settings.data.cleanupDays')),
        React.createElement('input', {
          key: 'd',
          id: 'ccm-data-cleanup-days',
          className: 'ccm-data-days',
          type: 'number',
          min: 1,
          max: 365,
          value: cleanupDays,
          onChange: function (event) { setCleanupDays(Number(event.target.value) || 7) },
        }),
        React.createElement('button', {
          key: 'make',
          type: 'button',
          className: 'ccm-btn ccm-btn-quiet',
          disabled: cleanupStatus === 'loading',
          onClick: makeCleanup,
        }, cleanupStatus === 'loading' ? t('settings.data.cleaning') : t('settings.data.cleanup')),
      ]),
      cleanupError ? React.createElement('div', { key: 'error', className: 'ccm-data-note' }, t('settings.data.cleanupFailed') + '：' + cleanupError) : null,
      cleanupNode,
    ]) : null,
  ])
}

/** Build the Settings page component (registered into `settings.section`). */
function createSettingsSection(ctx, store, t) {
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
        row('ghost', t('settings.ghost.title'), t('settings.ghost.hint'),
          toggle('ghost-switch', settings.ghost, function (next) { store.set({ ghost: next }) }, t('settings.ghost.title'))),
        row('ghost-context', t('settings.ghostContext.title'), t('settings.ghostContext.hint'),
          toggle('ghost-context-switch', settings.ghostContext, function (next) { store.set({ ghostContext: next }) }, t('settings.ghostContext.title'))),
        row('ai-prompt', t('settings.aiPrompt.title'), t('settings.aiPrompt.hint'),
          toggle('ai-prompt-switch', settings.aiPrompt, function (next) { store.set({ aiPrompt: next }) }, t('settings.aiPrompt.title'))),
      ]),
      React.createElement(DataStorageSection, { key: 'data-storage', t: t }),
      React.createElement('div', { key: 'shortcuts', className: 'ccm-settings-group' }, [
        row('sc-palette', t('settings.shortcut.palette'), t('settings.shortcut.hint'),
          React.createElement('span', { className: 'ccm-kv' }, React.createElement(Kbd, null, '⌃K'))),
        row('sc-new', t('settings.shortcut.newSession'), null,
          React.createElement('span', { className: 'ccm-kv' }, React.createElement(Kbd, null, '⌥N'))),
        row('sc-ghost', t('shortcuts.ghost'), null,
          React.createElement('span', { className: 'ccm-kv' }, React.createElement(Kbd, null, 'Tab'))),
        row('sc-ghost-dismiss', t('shortcuts.ghostDismiss'), null,
          React.createElement('span', { className: 'ccm-kv' }, React.createElement(Kbd, null, 'Esc'))),
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
function SettingsIcon() {
  return React.createElement(Glyph, { size: 16 })
}

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
function applyClaudeMode(ctx) {
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
      id: 'ghost',
      section: 'behavior',
      title: settings.ghost ? tr('action.ghost.on') : tr('action.ghost.off'),
      detail: tr('action.ghost.detail'),
      keywords: 'ghost completion suggest autocomplete tab 提示词 补全 自动完成 Tab',
      state: settings.ghost ? tr('palette.toggle.on') : tr('palette.toggle.off'),
      run: function () {
        store.set({ ghost: !store.get().ghost })
      },
    })
    actions.push({
      id: 'ghost-context',
      section: 'behavior',
      title: settings.ghostContext ? tr('action.ghostContext.on') : tr('action.ghostContext.off'),
      detail: tr('action.ghostContext.detail'),
      keywords: 'context next prompt empty composer suggestion 上下文 推荐 下一句 空输入框',
      state: settings.ghostContext ? tr('palette.toggle.on') : tr('palette.toggle.off'),
      run: function () {
        store.set({ ghostContext: !store.get().ghostContext })
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
  const PinnedButton = createPinnedButton(ctx, store, t)
  const GhostSuggestion = createGhostSuggestion(ctx, store, t, getLocale)
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

  registerSlot('conversation.input.overlay', function () {
    return ctx.slots.register({
      name: 'conversation.input.overlay',
      id: 'claude-mode.ghost',
      order: 5,
      locale: NS,
    }, GhostSuggestion)
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

  /* Sidebar footer pin shortcut: opens the palette, whose first section lists
     the Host's registry-global pinned sessions. Older Hosts without the footer
     action slot skip this registration. */
  registerSlot('sidebar.footer.action', function () {
    return ctx.slots.register({
      name: 'sidebar.footer.action',
      id: 'claude-mode.pinned',
      order: 10,
      label: function () {
        return t('action.pinned.label')
      },
      locale: NS,
    }, PinnedButton)
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

    return {
      inject: ['slots', 'locale', 'sessions', 'theme'],
      apply(ctx) {
        try {
          return applyClaudeMode(ctx)
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('[dsh-claude-mode] apply failed', error)
          }
          throw error
        }
      },
    }
  },
})
