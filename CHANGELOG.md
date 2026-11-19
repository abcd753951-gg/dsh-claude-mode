# Changelog

All notable changes to `dsh-claude-mode` are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [SemVer](https://semver.org/).

## [1.2.0] — 2026-11-20

### Changed

- 对齐 DeepSeek Harness 0.2.2-rc.5：README 兼容性行改为 0.2.2-rc.5（2026-11-19 实测）；`engines.dsh` 仍不收紧，保留对 `dsh web` 0.1.2-rc.1 的兼容。slots / webServer / systemPrompt 公开扩展点与 0.2.2-rc.3 一致，无破坏性变化。

### Added

- 新增「外壳去重」四件套（设置面板独立分组 + 四个开关，默认全开，各自可单独关掉；关闭 Claude 模式或卸载插件后自动还原宿主原样）：
  - `dedupeBrand` 品牌行不再新建会话：侧边栏顶部的品牌行本身就是一个「新建会话」按钮，与下方的新建会话行重复（同一 `t('session.new.label')`、同一 `startSession`）。开启后品牌行只作展示，`tabindex` 置 -1、指针事件让出，新建会话只剩一个入口；品牌行里的版本号仍可点击复制（CSS 对 `[data-copy-version]` 单独恢复指针事件）。
  - `dedupeGlyphs` 右侧栏图标区分：右侧栏展开（`[data-sidebar-right-expand]`）与收起（`[data-sidebar-right-toggle]`）复用左侧栏折叠按钮的同一个字形，宿主只靠 `scaleX(-1)` 镜像。开启后改为 `rotate(180deg)`，与左侧栏折叠按钮一眼分开。
  - `dedupeUnpin` 取消固定按钮悬浮显示：每个面板图标行常驻一个「取消固定」按钮，与「更多」菜单里的固定开关重复。开启后只在悬停该行或键盘聚焦时出现（`opacity` 过渡，尊重「减少动态效果」）。
  - `stablePanels` 面板图标顺序稳定：宿主只按 `order` 排序，并列时用注册顺序，重启后可能换位（本轮实测并列组合 24/24、26/26、30/30）。开启后读 `ctx.slots.entriesOfSlot('sidebar.panellist')`，并列项按面板 id 二次排序，并用 `style.order` 落到 `.panelList` 这个 flex 列上；`MutationObserver` 跟随宿主重渲染，「更多」入口固定排在最后。

### Verified

- `npm test` → **80/80**。新增 `test/unit/dedupe.test.mjs`（12 项）：并列排序与注册顺序无关、id 兜底、脏 entries 跳过、品牌行让出但不影响折叠按钮与新建会话行、行尾「更多」排队、设置项即时生效与主开关回收、MutationObserver 跟随宿主重渲染、无 DOM/异常宿主的空实现。新增 `test/unit/bundle.test.mjs`（3 项）：在 `node:vm` 里执行**构建产物** `client.js`（宿主式 `window.__ModuleLoader__.load` + `require('react')`），跑完整个 `apply()`，断言四个 `<html>` 标记落到合成 DOM、8 个插槽席位全部登记、apply 期间零 warn/error、逐个 dispose 后宿主表面完全还原。测试共用的迷你 DOM 放在 `test/helpers/mini-dom.mjs`，只实现宿主真实标记用到的选择器词汇。
- `npm run check` → `index.js` / `client.js` 语法通过，`build:client --check` 确认 8 个 client 源文件与 bundle 一致。
- 真实浏览器验收（`test/browser/`，Playwright Chromium 1280×720，执行构建产物 `client.js`）：`await __ACC__.verify()` → **30/30 PASS**。浏览器自测的结论：品牌行 `pointer-events: none` 且命中测试落到容器、版本号仍命中 `#copyVersion`；行内 `order` `0/2/1/1000` 让视觉顺序变为 插件 → 设计台 → 安全检测 → 更多（夹具注册顺序与 id 顺序相反）；取消固定默认 `0 0 0`、悬停 `1 0 0`、聚焦 `1` 失焦 `0`；右栏图标 `matrix(-1,0,0,-1,0,0)` 盖掉宿主 `scaleX(-1)`；`prefers-reduced-motion: reduce` 下过渡为 `none / 0s`；`disposeShell()` 后全部还原；0 warn/error。夹具与运行方式见 `test/browser/README.md`，截图见 `docs/acceptance-shell-after.png` / `docs/acceptance-shell-before.png`。
- 宿主侧标记逐条回到源码核对：`[data-sidebar-toggle]` 与 `data-window-drag` 的 logo 行（`dsh-client-ui-sidebar/src/client/SidebarRoot.tsx`）、`[data-sidebar-right-expand]`（`ExpandButton.tsx`）与 `[data-sidebar-right-toggle]`（`SidebarRight.tsx`）、`.panelList` 的 `display:flex; flex-direction:column`（`SidebarRoot.module.css`）、`entriesOfSlot`（`dsh-client-ui-renderer/src/client/registry.ts`）。任一标记缺失时只对应那一条安静退回。

## [1.1.4] — 2026-11-15

### Changed

- 对齐 DeepSeek Harness 0.2.2-rc.3：`engines.dsh` 未收紧（保留对 `dsh web` 0.1.2-rc.1 的兼容），面板版本号同步为 `1.1.4`；slots / webServer / systemPrompt 公开扩展点与 0.2.2-rc.1 一致，无破坏性变化。

### Verified

- 桌面 DSH 0.2.2-rc.3 实机加载面板与工具正常；`npm test` 65/65 通过，`npm run check` 通过。

## [1.1.3] — 2026-11-12

### Changed

- AI 完善提示词的 Host 调用改为**跟随当前会话模型**：Client 请求体新增 `sessionId`（限长 128，缺省为空），Host 优先用 `ctx.get('agents').get(sessionId).model.current()` 路由，live 会话未命中时回落 `agentDefaultModel.currentSelection()`；Host 缓存 key 包含会话 id 与模型选择，切模型后不会复用旧路由结果。
- 输出预算 650 → **1600 tokens**（上限 4096）：`prepareCall(config, signal, configure)` 按 `modelInfo.reasoning.efforts[0]` 传入该模型支持的最低推理强度；没有 reasoning 元数据的模型不传 `reasoningEffort`；不带 `prepareCall` 的旧宿主回退 `llm.stream`。

### Fixed

- 思考模型把预算烧在思考上时：`finish.kind === 'max-tokens'` 且无可见文本会以最低 effort + 双倍预算重试一次（≤4096），仍为空才回退本地草稿，不再直接静默回退。
- provider 拒绝 `temperature`（错误信息含 `temperature` / `unsupported`）时自动去掉该参数重试一次；其它错误不再重试。
- `NO_ADAPTER` / `UNKNOWN_MODEL` / `UNSUPPORTED_REASONING_EFFORT` 映射为中文可操作 reason（分别提示检查 `cordis.patch.yml` 的 `llm-pi-ai models[]` / `llm-pi-ai providers` / 已回退默认推理强度），其它错误保留原文。

### Verified

- `npm test` → **65/65**（新增 14 项 Host 测试：最低 effort 选择、预算翻倍与上限、错误映射、会话模型优先级、max-tokens 重试、temperature 重试、无 prepareCall 回退、缓存 key 含 sessionId）。
- `npm run check` → `index.js` / `client.js` 语法通过，`build:client --check` 确认 7 个 client 源文件与 bundle 一致。
- `npm run eval:pilot` → **30/30** 本地完整草稿用例 + **18/18** Host AI 路由合约（输出预算断言更新为 1600，fake `llm` 按 `configure` 应用控制参数）。
