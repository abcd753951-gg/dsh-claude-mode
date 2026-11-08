# 验收记录：dsh-claude-mode 1.0.0

- 验收时间：2026-11-08
- 目录：`F:\dsh插件创造\workspace\dsh-claude-mode`
- 结论：静态检查、42 项单元测试、30 项本地完整草稿评估 + 18 项 Host AI 路由合约、0.2.2-rc.1 web 宿主的真实浏览器交互矩阵均通过。空输入框现在显示完整提示词卡片；开启 AI 完善后由当前模型改写，同一上下文只请求一次并双侧缓存；`Tab` 接受、`Esc` 收起，接受后删除正文会从缓存重新出现。聊天全文搜索仍依赖宿主索引，未启用时安静降级。

## 1. 环境

| 项 | 值 |
| --- | --- |
| 桌面宿主 | DSH `0.2.2-rc.1`（Electron） |
| Web 验证宿主 | 同版本 `0.2.2-rc.1`，独立 `web` profile + 临时端口 `53130` |
| 浏览器 | Playwright Chromium；1440×900 / 768×900 / 375×812 |
| 插件安装 | profile 的 `node_modules/dsh-claude-mode` 链接到本目录；另装一个仅用于验证的 mock `llm` 适配器，验证后移除 |
| 主题 | 亮色与暗色（`prefers-color-scheme`）均验证 |
| 测试改动 | 临时 profile、端口、mock 适配器与测试会话均已清理或归档 |

> AI 路由的模型调用用测试 profile 中的 mock `llm` 适配器验证真实 `llm.stream` 服务契约（鉴权、裁剪、缓存、限流、失败回退与 UI 升级）；真实模型供应商的延迟与输出质量由部署时的当前模型决定，不在本机用外部 API 计费验证。路由契约另由 fake `llm` 的评估脚本独立覆盖。

## 2. 命令级检查

```text
npm run build:client   → wrote client.js from 7 source files
npm run check          → node --check index.js + client.js + bundle freshness: pass
npm test               → tests 42 / pass 42 / fail 0
npm run eval:pilot     → local cases 30 / pass 30; Host AI route contracts 18 / pass 18
```

Prompt Pilot 评估（`docs/PROMPT-PILOT-EVAL.md`）：

- 中英文上下文用例 30/30：显式下一步（粗体/列表/标题/英文）、报错/工具错误生成完整诊断草稿、报错+明确下一步、提问、已完成、计划、改动、任务意图、会话标题、空态、陈旧回复、运行中、代码围栏忽略、去重和超长上下文。
- 每条本地建议都是完整草稿：中文 ≥35 字、英文 ≥18 词，且包含目标/范围/验收/风险类信息；没有短句回退路径。
- 5000 次本地草稿生成约 48ms（平均 0.010ms，p95 0.016ms）；超长输入在 1ms 内完成，草稿长度有上限。
- 本地生成 0 模型 token、0 网络调用；Host AI 路由：32KB body 上限、上下文裁剪、650-token 输出预算、`SKIP`/过短输出/空输出/异常回退、同上下文缓存、短时限流、缺 header/非法 JSON/非 POST 拒绝，全部 PASS。
- 接受后删除草稿可再次出现（不做 accepted 冷却）；`Esc` 收起才冷却；Chat 新鲜度检查 PASS。
- 设置页含「AI 完善提示词」开关，说明同一上下文只调用一次、关闭后只用本地模板。

单测覆盖：

1. 两套主题包键集合对称、值非空；主题签名令牌与错误/成功色。
2. zh/en 字典键集合一致；locale 选择；模板插值。
3. 设置存储归一化（含 `sound` / `ghost` / `ghostContext` / `aiPrompt`）、通知去重、重置。
4. 时长/计时格式化；模糊评分、排序、分组（含「聊天记录」分组顺序）。
5. 187 个英文动词、78 个中文动词、8 个完成词去重与 locale 路由；稳定哈希。
6. 状态星 6 帧序列与 2 秒往返索引。
7. Chat 活动判定：`tool` / `tool-input` / `thinking` / `responding` / `waiting`。
8. 历史提示词提取与 `↑/↓` 导航状态机（草稿保存/恢复、边界、无历史）。
9. 快捷键表数据：三组、`↑↓ 历史`、`Alt+N 新建会话`、`Alt+B 侧边栏`。
10. 组件渲染（React stub）：
    - 运行状态条、回合页脚、插件图标管理、设置页、朗读动作；
    - Prompt Pilot 设置行与版本 `1.0.0`。
11. 1.0.0 纯函数：
    - `extractNextStep`：`下一步：`/粗体/列表/编号/标题、分号截断、英文 `Next step:`、无显式下一步、同一回复取最后一条；
    - `buildPromptDraft`：下一步、提问、已完成、计划、改动、任务意图、标题、空态起始、陈旧回复忽略、running 返回 null；完整草稿长度和验收/风险信息；报错/工具错误/普通回答/空上下文/无下一步等所有已结束上下文都有非空完整草稿；
    - `suggestNextPrompt`：保留为完整草稿兼容别名，不再输出短句；
    - `latestAssistantText`/`latestToolResultText`/`promptContextFromChat`：assistant blocks、turn-tail、tool-result 与空快照；
    - `normalizePilotStats`/`recordPilotEvent`/`pilotBoost`/`suggestionSuppressed`：计数边界、接受率 boost、按 key 的时间窗抑制；
    - `suggestPromptCompletion`：历史优先、内置池兜底、前缀匹配、忽略 `/` `@`/多行/短输入；
    - `mapSessionSearchResults`、`assistantTextForMessage`、`splitSpeechText`、`startNewSession`。

## 3. 浏览器矩阵（0.2.2-rc.1 web 宿主）

| # | 用例 | 结果 |
| --- | --- | --- |
| 1 | 首次载入 | 0 plugin error；`ccm-runbar`、标题栏 `✻`、侧边栏面板图标正常 |
| 2 | 空输入框完整草稿 | 聚焦空输入框约 350ms 后出现 `ccm-ai-preview`：先显示「AI 正在完善提示词…」与完整本地草稿；mock 返回后标题变为「AI 提示词建议」、正文替换为模型结果；placeholder 隐藏 |
| 3 | 完整显示 | 卡片宽 620px（1440）/359px（375），正文 15px/23px、可换行；`scrollWidth=clientWidth`，375 下 `documentElement.scrollWidth=375`，无横向溢出 |
| 4 | AI 升级 | 请求为同源 `POST /dsh-claude-mode/ai-prompt`，响应 `ok:true`；标题/正文按 pending → ready 更新 |
| 5 | 弹层关闭后恢复 | 临时插入 `[role=listbox]` 时卡片隐藏；移除后 900ms 内自行恢复，`Tab` 仍可接受；聚焦/菜单关闭不再依赖单一事件 |
| 6 | Tab 接受与删除重现 | `Tab` 后卡片隐藏、正文变为完整提示词、焦点仍在编辑器；全选删除后卡片从缓存重新出现；同一页面 AI 路由 POST 计数保持 1 |
| 7 | Esc 收起与冷却 | `Esc` 后卡片隐藏、placeholder 恢复；同一 key 在 60s 内不立即重现，心跳轮询不会绕过冷却 |
| 8 | 点击卡片 | 点击卡片正文不会抢走输入框焦点，卡片保持可见，可继续按 `Tab` |
| 9 | AI 关闭 | 设置页关闭「AI 完善提示词」后，空输入框显示「提示词建议 / 本地生成，不发起模型调用」；AI 路由无新请求 |
| 10 | 模型不可用/失败 | 路由返回无模型或流失败时，标题回退为「提示词建议（本地）」，完整本地草稿仍可用；60s 失败冷却避免反复请求 |
| 11 | 报错上下文 | 本地 `buildPromptDraft` 对报错/工具错误返回 `error` 完整诊断草稿（复现/根因/验证），不再返回 null；单测与评估覆盖 |
| 12 | 暗色主题 | 卡片背景 `rgb(29,29,29)`、正文 `rgb(242,242,242)`，对比度充足；标题/边框/页脚随令牌切换 |
| 13 | 窄屏 | 375×812 下面板 x=8、宽 359、无横向溢出；正文 15px 可读，卡片高度随内容增长 |
| 14 | 中屏 | 768×900 下宽 620、无横向溢出 |
| 15 | 设置页 | 「AI 完善提示词」开关存在且可切换；说明文字含「同一上下文只调用一次并复用缓存」「关闭后只用本地模板」；版本 `1.0.0` |
| 16 | 前缀补全回归 | 输入 `请审` 仍显示浅色尾文 ghost，`Tab` 接受后黑色正文；`/`、`@`、多行/菜单打开时不显示 |
| 17 | 全流程 console | 插件自身 0 error、0 warning |

截图：`docs/preview/ai-panel.png`、`ai-panel-dark.png`、`ai-panel-mobile.png`、`ai-settings.png`、`ai-accepted.png`；其余历史界面截图见 `docs/preview/`。

## 4. 槽位与宿主兼容

| 宿主 | 槽位/服务 | 结果 |
| --- | --- | --- |
| 0.2.2-rc.1 | `conversation.input.overlay` | 完整提示词卡片与前缀 ghost 均渲染 |
| 0.2.2-rc.1 | Host `webServer` + `llm` + `agentDefaultModel` | 同源 `/dsh-claude-mode/ai-prompt` 路由注册成功；POST 200；mock 适配器经 `llm.stream` 返回 |
| 0.2.2-rc.1 | `settings.section` | AI 开关、输入补全、上下文推荐、主题等设置行完整 |
| 0.2.2-rc.1 | `conversation.chat.turnTail` = list | 回合页脚注册成功 |
| 0.1.2-rc.1 | `conversation.chat.turnTail` = chain | 捕获 `requires options.select` 后带 `select` 重试成功 |
| 两者 | `conversation.input.dock` / `shell.overlay` / `settings.section` | 运行条 / 样式 / 面板 / 快捷键 / 设置均 active |
| 0.2.2 | `conversation.chat.assistant-actions` | 朗读动作注册成功，按消息 id 取正文 |
| 0.2.2 | `sessions.search` | 服务存在、请求路径通；索引未启用时返回错误，插件清空结果并收起加载态 |
| 0.2.2 | `uiWorkspace.startSession` | `Alt+N` 与面板动作都能打开空白会话；服务缺席时返回 false 不抛错 |

## 5. 已知边界

1. AI 提示词依赖 Host 的 `llm` 服务与一个可用默认模型；模型不可用、无凭据或输出被 `SKIP` 时回退到完整本地草稿，不阻塞输入。
2. AI 调用会把当前会话的最近回复、最近提示词、工具结果与会话标题发送给部署配置的模型供应商；设置页明确说明这一点，关闭开关后不发起模型调用。
3. 同一上下文只调用一次并缓存；客户端缓存 10 分钟、Host 缓存 10 分钟，失败有 60 秒冷却。切换上下文会发起新的调用；上下文变化频繁时会各算一次。
4. 聊天全文搜索依赖宿主开启 `session-query-sqlite` 的索引；DSH 默认关闭，此时「聊天记录」分组不出现。
5. 朗读依赖浏览器语音合成；headless 环境只验证状态机，无法验证实际音频。完成提示音同理。
6. `Alt+N` 会先检查 `defaultPrevented` 与宿主模态框；若宿主占用同名键位，以宿主为准。
7. 旧导入会话没有 `closing` 信息时，宿主本身不显示复制/分支等操作条，朗读按钮同样不出现。
8. `↑` 历史与 `?` 依赖宿主可编辑输入框；若宿主更换编辑器实现，历史召回会静默失效，快捷键表仍可从面板打开。
9. 插件图标折叠依赖 0.2.x 的 `sidebar.panellist.actions`；旧宿主静默省略该分组。
10. 设置保存在 Web GUI origin；`dsh web` 端口变化会换 origin。

## 6. 复现

```bash
cd F:\dsh插件创造\workspace\dsh-claude-mode
npm run build:client
npm run check
npm test
npm run eval:pilot
```

浏览器验证：准备一个 0.2.2-rc.1 的临时 web profile，把 `node_modules/dsh-claude-mode` 链接到本目录，将插件加入 profile bundles，启动 `--no-open --port <port>`，用输出的带 token URL 打开。AI 路由验证需要一个默认模型；本机用测试 profile 的 mock `llm` 适配器提供固定输出，验证 AI 返回后的 UI 升级、缓存与回退，然后删除 mock 适配器。验证后停止服务并恢复测试 profile。


