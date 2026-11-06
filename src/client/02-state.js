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
export const NS = 'claude-mode'

/** Copy for the two shipped built-in locales. Key sets are identical. */
export const DICTIONARIES = {
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
export function dictionaryFor(locale) {
  return isChineseLocale(locale) ? DICTIONARIES.zh : DICTIONARIES.en
}

/** Whether a locale id should read the Chinese copy/word pools. */
export function isChineseLocale(locale) {
  return String(locale || '').toLowerCase().startsWith('zh')
}

/** Resolve one template string with `{name}` placeholders. */
export function format(text, values) {
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
export const SPINNER_FRAMES = Object.freeze(['·', '✢', '✳', '✶', '✻', '✽'])

/** Frame shown when motion is disabled or the turn is idle. */
export const SPINNER_REST_FRAME = '✻'

/**
 * English spinner verbs: a whimsical, hands-on rotation. The brand pun
 * ("Clauding") is replaced by "Coding" so the plugin does not lean on
 * Anthropic's name.
 */
export const SPINNER_VERBS_EN = Object.freeze([
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
export const SPINNER_VERBS_ZH = Object.freeze([
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
export const COMPLETION_WORDS_EN = Object.freeze([
  'Baked', 'Brewed', 'Churned', 'Cogitated', 'Cooked', 'Crunched', 'Sautéed', 'Worked',
])

export const COMPLETION_WORDS_ZH = Object.freeze([
  '烘焙', '酿造', '搅拌', '推敲', '烹饪', '咀嚼', '煸炒', '打磨',
])

/** The verb/completion pools that match one locale id. */
export function wordPoolsFor(locale) {
  return isChineseLocale(locale)
    ? { verbs: SPINNER_VERBS_ZH, completions: COMPLETION_WORDS_ZH, chinese: true }
    : { verbs: SPINNER_VERBS_EN, completions: COMPLETION_WORDS_EN, chinese: false }
}

/** Stable 32-bit string hash (FNV-1a), used to pick one word per turn. */
export function hash32(value) {
  const text = String(value == null ? '' : value)
  let hash = 2166136261
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** Pick the turn's spinner verb from a stable seed (session + start time). */
export function pickSpinnerVerb(seed, locale) {
  const { verbs, chinese } = wordPoolsFor(locale)
  const verb = verbs[hash32(seed) % verbs.length]
  return chinese ? verb + '中' : verb
}

/** Pick the turn's completion word from a stable seed (turn start time/seq). */
export function completionWordFor(seed, locale) {
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
export function spinnerFrameIndex(elapsedMs) {
  const elapsed = Math.max(0, Number(elapsedMs) || 0)
  const phase = (1 - Math.cos((Math.PI * elapsed) / 1000)) / 2
  return Math.min(SPINNER_FRAMES.length - 1, Math.max(0, Math.round(phase * (SPINNER_FRAMES.length - 1))))
}

/** Glyph frame for one elapsed animation time. */
export function spinnerFrame(elapsedMs) {
  return SPINNER_FRAMES[spinnerFrameIndex(elapsedMs)]
}

/* ---------------------------------------------------------------------- */
/* Settings store                                                         */
/* ---------------------------------------------------------------------- */

/** localStorage key for durable plugin settings. */
export const SETTINGS_KEY = 'dsh.claude-mode.settings.v1'

/** localStorage key for the theme preference that preceded Claude mode. */
export const PREVIOUS_THEME_KEY = 'dsh.claude-mode.previous-theme.v1'

/** Default settings; also the reset target. */
export const DEFAULT_SETTINGS = Object.freeze({
  enabled: true,
  theme: 'auto',
  statusBar: true,
  turnFooter: true,
  animations: true,
  sound: false,
})

/** Clamp one stored settings object into the known shape. */
export function normalizeSettings(input) {
  const source = input && typeof input === 'object' ? input : {}
  const theme = source.theme === 'dark' || source.theme === 'light' ? source.theme : 'auto'
  return {
    enabled: source.enabled !== false,
    theme,
    statusBar: source.statusBar !== false,
    turnFooter: source.turnFooter !== false,
    animations: source.animations !== false,
    sound: source.sound === true,
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
export function loadSettings() {
  return normalizeSettings(readJson(SETTINGS_KEY))
}

/** Persist settings. */
export function saveSettings(settings) {
  writeJson(SETTINGS_KEY, normalizeSettings(settings))
}

/** Read the saved pre-install theme preference, if any. */
export function loadPreviousTheme() {
  const value = readJson(PREVIOUS_THEME_KEY)
  return typeof value === 'string' && value ? value : undefined
}

/** Persist the pre-install theme preference. */
export function savePreviousTheme(value) {
  writeJson(PREVIOUS_THEME_KEY, value || undefined)
}

/**
 * createSettingsStore — a minimal external store shared by every widget.
 * Components subscribe through React.useSyncExternalStore.
 */
export function createSettingsStore(initial) {
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
export const runtime = {
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
export function openShortcuts() {
  for (const listener of Array.from(shortcutsListeners)) {
    try {
      listener(true)
    } catch {
      /* ignore */
    }
  }
}

/** Subscribe to shortcut-sheet open requests. */
export function subscribeShortcuts(listener) {
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
export function openPalette() {
  for (const listener of Array.from(paletteListeners)) {
    try {
      listener(true)
    } catch {
      /* ignore */
    }
  }
}

/** Subscribe to palette open requests. */
export function subscribePalette(listener) {
  paletteListeners.add(listener)
  return () => {
    paletteListeners.delete(listener)
  }
}

/* ---------------------------------------------------------------------- */
/* Formatting helpers                                                     */
/* ---------------------------------------------------------------------- */

/** Human duration for the turn footer (short form). */
export function formatDuration(ms) {
  const total = Math.max(0, Math.round(Number(ms) || 0) / 1000)
  if (total < 60) return `${Math.max(1, Math.round(total))}s`
  const minutes = Math.floor(total / 60)
  const seconds = Math.round(total % 60)
  if (minutes < 60) return seconds === 0 ? `${minutes}m` : `${minutes}m ${seconds}s`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ${minutes % 60}m`
}

/** Human elapsed seconds for the run bar. */
export function formatElapsed(ms) {
  const seconds = Math.max(0, Math.floor((Number(ms) || 0) / 1000))
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

/** Join the text blocks of one ContentBlock list (images and other blocks skipped). */
export function textFromContent(content) {
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
export function speechTextFromBlocks(blocks) {
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
export function assistantTextForMessage(snapshot, messageId) {
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

/** Split prose into utterance-sized chunks at sentence or word boundaries. */
export function splitSpeechText(text, max = 1200) {
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
export function mapSessionSearchResults(items, limit = 8) {
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
export function playCompletionChime() {
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
export function collectPromptHistory(nodes, limit = 50) {
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
 * Step one prompt-history recall gesture.
 *
 * @param {{active: boolean, index: number, draft: string}} state - navigation state.
 * @param {number} direction - -1 for older (Up), 1 for newer (Down).
 * @param {string[]} prompts - newest-first prompt list.
 * @param {string} currentText - current composer text, captured when navigation starts.
 * @returns {{state: {active: boolean, index: number, draft: string}, text: string|null}}
 *   `text: null` means the composer should not be touched.
 */
export function stepPromptHistory(state, direction, prompts, currentText = '') {
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



