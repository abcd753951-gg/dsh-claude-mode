# 验收记录：dsh-claude-mode 0.5.0

- 验收时间：2026-11-07
- 目录：`F:\dsh插件创造\workspace\dsh-claude-mode`
- 结论：静态检查、31 项单元测试、0.2.2-rc.1 web 宿主的真实回合与交互矩阵均通过；聊天全文搜索需要宿主启用会话索引，未启用时插件安静降级。桌面窗口重新载入后加载 0.5.0。

## 1. 环境

| 项 | 值 |
| --- | --- |
| 桌面宿主 | DSH `0.2.2-rc.1`（Electron） |
| Web 验证宿主 | 同版本 `0.2.2-rc.1`，独立 profile + 临时端口 |
| 浏览器 | Playwright Chromium，1280×720 |
| 插件安装 | profile 的 `node_modules/dsh-claude-mode` 软链接到本目录；验证后移除 |
| 测试改动 | 临时 profile、端口与测试会话均已清理或归档 |

## 2. 命令级检查

```text
npm run build:client   → wrote client.js from 7 source files
npm run check          → node --check index.js + client.js + bundle freshness: pass
npm test               → tests 31 / pass 31 / fail 0
```

单测覆盖：

1. 两套主题包键集合对称、值非空；主题签名令牌与错误/成功色。
2. zh/en 字典键集合一致；locale 选择；模板插值。
3. 设置存储归一化（含 `sound` 字段）、通知去重、重置。
4. 时长/计时格式化；模糊评分、排序、分组（含「聊天记录」分组顺序）。
5. 187 个英文动词、78 个中文动词、8 个完成词去重与 locale 路由；稳定哈希。
6. 状态星 6 帧序列与 2 秒往返索引。
7. Chat 活动判定：`tool` / `tool-input` / `thinking` / `responding` / `waiting`。
8. 历史提示词提取与 `↑/↓` 导航状态机（草稿保存/恢复、边界、无历史）。
9. 快捷键表数据：三组、`↑↓ 历史`、`Alt+N 新建会话`、`Alt+B 侧边栏`。
10. 组件渲染（React stub）：
    - 运行状态条：动词、`Esc 中断`、工具时长、排队数、空闲提示、侧边栏按钮；
    - 回合页脚：完成词与用时、短回合/关闭时返回 null；
    - 插件图标管理：计数、逐项显示/隐藏、全部收起/展开、打开后面板关闭、总开关关闭时返回 null。
11. 0.5.0 纯函数：
    - `mapSessionSearchResults`：每会话一条、snippet 压平/截断、缺失字段丢弃；
    - `assistantTextForMessage`：从 turn-tail closing 的 messageId + blocks 取正文；
    - `splitSpeechText`：长文按句/词分块、每块不超上限、内容不丢；
    - `startNewSession`：服务存在时调用一次，缺失/抛错时返回 false。

## 3. 浏览器矩阵（0.2.2-rc.1 web 宿主）

| # | 用例 | 结果 |
| --- | --- | --- |
| 1 | 首次载入 | 0 plugin error；`ccm-runbar`、标题栏 `✻`、侧边栏面板图标正常 |
| 2 | 真实成功回合 | 新建空白会话→发送短提示→约 1 秒完成；运行条回到就绪；回合页脚显示完成词与用时 |
| 3 | 朗读按钮 | 已定稿助手消息操作条出现「朗读这条回复」；点击后切换为「停止朗读」、`aria-pressed=true`、`speechSynthesis.speaking=true`，短回复播完后自动回到未朗读状态 |
| 4 | 旧回合降级 | `closing=null` 的历史回合宿主不渲染操作条，插件也不显示朗读按钮，不伪造动作 |
| 5 | `Alt+N` | 会话视图直接进入空白 Hero；工作区选择器与模型选择器正常 |
| 6 | 聊天搜索请求 | 面板输入 ≥2 字符后发出 `POST /api/session/search`；索引构建期间底部显示「正在搜索聊天记录…」，12 秒超时收起 |
| 7 | 聊天搜索结果 | 以合成响应验证「聊天记录」分组、snippet、「打开会话」详情；回车/点击切换会话并关闭面板 |
| 8 | 搜索降级 | 服务未启用索引时结果为空、无报错；关闭面板或改查询会 abort 并忽略迟到响应 |
| 9 | 提示音开关 | 面板动作写入 `sound:true`；设置页出现「完成提示音」行与「试听」按钮，试听无异常 |
| 10 | 快捷键表 | 含 `⌥N 新建会话`；设置页快捷键组含 `⌘K`、`⌥N`、`Esc`；版本 `0.5.0` |
| 11 | 设置页 | 总开关、主题三档、状态条/页脚/动效/提示音、试听、恢复默认、关于完整 |
| 12 | 侧边栏折叠 | `«`、`Alt+B`、面板动作都能折叠/展开 |
| 13 | 插件图标折叠 | 「更多」菜单计数、全部收起/展开、逐项切换均生效 |
| 14 | 窄屏 | 375×812 下面板无横向溢出，运行条提示按 CSS 隐藏 |
| 15 | 全流程 console | 插件自身 0 error、0 warning |

截图：`docs/preview/{dark,light}-session.png`、`{dark,light}-palette.png`、`palette-history.png`、`palette-chat-search.png`、`shortcuts-{light,dark}.png`、`shortcuts-new.png`、`assistant-readaloud.png`、`settings-sound.png`、`sidebar-panels.png`、`sidebar-panels-collapsed.png`、`settings.png`、`mobile-{session,palette}.png`。

## 4. 槽位与宿主兼容

| 宿主 | 槽位/服务 | 结果 |
| --- | --- | --- |
| 0.2.2-rc.1 | `conversation.chat.turnTail` = list | 回合页脚注册成功 |
| 0.1.2-rc.1 | `conversation.chat.turnTail` = chain（要求 `select`） | 捕获 `requires options.select` 后带 `select` 重试成功 |
| 两者 | `conversation.input.dock` / `shell.overlay` / `settings.section` | 运行条 / 样式 / 面板 / 快捷键 / 设置均 active |
| 0.2.2 | `conversation.chat.assistant-actions`（list） | 朗读动作注册成功，按消息 id 取正文 |
| 0.2.2 | `sessions.search` | 服务存在、请求路径通；索引未启用时返回错误，插件清空结果并收起加载态 |
| 0.2.2 | `uiWorkspace.startSession` | `Alt+N` 与面板动作都能打开空白会话；服务缺席时返回 false 不抛错 |

## 5. 已知边界

1. 聊天全文搜索依赖宿主开启 `session-query-sqlite` 的索引；DSH 默认关闭，此时「聊天记录」分组不出现，Web 侧栏只匹配标题与工作区名。
2. 朗读依赖浏览器语音合成；无 `speechSynthesis` 的宿主隐藏按钮，音色/语速由 OS 与浏览器决定。headless 环境只验证状态机，无法验证实际音频。
3. 完成提示音默认关闭；WebAudio 被浏览器策略挂起时静默失败，不影响回合。headless 环境无法验证实际音色。
4. `Alt+N` 会先检查 `defaultPrevented` 与宿主模态框；若宿主占用同名键位，以宿主为准。
5. 旧导入会话没有 `closing` 信息时，宿主本身不显示复制/分支等操作条，朗读按钮同样不出现。
6. `↑` 历史与 `?` 依赖宿主可编辑输入框；若宿主更换编辑器实现，历史召回会静默失效，快捷键表仍可从面板打开。
7. 插件图标折叠依赖 0.2.x 的 `sidebar.panellist.actions`；旧宿主静默省略该分组。
8. 设置保存在 Web GUI origin；`dsh web` 端口变化会换 origin。

## 6. 复现

```bash
cd F:\dsh插件创造\workspace\dsh-claude-mode
npm run build:client
npm run check
npm test
```

浏览器验证：准备一个 0.2.2-rc.1 的临时 web profile，把 `node_modules/dsh-claude-mode` 链接到本目录，将插件加入 profile bundles，启动 `--no-open --port <port>`，用输出的带 token URL 打开；验证后删除临时 profile、链接并停止服务。
