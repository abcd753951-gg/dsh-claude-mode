# 浏览器验收夹具（外壳去重）

这套夹具用来验收 1.2.0 的「外壳去重」层在**真实浏览器引擎**里的表现：CSS 特异性、
`flex order` 的真实视觉顺序、`pointer-events` 命中测试、`:hover` / `:focus` 浮现、
`prefers-reduced-motion`、以及卸载后的还原。

夹具执行的 `client.js` 是插件构建产物（`serve.mjs` 把 `/client.js` 映射到仓库根目录的
构建文件），因此测的就是宿主真正加载的那份代码。页面本身不是宿主 App，它是按宿主
源码（`SidebarRoot.tsx` 的 `data-window-drag` / `data-sidebar-toggle` /
`data-copy-version` / `data-sidebar-right-*` 锚点）复刻的最小外壳。

## 运行

```bash
npm run test:browser            # → http://127.0.0.1:55310/shell.html
npm run test:browser -- 55311   # 换端口
```

在任意带 DevTools 的浏览器打开该地址，控制台执行：

```js
await __ACC__.verify()          // → { pass, checks, failures }
```

`verify()` 由浏览器自己测量（`getComputedStyle`、`elementFromPoint`、
`getBoundingClientRect`），不读被测代码的常量，覆盖 30 项断言：

- 四个 `data-ccm-dedupe-*` 开关置位；样式表挂载（33 454 字符）
- 品牌区 `pointer-events: none` / `tabindex=-1` / `aria-disabled=true`，而版本号
  `pointer-events: auto`，命中测试仍落在 `#copyVersion`
- 面板行 `style.order` = `0 / 2 / 1 / 1000`，视觉顺序 插件 → 设计台 → 安全检测 → 更多
  （注册顺序故意与 id 顺序相反，能真正区分「按顺序排」和「按名字排」）
- 取消固定按钮默认 `opacity: 0`，仅在所在行 `:hover` 或自身 `:focus` 时为 `1`
- 右栏展开/收起图标 `matrix(-1, 0, 0, -1, 0, 0)`（rotate 180°，盖掉宿主的
  `scaleX(-1)`），且与左栏图标不再相同
- 无 `console.warn` / `console.error`
- `disposeShell()` 后开关、标记、行内 `order`、`opacity`、图标变换全部回到宿主原样

## 手动项

`verify()` 覆盖不了真实指针：`pointer-events` 的命中测试是合成点查询，`:hover` 需要
浏览器自己跟踪鼠标。驱动侧（Playwright / 人手）多跑一步「悬停某一行」即可，此时
`verify()` 会按浏览器报告的 `:hover` 状态推导期望值，仍应 30/30 通过。

## 已知夹具偏差

- 夹具的 `.logoRow` 带 `-webkit-app-region: drag`（照抄宿主），Electron 里该区域是窗口
  拖拽面；`verify()` 因此不断言「品牌行可点」，只断言按钮本身不再接收事件。
- 夹具里的 `.panelEntry .unpin { opacity: 1 }` 故意比插件的
  `html[data-ccm-dedupe-unpin] [data-ccm-quiet-unpin]` 更难压（0,2,0 vs 0,2,1 的对比
  关系被算成后者胜），用来验证特异性而不是只验证「能显示」。
