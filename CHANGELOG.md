# Changelog

All notable changes to `dsh-claude-mode` are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [SemVer](https://semver.org/).

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
