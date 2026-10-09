# 🍿️ DualSubs: 🔣 Universal

## 本地设置

设置入口为 `https://dualsubs.github.io/settings/`，须将插件参数 `Storage` 设为 `PersistentStore`。

`template/boxjs.panels.json` 与 `template/boxjs.panels.dev.json` 分别保存 [BoxJS 正式](https://github.com/DualSubs/BoxJs/blob/main/DualSubs.BoxJs.json)和[开发](https://github.com/DualSubs/BoxJs/blob/main/DualSubs.BoxJs.beta.json)面板定义。构建逐面板生成原始 JSON 和配置响应脚本，模板逐文件映射；表单、导航与存储 API 由同版 PreferencePanes 提供。

首页 JSON 和真实图标由 `DualSubs.github.io/settings` 维护，站点原样部署 PreferencePanes `v1.3.0` 的 `home.html`；各平台模板使用同版模块页面、入口脚本和固定存储 API。DualSubs 不提供额外 CSS 或 Bridge，使用内置默认功能。开发部署同时上传各面板 JSON 与配置响应脚本到 Gist。

主页提供 Universal、YouTube、Netflix、Spotify、Composite、Translate、External、翻译器 API 和外部源 API 独立入口。外部源 API 是开发配置中的面板；正式配置中该入口不可用。所有设置保留 BoxJS 原存储路径。两个 API 面板共享 `@DualSubs.API.Settings`，重置仅删除各自的配置子树。

开发设置包含外挂字幕选项；其来源在 External 面板选择，字幕文件地址在外部源 API 面板填写。合成脚本读取 External 设置后再合并 Composite，保持已有合成器配置优先级。

在网站仓库运行 `pnpm settings:preview` 可预览开发设置；`SETTINGS_CHANNEL=formal` 切换正式设置。
