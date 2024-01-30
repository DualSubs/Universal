/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Lyrics.External.response.beta.js":
/*!**********************************************!*\
  !*** ./src/Lyrics.External.response.beta.js ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

var _database_Database_json__WEBPACK_IMPORTED_MODULE_5___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ENV/ENV.mjs */ "./src/ENV/ENV.mjs");
/* harmony import */ var _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./URI/URI.mjs */ "./src/URI/URI.mjs");
/* harmony import */ var _function_setENV_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./function/setENV.mjs */ "./src/function/setENV.mjs");
/* harmony import */ var _function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./function/detectPlatform.mjs */ "./src/function/detectPlatform.mjs");
/* harmony import */ var _function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function/detectFormat.mjs */ "./src/function/detectFormat.mjs");
/* harmony import */ var _database_Database_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./database/Database.json */ "./src/database/Database.json");
/* module decorator */ module = __webpack_require__.hmd(module);
/*
README: https://github.com/DualSubs
*/










const $ = new _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("🍿️ DualSubs: 🔣 Universal v1.5.1(2) Lyrics.External.response.beta");
const URI = new _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]();
const LRC = new LRCs();

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ ${$.name}`, `URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, "");
// 获取平台
const PLATFORM = (0,_function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_3__["default"])(HOST);
$.log(`⚠ ${$.name}, PLATFORM: ${PLATFORM}`, "");
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = (0,_function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_4__["default"])(URL, $response?.body);
$.log(`⚠ ${$.name}, FORMAT: ${FORMAT}`, "");
(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = (0,_function_setENV_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "External", "API"], /*#__PURE__*/ (_database_Database_json__WEBPACK_IMPORTED_MODULE_5___namespace_cache || (_database_Database_json__WEBPACK_IMPORTED_MODULE_5___namespace_cache = __webpack_require__.t(_database_Database_json__WEBPACK_IMPORTED_MODULE_5__, 2))));
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = URL.query?.subtype ?? Settings.Type, Languages = [URL.query?.lang?.toUpperCase?.() ?? Settings.Languages[0], (URL.query?.tlang ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ ${$.name}, Type: ${Type}, Languages: ${Languages}`, "");
			// 查询缓存
			const trackId = PATHs?.[3];
			$.log(`🚧 ${$.name}, 调试信息`, `trackId: ${trackId}`, "");
			const trackInfo = Caches.Metadatas.Tracks.get(trackId);
			$.log(`🚧 ${$.name}, 调试信息`, `trackInfo: ${JSON.stringify(trackInfo)}`, "");
			if (trackInfo && !FORMAT) FORMAT = $request?.headers?.Accept ?? $request?.headers?.accept;
			// 创建空数据
			let body = {};
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				case "text/html":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					//body = M3U8.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					//body = XML.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					switch (PLATFORM) {
						case "YouTube":
							break;
						case "Spotify":
							body = await injectionLyric(Settings.LrcVendor, trackInfo, body);
							if (!$response?.headers?.["Content-Type"] && $response?.headers?.["content-type"]) $response.headers["Content-Type"] = FORMAT;								$response.headers["Content-Type"] = FORMAT;
							$response.status = ($.isQuanX()) ? "HTTP/1.1 200 OK" : 200;
							break;
					};
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					$response.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "applecation/octet-stream":
					//$.log(`🚧 ${$.name}`, `$response.body: ${JSON.stringify($response.body)}`, "");
					let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					//$.log(`🚧 ${$.name}`, `isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
					/******************  initialization start  *******************/
					// timostamm/protobuf-ts 2.9.0
					// text-decoder
					!function(i){"use strict";function _(n,e,i){return e<=n&&n<=i} true&&module.exports&&!i["encoding-indexes"]&&(i["encoding-indexes"]=Object(function webpackMissingModule() { var e = new Error("Cannot find module './encoding-indexes.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));var l=Math.floor;function s(n){if(void 0===n)return{};if(n===Object(n))return n;throw TypeError("Could not convert argument to dictionary")}function u(n){return 0<=n&&n<=127}var a=u,b=-1;function c(n){this.tokens=[].slice.call(n),this.tokens.reverse()}c.prototype={endOfStream:function(){return!this.tokens.length},read:function(){return this.tokens.length?this.tokens.pop():b},prepend:function(n){if(Array.isArray(n))for(var e=n;e.length;)this.tokens.push(e.pop());else this.tokens.push(n)},push:function(n){if(Array.isArray(n))for(var e=n;e.length;)this.tokens.unshift(e.shift());else this.tokens.unshift(n)}};var w=-1;function m(n,e){if(n)throw TypeError("Decoder error");return e||65533}function f(n){throw TypeError("The code point "+n+" could not be encoded.")}function r(n){return n=String(n).trim().toLowerCase(),Object.prototype.hasOwnProperty.call(d,n)?d[n]:null}var t,o,n=[{encodings:[{labels:["unicode-1-1-utf-8","utf-8","utf8"],name:"UTF-8"}],heading:"The Encoding"},{encodings:[{labels:["866","cp866","csibm866","ibm866"],name:"IBM866"},{labels:["csisolatin2","iso-8859-2","iso-ir-101","iso8859-2","iso88592","iso_8859-2","iso_8859-2:1987","l2","latin2"],name:"ISO-8859-2"},{labels:["csisolatin3","iso-8859-3","iso-ir-109","iso8859-3","iso88593","iso_8859-3","iso_8859-3:1988","l3","latin3"],name:"ISO-8859-3"},{labels:["csisolatin4","iso-8859-4","iso-ir-110","iso8859-4","iso88594","iso_8859-4","iso_8859-4:1988","l4","latin4"],name:"ISO-8859-4"},{labels:["csisolatincyrillic","cyrillic","iso-8859-5","iso-ir-144","iso8859-5","iso88595","iso_8859-5","iso_8859-5:1988"],name:"ISO-8859-5"},{labels:["arabic","asmo-708","csiso88596e","csiso88596i","csisolatinarabic","ecma-114","iso-8859-6","iso-8859-6-e","iso-8859-6-i","iso-ir-127","iso8859-6","iso88596","iso_8859-6","iso_8859-6:1987"],name:"ISO-8859-6"},{labels:["csisolatingreek","ecma-118","elot_928","greek","greek8","iso-8859-7","iso-ir-126","iso8859-7","iso88597","iso_8859-7","iso_8859-7:1987","sun_eu_greek"],name:"ISO-8859-7"},{labels:["csiso88598e","csisolatinhebrew","hebrew","iso-8859-8","iso-8859-8-e","iso-ir-138","iso8859-8","iso88598","iso_8859-8","iso_8859-8:1988","visual"],name:"ISO-8859-8"},{labels:["csiso88598i","iso-8859-8-i","logical"],name:"ISO-8859-8-I"},{labels:["csisolatin6","iso-8859-10","iso-ir-157","iso8859-10","iso885910","l6","latin6"],name:"ISO-8859-10"},{labels:["iso-8859-13","iso8859-13","iso885913"],name:"ISO-8859-13"},{labels:["iso-8859-14","iso8859-14","iso885914"],name:"ISO-8859-14"},{labels:["csisolatin9","iso-8859-15","iso8859-15","iso885915","iso_8859-15","l9"],name:"ISO-8859-15"},{labels:["iso-8859-16"],name:"ISO-8859-16"},{labels:["cskoi8r","koi","koi8","koi8-r","koi8_r"],name:"KOI8-R"},{labels:["koi8-ru","koi8-u"],name:"KOI8-U"},{labels:["csmacintosh","mac","macintosh","x-mac-roman"],name:"macintosh"},{labels:["dos-874","iso-8859-11","iso8859-11","iso885911","tis-620","windows-874"],name:"windows-874"},{labels:["cp1250","windows-1250","x-cp1250"],name:"windows-1250"},{labels:["cp1251","windows-1251","x-cp1251"],name:"windows-1251"},{labels:["ansi_x3.4-1968","ascii","cp1252","cp819","csisolatin1","ibm819","iso-8859-1","iso-ir-100","iso8859-1","iso88591","iso_8859-1","iso_8859-1:1987","l1","latin1","us-ascii","windows-1252","x-cp1252"],name:"windows-1252"},{labels:["cp1253","windows-1253","x-cp1253"],name:"windows-1253"},{labels:["cp1254","csisolatin5","iso-8859-9","iso-ir-148","iso8859-9","iso88599","iso_8859-9","iso_8859-9:1989","l5","latin5","windows-1254","x-cp1254"],name:"windows-1254"},{labels:["cp1255","windows-1255","x-cp1255"],name:"windows-1255"},{labels:["cp1256","windows-1256","x-cp1256"],name:"windows-1256"},{labels:["cp1257","windows-1257","x-cp1257"],name:"windows-1257"},{labels:["cp1258","windows-1258","x-cp1258"],name:"windows-1258"},{labels:["x-mac-cyrillic","x-mac-ukrainian"],name:"x-mac-cyrillic"}],heading:"Legacy single-byte encodings"},{encodings:[{labels:["chinese","csgb2312","csiso58gb231280","gb2312","gb_2312","gb_2312-80","gbk","iso-ir-58","x-gbk"],name:"GBK"},{labels:["gb18030"],name:"gb18030"}],heading:"Legacy multi-byte Chinese (simplified) encodings"},{encodings:[{labels:["big5","big5-hkscs","cn-big5","csbig5","x-x-big5"],name:"Big5"}],heading:"Legacy multi-byte Chinese (traditional) encodings"},{encodings:[{labels:["cseucpkdfmtjapanese","euc-jp","x-euc-jp"],name:"EUC-JP"},{labels:["csiso2022jp","iso-2022-jp"],name:"ISO-2022-JP"},{labels:["csshiftjis","ms932","ms_kanji","shift-jis","shift_jis","sjis","windows-31j","x-sjis"],name:"Shift_JIS"}],heading:"Legacy multi-byte Japanese encodings"},{encodings:[{labels:["cseuckr","csksc56011987","euc-kr","iso-ir-149","korean","ks_c_5601-1987","ks_c_5601-1989","ksc5601","ksc_5601","windows-949"],name:"EUC-KR"}],heading:"Legacy multi-byte Korean encodings"},{encodings:[{labels:["csiso2022kr","hz-gb-2312","iso-2022-cn","iso-2022-cn-ext","iso-2022-kr"],name:"replacement"},{labels:["utf-16be"],name:"UTF-16BE"},{labels:["utf-16","utf-16le"],name:"UTF-16LE"},{labels:["x-user-defined"],name:"x-user-defined"}],heading:"Legacy miscellaneous encodings"}],d={},h=(n.forEach(function(n){n.encodings.forEach(function(e){e.labels.forEach(function(n){d[n]=e})})}),{}),g={};function y(n,e){return e&&e[n]||null}function p(n,e){e=e.indexOf(n);return-1===e?null:e}function v(n){if("encoding-indexes"in i)return i["encoding-indexes"][n];throw Error("Indexes missing. Did you forget to include encoding-indexes.js first?")}var x="utf-8";function O(n,e){if(!(this instanceof O))throw TypeError("Called as a function. Did you forget 'new'?");n=void 0!==n?String(n):x,e=s(e),this._encoding=null,this._decoder=null,this._ignoreBOM=!1,this._BOMseen=!1,this._error_mode="replacement",this._do_not_flush=!1;var i=r(n);if(null===i||"replacement"===i.name)throw RangeError("Unknown encoding: "+n);if(g[i.name])return(n=this)._encoding=i,Boolean(e.fatal)&&(n._error_mode="fatal"),Boolean(e.ignoreBOM)&&(n._ignoreBOM=!0),Object.defineProperty||(this.encoding=n._encoding.name.toLowerCase(),this.fatal="fatal"===n._error_mode,this.ignoreBOM=n._ignoreBOM),n;throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?")}function k(n,e){if(!(this instanceof k))throw TypeError("Called as a function. Did you forget 'new'?");e=s(e),this._encoding=null,this._encoder=null,this._do_not_flush=!1,this._fatal=Boolean(e.fatal)?"fatal":"replacement";if(Boolean(e.NONSTANDARD_allowLegacyEncoding)){e=r(n=void 0!==n?String(n):x);if(null===e||"replacement"===e.name)throw RangeError("Unknown encoding: "+n);if(!h[e.name])throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?");this._encoding=e}else this._encoding=r("utf-8"),void 0!==n&&"console"in i&&console.warn("TextEncoder constructor called with encoding label, which is ignored.");return Object.defineProperty||(this.encoding=this._encoding.name.toLowerCase()),this}function e(n){var r=n.fatal,t=0,o=0,s=0,l=128,a=191;this.handler=function(n,e){if(e===b&&0!==s)return s=0,m(r);if(e===b)return w;if(0===s){if(_(e,0,127))return e;if(_(e,194,223))s=1,t=31&e;else if(_(e,224,239))224===e&&(l=160),237===e&&(a=159),s=2,t=15&e;else{if(!_(e,240,244))return m(r);240===e&&(l=144),244===e&&(a=143),s=3,t=7&e}return null}var i;return _(e,l,a)?(l=128,a=191,t=t<<6|63&e,(o+=1)!==s?null:(i=t,t=s=o=0,i)):(t=s=o=0,l=128,a=191,n.prepend(e),m(r))}}function E(n){n.fatal;this.handler=function(n,e){if(e===b)return w;if(a(e))return e;_(e,128,2047)?(i=1,r=192):_(e,2048,65535)?(i=2,r=224):_(e,65536,1114111)&&(i=3,r=240);for(var i,r,t=[(e>>6*i)+r];0<i;)t.push(128|63&e>>6*(i-1)),--i;return t}}function j(i,n){var r=n.fatal;this.handler=function(n,e){return e===b?w:u(e)?e:null===(e=i[e-128])?m(r):e}}function B(r,n){n.fatal;this.handler=function(n,e){var i;return e===b?w:a(e)?e:(null===(i=p(e,r))&&f(e),i+128)}}function S(n){var o=n.fatal,s=0,l=0,a=0;this.handler=function(n,e){var i,r,t;return e===b&&0===s&&0===l&&0===a?w:(e!==b||0===s&&0===l&&0===a||(a=l=s=0,m(o)),0!==a?(i=null,_(e,48,57)&&(i=function(n){if(39419<n&&n<189e3||1237575<n)return null;if(7457===n)return 59335;for(var e=0,i=0,r=v("gb18030-ranges"),t=0;t<r.length;++t){var o=r[t];if(!(o[0]<=n))break;e=o[0],i=o[1]}return i+n-e}(10*(126*(10*(s-129)+l-48)+a-129)+e-48)),r=[l,a,e],a=l=s=0,null===i?(n.prepend(r),m(o)):i):0!==l?_(e,129,254)?(a=e,null):(n.prepend([l,e]),l=s=0,m(o)):0!==s?_(e,48,57)?(l=e,null):(r=s,s=0,(t=null)===(i=null===(t=_(e,64,126)||_(e,128,254)?190*(r-129)+(e-(e<127?64:65)):t)?null:y(t,v("gb18030")))&&u(e)&&n.prepend(e),null===i?m(o):i):u(e)?e:128===e?8364:_(e,129,254)?(s=e,null):m(o))}}function T(n,t){n.fatal;this.handler=function(n,e){var i,r;return e===b?w:a(e)?e:58853===e?f(e):t&&8364===e?128:null!==(i=p(e,v("gb18030")))?(r=i%190,[l(i/190)+129,r+(r<63?64:65)]):t?f(e):(i=function(n){if(59335===n)return 7457;for(var e=0,i=0,r=v("gb18030-ranges"),t=0;t<r.length;++t){var o=r[t];if(!(o[1]<=n))break;e=o[1],i=o[0]}return i+n-e}(e),[(r=l(i/10/126/10))+129,(e=l((i-=10*r*126*10)/10/126))+48,(r=l((i-=10*e*126)/10))+129,48+(i-10*r)])}}function I(n){var t=n.fatal,o=0;this.handler=function(n,e){if(e===b&&0!==o)return o=0,m(t);if(e===b&&0===o)return w;if(0===o)return u(e)?e:_(e,129,254)?(o=e,null):m(t);var i=o,r=null;switch(o=0,r=_(e,64,126)||_(e,161,254)?157*(i-129)+(e-(e<127?64:98)):r){case 1133:return[202,772];case 1135:return[202,780];case 1164:return[234,772];case 1166:return[234,780]}i=null===r?null:y(r,v("big5"));return null===i&&u(e)&&n.prepend(e),null===i?m(t):i}}function U(n){n.fatal;this.handler=function(n,e){var i,r;return e===b?w:a(e)?e:(i=e,r=o=o||v("big5").map(function(n,e){return e<5024?null:n}),null===(i=9552===i||9566===i||9569===i||9578===i||21313===i||21317===i?r.lastIndexOf(i):p(i,r))||(r=l(i/157)+129)<161?f(e):[r,(e=i%157)+(e<63?64:98)])}}function C(n){var t=n.fatal,o=!1,s=0;this.handler=function(n,e){var i,r;return e===b&&0!==s?(s=0,m(t)):e===b&&0===s?w:142===s&&_(e,161,223)?(s=0,65216+e):143===s&&_(e,161,254)?(o=!0,s=e,null):0!==s?(i=s,s=0,r=null,_(i,161,254)&&_(e,161,254)&&(r=y(94*(i-161)+(e-161),v(o?"jis0212":"jis0208"))),o=!1,_(e,161,254)||n.prepend(e),null===r?m(t):r):u(e)?e:142===e||143===e||_(e,161,254)?(s=e,null):m(t)}}function P(n){n.fatal;this.handler=function(n,e){var i;return e===b?w:a(e)?e:165===e?92:8254===e?126:_(e,65377,65439)?[142,e-65377+161]:null===(i=p(e=8722===e?65293:e,v("jis0208")))?f(e):[l(i/94)+161,i%94+161]}}function D(n){var t=n.fatal,o=0,s=1,l=2,a=3,u=4,c=5,f=6,d=o,h=o,g=0,p=!1;this.handler=function(n,e){switch(d){default:case o:return 27===e?(d=c,null):_(e,0,127)&&14!==e&&15!==e&&27!==e?(p=!1,e):e===b?w:(p=!1,m(t));case s:return 27===e?(d=c,null):92===e?(p=!1,165):126===e?(p=!1,8254):_(e,0,127)&&14!==e&&15!==e&&27!==e&&92!==e&&126!==e?(p=!1,e):e===b?w:(p=!1,m(t));case l:return 27===e?(d=c,null):_(e,33,95)?(p=!1,65344+e):e===b?w:(p=!1,m(t));case a:return 27===e?(d=c,null):_(e,33,126)?(p=!1,g=e,d=u,null):e===b?w:(p=!1,m(t));case u:if(27===e)d=c;else{if(_(e,33,126))return d=a,null===(i=y(94*(g-33)+e-33,v("jis0208")))?m(t):i;e===b?(d=a,n.prepend(e)):d=a}return m(t);case c:return 36===e||40===e?(g=e,d=f,null):(n.prepend(e),p=!1,d=h,m(t));case f:var i=g,r=(g=0,null);return(40===i&&66===e&&(r=o),40===i&&74===e&&(r=s),40===i&&73===e&&(r=l),null!==(r=36!==i||64!==e&&66!==e?r:a))?(d=r,r=p,p=!0,r?m(t):null):(n.prepend([i,e]),p=!1,d=h,m(t))}}}function F(n){n.fatal;var r=0,t=1,o=2,s=r;this.handler=function(n,e){if(e===b&&s!==r)return n.prepend(e),s=r,[27,40,66];if(e===b&&s===r)return w;if(!(s!==r&&s!==t||14!==e&&15!==e&&27!==e))return f(65533);if(s===r&&a(e))return e;if(s===t&&(a(e)&&92!==e&&126!==e||165==e||8254==e)){if(a(e))return e;if(165===e)return 92;if(8254===e)return 126}var i;return a(e)&&s!==r?(n.prepend(e),s=r,[27,40,66]):165!==e&&8254!==e||s===t?null===(i=p(e=8722===e?65293:e,v("jis0208")))?f(e):s!==o?(n.prepend(e),s=o,[27,36,66]):[l(i/94)+33,i%94+33]:(n.prepend(e),s=t,[27,40,74])}}function J(n){var t=n.fatal,o=0;this.handler=function(n,e){var i,r;return e===b&&0!==o?(o=0,m(t)):e===b&&0===o?w:0!==o?(r=o,i=null,o=0,(_(e,64,126)||_(e,128,252))&&(i=188*(r-(r<160?129:193))+e-(e<127?64:65)),_(i,8836,10715)?48508+i:(null===(r=null===i?null:y(i,v("jis0208")))&&u(e)&&n.prepend(e),null===r?m(t):r)):u(e)||128===e?e:_(e,161,223)?65216+e:_(e,129,159)||_(e,224,252)?(o=e,null):m(t)}}function K(n){n.fatal;this.handler=function(n,e){var i;return e===b?w:a(e)||128===e?e:165===e?92:8254===e?126:_(e,65377,65439)?e-65377+161:(i=e=8722===e?65293:e,null===(i=(t=t||v("jis0208").map(function(n,e){return _(e,8272,8835)?null:n})).indexOf(i))?f(e):[(e=l(i/188))+(e<31?129:193),(e=i%188)+(e<63?64:65)])}}function R(n){var t=n.fatal,o=0;this.handler=function(n,e){var i,r;return e===b&&0!==o?(o=0,m(t)):e===b&&0===o?w:0!==o?(r=o,o=0,r=(i=null)===(i=_(e,65,254)?190*(r-129)+(e-65):i)?null:y(i,v("euc-kr")),null===i&&u(e)&&n.prepend(e),null===r?m(t):r):u(e)?e:_(e,129,254)?(o=e,null):m(t)}}function G(n){n.fatal;this.handler=function(n,e){var i;return e===b?w:a(e)?e:null===(i=p(e,v("euc-kr")))?f(e):[l(i/190)+129,i%190+65]}}function A(n,e){var i=n>>8,n=255&n;return e?[i,n]:[n,i]}function L(r,n){var t=n.fatal,o=null,s=null;this.handler=function(n,e){var i;return e!==b||null===o&&null===s?e===b&&null===o&&null===s?w:null===o?(o=e,null):(e=r?(o<<8)+e:(e<<8)+o,(o=null)!==s?(i=s,s=null,_(e,56320,57343)?65536+1024*(i-55296)+(e-56320):(n.prepend(A(e,r)),m(t))):_(e,55296,56319)?(s=e,null):_(e,56320,57343)?m(t):e):m(t)}}function M(r,n){n.fatal;this.handler=function(n,e){var i;return e===b?w:_(e,0,65535)?A(e,r):(i=A(55296+(e-65536>>10),r),e=A(56320+(e-65536&1023),r),i.concat(e))}}function N(n){n.fatal;this.handler=function(n,e){return e===b?w:u(e)?e:63360+e-128}}function q(n){n.fatal;this.handler=function(n,e){return e===b?w:a(e)?e:_(e,63360,63487)?e-63360+128:f(e)}}Object.defineProperty&&(Object.defineProperty(O.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}}),Object.defineProperty(O.prototype,"fatal",{get:function(){return"fatal"===this._error_mode}}),Object.defineProperty(O.prototype,"ignoreBOM",{get:function(){return this._ignoreBOM}})),O.prototype.decode=function(n,e){n="object"==typeof n&&n instanceof ArrayBuffer?new Uint8Array(n):"object"==typeof n&&"buffer"in n&&n.buffer instanceof ArrayBuffer?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):new Uint8Array(0);e=s(e),this._do_not_flush||(this._decoder=g[this._encoding.name]({fatal:"fatal"===this._error_mode}),this._BOMseen=!1),this._do_not_flush=Boolean(e.stream);for(var i,r=new c(n),t=[];;){var o=r.read();if(o===b)break;if((i=this._decoder.handler(r,o))===w)break;null!==i&&(Array.isArray(i)?t.push.apply(t,i):t.push(i))}if(!this._do_not_flush){for(;(i=this._decoder.handler(r,r.read()))!==w&&(null!==i&&(Array.isArray(i)?t.push.apply(t,i):t.push(i)),!r.endOfStream()););this._decoder=null}return function(n){e=["UTF-8","UTF-16LE","UTF-16BE"],i=this._encoding.name,-1===e.indexOf(i)||this._ignoreBOM||this._BOMseen||(0<n.length&&65279===n[0]?(this._BOMseen=!0,n.shift()):0<n.length&&(this._BOMseen=!0));for(var e,i,r=n,t="",o=0;o<r.length;++o){var s=r[o];s<=65535?t+=String.fromCharCode(s):(s-=65536,t+=String.fromCharCode(55296+(s>>10),56320+(1023&s)))}return t}.call(this,t)},Object.defineProperty&&Object.defineProperty(k.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}}),k.prototype.encode=function(n,e){n=void 0===n?"":String(n),e=s(e),this._do_not_flush||(this._encoder=h[this._encoding.name]({fatal:"fatal"===this._fatal})),this._do_not_flush=Boolean(e.stream);for(var i,r=new c(function(n){for(var e=String(n),i=e.length,r=0,t=[];r<i;){var o,s=e.charCodeAt(r);s<55296||57343<s?t.push(s):56320<=s&&s<=57343?t.push(65533):55296<=s&&s<=56319&&(r!==i-1&&56320<=(o=e.charCodeAt(r+1))&&o<=57343?(t.push(65536+((1023&s)<<10)+(1023&o)),r+=1):t.push(65533)),r+=1}return t}(n)),t=[];;){var o=r.read();if(o===b)break;if((i=this._encoder.handler(r,o))===w)break;Array.isArray(i)?t.push.apply(t,i):t.push(i)}if(!this._do_not_flush){for(;;){if((i=this._encoder.handler(r,r.read()))===w)break;Array.isArray(i)?t.push.apply(t,i):t.push(i)}this._encoder=null}return new Uint8Array(t)},h["UTF-8"]=function(n){return new E(n)},g["UTF-8"]=function(n){return new e(n)},"encoding-indexes"in i&&n.forEach(function(n){"Legacy single-byte encodings"===n.heading&&n.encodings.forEach(function(n){var n=n.name,e=v(n.toLowerCase());g[n]=function(n){return new j(e,n)},h[n]=function(n){return new B(e,n)}})}),g.GBK=function(n){return new S(n)},h.GBK=function(n){return new T(n,!0)},h.gb18030=function(n){return new T(n)},g.gb18030=function(n){return new S(n)},h.Big5=function(n){return new U(n)},g.Big5=function(n){return new I(n)},h["EUC-JP"]=function(n){return new P(n)},g["EUC-JP"]=function(n){return new C(n)},h["ISO-2022-JP"]=function(n){return new F(n)},g["ISO-2022-JP"]=function(n){return new D(n)},h.Shift_JIS=function(n){return new K(n)},g.Shift_JIS=function(n){return new J(n)},h["EUC-KR"]=function(n){return new G(n)},g["EUC-KR"]=function(n){return new R(n)},h["UTF-16BE"]=function(n){return new M(!0,n)},g["UTF-16BE"]=function(n){return new L(!0,n)},h["UTF-16LE"]=function(n){return new M(!1,n)},g["UTF-16LE"]=function(n){return new L(!1,n)},h["x-user-defined"]=function(n){return new q(n)},g["x-user-defined"]=function(n){return new N(n)},i.TextEncoder||(i.TextEncoder=k),i.TextDecoder||(i.TextDecoder=O), true&&module.exports&&(module.exports={TextEncoder:i.TextEncoder,TextDecoder:i.TextDecoder,EncodingIndexes:i["encoding-indexes"]})}(undefined||{});
					// @protobuf-ts/runtime
					(i=>{i.symbol=Symbol.for("protobuf-ts/unknown"),i.onRead=(e,r,t,a,n)=>{(s(r)?r[i.symbol]:r[i.symbol]=[]).push({no:t,wireType:a,data:n})},i.onWrite=(e,r,t)=>{for(var{no:a,wireType:n,data:s}of i.list(r))t.tag(a,n).raw(s)},i.list=(e,r)=>{return s(e)?(e=e[i.symbol],r?e.filter(e=>e.no==r):e):[]},i.last=(e,r)=>(0,i.list)(e,r).slice(-1)[0];const s=e=>e&&Array.isArray(e[i.symbol])})(UnknownFieldHandler=UnknownFieldHandler||{});
					var UnknownFieldHandler,WireType=(e=>(e[e.Varint=0]="Varint",e[e.Bit64=1]="Bit64",e[e.LengthDelimited=2]="LengthDelimited",e[e.StartGroup=3]="StartGroup",e[e.EndGroup=4]="EndGroup",e[e.Bit32=5]="Bit32",e))(WireType||{});const MESSAGE_TYPE=Symbol.for("protobuf-ts/message-type");function lowerCamelCase(r){let t=!1;var a=[];for(let e=0;e<r.length;e++){var n=r.charAt(e);"_"==n?t=!0:/\d/.test(n)?(a.push(n),t=!0):t?(a.push(n.toUpperCase()),t=!1):0==e?a.push(n.toLowerCase()):a.push(n)}return a.join("")}var ScalarType=(e=>(e[e.DOUBLE=1]="DOUBLE",e[e.FLOAT=2]="FLOAT",e[e.INT64=3]="INT64",e[e.UINT64=4]="UINT64",e[e.INT32=5]="INT32",e[e.FIXED64=6]="FIXED64",e[e.FIXED32=7]="FIXED32",e[e.BOOL=8]="BOOL",e[e.STRING=9]="STRING",e[e.BYTES=12]="BYTES",e[e.UINT32=13]="UINT32",e[e.SFIXED32=15]="SFIXED32",e[e.SFIXED64=16]="SFIXED64",e[e.SINT32=17]="SINT32",e[e.SINT64=18]="SINT64",e))(ScalarType||{}),LongType=(e=>(e[e.BIGINT=0]="BIGINT",e[e.STRING=1]="STRING",e[e.NUMBER=2]="NUMBER",e))(LongType||{}),RepeatType=(e=>(e[e.NO=0]="NO",e[e.PACKED=1]="PACKED",e[e.UNPACKED=2]="UNPACKED",e))(RepeatType||{});function normalizeFieldInfo(e){return e.localName=e.localName??lowerCamelCase(e.name),e.jsonName=e.jsonName??lowerCamelCase(e.name),e.repeat=e.repeat??0,e.opt=e.opt??(!e.repeat&&(!e.oneof&&"message"==e.kind)),e}function isOneofGroup(e){if("object"!=typeof e||null===e||!e.hasOwnProperty("oneofKind"))return!1;switch(typeof e.oneofKind){case"string":return void 0===e[e.oneofKind]?!1:2==Object.keys(e).length;case"undefined":return 1==Object.keys(e).length;default:return!1}}class ReflectionTypeCheck{constructor(e){this.fields=e.fields??[]}prepare(){if(!this.data){var e,r=[],t=[],a=[];for(e of this.fields)if(e.oneof)a.includes(e.oneof)||(a.push(e.oneof),r.push(e.oneof),t.push(e.oneof));else switch(t.push(e.localName),e.kind){case"scalar":case"enum":e.opt&&!e.repeat||r.push(e.localName);break;case"message":e.repeat&&r.push(e.localName);break;case"map":r.push(e.localName)}this.data={req:r,known:t,oneofs:Object.values(a)}}}is(e,a,n=!1){if(!(a<0)){if(null==e||"object"!=typeof e)return!1;this.prepare();let r=Object.keys(e),t=this.data;if(r.length<t.req.length||t.req.some(e=>!r.includes(e)))return!1;if(!n&&r.some(e=>!t.known.includes(e)))return!1;if(!(a<1)){for(const i of t.oneofs){const o=e[i];if(!isOneofGroup(o))return!1;if(void 0!==o.oneofKind){var s=this.fields.find(e=>e.localName===o.oneofKind);if(!s)return!1;if(!this.field(o[o.oneofKind],s,n,a))return!1}}for(const l of this.fields)if(void 0===l.oneof&&!this.field(e[l.localName],l,n,a))return!1}}return!0}field(e,r,t,a){var n=r.repeat;switch(r.kind){case"scalar":return void 0===e?r.opt:n?this.scalars(e,r.T,a,r.L):this.scalar(e,r.T,r.L);case"enum":return void 0===e?r.opt:n?this.scalars(e,ScalarType.INT32,a):this.scalar(e,ScalarType.INT32);case"message":return void 0===e?!0:n?this.messages(e,r.T(),t,a):this.message(e,r.T(),t,a);case"map":if("object"!=typeof e||null===e)return!1;if(a<2)return!0;if(!this.mapKeys(e,r.K,a))return!1;switch(r.V.kind){case"scalar":return this.scalars(Object.values(e),r.V.T,a,r.V.L);case"enum":return this.scalars(Object.values(e),ScalarType.INT32,a);case"message":return this.messages(Object.values(e),r.V.T(),t,a)}}return!0}message(e,r,t,a){return t?r.isAssignable(e,a):r.is(e,a)}messages(r,t,e,a){if(!Array.isArray(r))return!1;if(!(a<2))if(e){for(let e=0;e<r.length&&e<a;e++)if(!t.isAssignable(r[e],a-1))return!1}else for(let e=0;e<r.length&&e<a;e++)if(!t.is(r[e],a-1))return!1;return!0}scalar(e,r,t){var a=typeof e;switch(r){case ScalarType.UINT64:case ScalarType.FIXED64:case ScalarType.INT64:case ScalarType.SFIXED64:case ScalarType.SINT64:switch(t){case LongType.BIGINT:return"bigint"==a;case LongType.NUMBER:return"number"==a&&!isNaN(e);default:return"string"==a}case ScalarType.BOOL:return"boolean"==a;case ScalarType.STRING:return"string"==a;case ScalarType.BYTES:return e instanceof Uint8Array;case ScalarType.DOUBLE:case ScalarType.FLOAT:return"number"==a&&!isNaN(e);default:return"number"==a&&Number.isInteger(e)}}scalars(r,t,a,n){if(!Array.isArray(r))return!1;if(!(a<2)&&Array.isArray(r))for(let e=0;e<r.length&&e<a;e++)if(!this.scalar(r[e],t,n))return!1;return!0}mapKeys(e,r,t){var a=Object.keys(e);switch(r){case ScalarType.INT32:case ScalarType.FIXED32:case ScalarType.SFIXED32:case ScalarType.SINT32:case ScalarType.UINT32:return this.scalars(a.slice(0,t).map(e=>parseInt(e)),r,t);case ScalarType.BOOL:return this.scalars(a.slice(0,t).map(e=>"true"==e||"false"!=e&&e),r,t);default:return this.scalars(a,r,t,LongType.STRING)}}}function typeofJsonValue(e){var r=typeof e;if("object"==r){if(Array.isArray(e))return"array";if(null===e)return"null"}return r}function isJsonObject(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}let encTable="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),decTable=[];for(let e=0;e<encTable.length;e++)decTable[encTable[e].charCodeAt(0)]=e;function base64decode(r){let e=3*r.length/4,t=("="==r[r.length-2]?e-=2:"="==r[r.length-1]&&--e,new Uint8Array(e)),a=0,n=0,s,i=0;for(let e=0;e<r.length;e++){if(void 0===(s=decTable[r.charCodeAt(e)]))switch(r[e]){case"=":n=0;case"\n":case"\r":case"\t":case" ":continue;default:throw Error("invalid base64 string.")}switch(n){case 0:i=s,n=1;break;case 1:t[a++]=i<<2|(48&s)>>4,i=s,n=2;break;case 2:t[a++]=(15&i)<<4|(60&s)>>2,i=s,n=3;break;case 3:t[a++]=(3&i)<<6|s,n=0}}if(1==n)throw Error("invalid base64 string.");return t.subarray(0,a)}function base64encode(r){let t="",a=0,n,s=0;for(let e=0;e<r.length;e++)switch(n=r[e],a){case 0:t+=encTable[n>>2],s=(3&n)<<4,a=1;break;case 1:t+=encTable[s|n>>4],s=(15&n)<<2,a=2;break;case 2:t=(t+=encTable[s|n>>6])+encTable[63&n],a=0}return a&&(t=t+encTable[s]+"=",1==a&&(t+="=")),t}function varint64read(){let r=0,t=0;for(let e=0;e<28;e+=7){var a=this.buf[this.pos++];if(r|=(127&a)<<e,0==(128&a))return this.assertBounds(),[r,t]}var e=this.buf[this.pos++];if(r|=(15&e)<<28,t=(112&e)>>4,0==(128&e))return this.assertBounds(),[r,t];for(let e=3;e<=31;e+=7){var n=this.buf[this.pos++];if(t|=(127&n)<<e,0==(128&n))return this.assertBounds(),[r,t]}throw new Error("invalid varint")}function varint64write(r,t,a){for(let e=0;e<28;e+=7){var n=r>>>e,s=!(n>>>7==0&&0==t);if(a.push(255&(s?128|n:n)),!s)return}var e=r>>>28&15|(7&t)<<4,i=!(t>>3==0);if(a.push(255&(i?128|e:e)),i){for(let e=3;e<31;e+=7){var o=t>>>e,l=!(o>>>7==0);if(a.push(255&(l?128|o:o)),!l)return}a.push(t>>>31&1)}}decTable["-".charCodeAt(0)]=encTable.indexOf("+"),decTable["_".charCodeAt(0)]=encTable.indexOf("/");const TWO_PWR_32_DBL$1=4294967296;function int64fromString(t){var e="-"==t[0];e&&(t=t.slice(1));let a=0,n=0;function r(e,r){e=Number(t.slice(e,r));n*=1e6,(a=1e6*a+e)>=TWO_PWR_32_DBL$1&&(n+=a/TWO_PWR_32_DBL$1|0,a%=TWO_PWR_32_DBL$1)}return r(-24,-18),r(-18,-12),r(-12,-6),r(-6),[e,a,n]}function int64toString(e,r){if(r<=2097151)return""+(TWO_PWR_32_DBL$1*r+(e>>>0));var t=(e>>>24|r<<8)>>>0&16777215,r=r>>16&65535;let a=(16777215&e)+6777216*t+6710656*r,n=t+8147497*r,s=2*r;function i(e,r){e=e?String(e):"";return r?"0000000".slice(e.length)+e:e}return 1e7<=a&&(n+=Math.floor(a/1e7),a%=1e7),1e7<=n&&(s+=Math.floor(n/1e7),n%=1e7),i(s,0)+i(n,s)+i(a,1)}function varint32write(r,t){if(0<=r){for(;127<r;)t.push(127&r|128),r>>>=7;t.push(r)}else{for(let e=0;e<9;e++)t.push(127&r|128),r>>=7;t.push(1)}}function varint32read(){let r=this.buf[this.pos++];var e=127&r;if(0==(128&r))return this.assertBounds(),e;if(e|=(127&(r=this.buf[this.pos++]))<<7,0==(128&r))return this.assertBounds(),e;if(e|=(127&(r=this.buf[this.pos++]))<<14,0==(128&r))return this.assertBounds(),e;if(e|=(127&(r=this.buf[this.pos++]))<<21,0==(128&r))return this.assertBounds(),e;e|=(15&(r=this.buf[this.pos++]))<<28;for(let e=5;0!=(128&r)&&e<10;e++)r=this.buf[this.pos++];if(0!=(128&r))throw new Error("invalid varint");return this.assertBounds(),e>>>0}function detectBi(){var e=new DataView(new ArrayBuffer(8));return void 0!==globalThis.BigInt&&"function"==typeof e.getBigInt64&&"function"==typeof e.getBigUint64&&"function"==typeof e.setBigInt64&&"function"==typeof e.setBigUint64?{MIN:BigInt("-9223372036854775808"),MAX:BigInt("9223372036854775807"),UMIN:BigInt("0"),UMAX:BigInt("18446744073709551615"),C:BigInt,V:e}:void 0}const BI=detectBi();function assertBi(e){if(!e)throw new Error("BigInt unavailable, see https://github.com/timostamm/protobuf-ts/blob/v1.0.8/MANUAL.md#bigint-support")}const RE_DECIMAL_STR=/^-?[0-9]+$/,TWO_PWR_32_DBL=4294967296;class SharedPbLong{constructor(e,r){this.lo=0|e,this.hi=0|r}isZero(){return 0==this.lo&&0==this.hi}toNumber(){var e=this.hi*TWO_PWR_32_DBL+(this.lo>>>0);if(Number.isSafeInteger(e))return e;throw new Error("cannot convert to safe number")}}const _PbULong=class extends SharedPbLong{static from(e){if(BI)switch(typeof e){case"string":if("0"==e)return this.ZERO;if(""==e)throw new Error("string is no integer");e=BI.C(e);case"number":if(0===e)return this.ZERO;e=BI.C(e);case"bigint":if(!e)return this.ZERO;if(e<BI.UMIN)throw new Error("signed value for ulong");if(e>BI.UMAX)throw new Error("ulong too large");return BI.V.setBigUint64(0,e,!0),new _PbULong(BI.V.getInt32(0,!0),BI.V.getInt32(4,!0))}else switch(typeof e){case"string":if("0"==e)return this.ZERO;if(e=e.trim(),!RE_DECIMAL_STR.test(e))throw new Error("string is no integer");var[r,t,a]=int64fromString(e);if(r)throw new Error("signed value");return new _PbULong(t,a);case"number":if(0==e)return this.ZERO;if(!Number.isSafeInteger(e))throw new Error("number is no integer");if(e<0)throw new Error("signed value for ulong");return new _PbULong(e,e/TWO_PWR_32_DBL)}throw new Error("unknown value "+typeof e)}toString(){return BI?this.toBigInt().toString():int64toString(this.lo,this.hi)}toBigInt(){return assertBi(BI),BI.V.setInt32(0,this.lo,!0),BI.V.setInt32(4,this.hi,!0),BI.V.getBigUint64(0,!0)}};let PbULong=_PbULong;PbULong.ZERO=new _PbULong(0,0);const _PbLong=class extends SharedPbLong{static from(e){if(BI)switch(typeof e){case"string":if("0"==e)return this.ZERO;if(""==e)throw new Error("string is no integer");e=BI.C(e);case"number":if(0===e)return this.ZERO;e=BI.C(e);case"bigint":if(!e)return this.ZERO;if(e<BI.MIN)throw new Error("ulong too small");if(e>BI.MAX)throw new Error("ulong too large");return BI.V.setBigInt64(0,e,!0),new _PbLong(BI.V.getInt32(0,!0),BI.V.getInt32(4,!0))}else switch(typeof e){case"string":if("0"==e)return this.ZERO;var r,t,a;if(e=e.trim(),RE_DECIMAL_STR.test(e))return[r,a,t]=int64fromString(e),a=new _PbLong(a,t),r?a.negate():a;throw new Error("string is no integer");case"number":if(0==e)return this.ZERO;if(Number.isSafeInteger(e))return 0<e?new _PbLong(e,e/TWO_PWR_32_DBL):new _PbLong(-e,-e/TWO_PWR_32_DBL).negate();throw new Error("number is no integer")}throw new Error("unknown value "+typeof e)}isNegative(){return 0!=(2147483648&this.hi)}negate(){let e=~this.hi,r=this.lo;return r?r=1+~r:e+=1,new _PbLong(r,e)}toString(){var e;return BI?this.toBigInt().toString():this.isNegative()?"-"+int64toString((e=this.negate()).lo,e.hi):int64toString(this.lo,this.hi)}toBigInt(){return assertBi(BI),BI.V.setInt32(0,this.lo,!0),BI.V.setInt32(4,this.hi,!0),BI.V.getBigInt64(0,!0)}};let PbLong=_PbLong;function assert(e,r){if(!e)throw new Error(r)}PbLong.ZERO=new _PbLong(0,0);const FLOAT32_MAX=34028234663852886e22,FLOAT32_MIN=-34028234663852886e22,UINT32_MAX=4294967295,INT32_MAX=2147483647,INT32_MIN=-2147483648;function assertInt32(e){if("number"!=typeof e)throw new Error("invalid int 32: "+typeof e);if(!Number.isInteger(e)||e>INT32_MAX||e<INT32_MIN)throw new Error("invalid int 32: "+e)}function assertUInt32(e){if("number"!=typeof e)throw new Error("invalid uint 32: "+typeof e);if(!Number.isInteger(e)||e>UINT32_MAX||e<0)throw new Error("invalid uint 32: "+e)}function assertFloat32(e){if("number"!=typeof e)throw new Error("invalid float 32: "+typeof e);if(Number.isFinite(e)&&(e>FLOAT32_MAX||e<FLOAT32_MIN))throw new Error("invalid float 32: "+e)}function reflectionLongConvert(e,r){switch(r){case LongType.BIGINT:return e.toBigInt();case LongType.NUMBER:return e.toNumber();default:return e.toString()}}class ReflectionJsonReader{constructor(e){this.info=e}prepare(){if(void 0===this.fMap){this.fMap={};for(const e of this.info.fields??[])this.fMap[e.name]=e,this.fMap[e.jsonName]=e,this.fMap[e.localName]=e}}assert(e,r,t){if(!e){let e=typeofJsonValue(t);throw"number"!=e&&"boolean"!=e||(e=t.toString()),new Error(`Cannot parse JSON ${e} for ${this.info.typeName}#`+r)}}read(e,r,t){this.prepare();var a,n,s=[];for([a,n]of Object.entries(e)){var i=this.fMap[a];if(!i){if(t.ignoreUnknownFields)continue;throw new Error(`Found unknown field while reading ${this.info.typeName} from JSON format. JSON key: `+a)}var o=i.localName;let e;if(i.oneof){if(s.includes(i.oneof))throw new Error(`Multiple members of the oneof group "${i.oneof}" of ${this.info.typeName} are present in JSON.`);s.push(i.oneof),e=r[i.oneof]={oneofKind:o}}else e=r;if("map"==i.kind){if(null!==n){this.assert(isJsonObject(n),i.name,n);var l,c,f=e[o];for([l,c]of Object.entries(n)){this.assert(null!==c,i.name+" map value",null);let e;switch(i.V.kind){case"message":e=i.V.T().internalJsonRead(c,t);break;case"enum":if(!1===(e=this.enum(i.V.T(),c,i.name,t.ignoreUnknownFields)))continue;break;case"scalar":e=this.scalar(c,i.V.T,i.V.L,i.name)}this.assert(void 0!==e,i.name+" map value",c);let r=l;i.K==ScalarType.BOOL&&(r="true"==r||"false"!=r&&r),f[r=this.scalar(r,i.K,LongType.STRING,i.name).toString()]=e}}}else if(i.repeat){if(null!==n){this.assert(Array.isArray(n),i.name,n);var u=e[o];for(const p of n){this.assert(null!==p,i.name,null);let e;switch(i.kind){case"message":e=i.T().internalJsonRead(p,t);break;case"enum":if(!1===(e=this.enum(i.T(),p,i.name,t.ignoreUnknownFields)))continue;break;case"scalar":e=this.scalar(p,i.T,i.L,i.name)}this.assert(void 0!==e,i.name,n),u.push(e)}}}else switch(i.kind){case"message":null===n&&"google.protobuf.Value"!=i.T().typeName?this.assert(void 0===i.oneof,i.name+" (oneof member)",null):e[o]=i.T().internalJsonRead(n,t,e[o]);break;case"enum":var h=this.enum(i.T(),n,i.name,t.ignoreUnknownFields);!1!==h&&(e[o]=h);break;case"scalar":e[o]=this.scalar(n,i.T,i.L,i.name)}}}enum(r,t,a,n){if("google.protobuf.NullValue"==r[0]&&assert(null===t,`Unable to parse field ${this.info.typeName}#${a}, enum ${r[0]} only accepts null.`),null===t)return 0;switch(typeof t){case"number":return assert(Number.isInteger(t),`Unable to parse field ${this.info.typeName}#${a}, enum can only be integral number, got ${t}.`),t;case"string":let e=t;r[2]&&t.substring(0,r[2].length)===r[2]&&(e=t.substring(r[2].length));var s=r[1][e];return void 0===s&&n?!1:(assert("number"==typeof s,`Unable to parse field ${this.info.typeName}#${a}, enum ${r[0]} has no value for "${t}".`),s)}assert(!1,`Unable to parse field ${this.info.typeName}#${a}, cannot parse enum value from ${typeof t}".`)}scalar(r,t,a,e){let n;try{switch(t){case ScalarType.DOUBLE:case ScalarType.FLOAT:if(null===r)return 0;if("NaN"===r)return Number.NaN;if("Infinity"===r)return Number.POSITIVE_INFINITY;if("-Infinity"===r)return Number.NEGATIVE_INFINITY;if(""===r)n="empty string";else if("string"==typeof r&&r.trim().length!==r.length)n="extra whitespace";else if("string"==typeof r||"number"==typeof r){var s=Number(r);if(Number.isNaN(s))n="not a number";else{if(Number.isFinite(s))return t==ScalarType.FLOAT&&assertFloat32(s),s;n="too large or small"}}break;case ScalarType.INT32:case ScalarType.FIXED32:case ScalarType.SFIXED32:case ScalarType.SINT32:case ScalarType.UINT32:if(null===r)return 0;let e;if("number"==typeof r?e=r:""===r?n="empty string":"string"==typeof r&&(r.trim().length!==r.length?n="extra whitespace":e=Number(r)),void 0===e)break;return(t==ScalarType.UINT32?assertUInt32:assertInt32)(e),e;case ScalarType.INT64:case ScalarType.SFIXED64:case ScalarType.SINT64:if(null===r)return reflectionLongConvert(PbLong.ZERO,a);if("number"!=typeof r&&"string"!=typeof r)break;return reflectionLongConvert(PbLong.from(r),a);case ScalarType.FIXED64:case ScalarType.UINT64:if(null===r)return reflectionLongConvert(PbULong.ZERO,a);if("number"!=typeof r&&"string"!=typeof r)break;return reflectionLongConvert(PbULong.from(r),a);case ScalarType.BOOL:if(null===r)return!1;if("boolean"!=typeof r)break;return r;case ScalarType.STRING:if(null===r)return"";if("string"!=typeof r){n="extra whitespace";break}try{encodeURIComponent(r)}catch(e){0;break}return r;case ScalarType.BYTES:if(null===r||""===r)return new Uint8Array(0);if("string"!=typeof r)break;return base64decode(r)}}catch(e){n=e.message}this.assert(!1,e+(n?" - "+n:""),r)}}class ReflectionJsonWriter{constructor(e){this.fields=e.fields??[]}write(e,r){var t,a,n={},s=e;for(const i of this.fields)i.oneof?(t=s[i.oneof]).oneofKind===i.localName&&(a="scalar"==i.kind||"enum"==i.kind?{...r,emitDefaultValues:!0}:r,assert(void 0!==(t=this.field(i,t[i.localName],a))),n[r.useProtoFieldName?i.name:i.jsonName]=t):void 0!==(a=this.field(i,s[i.localName],r))&&(n[r.useProtoFieldName?i.name:i.jsonName]=a);return n}field(r,t,a){let e=void 0;if("map"==r.kind){assert("object"==typeof t&&null!==t);var n={};switch(r.V.kind){case"scalar":for(var[s,i]of Object.entries(t)){i=this.scalar(r.V.T,i,r.name,!1,!0);assert(void 0!==i),n[s.toString()]=i}break;case"message":var o,l,c=r.V.T();for([o,l]of Object.entries(t)){var f=this.message(c,l,r.name,a);assert(void 0!==f),n[o.toString()]=f}break;case"enum":var u,h,p=r.V.T();for([u,h]of Object.entries(t)){assert(void 0===h||"number"==typeof h);var T=this.enum(p,h,r.name,!1,!0,a.enumAsInteger);assert(void 0!==T),n[u.toString()]=T}}(a.emitDefaultValues||0<Object.keys(n).length)&&(e=n)}else if(r.repeat){assert(Array.isArray(t));var d=[];switch(r.kind){case"scalar":for(let e=0;e<t.length;e++){var y=this.scalar(r.T,t[e],r.name,r.opt,!0);assert(void 0!==y),d.push(y)}break;case"enum":var g=r.T();for(let e=0;e<t.length;e++){assert(void 0===t[e]||"number"==typeof t[e]);var b=this.enum(g,t[e],r.name,r.opt,!0,a.enumAsInteger);assert(void 0!==b),d.push(b)}break;case"message":var m=r.T();for(let e=0;e<t.length;e++){var I=this.message(m,t[e],r.name,a);assert(void 0!==I),d.push(I)}}(a.emitDefaultValues||0<d.length||a.emitDefaultValues)&&(e=d)}else switch(r.kind){case"scalar":e=this.scalar(r.T,t,r.name,r.opt,a.emitDefaultValues);break;case"enum":e=this.enum(r.T(),t,r.name,r.opt,a.emitDefaultValues,a.enumAsInteger);break;case"message":e=this.message(r.T(),t,r.name,a)}return e}enum(e,r,t,a,n,s){if("google.protobuf.NullValue"==e[0])return null;if(void 0===r)assert(a);else if(0!==r||n||a)return assert("number"==typeof r),assert(Number.isInteger(r)),s||!e[1].hasOwnProperty(r)?r:e[2]?e[2]+e[1][r]:e[1][r]}message(e,r,t,a){return void 0===r?a.emitDefaultValues?null:void 0:e.internalJsonWrite(r,a)}scalar(e,r,t,a,n){if(void 0===r)assert(a);else{var s=n||a;switch(e){case ScalarType.INT32:case ScalarType.SFIXED32:case ScalarType.SINT32:return 0===r?s?0:void 0:(assertInt32(r),r);case ScalarType.FIXED32:case ScalarType.UINT32:return 0===r?s?0:void 0:(assertUInt32(r),r);case ScalarType.FLOAT:assertFloat32(r);case ScalarType.DOUBLE:return 0===r?s?0:void 0:(assert("number"==typeof r),Number.isNaN(r)?"NaN":r===Number.POSITIVE_INFINITY?"Infinity":r===Number.NEGATIVE_INFINITY?"-Infinity":r);case ScalarType.STRING:return""===r?s?"":void 0:(assert("string"==typeof r),r);case ScalarType.BOOL:return!1===r?!s&&void 0:(assert("boolean"==typeof r),r);case ScalarType.UINT64:case ScalarType.FIXED64:assert("number"==typeof r||"string"==typeof r||"bigint"==typeof r);var i=PbULong.from(r);return i.isZero()&&!s?void 0:i.toString();case ScalarType.INT64:case ScalarType.SFIXED64:case ScalarType.SINT64:assert("number"==typeof r||"string"==typeof r||"bigint"==typeof r);i=PbLong.from(r);return i.isZero()&&!s?void 0:i.toString();case ScalarType.BYTES:return(assert(r instanceof Uint8Array),r.byteLength)?base64encode(r):s?"":void 0}}}}function reflectionScalarDefault(e,r=LongType.STRING){switch(e){case ScalarType.BOOL:return!1;case ScalarType.UINT64:case ScalarType.FIXED64:return reflectionLongConvert(PbULong.ZERO,r);case ScalarType.INT64:case ScalarType.SFIXED64:case ScalarType.SINT64:return reflectionLongConvert(PbLong.ZERO,r);case ScalarType.DOUBLE:case ScalarType.FLOAT:return 0;case ScalarType.BYTES:return new Uint8Array(0);case ScalarType.STRING:return"";default:return 0}}class ReflectionBinaryReader{constructor(e){this.info=e}prepare(){var e;this.fieldNoToField||(e=this.info.fields??[],this.fieldNoToField=new Map(e.map(e=>[e.no,e])))}read(a,n,s,e){this.prepare();for(var r=void 0===e?a.len:a.pos+e;a.pos<r;){var[t,i]=a.tag(),o=this.fieldNoToField.get(t);if(o){let e=n,r=o.repeat,t=o.localName;switch(o.oneof&&(e=e[o.oneof]).oneofKind!==t&&(e=n[o.oneof]={oneofKind:t}),o.kind){case"scalar":case"enum":var l="enum"==o.kind?ScalarType.INT32:o.T,c="scalar"==o.kind?o.L:void 0;if(r){var f=e[t];if(i==WireType.LengthDelimited&&l!=ScalarType.STRING&&l!=ScalarType.BYTES)for(var u=a.uint32()+a.pos;a.pos<u;)f.push(this.scalar(a,l,c));else f.push(this.scalar(a,l,c))}else e[t]=this.scalar(a,l,c);break;case"message":r?(h=e[t],p=o.T().internalBinaryRead(a,a.uint32(),s),h.push(p)):e[t]=o.T().internalBinaryRead(a,a.uint32(),s,e[t]);break;case"map":var[h,p]=this.mapEntry(o,a,s);e[t][h]=p}}else{var T=s.readUnknownField;if("throw"==T)throw new Error(`Unknown field ${t} (wire type ${i}) for `+this.info.typeName);var d=a.skip(i);!1!==T&&(!0===T?UnknownFieldHandler.onRead:T)(this.info.typeName,n,t,i,d)}}}mapEntry(e,r,t){var a=r.uint32(),n=r.pos+a;let s=void 0,i=void 0;for(;r.pos<n;){var[o,l]=r.tag();switch(o){case 1:s=e.K==ScalarType.BOOL?r.bool().toString():this.scalar(r,e.K,LongType.STRING);break;case 2:switch(e.V.kind){case"scalar":i=this.scalar(r,e.V.T,e.V.L);break;case"enum":i=r.int32();break;case"message":i=e.V.T().internalBinaryRead(r,r.uint32(),t)}break;default:throw new Error(`Unknown field ${o} (wire type ${l}) in map entry for ${this.info.typeName}#`+e.name)}}if(void 0===s&&(a=reflectionScalarDefault(e.K),s=e.K==ScalarType.BOOL?a.toString():a),void 0===i)switch(e.V.kind){case"scalar":i=reflectionScalarDefault(e.V.T,e.V.L);break;case"enum":i=0;break;case"message":i=e.V.T().create()}return[s,i]}scalar(e,r,t){switch(r){case ScalarType.INT32:return e.int32();case ScalarType.STRING:return e.string();case ScalarType.BOOL:return e.bool();case ScalarType.DOUBLE:return e.double();case ScalarType.FLOAT:return e.float();case ScalarType.INT64:return reflectionLongConvert(e.int64(),t);case ScalarType.UINT64:return reflectionLongConvert(e.uint64(),t);case ScalarType.FIXED64:return reflectionLongConvert(e.fixed64(),t);case ScalarType.FIXED32:return e.fixed32();case ScalarType.BYTES:return e.bytes();case ScalarType.UINT32:return e.uint32();case ScalarType.SFIXED32:return e.sfixed32();case ScalarType.SFIXED64:return reflectionLongConvert(e.sfixed64(),t);case ScalarType.SINT32:return e.sint32();case ScalarType.SINT64:return reflectionLongConvert(e.sint64(),t)}}}class ReflectionBinaryWriter{constructor(e){this.info=e}prepare(){var e;this.fields||(e=this.info.fields?this.info.fields.concat():[],this.fields=e.sort((e,r)=>e.no-r.no))}write(n,s,i){this.prepare();for(const u of this.fields){let e,r,t=u.repeat,a=u.localName;if(u.oneof){var o=n[u.oneof];if(o.oneofKind!==a)continue;e=o[a],r=!0}else e=n[a],r=!1;switch(u.kind){case"scalar":case"enum":var l="enum"==u.kind?ScalarType.INT32:u.T;if(t)if(assert(Array.isArray(e)),t==RepeatType.PACKED)this.packed(s,l,u.no,e);else for(const h of e)this.scalar(s,l,u.no,h,!0);else void 0===e?assert(u.opt):this.scalar(s,l,u.no,e,r||u.opt);break;case"message":if(t){assert(Array.isArray(e));for(const p of e)this.message(s,i,u.T(),u.no,p)}else this.message(s,i,u.T(),u.no,e);break;case"map":assert("object"==typeof e&&null!==e);for(var[c,f]of Object.entries(e))this.mapEntry(s,i,u,c,f)}}var e=i.writeUnknownFields;!1!==e&&(!0===e?UnknownFieldHandler.onWrite:e)(this.info.typeName,n,s)}mapEntry(e,r,t,a,n){e.tag(t.no,WireType.LengthDelimited),e.fork();let s=a;switch(t.K){case ScalarType.INT32:case ScalarType.FIXED32:case ScalarType.UINT32:case ScalarType.SFIXED32:case ScalarType.SINT32:s=Number.parseInt(a);break;case ScalarType.BOOL:assert("true"==a||"false"==a),s="true"==a}switch(this.scalar(e,t.K,1,s,!0),t.V.kind){case"scalar":this.scalar(e,t.V.T,2,n,!0);break;case"enum":this.scalar(e,ScalarType.INT32,2,n,!0);break;case"message":this.message(e,r,t.V.T(),2,n)}e.join()}message(e,r,t,a,n){void 0!==n&&(t.internalBinaryWrite(n,e.tag(a,WireType.LengthDelimited).fork(),r),e.join())}scalar(e,r,t,a,n){var[r,s,i]=this.scalarInfo(r,a);i&&!n||(e.tag(t,r),e[s](a))}packed(r,e,t,a){if(a.length){assert(e!==ScalarType.BYTES&&e!==ScalarType.STRING),r.tag(t,WireType.LengthDelimited),r.fork();var[,n]=this.scalarInfo(e);for(let e=0;e<a.length;e++)r[n](a[e]);r.join()}}scalarInfo(e,r){let t=WireType.Varint,a;var n=void 0===r;let s=0===r;switch(e){case ScalarType.INT32:a="int32";break;case ScalarType.STRING:s=n||!r.length,t=WireType.LengthDelimited,a="string";break;case ScalarType.BOOL:s=!1===r,a="bool";break;case ScalarType.UINT32:a="uint32";break;case ScalarType.DOUBLE:t=WireType.Bit64,a="double";break;case ScalarType.FLOAT:t=WireType.Bit32,a="float";break;case ScalarType.INT64:s=n||PbLong.from(r).isZero(),a="int64";break;case ScalarType.UINT64:s=n||PbULong.from(r).isZero(),a="uint64";break;case ScalarType.FIXED64:s=n||PbULong.from(r).isZero(),t=WireType.Bit64,a="fixed64";break;case ScalarType.BYTES:s=n||!r.byteLength,t=WireType.LengthDelimited,a="bytes";break;case ScalarType.FIXED32:t=WireType.Bit32,a="fixed32";break;case ScalarType.SFIXED32:t=WireType.Bit32,a="sfixed32";break;case ScalarType.SFIXED64:s=n||PbLong.from(r).isZero(),t=WireType.Bit64,a="sfixed64";break;case ScalarType.SINT32:a="sint32";break;case ScalarType.SINT64:s=n||PbLong.from(r).isZero(),a="sint64"}return[t,a,n||s]}}function reflectionCreate(e){var r,t={};Object.defineProperty(t,MESSAGE_TYPE,{enumerable:!1,value:e});for(r of e.fields){var a=r.localName;if(!r.opt)if(r.oneof)t[r.oneof]={oneofKind:void 0};else if(r.repeat)t[a]=[];else switch(r.kind){case"scalar":t[a]=reflectionScalarDefault(r.T,r.L);break;case"enum":t[a]=0;break;case"map":t[a]={}}}return t}function reflectionMergePartial(e,r,t){let a,n=t,s;for(var i of e.fields){var o=i.localName;if(i.oneof){var l=n[i.oneof];if(null==(null==l?void 0:l.oneofKind))continue;if(a=l[o],(s=r[i.oneof]).oneofKind=l.oneofKind,null==a){delete s[o];continue}}else if(a=n[o],s=r,null==a)continue;switch(i.repeat&&(s[o].length=a.length),i.kind){case"scalar":case"enum":if(i.repeat)for(let e=0;e<a.length;e++)s[o][e]=a[e];else s[o]=a;break;case"message":var c=i.T();if(i.repeat)for(let e=0;e<a.length;e++)s[o][e]=c.create(a[e]);else void 0===s[o]?s[o]=c.create(a):c.mergePartial(s[o],a);break;case"map":switch(i.V.kind){case"scalar":case"enum":Object.assign(s[o],a);break;case"message":var f,u=i.V.T();for(f of Object.keys(a))s[o][f]=u.create(a[f])}}}}const defaultsWrite$1={emitDefaultValues:!1,enumAsInteger:!1,useProtoFieldName:!1,prettySpaces:0},defaultsRead$1={ignoreUnknownFields:!1};function jsonReadOptions(e){return e?{...defaultsRead$1,...e}:defaultsRead$1}function jsonWriteOptions(e){return e?{...defaultsWrite$1,...e}:defaultsWrite$1}function reflectionEquals(e,r,t){if(r!==t){if(!r||!t)return!1;for(var a of e.fields){var n=a.localName,s=(a.oneof?r[a.oneof]:r)[n],i=(a.oneof?t[a.oneof]:t)[n];switch(a.kind){case"enum":case"scalar":var o="enum"==a.kind?ScalarType.INT32:a.T;if((a.repeat?repeatedPrimitiveEq:primitiveEq)(o,s,i))break;return!1;case"map":if("message"==a.V.kind?repeatedMsgEq(a.V.T(),objectValues(s),objectValues(i)):repeatedPrimitiveEq("enum"==a.V.kind?ScalarType.INT32:a.V.T,objectValues(s),objectValues(i)))break;return!1;case"message":o=a.T();if(a.repeat?repeatedMsgEq(o,s,i):o.equals(s,i))break;return!1}}}return!0}const objectValues=Object.values;function primitiveEq(e,r,t){if(r!==t){if(e!==ScalarType.BYTES)return!1;var a=r,n=t;if(a.length!==n.length)return!1;for(let e=0;e<a.length;e++)if(a[e]!=n[e])return!1}return!0}function repeatedPrimitiveEq(r,t,a){if(t.length!==a.length)return!1;for(let e=0;e<t.length;e++)if(!primitiveEq(r,t[e],a[e]))return!1;return!0}function repeatedMsgEq(r,t,a){if(t.length!==a.length)return!1;for(let e=0;e<t.length;e++)if(!r.equals(t[e],a[e]))return!1;return!0}const defaultsWrite={writeUnknownFields:!0,writerFactory:()=>new BinaryWriter};function binaryWriteOptions(e){return e?{...defaultsWrite,...e}:defaultsWrite}class BinaryWriter{constructor(e){this.stack=[],this.textEncoder=e??new TextEncoder,this.chunks=[],this.buf=[]}finish(){this.chunks.push(new Uint8Array(this.buf));let r=0;for(let e=0;e<this.chunks.length;e++)r+=this.chunks[e].length;var t=new Uint8Array(r);let a=0;for(let e=0;e<this.chunks.length;e++)t.set(this.chunks[e],a),a+=this.chunks[e].length;return this.chunks=[],t}fork(){return this.stack.push({chunks:this.chunks,buf:this.buf}),this.chunks=[],this.buf=[],this}join(){var e=this.finish(),r=this.stack.pop();if(r)return this.chunks=r.chunks,this.buf=r.buf,this.uint32(e.byteLength),this.raw(e);throw new Error("invalid state, fork stack empty")}tag(e,r){return this.uint32((e<<3|r)>>>0)}raw(e){return this.buf.length&&(this.chunks.push(new Uint8Array(this.buf)),this.buf=[]),this.chunks.push(e),this}uint32(e){for(assertUInt32(e);127<e;)this.buf.push(127&e|128),e>>>=7;return this.buf.push(e),this}int32(e){return assertInt32(e),varint32write(e,this.buf),this}bool(e){return this.buf.push(e?1:0),this}bytes(e){return this.uint32(e.byteLength),this.raw(e)}string(e){e=this.textEncoder.encode(e);return this.uint32(e.byteLength),this.raw(e)}float(e){assertFloat32(e);var r=new Uint8Array(4);return new DataView(r.buffer).setFloat32(0,e,!0),this.raw(r)}double(e){var r=new Uint8Array(8);return new DataView(r.buffer).setFloat64(0,e,!0),this.raw(r)}fixed32(e){assertUInt32(e);var r=new Uint8Array(4);return new DataView(r.buffer).setUint32(0,e,!0),this.raw(r)}sfixed32(e){assertInt32(e);var r=new Uint8Array(4);return new DataView(r.buffer).setInt32(0,e,!0),this.raw(r)}sint32(e){return assertInt32(e),varint32write(e=(e<<1^e>>31)>>>0,this.buf),this}sfixed64(e){var r=new Uint8Array(8),t=new DataView(r.buffer),e=PbLong.from(e);return t.setInt32(0,e.lo,!0),t.setInt32(4,e.hi,!0),this.raw(r)}fixed64(e){var r=new Uint8Array(8),t=new DataView(r.buffer),e=PbULong.from(e);return t.setInt32(0,e.lo,!0),t.setInt32(4,e.hi,!0),this.raw(r)}int64(e){e=PbLong.from(e);return varint64write(e.lo,e.hi,this.buf),this}sint64(e){var e=PbLong.from(e),r=e.hi>>31;return varint64write(e.lo<<1^r,(e.hi<<1|e.lo>>>31)^r,this.buf),this}uint64(e){e=PbULong.from(e);return varint64write(e.lo,e.hi,this.buf),this}}const defaultsRead={readUnknownField:!0,readerFactory:e=>new BinaryReader(e)};function binaryReadOptions(e){return e?{...defaultsRead,...e}:defaultsRead}class BinaryReader{constructor(e,r){this.varint64=varint64read,this.uint32=varint32read,this.buf=e,this.len=e.length,this.pos=0,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength),this.textDecoder=r??new TextDecoder("utf-8",{fatal:!0,ignoreBOM:!0})}tag(){var e=this.uint32(),r=e>>>3,e=7&e;if(r<=0||e<0||5<e)throw new Error("illegal tag: field no "+r+" wire type "+e);return[r,e]}skip(e){var r,t=this.pos;switch(e){case WireType.Varint:for(;128&this.buf[this.pos++];);break;case WireType.Bit64:this.pos+=4;case WireType.Bit32:this.pos+=4;break;case WireType.LengthDelimited:var a=this.uint32();this.pos+=a;break;case WireType.StartGroup:for(;(r=this.tag()[1])!==WireType.EndGroup;)this.skip(r);break;default:throw new Error("cant skip wire type "+e)}return this.assertBounds(),this.buf.subarray(t,this.pos)}assertBounds(){if(this.pos>this.len)throw new RangeError("premature EOF")}int32(){return 0|this.uint32()}sint32(){var e=this.uint32();return e>>>1^-(1&e)}int64(){return new PbLong(...this.varint64())}uint64(){return new PbULong(...this.varint64())}sint64(){var[e,r]=this.varint64(),t=-(1&e),e=(e>>>1|(1&r)<<31)^t,r=r>>>1^t;return new PbLong(e,r)}bool(){var[e,r]=this.varint64();return 0!==e||0!==r}fixed32(){return this.view.getUint32((this.pos+=4)-4,!0)}sfixed32(){return this.view.getInt32((this.pos+=4)-4,!0)}fixed64(){return new PbULong(this.sfixed32(),this.sfixed32())}sfixed64(){return new PbLong(this.sfixed32(),this.sfixed32())}float(){return this.view.getFloat32((this.pos+=4)-4,!0)}double(){return this.view.getFloat64((this.pos+=8)-8,!0)}bytes(){var e=this.uint32(),r=this.pos;return this.pos+=e,this.assertBounds(),this.buf.subarray(r,r+e)}string(){return this.textDecoder.decode(this.bytes())}}class MessageType{constructor(e,r,t){this.defaultCheckDepth=16,this.typeName=e,this.fields=r.map(normalizeFieldInfo),this.options=t??{},this.refTypeCheck=new ReflectionTypeCheck(this),this.refJsonReader=new ReflectionJsonReader(this),this.refJsonWriter=new ReflectionJsonWriter(this),this.refBinReader=new ReflectionBinaryReader(this),this.refBinWriter=new ReflectionBinaryWriter(this)}create(e){var r=reflectionCreate(this);return void 0!==e&&reflectionMergePartial(this,r,e),r}clone(e){var r=this.create();return reflectionMergePartial(this,r,e),r}equals(e,r){return reflectionEquals(this,e,r)}is(e,r=this.defaultCheckDepth){return this.refTypeCheck.is(e,r,!1)}isAssignable(e,r=this.defaultCheckDepth){return this.refTypeCheck.is(e,r,!0)}mergePartial(e,r){reflectionMergePartial(this,e,r)}fromBinary(e,r){r=binaryReadOptions(r);return this.internalBinaryRead(r.readerFactory(e),e.byteLength,r)}fromJson(e,r){return this.internalJsonRead(e,jsonReadOptions(r))}fromJsonString(e,r){e=JSON.parse(e);return this.fromJson(e,r)}toJson(e,r){return this.internalJsonWrite(e,jsonWriteOptions(r))}toJsonString(e,r){e=this.toJson(e,r);return JSON.stringify(e,null,(null==r?void 0:r.prettySpaces)??0)}toBinary(e,r){r=binaryWriteOptions(r);return this.internalBinaryWrite(e,r.writerFactory(),r).finish()}internalJsonRead(e,r,t){if(null===e||"object"!=typeof e||Array.isArray(e))throw new Error(`Unable to parse message ${this.typeName} from JSON ${typeofJsonValue(e)}.`);return t=t??this.create(),this.refJsonReader.read(e,t,r),t}internalJsonWrite(e,r){return this.refJsonWriter.write(e,r)}internalBinaryWrite(e,r,t){return this.refBinWriter.write(e,r,t),r}internalBinaryRead(e,r,t,a){a=a??this.create();return this.refBinReader.read(e,a,t,r),a}}
					/******************  initialization finish  *******************/
					switch (FORMAT) {
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
							switch (PLATFORM) {
								case "YouTube": {
									/******************  initialization start  *******************/
									/******************  initialization finish  *******************/
									break;
								};
								case "Spotify": {
									/******************  initialization start  *******************/
									var SyncType;
									(function (SyncType) {
										SyncType[SyncType["UNSYNCED"] = 0] = "UNSYNCED";
										SyncType[SyncType["LINE_SYNCED"] = 1] = "LINE_SYNCED";
										SyncType[SyncType["SYLLABLE_SYNCED"] = 2] = "SYLLABLE_SYNCED";
									})(SyncType || (SyncType = {}));
									class ColorLyricsResponse$Type extends MessageType {
										constructor() {
											super("ColorLyricsResponse", [
												{ no: 1, name: "lyrics", kind: "message", T: () => LyricsResponse },
												{ no: 2, name: "colors", kind: "message", T: () => ColorData },
												{ no: 3, name: "hasVocalRemoval", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
												{ no: 4, name: "vocalRemovalColors", kind: "message", T: () => ColorData }
											]);
										}
									}
									const ColorLyricsResponse = new ColorLyricsResponse$Type();
									class LyricsResponse$Type extends MessageType {
										constructor() {
											super("LyricsResponse", [
												{ no: 1, name: "syncType", kind: "enum", T: () => ["SyncType", SyncType] },
												{ no: 2, name: "lines", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => LyricsLine },
												{ no: 3, name: "provider", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 4, name: "providerLyricsId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 5, name: "providerDisplayName", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 6, name: "syncLyricsAndroidIntent", kind: "message", T: () => AndroidIntent },
												{ no: 7, name: "syncLyricsUri", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 8, name: "isDenseTypeface", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
												{ no: 9, name: "alternatives", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Alternative },
												{ no: 10, name: "language", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 11, name: "isRtlLanguage", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
												{ no: 12, name: "fullscreenAction", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
												{ no: 13, name: "showUpsell", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ }
											]);
										}
									}
									const LyricsResponse = new LyricsResponse$Type();
									class LyricsLine$Type extends MessageType {
										constructor() {
											super("LyricsLine", [
												{ no: 1, name: "startTimeMs", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
												{ no: 2, name: "words", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
												{ no: 3, name: "syllables", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Syllable },
												//{ no: 4, name: "endTimeMs", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/ }
											]);
										}
									}
									const LyricsLine = new LyricsLine$Type();
									class Syllable$Type extends MessageType {
										constructor() {
											super("Syllable", [
												{ no: 1, name: "startTimeMs", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
												{ no: 2, name: "numChars", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
											]);
										}
									}
									const Syllable = new Syllable$Type();
									class ColorData$Type extends MessageType {
										constructor() {
											super("ColorData", [
												{ no: 1, name: "background", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
												{ no: 2, name: "text", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
												{ no: 3, name: "highlightText", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
											]);
										}
									}
									const ColorData = new ColorData$Type();
									class AndroidIntent$Type extends MessageType {
										constructor() {
											super("AndroidIntent", [
												{ no: 1, name: "provider", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 2, name: "providerAndroidAppId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 3, name: "action", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 4, name: "data", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 5, name: "contentType", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const AndroidIntent = new AndroidIntent$Type();
									class Alternative$Type extends MessageType {
										constructor() {
											super("Alternative", [
												{ no: 1, name: "language", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 2, name: "lines", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const Alternative = new Alternative$Type();
									/******************  initialization finish  *******************/
									body = ColorLyricsResponse.fromBinary(rawBody);
									$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
									/*
									let UF = UnknownFieldHandler.list(body);
									$.log(`🚧 ${$.name}`, `UF: ${JSON.stringify(UF)}`, "");
									if (UF) {
										UF = UF.map(uf => {
											//uf.no; // 22
											//uf.wireType; // WireType.Varint
											// use the binary reader to decode the raw data:
											let reader = new BinaryReader(uf.data);
											let addedNumber = reader.int32(); // 7777
											$.log(`🚧 ${$.name}`, `no: ${uf.no}, wireType: ${uf.wireType}, reader: ${reader}, addedNumber: ${addedNumber}`, "");
										});
									};
									*/
									//body = await injectionLyric(Settings.LrcVendor, trackInfo, body);
									body.lyrics = await injectionLyric(Settings.LrcVendor, trackInfo, body).then(body => body.lyrics);
									switch (body?.lyrics?.syncType) {
										case "UNSYNCED":
											body.lyrics.syncType = 0;
											break;
										case "LINE_SYNCED":
											body.lyrics.syncType = 1;
											break;
										case "SYLLABLE_SYNCED":
											body.lyrics.syncType = 2;
											break;
									};
									body.lyrics.fullscreenAction = 0;
									if (!$response?.headers?.["Content-Type"] && $response?.headers?.["content-type"]) $response.headers["Content-Type"] = FORMAT;
									$response.status = ($.isQuanX()) ? "HTTP/1.1 200 OK" : 200;
									$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
									rawBody = ColorLyricsResponse.toBinary(body);
									break;
								};
							};
							break;
						case "application/grpc":
						case "application/grpc+proto":
							break;
					};
					// 写入二进制数据
					//$.log(`🚧 ${$.name}, 调试信息`, `rawBody: ${JSON.stringify(rawBody)}`, "");
					if ($.isQuanX()) $response.bodyBytes = rawBody
					else $response.body = rawBody;
					break;
			};
			// 缓存查询信息
			if (trackInfo?.NeteaseMusic?.id ?? trackInfo?.QQMusic?.mid) {
				Caches.Metadatas.Tracks.set(trackInfo.id, trackInfo);
				// 格式化缓存
				$.log(`🚧 ${$.name}`, `Caches.Metadatas.Tracks: ${JSON.stringify([...Caches.Metadatas.Tracks.entries()])}`, "");
				Caches.Metadatas.Tracks = setCache(Caches.Metadatas.Tracks, Settings.CacheSize);
				// 写入持久化储存
				$.setjson(Caches.Metadatas.Tracks, `@DualSubs.${PLATFORM}.Caches.Metadatas.Tracks`);
			};
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		switch ($response) {
			default: { // 有回复数据，返回回复数据
				//const FORMAT = ($response?.headers?.["Content-Type"] ?? $response?.headers?.["content-type"])?.split(";")?.[0];
				$.log(`🎉 ${$.name}, finally`, `$response`, `FORMAT: ${FORMAT}`, "");
				//$.log(`🚧 ${$.name}, finally`, `$response: ${JSON.stringify($response)}`, "");
				if ($response?.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response?.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				if ($.isQuanX()) {
					switch (FORMAT) {
						case undefined: // 视为无body
							// 返回普通数据
							$.done({ status: $response.status, headers: $response.headers });
							break;
						default:
							// 返回普通数据
							$.done({ status: $response.status, headers: $response.headers, body: $response.body });
							break;
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
						case "application/grpc":
						case "application/grpc+proto":
						case "applecation/octet-stream":
							// 返回二进制数据
							//$.log(`${$response.bodyBytes.byteLength}---${$response.bodyBytes.buffer.byteLength}`);
							$.done({ status: $response.status, headers: $response.headers, bodyBytes: $response.bodyBytes.buffer.slice($response.bodyBytes.byteOffset, $response.bodyBytes.byteLength + $response.bodyBytes.byteOffset) });
							break;
					};
				} else $.done($response);
				break;
			};
			case undefined: { // 无回复数据
				break;
			};
		};
	})

/***************** Function *****************/
/**
 * Set Cache
 * @author VirgilClyne
 * @param {Map} cache - Playlists Cache / Subtitles Cache
 * @param {Number} cacheSize - Cache Size
 * @return {Boolean} isSaved
 */
function setCache(cache, cacheSize = 100) {
	$.log(`☑️ ${$.name}, Set Cache, cacheSize: ${cacheSize}`, "");
	cache = Array.from(cache || []); // Map转Array
	cache = cache.slice(-cacheSize); // 限制缓存大小
	$.log(`✅ ${$.name}, Set Cache`, "");
	return cache;
};

/**
 * Fetch Ruled Reqeust
 * @author VirgilClyne
 * @link https://github.com/BiliUniverse/Global/blob/main/js/BiliBili.Global.request.js
 * @param {Object} request - Original Request Content
 * @return {Promise<*>}
 */
async function Fetch(request = {}) {
	$.log(`☑️ ${$.name}, Fetch Ruled Reqeust`, "");
	//const FORMAT = (request?.headers?.["Content-Type"] ?? request?.headers?.["content-type"])?.split(";")?.[0];
	$.log(`⚠ ${$.name}, Fetch Ruled Reqeust`, `FORMAT: ${FORMAT}`, "");
	if ($.isQuanX()) {
		switch (FORMAT) {
			case undefined: // 视为无body
				// 返回普通数据
				break;
			default:
				// 返回普通数据
				delete request.bodyBytes;
				break;
			case "application/protobuf":
			case "application/x-protobuf":
			case "application/vnd.google.protobuf":
			case "application/grpc":
			case "application/grpc+proto":
			//case "applecation/octet-stream":
				// 返回二进制数据
				delete request.body;
				if (ArrayBuffer.isView(request.bodyBytes)) request.bodyBytes = request.bodyBytes.buffer.slice(request.bodyBytes.byteOffset, request.bodyBytes.byteLength + request.bodyBytes.byteOffset);
				break;
		};
	};
	let response = (request?.body ?? request?.bodyBytes)
		? await $.http.post(request)
		: await $.http.get(request);
	$.log(`✅ ${$.name}, Fetch Ruled Reqeust`, "");
	$.log(`🚧 ${$.name}, Fetch Ruled Reqeust`, `Response:${JSON.stringify(response)}`, "");
	return response;
};

async function injectionLyric(vendor = "QQMusic", trackInfo = {}, body = $response.body) {
	$.log(`☑️ ${$.name}, Injection Lyric`, `vendor: ${vendor}, trackInfo: ${JSON.stringify(trackInfo)}`, "");
	const UAPool = [
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", // 13.5%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36", // 6.6%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0", // 6.4%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0", // 6.2%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36", // 5.2%
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36", // 4.8%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134",
		"Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
		"Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
		"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0",
	];
	// 外部歌词
	let externalLyric = undefined;
	let transLyric = undefined;
	// 构建歌词结构
	if (!body) body = {};
	// 按平台填充必要歌词信息
	switch (PLATFORM) {
		case "Spotify":
			body.lyrics = {
				"syncType": "UNSYNCED",
				//"syncType": 1,
				"lines": [
					{
						"startTimeMs": "0",
						"words": "",
						"syllables": [],
						"endTimeMs": "0"
					}
				],
				"provider": "",
				"providerLyricsId": "",
				"providerDisplayName": "",
				"syncLyricsUri": "",
				"isDenseTypeface": true,
				"alternatives": [],
				"language": "",
				//"isRtlLanguage": false,
				//"fullscreenAction": "FULLSCREEN_LYRICS",
				//"showUpsell": false,
				//"capStatus": "NONE",
				//"impressionsRemaining": 0
			};
			body.colors = {
				"background": -8421504, // 灰色
				"text": -16777216, // 黑色
				"highlightText": -1 // 白色
			};
			body.hasVocalRemoval = false;
			break;
	};
	// 查询 提取 转换
	switch (vendor) {
		case "NeteaseMusicNodeJS":
		case "NeteaseMusic":
			if (!trackInfo?.NeteaseMusic?.id) trackInfo.NeteaseMusic = await searchTrack(vendor, `${trackInfo.track} ${trackInfo.artist}`, UAPool);
			if (trackInfo?.NeteaseMusic?.id) externalLyric = await searchLyric(vendor, trackInfo.NeteaseMusic.id, UAPool);
			if (externalLyric?.tlyric?.lyric) transLyric = LRC.toSpotify(externalLyric?.tlyric?.lyric);
			switch (PLATFORM) {
				case "Spotify":
					if (externalLyric?.yrc?.lyric) {
						body.lyrics.syncType = "SYLLABLE_SYNCED";
						body.lyrics.lines = LRC.toSpotify(externalLyric?.yrc?.lyric);
					} else if (externalLyric?.lrc?.lyric) {
						body.lyrics.syncType = "LINE_SYNCED";
						body.lyrics.lines = LRC.toSpotify(externalLyric?.lrc?.lyric);
					};
					body.lyrics.provider = "NeteaseMusic";
					body.lyrics.providerLyricsId = trackInfo?.NeteaseMusic?.id?.toString?.();
					body.lyrics.providerDisplayName = `网易云音乐 - ${externalLyric?.lyricUser?.nickname ?? "未知"}`;
					body.colors.background = -8249806; // 网易红 8527410 #821E32 rgb(130,30,50)
					//body.colors.background = -55775; // 网易红 16721441 #FF2621 rgb(255,38,33)
					$.log(`🚧 ${$.name}, 调试信息`, `body.lyrics.lines: ${JSON.stringify(body.lyrics.lines)}`, "");
					break
				case "YouTube":
					break;
			};
			break;
		case "QQMusic":
		default:
			if (!trackInfo?.QQMusic?.mid) trackInfo.QQMusic = await searchTrack(vendor, `${trackInfo.track} ${trackInfo.artist}`, UAPool);
			if (trackInfo?.QQMusic?.mid) externalLyric = await searchLyric(vendor, trackInfo.QQMusic.mid, UAPool);
			if (externalLyric?.trans) transLyric = LRC.toSpotify(externalLyric?.trans);
			switch (PLATFORM) {
				case "Spotify":
					if (externalLyric?.lyric) {
						body.lyrics.syncType = "LINE_SYNCED";
						body.lyrics.lines = LRC.toSpotify(externalLyric?.lyric);
					};
					body.lyrics.provider = "QQMusic";
					body.lyrics.providerLyricsId = trackInfo?.QQMusic?.mid?.toString?.();
					body.lyrics.providerDisplayName = `QQ音乐`;
					body.colors.background = -11038189; // QQ音乐绿 5739027 #579213 rgb(87,146,19)
					$.log(`🚧 ${$.name}, 调试信息`, `body.lyrics.lines: ${JSON.stringify(body.lyrics.lines)}`, "");
					break
				case "YouTube":
					break;
			};
			break;
	};
	// 翻译歌词
	if (transLyric) {
		let duolyric = LRC.combineSpotify(body.lyrics.lines, transLyric);
		switch (PLATFORM) {
			case "Spotify":
				switch ($request?.headers?.["app-platform"] ?? $request?.headers?.["App-Platform"]) {
					case "OSX": // macOS App 暂不支持翻译功能
					case "Win32_x86_64": // Windows App 暂不支持翻译功能
					case "WebPlayer": // Web App
					case undefined:
					default:
						/*
						body.lyrics.lines = body.lyrics.lines.map((line, i) => {
							if (line?.words) line.words = combineText(line.words, duolyric?.[i]?.twords ?? "♪");
							return line;
						});
						*/
						body.lyrics.lines = LRC.separateSpotify(duolyric).map(line => {
							line.startTimeMs = line.startTimeMs.toString();
							line.endTimeMs = line.endTimeMs.toString();
							return line;
						});
					//break; 不中断，继续处理
					case "iOS":
						body.lyrics.alternatives.unshift({
							"language": "zh",
							"lines": duolyric.map(line => line?.twords ?? "♪")
						});
						break;
				};
				break
			case "YouTube":
				break;
		};
	};

	$.log(`✅ ${$.name}, Injection Lyric`, "");
	$.log(`🚧 ${$.name}, Injection Lyric`, `body: ${JSON.stringify(body)}`, "");
	return body;
};

async function searchTrack(vendor = "QQMusic", keyword = "", UAPool = []){
	$.log(`☑️ ${$.name}, Search Track`, `vendor: ${vendor}, keyword: ${keyword}`, "");
	const searchRequest = {
		"headers": {
			"Accept": "application/json",
			"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)], // 随机UA
		}
	};
	const trackInfo = {};
	switch (vendor) {
		case "NeteaseMusicNodeJS": {
			const HostPool = [
				"api.music.areschang.top",
				"mu-api.yuk0.com",
				"netease.happyking.top",
				"music.lovethewind.cn",
				"neteasecloudmusicapi.nanocat.cloud"
			];
			// 搜索歌曲
			const searchUrl = {
				"scheme": "https",
				"host": HostPool[Math.floor(Math.random() * HostPool.length)],
				//"path": "search",
				"path": "cloudsearch",
				"query": {
					"type": 1,
					"limit": 1,
					"offset": 0,
					"keywords": encodeURIComponent(keyword),
				}
			};
			$.log(`🚧 ${$.name}, 调试信息`, `searchUrl: ${JSON.stringify(searchUrl)}`, "");
			searchRequest.url = URI.stringify(searchUrl);
			searchRequest.headers.Referer = "https://music.163.com";
			const searchResult = await $.http.get(searchRequest).then(response => {
				//$.log(`🚧 ${$.name}, 调试信息`, `searchResult: ${JSON.stringify(response.body)}`, "");
				body = JSON.parse(response.body);
				trackInfo.id = body?.result?.songs?.[0]?.id;
				trackInfo.track = body?.result?.songs?.[0]?.name;
				trackInfo.album = body?.result?.songs?.[0]?.ar?.name;
				trackInfo.artist = body?.result?.songs?.[0]?.al?.name;
			});
			break;
		};
		case "NeteaseMusic": {
			const searchUrl = {
				"scheme": "https",
				"host": "music.163.com",
				"path": "api/search/pc",
				"query": {
					"type": 1,
					"limit": 1,
					"offset": 0,
					"s": encodeURIComponent(keyword),
				}
			};
			$.log(`🚧 ${$.name}, 调试信息`, `searchUrl: ${JSON.stringify(searchUrl)}`, "");
			searchRequest.url = URI.stringify(searchUrl);
			searchRequest.headers.Referer = "https://music.163.com";
			const searchResult = await $.http.get(searchRequest).then(response => {
				$.log(`🚧 ${$.name}, 调试信息`, `searchResult: ${JSON.stringify(response.body)}`, "");
				body = JSON.parse(response.body);
				trackInfo.id = body?.result?.songs?.[0]?.id;
				trackInfo.track = body?.result?.songs?.[0]?.name;
				trackInfo.album = body?.result?.songs?.[0]?.ar?.name;
				trackInfo.artist = body?.result?.songs?.[0]?.al?.name;
			});
			break;
		};
		case "QQMusic":
		default: {
			const searchUrl = {
				"scheme": "https",
				"host": "u.y.qq.com",
				"path": "cgi-bin/musicu.fcg"
			};
			$.log(`🚧 ${$.name}, 调试信息`, `searchUrl: ${JSON.stringify(searchUrl)}`, "");
			searchRequest.url = URI.stringify(searchUrl);
			searchRequest.headers.Referer = "https://c.y.qq.com";
			searchRequest.body = JSON.stringify({
				"music.search.SearchCgiService": {
					"method": "DoSearchForQQMusicDesktop",
					"module": "music.search.SearchCgiService",
					"param": {
						"num_per_page": 1,
						"page_num": 1,
						"query": keyword,
						"search_type": 0
					}
				}
			});
			const searchResult = await $.http.post(searchRequest).then(response => {
				$.log(`🚧 ${$.name}, 调试信息`, `searchResult: ${JSON.stringify(response.body)}`, "");
				body = JSON.parse(response.body);
				body = body["music.search.SearchCgiService"].data.body;
				trackInfo.mid = body?.song?.list?.[0]?.mid;
				trackInfo.track = body?.song?.list?.[0]?.name;
				trackInfo.album = body?.song?.list?.[0]?.album?.name;
				trackInfo.artist = body?.song?.list?.[0]?.singer?.[0]?.name;
			});
			break;
		};
		case "QQMusicOld": {
			const searchUrl = {
				"scheme": "https",
				"host": "c.y.qq.com",
				"path": "soso/fcgi-bin/search_for_qq_cp",
				//"path": "soso/fcgi-bin/client_search_cp",
				"query": {
					"format": "json",
					//"outCharset": 'utf-8',
					//"ct": 24,
					//"qqmusic_ver": 1298,
					"p": 1,
					"n": 1,
					"w": encodeURIComponent(keyword),
					//"key": encodeURIComponent(keyword),
					"remoteplace": 'txt.yqq.song',
					//"t": 0,
					//"aggr": 1,
					//"cr": 1,
					//"lossless": 0,
					//"flag_qc": 0,
					//"platform": 'yqq.json',
				}
			};
			$.log(`🚧 ${$.name}, 调试信息`, `searchUrl: ${JSON.stringify(searchUrl)}`, "");
			searchRequest.url = URI.stringify(searchUrl);
			searchRequest.headers.Referer = "https://c.y.qq.com";
			const searchResult = await $.http.get(searchRequest).then(response => {
				$.log(`🚧 ${$.name}, 调试信息`, `searchResult: ${JSON.stringify(response.body)}`, "");
				body = JSON.parse(response.body);
				trackInfo.mid = body?.data?.song?.list?.[0]?.songmid;
				trackInfo.track = body?.data?.song?.list?.[0]?.songname;
				trackInfo.album = body?.data?.song?.list?.[0]?.albumname;
				trackInfo.artist = body?.data?.song?.list?.[0]?.singer?.[0]?.name;
			});
			break;
		};
	};
	$.log(`✅ ${$.name}, Search Track`, `trackInfo: ${JSON.stringify(trackInfo)}`, "");
	return trackInfo;
};

async function searchLyric(vendor = "QQMusic", trackId = undefined, UAPool = []){
	$.log(`☑️ ${$.name}, Search Lyric`, `vendor: ${vendor}, trackId: ${trackId}`, "");
	const lyricRequest = {
		"headers": {
			"Accept": "application/json",
			"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)], // 随机UA
		}
	};
	let lyricResult = {};
	switch (vendor) {
		case "NeteaseMusicNodeJS": {
			const HostPool = [
				"api.music.areschang.top",
				"mu-api.yuk0.com",
				"netease.happyking.top",
				"music.lovethewind.cn",
				"neteasecloudmusicapi.nanocat.cloud"
			];
			const lyricUrl = {
				"scheme": "https",
				"host": HostPool[Math.floor(Math.random() * HostPool.length)],
				"path": "lyric/new",
				"query": {
					"id": trackId // trackInfo.NeteaseMusic.id
				}
			};
			$.log(`🚧 ${$.name}, 调试信息`, `lyricUrl: ${JSON.stringify(lyricUrl)}`, "");
			lyricRequest.url = URI.stringify(lyricUrl);
			lyricRequest.headers.Referer = "https://music.163.com";
			lyricResult = await $.http.get(lyricRequest).then(response => JSON.parse(response.body));
			break;
		};
		case "NeteaseMusic": {
			const lyricUrl = {
				"scheme": "https",
				"host": "music.163.com",
				"path": "api/song/media",
				"query": {
					"id": trackId // trackInfo.NeteaseMusic.id
				}
			};
			$.log(`🚧 ${$.name}, 调试信息`, `lyricUrl: ${JSON.stringify(lyricUrl)}`, "");
			lyricRequest.url = URI.stringify(lyricUrl);
			lyricRequest.headers.Referer = "https://music.163.com";
			lyricResult = await $.http.get(lyricRequest).then(response => JSON.parse(response.body));
			break;
		};
		case "QQMusic":
		default: {
			const lyricUrl = {
				"scheme": "https",
				"host": "c.y.qq.com",
				"path": "lyric/fcgi-bin/fcg_query_lyric_new.fcg",
				"query": {
					"g_tk": "5381",
					"format": "json",
					"nobase64": "1",
					"songmid": trackId // trackInfo.QQMusic.mid
				}
			};
			$.log(`🚧 ${$.name}, 调试信息`, `lyricUrl: ${JSON.stringify(lyricUrl)}`, "");
			lyricRequest.url = URI.stringify(lyricUrl);
			lyricRequest.headers.Referer = "https://lyric.music.qq.com";
			lyricResult = await $.http.get(lyricRequest).then(response => JSON.parse(response.body));
			break;
		};
	};
	$.log(`✅ ${$.name}, Search Lyric`, "");
	$.log(`🚧 ${$.name}, Search Lyric`, `lyricResult: ${JSON.stringify(lyricResult)}`, "");
	return lyricResult;
};

/**
 * combine two text
 * @author VirgilClyne
 * @param {String} originText - original text
 * @param {String} transText - translate text
 * @param {Boolean} ShowOnly - only show translate text
 * @param {String} position - position
 * @param {String} lineBreak - line break
 * @return {String} combined text
 */
function combineText(originText, transText, ShowOnly = false, position = "Forward", lineBreak = "\n") {
	let text = "";
	switch (ShowOnly) {
		case true:
			text = transText;
			break;
		case false:
		default:
			switch (position) {
				case "Forward":
				default:
					text = `${originText}${lineBreak}${transText}`;
					break;
				case "Reverse":
					text = `${transText}${lineBreak}${originText}`;
					break;
			}
	}
	return text;
};

/** 
 * Chunk Array
 * @author VirgilClyne
 * @param {Array} source - source
 * @param {Number} length - number
 * @return {Array<*>} target
 */
function chunk(source, length) {
	$.log(`⚠ ${$.name}, Chunk Array`, "");
    var index = 0, target = [];
    while(index < source.length) target.push(source.slice(index, index += length));
	//$.log(`🎉 ${$.name}, Chunk Array`, `target: ${JSON.stringify(target)}`, "");
	return target;
};

/**
 * Retries the given function until it succeeds given a number of retries and an interval between them. They are set
 * by default to retry 5 times with 1sec in between. There's also a flag to make the cooldown time exponential
 * @link https://gitlab.com/-/snippets/1775781
 * @author Daniel Iñigo <danielinigobanos@gmail.com>
 * @param {Function} fn - Returns a promise
 * @param {Number} retriesLeft - Number of retries. If -1 will keep retrying
 * @param {Number} interval - Millis between retries. If exponential set to true will be doubled each retry
 * @param {Boolean} exponential - Flag for exponential back-off mode
 * @return {Promise<*>}
 */
async function retry(fn, retriesLeft = 5, interval = 1000, exponential = false) {
	$.log(`☑️ ${$.name}, retry, 剩余重试次数:${retriesLeft}`, `时间间隔:${interval}ms`);
	try {
		const val = await fn();
		return val;
	} catch (error) {
		if (retriesLeft) {
			await new Promise(r => setTimeout(r, interval));
			return retry(fn, retriesLeft - 1, exponential ? interval * 2 : interval, exponential);
		} else throw new Error(`❌ ${$.name}, retry, 最大重试次数`);
	}
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/DualSubs/LRC/blob/main/LRCs.embedded.min.js
function LRCs(opts) {
	return new (class {
		constructor(opts) {
			this.name = "LRC v0.4.0";
			this.opts = opts;
			this.newLine = "\n";
		};

		toSpotify(txt = new String) {
			console.log(`☑️ ${this.name}, LRC.toSpotify`, "");
			let json = txt?.split?.(this.newLine)?.filter?.(Boolean)?.map?.(line=> {
				const Line = {
					"startTimeMs": 0,
					"words": "",
					"syllables": [],
					"endTimeMs": 0
				};
				switch (line?.trim?.()?.substring?.(0, 1)) {
					case "{":
						line = JSON.parse(line);
						//$.log(`🚧 ${$.name}, 调试信息`, `line: ${JSON.stringify(line)}`, "");
						Line.startTimeMs = (line.t < 0) ? 0 : line.t;
						Line.words = line?.c?.map?.(word => word.tx).join("");
						break;
					case "[":
						const LineRegex = /^\[(?:(?<startTimeMs>(\d\d:\d\d\.\d\d\d?|\d+,\d+))|(?<tag>\w+:.*))\](?<words>.*)?/;
						const SyllableRegex = /\((?<startTimeMs>\d+),\d+,\d+\)/g;
						line = line.match(LineRegex)?.groups;
						//$.log(`🚧 ${$.name}, 调试信息`, `line: ${JSON.stringify(line)}`, "");
						if (line?.startTimeMs?.includes(":")) {
							Line.startTimeMs = (line?.startTimeMs ?? "0:0").split(":");
							Line.startTimeMs = Math.round((parseInt(Line.startTimeMs[0], 10) * 60 + parseFloat(Line.startTimeMs[1], 10)) * 1000);
							if (Line.startTimeMs < 0) Line.startTimeMs = 0;
						} else if (line?.startTimeMs?.includes(",")) Line.startTimeMs = parseInt(line?.startTimeMs?.split(",")?.[0], 10);
						if (SyllableRegex.test(line?.words)) {
							let index = 0, syllablesArray = [], syllablesOriginArray = line?.words?.split(SyllableRegex);
							syllablesOriginArray.shift();
							$.log(`🚧 ${$.name}, 调试信息`, `syllablesOriginArray: ${JSON.stringify(syllablesOriginArray)}`, "");
    						while(index < syllablesOriginArray.length) syllablesArray.push(syllablesOriginArray.slice(index, index += 2));
							syllablesArray.forEach((syllables) => {
								Line.words += syllables[1];
								let syllable = {
									"startTimeMs": parseInt(syllables[0], 10),
									"numChars": syllables[1].length
								};
								Line.syllables.push(syllable);
							});
						} else Line.words = line?.words?.decodeHTML?.() ?? "";
						break;
				};
				$.log(`🚧 ${$.name}, 调试信息`, `Line: ${JSON.stringify(Line)}`, "");
				return Line;
			});
			console.log(`✅ ${this.name}, LRC.toSpotify, json: ${JSON.stringify(json)}`, "");
			return json;
		};

		fromSpotify(json = new Array) {
			console.log(`☑️ ${this.name}, LRC.fromSpotify`, "");
		};

		combineSpotify(array1 = new Array, array2 = new Array) {
			console.log(`☑️ ${this.name}, LRC.combineSpotify`, "");
			let combineLyric = [];
			for (let line1 of array1) {
				let line = line1;
				for (let line2 of array2) {
					if (Math.abs(line1.startTimeMs - line2.startTimeMs) < 1000) {
						line = {
							"startTimeMs": line1.startTimeMs,
							"words": line1?.words ?? "",
							"twords": line2?.words ?? "",
							"syllables": line1?.syllables ?? [],
							"endTimeMs": 0
						};
						break;
					};
				};
				combineLyric.push(line);
			};
			console.log(`✅ ${this.name}, LRC.combineSpotify, combineLyric: ${JSON.stringify(combineLyric)}`, "");
			return combineLyric;
		};

		separateSpotify(array = new Array) {
			console.log(`☑️ ${this.name}, LRC.separateSpotify`, "");
			let separateLyric = array.map(line => {
				let line1 = {
					"startTimeMs": line.startTimeMs,
					"words": line?.words ?? "",
					"syllables": line?.syllables ?? [],
					"endTimeMs": 0
				};
				let line2 = {
					"startTimeMs": line.startTimeMs + 100,
					"words": line?.twords ?? "",
					"syllables": [],
					"endTimeMs": 0
				};
				return [line1, line2];
			}).flat(Infinity);
			console.log(`✅ ${this.name}, LRC.separateSpotify, separateLyric: ${JSON.stringify(separateLyric)}`, "");
			return separateLyric;
		};
	})(opts)
};

String.prototype.decodeHTML = function () {
	return this.replace(/&apos;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&gt;/g, '>')
		.replace(/&lt;/g, '<')
		.replace(/&amp;/g, '&');
};


/***/ }),

/***/ "./src/ENV/ENV.mjs":
/*!*************************!*\
  !*** ./src/ENV/ENV.mjs ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Http: () => (/* binding */ Http),
/* harmony export */   "default": () => (/* binding */ ENV)
/* harmony export */ });
class ENV {
	constructor(name, opts) {
		this.name = name
		this.http = new Http(this)
		this.data = null
		this.dataFile = 'box.dat'
		this.logs = []
		this.isMute = false
		this.isNeedRewrite = false
		this.logSeparator = '\n'
		this.encoding = 'utf-8'
		this.startTime = new Date().getTime()
		Object.assign(this, opts)
		this.log('', `🏁 ${this.name}, ENV v1.1.0, 开始!`)
	}

	platform() {
		if ('undefined' !== typeof $environment && $environment['surge-version'])
			return 'Surge'
		if ('undefined' !== typeof $environment && $environment['stash-version'])
			return 'Stash'
		if ('undefined' !== typeof module && !!module.exports) return 'Node.js'
		if ('undefined' !== typeof $task) return 'Quantumult X'
		if ('undefined' !== typeof $loon) return 'Loon'
		if ('undefined' !== typeof $rocket) return 'Shadowrocket'
	}

	isNode() {
		return 'Node.js' === this.platform()
	}

	isQuanX() {
		return 'Quantumult X' === this.platform()
	}

	isSurge() {
		return 'Surge' === this.platform()
	}

	isLoon() {
		return 'Loon' === this.platform()
	}

	isShadowrocket() {
		return 'Shadowrocket' === this.platform()
	}

	isStash() {
		return 'Stash' === this.platform()
	}

	toObj(str, defaultValue = null) {
		try {
			return JSON.parse(str)
		} catch {
			return defaultValue
		}
	}

	toStr(obj, defaultValue = null) {
		try {
			return JSON.stringify(obj)
		} catch {
			return defaultValue
		}
	}

	getjson(key, defaultValue) {
		let json = defaultValue
		const val = this.getdata(key)
		if (val) {
			try {
				json = JSON.parse(this.getdata(key))
			} catch { }
		}
		return json
	}

	setjson(val, key) {
		try {
			return this.setdata(JSON.stringify(val), key)
		} catch {
			return false
		}
	}

	getScript(url) {
		return new Promise((resolve) => {
			this.get({ url }, (error, response, body) => resolve(body))
		})
	}

	runScript(script, runOpts) {
		return new Promise((resolve) => {
			let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
			httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
			let httpapi_timeout = this.getdata(
				'@chavy_boxjs_userCfgs.httpapi_timeout'
			)
			httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
			httpapi_timeout =
				runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
			const [key, addr] = httpapi.split('@')
			const opts = {
				url: `http://${addr}/v1/scripting/evaluate`,
				body: {
					script_text: script,
					mock_type: 'cron',
					timeout: httpapi_timeout
				},
				headers: { 'X-Key': key, 'Accept': '*/*' },
				timeout: httpapi_timeout
			}
			this.post(opts, (error, response, body) => resolve(body))
		}).catch((e) => this.logErr(e))
	}

	loaddata() {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs')
			this.path = this.path ? this.path : require('path')
			const curDirDataFilePath = this.path.resolve(this.dataFile)
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				this.dataFile
			)
			const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
			const isRootDirDataFile =
				!isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
			if (isCurDirDataFile || isRootDirDataFile) {
				const datPath = isCurDirDataFile
					? curDirDataFilePath
					: rootDirDataFilePath
				try {
					return JSON.parse(this.fs.readFileSync(datPath))
				} catch (e) {
					return {}
				}
			} else return {}
		} else return {}
	}

	writedata() {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs')
			this.path = this.path ? this.path : require('path')
			const curDirDataFilePath = this.path.resolve(this.dataFile)
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				this.dataFile
			)
			const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
			const isRootDirDataFile =
				!isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
			const jsondata = JSON.stringify(this.data)
			if (isCurDirDataFile) {
				this.fs.writeFileSync(curDirDataFilePath, jsondata)
			} else if (isRootDirDataFile) {
				this.fs.writeFileSync(rootDirDataFilePath, jsondata)
			} else {
				this.fs.writeFileSync(curDirDataFilePath, jsondata)
			}
		}
	}

	lodash_get(source, path, defaultValue = undefined) {
		const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
		let result = source
		for (const p of paths) {
			result = Object(result)[p]
			if (result === undefined) {
				return defaultValue
			}
		}
		return result
	}

	lodash_set(obj, path, value) {
		if (Object(obj) !== obj) return obj
		if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
		path
			.slice(0, -1)
			.reduce(
				(a, c, i) =>
					Object(a[c]) === a[c]
						? a[c]
						: (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}),
				obj
			)[path[path.length - 1]] = value
		return obj
	}

	getdata(key) {
		let val = this.getval(key)
		// 如果以 @
		if (/^@/.test(key)) {
			const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
			const objval = objkey ? this.getval(objkey) : ''
			if (objval) {
				try {
					const objedval = JSON.parse(objval)
					val = objedval ? this.lodash_get(objedval, paths, '') : val
				} catch (e) {
					val = ''
				}
			}
		}
		return val
	}

	setdata(val, key) {
		let issuc = false
		if (/^@/.test(key)) {
			const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
			const objdat = this.getval(objkey)
			const objval = objkey
				? objdat === 'null'
					? null
					: objdat || '{}'
				: '{}'
			try {
				const objedval = JSON.parse(objval)
				this.lodash_set(objedval, paths, val)
				issuc = this.setval(JSON.stringify(objedval), objkey)
			} catch (e) {
				const objedval = {}
				this.lodash_set(objedval, paths, val)
				issuc = this.setval(JSON.stringify(objedval), objkey)
			}
		} else {
			issuc = this.setval(val, key)
		}
		return issuc
	}

	getval(key) {
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
				return $persistentStore.read(key)
			case 'Quantumult X':
				return $prefs.valueForKey(key)
			case 'Node.js':
				this.data = this.loaddata()
				return this.data[key]
			default:
				return (this.data && this.data[key]) || null
		}
	}

	setval(val, key) {
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
				return $persistentStore.write(val, key)
			case 'Quantumult X':
				return $prefs.setValueForKey(val, key)
			case 'Node.js':
				this.data = this.loaddata()
				this.data[key] = val
				this.writedata()
				return true
			default:
				return (this.data && this.data[key]) || null
		}
	}

	initGotEnv(opts) {
		this.got = this.got ? this.got : require('got')
		this.cktough = this.cktough ? this.cktough : require('tough-cookie')
		this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
		if (opts) {
			opts.headers = opts.headers ? opts.headers : {}
			if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
				opts.cookieJar = this.ckjar
			}
		}
	}

	get(request, callback = () => { }) {
		delete request?.headers?.['Content-Length']
		delete request?.headers?.['content-length']

		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			default:
				if (this.isSurge() && this.isNeedRewrite) {
					this.lodash_set(request, 'headers.X-Surge-Skip-Scripting', false)
				}
				$httpClient.get(request, (error, response, body) => {
					if (!error && response) {
						response.body = body
						response.statusCode = response.status ? response.status : response.statusCode
						response.status = response.statusCode
					}
					callback(error, response, body)
				})
				break
			case 'Quantumult X':
				if (this.isNeedRewrite) {
					this.lodash_set(request, 'opts.hints', false)
				}
				$task.fetch(request).then(
					(response) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body,
							bodyBytes
						} = response
						callback(
							null,
							{ status, statusCode, headers, body, bodyBytes },
							body,
							bodyBytes
						)
					},
					(error) => callback((error && error.error) || 'UndefinedError')
				)
				break
			case 'Node.js':
				let iconv = require('iconv-lite')
				this.initGotEnv(request)
				this.got(request)
					.on('redirect', (response, nextOpts) => {
						try {
							if (response.headers['set-cookie']) {
								const ck = response.headers['set-cookie']
									.map(this.cktough.Cookie.parse)
									.toString()
								if (ck) {
									this.ckjar.setCookieSync(ck, null)
								}
								nextOpts.cookieJar = this.ckjar
							}
						} catch (e) {
							this.logErr(e)
						}
						// this.ckjar.setCookieSync(response.headers['set-cookie'].map(Cookie.parse).toString())
					})
					.then(
						(response) => {
							const {
								statusCode: status,
								statusCode,
								headers,
								rawBody
							} = response
							const body = iconv.decode(rawBody, this.encoding)
							callback(
								null,
								{ status, statusCode, headers, rawBody, body },
								body
							)
						},
						(err) => {
							const { message: error, response: response } = err
							callback(
								error,
								response,
								response && iconv.decode(response.rawBody, this.encoding)
							)
						}
					)
				break
		}
	}

	post(request, callback = () => { }) {
		const method = request.method
			? request.method.toLocaleLowerCase()
			: 'post'

		// 如果指定了请求体, 但没指定 `Content-Type`、`content-type`, 则自动生成。
		if (
			request.body &&
			request.headers &&
			!request.headers['Content-Type'] &&
			!request.headers['content-type']
		) {
			// HTTP/1、HTTP/2 都支持小写 headers
			request.headers['content-type'] = 'application/x-www-form-urlencoded'
		}
		// 为避免指定错误 `content-length` 这里删除该属性，由工具端 (HttpClient) 负责重新计算并赋值
		delete request?.headers?.['Content-Length']
		delete request?.headers?.['content-length']
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			default:
				if (this.isSurge() && this.isNeedRewrite) {
					this.lodash_set(request, 'headers.X-Surge-Skip-Scripting', false)
				}
				$httpClient[method](request, (error, response, body) => {
					if (!error && response) {
						response.body = body
						response.statusCode = response.status ? response.status : response.statusCode
						response.status = response.statusCode
					}
					callback(error, response, body)
				})
				break
			case 'Quantumult X':
				request.method = method
				if (this.isNeedRewrite) {
					this.lodash_set(request, 'opts.hints', false)
				}
				$task.fetch(request).then(
					(response) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body,
							bodyBytes
						} = response
						callback(
							null,
							{ status, statusCode, headers, body, bodyBytes },
							body,
							bodyBytes
						)
					},
					(error) => callback((error && error.error) || 'UndefinedError')
				)
				break
			case 'Node.js':
				let iconv = require('iconv-lite')
				this.initGotEnv(request)
				const { url, ..._request } = request
				this.got[method](url, _request).then(
					(response) => {
						const { statusCode: status, statusCode, headers, rawBody } = response
						const body = iconv.decode(rawBody, this.encoding)
						callback(
							null,
							{ status, statusCode, headers, rawBody, body },
							body
						)
					},
					(err) => {
						const { message: error, response: response } = err
						callback(
							error,
							response,
							response && iconv.decode(response.rawBody, this.encoding)
						)
					}
				)
				break
		}
	}
	/**
	 *
	 * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
	 *    :$.time('yyyyMMddHHmmssS')
	 *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
	 *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
	 * @param {string} format 格式化参数
	 * @param {number} ts 可选: 根据指定时间戳返回格式化日期
	 *
	 */
	time(format, ts = null) {
		const date = ts ? new Date(ts) : new Date()
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'H+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			'S': date.getMilliseconds()
		}
		if (/(y+)/.test(format))
			format = format.replace(
				RegExp.$1,
				(date.getFullYear() + '').substr(4 - RegExp.$1.length)
			)
		for (let k in o)
			if (new RegExp('(' + k + ')').test(format))
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length == 1
						? o[k]
						: ('00' + o[k]).substr(('' + o[k]).length)
				)
		return format
	}

	/**
	 * 系统通知
	 *
	 * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
	 *
	 * 示例:
	 * $.msg(title, subt, desc, 'twitter://')
	 * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
	 * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
	 *
	 * @param {*} title 标题
	 * @param {*} subt 副标题
	 * @param {*} desc 通知详情
	 * @param {*} opts 通知参数
	 *
	 */
	msg(title = name, subt = '', desc = '', opts) {
		const toEnvOpts = (rawopts) => {
			switch (typeof rawopts) {
				case undefined:
					return rawopts
				case 'string':
					switch (this.platform()) {
						case 'Surge':
						case 'Stash':
						default:
							return { url: rawopts }
						case 'Loon':
						case 'Shadowrocket':
							return rawopts
						case 'Quantumult X':
							return { 'open-url': rawopts }
						case 'Node.js':
							return undefined
					}
				case 'object':
					switch (this.platform()) {
						case 'Surge':
						case 'Stash':
						case 'Shadowrocket':
						default: {
							let openUrl =
								rawopts.url || rawopts.openUrl || rawopts['open-url']
							return { url: openUrl }
						}
						case 'Loon': {
							let openUrl =
								rawopts.openUrl || rawopts.url || rawopts['open-url']
							let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
							return { openUrl, mediaUrl }
						}
						case 'Quantumult X': {
							let openUrl =
								rawopts['open-url'] || rawopts.url || rawopts.openUrl
							let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
							let updatePasteboard =
								rawopts['update-pasteboard'] || rawopts.updatePasteboard
							return {
								'open-url': openUrl,
								'media-url': mediaUrl,
								'update-pasteboard': updatePasteboard
							}
						}
						case 'Node.js':
							return undefined
					}
				default:
					return undefined
			}
		}
		if (!this.isMute) {
			switch (this.platform()) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Shadowrocket':
				default:
					$notification.post(title, subt, desc, toEnvOpts(opts))
					break
				case 'Quantumult X':
					$notify(title, subt, desc, toEnvOpts(opts))
					break
				case 'Node.js':
					break
			}
		}
		if (!this.isMuteLog) {
			let logs = ['', '==============📣系统通知📣==============']
			logs.push(title)
			subt ? logs.push(subt) : ''
			desc ? logs.push(desc) : ''
			console.log(logs.join('\n'))
			this.logs = this.logs.concat(logs)
		}
	}

	log(...logs) {
		if (logs.length > 0) {
			this.logs = [...this.logs, ...logs]
		}
		console.log(logs.join(this.logSeparator))
	}

	logErr(error) {
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			case 'Quantumult X':
			default:
				this.log('', `❗️ ${this.name}, 错误!`, error)
				break
			case 'Node.js':
				this.log('', `❗️${this.name}, 错误!`, error.stack)
				break
		}
	}

	wait(time) {
		return new Promise((resolve) => setTimeout(resolve, time))
	}

	done(val = {}) {
		const endTime = new Date().getTime()
		const costTime = (endTime - this.startTime) / 1000
		this.log('', `🚩 ${this.name}, 结束! 🕛 ${costTime} 秒`)
		this.log()
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			case 'Quantumult X':
			default:
				$done(val)
				break
			case 'Node.js':
				process.exit(1)
				break
		}
	}

	/**
	 * Get Environment Variables
	 * @link https://github.com/VirgilClyne/GetSomeFries/blob/main/function/getENV/getENV.js
	 * @author VirgilClyne
	 * @param {String} key - Persistent Store Key
	 * @param {Array} names - Platform Names
	 * @param {Object} database - Default Database
	 * @return {Object} { Settings, Caches, Configs }
	 */
	getENV(key, names, database) {
		//this.log(`☑️ ${this.name}, Get Environment Variables`, "");
		/***************** BoxJs *****************/
		// 包装为局部变量，用完释放内存
		// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
		let BoxJs = this.getjson(key, database);
		//this.log(`🚧 ${this.name}, Get Environment Variables`, `BoxJs类型: ${typeof BoxJs}`, `BoxJs内容: ${JSON.stringify(BoxJs)}`, "");
		/***************** Argument *****************/
		let Argument = {};
		if (typeof $argument !== "undefined") {
			if (Boolean($argument)) {
				//this.log(`🎉 ${this.name}, $Argument`);
				let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=").map(i => i.replace(/\"/g, ''))));
				//this.log(JSON.stringify(arg));
				for (let item in arg) this.setPath(Argument, item, arg[item]);
				//this.log(JSON.stringify(Argument));
			};
			//this.log(`✅ ${this.name}, Get Environment Variables`, `Argument类型: ${typeof Argument}`, `Argument内容: ${JSON.stringify(Argument)}`, "");
		};
		/***************** Store *****************/
		const Store = { Settings: database?.Default?.Settings || {}, Configs: database?.Default?.Configs || {}, Caches: {} };
		if (!Array.isArray(names)) names = [names];
		//this.log(`🚧 ${this.name}, Get Environment Variables`, `names类型: ${typeof names}`, `names内容: ${JSON.stringify(names)}`, "");
		for (let name of names) {
			Store.Settings = { ...Store.Settings, ...database?.[name]?.Settings, ...Argument, ...BoxJs?.[name]?.Settings };
			Store.Configs = { ...Store.Configs, ...database?.[name]?.Configs };
			if (BoxJs?.[name]?.Caches && typeof BoxJs?.[name]?.Caches === "string") BoxJs[name].Caches = JSON.parse(BoxJs?.[name]?.Caches);
			Store.Caches = { ...Store.Caches, ...BoxJs?.[name]?.Caches };
		};
		//this.log(`🚧 ${this.name}, Get Environment Variables`, `Store.Settings类型: ${typeof Store.Settings}`, `Store.Settings: ${JSON.stringify(Store.Settings)}`, "");
		this.traverseObject(Store.Settings, (key, value) => {
			//this.log(`🚧 ${this.name}, traverseObject`, `${key}: ${typeof value}`, `${key}: ${JSON.stringify(value)}`, "");
			if (value === "true" || value === "false") value = JSON.parse(value); // 字符串转Boolean
			else if (typeof value === "string") {
				if (value.includes(",")) value = value.split(",").map(item => this.string2number(item)); // 字符串转数组转数字
				else value = this.string2number(value); // 字符串转数字
			};
			return value;
		});
		//this.log(`✅ ${this.name}, Get Environment Variables`, `Store: ${typeof Store.Caches}`, `Store内容: ${JSON.stringify(Store)}`, "");
		return Store;
	};

	/***************** function *****************/
	setPath(object, path, value) { path.split(".").reduce((o, p, i) => o[p] = path.split(".").length === ++i ? value : o[p] || {}, object) }
	traverseObject(o, c) { for (var t in o) { var n = o[t]; o[t] = "object" == typeof n && null !== n ? this.traverseObject(n, c) : c(t, n) } return o }
	string2number(string) { if (string && !isNaN(string)) string = parseInt(string, 10); return string }
}

class Http {
	constructor(env) {
		this.env = env
	}

	send(opts, method = 'GET') {
		opts = typeof opts === 'string' ? { url: opts } : opts
		let sender = this.get
		if (method === 'POST') {
			sender = this.post
		}
		return new Promise((resolve, reject) => {
			sender.call(this, opts, (error, response, body) => {
				if (error) reject(error)
				else resolve(response)
			})
		})
	}

	get(opts) {
		return this.send.call(this.env, opts)
	}

	post(opts) {
		return this.send.call(this.env, opts, 'POST')
	}
}


/***/ }),

/***/ "./src/URI/URI.mjs":
/*!*************************!*\
  !*** ./src/URI/URI.mjs ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ URI)
/* harmony export */ });
class URI {
	constructor(opts = []) {
		this.name = "URI v1.2.6";
		this.opts = opts;
		this.json = { scheme: "", host: "", path: "", query: {} };
	};

	parse(url) {
		const URLRegex = /(?:(?<scheme>.+):\/\/(?<host>[^/]+))?\/?(?<path>[^?]+)?\??(?<query>[^?]+)?/;
		let json = url.match(URLRegex)?.groups ?? null;
		if (json?.path) json.paths = json.path.split("/"); else json.path = "";
		//if (json?.paths?.at(-1)?.includes(".")) json.format = json.paths.at(-1).split(".").at(-1);
		if (json?.paths) {
			const fileName = json.paths[json.paths.length - 1];
			if (fileName?.includes(".")) {
				const list = fileName.split(".");
				json.format = list[list.length - 1];
			}
		}
		if (json?.query) json.query = Object.fromEntries(json.query.split("&").map((param) => param.split("=")));
		return json
	};

	stringify(json = this.json) {
		let url = "";
		if (json?.scheme && json?.host) url += json.scheme + "://" + json.host;
		if (json?.path) url += (json?.host) ? "/" + json.path : json.path;
		if (json?.query) url += "?" + Object.entries(json.query).map(param => param.join("=")).join("&");
		return url
	};
}


/***/ }),

/***/ "./src/function/detectFormat.mjs":
/*!***************************************!*\
  !*** ./src/function/detectFormat.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectFormat)
/* harmony export */ });
/**
 * detect Format
 * @author VirgilClyne
 * @param {Object} url - Parsed URL
 * @param {String} body - response body
 * @return {String} format - format
 */
function detectFormat(url, body) {
	let format = undefined;
	console.log(`☑️ detectFormat, format: ${url.format ?? url.query?.fmt ?? url.query?.format}`, "");
	switch (url.format ?? url.query?.fmt ?? url.query?.format) {
		case "txt":
			format = "text/plain";
			break;
		case "xml":
		case "srv3":
		case "ttml":
		case "ttml2":
		case "imsc":
			format = "text/xml";
			break;
		case "vtt":
		case "webvtt":
			format = "text/vtt";
			break;
		case "json":
		case "json3":
			format = "application/json";
			break;
		case "m3u":
		case "m3u8":
			format = "application/x-mpegurl";
			break;
		case "plist":
			format = "application/plist";
			break;
		case undefined:
			const HEADER = body?.substring?.(0, 6).trim?.();
			//console.log(`🚧 detectFormat, HEADER: ${HEADER}`, "");
			//console.log(`🚧 detectFormat, HEADER?.substring?.(0, 1): ${HEADER?.substring?.(0, 1)}`, "");
			switch (HEADER) {
				case "<?xml":
					format = "text/xml";
					break;
				case "WEBVTT":
					format = "text/vtt";
					break;
				default:
					switch (HEADER?.substring?.(0, 1)) {
						case "0":
						case "1":
						case "2":
						case "3":
						case "4":
						case "5":
						case "6":
						case "7":
						case "8":
						case "9":
							format = "text/vtt";
							break;
						case "{":
							format = "application/json";
							break;
						case undefined:
						default:
							break;
					};
					break;
				case undefined:
					break;
			};
			break;
	};
	console.log(`✅ detectFormat, format: ${format}`, "");
	return format;
};


/***/ }),

/***/ "./src/function/detectPlatform.mjs":
/*!*****************************************!*\
  !*** ./src/function/detectPlatform.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectPlatform)
/* harmony export */ });
function detectPlatform(url) {
	console.log(`☑️ Detect Platform`, "");
	/***************** Platform *****************/
	let Platform = /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
		: /(\.youtube|youtubei\.googleapis)\.com/i.test(url) ? "YouTube"
			: /\.spotify(cdn)?\.com/i.test(url) ? "Spotify"
				: /\.apple\.com/i.test(url) ? "Apple"
					: /\.(dssott|starott)\.com/i.test(url) ? "Disney+"
						: /(\.(pv-cdn|aiv-cdn|akamaihd|cloudfront)\.net)|s3\.amazonaws\.com\/aiv-prod-timedtext\//i.test(url) ? "PrimeVideo"
							: /prd\.media\.h264\.io/i.test(url) ? "Max"
								: /\.(api\.hbo|hbomaxcdn)\.com/i.test(url) ? "HBOMax"
									: /\.(hulustream|huluim)\.com/i.test(url) ? "Hulu"
										: /\.(cbsaavideo|cbsivideo|cbs)\.com/i.test(url) ? "Paramount+"
											: /\.uplynk\.com/i.test(url) ? "Discovery+"
												: /dplus-ph-/i.test(url) ? "Discovery+Ph"
													: /\.peacocktv\.com/i.test(url) ? "PeacockTV"
														: /\.fubo\.tv/i.test(url) ? "FuboTV"
															: /\.viki\.io/i.test(url) ? "Viki"
																: /(epixhls\.akamaized\.net|epix\.services\.io)/i.test(url) ? "MGM+"
																	: /\.nebula\.app|/i.test(url) ? "Nebula"
																		: "Universal";
    console.log(`✅ Detect Platform, Platform: ${Platform}`, "");
	return Platform;
};


/***/ }),

/***/ "./src/function/setENV.mjs":
/*!*********************************!*\
  !*** ./src/function/setENV.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setENV)
/* harmony export */ });
/* harmony import */ var _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ENV/ENV.mjs */ "./src/ENV/ENV.mjs");
/*
README: https://github.com/DualSubs
*/


const $ = new _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("🍿️ DualSubs: Set Environment Variables");

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV(name, platforms, database) {
	$.log(`☑️ ${$.name}`, "");
	let { Settings, Caches, Configs } = $.getENV(name, platforms, database);
	/***************** Settings *****************/
	if (!Array.isArray(Settings?.Types)) Settings.Types = (Settings.Types) ? [Settings.Types] : []; // 只有一个选项时，无逗号分隔
	if ($.isLoon() && platforms.includes("YouTube")) {
		Settings.AutoCC = $persistentStore.read("自动显示翻译字幕") ?? Settings.AutoCC;
		switch (Settings.AutoCC) {
			case "是":
				Settings.AutoCC = true;
				break;
			case "否":
				Settings.AutoCC = false;
				break;
			default:
				break;
		};
		Settings.ShowOnly = $persistentStore.read("仅输出译文") ?? Settings.ShowOnly;
		switch (Settings.ShowOnly) {
			case "是":
				Settings.ShowOnly = true;
				break;
			case "否":
				Settings.ShowOnly = false;
				break;
			default:
				break;
		};
		Settings.Position = $persistentStore.read("字幕译文位置") ?? Settings.Position;
		switch (Settings.Position) {
			case "译文位于外文之上":
				Settings.Position = "Forward";
				break;
			case "译文位于外文之下":
				Settings.Position = "Reverse";
				break;
			default:
				break;
		};
	};
	$.log(`✅ ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	//$.log(`✅ ${$.name}, Set Environment Variables`, `Caches: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	if (typeof Caches?.Playlists !== "object" || Array.isArray(Caches?.Playlists)) Caches.Playlists = {}; // 创建Playlists缓存
	Caches.Playlists.Master = new Map(JSON.parse(Caches?.Playlists?.Master || "[]")); // Strings转Array转Map
	Caches.Playlists.Subtitle = new Map(JSON.parse(Caches?.Playlists?.Subtitle || "[]")); // Strings转Array转Map
	if (typeof Caches?.Subtitles !== "object") Caches.Subtitles = new Map(JSON.parse(Caches?.Subtitles || "[]")); // Strings转Array转Map
	if (typeof Caches?.Metadatas !== "object" || Array.isArray(Caches?.Metadatas)) Caches.Metadatas = {}; // 创建Playlists缓存
	if (typeof Caches?.Metadatas?.Tracks !== "object") Caches.Metadatas.Tracks = new Map(JSON.parse(Caches?.Metadatas?.Tracks || "[]")); // Strings转Array转Map
	/***************** Configs *****************/
	return { Settings, Caches, Configs };
};


/***/ }),

/***/ "./src/database/Database.json":
/*!************************************!*\
  !*** ./src/database/Database.json ***!
  \************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Default":{"Settings":{"Switch":true,"Type":"Translate","Types":["Official","Translate"],"Languages":["EN","ZH"],"CacheSize":50}},"Universal":{"Settings":{"Switch":true,"Types":["Official","Translate"],"Languages":["EN","ZH"]},"Configs":{"Languages":{"AUTO":"","AR":["ar","ar-001"],"BG":["bg","bg-BG","bul"],"CS":["cs","cs-CZ","ces"],"DA":["da","da-DK","dan"],"DE":["de","de-DE","deu"],"EL":["el","el-GR","ell"],"EN":["en","en-US","eng","en-GB","en-UK","en-CA","en-US SDH"],"EN-CA":["en-CA","en","eng"],"EN-GB":["en-UK","en","eng"],"EN-US":["en-US","en","eng"],"EN-US SDH":["en-US SDH","en-US","en","eng"],"ES":["es","es-419","es-ES","spa","es-419 SDH"],"ES-419":["es-419","es","spa"],"ES-419 SDH":["es-419 SDH","es-419","es","spa"],"ES-ES":["es-ES","es","spa"],"ET":["et","et-EE","est"],"FI":["fi","fi-FI","fin"],"FR":["fr","fr-CA","fr-FR","fra"],"FR-CA":["fr-CA","fr","fra"],"FR-DR":["fr-FR","fr","fra"],"HU":["hu","hu-HU","hun"],"ID":["id","id-id"],"IT":["it","it-IT","ita"],"JA":["ja","ja-JP","jpn"],"KO":["ko","ko-KR","kor"],"LT":["lt","lt-LT","lit"],"LV":["lv","lv-LV","lav"],"NL":["nl","nl-NL","nld"],"NO":["no","nb-NO","nor"],"PL":["pl","pl-PL"],"PT":["pt","pt-PT","pt-BR","por"],"PT-PT":["pt-PT","pt","por"],"PT-BR":["pt-BR","pt","por"],"RO":["ro","ro-RO","ron"],"RU":["ru","ru-RU","rus"],"SK":["sk","sk-SK","slk"],"SL":["sl","sl-SI","slv"],"SV":["sv","sv-SE","swe"],"IS":["is","is-IS","isl"],"ZH":["zh","cmn","zho","zh-CN","zh-Hans","cmn-Hans","zh-TW","zh-Hant","cmn-Hant","zh-HK","yue-Hant","yue"],"ZH-CN":["zh-CN","zh-Hans","cmn-Hans","zho"],"ZH-HANS":["zh-Hans","cmn-Hans","zh-CN","zho"],"ZH-HK":["zh-HK","yue-Hant","yue","zho"],"ZH-TW":["zh-TW","zh-Hant","cmn-Hant","zho"],"ZH-HANT":["zh-Hant","cmn-Hant","zh-TW","zho"],"YUE":["yue","yue-Hant","zh-HK","zho"],"YUE-HK":["yue-Hant","yue","zh-HK","zho"]}}},"YouTube":{"Settings":{"Switch":true,"Type":"Official","Types":["Translate","External"],"Languages":["AUTO","ZH"],"AutoCC":true,"ShowOnly":false},"Configs":{"Languages":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IS":"is-IS","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","YUE":"yue","YUE-HK":"yue-HK","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW"},"translationLanguages":{"DESKTOP":[{"languageCode":"sq","languageName":{"simpleText":"Shqip - 阿尔巴尼亚语"}},{"languageCode":"ak","languageName":{"simpleText":"Ákán - 阿肯语"}},{"languageCode":"ar","languageName":{"simpleText":"العربية - 阿拉伯语"}},{"languageCode":"am","languageName":{"simpleText":"አማርኛ - 阿姆哈拉语"}},{"languageCode":"as","languageName":{"simpleText":"অসমীয়া - 阿萨姆语"}},{"languageCode":"az","languageName":{"simpleText":"آذربايجان ديلی - 阿塞拜疆语"}},{"languageCode":"ee","languageName":{"simpleText":"Èʋegbe - 埃维语"}},{"languageCode":"ay","languageName":{"simpleText":"Aymar aru - 艾马拉语"}},{"languageCode":"ga","languageName":{"simpleText":"Gaeilge - 爱尔兰语"}},{"languageCode":"et","languageName":{"simpleText":"Eesti - 爱沙尼亚语"}},{"languageCode":"or","languageName":{"simpleText":"ଓଡ଼ିଆ - 奥里亚语"}},{"languageCode":"om","languageName":{"simpleText":"Afaan Oromoo - 奥罗莫语"}},{"languageCode":"eu","languageName":{"simpleText":"Euskara - 巴斯克语"}},{"languageCode":"be","languageName":{"simpleText":"Беларуская - 白俄罗斯语"}},{"languageCode":"bg","languageName":{"simpleText":"Български - 保加利亚语"}},{"languageCode":"nso","languageName":{"simpleText":"Sesotho sa Leboa - 北索托语"}},{"languageCode":"is","languageName":{"simpleText":"Íslenska - 冰岛语"}},{"languageCode":"pl","languageName":{"simpleText":"Polski - 波兰语"}},{"languageCode":"bs","languageName":{"simpleText":"Bosanski - 波斯尼亚语"}},{"languageCode":"fa","languageName":{"simpleText":"فارسی - 波斯语"}},{"languageCode":"bho","languageName":{"simpleText":"भोजपुरी - 博杰普尔语"}},{"languageCode":"ts","languageName":{"simpleText":"Xitsonga - 聪加语"}},{"languageCode":"tt","languageName":{"simpleText":"Татарча - 鞑靼语"}},{"languageCode":"da","languageName":{"simpleText":"Dansk - 丹麦语"}},{"languageCode":"de","languageName":{"simpleText":"Deutsch - 德语"}},{"languageCode":"dv","languageName":{"simpleText":"ދިވެހިބަސް - 迪维希语"}},{"languageCode":"ru","languageName":{"simpleText":"Русский - 俄语"}},{"languageCode":"fr","languageName":{"simpleText":"français - 法语"}},{"languageCode":"sa","languageName":{"simpleText":"संस्कृतम् - 梵语"}},{"languageCode":"fil","languageName":{"simpleText":"Filipino - 菲律宾语"}},{"languageCode":"fi","languageName":{"simpleText":"suomi - 芬兰语"}},{"languageCode":"km","languageName":{"simpleText":"ភាសាខ្មែរ - 高棉语"}},{"languageCode":"ka","languageName":{"simpleText":"ქართული - 格鲁吉亚语"}},{"languageCode":"gu","languageName":{"simpleText":"ગુજરાતી - 古吉拉特语"}},{"languageCode":"gn","languageName":{"simpleText":"Avañe\'ẽ - 瓜拉尼语"}},{"languageCode":"kk","languageName":{"simpleText":"Қазақ тілі - 哈萨克语"}},{"languageCode":"ht","languageName":{"simpleText":"Kreyòl ayisyen - 海地克里奥尔语"}},{"languageCode":"ko","languageName":{"simpleText":"한국어 - 韩语"}},{"languageCode":"ha","languageName":{"simpleText":"هَوُسَ - 豪萨语"}},{"languageCode":"nl","languageName":{"simpleText":"Nederlands - 荷兰语"}},{"languageCode":"gl","languageName":{"simpleText":"Galego - 加利西亚语"}},{"languageCode":"ca","languageName":{"simpleText":"català - 加泰罗尼亚语"}},{"languageCode":"cs","languageName":{"simpleText":"čeština - 捷克语"}},{"languageCode":"kn","languageName":{"simpleText":"ಕನ್ನಡ - 卡纳达语"}},{"languageCode":"ky","languageName":{"simpleText":"кыргыз тили - 吉尔吉斯语"}},{"languageCode":"xh","languageName":{"simpleText":"isiXhosa - 科萨语"}},{"languageCode":"co","languageName":{"simpleText":"corsu - 科西嘉语"}},{"languageCode":"hr","languageName":{"simpleText":"hrvatski - 克罗地亚语"}},{"languageCode":"qu","languageName":{"simpleText":"Runa Simi - 克丘亚语"}},{"languageCode":"ku","languageName":{"simpleText":"Kurdî - 库尔德语"}},{"languageCode":"la","languageName":{"simpleText":"lingua latīna - 拉丁语"}},{"languageCode":"lv","languageName":{"simpleText":"latviešu valoda - 拉脱维亚语"}},{"languageCode":"lo","languageName":{"simpleText":"ພາສາລາວ - 老挝语"}},{"languageCode":"lt","languageName":{"simpleText":"lietuvių kalba - 立陶宛语"}},{"languageCode":"ln","languageName":{"simpleText":"lingála - 林加拉语"}},{"languageCode":"lg","languageName":{"simpleText":"Luganda - 卢干达语"}},{"languageCode":"lb","languageName":{"simpleText":"Lëtzebuergesch - 卢森堡语"}},{"languageCode":"rw","languageName":{"simpleText":"Kinyarwanda - 卢旺达语"}},{"languageCode":"ro","languageName":{"simpleText":"Română - 罗马尼亚语"}},{"languageCode":"mt","languageName":{"simpleText":"Malti - 马耳他语"}},{"languageCode":"mr","languageName":{"simpleText":"मराठी - 马拉地语"}},{"languageCode":"mg","languageName":{"simpleText":"Malagasy - 马拉加斯语"}},{"languageCode":"ml","languageName":{"simpleText":"മലയാളം - 马拉雅拉姆语"}},{"languageCode":"ms","languageName":{"simpleText":"bahasa Melayu - 马来语"}},{"languageCode":"mk","languageName":{"simpleText":"македонски јазик - 马其顿语"}},{"languageCode":"mi","languageName":{"simpleText":"te reo Māori - 毛利语"}},{"languageCode":"mn","languageName":{"simpleText":"Монгол хэл - 蒙古语"}},{"languageCode":"bn","languageName":{"simpleText":"বাংলা - 孟加拉语"}},{"languageCode":"my","languageName":{"simpleText":"ဗမာစာ - 缅甸语"}},{"languageCode":"hmn","languageName":{"simpleText":"Hmoob - 苗语"}},{"languageCode":"af","languageName":{"simpleText":"Afrikaans - 南非荷兰语"}},{"languageCode":"st","languageName":{"simpleText":"Sesotho - 南索托语"}},{"languageCode":"ne","languageName":{"simpleText":"नेपाली - 尼泊尔语"}},{"languageCode":"no","languageName":{"simpleText":"Norsk - 挪威语"}},{"languageCode":"pa","languageName":{"simpleText":"ਪੰਜਾਬੀ - 旁遮普语"}},{"languageCode":"pt","languageName":{"simpleText":"Português - 葡萄牙语"}},{"languageCode":"ps","languageName":{"simpleText":"پښتو - 普什图语"}},{"languageCode":"ny","languageName":{"simpleText":"chiCheŵa - 齐切瓦语"}},{"languageCode":"ja","languageName":{"simpleText":"日本語 - 日语"}},{"languageCode":"sv","languageName":{"simpleText":"Svenska - 瑞典语"}},{"languageCode":"sm","languageName":{"simpleText":"Gagana fa\'a Samoa - 萨摩亚语"}},{"languageCode":"sr","languageName":{"simpleText":"Српски језик - 塞尔维亚语"}},{"languageCode":"si","languageName":{"simpleText":"සිංහල - 僧伽罗语"}},{"languageCode":"sn","languageName":{"simpleText":"ChiShona - 绍纳语"}},{"languageCode":"eo","languageName":{"simpleText":"Esperanto - 世界语"}},{"languageCode":"sk","languageName":{"simpleText":"slovenčina - 斯洛伐克语"}},{"languageCode":"sl","languageName":{"simpleText":"slovenščina - 斯洛文尼亚语"}},{"languageCode":"sw","languageName":{"simpleText":"Kiswahili - 斯瓦希里语"}},{"languageCode":"gd","languageName":{"simpleText":"Gàidhlig - 苏格兰盖尔语"}},{"languageCode":"ceb","languageName":{"simpleText":"Binisaya - 宿务语"}},{"languageCode":"so","languageName":{"simpleText":"Soomaaliga - 索马里语"}},{"languageCode":"tg","languageName":{"simpleText":"тоҷикӣ - 塔吉克语"}},{"languageCode":"te","languageName":{"simpleText":"తెలుగు - 泰卢固语"}},{"languageCode":"ta","languageName":{"simpleText":"தமிழ் - 泰米尔语"}},{"languageCode":"th","languageName":{"simpleText":"ไทย - 泰语"}},{"languageCode":"ti","languageName":{"simpleText":"ትግርኛ - 提格利尼亚语"}},{"languageCode":"tr","languageName":{"simpleText":"Türkçe - 土耳其语"}},{"languageCode":"tk","languageName":{"simpleText":"Türkmen - 土库曼语"}},{"languageCode":"cy","languageName":{"simpleText":"Cymraeg - 威尔士语"}},{"languageCode":"ug","languageName":{"simpleText":"ئۇيغۇرچە - 维吾尔语"}},{"languageCode":"und","languageName":{"simpleText":"Unknown - 未知语言"}},{"languageCode":"ur","languageName":{"simpleText":"اردو - 乌尔都语"}},{"languageCode":"uk","languageName":{"simpleText":"українська - 乌克兰语"}},{"languageCode":"uz","languageName":{"simpleText":"O\'zbek - 乌兹别克语"}},{"languageCode":"es","languageName":{"simpleText":"Español - 西班牙语"}},{"languageCode":"fy","languageName":{"simpleText":"Frysk - 西弗里西亚语"}},{"languageCode":"iw","languageName":{"simpleText":"עברית - 希伯来语"}},{"languageCode":"el","languageName":{"simpleText":"Ελληνικά - 希腊语"}},{"languageCode":"haw","languageName":{"simpleText":"ʻŌlelo Hawaiʻi - 夏威夷语"}},{"languageCode":"sd","languageName":{"simpleText":"سنڌي - 信德语"}},{"languageCode":"hu","languageName":{"simpleText":"magyar - 匈牙利语"}},{"languageCode":"su","languageName":{"simpleText":"Basa Sunda - 巽他语"}},{"languageCode":"hy","languageName":{"simpleText":"հայերեն - 亚美尼亚语"}},{"languageCode":"ig","languageName":{"simpleText":"Igbo - 伊博语"}},{"languageCode":"it","languageName":{"simpleText":"Italiano - 意大利语"}},{"languageCode":"yi","languageName":{"simpleText":"ייִדיש - 意第绪语"}},{"languageCode":"hi","languageName":{"simpleText":"हिन्दी - 印地语"}},{"languageCode":"id","languageName":{"simpleText":"Bahasa Indonesia - 印度尼西亚语"}},{"languageCode":"en","languageName":{"simpleText":"English - 英语"}},{"languageCode":"yo","languageName":{"simpleText":"Yorùbá - 约鲁巴语"}},{"languageCode":"vi","languageName":{"simpleText":"Tiếng Việt - 越南语"}},{"languageCode":"jv","languageName":{"simpleText":"Basa Jawa - 爪哇语"}},{"languageCode":"zh-Hant","languageName":{"simpleText":"中文（繁體）- 中文（繁体）"}},{"languageCode":"zh-Hans","languageName":{"simpleText":"中文（简体）"}},{"languageCode":"zu","languageName":{"simpleText":"isiZulu - 祖鲁语"}},{"languageCode":"kri","languageName":{"simpleText":"Krìì - 克里语"}}],"MOBILE":[{"languageCode":"sq","languageName":{"runs":[{"text":"Shqip - 阿尔巴尼亚语"}]}},{"languageCode":"ak","languageName":{"runs":[{"text":"Ákán - 阿肯语"}]}},{"languageCode":"ar","languageName":{"runs":[{"text":"العربية - 阿拉伯语"}]}},{"languageCode":"am","languageName":{"runs":[{"text":"አማርኛ - 阿姆哈拉语"}]}},{"languageCode":"as","languageName":{"runs":[{"text":"অসমীয়া - 阿萨姆语"}]}},{"languageCode":"az","languageName":{"runs":[{"text":"Azərbaycanca - 阿塞拜疆语"}]}},{"languageCode":"ee","languageName":{"runs":[{"text":"Eʋegbe - 埃维语"}]}},{"languageCode":"ay","languageName":{"runs":[{"text":"Aymar - 艾马拉语"}]}},{"languageCode":"ga","languageName":{"runs":[{"text":"Gaeilge - 爱尔兰语"}]}},{"languageCode":"et","languageName":{"runs":[{"text":"Eesti - 爱沙尼亚语"}]}},{"languageCode":"or","languageName":{"runs":[{"text":"ଓଡ଼ିଆ - 奥里亚语"}]}},{"languageCode":"om","languageName":{"runs":[{"text":"Oromoo - 奥罗莫语"}]}},{"languageCode":"eu","languageName":{"runs":[{"text":"Euskara - 巴斯克语"}]}},{"languageCode":"be","languageName":{"runs":[{"text":"Беларуская - 白俄罗斯语"}]}},{"languageCode":"bg","languageName":{"runs":[{"text":"Български - 保加利亚语"}]}},{"languageCode":"nso","languageName":{"runs":[{"text":"Sesotho sa Leboa - 北索托语"}]}},{"languageCode":"is","languageName":{"runs":[{"text":"Íslenska - 冰岛语"}]}},{"languageCode":"pl","languageName":{"runs":[{"text":"Polski - 波兰语"}]}},{"languageCode":"bs","languageName":{"runs":[{"text":"Bosanski - 波斯尼亚语"}]}},{"languageCode":"fa","languageName":{"runs":[{"text":"فارسی - 波斯语"}]}},{"languageCode":"bho","languageName":{"runs":[{"text":"भोजपुरी - 博杰普尔语"}]}},{"languageCode":"ts","languageName":{"runs":[{"text":"Xitsonga - 聪加语"}]}},{"languageCode":"tt","languageName":{"runs":[{"text":"Татарча - 鞑靼语"}]}},{"languageCode":"da","languageName":{"runs":[{"text":"Dansk - 丹麦语"}]}},{"languageCode":"de","languageName":{"runs":[{"text":"Deutsch - 德语"}]}},{"languageCode":"dv","languageName":{"runs":[{"text":"ދިވެހިބަސް - 迪维希语"}]}},{"languageCode":"ru","languageName":{"runs":[{"text":"Русский - 俄语"}]}},{"languageCode":"fr","languageName":{"runs":[{"text":"Français - 法语"}]}},{"languageCode":"sa","languageName":{"runs":[{"text":"संस्कृतम् - 梵语"}]}},{"languageCode":"fil","languageName":{"runs":[{"text":"Filipino - 菲律宾语"}]}},{"languageCode":"fi","languageName":{"runs":[{"text":"Suomi - 芬兰语"}]}},{"languageCode":"km","languageName":{"runs":[{"text":"ភាសាខ្មែរ - 高棉语"}]}},{"languageCode":"ka","languageName":{"runs":[{"text":"ქართული - 格鲁吉亚语"}]}},{"languageCode":"gu","languageName":{"runs":[{"text":"ગુજરાતી - 古吉拉特语"}]}},{"languageCode":"gn","languageName":{"runs":[{"text":"Avañe\'ẽ - 瓜拉尼语"}]}},{"languageCode":"kk","languageName":{"runs":[{"text":"Қазақ тілі - 哈萨克语"}]}},{"languageCode":"ht","languageName":{"runs":[{"text":"海地克里奥尔语"}]}},{"languageCode":"ko","languageName":{"runs":[{"text":"한국말 - 韩语"}]}},{"languageCode":"ha","languageName":{"runs":[{"text":"هَوُسَ - 豪萨语"}]}},{"languageCode":"nl","languageName":{"runs":[{"text":"Nederlands - 荷兰语"}]}},{"languageCode":"gl","languageName":{"runs":[{"text":"Galego - 加利西亚语"}]}},{"languageCode":"ca","languageName":{"runs":[{"text":"Català - 加泰罗尼亚语"}]}},{"languageCode":"cs","languageName":{"runs":[{"text":"Čeština - 捷克语"}]}},{"languageCode":"kn","languageName":{"runs":[{"text":"ಕನ್ನಡ - 卡纳达语"}]}},{"languageCode":"ky","languageName":{"runs":[{"text":"Кыргызча - 吉尔吉斯语"}]}},{"languageCode":"xh","languageName":{"runs":[{"text":"isiXhosa - 科萨语"}]}},{"languageCode":"co","languageName":{"runs":[{"text":"Corsu - 科西嘉语"}]}},{"languageCode":"hr","languageName":{"runs":[{"text":"Hrvatski - 克罗地亚语"}]}},{"languageCode":"qu","languageName":{"runs":[{"text":"Runa Simi - 克丘亚语"}]}},{"languageCode":"ku","languageName":{"runs":[{"text":"Kurdî - 库尔德语"}]}},{"languageCode":"la","languageName":{"runs":[{"text":"lingua latīna - 拉丁语"}]}},{"languageCode":"lv","languageName":{"runs":[{"text":"Latviešu - 拉脱维亚语"}]}},{"languageCode":"lo","languageName":{"runs":[{"text":"ລາວ - 老挝语"}]}},{"languageCode":"lt","languageName":{"runs":[{"text":"Lietuvių - 立陶宛语"}]}},{"languageCode":"ln","languageName":{"runs":[{"text":"Lingála - 林加拉语"}]}},{"languageCode":"lg","languageName":{"runs":[{"text":"Luganda - 卢干达语"}]}},{"languageCode":"lb","languageName":{"runs":[{"text":"Lëtzebuergesch - 卢森堡语"}]}},{"languageCode":"rw","languageName":{"runs":[{"text":"Kinyarwanda - 卢旺达语"}]}},{"languageCode":"ro","languageName":{"runs":[{"text":"Română - 罗马尼亚语"}]}},{"languageCode":"mt","languageName":{"runs":[{"text":"Malti - 马耳他语"}]}},{"languageCode":"mr","languageName":{"runs":[{"text":"मराठी - 马拉地语"}]}},{"languageCode":"mg","languageName":{"runs":[{"text":"Malagasy - 马拉加斯语"}]}},{"languageCode":"ml","languageName":{"runs":[{"text":"മലയാളം - 马拉雅拉姆语"}]}},{"languageCode":"ms","languageName":{"runs":[{"text":"Bahasa Melayu - 马来语"}]}},{"languageCode":"mk","languageName":{"runs":[{"text":"македонски - 马其顿语"}]}},{"languageCode":"mi","languageName":{"runs":[{"text":"Māori - 毛利语"}]}},{"languageCode":"mn","languageName":{"runs":[{"text":"Монгол - 蒙古语"}]}},{"languageCode":"bn","languageName":{"runs":[{"text":"বাংলা - 孟加拉语"}]}},{"languageCode":"my","languageName":{"runs":[{"text":"ဗမာစာ - 缅甸语"}]}},{"languageCode":"hmn","languageName":{"runs":[{"text":"Hmoob - 苗语"}]}},{"languageCode":"af","languageName":{"runs":[{"text":"Afrikaans - 南非荷兰语"}]}},{"languageCode":"st","languageName":{"runs":[{"text":"Sesotho - 南索托语"}]}},{"languageCode":"ne","languageName":{"runs":[{"text":"नेपाली - 尼泊尔语"}]}},{"languageCode":"no","languageName":{"runs":[{"text":"Norsk - 挪威语"}]}},{"languageCode":"pa","languageName":{"runs":[{"text":"ਪੰਜਾਬੀ - 旁遮普语"}]}},{"languageCode":"pt","languageName":{"runs":[{"text":"Português - 葡萄牙语"}]}},{"languageCode":"ps","languageName":{"runs":[{"text":"پښتو - 普什图语"}]}},{"languageCode":"ny","languageName":{"runs":[{"text":"chiCheŵa - 齐切瓦语"}]}},{"languageCode":"ja","languageName":{"runs":[{"text":"日本語 - 日语"}]}},{"languageCode":"sv","languageName":{"runs":[{"text":"Svenska - 瑞典语"}]}},{"languageCode":"sm","languageName":{"runs":[{"text":"Gagana Samoa - 萨摩亚语"}]}},{"languageCode":"sr","languageName":{"runs":[{"text":"Српски језик - 塞尔维亚语"}]}},{"languageCode":"si","languageName":{"runs":[{"text":"සිංහල - 僧伽罗语"}]}},{"languageCode":"sn","languageName":{"runs":[{"text":"ChiShona - 绍纳语"}]}},{"languageCode":"eo","languageName":{"runs":[{"text":"Esperanto - 世界语"}]}},{"languageCode":"sk","languageName":{"runs":[{"text":"Slovenčina - 斯洛伐克语"}]}},{"languageCode":"sl","languageName":{"runs":[{"text":"Slovenščina - 斯洛文尼亚语"}]}},{"languageCode":"sw","languageName":{"runs":[{"text":"Kiswahili - 斯瓦希里语"}]}},{"languageCode":"gd","languageName":{"runs":[{"text":"Gàidhlig - 苏格兰盖尔语"}]}},{"languageCode":"ceb","languageName":{"runs":[{"text":"Cebuano - 宿务语"}]}},{"languageCode":"so","languageName":{"runs":[{"text":"Soomaaliga - 索马里语"}]}},{"languageCode":"tg","languageName":{"runs":[{"text":"тоҷикӣ - 塔吉克语"}]}},{"languageCode":"te","languageName":{"runs":[{"text":"తెలుగు - 泰卢固语"}]}},{"languageCode":"ta","languageName":{"runs":[{"text":"தமிழ் - 泰米尔语"}]}},{"languageCode":"th","languageName":{"runs":[{"text":"ไทย - 泰语"}]}},{"languageCode":"ti","languageName":{"runs":[{"text":"ትግርኛ - 提格利尼亚语"}]}},{"languageCode":"tr","languageName":{"runs":[{"text":"Türkçe - 土耳其语"}]}},{"languageCode":"tk","languageName":{"runs":[{"text":"Türkmen - 土库曼语"}]}},{"languageCode":"cy","languageName":{"runs":[{"text":"Cymraeg - 威尔士语"}]}},{"languageCode":"ug","languageName":{"runs":[{"text":"ئۇيغۇرچە - 维吾尔语"}]}},{"languageCode":"und","languageName":{"runs":[{"text":"Unknown - 未知语言"}]}},{"languageCode":"ur","languageName":{"runs":[{"text":"اردو - 乌尔都语"}]}},{"languageCode":"uk","languageName":{"runs":[{"text":"Українська - 乌克兰语"}]}},{"languageCode":"uz","languageName":{"runs":[{"text":"O‘zbek - 乌兹别克语"}]}},{"languageCode":"es","languageName":{"runs":[{"text":"Español - 西班牙语"}]}},{"languageCode":"fy","languageName":{"runs":[{"text":"Frysk - 西弗里西亚语"}]}},{"languageCode":"iw","languageName":{"runs":[{"text":"עברית - 希伯来语"}]}},{"languageCode":"el","languageName":{"runs":[{"text":"Ελληνικά - 希腊语"}]}},{"languageCode":"haw","languageName":{"runs":[{"text":"ʻŌlelo Hawaiʻi - 夏威夷语"}]}},{"languageCode":"sd","languageName":{"runs":[{"text":"سنڌي - 信德语"}]}},{"languageCode":"hu","languageName":{"runs":[{"text":"Magyar - 匈牙利语"}]}},{"languageCode":"su","languageName":{"runs":[{"text":"Basa Sunda - 巽他语"}]}},{"languageCode":"hy","languageName":{"runs":[{"text":"Հայերեն - 亚美尼亚语"}]}},{"languageCode":"ig","languageName":{"runs":[{"text":"Igbo - 伊博语"}]}},{"languageCode":"it","languageName":{"runs":[{"text":"Italiano - 意大利语"}]}},{"languageCode":"yi","languageName":{"runs":[{"text":"ייִדיש - 意第绪语"}]}},{"languageCode":"hi","languageName":{"runs":[{"text":"हिन्दी - 印地语"}]}},{"languageCode":"id","languageName":{"runs":[{"text":"Bahasa Indonesia - 印度尼西亚语"}]}},{"languageCode":"en","languageName":{"runs":[{"text":"English - 英语"}]}},{"languageCode":"yo","languageName":{"runs":[{"text":"Yorùbá - 约鲁巴语"}]}},{"languageCode":"vi","languageName":{"runs":[{"text":"Tiếng Việt - 越南语"}]}},{"languageCode":"jv","languageName":{"runs":[{"text":"Basa Jawa - 爪哇语"}]}},{"languageCode":"zh-Hant","languageName":{"runs":[{"text":"中文（繁體） - 中文（繁体）"}]}},{"languageCode":"zh-Hans","languageName":{"runs":[{"text":"中文（简体）"}]}},{"languageCode":"zu","languageName":{"runs":[{"text":"isiZulu - 祖鲁语"}]}},{"languageCode":"kri","languageName":{"runs":[{"text":"Krìì - 克里语"}]}}]}}},"Netflix":{"Settings":{"Switch":true,"Type":"Translate","Languages":["AUTO","ZH"]},"Configs":{"Languages":{"AR":"ar","CS":"cs","DA":"da","DE":"de","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","FI":"fi","FR":"fr","HE":"he","HR":"hr","HU":"hu","ID":"id","IT":"it","JA":"ja","KO":"ko","MS":"ms","NB":"nb","NL":"nl","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SV":"sv","TH":"th","TR":"tr","UK":"uk","VI":"vi","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"}}},"Spotify":{"Settings":{"Switch":true,"Types":["Translate","External"],"Languages":["AUTO","ZH"]}},"Composite":{"Settings":{"CacheSize":20,"ShowOnly":false,"Position":"Reverse","Offset":0,"Tolerance":1000}},"Translate":{"Settings":{"Vendor":"Google","ShowOnly":false,"Position":"Forward","CacheSize":10,"Method":"Part","Times":3,"Interval":500,"Exponential":true},"Configs":{"Languages":{"Google":{"AUTO":"auto","AF":"af","AM":"am","AR":"ar","AS":"as","AY":"ay","AZ":"az","BG":"bg","BE":"be","BM":"bm","BN":"bn","BHO":"bho","CS":"cs","DA":"da","DE":"de","EL":"el","EU":"eu","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","FR-CA":"fr","HU":"hu","IS":"is","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","PA":"pa","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SQ":"sq","ST":"st","SV":"sv","TH":"th","TR":"tr","UK":"uk","UR":"ur","VI":"vi","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"},"Microsoft":{"AUTO":"","AF":"af","AM":"am","AR":"ar","AS":"as","AY":"ay","AZ":"az","BG":"bg","BE":"be","BM":"bm","BN":"bn","BHO":"bho","CS":"cs","DA":"da","DE":"de","EL":"el","EU":"eu","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","FR-CA":"fr-ca","HU":"hu","IS":"is","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-pt","PT-BR":"pt","PA":"pa","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SQ":"sq","ST":"st","SV":"sv","TH":"th","TR":"tr","UK":"uk","UR":"ur","VI":"vi","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"},"DeepL":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN","EN-GB":"EN","EN-US":"EN","EN-US SDH":"EN","ES":"ES","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT","PT-PT":"PT","PT-BR":"PT","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","TR":"TR","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}}}},"External":{"Settings":{"SubVendor":"URL","LrcVendor":"QQMusic","CacheSize":50}},"API":{"Settings":{"GoogleCloud":{"Version":"v2","Mode":"Key","Auth":""},"Microsoft":{"Version":"Azure","Mode":"Token","Region":"","Auth":""},"DeepL":{"Version":"Free","Auth":""},"DeepLX":{"Endpoint":"","Auth":""},"URL":"","NeteaseMusic":{"PhoneNumber":"","Password":""}}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Lyrics.External.response.beta.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxxQkFBcUIsVUFBVTtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLEtBQUs7QUFDbkIsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGVBQWUsK0JBQStCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0M7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUyw4Q0FBOEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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IjpbIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9MeXJpY3MuRXh0ZXJuYWwucmVzcG9uc2UuYmV0YS5qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9FTlYvRU5WLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9VUkkvVVJJLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9kZXRlY3RGb3JtYXQubWpzIiwid2VicGFjazovL2R1YWxzdWJzLy4vc3JjL2Z1bmN0aW9uL2RldGVjdFBsYXRmb3JtLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9zZXRFTlYubWpzIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvaGFybW9ueSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLypcblJFQURNRTogaHR0cHM6Ly9naXRodWIuY29tL0R1YWxTdWJzXG4qL1xuXG5pbXBvcnQgRU5WcyBmcm9tIFwiLi9FTlYvRU5WLm1qc1wiO1xuaW1wb3J0IFVSSXMgZnJvbSBcIi4vVVJJL1VSSS5tanNcIjtcblxuaW1wb3J0IHNldEVOViBmcm9tIFwiLi9mdW5jdGlvbi9zZXRFTlYubWpzXCI7XG5pbXBvcnQgZGV0ZWN0UGxhdGZvcm0gZnJvbSBcIi4vZnVuY3Rpb24vZGV0ZWN0UGxhdGZvcm0ubWpzXCI7XG5pbXBvcnQgZGV0ZWN0Rm9ybWF0IGZyb20gXCIuL2Z1bmN0aW9uL2RldGVjdEZvcm1hdC5tanNcIjtcblxuaW1wb3J0ICogYXMgRGF0YWJhc2UgZnJvbSBcIi4vZGF0YWJhc2UvRGF0YWJhc2UuanNvblwiO1xuXG5jb25zdCAkID0gbmV3IEVOVnMoXCLwn42/77iPIER1YWxTdWJzOiDwn5SjIFVuaXZlcnNhbCB2MS41LjEoMikgTHlyaWNzLkV4dGVybmFsLnJlc3BvbnNlLmJldGFcIik7XG5jb25zdCBVUkkgPSBuZXcgVVJJcygpO1xuY29uc3QgTFJDID0gbmV3IExSQ3MoKTtcblxuLyoqKioqKioqKioqKioqKioqIFByb2Nlc3NpbmcgKioqKioqKioqKioqKioqKiovXG4vLyDop6PmnoRVUkxcbmNvbnN0IFVSTCA9IFVSSS5wYXJzZSgkcmVxdWVzdC51cmwpO1xuJC5sb2coYOKaoCAkeyQubmFtZX1gLCBgVVJMOiAke0pTT04uc3RyaW5naWZ5KFVSTCl9YCwgXCJcIik7XG4vLyDojrflj5bov57mjqXlj4LmlbBcbmNvbnN0IE1FVEhPRCA9ICRyZXF1ZXN0Lm1ldGhvZCwgSE9TVCA9IFVSTC5ob3N0LCBQQVRIID0gVVJMLnBhdGgsIFBBVEhzID0gVVJMLnBhdGhzO1xuJC5sb2coYOKaoCAkeyQubmFtZX1gLCBgTUVUSE9EOiAke01FVEhPRH1gLCBcIlwiKTtcbi8vIOiOt+WPluW5s+WPsFxuY29uc3QgUExBVEZPUk0gPSBkZXRlY3RQbGF0Zm9ybShIT1NUKTtcbiQubG9nKGDimqAgJHskLm5hbWV9LCBQTEFURk9STTogJHtQTEFURk9STX1gLCBcIlwiKTtcbi8vIOino+aekOagvOW8j1xubGV0IEZPUk1BVCA9ICgkcmVzcG9uc2UuaGVhZGVycz8uW1wiQ29udGVudC1UeXBlXCJdID8/ICRyZXNwb25zZS5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pPy5zcGxpdChcIjtcIik/LlswXTtcbmlmIChGT1JNQVQgPT09IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfHwgRk9STUFUID09PSBcInRleHQvcGxhaW5cIikgRk9STUFUID0gZGV0ZWN0Rm9ybWF0KFVSTCwgJHJlc3BvbnNlPy5ib2R5KTtcbiQubG9nKGDimqAgJHskLm5hbWV9LCBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuKGFzeW5jICgpID0+IHtcblx0Ly8g6K+75Y+W6K6+572uXG5cdGNvbnN0IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9ID0gc2V0RU5WKFwiRHVhbFN1YnNcIiwgWyhbXCJZb3VUdWJlXCIsIFwiTmV0ZmxpeFwiLCBcIkJpbGlCaWxpXCIsIFwiU3BvdGlmeVwiXS5pbmNsdWRlcyhQTEFURk9STSkpID8gUExBVEZPUk0gOiBcIlVuaXZlcnNhbFwiLCBcIkV4dGVybmFsXCIsIFwiQVBJXCJdLCBEYXRhYmFzZSk7XG5cdCQubG9nKGDimqAgJHskLm5hbWV9YCwgYFNldHRpbmdzLlN3aXRjaDogJHtTZXR0aW5ncz8uU3dpdGNofWAsIFwiXCIpO1xuXHRzd2l0Y2ggKFNldHRpbmdzLlN3aXRjaCkge1xuXHRcdGNhc2UgdHJ1ZTpcblx0XHRkZWZhdWx0OlxuXHRcdFx0Ly8g6I635Y+W5a2X5bmV57G75Z6L5LiO6K+t6KiAXG5cdFx0XHRjb25zdCBUeXBlID0gVVJMLnF1ZXJ5Py5zdWJ0eXBlID8/IFNldHRpbmdzLlR5cGUsIExhbmd1YWdlcyA9IFtVUkwucXVlcnk/Lmxhbmc/LnRvVXBwZXJDYXNlPy4oKSA/PyBTZXR0aW5ncy5MYW5ndWFnZXNbMF0sIChVUkwucXVlcnk/LnRsYW5nID8/IENhY2hlcz8udGxhbmcpPy50b1VwcGVyQ2FzZT8uKCkgPz8gU2V0dGluZ3MuTGFuZ3VhZ2VzWzFdXTtcblx0XHRcdCQubG9nKGDimqAgJHskLm5hbWV9LCBUeXBlOiAke1R5cGV9LCBMYW5ndWFnZXM6ICR7TGFuZ3VhZ2VzfWAsIFwiXCIpO1xuXHRcdFx0Ly8g5p+l6K+i57yT5a2YXG5cdFx0XHRjb25zdCB0cmFja0lkID0gUEFUSHM/LlszXTtcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYHRyYWNrSWQ6ICR7dHJhY2tJZH1gLCBcIlwiKTtcblx0XHRcdGNvbnN0IHRyYWNrSW5mbyA9IENhY2hlcy5NZXRhZGF0YXMuVHJhY2tzLmdldCh0cmFja0lkKTtcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYHRyYWNrSW5mbzogJHtKU09OLnN0cmluZ2lmeSh0cmFja0luZm8pfWAsIFwiXCIpO1xuXHRcdFx0aWYgKHRyYWNrSW5mbyAmJiAhRk9STUFUKSBGT1JNQVQgPSAkcmVxdWVzdD8uaGVhZGVycz8uQWNjZXB0ID8/ICRyZXF1ZXN0Py5oZWFkZXJzPy5hY2NlcHQ7XG5cdFx0XHQvLyDliJvlu7rnqbrmlbDmja5cblx0XHRcdGxldCBib2R5ID0ge307XG5cdFx0XHQvLyDmoLzlvI/liKTmlq1cblx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdGNhc2UgdW5kZWZpbmVkOiAvLyDop4bkuLrml6Bib2R5XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIjpcblx0XHRcdFx0Y2FzZSBcInRleHQvcGxhaW5cIjpcblx0XHRcdFx0Y2FzZSBcInRleHQvaHRtbFwiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1tcGVnVVJMXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LW1wZWd1cmxcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsXCI6XG5cdFx0XHRcdGNhc2UgXCJhdWRpby9tcGVndXJsXCI6XG5cdFx0XHRcdFx0Ly9ib2R5ID0gTTNVOC5wYXJzZSgkcmVzcG9uc2UuYm9keSk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQvLyRyZXNwb25zZS5ib2R5ID0gTTNVOC5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L3htbFwiOlxuXHRcdFx0XHRjYXNlIFwidGV4dC9wbGlzdFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veG1sXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9wbGlzdFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wbGlzdFwiOlxuXHRcdFx0XHRcdC8vYm9keSA9IFhNTC5wYXJzZSgkcmVzcG9uc2UuYm9keSk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQvLyRyZXNwb25zZS5ib2R5ID0gWE1MLnN0cmluZ2lmeShib2R5KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInRleHQvdnR0XCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi92dHRcIjpcblx0XHRcdFx0XHQvL2JvZHkgPSBWVFQucGFyc2UoJHJlc3BvbnNlLmJvZHkpO1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0Ly8kcmVzcG9uc2UuYm9keSA9IFZUVC5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L2pzb25cIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2pzb25cIjpcblx0XHRcdFx0XHRib2R5ID0gSlNPTi5wYXJzZSgkcmVzcG9uc2UuYm9keSA/PyBcInt9XCIpO1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0c3dpdGNoIChQTEFURk9STSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcIllvdVR1YmVcIjpcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiU3BvdGlmeVwiOlxuXHRcdFx0XHRcdFx0XHRib2R5ID0gYXdhaXQgaW5qZWN0aW9uTHlyaWMoU2V0dGluZ3MuTHJjVmVuZG9yLCB0cmFja0luZm8sIGJvZHkpO1xuXHRcdFx0XHRcdFx0XHRpZiAoISRyZXNwb25zZT8uaGVhZGVycz8uW1wiQ29udGVudC1UeXBlXCJdICYmICRyZXNwb25zZT8uaGVhZGVycz8uW1wiY29udGVudC10eXBlXCJdKSAkcmVzcG9uc2UuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IEZPUk1BVDtcdFx0XHRcdFx0XHRcdFx0JHJlc3BvbnNlLmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBGT1JNQVQ7XG5cdFx0XHRcdFx0XHRcdCRyZXNwb25zZS5zdGF0dXMgPSAoJC5pc1F1YW5YKCkpID8gXCJIVFRQLzEuMSAyMDAgT0tcIiA6IDIwMDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBib2R5OiAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdCRyZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9wcm90b2J1ZlwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wcm90b2J1ZlwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS5wcm90b2J1ZlwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwY1wiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwYytwcm90b1wiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGVjYXRpb24vb2N0ZXQtc3RyZWFtXCI6XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgJHJlc3BvbnNlLmJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoJHJlc3BvbnNlLmJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdGxldCByYXdCb2R5ID0gJC5pc1F1YW5YKCkgPyBuZXcgVWludDhBcnJheSgkcmVzcG9uc2UuYm9keUJ5dGVzID8/IFtdKSA6ICRyZXNwb25zZS5ib2R5ID8/IG5ldyBVaW50OEFycmF5KCk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgaXNCdWZmZXI/ICR7QXJyYXlCdWZmZXIuaXNWaWV3KHJhd0JvZHkpfTogJHtKU09OLnN0cmluZ2lmeShyYXdCb2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQvKioqKioqKioqKioqKioqKioqICBpbml0aWFsaXphdGlvbiBzdGFydCAgKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdFx0XHQvLyB0aW1vc3RhbW0vcHJvdG9idWYtdHMgMi45LjBcblx0XHRcdFx0XHQvLyB0ZXh0LWRlY29kZXJcblx0XHRcdFx0XHQhZnVuY3Rpb24oaSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gXyhuLGUsaSl7cmV0dXJuIGU8PW4mJm48PWl9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMmJiFpW1wiZW5jb2RpbmctaW5kZXhlc1wiXSYmKGlbXCJlbmNvZGluZy1pbmRleGVzXCJdPXJlcXVpcmUoXCIuL2VuY29kaW5nLWluZGV4ZXMuanNcIilbXCJlbmNvZGluZy1pbmRleGVzXCJdKTt2YXIgbD1NYXRoLmZsb29yO2Z1bmN0aW9uIHMobil7aWYodm9pZCAwPT09bilyZXR1cm57fTtpZihuPT09T2JqZWN0KG4pKXJldHVybiBuO3Rocm93IFR5cGVFcnJvcihcIkNvdWxkIG5vdCBjb252ZXJ0IGFyZ3VtZW50IHRvIGRpY3Rpb25hcnlcIil9ZnVuY3Rpb24gdShuKXtyZXR1cm4gMDw9biYmbjw9MTI3fXZhciBhPXUsYj0tMTtmdW5jdGlvbiBjKG4pe3RoaXMudG9rZW5zPVtdLnNsaWNlLmNhbGwobiksdGhpcy50b2tlbnMucmV2ZXJzZSgpfWMucHJvdG90eXBlPXtlbmRPZlN0cmVhbTpmdW5jdGlvbigpe3JldHVybiF0aGlzLnRva2Vucy5sZW5ndGh9LHJlYWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50b2tlbnMubGVuZ3RoP3RoaXMudG9rZW5zLnBvcCgpOmJ9LHByZXBlbmQ6ZnVuY3Rpb24obil7aWYoQXJyYXkuaXNBcnJheShuKSlmb3IodmFyIGU9bjtlLmxlbmd0aDspdGhpcy50b2tlbnMucHVzaChlLnBvcCgpKTtlbHNlIHRoaXMudG9rZW5zLnB1c2gobil9LHB1c2g6ZnVuY3Rpb24obil7aWYoQXJyYXkuaXNBcnJheShuKSlmb3IodmFyIGU9bjtlLmxlbmd0aDspdGhpcy50b2tlbnMudW5zaGlmdChlLnNoaWZ0KCkpO2Vsc2UgdGhpcy50b2tlbnMudW5zaGlmdChuKX19O3ZhciB3PS0xO2Z1bmN0aW9uIG0obixlKXtpZihuKXRocm93IFR5cGVFcnJvcihcIkRlY29kZXIgZXJyb3JcIik7cmV0dXJuIGV8fDY1NTMzfWZ1bmN0aW9uIGYobil7dGhyb3cgVHlwZUVycm9yKFwiVGhlIGNvZGUgcG9pbnQgXCIrbitcIiBjb3VsZCBub3QgYmUgZW5jb2RlZC5cIil9ZnVuY3Rpb24gcihuKXtyZXR1cm4gbj1TdHJpbmcobikudHJpbSgpLnRvTG93ZXJDYXNlKCksT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGQsbik/ZFtuXTpudWxsfXZhciB0LG8sbj1be2VuY29kaW5nczpbe2xhYmVsczpbXCJ1bmljb2RlLTEtMS11dGYtOFwiLFwidXRmLThcIixcInV0ZjhcIl0sbmFtZTpcIlVURi04XCJ9XSxoZWFkaW5nOlwiVGhlIEVuY29kaW5nXCJ9LHtlbmNvZGluZ3M6W3tsYWJlbHM6W1wiODY2XCIsXCJjcDg2NlwiLFwiY3NpYm04NjZcIixcImlibTg2NlwiXSxuYW1lOlwiSUJNODY2XCJ9LHtsYWJlbHM6W1wiY3Npc29sYXRpbjJcIixcImlzby04ODU5LTJcIixcImlzby1pci0xMDFcIixcImlzbzg4NTktMlwiLFwiaXNvODg1OTJcIixcImlzb184ODU5LTJcIixcImlzb184ODU5LTI6MTk4N1wiLFwibDJcIixcImxhdGluMlwiXSxuYW1lOlwiSVNPLTg4NTktMlwifSx7bGFiZWxzOltcImNzaXNvbGF0aW4zXCIsXCJpc28tODg1OS0zXCIsXCJpc28taXItMTA5XCIsXCJpc284ODU5LTNcIixcImlzbzg4NTkzXCIsXCJpc29fODg1OS0zXCIsXCJpc29fODg1OS0zOjE5ODhcIixcImwzXCIsXCJsYXRpbjNcIl0sbmFtZTpcIklTTy04ODU5LTNcIn0se2xhYmVsczpbXCJjc2lzb2xhdGluNFwiLFwiaXNvLTg4NTktNFwiLFwiaXNvLWlyLTExMFwiLFwiaXNvODg1OS00XCIsXCJpc284ODU5NFwiLFwiaXNvXzg4NTktNFwiLFwiaXNvXzg4NTktNDoxOTg4XCIsXCJsNFwiLFwibGF0aW40XCJdLG5hbWU6XCJJU08tODg1OS00XCJ9LHtsYWJlbHM6W1wiY3Npc29sYXRpbmN5cmlsbGljXCIsXCJjeXJpbGxpY1wiLFwiaXNvLTg4NTktNVwiLFwiaXNvLWlyLTE0NFwiLFwiaXNvODg1OS01XCIsXCJpc284ODU5NVwiLFwiaXNvXzg4NTktNVwiLFwiaXNvXzg4NTktNToxOTg4XCJdLG5hbWU6XCJJU08tODg1OS01XCJ9LHtsYWJlbHM6W1wiYXJhYmljXCIsXCJhc21vLTcwOFwiLFwiY3Npc284ODU5NmVcIixcImNzaXNvODg1OTZpXCIsXCJjc2lzb2xhdGluYXJhYmljXCIsXCJlY21hLTExNFwiLFwiaXNvLTg4NTktNlwiLFwiaXNvLTg4NTktNi1lXCIsXCJpc28tODg1OS02LWlcIixcImlzby1pci0xMjdcIixcImlzbzg4NTktNlwiLFwiaXNvODg1OTZcIixcImlzb184ODU5LTZcIixcImlzb184ODU5LTY6MTk4N1wiXSxuYW1lOlwiSVNPLTg4NTktNlwifSx7bGFiZWxzOltcImNzaXNvbGF0aW5ncmVla1wiLFwiZWNtYS0xMThcIixcImVsb3RfOTI4XCIsXCJncmVla1wiLFwiZ3JlZWs4XCIsXCJpc28tODg1OS03XCIsXCJpc28taXItMTI2XCIsXCJpc284ODU5LTdcIixcImlzbzg4NTk3XCIsXCJpc29fODg1OS03XCIsXCJpc29fODg1OS03OjE5ODdcIixcInN1bl9ldV9ncmVla1wiXSxuYW1lOlwiSVNPLTg4NTktN1wifSx7bGFiZWxzOltcImNzaXNvODg1OThlXCIsXCJjc2lzb2xhdGluaGVicmV3XCIsXCJoZWJyZXdcIixcImlzby04ODU5LThcIixcImlzby04ODU5LTgtZVwiLFwiaXNvLWlyLTEzOFwiLFwiaXNvODg1OS04XCIsXCJpc284ODU5OFwiLFwiaXNvXzg4NTktOFwiLFwiaXNvXzg4NTktODoxOTg4XCIsXCJ2aXN1YWxcIl0sbmFtZTpcIklTTy04ODU5LThcIn0se2xhYmVsczpbXCJjc2lzbzg4NTk4aVwiLFwiaXNvLTg4NTktOC1pXCIsXCJsb2dpY2FsXCJdLG5hbWU6XCJJU08tODg1OS04LUlcIn0se2xhYmVsczpbXCJjc2lzb2xhdGluNlwiLFwiaXNvLTg4NTktMTBcIixcImlzby1pci0xNTdcIixcImlzbzg4NTktMTBcIixcImlzbzg4NTkxMFwiLFwibDZcIixcImxhdGluNlwiXSxuYW1lOlwiSVNPLTg4NTktMTBcIn0se2xhYmVsczpbXCJpc28tODg1OS0xM1wiLFwiaXNvODg1OS0xM1wiLFwiaXNvODg1OTEzXCJdLG5hbWU6XCJJU08tODg1OS0xM1wifSx7bGFiZWxzOltcImlzby04ODU5LTE0XCIsXCJpc284ODU5LTE0XCIsXCJpc284ODU5MTRcIl0sbmFtZTpcIklTTy04ODU5LTE0XCJ9LHtsYWJlbHM6W1wiY3Npc29sYXRpbjlcIixcImlzby04ODU5LTE1XCIsXCJpc284ODU5LTE1XCIsXCJpc284ODU5MTVcIixcImlzb184ODU5LTE1XCIsXCJsOVwiXSxuYW1lOlwiSVNPLTg4NTktMTVcIn0se2xhYmVsczpbXCJpc28tODg1OS0xNlwiXSxuYW1lOlwiSVNPLTg4NTktMTZcIn0se2xhYmVsczpbXCJjc2tvaThyXCIsXCJrb2lcIixcImtvaThcIixcImtvaTgtclwiLFwia29pOF9yXCJdLG5hbWU6XCJLT0k4LVJcIn0se2xhYmVsczpbXCJrb2k4LXJ1XCIsXCJrb2k4LXVcIl0sbmFtZTpcIktPSTgtVVwifSx7bGFiZWxzOltcImNzbWFjaW50b3NoXCIsXCJtYWNcIixcIm1hY2ludG9zaFwiLFwieC1tYWMtcm9tYW5cIl0sbmFtZTpcIm1hY2ludG9zaFwifSx7bGFiZWxzOltcImRvcy04NzRcIixcImlzby04ODU5LTExXCIsXCJpc284ODU5LTExXCIsXCJpc284ODU5MTFcIixcInRpcy02MjBcIixcIndpbmRvd3MtODc0XCJdLG5hbWU6XCJ3aW5kb3dzLTg3NFwifSx7bGFiZWxzOltcImNwMTI1MFwiLFwid2luZG93cy0xMjUwXCIsXCJ4LWNwMTI1MFwiXSxuYW1lOlwid2luZG93cy0xMjUwXCJ9LHtsYWJlbHM6W1wiY3AxMjUxXCIsXCJ3aW5kb3dzLTEyNTFcIixcIngtY3AxMjUxXCJdLG5hbWU6XCJ3aW5kb3dzLTEyNTFcIn0se2xhYmVsczpbXCJhbnNpX3gzLjQtMTk2OFwiLFwiYXNjaWlcIixcImNwMTI1MlwiLFwiY3A4MTlcIixcImNzaXNvbGF0aW4xXCIsXCJpYm04MTlcIixcImlzby04ODU5LTFcIixcImlzby1pci0xMDBcIixcImlzbzg4NTktMVwiLFwiaXNvODg1OTFcIixcImlzb184ODU5LTFcIixcImlzb184ODU5LTE6MTk4N1wiLFwibDFcIixcImxhdGluMVwiLFwidXMtYXNjaWlcIixcIndpbmRvd3MtMTI1MlwiLFwieC1jcDEyNTJcIl0sbmFtZTpcIndpbmRvd3MtMTI1MlwifSx7bGFiZWxzOltcImNwMTI1M1wiLFwid2luZG93cy0xMjUzXCIsXCJ4LWNwMTI1M1wiXSxuYW1lOlwid2luZG93cy0xMjUzXCJ9LHtsYWJlbHM6W1wiY3AxMjU0XCIsXCJjc2lzb2xhdGluNVwiLFwiaXNvLTg4NTktOVwiLFwiaXNvLWlyLTE0OFwiLFwiaXNvODg1OS05XCIsXCJpc284ODU5OVwiLFwiaXNvXzg4NTktOVwiLFwiaXNvXzg4NTktOToxOTg5XCIsXCJsNVwiLFwibGF0aW41XCIsXCJ3aW5kb3dzLTEyNTRcIixcIngtY3AxMjU0XCJdLG5hbWU6XCJ3aW5kb3dzLTEyNTRcIn0se2xhYmVsczpbXCJjcDEyNTVcIixcIndpbmRvd3MtMTI1NVwiLFwieC1jcDEyNTVcIl0sbmFtZTpcIndpbmRvd3MtMTI1NVwifSx7bGFiZWxzOltcImNwMTI1NlwiLFwid2luZG93cy0xMjU2XCIsXCJ4LWNwMTI1NlwiXSxuYW1lOlwid2luZG93cy0xMjU2XCJ9LHtsYWJlbHM6W1wiY3AxMjU3XCIsXCJ3aW5kb3dzLTEyNTdcIixcIngtY3AxMjU3XCJdLG5hbWU6XCJ3aW5kb3dzLTEyNTdcIn0se2xhYmVsczpbXCJjcDEyNThcIixcIndpbmRvd3MtMTI1OFwiLFwieC1jcDEyNThcIl0sbmFtZTpcIndpbmRvd3MtMTI1OFwifSx7bGFiZWxzOltcIngtbWFjLWN5cmlsbGljXCIsXCJ4LW1hYy11a3JhaW5pYW5cIl0sbmFtZTpcIngtbWFjLWN5cmlsbGljXCJ9XSxoZWFkaW5nOlwiTGVnYWN5IHNpbmdsZS1ieXRlIGVuY29kaW5nc1wifSx7ZW5jb2RpbmdzOlt7bGFiZWxzOltcImNoaW5lc2VcIixcImNzZ2IyMzEyXCIsXCJjc2lzbzU4Z2IyMzEyODBcIixcImdiMjMxMlwiLFwiZ2JfMjMxMlwiLFwiZ2JfMjMxMi04MFwiLFwiZ2JrXCIsXCJpc28taXItNThcIixcIngtZ2JrXCJdLG5hbWU6XCJHQktcIn0se2xhYmVsczpbXCJnYjE4MDMwXCJdLG5hbWU6XCJnYjE4MDMwXCJ9XSxoZWFkaW5nOlwiTGVnYWN5IG11bHRpLWJ5dGUgQ2hpbmVzZSAoc2ltcGxpZmllZCkgZW5jb2RpbmdzXCJ9LHtlbmNvZGluZ3M6W3tsYWJlbHM6W1wiYmlnNVwiLFwiYmlnNS1oa3Njc1wiLFwiY24tYmlnNVwiLFwiY3NiaWc1XCIsXCJ4LXgtYmlnNVwiXSxuYW1lOlwiQmlnNVwifV0saGVhZGluZzpcIkxlZ2FjeSBtdWx0aS1ieXRlIENoaW5lc2UgKHRyYWRpdGlvbmFsKSBlbmNvZGluZ3NcIn0se2VuY29kaW5nczpbe2xhYmVsczpbXCJjc2V1Y3BrZGZtdGphcGFuZXNlXCIsXCJldWMtanBcIixcIngtZXVjLWpwXCJdLG5hbWU6XCJFVUMtSlBcIn0se2xhYmVsczpbXCJjc2lzbzIwMjJqcFwiLFwiaXNvLTIwMjItanBcIl0sbmFtZTpcIklTTy0yMDIyLUpQXCJ9LHtsYWJlbHM6W1wiY3NzaGlmdGppc1wiLFwibXM5MzJcIixcIm1zX2thbmppXCIsXCJzaGlmdC1qaXNcIixcInNoaWZ0X2ppc1wiLFwic2ppc1wiLFwid2luZG93cy0zMWpcIixcIngtc2ppc1wiXSxuYW1lOlwiU2hpZnRfSklTXCJ9XSxoZWFkaW5nOlwiTGVnYWN5IG11bHRpLWJ5dGUgSmFwYW5lc2UgZW5jb2RpbmdzXCJ9LHtlbmNvZGluZ3M6W3tsYWJlbHM6W1wiY3NldWNrclwiLFwiY3Nrc2M1NjAxMTk4N1wiLFwiZXVjLWtyXCIsXCJpc28taXItMTQ5XCIsXCJrb3JlYW5cIixcImtzX2NfNTYwMS0xOTg3XCIsXCJrc19jXzU2MDEtMTk4OVwiLFwia3NjNTYwMVwiLFwia3NjXzU2MDFcIixcIndpbmRvd3MtOTQ5XCJdLG5hbWU6XCJFVUMtS1JcIn1dLGhlYWRpbmc6XCJMZWdhY3kgbXVsdGktYnl0ZSBLb3JlYW4gZW5jb2RpbmdzXCJ9LHtlbmNvZGluZ3M6W3tsYWJlbHM6W1wiY3Npc28yMDIya3JcIixcImh6LWdiLTIzMTJcIixcImlzby0yMDIyLWNuXCIsXCJpc28tMjAyMi1jbi1leHRcIixcImlzby0yMDIyLWtyXCJdLG5hbWU6XCJyZXBsYWNlbWVudFwifSx7bGFiZWxzOltcInV0Zi0xNmJlXCJdLG5hbWU6XCJVVEYtMTZCRVwifSx7bGFiZWxzOltcInV0Zi0xNlwiLFwidXRmLTE2bGVcIl0sbmFtZTpcIlVURi0xNkxFXCJ9LHtsYWJlbHM6W1wieC11c2VyLWRlZmluZWRcIl0sbmFtZTpcIngtdXNlci1kZWZpbmVkXCJ9XSxoZWFkaW5nOlwiTGVnYWN5IG1pc2NlbGxhbmVvdXMgZW5jb2RpbmdzXCJ9XSxkPXt9LGg9KG4uZm9yRWFjaChmdW5jdGlvbihuKXtuLmVuY29kaW5ncy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UubGFiZWxzLmZvckVhY2goZnVuY3Rpb24obil7ZFtuXT1lfSl9KX0pLHt9KSxnPXt9O2Z1bmN0aW9uIHkobixlKXtyZXR1cm4gZSYmZVtuXXx8bnVsbH1mdW5jdGlvbiBwKG4sZSl7ZT1lLmluZGV4T2Yobik7cmV0dXJuLTE9PT1lP251bGw6ZX1mdW5jdGlvbiB2KG4pe2lmKFwiZW5jb2RpbmctaW5kZXhlc1wiaW4gaSlyZXR1cm4gaVtcImVuY29kaW5nLWluZGV4ZXNcIl1bbl07dGhyb3cgRXJyb3IoXCJJbmRleGVzIG1pc3NpbmcuIERpZCB5b3UgZm9yZ2V0IHRvIGluY2x1ZGUgZW5jb2RpbmctaW5kZXhlcy5qcyBmaXJzdD9cIil9dmFyIHg9XCJ1dGYtOFwiO2Z1bmN0aW9uIE8obixlKXtpZighKHRoaXMgaW5zdGFuY2VvZiBPKSl0aHJvdyBUeXBlRXJyb3IoXCJDYWxsZWQgYXMgYSBmdW5jdGlvbi4gRGlkIHlvdSBmb3JnZXQgJ25ldyc/XCIpO249dm9pZCAwIT09bj9TdHJpbmcobik6eCxlPXMoZSksdGhpcy5fZW5jb2Rpbmc9bnVsbCx0aGlzLl9kZWNvZGVyPW51bGwsdGhpcy5faWdub3JlQk9NPSExLHRoaXMuX0JPTXNlZW49ITEsdGhpcy5fZXJyb3JfbW9kZT1cInJlcGxhY2VtZW50XCIsdGhpcy5fZG9fbm90X2ZsdXNoPSExO3ZhciBpPXIobik7aWYobnVsbD09PWl8fFwicmVwbGFjZW1lbnRcIj09PWkubmFtZSl0aHJvdyBSYW5nZUVycm9yKFwiVW5rbm93biBlbmNvZGluZzogXCIrbik7aWYoZ1tpLm5hbWVdKXJldHVybihuPXRoaXMpLl9lbmNvZGluZz1pLEJvb2xlYW4oZS5mYXRhbCkmJihuLl9lcnJvcl9tb2RlPVwiZmF0YWxcIiksQm9vbGVhbihlLmlnbm9yZUJPTSkmJihuLl9pZ25vcmVCT009ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eXx8KHRoaXMuZW5jb2Rpbmc9bi5fZW5jb2RpbmcubmFtZS50b0xvd2VyQ2FzZSgpLHRoaXMuZmF0YWw9XCJmYXRhbFwiPT09bi5fZXJyb3JfbW9kZSx0aGlzLmlnbm9yZUJPTT1uLl9pZ25vcmVCT00pLG47dGhyb3cgRXJyb3IoXCJEZWNvZGVyIG5vdCBwcmVzZW50LiBEaWQgeW91IGZvcmdldCB0byBpbmNsdWRlIGVuY29kaW5nLWluZGV4ZXMuanMgZmlyc3Q/XCIpfWZ1bmN0aW9uIGsobixlKXtpZighKHRoaXMgaW5zdGFuY2VvZiBrKSl0aHJvdyBUeXBlRXJyb3IoXCJDYWxsZWQgYXMgYSBmdW5jdGlvbi4gRGlkIHlvdSBmb3JnZXQgJ25ldyc/XCIpO2U9cyhlKSx0aGlzLl9lbmNvZGluZz1udWxsLHRoaXMuX2VuY29kZXI9bnVsbCx0aGlzLl9kb19ub3RfZmx1c2g9ITEsdGhpcy5fZmF0YWw9Qm9vbGVhbihlLmZhdGFsKT9cImZhdGFsXCI6XCJyZXBsYWNlbWVudFwiO2lmKEJvb2xlYW4oZS5OT05TVEFOREFSRF9hbGxvd0xlZ2FjeUVuY29kaW5nKSl7ZT1yKG49dm9pZCAwIT09bj9TdHJpbmcobik6eCk7aWYobnVsbD09PWV8fFwicmVwbGFjZW1lbnRcIj09PWUubmFtZSl0aHJvdyBSYW5nZUVycm9yKFwiVW5rbm93biBlbmNvZGluZzogXCIrbik7aWYoIWhbZS5uYW1lXSl0aHJvdyBFcnJvcihcIkVuY29kZXIgbm90IHByZXNlbnQuIERpZCB5b3UgZm9yZ2V0IHRvIGluY2x1ZGUgZW5jb2RpbmctaW5kZXhlcy5qcyBmaXJzdD9cIik7dGhpcy5fZW5jb2Rpbmc9ZX1lbHNlIHRoaXMuX2VuY29kaW5nPXIoXCJ1dGYtOFwiKSx2b2lkIDAhPT1uJiZcImNvbnNvbGVcImluIGkmJmNvbnNvbGUud2FybihcIlRleHRFbmNvZGVyIGNvbnN0cnVjdG9yIGNhbGxlZCB3aXRoIGVuY29kaW5nIGxhYmVsLCB3aGljaCBpcyBpZ25vcmVkLlwiKTtyZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5fHwodGhpcy5lbmNvZGluZz10aGlzLl9lbmNvZGluZy5uYW1lLnRvTG93ZXJDYXNlKCkpLHRoaXN9ZnVuY3Rpb24gZShuKXt2YXIgcj1uLmZhdGFsLHQ9MCxvPTAscz0wLGw9MTI4LGE9MTkxO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe2lmKGU9PT1iJiYwIT09cylyZXR1cm4gcz0wLG0ocik7aWYoZT09PWIpcmV0dXJuIHc7aWYoMD09PXMpe2lmKF8oZSwwLDEyNykpcmV0dXJuIGU7aWYoXyhlLDE5NCwyMjMpKXM9MSx0PTMxJmU7ZWxzZSBpZihfKGUsMjI0LDIzOSkpMjI0PT09ZSYmKGw9MTYwKSwyMzc9PT1lJiYoYT0xNTkpLHM9Mix0PTE1JmU7ZWxzZXtpZighXyhlLDI0MCwyNDQpKXJldHVybiBtKHIpOzI0MD09PWUmJihsPTE0NCksMjQ0PT09ZSYmKGE9MTQzKSxzPTMsdD03JmV9cmV0dXJuIG51bGx9dmFyIGk7cmV0dXJuIF8oZSxsLGEpPyhsPTEyOCxhPTE5MSx0PXQ8PDZ8NjMmZSwobys9MSkhPT1zP251bGw6KGk9dCx0PXM9bz0wLGkpKToodD1zPW89MCxsPTEyOCxhPTE5MSxuLnByZXBlbmQoZSksbShyKSl9fWZ1bmN0aW9uIEUobil7bi5mYXRhbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXtpZihlPT09YilyZXR1cm4gdztpZihhKGUpKXJldHVybiBlO18oZSwxMjgsMjA0Nyk/KGk9MSxyPTE5Mik6XyhlLDIwNDgsNjU1MzUpPyhpPTIscj0yMjQpOl8oZSw2NTUzNiwxMTE0MTExKSYmKGk9MyxyPTI0MCk7Zm9yKHZhciBpLHIsdD1bKGU+PjYqaSkrcl07MDxpOyl0LnB1c2goMTI4fDYzJmU+PjYqKGktMSkpLC0taTtyZXR1cm4gdH19ZnVuY3Rpb24gaihpLG4pe3ZhciByPW4uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7cmV0dXJuIGU9PT1iP3c6dShlKT9lOm51bGw9PT0oZT1pW2UtMTI4XSk/bShyKTplfX1mdW5jdGlvbiBCKHIsbil7bi5mYXRhbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXt2YXIgaTtyZXR1cm4gZT09PWI/dzphKGUpP2U6KG51bGw9PT0oaT1wKGUscikpJiZmKGUpLGkrMTI4KX19ZnVuY3Rpb24gUyhuKXt2YXIgbz1uLmZhdGFsLHM9MCxsPTAsYT0wO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpLHIsdDtyZXR1cm4gZT09PWImJjA9PT1zJiYwPT09bCYmMD09PWE/dzooZSE9PWJ8fDA9PT1zJiYwPT09bCYmMD09PWF8fChhPWw9cz0wLG0obykpLDAhPT1hPyhpPW51bGwsXyhlLDQ4LDU3KSYmKGk9ZnVuY3Rpb24obil7aWYoMzk0MTk8biYmbjwxODllM3x8MTIzNzU3NTxuKXJldHVybiBudWxsO2lmKDc0NTc9PT1uKXJldHVybiA1OTMzNTtmb3IodmFyIGU9MCxpPTAscj12KFwiZ2IxODAzMC1yYW5nZXNcIiksdD0wO3Q8ci5sZW5ndGg7Kyt0KXt2YXIgbz1yW3RdO2lmKCEob1swXTw9bikpYnJlYWs7ZT1vWzBdLGk9b1sxXX1yZXR1cm4gaStuLWV9KDEwKigxMjYqKDEwKihzLTEyOSkrbC00OCkrYS0xMjkpK2UtNDgpKSxyPVtsLGEsZV0sYT1sPXM9MCxudWxsPT09aT8obi5wcmVwZW5kKHIpLG0obykpOmkpOjAhPT1sP18oZSwxMjksMjU0KT8oYT1lLG51bGwpOihuLnByZXBlbmQoW2wsZV0pLGw9cz0wLG0obykpOjAhPT1zP18oZSw0OCw1Nyk/KGw9ZSxudWxsKToocj1zLHM9MCwodD1udWxsKT09PShpPW51bGw9PT0odD1fKGUsNjQsMTI2KXx8XyhlLDEyOCwyNTQpPzE5MCooci0xMjkpKyhlLShlPDEyNz82NDo2NSkpOnQpP251bGw6eSh0LHYoXCJnYjE4MDMwXCIpKSkmJnUoZSkmJm4ucHJlcGVuZChlKSxudWxsPT09aT9tKG8pOmkpOnUoZSk/ZToxMjg9PT1lPzgzNjQ6XyhlLDEyOSwyNTQpPyhzPWUsbnVsbCk6bShvKSl9fWZ1bmN0aW9uIFQobix0KXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpLHI7cmV0dXJuIGU9PT1iP3c6YShlKT9lOjU4ODUzPT09ZT9mKGUpOnQmJjgzNjQ9PT1lPzEyODpudWxsIT09KGk9cChlLHYoXCJnYjE4MDMwXCIpKSk/KHI9aSUxOTAsW2woaS8xOTApKzEyOSxyKyhyPDYzPzY0OjY1KV0pOnQ/ZihlKTooaT1mdW5jdGlvbihuKXtpZig1OTMzNT09PW4pcmV0dXJuIDc0NTc7Zm9yKHZhciBlPTAsaT0wLHI9dihcImdiMTgwMzAtcmFuZ2VzXCIpLHQ9MDt0PHIubGVuZ3RoOysrdCl7dmFyIG89clt0XTtpZighKG9bMV08PW4pKWJyZWFrO2U9b1sxXSxpPW9bMF19cmV0dXJuIGkrbi1lfShlKSxbKHI9bChpLzEwLzEyNi8xMCkpKzEyOSwoZT1sKChpLT0xMCpyKjEyNioxMCkvMTAvMTI2KSkrNDgsKHI9bCgoaS09MTAqZSoxMjYpLzEwKSkrMTI5LDQ4KyhpLTEwKnIpXSl9fWZ1bmN0aW9uIEkobil7dmFyIHQ9bi5mYXRhbCxvPTA7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7aWYoZT09PWImJjAhPT1vKXJldHVybiBvPTAsbSh0KTtpZihlPT09YiYmMD09PW8pcmV0dXJuIHc7aWYoMD09PW8pcmV0dXJuIHUoZSk/ZTpfKGUsMTI5LDI1NCk/KG89ZSxudWxsKTptKHQpO3ZhciBpPW8scj1udWxsO3N3aXRjaChvPTAscj1fKGUsNjQsMTI2KXx8XyhlLDE2MSwyNTQpPzE1NyooaS0xMjkpKyhlLShlPDEyNz82NDo5OCkpOnIpe2Nhc2UgMTEzMzpyZXR1cm5bMjAyLDc3Ml07Y2FzZSAxMTM1OnJldHVyblsyMDIsNzgwXTtjYXNlIDExNjQ6cmV0dXJuWzIzNCw3NzJdO2Nhc2UgMTE2NjpyZXR1cm5bMjM0LDc4MF19aT1udWxsPT09cj9udWxsOnkocix2KFwiYmlnNVwiKSk7cmV0dXJuIG51bGw9PT1pJiZ1KGUpJiZuLnByZXBlbmQoZSksbnVsbD09PWk/bSh0KTppfX1mdW5jdGlvbiBVKG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGkscjtyZXR1cm4gZT09PWI/dzphKGUpP2U6KGk9ZSxyPW89b3x8dihcImJpZzVcIikubWFwKGZ1bmN0aW9uKG4sZSl7cmV0dXJuIGU8NTAyND9udWxsOm59KSxudWxsPT09KGk9OTU1Mj09PWl8fDk1NjY9PT1pfHw5NTY5PT09aXx8OTU3OD09PWl8fDIxMzEzPT09aXx8MjEzMTc9PT1pP3IubGFzdEluZGV4T2YoaSk6cChpLHIpKXx8KHI9bChpLzE1NykrMTI5KTwxNjE/ZihlKTpbciwoZT1pJTE1NykrKGU8NjM/NjQ6OTgpXSl9fWZ1bmN0aW9uIEMobil7dmFyIHQ9bi5mYXRhbCxvPSExLHM9MDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXt2YXIgaSxyO3JldHVybiBlPT09YiYmMCE9PXM/KHM9MCxtKHQpKTplPT09YiYmMD09PXM/dzoxNDI9PT1zJiZfKGUsMTYxLDIyMyk/KHM9MCw2NTIxNitlKToxNDM9PT1zJiZfKGUsMTYxLDI1NCk/KG89ITAscz1lLG51bGwpOjAhPT1zPyhpPXMscz0wLHI9bnVsbCxfKGksMTYxLDI1NCkmJl8oZSwxNjEsMjU0KSYmKHI9eSg5NCooaS0xNjEpKyhlLTE2MSksdihvP1wiamlzMDIxMlwiOlwiamlzMDIwOFwiKSkpLG89ITEsXyhlLDE2MSwyNTQpfHxuLnByZXBlbmQoZSksbnVsbD09PXI/bSh0KTpyKTp1KGUpP2U6MTQyPT09ZXx8MTQzPT09ZXx8XyhlLDE2MSwyNTQpPyhzPWUsbnVsbCk6bSh0KX19ZnVuY3Rpb24gUChuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpO3JldHVybiBlPT09Yj93OmEoZSk/ZToxNjU9PT1lPzkyOjgyNTQ9PT1lPzEyNjpfKGUsNjUzNzcsNjU0MzkpP1sxNDIsZS02NTM3NysxNjFdOm51bGw9PT0oaT1wKGU9ODcyMj09PWU/NjUyOTM6ZSx2KFwiamlzMDIwOFwiKSkpP2YoZSk6W2woaS85NCkrMTYxLGklOTQrMTYxXX19ZnVuY3Rpb24gRChuKXt2YXIgdD1uLmZhdGFsLG89MCxzPTEsbD0yLGE9Myx1PTQsYz01LGY9NixkPW8saD1vLGc9MCxwPSExO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3N3aXRjaChkKXtkZWZhdWx0OmNhc2UgbzpyZXR1cm4gMjc9PT1lPyhkPWMsbnVsbCk6XyhlLDAsMTI3KSYmMTQhPT1lJiYxNSE9PWUmJjI3IT09ZT8ocD0hMSxlKTplPT09Yj93OihwPSExLG0odCkpO2Nhc2UgczpyZXR1cm4gMjc9PT1lPyhkPWMsbnVsbCk6OTI9PT1lPyhwPSExLDE2NSk6MTI2PT09ZT8ocD0hMSw4MjU0KTpfKGUsMCwxMjcpJiYxNCE9PWUmJjE1IT09ZSYmMjchPT1lJiY5MiE9PWUmJjEyNiE9PWU/KHA9ITEsZSk6ZT09PWI/dzoocD0hMSxtKHQpKTtjYXNlIGw6cmV0dXJuIDI3PT09ZT8oZD1jLG51bGwpOl8oZSwzMyw5NSk/KHA9ITEsNjUzNDQrZSk6ZT09PWI/dzoocD0hMSxtKHQpKTtjYXNlIGE6cmV0dXJuIDI3PT09ZT8oZD1jLG51bGwpOl8oZSwzMywxMjYpPyhwPSExLGc9ZSxkPXUsbnVsbCk6ZT09PWI/dzoocD0hMSxtKHQpKTtjYXNlIHU6aWYoMjc9PT1lKWQ9YztlbHNle2lmKF8oZSwzMywxMjYpKXJldHVybiBkPWEsbnVsbD09PShpPXkoOTQqKGctMzMpK2UtMzMsdihcImppczAyMDhcIikpKT9tKHQpOmk7ZT09PWI/KGQ9YSxuLnByZXBlbmQoZSkpOmQ9YX1yZXR1cm4gbSh0KTtjYXNlIGM6cmV0dXJuIDM2PT09ZXx8NDA9PT1lPyhnPWUsZD1mLG51bGwpOihuLnByZXBlbmQoZSkscD0hMSxkPWgsbSh0KSk7Y2FzZSBmOnZhciBpPWcscj0oZz0wLG51bGwpO3JldHVybig0MD09PWkmJjY2PT09ZSYmKHI9byksNDA9PT1pJiY3ND09PWUmJihyPXMpLDQwPT09aSYmNzM9PT1lJiYocj1sKSxudWxsIT09KHI9MzYhPT1pfHw2NCE9PWUmJjY2IT09ZT9yOmEpKT8oZD1yLHI9cCxwPSEwLHI/bSh0KTpudWxsKToobi5wcmVwZW5kKFtpLGVdKSxwPSExLGQ9aCxtKHQpKX19fWZ1bmN0aW9uIEYobil7bi5mYXRhbDt2YXIgcj0wLHQ9MSxvPTIscz1yO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe2lmKGU9PT1iJiZzIT09cilyZXR1cm4gbi5wcmVwZW5kKGUpLHM9cixbMjcsNDAsNjZdO2lmKGU9PT1iJiZzPT09cilyZXR1cm4gdztpZighKHMhPT1yJiZzIT09dHx8MTQhPT1lJiYxNSE9PWUmJjI3IT09ZSkpcmV0dXJuIGYoNjU1MzMpO2lmKHM9PT1yJiZhKGUpKXJldHVybiBlO2lmKHM9PT10JiYoYShlKSYmOTIhPT1lJiYxMjYhPT1lfHwxNjU9PWV8fDgyNTQ9PWUpKXtpZihhKGUpKXJldHVybiBlO2lmKDE2NT09PWUpcmV0dXJuIDkyO2lmKDgyNTQ9PT1lKXJldHVybiAxMjZ9dmFyIGk7cmV0dXJuIGEoZSkmJnMhPT1yPyhuLnByZXBlbmQoZSkscz1yLFsyNyw0MCw2Nl0pOjE2NSE9PWUmJjgyNTQhPT1lfHxzPT09dD9udWxsPT09KGk9cChlPTg3MjI9PT1lPzY1MjkzOmUsdihcImppczAyMDhcIikpKT9mKGUpOnMhPT1vPyhuLnByZXBlbmQoZSkscz1vLFsyNywzNiw2Nl0pOltsKGkvOTQpKzMzLGklOTQrMzNdOihuLnByZXBlbmQoZSkscz10LFsyNyw0MCw3NF0pfX1mdW5jdGlvbiBKKG4pe3ZhciB0PW4uZmF0YWwsbz0wO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpLHI7cmV0dXJuIGU9PT1iJiYwIT09bz8obz0wLG0odCkpOmU9PT1iJiYwPT09bz93OjAhPT1vPyhyPW8saT1udWxsLG89MCwoXyhlLDY0LDEyNil8fF8oZSwxMjgsMjUyKSkmJihpPTE4OCooci0ocjwxNjA/MTI5OjE5MykpK2UtKGU8MTI3PzY0OjY1KSksXyhpLDg4MzYsMTA3MTUpPzQ4NTA4K2k6KG51bGw9PT0ocj1udWxsPT09aT9udWxsOnkoaSx2KFwiamlzMDIwOFwiKSkpJiZ1KGUpJiZuLnByZXBlbmQoZSksbnVsbD09PXI/bSh0KTpyKSk6dShlKXx8MTI4PT09ZT9lOl8oZSwxNjEsMjIzKT82NTIxNitlOl8oZSwxMjksMTU5KXx8XyhlLDIyNCwyNTIpPyhvPWUsbnVsbCk6bSh0KX19ZnVuY3Rpb24gSyhuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpO3JldHVybiBlPT09Yj93OmEoZSl8fDEyOD09PWU/ZToxNjU9PT1lPzkyOjgyNTQ9PT1lPzEyNjpfKGUsNjUzNzcsNjU0MzkpP2UtNjUzNzcrMTYxOihpPWU9ODcyMj09PWU/NjUyOTM6ZSxudWxsPT09KGk9KHQ9dHx8dihcImppczAyMDhcIikubWFwKGZ1bmN0aW9uKG4sZSl7cmV0dXJuIF8oZSw4MjcyLDg4MzUpP251bGw6bn0pKS5pbmRleE9mKGkpKT9mKGUpOlsoZT1sKGkvMTg4KSkrKGU8MzE/MTI5OjE5MyksKGU9aSUxODgpKyhlPDYzPzY0OjY1KV0pfX1mdW5jdGlvbiBSKG4pe3ZhciB0PW4uZmF0YWwsbz0wO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpLHI7cmV0dXJuIGU9PT1iJiYwIT09bz8obz0wLG0odCkpOmU9PT1iJiYwPT09bz93OjAhPT1vPyhyPW8sbz0wLHI9KGk9bnVsbCk9PT0oaT1fKGUsNjUsMjU0KT8xOTAqKHItMTI5KSsoZS02NSk6aSk/bnVsbDp5KGksdihcImV1Yy1rclwiKSksbnVsbD09PWkmJnUoZSkmJm4ucHJlcGVuZChlKSxudWxsPT09cj9tKHQpOnIpOnUoZSk/ZTpfKGUsMTI5LDI1NCk/KG89ZSxudWxsKTptKHQpfX1mdW5jdGlvbiBHKG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGk7cmV0dXJuIGU9PT1iP3c6YShlKT9lOm51bGw9PT0oaT1wKGUsdihcImV1Yy1rclwiKSkpP2YoZSk6W2woaS8xOTApKzEyOSxpJTE5MCs2NV19fWZ1bmN0aW9uIEEobixlKXt2YXIgaT1uPj44LG49MjU1Jm47cmV0dXJuIGU/W2ksbl06W24saV19ZnVuY3Rpb24gTChyLG4pe3ZhciB0PW4uZmF0YWwsbz1udWxsLHM9bnVsbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXt2YXIgaTtyZXR1cm4gZSE9PWJ8fG51bGw9PT1vJiZudWxsPT09cz9lPT09YiYmbnVsbD09PW8mJm51bGw9PT1zP3c6bnVsbD09PW8/KG89ZSxudWxsKTooZT1yPyhvPDw4KStlOihlPDw4KStvLChvPW51bGwpIT09cz8oaT1zLHM9bnVsbCxfKGUsNTYzMjAsNTczNDMpPzY1NTM2KzEwMjQqKGktNTUyOTYpKyhlLTU2MzIwKToobi5wcmVwZW5kKEEoZSxyKSksbSh0KSkpOl8oZSw1NTI5Niw1NjMxOSk/KHM9ZSxudWxsKTpfKGUsNTYzMjAsNTczNDMpP20odCk6ZSk6bSh0KX19ZnVuY3Rpb24gTShyLG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGk7cmV0dXJuIGU9PT1iP3c6XyhlLDAsNjU1MzUpP0EoZSxyKTooaT1BKDU1Mjk2KyhlLTY1NTM2Pj4xMCksciksZT1BKDU2MzIwKyhlLTY1NTM2JjEwMjMpLHIpLGkuY29uY2F0KGUpKX19ZnVuY3Rpb24gTihuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3JldHVybiBlPT09Yj93OnUoZSk/ZTo2MzM2MCtlLTEyOH19ZnVuY3Rpb24gcShuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3JldHVybiBlPT09Yj93OmEoZSk/ZTpfKGUsNjMzNjAsNjM0ODcpP2UtNjMzNjArMTI4OmYoZSl9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmKE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLnByb3RvdHlwZSxcImVuY29kaW5nXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9lbmNvZGluZy5uYW1lLnRvTG93ZXJDYXNlKCl9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KE8ucHJvdG90eXBlLFwiZmF0YWxcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuXCJmYXRhbFwiPT09dGhpcy5fZXJyb3JfbW9kZX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoTy5wcm90b3R5cGUsXCJpZ25vcmVCT01cIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2lnbm9yZUJPTX19KSksTy5wcm90b3R5cGUuZGVjb2RlPWZ1bmN0aW9uKG4sZSl7bj1cIm9iamVjdFwiPT10eXBlb2YgbiYmbiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyP25ldyBVaW50OEFycmF5KG4pOlwib2JqZWN0XCI9PXR5cGVvZiBuJiZcImJ1ZmZlclwiaW4gbiYmbi5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcj9uZXcgVWludDhBcnJheShuLmJ1ZmZlcixuLmJ5dGVPZmZzZXQsbi5ieXRlTGVuZ3RoKTpuZXcgVWludDhBcnJheSgwKTtlPXMoZSksdGhpcy5fZG9fbm90X2ZsdXNofHwodGhpcy5fZGVjb2Rlcj1nW3RoaXMuX2VuY29kaW5nLm5hbWVdKHtmYXRhbDpcImZhdGFsXCI9PT10aGlzLl9lcnJvcl9tb2RlfSksdGhpcy5fQk9Nc2Vlbj0hMSksdGhpcy5fZG9fbm90X2ZsdXNoPUJvb2xlYW4oZS5zdHJlYW0pO2Zvcih2YXIgaSxyPW5ldyBjKG4pLHQ9W107Oyl7dmFyIG89ci5yZWFkKCk7aWYobz09PWIpYnJlYWs7aWYoKGk9dGhpcy5fZGVjb2Rlci5oYW5kbGVyKHIsbykpPT09dylicmVhaztudWxsIT09aSYmKEFycmF5LmlzQXJyYXkoaSk/dC5wdXNoLmFwcGx5KHQsaSk6dC5wdXNoKGkpKX1pZighdGhpcy5fZG9fbm90X2ZsdXNoKXtmb3IoOyhpPXRoaXMuX2RlY29kZXIuaGFuZGxlcihyLHIucmVhZCgpKSkhPT13JiYobnVsbCE9PWkmJihBcnJheS5pc0FycmF5KGkpP3QucHVzaC5hcHBseSh0LGkpOnQucHVzaChpKSksIXIuZW5kT2ZTdHJlYW0oKSk7KTt0aGlzLl9kZWNvZGVyPW51bGx9cmV0dXJuIGZ1bmN0aW9uKG4pe2U9W1wiVVRGLThcIixcIlVURi0xNkxFXCIsXCJVVEYtMTZCRVwiXSxpPXRoaXMuX2VuY29kaW5nLm5hbWUsLTE9PT1lLmluZGV4T2YoaSl8fHRoaXMuX2lnbm9yZUJPTXx8dGhpcy5fQk9Nc2Vlbnx8KDA8bi5sZW5ndGgmJjY1Mjc5PT09blswXT8odGhpcy5fQk9Nc2Vlbj0hMCxuLnNoaWZ0KCkpOjA8bi5sZW5ndGgmJih0aGlzLl9CT01zZWVuPSEwKSk7Zm9yKHZhciBlLGkscj1uLHQ9XCJcIixvPTA7bzxyLmxlbmd0aDsrK28pe3ZhciBzPXJbb107czw9NjU1MzU/dCs9U3RyaW5nLmZyb21DaGFyQ29kZShzKToocy09NjU1MzYsdCs9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5Nisocz4+MTApLDU2MzIwKygxMDIzJnMpKSl9cmV0dXJuIHR9LmNhbGwodGhpcyx0KX0sT2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZGVmaW5lUHJvcGVydHkoay5wcm90b3R5cGUsXCJlbmNvZGluZ1wiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZW5jb2RpbmcubmFtZS50b0xvd2VyQ2FzZSgpfX0pLGsucHJvdG90eXBlLmVuY29kZT1mdW5jdGlvbihuLGUpe249dm9pZCAwPT09bj9cIlwiOlN0cmluZyhuKSxlPXMoZSksdGhpcy5fZG9fbm90X2ZsdXNofHwodGhpcy5fZW5jb2Rlcj1oW3RoaXMuX2VuY29kaW5nLm5hbWVdKHtmYXRhbDpcImZhdGFsXCI9PT10aGlzLl9mYXRhbH0pKSx0aGlzLl9kb19ub3RfZmx1c2g9Qm9vbGVhbihlLnN0cmVhbSk7Zm9yKHZhciBpLHI9bmV3IGMoZnVuY3Rpb24obil7Zm9yKHZhciBlPVN0cmluZyhuKSxpPWUubGVuZ3RoLHI9MCx0PVtdO3I8aTspe3ZhciBvLHM9ZS5jaGFyQ29kZUF0KHIpO3M8NTUyOTZ8fDU3MzQzPHM/dC5wdXNoKHMpOjU2MzIwPD1zJiZzPD01NzM0Mz90LnB1c2goNjU1MzMpOjU1Mjk2PD1zJiZzPD01NjMxOSYmKHIhPT1pLTEmJjU2MzIwPD0obz1lLmNoYXJDb2RlQXQocisxKSkmJm88PTU3MzQzPyh0LnB1c2goNjU1MzYrKCgxMDIzJnMpPDwxMCkrKDEwMjMmbykpLHIrPTEpOnQucHVzaCg2NTUzMykpLHIrPTF9cmV0dXJuIHR9KG4pKSx0PVtdOzspe3ZhciBvPXIucmVhZCgpO2lmKG89PT1iKWJyZWFrO2lmKChpPXRoaXMuX2VuY29kZXIuaGFuZGxlcihyLG8pKT09PXcpYnJlYWs7QXJyYXkuaXNBcnJheShpKT90LnB1c2guYXBwbHkodCxpKTp0LnB1c2goaSl9aWYoIXRoaXMuX2RvX25vdF9mbHVzaCl7Zm9yKDs7KXtpZigoaT10aGlzLl9lbmNvZGVyLmhhbmRsZXIocixyLnJlYWQoKSkpPT09dylicmVhaztBcnJheS5pc0FycmF5KGkpP3QucHVzaC5hcHBseSh0LGkpOnQucHVzaChpKX10aGlzLl9lbmNvZGVyPW51bGx9cmV0dXJuIG5ldyBVaW50OEFycmF5KHQpfSxoW1wiVVRGLThcIl09ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBFKG4pfSxnW1wiVVRGLThcIl09ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBlKG4pfSxcImVuY29kaW5nLWluZGV4ZXNcImluIGkmJm4uZm9yRWFjaChmdW5jdGlvbihuKXtcIkxlZ2FjeSBzaW5nbGUtYnl0ZSBlbmNvZGluZ3NcIj09PW4uaGVhZGluZyYmbi5lbmNvZGluZ3MuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgbj1uLm5hbWUsZT12KG4udG9Mb3dlckNhc2UoKSk7Z1tuXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IGooZSxuKX0saFtuXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEIoZSxuKX19KX0pLGcuR0JLPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgUyhuKX0saC5HQks9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBUKG4sITApfSxoLmdiMTgwMzA9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBUKG4pfSxnLmdiMTgwMzA9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBTKG4pfSxoLkJpZzU9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBVKG4pfSxnLkJpZzU9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBJKG4pfSxoW1wiRVVDLUpQXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgUChuKX0sZ1tcIkVVQy1KUFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEMobil9LGhbXCJJU08tMjAyMi1KUFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEYobil9LGdbXCJJU08tMjAyMi1KUFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEQobil9LGguU2hpZnRfSklTPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgSyhuKX0sZy5TaGlmdF9KSVM9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBKKG4pfSxoW1wiRVVDLUtSXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgRyhuKX0sZ1tcIkVVQy1LUlwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IFIobil9LGhbXCJVVEYtMTZCRVwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IE0oITAsbil9LGdbXCJVVEYtMTZCRVwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEwoITAsbil9LGhbXCJVVEYtMTZMRVwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IE0oITEsbil9LGdbXCJVVEYtMTZMRVwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEwoITEsbil9LGhbXCJ4LXVzZXItZGVmaW5lZFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IHEobil9LGdbXCJ4LXVzZXItZGVmaW5lZFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IE4obil9LGkuVGV4dEVuY29kZXJ8fChpLlRleHRFbmNvZGVyPWspLGkuVGV4dERlY29kZXJ8fChpLlRleHREZWNvZGVyPU8pLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9e1RleHRFbmNvZGVyOmkuVGV4dEVuY29kZXIsVGV4dERlY29kZXI6aS5UZXh0RGVjb2RlcixFbmNvZGluZ0luZGV4ZXM6aVtcImVuY29kaW5nLWluZGV4ZXNcIl19KX0odGhpc3x8e30pO1xuXHRcdFx0XHRcdC8vIEBwcm90b2J1Zi10cy9ydW50aW1lXG5cdFx0XHRcdFx0KGk9PntpLnN5bWJvbD1TeW1ib2wuZm9yKFwicHJvdG9idWYtdHMvdW5rbm93blwiKSxpLm9uUmVhZD0oZSxyLHQsYSxuKT0+eyhzKHIpP3JbaS5zeW1ib2xdOnJbaS5zeW1ib2xdPVtdKS5wdXNoKHtubzp0LHdpcmVUeXBlOmEsZGF0YTpufSl9LGkub25Xcml0ZT0oZSxyLHQpPT57Zm9yKHZhcntubzphLHdpcmVUeXBlOm4sZGF0YTpzfW9mIGkubGlzdChyKSl0LnRhZyhhLG4pLnJhdyhzKX0saS5saXN0PShlLHIpPT57cmV0dXJuIHMoZSk/KGU9ZVtpLnN5bWJvbF0scj9lLmZpbHRlcihlPT5lLm5vPT1yKTplKTpbXX0saS5sYXN0PShlLHIpPT4oMCxpLmxpc3QpKGUscikuc2xpY2UoLTEpWzBdO2NvbnN0IHM9ZT0+ZSYmQXJyYXkuaXNBcnJheShlW2kuc3ltYm9sXSl9KShVbmtub3duRmllbGRIYW5kbGVyPVVua25vd25GaWVsZEhhbmRsZXJ8fHt9KTtcblx0XHRcdFx0XHR2YXIgVW5rbm93bkZpZWxkSGFuZGxlcixXaXJlVHlwZT0oZT0+KGVbZS5WYXJpbnQ9MF09XCJWYXJpbnRcIixlW2UuQml0NjQ9MV09XCJCaXQ2NFwiLGVbZS5MZW5ndGhEZWxpbWl0ZWQ9Ml09XCJMZW5ndGhEZWxpbWl0ZWRcIixlW2UuU3RhcnRHcm91cD0zXT1cIlN0YXJ0R3JvdXBcIixlW2UuRW5kR3JvdXA9NF09XCJFbmRHcm91cFwiLGVbZS5CaXQzMj01XT1cIkJpdDMyXCIsZSkpKFdpcmVUeXBlfHx7fSk7Y29uc3QgTUVTU0FHRV9UWVBFPVN5bWJvbC5mb3IoXCJwcm90b2J1Zi10cy9tZXNzYWdlLXR5cGVcIik7ZnVuY3Rpb24gbG93ZXJDYW1lbENhc2Uocil7bGV0IHQ9ITE7dmFyIGE9W107Zm9yKGxldCBlPTA7ZTxyLmxlbmd0aDtlKyspe3ZhciBuPXIuY2hhckF0KGUpO1wiX1wiPT1uP3Q9ITA6L1xcZC8udGVzdChuKT8oYS5wdXNoKG4pLHQ9ITApOnQ/KGEucHVzaChuLnRvVXBwZXJDYXNlKCkpLHQ9ITEpOjA9PWU/YS5wdXNoKG4udG9Mb3dlckNhc2UoKSk6YS5wdXNoKG4pfXJldHVybiBhLmpvaW4oXCJcIil9dmFyIFNjYWxhclR5cGU9KGU9PihlW2UuRE9VQkxFPTFdPVwiRE9VQkxFXCIsZVtlLkZMT0FUPTJdPVwiRkxPQVRcIixlW2UuSU5UNjQ9M109XCJJTlQ2NFwiLGVbZS5VSU5UNjQ9NF09XCJVSU5UNjRcIixlW2UuSU5UMzI9NV09XCJJTlQzMlwiLGVbZS5GSVhFRDY0PTZdPVwiRklYRUQ2NFwiLGVbZS5GSVhFRDMyPTddPVwiRklYRUQzMlwiLGVbZS5CT09MPThdPVwiQk9PTFwiLGVbZS5TVFJJTkc9OV09XCJTVFJJTkdcIixlW2UuQllURVM9MTJdPVwiQllURVNcIixlW2UuVUlOVDMyPTEzXT1cIlVJTlQzMlwiLGVbZS5TRklYRUQzMj0xNV09XCJTRklYRUQzMlwiLGVbZS5TRklYRUQ2ND0xNl09XCJTRklYRUQ2NFwiLGVbZS5TSU5UMzI9MTddPVwiU0lOVDMyXCIsZVtlLlNJTlQ2ND0xOF09XCJTSU5UNjRcIixlKSkoU2NhbGFyVHlwZXx8e30pLExvbmdUeXBlPShlPT4oZVtlLkJJR0lOVD0wXT1cIkJJR0lOVFwiLGVbZS5TVFJJTkc9MV09XCJTVFJJTkdcIixlW2UuTlVNQkVSPTJdPVwiTlVNQkVSXCIsZSkpKExvbmdUeXBlfHx7fSksUmVwZWF0VHlwZT0oZT0+KGVbZS5OTz0wXT1cIk5PXCIsZVtlLlBBQ0tFRD0xXT1cIlBBQ0tFRFwiLGVbZS5VTlBBQ0tFRD0yXT1cIlVOUEFDS0VEXCIsZSkpKFJlcGVhdFR5cGV8fHt9KTtmdW5jdGlvbiBub3JtYWxpemVGaWVsZEluZm8oZSl7cmV0dXJuIGUubG9jYWxOYW1lPWUubG9jYWxOYW1lPz9sb3dlckNhbWVsQ2FzZShlLm5hbWUpLGUuanNvbk5hbWU9ZS5qc29uTmFtZT8/bG93ZXJDYW1lbENhc2UoZS5uYW1lKSxlLnJlcGVhdD1lLnJlcGVhdD8/MCxlLm9wdD1lLm9wdD8/KCFlLnJlcGVhdCYmKCFlLm9uZW9mJiZcIm1lc3NhZ2VcIj09ZS5raW5kKSksZX1mdW5jdGlvbiBpc09uZW9mR3JvdXAoZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGV8fG51bGw9PT1lfHwhZS5oYXNPd25Qcm9wZXJ0eShcIm9uZW9mS2luZFwiKSlyZXR1cm4hMTtzd2l0Y2godHlwZW9mIGUub25lb2ZLaW5kKXtjYXNlXCJzdHJpbmdcIjpyZXR1cm4gdm9pZCAwPT09ZVtlLm9uZW9mS2luZF0/ITE6Mj09T2JqZWN0LmtleXMoZSkubGVuZ3RoO2Nhc2VcInVuZGVmaW5lZFwiOnJldHVybiAxPT1PYmplY3Qua2V5cyhlKS5sZW5ndGg7ZGVmYXVsdDpyZXR1cm4hMX19Y2xhc3MgUmVmbGVjdGlvblR5cGVDaGVja3tjb25zdHJ1Y3RvcihlKXt0aGlzLmZpZWxkcz1lLmZpZWxkcz8/W119cHJlcGFyZSgpe2lmKCF0aGlzLmRhdGEpe3ZhciBlLHI9W10sdD1bXSxhPVtdO2ZvcihlIG9mIHRoaXMuZmllbGRzKWlmKGUub25lb2YpYS5pbmNsdWRlcyhlLm9uZW9mKXx8KGEucHVzaChlLm9uZW9mKSxyLnB1c2goZS5vbmVvZiksdC5wdXNoKGUub25lb2YpKTtlbHNlIHN3aXRjaCh0LnB1c2goZS5sb2NhbE5hbWUpLGUua2luZCl7Y2FzZVwic2NhbGFyXCI6Y2FzZVwiZW51bVwiOmUub3B0JiYhZS5yZXBlYXR8fHIucHVzaChlLmxvY2FsTmFtZSk7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmUucmVwZWF0JiZyLnB1c2goZS5sb2NhbE5hbWUpO2JyZWFrO2Nhc2VcIm1hcFwiOnIucHVzaChlLmxvY2FsTmFtZSl9dGhpcy5kYXRhPXtyZXE6cixrbm93bjp0LG9uZW9mczpPYmplY3QudmFsdWVzKGEpfX19aXMoZSxhLG49ITEpe2lmKCEoYTwwKSl7aWYobnVsbD09ZXx8XCJvYmplY3RcIiE9dHlwZW9mIGUpcmV0dXJuITE7dGhpcy5wcmVwYXJlKCk7bGV0IHI9T2JqZWN0LmtleXMoZSksdD10aGlzLmRhdGE7aWYoci5sZW5ndGg8dC5yZXEubGVuZ3RofHx0LnJlcS5zb21lKGU9PiFyLmluY2x1ZGVzKGUpKSlyZXR1cm4hMTtpZighbiYmci5zb21lKGU9PiF0Lmtub3duLmluY2x1ZGVzKGUpKSlyZXR1cm4hMTtpZighKGE8MSkpe2Zvcihjb25zdCBpIG9mIHQub25lb2ZzKXtjb25zdCBvPWVbaV07aWYoIWlzT25lb2ZHcm91cChvKSlyZXR1cm4hMTtpZih2b2lkIDAhPT1vLm9uZW9mS2luZCl7dmFyIHM9dGhpcy5maWVsZHMuZmluZChlPT5lLmxvY2FsTmFtZT09PW8ub25lb2ZLaW5kKTtpZighcylyZXR1cm4hMTtpZighdGhpcy5maWVsZChvW28ub25lb2ZLaW5kXSxzLG4sYSkpcmV0dXJuITF9fWZvcihjb25zdCBsIG9mIHRoaXMuZmllbGRzKWlmKHZvaWQgMD09PWwub25lb2YmJiF0aGlzLmZpZWxkKGVbbC5sb2NhbE5hbWVdLGwsbixhKSlyZXR1cm4hMX19cmV0dXJuITB9ZmllbGQoZSxyLHQsYSl7dmFyIG49ci5yZXBlYXQ7c3dpdGNoKHIua2luZCl7Y2FzZVwic2NhbGFyXCI6cmV0dXJuIHZvaWQgMD09PWU/ci5vcHQ6bj90aGlzLnNjYWxhcnMoZSxyLlQsYSxyLkwpOnRoaXMuc2NhbGFyKGUsci5ULHIuTCk7Y2FzZVwiZW51bVwiOnJldHVybiB2b2lkIDA9PT1lP3Iub3B0Om4/dGhpcy5zY2FsYXJzKGUsU2NhbGFyVHlwZS5JTlQzMixhKTp0aGlzLnNjYWxhcihlLFNjYWxhclR5cGUuSU5UMzIpO2Nhc2VcIm1lc3NhZ2VcIjpyZXR1cm4gdm9pZCAwPT09ZT8hMDpuP3RoaXMubWVzc2FnZXMoZSxyLlQoKSx0LGEpOnRoaXMubWVzc2FnZShlLHIuVCgpLHQsYSk7Y2FzZVwibWFwXCI6aWYoXCJvYmplY3RcIiE9dHlwZW9mIGV8fG51bGw9PT1lKXJldHVybiExO2lmKGE8MilyZXR1cm4hMDtpZighdGhpcy5tYXBLZXlzKGUsci5LLGEpKXJldHVybiExO3N3aXRjaChyLlYua2luZCl7Y2FzZVwic2NhbGFyXCI6cmV0dXJuIHRoaXMuc2NhbGFycyhPYmplY3QudmFsdWVzKGUpLHIuVi5ULGEsci5WLkwpO2Nhc2VcImVudW1cIjpyZXR1cm4gdGhpcy5zY2FsYXJzKE9iamVjdC52YWx1ZXMoZSksU2NhbGFyVHlwZS5JTlQzMixhKTtjYXNlXCJtZXNzYWdlXCI6cmV0dXJuIHRoaXMubWVzc2FnZXMoT2JqZWN0LnZhbHVlcyhlKSxyLlYuVCgpLHQsYSl9fXJldHVybiEwfW1lc3NhZ2UoZSxyLHQsYSl7cmV0dXJuIHQ/ci5pc0Fzc2lnbmFibGUoZSxhKTpyLmlzKGUsYSl9bWVzc2FnZXMocix0LGUsYSl7aWYoIUFycmF5LmlzQXJyYXkocikpcmV0dXJuITE7aWYoIShhPDIpKWlmKGUpe2ZvcihsZXQgZT0wO2U8ci5sZW5ndGgmJmU8YTtlKyspaWYoIXQuaXNBc3NpZ25hYmxlKHJbZV0sYS0xKSlyZXR1cm4hMX1lbHNlIGZvcihsZXQgZT0wO2U8ci5sZW5ndGgmJmU8YTtlKyspaWYoIXQuaXMocltlXSxhLTEpKXJldHVybiExO3JldHVybiEwfXNjYWxhcihlLHIsdCl7dmFyIGE9dHlwZW9mIGU7c3dpdGNoKHIpe2Nhc2UgU2NhbGFyVHlwZS5VSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLkZJWEVENjQ6Y2FzZSBTY2FsYXJUeXBlLklOVDY0OmNhc2UgU2NhbGFyVHlwZS5TRklYRUQ2NDpjYXNlIFNjYWxhclR5cGUuU0lOVDY0OnN3aXRjaCh0KXtjYXNlIExvbmdUeXBlLkJJR0lOVDpyZXR1cm5cImJpZ2ludFwiPT1hO2Nhc2UgTG9uZ1R5cGUuTlVNQkVSOnJldHVyblwibnVtYmVyXCI9PWEmJiFpc05hTihlKTtkZWZhdWx0OnJldHVyblwic3RyaW5nXCI9PWF9Y2FzZSBTY2FsYXJUeXBlLkJPT0w6cmV0dXJuXCJib29sZWFuXCI9PWE7Y2FzZSBTY2FsYXJUeXBlLlNUUklORzpyZXR1cm5cInN0cmluZ1wiPT1hO2Nhc2UgU2NhbGFyVHlwZS5CWVRFUzpyZXR1cm4gZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXk7Y2FzZSBTY2FsYXJUeXBlLkRPVUJMRTpjYXNlIFNjYWxhclR5cGUuRkxPQVQ6cmV0dXJuXCJudW1iZXJcIj09YSYmIWlzTmFOKGUpO2RlZmF1bHQ6cmV0dXJuXCJudW1iZXJcIj09YSYmTnVtYmVyLmlzSW50ZWdlcihlKX19c2NhbGFycyhyLHQsYSxuKXtpZighQXJyYXkuaXNBcnJheShyKSlyZXR1cm4hMTtpZighKGE8MikmJkFycmF5LmlzQXJyYXkocikpZm9yKGxldCBlPTA7ZTxyLmxlbmd0aCYmZTxhO2UrKylpZighdGhpcy5zY2FsYXIocltlXSx0LG4pKXJldHVybiExO3JldHVybiEwfW1hcEtleXMoZSxyLHQpe3ZhciBhPU9iamVjdC5rZXlzKGUpO3N3aXRjaChyKXtjYXNlIFNjYWxhclR5cGUuSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLkZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDMyOmNhc2UgU2NhbGFyVHlwZS5TSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLlVJTlQzMjpyZXR1cm4gdGhpcy5zY2FsYXJzKGEuc2xpY2UoMCx0KS5tYXAoZT0+cGFyc2VJbnQoZSkpLHIsdCk7Y2FzZSBTY2FsYXJUeXBlLkJPT0w6cmV0dXJuIHRoaXMuc2NhbGFycyhhLnNsaWNlKDAsdCkubWFwKGU9PlwidHJ1ZVwiPT1lfHxcImZhbHNlXCIhPWUmJmUpLHIsdCk7ZGVmYXVsdDpyZXR1cm4gdGhpcy5zY2FsYXJzKGEscix0LExvbmdUeXBlLlNUUklORyl9fX1mdW5jdGlvbiB0eXBlb2ZKc29uVmFsdWUoZSl7dmFyIHI9dHlwZW9mIGU7aWYoXCJvYmplY3RcIj09cil7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm5cImFycmF5XCI7aWYobnVsbD09PWUpcmV0dXJuXCJudWxsXCJ9cmV0dXJuIHJ9ZnVuY3Rpb24gaXNKc29uT2JqZWN0KGUpe3JldHVybiBudWxsIT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJiFBcnJheS5pc0FycmF5KGUpfWxldCBlbmNUYWJsZT1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5zcGxpdChcIlwiKSxkZWNUYWJsZT1bXTtmb3IobGV0IGU9MDtlPGVuY1RhYmxlLmxlbmd0aDtlKyspZGVjVGFibGVbZW5jVGFibGVbZV0uY2hhckNvZGVBdCgwKV09ZTtmdW5jdGlvbiBiYXNlNjRkZWNvZGUocil7bGV0IGU9MypyLmxlbmd0aC80LHQ9KFwiPVwiPT1yW3IubGVuZ3RoLTJdP2UtPTI6XCI9XCI9PXJbci5sZW5ndGgtMV0mJi0tZSxuZXcgVWludDhBcnJheShlKSksYT0wLG49MCxzLGk9MDtmb3IobGV0IGU9MDtlPHIubGVuZ3RoO2UrKyl7aWYodm9pZCAwPT09KHM9ZGVjVGFibGVbci5jaGFyQ29kZUF0KGUpXSkpc3dpdGNoKHJbZV0pe2Nhc2VcIj1cIjpuPTA7Y2FzZVwiXFxuXCI6Y2FzZVwiXFxyXCI6Y2FzZVwiXFx0XCI6Y2FzZVwiIFwiOmNvbnRpbnVlO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJpbnZhbGlkIGJhc2U2NCBzdHJpbmcuXCIpfXN3aXRjaChuKXtjYXNlIDA6aT1zLG49MTticmVhaztjYXNlIDE6dFthKytdPWk8PDJ8KDQ4JnMpPj40LGk9cyxuPTI7YnJlYWs7Y2FzZSAyOnRbYSsrXT0oMTUmaSk8PDR8KDYwJnMpPj4yLGk9cyxuPTM7YnJlYWs7Y2FzZSAzOnRbYSsrXT0oMyZpKTw8NnxzLG49MH19aWYoMT09bil0aHJvdyBFcnJvcihcImludmFsaWQgYmFzZTY0IHN0cmluZy5cIik7cmV0dXJuIHQuc3ViYXJyYXkoMCxhKX1mdW5jdGlvbiBiYXNlNjRlbmNvZGUocil7bGV0IHQ9XCJcIixhPTAsbixzPTA7Zm9yKGxldCBlPTA7ZTxyLmxlbmd0aDtlKyspc3dpdGNoKG49cltlXSxhKXtjYXNlIDA6dCs9ZW5jVGFibGVbbj4+Ml0scz0oMyZuKTw8NCxhPTE7YnJlYWs7Y2FzZSAxOnQrPWVuY1RhYmxlW3N8bj4+NF0scz0oMTUmbik8PDIsYT0yO2JyZWFrO2Nhc2UgMjp0PSh0Kz1lbmNUYWJsZVtzfG4+PjZdKStlbmNUYWJsZVs2MyZuXSxhPTB9cmV0dXJuIGEmJih0PXQrZW5jVGFibGVbc10rXCI9XCIsMT09YSYmKHQrPVwiPVwiKSksdH1mdW5jdGlvbiB2YXJpbnQ2NHJlYWQoKXtsZXQgcj0wLHQ9MDtmb3IobGV0IGU9MDtlPDI4O2UrPTcpe3ZhciBhPXRoaXMuYnVmW3RoaXMucG9zKytdO2lmKHJ8PSgxMjcmYSk8PGUsMD09KDEyOCZhKSlyZXR1cm4gdGhpcy5hc3NlcnRCb3VuZHMoKSxbcix0XX12YXIgZT10aGlzLmJ1Zlt0aGlzLnBvcysrXTtpZihyfD0oMTUmZSk8PDI4LHQ9KDExMiZlKT4+NCwwPT0oMTI4JmUpKXJldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLFtyLHRdO2ZvcihsZXQgZT0zO2U8PTMxO2UrPTcpe3ZhciBuPXRoaXMuYnVmW3RoaXMucG9zKytdO2lmKHR8PSgxMjcmbik8PGUsMD09KDEyOCZuKSlyZXR1cm4gdGhpcy5hc3NlcnRCb3VuZHMoKSxbcix0XX10aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHZhcmludFwiKX1mdW5jdGlvbiB2YXJpbnQ2NHdyaXRlKHIsdCxhKXtmb3IobGV0IGU9MDtlPDI4O2UrPTcpe3ZhciBuPXI+Pj5lLHM9IShuPj4+Nz09MCYmMD09dCk7aWYoYS5wdXNoKDI1NSYocz8xMjh8bjpuKSksIXMpcmV0dXJufXZhciBlPXI+Pj4yOCYxNXwoNyZ0KTw8NCxpPSEodD4+Mz09MCk7aWYoYS5wdXNoKDI1NSYoaT8xMjh8ZTplKSksaSl7Zm9yKGxldCBlPTM7ZTwzMTtlKz03KXt2YXIgbz10Pj4+ZSxsPSEobz4+Pjc9PTApO2lmKGEucHVzaCgyNTUmKGw/MTI4fG86bykpLCFsKXJldHVybn1hLnB1c2godD4+PjMxJjEpfX1kZWNUYWJsZVtcIi1cIi5jaGFyQ29kZUF0KDApXT1lbmNUYWJsZS5pbmRleE9mKFwiK1wiKSxkZWNUYWJsZVtcIl9cIi5jaGFyQ29kZUF0KDApXT1lbmNUYWJsZS5pbmRleE9mKFwiL1wiKTtjb25zdCBUV09fUFdSXzMyX0RCTCQxPTQyOTQ5NjcyOTY7ZnVuY3Rpb24gaW50NjRmcm9tU3RyaW5nKHQpe3ZhciBlPVwiLVwiPT10WzBdO2UmJih0PXQuc2xpY2UoMSkpO2xldCBhPTAsbj0wO2Z1bmN0aW9uIHIoZSxyKXtlPU51bWJlcih0LnNsaWNlKGUscikpO24qPTFlNiwoYT0xZTYqYStlKT49VFdPX1BXUl8zMl9EQkwkMSYmKG4rPWEvVFdPX1BXUl8zMl9EQkwkMXwwLGElPVRXT19QV1JfMzJfREJMJDEpfXJldHVybiByKC0yNCwtMTgpLHIoLTE4LC0xMikscigtMTIsLTYpLHIoLTYpLFtlLGEsbl19ZnVuY3Rpb24gaW50NjR0b1N0cmluZyhlLHIpe2lmKHI8PTIwOTcxNTEpcmV0dXJuXCJcIisoVFdPX1BXUl8zMl9EQkwkMSpyKyhlPj4+MCkpO3ZhciB0PShlPj4+MjR8cjw8OCk+Pj4wJjE2Nzc3MjE1LHI9cj4+MTYmNjU1MzU7bGV0IGE9KDE2Nzc3MjE1JmUpKzY3NzcyMTYqdCs2NzEwNjU2KnIsbj10KzgxNDc0OTcqcixzPTIqcjtmdW5jdGlvbiBpKGUscil7ZT1lP1N0cmluZyhlKTpcIlwiO3JldHVybiByP1wiMDAwMDAwMFwiLnNsaWNlKGUubGVuZ3RoKStlOmV9cmV0dXJuIDFlNzw9YSYmKG4rPU1hdGguZmxvb3IoYS8xZTcpLGElPTFlNyksMWU3PD1uJiYocys9TWF0aC5mbG9vcihuLzFlNyksbiU9MWU3KSxpKHMsMCkraShuLHMpK2koYSwxKX1mdW5jdGlvbiB2YXJpbnQzMndyaXRlKHIsdCl7aWYoMDw9cil7Zm9yKDsxMjc8cjspdC5wdXNoKDEyNyZyfDEyOCkscj4+Pj03O3QucHVzaChyKX1lbHNle2ZvcihsZXQgZT0wO2U8OTtlKyspdC5wdXNoKDEyNyZyfDEyOCkscj4+PTc7dC5wdXNoKDEpfX1mdW5jdGlvbiB2YXJpbnQzMnJlYWQoKXtsZXQgcj10aGlzLmJ1Zlt0aGlzLnBvcysrXTt2YXIgZT0xMjcmcjtpZigwPT0oMTI4JnIpKXJldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLGU7aWYoZXw9KDEyNyYocj10aGlzLmJ1Zlt0aGlzLnBvcysrXSkpPDw3LDA9PSgxMjgmcikpcmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksZTtpZihlfD0oMTI3JihyPXRoaXMuYnVmW3RoaXMucG9zKytdKSk8PDE0LDA9PSgxMjgmcikpcmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksZTtpZihlfD0oMTI3JihyPXRoaXMuYnVmW3RoaXMucG9zKytdKSk8PDIxLDA9PSgxMjgmcikpcmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksZTtlfD0oMTUmKHI9dGhpcy5idWZbdGhpcy5wb3MrK10pKTw8Mjg7Zm9yKGxldCBlPTU7MCE9KDEyOCZyKSYmZTwxMDtlKyspcj10aGlzLmJ1Zlt0aGlzLnBvcysrXTtpZigwIT0oMTI4JnIpKXRocm93IG5ldyBFcnJvcihcImludmFsaWQgdmFyaW50XCIpO3JldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLGU+Pj4wfWZ1bmN0aW9uIGRldGVjdEJpKCl7dmFyIGU9bmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcig4KSk7cmV0dXJuIHZvaWQgMCE9PWdsb2JhbFRoaXMuQmlnSW50JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmdldEJpZ0ludDY0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmdldEJpZ1VpbnQ2NCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5zZXRCaWdJbnQ2NCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5zZXRCaWdVaW50NjQ/e01JTjpCaWdJbnQoXCItOTIyMzM3MjAzNjg1NDc3NTgwOFwiKSxNQVg6QmlnSW50KFwiOTIyMzM3MjAzNjg1NDc3NTgwN1wiKSxVTUlOOkJpZ0ludChcIjBcIiksVU1BWDpCaWdJbnQoXCIxODQ0Njc0NDA3MzcwOTU1MTYxNVwiKSxDOkJpZ0ludCxWOmV9OnZvaWQgMH1jb25zdCBCST1kZXRlY3RCaSgpO2Z1bmN0aW9uIGFzc2VydEJpKGUpe2lmKCFlKXRocm93IG5ldyBFcnJvcihcIkJpZ0ludCB1bmF2YWlsYWJsZSwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aW1vc3RhbW0vcHJvdG9idWYtdHMvYmxvYi92MS4wLjgvTUFOVUFMLm1kI2JpZ2ludC1zdXBwb3J0XCIpfWNvbnN0IFJFX0RFQ0lNQUxfU1RSPS9eLT9bMC05XSskLyxUV09fUFdSXzMyX0RCTD00Mjk0OTY3Mjk2O2NsYXNzIFNoYXJlZFBiTG9uZ3tjb25zdHJ1Y3RvcihlLHIpe3RoaXMubG89MHxlLHRoaXMuaGk9MHxyfWlzWmVybygpe3JldHVybiAwPT10aGlzLmxvJiYwPT10aGlzLmhpfXRvTnVtYmVyKCl7dmFyIGU9dGhpcy5oaSpUV09fUFdSXzMyX0RCTCsodGhpcy5sbz4+PjApO2lmKE51bWJlci5pc1NhZmVJbnRlZ2VyKGUpKXJldHVybiBlO3Rocm93IG5ldyBFcnJvcihcImNhbm5vdCBjb252ZXJ0IHRvIHNhZmUgbnVtYmVyXCIpfX1jb25zdCBfUGJVTG9uZz1jbGFzcyBleHRlbmRzIFNoYXJlZFBiTG9uZ3tzdGF0aWMgZnJvbShlKXtpZihCSSlzd2l0Y2godHlwZW9mIGUpe2Nhc2VcInN0cmluZ1wiOmlmKFwiMFwiPT1lKXJldHVybiB0aGlzLlpFUk87aWYoXCJcIj09ZSl0aHJvdyBuZXcgRXJyb3IoXCJzdHJpbmcgaXMgbm8gaW50ZWdlclwiKTtlPUJJLkMoZSk7Y2FzZVwibnVtYmVyXCI6aWYoMD09PWUpcmV0dXJuIHRoaXMuWkVSTztlPUJJLkMoZSk7Y2FzZVwiYmlnaW50XCI6aWYoIWUpcmV0dXJuIHRoaXMuWkVSTztpZihlPEJJLlVNSU4pdGhyb3cgbmV3IEVycm9yKFwic2lnbmVkIHZhbHVlIGZvciB1bG9uZ1wiKTtpZihlPkJJLlVNQVgpdGhyb3cgbmV3IEVycm9yKFwidWxvbmcgdG9vIGxhcmdlXCIpO3JldHVybiBCSS5WLnNldEJpZ1VpbnQ2NCgwLGUsITApLG5ldyBfUGJVTG9uZyhCSS5WLmdldEludDMyKDAsITApLEJJLlYuZ2V0SW50MzIoNCwhMCkpfWVsc2Ugc3dpdGNoKHR5cGVvZiBlKXtjYXNlXCJzdHJpbmdcIjppZihcIjBcIj09ZSlyZXR1cm4gdGhpcy5aRVJPO2lmKGU9ZS50cmltKCksIVJFX0RFQ0lNQUxfU1RSLnRlc3QoZSkpdGhyb3cgbmV3IEVycm9yKFwic3RyaW5nIGlzIG5vIGludGVnZXJcIik7dmFyW3IsdCxhXT1pbnQ2NGZyb21TdHJpbmcoZSk7aWYocil0aHJvdyBuZXcgRXJyb3IoXCJzaWduZWQgdmFsdWVcIik7cmV0dXJuIG5ldyBfUGJVTG9uZyh0LGEpO2Nhc2VcIm51bWJlclwiOmlmKDA9PWUpcmV0dXJuIHRoaXMuWkVSTztpZighTnVtYmVyLmlzU2FmZUludGVnZXIoZSkpdGhyb3cgbmV3IEVycm9yKFwibnVtYmVyIGlzIG5vIGludGVnZXJcIik7aWYoZTwwKXRocm93IG5ldyBFcnJvcihcInNpZ25lZCB2YWx1ZSBmb3IgdWxvbmdcIik7cmV0dXJuIG5ldyBfUGJVTG9uZyhlLGUvVFdPX1BXUl8zMl9EQkwpfXRocm93IG5ldyBFcnJvcihcInVua25vd24gdmFsdWUgXCIrdHlwZW9mIGUpfXRvU3RyaW5nKCl7cmV0dXJuIEJJP3RoaXMudG9CaWdJbnQoKS50b1N0cmluZygpOmludDY0dG9TdHJpbmcodGhpcy5sbyx0aGlzLmhpKX10b0JpZ0ludCgpe3JldHVybiBhc3NlcnRCaShCSSksQkkuVi5zZXRJbnQzMigwLHRoaXMubG8sITApLEJJLlYuc2V0SW50MzIoNCx0aGlzLmhpLCEwKSxCSS5WLmdldEJpZ1VpbnQ2NCgwLCEwKX19O2xldCBQYlVMb25nPV9QYlVMb25nO1BiVUxvbmcuWkVSTz1uZXcgX1BiVUxvbmcoMCwwKTtjb25zdCBfUGJMb25nPWNsYXNzIGV4dGVuZHMgU2hhcmVkUGJMb25ne3N0YXRpYyBmcm9tKGUpe2lmKEJJKXN3aXRjaCh0eXBlb2YgZSl7Y2FzZVwic3RyaW5nXCI6aWYoXCIwXCI9PWUpcmV0dXJuIHRoaXMuWkVSTztpZihcIlwiPT1lKXRocm93IG5ldyBFcnJvcihcInN0cmluZyBpcyBubyBpbnRlZ2VyXCIpO2U9QkkuQyhlKTtjYXNlXCJudW1iZXJcIjppZigwPT09ZSlyZXR1cm4gdGhpcy5aRVJPO2U9QkkuQyhlKTtjYXNlXCJiaWdpbnRcIjppZighZSlyZXR1cm4gdGhpcy5aRVJPO2lmKGU8QkkuTUlOKXRocm93IG5ldyBFcnJvcihcInVsb25nIHRvbyBzbWFsbFwiKTtpZihlPkJJLk1BWCl0aHJvdyBuZXcgRXJyb3IoXCJ1bG9uZyB0b28gbGFyZ2VcIik7cmV0dXJuIEJJLlYuc2V0QmlnSW50NjQoMCxlLCEwKSxuZXcgX1BiTG9uZyhCSS5WLmdldEludDMyKDAsITApLEJJLlYuZ2V0SW50MzIoNCwhMCkpfWVsc2Ugc3dpdGNoKHR5cGVvZiBlKXtjYXNlXCJzdHJpbmdcIjppZihcIjBcIj09ZSlyZXR1cm4gdGhpcy5aRVJPO3ZhciByLHQsYTtpZihlPWUudHJpbSgpLFJFX0RFQ0lNQUxfU1RSLnRlc3QoZSkpcmV0dXJuW3IsYSx0XT1pbnQ2NGZyb21TdHJpbmcoZSksYT1uZXcgX1BiTG9uZyhhLHQpLHI/YS5uZWdhdGUoKTphO3Rocm93IG5ldyBFcnJvcihcInN0cmluZyBpcyBubyBpbnRlZ2VyXCIpO2Nhc2VcIm51bWJlclwiOmlmKDA9PWUpcmV0dXJuIHRoaXMuWkVSTztpZihOdW1iZXIuaXNTYWZlSW50ZWdlcihlKSlyZXR1cm4gMDxlP25ldyBfUGJMb25nKGUsZS9UV09fUFdSXzMyX0RCTCk6bmV3IF9QYkxvbmcoLWUsLWUvVFdPX1BXUl8zMl9EQkwpLm5lZ2F0ZSgpO3Rocm93IG5ldyBFcnJvcihcIm51bWJlciBpcyBubyBpbnRlZ2VyXCIpfXRocm93IG5ldyBFcnJvcihcInVua25vd24gdmFsdWUgXCIrdHlwZW9mIGUpfWlzTmVnYXRpdmUoKXtyZXR1cm4gMCE9KDIxNDc0ODM2NDgmdGhpcy5oaSl9bmVnYXRlKCl7bGV0IGU9fnRoaXMuaGkscj10aGlzLmxvO3JldHVybiByP3I9MSt+cjplKz0xLG5ldyBfUGJMb25nKHIsZSl9dG9TdHJpbmcoKXt2YXIgZTtyZXR1cm4gQkk/dGhpcy50b0JpZ0ludCgpLnRvU3RyaW5nKCk6dGhpcy5pc05lZ2F0aXZlKCk/XCItXCIraW50NjR0b1N0cmluZygoZT10aGlzLm5lZ2F0ZSgpKS5sbyxlLmhpKTppbnQ2NHRvU3RyaW5nKHRoaXMubG8sdGhpcy5oaSl9dG9CaWdJbnQoKXtyZXR1cm4gYXNzZXJ0QmkoQkkpLEJJLlYuc2V0SW50MzIoMCx0aGlzLmxvLCEwKSxCSS5WLnNldEludDMyKDQsdGhpcy5oaSwhMCksQkkuVi5nZXRCaWdJbnQ2NCgwLCEwKX19O2xldCBQYkxvbmc9X1BiTG9uZztmdW5jdGlvbiBhc3NlcnQoZSxyKXtpZighZSl0aHJvdyBuZXcgRXJyb3Iocil9UGJMb25nLlpFUk89bmV3IF9QYkxvbmcoMCwwKTtjb25zdCBGTE9BVDMyX01BWD0zNDAyODIzNDY2Mzg1Mjg4NmUyMixGTE9BVDMyX01JTj0tMzQwMjgyMzQ2NjM4NTI4ODZlMjIsVUlOVDMyX01BWD00Mjk0OTY3Mjk1LElOVDMyX01BWD0yMTQ3NDgzNjQ3LElOVDMyX01JTj0tMjE0NzQ4MzY0ODtmdW5jdGlvbiBhc3NlcnRJbnQzMihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGludCAzMjogXCIrdHlwZW9mIGUpO2lmKCFOdW1iZXIuaXNJbnRlZ2VyKGUpfHxlPklOVDMyX01BWHx8ZTxJTlQzMl9NSU4pdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnQgMzI6IFwiK2UpfWZ1bmN0aW9uIGFzc2VydFVJbnQzMihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHVpbnQgMzI6IFwiK3R5cGVvZiBlKTtpZighTnVtYmVyLmlzSW50ZWdlcihlKXx8ZT5VSU5UMzJfTUFYfHxlPDApdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCB1aW50IDMyOiBcIitlKX1mdW5jdGlvbiBhc3NlcnRGbG9hdDMyKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcImludmFsaWQgZmxvYXQgMzI6IFwiK3R5cGVvZiBlKTtpZihOdW1iZXIuaXNGaW5pdGUoZSkmJihlPkZMT0FUMzJfTUFYfHxlPEZMT0FUMzJfTUlOKSl0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGZsb2F0IDMyOiBcIitlKX1mdW5jdGlvbiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoZSxyKXtzd2l0Y2gocil7Y2FzZSBMb25nVHlwZS5CSUdJTlQ6cmV0dXJuIGUudG9CaWdJbnQoKTtjYXNlIExvbmdUeXBlLk5VTUJFUjpyZXR1cm4gZS50b051bWJlcigpO2RlZmF1bHQ6cmV0dXJuIGUudG9TdHJpbmcoKX19Y2xhc3MgUmVmbGVjdGlvbkpzb25SZWFkZXJ7Y29uc3RydWN0b3IoZSl7dGhpcy5pbmZvPWV9cHJlcGFyZSgpe2lmKHZvaWQgMD09PXRoaXMuZk1hcCl7dGhpcy5mTWFwPXt9O2Zvcihjb25zdCBlIG9mIHRoaXMuaW5mby5maWVsZHM/P1tdKXRoaXMuZk1hcFtlLm5hbWVdPWUsdGhpcy5mTWFwW2UuanNvbk5hbWVdPWUsdGhpcy5mTWFwW2UubG9jYWxOYW1lXT1lfX1hc3NlcnQoZSxyLHQpe2lmKCFlKXtsZXQgZT10eXBlb2ZKc29uVmFsdWUodCk7dGhyb3dcIm51bWJlclwiIT1lJiZcImJvb2xlYW5cIiE9ZXx8KGU9dC50b1N0cmluZygpKSxuZXcgRXJyb3IoYENhbm5vdCBwYXJzZSBKU09OICR7ZX0gZm9yICR7dGhpcy5pbmZvLnR5cGVOYW1lfSNgK3IpfX1yZWFkKGUscix0KXt0aGlzLnByZXBhcmUoKTt2YXIgYSxuLHM9W107Zm9yKFthLG5db2YgT2JqZWN0LmVudHJpZXMoZSkpe3ZhciBpPXRoaXMuZk1hcFthXTtpZighaSl7aWYodC5pZ25vcmVVbmtub3duRmllbGRzKWNvbnRpbnVlO3Rocm93IG5ldyBFcnJvcihgRm91bmQgdW5rbm93biBmaWVsZCB3aGlsZSByZWFkaW5nICR7dGhpcy5pbmZvLnR5cGVOYW1lfSBmcm9tIEpTT04gZm9ybWF0LiBKU09OIGtleTogYCthKX12YXIgbz1pLmxvY2FsTmFtZTtsZXQgZTtpZihpLm9uZW9mKXtpZihzLmluY2x1ZGVzKGkub25lb2YpKXRocm93IG5ldyBFcnJvcihgTXVsdGlwbGUgbWVtYmVycyBvZiB0aGUgb25lb2YgZ3JvdXAgXCIke2kub25lb2Z9XCIgb2YgJHt0aGlzLmluZm8udHlwZU5hbWV9IGFyZSBwcmVzZW50IGluIEpTT04uYCk7cy5wdXNoKGkub25lb2YpLGU9cltpLm9uZW9mXT17b25lb2ZLaW5kOm99fWVsc2UgZT1yO2lmKFwibWFwXCI9PWkua2luZCl7aWYobnVsbCE9PW4pe3RoaXMuYXNzZXJ0KGlzSnNvbk9iamVjdChuKSxpLm5hbWUsbik7dmFyIGwsYyxmPWVbb107Zm9yKFtsLGNdb2YgT2JqZWN0LmVudHJpZXMobikpe3RoaXMuYXNzZXJ0KG51bGwhPT1jLGkubmFtZStcIiBtYXAgdmFsdWVcIixudWxsKTtsZXQgZTtzd2l0Y2goaS5WLmtpbmQpe2Nhc2VcIm1lc3NhZ2VcIjplPWkuVi5UKCkuaW50ZXJuYWxKc29uUmVhZChjLHQpO2JyZWFrO2Nhc2VcImVudW1cIjppZighMT09PShlPXRoaXMuZW51bShpLlYuVCgpLGMsaS5uYW1lLHQuaWdub3JlVW5rbm93bkZpZWxkcykpKWNvbnRpbnVlO2JyZWFrO2Nhc2VcInNjYWxhclwiOmU9dGhpcy5zY2FsYXIoYyxpLlYuVCxpLlYuTCxpLm5hbWUpfXRoaXMuYXNzZXJ0KHZvaWQgMCE9PWUsaS5uYW1lK1wiIG1hcCB2YWx1ZVwiLGMpO2xldCByPWw7aS5LPT1TY2FsYXJUeXBlLkJPT0wmJihyPVwidHJ1ZVwiPT1yfHxcImZhbHNlXCIhPXImJnIpLGZbcj10aGlzLnNjYWxhcihyLGkuSyxMb25nVHlwZS5TVFJJTkcsaS5uYW1lKS50b1N0cmluZygpXT1lfX19ZWxzZSBpZihpLnJlcGVhdCl7aWYobnVsbCE9PW4pe3RoaXMuYXNzZXJ0KEFycmF5LmlzQXJyYXkobiksaS5uYW1lLG4pO3ZhciB1PWVbb107Zm9yKGNvbnN0IHAgb2Ygbil7dGhpcy5hc3NlcnQobnVsbCE9PXAsaS5uYW1lLG51bGwpO2xldCBlO3N3aXRjaChpLmtpbmQpe2Nhc2VcIm1lc3NhZ2VcIjplPWkuVCgpLmludGVybmFsSnNvblJlYWQocCx0KTticmVhaztjYXNlXCJlbnVtXCI6aWYoITE9PT0oZT10aGlzLmVudW0oaS5UKCkscCxpLm5hbWUsdC5pZ25vcmVVbmtub3duRmllbGRzKSkpY29udGludWU7YnJlYWs7Y2FzZVwic2NhbGFyXCI6ZT10aGlzLnNjYWxhcihwLGkuVCxpLkwsaS5uYW1lKX10aGlzLmFzc2VydCh2b2lkIDAhPT1lLGkubmFtZSxuKSx1LnB1c2goZSl9fX1lbHNlIHN3aXRjaChpLmtpbmQpe2Nhc2VcIm1lc3NhZ2VcIjpudWxsPT09biYmXCJnb29nbGUucHJvdG9idWYuVmFsdWVcIiE9aS5UKCkudHlwZU5hbWU/dGhpcy5hc3NlcnQodm9pZCAwPT09aS5vbmVvZixpLm5hbWUrXCIgKG9uZW9mIG1lbWJlcilcIixudWxsKTplW29dPWkuVCgpLmludGVybmFsSnNvblJlYWQobix0LGVbb10pO2JyZWFrO2Nhc2VcImVudW1cIjp2YXIgaD10aGlzLmVudW0oaS5UKCksbixpLm5hbWUsdC5pZ25vcmVVbmtub3duRmllbGRzKTshMSE9PWgmJihlW29dPWgpO2JyZWFrO2Nhc2VcInNjYWxhclwiOmVbb109dGhpcy5zY2FsYXIobixpLlQsaS5MLGkubmFtZSl9fX1lbnVtKHIsdCxhLG4pe2lmKFwiZ29vZ2xlLnByb3RvYnVmLk51bGxWYWx1ZVwiPT1yWzBdJiZhc3NlcnQobnVsbD09PXQsYFVuYWJsZSB0byBwYXJzZSBmaWVsZCAke3RoaXMuaW5mby50eXBlTmFtZX0jJHthfSwgZW51bSAke3JbMF19IG9ubHkgYWNjZXB0cyBudWxsLmApLG51bGw9PT10KXJldHVybiAwO3N3aXRjaCh0eXBlb2YgdCl7Y2FzZVwibnVtYmVyXCI6cmV0dXJuIGFzc2VydChOdW1iZXIuaXNJbnRlZ2VyKHQpLGBVbmFibGUgdG8gcGFyc2UgZmllbGQgJHt0aGlzLmluZm8udHlwZU5hbWV9IyR7YX0sIGVudW0gY2FuIG9ubHkgYmUgaW50ZWdyYWwgbnVtYmVyLCBnb3QgJHt0fS5gKSx0O2Nhc2VcInN0cmluZ1wiOmxldCBlPXQ7clsyXSYmdC5zdWJzdHJpbmcoMCxyWzJdLmxlbmd0aCk9PT1yWzJdJiYoZT10LnN1YnN0cmluZyhyWzJdLmxlbmd0aCkpO3ZhciBzPXJbMV1bZV07cmV0dXJuIHZvaWQgMD09PXMmJm4/ITE6KGFzc2VydChcIm51bWJlclwiPT10eXBlb2YgcyxgVW5hYmxlIHRvIHBhcnNlIGZpZWxkICR7dGhpcy5pbmZvLnR5cGVOYW1lfSMke2F9LCBlbnVtICR7clswXX0gaGFzIG5vIHZhbHVlIGZvciBcIiR7dH1cIi5gKSxzKX1hc3NlcnQoITEsYFVuYWJsZSB0byBwYXJzZSBmaWVsZCAke3RoaXMuaW5mby50eXBlTmFtZX0jJHthfSwgY2Fubm90IHBhcnNlIGVudW0gdmFsdWUgZnJvbSAke3R5cGVvZiB0fVwiLmApfXNjYWxhcihyLHQsYSxlKXtsZXQgbjt0cnl7c3dpdGNoKHQpe2Nhc2UgU2NhbGFyVHlwZS5ET1VCTEU6Y2FzZSBTY2FsYXJUeXBlLkZMT0FUOmlmKG51bGw9PT1yKXJldHVybiAwO2lmKFwiTmFOXCI9PT1yKXJldHVybiBOdW1iZXIuTmFOO2lmKFwiSW5maW5pdHlcIj09PXIpcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtpZihcIi1JbmZpbml0eVwiPT09cilyZXR1cm4gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO2lmKFwiXCI9PT1yKW49XCJlbXB0eSBzdHJpbmdcIjtlbHNlIGlmKFwic3RyaW5nXCI9PXR5cGVvZiByJiZyLnRyaW0oKS5sZW5ndGghPT1yLmxlbmd0aCluPVwiZXh0cmEgd2hpdGVzcGFjZVwiO2Vsc2UgaWYoXCJzdHJpbmdcIj09dHlwZW9mIHJ8fFwibnVtYmVyXCI9PXR5cGVvZiByKXt2YXIgcz1OdW1iZXIocik7aWYoTnVtYmVyLmlzTmFOKHMpKW49XCJub3QgYSBudW1iZXJcIjtlbHNle2lmKE51bWJlci5pc0Zpbml0ZShzKSlyZXR1cm4gdD09U2NhbGFyVHlwZS5GTE9BVCYmYXNzZXJ0RmxvYXQzMihzKSxzO249XCJ0b28gbGFyZ2Ugb3Igc21hbGxcIn19YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLklOVDMyOmNhc2UgU2NhbGFyVHlwZS5GSVhFRDMyOmNhc2UgU2NhbGFyVHlwZS5TRklYRUQzMjpjYXNlIFNjYWxhclR5cGUuU0lOVDMyOmNhc2UgU2NhbGFyVHlwZS5VSU5UMzI6aWYobnVsbD09PXIpcmV0dXJuIDA7bGV0IGU7aWYoXCJudW1iZXJcIj09dHlwZW9mIHI/ZT1yOlwiXCI9PT1yP249XCJlbXB0eSBzdHJpbmdcIjpcInN0cmluZ1wiPT10eXBlb2YgciYmKHIudHJpbSgpLmxlbmd0aCE9PXIubGVuZ3RoP249XCJleHRyYSB3aGl0ZXNwYWNlXCI6ZT1OdW1iZXIocikpLHZvaWQgMD09PWUpYnJlYWs7cmV0dXJuKHQ9PVNjYWxhclR5cGUuVUlOVDMyP2Fzc2VydFVJbnQzMjphc3NlcnRJbnQzMikoZSksZTtjYXNlIFNjYWxhclR5cGUuSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDY0OmNhc2UgU2NhbGFyVHlwZS5TSU5UNjQ6aWYobnVsbD09PXIpcmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChQYkxvbmcuWkVSTyxhKTtpZihcIm51bWJlclwiIT10eXBlb2YgciYmXCJzdHJpbmdcIiE9dHlwZW9mIHIpYnJlYWs7cmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChQYkxvbmcuZnJvbShyKSxhKTtjYXNlIFNjYWxhclR5cGUuRklYRUQ2NDpjYXNlIFNjYWxhclR5cGUuVUlOVDY0OmlmKG51bGw9PT1yKXJldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoUGJVTG9uZy5aRVJPLGEpO2lmKFwibnVtYmVyXCIhPXR5cGVvZiByJiZcInN0cmluZ1wiIT10eXBlb2YgcilicmVhaztyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KFBiVUxvbmcuZnJvbShyKSxhKTtjYXNlIFNjYWxhclR5cGUuQk9PTDppZihudWxsPT09cilyZXR1cm4hMTtpZihcImJvb2xlYW5cIiE9dHlwZW9mIHIpYnJlYWs7cmV0dXJuIHI7Y2FzZSBTY2FsYXJUeXBlLlNUUklORzppZihudWxsPT09cilyZXR1cm5cIlwiO2lmKFwic3RyaW5nXCIhPXR5cGVvZiByKXtuPVwiZXh0cmEgd2hpdGVzcGFjZVwiO2JyZWFrfXRyeXtlbmNvZGVVUklDb21wb25lbnQocil9Y2F0Y2goZSl7MDticmVha31yZXR1cm4gcjtjYXNlIFNjYWxhclR5cGUuQllURVM6aWYobnVsbD09PXJ8fFwiXCI9PT1yKXJldHVybiBuZXcgVWludDhBcnJheSgwKTtpZihcInN0cmluZ1wiIT10eXBlb2YgcilicmVhaztyZXR1cm4gYmFzZTY0ZGVjb2RlKHIpfX1jYXRjaChlKXtuPWUubWVzc2FnZX10aGlzLmFzc2VydCghMSxlKyhuP1wiIC0gXCIrbjpcIlwiKSxyKX19Y2xhc3MgUmVmbGVjdGlvbkpzb25Xcml0ZXJ7Y29uc3RydWN0b3IoZSl7dGhpcy5maWVsZHM9ZS5maWVsZHM/P1tdfXdyaXRlKGUscil7dmFyIHQsYSxuPXt9LHM9ZTtmb3IoY29uc3QgaSBvZiB0aGlzLmZpZWxkcylpLm9uZW9mPyh0PXNbaS5vbmVvZl0pLm9uZW9mS2luZD09PWkubG9jYWxOYW1lJiYoYT1cInNjYWxhclwiPT1pLmtpbmR8fFwiZW51bVwiPT1pLmtpbmQ/ey4uLnIsZW1pdERlZmF1bHRWYWx1ZXM6ITB9OnIsYXNzZXJ0KHZvaWQgMCE9PSh0PXRoaXMuZmllbGQoaSx0W2kubG9jYWxOYW1lXSxhKSkpLG5bci51c2VQcm90b0ZpZWxkTmFtZT9pLm5hbWU6aS5qc29uTmFtZV09dCk6dm9pZCAwIT09KGE9dGhpcy5maWVsZChpLHNbaS5sb2NhbE5hbWVdLHIpKSYmKG5bci51c2VQcm90b0ZpZWxkTmFtZT9pLm5hbWU6aS5qc29uTmFtZV09YSk7cmV0dXJuIG59ZmllbGQocix0LGEpe2xldCBlPXZvaWQgMDtpZihcIm1hcFwiPT1yLmtpbmQpe2Fzc2VydChcIm9iamVjdFwiPT10eXBlb2YgdCYmbnVsbCE9PXQpO3ZhciBuPXt9O3N3aXRjaChyLlYua2luZCl7Y2FzZVwic2NhbGFyXCI6Zm9yKHZhcltzLGldb2YgT2JqZWN0LmVudHJpZXModCkpe2k9dGhpcy5zY2FsYXIoci5WLlQsaSxyLm5hbWUsITEsITApO2Fzc2VydCh2b2lkIDAhPT1pKSxuW3MudG9TdHJpbmcoKV09aX1icmVhaztjYXNlXCJtZXNzYWdlXCI6dmFyIG8sbCxjPXIuVi5UKCk7Zm9yKFtvLGxdb2YgT2JqZWN0LmVudHJpZXModCkpe3ZhciBmPXRoaXMubWVzc2FnZShjLGwsci5uYW1lLGEpO2Fzc2VydCh2b2lkIDAhPT1mKSxuW28udG9TdHJpbmcoKV09Zn1icmVhaztjYXNlXCJlbnVtXCI6dmFyIHUsaCxwPXIuVi5UKCk7Zm9yKFt1LGhdb2YgT2JqZWN0LmVudHJpZXModCkpe2Fzc2VydCh2b2lkIDA9PT1ofHxcIm51bWJlclwiPT10eXBlb2YgaCk7dmFyIFQ9dGhpcy5lbnVtKHAsaCxyLm5hbWUsITEsITAsYS5lbnVtQXNJbnRlZ2VyKTthc3NlcnQodm9pZCAwIT09VCksblt1LnRvU3RyaW5nKCldPVR9fShhLmVtaXREZWZhdWx0VmFsdWVzfHwwPE9iamVjdC5rZXlzKG4pLmxlbmd0aCkmJihlPW4pfWVsc2UgaWYoci5yZXBlYXQpe2Fzc2VydChBcnJheS5pc0FycmF5KHQpKTt2YXIgZD1bXTtzd2l0Y2goci5raW5kKXtjYXNlXCJzY2FsYXJcIjpmb3IobGV0IGU9MDtlPHQubGVuZ3RoO2UrKyl7dmFyIHk9dGhpcy5zY2FsYXIoci5ULHRbZV0sci5uYW1lLHIub3B0LCEwKTthc3NlcnQodm9pZCAwIT09eSksZC5wdXNoKHkpfWJyZWFrO2Nhc2VcImVudW1cIjp2YXIgZz1yLlQoKTtmb3IobGV0IGU9MDtlPHQubGVuZ3RoO2UrKyl7YXNzZXJ0KHZvaWQgMD09PXRbZV18fFwibnVtYmVyXCI9PXR5cGVvZiB0W2VdKTt2YXIgYj10aGlzLmVudW0oZyx0W2VdLHIubmFtZSxyLm9wdCwhMCxhLmVudW1Bc0ludGVnZXIpO2Fzc2VydCh2b2lkIDAhPT1iKSxkLnB1c2goYil9YnJlYWs7Y2FzZVwibWVzc2FnZVwiOnZhciBtPXIuVCgpO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKXt2YXIgST10aGlzLm1lc3NhZ2UobSx0W2VdLHIubmFtZSxhKTthc3NlcnQodm9pZCAwIT09SSksZC5wdXNoKEkpfX0oYS5lbWl0RGVmYXVsdFZhbHVlc3x8MDxkLmxlbmd0aHx8YS5lbWl0RGVmYXVsdFZhbHVlcykmJihlPWQpfWVsc2Ugc3dpdGNoKHIua2luZCl7Y2FzZVwic2NhbGFyXCI6ZT10aGlzLnNjYWxhcihyLlQsdCxyLm5hbWUsci5vcHQsYS5lbWl0RGVmYXVsdFZhbHVlcyk7YnJlYWs7Y2FzZVwiZW51bVwiOmU9dGhpcy5lbnVtKHIuVCgpLHQsci5uYW1lLHIub3B0LGEuZW1pdERlZmF1bHRWYWx1ZXMsYS5lbnVtQXNJbnRlZ2VyKTticmVhaztjYXNlXCJtZXNzYWdlXCI6ZT10aGlzLm1lc3NhZ2Uoci5UKCksdCxyLm5hbWUsYSl9cmV0dXJuIGV9ZW51bShlLHIsdCxhLG4scyl7aWYoXCJnb29nbGUucHJvdG9idWYuTnVsbFZhbHVlXCI9PWVbMF0pcmV0dXJuIG51bGw7aWYodm9pZCAwPT09cilhc3NlcnQoYSk7ZWxzZSBpZigwIT09cnx8bnx8YSlyZXR1cm4gYXNzZXJ0KFwibnVtYmVyXCI9PXR5cGVvZiByKSxhc3NlcnQoTnVtYmVyLmlzSW50ZWdlcihyKSksc3x8IWVbMV0uaGFzT3duUHJvcGVydHkocik/cjplWzJdP2VbMl0rZVsxXVtyXTplWzFdW3JdfW1lc3NhZ2UoZSxyLHQsYSl7cmV0dXJuIHZvaWQgMD09PXI/YS5lbWl0RGVmYXVsdFZhbHVlcz9udWxsOnZvaWQgMDplLmludGVybmFsSnNvbldyaXRlKHIsYSl9c2NhbGFyKGUscix0LGEsbil7aWYodm9pZCAwPT09cilhc3NlcnQoYSk7ZWxzZXt2YXIgcz1ufHxhO3N3aXRjaChlKXtjYXNlIFNjYWxhclR5cGUuSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDMyOmNhc2UgU2NhbGFyVHlwZS5TSU5UMzI6cmV0dXJuIDA9PT1yP3M/MDp2b2lkIDA6KGFzc2VydEludDMyKHIpLHIpO2Nhc2UgU2NhbGFyVHlwZS5GSVhFRDMyOmNhc2UgU2NhbGFyVHlwZS5VSU5UMzI6cmV0dXJuIDA9PT1yP3M/MDp2b2lkIDA6KGFzc2VydFVJbnQzMihyKSxyKTtjYXNlIFNjYWxhclR5cGUuRkxPQVQ6YXNzZXJ0RmxvYXQzMihyKTtjYXNlIFNjYWxhclR5cGUuRE9VQkxFOnJldHVybiAwPT09cj9zPzA6dm9pZCAwOihhc3NlcnQoXCJudW1iZXJcIj09dHlwZW9mIHIpLE51bWJlci5pc05hTihyKT9cIk5hTlwiOnI9PT1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk/XCJJbmZpbml0eVwiOnI9PT1OdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk/XCItSW5maW5pdHlcIjpyKTtjYXNlIFNjYWxhclR5cGUuU1RSSU5HOnJldHVyblwiXCI9PT1yP3M/XCJcIjp2b2lkIDA6KGFzc2VydChcInN0cmluZ1wiPT10eXBlb2Ygcikscik7Y2FzZSBTY2FsYXJUeXBlLkJPT0w6cmV0dXJuITE9PT1yPyFzJiZ2b2lkIDA6KGFzc2VydChcImJvb2xlYW5cIj09dHlwZW9mIHIpLHIpO2Nhc2UgU2NhbGFyVHlwZS5VSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLkZJWEVENjQ6YXNzZXJ0KFwibnVtYmVyXCI9PXR5cGVvZiByfHxcInN0cmluZ1wiPT10eXBlb2Ygcnx8XCJiaWdpbnRcIj09dHlwZW9mIHIpO3ZhciBpPVBiVUxvbmcuZnJvbShyKTtyZXR1cm4gaS5pc1plcm8oKSYmIXM/dm9pZCAwOmkudG9TdHJpbmcoKTtjYXNlIFNjYWxhclR5cGUuSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDY0OmNhc2UgU2NhbGFyVHlwZS5TSU5UNjQ6YXNzZXJ0KFwibnVtYmVyXCI9PXR5cGVvZiByfHxcInN0cmluZ1wiPT10eXBlb2Ygcnx8XCJiaWdpbnRcIj09dHlwZW9mIHIpO2k9UGJMb25nLmZyb20ocik7cmV0dXJuIGkuaXNaZXJvKCkmJiFzP3ZvaWQgMDppLnRvU3RyaW5nKCk7Y2FzZSBTY2FsYXJUeXBlLkJZVEVTOnJldHVybihhc3NlcnQociBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpLHIuYnl0ZUxlbmd0aCk/YmFzZTY0ZW5jb2RlKHIpOnM/XCJcIjp2b2lkIDB9fX19ZnVuY3Rpb24gcmVmbGVjdGlvblNjYWxhckRlZmF1bHQoZSxyPUxvbmdUeXBlLlNUUklORyl7c3dpdGNoKGUpe2Nhc2UgU2NhbGFyVHlwZS5CT09MOnJldHVybiExO2Nhc2UgU2NhbGFyVHlwZS5VSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLkZJWEVENjQ6cmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChQYlVMb25nLlpFUk8scik7Y2FzZSBTY2FsYXJUeXBlLklOVDY0OmNhc2UgU2NhbGFyVHlwZS5TRklYRUQ2NDpjYXNlIFNjYWxhclR5cGUuU0lOVDY0OnJldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoUGJMb25nLlpFUk8scik7Y2FzZSBTY2FsYXJUeXBlLkRPVUJMRTpjYXNlIFNjYWxhclR5cGUuRkxPQVQ6cmV0dXJuIDA7Y2FzZSBTY2FsYXJUeXBlLkJZVEVTOnJldHVybiBuZXcgVWludDhBcnJheSgwKTtjYXNlIFNjYWxhclR5cGUuU1RSSU5HOnJldHVyblwiXCI7ZGVmYXVsdDpyZXR1cm4gMH19Y2xhc3MgUmVmbGVjdGlvbkJpbmFyeVJlYWRlcntjb25zdHJ1Y3RvcihlKXt0aGlzLmluZm89ZX1wcmVwYXJlKCl7dmFyIGU7dGhpcy5maWVsZE5vVG9GaWVsZHx8KGU9dGhpcy5pbmZvLmZpZWxkcz8/W10sdGhpcy5maWVsZE5vVG9GaWVsZD1uZXcgTWFwKGUubWFwKGU9PltlLm5vLGVdKSkpfXJlYWQoYSxuLHMsZSl7dGhpcy5wcmVwYXJlKCk7Zm9yKHZhciByPXZvaWQgMD09PWU/YS5sZW46YS5wb3MrZTthLnBvczxyOyl7dmFyW3QsaV09YS50YWcoKSxvPXRoaXMuZmllbGROb1RvRmllbGQuZ2V0KHQpO2lmKG8pe2xldCBlPW4scj1vLnJlcGVhdCx0PW8ubG9jYWxOYW1lO3N3aXRjaChvLm9uZW9mJiYoZT1lW28ub25lb2ZdKS5vbmVvZktpbmQhPT10JiYoZT1uW28ub25lb2ZdPXtvbmVvZktpbmQ6dH0pLG8ua2luZCl7Y2FzZVwic2NhbGFyXCI6Y2FzZVwiZW51bVwiOnZhciBsPVwiZW51bVwiPT1vLmtpbmQ/U2NhbGFyVHlwZS5JTlQzMjpvLlQsYz1cInNjYWxhclwiPT1vLmtpbmQ/by5MOnZvaWQgMDtpZihyKXt2YXIgZj1lW3RdO2lmKGk9PVdpcmVUeXBlLkxlbmd0aERlbGltaXRlZCYmbCE9U2NhbGFyVHlwZS5TVFJJTkcmJmwhPVNjYWxhclR5cGUuQllURVMpZm9yKHZhciB1PWEudWludDMyKCkrYS5wb3M7YS5wb3M8dTspZi5wdXNoKHRoaXMuc2NhbGFyKGEsbCxjKSk7ZWxzZSBmLnB1c2godGhpcy5zY2FsYXIoYSxsLGMpKX1lbHNlIGVbdF09dGhpcy5zY2FsYXIoYSxsLGMpO2JyZWFrO2Nhc2VcIm1lc3NhZ2VcIjpyPyhoPWVbdF0scD1vLlQoKS5pbnRlcm5hbEJpbmFyeVJlYWQoYSxhLnVpbnQzMigpLHMpLGgucHVzaChwKSk6ZVt0XT1vLlQoKS5pbnRlcm5hbEJpbmFyeVJlYWQoYSxhLnVpbnQzMigpLHMsZVt0XSk7YnJlYWs7Y2FzZVwibWFwXCI6dmFyW2gscF09dGhpcy5tYXBFbnRyeShvLGEscyk7ZVt0XVtoXT1wfX1lbHNle3ZhciBUPXMucmVhZFVua25vd25GaWVsZDtpZihcInRocm93XCI9PVQpdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZpZWxkICR7dH0gKHdpcmUgdHlwZSAke2l9KSBmb3IgYCt0aGlzLmluZm8udHlwZU5hbWUpO3ZhciBkPWEuc2tpcChpKTshMSE9PVQmJighMD09PVQ/VW5rbm93bkZpZWxkSGFuZGxlci5vblJlYWQ6VCkodGhpcy5pbmZvLnR5cGVOYW1lLG4sdCxpLGQpfX19bWFwRW50cnkoZSxyLHQpe3ZhciBhPXIudWludDMyKCksbj1yLnBvcythO2xldCBzPXZvaWQgMCxpPXZvaWQgMDtmb3IoO3IucG9zPG47KXt2YXJbbyxsXT1yLnRhZygpO3N3aXRjaChvKXtjYXNlIDE6cz1lLks9PVNjYWxhclR5cGUuQk9PTD9yLmJvb2woKS50b1N0cmluZygpOnRoaXMuc2NhbGFyKHIsZS5LLExvbmdUeXBlLlNUUklORyk7YnJlYWs7Y2FzZSAyOnN3aXRjaChlLlYua2luZCl7Y2FzZVwic2NhbGFyXCI6aT10aGlzLnNjYWxhcihyLGUuVi5ULGUuVi5MKTticmVhaztjYXNlXCJlbnVtXCI6aT1yLmludDMyKCk7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmk9ZS5WLlQoKS5pbnRlcm5hbEJpbmFyeVJlYWQocixyLnVpbnQzMigpLHQpfWJyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZpZWxkICR7b30gKHdpcmUgdHlwZSAke2x9KSBpbiBtYXAgZW50cnkgZm9yICR7dGhpcy5pbmZvLnR5cGVOYW1lfSNgK2UubmFtZSl9fWlmKHZvaWQgMD09PXMmJihhPXJlZmxlY3Rpb25TY2FsYXJEZWZhdWx0KGUuSykscz1lLks9PVNjYWxhclR5cGUuQk9PTD9hLnRvU3RyaW5nKCk6YSksdm9pZCAwPT09aSlzd2l0Y2goZS5WLmtpbmQpe2Nhc2VcInNjYWxhclwiOmk9cmVmbGVjdGlvblNjYWxhckRlZmF1bHQoZS5WLlQsZS5WLkwpO2JyZWFrO2Nhc2VcImVudW1cIjppPTA7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmk9ZS5WLlQoKS5jcmVhdGUoKX1yZXR1cm5bcyxpXX1zY2FsYXIoZSxyLHQpe3N3aXRjaChyKXtjYXNlIFNjYWxhclR5cGUuSU5UMzI6cmV0dXJuIGUuaW50MzIoKTtjYXNlIFNjYWxhclR5cGUuU1RSSU5HOnJldHVybiBlLnN0cmluZygpO2Nhc2UgU2NhbGFyVHlwZS5CT09MOnJldHVybiBlLmJvb2woKTtjYXNlIFNjYWxhclR5cGUuRE9VQkxFOnJldHVybiBlLmRvdWJsZSgpO2Nhc2UgU2NhbGFyVHlwZS5GTE9BVDpyZXR1cm4gZS5mbG9hdCgpO2Nhc2UgU2NhbGFyVHlwZS5JTlQ2NDpyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KGUuaW50NjQoKSx0KTtjYXNlIFNjYWxhclR5cGUuVUlOVDY0OnJldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoZS51aW50NjQoKSx0KTtjYXNlIFNjYWxhclR5cGUuRklYRUQ2NDpyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KGUuZml4ZWQ2NCgpLHQpO2Nhc2UgU2NhbGFyVHlwZS5GSVhFRDMyOnJldHVybiBlLmZpeGVkMzIoKTtjYXNlIFNjYWxhclR5cGUuQllURVM6cmV0dXJuIGUuYnl0ZXMoKTtjYXNlIFNjYWxhclR5cGUuVUlOVDMyOnJldHVybiBlLnVpbnQzMigpO2Nhc2UgU2NhbGFyVHlwZS5TRklYRUQzMjpyZXR1cm4gZS5zZml4ZWQzMigpO2Nhc2UgU2NhbGFyVHlwZS5TRklYRUQ2NDpyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KGUuc2ZpeGVkNjQoKSx0KTtjYXNlIFNjYWxhclR5cGUuU0lOVDMyOnJldHVybiBlLnNpbnQzMigpO2Nhc2UgU2NhbGFyVHlwZS5TSU5UNjQ6cmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChlLnNpbnQ2NCgpLHQpfX19Y2xhc3MgUmVmbGVjdGlvbkJpbmFyeVdyaXRlcntjb25zdHJ1Y3RvcihlKXt0aGlzLmluZm89ZX1wcmVwYXJlKCl7dmFyIGU7dGhpcy5maWVsZHN8fChlPXRoaXMuaW5mby5maWVsZHM/dGhpcy5pbmZvLmZpZWxkcy5jb25jYXQoKTpbXSx0aGlzLmZpZWxkcz1lLnNvcnQoKGUscik9PmUubm8tci5ubykpfXdyaXRlKG4scyxpKXt0aGlzLnByZXBhcmUoKTtmb3IoY29uc3QgdSBvZiB0aGlzLmZpZWxkcyl7bGV0IGUscix0PXUucmVwZWF0LGE9dS5sb2NhbE5hbWU7aWYodS5vbmVvZil7dmFyIG89blt1Lm9uZW9mXTtpZihvLm9uZW9mS2luZCE9PWEpY29udGludWU7ZT1vW2FdLHI9ITB9ZWxzZSBlPW5bYV0scj0hMTtzd2l0Y2godS5raW5kKXtjYXNlXCJzY2FsYXJcIjpjYXNlXCJlbnVtXCI6dmFyIGw9XCJlbnVtXCI9PXUua2luZD9TY2FsYXJUeXBlLklOVDMyOnUuVDtpZih0KWlmKGFzc2VydChBcnJheS5pc0FycmF5KGUpKSx0PT1SZXBlYXRUeXBlLlBBQ0tFRCl0aGlzLnBhY2tlZChzLGwsdS5ubyxlKTtlbHNlIGZvcihjb25zdCBoIG9mIGUpdGhpcy5zY2FsYXIocyxsLHUubm8saCwhMCk7ZWxzZSB2b2lkIDA9PT1lP2Fzc2VydCh1Lm9wdCk6dGhpcy5zY2FsYXIocyxsLHUubm8sZSxyfHx1Lm9wdCk7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmlmKHQpe2Fzc2VydChBcnJheS5pc0FycmF5KGUpKTtmb3IoY29uc3QgcCBvZiBlKXRoaXMubWVzc2FnZShzLGksdS5UKCksdS5ubyxwKX1lbHNlIHRoaXMubWVzc2FnZShzLGksdS5UKCksdS5ubyxlKTticmVhaztjYXNlXCJtYXBcIjphc3NlcnQoXCJvYmplY3RcIj09dHlwZW9mIGUmJm51bGwhPT1lKTtmb3IodmFyW2MsZl1vZiBPYmplY3QuZW50cmllcyhlKSl0aGlzLm1hcEVudHJ5KHMsaSx1LGMsZil9fXZhciBlPWkud3JpdGVVbmtub3duRmllbGRzOyExIT09ZSYmKCEwPT09ZT9Vbmtub3duRmllbGRIYW5kbGVyLm9uV3JpdGU6ZSkodGhpcy5pbmZvLnR5cGVOYW1lLG4scyl9bWFwRW50cnkoZSxyLHQsYSxuKXtlLnRhZyh0Lm5vLFdpcmVUeXBlLkxlbmd0aERlbGltaXRlZCksZS5mb3JrKCk7bGV0IHM9YTtzd2l0Y2godC5LKXtjYXNlIFNjYWxhclR5cGUuSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLkZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlVJTlQzMjpjYXNlIFNjYWxhclR5cGUuU0ZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlNJTlQzMjpzPU51bWJlci5wYXJzZUludChhKTticmVhaztjYXNlIFNjYWxhclR5cGUuQk9PTDphc3NlcnQoXCJ0cnVlXCI9PWF8fFwiZmFsc2VcIj09YSkscz1cInRydWVcIj09YX1zd2l0Y2godGhpcy5zY2FsYXIoZSx0LkssMSxzLCEwKSx0LlYua2luZCl7Y2FzZVwic2NhbGFyXCI6dGhpcy5zY2FsYXIoZSx0LlYuVCwyLG4sITApO2JyZWFrO2Nhc2VcImVudW1cIjp0aGlzLnNjYWxhcihlLFNjYWxhclR5cGUuSU5UMzIsMixuLCEwKTticmVhaztjYXNlXCJtZXNzYWdlXCI6dGhpcy5tZXNzYWdlKGUscix0LlYuVCgpLDIsbil9ZS5qb2luKCl9bWVzc2FnZShlLHIsdCxhLG4pe3ZvaWQgMCE9PW4mJih0LmludGVybmFsQmluYXJ5V3JpdGUobixlLnRhZyhhLFdpcmVUeXBlLkxlbmd0aERlbGltaXRlZCkuZm9yaygpLHIpLGUuam9pbigpKX1zY2FsYXIoZSxyLHQsYSxuKXt2YXJbcixzLGldPXRoaXMuc2NhbGFySW5mbyhyLGEpO2kmJiFufHwoZS50YWcodCxyKSxlW3NdKGEpKX1wYWNrZWQocixlLHQsYSl7aWYoYS5sZW5ndGgpe2Fzc2VydChlIT09U2NhbGFyVHlwZS5CWVRFUyYmZSE9PVNjYWxhclR5cGUuU1RSSU5HKSxyLnRhZyh0LFdpcmVUeXBlLkxlbmd0aERlbGltaXRlZCksci5mb3JrKCk7dmFyWyxuXT10aGlzLnNjYWxhckluZm8oZSk7Zm9yKGxldCBlPTA7ZTxhLmxlbmd0aDtlKyspcltuXShhW2VdKTtyLmpvaW4oKX19c2NhbGFySW5mbyhlLHIpe2xldCB0PVdpcmVUeXBlLlZhcmludCxhO3ZhciBuPXZvaWQgMD09PXI7bGV0IHM9MD09PXI7c3dpdGNoKGUpe2Nhc2UgU2NhbGFyVHlwZS5JTlQzMjphPVwiaW50MzJcIjticmVhaztjYXNlIFNjYWxhclR5cGUuU1RSSU5HOnM9bnx8IXIubGVuZ3RoLHQ9V2lyZVR5cGUuTGVuZ3RoRGVsaW1pdGVkLGE9XCJzdHJpbmdcIjticmVhaztjYXNlIFNjYWxhclR5cGUuQk9PTDpzPSExPT09cixhPVwiYm9vbFwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5VSU5UMzI6YT1cInVpbnQzMlwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5ET1VCTEU6dD1XaXJlVHlwZS5CaXQ2NCxhPVwiZG91YmxlXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLkZMT0FUOnQ9V2lyZVR5cGUuQml0MzIsYT1cImZsb2F0XCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLklOVDY0OnM9bnx8UGJMb25nLmZyb20ocikuaXNaZXJvKCksYT1cImludDY0XCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLlVJTlQ2NDpzPW58fFBiVUxvbmcuZnJvbShyKS5pc1plcm8oKSxhPVwidWludDY0XCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLkZJWEVENjQ6cz1ufHxQYlVMb25nLmZyb20ocikuaXNaZXJvKCksdD1XaXJlVHlwZS5CaXQ2NCxhPVwiZml4ZWQ2NFwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5CWVRFUzpzPW58fCFyLmJ5dGVMZW5ndGgsdD1XaXJlVHlwZS5MZW5ndGhEZWxpbWl0ZWQsYT1cImJ5dGVzXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLkZJWEVEMzI6dD1XaXJlVHlwZS5CaXQzMixhPVwiZml4ZWQzMlwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5TRklYRUQzMjp0PVdpcmVUeXBlLkJpdDMyLGE9XCJzZml4ZWQzMlwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5TRklYRUQ2NDpzPW58fFBiTG9uZy5mcm9tKHIpLmlzWmVybygpLHQ9V2lyZVR5cGUuQml0NjQsYT1cInNmaXhlZDY0XCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLlNJTlQzMjphPVwic2ludDMyXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLlNJTlQ2NDpzPW58fFBiTG9uZy5mcm9tKHIpLmlzWmVybygpLGE9XCJzaW50NjRcIn1yZXR1cm5bdCxhLG58fHNdfX1mdW5jdGlvbiByZWZsZWN0aW9uQ3JlYXRlKGUpe3ZhciByLHQ9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsTUVTU0FHRV9UWVBFLHtlbnVtZXJhYmxlOiExLHZhbHVlOmV9KTtmb3IociBvZiBlLmZpZWxkcyl7dmFyIGE9ci5sb2NhbE5hbWU7aWYoIXIub3B0KWlmKHIub25lb2YpdFtyLm9uZW9mXT17b25lb2ZLaW5kOnZvaWQgMH07ZWxzZSBpZihyLnJlcGVhdCl0W2FdPVtdO2Vsc2Ugc3dpdGNoKHIua2luZCl7Y2FzZVwic2NhbGFyXCI6dFthXT1yZWZsZWN0aW9uU2NhbGFyRGVmYXVsdChyLlQsci5MKTticmVhaztjYXNlXCJlbnVtXCI6dFthXT0wO2JyZWFrO2Nhc2VcIm1hcFwiOnRbYV09e319fXJldHVybiB0fWZ1bmN0aW9uIHJlZmxlY3Rpb25NZXJnZVBhcnRpYWwoZSxyLHQpe2xldCBhLG49dCxzO2Zvcih2YXIgaSBvZiBlLmZpZWxkcyl7dmFyIG89aS5sb2NhbE5hbWU7aWYoaS5vbmVvZil7dmFyIGw9bltpLm9uZW9mXTtpZihudWxsPT0obnVsbD09bD92b2lkIDA6bC5vbmVvZktpbmQpKWNvbnRpbnVlO2lmKGE9bFtvXSwocz1yW2kub25lb2ZdKS5vbmVvZktpbmQ9bC5vbmVvZktpbmQsbnVsbD09YSl7ZGVsZXRlIHNbb107Y29udGludWV9fWVsc2UgaWYoYT1uW29dLHM9cixudWxsPT1hKWNvbnRpbnVlO3N3aXRjaChpLnJlcGVhdCYmKHNbb10ubGVuZ3RoPWEubGVuZ3RoKSxpLmtpbmQpe2Nhc2VcInNjYWxhclwiOmNhc2VcImVudW1cIjppZihpLnJlcGVhdClmb3IobGV0IGU9MDtlPGEubGVuZ3RoO2UrKylzW29dW2VdPWFbZV07ZWxzZSBzW29dPWE7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOnZhciBjPWkuVCgpO2lmKGkucmVwZWF0KWZvcihsZXQgZT0wO2U8YS5sZW5ndGg7ZSsrKXNbb11bZV09Yy5jcmVhdGUoYVtlXSk7ZWxzZSB2b2lkIDA9PT1zW29dP3Nbb109Yy5jcmVhdGUoYSk6Yy5tZXJnZVBhcnRpYWwoc1tvXSxhKTticmVhaztjYXNlXCJtYXBcIjpzd2l0Y2goaS5WLmtpbmQpe2Nhc2VcInNjYWxhclwiOmNhc2VcImVudW1cIjpPYmplY3QuYXNzaWduKHNbb10sYSk7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOnZhciBmLHU9aS5WLlQoKTtmb3IoZiBvZiBPYmplY3Qua2V5cyhhKSlzW29dW2ZdPXUuY3JlYXRlKGFbZl0pfX19fWNvbnN0IGRlZmF1bHRzV3JpdGUkMT17ZW1pdERlZmF1bHRWYWx1ZXM6ITEsZW51bUFzSW50ZWdlcjohMSx1c2VQcm90b0ZpZWxkTmFtZTohMSxwcmV0dHlTcGFjZXM6MH0sZGVmYXVsdHNSZWFkJDE9e2lnbm9yZVVua25vd25GaWVsZHM6ITF9O2Z1bmN0aW9uIGpzb25SZWFkT3B0aW9ucyhlKXtyZXR1cm4gZT97Li4uZGVmYXVsdHNSZWFkJDEsLi4uZX06ZGVmYXVsdHNSZWFkJDF9ZnVuY3Rpb24ganNvbldyaXRlT3B0aW9ucyhlKXtyZXR1cm4gZT97Li4uZGVmYXVsdHNXcml0ZSQxLC4uLmV9OmRlZmF1bHRzV3JpdGUkMX1mdW5jdGlvbiByZWZsZWN0aW9uRXF1YWxzKGUscix0KXtpZihyIT09dCl7aWYoIXJ8fCF0KXJldHVybiExO2Zvcih2YXIgYSBvZiBlLmZpZWxkcyl7dmFyIG49YS5sb2NhbE5hbWUscz0oYS5vbmVvZj9yW2Eub25lb2ZdOnIpW25dLGk9KGEub25lb2Y/dFthLm9uZW9mXTp0KVtuXTtzd2l0Y2goYS5raW5kKXtjYXNlXCJlbnVtXCI6Y2FzZVwic2NhbGFyXCI6dmFyIG89XCJlbnVtXCI9PWEua2luZD9TY2FsYXJUeXBlLklOVDMyOmEuVDtpZigoYS5yZXBlYXQ/cmVwZWF0ZWRQcmltaXRpdmVFcTpwcmltaXRpdmVFcSkobyxzLGkpKWJyZWFrO3JldHVybiExO2Nhc2VcIm1hcFwiOmlmKFwibWVzc2FnZVwiPT1hLlYua2luZD9yZXBlYXRlZE1zZ0VxKGEuVi5UKCksb2JqZWN0VmFsdWVzKHMpLG9iamVjdFZhbHVlcyhpKSk6cmVwZWF0ZWRQcmltaXRpdmVFcShcImVudW1cIj09YS5WLmtpbmQ/U2NhbGFyVHlwZS5JTlQzMjphLlYuVCxvYmplY3RWYWx1ZXMocyksb2JqZWN0VmFsdWVzKGkpKSlicmVhaztyZXR1cm4hMTtjYXNlXCJtZXNzYWdlXCI6bz1hLlQoKTtpZihhLnJlcGVhdD9yZXBlYXRlZE1zZ0VxKG8scyxpKTpvLmVxdWFscyhzLGkpKWJyZWFrO3JldHVybiExfX19cmV0dXJuITB9Y29uc3Qgb2JqZWN0VmFsdWVzPU9iamVjdC52YWx1ZXM7ZnVuY3Rpb24gcHJpbWl0aXZlRXEoZSxyLHQpe2lmKHIhPT10KXtpZihlIT09U2NhbGFyVHlwZS5CWVRFUylyZXR1cm4hMTt2YXIgYT1yLG49dDtpZihhLmxlbmd0aCE9PW4ubGVuZ3RoKXJldHVybiExO2ZvcihsZXQgZT0wO2U8YS5sZW5ndGg7ZSsrKWlmKGFbZV0hPW5bZV0pcmV0dXJuITF9cmV0dXJuITB9ZnVuY3Rpb24gcmVwZWF0ZWRQcmltaXRpdmVFcShyLHQsYSl7aWYodC5sZW5ndGghPT1hLmxlbmd0aClyZXR1cm4hMTtmb3IobGV0IGU9MDtlPHQubGVuZ3RoO2UrKylpZighcHJpbWl0aXZlRXEocix0W2VdLGFbZV0pKXJldHVybiExO3JldHVybiEwfWZ1bmN0aW9uIHJlcGVhdGVkTXNnRXEocix0LGEpe2lmKHQubGVuZ3RoIT09YS5sZW5ndGgpcmV0dXJuITE7Zm9yKGxldCBlPTA7ZTx0Lmxlbmd0aDtlKyspaWYoIXIuZXF1YWxzKHRbZV0sYVtlXSkpcmV0dXJuITE7cmV0dXJuITB9Y29uc3QgZGVmYXVsdHNXcml0ZT17d3JpdGVVbmtub3duRmllbGRzOiEwLHdyaXRlckZhY3Rvcnk6KCk9Pm5ldyBCaW5hcnlXcml0ZXJ9O2Z1bmN0aW9uIGJpbmFyeVdyaXRlT3B0aW9ucyhlKXtyZXR1cm4gZT97Li4uZGVmYXVsdHNXcml0ZSwuLi5lfTpkZWZhdWx0c1dyaXRlfWNsYXNzIEJpbmFyeVdyaXRlcntjb25zdHJ1Y3RvcihlKXt0aGlzLnN0YWNrPVtdLHRoaXMudGV4dEVuY29kZXI9ZT8/bmV3IFRleHRFbmNvZGVyLHRoaXMuY2h1bmtzPVtdLHRoaXMuYnVmPVtdfWZpbmlzaCgpe3RoaXMuY2h1bmtzLnB1c2gobmV3IFVpbnQ4QXJyYXkodGhpcy5idWYpKTtsZXQgcj0wO2ZvcihsZXQgZT0wO2U8dGhpcy5jaHVua3MubGVuZ3RoO2UrKylyKz10aGlzLmNodW5rc1tlXS5sZW5ndGg7dmFyIHQ9bmV3IFVpbnQ4QXJyYXkocik7bGV0IGE9MDtmb3IobGV0IGU9MDtlPHRoaXMuY2h1bmtzLmxlbmd0aDtlKyspdC5zZXQodGhpcy5jaHVua3NbZV0sYSksYSs9dGhpcy5jaHVua3NbZV0ubGVuZ3RoO3JldHVybiB0aGlzLmNodW5rcz1bXSx0fWZvcmsoKXtyZXR1cm4gdGhpcy5zdGFjay5wdXNoKHtjaHVua3M6dGhpcy5jaHVua3MsYnVmOnRoaXMuYnVmfSksdGhpcy5jaHVua3M9W10sdGhpcy5idWY9W10sdGhpc31qb2luKCl7dmFyIGU9dGhpcy5maW5pc2goKSxyPXRoaXMuc3RhY2sucG9wKCk7aWYocilyZXR1cm4gdGhpcy5jaHVua3M9ci5jaHVua3MsdGhpcy5idWY9ci5idWYsdGhpcy51aW50MzIoZS5ieXRlTGVuZ3RoKSx0aGlzLnJhdyhlKTt0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHN0YXRlLCBmb3JrIHN0YWNrIGVtcHR5XCIpfXRhZyhlLHIpe3JldHVybiB0aGlzLnVpbnQzMigoZTw8M3xyKT4+PjApfXJhdyhlKXtyZXR1cm4gdGhpcy5idWYubGVuZ3RoJiYodGhpcy5jaHVua3MucHVzaChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZikpLHRoaXMuYnVmPVtdKSx0aGlzLmNodW5rcy5wdXNoKGUpLHRoaXN9dWludDMyKGUpe2Zvcihhc3NlcnRVSW50MzIoZSk7MTI3PGU7KXRoaXMuYnVmLnB1c2goMTI3JmV8MTI4KSxlPj4+PTc7cmV0dXJuIHRoaXMuYnVmLnB1c2goZSksdGhpc31pbnQzMihlKXtyZXR1cm4gYXNzZXJ0SW50MzIoZSksdmFyaW50MzJ3cml0ZShlLHRoaXMuYnVmKSx0aGlzfWJvb2woZSl7cmV0dXJuIHRoaXMuYnVmLnB1c2goZT8xOjApLHRoaXN9Ynl0ZXMoZSl7cmV0dXJuIHRoaXMudWludDMyKGUuYnl0ZUxlbmd0aCksdGhpcy5yYXcoZSl9c3RyaW5nKGUpe2U9dGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUoZSk7cmV0dXJuIHRoaXMudWludDMyKGUuYnl0ZUxlbmd0aCksdGhpcy5yYXcoZSl9ZmxvYXQoZSl7YXNzZXJ0RmxvYXQzMihlKTt2YXIgcj1uZXcgVWludDhBcnJheSg0KTtyZXR1cm4gbmV3IERhdGFWaWV3KHIuYnVmZmVyKS5zZXRGbG9hdDMyKDAsZSwhMCksdGhpcy5yYXcocil9ZG91YmxlKGUpe3ZhciByPW5ldyBVaW50OEFycmF5KDgpO3JldHVybiBuZXcgRGF0YVZpZXcoci5idWZmZXIpLnNldEZsb2F0NjQoMCxlLCEwKSx0aGlzLnJhdyhyKX1maXhlZDMyKGUpe2Fzc2VydFVJbnQzMihlKTt2YXIgcj1uZXcgVWludDhBcnJheSg0KTtyZXR1cm4gbmV3IERhdGFWaWV3KHIuYnVmZmVyKS5zZXRVaW50MzIoMCxlLCEwKSx0aGlzLnJhdyhyKX1zZml4ZWQzMihlKXthc3NlcnRJbnQzMihlKTt2YXIgcj1uZXcgVWludDhBcnJheSg0KTtyZXR1cm4gbmV3IERhdGFWaWV3KHIuYnVmZmVyKS5zZXRJbnQzMigwLGUsITApLHRoaXMucmF3KHIpfXNpbnQzMihlKXtyZXR1cm4gYXNzZXJ0SW50MzIoZSksdmFyaW50MzJ3cml0ZShlPShlPDwxXmU+PjMxKT4+PjAsdGhpcy5idWYpLHRoaXN9c2ZpeGVkNjQoZSl7dmFyIHI9bmV3IFVpbnQ4QXJyYXkoOCksdD1uZXcgRGF0YVZpZXcoci5idWZmZXIpLGU9UGJMb25nLmZyb20oZSk7cmV0dXJuIHQuc2V0SW50MzIoMCxlLmxvLCEwKSx0LnNldEludDMyKDQsZS5oaSwhMCksdGhpcy5yYXcocil9Zml4ZWQ2NChlKXt2YXIgcj1uZXcgVWludDhBcnJheSg4KSx0PW5ldyBEYXRhVmlldyhyLmJ1ZmZlciksZT1QYlVMb25nLmZyb20oZSk7cmV0dXJuIHQuc2V0SW50MzIoMCxlLmxvLCEwKSx0LnNldEludDMyKDQsZS5oaSwhMCksdGhpcy5yYXcocil9aW50NjQoZSl7ZT1QYkxvbmcuZnJvbShlKTtyZXR1cm4gdmFyaW50NjR3cml0ZShlLmxvLGUuaGksdGhpcy5idWYpLHRoaXN9c2ludDY0KGUpe3ZhciBlPVBiTG9uZy5mcm9tKGUpLHI9ZS5oaT4+MzE7cmV0dXJuIHZhcmludDY0d3JpdGUoZS5sbzw8MV5yLChlLmhpPDwxfGUubG8+Pj4zMSlecix0aGlzLmJ1ZiksdGhpc311aW50NjQoZSl7ZT1QYlVMb25nLmZyb20oZSk7cmV0dXJuIHZhcmludDY0d3JpdGUoZS5sbyxlLmhpLHRoaXMuYnVmKSx0aGlzfX1jb25zdCBkZWZhdWx0c1JlYWQ9e3JlYWRVbmtub3duRmllbGQ6ITAscmVhZGVyRmFjdG9yeTplPT5uZXcgQmluYXJ5UmVhZGVyKGUpfTtmdW5jdGlvbiBiaW5hcnlSZWFkT3B0aW9ucyhlKXtyZXR1cm4gZT97Li4uZGVmYXVsdHNSZWFkLC4uLmV9OmRlZmF1bHRzUmVhZH1jbGFzcyBCaW5hcnlSZWFkZXJ7Y29uc3RydWN0b3IoZSxyKXt0aGlzLnZhcmludDY0PXZhcmludDY0cmVhZCx0aGlzLnVpbnQzMj12YXJpbnQzMnJlYWQsdGhpcy5idWY9ZSx0aGlzLmxlbj1lLmxlbmd0aCx0aGlzLnBvcz0wLHRoaXMudmlldz1uZXcgRGF0YVZpZXcoZS5idWZmZXIsZS5ieXRlT2Zmc2V0LGUuYnl0ZUxlbmd0aCksdGhpcy50ZXh0RGVjb2Rlcj1yPz9uZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiLHtmYXRhbDohMCxpZ25vcmVCT006ITB9KX10YWcoKXt2YXIgZT10aGlzLnVpbnQzMigpLHI9ZT4+PjMsZT03JmU7aWYocjw9MHx8ZTwwfHw1PGUpdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCB0YWc6IGZpZWxkIG5vIFwiK3IrXCIgd2lyZSB0eXBlIFwiK2UpO3JldHVybltyLGVdfXNraXAoZSl7dmFyIHIsdD10aGlzLnBvcztzd2l0Y2goZSl7Y2FzZSBXaXJlVHlwZS5WYXJpbnQ6Zm9yKDsxMjgmdGhpcy5idWZbdGhpcy5wb3MrK107KTticmVhaztjYXNlIFdpcmVUeXBlLkJpdDY0OnRoaXMucG9zKz00O2Nhc2UgV2lyZVR5cGUuQml0MzI6dGhpcy5wb3MrPTQ7YnJlYWs7Y2FzZSBXaXJlVHlwZS5MZW5ndGhEZWxpbWl0ZWQ6dmFyIGE9dGhpcy51aW50MzIoKTt0aGlzLnBvcys9YTticmVhaztjYXNlIFdpcmVUeXBlLlN0YXJ0R3JvdXA6Zm9yKDsocj10aGlzLnRhZygpWzFdKSE9PVdpcmVUeXBlLkVuZEdyb3VwOyl0aGlzLnNraXAocik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJjYW50IHNraXAgd2lyZSB0eXBlIFwiK2UpfXJldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLHRoaXMuYnVmLnN1YmFycmF5KHQsdGhpcy5wb3MpfWFzc2VydEJvdW5kcygpe2lmKHRoaXMucG9zPnRoaXMubGVuKXRocm93IG5ldyBSYW5nZUVycm9yKFwicHJlbWF0dXJlIEVPRlwiKX1pbnQzMigpe3JldHVybiAwfHRoaXMudWludDMyKCl9c2ludDMyKCl7dmFyIGU9dGhpcy51aW50MzIoKTtyZXR1cm4gZT4+PjFeLSgxJmUpfWludDY0KCl7cmV0dXJuIG5ldyBQYkxvbmcoLi4udGhpcy52YXJpbnQ2NCgpKX11aW50NjQoKXtyZXR1cm4gbmV3IFBiVUxvbmcoLi4udGhpcy52YXJpbnQ2NCgpKX1zaW50NjQoKXt2YXJbZSxyXT10aGlzLnZhcmludDY0KCksdD0tKDEmZSksZT0oZT4+PjF8KDEmcik8PDMxKV50LHI9cj4+PjFedDtyZXR1cm4gbmV3IFBiTG9uZyhlLHIpfWJvb2woKXt2YXJbZSxyXT10aGlzLnZhcmludDY0KCk7cmV0dXJuIDAhPT1lfHwwIT09cn1maXhlZDMyKCl7cmV0dXJuIHRoaXMudmlldy5nZXRVaW50MzIoKHRoaXMucG9zKz00KS00LCEwKX1zZml4ZWQzMigpe3JldHVybiB0aGlzLnZpZXcuZ2V0SW50MzIoKHRoaXMucG9zKz00KS00LCEwKX1maXhlZDY0KCl7cmV0dXJuIG5ldyBQYlVMb25nKHRoaXMuc2ZpeGVkMzIoKSx0aGlzLnNmaXhlZDMyKCkpfXNmaXhlZDY0KCl7cmV0dXJuIG5ldyBQYkxvbmcodGhpcy5zZml4ZWQzMigpLHRoaXMuc2ZpeGVkMzIoKSl9ZmxvYXQoKXtyZXR1cm4gdGhpcy52aWV3LmdldEZsb2F0MzIoKHRoaXMucG9zKz00KS00LCEwKX1kb3VibGUoKXtyZXR1cm4gdGhpcy52aWV3LmdldEZsb2F0NjQoKHRoaXMucG9zKz04KS04LCEwKX1ieXRlcygpe3ZhciBlPXRoaXMudWludDMyKCkscj10aGlzLnBvcztyZXR1cm4gdGhpcy5wb3MrPWUsdGhpcy5hc3NlcnRCb3VuZHMoKSx0aGlzLmJ1Zi5zdWJhcnJheShyLHIrZSl9c3RyaW5nKCl7cmV0dXJuIHRoaXMudGV4dERlY29kZXIuZGVjb2RlKHRoaXMuYnl0ZXMoKSl9fWNsYXNzIE1lc3NhZ2VUeXBle2NvbnN0cnVjdG9yKGUscix0KXt0aGlzLmRlZmF1bHRDaGVja0RlcHRoPTE2LHRoaXMudHlwZU5hbWU9ZSx0aGlzLmZpZWxkcz1yLm1hcChub3JtYWxpemVGaWVsZEluZm8pLHRoaXMub3B0aW9ucz10Pz97fSx0aGlzLnJlZlR5cGVDaGVjaz1uZXcgUmVmbGVjdGlvblR5cGVDaGVjayh0aGlzKSx0aGlzLnJlZkpzb25SZWFkZXI9bmV3IFJlZmxlY3Rpb25Kc29uUmVhZGVyKHRoaXMpLHRoaXMucmVmSnNvbldyaXRlcj1uZXcgUmVmbGVjdGlvbkpzb25Xcml0ZXIodGhpcyksdGhpcy5yZWZCaW5SZWFkZXI9bmV3IFJlZmxlY3Rpb25CaW5hcnlSZWFkZXIodGhpcyksdGhpcy5yZWZCaW5Xcml0ZXI9bmV3IFJlZmxlY3Rpb25CaW5hcnlXcml0ZXIodGhpcyl9Y3JlYXRlKGUpe3ZhciByPXJlZmxlY3Rpb25DcmVhdGUodGhpcyk7cmV0dXJuIHZvaWQgMCE9PWUmJnJlZmxlY3Rpb25NZXJnZVBhcnRpYWwodGhpcyxyLGUpLHJ9Y2xvbmUoZSl7dmFyIHI9dGhpcy5jcmVhdGUoKTtyZXR1cm4gcmVmbGVjdGlvbk1lcmdlUGFydGlhbCh0aGlzLHIsZSkscn1lcXVhbHMoZSxyKXtyZXR1cm4gcmVmbGVjdGlvbkVxdWFscyh0aGlzLGUscil9aXMoZSxyPXRoaXMuZGVmYXVsdENoZWNrRGVwdGgpe3JldHVybiB0aGlzLnJlZlR5cGVDaGVjay5pcyhlLHIsITEpfWlzQXNzaWduYWJsZShlLHI9dGhpcy5kZWZhdWx0Q2hlY2tEZXB0aCl7cmV0dXJuIHRoaXMucmVmVHlwZUNoZWNrLmlzKGUsciwhMCl9bWVyZ2VQYXJ0aWFsKGUscil7cmVmbGVjdGlvbk1lcmdlUGFydGlhbCh0aGlzLGUscil9ZnJvbUJpbmFyeShlLHIpe3I9YmluYXJ5UmVhZE9wdGlvbnMocik7cmV0dXJuIHRoaXMuaW50ZXJuYWxCaW5hcnlSZWFkKHIucmVhZGVyRmFjdG9yeShlKSxlLmJ5dGVMZW5ndGgscil9ZnJvbUpzb24oZSxyKXtyZXR1cm4gdGhpcy5pbnRlcm5hbEpzb25SZWFkKGUsanNvblJlYWRPcHRpb25zKHIpKX1mcm9tSnNvblN0cmluZyhlLHIpe2U9SlNPTi5wYXJzZShlKTtyZXR1cm4gdGhpcy5mcm9tSnNvbihlLHIpfXRvSnNvbihlLHIpe3JldHVybiB0aGlzLmludGVybmFsSnNvbldyaXRlKGUsanNvbldyaXRlT3B0aW9ucyhyKSl9dG9Kc29uU3RyaW5nKGUscil7ZT10aGlzLnRvSnNvbihlLHIpO3JldHVybiBKU09OLnN0cmluZ2lmeShlLG51bGwsKG51bGw9PXI/dm9pZCAwOnIucHJldHR5U3BhY2VzKT8/MCl9dG9CaW5hcnkoZSxyKXtyPWJpbmFyeVdyaXRlT3B0aW9ucyhyKTtyZXR1cm4gdGhpcy5pbnRlcm5hbEJpbmFyeVdyaXRlKGUsci53cml0ZXJGYWN0b3J5KCkscikuZmluaXNoKCl9aW50ZXJuYWxKc29uUmVhZChlLHIsdCl7aWYobnVsbD09PWV8fFwib2JqZWN0XCIhPXR5cGVvZiBlfHxBcnJheS5pc0FycmF5KGUpKXRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHBhcnNlIG1lc3NhZ2UgJHt0aGlzLnR5cGVOYW1lfSBmcm9tIEpTT04gJHt0eXBlb2ZKc29uVmFsdWUoZSl9LmApO3JldHVybiB0PXQ/P3RoaXMuY3JlYXRlKCksdGhpcy5yZWZKc29uUmVhZGVyLnJlYWQoZSx0LHIpLHR9aW50ZXJuYWxKc29uV3JpdGUoZSxyKXtyZXR1cm4gdGhpcy5yZWZKc29uV3JpdGVyLndyaXRlKGUscil9aW50ZXJuYWxCaW5hcnlXcml0ZShlLHIsdCl7cmV0dXJuIHRoaXMucmVmQmluV3JpdGVyLndyaXRlKGUscix0KSxyfWludGVybmFsQmluYXJ5UmVhZChlLHIsdCxhKXthPWE/P3RoaXMuY3JlYXRlKCk7cmV0dXJuIHRoaXMucmVmQmluUmVhZGVyLnJlYWQoZSxhLHQsciksYX19XG5cdFx0XHRcdFx0LyoqKioqKioqKioqKioqKioqKiAgaW5pdGlhbGl6YXRpb24gZmluaXNoICAqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vcHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXByb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS5wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKFBMQVRGT1JNKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIllvdVR1YmVcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0LyoqKioqKioqKioqKioqKioqKiAgaW5pdGlhbGl6YXRpb24gc3RhcnQgICoqKioqKioqKioqKioqKioqKiovXG5cdFx0XHRcdFx0XHRcdFx0XHQvKioqKioqKioqKioqKioqKioqICBpbml0aWFsaXphdGlvbiBmaW5pc2ggICoqKioqKioqKioqKioqKioqKiovXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJTcG90aWZ5XCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcdC8qKioqKioqKioqKioqKioqKiogIGluaXRpYWxpemF0aW9uIHN0YXJ0ICAqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIFN5bmNUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdFx0KGZ1bmN0aW9uIChTeW5jVHlwZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRTeW5jVHlwZVtTeW5jVHlwZVtcIlVOU1lOQ0VEXCJdID0gMF0gPSBcIlVOU1lOQ0VEXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFN5bmNUeXBlW1N5bmNUeXBlW1wiTElORV9TWU5DRURcIl0gPSAxXSA9IFwiTElORV9TWU5DRURcIjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0U3luY1R5cGVbU3luY1R5cGVbXCJTWUxMQUJMRV9TWU5DRURcIl0gPSAyXSA9IFwiU1lMTEFCTEVfU1lOQ0VEXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHR9KShTeW5jVHlwZSB8fCAoU3luY1R5cGUgPSB7fSkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgQ29sb3JMeXJpY3NSZXNwb25zZSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkNvbG9yTHlyaWNzUmVzcG9uc2VcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJseXJpY3NcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IEx5cmljc1Jlc3BvbnNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcImNvbG9yc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gQ29sb3JEYXRhIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAzLCBuYW1lOiBcImhhc1ZvY2FsUmVtb3ZhbFwiLCBraW5kOiBcInNjYWxhclwiLCBvcHQ6IHRydWUsIFQ6IDggLypTY2FsYXJUeXBlLkJPT0wqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNCwgbmFtZTogXCJ2b2NhbFJlbW92YWxDb2xvcnNcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IENvbG9yRGF0YSB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IENvbG9yTHlyaWNzUmVzcG9uc2UgPSBuZXcgQ29sb3JMeXJpY3NSZXNwb25zZSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBMeXJpY3NSZXNwb25zZSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkx5cmljc1Jlc3BvbnNlXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwic3luY1R5cGVcIiwga2luZDogXCJlbnVtXCIsIFQ6ICgpID0+IFtcIlN5bmNUeXBlXCIsIFN5bmNUeXBlXSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMiwgbmFtZTogXCJsaW5lc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgcmVwZWF0OiAxIC8qUmVwZWF0VHlwZS5QQUNLRUQqLywgVDogKCkgPT4gTHlyaWNzTGluZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMywgbmFtZTogXCJwcm92aWRlclwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNCwgbmFtZTogXCJwcm92aWRlckx5cmljc0lkXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA1LCBuYW1lOiBcInByb3ZpZGVyRGlzcGxheU5hbWVcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDYsIG5hbWU6IFwic3luY0x5cmljc0FuZHJvaWRJbnRlbnRcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IEFuZHJvaWRJbnRlbnQgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDcsIG5hbWU6IFwic3luY0x5cmljc1VyaVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogOCwgbmFtZTogXCJpc0RlbnNlVHlwZWZhY2VcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOCAvKlNjYWxhclR5cGUuQk9PTCovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA5LCBuYW1lOiBcImFsdGVybmF0aXZlc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgcmVwZWF0OiAxIC8qUmVwZWF0VHlwZS5QQUNLRUQqLywgVDogKCkgPT4gQWx0ZXJuYXRpdmUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEwLCBuYW1lOiBcImxhbmd1YWdlXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxMSwgbmFtZTogXCJpc1J0bExhbmd1YWdlXCIsIGtpbmQ6IFwic2NhbGFyXCIsIG9wdDogdHJ1ZSwgVDogOCAvKlNjYWxhclR5cGUuQk9PTCovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxMiwgbmFtZTogXCJmdWxsc2NyZWVuQWN0aW9uXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDUgLypTY2FsYXJUeXBlLklOVDMyKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEzLCBuYW1lOiBcInNob3dVcHNlbGxcIiwga2luZDogXCJzY2FsYXJcIiwgb3B0OiB0cnVlLCBUOiA4IC8qU2NhbGFyVHlwZS5CT09MKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBMeXJpY3NSZXNwb25zZSA9IG5ldyBMeXJpY3NSZXNwb25zZSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBMeXJpY3NMaW5lJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiTHlyaWNzTGluZVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcInN0YXJ0VGltZU1zXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDMgLypTY2FsYXJUeXBlLklOVDY0Ki8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwid29yZHNcIiwga2luZDogXCJzY2FsYXJcIiwgb3B0OiB0cnVlLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMywgbmFtZTogXCJzeWxsYWJsZXNcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IFN5bGxhYmxlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3sgbm86IDQsIG5hbWU6IFwiZW5kVGltZU1zXCIsIGtpbmQ6IFwic2NhbGFyXCIsIG9wdDogdHJ1ZSwgVDogMyAvKlNjYWxhclR5cGUuSU5UNjQqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEx5cmljc0xpbmUgPSBuZXcgTHlyaWNzTGluZSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBTeWxsYWJsZSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIlN5bGxhYmxlXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwic3RhcnRUaW1lTXNcIiwga2luZDogXCJzY2FsYXJcIiwgVDogMyAvKlNjYWxhclR5cGUuSU5UNjQqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMiwgbmFtZTogXCJudW1DaGFyc1wiLCBraW5kOiBcInNjYWxhclwiLCBUOiAzIC8qU2NhbGFyVHlwZS5JTlQ2NCovIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgU3lsbGFibGUgPSBuZXcgU3lsbGFibGUkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgQ29sb3JEYXRhJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiQ29sb3JEYXRhXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwiYmFja2dyb3VuZFwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA1IC8qU2NhbGFyVHlwZS5JTlQzMiovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcInRleHRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogNSAvKlNjYWxhclR5cGUuSU5UMzIqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMywgbmFtZTogXCJoaWdobGlnaHRUZXh0XCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDUgLypTY2FsYXJUeXBlLklOVDMyKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBDb2xvckRhdGEgPSBuZXcgQ29sb3JEYXRhJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIEFuZHJvaWRJbnRlbnQkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJBbmRyb2lkSW50ZW50XCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwicHJvdmlkZXJcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwicHJvdmlkZXJBbmRyb2lkQXBwSWRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDMsIG5hbWU6IFwiYWN0aW9uXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA0LCBuYW1lOiBcImRhdGFcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDUsIG5hbWU6IFwiY29udGVudFR5cGVcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBBbmRyb2lkSW50ZW50ID0gbmV3IEFuZHJvaWRJbnRlbnQkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgQWx0ZXJuYXRpdmUkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJBbHRlcm5hdGl2ZVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImxhbmd1YWdlXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcImxpbmVzXCIsIGtpbmQ6IFwic2NhbGFyXCIsIHJlcGVhdDogMiAvKlJlcGVhdFR5cGUuVU5QQUNLRUQqLywgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBBbHRlcm5hdGl2ZSA9IG5ldyBBbHRlcm5hdGl2ZSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvKioqKioqKioqKioqKioqKioqICBpbml0aWFsaXphdGlvbiBmaW5pc2ggICoqKioqKioqKioqKioqKioqKiovXG5cdFx0XHRcdFx0XHRcdFx0XHRib2R5ID0gQ29sb3JMeXJpY3NSZXNwb25zZS5mcm9tQmluYXJ5KHJhd0JvZHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IFVGID0gVW5rbm93bkZpZWxkSGFuZGxlci5saXN0KGJvZHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYFVGOiAke0pTT04uc3RyaW5naWZ5KFVGKX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChVRikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRVRiA9IFVGLm1hcCh1ZiA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91Zi5ubzsgLy8gMjJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VmLndpcmVUeXBlOyAvLyBXaXJlVHlwZS5WYXJpbnRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyB1c2UgdGhlIGJpbmFyeSByZWFkZXIgdG8gZGVjb2RlIHRoZSByYXcgZGF0YTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgcmVhZGVyID0gbmV3IEJpbmFyeVJlYWRlcih1Zi5kYXRhKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgYWRkZWROdW1iZXIgPSByZWFkZXIuaW50MzIoKTsgLy8gNzc3N1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBubzogJHt1Zi5ub30sIHdpcmVUeXBlOiAke3VmLndpcmVUeXBlfSwgcmVhZGVyOiAke3JlYWRlcn0sIGFkZGVkTnVtYmVyOiAke2FkZGVkTnVtYmVyfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9ib2R5ID0gYXdhaXQgaW5qZWN0aW9uTHlyaWMoU2V0dGluZ3MuTHJjVmVuZG9yLCB0cmFja0luZm8sIGJvZHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ym9keS5seXJpY3MgPSBhd2FpdCBpbmplY3Rpb25MeXJpYyhTZXR0aW5ncy5McmNWZW5kb3IsIHRyYWNrSW5mbywgYm9keSkudGhlbihib2R5ID0+IGJvZHkubHlyaWNzKTtcblx0XHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoYm9keT8ubHlyaWNzPy5zeW5jVHlwZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFwiVU5TWU5DRURcIjpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib2R5Lmx5cmljcy5zeW5jVHlwZSA9IDA7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJMSU5FX1NZTkNFRFwiOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJvZHkubHlyaWNzLnN5bmNUeXBlID0gMTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIlNZTExBQkxFX1NZTkNFRFwiOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJvZHkubHlyaWNzLnN5bmNUeXBlID0gMjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XHRib2R5Lmx5cmljcy5mdWxsc2NyZWVuQWN0aW9uID0gMDtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJDb250ZW50LVR5cGVcIl0gJiYgJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pICRyZXNwb25zZS5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gRk9STUFUO1xuXHRcdFx0XHRcdFx0XHRcdFx0JHJlc3BvbnNlLnN0YXR1cyA9ICgkLmlzUXVhblgoKSkgPyBcIkhUVFAvMS4xIDIwMCBPS1wiIDogMjAwO1xuXHRcdFx0XHRcdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRyYXdCb2R5ID0gQ29sb3JMeXJpY3NSZXNwb25zZS50b0JpbmFyeShib2R5KTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2dycGNcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjK3Byb3RvXCI6XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ly8g5YaZ5YWl5LqM6L+b5Yi25pWw5o2uXG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIOiwg+ivleS/oeaBr2AsIGByYXdCb2R5OiAke0pTT04uc3RyaW5naWZ5KHJhd0JvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdGlmICgkLmlzUXVhblgoKSkgJHJlc3BvbnNlLmJvZHlCeXRlcyA9IHJhd0JvZHlcblx0XHRcdFx0XHRlbHNlICRyZXNwb25zZS5ib2R5ID0gcmF3Qm9keTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHQvLyDnvJPlrZjmn6Xor6Lkv6Hmga9cblx0XHRcdGlmICh0cmFja0luZm8/Lk5ldGVhc2VNdXNpYz8uaWQgPz8gdHJhY2tJbmZvPy5RUU11c2ljPy5taWQpIHtcblx0XHRcdFx0Q2FjaGVzLk1ldGFkYXRhcy5UcmFja3Muc2V0KHRyYWNrSW5mby5pZCwgdHJhY2tJbmZvKTtcblx0XHRcdFx0Ly8g5qC85byP5YyW57yT5a2YXG5cdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBDYWNoZXMuTWV0YWRhdGFzLlRyYWNrczogJHtKU09OLnN0cmluZ2lmeShbLi4uQ2FjaGVzLk1ldGFkYXRhcy5UcmFja3MuZW50cmllcygpXSl9YCwgXCJcIik7XG5cdFx0XHRcdENhY2hlcy5NZXRhZGF0YXMuVHJhY2tzID0gc2V0Q2FjaGUoQ2FjaGVzLk1ldGFkYXRhcy5UcmFja3MsIFNldHRpbmdzLkNhY2hlU2l6ZSk7XG5cdFx0XHRcdC8vIOWGmeWFpeaMgeS5heWMluWCqOWtmFxuXHRcdFx0XHQkLnNldGpzb24oQ2FjaGVzLk1ldGFkYXRhcy5UcmFja3MsIGBARHVhbFN1YnMuJHtQTEFURk9STX0uQ2FjaGVzLk1ldGFkYXRhcy5UcmFja3NgKTtcblx0XHRcdH07XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0YnJlYWs7XG5cdH07XG59KSgpXG5cdC5jYXRjaCgoZSkgPT4gJC5sb2dFcnIoZSkpXG5cdC5maW5hbGx5KCgpID0+IHtcblx0XHRzd2l0Y2ggKCRyZXNwb25zZSkge1xuXHRcdFx0ZGVmYXVsdDogeyAvLyDmnInlm57lpI3mlbDmja7vvIzov5Tlm57lm57lpI3mlbDmja5cblx0XHRcdFx0Ly9jb25zdCBGT1JNQVQgPSAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJDb250ZW50LVR5cGVcIl0gPz8gJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pPy5zcGxpdChcIjtcIik/LlswXTtcblx0XHRcdFx0JC5sb2coYPCfjokgJHskLm5hbWV9LCBmaW5hbGx5YCwgYCRyZXNwb25zZWAsIGBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuXHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwgZmluYWxseWAsIGAkcmVzcG9uc2U6ICR7SlNPTi5zdHJpbmdpZnkoJHJlc3BvbnNlKX1gLCBcIlwiKTtcblx0XHRcdFx0aWYgKCRyZXNwb25zZT8uaGVhZGVycz8uW1wiQ29udGVudC1FbmNvZGluZ1wiXSkgJHJlc3BvbnNlLmhlYWRlcnNbXCJDb250ZW50LUVuY29kaW5nXCJdID0gXCJpZGVudGl0eVwiO1xuXHRcdFx0XHRpZiAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJjb250ZW50LWVuY29kaW5nXCJdKSAkcmVzcG9uc2UuaGVhZGVyc1tcImNvbnRlbnQtZW5jb2RpbmdcIl0gPSBcImlkZW50aXR5XCI7XG5cdFx0XHRcdGlmICgkLmlzUXVhblgoKSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdFx0XHRjYXNlIHVuZGVmaW5lZDogLy8g6KeG5Li65pegYm9keVxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57mma7pgJrmlbDmja5cblx0XHRcdFx0XHRcdFx0JC5kb25lKHsgc3RhdHVzOiAkcmVzcG9uc2Uuc3RhdHVzLCBoZWFkZXJzOiAkcmVzcG9uc2UuaGVhZGVycyB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57mma7pgJrmlbDmja5cblx0XHRcdFx0XHRcdFx0JC5kb25lKHsgc3RhdHVzOiAkcmVzcG9uc2Uuc3RhdHVzLCBoZWFkZXJzOiAkcmVzcG9uc2UuaGVhZGVycywgYm9keTogJHJlc3BvbnNlLmJvZHkgfSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3Byb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUucHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwYytwcm90b1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxlY2F0aW9uL29jdGV0LXN0cmVhbVwiOlxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57kuozov5vliLbmlbDmja5cblx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhgJHskcmVzcG9uc2UuYm9keUJ5dGVzLmJ5dGVMZW5ndGh9LS0tJHskcmVzcG9uc2UuYm9keUJ5dGVzLmJ1ZmZlci5ieXRlTGVuZ3RofWApO1xuXHRcdFx0XHRcdFx0XHQkLmRvbmUoeyBzdGF0dXM6ICRyZXNwb25zZS5zdGF0dXMsIGhlYWRlcnM6ICRyZXNwb25zZS5oZWFkZXJzLCBib2R5Qnl0ZXM6ICRyZXNwb25zZS5ib2R5Qnl0ZXMuYnVmZmVyLnNsaWNlKCRyZXNwb25zZS5ib2R5Qnl0ZXMuYnl0ZU9mZnNldCwgJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlTGVuZ3RoICsgJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlT2Zmc2V0KSB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBlbHNlICQuZG9uZSgkcmVzcG9uc2UpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDogeyAvLyDml6Dlm57lpI3mlbDmja5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0pXG5cbi8qKioqKioqKioqKioqKioqKiBGdW5jdGlvbiAqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogU2V0IENhY2hlXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge01hcH0gY2FjaGUgLSBQbGF5bGlzdHMgQ2FjaGUgLyBTdWJ0aXRsZXMgQ2FjaGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBjYWNoZVNpemUgLSBDYWNoZSBTaXplXG4gKiBAcmV0dXJuIHtCb29sZWFufSBpc1NhdmVkXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlKGNhY2hlLCBjYWNoZVNpemUgPSAxMDApIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIFNldCBDYWNoZSwgY2FjaGVTaXplOiAke2NhY2hlU2l6ZX1gLCBcIlwiKTtcblx0Y2FjaGUgPSBBcnJheS5mcm9tKGNhY2hlIHx8IFtdKTsgLy8gTWFw6L2sQXJyYXlcblx0Y2FjaGUgPSBjYWNoZS5zbGljZSgtY2FjaGVTaXplKTsgLy8g6ZmQ5Yi257yT5a2Y5aSn5bCPXG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgQ2FjaGVgLCBcIlwiKTtcblx0cmV0dXJuIGNhY2hlO1xufTtcblxuLyoqXG4gKiBGZXRjaCBSdWxlZCBSZXFldXN0XG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vQmlsaVVuaXZlcnNlL0dsb2JhbC9ibG9iL21haW4vanMvQmlsaUJpbGkuR2xvYmFsLnJlcXVlc3QuanNcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0IC0gT3JpZ2luYWwgUmVxdWVzdCBDb250ZW50XG4gKiBAcmV0dXJuIHtQcm9taXNlPCo+fVxuICovXG5hc3luYyBmdW5jdGlvbiBGZXRjaChyZXF1ZXN0ID0ge30pIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIEZldGNoIFJ1bGVkIFJlcWV1c3RgLCBcIlwiKTtcblx0Ly9jb25zdCBGT1JNQVQgPSAocmVxdWVzdD8uaGVhZGVycz8uW1wiQ29udGVudC1UeXBlXCJdID8/IHJlcXVlc3Q/LmhlYWRlcnM/LltcImNvbnRlbnQtdHlwZVwiXSk/LnNwbGl0KFwiO1wiKT8uWzBdO1xuXHQkLmxvZyhg4pqgICR7JC5uYW1lfSwgRmV0Y2ggUnVsZWQgUmVxZXVzdGAsIGBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuXHRpZiAoJC5pc1F1YW5YKCkpIHtcblx0XHRzd2l0Y2ggKEZPUk1BVCkge1xuXHRcdFx0Y2FzZSB1bmRlZmluZWQ6IC8vIOinhuS4uuaXoGJvZHlcblx0XHRcdFx0Ly8g6L+U5Zue5pmu6YCa5pWw5o2uXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Ly8g6L+U5Zue5pmu6YCa5pWw5o2uXG5cdFx0XHRcdGRlbGV0ZSByZXF1ZXN0LmJvZHlCeXRlcztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vcHJvdG9idWZcIjpcblx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXByb3RvYnVmXCI6XG5cdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS5wcm90b2J1ZlwiOlxuXHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2dycGNcIjpcblx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjK3Byb3RvXCI6XG5cdFx0XHQvL2Nhc2UgXCJhcHBsZWNhdGlvbi9vY3RldC1zdHJlYW1cIjpcblx0XHRcdFx0Ly8g6L+U5Zue5LqM6L+b5Yi25pWw5o2uXG5cdFx0XHRcdGRlbGV0ZSByZXF1ZXN0LmJvZHk7XG5cdFx0XHRcdGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcocmVxdWVzdC5ib2R5Qnl0ZXMpKSByZXF1ZXN0LmJvZHlCeXRlcyA9IHJlcXVlc3QuYm9keUJ5dGVzLmJ1ZmZlci5zbGljZShyZXF1ZXN0LmJvZHlCeXRlcy5ieXRlT2Zmc2V0LCByZXF1ZXN0LmJvZHlCeXRlcy5ieXRlTGVuZ3RoICsgcmVxdWVzdC5ib2R5Qnl0ZXMuYnl0ZU9mZnNldCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdH07XG5cdGxldCByZXNwb25zZSA9IChyZXF1ZXN0Py5ib2R5ID8/IHJlcXVlc3Q/LmJvZHlCeXRlcylcblx0XHQ/IGF3YWl0ICQuaHR0cC5wb3N0KHJlcXVlc3QpXG5cdFx0OiBhd2FpdCAkLmh0dHAuZ2V0KHJlcXVlc3QpO1xuXHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgRmV0Y2ggUnVsZWQgUmVxZXVzdGAsIFwiXCIpO1xuXHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIEZldGNoIFJ1bGVkIFJlcWV1c3RgLCBgUmVzcG9uc2U6JHtKU09OLnN0cmluZ2lmeShyZXNwb25zZSl9YCwgXCJcIik7XG5cdHJldHVybiByZXNwb25zZTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGluamVjdGlvbkx5cmljKHZlbmRvciA9IFwiUVFNdXNpY1wiLCB0cmFja0luZm8gPSB7fSwgYm9keSA9ICRyZXNwb25zZS5ib2R5KSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBJbmplY3Rpb24gTHlyaWNgLCBgdmVuZG9yOiAke3ZlbmRvcn0sIHRyYWNrSW5mbzogJHtKU09OLnN0cmluZ2lmeSh0cmFja0luZm8pfWAsIFwiXCIpO1xuXHRjb25zdCBVQVBvb2wgPSBbXG5cdFx0XCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTYuMC40NjY0LjQ1IFNhZmFyaS81MzcuMzZcIiwgLy8gMTMuNSVcblx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85Ni4wLjQ2NjQuMTEwIFNhZmFyaS81MzcuMzZcIiwgLy8gNi42JVxuXHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NDsgcnY6OTQuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC85NC4wXCIsIC8vIDYuNCVcblx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2Ojk1LjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvOTUuMFwiLCAvLyA2LjIlXG5cdFx0XCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTYuMC40NjY0LjkzIFNhZmFyaS81MzcuMzZcIiwgLy8gNS4yJVxuXHRcdFwiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk2LjAuNDY2NC41NSBTYWZhcmkvNTM3LjM2XCIsIC8vIDQuOCVcblx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS83NC4wLjM3MjkuMTY5IFNhZmFyaS81MzcuMzZcIixcblx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS82NC4wLjMyODIuMTQwIFNhZmFyaS81MzcuMzYgRWRnZS8xNy4xNzEzNFwiLFxuXHRcdFwiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxMl8yIGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwNS4xLjE1IChLSFRNTCwgbGlrZSBHZWNrbykgTW9iaWxlLzE1RTE0OFwiLFxuXHRcdFwiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxMl8yIGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwNS4xLjE1IChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi8xMi4xIE1vYmlsZS8xNUUxNDggU2FmYXJpLzYwNC4xXCIsXG5cdFx0XCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KVwiLFxuXHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgNi4xOyBXT1c2NDsgcnY6NTIuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC81Mi4wXCIsXG5cdF07XG5cdC8vIOWklumDqOatjOivjVxuXHRsZXQgZXh0ZXJuYWxMeXJpYyA9IHVuZGVmaW5lZDtcblx0bGV0IHRyYW5zTHlyaWMgPSB1bmRlZmluZWQ7XG5cdC8vIOaehOW7uuatjOivjee7k+aehFxuXHRpZiAoIWJvZHkpIGJvZHkgPSB7fTtcblx0Ly8g5oyJ5bmz5Y+w5aGr5YWF5b+F6KaB5q2M6K+N5L+h5oGvXG5cdHN3aXRjaCAoUExBVEZPUk0pIHtcblx0XHRjYXNlIFwiU3BvdGlmeVwiOlxuXHRcdFx0Ym9keS5seXJpY3MgPSB7XG5cdFx0XHRcdFwic3luY1R5cGVcIjogXCJVTlNZTkNFRFwiLFxuXHRcdFx0XHQvL1wic3luY1R5cGVcIjogMSxcblx0XHRcdFx0XCJsaW5lc1wiOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XCJzdGFydFRpbWVNc1wiOiBcIjBcIixcblx0XHRcdFx0XHRcdFwid29yZHNcIjogXCJcIixcblx0XHRcdFx0XHRcdFwic3lsbGFibGVzXCI6IFtdLFxuXHRcdFx0XHRcdFx0XCJlbmRUaW1lTXNcIjogXCIwXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF0sXG5cdFx0XHRcdFwicHJvdmlkZXJcIjogXCJcIixcblx0XHRcdFx0XCJwcm92aWRlckx5cmljc0lkXCI6IFwiXCIsXG5cdFx0XHRcdFwicHJvdmlkZXJEaXNwbGF5TmFtZVwiOiBcIlwiLFxuXHRcdFx0XHRcInN5bmNMeXJpY3NVcmlcIjogXCJcIixcblx0XHRcdFx0XCJpc0RlbnNlVHlwZWZhY2VcIjogdHJ1ZSxcblx0XHRcdFx0XCJhbHRlcm5hdGl2ZXNcIjogW10sXG5cdFx0XHRcdFwibGFuZ3VhZ2VcIjogXCJcIixcblx0XHRcdFx0Ly9cImlzUnRsTGFuZ3VhZ2VcIjogZmFsc2UsXG5cdFx0XHRcdC8vXCJmdWxsc2NyZWVuQWN0aW9uXCI6IFwiRlVMTFNDUkVFTl9MWVJJQ1NcIixcblx0XHRcdFx0Ly9cInNob3dVcHNlbGxcIjogZmFsc2UsXG5cdFx0XHRcdC8vXCJjYXBTdGF0dXNcIjogXCJOT05FXCIsXG5cdFx0XHRcdC8vXCJpbXByZXNzaW9uc1JlbWFpbmluZ1wiOiAwXG5cdFx0XHR9O1xuXHRcdFx0Ym9keS5jb2xvcnMgPSB7XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiOiAtODQyMTUwNCwgLy8g54Gw6ImyXG5cdFx0XHRcdFwidGV4dFwiOiAtMTY3NzcyMTYsIC8vIOm7keiJslxuXHRcdFx0XHRcImhpZ2hsaWdodFRleHRcIjogLTEgLy8g55m96ImyXG5cdFx0XHR9O1xuXHRcdFx0Ym9keS5oYXNWb2NhbFJlbW92YWwgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHR9O1xuXHQvLyDmn6Xor6Ig5o+Q5Y+WIOi9rOaNolxuXHRzd2l0Y2ggKHZlbmRvcikge1xuXHRcdGNhc2UgXCJOZXRlYXNlTXVzaWNOb2RlSlNcIjpcblx0XHRjYXNlIFwiTmV0ZWFzZU11c2ljXCI6XG5cdFx0XHRpZiAoIXRyYWNrSW5mbz8uTmV0ZWFzZU11c2ljPy5pZCkgdHJhY2tJbmZvLk5ldGVhc2VNdXNpYyA9IGF3YWl0IHNlYXJjaFRyYWNrKHZlbmRvciwgYCR7dHJhY2tJbmZvLnRyYWNrfSAke3RyYWNrSW5mby5hcnRpc3R9YCwgVUFQb29sKTtcblx0XHRcdGlmICh0cmFja0luZm8/Lk5ldGVhc2VNdXNpYz8uaWQpIGV4dGVybmFsTHlyaWMgPSBhd2FpdCBzZWFyY2hMeXJpYyh2ZW5kb3IsIHRyYWNrSW5mby5OZXRlYXNlTXVzaWMuaWQsIFVBUG9vbCk7XG5cdFx0XHRpZiAoZXh0ZXJuYWxMeXJpYz8udGx5cmljPy5seXJpYykgdHJhbnNMeXJpYyA9IExSQy50b1Nwb3RpZnkoZXh0ZXJuYWxMeXJpYz8udGx5cmljPy5seXJpYyk7XG5cdFx0XHRzd2l0Y2ggKFBMQVRGT1JNKSB7XG5cdFx0XHRcdGNhc2UgXCJTcG90aWZ5XCI6XG5cdFx0XHRcdFx0aWYgKGV4dGVybmFsTHlyaWM/LnlyYz8ubHlyaWMpIHtcblx0XHRcdFx0XHRcdGJvZHkubHlyaWNzLnN5bmNUeXBlID0gXCJTWUxMQUJMRV9TWU5DRURcIjtcblx0XHRcdFx0XHRcdGJvZHkubHlyaWNzLmxpbmVzID0gTFJDLnRvU3BvdGlmeShleHRlcm5hbEx5cmljPy55cmM/Lmx5cmljKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGV4dGVybmFsTHlyaWM/LmxyYz8ubHlyaWMpIHtcblx0XHRcdFx0XHRcdGJvZHkubHlyaWNzLnN5bmNUeXBlID0gXCJMSU5FX1NZTkNFRFwiO1xuXHRcdFx0XHRcdFx0Ym9keS5seXJpY3MubGluZXMgPSBMUkMudG9TcG90aWZ5KGV4dGVybmFsTHlyaWM/LmxyYz8ubHlyaWMpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ym9keS5seXJpY3MucHJvdmlkZXIgPSBcIk5ldGVhc2VNdXNpY1wiO1xuXHRcdFx0XHRcdGJvZHkubHlyaWNzLnByb3ZpZGVyTHlyaWNzSWQgPSB0cmFja0luZm8/Lk5ldGVhc2VNdXNpYz8uaWQ/LnRvU3RyaW5nPy4oKTtcblx0XHRcdFx0XHRib2R5Lmx5cmljcy5wcm92aWRlckRpc3BsYXlOYW1lID0gYOe9keaYk+S6kemfs+S5kCAtICR7ZXh0ZXJuYWxMeXJpYz8ubHlyaWNVc2VyPy5uaWNrbmFtZSA/PyBcIuacquefpVwifWA7XG5cdFx0XHRcdFx0Ym9keS5jb2xvcnMuYmFja2dyb3VuZCA9IC04MjQ5ODA2OyAvLyDnvZHmmJPnuqIgODUyNzQxMCAjODIxRTMyIHJnYigxMzAsMzAsNTApXG5cdFx0XHRcdFx0Ly9ib2R5LmNvbG9ycy5iYWNrZ3JvdW5kID0gLTU1Nzc1OyAvLyDnvZHmmJPnuqIgMTY3MjE0NDEgI0ZGMjYyMSByZ2IoMjU1LDM4LDMzKVxuXHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYGJvZHkubHlyaWNzLmxpbmVzOiAke0pTT04uc3RyaW5naWZ5KGJvZHkubHlyaWNzLmxpbmVzKX1gLCBcIlwiKTtcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIFwiWW91VHViZVwiOlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJRUU11c2ljXCI6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGlmICghdHJhY2tJbmZvPy5RUU11c2ljPy5taWQpIHRyYWNrSW5mby5RUU11c2ljID0gYXdhaXQgc2VhcmNoVHJhY2sodmVuZG9yLCBgJHt0cmFja0luZm8udHJhY2t9ICR7dHJhY2tJbmZvLmFydGlzdH1gLCBVQVBvb2wpO1xuXHRcdFx0aWYgKHRyYWNrSW5mbz8uUVFNdXNpYz8ubWlkKSBleHRlcm5hbEx5cmljID0gYXdhaXQgc2VhcmNoTHlyaWModmVuZG9yLCB0cmFja0luZm8uUVFNdXNpYy5taWQsIFVBUG9vbCk7XG5cdFx0XHRpZiAoZXh0ZXJuYWxMeXJpYz8udHJhbnMpIHRyYW5zTHlyaWMgPSBMUkMudG9TcG90aWZ5KGV4dGVybmFsTHlyaWM/LnRyYW5zKTtcblx0XHRcdHN3aXRjaCAoUExBVEZPUk0pIHtcblx0XHRcdFx0Y2FzZSBcIlNwb3RpZnlcIjpcblx0XHRcdFx0XHRpZiAoZXh0ZXJuYWxMeXJpYz8ubHlyaWMpIHtcblx0XHRcdFx0XHRcdGJvZHkubHlyaWNzLnN5bmNUeXBlID0gXCJMSU5FX1NZTkNFRFwiO1xuXHRcdFx0XHRcdFx0Ym9keS5seXJpY3MubGluZXMgPSBMUkMudG9TcG90aWZ5KGV4dGVybmFsTHlyaWM/Lmx5cmljKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJvZHkubHlyaWNzLnByb3ZpZGVyID0gXCJRUU11c2ljXCI7XG5cdFx0XHRcdFx0Ym9keS5seXJpY3MucHJvdmlkZXJMeXJpY3NJZCA9IHRyYWNrSW5mbz8uUVFNdXNpYz8ubWlkPy50b1N0cmluZz8uKCk7XG5cdFx0XHRcdFx0Ym9keS5seXJpY3MucHJvdmlkZXJEaXNwbGF5TmFtZSA9IGBRUemfs+S5kGA7XG5cdFx0XHRcdFx0Ym9keS5jb2xvcnMuYmFja2dyb3VuZCA9IC0xMTAzODE4OTsgLy8gUVHpn7PkuZDnu78gNTczOTAyNyAjNTc5MjEzIHJnYig4NywxNDYsMTkpXG5cdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCDosIPor5Xkv6Hmga9gLCBgYm9keS5seXJpY3MubGluZXM6ICR7SlNPTi5zdHJpbmdpZnkoYm9keS5seXJpY3MubGluZXMpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgXCJZb3VUdWJlXCI6XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0YnJlYWs7XG5cdH07XG5cdC8vIOe/u+ivkeatjOivjVxuXHRpZiAodHJhbnNMeXJpYykge1xuXHRcdGxldCBkdW9seXJpYyA9IExSQy5jb21iaW5lU3BvdGlmeShib2R5Lmx5cmljcy5saW5lcywgdHJhbnNMeXJpYyk7XG5cdFx0c3dpdGNoIChQTEFURk9STSkge1xuXHRcdFx0Y2FzZSBcIlNwb3RpZnlcIjpcblx0XHRcdFx0c3dpdGNoICgkcmVxdWVzdD8uaGVhZGVycz8uW1wiYXBwLXBsYXRmb3JtXCJdID8/ICRyZXF1ZXN0Py5oZWFkZXJzPy5bXCJBcHAtUGxhdGZvcm1cIl0pIHtcblx0XHRcdFx0XHRjYXNlIFwiT1NYXCI6IC8vIG1hY09TIEFwcCDmmoLkuI3mlK/mjIHnv7vor5Hlip/og71cblx0XHRcdFx0XHRjYXNlIFwiV2luMzJfeDg2XzY0XCI6IC8vIFdpbmRvd3MgQXBwIOaaguS4jeaUr+aMgee/u+ivkeWKn+iDvVxuXHRcdFx0XHRcdGNhc2UgXCJXZWJQbGF5ZXJcIjogLy8gV2ViIEFwcFxuXHRcdFx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0Ym9keS5seXJpY3MubGluZXMgPSBib2R5Lmx5cmljcy5saW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKGxpbmU/LndvcmRzKSBsaW5lLndvcmRzID0gY29tYmluZVRleHQobGluZS53b3JkcywgZHVvbHlyaWM/LltpXT8udHdvcmRzID8/IFwi4pmqXCIpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbGluZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdGJvZHkubHlyaWNzLmxpbmVzID0gTFJDLnNlcGFyYXRlU3BvdGlmeShkdW9seXJpYykubWFwKGxpbmUgPT4ge1xuXHRcdFx0XHRcdFx0XHRsaW5lLnN0YXJ0VGltZU1zID0gbGluZS5zdGFydFRpbWVNcy50b1N0cmluZygpO1xuXHRcdFx0XHRcdFx0XHRsaW5lLmVuZFRpbWVNcyA9IGxpbmUuZW5kVGltZU1zLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBsaW5lO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly9icmVhazsg5LiN5Lit5pat77yM57un57ut5aSE55CGXG5cdFx0XHRcdFx0Y2FzZSBcImlPU1wiOlxuXHRcdFx0XHRcdFx0Ym9keS5seXJpY3MuYWx0ZXJuYXRpdmVzLnVuc2hpZnQoe1xuXHRcdFx0XHRcdFx0XHRcImxhbmd1YWdlXCI6IFwiemhcIixcblx0XHRcdFx0XHRcdFx0XCJsaW5lc1wiOiBkdW9seXJpYy5tYXAobGluZSA9PiBsaW5lPy50d29yZHMgPz8gXCLimapcIilcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIFwiWW91VHViZVwiOlxuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHR9O1xuXG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBJbmplY3Rpb24gTHlyaWNgLCBcIlwiKTtcblx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCBJbmplY3Rpb24gTHlyaWNgLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0cmV0dXJuIGJvZHk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBzZWFyY2hUcmFjayh2ZW5kb3IgPSBcIlFRTXVzaWNcIiwga2V5d29yZCA9IFwiXCIsIFVBUG9vbCA9IFtdKXtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIFNlYXJjaCBUcmFja2AsIGB2ZW5kb3I6ICR7dmVuZG9yfSwga2V5d29yZDogJHtrZXl3b3JkfWAsIFwiXCIpO1xuXHRjb25zdCBzZWFyY2hSZXF1ZXN0ID0ge1xuXHRcdFwiaGVhZGVyc1wiOiB7XG5cdFx0XHRcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdFwiVXNlci1BZ2VudFwiOiBVQVBvb2xbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogVUFQb29sLmxlbmd0aCldLCAvLyDpmo/mnLpVQVxuXHRcdH1cblx0fTtcblx0Y29uc3QgdHJhY2tJbmZvID0ge307XG5cdHN3aXRjaCAodmVuZG9yKSB7XG5cdFx0Y2FzZSBcIk5ldGVhc2VNdXNpY05vZGVKU1wiOiB7XG5cdFx0XHRjb25zdCBIb3N0UG9vbCA9IFtcblx0XHRcdFx0XCJhcGkubXVzaWMuYXJlc2NoYW5nLnRvcFwiLFxuXHRcdFx0XHRcIm11LWFwaS55dWswLmNvbVwiLFxuXHRcdFx0XHRcIm5ldGVhc2UuaGFwcHlraW5nLnRvcFwiLFxuXHRcdFx0XHRcIm11c2ljLmxvdmV0aGV3aW5kLmNuXCIsXG5cdFx0XHRcdFwibmV0ZWFzZWNsb3VkbXVzaWNhcGkubmFub2NhdC5jbG91ZFwiXG5cdFx0XHRdO1xuXHRcdFx0Ly8g5pCc57Si5q2M5puyXG5cdFx0XHRjb25zdCBzZWFyY2hVcmwgPSB7XG5cdFx0XHRcdFwic2NoZW1lXCI6IFwiaHR0cHNcIixcblx0XHRcdFx0XCJob3N0XCI6IEhvc3RQb29sW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEhvc3RQb29sLmxlbmd0aCldLFxuXHRcdFx0XHQvL1wicGF0aFwiOiBcInNlYXJjaFwiLFxuXHRcdFx0XHRcInBhdGhcIjogXCJjbG91ZHNlYXJjaFwiLFxuXHRcdFx0XHRcInF1ZXJ5XCI6IHtcblx0XHRcdFx0XHRcInR5cGVcIjogMSxcblx0XHRcdFx0XHRcImxpbWl0XCI6IDEsXG5cdFx0XHRcdFx0XCJvZmZzZXRcIjogMCxcblx0XHRcdFx0XHRcImtleXdvcmRzXCI6IGVuY29kZVVSSUNvbXBvbmVudChrZXl3b3JkKSxcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYHNlYXJjaFVybDogJHtKU09OLnN0cmluZ2lmeShzZWFyY2hVcmwpfWAsIFwiXCIpO1xuXHRcdFx0c2VhcmNoUmVxdWVzdC51cmwgPSBVUkkuc3RyaW5naWZ5KHNlYXJjaFVybCk7XG5cdFx0XHRzZWFyY2hSZXF1ZXN0LmhlYWRlcnMuUmVmZXJlciA9IFwiaHR0cHM6Ly9tdXNpYy4xNjMuY29tXCI7XG5cdFx0XHRjb25zdCBzZWFyY2hSZXN1bHQgPSBhd2FpdCAkLmh0dHAuZ2V0KHNlYXJjaFJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYHNlYXJjaFJlc3VsdDogJHtKU09OLnN0cmluZ2lmeShyZXNwb25zZS5ib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0Ym9keSA9IEpTT04ucGFyc2UocmVzcG9uc2UuYm9keSk7XG5cdFx0XHRcdHRyYWNrSW5mby5pZCA9IGJvZHk/LnJlc3VsdD8uc29uZ3M/LlswXT8uaWQ7XG5cdFx0XHRcdHRyYWNrSW5mby50cmFjayA9IGJvZHk/LnJlc3VsdD8uc29uZ3M/LlswXT8ubmFtZTtcblx0XHRcdFx0dHJhY2tJbmZvLmFsYnVtID0gYm9keT8ucmVzdWx0Py5zb25ncz8uWzBdPy5hcj8ubmFtZTtcblx0XHRcdFx0dHJhY2tJbmZvLmFydGlzdCA9IGJvZHk/LnJlc3VsdD8uc29uZ3M/LlswXT8uYWw/Lm5hbWU7XG5cdFx0XHR9KTtcblx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdFx0Y2FzZSBcIk5ldGVhc2VNdXNpY1wiOiB7XG5cdFx0XHRjb25zdCBzZWFyY2hVcmwgPSB7XG5cdFx0XHRcdFwic2NoZW1lXCI6IFwiaHR0cHNcIixcblx0XHRcdFx0XCJob3N0XCI6IFwibXVzaWMuMTYzLmNvbVwiLFxuXHRcdFx0XHRcInBhdGhcIjogXCJhcGkvc2VhcmNoL3BjXCIsXG5cdFx0XHRcdFwicXVlcnlcIjoge1xuXHRcdFx0XHRcdFwidHlwZVwiOiAxLFxuXHRcdFx0XHRcdFwibGltaXRcIjogMSxcblx0XHRcdFx0XHRcIm9mZnNldFwiOiAwLFxuXHRcdFx0XHRcdFwic1wiOiBlbmNvZGVVUklDb21wb25lbnQoa2V5d29yZCksXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIOiwg+ivleS/oeaBr2AsIGBzZWFyY2hVcmw6ICR7SlNPTi5zdHJpbmdpZnkoc2VhcmNoVXJsKX1gLCBcIlwiKTtcblx0XHRcdHNlYXJjaFJlcXVlc3QudXJsID0gVVJJLnN0cmluZ2lmeShzZWFyY2hVcmwpO1xuXHRcdFx0c2VhcmNoUmVxdWVzdC5oZWFkZXJzLlJlZmVyZXIgPSBcImh0dHBzOi8vbXVzaWMuMTYzLmNvbVwiO1xuXHRcdFx0Y29uc3Qgc2VhcmNoUmVzdWx0ID0gYXdhaXQgJC5odHRwLmdldChzZWFyY2hSZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCDosIPor5Xkv6Hmga9gLCBgc2VhcmNoUmVzdWx0OiAke0pTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRib2R5ID0gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0dHJhY2tJbmZvLmlkID0gYm9keT8ucmVzdWx0Py5zb25ncz8uWzBdPy5pZDtcblx0XHRcdFx0dHJhY2tJbmZvLnRyYWNrID0gYm9keT8ucmVzdWx0Py5zb25ncz8uWzBdPy5uYW1lO1xuXHRcdFx0XHR0cmFja0luZm8uYWxidW0gPSBib2R5Py5yZXN1bHQ/LnNvbmdzPy5bMF0/LmFyPy5uYW1lO1xuXHRcdFx0XHR0cmFja0luZm8uYXJ0aXN0ID0gYm9keT8ucmVzdWx0Py5zb25ncz8uWzBdPy5hbD8ubmFtZTtcblx0XHRcdH0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0XHRjYXNlIFwiUVFNdXNpY1wiOlxuXHRcdGRlZmF1bHQ6IHtcblx0XHRcdGNvbnN0IHNlYXJjaFVybCA9IHtcblx0XHRcdFx0XCJzY2hlbWVcIjogXCJodHRwc1wiLFxuXHRcdFx0XHRcImhvc3RcIjogXCJ1LnkucXEuY29tXCIsXG5cdFx0XHRcdFwicGF0aFwiOiBcImNnaS1iaW4vbXVzaWN1LmZjZ1wiXG5cdFx0XHR9O1xuXHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCDosIPor5Xkv6Hmga9gLCBgc2VhcmNoVXJsOiAke0pTT04uc3RyaW5naWZ5KHNlYXJjaFVybCl9YCwgXCJcIik7XG5cdFx0XHRzZWFyY2hSZXF1ZXN0LnVybCA9IFVSSS5zdHJpbmdpZnkoc2VhcmNoVXJsKTtcblx0XHRcdHNlYXJjaFJlcXVlc3QuaGVhZGVycy5SZWZlcmVyID0gXCJodHRwczovL2MueS5xcS5jb21cIjtcblx0XHRcdHNlYXJjaFJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0XCJtdXNpYy5zZWFyY2guU2VhcmNoQ2dpU2VydmljZVwiOiB7XG5cdFx0XHRcdFx0XCJtZXRob2RcIjogXCJEb1NlYXJjaEZvclFRTXVzaWNEZXNrdG9wXCIsXG5cdFx0XHRcdFx0XCJtb2R1bGVcIjogXCJtdXNpYy5zZWFyY2guU2VhcmNoQ2dpU2VydmljZVwiLFxuXHRcdFx0XHRcdFwicGFyYW1cIjoge1xuXHRcdFx0XHRcdFx0XCJudW1fcGVyX3BhZ2VcIjogMSxcblx0XHRcdFx0XHRcdFwicGFnZV9udW1cIjogMSxcblx0XHRcdFx0XHRcdFwicXVlcnlcIjoga2V5d29yZCxcblx0XHRcdFx0XHRcdFwic2VhcmNoX3R5cGVcIjogMFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCBzZWFyY2hSZXN1bHQgPSBhd2FpdCAkLmh0dHAucG9zdChzZWFyY2hSZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCDosIPor5Xkv6Hmga9gLCBgc2VhcmNoUmVzdWx0OiAke0pTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRib2R5ID0gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0Ym9keSA9IGJvZHlbXCJtdXNpYy5zZWFyY2guU2VhcmNoQ2dpU2VydmljZVwiXS5kYXRhLmJvZHk7XG5cdFx0XHRcdHRyYWNrSW5mby5taWQgPSBib2R5Py5zb25nPy5saXN0Py5bMF0/Lm1pZDtcblx0XHRcdFx0dHJhY2tJbmZvLnRyYWNrID0gYm9keT8uc29uZz8ubGlzdD8uWzBdPy5uYW1lO1xuXHRcdFx0XHR0cmFja0luZm8uYWxidW0gPSBib2R5Py5zb25nPy5saXN0Py5bMF0/LmFsYnVtPy5uYW1lO1xuXHRcdFx0XHR0cmFja0luZm8uYXJ0aXN0ID0gYm9keT8uc29uZz8ubGlzdD8uWzBdPy5zaW5nZXI/LlswXT8ubmFtZTtcblx0XHRcdH0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0XHRjYXNlIFwiUVFNdXNpY09sZFwiOiB7XG5cdFx0XHRjb25zdCBzZWFyY2hVcmwgPSB7XG5cdFx0XHRcdFwic2NoZW1lXCI6IFwiaHR0cHNcIixcblx0XHRcdFx0XCJob3N0XCI6IFwiYy55LnFxLmNvbVwiLFxuXHRcdFx0XHRcInBhdGhcIjogXCJzb3NvL2ZjZ2ktYmluL3NlYXJjaF9mb3JfcXFfY3BcIixcblx0XHRcdFx0Ly9cInBhdGhcIjogXCJzb3NvL2ZjZ2ktYmluL2NsaWVudF9zZWFyY2hfY3BcIixcblx0XHRcdFx0XCJxdWVyeVwiOiB7XG5cdFx0XHRcdFx0XCJmb3JtYXRcIjogXCJqc29uXCIsXG5cdFx0XHRcdFx0Ly9cIm91dENoYXJzZXRcIjogJ3V0Zi04Jyxcblx0XHRcdFx0XHQvL1wiY3RcIjogMjQsXG5cdFx0XHRcdFx0Ly9cInFxbXVzaWNfdmVyXCI6IDEyOTgsXG5cdFx0XHRcdFx0XCJwXCI6IDEsXG5cdFx0XHRcdFx0XCJuXCI6IDEsXG5cdFx0XHRcdFx0XCJ3XCI6IGVuY29kZVVSSUNvbXBvbmVudChrZXl3b3JkKSxcblx0XHRcdFx0XHQvL1wia2V5XCI6IGVuY29kZVVSSUNvbXBvbmVudChrZXl3b3JkKSxcblx0XHRcdFx0XHRcInJlbW90ZXBsYWNlXCI6ICd0eHQueXFxLnNvbmcnLFxuXHRcdFx0XHRcdC8vXCJ0XCI6IDAsXG5cdFx0XHRcdFx0Ly9cImFnZ3JcIjogMSxcblx0XHRcdFx0XHQvL1wiY3JcIjogMSxcblx0XHRcdFx0XHQvL1wibG9zc2xlc3NcIjogMCxcblx0XHRcdFx0XHQvL1wiZmxhZ19xY1wiOiAwLFxuXHRcdFx0XHRcdC8vXCJwbGF0Zm9ybVwiOiAneXFxLmpzb24nLFxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCDosIPor5Xkv6Hmga9gLCBgc2VhcmNoVXJsOiAke0pTT04uc3RyaW5naWZ5KHNlYXJjaFVybCl9YCwgXCJcIik7XG5cdFx0XHRzZWFyY2hSZXF1ZXN0LnVybCA9IFVSSS5zdHJpbmdpZnkoc2VhcmNoVXJsKTtcblx0XHRcdHNlYXJjaFJlcXVlc3QuaGVhZGVycy5SZWZlcmVyID0gXCJodHRwczovL2MueS5xcS5jb21cIjtcblx0XHRcdGNvbnN0IHNlYXJjaFJlc3VsdCA9IGF3YWl0ICQuaHR0cC5nZXQoc2VhcmNoUmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYHNlYXJjaFJlc3VsdDogJHtKU09OLnN0cmluZ2lmeShyZXNwb25zZS5ib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0Ym9keSA9IEpTT04ucGFyc2UocmVzcG9uc2UuYm9keSk7XG5cdFx0XHRcdHRyYWNrSW5mby5taWQgPSBib2R5Py5kYXRhPy5zb25nPy5saXN0Py5bMF0/LnNvbmdtaWQ7XG5cdFx0XHRcdHRyYWNrSW5mby50cmFjayA9IGJvZHk/LmRhdGE/LnNvbmc/Lmxpc3Q/LlswXT8uc29uZ25hbWU7XG5cdFx0XHRcdHRyYWNrSW5mby5hbGJ1bSA9IGJvZHk/LmRhdGE/LnNvbmc/Lmxpc3Q/LlswXT8uYWxidW1uYW1lO1xuXHRcdFx0XHR0cmFja0luZm8uYXJ0aXN0ID0gYm9keT8uZGF0YT8uc29uZz8ubGlzdD8uWzBdPy5zaW5nZXI/LlswXT8ubmFtZTtcblx0XHRcdH0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0fTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIFNlYXJjaCBUcmFja2AsIGB0cmFja0luZm86ICR7SlNPTi5zdHJpbmdpZnkodHJhY2tJbmZvKX1gLCBcIlwiKTtcblx0cmV0dXJuIHRyYWNrSW5mbztcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaEx5cmljKHZlbmRvciA9IFwiUVFNdXNpY1wiLCB0cmFja0lkID0gdW5kZWZpbmVkLCBVQVBvb2wgPSBbXSl7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBTZWFyY2ggTHlyaWNgLCBgdmVuZG9yOiAke3ZlbmRvcn0sIHRyYWNrSWQ6ICR7dHJhY2tJZH1gLCBcIlwiKTtcblx0Y29uc3QgbHlyaWNSZXF1ZXN0ID0ge1xuXHRcdFwiaGVhZGVyc1wiOiB7XG5cdFx0XHRcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdFwiVXNlci1BZ2VudFwiOiBVQVBvb2xbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogVUFQb29sLmxlbmd0aCldLCAvLyDpmo/mnLpVQVxuXHRcdH1cblx0fTtcblx0bGV0IGx5cmljUmVzdWx0ID0ge307XG5cdHN3aXRjaCAodmVuZG9yKSB7XG5cdFx0Y2FzZSBcIk5ldGVhc2VNdXNpY05vZGVKU1wiOiB7XG5cdFx0XHRjb25zdCBIb3N0UG9vbCA9IFtcblx0XHRcdFx0XCJhcGkubXVzaWMuYXJlc2NoYW5nLnRvcFwiLFxuXHRcdFx0XHRcIm11LWFwaS55dWswLmNvbVwiLFxuXHRcdFx0XHRcIm5ldGVhc2UuaGFwcHlraW5nLnRvcFwiLFxuXHRcdFx0XHRcIm11c2ljLmxvdmV0aGV3aW5kLmNuXCIsXG5cdFx0XHRcdFwibmV0ZWFzZWNsb3VkbXVzaWNhcGkubmFub2NhdC5jbG91ZFwiXG5cdFx0XHRdO1xuXHRcdFx0Y29uc3QgbHlyaWNVcmwgPSB7XG5cdFx0XHRcdFwic2NoZW1lXCI6IFwiaHR0cHNcIixcblx0XHRcdFx0XCJob3N0XCI6IEhvc3RQb29sW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEhvc3RQb29sLmxlbmd0aCldLFxuXHRcdFx0XHRcInBhdGhcIjogXCJseXJpYy9uZXdcIixcblx0XHRcdFx0XCJxdWVyeVwiOiB7XG5cdFx0XHRcdFx0XCJpZFwiOiB0cmFja0lkIC8vIHRyYWNrSW5mby5OZXRlYXNlTXVzaWMuaWRcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYGx5cmljVXJsOiAke0pTT04uc3RyaW5naWZ5KGx5cmljVXJsKX1gLCBcIlwiKTtcblx0XHRcdGx5cmljUmVxdWVzdC51cmwgPSBVUkkuc3RyaW5naWZ5KGx5cmljVXJsKTtcblx0XHRcdGx5cmljUmVxdWVzdC5oZWFkZXJzLlJlZmVyZXIgPSBcImh0dHBzOi8vbXVzaWMuMTYzLmNvbVwiO1xuXHRcdFx0bHlyaWNSZXN1bHQgPSBhd2FpdCAkLmh0dHAuZ2V0KGx5cmljUmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiBKU09OLnBhcnNlKHJlc3BvbnNlLmJvZHkpKTtcblx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdFx0Y2FzZSBcIk5ldGVhc2VNdXNpY1wiOiB7XG5cdFx0XHRjb25zdCBseXJpY1VybCA9IHtcblx0XHRcdFx0XCJzY2hlbWVcIjogXCJodHRwc1wiLFxuXHRcdFx0XHRcImhvc3RcIjogXCJtdXNpYy4xNjMuY29tXCIsXG5cdFx0XHRcdFwicGF0aFwiOiBcImFwaS9zb25nL21lZGlhXCIsXG5cdFx0XHRcdFwicXVlcnlcIjoge1xuXHRcdFx0XHRcdFwiaWRcIjogdHJhY2tJZCAvLyB0cmFja0luZm8uTmV0ZWFzZU11c2ljLmlkXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIOiwg+ivleS/oeaBr2AsIGBseXJpY1VybDogJHtKU09OLnN0cmluZ2lmeShseXJpY1VybCl9YCwgXCJcIik7XG5cdFx0XHRseXJpY1JlcXVlc3QudXJsID0gVVJJLnN0cmluZ2lmeShseXJpY1VybCk7XG5cdFx0XHRseXJpY1JlcXVlc3QuaGVhZGVycy5SZWZlcmVyID0gXCJodHRwczovL211c2ljLjE2My5jb21cIjtcblx0XHRcdGx5cmljUmVzdWx0ID0gYXdhaXQgJC5odHRwLmdldChseXJpY1JlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5KSk7XG5cdFx0XHRicmVhaztcblx0XHR9O1xuXHRcdGNhc2UgXCJRUU11c2ljXCI6XG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0Y29uc3QgbHlyaWNVcmwgPSB7XG5cdFx0XHRcdFwic2NoZW1lXCI6IFwiaHR0cHNcIixcblx0XHRcdFx0XCJob3N0XCI6IFwiYy55LnFxLmNvbVwiLFxuXHRcdFx0XHRcInBhdGhcIjogXCJseXJpYy9mY2dpLWJpbi9mY2dfcXVlcnlfbHlyaWNfbmV3LmZjZ1wiLFxuXHRcdFx0XHRcInF1ZXJ5XCI6IHtcblx0XHRcdFx0XHRcImdfdGtcIjogXCI1MzgxXCIsXG5cdFx0XHRcdFx0XCJmb3JtYXRcIjogXCJqc29uXCIsXG5cdFx0XHRcdFx0XCJub2Jhc2U2NFwiOiBcIjFcIixcblx0XHRcdFx0XHRcInNvbmdtaWRcIjogdHJhY2tJZCAvLyB0cmFja0luZm8uUVFNdXNpYy5taWRcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYGx5cmljVXJsOiAke0pTT04uc3RyaW5naWZ5KGx5cmljVXJsKX1gLCBcIlwiKTtcblx0XHRcdGx5cmljUmVxdWVzdC51cmwgPSBVUkkuc3RyaW5naWZ5KGx5cmljVXJsKTtcblx0XHRcdGx5cmljUmVxdWVzdC5oZWFkZXJzLlJlZmVyZXIgPSBcImh0dHBzOi8vbHlyaWMubXVzaWMucXEuY29tXCI7XG5cdFx0XHRseXJpY1Jlc3VsdCA9IGF3YWl0ICQuaHR0cC5nZXQobHlyaWNSZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IEpTT04ucGFyc2UocmVzcG9uc2UuYm9keSkpO1xuXHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0fTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIFNlYXJjaCBMeXJpY2AsIFwiXCIpO1xuXHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIFNlYXJjaCBMeXJpY2AsIGBseXJpY1Jlc3VsdDogJHtKU09OLnN0cmluZ2lmeShseXJpY1Jlc3VsdCl9YCwgXCJcIik7XG5cdHJldHVybiBseXJpY1Jlc3VsdDtcbn07XG5cbi8qKlxuICogY29tYmluZSB0d28gdGV4dFxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IG9yaWdpblRleHQgLSBvcmlnaW5hbCB0ZXh0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNUZXh0IC0gdHJhbnNsYXRlIHRleHRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gU2hvd09ubHkgLSBvbmx5IHNob3cgdHJhbnNsYXRlIHRleHRcbiAqIEBwYXJhbSB7U3RyaW5nfSBwb3NpdGlvbiAtIHBvc2l0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZUJyZWFrIC0gbGluZSBicmVha1xuICogQHJldHVybiB7U3RyaW5nfSBjb21iaW5lZCB0ZXh0XG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVUZXh0KG9yaWdpblRleHQsIHRyYW5zVGV4dCwgU2hvd09ubHkgPSBmYWxzZSwgcG9zaXRpb24gPSBcIkZvcndhcmRcIiwgbGluZUJyZWFrID0gXCJcXG5cIikge1xuXHRsZXQgdGV4dCA9IFwiXCI7XG5cdHN3aXRjaCAoU2hvd09ubHkpIHtcblx0XHRjYXNlIHRydWU6XG5cdFx0XHR0ZXh0ID0gdHJhbnNUZXh0O1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBmYWxzZTpcblx0XHRkZWZhdWx0OlxuXHRcdFx0c3dpdGNoIChwb3NpdGlvbikge1xuXHRcdFx0XHRjYXNlIFwiRm9yd2FyZFwiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRleHQgPSBgJHtvcmlnaW5UZXh0fSR7bGluZUJyZWFrfSR7dHJhbnNUZXh0fWA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJSZXZlcnNlXCI6XG5cdFx0XHRcdFx0dGV4dCA9IGAke3RyYW5zVGV4dH0ke2xpbmVCcmVha30ke29yaWdpblRleHR9YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0fVxuXHRyZXR1cm4gdGV4dDtcbn07XG5cbi8qKiBcbiAqIENodW5rIEFycmF5XG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgLSBzb3VyY2VcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggLSBudW1iZXJcbiAqIEByZXR1cm4ge0FycmF5PCo+fSB0YXJnZXRcbiAqL1xuZnVuY3Rpb24gY2h1bmsoc291cmNlLCBsZW5ndGgpIHtcblx0JC5sb2coYOKaoCAkeyQubmFtZX0sIENodW5rIEFycmF5YCwgXCJcIik7XG4gICAgdmFyIGluZGV4ID0gMCwgdGFyZ2V0ID0gW107XG4gICAgd2hpbGUoaW5kZXggPCBzb3VyY2UubGVuZ3RoKSB0YXJnZXQucHVzaChzb3VyY2Uuc2xpY2UoaW5kZXgsIGluZGV4ICs9IGxlbmd0aCkpO1xuXHQvLyQubG9nKGDwn46JICR7JC5uYW1lfSwgQ2h1bmsgQXJyYXlgLCBgdGFyZ2V0OiAke0pTT04uc3RyaW5naWZ5KHRhcmdldCl9YCwgXCJcIik7XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG4vKipcbiAqIFJldHJpZXMgdGhlIGdpdmVuIGZ1bmN0aW9uIHVudGlsIGl0IHN1Y2NlZWRzIGdpdmVuIGEgbnVtYmVyIG9mIHJldHJpZXMgYW5kIGFuIGludGVydmFsIGJldHdlZW4gdGhlbS4gVGhleSBhcmUgc2V0XG4gKiBieSBkZWZhdWx0IHRvIHJldHJ5IDUgdGltZXMgd2l0aCAxc2VjIGluIGJldHdlZW4uIFRoZXJlJ3MgYWxzbyBhIGZsYWcgdG8gbWFrZSB0aGUgY29vbGRvd24gdGltZSBleHBvbmVudGlhbFxuICogQGxpbmsgaHR0cHM6Ly9naXRsYWIuY29tLy0vc25pcHBldHMvMTc3NTc4MVxuICogQGF1dGhvciBEYW5pZWwgScOxaWdvIDxkYW5pZWxpbmlnb2Jhbm9zQGdtYWlsLmNvbT5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gUmV0dXJucyBhIHByb21pc2VcbiAqIEBwYXJhbSB7TnVtYmVyfSByZXRyaWVzTGVmdCAtIE51bWJlciBvZiByZXRyaWVzLiBJZiAtMSB3aWxsIGtlZXAgcmV0cnlpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCAtIE1pbGxpcyBiZXR3ZWVuIHJldHJpZXMuIElmIGV4cG9uZW50aWFsIHNldCB0byB0cnVlIHdpbGwgYmUgZG91YmxlZCBlYWNoIHJldHJ5XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGV4cG9uZW50aWFsIC0gRmxhZyBmb3IgZXhwb25lbnRpYWwgYmFjay1vZmYgbW9kZVxuICogQHJldHVybiB7UHJvbWlzZTwqPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gcmV0cnkoZm4sIHJldHJpZXNMZWZ0ID0gNSwgaW50ZXJ2YWwgPSAxMDAwLCBleHBvbmVudGlhbCA9IGZhbHNlKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCByZXRyeSwg5Ymp5L2Z6YeN6K+V5qyh5pWwOiR7cmV0cmllc0xlZnR9YCwgYOaXtumXtOmXtOmalDoke2ludGVydmFsfW1zYCk7XG5cdHRyeSB7XG5cdFx0Y29uc3QgdmFsID0gYXdhaXQgZm4oKTtcblx0XHRyZXR1cm4gdmFsO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChyZXRyaWVzTGVmdCkge1xuXHRcdFx0YXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIGludGVydmFsKSk7XG5cdFx0XHRyZXR1cm4gcmV0cnkoZm4sIHJldHJpZXNMZWZ0IC0gMSwgZXhwb25lbnRpYWwgPyBpbnRlcnZhbCAqIDIgOiBpbnRlcnZhbCwgZXhwb25lbnRpYWwpO1xuXHRcdH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoYOKdjCAkeyQubmFtZX0sIHJldHJ5LCDmnIDlpKfph43or5XmrKHmlbBgKTtcblx0fVxufTtcblxuLyoqKioqKioqKioqKioqKioqIEVudiAqKioqKioqKioqKioqKioqKi9cbi8vIHByZXR0aWVyLWlnbm9yZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0R1YWxTdWJzL0xSQy9ibG9iL21haW4vTFJDcy5lbWJlZGRlZC5taW4uanNcbmZ1bmN0aW9uIExSQ3Mob3B0cykge1xuXHRyZXR1cm4gbmV3IChjbGFzcyB7XG5cdFx0Y29uc3RydWN0b3Iob3B0cykge1xuXHRcdFx0dGhpcy5uYW1lID0gXCJMUkMgdjAuNC4wXCI7XG5cdFx0XHR0aGlzLm9wdHMgPSBvcHRzO1xuXHRcdFx0dGhpcy5uZXdMaW5lID0gXCJcXG5cIjtcblx0XHR9O1xuXG5cdFx0dG9TcG90aWZ5KHR4dCA9IG5ldyBTdHJpbmcpIHtcblx0XHRcdGNvbnNvbGUubG9nKGDimJHvuI8gJHt0aGlzLm5hbWV9LCBMUkMudG9TcG90aWZ5YCwgXCJcIik7XG5cdFx0XHRsZXQganNvbiA9IHR4dD8uc3BsaXQ/Lih0aGlzLm5ld0xpbmUpPy5maWx0ZXI/LihCb29sZWFuKT8ubWFwPy4obGluZT0+IHtcblx0XHRcdFx0Y29uc3QgTGluZSA9IHtcblx0XHRcdFx0XHRcInN0YXJ0VGltZU1zXCI6IDAsXG5cdFx0XHRcdFx0XCJ3b3Jkc1wiOiBcIlwiLFxuXHRcdFx0XHRcdFwic3lsbGFibGVzXCI6IFtdLFxuXHRcdFx0XHRcdFwiZW5kVGltZU1zXCI6IDBcblx0XHRcdFx0fTtcblx0XHRcdFx0c3dpdGNoIChsaW5lPy50cmltPy4oKT8uc3Vic3RyaW5nPy4oMCwgMSkpIHtcblx0XHRcdFx0XHRjYXNlIFwie1wiOlxuXHRcdFx0XHRcdFx0bGluZSA9IEpTT04ucGFyc2UobGluZSk7XG5cdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYGxpbmU6ICR7SlNPTi5zdHJpbmdpZnkobGluZSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRMaW5lLnN0YXJ0VGltZU1zID0gKGxpbmUudCA8IDApID8gMCA6IGxpbmUudDtcblx0XHRcdFx0XHRcdExpbmUud29yZHMgPSBsaW5lPy5jPy5tYXA/Lih3b3JkID0+IHdvcmQudHgpLmpvaW4oXCJcIik7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiW1wiOlxuXHRcdFx0XHRcdFx0Y29uc3QgTGluZVJlZ2V4ID0gL15cXFsoPzooPzxzdGFydFRpbWVNcz4oXFxkXFxkOlxcZFxcZFxcLlxcZFxcZFxcZD98XFxkKyxcXGQrKSl8KD88dGFnPlxcdys6LiopKVxcXSg/PHdvcmRzPi4qKT8vO1xuXHRcdFx0XHRcdFx0Y29uc3QgU3lsbGFibGVSZWdleCA9IC9cXCgoPzxzdGFydFRpbWVNcz5cXGQrKSxcXGQrLFxcZCtcXCkvZztcblx0XHRcdFx0XHRcdGxpbmUgPSBsaW5lLm1hdGNoKExpbmVSZWdleCk/Lmdyb3Vwcztcblx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCDosIPor5Xkv6Hmga9gLCBgbGluZTogJHtKU09OLnN0cmluZ2lmeShsaW5lKX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdGlmIChsaW5lPy5zdGFydFRpbWVNcz8uaW5jbHVkZXMoXCI6XCIpKSB7XG5cdFx0XHRcdFx0XHRcdExpbmUuc3RhcnRUaW1lTXMgPSAobGluZT8uc3RhcnRUaW1lTXMgPz8gXCIwOjBcIikuc3BsaXQoXCI6XCIpO1xuXHRcdFx0XHRcdFx0XHRMaW5lLnN0YXJ0VGltZU1zID0gTWF0aC5yb3VuZCgocGFyc2VJbnQoTGluZS5zdGFydFRpbWVNc1swXSwgMTApICogNjAgKyBwYXJzZUZsb2F0KExpbmUuc3RhcnRUaW1lTXNbMV0sIDEwKSkgKiAxMDAwKTtcblx0XHRcdFx0XHRcdFx0aWYgKExpbmUuc3RhcnRUaW1lTXMgPCAwKSBMaW5lLnN0YXJ0VGltZU1zID0gMDtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAobGluZT8uc3RhcnRUaW1lTXM/LmluY2x1ZGVzKFwiLFwiKSkgTGluZS5zdGFydFRpbWVNcyA9IHBhcnNlSW50KGxpbmU/LnN0YXJ0VGltZU1zPy5zcGxpdChcIixcIik/LlswXSwgMTApO1xuXHRcdFx0XHRcdFx0aWYgKFN5bGxhYmxlUmVnZXgudGVzdChsaW5lPy53b3JkcykpIHtcblx0XHRcdFx0XHRcdFx0bGV0IGluZGV4ID0gMCwgc3lsbGFibGVzQXJyYXkgPSBbXSwgc3lsbGFibGVzT3JpZ2luQXJyYXkgPSBsaW5lPy53b3Jkcz8uc3BsaXQoU3lsbGFibGVSZWdleCk7XG5cdFx0XHRcdFx0XHRcdHN5bGxhYmxlc09yaWdpbkFycmF5LnNoaWZ0KCk7XG5cdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYHN5bGxhYmxlc09yaWdpbkFycmF5OiAke0pTT04uc3RyaW5naWZ5KHN5bGxhYmxlc09yaWdpbkFycmF5KX1gLCBcIlwiKTtcbiAgICBcdFx0XHRcdFx0XHR3aGlsZShpbmRleCA8IHN5bGxhYmxlc09yaWdpbkFycmF5Lmxlbmd0aCkgc3lsbGFibGVzQXJyYXkucHVzaChzeWxsYWJsZXNPcmlnaW5BcnJheS5zbGljZShpbmRleCwgaW5kZXggKz0gMikpO1xuXHRcdFx0XHRcdFx0XHRzeWxsYWJsZXNBcnJheS5mb3JFYWNoKChzeWxsYWJsZXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRMaW5lLndvcmRzICs9IHN5bGxhYmxlc1sxXTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgc3lsbGFibGUgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcInN0YXJ0VGltZU1zXCI6IHBhcnNlSW50KHN5bGxhYmxlc1swXSwgMTApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJudW1DaGFyc1wiOiBzeWxsYWJsZXNbMV0ubGVuZ3RoXG5cdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRMaW5lLnN5bGxhYmxlcy5wdXNoKHN5bGxhYmxlKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgTGluZS53b3JkcyA9IGxpbmU/LndvcmRzPy5kZWNvZGVIVE1MPy4oKSA/PyBcIlwiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYExpbmU6ICR7SlNPTi5zdHJpbmdpZnkoTGluZSl9YCwgXCJcIik7XG5cdFx0XHRcdHJldHVybiBMaW5lO1xuXHRcdFx0fSk7XG5cdFx0XHRjb25zb2xlLmxvZyhg4pyFICR7dGhpcy5uYW1lfSwgTFJDLnRvU3BvdGlmeSwganNvbjogJHtKU09OLnN0cmluZ2lmeShqc29uKX1gLCBcIlwiKTtcblx0XHRcdHJldHVybiBqc29uO1xuXHRcdH07XG5cblx0XHRmcm9tU3BvdGlmeShqc29uID0gbmV3IEFycmF5KSB7XG5cdFx0XHRjb25zb2xlLmxvZyhg4piR77iPICR7dGhpcy5uYW1lfSwgTFJDLmZyb21TcG90aWZ5YCwgXCJcIik7XG5cdFx0fTtcblxuXHRcdGNvbWJpbmVTcG90aWZ5KGFycmF5MSA9IG5ldyBBcnJheSwgYXJyYXkyID0gbmV3IEFycmF5KSB7XG5cdFx0XHRjb25zb2xlLmxvZyhg4piR77iPICR7dGhpcy5uYW1lfSwgTFJDLmNvbWJpbmVTcG90aWZ5YCwgXCJcIik7XG5cdFx0XHRsZXQgY29tYmluZUx5cmljID0gW107XG5cdFx0XHRmb3IgKGxldCBsaW5lMSBvZiBhcnJheTEpIHtcblx0XHRcdFx0bGV0IGxpbmUgPSBsaW5lMTtcblx0XHRcdFx0Zm9yIChsZXQgbGluZTIgb2YgYXJyYXkyKSB7XG5cdFx0XHRcdFx0aWYgKE1hdGguYWJzKGxpbmUxLnN0YXJ0VGltZU1zIC0gbGluZTIuc3RhcnRUaW1lTXMpIDwgMTAwMCkge1xuXHRcdFx0XHRcdFx0bGluZSA9IHtcblx0XHRcdFx0XHRcdFx0XCJzdGFydFRpbWVNc1wiOiBsaW5lMS5zdGFydFRpbWVNcyxcblx0XHRcdFx0XHRcdFx0XCJ3b3Jkc1wiOiBsaW5lMT8ud29yZHMgPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0XCJ0d29yZHNcIjogbGluZTI/LndvcmRzID8/IFwiXCIsXG5cdFx0XHRcdFx0XHRcdFwic3lsbGFibGVzXCI6IGxpbmUxPy5zeWxsYWJsZXMgPz8gW10sXG5cdFx0XHRcdFx0XHRcdFwiZW5kVGltZU1zXCI6IDBcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjb21iaW5lTHlyaWMucHVzaChsaW5lKTtcblx0XHRcdH07XG5cdFx0XHRjb25zb2xlLmxvZyhg4pyFICR7dGhpcy5uYW1lfSwgTFJDLmNvbWJpbmVTcG90aWZ5LCBjb21iaW5lTHlyaWM6ICR7SlNPTi5zdHJpbmdpZnkoY29tYmluZUx5cmljKX1gLCBcIlwiKTtcblx0XHRcdHJldHVybiBjb21iaW5lTHlyaWM7XG5cdFx0fTtcblxuXHRcdHNlcGFyYXRlU3BvdGlmeShhcnJheSA9IG5ldyBBcnJheSkge1xuXHRcdFx0Y29uc29sZS5sb2coYOKYke+4jyAke3RoaXMubmFtZX0sIExSQy5zZXBhcmF0ZVNwb3RpZnlgLCBcIlwiKTtcblx0XHRcdGxldCBzZXBhcmF0ZUx5cmljID0gYXJyYXkubWFwKGxpbmUgPT4ge1xuXHRcdFx0XHRsZXQgbGluZTEgPSB7XG5cdFx0XHRcdFx0XCJzdGFydFRpbWVNc1wiOiBsaW5lLnN0YXJ0VGltZU1zLFxuXHRcdFx0XHRcdFwid29yZHNcIjogbGluZT8ud29yZHMgPz8gXCJcIixcblx0XHRcdFx0XHRcInN5bGxhYmxlc1wiOiBsaW5lPy5zeWxsYWJsZXMgPz8gW10sXG5cdFx0XHRcdFx0XCJlbmRUaW1lTXNcIjogMFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRsZXQgbGluZTIgPSB7XG5cdFx0XHRcdFx0XCJzdGFydFRpbWVNc1wiOiBsaW5lLnN0YXJ0VGltZU1zICsgMTAwLFxuXHRcdFx0XHRcdFwid29yZHNcIjogbGluZT8udHdvcmRzID8/IFwiXCIsXG5cdFx0XHRcdFx0XCJzeWxsYWJsZXNcIjogW10sXG5cdFx0XHRcdFx0XCJlbmRUaW1lTXNcIjogMFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXR1cm4gW2xpbmUxLCBsaW5lMl07XG5cdFx0XHR9KS5mbGF0KEluZmluaXR5KTtcblx0XHRcdGNvbnNvbGUubG9nKGDinIUgJHt0aGlzLm5hbWV9LCBMUkMuc2VwYXJhdGVTcG90aWZ5LCBzZXBhcmF0ZUx5cmljOiAke0pTT04uc3RyaW5naWZ5KHNlcGFyYXRlTHlyaWMpfWAsIFwiXCIpO1xuXHRcdFx0cmV0dXJuIHNlcGFyYXRlTHlyaWM7XG5cdFx0fTtcblx0fSkob3B0cylcbn07XG5cblN0cmluZy5wcm90b3R5cGUuZGVjb2RlSFRNTCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMucmVwbGFjZSgvJmFwb3M7L2csIFwiJ1wiKVxuXHRcdC5yZXBsYWNlKC8mcXVvdDsvZywgJ1wiJylcblx0XHQucmVwbGFjZSgvJmd0Oy9nLCAnPicpXG5cdFx0LnJlcGxhY2UoLyZsdDsvZywgJzwnKVxuXHRcdC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOViB7XG5cdGNvbnN0cnVjdG9yKG5hbWUsIG9wdHMpIHtcblx0XHR0aGlzLm5hbWUgPSBuYW1lXG5cdFx0dGhpcy5odHRwID0gbmV3IEh0dHAodGhpcylcblx0XHR0aGlzLmRhdGEgPSBudWxsXG5cdFx0dGhpcy5kYXRhRmlsZSA9ICdib3guZGF0J1xuXHRcdHRoaXMubG9ncyA9IFtdXG5cdFx0dGhpcy5pc011dGUgPSBmYWxzZVxuXHRcdHRoaXMuaXNOZWVkUmV3cml0ZSA9IGZhbHNlXG5cdFx0dGhpcy5sb2dTZXBhcmF0b3IgPSAnXFxuJ1xuXHRcdHRoaXMuZW5jb2RpbmcgPSAndXRmLTgnXG5cdFx0dGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgb3B0cylcblx0XHR0aGlzLmxvZygnJywgYPCfj4EgJHt0aGlzLm5hbWV9LCBFTlYgdjEuMS4wLCDlvIDlp4shYClcblx0fVxuXG5cdHBsYXRmb3JtKCkge1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRlbnZpcm9ubWVudCAmJiAkZW52aXJvbm1lbnRbJ3N1cmdlLXZlcnNpb24nXSlcblx0XHRcdHJldHVybiAnU3VyZ2UnXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJGVudmlyb25tZW50ICYmICRlbnZpcm9ubWVudFsnc3Rhc2gtdmVyc2lvbiddKVxuXHRcdFx0cmV0dXJuICdTdGFzaCdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUgJiYgISFtb2R1bGUuZXhwb3J0cykgcmV0dXJuICdOb2RlLmpzJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICR0YXNrKSByZXR1cm4gJ1F1YW50dW11bHQgWCdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAkbG9vbikgcmV0dXJuICdMb29uJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRyb2NrZXQpIHJldHVybiAnU2hhZG93cm9ja2V0J1xuXHR9XG5cblx0aXNOb2RlKCkge1xuXHRcdHJldHVybiAnTm9kZS5qcycgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNRdWFuWCgpIHtcblx0XHRyZXR1cm4gJ1F1YW50dW11bHQgWCcgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNTdXJnZSgpIHtcblx0XHRyZXR1cm4gJ1N1cmdlJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc0xvb24oKSB7XG5cdFx0cmV0dXJuICdMb29uJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1NoYWRvd3JvY2tldCgpIHtcblx0XHRyZXR1cm4gJ1NoYWRvd3JvY2tldCcgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNTdGFzaCgpIHtcblx0XHRyZXR1cm4gJ1N0YXNoJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHR0b09iaihzdHIsIGRlZmF1bHRWYWx1ZSA9IG51bGwpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2Uoc3RyKVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZVxuXHRcdH1cblx0fVxuXG5cdHRvU3RyKG9iaiwgZGVmYXVsdFZhbHVlID0gbnVsbCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZVxuXHRcdH1cblx0fVxuXG5cdGdldGpzb24oa2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRsZXQganNvbiA9IGRlZmF1bHRWYWx1ZVxuXHRcdGNvbnN0IHZhbCA9IHRoaXMuZ2V0ZGF0YShrZXkpXG5cdFx0aWYgKHZhbCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UodGhpcy5nZXRkYXRhKGtleSkpXG5cdFx0XHR9IGNhdGNoIHsgfVxuXHRcdH1cblx0XHRyZXR1cm4ganNvblxuXHR9XG5cblx0c2V0anNvbih2YWwsIGtleSkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRkYXRhKEpTT04uc3RyaW5naWZ5KHZhbCksIGtleSlcblx0XHR9IGNhdGNoIHtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0fVxuXG5cdGdldFNjcmlwdCh1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdHRoaXMuZ2V0KHsgdXJsIH0sIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHJlc29sdmUoYm9keSkpXG5cdFx0fSlcblx0fVxuXG5cdHJ1blNjcmlwdChzY3JpcHQsIHJ1bk9wdHMpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGxldCBodHRwYXBpID0gdGhpcy5nZXRkYXRhKCdAY2hhdnlfYm94anNfdXNlckNmZ3MuaHR0cGFwaScpXG5cdFx0XHRodHRwYXBpID0gaHR0cGFwaSA/IGh0dHBhcGkucmVwbGFjZSgvXFxuL2csICcnKS50cmltKCkgOiBodHRwYXBpXG5cdFx0XHRsZXQgaHR0cGFwaV90aW1lb3V0ID0gdGhpcy5nZXRkYXRhKFxuXHRcdFx0XHQnQGNoYXZ5X2JveGpzX3VzZXJDZmdzLmh0dHBhcGlfdGltZW91dCdcblx0XHRcdClcblx0XHRcdGh0dHBhcGlfdGltZW91dCA9IGh0dHBhcGlfdGltZW91dCA/IGh0dHBhcGlfdGltZW91dCAqIDEgOiAyMFxuXHRcdFx0aHR0cGFwaV90aW1lb3V0ID1cblx0XHRcdFx0cnVuT3B0cyAmJiBydW5PcHRzLnRpbWVvdXQgPyBydW5PcHRzLnRpbWVvdXQgOiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdGNvbnN0IFtrZXksIGFkZHJdID0gaHR0cGFwaS5zcGxpdCgnQCcpXG5cdFx0XHRjb25zdCBvcHRzID0ge1xuXHRcdFx0XHR1cmw6IGBodHRwOi8vJHthZGRyfS92MS9zY3JpcHRpbmcvZXZhbHVhdGVgLFxuXHRcdFx0XHRib2R5OiB7XG5cdFx0XHRcdFx0c2NyaXB0X3RleHQ6IHNjcmlwdCxcblx0XHRcdFx0XHRtb2NrX3R5cGU6ICdjcm9uJyxcblx0XHRcdFx0XHR0aW1lb3V0OiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdFx0fSxcblx0XHRcdFx0aGVhZGVyczogeyAnWC1LZXknOiBrZXksICdBY2NlcHQnOiAnKi8qJyB9LFxuXHRcdFx0XHR0aW1lb3V0OiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdH1cblx0XHRcdHRoaXMucG9zdChvcHRzLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiByZXNvbHZlKGJvZHkpKVxuXHRcdH0pLmNhdGNoKChlKSA9PiB0aGlzLmxvZ0VycihlKSlcblx0fVxuXG5cdGxvYWRkYXRhKCkge1xuXHRcdGlmICh0aGlzLmlzTm9kZSgpKSB7XG5cdFx0XHR0aGlzLmZzID0gdGhpcy5mcyA/IHRoaXMuZnMgOiByZXF1aXJlKCdmcycpXG5cdFx0XHR0aGlzLnBhdGggPSB0aGlzLnBhdGggPyB0aGlzLnBhdGggOiByZXF1aXJlKCdwYXRoJylcblx0XHRcdGNvbnN0IGN1ckRpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKHRoaXMuZGF0YUZpbGUpXG5cdFx0XHRjb25zdCByb290RGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUoXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdHRoaXMuZGF0YUZpbGVcblx0XHRcdClcblx0XHRcdGNvbnN0IGlzQ3VyRGlyRGF0YUZpbGUgPSB0aGlzLmZzLmV4aXN0c1N5bmMoY3VyRGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QgaXNSb290RGlyRGF0YUZpbGUgPVxuXHRcdFx0XHQhaXNDdXJEaXJEYXRhRmlsZSAmJiB0aGlzLmZzLmV4aXN0c1N5bmMocm9vdERpckRhdGFGaWxlUGF0aClcblx0XHRcdGlmIChpc0N1ckRpckRhdGFGaWxlIHx8IGlzUm9vdERpckRhdGFGaWxlKSB7XG5cdFx0XHRcdGNvbnN0IGRhdFBhdGggPSBpc0N1ckRpckRhdGFGaWxlXG5cdFx0XHRcdFx0PyBjdXJEaXJEYXRhRmlsZVBhdGhcblx0XHRcdFx0XHQ6IHJvb3REaXJEYXRhRmlsZVBhdGhcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmZzLnJlYWRGaWxlU3luYyhkYXRQYXRoKSlcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHJldHVybiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgcmV0dXJuIHt9XG5cdFx0fSBlbHNlIHJldHVybiB7fVxuXHR9XG5cblx0d3JpdGVkYXRhKCkge1xuXHRcdGlmICh0aGlzLmlzTm9kZSgpKSB7XG5cdFx0XHR0aGlzLmZzID0gdGhpcy5mcyA/IHRoaXMuZnMgOiByZXF1aXJlKCdmcycpXG5cdFx0XHR0aGlzLnBhdGggPSB0aGlzLnBhdGggPyB0aGlzLnBhdGggOiByZXF1aXJlKCdwYXRoJylcblx0XHRcdGNvbnN0IGN1ckRpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKHRoaXMuZGF0YUZpbGUpXG5cdFx0XHRjb25zdCByb290RGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUoXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdHRoaXMuZGF0YUZpbGVcblx0XHRcdClcblx0XHRcdGNvbnN0IGlzQ3VyRGlyRGF0YUZpbGUgPSB0aGlzLmZzLmV4aXN0c1N5bmMoY3VyRGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QgaXNSb290RGlyRGF0YUZpbGUgPVxuXHRcdFx0XHQhaXNDdXJEaXJEYXRhRmlsZSAmJiB0aGlzLmZzLmV4aXN0c1N5bmMocm9vdERpckRhdGFGaWxlUGF0aClcblx0XHRcdGNvbnN0IGpzb25kYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuXHRcdFx0aWYgKGlzQ3VyRGlyRGF0YUZpbGUpIHtcblx0XHRcdFx0dGhpcy5mcy53cml0ZUZpbGVTeW5jKGN1ckRpckRhdGFGaWxlUGF0aCwganNvbmRhdGEpXG5cdFx0XHR9IGVsc2UgaWYgKGlzUm9vdERpckRhdGFGaWxlKSB7XG5cdFx0XHRcdHRoaXMuZnMud3JpdGVGaWxlU3luYyhyb290RGlyRGF0YUZpbGVQYXRoLCBqc29uZGF0YSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZnMud3JpdGVGaWxlU3luYyhjdXJEaXJEYXRhRmlsZVBhdGgsIGpzb25kYXRhKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvZGFzaF9nZXQoc291cmNlLCBwYXRoLCBkZWZhdWx0VmFsdWUgPSB1bmRlZmluZWQpIHtcblx0XHRjb25zdCBwYXRocyA9IHBhdGgucmVwbGFjZSgvXFxbKFxcZCspXFxdL2csICcuJDEnKS5zcGxpdCgnLicpXG5cdFx0bGV0IHJlc3VsdCA9IHNvdXJjZVxuXHRcdGZvciAoY29uc3QgcCBvZiBwYXRocykge1xuXHRcdFx0cmVzdWx0ID0gT2JqZWN0KHJlc3VsdClbcF1cblx0XHRcdGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXG5cdGxvZGFzaF9zZXQob2JqLCBwYXRoLCB2YWx1ZSkge1xuXHRcdGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSByZXR1cm4gb2JqXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKSBwYXRoID0gcGF0aC50b1N0cmluZygpLm1hdGNoKC9bXi5bXFxdXSsvZykgfHwgW11cblx0XHRwYXRoXG5cdFx0XHQuc2xpY2UoMCwgLTEpXG5cdFx0XHQucmVkdWNlKFxuXHRcdFx0XHQoYSwgYywgaSkgPT5cblx0XHRcdFx0XHRPYmplY3QoYVtjXSkgPT09IGFbY11cblx0XHRcdFx0XHRcdD8gYVtjXVxuXHRcdFx0XHRcdFx0OiAoYVtjXSA9IE1hdGguYWJzKHBhdGhbaSArIDFdKSA+PiAwID09PSArcGF0aFtpICsgMV0gPyBbXSA6IHt9KSxcblx0XHRcdFx0b2JqXG5cdFx0XHQpW3BhdGhbcGF0aC5sZW5ndGggLSAxXV0gPSB2YWx1ZVxuXHRcdHJldHVybiBvYmpcblx0fVxuXG5cdGdldGRhdGEoa2V5KSB7XG5cdFx0bGV0IHZhbCA9IHRoaXMuZ2V0dmFsKGtleSlcblx0XHQvLyDlpoLmnpzku6UgQFxuXHRcdGlmICgvXkAvLnRlc3Qoa2V5KSkge1xuXHRcdFx0Y29uc3QgWywgb2Jqa2V5LCBwYXRoc10gPSAvXkAoLio/KVxcLiguKj8pJC8uZXhlYyhrZXkpXG5cdFx0XHRjb25zdCBvYmp2YWwgPSBvYmprZXkgPyB0aGlzLmdldHZhbChvYmprZXkpIDogJydcblx0XHRcdGlmIChvYmp2YWwpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRjb25zdCBvYmplZHZhbCA9IEpTT04ucGFyc2Uob2JqdmFsKVxuXHRcdFx0XHRcdHZhbCA9IG9iamVkdmFsID8gdGhpcy5sb2Rhc2hfZ2V0KG9iamVkdmFsLCBwYXRocywgJycpIDogdmFsXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHR2YWwgPSAnJ1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB2YWxcblx0fVxuXG5cdHNldGRhdGEodmFsLCBrZXkpIHtcblx0XHRsZXQgaXNzdWMgPSBmYWxzZVxuXHRcdGlmICgvXkAvLnRlc3Qoa2V5KSkge1xuXHRcdFx0Y29uc3QgWywgb2Jqa2V5LCBwYXRoc10gPSAvXkAoLio/KVxcLiguKj8pJC8uZXhlYyhrZXkpXG5cdFx0XHRjb25zdCBvYmpkYXQgPSB0aGlzLmdldHZhbChvYmprZXkpXG5cdFx0XHRjb25zdCBvYmp2YWwgPSBvYmprZXlcblx0XHRcdFx0PyBvYmpkYXQgPT09ICdudWxsJ1xuXHRcdFx0XHRcdD8gbnVsbFxuXHRcdFx0XHRcdDogb2JqZGF0IHx8ICd7fSdcblx0XHRcdFx0OiAne30nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBvYmplZHZhbCA9IEpTT04ucGFyc2Uob2JqdmFsKVxuXHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQob2JqZWR2YWwsIHBhdGhzLCB2YWwpXG5cdFx0XHRcdGlzc3VjID0gdGhpcy5zZXR2YWwoSlNPTi5zdHJpbmdpZnkob2JqZWR2YWwpLCBvYmprZXkpXG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnN0IG9iamVkdmFsID0ge31cblx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KG9iamVkdmFsLCBwYXRocywgdmFsKVxuXHRcdFx0XHRpc3N1YyA9IHRoaXMuc2V0dmFsKEpTT04uc3RyaW5naWZ5KG9iamVkdmFsKSwgb2Jqa2V5KVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpc3N1YyA9IHRoaXMuc2V0dmFsKHZhbCwga2V5KVxuXHRcdH1cblx0XHRyZXR1cm4gaXNzdWNcblx0fVxuXG5cdGdldHZhbChrZXkpIHtcblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRyZXR1cm4gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKGtleSlcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdHJldHVybiAkcHJlZnMudmFsdWVGb3JLZXkoa2V5KVxuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMubG9hZGRhdGEoKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kYXRhW2tleV1cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YVtrZXldKSB8fCBudWxsXG5cdFx0fVxuXHR9XG5cblx0c2V0dmFsKHZhbCwga2V5KSB7XG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0cmV0dXJuICRwZXJzaXN0ZW50U3RvcmUud3JpdGUodmFsLCBrZXkpXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRyZXR1cm4gJHByZWZzLnNldFZhbHVlRm9yS2V5KHZhbCwga2V5KVxuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMubG9hZGRhdGEoKVxuXHRcdFx0XHR0aGlzLmRhdGFba2V5XSA9IHZhbFxuXHRcdFx0XHR0aGlzLndyaXRlZGF0YSgpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGFba2V5XSkgfHwgbnVsbFxuXHRcdH1cblx0fVxuXG5cdGluaXRHb3RFbnYob3B0cykge1xuXHRcdHRoaXMuZ290ID0gdGhpcy5nb3QgPyB0aGlzLmdvdCA6IHJlcXVpcmUoJ2dvdCcpXG5cdFx0dGhpcy5ja3RvdWdoID0gdGhpcy5ja3RvdWdoID8gdGhpcy5ja3RvdWdoIDogcmVxdWlyZSgndG91Z2gtY29va2llJylcblx0XHR0aGlzLmNramFyID0gdGhpcy5ja2phciA/IHRoaXMuY2tqYXIgOiBuZXcgdGhpcy5ja3RvdWdoLkNvb2tpZUphcigpXG5cdFx0aWYgKG9wdHMpIHtcblx0XHRcdG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyA/IG9wdHMuaGVhZGVycyA6IHt9XG5cdFx0XHRpZiAodW5kZWZpbmVkID09PSBvcHRzLmhlYWRlcnMuQ29va2llICYmIHVuZGVmaW5lZCA9PT0gb3B0cy5jb29raWVKYXIpIHtcblx0XHRcdFx0b3B0cy5jb29raWVKYXIgPSB0aGlzLmNramFyXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KHJlcXVlc3QsIGNhbGxiYWNrID0gKCkgPT4geyB9KSB7XG5cdFx0ZGVsZXRlIHJlcXVlc3Q/LmhlYWRlcnM/LlsnQ29udGVudC1MZW5ndGgnXVxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ2NvbnRlbnQtbGVuZ3RoJ11cblxuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZiAodGhpcy5pc1N1cmdlKCkgJiYgdGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdoZWFkZXJzLlgtU3VyZ2UtU2tpcC1TY3JpcHRpbmcnLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0XHQkaHR0cENsaWVudC5nZXQocmVxdWVzdCwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXHRcdFx0XHRcdGlmICghZXJyb3IgJiYgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlLmJvZHkgPSBib2R5XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UsIGJvZHkpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRpZiAodGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdvcHRzLmhpbnRzJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JHRhc2suZmV0Y2gocmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCBib2R5LCBib2R5Qnl0ZXMgfSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZXJyb3IpID0+IGNhbGxiYWNrKChlcnJvciAmJiBlcnJvci5lcnJvcikgfHwgJ1VuZGVmaW5lZEVycm9yJylcblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdGxldCBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKVxuXHRcdFx0XHR0aGlzLmluaXRHb3RFbnYocmVxdWVzdClcblx0XHRcdFx0dGhpcy5nb3QocmVxdWVzdClcblx0XHRcdFx0XHQub24oJ3JlZGlyZWN0JywgKHJlc3BvbnNlLCBuZXh0T3B0cykgPT4ge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNrID0gcmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddXG5cdFx0XHRcdFx0XHRcdFx0XHQubWFwKHRoaXMuY2t0b3VnaC5Db29raWUucGFyc2UpXG5cdFx0XHRcdFx0XHRcdFx0XHQudG9TdHJpbmcoKVxuXHRcdFx0XHRcdFx0XHRcdGlmIChjaykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5ja2phci5zZXRDb29raWVTeW5jKGNrLCBudWxsKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRuZXh0T3B0cy5jb29raWVKYXIgPSB0aGlzLmNramFyXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5sb2dFcnIoZSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIHRoaXMuY2tqYXIuc2V0Q29va2llU3luYyhyZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ10ubWFwKENvb2tpZS5wYXJzZSkudG9TdHJpbmcoKSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKFxuXHRcdFx0XHRcdFx0KHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlOiBzdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRcdHJhd0JvZHlcblx0XHRcdFx0XHRcdFx0fSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGJvZHkgPSBpY29udi5kZWNvZGUocmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0XHR7IHN0YXR1cywgc3RhdHVzQ29kZSwgaGVhZGVycywgcmF3Qm9keSwgYm9keSB9LFxuXHRcdFx0XHRcdFx0XHRcdGJvZHlcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdChlcnIpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgeyBtZXNzYWdlOiBlcnJvciwgcmVzcG9uc2U6IHJlc3BvbnNlIH0gPSBlcnJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UsXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgJiYgaWNvbnYuZGVjb2RlKHJlc3BvbnNlLnJhd0JvZHksIHRoaXMuZW5jb2RpbmcpXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0cG9zdChyZXF1ZXN0LCBjYWxsYmFjayA9ICgpID0+IHsgfSkge1xuXHRcdGNvbnN0IG1ldGhvZCA9IHJlcXVlc3QubWV0aG9kXG5cdFx0XHQ/IHJlcXVlc3QubWV0aG9kLnRvTG9jYWxlTG93ZXJDYXNlKClcblx0XHRcdDogJ3Bvc3QnXG5cblx0XHQvLyDlpoLmnpzmjIflrprkuobor7fmsYLkvZMsIOS9huayoeaMh+WumiBgQ29udGVudC1UeXBlYOOAgWBjb250ZW50LXR5cGVgLCDliJnoh6rliqjnlJ/miJDjgIJcblx0XHRpZiAoXG5cdFx0XHRyZXF1ZXN0LmJvZHkgJiZcblx0XHRcdHJlcXVlc3QuaGVhZGVycyAmJlxuXHRcdFx0IXJlcXVlc3QuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gJiZcblx0XHRcdCFyZXF1ZXN0LmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddXG5cdFx0KSB7XG5cdFx0XHQvLyBIVFRQLzHjgIFIVFRQLzIg6YO95pSv5oyB5bCP5YaZIGhlYWRlcnNcblx0XHRcdHJlcXVlc3QuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuXHRcdH1cblx0XHQvLyDkuLrpgb/lhY3mjIflrprplJnor68gYGNvbnRlbnQtbGVuZ3RoYCDov5nph4zliKDpmaTor6XlsZ7mgKfvvIznlLHlt6Xlhbfnq68gKEh0dHBDbGllbnQpIOi0n+i0o+mHjeaWsOiuoeeul+W5tui1i+WAvFxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ0NvbnRlbnQtTGVuZ3RoJ11cblx0XHRkZWxldGUgcmVxdWVzdD8uaGVhZGVycz8uWydjb250ZW50LWxlbmd0aCddXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmICh0aGlzLmlzU3VyZ2UoKSAmJiB0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ2hlYWRlcnMuWC1TdXJnZS1Ta2lwLVNjcmlwdGluZycsIGZhbHNlKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCRodHRwQ2xpZW50W21ldGhvZF0ocmVxdWVzdCwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXHRcdFx0XHRcdGlmICghZXJyb3IgJiYgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlLmJvZHkgPSBib2R5XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UsIGJvZHkpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRyZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZFxuXHRcdFx0XHRpZiAodGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdvcHRzLmhpbnRzJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JHRhc2suZmV0Y2gocmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCBib2R5LCBib2R5Qnl0ZXMgfSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZXJyb3IpID0+IGNhbGxiYWNrKChlcnJvciAmJiBlcnJvci5lcnJvcikgfHwgJ1VuZGVmaW5lZEVycm9yJylcblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdGxldCBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKVxuXHRcdFx0XHR0aGlzLmluaXRHb3RFbnYocmVxdWVzdClcblx0XHRcdFx0Y29uc3QgeyB1cmwsIC4uLl9yZXF1ZXN0IH0gPSByZXF1ZXN0XG5cdFx0XHRcdHRoaXMuZ290W21ldGhvZF0odXJsLCBfcmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgc3RhdHVzQ29kZTogc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5IH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y29uc3QgYm9keSA9IGljb252LmRlY29kZShyYXdCb2R5LCB0aGlzLmVuY29kaW5nKVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5LCBib2R5IH0sXG5cdFx0XHRcdFx0XHRcdGJvZHlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlcnIpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgbWVzc2FnZTogZXJyb3IsIHJlc3BvbnNlOiByZXNwb25zZSB9ID0gZXJyXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlLFxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSAmJiBpY29udi5kZWNvZGUocmVzcG9uc2UucmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdClcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqIOekuuS+izokLnRpbWUoJ3l5eXktTU0tZGQgcXEgSEg6bW06c3MuUycpXG5cdCAqICAgIDokLnRpbWUoJ3l5eXlNTWRkSEhtbXNzUycpXG5cdCAqICAgIHk65bm0IE065pyIIGQ65pelIHE65a2jIEg65pe2IG065YiGIHM656eSIFM65q+r56eSXG5cdCAqICAgIOWFtuS4rXnlj6/pgIkwLTTkvY3ljaDkvY3nrKbjgIFT5Y+v6YCJMC0x5L2N5Y2g5L2N56ym77yM5YW25L2Z5Y+v6YCJMC0y5L2N5Y2g5L2N56ymXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQg5qC85byP5YyW5Y+C5pWwXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB0cyDlj6/pgIk6IOagueaNruaMh+WumuaXtumXtOaIs+i/lOWbnuagvOW8j+WMluaXpeacn1xuXHQgKlxuXHQgKi9cblx0dGltZShmb3JtYXQsIHRzID0gbnVsbCkge1xuXHRcdGNvbnN0IGRhdGUgPSB0cyA/IG5ldyBEYXRlKHRzKSA6IG5ldyBEYXRlKClcblx0XHRsZXQgbyA9IHtcblx0XHRcdCdNKyc6IGRhdGUuZ2V0TW9udGgoKSArIDEsXG5cdFx0XHQnZCsnOiBkYXRlLmdldERhdGUoKSxcblx0XHRcdCdIKyc6IGRhdGUuZ2V0SG91cnMoKSxcblx0XHRcdCdtKyc6IGRhdGUuZ2V0TWludXRlcygpLFxuXHRcdFx0J3MrJzogZGF0ZS5nZXRTZWNvbmRzKCksXG5cdFx0XHQncSsnOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxuXHRcdFx0J1MnOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG5cdFx0fVxuXHRcdGlmICgvKHkrKS8udGVzdChmb3JtYXQpKVxuXHRcdFx0Zm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXG5cdFx0XHRcdFJlZ0V4cC4kMSxcblx0XHRcdFx0KGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpXG5cdFx0XHQpXG5cdFx0Zm9yIChsZXQgayBpbiBvKVxuXHRcdFx0aWYgKG5ldyBSZWdFeHAoJygnICsgayArICcpJykudGVzdChmb3JtYXQpKVxuXHRcdFx0XHRmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcblx0XHRcdFx0XHRSZWdFeHAuJDEsXG5cdFx0XHRcdFx0UmVnRXhwLiQxLmxlbmd0aCA9PSAxXG5cdFx0XHRcdFx0XHQ/IG9ba11cblx0XHRcdFx0XHRcdDogKCcwMCcgKyBvW2tdKS5zdWJzdHIoKCcnICsgb1trXSkubGVuZ3RoKVxuXHRcdFx0XHQpXG5cdFx0cmV0dXJuIGZvcm1hdFxuXHR9XG5cblx0LyoqXG5cdCAqIOezu+e7n+mAmuefpVxuXHQgKlxuXHQgKiA+IOmAmuefpeWPguaVsDog5ZCM5pe25pSv5oyBIFF1YW5YIOWSjCBMb29uIOS4pOenjeagvOW8jywgRW52SnPmoLnmja7ov5DooYznjq/looPoh6rliqjovazmjaIsIFN1cmdlIOeOr+Wig+S4jeaUr+aMgeWkmuWqkuS9k+mAmuefpVxuXHQgKlxuXHQgKiDnpLrkvos6XG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCAndHdpdHRlcjovLycpXG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCB7ICdvcGVuLXVybCc6ICd0d2l0dGVyOi8vJywgJ21lZGlhLXVybCc6ICdodHRwczovL2dpdGh1Yi5naXRodWJhc3NldHMuY29tL2ltYWdlcy9tb2R1bGVzL29wZW5fZ3JhcGgvZ2l0aHViLW1hcmsucG5nJyB9KVxuXHQgKiAkLm1zZyh0aXRsZSwgc3VidCwgZGVzYywgeyAnb3Blbi11cmwnOiAnaHR0cHM6Ly9iaW5nLmNvbScsICdtZWRpYS11cmwnOiAnaHR0cHM6Ly9naXRodWIuZ2l0aHViYXNzZXRzLmNvbS9pbWFnZXMvbW9kdWxlcy9vcGVuX2dyYXBoL2dpdGh1Yi1tYXJrLnBuZycgfSlcblx0ICpcblx0ICogQHBhcmFtIHsqfSB0aXRsZSDmoIfpophcblx0ICogQHBhcmFtIHsqfSBzdWJ0IOWJr+agh+mimFxuXHQgKiBAcGFyYW0geyp9IGRlc2Mg6YCa55+l6K+m5oOFXG5cdCAqIEBwYXJhbSB7Kn0gb3B0cyDpgJrnn6Xlj4LmlbBcblx0ICpcblx0ICovXG5cdG1zZyh0aXRsZSA9IG5hbWUsIHN1YnQgPSAnJywgZGVzYyA9ICcnLCBvcHRzKSB7XG5cdFx0Y29uc3QgdG9FbnZPcHRzID0gKHJhd29wdHMpID0+IHtcblx0XHRcdHN3aXRjaCAodHlwZW9mIHJhd29wdHMpIHtcblx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0cmV0dXJuIHJhd29wdHNcblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgdXJsOiByYXdvcHRzIH1cblx0XHRcdFx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJhd29wdHNcblx0XHRcdFx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7ICdvcGVuLXVybCc6IHJhd29wdHMgfVxuXHRcdFx0XHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdFx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdGxldCBvcGVuVXJsID1cblx0XHRcdFx0XHRcdFx0XHRyYXdvcHRzLnVybCB8fCByYXdvcHRzLm9wZW5VcmwgfHwgcmF3b3B0c1snb3Blbi11cmwnXVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyB1cmw6IG9wZW5VcmwgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnTG9vbic6IHtcblx0XHRcdFx0XHRcdFx0bGV0IG9wZW5VcmwgPVxuXHRcdFx0XHRcdFx0XHRcdHJhd29wdHMub3BlblVybCB8fCByYXdvcHRzLnVybCB8fCByYXdvcHRzWydvcGVuLXVybCddXG5cdFx0XHRcdFx0XHRcdGxldCBtZWRpYVVybCA9IHJhd29wdHMubWVkaWFVcmwgfHwgcmF3b3B0c1snbWVkaWEtdXJsJ11cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgb3BlblVybCwgbWVkaWFVcmwgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzoge1xuXHRcdFx0XHRcdFx0XHRsZXQgb3BlblVybCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0c1snb3Blbi11cmwnXSB8fCByYXdvcHRzLnVybCB8fCByYXdvcHRzLm9wZW5Vcmxcblx0XHRcdFx0XHRcdFx0bGV0IG1lZGlhVXJsID0gcmF3b3B0c1snbWVkaWEtdXJsJ10gfHwgcmF3b3B0cy5tZWRpYVVybFxuXHRcdFx0XHRcdFx0XHRsZXQgdXBkYXRlUGFzdGVib2FyZCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0c1sndXBkYXRlLXBhc3RlYm9hcmQnXSB8fCByYXdvcHRzLnVwZGF0ZVBhc3RlYm9hcmRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHQnb3Blbi11cmwnOiBvcGVuVXJsLFxuXHRcdFx0XHRcdFx0XHRcdCdtZWRpYS11cmwnOiBtZWRpYVVybCxcblx0XHRcdFx0XHRcdFx0XHQndXBkYXRlLXBhc3RlYm9hcmQnOiB1cGRhdGVQYXN0ZWJvYXJkXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCF0aGlzLmlzTXV0ZSkge1xuXHRcdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdCRub3RpZmljYXRpb24ucG9zdCh0aXRsZSwgc3VidCwgZGVzYywgdG9FbnZPcHRzKG9wdHMpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdFx0JG5vdGlmeSh0aXRsZSwgc3VidCwgZGVzYywgdG9FbnZPcHRzKG9wdHMpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICghdGhpcy5pc011dGVMb2cpIHtcblx0XHRcdGxldCBsb2dzID0gWycnLCAnPT09PT09PT09PT09PT3wn5Oj57O757uf6YCa55+l8J+Toz09PT09PT09PT09PT09J11cblx0XHRcdGxvZ3MucHVzaCh0aXRsZSlcblx0XHRcdHN1YnQgPyBsb2dzLnB1c2goc3VidCkgOiAnJ1xuXHRcdFx0ZGVzYyA/IGxvZ3MucHVzaChkZXNjKSA6ICcnXG5cdFx0XHRjb25zb2xlLmxvZyhsb2dzLmpvaW4oJ1xcbicpKVxuXHRcdFx0dGhpcy5sb2dzID0gdGhpcy5sb2dzLmNvbmNhdChsb2dzKVxuXHRcdH1cblx0fVxuXG5cdGxvZyguLi5sb2dzKSB7XG5cdFx0aWYgKGxvZ3MubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5sb2dzID0gWy4uLnRoaXMubG9ncywgLi4ubG9nc11cblx0XHR9XG5cdFx0Y29uc29sZS5sb2cobG9ncy5qb2luKHRoaXMubG9nU2VwYXJhdG9yKSlcblx0fVxuXG5cdGxvZ0VycihlcnJvcikge1xuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhpcy5sb2coJycsIGDinZfvuI8gJHt0aGlzLm5hbWV9LCDplJnor68hYCwgZXJyb3IpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0dGhpcy5sb2coJycsIGDinZfvuI8ke3RoaXMubmFtZX0sIOmUmeivryFgLCBlcnJvci5zdGFjaylcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHR3YWl0KHRpbWUpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSkpXG5cdH1cblxuXHRkb25lKHZhbCA9IHt9KSB7XG5cdFx0Y29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cdFx0Y29uc3QgY29zdFRpbWUgPSAoZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lKSAvIDEwMDBcblx0XHR0aGlzLmxvZygnJywgYPCfmqkgJHt0aGlzLm5hbWV9LCDnu5PmnZ8hIPCflZsgJHtjb3N0VGltZX0g56eSYClcblx0XHR0aGlzLmxvZygpXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQkZG9uZSh2YWwpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0cHJvY2Vzcy5leGl0KDEpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNcblx0ICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1ZpcmdpbENseW5lL0dldFNvbWVGcmllcy9ibG9iL21haW4vZnVuY3Rpb24vZ2V0RU5WL2dldEVOVi5qc1xuXHQgKiBAYXV0aG9yIFZpcmdpbENseW5lXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSBQZXJzaXN0ZW50IFN0b3JlIEtleVxuXHQgKiBAcGFyYW0ge0FycmF5fSBuYW1lcyAtIFBsYXRmb3JtIE5hbWVzXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhYmFzZSAtIERlZmF1bHQgRGF0YWJhc2Vcblx0ICogQHJldHVybiB7T2JqZWN0fSB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfVxuXHQgKi9cblx0Z2V0RU5WKGtleSwgbmFtZXMsIGRhdGFiYXNlKSB7XG5cdFx0Ly90aGlzLmxvZyhg4piR77iPICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIFwiXCIpO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBCb3hKcyAqKioqKioqKioqKioqKioqKi9cblx0XHQvLyDljIXoo4XkuLrlsYDpg6jlj5jph4/vvIznlKjlrozph4rmlL7lhoXlrZhcblx0XHQvLyBCb3hKc+eahOa4heepuuaTjeS9nOi/lOWbnuWBh+WAvOepuuWtl+espuS4siwg6YC76L6R5oiW5pON5L2c56ym5Lya5Zyo5bem5L6n5pON5L2c5pWw5Li65YGH5YC85pe26L+U5Zue5Y+z5L6n5pON5L2c5pWw44CCXG5cdFx0bGV0IEJveEpzID0gdGhpcy5nZXRqc29uKGtleSwgZGF0YWJhc2UpO1xuXHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYEJveEpz57G75Z6LOiAke3R5cGVvZiBCb3hKc31gLCBgQm94SnPlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQm94SnMpfWAsIFwiXCIpO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBBcmd1bWVudCAqKioqKioqKioqKioqKioqKi9cblx0XHRsZXQgQXJndW1lbnQgPSB7fTtcblx0XHRpZiAodHlwZW9mICRhcmd1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0aWYgKEJvb2xlYW4oJGFyZ3VtZW50KSkge1xuXHRcdFx0XHQvL3RoaXMubG9nKGDwn46JICR7dGhpcy5uYW1lfSwgJEFyZ3VtZW50YCk7XG5cdFx0XHRcdGxldCBhcmcgPSBPYmplY3QuZnJvbUVudHJpZXMoJGFyZ3VtZW50LnNwbGl0KFwiJlwiKS5tYXAoKGl0ZW0pID0+IGl0ZW0uc3BsaXQoXCI9XCIpLm1hcChpID0+IGkucmVwbGFjZSgvXFxcIi9nLCAnJykpKSk7XG5cdFx0XHRcdC8vdGhpcy5sb2coSlNPTi5zdHJpbmdpZnkoYXJnKSk7XG5cdFx0XHRcdGZvciAobGV0IGl0ZW0gaW4gYXJnKSB0aGlzLnNldFBhdGgoQXJndW1lbnQsIGl0ZW0sIGFyZ1tpdGVtXSk7XG5cdFx0XHRcdC8vdGhpcy5sb2coSlNPTi5zdHJpbmdpZnkoQXJndW1lbnQpKTtcblx0XHRcdH07XG5cdFx0XHQvL3RoaXMubG9nKGDinIUgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYEFyZ3VtZW5057G75Z6LOiAke3R5cGVvZiBBcmd1bWVudH1gLCBgQXJndW1lbnTlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQXJndW1lbnQpfWAsIFwiXCIpO1xuXHRcdH07XG5cdFx0LyoqKioqKioqKioqKioqKioqIFN0b3JlICoqKioqKioqKioqKioqKioqL1xuXHRcdGNvbnN0IFN0b3JlID0geyBTZXR0aW5nczogZGF0YWJhc2U/LkRlZmF1bHQ/LlNldHRpbmdzIHx8IHt9LCBDb25maWdzOiBkYXRhYmFzZT8uRGVmYXVsdD8uQ29uZmlncyB8fCB7fSwgQ2FjaGVzOiB7fSB9O1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShuYW1lcykpIG5hbWVzID0gW25hbWVzXTtcblx0XHQvL3RoaXMubG9nKGDwn5qnICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBuYW1lc+exu+WeizogJHt0eXBlb2YgbmFtZXN9YCwgYG5hbWVz5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KG5hbWVzKX1gLCBcIlwiKTtcblx0XHRmb3IgKGxldCBuYW1lIG9mIG5hbWVzKSB7XG5cdFx0XHRTdG9yZS5TZXR0aW5ncyA9IHsgLi4uU3RvcmUuU2V0dGluZ3MsIC4uLmRhdGFiYXNlPy5bbmFtZV0/LlNldHRpbmdzLCAuLi5Bcmd1bWVudCwgLi4uQm94SnM/LltuYW1lXT8uU2V0dGluZ3MgfTtcblx0XHRcdFN0b3JlLkNvbmZpZ3MgPSB7IC4uLlN0b3JlLkNvbmZpZ3MsIC4uLmRhdGFiYXNlPy5bbmFtZV0/LkNvbmZpZ3MgfTtcblx0XHRcdGlmIChCb3hKcz8uW25hbWVdPy5DYWNoZXMgJiYgdHlwZW9mIEJveEpzPy5bbmFtZV0/LkNhY2hlcyA9PT0gXCJzdHJpbmdcIikgQm94SnNbbmFtZV0uQ2FjaGVzID0gSlNPTi5wYXJzZShCb3hKcz8uW25hbWVdPy5DYWNoZXMpO1xuXHRcdFx0U3RvcmUuQ2FjaGVzID0geyAuLi5TdG9yZS5DYWNoZXMsIC4uLkJveEpzPy5bbmFtZV0/LkNhY2hlcyB9O1xuXHRcdH07XG5cdFx0Ly90aGlzLmxvZyhg8J+apyAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgU3RvcmUuU2V0dGluZ3Pnsbvlnos6ICR7dHlwZW9mIFN0b3JlLlNldHRpbmdzfWAsIGBTdG9yZS5TZXR0aW5nczogJHtKU09OLnN0cmluZ2lmeShTdG9yZS5TZXR0aW5ncyl9YCwgXCJcIik7XG5cdFx0dGhpcy50cmF2ZXJzZU9iamVjdChTdG9yZS5TZXR0aW5ncywgKGtleSwgdmFsdWUpID0+IHtcblx0XHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCB0cmF2ZXJzZU9iamVjdGAsIGAke2tleX06ICR7dHlwZW9mIHZhbHVlfWAsIGAke2tleX06ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWAsIFwiXCIpO1xuXHRcdFx0aWYgKHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpOyAvLyDlrZfnrKbkuLLovaxCb29sZWFuXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0aWYgKHZhbHVlLmluY2x1ZGVzKFwiLFwiKSkgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIixcIikubWFwKGl0ZW0gPT4gdGhpcy5zdHJpbmcybnVtYmVyKGl0ZW0pKTsgLy8g5a2X56ym5Liy6L2s5pWw57uE6L2s5pWw5a2XXG5cdFx0XHRcdGVsc2UgdmFsdWUgPSB0aGlzLnN0cmluZzJudW1iZXIodmFsdWUpOyAvLyDlrZfnrKbkuLLovazmlbDlrZdcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fSk7XG5cdFx0Ly90aGlzLmxvZyhg4pyFICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBTdG9yZTogJHt0eXBlb2YgU3RvcmUuQ2FjaGVzfWAsIGBTdG9yZeWGheWuuTogJHtKU09OLnN0cmluZ2lmeShTdG9yZSl9YCwgXCJcIik7XG5cdFx0cmV0dXJuIFN0b3JlO1xuXHR9O1xuXG5cdC8qKioqKioqKioqKioqKioqKiBmdW5jdGlvbiAqKioqKioqKioqKioqKioqKi9cblx0c2V0UGF0aChvYmplY3QsIHBhdGgsIHZhbHVlKSB7IHBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgobywgcCwgaSkgPT4gb1twXSA9IHBhdGguc3BsaXQoXCIuXCIpLmxlbmd0aCA9PT0gKytpID8gdmFsdWUgOiBvW3BdIHx8IHt9LCBvYmplY3QpIH1cblx0dHJhdmVyc2VPYmplY3QobywgYykgeyBmb3IgKHZhciB0IGluIG8pIHsgdmFyIG4gPSBvW3RdOyBvW3RdID0gXCJvYmplY3RcIiA9PSB0eXBlb2YgbiAmJiBudWxsICE9PSBuID8gdGhpcy50cmF2ZXJzZU9iamVjdChuLCBjKSA6IGModCwgbikgfSByZXR1cm4gbyB9XG5cdHN0cmluZzJudW1iZXIoc3RyaW5nKSB7IGlmIChzdHJpbmcgJiYgIWlzTmFOKHN0cmluZykpIHN0cmluZyA9IHBhcnNlSW50KHN0cmluZywgMTApOyByZXR1cm4gc3RyaW5nIH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0dHAge1xuXHRjb25zdHJ1Y3RvcihlbnYpIHtcblx0XHR0aGlzLmVudiA9IGVudlxuXHR9XG5cblx0c2VuZChvcHRzLCBtZXRob2QgPSAnR0VUJykge1xuXHRcdG9wdHMgPSB0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycgPyB7IHVybDogb3B0cyB9IDogb3B0c1xuXHRcdGxldCBzZW5kZXIgPSB0aGlzLmdldFxuXHRcdGlmIChtZXRob2QgPT09ICdQT1NUJykge1xuXHRcdFx0c2VuZGVyID0gdGhpcy5wb3N0XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRzZW5kZXIuY2FsbCh0aGlzLCBvcHRzLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG5cdFx0XHRcdGlmIChlcnJvcikgcmVqZWN0KGVycm9yKVxuXHRcdFx0XHRlbHNlIHJlc29sdmUocmVzcG9uc2UpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRnZXQob3B0cykge1xuXHRcdHJldHVybiB0aGlzLnNlbmQuY2FsbCh0aGlzLmVudiwgb3B0cylcblx0fVxuXG5cdHBvc3Qob3B0cykge1xuXHRcdHJldHVybiB0aGlzLnNlbmQuY2FsbCh0aGlzLmVudiwgb3B0cywgJ1BPU1QnKVxuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVUkkge1xuXHRjb25zdHJ1Y3RvcihvcHRzID0gW10pIHtcblx0XHR0aGlzLm5hbWUgPSBcIlVSSSB2MS4yLjZcIjtcblx0XHR0aGlzLm9wdHMgPSBvcHRzO1xuXHRcdHRoaXMuanNvbiA9IHsgc2NoZW1lOiBcIlwiLCBob3N0OiBcIlwiLCBwYXRoOiBcIlwiLCBxdWVyeToge30gfTtcblx0fTtcblxuXHRwYXJzZSh1cmwpIHtcblx0XHRjb25zdCBVUkxSZWdleCA9IC8oPzooPzxzY2hlbWU+LispOlxcL1xcLyg/PGhvc3Q+W14vXSspKT9cXC8/KD88cGF0aD5bXj9dKyk/XFw/Pyg/PHF1ZXJ5PlteP10rKT8vO1xuXHRcdGxldCBqc29uID0gdXJsLm1hdGNoKFVSTFJlZ2V4KT8uZ3JvdXBzID8/IG51bGw7XG5cdFx0aWYgKGpzb24/LnBhdGgpIGpzb24ucGF0aHMgPSBqc29uLnBhdGguc3BsaXQoXCIvXCIpOyBlbHNlIGpzb24ucGF0aCA9IFwiXCI7XG5cdFx0Ly9pZiAoanNvbj8ucGF0aHM/LmF0KC0xKT8uaW5jbHVkZXMoXCIuXCIpKSBqc29uLmZvcm1hdCA9IGpzb24ucGF0aHMuYXQoLTEpLnNwbGl0KFwiLlwiKS5hdCgtMSk7XG5cdFx0aWYgKGpzb24/LnBhdGhzKSB7XG5cdFx0XHRjb25zdCBmaWxlTmFtZSA9IGpzb24ucGF0aHNbanNvbi5wYXRocy5sZW5ndGggLSAxXTtcblx0XHRcdGlmIChmaWxlTmFtZT8uaW5jbHVkZXMoXCIuXCIpKSB7XG5cdFx0XHRcdGNvbnN0IGxpc3QgPSBmaWxlTmFtZS5zcGxpdChcIi5cIik7XG5cdFx0XHRcdGpzb24uZm9ybWF0ID0gbGlzdFtsaXN0Lmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoanNvbj8ucXVlcnkpIGpzb24ucXVlcnkgPSBPYmplY3QuZnJvbUVudHJpZXMoanNvbi5xdWVyeS5zcGxpdChcIiZcIikubWFwKChwYXJhbSkgPT4gcGFyYW0uc3BsaXQoXCI9XCIpKSk7XG5cdFx0cmV0dXJuIGpzb25cblx0fTtcblxuXHRzdHJpbmdpZnkoanNvbiA9IHRoaXMuanNvbikge1xuXHRcdGxldCB1cmwgPSBcIlwiO1xuXHRcdGlmIChqc29uPy5zY2hlbWUgJiYganNvbj8uaG9zdCkgdXJsICs9IGpzb24uc2NoZW1lICsgXCI6Ly9cIiArIGpzb24uaG9zdDtcblx0XHRpZiAoanNvbj8ucGF0aCkgdXJsICs9IChqc29uPy5ob3N0KSA/IFwiL1wiICsganNvbi5wYXRoIDoganNvbi5wYXRoO1xuXHRcdGlmIChqc29uPy5xdWVyeSkgdXJsICs9IFwiP1wiICsgT2JqZWN0LmVudHJpZXMoanNvbi5xdWVyeSkubWFwKHBhcmFtID0+IHBhcmFtLmpvaW4oXCI9XCIpKS5qb2luKFwiJlwiKTtcblx0XHRyZXR1cm4gdXJsXG5cdH07XG59XG4iLCIvKipcbiAqIGRldGVjdCBGb3JtYXRcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7T2JqZWN0fSB1cmwgLSBQYXJzZWQgVVJMXG4gKiBAcGFyYW0ge1N0cmluZ30gYm9keSAtIHJlc3BvbnNlIGJvZHlcbiAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0IC0gZm9ybWF0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGVjdEZvcm1hdCh1cmwsIGJvZHkpIHtcblx0bGV0IGZvcm1hdCA9IHVuZGVmaW5lZDtcblx0Y29uc29sZS5sb2coYOKYke+4jyBkZXRlY3RGb3JtYXQsIGZvcm1hdDogJHt1cmwuZm9ybWF0ID8/IHVybC5xdWVyeT8uZm10ID8/IHVybC5xdWVyeT8uZm9ybWF0fWAsIFwiXCIpO1xuXHRzd2l0Y2ggKHVybC5mb3JtYXQgPz8gdXJsLnF1ZXJ5Py5mbXQgPz8gdXJsLnF1ZXJ5Py5mb3JtYXQpIHtcblx0XHRjYXNlIFwidHh0XCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQvcGxhaW5cIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ4bWxcIjpcblx0XHRjYXNlIFwic3J2M1wiOlxuXHRcdGNhc2UgXCJ0dG1sXCI6XG5cdFx0Y2FzZSBcInR0bWwyXCI6XG5cdFx0Y2FzZSBcImltc2NcIjpcblx0XHRcdGZvcm1hdCA9IFwidGV4dC94bWxcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ2dHRcIjpcblx0XHRjYXNlIFwid2VidnR0XCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQvdnR0XCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwianNvblwiOlxuXHRcdGNhc2UgXCJqc29uM1wiOlxuXHRcdFx0Zm9ybWF0ID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwibTN1XCI6XG5cdFx0Y2FzZSBcIm0zdThcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24veC1tcGVndXJsXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwicGxpc3RcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vcGxpc3RcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0Y29uc3QgSEVBREVSID0gYm9keT8uc3Vic3RyaW5nPy4oMCwgNikudHJpbT8uKCk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGDwn5qnIGRldGVjdEZvcm1hdCwgSEVBREVSOiAke0hFQURFUn1gLCBcIlwiKTtcblx0XHRcdC8vY29uc29sZS5sb2coYPCfmqcgZGV0ZWN0Rm9ybWF0LCBIRUFERVI/LnN1YnN0cmluZz8uKDAsIDEpOiAke0hFQURFUj8uc3Vic3RyaW5nPy4oMCwgMSl9YCwgXCJcIik7XG5cdFx0XHRzd2l0Y2ggKEhFQURFUikge1xuXHRcdFx0XHRjYXNlIFwiPD94bWxcIjpcblx0XHRcdFx0XHRmb3JtYXQgPSBcInRleHQveG1sXCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJXRUJWVFRcIjpcblx0XHRcdFx0XHRmb3JtYXQgPSBcInRleHQvdnR0XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0c3dpdGNoIChIRUFERVI/LnN1YnN0cmluZz8uKDAsIDEpKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwiMFwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjFcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCIyXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiM1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjRcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI1XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiNlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjdcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI4XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiOVwiOlxuXHRcdFx0XHRcdFx0XHRmb3JtYXQgPSBcInRleHQvdnR0XCI7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIntcIjpcblx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRicmVhaztcblx0fTtcblx0Y29uc29sZS5sb2coYOKchSBkZXRlY3RGb3JtYXQsIGZvcm1hdDogJHtmb3JtYXR9YCwgXCJcIik7XG5cdHJldHVybiBmb3JtYXQ7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGV0ZWN0UGxhdGZvcm0odXJsKSB7XG5cdGNvbnNvbGUubG9nKGDimJHvuI8gRGV0ZWN0IFBsYXRmb3JtYCwgXCJcIik7XG5cdC8qKioqKioqKioqKioqKioqKiBQbGF0Zm9ybSAqKioqKioqKioqKioqKioqKi9cblx0bGV0IFBsYXRmb3JtID0gL1xcLihuZXRmbGl4XFwuY29tfG5mbHh2aWRlb1xcLm5ldCkvaS50ZXN0KHVybCkgPyBcIk5ldGZsaXhcIlxuXHRcdDogLyhcXC55b3V0dWJlfHlvdXR1YmVpXFwuZ29vZ2xlYXBpcylcXC5jb20vaS50ZXN0KHVybCkgPyBcIllvdVR1YmVcIlxuXHRcdFx0OiAvXFwuc3BvdGlmeShjZG4pP1xcLmNvbS9pLnRlc3QodXJsKSA/IFwiU3BvdGlmeVwiXG5cdFx0XHRcdDogL1xcLmFwcGxlXFwuY29tL2kudGVzdCh1cmwpID8gXCJBcHBsZVwiXG5cdFx0XHRcdFx0OiAvXFwuKGRzc290dHxzdGFyb3R0KVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiRGlzbmV5K1wiXG5cdFx0XHRcdFx0XHQ6IC8oXFwuKHB2LWNkbnxhaXYtY2RufGFrYW1haWhkfGNsb3VkZnJvbnQpXFwubmV0KXxzM1xcLmFtYXpvbmF3c1xcLmNvbVxcL2Fpdi1wcm9kLXRpbWVkdGV4dFxcLy9pLnRlc3QodXJsKSA/IFwiUHJpbWVWaWRlb1wiXG5cdFx0XHRcdFx0XHRcdDogL3ByZFxcLm1lZGlhXFwuaDI2NFxcLmlvL2kudGVzdCh1cmwpID8gXCJNYXhcIlxuXHRcdFx0XHRcdFx0XHRcdDogL1xcLihhcGlcXC5oYm98aGJvbWF4Y2RuKVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiSEJPTWF4XCJcblx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLihodWx1c3RyZWFtfGh1bHVpbSlcXC5jb20vaS50ZXN0KHVybCkgPyBcIkh1bHVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC4oY2JzYWF2aWRlb3xjYnNpdmlkZW98Y2JzKVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiUGFyYW1vdW50K1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwudXBseW5rXFwuY29tL2kudGVzdCh1cmwpID8gXCJEaXNjb3ZlcnkrXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL2RwbHVzLXBoLS9pLnRlc3QodXJsKSA/IFwiRGlzY292ZXJ5K1BoXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwucGVhY29ja3R2XFwuY29tL2kudGVzdCh1cmwpID8gXCJQZWFjb2NrVFZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLmZ1Ym9cXC50di9pLnRlc3QodXJsKSA/IFwiRnVib1RWXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLnZpa2lcXC5pby9pLnRlc3QodXJsKSA/IFwiVmlraVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogLyhlcGl4aGxzXFwuYWthbWFpemVkXFwubmV0fGVwaXhcXC5zZXJ2aWNlc1xcLmlvKS9pLnRlc3QodXJsKSA/IFwiTUdNK1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwubmVidWxhXFwuYXBwfC9pLnRlc3QodXJsKSA/IFwiTmVidWxhXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogXCJVbml2ZXJzYWxcIjtcbiAgICBjb25zb2xlLmxvZyhg4pyFIERldGVjdCBQbGF0Zm9ybSwgUGxhdGZvcm06ICR7UGxhdGZvcm19YCwgXCJcIik7XG5cdHJldHVybiBQbGF0Zm9ybTtcbn07XG4iLCIvKlxuUkVBRE1FOiBodHRwczovL2dpdGh1Yi5jb20vRHVhbFN1YnNcbiovXG5cbmltcG9ydCBFTlZzIGZyb20gXCIuLi9FTlYvRU5WLm1qc1wiO1xuY29uc3QgJCA9IG5ldyBFTlZzKFwi8J+Nv++4jyBEdWFsU3ViczogU2V0IEVudmlyb25tZW50IFZhcmlhYmxlc1wiKTtcblxuLyoqXG4gKiBTZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBlcnNpc3RlbnQgU3RvcmUgS2V5XG4gKiBAcGFyYW0ge0FycmF5fSBwbGF0Zm9ybXMgLSBQbGF0Zm9ybSBOYW1lc1xuICogQHBhcmFtIHtPYmplY3R9IGRhdGFiYXNlIC0gRGVmYXVsdCBEYXRhQmFzZVxuICogQHJldHVybiB7T2JqZWN0fSB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRFTlYobmFtZSwgcGxhdGZvcm1zLCBkYXRhYmFzZSkge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfWAsIFwiXCIpO1xuXHRsZXQgeyBTZXR0aW5ncywgQ2FjaGVzLCBDb25maWdzIH0gPSAkLmdldEVOVihuYW1lLCBwbGF0Zm9ybXMsIGRhdGFiYXNlKTtcblx0LyoqKioqKioqKioqKioqKioqIFNldHRpbmdzICoqKioqKioqKioqKioqKioqL1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoU2V0dGluZ3M/LlR5cGVzKSkgU2V0dGluZ3MuVHlwZXMgPSAoU2V0dGluZ3MuVHlwZXMpID8gW1NldHRpbmdzLlR5cGVzXSA6IFtdOyAvLyDlj6rmnInkuIDkuKrpgInpobnml7bvvIzml6DpgJflj7fliIbpmpRcblx0aWYgKCQuaXNMb29uKCkgJiYgcGxhdGZvcm1zLmluY2x1ZGVzKFwiWW91VHViZVwiKSkge1xuXHRcdFNldHRpbmdzLkF1dG9DQyA9ICRwZXJzaXN0ZW50U3RvcmUucmVhZChcIuiHquWKqOaYvuekuue/u+ivkeWtl+W5lVwiKSA/PyBTZXR0aW5ncy5BdXRvQ0M7XG5cdFx0c3dpdGNoIChTZXR0aW5ncy5BdXRvQ0MpIHtcblx0XHRcdGNhc2UgXCLmmK9cIjpcblx0XHRcdFx0U2V0dGluZ3MuQXV0b0NDID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwi5ZCmXCI6XG5cdFx0XHRcdFNldHRpbmdzLkF1dG9DQyA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdFx0U2V0dGluZ3MuU2hvd09ubHkgPSAkcGVyc2lzdGVudFN0b3JlLnJlYWQoXCLku4XovpPlh7ror5HmlodcIikgPz8gU2V0dGluZ3MuU2hvd09ubHk7XG5cdFx0c3dpdGNoIChTZXR0aW5ncy5TaG93T25seSkge1xuXHRcdFx0Y2FzZSBcIuaYr1wiOlxuXHRcdFx0XHRTZXR0aW5ncy5TaG93T25seSA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIuWQplwiOlxuXHRcdFx0XHRTZXR0aW5ncy5TaG93T25seSA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdFx0U2V0dGluZ3MuUG9zaXRpb24gPSAkcGVyc2lzdGVudFN0b3JlLnJlYWQoXCLlrZfluZXor5HmlofkvY3nva5cIikgPz8gU2V0dGluZ3MuUG9zaXRpb247XG5cdFx0c3dpdGNoIChTZXR0aW5ncy5Qb3NpdGlvbikge1xuXHRcdFx0Y2FzZSBcIuivkeaWh+S9jeS6juWkluaWh+S5i+S4ilwiOlxuXHRcdFx0XHRTZXR0aW5ncy5Qb3NpdGlvbiA9IFwiRm9yd2FyZFwiO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCLor5HmlofkvY3kuo7lpJbmlofkuYvkuItcIjpcblx0XHRcdFx0U2V0dGluZ3MuUG9zaXRpb24gPSBcIlJldmVyc2VcIjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHR9O1xuXHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgU2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBTZXR0aW5nczogJHt0eXBlb2YgU2V0dGluZ3N9YCwgYFNldHRpbmdz5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KFNldHRpbmdzKX1gLCBcIlwiKTtcblx0LyoqKioqKioqKioqKioqKioqIENhY2hlcyAqKioqKioqKioqKioqKioqKi9cblx0Ly8kLmxvZyhg4pyFICR7JC5uYW1lfSwgU2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBDYWNoZXM6ICR7dHlwZW9mIENhY2hlc31gLCBgQ2FjaGVz5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KENhY2hlcyl9YCwgXCJcIik7XG5cdGlmICh0eXBlb2YgQ2FjaGVzPy5QbGF5bGlzdHMgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShDYWNoZXM/LlBsYXlsaXN0cykpIENhY2hlcy5QbGF5bGlzdHMgPSB7fTsgLy8g5Yib5bu6UGxheWxpc3Rz57yT5a2YXG5cdENhY2hlcy5QbGF5bGlzdHMuTWFzdGVyID0gbmV3IE1hcChKU09OLnBhcnNlKENhY2hlcz8uUGxheWxpc3RzPy5NYXN0ZXIgfHwgXCJbXVwiKSk7IC8vIFN0cmluZ3PovaxBcnJheei9rE1hcFxuXHRDYWNoZXMuUGxheWxpc3RzLlN1YnRpdGxlID0gbmV3IE1hcChKU09OLnBhcnNlKENhY2hlcz8uUGxheWxpc3RzPy5TdWJ0aXRsZSB8fCBcIltdXCIpKTsgLy8gU3RyaW5nc+i9rEFycmF56L2sTWFwXG5cdGlmICh0eXBlb2YgQ2FjaGVzPy5TdWJ0aXRsZXMgIT09IFwib2JqZWN0XCIpIENhY2hlcy5TdWJ0aXRsZXMgPSBuZXcgTWFwKEpTT04ucGFyc2UoQ2FjaGVzPy5TdWJ0aXRsZXMgfHwgXCJbXVwiKSk7IC8vIFN0cmluZ3PovaxBcnJheei9rE1hcFxuXHRpZiAodHlwZW9mIENhY2hlcz8uTWV0YWRhdGFzICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkoQ2FjaGVzPy5NZXRhZGF0YXMpKSBDYWNoZXMuTWV0YWRhdGFzID0ge307IC8vIOWIm+W7ulBsYXlsaXN0c+e8k+WtmFxuXHRpZiAodHlwZW9mIENhY2hlcz8uTWV0YWRhdGFzPy5UcmFja3MgIT09IFwib2JqZWN0XCIpIENhY2hlcy5NZXRhZGF0YXMuVHJhY2tzID0gbmV3IE1hcChKU09OLnBhcnNlKENhY2hlcz8uTWV0YWRhdGFzPy5UcmFja3MgfHwgXCJbXVwiKSk7IC8vIFN0cmluZ3PovaxBcnJheei9rE1hcFxuXHQvKioqKioqKioqKioqKioqKiogQ29uZmlncyAqKioqKioqKioqKioqKioqKi9cblx0cmV0dXJuIHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL0x5cmljcy5FeHRlcm5hbC5yZXNwb25zZS5iZXRhLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9