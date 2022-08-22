# 🍿️ DualSubs
Dual Subtitles for Streaming Media  
流媒体平台字幕增强及双语模块  

<font size=3>**Powered by [Chavy](https://github.com/chavyleung)‘s [Env.js](https://github.com/chavyleung/scripts/blob/master/Env.js) and [BoxJs](https://chavyleung.gitbook.io/boxjs/)**</font>

需要启用`重写`、`脚本`、`MitM`功能  
有问题请至Issue页面反馈  
Telegram讨论组:[🍟 整点薯条](https://t.me/GetSomeFries) 

---

- [🍿️ DualSubs](#️-dualsubs)
  - [功能列表](#功能列表)
  - [使用说明](#使用说明)
    - [配置方法](#配置方法)
    - [配置说明](#配置说明)
  - [安装链接](#安装链接)
    - [🍿️ DualSubs for Streaming Media Platform](#️-dualsubs-for-streaming-media-platform)
    - [🍿️ DualSubs for YouTube](#️-dualsubs-for-youtube)
  - [How To](#how-to)
  - [支持列表](#支持列表)

---

## 功能列表
  1. 官方播放器内提供自定义字幕选项
     * 对于不兼容的播放器，提供了一个字幕选项，用来强制替换字幕为指定字幕类型。
  2. 自定义启用的第三方字幕种类
  3. 双语官方字幕
  4. 双语翻译字幕
     1. Google翻译
     2. [Google Cloud Translate API](https://cloud.google.com/translate)
     3. Azure/Azure.cn Translator
        1. [国际版](https://azure.microsoft.com/zh-cn/services/cognitive-services/translator/)
        2. [中国版](https://www.azure.cn)
     4. [DeepL Free/Pro](https://www.deepl.com/pro-api)
  5. 双语外挂字幕
  6. 中文，英文，西班牙文自动回退
     * `中文（自动）`回退顺序为`中文（简体）`-`中文（繁體）`-`中文（香港）/粤语（廣東話）`
     * `英文（自动）`回退顺序为`English (US) [CC]`-`English (US)`-`English (UK)`
     * `西班牙文（自动）`回退顺序为`Español (Latinoamérica) [CC]`-`Español (Latinoamérica)`-`Español (España) [CC]`-`Español (España)`
  7. 自定义字幕匹配时间戳容差值
  8. 自定义外挂字幕时间戳偏移量
  9. 翻译字幕模式支持`逐段翻译`（默认）和`逐行翻译`
     * `逐段翻译`对于大分段的字幕文件的平台（如：HBO Max）响应更快，翻译效果更好，利于限制使用频率的翻译API。

## 使用说明
### 配置方法
  * 方法1: 直接使用
    * 采用默认配置
      * 默认主语言`中文（自动）`，副语言`英文（自动）`
      * 提供官方中文的平台的语言选项为`官方字幕`和`Google翻译`
      * 未提供中文的平台的语言选项为`Google翻译`
      * 不兼容[^4]平台的替换语言选项为`Google翻译`
  * 方法2: 配合`BoxJs`及订阅使用
    1. 安装`BoxJs`插件并更新引用资源或脚本:
       * Loon: [boxjs.rewrite.loon.plugin](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.loon.plugin "BoxJs")
       * Quantumult X: [boxjs.rewrite.quanx.conf](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.quanx.conf "BoxJs")
       * Surge (Shadowrocket): [boxjs.rewrite.surge.sgmodule](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.surge.sgmodule "BoxJs")
       * Stash: [boxjs.rewrite.stash.stoverride](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.stash.stoverride "BoxJs")
    2. 浏览器访问[BoxJs.com](http://boxjs.com)，在[`订阅`](http://boxjs.com/#/sub)页面点击`+`添加本项目订阅:
       * [DualSubs.box.json](./box/DualSubs.box.json?raw=true "🍿️ DualSubs")

### 配置说明
  * 配合`BoxJs`及订阅使用
    1. 浏览器访问[BoxJs.com](http://boxjs.com)
    2. 在[`应用`](http://boxjs.com/#/app)页面点开`DualSubs`折叠
    3. 根据需要配置每个流媒体平台的设置
       1. `字幕类型`为多选框，多选保存后，对应APP中的`字幕`选项也会增加对应的字幕选项
       2. `首选语言`为主语言，对应第一行字幕语言
       3. `次选语言`为副语言，对应第二行字幕语言
       4. 需在`字幕类型`中勾选`外部字幕`,`外部字幕文件URL`中填写的字幕文件才会生效（需要为绝对路径，支持WebVTT, SRT）
       5. `外部字幕偏移量`为内置字幕时间轴矫正功能，时间单位为毫秒，正负整数，可以用来省略第三方字幕转换器
       6. `播放记录缓存数量`提供设置数量的复数缓存空间，当你的设备同时为局域网内多个设备提供流媒体平台字幕增强功能时，保证字幕数据不会错乱，同时对于`Disney+`这种自带长期缓存的流媒体平台，提供更好的兼容性
       7. `时间戳公差`为`官方字幕`或`外部字幕`匹配时，每句字幕匹配时的时间容差，因同平台同视频不同语言字幕往往交付不同翻译人员进行翻译，相同台词的时间戳可能有0.5秒-1.5秒乃至更多的误差，或者一句台词对应另外一种语言多句台词的情况，`时间戳公差`值会将此误差范围的台词视为同一句台词进行合并，且支持一句台词对多句台词合并
    4. (可选)在`DualSubs: Verify`中配置第三方API验证信息
    5. (可选)在`DualSubs: Advanced Options`中配置高级设置

## 安装链接
### 🍿️ DualSubs for Streaming Media Platform
  * 因v0.7版结构升级，旧版用户请清空[`DualSubs在BoxJs的全部设置`](https://github.com/DualSubs/DualSubs/wiki/在BoxJs中清除DualSubs的储存数据#清除全部储存数据)后重新设置
  * 本模块不含YouTube平台支持，如需要请单独下载
  * Loon: [DualSubs.plugin](./plugin/DualSubs.plugin?raw=true "🍿️ DualSubs for Streaming Media Platform")
  * Quantumult X: [DualSubs.qxrewrite](./qxrewrite/DualSubs.qxrewrite?raw=true "🍿️ DualSubs for Streaming Media Platform")
  * Surge (Shadowrocket): [DualSubs.sgmodule](./sgmodule/DualSubs.sgmodule?raw=true "🍿️ DualSubs for Streaming Media Platform")
  * Stash: [DualSubs.stoverride](./stoverride/DualSubs.stoverride?raw=true "🍿️ DualSubs for Streaming Media Platform")

### 🍿️ DualSubs for YouTube
  * 支持`Web端`的`播放器`全翻译语言选项解锁及双语言
  * 支持`Web端`和`移动端`有字幕视频的`自动翻译`(不支持`自动生成`的听译字幕)
    * 当选择任意语言`普通字幕`时，双语字幕`首选语言`均为BoxJs中设置的`首选语言`且为翻译字幕（暂未做官方字幕查询）
    * 当选择`自动翻译`中的`翻译字幕`时，双语字幕分别为`原语言`及`目标语言`
  * 注：本插件不适用于`tvOS`上的YouTube app（无法MitM`tvOS`上的`www.youtube.com`）
  * Loon: [DualSubs.YouTube.plugin](./plugin/DualSubs.YouTube.plugin?raw=true "🍿️ DualSubs for YouTube")
  * Quantumult X: [DualSubs.YouTube.qxrewrite](./qxrewrite/DualSubs.YouTube.qxrewrite?raw=true "🍿️ DualSubs for YouTube")
  * Surge (Shadowrocket): [DualSubs.YouTube.sgmodule](./sgmodule/DualSubs.YouTube.sgmodule?raw=true "🍿️ DualSubs for YouTube")
  * Stash: [DualSubs.YouTube.stoverride](./stoverride/DualSubs.YouTube.stoverride?raw=true "🍿️ DualSubs for YouTube")

## How To
  * [快速创建拥有代理服务器设置及MitM证书的描述文件](https://github.com/DualSubs/DualSubs/wiki/快速创建拥有代理服务器设置及MitM证书的描述文件)
  * [在Apple TV (tvOS) 上添加描述文件或MitM证书](https://github.com/DualSubs/DualSubs/wiki/在Apple-TV-(tvOS)-上添加描述文件或MitM证书)
  * [在BoxJs中清除DualSubs的设置或缓存](https://github.com/DualSubs/DualSubs/wiki/在BoxJs中清除DualSubs的储存数据)

## 支持列表
  * 图例:
    * 完全支持: ✅
    * 兼容: ☑️
    * 未来会支持: 🔜
    * 不明/未测试: ❓
    * 不支持: ❌
    * 无此类型: N/A
  * 提示: 以下图例可点击后直达下载链接或网站

|  供应商  |iOS/iPadOS|  tvOS  |  macOS  | Appx | Android | Web | 备注 |
|   :-:   |   :-:   |   :-:   |   :-:   |   :-:   |   :-:   |   :-:   |   :-:   |
| YouTube |   ☑️[^7]   |   ❌[^8]   |   N/A   |   N/A   |   ❓   |   ✅   |        |
|Apple TV+|   [✅](https://apps.apple.com/hk/app/apple-tv/id1174078549)   |   [✅](https://apps.apple.com/hk/app/apple-tv/id1174078549?platform=appleTV)   |   ✅[^5]   |   N/A   |   ❓   |   [✅](https://tv.apple.com/)[^2]   |   Apple TV app中的订阅内容   |
|Apple TV |   [✅](https://apps.apple.com/hk/app/apple-tv/id1174078549)[^2]   |   [✅](https://apps.apple.com/hk/app/apple-tv/id1174078549?platform=appleTV)[^2]   |   ✅[^2][^5]   |   N/A   |   ❓   |   N/A   |   Apple TV app中的购买与租借内容[^1]   |
|Apple Fitness| [✅](https://apps.apple.com/cn/app/fitness/id1208224953)[^2] |   ✅[^2]   |   N/A   |   N/A   |   ❓   |   N/A   | [^1] |
| Disney+ |   [✅](https://apps.apple.com/hk/app/disney/id1446075923)   |   [✅](https://apps.apple.com/hk/app/disney/id1446075923?platform=appleTV)   |   N/A   |   [✅](https://www.microsoft.com/zh-cn/p/disney/9nxqxxlfst89)   |   ✅   |   [✅](https://www.disneyplus.com/)   |        |
|Prime Video|   [✅](https://apps.apple.com/hk/app/amazon-prime-video/id545519333)   |   [✅](https://apps.apple.com/hk/app/amazon-prime-video/id545519333?platform=appleTV)   |   [✅](https://apps.apple.com/hk/app/amazon-prime-video/id545519333)   |   [🔜](https://www.microsoft.com/zh-cn/p/amazon-prime-video-for-windows/9p6rc76msmmj?activetab=pivot:overviewtab)[^3]   |   🔜[^3]   |   [🔜](https://www.primevideo.com)[^3]   |   包含Prime Video Channel   |
| HBO Max |   [☑️](https://apps.apple.com/us/app/hbo-max-stream-tv-movies/id971265422)[^4]   |   [✅](https://apps.apple.com/us/app/hbo-max-stream-tv-movies/id971265422?platform=appleTV)   |   N/A   |   [❓](https://www.microsoft.com/zh-cn/p/hbo-max/9pjj1k9dzmrs)   |   ❓   |   [☑️](https://play.hbomax.com)[^4]   |        |
|  Hulu   |   [✅](https://apps.apple.com/us/app/hulu-watch-tv-series-movies/id376510438)   |   [✅](https://apps.apple.com/us/app/hulu-watch-tv-series-movies/id376510438?platform=appleTV)   |   N/A   |   N/A   |   ❓   |   [🔜](https://www.hulu.com/)[^6]   |        |
|Paramount+|   [✅](https://apps.apple.com/us/app/paramount/id530168168)   |   [✅](https://apps.apple.com/us/app/paramount/id530168168?platform=appleTV)   |   N/A   |   ❓   |   ❓   |   [✅](https://www.paramountplus.com/)   | 包含部分Live TV |
|Discovery+<br>Philippines|   [✅](https://apps.apple.com/ph/app/discovery-stream-tv-shows/id1574345720)   |   ❓   |   ❓   |   ❓   |   ❓   |   [✅](https://www.discoveryplus.com/ph/)   |        |
|Peacock TV|   [☑️](https://apps.apple.com/us/app/peacock-tv-stream-tv-movies/id1508186374)[^4]   |   [❓](https://apps.apple.com/us/app/peacock-tv-stream-tv-movies/id1508186374?platform=appleTV)   |   N/A   |   [❓](https://www.microsoft.com/zh-cn/p/peacocktv/9pl67r4p9pg5?activetab=pivot:overviewtab)   |   ❓   |   [☑️](https://www.peacocktv.com/)[^4]   |        |
|  fuboTV  |   [✅](https://apps.apple.com/us/app/fubotv-watch-live-sports-tv/id905401434)   |   [✅](https://apps.apple.com/us/app/fubotv-watch-live-sports-tv/id905401434?platform=appleTV)   |   N/A   |   ❓   |   ❓   |   [✅](https://www.fubo.tv/)   | 仅点播(On Demand)节目<br>无专用面板，请使用通用面板 |
|   TED   |   [☑️](https://apps.apple.com/hk/app/ted/id376183339)   |   [✅](https://apps.apple.com/hk/app/ted/id376183339?platform=appleTV)   |   N/A   |   ❓   |   ❓   |   [☑️](https://www.ted.com)   | 无专用面板，请使用通用面板 |
| BBC iPlayer |   [🔜](https://apps.apple.com/gb/app/bbc-iplayer/id416580485)[^3]   |   [🔜](https://apps.apple.com/gb/app/bbc-iplayer/id416580485?platform=appleTV)[^3]   |         |         |         |   [🔜](https://www.bbc.co.uk/iplayer)[^3]   | iPlayer与BritBox共用资源<br>无专用面板，请使用通用面板 |
|  BritBox  |   [🔜](https://apps.apple.com/us/app/britbox-by-bbc-itv/id1206838907)[^3]   |   [✅](https://apps.apple.com/us/app/britbox-by-bbc-itv/id1206838907?platform=appleTV)   |   N/A   |         |         |   [🔜](https://www.britbox.com/)[^3]   | iPlayer与BritBox共用资源<br>无专用面板，请使用通用面板 |
| BritBox UK |   [☑️](https://apps.apple.com/gb/app/britbox-uk/id1459650701)   |   [✅](https://apps.apple.com/gb/app/britbox-uk/id1459650701?platform=appleTV)   |   N/A   |         |         |   [❓](https://www.britbox.co.uk)   | BritBox与BritBox UK非同一APP<br>无专用面板，请使用通用面板 |
|  StarZ  |   ☑️   |   ❓   |   ❓   |   ❓   |   ❓   |   ✅   | 无专用面板，请使用通用面板 |
|         |         |         |         |         |         |        |        |

  [^1]: 此平台部分字幕为[隐藏字幕[CC]](https://zh.wikipedia.org/wiki/隱藏字幕)，整合于视频流无法提取，其他语言字幕正常。
  [^2]: 此平台资源使用的域名`play.itunes.apple.com`与`App Store`登陆、验证、购买等功能共用域名，MitM可能造成无法访问，故默认未添加此域名，需要此平台双语的用户请自行添加`play.itunes.apple.com`至MitM域名列表。
  [^3]: 此平台字幕采用[TTML2](https://www.w3.org/TR/2018/REC-ttml2-20181108/)格式字幕，暂不支持
  [^4]: 此平台字幕选项为硬编码，需要在BoxJs中对应平台的`字幕类型（兼容）`选项选择一个替换用字幕类型
  [^5]: 采用旧版`AVPlayerViewController`播放器UI界面，自定义字幕名称会被强制显示为固定名称，比如多个名称为`简体中文`的选项，依次为原始字幕选项及BoxJs中开启的字幕选项，除显示的名称固定外，字幕选项功能正常。
  [^6]: 此平台字幕采用[SAMI](https://docs.microsoft.com/zh-cn/previous-versions/windows/desktop/dnacc/understanding-sami-1.0?redirectedfrom=MSDN)格式字幕，暂不支持
  [^7]: 此平台使用protobuf序列化数据，需要等待反序列化完成
  [^8]: 此平台并非使用HTTPS或HTTPS over TCP传输数据流，暂无MitM修改方法
