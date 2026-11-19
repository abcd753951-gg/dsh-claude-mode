# 验收记录：dsh-claude-mode 1.1.2

- 验收时间：2026-11-08（Prompt Pilot）/ 2026-11-10（数据与存储）
- 目录：`F:\dsh插件创造\workspace\dsh-claude-mode`
- 结论：静态检查、50 项单元测试、30 项本地完整草稿评估 + 18 项 Host AI 路由合约、数据审计/迁移/清理计划真实文件系统合约、0.2.2-rc.1 web 宿主的真实浏览器交互矩阵均通过。空输入框显示完整提示词卡片；开启 AI 完善后由当前模型改写，同一上下文只请求一次并双侧缓存；`Tab` 接受、`Esc` 收起，接受后删除正文会从缓存重新出现。数据与存储面板只读展示 junction/物理路径/盘余量，生成迁移与临时目录清理脚本，真实浏览器 1440/768/375 三档无横向溢出，0 插件 console error。聊天全文搜索仍依赖宿主索引，未启用时安静降级。

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
npm test               → tests 51 / pass 51 / fail 0
npm run eval:pilot     → local cases 30 / pass 30; Host AI route contracts 18 / pass 18
npm run eval:data      → data route contracts: audit + migration plan + cleanup plan pass
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
    - Prompt Pilot 设置行与版本 `1.1.2`。
11. 1.0.0 纯函数：
    - `extractNextStep`：`下一步：`/粗体/列表/编号/标题、分号截断、英文 `Next step:`、无显式下一步、同一回复取最后一条；
    - `buildPromptDraft`：下一步、提问、已完成、计划、改动、任务意图、标题、空态起始、陈旧回复忽略、running 返回 null；完整草稿长度和验收/风险信息；报错/工具错误/普通回答/空上下文/无下一步等所有已结束上下文都有非空完整草稿；
    - `suggestNextPrompt`：保留为完整草稿兼容别名，不再输出短句；
    - `latestAssistantText`/`latestToolResultText`/`promptContextFromChat`：assistant blocks、turn-tail、tool-result 与空快照；
    - `normalizePilotStats`/`recordPilotEvent`/`pilotBoost`/`suggestionSuppressed`：计数边界、接受率 boost、按 key 的时间窗抑制；
    - `suggestPromptCompletion`：历史优先、内置池兜底、前缀匹配、忽略 `/` `@`/多行/短输入；
    - `mapSessionSearchResults`、`assistantTextForMessage`、`splitSpeechText`、`startNewSession`。
12. 1.1.x 数据与存储：
    - `resolveDataLocations`：`DSH_HOME` 优先、`%APPDATA%/%LOCALAPPDATA%` 标准路径、当前 TEMP 与系统 TEMP 去重、系统 TEMP 标记 `cleanable`；
    - `directorySize`：普通文件累加、子 junction 不跟随；`auditData`：存在性、字节数、主目录子项、C/E 盘余量；
    - `buildMigrationPlan`：已托管/缺失/不可迁移跳过、相对/重叠根拒绝、脚本含 robocopy/junction/进程检查、数组无尾逗号；
    - `buildCleanupPlan`：默认 dry-run、1..365 天边界、只取 cleanable TEMP、脚本只匹配 `dsh[-_]` 且不含 DSH home；生成的 PowerShell 另用 `Parser::ParseFile` 做语法检查（两个脚本均 OK）。
13. 1.1.x 侧边栏滚动：`STYLES` 含 `sidebarCol` 整体 `overflow-y:auto`、内部根 `height:100%`、`regionArea` 280px 下限、`panelList` 不收缩；真实 Chromium 注入 12 个同结构插件行后，侧栏 `scrollHeight` 1050 > 720，滚到底时工作区与账号区可见。
14. 跨平台（1.1.2）：`test/unit/data.test.mjs` 的迁移计划夹具改为从 `os.tmpdir()` 的根推导绝对目标目录（Windows `C:\DSHData`、POSIX `/DSHData`），drives 断言只在临时根确有盘符时执行；`ubuntu-latest` 与 `windows-latest` 的 Node 24 CI 均 51/51 通过。

## 3. 数据审计实测（2026-11-10）

| 位置 | 逻辑路径 | 结果 |
| --- | --- | ---: |
| DSH 主目录 | `C:\Users\13645\.dsh` → `E:\DeepSeek-Harness-Data\harness-home` | 1.01 GB，已托管 |
| DSH 桌面数据 | `%APPDATA%\@deepseek-ai\dsh-desktop` → E | 24.4 MB，已托管 |
| DSH 更新器缓存 | `%LOCALAPPDATA%\@deepseek-aidsh-desktop-updater` → E | 560 MB，已托管 |
| pnpm 全局目录 | `%LOCALAPPDATA%\pnpm` → `E:\DeepSeek-Harness-Data\pnpm-store` | 610 MB，已托管（2026-11-10 迁移） |
| pnpm 缓存 | `%LOCALAPPDATA%\pnpm-cache` → `E:\DeepSeek-Harness-Data\pnpm-cache` | 585 MB，已托管（2026-11-10 迁移） |
| npm 缓存 | `%LOCALAPPDATA%\npm-cache` | 面板 `≥ 126 MB`；`Get-ChildItem` 实测约 293 MB，仍在 C（MCP 会重启 npx 并占用） |
| DSH TEMP | `E:\DeepSeek-Harness-Data\temp` | 52.1 MB，已在其他盘 |
| 系统 TEMP | `%LOCALAPPDATA%\Temp` | 面板 `≥ 350 MB`；Edge 基准临时目录清理后，`Get-ChildItem` 实测约 509 MB（其他程序 TEMP），仍在 C |

磁盘：C 可用 **5.39 GB / 150 GB**；E 可用 **45.99 GB / 480 GB**。旧的 `dsh-bench-edge5`（headless Edge，约 2.32 GB）已停止并清理；面板的 `≥` 是扫描时限下的下界，不伪装精确值。

### 实际迁移记录（2026-11-10）

- pnpm 全局目录：639,802,695 字节复制到 E，字节校验一致；原目录清理；C 路径现为 Junction。
- pnpm 缓存：613,259,524 字节复制到 E，字节校验一致；原目录清理；C 路径现为 Junction。
- 旧 DSH 临时项：清理 70 项、约 413 MB（只处理早于 1 天的 `dsh-*`）。
- 迁移前 C 可用 1.53 GB，迁移后 **5.39 GB**；E 从 47.25 GB 变为 45.99 GB。
- 未迁移：`npm-cache`（约 293 MB，MCP 会重启 npx 并占用 `_npx`）。系统 TEMP 中的旧 headless Edge 已停止并清理约 2.32 GB。
- 用户级 `TEMP` / `TMP` 已写入 `E:\DeepSeek-Harness-Data\temp`；当前正在运行的 DSH 仍继承旧 C 路径，完整重启后新进程使用 E。系统服务仍使用系统 TEMP。
- 完整记录：`_artifacts/data-migration-20261110.md`；脚本：`_artifacts/migrate-caches-20261110.ps1`。

## 4. 浏览器矩阵（0.2.2-rc.1 web 宿主）

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
| 15 | 设置页 | 「AI 完善提示词」开关存在且可切换；说明文字含「同一上下文只调用一次并复用缓存」「关闭后只用本地模板」；版本 `1.1.2` |
| 16 | 前缀补全回归 | 输入 `请审` 仍显示浅色尾文 ghost，`Tab` 接受后黑色正文；`/`、`@`、多行/菜单打开时不显示 |
| 17 | 全流程 console | 插件自身 0 error、0 warning |
| 18 | 数据审计 | `GET /dsh-claude-mode/data/audit` 200；8 个位置（含 system-temp）渲染；主目录 `已托管` 显示 C 逻辑路径 → E 物理路径；pnpm 两项在迁移后显示 `已托管`；C 3.11 GB / E 45.98 GB |
| 19 | 数据面板 1440/768/375 | 三档 `documentElement.scrollWidth === innerWidth`，无横向溢出；路径省略号、盘余量/大小/状态徽章不换行错位 |
| 20 | 迁移脚本 UI | 迁移前目标 `E:\DeepSeek-Harness-Data` 生成 3 个迁移项（pnpm store/cache、npm cache）；2026-11-10 完成 pnpm 两项后，计划只剩 npm cache 1 项；页面显示动作、警告、5 步执行说明与「下载 .ps1」 |
| 21 | 清理脚本 UI | 输入 7 天生成清理计划，显示 dry-run 说明、警告与「下载清理脚本 .ps1」；脚本不在插件内执行；实测清理旧 DSH 临时项 413 MB |
| 22 | 数据流程 console/network | 仅 1 个 audit 请求（200），无 4xx/5xx；插件自身 console 0 error、0 warning |
| 23 | 侧栏整体滚动 | 普通侧栏 `scrollHeight=clientHeight=720`；向 `panelList` 注入 12 个 36px 同结构插件行模拟“全部展开”后 `scrollHeight=1050`、`overflowY=auto`；滚到底时工作区 360–640、账号区 640–720 可见；折叠为 56px 控制轨时无额外滚动 |

截图：`docs/preview/ai-panel.png`、`ai-panel-dark.png`、`ai-panel-mobile.png`、`ai-settings.png`、`ai-accepted.png`、`data-storage.png`；其余历史界面截图见 `docs/preview/`。

## 5. 槽位与宿主兼容

| 宿主 | 槽位/服务 | 结果 |
| --- | --- | --- |
| 0.2.2-rc.1 | `conversation.input.overlay` | 完整提示词卡片与前缀 ghost 均渲染 |
| 0.2.2-rc.1 | Host `webServer` + `llm` + `agentDefaultModel` | 同源 `/dsh-claude-mode/ai-prompt` 路由注册成功；POST 200；mock 适配器经 `llm.stream` 返回 |
| 0.2.2-rc.1 | Host `webServer`（独立注入，无需 llm） | `/dsh-claude-mode/data/audit`、`/plan`、`/cleanup` 注册成功；无模型时也可用 |
| 0.2.2-rc.1 | `settings.section` | AI 开关、输入补全、上下文推荐、主题等设置行完整 |
| 0.2.2-rc.1 | `conversation.chat.turnTail` = list | 回合页脚注册成功 |
| 0.1.2-rc.1 | `conversation.chat.turnTail` = chain | 捕获 `requires options.select` 后带 `select` 重试成功 |
| 两者 | `conversation.input.dock` / `shell.overlay` / `settings.section` | 运行条 / 样式 / 面板 / 快捷键 / 设置均 active |
| 0.2.2 | `conversation.chat.assistant-actions` | 朗读动作注册成功，按消息 id 取正文 |
| 0.2.2 | `sessions.search` | 服务存在、请求路径通；索引未启用时返回错误，插件清空结果并收起加载态 |
| 0.2.2 | `uiWorkspace.startSession` | `Alt+N` 与面板动作都能打开空白会话；服务缺席时返回 false 不抛错 |

## 6. 已知边界

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
11. 数据迁移脚本未在真实用户目录上执行：验收只验证了扫描、计划与脚本语法/内容；实际搬动发生在用户退出 DSH 后外部运行脚本，脚本会保留 `*.data-keeper-<时间戳>` 副本。
12. 目录大小有 120k 条目 / 4s 上限；触顶显示 `≥`，不保证精确。系统 TEMP 在本次环境实测约 3.24 GB，面板显示 `≥` 下界；清理脚本 dry-run 才列出候选实际大小。
13. 迁移使用 Windows junction：仅本地卷、目标不能已存在、不能与源重叠；网络盘/映射盘/OneDrive 不在支持范围。
14. 临时目录清理只处理 `dsh-*`/`dsh_*` 直接子项；其他程序与正在使用的文件不会被识别为 DSH 所有，也不会被删除。

## 7. 复现

```bash
cd F:\dsh插件创造\workspace\dsh-claude-mode
npm run build:client
npm run check
npm test
npm run eval:pilot
npm run eval:data
```

浏览器验证：准备一个 0.2.2-rc.1 的临时 web profile，把 `node_modules/dsh-claude-mode` 链接到本目录，将插件加入 profile bundles，启动 `--no-open --port <port>`，用输出的带 token URL 打开。数据面板不需要模型：直接打开「设置 → Claude 模式 → 数据与存储」即可。AI 路由验证需要一个默认模型；本机用测试 profile 的 mock `llm` 适配器提供固定输出，验证 AI 返回后的 UI 升级、缓存与回退，然后删除 mock 适配器。验证后停止服务并恢复测试 profile。

## 1.2.0 增量验收：外壳去重

- 验收时间：2026-11-20
- 范围：品牌行、右栏图标、行内取消固定、面板并列 `order` 四项去重（`src/client/045-dedupe.js` + `03-styles.js` 的 `Shell de-duplication` 段 + 设置页「外壳去重」分组）。
- 命令级：

```text
npm run build:client   → wrote client.js from 8 source files
npm run check          → node --check index.js + client.js + bundle freshness: pass
npm test               → tests 80 / pass 80 / fail 0
```

- 产物级（`test/unit/bundle.test.mjs`）：在 `node:vm` 里按宿主方式执行**已构建的** `client.js`（`window.__ModuleLoader__.load` + `require('react')`），跑完整个 `apply()`。断言四个 `<html>` 标记落到合成 DOM、品牌行取到 `data-ccm-brand-quiet` 与 `tabindex=-1`、行内取消固定与面板行拿到标记、`style.order` 为 `0/2/1/1000`（并列 24 按 id 拆分、「更多」排尾）、8 个插槽席位全部登记、apply 期间零 `warn`/`error`、逐个 dispose 后宿主表面完全还原。
- 标记核对：`[data-sidebar-toggle]` 与 `data-window-drag`（`SidebarRoot.tsx` 的 logo 行）、`[data-sidebar-right-expand]`（`ExpandButton.tsx`）、`[data-sidebar-right-toggle]`（`SidebarRight.tsx`）、`.panelList` 的 flex 列（`SidebarRoot.module.css`）、`entriesOfSlot`（`dsh-client-ui-renderer/src/client/registry.ts`）均逐条对照源码确认。
- 真实浏览器（`test/browser/` 夹具，Playwright Chromium 1280×720，执行**已构建的** `client.js`，样式表 33 454 字符）：`await __ACC__.verify()` → **30/30 PASS**，全部为浏览器自测值（`getComputedStyle` / `elementFromPoint` / `getBoundingClientRect`），不含被测代码常量：
  - 品牌行 `pointer-events: none`、`tabindex=-1`、`aria-disabled=true`；行心 `elementFromPoint` 由按钮变为容器 `div`；版本号 `pointer-events: auto`，命中仍是 `#copyVersion` —— 复制版本仍可点。
  - 行内 `style.order` = `插件=0 安全检测=2 设计台=1 更多=1000`，视觉顺序 **插件 → 设计台 → 安全检测 → 更多**；夹具注册顺序故意与 id 顺序相反，因此能区分「按 order 排」与「按名字排」。
  - 取消固定：默认 `0 0 0`；悬停该行 `1 0 0`；键盘聚焦 `1`、失焦复隐 `0`（`transition: opacity 120ms ease`，`prefers-reduced-motion: reduce` 下为 `none / 0s`）。
  - 右栏两枚图标 `matrix(-1, 0, 0, -1, 0, 0)`（`rotate(180deg)` 盖掉宿主内联 `scaleX(-1)`），与左栏 `none` 不再相同。
  - 面板行标记 `["","","",null]`（「更多」不参与）、取消固定标记三行齐备、8 个插槽席位登记、`console.warn`/`error` 计数 0。
  - `disposeShell()` 后 flags / 标记 / 行内 `order` / `opacity` / 图标变换全部还原，视觉顺序回到宿主顺序。

```text
flags          {"brand":"","glyphs":"","unpin":"","order":""}
brand          pe=none tabindex=-1 aria-disabled=true
copy-version   pe=auto
hit-test       brand→div  copy→#copyVersion
rail order     插件 → 设计台 → 安全检测 → 更多
inline order   插件=0 安全检测=2 设计台=1 更多=1000
unpin opacity  0 0 1            ← 指针停在第三行（设计台）
right glyphs   {"leftRail":"none","rightExpand":"matrix(-1, 0, 0, -1, 0, 0)","rightToggle":"matrix(-1, 0, 0, -1, 0, 0)"}
style element  mounted (33454 chars)
logs           []
verdict        PASS (30 checks)
```

- 截图（同一份夹具，左「去重生效」、右「卸载后＝宿主原样」）：`docs/acceptance-shell-after.png`、`docs/acceptance-shell-before.png`。
- 仍未覆盖：本机桌面渲染进程以 `dsh-app://` 加载且未开调试端口，外部读不到它的 DOM；夹具是**按宿主源码复刻的最小外壳**（`data-window-drag` / `data-sidebar-toggle` / `data-copy-version` / `data-sidebar-right-*` / `.panelList` 的 flex 列），不是宿主 App 本身。真实窗口的最终确认仍需重载（`Ctrl+R`）；profile 的 `node_modules/dsh-claude-mode` 已是指向本目录的 junction，版本 `1.2.0`。
- 复现：`npm run test:browser` → 打开 `http://127.0.0.1:55310/shell.html` → 控制台 `await __ACC__.verify()`（详见 `test/browser/README.md`）。

### 夹具自身的两个缺陷（2026-11-17 复现并修复，插件代码未改）

首轮 `verify()` 在 29 项里 3 项失败：

| 编号 | 断言 | 实测 vs 期望 |
| --- | --- | --- |
| #11 | 版本号命中测试仍命中自己 | `false != true` |
| #16 | 取消固定默认隐藏 | `["0","1","0"] != ["0","0","0"]` |
| #18 | 取消固定失焦复隐 | `"1" != "0"` |

复现命令（首轮夹具：`#report` 放在 `.shell` 内 + `verify()` 用硬编码期望，副本留在 `_tmp/repro/prefix/`）：

```text
node F:\dsh插件创造\_tmp\repro\prefix\serve.mjs 55312
→ http://127.0.0.1:55312/shell.html ；先用指针悬停 .panelEntry:nth-child(2)
→ await __ACC__.verify()  ⇒ 29 项，失败 #11 / #16 / #18
```

- 根因一（#11）：`.shell` 是 `display:flex; gap:400px`，`#report` 作为第三个 flex 项带来 304px 的 min-content 宽度，把 `.sidebarCol` 从 268px 挤到 **111px**；`.brand` 本身 140px 溢出，而插件对 `[class*="sidebarCol"]` 设了 `overflow-x: hidden`，版本号因此落在列框之外，`elementFromPoint` 命中容器 `DIV.shell`。单变量验证：把 `#report` 移出 `.shell` 后列宽回到 **284px**、命中恢复 `SPAN.copyVersion` —— 插件侧无需任何修改。
- 根因二（#16/#18）：断言假设指针空闲，而驱动把指针停在某一行，`:hover` 让该行按钮合法显示为 `1`，失焦后指针仍在该行上所以保持 `1`。改为按浏览器上报的 `:hover` / `:focus` 推导期望，聚焦测试改用未被悬停的行。实测：指针停在行上 `["0","1","0"]`、移开 `["0","0","0"]`，两种状态都 30/30。
- 同一验证复跑（修复后）：`npm run test:browser -- 55310` → `await __ACC__.verify()` → **30/30 PASS**（指针停在行上、移开各一次）；`npm test` → **80/80**；`npm run check` → bundle 与 8 个 client 源文件一致。
- 结论：#11/#16/#18 全部是夹具缺陷（布局污染 + 断言依赖指针状态），不是插件缺陷；插件代码在这轮复现中未改动一行。

### 真实宿主复核清单（夹具无法覆盖）

夹具用 `elementFromPoint` 与脚本 `.focus()` 近似指针与键盘，测不到真实 Electron 宿主里的窗口拖拽面（`-webkit-app-region: drag`）、原生剪贴板、真实 Tab 序列，以及宿主升级后才出现的层叠规则。以下 5 条必须在窗口里目视确认一遍。

> 编号口径：上文失败记录沿用 29 项版本的历史编号（#16 取消固定默认隐藏、#18 取消固定失焦复隐）；现行夹具为 30 项，对应 #17 / #19。本节同时标注现行编号。

#### 1. 品牌行拖拽区不拦截点击（现行 #10；辅助 #8 / #9）

- 操作：① 在品牌行右侧空白处按住左键拖动后松手；② 单击品牌行文字区；③ 单击版本号 `1.2.0`；④ 从侧边栏顶部连按 6 次 `Tab`。
- 预期：① 窗口随指针移动；② 不新建会话、会话列表不变；③ 剪贴板得到 `1.2.0`（或出现「已复制」提示），仍不新建会话；④ `Tab` 跳过品牌行，第一站是新建会话行或面板行。
- 判定：① 窗口移动 = 拖拽面仍然有效；② 会话标题与消息列表不变 = 没有误触；③ 粘贴结果等于设置页显示的插件版本 = 命中；④ 品牌行不出现焦点框 = 没有抢 `Tab`。任一条不符即记失败，附窗口截图。
- 夹具为何不够：夹具里 `pointer-events: none` 只挡 DOM 命中，Electron 的拖拽面在进入 DOM 命中测试之前就接管了该区域，「拖得动窗口」与「点不出会话」共存只能真机看。

#### 2. 版本号点击命中（现行 #11；辅助 #9）

- 操作：① 悬停版本号看光标；② 单击；③ 点击版本号右边缘外 2px（仍在品牌行内）；④ 关闭「设置 → Claude 模式 → 外壳去重 → 品牌行」后重复 ②。
- 预期：① 版本号处为手型光标，品牌行其余区域不是手型；② 复制成功、按钮无按下态；③ 无复制也无新建会话；④ 回到宿主行为：品牌行整体就是「新建会话」按钮，点击会新建会话。
- 判定：② 剪贴板为 `1.2.0` 且无新会话；③ 剪贴板内容不变；④ 出现新会话 = A/B 对照成立，说明开关确实接管了这一处。②③ 同时成立才算通过。
- 夹具为何不够：夹具只能证明合成点落在 `#copyVersion`，证明不了原生点击链、光标形状与剪贴板写入。

#### 3. 取消固定：默认隐藏、悬停浮现、失焦复隐（现行 #15 / #17 / #18 / #19；历史 #16 / #18）

- 操作：① 指针移入任一面板行（不点）停 300ms 后移出；② `Tab` 到该行「取消固定」按钮，再 `Tab` 走开；③ 悬停后点击该按钮；④ 系统开启「减少动态效果」后重复 ①。
- 预期：① 按钮约 120ms 淡入、移出淡出；未悬停行不可见也不可点（点击落到行本身，不会误触发取消固定）；② `Tab` 能落到按钮上并使其显现，离开后消失；③ 该插件从面板行移除、出现在「更多」菜单中（取消固定生效）；④ 立即切换，无淡入淡出。
- 判定：① 出现与消失各一次、无闪烁；点击不可见区域不改变固定状态；② **`Tab` 能到达按钮** —— 若到达不了，说明键盘用户永远看不到该控件，需把显示条件补上 `:focus-within` 并回写测试；③ 以「更多」菜单里的勾选状态为准；④ 无过渡动画。② 不通过时该项整体记失败（可访问性缺口优先于视觉）。
- 夹具为何不够：`:hover` 由真实指针驱动、`Tab` 序列由真实焦点管理，夹具只能用脚本 `.focus()` 与合成状态近似；这条同时验证「隐藏但可达」这个可访问性前提。

#### 4. 「更多」按钮排尾顺序（现行 #13 / #14 / #28）

- 操作：① 记录当前面板行顺序；② `Ctrl+R` 重载窗口，连续 3 次；③ 在「更多」菜单里固定/取消固定一个插件后再看；④ 关闭再打开 Claude 模式。
- 预期：① 同一 `order` 的并列项按 id 字典序固定，不同 `order` 按升序；② 三次重载顺序完全一致；③ 新增或移除一行后，其余行相对次序不变；④「更多」始终是最后一行，且不被列表底部裁掉。
- 判定：②③④ 全部保持 = 稳定；出现两次不同顺序即记失败，附两次截图与「更多」入口位置。注意：宿主若改为虚拟滚动或 grid，`order` 仍生效但行会被重排 DOM，「更多排尾」的假设需重新评估。
- 夹具为何不够：夹具只有 3 行固定条目，覆盖不到真实宿主的插件数量、重载抖动与滚动容器。

#### 5. `.unpin` 隐藏规则的选择器优先级（现行 #15 / #17 / #29）

- 操作（DevTools 可用时）：① 打开渲染进程控制台；② 不悬停时选中任一取消固定按钮；③ 在 Computed 面板看 `opacity` 的来源规则；④ 关掉「外壳去重 → 取消固定」开关再看来源。
- 预期：②③ 生效规则是插件的 `html[data-ccm-dedupe-unpin] [data-ccm-quiet-unpin]`（0,2,1，`opacity: 0`），宿主自身的 `.panelEntry` 级规则（0,2,0）被压住；④ 开关关闭后回到宿主规则，按钮常驻。
- 判定：③ 来源为插件规则 = 优先级成立；若来源是宿主规则或被内联 `opacity` 覆盖，说明宿主升级改了层叠，需把隐藏改为内联 `style.opacity` 或加 `!important`，并补一条回归用例。无 DevTools 时用 A/B 对照：关掉开关按钮常驻、打开后只在悬停/聚焦出现，且**没有任何一行在未悬停时常亮**，即视为通过；出现常亮行即失败。
- 夹具为何不够：夹具只测自己那份合成 DOM，测不到宿主升级后新增的规则；这条本质是宿主升级的回归哨兵。

#### 复核记录

| # | 复核项 | 结果（通过/失败） | 日期 | 备注 |
| --- | --- | --- | --- | --- |
| 1 | 品牌行拖拽区不拦截点击 |  |  |  |
| 2 | 版本号点击命中 |  |  |  |
| 3 | 取消固定隐藏 / 浮现 / 复隐 |  |  |  |
| 4 | 「更多」排尾顺序 |  |  |  |
| 5 | `.unpin` 规则优先级 |  |  |  |

判定口径：5 条全部「通过」才把 1.2.0 标为「真机已复核」；任一条失败按该条「判定」里的修法处理，并在本文件追加一条回归记录（含编号、截图、复现命令）。





