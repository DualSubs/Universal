# 🍿️ DualSubs: 🔣 Universal

## 本地设置

设置入口为 `https://dualsubs.github.io/settings/`，插件参数 `Storage` 默认使用 `PersistentStore`，优先读取面板或 BoxJS 保存的配置；已安装模块若保留了旧的 `Argument` 值，需手动切换。

`template/boxjs.panels.json` 与 `template/boxjs.panels.dev.json` 分别保存 [BoxJS 正式](https://github.com/DualSubs/BoxJs/blob/main/DualSubs.BoxJs.json)和[开发](https://github.com/DualSubs/BoxJs/blob/main/DualSubs.BoxJs.beta.json)面板名称、说明等内容元数据；字段统一由 `arguments-builder.full.config.ts` 定义，`arguments-builder.PreferencePanes.config.ts` 选择。构建使用 `ArgumentsBuilder.buildBoxJsSettings(scope)` 逐面板生成 JSON，Rollup 生成配置响应脚本，模板逐文件映射；表单、导航与存储 API 由同版 PreferencePanes 提供。

首页 JSON 和真实图标由 `DualSubs.github.io/settings` 维护，站点原样部署 PreferencePanes `v1.3.1` 的 `home.html`；各平台模板只提供配置 JSON（或配置响应脚本）与同版读写 `api.js`，不 Mock 前端资源。DualSubs 不提供额外 CSS 或 Bridge，使用内置默认功能。开发部署同时上传各面板 JSON 与配置响应脚本到 Gist。

主页提供 Universal、YouTube、Netflix、Spotify、Composite、Translate、External、翻译器 API 和外部源 API 独立入口。Universal 只提供自身及共享字幕、API 配置；YouTube、Netflix、Spotify 的配置 JSON 与 `/api/<模块名>` Mock 由各自仓库的模块模板和构建维护，安装对应模块后入口才可用。外部源 API 是开发配置中的面板；正式配置中该入口不可用。所有设置保留 BoxJS 原存储路径。两个 API 面板共享 `@DualSubs.API.Settings`，重置仅删除各自的配置子树。

开发设置包含外挂字幕选项；其来源在 External 面板选择，字幕文件地址在外部源 API 面板填写。合成脚本读取 External 设置后再合并 Composite，保持已有合成器配置优先级。

在网站仓库运行 `pnpm settings:preview` 可预览开发设置；`SETTINGS_CHANNEL=formal` 切换正式设置。

## 构建

`arguments-builder.full.config.ts` 是字段定义来源；`release`、`dev` 和 `PreferencePanes` 配置分别选择模块参数和网页字段，保留原有渠道差异。`npm run check:args` 检查参数类型，`npm run dts` 调用公共库的业务类型生成器。

使用 Node 24，安装依赖后运行 `node node_modules/puppeteer/install.mjs` 安装转换 Egern 所需的 Chrome。`npm run build` 和 `npm run dev` 均先清空 `dist`，生成模块及当前渠道的设置，再用 Rollup 生成独立脚本。开发脚本使用 `.dev.bundle.js`；转换失败或缺少 Egern 文件时构建停止。正式构建后运行 `npm test`，开发构建后运行 `SETTINGS_CHANNEL=dev npm test`，测试不会生成另一渠道产物。

CI 的 build／dev 共用 `.github/actions/node-build/action.yml`。开发部署通过一次 Gist PATCH 更新全部脚本、配置及订阅；正式发布由版本 tag 触发，发布说明读取 `CHANGELOG.md`。

公共库已支持 `Languages[0]` 等索引字段，生成合法的 `Languages` 数组类型；配置生成或 Egern 转换失败会返回非零退出码。
