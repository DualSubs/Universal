### 🐞 Bug Fixes
  * 修复 HBO Max 边缘 CDN `*.e.hbo` 未纳入 MITM 与平台识别规则，导致该域名下的字幕增强无法生效的问题。
  * 修正 `detectPlatform` 中 Prime Video、HBO Max、Paramount+ 与 CBS 的多分支判定，提升不同 CDN 域名下的识别稳定性。
