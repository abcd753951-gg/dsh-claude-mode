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
export const THEME_DARK = 'claude-mode-dark'
export const THEME_LIGHT = 'claude-mode-light'

/** Both ids, for membership checks. */
export const THEME_IDS = [THEME_DARK, THEME_LIGHT]

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
export const DARK_TOKENS = Object.freeze(build(DARK))

/** Complete light-theme token dictionary. */
export const LIGHT_TOKENS = Object.freeze(build(LIGHT))

/** Both concrete dictionaries keyed by theme id. */
export const THEME_TOKENS = Object.freeze({
  [THEME_DARK]: DARK_TOKENS,
  [THEME_LIGHT]: LIGHT_TOKENS,
})
