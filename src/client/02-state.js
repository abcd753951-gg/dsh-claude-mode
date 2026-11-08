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

/**
 * Starter prompts offered as light inline completions when the composer is
 * empty of history. They are intentionally plain, task-shaped prompts rather
 * than instructions aimed at a particular model.
 */
export const PROMPT_SUGGESTIONS_EN = Object.freeze([
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

export const PROMPT_SUGGESTIONS_ZH = Object.freeze([
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
export const EMPTY_COMPOSER_EN = Object.freeze([
  'summarize this project',
  'run the tests',
  'review recent changes',
  'check the project structure',
])

export const EMPTY_COMPOSER_ZH = Object.freeze([
  '梳理一下当前项目',
  '跑一遍测试',
  '看一下最近的改动',
  '检查一下项目结构',
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
  ghost: true,
  ghostContext: true,
  aiPrompt: true,
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

/** Hard input caps for the local prompt pilot; kept tiny so no session dump happens. */
export const PROMPT_PILOT_BUDGET = Object.freeze({
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
export function latestAssistantText(snapshot) {
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
export function latestToolResultText(snapshot) {
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
export function promptContextFromChat(snapshot) {
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

/**
 * Resolve the Host's global pinned-session ids into palette rows.
 *
 * DSH keeps pins registry-global, but its sidebar only leads each expanded
 * workspace with pinned rows. When a pinned Session lives in a collapsed
 * workspace it has no visible entry anywhere, so the palette needs its own
 * small pinned section built from the same workspace and Session snapshots.
 */
export function mapPinnedSessions(workspaceSnapshot, sessionSnapshot, limit = 8) {
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
 * Backward-compatible alias for the full prompt draft.
 *
 * The old short-ghost engine is intentionally gone: an empty composer now gets
 * a complete draft (the local fallback, or the seed for the optional AI pass),
 * so callers of the old name receive the same complete text.
 *
 * @param {object} input - conversation context accepted by buildPromptDraft.
 * @returns {object|null} complete prompt suggestion.
 */
export function suggestNextPrompt(input) {
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
export function buildPromptDraft(input) {
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
export function extractNextStep(text, chinese) {
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
export const PILOT_STATS_KEY = 'dsh.claude-mode.prompt-pilot.v1'

const PILOT_KINDS_MAX = 24
const PILOT_COUNT_MAX = 1000000

/** Normalize persisted prompt-pilot counts into a bounded, known shape. */
export function normalizePilotStats(input) {
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
export function pilotBoost(stats, kind) {
  const normalized = normalizePilotStats(stats)
  const item = normalized.kinds[String(kind)]
  if (!item || item.shown < 3) return 0
  const acceptance = item.accepted / item.shown
  const dismissal = item.dismissed / item.shown
  return Math.max(-0.04, Math.min(0.08, acceptance * 0.1 - dismissal * 0.05))
}

/** Update one aggregate counter without storing any prompt text. */
export function recordPilotEvent(stats, kind, event, at = Date.now(), key = '') {
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
export function suggestionSuppressed(stats, key, now = Date.now(), limits = {}) {
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
export function suggestPromptCompletion(draft, history, locale) {
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




