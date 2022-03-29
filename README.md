# 🍿️ DualSubs
Dual Subtitles for Streaming Media  
流媒体自定义多字幕  
需要启用`重写`、`脚本`、`MitM`功能  
有问题请至Issue页面反馈  
Telegram讨论组:[🍟 整点薯条](https://t.me/GetSomeFries) 

---

- [🍿️ DualSubs](#️-dualsubs)
  - [功能列表](#功能列表)
  - [使用说明](#使用说明)
  - [安装链接](#安装链接)
  - [支持列表](#支持列表)

---

## 功能列表
  1. 官方播放器内提供自定义字幕选项
  2. 自定义启用的第三方字幕种类
  3. 双语官方字幕
  4. 双语翻译字幕
     1. Google翻译
     2. Google Cloud Translate API
     3. Azure/Azure.cn Translator
     4. DeepL Free/Pro
  5. 双语外挂字幕
  6. 中文，英文，西班牙文自动回退
     * 中文回退顺序为`中文（简体）`-`中文（繁體）`-`中文（香港）/粤语（廣東話）`
     * 英文回退顺序为`English (US) [CC]`-`English (US)`-`English (UK)`
     * 西班牙文回退顺序为`Español (Latinoamérica) [CC]`-`Español (Latinoamérica)`-`Español (España) [CC]`-`Español (España)`
  7. 自定义字幕匹配时间戳容差值
  8. 自定义外挂字幕时间戳偏移量

## 使用说明
  * 直接使用
    * 采用默认配置
      * 默认主语言`中文（自动）`，副语言`英文（自动）`
      * 提供中文的平台仅启用`官方字幕`
      * 未提供中文的平台仅启用`Google翻译`
  * 配合`BoxJs`及订阅使用
    1. 安装`BoxJs`插件:
       * Loon: [boxjs.rewrite.loon.plugin](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.loon.plugin "BoxJs")
       * Quantumult X: [boxjs.rewrite.quanx.conf](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.quanx.conf "BoxJs")
       * Surge (Shadowrocket): [boxjs.rewrite.surge.sgmodule](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.surge.sgmodule "BoxJs")
       * Stash: [boxjs.rewrite.stash.stoverride](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.stash.stoverride "BoxJs")
    2. 导入本项目订阅:
       * [DualSubs.box.json](./box/DualSubs.box.json?raw=true "🍿️ DualSubs")


## 安装链接
  * Loon: [DualSubs.plugin](./plugins/DualSubs.plugin?raw=true "🍿️ DualSubs")
  * Quantumult X: [DualSubs.qxrewrite](./qxrewrite/DualSubs.qxrewrite?raw=true "🍿️ DualSubs")
  * Surge (Shadowrocket): [DualSubs.sgmodule](./sgmodules/DualSubs.sgmodule?raw=true "🍿️ DualSubs")
  * Stash: [DualSubs.stoverride](./stoverride/DualSubs.stoverride?raw=true "🍿️ DualSubs")


## 支持列表
|  供应商  |iOS/iPadOS|  tvOS  |  macOS  | Appx | Web | 备注 |
|   :-:   |   :-:   |   :-:   |   :-:   |   :-:   |   :-:   |   :-:   |
|Apple TV+|   ✅   |   ✅   |   ✅   |   N/A   | ✅[^2] |        |
|Apple TV | ✅[^2] | ✅[^2] | ✅[^2] |   N/A   |   N/A   |  [^1]  |
| Disney+ |   ✅   |   ✅   |   N/A   |        |   ✅   |        |
|Amazon<br>Prime Video|   ✅   |   ✅   |   ❌   |        |   ❓   | macOS版App采用TTML格式字幕<br>暂不支持<br>Web版未知原因无法加载 |
| HBO Max |         |         |         |         |         |
|  Hulu   |   ✅   |   ✅   |   N/A   |   N/A   |         |
|         |         |         |         |         |         |

  [^1]: iTunes英文字幕为CC字幕，整合于视频流无法提取，其他语言字幕正常。
  [^2]: Apple TV+ Web版和iTunes资源使用的域名`play.itunes.apple.com`与`App Store`登陆、验证、购买等功能共用域名，MitM可能造成无法访问，故默认未添加此域名,需要iTunes双语的用户请自行添加。
