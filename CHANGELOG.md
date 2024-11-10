### 🛠️ Bug Fixes
  * 修复 `External.Lyrics.response` 发送请求时错误将字符串 `encodeURIComponent` 两次的问题

### 🔣 Dependencies
  * 升级了 `@nsnanocat/util`
    * `$platform` 改为 `$app`
  * 增加了 `@nsnanocat/url`
    * 使用了全新的 `URL` 和 `URLSearchParams` polyfill

### 🔄 Other Changes
  * 重构了 `detectPlatform`
