/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Subtitles.Translate.response.beta.js":
/*!**************************************************!*\
  !*** ./src/Subtitles.Translate.response.beta.js ***!
  \**************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

var _database_Database_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ENV/ENV.mjs */ "./src/ENV/ENV.mjs");
/* harmony import */ var _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./URI/URI.mjs */ "./src/URI/URI.mjs");
/* harmony import */ var _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./XML/XML.mjs */ "./src/XML/XML.mjs");
/* harmony import */ var _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WebVTT/WebVTT.mjs */ "./src/WebVTT/WebVTT.mjs");
/* harmony import */ var _function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function/setENV.mjs */ "./src/function/setENV.mjs");
/* harmony import */ var _function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./function/detectPlatform.mjs */ "./src/function/detectPlatform.mjs");
/* harmony import */ var _function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./function/detectFormat.mjs */ "./src/function/detectFormat.mjs");
/* harmony import */ var _database_Database_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./database/Database.json */ "./src/database/Database.json");
/* module decorator */ module = __webpack_require__.hmd(module);
/*
README: https://github.com/DualSubs
*/












const $ = new _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("🍿️ DualSubs: 🔣 Universal v1.2.6(2) Translator.response.beta");
const URI = new _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]();
const XML = new _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]();
const VTT = new _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_3__["default"](["milliseconds", "timeStamp", "singleLine", "\n"]); // "multiLine"

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ ${$.name}`, `URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, "");
// 获取平台
const PLATFORM = (0,_function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_5__["default"])(HOST);
$.log(`⚠ ${$.name}, PLATFORM: ${PLATFORM}`, "");
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = (0,_function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_6__["default"])(URL, $response?.body);
$.log(`⚠ ${$.name}, FORMAT: ${FORMAT}`, "");
(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = (0,_function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__["default"])("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Translate", "API"], /*#__PURE__*/ (_database_Database_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache || (_database_Database_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache = __webpack_require__.t(_database_Database_json__WEBPACK_IMPORTED_MODULE_7__, 2))));
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = URL.query?.subtype ?? Settings.Type, Languages = [URL.query?.lang?.toUpperCase?.() ?? Settings.Languages[0], (URL.query?.tlang ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ ${$.name}, Type: ${Type}, Languages: ${Languages}`, "");
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
				case "application/x-plist": {
					body = XML.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					const breakLine = (body?.tt) ? "<br/>" : (body?.timedtext) ? "&#x000A;" : "&#x000A;";
					if (body?.timedtext?.head?.wp?.[1]?.["@rc"]) body.timedtext.head.wp[1]["@rc"] = "1";
					let paragraph = body?.tt?.body?.div?.p ?? body?.timedtext?.body?.p;
					let fullText = [];
					paragraph = paragraph.map(para => {
						if (para?.s) {
							if (Array.isArray(para.s)) para["#"] = para.s.map(seg => seg["#"]).join(" ");
							else para["#"] = para.s?.["#"] ?? "";
							delete para.s;
						};
						const span = para?.span ?? para;
						if (Array.isArray(span)) sentences = span?.map(span => span?.["#"]).join(breakLine);
						else sentences = span?.["#"];
						fullText.push(sentences ?? "\u200b");
						/*
						const spans = para?.span ?? para?.s ?? para;
						if (Array.isArray(span)) spans["#"] = spans?.map(span => span?.["#"] ?? "").join(" ");
						else spans["#"] = spans?.["#"] ?? "";
						if (para?.s) para = spans;
						if (spans?.["#"]) fullText.push(spans["#"]);
						*/
						return para;
					});
					const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
					paragraph = paragraph.map((para, i) => {
						const span = para?.span ?? para;
						if (Array.isArray(span)) translation?.[i]?.split(breakLine).forEach((text, j) => {
							if (span[j]?.["#"]) span[j]["#"] = combineText(span[j]["#"], text, Settings?.ShowOnly, Settings?.Position, ' ');
							//else if (span[j + 1]?.["#"]) span[j + 1]["#"] = combineText(span[j + 1]["#"], text, Settings?.ShowOnly, Settings?.Position, ' ');
						});
						else if (span?.["#"]) span["#"] = combineText(span["#"], translation?.[i], Settings?.ShowOnly, Settings?.Position, breakLine);
						return para;
					});
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					$response.body = XML.stringify(body);
					break;
				};
				case "text/vtt":
				case "application/vtt": {
					body = VTT.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					let fullText = body?.body.map(item => (item?.text ?? "\u200b")?.replace(/<\/?[^<>]+>/g, ""));
					const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
					body.body = body.body.map((item, i) => {
						item.text = combineText(item?.text ?? "\u200b", translation?.[i], Settings?.ShowOnly, Settings?.Position);
						return item
					});
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					$response.body = VTT.stringify(body);
					break;
				};
				case "text/json":
				case "application/json": {
					body = JSON.parse($response.body ?? "{}");
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					switch (PLATFORM) {
						case "YouTube": {
							if (body?.events) {
								let fullText = [];
								body.events = body.events.map(event => {
									if (event?.segs?.[0]?.utf8) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join("") }];
									fullText.push(event?.segs?.[0]?.utf8 ?? "\u200b");
									delete event.wWinId;
									return event;
								});
								const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
								body.events = body.events.map((event, i) => {
									if (event?.segs?.[0]?.utf8) event.segs[0].utf8 = combineText(event.segs[0].utf8, translation?.[i], Settings?.ShowOnly, Settings?.Position);
									return event;
								});
							} else if (body?.contents?.sectionListRenderer?.contents) {
								let musicDescriptions = body.contents.sectionListRenderer.contents;
								musicDescriptions = await Promise.all(musicDescriptions.map(async musicDescription => {
									if (musicDescription?.musicDescriptionShelfRenderer?.description?.runs) {
										let lyrics = musicDescription.musicDescriptionShelfRenderer.description.runs;
										lyrics = await Promise.all(lyrics.map(async run => {
											let fullText = run?.text?.split?.("\n")?.map(text => text?.trim() ?? "\u200b");
											const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
											fullText = fullText.map((line, i) => { if (line) return combineText(line, translation?.[i], Settings?.ShowOnly, Settings?.Position, "\n  └ ") });
											run.text = fullText.join("\n");
											return run;
										}));
									};
									return musicDescription;
								}));
							};
							break;
						};
						case "Spotify": {
							Languages[0] = (body?.lyrics?.language === "z1") ? "ZH-HANT"
								: (body?.lyrics?.language) ? body?.lyrics?.language.toUpperCase()
									: "AUTO";
							let fullText = body.lyrics.lines.map(line => line?.words ?? "\u200b");
							const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
							$.log(`🚧 ${$.name}, 调试信息`, `$request.headers["app-platform"]: ${$request?.headers?.["app-platform"]}`, "");
							switch ($request?.headers?.["app-platform"] ?? $request?.headers?.["App-Platform"]) {
								case "OSX": // macOS App 暂不支持翻译功能
								case "Win32_x86_64": // Windows App 暂不支持翻译功能
								case "WebPlayer": // Web App
								case undefined:
								default:
									/*
									body.lyrics.lines = body.lyrics.lines.map((line, i) => {
										if (line?.words) line.words = combineText(line.words, translation?.[i], Settings?.ShowOnly, Settings?.Position);
										return line;
									});
									*/
									body.lyrics.lines = body.lyrics.lines.map((line, i) => {
										let line1 = {
											"startTimeMs": line.startTimeMs.toString(),
											"words": line?.words ?? "",
											"syllables": [],
											"endTimeMs": "0"
										};
										let line2 = {
											"startTimeMs": (line.startTimeMs + 100).toString(),
											"words": translation?.[i] ?? "",
											"syllables": [],
											"endTimeMs": "0"
										};
										return [line1, line2];
									}).flat(Infinity);
									//break; 不中断，继续处理
								case "iOS":
									if (!body?.lyrics?.alternatives) body.lyrics.alternatives = [];
									body.lyrics.alternatives.unshift({
										"language": Languages[1].toLowerCase(),
										"lines": translation
									});
									break;
							};
							break;
						};
					};
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					$response.body = JSON.stringify(body);
					break;
				};
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
									class Browse$Type extends MessageType {
										constructor() {
											super("Browse", [
												{ no: 1, name: "context", kind: "message", jsonName: "responseContext", T: () => Context },
												{ no: 9, name: "contents", kind: "message", T: () => Contents },
												{ no: 10, name: "continuationContents", kind: "message", T: () => Contents },
												{ no: 777, name: "frameworkUpdates", kind: "message", T: () => FrameworkUpdates }
											]);
										}
									}
									const Browse = new Browse$Type();
									class Context$Type extends MessageType {
										constructor() {
											super("Context", [
												{ no: 6, name: "serviceTrackingParams", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ServiceTrackingParams }
											]);
										}
									}
									const Context = new Context$Type();
									class Contents$Type extends MessageType {
										constructor() {
											super("Contents", [
												{ no: 49399797, name: "sectionListRenderer", kind: "message", T: () => SectionListRenderer },
												{ no: 50195462, name: "n4F50195462", kind: "message", T: () => n4F50195462 },
												{ no: 58173949, name: "singleColumnBrowseResultsRenderer", kind: "message", T: () => SingleColumnBrowseResultsRenderer },
												{ no: 90823135, name: "musicSideAlignedItemRenderer", kind: "message", T: () => MusicSideAlignedItemRenderer },
												{ no: 91303872, name: "gridRenderer", kind: "message", T: () => GridRenderer },
												{ no: 153515154, name: "n6F153515154", kind: "message", T: () => n6F153515154 },
												{ no: 221496734, name: "musicDescriptionShelfRenderer", kind: "message", T: () => MusicDescriptionShelfRenderer }
											]);
										}
									}
									const Contents = new Contents$Type();
									class ServiceTrackingParams$Type extends MessageType {
										constructor() {
											super("ServiceTrackingParams", [
												{ no: 2, name: "params", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } }
											]);
										}
									}
									const ServiceTrackingParams = new ServiceTrackingParams$Type();
									class SingleColumnBrowseResultsRenderer$Type extends MessageType {
										constructor() {
											super("SingleColumnBrowseResultsRenderer", [
												{ no: 1, name: "tabs", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Tabs }
											]);
										}
									}
									const SingleColumnBrowseResultsRenderer = new SingleColumnBrowseResultsRenderer$Type();
									class MusicSideAlignedItemRenderer$Type extends MessageType {
										constructor() {
											super("MusicSideAlignedItemRenderer", [
												{ no: 1, name: "startItems", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Contents }
											]);
										}
									}
									const MusicSideAlignedItemRenderer = new MusicSideAlignedItemRenderer$Type();
									class GridRenderer$Type extends MessageType {
										constructor() {
											super("GridRenderer", [
												{ no: 1, name: "items", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Contents }
											]);
										}
									}
									const GridRenderer = new GridRenderer$Type();
									class Tabs$Type extends MessageType {
										constructor() {
											super("Tabs", [
												{ no: 58174010, name: "tabRenderer", kind: "message", T: () => TabRenderer }
											]);
										}
									}
									const Tabs = new Tabs$Type();
									class TabRenderer$Type extends MessageType {
										constructor() {
											super("TabRenderer", [
												{ no: 2, name: "title", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
												{ no: 3, name: "selected", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
												{ no: 4, name: "content", kind: "message", T: () => Contents },
												{ no: 11, name: "tabIdentifier", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const TabRenderer = new TabRenderer$Type();
									class SectionListRenderer$Type extends MessageType {
										constructor() {
											super("SectionListRenderer", [
												{ no: 1, name: "contents", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Contents },
												{ no: 6, name: "header", kind: "message", T: () => Contents }
											]);
										}
									}
									const SectionListRenderer = new SectionListRenderer$Type();
									class n4F50195462$Type extends MessageType {
										constructor() {
											super("n4F50195462", [
												{ no: 1, name: "n5F1", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Contents }
											]);
										}
									}
									const n4F50195462 = new n4F50195462$Type();
									class MusicDescriptionShelfRenderer$Type extends MessageType {
										constructor() {
											super("MusicDescriptionShelfRenderer", [
												{ no: 3, name: "description", kind: "message", T: () => Description },
												{ no: 10, name: "footer", kind: "message", T: () => Footer }
											]);
										}
									}
									const MusicDescriptionShelfRenderer = new MusicDescriptionShelfRenderer$Type();
									class Description$Type extends MessageType {
										constructor() {
											super("Description", [
												{ no: 1, name: "runs", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Runs }
											]);
										}
									}
									const Description = new Description$Type();
									class n6F153515154$Type extends MessageType {
										constructor() {
											super("n6F153515154", [
												{ no: 172660663, name: "n7F172660663", kind: "message", T: () => n7F172660663 }
											]);
										}
									}
									const n6F153515154 = new n6F153515154$Type();
									class n7F172660663$Type extends MessageType {
										constructor() {
											super("n7F172660663", [
												{ no: 1, name: "n8F1", kind: "message", T: () => n8F1 }
											]);
										}
									}
									const n7F172660663 = new n7F172660663$Type();
									class Footer$Type extends MessageType {
										constructor() {
											super("Footer", [
												{ no: 1, name: "runs", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Runs }
											]);
										}
									}
									const Footer = new Footer$Type();
									class n8F1$Type extends MessageType {
										constructor() {
											super("n8F1", [
												{ no: 168777401, name: "n9F168777401", kind: "message", T: () => n9F168777401 }
											]);
										}
									}
									const n8F1 = new n8F1$Type();
									class n9F168777401$Type extends MessageType {
										constructor() {
											super("n9F168777401", [
												{ no: 5, name: "n10F5", kind: "message", T: () => n10F5 }
											]);
										}
									}
									const n9F168777401 = new n9F168777401$Type();
									class n10F5$Type extends MessageType {
										constructor() {
											super("n10F5", [
												{ no: 465160965, name: "n11F465160965", kind: "message", T: () => n11F465160965 }
											]);
										}
									}
									const n10F5 = new n10F5$Type();
									class n11F465160965$Type extends MessageType {
										constructor() {
											super("n11F465160965", [
												{ no: 4, name: "n12F4", kind: "message", T: () => n12F4 }
											]);
										}
									}
									const n11F465160965 = new n11F465160965$Type();
									class n12F4$Type extends MessageType {
										constructor() {
											super("n12F4", [
												{ no: 1, name: "n13F1", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => n13F1 },
												{ no: 2, name: "originText", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const n12F4 = new n12F4$Type();
									class n13F1$Type extends MessageType {
										constructor() {
											super("n13F1", [
												{ no: 1, name: "f1", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const n13F1 = new n13F1$Type();
									class n11F172035250$Type extends MessageType {
										constructor() {
											super("n11F172035250", [
												{ no: 1, name: "type", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const n11F172035250 = new n11F172035250$Type();
									class Runs$Type extends MessageType {
										constructor() {
											super("Runs", [
												{ no: 1, name: "text", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const Runs = new Runs$Type();
									class FrameworkUpdates$Type extends MessageType {
										constructor() {
											super("FrameworkUpdates", [
												{ no: 1, name: "entityBatchUpdate", kind: "message", T: () => EntityBatchUpdate }
											]);
										}
									}
									const FrameworkUpdates = new FrameworkUpdates$Type();
									class EntityBatchUpdate$Type extends MessageType {
										constructor() {
											super("EntityBatchUpdate", [
												{ no: 1, name: "mutations", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Mutations }
											]);
										}
									}
									const EntityBatchUpdate = new EntityBatchUpdate$Type();
									class Mutations$Type extends MessageType {
										constructor() {
											super("Mutations", [
												{ no: 1, name: "entityKey", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 3, name: "payload", kind: "message", T: () => Payload }
											]);
										}
									}
									const Mutations = new Mutations$Type();
									class Payload$Type extends MessageType {
										constructor() {
											super("Payload", [
												{ no: 144, name: "musicForm", kind: "message", T: () => MusicForm },
												{ no: 145, name: "musicFormBooleanChoice", kind: "message", T: () => MusicFormBooleanChoice }
											]);
										}
									}
									const Payload = new Payload$Type();
									class MusicForm$Type extends MessageType {
										constructor() {
											super("MusicForm", [
												{ no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 2, name: "booleanChoiceEntityKeys", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const MusicForm = new MusicForm$Type();
									class MusicFormBooleanChoice$Type extends MessageType {
										constructor() {
											super("musicFormBooleanChoice", [
												{ no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 2, name: "booleanChoiceEntityKey", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 3, name: "selected", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
												{ no: 4, name: "opaqueToken", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const MusicFormBooleanChoice = new MusicFormBooleanChoice$Type();
									/******************  initialization finish  *******************/
									body = Browse.fromBinary(rawBody);
									//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
									$.log(`🚧 ${$.name}`, `contents: ${JSON.stringify(body?.contents)}`, "");
									$.log(`🚧 ${$.name}`, `continuationContents: ${JSON.stringify(body?.continuationContents)}`, "");
									let UF = UnknownFieldHandler.list(body);
									//$.log(`🚧 ${$.name}`, `UF: ${JSON.stringify(UF)}`, "");
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
									Languages[0] = "AUTO";
									if (body?.contents?.n6F153515154?.n7F172660663?.n8F1?.n9F168777401?.n10F5?.n11F465160965?.n12F4?.n13F1) {
										let fullText = body.contents.n6F153515154.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1.map(line => line?.f1 ?? "\u200b");
										const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
										body.contents.n6F153515154.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1 = body.contents.n6F153515154.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1.map((line, i) => {
											if (line?.f1) line.f1 = combineText(line.f1, translation?.[i], Settings?.ShowOnly, Settings?.Position);
											return line;
										});
									} else if (body?.contents?.sectionListRenderer?.contents) {
										let musicDescriptions = body.contents.sectionListRenderer.contents;
										musicDescriptions = await Promise.all(musicDescriptions.map(async musicDescription => {
											if (musicDescription?.musicDescriptionShelfRenderer?.description?.runs) {
												let lyrics = musicDescription.musicDescriptionShelfRenderer.description.runs;
												lyrics = await Promise.all(lyrics.map(async run => {
													let fullText = run?.text?.split?.("\n")?.map(text => text?.trim() ?? "\u200b");
													const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
													fullText = fullText.map((line, i) => { if (line) return combineText(line, translation?.[i], Settings?.ShowOnly, Settings?.Position, "\n  └ ") });
													run.text = fullText.join("\n");
													return run;
												}));
											};
											return musicDescription;
										}));
									};
									//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
									$.log(`🚧 ${$.name}`, `contents: ${JSON.stringify(body?.contents)}`, "");
									$.log(`🚧 ${$.name}`, `continuationContents: ${JSON.stringify(body?.continuationContents)}`, "");
									rawBody = Browse.toBinary(body);
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
									//$.log(`🚧 ${$.name}`, `UF: ${JSON.stringify(UF)}`, "");
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
									Languages[0] = (body?.lyrics?.language === "z1") ? "ZH-HANT"
										: (body?.lyrics?.language) ? body?.lyrics?.language.toUpperCase()
											: "AUTO";
									let fullText = body.lyrics.lines.map(line => line?.words ?? "\u200b");
									const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
									/*
									body.lyrics.alternatives = [{
										"language": Languages[1].toLowerCase(),
										"lines": translation
									}];
									*/
									if (!body?.lyrics?.alternatives) body.lyrics.alternatives = [];
									body.lyrics.alternatives.unshift({
										"language": Languages[1].toLowerCase(),
										"lines": translation
									});
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
					if ($.isQuanX()) $response.bodyBytes = rawBody
					else $response.body = rawBody;
					break;
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
 * Translate
 * @author VirgilClyne
 * @param {Array} text - full text
 * @param {String} method - method
 * @param {String} vendor - translate service vendor
 * @param {String} source - source language
 * @param {String} target - target language
 * @param {Object} api - translate service API
 * @param {Object} database - languages database
 * @param {Number} times - retry times
 * @param {Number} interval - retry interval
 * @param {Boolean} exponential - retry Exponential
 * 
 * @return {Promise<*>}
 */
async function Translate(text = [], method = "Part", vendor = "Google", source = "EN", target = "ZH", API = {}, database = {}, times = 3, interval = 100, exponential = true) {
	$.log(`☑️ ${$.name}, Translate, method: ${method}, vendor: ${vendor}, source: ${source}, target: ${target}`, "");
	// 翻译长度设置
	let length = 127;
	switch (vendor) {
		case "Google":
		case "GoogleCloud":
		default:
			length = 120;
			break;
		case "Microsoft":
		case "Azure":
			length = 99;
			break;
		case "DeepL":
			length = 49;
			break;
		case "DeepLX":
			length = 20;
			break;
	};
	let Translation = [];
	switch (method) {
		default:
		case "Part": // Part 逐段翻译
			let parts = chunk(text, length);
			Translation = await Promise.all(parts.map(async part => await retry(() => Translator(vendor, source, target, part, API, database), times, interval, exponential))).then(part => part.flat(Infinity));
			break;
		case "Row": // Row 逐行翻译
			Translation = await Promise.all(text.map(async row => await retry(() => Translator(vendor, source, target, row, API, database), times, interval, exponential)));
			break;
	};
	//$.log(`✅ ${$.name}, Translate, Translation: ${JSON.stringify(Translation)}`, "");
	$.log(`✅ ${$.name}, Translate`, "");
	return Translation;
};

/**
 * Translator
 * @author VirgilClyne
 * @param {String} vendor - vendor
 * @param {String} source - source
 * @param {String} target - target
 * @param {String} text - text
 * @param {Object} api - API
 * @param {Object} database - Languages Database
 * @return {Promise<*>}
 */
async function Translator(vendor = "Google", source = "", target = "", text = "", api = {}, database = {}) {
	$.log(`☑️ ${$.name}, Translator`, `orig: ${text}`, "");
	// 转换语言代码
	switch (vendor) {
		case "Google":
		case "GoogleCloud":
			source = database.Google[source] ?? database.Google[source?.split?.(/[-_]/)?.[0]];
			target = database.Google[target] ?? database.Google[source?.split?.(/[-_]/)?.[0]];
			break;
		case "Bing":
		case "Microsoft":
		case "Azure":
			source = database.Microsoft[source] ?? database.Microsoft[source?.split?.(/[-_]/)?.[0]];
			target = database.Microsoft[target] ?? database.Microsoft[source?.split?.(/[-_]/)?.[0]];
			break;
		case "DeepL":
		case "DeepLX":
			source = database.DeepL[source] ?? database.DeepL[source?.split?.(/[-_]/)?.[0]];
			target = database.DeepL[target] ?? database.DeepL[source?.split?.(/[-_]/)?.[0]];
			break;
		case "BaiduFanyi":
			source = database.Baidu[source] ?? database.Baidu[source?.split?.(/[-_]/)?.[0]];
			target = database.Baidu[target] ?? database.Baidu[source?.split?.(/[-_]/)?.[0]];
		case "YoudaoAI":
			source = database.Youdao[source] ?? database.Youdao[source?.split?.(/[-_]/)?.[0]];
			target = database.Youdao[target] ?? database.Youdao[source?.split?.(/[-_]/)?.[0]];
			break;
	};
	// 构造请求
	let request = await GetRequest(vendor, source, target, text);
	// 发送请求
	let trans = await GetData(vendor, request);
	$.log(`🚧 ${$.name}, Translator`, `trans: ${trans}`, "");
	return trans
	/***************** Fuctions *****************/
	// Get Translate Request
	async function GetRequest(vendor = "", source = "", target = "", text = "") {
		$.log(`☑️ ${$.name}, Get Translate Request`, "");
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
		let request = {};
		let BaseURL = "";
		let texts = "";
		switch (vendor) {
			default:
			case "Google":
				const BaseRequest = [
					{ // Google API
						"url": "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t",
						"headers": {
							"Accept": "*/*",
							"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)], // 随机UA
							"Referer": "https://translate.google.com"
						}
					},
					{ // Google Dictionary Chrome extension https://chrome.google.com/webstore/detail/google-dictionary-by-goog/mgijmajocgfcbeboacabfgobmjgjcoja
						"url": "https://clients5.google.com/translate_a/t?client=dict-chrome-ex",
						"headers": {
							"Accept": "*/*",
							"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)] // 随机UA
						}
					},
					{ // Google Translate App
						"url": "https://translate.google.com/translate_a/single?client=it&dt=qca&dt=t&dt=rmt&dt=bd&dt=rms&dt=sos&dt=md&dt=gt&dt=ld&dt=ss&dt=ex&otf=2&dj=1&hl=en&ie=UTF-8&oe=UTF-8",
						"headers": {
							"Accept": "*/*",
							"User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)",
						}
					},
					{ // Google Translate App
						"url": "https://translate.googleapis.com/translate_a/single?client=gtx&dj=1&source=bubble&dt=t&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at",
						"headers": {
							"Accept": "*/*",
							"User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)",
						}
					}
				]
				request = BaseRequest[Math.floor(Math.random() * (BaseRequest.length - 2))] // 随机Request, 排除最后两项
				text = (Array.isArray(text)) ? text.join("\r") : text;
				request.url = request.url + `&sl=${source}&tl=${target}&q=${encodeURIComponent(text)}`;
				break;
			case "GoogleCloud":
				BaseURL = "https://translation.googleapis.com";
				switch (api?.Version) {
					case "v2":
					default:
						request.url = `${BaseURL}/language/translate/v2`;
						request.headers = {
							//"Authorization": `Bearer ${api?.Token ?? api?.Auth}`,
							"User-Agent": "DualSubs",
							"Content-Type": "application/json; charset=utf-8"
						};
						request.body = JSON.stringify({
							"q": text,
							"source": source,
							"target": target,
							"format": "html",
							//"key": api?.Key
						});
						switch (api?.Mode) {
							case "Token":
								request.headers.Authorization = `Bearer ${api?.Token ?? api?.Auth}`;
								break;
							case "Key":
							default:
								request.url += `?key=${api?.Key ?? api?.Auth}`;
								break;
						};
						break;
					case "v3":
						request.url = `${BaseURL}/v3/projects/${api?.ID}`;
						request.headers = {
							"Authorization": `Bearer ${api?.Token ?? api?.Auth}`,
							"x-goog-user-project": api?.ID,
							"User-Agent": "DualSubs",
							"Content-Type": "application/json; charset=utf-8"
						};
						request.body = JSON.stringify({
							"sourceLanguageCode": source,
							"targetLanguageCode": target,
							"contents": (Array.isArray(text)) ? text : [text],
							"mimeType": "text/html"
						});
						break;
				}
				break;
			case "Bing":
				// https://github.com/Animenosekai/translate/blob/main/translatepy/translators/bing.py
				switch (api?.Version) {
					case "Bing":
					default:
						BaseURL = "https://www.bing.com/ttranslatev3?IG=839D27F8277F4AA3B0EDB83C255D0D70&IID=translator.5033.3";
						break;
					case "BingCN":
						BaseURL = "https://cn.bing.com/ttranslatev3?IG=25FEE7A7C7C14533BBFD66AC5125C49E&IID=translator.5025.1";
						break;
				};
				request.url = `${BaseURL}`;
				request.headers = {
					"Accept": "*/*",
					"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)], // 随机UA
					"Content-type": "application/x-www-form-urlencoded",
					"Refer": "https://www.bing.com/",
				};
				request.body = JSON.stringify({
					"fromLang": "auto-detect",
					//"text": '%s' % trans,
					"text": text,
					//"from": source,
					"to": target
				});
				break;
			case "Microsoft":
			case "Azure":
				// https://docs.microsoft.com/zh-cn/azure/cognitive-services/translator/
				// https://docs.azure.cn/zh-cn/cognitive-services/translator/
				switch (api?.Version) {
					case "Azure":
					default:
						BaseURL = "https://api.cognitive.microsofttranslator.com";
						break;
					case "AzureCN":
						BaseURL = "https://api.translator.azure.cn";
						break;
					case "AzureUS":
						BaseURL = "https://api.cognitive.microsofttranslator.us";
						break;
				};
				request.url = `${BaseURL}/translate?api-version=3.0&textType=html&${(source) ? `from=${source}` : ""}&to=${target}`;
				request.headers = {
					"Content-Type": "application/json; charset=UTF-8",
					"Accept": "application/json, text/javascript, */*; q=0.01",
					"Accept-Language": "zh-hans"
					//"Authorization": `Bearer ${api?.Auth}`,
					//"Ocp-Apim-Subscription-Key": api?.Auth,
					//"Ocp-Apim-Subscription-Region": api?.Region, // chinanorth, chinaeast2
					//"X-ClientTraceId": uuidv4().toString()
				};
				switch (api?.Mode) {
					case "Token":
					default:
						request.headers.Authorization = `Bearer ${api?.Token ?? api?.Auth}`;
						break;
					case "Key":
						request.headers["Ocp-Apim-Subscription-Key"] = api?.Key ?? api?.Auth;
						request.headers["Ocp-Apim-Subscription-Region"] = api?.Region;
						break;
				};
				text = (Array.isArray(text)) ? text : [text];
				texts = await Promise.all(text?.map(async item => { return { "text": item } }))
				request.body = JSON.stringify(texts);
				/*
				request.body = JSON.stringify([{
					"text": text
				}]);
				*/
				break;
			case "DeepL": {
				switch (api?.Version) {
					case "Free":
					default:
						BaseURL = "https://api-free.deepl.com";
						break;
					case "Pro":
						BaseURL = "https://api.deepl.com";
						break;
				};
				request.url = `${BaseURL}/v2/translate`;
				request.headers = {
					//"Accept": "*/*",
					"User-Agent": "DualSubs",
					"Content-Type": "application/json",
					"Authorization": `DeepL-Auth-Key ${api?.Token ?? api?.Auth}`
				};
				//const BaseBody = `auth_key=${api?.Key ?? api?.Auth}&source_lang=${source}&target_lang=${target}&tag_handling=html`;
				//text = (Array.isArray(text)) ? text : [text];
				//texts = await Promise.all(text?.map(async item => `&text=${encodeURIComponent(item)}`))
				//request.body = BaseBody + texts.join("");
				let body = {
					"text": (Array.isArray(text)) ? text : [text],
					//"source_lang": source,
					"target_lang": target,
					"tag_handling": "html"
				};
				if (source) body.source_lang = source;
				request.body = JSON.stringify(body);
				break;
			}
			case "DeepLX": {
				BaseURL = api?.Endpoint;
				request.url = BaseURL;
				request.headers = {
					"Accept": "*/*",
					"User-Agent": "DualSubs",
					"Content-Type": "application/json"
				};
				if (api?.Token) request.headers.Authorization = `Bearer ${api?.Token ?? api?.Auth}`;
				request.body = JSON.stringify({
					"text": (Array.isArray(text)) ? text.join("||") : text,
					"source_lang": source,
					"target_lang": target,
				});
				break;
			}
			case "BaiduFanyi":
				// https://fanyi-api.baidu.com/doc/24
				BaseURL = "https://fanyi-api.baidu.com";
				request.url = `${BaseURL}/api/trans/vip/language`;
				request.headers = {
					"User-Agent": "DualSubs",
					"Content-Type": "application/x-www-form-urlencoded"
				};
				request.body = {
					"q": text,
					"from": source,
					"to": target,
					"appid": api?.Key,
					"salt": uuidv4().toString(),
					"sign": "",
				};
				break;
			case "YoudaoAI":
				// https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html
				BaseURL = "https://openapi.youdao.com";
				request.url = `${BaseURL}/api`;
				request.headers = {
					"User-Agent": "DualSubs",
					"Content-Type": "application/json; charset=utf-8"
				};
				request.body = {
					"q": text,
					"from": source,
					"to": target,
					"appKey": api?.Key,
					"salt": uuidv4().toString(),
					"signType": "v3",
					"sign": "",
					"curtime": Math.floor(+new Date() / 1000)
				};
				break;
		}
		$.log(`✅ ${$.name}, Get Translate Request`, `request: ${JSON.stringify(request)}`, "");
		return request
	};
	// Get Translate Data
	async function GetData(vendor, request) {
		$.log(`☑️ ${$.name}, Get Translate Data`, "");
		let texts = [];
		await Fetch(request)
			.then(response => JSON.parse(response.body))
			.then(_data => {
				switch (vendor) {
					case "Google":
					default:
						if (Array.isArray(_data)) {
							if (Array.isArray(_data?.[0])) {
								if (_data.length === 1) {
									_data[0].pop();
									texts = _data[0];
								} else texts = _data?.[0]?.map(item => item?.[0] ?? `翻译失败, vendor: ${vendor}`);
							} else texts = _data;
							/*
							if (_data.length === 1) {
								if (Array.isArray(_data?.[0])) {
									_data[0].pop();
									texts = _data[0];
								} else texts = _data;
							} else if (Array.isArray(_data?.[0])) texts = _data?.[0]?.map(item => item?.[0] ?? `翻译失败, vendor: ${vendor}`);
							else texts = _data;
							*/
						} else if (_data?.sentences) texts = _data?.sentences?.map(item => item?.trans ?? `翻译失败, vendor: ${vendor}`);
						texts = texts?.join("")?.split(/\r/);
						break;
					case "GoogleCloud":
						texts = _data?.data?.translations?.map(item => item?.translatedText ?? `翻译失败, vendor: ${vendor}`);
						break;
					case "Bing":
					case "Microsoft":
					case "Azure":
						texts = _data?.map(item => item?.translations?.[0]?.text ?? `翻译失败, vendor: ${vendor}`);
						break;
					case "DeepL":
						texts = _data?.translations?.map(item => item?.text ?? `翻译失败, vendor: ${vendor}`);
						break;
					case "DeepLX":
						texts = _data?.data?.split("||") ?? _data?.data;
						break;
					case "BaiduFanyi":
						break;
					case "YoudaoAI":
						break;
				};
			})
			.catch(error => Promise.reject(error));
		//$.log(`✅ ${$.name}, Get Translate Data, texts: ${JSON.stringify(texts)}`, "");
		$.log(`✅ ${$.name}, Get Translate Data`, "");
		return texts
	};
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

/***/ "./src/WebVTT/WebVTT.mjs":
/*!*******************************!*\
  !*** ./src/WebVTT/WebVTT.mjs ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebVTT)
/* harmony export */ });
// refer: https://www.w3.org/TR/webvtt1/
class WebVTT {
	constructor(opts = ["milliseconds", "timeStamp", "singleLine", "\n"]) {
		this.name = "WebVTT v2.1.4";
		this.opts = opts;
		this.lineBreak = (this.opts.includes("\n")) ? "\n" : (this.opts.includes("\r")) ? "\r" : (this.opts.includes("\r\n")) ? "\r\n" : "\n";
		this.vtt = new String;
		this.json = { headers: {}, comments: [], style: "", body: [] };
	};

	parse(vtt = this.vtt) {
		const WebVTT_cue_Regex = (this.opts.includes("milliseconds")) ? /^((?<index>\d+)(\r\n|\r|\n))?(?<timing>(?<startTime>[0-9:.,]+) --> (?<endTime>[0-9:.,]+)) ?(?<settings>.+)?[^](?<text>[\s\S]*)?$/
			: /^((?<index>\d+)(\r\n|\r|\n))?(?<timing>(?<startTime>[0-9:]+)[0-9.,]+ --> (?<endTime>[0-9:]+)[0-9.,]+) ?(?<settings>.+)?[^](?<text>[\s\S]*)?$/
		const Array = vtt.split(/\r\n\r\n|\r\r|\n\n/);
		const Json = { headers: {}, comments: [], style: "", body: [] };

		Array.forEach(item => {
			item = item.trim();
			switch (item.substring(0, 5).trim()) {
				case "WEBVT": {
					let cues = item.split(/\r\n|\r|\n/);
					Json.headers.type = cues.shift();
					Json.headers.options = cues;
					break;
				};
				case "NOTE": {
					Json.comments.push(item);
					break;
				};
				case "STYLE": {
					let cues = item.split(/\r\n|\r|\n/);
					cues.shift();
					Json.style = cues.join(this.lineBreak);
					break;
				};
				default:
					let cue = item.match(WebVTT_cue_Regex)?.groups;
					if (cue) {
						if (Json.headers?.type !== "WEBVTT") {
							cue.timing = cue?.timing?.replace?.(",", ".");
							cue.startTime = cue?.startTime?.replace?.(",", ".");
							cue.endTime = cue?.endTime?.replace?.(",", ".");
						}
						if (this.opts.includes("timeStamp")) {
							let ISOString = cue?.startTime?.replace?.(/(.*)/, "1970-01-01T$1Z")
							cue.timeStamp = this.opts.includes("milliseconds") ? Date.parse(ISOString) : Date.parse(ISOString) / 1000;
						}
						cue.text = cue?.text?.trimEnd?.();
						if (this.opts.includes("singleLine")) {
							cue.text = cue?.text?.replace?.(/\r\n|\r|\n/, " ");
						} else if (this.opts.includes("multiLine")) {
							cue.text = cue?.text?.split?.(/\r\n|\r|\n/);
						}
						Json.body.push(cue);
					};
					break;
			}
		});
		return Json
	};

	stringify(json = this.json) {
		let vtt = [
			json.headers = [json.headers?.type || "", json.headers?.options || ""].flat(Infinity).join(this.lineBreak),
			json.comments = json?.comments?.join?.(this.lineBreak),
			json.style = (json?.style?.length > 0) ? ["STYLE", json.style].join(this.lineBreak) : "",
			json.body = json.body.map(item => {
				if (Array.isArray(item.text)) item.text = item.text.join(this.lineBreak);
				item = `${(item.index) ? item.index + this.lineBreak : ""}${item.timing} ${item?.settings ?? ""}${this.lineBreak}${item.text}`;
				return item;
			}).join(this.lineBreak + this.lineBreak)
		].join(this.lineBreak + this.lineBreak).trim() + this.lineBreak + this.lineBreak;
		return vtt
	};
};


/***/ }),

/***/ "./src/XML/XML.mjs":
/*!*************************!*\
  !*** ./src/XML/XML.mjs ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ XML)
/* harmony export */ });
// refer: https://github.com/Peng-YM/QuanX/blob/master/Tools/XMLParser/xml-parser.js
// refer: https://goessner.net/download/prj/jsonxml/
class XML {
	#ATTRIBUTE_KEY = "@";
	#CHILD_NODE_KEY = "#";
	#UNESCAPE = {
		"&amp;": "&",
		"&lt;": "<",
		"&gt;": ">",
		"&apos;": "'",
		"&quot;": '"'
	};
	#ESCAPE = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"'": "&apos;",
		'"': "&quot;"
	};

	constructor(opts) {
		this.name = "XML v0.4.0-2";
		this.opts = opts;
		BigInt.prototype.toJSON = () => this.toString();
	};

	parse(xml = new String, reviver = "") {
		const UNESCAPE = this.#UNESCAPE;
		const ATTRIBUTE_KEY = this.#ATTRIBUTE_KEY;
		const CHILD_NODE_KEY = this.#CHILD_NODE_KEY;
		const DOM = toDOM(xml);
		let json = fromXML(DOM, reviver);
		return json;

		/***************** Fuctions *****************/
		function toDOM(text) {
			const list = text.replace(/^[ \t]+/gm, "")
				.split(/<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/);
			const length = list.length;

			// root element
			const root = { children: [] };
			let elem = root;

			// dom tree stack
			const stack = [];

			// parse
			for (let i = 0; i < length;) {
				// text node
				const str = list[i++];
				if (str) appendText(str);

				// child node
				const tag = list[i++];
				if (tag) parseNode(tag);
			}
			return root;
			/***************** Fuctions *****************/
			function parseNode(tag) {
				const tags = tag.split(" ");
				const name = tags.shift();
				const length = tags.length;
				let child = {};
				switch (name[0]) {
					case "/":
						// close tag
						const closed = tag.replace(/^\/|[\s\/].*$/g, "").toLowerCase();
						while (stack.length) {
							const tagName = elem?.name?.toLowerCase?.();
							elem = stack.pop();
							if (tagName === closed) break;
						}
						break;
					case "?":
						// XML declaration
						child.name = name;
						child.raw = tags.join(" ");
						appendChild(child);
						break;
					case "!":
						if (/!\[CDATA\[(.+)\]\]/.test(tag)) {
							// CDATA section
							child.name = "!CDATA";
							//child.raw = tag.slice(9, -2);
							child.raw = tag.match(/!\[CDATA\[(.+)\]\]/);
							//appendText(tag.slice(9, -2));
						} else {
							// Comment section
							child.name = name;
							child.raw = tags.join(" ");
						};
						appendChild(child);
						break;
					default:
						child = openTag(tag);
						appendChild(child);
						switch ((tags?.[length - 1] ?? name).slice(-1)) {
							case "/":
								//child.hasChild = false; // emptyTag
								delete child.children; // emptyTag
								break;
							default:
								switch (name) {
									case "link":
										//child.hasChild = false; // emptyTag
										delete child.children; // emptyTag
										break;
									default:
										stack.push(elem); // openTag
										elem = child;
										break;
								};
								break;
						};
						break;
				};

				function openTag(tag) {
					const elem = { children: [] };
					tag = tag.replace(/\s*\/?$/, "");
					const pos = tag.search(/[\s='"\/]/);
					if (pos < 0) {
						elem.name = tag;
					} else {
						elem.name = tag.substr(0, pos);
						elem.tag = tag.substr(pos);
					}
					return elem;
				};
			};

			function appendText(str) {
				//str = removeSpaces(str);
				str = removeBreakLine(str);
				//str = str?.trim?.();
				if (str) appendChild(unescapeXML(str));

				function removeBreakLine(str) {
					return str?.replace?.(/^(\r\n|\r|\n|\t)+|(\r\n|\r|\n|\t)+$/g, "");
				}
			}

			function appendChild(child) {
				elem.children.push(child);
			}
		};
		/***************** Fuctions *****************/
		function fromPlist(elem, reviver) {
			let object;
			switch (typeof elem) {
				case "string":
				case "undefined":
					object = elem;
					break;
				case "object":
					//default:
					const name = elem.name;
					const children = elem.children;

					object = {};

					switch (name) {
						case "plist":
							let plist = fromPlist(children[0], reviver);
							object = Object.assign(object, plist)
							break;
						case "dict":
							let dict = children.map(child => fromPlist(child, reviver));
							dict = chunk(dict, 2);
							object = Object.fromEntries(dict);
							break;
						case "array":
							if (!Array.isArray(object)) object = [];
							object = children.map(child => fromPlist(child, reviver));
							break;
						case "key":
							const key = children[0];
							object = key;
							break;
						case "true":
						case "false":
							const boolean = name;
							object = JSON.parse(boolean);
							break;
						case "integer":
							const integer = children[0];
							//object = parseInt(integer);
							object = BigInt(integer);
							break;
						case "real":
							const real = children[0];
							//const digits = real.split(".")[1]?.length || 0;
							object = parseFloat(real)//.toFixed(digits);
							break;
						case "string":
							const string = children[0];
							object = string;
							break;
					};
					if (reviver) object = reviver(name || "", object);
					break;
			}
			return object;

			/** 
			 * Chunk Array
			 * @author VirgilClyne
			 * @param {Array} source - source
			 * @param {Number} length - number
			 * @return {Array<*>} target
			 */
			function chunk(source, length) {
				var index = 0, target = [];
				while (index < source.length) target.push(source.slice(index, index += length));
				return target;
			};
		}

		function fromXML(elem, reviver) {
			let object;
			switch (typeof elem) {
				case "string":
				case "undefined":
					object = elem;
					break;
				case "object":
					//default:
					const raw = elem.raw;
					const name = elem.name;
					const tag = elem.tag;
					const children = elem.children;

					if (raw) object = raw;
					else if (tag) object = parseAttribute(tag, reviver);
					else if (!children) object = { [name]: undefined };
					else object = {};

					if (name === "plist") object = Object.assign(object, fromPlist(children[0], reviver));
					else children?.forEach?.((child, i) => {
						if (typeof child === "string") addObject(object, CHILD_NODE_KEY, fromXML(child, reviver), undefined)
						else if (!child.tag && !child.children && !child.raw) addObject(object, child.name, fromXML(child, reviver), children?.[i - 1]?.name)
						else addObject(object, child.name, fromXML(child, reviver), undefined)
					});
					if (children && children.length === 0) addObject(object, CHILD_NODE_KEY, null, undefined);
					/*
					if (Object.keys(object).length === 0) {
						if (elem.name) object[elem.name] = (elem.hasChild === false) ? null : "";
						else object = (elem.hasChild === false) ? null : "";
					}
					*/

					//if (Object.keys(object).length === 0) addObject(object, elem.name, (elem.hasChild === false) ? null : "");
					//if (Object.keys(object).length === 0) object = (elem.hasChild === false) ? undefined : "";
					if (reviver) object = reviver(name || "", object);
					break;
			}
			return object;
			/***************** Fuctions *****************/
			function parseAttribute(tag, reviver) {
				if (!tag) return;
				const list = tag.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/);
				const length = list.length;
				let attributes, val;

				for (let i = 0; i < length; i++) {
					let str = removeSpaces(list[i]);
					//let str = removeBreakLine(list[i]);
					//let str = list[i]?.trim?.();
					if (!str) continue;

					if (!attributes) {
						attributes = {};
					}

					const pos = str.indexOf("=");
					if (pos < 0) {
						// bare attribute
						str = ATTRIBUTE_KEY + str;
						val = null;
					} else {
						// attribute key/value pair
						val = str.substr(pos + 1).replace(/^\s+/, "");
						str = ATTRIBUTE_KEY + str.substr(0, pos).replace(/\s+$/, "");

						// quote: foo="FOO" bar='BAR'
						const firstChar = val[0];
						const lastChar = val[val.length - 1];
						if (firstChar === lastChar && (firstChar === "'" || firstChar === '"')) {
							val = val.substr(1, val.length - 2);
						}

						val = unescapeXML(val);
					}
					if (reviver) val = reviver(str, val);

					addObject(attributes, str, val);
				}

				return attributes;

				function removeSpaces(str) {
					//return str && str.replace(/^\s+|\s+$/g, "");
					return str?.trim?.();
				}
			}

			function addObject(object, key, val, prevKey = key) {
				if (typeof val === "undefined") return;
				else {
					const prev = object[prevKey];
					//const curr = object[key];
					if (Array.isArray(prev)) prev.push(val);
					else if (prev) object[prevKey] = [prev, val];
					else object[key] = val;
				}
			}
		}

		function unescapeXML(str) {
			return str.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g, function (str) {
				if (str[1] === "#") {
					const code = (str[2] === "x") ? parseInt(str.substr(3), 16) : parseInt(str.substr(2), 10);
					if (code > -1) return String.fromCharCode(code);
				}
				return UNESCAPE[str] || str;
			});
		}

	};

	stringify(json = new Object, tab = "") {
		const ESCAPE = this.#ESCAPE;
		const ATTRIBUTE_KEY = this.#ATTRIBUTE_KEY;
		const CHILD_NODE_KEY = this.#CHILD_NODE_KEY;
		let XML = "";
		for (let elem in json) XML += toXml(json[elem], elem, "");
		XML = tab ? XML.replace(/\t/g, tab) : XML.replace(/\t|\n/g, "");
		return XML;
		/***************** Fuctions *****************/
		function toXml(Elem, Name, Ind) {
			let xml = "";
			switch (typeof Elem) {
				case "object":
					if (Array.isArray(Elem)) {
						xml = Elem.reduce(
							(prevXML, currXML) => prevXML += `${Ind}${toXml(currXML, Name, `${Ind}\t`)}\n`,
							""
						);
					} else {
						let attribute = "";
						let hasChild = false;
						for (let name in Elem) {
							if (name[0] === ATTRIBUTE_KEY) {
								attribute += ` ${name.substring(1)}=\"${Elem[name].toString()}\"`;
								delete Elem[name];
							} else if (Elem[name] === undefined) Name = name;
							else hasChild = true;
						}
						xml += `${Ind}<${Name}${attribute}${(hasChild || Name === "link") ? "" : "/"}>`;

						if (hasChild) {
							if (Name === "plist") xml += toPlist(Elem, Name, `${Ind}\t`);
							else {
								for (let name in Elem) {
									switch (name) {
										case CHILD_NODE_KEY:
											xml += Elem[name] ?? "";
											break;
										default:
											xml += toXml(Elem[name], name, `${Ind}\t`);
											break;
									};
								};
							};
							xml += (xml.slice(-1) === "\n" ? Ind : "") + `</${Name}>`;
						};
					};
					break;
				case "string":
					switch (Name) {
						case "?xml":
							xml += `${Ind}<${Name} ${Elem.toString()}>`;
							break;
						case "?":
							xml += `${Ind}<${Name}${Elem.toString()}${Name}>`;
							break;
						case "!":
							xml += `${Ind}<!--${Elem.toString()}-->`;
							break;
						case "!DOCTYPE":
							xml += `${Ind}<${Name} ${Elem.toString()}>`;
							break;
						case "!CDATA":
							xml += `${Ind}<![CDATA[${Elem.toString()}]]>`;
							break;
						case CHILD_NODE_KEY:
							xml += Elem;
							break;
						default:
							xml += `${Ind}<${Name}>${Elem.toString()}</${Name}>`;
							break;
					};
					break;
				case "undefined":
					xml += Ind + `<${Name.toString()}/>`;
					break;
			};
			return xml;
		};

		function toPlist(Elem, Name, Ind) {
			let plist = "";
			switch (typeof Elem) {
				case "boolean":
					plist = `${Ind}<${Elem.toString()}/>`;
					break;
				case "number":
					plist = `${Ind}<real>${Elem.toString()}</real>`;
					break;
				case "bigint":
					plist = `${Ind}<integer>${Elem.toString()}</integer>`;
					break;
				case "string":
					plist = `${Ind}<string>${Elem.toString()}</string>`;
					break;
				case "object":
					let array = "";
					if (Array.isArray(Elem)) {
						for (var i = 0, n = Elem.length; i < n; i++) array += `${Ind}${toPlist(Elem[i], Name, `${Ind}\t`)}`;
						plist = `${Ind}<array>${array}${Ind}</array>`;
					} else {
						let dict = "";
						Object.entries(Elem).forEach(([key, value]) => {
							dict += `${Ind}<key>${key}</key>`;
							dict += toPlist(value, key, Ind);
						});
						plist = `${Ind}<dict>${dict}${Ind}</dict>`;
					};
					break;
			}
			return plist;
		};
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Subtitles.Translate.response.beta.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VidGl0bGVzLlRyYW5zbGF0ZS5yZXNwb25zZS5iZXRhLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFaUM7QUFDQTtBQUNBO0FBQ1E7O0FBRUU7QUFDZ0I7QUFDSjs7QUFFRjs7QUFFckQsY0FBYyxvREFBSTtBQUNsQixnQkFBZ0Isb0RBQUk7QUFDcEIsZ0JBQWdCLG9EQUFJO0FBQ3BCLGdCQUFnQiwwREFBTSxxREFBcUQ7O0FBRTNFO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTyxXQUFXLG9CQUFvQjtBQUNqRDtBQUNBO0FBQ0EsV0FBVyxPQUFPLGNBQWMsT0FBTztBQUN2QztBQUNBLGlCQUFpQix3RUFBYztBQUMvQixXQUFXLE9BQU8sY0FBYyxTQUFTO0FBQ3pDO0FBQ0EsbUdBQW1HO0FBQ25HLCtFQUErRSxzRUFBWTtBQUMzRixXQUFXLE9BQU8sWUFBWSxPQUFPO0FBQ3JDO0FBQ0E7QUFDQSxTQUFTLDRCQUE0QixFQUFFLGdFQUFNLGdJQUFnSSwrT0FBUTtBQUNyTCxZQUFZLE9BQU8sdUJBQXVCLGlCQUFpQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPLFVBQVUsS0FBSyxlQUFlLFVBQVU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTyxZQUFZLHFCQUFxQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU8sWUFBWSxxQkFBcUI7QUFDM0QsMkVBQTJFLGFBQWE7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTtBQUNOLG1CQUFtQixPQUFPLFlBQVkscUJBQXFCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPLFlBQVkscUJBQXFCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sbUJBQW1CLE9BQU8sWUFBWSxxQkFBcUI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QyxtQkFBbUIsT0FBTyxZQUFZLHFCQUFxQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGtEQUFrRDtBQUN2RztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHdHQUF3RztBQUMxSjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU8sOENBQThDLG9DQUFvQztBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPLFlBQVkscUJBQXFCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPLHNCQUFzQiwrQkFBK0I7QUFDL0U7QUFDQSxtQkFBbUIsT0FBTyxnQkFBZ0IsNEJBQTRCLElBQUksd0JBQXdCO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixhQUFhLGtCQUFrQixrQkFBa0IsS0FBMEIsaUVBQWlFLG9KQUFvRCxFQUFFLGlCQUFpQixjQUFjLHVCQUF1QiwwQkFBMEIsNERBQTRELGNBQWMsb0JBQW9CLGFBQWEsY0FBYyxtREFBbUQsYUFBYSx1QkFBdUIsMEJBQTBCLGlCQUFpQiw4Q0FBOEMscUJBQXFCLGdDQUFnQyxTQUFTLDJCQUEyQix5QkFBeUIsa0JBQWtCLGdDQUFnQyxTQUFTLGdDQUFnQyw4QkFBOEIsU0FBUyxnQkFBZ0Isc0NBQXNDLGdCQUFnQixjQUFjLDhEQUE4RCxjQUFjLDRGQUE0RixZQUFZLFlBQVkseURBQXlELHlCQUF5QixFQUFFLFlBQVkseURBQXlELEVBQUUsdUlBQXVJLEVBQUUsdUlBQXVJLEVBQUUsdUlBQXVJLEVBQUUsMklBQTJJLEVBQUUsdU5BQXVOLEVBQUUsbUxBQW1MLEVBQUUsNktBQTZLLEVBQUUsb0VBQW9FLEVBQUUsNEdBQTRHLEVBQUUsbUVBQW1FLEVBQUUsbUVBQW1FLEVBQUUsb0dBQW9HLEVBQUUsMENBQTBDLEVBQUUsZ0VBQWdFLEVBQUUsMENBQTBDLEVBQUUsd0VBQXdFLEVBQUUscUdBQXFHLEVBQUUsZ0VBQWdFLEVBQUUsZ0VBQWdFLEVBQUUsaU9BQWlPLEVBQUUsZ0VBQWdFLEVBQUUsNEtBQTRLLEVBQUUsZ0VBQWdFLEVBQUUsZ0VBQWdFLEVBQUUsZ0VBQWdFLEVBQUUsZ0VBQWdFLEVBQUUsa0VBQWtFLHlDQUF5QyxFQUFFLFlBQVkscUhBQXFILEVBQUUsa0NBQWtDLDZEQUE2RCxFQUFFLFlBQVksdUVBQXVFLDhEQUE4RCxFQUFFLFlBQVksaUVBQWlFLEVBQUUsd0RBQXdELEVBQUUsZ0hBQWdILGlEQUFpRCxFQUFFLFlBQVkscUpBQXFKLCtDQUErQyxFQUFFLFlBQVkscUdBQXFHLEVBQUUsb0NBQW9DLEVBQUUsNkNBQTZDLEVBQUUsZ0RBQWdELDJDQUEyQyxNQUFNLDBCQUEwQixnQ0FBZ0MsNkJBQTZCLE9BQU8sRUFBRSxFQUFFLElBQUksT0FBTyxnQkFBZ0IscUJBQXFCLGdCQUFnQixlQUFlLG9CQUFvQixjQUFjLDBEQUEwRCxxRkFBcUYsY0FBYyxnQkFBZ0IsdUZBQXVGLGdLQUFnSyxXQUFXLDZFQUE2RSxpUUFBaVEseUZBQXlGLGdCQUFnQix1RkFBdUYsdUhBQXVILCtDQUErQyw4QkFBOEIsNkVBQTZFLHVHQUF1RyxpQkFBaUIsZ0pBQWdKLHFGQUFxRixjQUFjLHNDQUFzQywyQkFBMkIsZ0NBQWdDLGtCQUFrQixVQUFVLHVCQUF1QiwyQkFBMkIsa0VBQWtFLEtBQUssNkJBQTZCLDRDQUE0QyxZQUFZLE1BQU0sbUhBQW1ILGNBQWMsUUFBUSwyQkFBMkIsa0JBQWtCLGlCQUFpQixzRkFBc0YsMkJBQTJCLElBQUksK0JBQStCLFVBQVUsZ0JBQWdCLGNBQWMsMkJBQTJCLGtEQUFrRCxnQkFBZ0IsUUFBUSwyQkFBMkIsTUFBTSx1REFBdUQsY0FBYywwQkFBMEIsMkJBQTJCLFVBQVUseUhBQXlILDJDQUEyQyx5QkFBeUIsMENBQTBDLFdBQVcsS0FBSyxXQUFXLG9CQUFvQixjQUFjLGFBQWEsK1hBQStYLGdCQUFnQixRQUFRLDJCQUEyQixRQUFRLGdKQUFnSix5QkFBeUIsMENBQTBDLFdBQVcsS0FBSyxXQUFXLG9CQUFvQixjQUFjLGFBQWEseUdBQXlHLGNBQWMsa0JBQWtCLDJCQUEyQixnQ0FBZ0MseUJBQXlCLG9EQUFvRCxlQUFlLHdFQUF3RSwwQkFBMEIsMEJBQTBCLDBCQUEwQiwwQkFBMEIsK0JBQStCLHFEQUFxRCxjQUFjLFFBQVEsMkJBQTJCLFFBQVEsOERBQThELHFCQUFxQiwwSkFBMEosY0FBYyx1QkFBdUIsMkJBQTJCLFFBQVEscVVBQXFVLGNBQWMsUUFBUSwyQkFBMkIsTUFBTSw0SkFBNEosY0FBYywyREFBMkQsMkJBQTJCLFVBQVUsd0dBQXdHLHVKQUF1Siw4RUFBOEUsb0ZBQW9GLHFCQUFxQixLQUFLLDJFQUEyRSw2QkFBNkIsWUFBWSx5RUFBeUUsNEJBQTRCLDhLQUE4SyxjQUFjLFFBQVEsb0JBQW9CLDJCQUEyQixtREFBbUQseUJBQXlCLDJEQUEyRCx3QkFBd0Isb0RBQW9ELGlCQUFpQixxQkFBcUIsdUJBQXVCLE1BQU0scU5BQXFOLGNBQWMsa0JBQWtCLDJCQUEyQixRQUFRLHdVQUF3VSxjQUFjLFFBQVEsMkJBQTJCLE1BQU0seUpBQXlKLDZCQUE2QiwyRUFBMkUsY0FBYyxrQkFBa0IsMkJBQTJCLFFBQVEsd05BQXdOLGNBQWMsUUFBUSwyQkFBMkIsTUFBTSxnRkFBZ0YsZ0JBQWdCLG1CQUFtQixxQkFBcUIsZ0JBQWdCLDRCQUE0QiwyQkFBMkIsTUFBTSxzUUFBc1EsZ0JBQWdCLFFBQVEsMkJBQTJCLE1BQU0seUdBQXlHLGNBQWMsUUFBUSwyQkFBMkIsbUNBQW1DLGNBQWMsUUFBUSwyQkFBMkIseURBQXlELHNFQUFzRSxlQUFlLDBDQUEwQyw2Q0FBNkMsZUFBZSxrQ0FBa0MsaURBQWlELGVBQWUsd0JBQXdCLG9DQUFvQyx3TUFBd00sa0VBQWtFLGlDQUFpQyx5REFBeUQsMkJBQTJCLEVBQUUsZUFBZSxlQUFlLDRDQUE0Qyx5REFBeUQsd0JBQXdCLEtBQUssdUhBQXVILEVBQUUsbUJBQW1CLG1CQUFtQixrTUFBa00seUJBQXlCLFdBQVcsS0FBSyxXQUFXLG1HQUFtRyxTQUFTLGNBQWMsc0VBQXNFLGVBQWUsMENBQTBDLG1DQUFtQyw0RkFBNEYsNEJBQTRCLHdDQUF3Qyw4QkFBOEIsd0NBQXdDLElBQUksRUFBRSx3QkFBd0Isa01BQWtNLFNBQVMsV0FBVyxFQUFFLGVBQWUsZUFBZSw0Q0FBNEMsNkNBQTZDLHdCQUF3QixNQUFNLEVBQUUsbURBQW1ELDZDQUE2QyxtQkFBbUIseUJBQXlCLHdCQUF3QixnQkFBZ0Isd0JBQXdCLGdCQUFnQiwrQ0FBK0MsNEVBQTRFLGtDQUFrQyxpQkFBaUIsa0JBQWtCLGtCQUFrQixtQkFBbUIsRUFBRSxvQkFBb0IsZ0JBQWdCLG1CQUFtQixtQkFBbUIsdUJBQXVCLGdCQUFnQix1QkFBdUIsZ0JBQWdCLG9CQUFvQixnQkFBZ0Isb0JBQW9CLGdCQUFnQix5QkFBeUIsZ0JBQWdCLHlCQUF5QixnQkFBZ0IsOEJBQThCLGdCQUFnQiw4QkFBOEIsZ0JBQWdCLHlCQUF5QixnQkFBZ0IseUJBQXlCLGdCQUFnQix5QkFBeUIsZ0JBQWdCLHlCQUF5QixnQkFBZ0IsMkJBQTJCLG1CQUFtQiwyQkFBMkIsbUJBQW1CLDJCQUEyQixtQkFBbUIsMkJBQTJCLG1CQUFtQixpQ0FBaUMsZ0JBQWdCLGlDQUFpQyxnQkFBZ0IsbUVBQW1FLEtBQTBCLG1DQUFtQywwRkFBMEYsRUFBRSxDQUFDLFNBQUksSUFBSTtBQUM1d2lCO0FBQ0EsVUFBVSxrRUFBa0Usd0NBQXdDLHVCQUF1QixFQUFFLHFCQUFxQixRQUFRLHVCQUF1QiwrQkFBK0IsZ0JBQWdCLHdEQUF3RCw0Q0FBNEMseUNBQXlDLDZDQUE2QztBQUMxYSwrTkFBK04sRUFBRSwwREFBMEQsMkJBQTJCLFNBQVMsU0FBUyxZQUFZLFdBQVcsS0FBSyxrQkFBa0Isa0hBQWtILGtCQUFrQixxWUFBcVkscUdBQXFHLHFHQUFxRyxFQUFFLCtCQUErQixvTEFBb0wseUJBQXlCLHlFQUF5RSwyQkFBMkIsd0VBQXdFLGdEQUFnRCxrQkFBa0IsMEJBQTBCLGVBQWUseUJBQXlCLFVBQVUsZUFBZSxxQkFBcUIsdUdBQXVHLHdDQUF3Qyw4REFBOEQsTUFBTSw0Q0FBNEMsTUFBTSw4QkFBOEIsV0FBVyx3Q0FBd0MsYUFBYSxXQUFXLHdDQUF3QyxlQUFlLGlDQUFpQyxpRUFBaUUsZ0RBQWdELFdBQVcseUJBQXlCLGFBQWEsNkJBQTZCLHlCQUF5QixxREFBcUQsZUFBZSwrQ0FBK0MsNEZBQTRGLFNBQVMsZUFBZSxlQUFlLGVBQWUsd0ZBQXdGLHdHQUF3RywwRkFBMEYsbURBQW1ELGdCQUFnQixtQ0FBbUMsaUJBQWlCLGlFQUFpRSxvRUFBb0Usa0VBQWtFLFNBQVMsaUJBQWlCLHVDQUF1QyxrQkFBa0IsOEJBQThCLGdCQUFnQixZQUFZLGdCQUFnQiwwQ0FBMEMsaUJBQWlCLGdCQUFnQixnQ0FBZ0MsU0FBUyxjQUFjLGVBQWUsVUFBVSwrSEFBK0gsdUNBQXVDLGtEQUFrRCwwQkFBMEIsd0NBQXdDLHlDQUF5QyxxREFBcUQsMEVBQTBFLGdEQUFnRCxpQkFBaUIsOEJBQThCLHdDQUF3QyxnQkFBZ0IsdUNBQXVDLFNBQVMsZUFBZSxxQkFBcUIsVUFBVSwrS0FBK0ssNEZBQTRGLHFEQUFxRCw0QkFBNEIsZUFBZSxnQkFBZ0Isa0NBQWtDLHlCQUF5QixTQUFTLHlCQUF5Qix1REFBdUQsc0dBQXNHLFlBQVksa0JBQWtCLDBDQUEwQyx5QkFBeUIsdUdBQXVHLFlBQVksV0FBVyxLQUFLLHVEQUF1RCxZQUFZLDRDQUE0Qyw4Q0FBOEMsVUFBVSxlQUFlLE1BQU0scUNBQXFDLE1BQU0sMENBQTBDLE1BQU0sOEJBQThCLDhDQUE4Qyx1QkFBdUIseUJBQXlCLG1CQUFtQixZQUFZLFdBQVcscUJBQXFCLHdDQUF3QyxNQUFNLDJDQUEyQyxNQUFNLGtEQUFrRCxpREFBaUQsd0JBQXdCLFlBQVksWUFBWSxLQUFLLE1BQU0sMkJBQTJCLDZEQUE2RCwyQkFBMkIsMEVBQTBFLFlBQVksTUFBTSxNQUFNLDJCQUEyQiw2REFBNkQsa0NBQWtDLDhCQUE4QixZQUFZLEtBQUssTUFBTSxnQ0FBZ0MscUNBQXFDLHNDQUFzQyw4QkFBOEIsWUFBWSxLQUFLLE1BQU0sMEJBQTBCLHFDQUFxQyxrQkFBa0Isb0dBQW9HLGtDQUFrQyw0QkFBNEIsZ0JBQWdCLGtCQUFrQixZQUFZLGdCQUFnQix1QkFBdUIsb0ZBQW9GLHFEQUFxRCw0QkFBNEIsb0RBQW9ELCtDQUErQywyREFBMkQsZ0JBQWdCLGlCQUFpQix1Q0FBdUMsd0dBQXdHLDRCQUE0QixTQUFTLEtBQUssTUFBTSwwQkFBMEIsVUFBVSxLQUFLLFlBQVksSUFBSSw0QkFBNEIsV0FBVyx3QkFBd0IsMkJBQTJCLFlBQVksMkNBQTJDLGdGQUFnRixpRkFBaUYsaUZBQWlGLHFDQUFxQyxZQUFZLGlCQUFpQiwyQkFBMkIsZ0RBQWdELGlDQUFpQyxvQkFBb0IsdUNBQXVDLDZLQUE2Syx1SUFBdUksUUFBUSxvQkFBb0IscUJBQXFCLCtIQUErSCw0REFBNEQsbUJBQW1CLGlCQUFpQix3QkFBd0IsU0FBUyw4QkFBOEIsV0FBVywyQ0FBMkMsb0NBQW9DLGtEQUFrRCwwQ0FBMEMsZUFBZSx1QkFBdUIsd0NBQXdDLGlEQUFpRCxVQUFVLHVDQUF1QyxVQUFVLG9DQUFvQyx1REFBdUQsZ0RBQWdELHVGQUF1RixzQkFBc0Isd0NBQXdDLDhFQUE4RSw4QkFBOEIscUNBQXFDLHlCQUF5QixzQ0FBc0Msb0VBQW9FLGlEQUFpRCx3Q0FBd0MsMkNBQTJDLFdBQVcsb0VBQW9FLFdBQVcsc0dBQXNHLHFCQUFxQiwrQkFBK0IseUNBQXlDLGVBQWUsdUJBQXVCLHdDQUF3QyxpREFBaUQsVUFBVSx1Q0FBdUMsVUFBVSxvQ0FBb0MsK0NBQStDLCtDQUErQyxxRkFBcUYsc0JBQXNCLHdDQUF3QyxVQUFVLHdHQUF3Ryx3Q0FBd0Msc0NBQXNDLGlIQUFpSCx3Q0FBd0MsMkNBQTJDLGFBQWEsK0JBQStCLFNBQVMseUJBQXlCLHNDQUFzQyxXQUFXLE1BQU0sbUlBQW1JLFdBQVcscUdBQXFHLG1CQUFtQixxQkFBcUIseUJBQXlCLDZCQUE2QiwwSUFBMEksd0JBQXdCLG1FQUFtRSx3RkFBd0YseUJBQXlCLG9FQUFvRSxrRkFBa0YsMEJBQTBCLHFFQUFxRSw4RkFBOEYsb0NBQW9DLFVBQVUseUNBQXlDLHlDQUF5Qyw2QkFBNkIsMkJBQTJCLGVBQWUsWUFBWSxVQUFVLHVCQUF1QixhQUFhLDBHQUEwRyxjQUFjLE9BQU8seUJBQXlCLGdGQUFnRixHQUFHLE1BQU0sbUJBQW1CLE9BQU8sWUFBWSxlQUFlLGFBQWEsK0JBQStCLG1CQUFtQixPQUFPLGtDQUFrQyxxREFBcUQsb0JBQW9CLGlDQUFpQyxrQkFBa0IsTUFBTSxZQUFZLCtFQUErRSxRQUFRLE9BQU8sb0JBQW9CLHVCQUF1Qiw4QkFBOEIsYUFBYSxTQUFTLGtCQUFrQixhQUFhLHNDQUFzQyxlQUFlLCtCQUErQiwrQ0FBK0MsTUFBTSxpQkFBaUIsOENBQThDLE1BQU0sa0ZBQWtGLE1BQU0saURBQWlELDhDQUE4QyxRQUFRLGlIQUFpSCxrQkFBa0IsYUFBYSx1Q0FBdUMsV0FBVyxrQkFBa0Isa0NBQWtDLE1BQU0sZUFBZSw0Q0FBNEMsTUFBTSxnRkFBZ0YsTUFBTSw2Q0FBNkMsNkNBQTZDLG9CQUFvQixrS0FBa0ssTUFBTSxpRUFBaUUsaUJBQWlCLE1BQU0sa0RBQWtELGNBQWMsK0VBQStFLG1CQUFtQixHQUFHLEVBQUUsU0FBUyxNQUFNLHVDQUF1QyxpQkFBaUIsd0VBQXdFLG1CQUFtQixHQUFHLEVBQUUsMENBQTBDLEVBQUUsTUFBTSxxQkFBcUIsc0VBQXNFLGNBQWMsNEVBQTRFLG1CQUFtQixHQUFHLEVBQUUsU0FBUyxNQUFNLG9CQUFvQixFQUFFLFFBQVEsbUNBQW1DLG1CQUFtQixHQUFHLEVBQUUsaUNBQWlDLFNBQVMsS0FBSyxnQkFBZ0IsTUFBTSxJQUFJLFVBQVUsa0VBQWtFLCtCQUErQixrREFBa0QsbURBQW1ELDJCQUEyQiw0RUFBNEUsZ0RBQWdELGdCQUFnQixvQ0FBb0MsS0FBSyxxRUFBcUUsd0JBQXdCLE1BQU0sMElBQTBJLE1BQU0scUpBQXFKLDJEQUEyRCw4SEFBOEgsZ0RBQWdELCtDQUErQyx3R0FBd0csZ0RBQWdELGdEQUFnRCwwQ0FBMEMsNkJBQTZCLFNBQVMsNENBQTRDLHVCQUF1QixxQkFBcUIsTUFBTSxJQUFJLHNCQUFzQixTQUFTLEVBQUUsTUFBTSxTQUFTLG1FQUFtRSw0QkFBNEIsd0JBQXdCLFNBQVMsWUFBWSxvQ0FBb0MsMkJBQTJCLGVBQWUseUJBQXlCLFdBQVcsWUFBWSxLQUFLLGdIQUFnSCwwQkFBMEIsNkxBQTZMLFNBQVMsYUFBYSxhQUFhLGtCQUFrQixxQ0FBcUMsU0FBUyxpQkFBaUIsK0NBQStDLG9DQUFvQyxxQ0FBcUMsTUFBTSxnQ0FBZ0MsK0JBQStCLGlDQUFpQyxxQ0FBcUMsTUFBTSw2QkFBNkIsK0JBQStCLHVDQUF1QyxrREFBa0Qsc0NBQXNDLHNEQUFzRCxrQkFBa0IseUJBQXlCLFNBQVMsZUFBZSx5QkFBeUIsV0FBVyxLQUFLLDRDQUE0Qyw2QkFBNkIsTUFBTSx1QkFBdUIsWUFBWSxXQUFXLEtBQUssNkNBQTZDLHdEQUF3RCw2QkFBNkIsTUFBTSwwQkFBMEIsWUFBWSxXQUFXLEtBQUssb0NBQW9DLDhCQUE4Qiw4REFBOEQsb0JBQW9CLG1FQUFtRSxNQUFNLGlGQUFpRixNQUFNLCtDQUErQyxTQUFTLGtCQUFrQixpREFBaUQsd0JBQXdCLHlJQUF5SSxpQkFBaUIsMkVBQTJFLGtCQUFrQix3QkFBd0IsS0FBSyxXQUFXLFVBQVUsaUhBQWlILDJGQUEyRix1Q0FBdUMscUxBQXFMLCtFQUErRSw2RUFBNkUsa0hBQWtILHNCQUFzQiwwQ0FBMEMseUlBQXlJLGlCQUFpQiwwQ0FBMEMsMEdBQTBHLHNEQUFzRCxVQUFVLDhCQUE4Qiw0RkFBNEYsa0hBQWtILHNEQUFzRCwrQ0FBK0MsZ0NBQWdDLGtCQUFrQiw2QkFBNkIsZUFBZSxZQUFZLFVBQVUsTUFBTSw4RkFBOEYsY0FBYyxlQUFlLG1DQUFtQyxRQUFRLEVBQUUsOENBQThDLE1BQU0saUNBQWlDLDZEQUE2RCxZQUFZLFVBQVUsZ0dBQWdHLE1BQU0sV0FBVyxxR0FBcUcsUUFBUSw0QkFBNEIsZ0NBQWdDLDZCQUE2QixNQUFNLGlJQUFpSSxNQUFNLHdDQUF3QyxXQUFXLEtBQUsseUJBQXlCLCtDQUErQyxHQUFHLGFBQWEsRUFBRSw0QkFBNEIsZ0JBQWdCLDRFQUE0RSxnQkFBZ0IsMkJBQTJCLHNCQUFzQixLQUFLLFFBQVEsRUFBRSxpQkFBaUIsVUFBVSxxRkFBcUYsTUFBTSx3QkFBd0IsMENBQTBDLE1BQU0sdUJBQXVCLE1BQU0sMkRBQTJELE1BQU0seUNBQXlDLEdBQUcsYUFBYSxFQUFFLHFCQUFxQixtQkFBbUIsWUFBWSxrSEFBa0gsb0RBQW9ELE1BQU0sZUFBZSxNQUFNLGlDQUFpQyxZQUFZLGNBQWMsVUFBVSx1Q0FBdUMseUNBQXlDLHFDQUFxQyx5Q0FBeUMsdUNBQXVDLGdFQUFnRSxrRUFBa0Usb0VBQW9FLDJDQUEyQyx1Q0FBdUMseUNBQXlDLDZDQUE2QyxzRUFBc0UseUNBQXlDLG9FQUFvRSw2QkFBNkIsZUFBZSxZQUFZLFVBQVUsTUFBTSxvR0FBb0csYUFBYSxlQUFlLDRCQUE0QixpQ0FBaUMsWUFBWSxpQkFBaUIsNEJBQTRCLFlBQVksaUJBQWlCLGVBQWUsa0VBQWtFLDhFQUE4RSxpREFBaUQsK0RBQStELE1BQU0sb0JBQW9CLHlCQUF5QixnREFBZ0Qsb0NBQW9DLE1BQU0sK0NBQStDLDJEQUEyRCwyQkFBMkIsdUVBQXVFLG9CQUFvQiw4Q0FBOEMsUUFBUSxZQUFZLDBJQUEwSSxNQUFNLCtEQUErRCwyQ0FBMkMseUNBQXlDLE1BQU0sa0RBQWtELE1BQU0sNENBQTRDLFNBQVMsbUJBQW1CLDJGQUEyRixrQkFBa0IsZ0NBQWdDLDRCQUE0QixnQkFBZ0IsYUFBYSwrRkFBK0YsMkJBQTJCLFlBQVksV0FBVyxlQUFlLFVBQVUsZ0JBQWdCLHdCQUF3QixpQkFBaUIsWUFBWSxVQUFVLGdDQUFnQyxNQUFNLDRFQUE0RSxNQUFNLHVDQUF1QyxNQUFNLGtDQUFrQyxNQUFNLG1EQUFtRCxNQUFNLGlEQUFpRCxNQUFNLDZEQUE2RCxNQUFNLGdFQUFnRSxNQUFNLG1GQUFtRixNQUFNLDhFQUE4RSxNQUFNLHFEQUFxRCxNQUFNLHVEQUF1RCxNQUFNLG9GQUFvRixNQUFNLGtDQUFrQyxNQUFNLCtEQUErRCxrQkFBa0IsNkJBQTZCLFdBQVcsc0NBQXNDLHNCQUFzQixFQUFFLG1CQUFtQixrQkFBa0IsaUNBQWlDLGtCQUFrQix5QkFBeUIsb0JBQW9CLG1EQUFtRCxNQUFNLGtCQUFrQixNQUFNLG1CQUFtQixTQUFTLHVDQUF1QyxZQUFZLHVCQUF1QixrQkFBa0IsWUFBWSxpQkFBaUIsK0NBQStDLHdEQUF3RCxZQUFZLFVBQVUsb0NBQW9DLGdEQUFnRCxnREFBZ0QsV0FBVyxpQkFBaUIsWUFBWSxNQUFNLDBCQUEwQix3QkFBd0IsV0FBVywyQkFBMkIsMkRBQTJELE1BQU0sMkJBQTJCLDhDQUE4QyxNQUFNLDhCQUE4QixrREFBa0QsdUJBQXVCLDBFQUEwRSxpQkFBaUIsd0JBQXdCLDRCQUE0QixVQUFVLHVCQUF1QixnQkFBZ0IsNkJBQTZCLFVBQVUsd0JBQXdCLGlCQUFpQixpQ0FBaUMsVUFBVSxtQkFBbUIsdUJBQXVCLDBFQUEwRSxlQUFlLGtFQUFrRSwyREFBMkQsU0FBUywyTEFBMkwsU0FBUyxzQkFBc0IscURBQXFELFdBQVcsU0FBUyxpQ0FBaUMsNEJBQTRCLFVBQVUsaUNBQWlDLFlBQVksZ0NBQWdDLFlBQVksV0FBVywyQkFBMkIsU0FBUyxvQ0FBb0MsZ0NBQWdDLFlBQVksV0FBVywwQ0FBMEMsU0FBUyw4QkFBOEIsZ0NBQWdDLFlBQVksV0FBVyxxQ0FBcUMsU0FBUyxxQkFBcUIsMERBQTBELCtCQUErQixVQUFVLHNCQUFzQixlQUFlLG1CQUFtQixlQUFlLDZFQUE2RSxTQUFTLDJDQUEyQyxRQUFRLFlBQVkscUJBQXFCLDZCQUE2Qix3QkFBd0IsUUFBUSxZQUFZLHFCQUFxQixxREFBcUQsd0JBQXdCLE9BQU8sd0JBQXdCLGdDQUFnQyxrQ0FBa0MsT0FBTyx1Q0FBdUMsc0ZBQXNGLG1EQUFtRCxTQUFTLGlDQUFpQyxPQUFPLDBHQUEwRyxVQUFVLG9CQUFvQixNQUFNLGlDQUFpQyw2QkFBNkIsU0FBUyxxREFBcUQsUUFBUSxpQ0FBaUMsU0FBUyw2Q0FBNkMsVUFBVSw2QkFBNkIsNkNBQTZDLFNBQVMsaUJBQWlCLHdCQUF3Qiw2REFBNkQsVUFBVSx3QkFBd0IsNkRBQTZELFdBQVcsZ0JBQWdCLHdCQUF3Qiw0REFBNEQsWUFBWSxlQUFlLHdCQUF3QiwyREFBMkQsVUFBVSxzRUFBc0UsWUFBWSxrRUFBa0UsK0RBQStELFdBQVcsbUVBQW1FLCtEQUErRCxTQUFTLGlCQUFpQiw4Q0FBOEMsVUFBVSxnQ0FBZ0Msb0VBQW9FLFVBQVUsa0JBQWtCLCtDQUErQyxvQkFBb0IsMERBQTBELDhCQUE4QixVQUFVLHFCQUFxQixjQUFjLG1CQUFtQixpQkFBaUIsb01BQW9NLHNCQUFzQixFQUFFLE1BQU0sa0NBQWtDLDhFQUE4RSxZQUFZLFFBQVEsaUJBQWlCLFVBQVUsMEJBQTBCLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLGdDQUFnQyxNQUFNLGtEQUFrRCxZQUFZLE1BQU0sOEJBQThCLHNDQUFzQyxjQUFjLE1BQU0sa0RBQWtELHlEQUF5RCxlQUFlLDJEQUEyRCxRQUFRLHVCQUF1QixTQUFTLG9CQUFvQixvQkFBb0IsUUFBUSxzQ0FBc0MsU0FBUyx1Q0FBdUMsU0FBUyxrRUFBa0UsdUJBQXVCLE9BQU8seUJBQXlCLG9CQUFvQixVQUFVLCtDQUErQyxXQUFXLDhDQUE4QyxVQUFVLG9EQUFvRCxXQUFXLG1EQUFtRCxRQUFRLGdEQUFnRCxTQUFTLGdEQUFnRCxRQUFRLCtCQUErQixnRUFBZ0UsU0FBUyw4Q0FBOEMsa0JBQWtCLG1CQUFtQixrR0FBa0csMlBBQTJQLFVBQVUsNkJBQTZCLHNEQUFzRCxTQUFTLG9CQUFvQiwwQ0FBMEMsWUFBWSxrQ0FBa0MsK0JBQStCLG9DQUFvQyx5Q0FBeUMsb0NBQW9DLGtCQUFrQixpQ0FBaUMsZ0JBQWdCLHVCQUF1QixrRUFBa0UsY0FBYyxtREFBbUQsb0JBQW9CLGdCQUFnQiwwQkFBMEIsWUFBWSxxREFBcUQsa0JBQWtCLG1CQUFtQixpRUFBaUUsY0FBYyx3QkFBd0IsZ0VBQWdFLHdCQUF3Qiw2RkFBNkYsZUFBZSxZQUFZLG1CQUFtQixJQUFJLDJEQUEyRCx1QkFBdUIscUNBQXFDLDJCQUEyQix3Q0FBd0MsNEJBQTRCLG1CQUFtQjtBQUMxMGlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHdGQUF3RjtBQUN0RyxjQUFjLDZEQUE2RDtBQUMzRSxjQUFjLDBFQUEwRTtBQUN4RixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDBGQUEwRjtBQUN4RyxjQUFjLDBFQUEwRTtBQUN4RixjQUFjLHNIQUFzSDtBQUNwSSxjQUFjLDRHQUE0RztBQUMxSCxjQUFjLDRFQUE0RTtBQUMxRixjQUFjLDZFQUE2RTtBQUMzRixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFFQUFxRTtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNkVBQTZFO0FBQzNGLGNBQWMsbUVBQW1FO0FBQ2pGLGNBQWMsNERBQTREO0FBQzFFLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsOEZBQThGO0FBQzVHLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUVBQW1FO0FBQ2pGLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0ZBQXdGO0FBQ3RHLGNBQWM7QUFDZDtBQUNB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QUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQztBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxTQUFTLDhDQUE4QztBQUN2RDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFVLDRDQUE0QztBQUN0RDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsZUFB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Q0EsY0FBYyxPQUFPLHlDQUF5QyxjQUFjLGdCQUFnQix1QkFBdUI7QUFDbkgsdUdBQXVHO0FBQ3ZHLG1GQUFtRjtBQUNuRix1RkFBdUY7QUFDdkYsK0dBQStHO0FBQy9HLHVHQUF1RztBQUN2RyxzSUFBc0k7QUFDdEk7QUFDQSxVQUFVO0FBQ1Y7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDbEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esc0RBQXNEO1dBQ3RELHNDQUFzQyxpRUFBaUU7V0FDdkc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTs7Ozs7V0NWQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9TdWJ0aXRsZXMuVHJhbnNsYXRlLnJlc3BvbnNlLmJldGEuanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvRU5WL0VOVi5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvVVJJL1VSSS5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvV2ViVlRUL1dlYlZUVC5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvWE1ML1hNTC5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvZnVuY3Rpb24vZGV0ZWN0Rm9ybWF0Lm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9kZXRlY3RQbGF0Zm9ybS5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvZnVuY3Rpb24vc2V0RU5WLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5SRUFETUU6IGh0dHBzOi8vZ2l0aHViLmNvbS9EdWFsU3Vic1xuKi9cblxuaW1wb3J0IEVOVnMgZnJvbSBcIi4vRU5WL0VOVi5tanNcIjtcbmltcG9ydCBVUklzIGZyb20gXCIuL1VSSS9VUkkubWpzXCI7XG5pbXBvcnQgWE1McyBmcm9tIFwiLi9YTUwvWE1MLm1qc1wiO1xuaW1wb3J0IFdlYlZUVCBmcm9tIFwiLi9XZWJWVFQvV2ViVlRULm1qc1wiO1xuXG5pbXBvcnQgc2V0RU5WIGZyb20gXCIuL2Z1bmN0aW9uL3NldEVOVi5tanNcIjtcbmltcG9ydCBkZXRlY3RQbGF0Zm9ybSBmcm9tIFwiLi9mdW5jdGlvbi9kZXRlY3RQbGF0Zm9ybS5tanNcIjtcbmltcG9ydCBkZXRlY3RGb3JtYXQgZnJvbSBcIi4vZnVuY3Rpb24vZGV0ZWN0Rm9ybWF0Lm1qc1wiO1xuXG5pbXBvcnQgKiBhcyBEYXRhYmFzZSBmcm9tIFwiLi9kYXRhYmFzZS9EYXRhYmFzZS5qc29uXCI7XG5cbmNvbnN0ICQgPSBuZXcgRU5WcyhcIvCfjb/vuI8gRHVhbFN1YnM6IPCflKMgVW5pdmVyc2FsIHYxLjIuNigyKSBUcmFuc2xhdG9yLnJlc3BvbnNlLmJldGFcIik7XG5jb25zdCBVUkkgPSBuZXcgVVJJcygpO1xuY29uc3QgWE1MID0gbmV3IFhNTHMoKTtcbmNvbnN0IFZUVCA9IG5ldyBXZWJWVFQoW1wibWlsbGlzZWNvbmRzXCIsIFwidGltZVN0YW1wXCIsIFwic2luZ2xlTGluZVwiLCBcIlxcblwiXSk7IC8vIFwibXVsdGlMaW5lXCJcblxuLyoqKioqKioqKioqKioqKioqIFByb2Nlc3NpbmcgKioqKioqKioqKioqKioqKiovXG4vLyDop6PmnoRVUkxcbmNvbnN0IFVSTCA9IFVSSS5wYXJzZSgkcmVxdWVzdC51cmwpO1xuJC5sb2coYOKaoCAkeyQubmFtZX1gLCBgVVJMOiAke0pTT04uc3RyaW5naWZ5KFVSTCl9YCwgXCJcIik7XG4vLyDojrflj5bov57mjqXlj4LmlbBcbmNvbnN0IE1FVEhPRCA9ICRyZXF1ZXN0Lm1ldGhvZCwgSE9TVCA9IFVSTC5ob3N0LCBQQVRIID0gVVJMLnBhdGgsIFBBVEhzID0gVVJMLnBhdGhzO1xuJC5sb2coYOKaoCAkeyQubmFtZX1gLCBgTUVUSE9EOiAke01FVEhPRH1gLCBcIlwiKTtcbi8vIOiOt+WPluW5s+WPsFxuY29uc3QgUExBVEZPUk0gPSBkZXRlY3RQbGF0Zm9ybShIT1NUKTtcbiQubG9nKGDimqAgJHskLm5hbWV9LCBQTEFURk9STTogJHtQTEFURk9STX1gLCBcIlwiKTtcbi8vIOino+aekOagvOW8j1xubGV0IEZPUk1BVCA9ICgkcmVzcG9uc2UuaGVhZGVycz8uW1wiQ29udGVudC1UeXBlXCJdID8/ICRyZXNwb25zZS5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pPy5zcGxpdChcIjtcIik/LlswXTtcbmlmIChGT1JNQVQgPT09IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfHwgRk9STUFUID09PSBcInRleHQvcGxhaW5cIikgRk9STUFUID0gZGV0ZWN0Rm9ybWF0KFVSTCwgJHJlc3BvbnNlPy5ib2R5KTtcbiQubG9nKGDimqAgJHskLm5hbWV9LCBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuKGFzeW5jICgpID0+IHtcblx0Ly8g6K+75Y+W6K6+572uXG5cdGNvbnN0IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9ID0gc2V0RU5WKFwiRHVhbFN1YnNcIiwgWyhbXCJZb3VUdWJlXCIsIFwiTmV0ZmxpeFwiLCBcIkJpbGlCaWxpXCIsIFwiU3BvdGlmeVwiXS5pbmNsdWRlcyhQTEFURk9STSkpID8gUExBVEZPUk0gOiBcIlVuaXZlcnNhbFwiLCBcIlRyYW5zbGF0ZVwiLCBcIkFQSVwiXSwgRGF0YWJhc2UpO1xuXHQkLmxvZyhg4pqgICR7JC5uYW1lfWAsIGBTZXR0aW5ncy5Td2l0Y2g6ICR7U2V0dGluZ3M/LlN3aXRjaH1gLCBcIlwiKTtcblx0c3dpdGNoIChTZXR0aW5ncy5Td2l0Y2gpIHtcblx0XHRjYXNlIHRydWU6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdC8vIOiOt+WPluWtl+W5leexu+Wei+S4juivreiogFxuXHRcdFx0Y29uc3QgVHlwZSA9IFVSTC5xdWVyeT8uc3VidHlwZSA/PyBTZXR0aW5ncy5UeXBlLCBMYW5ndWFnZXMgPSBbVVJMLnF1ZXJ5Py5sYW5nPy50b1VwcGVyQ2FzZT8uKCkgPz8gU2V0dGluZ3MuTGFuZ3VhZ2VzWzBdLCAoVVJMLnF1ZXJ5Py50bGFuZyA/PyBDYWNoZXM/LnRsYW5nKT8udG9VcHBlckNhc2U/LigpID8/IFNldHRpbmdzLkxhbmd1YWdlc1sxXV07XG5cdFx0XHQkLmxvZyhg4pqgICR7JC5uYW1lfSwgVHlwZTogJHtUeXBlfSwgTGFuZ3VhZ2VzOiAke0xhbmd1YWdlc31gLCBcIlwiKTtcblx0XHRcdC8vIOWIm+W7uuepuuaVsOaNrlxuXHRcdFx0bGV0IGJvZHkgPSB7fTtcblx0XHRcdC8vIOagvOW8j+WIpOaWrVxuXHRcdFx0c3dpdGNoIChGT1JNQVQpIHtcblx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6IC8vIOinhuS4uuaXoGJvZHlcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiOlxuXHRcdFx0XHRjYXNlIFwidGV4dC9wbGFpblwiOlxuXHRcdFx0XHRjYXNlIFwidGV4dC9odG1sXCI6XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LW1wZWdVUkxcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3gtbXBlZ3VybFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmxcIjpcblx0XHRcdFx0Y2FzZSBcImF1ZGlvL21wZWd1cmxcIjpcblx0XHRcdFx0XHQvL2JvZHkgPSBNM1U4LnBhcnNlKCRyZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBib2R5OiAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdC8vJHJlc3BvbnNlLmJvZHkgPSBNM1U4LnN0cmluZ2lmeShib2R5KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInRleHQveG1sXCI6XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L3BsaXN0XCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94bWxcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3BsaXN0XCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXBsaXN0XCI6IHtcblx0XHRcdFx0XHRib2R5ID0gWE1MLnBhcnNlKCRyZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBib2R5OiAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdGNvbnN0IGJyZWFrTGluZSA9IChib2R5Py50dCkgPyBcIjxici8+XCIgOiAoYm9keT8udGltZWR0ZXh0KSA/IFwiJiN4MDAwQTtcIiA6IFwiJiN4MDAwQTtcIjtcblx0XHRcdFx0XHRpZiAoYm9keT8udGltZWR0ZXh0Py5oZWFkPy53cD8uWzFdPy5bXCJAcmNcIl0pIGJvZHkudGltZWR0ZXh0LmhlYWQud3BbMV1bXCJAcmNcIl0gPSBcIjFcIjtcblx0XHRcdFx0XHRsZXQgcGFyYWdyYXBoID0gYm9keT8udHQ/LmJvZHk/LmRpdj8ucCA/PyBib2R5Py50aW1lZHRleHQ/LmJvZHk/LnA7XG5cdFx0XHRcdFx0bGV0IGZ1bGxUZXh0ID0gW107XG5cdFx0XHRcdFx0cGFyYWdyYXBoID0gcGFyYWdyYXBoLm1hcChwYXJhID0+IHtcblx0XHRcdFx0XHRcdGlmIChwYXJhPy5zKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHBhcmEucykpIHBhcmFbXCIjXCJdID0gcGFyYS5zLm1hcChzZWcgPT4gc2VnW1wiI1wiXSkuam9pbihcIiBcIik7XG5cdFx0XHRcdFx0XHRcdGVsc2UgcGFyYVtcIiNcIl0gPSBwYXJhLnM/LltcIiNcIl0gPz8gXCJcIjtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHBhcmEucztcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb25zdCBzcGFuID0gcGFyYT8uc3BhbiA/PyBwYXJhO1xuXHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoc3BhbikpIHNlbnRlbmNlcyA9IHNwYW4/Lm1hcChzcGFuID0+IHNwYW4/LltcIiNcIl0pLmpvaW4oYnJlYWtMaW5lKTtcblx0XHRcdFx0XHRcdGVsc2Ugc2VudGVuY2VzID0gc3Bhbj8uW1wiI1wiXTtcblx0XHRcdFx0XHRcdGZ1bGxUZXh0LnB1c2goc2VudGVuY2VzID8/IFwiXFx1MjAwYlwiKTtcblx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRjb25zdCBzcGFucyA9IHBhcmE/LnNwYW4gPz8gcGFyYT8ucyA/PyBwYXJhO1xuXHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoc3BhbikpIHNwYW5zW1wiI1wiXSA9IHNwYW5zPy5tYXAoc3BhbiA9PiBzcGFuPy5bXCIjXCJdID8/IFwiXCIpLmpvaW4oXCIgXCIpO1xuXHRcdFx0XHRcdFx0ZWxzZSBzcGFuc1tcIiNcIl0gPSBzcGFucz8uW1wiI1wiXSA/PyBcIlwiO1xuXHRcdFx0XHRcdFx0aWYgKHBhcmE/LnMpIHBhcmEgPSBzcGFucztcblx0XHRcdFx0XHRcdGlmIChzcGFucz8uW1wiI1wiXSkgZnVsbFRleHQucHVzaChzcGFuc1tcIiNcIl0pO1xuXHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdHJldHVybiBwYXJhO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnN0IHRyYW5zbGF0aW9uID0gYXdhaXQgVHJhbnNsYXRlKGZ1bGxUZXh0LCBTZXR0aW5ncz8uTWV0aG9kLCBTZXR0aW5ncz8uVmVuZG9yLCBMYW5ndWFnZXNbMF0sIExhbmd1YWdlc1sxXSwgU2V0dGluZ3M/LltTZXR0aW5ncz8uVmVuZG9yXSwgQ29uZmlncz8uTGFuZ3VhZ2VzLCBTZXR0aW5ncz8uVGltZXMsIFNldHRpbmdzPy5JbnRlcnZhbCwgU2V0dGluZ3M/LkV4cG9uZW50aWFsKTtcblx0XHRcdFx0XHRwYXJhZ3JhcGggPSBwYXJhZ3JhcGgubWFwKChwYXJhLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBzcGFuID0gcGFyYT8uc3BhbiA/PyBwYXJhO1xuXHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoc3BhbikpIHRyYW5zbGF0aW9uPy5baV0/LnNwbGl0KGJyZWFrTGluZSkuZm9yRWFjaCgodGV4dCwgaikgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoc3BhbltqXT8uW1wiI1wiXSkgc3BhbltqXVtcIiNcIl0gPSBjb21iaW5lVGV4dChzcGFuW2pdW1wiI1wiXSwgdGV4dCwgU2V0dGluZ3M/LlNob3dPbmx5LCBTZXR0aW5ncz8uUG9zaXRpb24sICcgJyk7XG5cdFx0XHRcdFx0XHRcdC8vZWxzZSBpZiAoc3BhbltqICsgMV0/LltcIiNcIl0pIHNwYW5baiArIDFdW1wiI1wiXSA9IGNvbWJpbmVUZXh0KHNwYW5baiArIDFdW1wiI1wiXSwgdGV4dCwgU2V0dGluZ3M/LlNob3dPbmx5LCBTZXR0aW5ncz8uUG9zaXRpb24sICcgJyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGVsc2UgaWYgKHNwYW4/LltcIiNcIl0pIHNwYW5bXCIjXCJdID0gY29tYmluZVRleHQoc3BhbltcIiNcIl0sIHRyYW5zbGF0aW9uPy5baV0sIFNldHRpbmdzPy5TaG93T25seSwgU2V0dGluZ3M/LlBvc2l0aW9uLCBicmVha0xpbmUpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHBhcmE7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQkcmVzcG9uc2UuYm9keSA9IFhNTC5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L3Z0dFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdnR0XCI6IHtcblx0XHRcdFx0XHRib2R5ID0gVlRULnBhcnNlKCRyZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBib2R5OiAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdGxldCBmdWxsVGV4dCA9IGJvZHk/LmJvZHkubWFwKGl0ZW0gPT4gKGl0ZW0/LnRleHQgPz8gXCJcXHUyMDBiXCIpPy5yZXBsYWNlKC88XFwvP1tePD5dKz4vZywgXCJcIikpO1xuXHRcdFx0XHRcdGNvbnN0IHRyYW5zbGF0aW9uID0gYXdhaXQgVHJhbnNsYXRlKGZ1bGxUZXh0LCBTZXR0aW5ncz8uTWV0aG9kLCBTZXR0aW5ncz8uVmVuZG9yLCBMYW5ndWFnZXNbMF0sIExhbmd1YWdlc1sxXSwgU2V0dGluZ3M/LltTZXR0aW5ncz8uVmVuZG9yXSwgQ29uZmlncz8uTGFuZ3VhZ2VzLCBTZXR0aW5ncz8uVGltZXMsIFNldHRpbmdzPy5JbnRlcnZhbCwgU2V0dGluZ3M/LkV4cG9uZW50aWFsKTtcblx0XHRcdFx0XHRib2R5LmJvZHkgPSBib2R5LmJvZHkubWFwKChpdGVtLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHRpdGVtLnRleHQgPSBjb21iaW5lVGV4dChpdGVtPy50ZXh0ID8/IFwiXFx1MjAwYlwiLCB0cmFuc2xhdGlvbj8uW2ldLCBTZXR0aW5ncz8uU2hvd09ubHksIFNldHRpbmdzPy5Qb3NpdGlvbik7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0JHJlc3BvbnNlLmJvZHkgPSBWVFQuc3RyaW5naWZ5KGJvZHkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjYXNlIFwidGV4dC9qc29uXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcblx0XHRcdFx0XHRib2R5ID0gSlNPTi5wYXJzZSgkcmVzcG9uc2UuYm9keSA/PyBcInt9XCIpO1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0c3dpdGNoIChQTEFURk9STSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcIllvdVR1YmVcIjoge1xuXHRcdFx0XHRcdFx0XHRpZiAoYm9keT8uZXZlbnRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZ1bGxUZXh0ID0gW107XG5cdFx0XHRcdFx0XHRcdFx0Ym9keS5ldmVudHMgPSBib2R5LmV2ZW50cy5tYXAoZXZlbnQgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50Py5zZWdzPy5bMF0/LnV0ZjgpIGV2ZW50LnNlZ3MgPSBbeyBcInV0ZjhcIjogZXZlbnQuc2Vncy5tYXAoc2VnID0+IHNlZy51dGY4KS5qb2luKFwiXCIpIH1dO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZnVsbFRleHQucHVzaChldmVudD8uc2Vncz8uWzBdPy51dGY4ID8/IFwiXFx1MjAwYlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBldmVudC53V2luSWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZXZlbnQ7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNsYXRpb24gPSBhd2FpdCBUcmFuc2xhdGUoZnVsbFRleHQsIFNldHRpbmdzPy5NZXRob2QsIFNldHRpbmdzPy5WZW5kb3IsIExhbmd1YWdlc1swXSwgTGFuZ3VhZ2VzWzFdLCBTZXR0aW5ncz8uW1NldHRpbmdzPy5WZW5kb3JdLCBDb25maWdzPy5MYW5ndWFnZXMsIFNldHRpbmdzPy5UaW1lcywgU2V0dGluZ3M/LkludGVydmFsLCBTZXR0aW5ncz8uRXhwb25lbnRpYWwpO1xuXHRcdFx0XHRcdFx0XHRcdGJvZHkuZXZlbnRzID0gYm9keS5ldmVudHMubWFwKChldmVudCwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50Py5zZWdzPy5bMF0/LnV0ZjgpIGV2ZW50LnNlZ3NbMF0udXRmOCA9IGNvbWJpbmVUZXh0KGV2ZW50LnNlZ3NbMF0udXRmOCwgdHJhbnNsYXRpb24/LltpXSwgU2V0dGluZ3M/LlNob3dPbmx5LCBTZXR0aW5ncz8uUG9zaXRpb24pO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGV2ZW50O1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGJvZHk/LmNvbnRlbnRzPy5zZWN0aW9uTGlzdFJlbmRlcmVyPy5jb250ZW50cykge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBtdXNpY0Rlc2NyaXB0aW9ucyA9IGJvZHkuY29udGVudHMuc2VjdGlvbkxpc3RSZW5kZXJlci5jb250ZW50cztcblx0XHRcdFx0XHRcdFx0XHRtdXNpY0Rlc2NyaXB0aW9ucyA9IGF3YWl0IFByb21pc2UuYWxsKG11c2ljRGVzY3JpcHRpb25zLm1hcChhc3luYyBtdXNpY0Rlc2NyaXB0aW9uID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChtdXNpY0Rlc2NyaXB0aW9uPy5tdXNpY0Rlc2NyaXB0aW9uU2hlbGZSZW5kZXJlcj8uZGVzY3JpcHRpb24/LnJ1bnMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGx5cmljcyA9IG11c2ljRGVzY3JpcHRpb24ubXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXIuZGVzY3JpcHRpb24ucnVucztcblx0XHRcdFx0XHRcdFx0XHRcdFx0bHlyaWNzID0gYXdhaXQgUHJvbWlzZS5hbGwobHlyaWNzLm1hcChhc3luYyBydW4gPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBmdWxsVGV4dCA9IHJ1bj8udGV4dD8uc3BsaXQ/LihcIlxcblwiKT8ubWFwKHRleHQgPT4gdGV4dD8udHJpbSgpID8/IFwiXFx1MjAwYlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB0cmFuc2xhdGlvbiA9IGF3YWl0IFRyYW5zbGF0ZShmdWxsVGV4dCwgU2V0dGluZ3M/Lk1ldGhvZCwgU2V0dGluZ3M/LlZlbmRvciwgTGFuZ3VhZ2VzWzBdLCBMYW5ndWFnZXNbMV0sIFNldHRpbmdzPy5bU2V0dGluZ3M/LlZlbmRvcl0sIENvbmZpZ3M/Lkxhbmd1YWdlcywgU2V0dGluZ3M/LlRpbWVzLCBTZXR0aW5ncz8uSW50ZXJ2YWwsIFNldHRpbmdzPy5FeHBvbmVudGlhbCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVsbFRleHQgPSBmdWxsVGV4dC5tYXAoKGxpbmUsIGkpID0+IHsgaWYgKGxpbmUpIHJldHVybiBjb21iaW5lVGV4dChsaW5lLCB0cmFuc2xhdGlvbj8uW2ldLCBTZXR0aW5ncz8uU2hvd09ubHksIFNldHRpbmdzPy5Qb3NpdGlvbiwgXCJcXG4gIOKUlCBcIikgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cnVuLnRleHQgPSBmdWxsVGV4dC5qb2luKFwiXFxuXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBydW47XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbXVzaWNEZXNjcmlwdGlvbjtcblx0XHRcdFx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGNhc2UgXCJTcG90aWZ5XCI6IHtcblx0XHRcdFx0XHRcdFx0TGFuZ3VhZ2VzWzBdID0gKGJvZHk/Lmx5cmljcz8ubGFuZ3VhZ2UgPT09IFwiejFcIikgPyBcIlpILUhBTlRcIlxuXHRcdFx0XHRcdFx0XHRcdDogKGJvZHk/Lmx5cmljcz8ubGFuZ3VhZ2UpID8gYm9keT8ubHlyaWNzPy5sYW5ndWFnZS50b1VwcGVyQ2FzZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IFwiQVVUT1wiO1xuXHRcdFx0XHRcdFx0XHRsZXQgZnVsbFRleHQgPSBib2R5Lmx5cmljcy5saW5lcy5tYXAobGluZSA9PiBsaW5lPy53b3JkcyA/PyBcIlxcdTIwMGJcIik7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRyYW5zbGF0aW9uID0gYXdhaXQgVHJhbnNsYXRlKGZ1bGxUZXh0LCBTZXR0aW5ncz8uTWV0aG9kLCBTZXR0aW5ncz8uVmVuZG9yLCBMYW5ndWFnZXNbMF0sIExhbmd1YWdlc1sxXSwgU2V0dGluZ3M/LltTZXR0aW5ncz8uVmVuZG9yXSwgQ29uZmlncz8uTGFuZ3VhZ2VzLCBTZXR0aW5ncz8uVGltZXMsIFNldHRpbmdzPy5JbnRlcnZhbCwgU2V0dGluZ3M/LkV4cG9uZW50aWFsKTtcblx0XHRcdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCDosIPor5Xkv6Hmga9gLCBgJHJlcXVlc3QuaGVhZGVyc1tcImFwcC1wbGF0Zm9ybVwiXTogJHskcmVxdWVzdD8uaGVhZGVycz8uW1wiYXBwLXBsYXRmb3JtXCJdfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKCRyZXF1ZXN0Py5oZWFkZXJzPy5bXCJhcHAtcGxhdGZvcm1cIl0gPz8gJHJlcXVlc3Q/LmhlYWRlcnM/LltcIkFwcC1QbGF0Zm9ybVwiXSkge1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJPU1hcIjogLy8gbWFjT1MgQXBwIOaaguS4jeaUr+aMgee/u+ivkeWKn+iDvVxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJXaW4zMl94ODZfNjRcIjogLy8gV2luZG93cyBBcHAg5pqC5LiN5pSv5oyB57+76K+R5Yqf6IO9XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIldlYlBsYXllclwiOiAvLyBXZWIgQXBwXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRib2R5Lmx5cmljcy5saW5lcyA9IGJvZHkubHlyaWNzLmxpbmVzLm1hcCgobGluZSwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAobGluZT8ud29yZHMpIGxpbmUud29yZHMgPSBjb21iaW5lVGV4dChsaW5lLndvcmRzLCB0cmFuc2xhdGlvbj8uW2ldLCBTZXR0aW5ncz8uU2hvd09ubHksIFNldHRpbmdzPy5Qb3NpdGlvbik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsaW5lO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdFx0XHRcdFx0Ym9keS5seXJpY3MubGluZXMgPSBib2R5Lmx5cmljcy5saW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGxpbmUxID0ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwic3RhcnRUaW1lTXNcIjogbGluZS5zdGFydFRpbWVNcy50b1N0cmluZygpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwid29yZHNcIjogbGluZT8ud29yZHMgPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcInN5bGxhYmxlc1wiOiBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcImVuZFRpbWVNc1wiOiBcIjBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgbGluZTIgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJzdGFydFRpbWVNc1wiOiAobGluZS5zdGFydFRpbWVNcyArIDEwMCkudG9TdHJpbmcoKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIndvcmRzXCI6IHRyYW5zbGF0aW9uPy5baV0gPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcInN5bGxhYmxlc1wiOiBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcImVuZFRpbWVNc1wiOiBcIjBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gW2xpbmUxLCBsaW5lMl07XG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5mbGF0KEluZmluaXR5KTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vYnJlYWs7IOS4jeS4reaWre+8jOe7p+e7reWkhOeQhlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJpT1NcIjpcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghYm9keT8ubHlyaWNzPy5hbHRlcm5hdGl2ZXMpIGJvZHkubHlyaWNzLmFsdGVybmF0aXZlcyA9IFtdO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ym9keS5seXJpY3MuYWx0ZXJuYXRpdmVzLnVuc2hpZnQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImxhbmd1YWdlXCI6IExhbmd1YWdlc1sxXS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImxpbmVzXCI6IHRyYW5zbGF0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBib2R5OiAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdCRyZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9wcm90b2J1ZlwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wcm90b2J1ZlwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS5wcm90b2J1ZlwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwY1wiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwYytwcm90b1wiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGVjYXRpb24vb2N0ZXQtc3RyZWFtXCI6XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgJHJlc3BvbnNlLmJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoJHJlc3BvbnNlLmJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdGxldCByYXdCb2R5ID0gJC5pc1F1YW5YKCkgPyBuZXcgVWludDhBcnJheSgkcmVzcG9uc2UuYm9keUJ5dGVzID8/IFtdKSA6ICRyZXNwb25zZS5ib2R5ID8/IG5ldyBVaW50OEFycmF5KCk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgaXNCdWZmZXI/ICR7QXJyYXlCdWZmZXIuaXNWaWV3KHJhd0JvZHkpfTogJHtKU09OLnN0cmluZ2lmeShyYXdCb2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQvKioqKioqKioqKioqKioqKioqICBpbml0aWFsaXphdGlvbiBzdGFydCAgKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdFx0XHQvLyB0aW1vc3RhbW0vcHJvdG9idWYtdHMgMi45LjBcblx0XHRcdFx0XHQvLyB0ZXh0LWRlY29kZXJcblx0XHRcdFx0XHQhZnVuY3Rpb24oaSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gXyhuLGUsaSl7cmV0dXJuIGU8PW4mJm48PWl9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMmJiFpW1wiZW5jb2RpbmctaW5kZXhlc1wiXSYmKGlbXCJlbmNvZGluZy1pbmRleGVzXCJdPXJlcXVpcmUoXCIuL2VuY29kaW5nLWluZGV4ZXMuanNcIilbXCJlbmNvZGluZy1pbmRleGVzXCJdKTt2YXIgbD1NYXRoLmZsb29yO2Z1bmN0aW9uIHMobil7aWYodm9pZCAwPT09bilyZXR1cm57fTtpZihuPT09T2JqZWN0KG4pKXJldHVybiBuO3Rocm93IFR5cGVFcnJvcihcIkNvdWxkIG5vdCBjb252ZXJ0IGFyZ3VtZW50IHRvIGRpY3Rpb25hcnlcIil9ZnVuY3Rpb24gdShuKXtyZXR1cm4gMDw9biYmbjw9MTI3fXZhciBhPXUsYj0tMTtmdW5jdGlvbiBjKG4pe3RoaXMudG9rZW5zPVtdLnNsaWNlLmNhbGwobiksdGhpcy50b2tlbnMucmV2ZXJzZSgpfWMucHJvdG90eXBlPXtlbmRPZlN0cmVhbTpmdW5jdGlvbigpe3JldHVybiF0aGlzLnRva2Vucy5sZW5ndGh9LHJlYWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50b2tlbnMubGVuZ3RoP3RoaXMudG9rZW5zLnBvcCgpOmJ9LHByZXBlbmQ6ZnVuY3Rpb24obil7aWYoQXJyYXkuaXNBcnJheShuKSlmb3IodmFyIGU9bjtlLmxlbmd0aDspdGhpcy50b2tlbnMucHVzaChlLnBvcCgpKTtlbHNlIHRoaXMudG9rZW5zLnB1c2gobil9LHB1c2g6ZnVuY3Rpb24obil7aWYoQXJyYXkuaXNBcnJheShuKSlmb3IodmFyIGU9bjtlLmxlbmd0aDspdGhpcy50b2tlbnMudW5zaGlmdChlLnNoaWZ0KCkpO2Vsc2UgdGhpcy50b2tlbnMudW5zaGlmdChuKX19O3ZhciB3PS0xO2Z1bmN0aW9uIG0obixlKXtpZihuKXRocm93IFR5cGVFcnJvcihcIkRlY29kZXIgZXJyb3JcIik7cmV0dXJuIGV8fDY1NTMzfWZ1bmN0aW9uIGYobil7dGhyb3cgVHlwZUVycm9yKFwiVGhlIGNvZGUgcG9pbnQgXCIrbitcIiBjb3VsZCBub3QgYmUgZW5jb2RlZC5cIil9ZnVuY3Rpb24gcihuKXtyZXR1cm4gbj1TdHJpbmcobikudHJpbSgpLnRvTG93ZXJDYXNlKCksT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGQsbik/ZFtuXTpudWxsfXZhciB0LG8sbj1be2VuY29kaW5nczpbe2xhYmVsczpbXCJ1bmljb2RlLTEtMS11dGYtOFwiLFwidXRmLThcIixcInV0ZjhcIl0sbmFtZTpcIlVURi04XCJ9XSxoZWFkaW5nOlwiVGhlIEVuY29kaW5nXCJ9LHtlbmNvZGluZ3M6W3tsYWJlbHM6W1wiODY2XCIsXCJjcDg2NlwiLFwiY3NpYm04NjZcIixcImlibTg2NlwiXSxuYW1lOlwiSUJNODY2XCJ9LHtsYWJlbHM6W1wiY3Npc29sYXRpbjJcIixcImlzby04ODU5LTJcIixcImlzby1pci0xMDFcIixcImlzbzg4NTktMlwiLFwiaXNvODg1OTJcIixcImlzb184ODU5LTJcIixcImlzb184ODU5LTI6MTk4N1wiLFwibDJcIixcImxhdGluMlwiXSxuYW1lOlwiSVNPLTg4NTktMlwifSx7bGFiZWxzOltcImNzaXNvbGF0aW4zXCIsXCJpc28tODg1OS0zXCIsXCJpc28taXItMTA5XCIsXCJpc284ODU5LTNcIixcImlzbzg4NTkzXCIsXCJpc29fODg1OS0zXCIsXCJpc29fODg1OS0zOjE5ODhcIixcImwzXCIsXCJsYXRpbjNcIl0sbmFtZTpcIklTTy04ODU5LTNcIn0se2xhYmVsczpbXCJjc2lzb2xhdGluNFwiLFwiaXNvLTg4NTktNFwiLFwiaXNvLWlyLTExMFwiLFwiaXNvODg1OS00XCIsXCJpc284ODU5NFwiLFwiaXNvXzg4NTktNFwiLFwiaXNvXzg4NTktNDoxOTg4XCIsXCJsNFwiLFwibGF0aW40XCJdLG5hbWU6XCJJU08tODg1OS00XCJ9LHtsYWJlbHM6W1wiY3Npc29sYXRpbmN5cmlsbGljXCIsXCJjeXJpbGxpY1wiLFwiaXNvLTg4NTktNVwiLFwiaXNvLWlyLTE0NFwiLFwiaXNvODg1OS01XCIsXCJpc284ODU5NVwiLFwiaXNvXzg4NTktNVwiLFwiaXNvXzg4NTktNToxOTg4XCJdLG5hbWU6XCJJU08tODg1OS01XCJ9LHtsYWJlbHM6W1wiYXJhYmljXCIsXCJhc21vLTcwOFwiLFwiY3Npc284ODU5NmVcIixcImNzaXNvODg1OTZpXCIsXCJjc2lzb2xhdGluYXJhYmljXCIsXCJlY21hLTExNFwiLFwiaXNvLTg4NTktNlwiLFwiaXNvLTg4NTktNi1lXCIsXCJpc28tODg1OS02LWlcIixcImlzby1pci0xMjdcIixcImlzbzg4NTktNlwiLFwiaXNvODg1OTZcIixcImlzb184ODU5LTZcIixcImlzb184ODU5LTY6MTk4N1wiXSxuYW1lOlwiSVNPLTg4NTktNlwifSx7bGFiZWxzOltcImNzaXNvbGF0aW5ncmVla1wiLFwiZWNtYS0xMThcIixcImVsb3RfOTI4XCIsXCJncmVla1wiLFwiZ3JlZWs4XCIsXCJpc28tODg1OS03XCIsXCJpc28taXItMTI2XCIsXCJpc284ODU5LTdcIixcImlzbzg4NTk3XCIsXCJpc29fODg1OS03XCIsXCJpc29fODg1OS03OjE5ODdcIixcInN1bl9ldV9ncmVla1wiXSxuYW1lOlwiSVNPLTg4NTktN1wifSx7bGFiZWxzOltcImNzaXNvODg1OThlXCIsXCJjc2lzb2xhdGluaGVicmV3XCIsXCJoZWJyZXdcIixcImlzby04ODU5LThcIixcImlzby04ODU5LTgtZVwiLFwiaXNvLWlyLTEzOFwiLFwiaXNvODg1OS04XCIsXCJpc284ODU5OFwiLFwiaXNvXzg4NTktOFwiLFwiaXNvXzg4NTktODoxOTg4XCIsXCJ2aXN1YWxcIl0sbmFtZTpcIklTTy04ODU5LThcIn0se2xhYmVsczpbXCJjc2lzbzg4NTk4aVwiLFwiaXNvLTg4NTktOC1pXCIsXCJsb2dpY2FsXCJdLG5hbWU6XCJJU08tODg1OS04LUlcIn0se2xhYmVsczpbXCJjc2lzb2xhdGluNlwiLFwiaXNvLTg4NTktMTBcIixcImlzby1pci0xNTdcIixcImlzbzg4NTktMTBcIixcImlzbzg4NTkxMFwiLFwibDZcIixcImxhdGluNlwiXSxuYW1lOlwiSVNPLTg4NTktMTBcIn0se2xhYmVsczpbXCJpc28tODg1OS0xM1wiLFwiaXNvODg1OS0xM1wiLFwiaXNvODg1OTEzXCJdLG5hbWU6XCJJU08tODg1OS0xM1wifSx7bGFiZWxzOltcImlzby04ODU5LTE0XCIsXCJpc284ODU5LTE0XCIsXCJpc284ODU5MTRcIl0sbmFtZTpcIklTTy04ODU5LTE0XCJ9LHtsYWJlbHM6W1wiY3Npc29sYXRpbjlcIixcImlzby04ODU5LTE1XCIsXCJpc284ODU5LTE1XCIsXCJpc284ODU5MTVcIixcImlzb184ODU5LTE1XCIsXCJsOVwiXSxuYW1lOlwiSVNPLTg4NTktMTVcIn0se2xhYmVsczpbXCJpc28tODg1OS0xNlwiXSxuYW1lOlwiSVNPLTg4NTktMTZcIn0se2xhYmVsczpbXCJjc2tvaThyXCIsXCJrb2lcIixcImtvaThcIixcImtvaTgtclwiLFwia29pOF9yXCJdLG5hbWU6XCJLT0k4LVJcIn0se2xhYmVsczpbXCJrb2k4LXJ1XCIsXCJrb2k4LXVcIl0sbmFtZTpcIktPSTgtVVwifSx7bGFiZWxzOltcImNzbWFjaW50b3NoXCIsXCJtYWNcIixcIm1hY2ludG9zaFwiLFwieC1tYWMtcm9tYW5cIl0sbmFtZTpcIm1hY2ludG9zaFwifSx7bGFiZWxzOltcImRvcy04NzRcIixcImlzby04ODU5LTExXCIsXCJpc284ODU5LTExXCIsXCJpc284ODU5MTFcIixcInRpcy02MjBcIixcIndpbmRvd3MtODc0XCJdLG5hbWU6XCJ3aW5kb3dzLTg3NFwifSx7bGFiZWxzOltcImNwMTI1MFwiLFwid2luZG93cy0xMjUwXCIsXCJ4LWNwMTI1MFwiXSxuYW1lOlwid2luZG93cy0xMjUwXCJ9LHtsYWJlbHM6W1wiY3AxMjUxXCIsXCJ3aW5kb3dzLTEyNTFcIixcIngtY3AxMjUxXCJdLG5hbWU6XCJ3aW5kb3dzLTEyNTFcIn0se2xhYmVsczpbXCJhbnNpX3gzLjQtMTk2OFwiLFwiYXNjaWlcIixcImNwMTI1MlwiLFwiY3A4MTlcIixcImNzaXNvbGF0aW4xXCIsXCJpYm04MTlcIixcImlzby04ODU5LTFcIixcImlzby1pci0xMDBcIixcImlzbzg4NTktMVwiLFwiaXNvODg1OTFcIixcImlzb184ODU5LTFcIixcImlzb184ODU5LTE6MTk4N1wiLFwibDFcIixcImxhdGluMVwiLFwidXMtYXNjaWlcIixcIndpbmRvd3MtMTI1MlwiLFwieC1jcDEyNTJcIl0sbmFtZTpcIndpbmRvd3MtMTI1MlwifSx7bGFiZWxzOltcImNwMTI1M1wiLFwid2luZG93cy0xMjUzXCIsXCJ4LWNwMTI1M1wiXSxuYW1lOlwid2luZG93cy0xMjUzXCJ9LHtsYWJlbHM6W1wiY3AxMjU0XCIsXCJjc2lzb2xhdGluNVwiLFwiaXNvLTg4NTktOVwiLFwiaXNvLWlyLTE0OFwiLFwiaXNvODg1OS05XCIsXCJpc284ODU5OVwiLFwiaXNvXzg4NTktOVwiLFwiaXNvXzg4NTktOToxOTg5XCIsXCJsNVwiLFwibGF0aW41XCIsXCJ3aW5kb3dzLTEyNTRcIixcIngtY3AxMjU0XCJdLG5hbWU6XCJ3aW5kb3dzLTEyNTRcIn0se2xhYmVsczpbXCJjcDEyNTVcIixcIndpbmRvd3MtMTI1NVwiLFwieC1jcDEyNTVcIl0sbmFtZTpcIndpbmRvd3MtMTI1NVwifSx7bGFiZWxzOltcImNwMTI1NlwiLFwid2luZG93cy0xMjU2XCIsXCJ4LWNwMTI1NlwiXSxuYW1lOlwid2luZG93cy0xMjU2XCJ9LHtsYWJlbHM6W1wiY3AxMjU3XCIsXCJ3aW5kb3dzLTEyNTdcIixcIngtY3AxMjU3XCJdLG5hbWU6XCJ3aW5kb3dzLTEyNTdcIn0se2xhYmVsczpbXCJjcDEyNThcIixcIndpbmRvd3MtMTI1OFwiLFwieC1jcDEyNThcIl0sbmFtZTpcIndpbmRvd3MtMTI1OFwifSx7bGFiZWxzOltcIngtbWFjLWN5cmlsbGljXCIsXCJ4LW1hYy11a3JhaW5pYW5cIl0sbmFtZTpcIngtbWFjLWN5cmlsbGljXCJ9XSxoZWFkaW5nOlwiTGVnYWN5IHNpbmdsZS1ieXRlIGVuY29kaW5nc1wifSx7ZW5jb2RpbmdzOlt7bGFiZWxzOltcImNoaW5lc2VcIixcImNzZ2IyMzEyXCIsXCJjc2lzbzU4Z2IyMzEyODBcIixcImdiMjMxMlwiLFwiZ2JfMjMxMlwiLFwiZ2JfMjMxMi04MFwiLFwiZ2JrXCIsXCJpc28taXItNThcIixcIngtZ2JrXCJdLG5hbWU6XCJHQktcIn0se2xhYmVsczpbXCJnYjE4MDMwXCJdLG5hbWU6XCJnYjE4MDMwXCJ9XSxoZWFkaW5nOlwiTGVnYWN5IG11bHRpLWJ5dGUgQ2hpbmVzZSAoc2ltcGxpZmllZCkgZW5jb2RpbmdzXCJ9LHtlbmNvZGluZ3M6W3tsYWJlbHM6W1wiYmlnNVwiLFwiYmlnNS1oa3Njc1wiLFwiY24tYmlnNVwiLFwiY3NiaWc1XCIsXCJ4LXgtYmlnNVwiXSxuYW1lOlwiQmlnNVwifV0saGVhZGluZzpcIkxlZ2FjeSBtdWx0aS1ieXRlIENoaW5lc2UgKHRyYWRpdGlvbmFsKSBlbmNvZGluZ3NcIn0se2VuY29kaW5nczpbe2xhYmVsczpbXCJjc2V1Y3BrZGZtdGphcGFuZXNlXCIsXCJldWMtanBcIixcIngtZXVjLWpwXCJdLG5hbWU6XCJFVUMtSlBcIn0se2xhYmVsczpbXCJjc2lzbzIwMjJqcFwiLFwiaXNvLTIwMjItanBcIl0sbmFtZTpcIklTTy0yMDIyLUpQXCJ9LHtsYWJlbHM6W1wiY3NzaGlmdGppc1wiLFwibXM5MzJcIixcIm1zX2thbmppXCIsXCJzaGlmdC1qaXNcIixcInNoaWZ0X2ppc1wiLFwic2ppc1wiLFwid2luZG93cy0zMWpcIixcIngtc2ppc1wiXSxuYW1lOlwiU2hpZnRfSklTXCJ9XSxoZWFkaW5nOlwiTGVnYWN5IG11bHRpLWJ5dGUgSmFwYW5lc2UgZW5jb2RpbmdzXCJ9LHtlbmNvZGluZ3M6W3tsYWJlbHM6W1wiY3NldWNrclwiLFwiY3Nrc2M1NjAxMTk4N1wiLFwiZXVjLWtyXCIsXCJpc28taXItMTQ5XCIsXCJrb3JlYW5cIixcImtzX2NfNTYwMS0xOTg3XCIsXCJrc19jXzU2MDEtMTk4OVwiLFwia3NjNTYwMVwiLFwia3NjXzU2MDFcIixcIndpbmRvd3MtOTQ5XCJdLG5hbWU6XCJFVUMtS1JcIn1dLGhlYWRpbmc6XCJMZWdhY3kgbXVsdGktYnl0ZSBLb3JlYW4gZW5jb2RpbmdzXCJ9LHtlbmNvZGluZ3M6W3tsYWJlbHM6W1wiY3Npc28yMDIya3JcIixcImh6LWdiLTIzMTJcIixcImlzby0yMDIyLWNuXCIsXCJpc28tMjAyMi1jbi1leHRcIixcImlzby0yMDIyLWtyXCJdLG5hbWU6XCJyZXBsYWNlbWVudFwifSx7bGFiZWxzOltcInV0Zi0xNmJlXCJdLG5hbWU6XCJVVEYtMTZCRVwifSx7bGFiZWxzOltcInV0Zi0xNlwiLFwidXRmLTE2bGVcIl0sbmFtZTpcIlVURi0xNkxFXCJ9LHtsYWJlbHM6W1wieC11c2VyLWRlZmluZWRcIl0sbmFtZTpcIngtdXNlci1kZWZpbmVkXCJ9XSxoZWFkaW5nOlwiTGVnYWN5IG1pc2NlbGxhbmVvdXMgZW5jb2RpbmdzXCJ9XSxkPXt9LGg9KG4uZm9yRWFjaChmdW5jdGlvbihuKXtuLmVuY29kaW5ncy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UubGFiZWxzLmZvckVhY2goZnVuY3Rpb24obil7ZFtuXT1lfSl9KX0pLHt9KSxnPXt9O2Z1bmN0aW9uIHkobixlKXtyZXR1cm4gZSYmZVtuXXx8bnVsbH1mdW5jdGlvbiBwKG4sZSl7ZT1lLmluZGV4T2Yobik7cmV0dXJuLTE9PT1lP251bGw6ZX1mdW5jdGlvbiB2KG4pe2lmKFwiZW5jb2RpbmctaW5kZXhlc1wiaW4gaSlyZXR1cm4gaVtcImVuY29kaW5nLWluZGV4ZXNcIl1bbl07dGhyb3cgRXJyb3IoXCJJbmRleGVzIG1pc3NpbmcuIERpZCB5b3UgZm9yZ2V0IHRvIGluY2x1ZGUgZW5jb2RpbmctaW5kZXhlcy5qcyBmaXJzdD9cIil9dmFyIHg9XCJ1dGYtOFwiO2Z1bmN0aW9uIE8obixlKXtpZighKHRoaXMgaW5zdGFuY2VvZiBPKSl0aHJvdyBUeXBlRXJyb3IoXCJDYWxsZWQgYXMgYSBmdW5jdGlvbi4gRGlkIHlvdSBmb3JnZXQgJ25ldyc/XCIpO249dm9pZCAwIT09bj9TdHJpbmcobik6eCxlPXMoZSksdGhpcy5fZW5jb2Rpbmc9bnVsbCx0aGlzLl9kZWNvZGVyPW51bGwsdGhpcy5faWdub3JlQk9NPSExLHRoaXMuX0JPTXNlZW49ITEsdGhpcy5fZXJyb3JfbW9kZT1cInJlcGxhY2VtZW50XCIsdGhpcy5fZG9fbm90X2ZsdXNoPSExO3ZhciBpPXIobik7aWYobnVsbD09PWl8fFwicmVwbGFjZW1lbnRcIj09PWkubmFtZSl0aHJvdyBSYW5nZUVycm9yKFwiVW5rbm93biBlbmNvZGluZzogXCIrbik7aWYoZ1tpLm5hbWVdKXJldHVybihuPXRoaXMpLl9lbmNvZGluZz1pLEJvb2xlYW4oZS5mYXRhbCkmJihuLl9lcnJvcl9tb2RlPVwiZmF0YWxcIiksQm9vbGVhbihlLmlnbm9yZUJPTSkmJihuLl9pZ25vcmVCT009ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eXx8KHRoaXMuZW5jb2Rpbmc9bi5fZW5jb2RpbmcubmFtZS50b0xvd2VyQ2FzZSgpLHRoaXMuZmF0YWw9XCJmYXRhbFwiPT09bi5fZXJyb3JfbW9kZSx0aGlzLmlnbm9yZUJPTT1uLl9pZ25vcmVCT00pLG47dGhyb3cgRXJyb3IoXCJEZWNvZGVyIG5vdCBwcmVzZW50LiBEaWQgeW91IGZvcmdldCB0byBpbmNsdWRlIGVuY29kaW5nLWluZGV4ZXMuanMgZmlyc3Q/XCIpfWZ1bmN0aW9uIGsobixlKXtpZighKHRoaXMgaW5zdGFuY2VvZiBrKSl0aHJvdyBUeXBlRXJyb3IoXCJDYWxsZWQgYXMgYSBmdW5jdGlvbi4gRGlkIHlvdSBmb3JnZXQgJ25ldyc/XCIpO2U9cyhlKSx0aGlzLl9lbmNvZGluZz1udWxsLHRoaXMuX2VuY29kZXI9bnVsbCx0aGlzLl9kb19ub3RfZmx1c2g9ITEsdGhpcy5fZmF0YWw9Qm9vbGVhbihlLmZhdGFsKT9cImZhdGFsXCI6XCJyZXBsYWNlbWVudFwiO2lmKEJvb2xlYW4oZS5OT05TVEFOREFSRF9hbGxvd0xlZ2FjeUVuY29kaW5nKSl7ZT1yKG49dm9pZCAwIT09bj9TdHJpbmcobik6eCk7aWYobnVsbD09PWV8fFwicmVwbGFjZW1lbnRcIj09PWUubmFtZSl0aHJvdyBSYW5nZUVycm9yKFwiVW5rbm93biBlbmNvZGluZzogXCIrbik7aWYoIWhbZS5uYW1lXSl0aHJvdyBFcnJvcihcIkVuY29kZXIgbm90IHByZXNlbnQuIERpZCB5b3UgZm9yZ2V0IHRvIGluY2x1ZGUgZW5jb2RpbmctaW5kZXhlcy5qcyBmaXJzdD9cIik7dGhpcy5fZW5jb2Rpbmc9ZX1lbHNlIHRoaXMuX2VuY29kaW5nPXIoXCJ1dGYtOFwiKSx2b2lkIDAhPT1uJiZcImNvbnNvbGVcImluIGkmJmNvbnNvbGUud2FybihcIlRleHRFbmNvZGVyIGNvbnN0cnVjdG9yIGNhbGxlZCB3aXRoIGVuY29kaW5nIGxhYmVsLCB3aGljaCBpcyBpZ25vcmVkLlwiKTtyZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5fHwodGhpcy5lbmNvZGluZz10aGlzLl9lbmNvZGluZy5uYW1lLnRvTG93ZXJDYXNlKCkpLHRoaXN9ZnVuY3Rpb24gZShuKXt2YXIgcj1uLmZhdGFsLHQ9MCxvPTAscz0wLGw9MTI4LGE9MTkxO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe2lmKGU9PT1iJiYwIT09cylyZXR1cm4gcz0wLG0ocik7aWYoZT09PWIpcmV0dXJuIHc7aWYoMD09PXMpe2lmKF8oZSwwLDEyNykpcmV0dXJuIGU7aWYoXyhlLDE5NCwyMjMpKXM9MSx0PTMxJmU7ZWxzZSBpZihfKGUsMjI0LDIzOSkpMjI0PT09ZSYmKGw9MTYwKSwyMzc9PT1lJiYoYT0xNTkpLHM9Mix0PTE1JmU7ZWxzZXtpZighXyhlLDI0MCwyNDQpKXJldHVybiBtKHIpOzI0MD09PWUmJihsPTE0NCksMjQ0PT09ZSYmKGE9MTQzKSxzPTMsdD03JmV9cmV0dXJuIG51bGx9dmFyIGk7cmV0dXJuIF8oZSxsLGEpPyhsPTEyOCxhPTE5MSx0PXQ8PDZ8NjMmZSwobys9MSkhPT1zP251bGw6KGk9dCx0PXM9bz0wLGkpKToodD1zPW89MCxsPTEyOCxhPTE5MSxuLnByZXBlbmQoZSksbShyKSl9fWZ1bmN0aW9uIEUobil7bi5mYXRhbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXtpZihlPT09YilyZXR1cm4gdztpZihhKGUpKXJldHVybiBlO18oZSwxMjgsMjA0Nyk/KGk9MSxyPTE5Mik6XyhlLDIwNDgsNjU1MzUpPyhpPTIscj0yMjQpOl8oZSw2NTUzNiwxMTE0MTExKSYmKGk9MyxyPTI0MCk7Zm9yKHZhciBpLHIsdD1bKGU+PjYqaSkrcl07MDxpOyl0LnB1c2goMTI4fDYzJmU+PjYqKGktMSkpLC0taTtyZXR1cm4gdH19ZnVuY3Rpb24gaihpLG4pe3ZhciByPW4uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7cmV0dXJuIGU9PT1iP3c6dShlKT9lOm51bGw9PT0oZT1pW2UtMTI4XSk/bShyKTplfX1mdW5jdGlvbiBCKHIsbil7bi5mYXRhbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXt2YXIgaTtyZXR1cm4gZT09PWI/dzphKGUpP2U6KG51bGw9PT0oaT1wKGUscikpJiZmKGUpLGkrMTI4KX19ZnVuY3Rpb24gUyhuKXt2YXIgbz1uLmZhdGFsLHM9MCxsPTAsYT0wO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpLHIsdDtyZXR1cm4gZT09PWImJjA9PT1zJiYwPT09bCYmMD09PWE/dzooZSE9PWJ8fDA9PT1zJiYwPT09bCYmMD09PWF8fChhPWw9cz0wLG0obykpLDAhPT1hPyhpPW51bGwsXyhlLDQ4LDU3KSYmKGk9ZnVuY3Rpb24obil7aWYoMzk0MTk8biYmbjwxODllM3x8MTIzNzU3NTxuKXJldHVybiBudWxsO2lmKDc0NTc9PT1uKXJldHVybiA1OTMzNTtmb3IodmFyIGU9MCxpPTAscj12KFwiZ2IxODAzMC1yYW5nZXNcIiksdD0wO3Q8ci5sZW5ndGg7Kyt0KXt2YXIgbz1yW3RdO2lmKCEob1swXTw9bikpYnJlYWs7ZT1vWzBdLGk9b1sxXX1yZXR1cm4gaStuLWV9KDEwKigxMjYqKDEwKihzLTEyOSkrbC00OCkrYS0xMjkpK2UtNDgpKSxyPVtsLGEsZV0sYT1sPXM9MCxudWxsPT09aT8obi5wcmVwZW5kKHIpLG0obykpOmkpOjAhPT1sP18oZSwxMjksMjU0KT8oYT1lLG51bGwpOihuLnByZXBlbmQoW2wsZV0pLGw9cz0wLG0obykpOjAhPT1zP18oZSw0OCw1Nyk/KGw9ZSxudWxsKToocj1zLHM9MCwodD1udWxsKT09PShpPW51bGw9PT0odD1fKGUsNjQsMTI2KXx8XyhlLDEyOCwyNTQpPzE5MCooci0xMjkpKyhlLShlPDEyNz82NDo2NSkpOnQpP251bGw6eSh0LHYoXCJnYjE4MDMwXCIpKSkmJnUoZSkmJm4ucHJlcGVuZChlKSxudWxsPT09aT9tKG8pOmkpOnUoZSk/ZToxMjg9PT1lPzgzNjQ6XyhlLDEyOSwyNTQpPyhzPWUsbnVsbCk6bShvKSl9fWZ1bmN0aW9uIFQobix0KXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpLHI7cmV0dXJuIGU9PT1iP3c6YShlKT9lOjU4ODUzPT09ZT9mKGUpOnQmJjgzNjQ9PT1lPzEyODpudWxsIT09KGk9cChlLHYoXCJnYjE4MDMwXCIpKSk/KHI9aSUxOTAsW2woaS8xOTApKzEyOSxyKyhyPDYzPzY0OjY1KV0pOnQ/ZihlKTooaT1mdW5jdGlvbihuKXtpZig1OTMzNT09PW4pcmV0dXJuIDc0NTc7Zm9yKHZhciBlPTAsaT0wLHI9dihcImdiMTgwMzAtcmFuZ2VzXCIpLHQ9MDt0PHIubGVuZ3RoOysrdCl7dmFyIG89clt0XTtpZighKG9bMV08PW4pKWJyZWFrO2U9b1sxXSxpPW9bMF19cmV0dXJuIGkrbi1lfShlKSxbKHI9bChpLzEwLzEyNi8xMCkpKzEyOSwoZT1sKChpLT0xMCpyKjEyNioxMCkvMTAvMTI2KSkrNDgsKHI9bCgoaS09MTAqZSoxMjYpLzEwKSkrMTI5LDQ4KyhpLTEwKnIpXSl9fWZ1bmN0aW9uIEkobil7dmFyIHQ9bi5mYXRhbCxvPTA7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7aWYoZT09PWImJjAhPT1vKXJldHVybiBvPTAsbSh0KTtpZihlPT09YiYmMD09PW8pcmV0dXJuIHc7aWYoMD09PW8pcmV0dXJuIHUoZSk/ZTpfKGUsMTI5LDI1NCk/KG89ZSxudWxsKTptKHQpO3ZhciBpPW8scj1udWxsO3N3aXRjaChvPTAscj1fKGUsNjQsMTI2KXx8XyhlLDE2MSwyNTQpPzE1NyooaS0xMjkpKyhlLShlPDEyNz82NDo5OCkpOnIpe2Nhc2UgMTEzMzpyZXR1cm5bMjAyLDc3Ml07Y2FzZSAxMTM1OnJldHVyblsyMDIsNzgwXTtjYXNlIDExNjQ6cmV0dXJuWzIzNCw3NzJdO2Nhc2UgMTE2NjpyZXR1cm5bMjM0LDc4MF19aT1udWxsPT09cj9udWxsOnkocix2KFwiYmlnNVwiKSk7cmV0dXJuIG51bGw9PT1pJiZ1KGUpJiZuLnByZXBlbmQoZSksbnVsbD09PWk/bSh0KTppfX1mdW5jdGlvbiBVKG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGkscjtyZXR1cm4gZT09PWI/dzphKGUpP2U6KGk9ZSxyPW89b3x8dihcImJpZzVcIikubWFwKGZ1bmN0aW9uKG4sZSl7cmV0dXJuIGU8NTAyND9udWxsOm59KSxudWxsPT09KGk9OTU1Mj09PWl8fDk1NjY9PT1pfHw5NTY5PT09aXx8OTU3OD09PWl8fDIxMzEzPT09aXx8MjEzMTc9PT1pP3IubGFzdEluZGV4T2YoaSk6cChpLHIpKXx8KHI9bChpLzE1NykrMTI5KTwxNjE/ZihlKTpbciwoZT1pJTE1NykrKGU8NjM/NjQ6OTgpXSl9fWZ1bmN0aW9uIEMobil7dmFyIHQ9bi5mYXRhbCxvPSExLHM9MDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXt2YXIgaSxyO3JldHVybiBlPT09YiYmMCE9PXM/KHM9MCxtKHQpKTplPT09YiYmMD09PXM/dzoxNDI9PT1zJiZfKGUsMTYxLDIyMyk/KHM9MCw2NTIxNitlKToxNDM9PT1zJiZfKGUsMTYxLDI1NCk/KG89ITAscz1lLG51bGwpOjAhPT1zPyhpPXMscz0wLHI9bnVsbCxfKGksMTYxLDI1NCkmJl8oZSwxNjEsMjU0KSYmKHI9eSg5NCooaS0xNjEpKyhlLTE2MSksdihvP1wiamlzMDIxMlwiOlwiamlzMDIwOFwiKSkpLG89ITEsXyhlLDE2MSwyNTQpfHxuLnByZXBlbmQoZSksbnVsbD09PXI/bSh0KTpyKTp1KGUpP2U6MTQyPT09ZXx8MTQzPT09ZXx8XyhlLDE2MSwyNTQpPyhzPWUsbnVsbCk6bSh0KX19ZnVuY3Rpb24gUChuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpO3JldHVybiBlPT09Yj93OmEoZSk/ZToxNjU9PT1lPzkyOjgyNTQ9PT1lPzEyNjpfKGUsNjUzNzcsNjU0MzkpP1sxNDIsZS02NTM3NysxNjFdOm51bGw9PT0oaT1wKGU9ODcyMj09PWU/NjUyOTM6ZSx2KFwiamlzMDIwOFwiKSkpP2YoZSk6W2woaS85NCkrMTYxLGklOTQrMTYxXX19ZnVuY3Rpb24gRChuKXt2YXIgdD1uLmZhdGFsLG89MCxzPTEsbD0yLGE9Myx1PTQsYz01LGY9NixkPW8saD1vLGc9MCxwPSExO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3N3aXRjaChkKXtkZWZhdWx0OmNhc2UgbzpyZXR1cm4gMjc9PT1lPyhkPWMsbnVsbCk6XyhlLDAsMTI3KSYmMTQhPT1lJiYxNSE9PWUmJjI3IT09ZT8ocD0hMSxlKTplPT09Yj93OihwPSExLG0odCkpO2Nhc2UgczpyZXR1cm4gMjc9PT1lPyhkPWMsbnVsbCk6OTI9PT1lPyhwPSExLDE2NSk6MTI2PT09ZT8ocD0hMSw4MjU0KTpfKGUsMCwxMjcpJiYxNCE9PWUmJjE1IT09ZSYmMjchPT1lJiY5MiE9PWUmJjEyNiE9PWU/KHA9ITEsZSk6ZT09PWI/dzoocD0hMSxtKHQpKTtjYXNlIGw6cmV0dXJuIDI3PT09ZT8oZD1jLG51bGwpOl8oZSwzMyw5NSk/KHA9ITEsNjUzNDQrZSk6ZT09PWI/dzoocD0hMSxtKHQpKTtjYXNlIGE6cmV0dXJuIDI3PT09ZT8oZD1jLG51bGwpOl8oZSwzMywxMjYpPyhwPSExLGc9ZSxkPXUsbnVsbCk6ZT09PWI/dzoocD0hMSxtKHQpKTtjYXNlIHU6aWYoMjc9PT1lKWQ9YztlbHNle2lmKF8oZSwzMywxMjYpKXJldHVybiBkPWEsbnVsbD09PShpPXkoOTQqKGctMzMpK2UtMzMsdihcImppczAyMDhcIikpKT9tKHQpOmk7ZT09PWI/KGQ9YSxuLnByZXBlbmQoZSkpOmQ9YX1yZXR1cm4gbSh0KTtjYXNlIGM6cmV0dXJuIDM2PT09ZXx8NDA9PT1lPyhnPWUsZD1mLG51bGwpOihuLnByZXBlbmQoZSkscD0hMSxkPWgsbSh0KSk7Y2FzZSBmOnZhciBpPWcscj0oZz0wLG51bGwpO3JldHVybig0MD09PWkmJjY2PT09ZSYmKHI9byksNDA9PT1pJiY3ND09PWUmJihyPXMpLDQwPT09aSYmNzM9PT1lJiYocj1sKSxudWxsIT09KHI9MzYhPT1pfHw2NCE9PWUmJjY2IT09ZT9yOmEpKT8oZD1yLHI9cCxwPSEwLHI/bSh0KTpudWxsKToobi5wcmVwZW5kKFtpLGVdKSxwPSExLGQ9aCxtKHQpKX19fWZ1bmN0aW9uIEYobil7bi5mYXRhbDt2YXIgcj0wLHQ9MSxvPTIscz1yO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe2lmKGU9PT1iJiZzIT09cilyZXR1cm4gbi5wcmVwZW5kKGUpLHM9cixbMjcsNDAsNjZdO2lmKGU9PT1iJiZzPT09cilyZXR1cm4gdztpZighKHMhPT1yJiZzIT09dHx8MTQhPT1lJiYxNSE9PWUmJjI3IT09ZSkpcmV0dXJuIGYoNjU1MzMpO2lmKHM9PT1yJiZhKGUpKXJldHVybiBlO2lmKHM9PT10JiYoYShlKSYmOTIhPT1lJiYxMjYhPT1lfHwxNjU9PWV8fDgyNTQ9PWUpKXtpZihhKGUpKXJldHVybiBlO2lmKDE2NT09PWUpcmV0dXJuIDkyO2lmKDgyNTQ9PT1lKXJldHVybiAxMjZ9dmFyIGk7cmV0dXJuIGEoZSkmJnMhPT1yPyhuLnByZXBlbmQoZSkscz1yLFsyNyw0MCw2Nl0pOjE2NSE9PWUmJjgyNTQhPT1lfHxzPT09dD9udWxsPT09KGk9cChlPTg3MjI9PT1lPzY1MjkzOmUsdihcImppczAyMDhcIikpKT9mKGUpOnMhPT1vPyhuLnByZXBlbmQoZSkscz1vLFsyNywzNiw2Nl0pOltsKGkvOTQpKzMzLGklOTQrMzNdOihuLnByZXBlbmQoZSkscz10LFsyNyw0MCw3NF0pfX1mdW5jdGlvbiBKKG4pe3ZhciB0PW4uZmF0YWwsbz0wO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpLHI7cmV0dXJuIGU9PT1iJiYwIT09bz8obz0wLG0odCkpOmU9PT1iJiYwPT09bz93OjAhPT1vPyhyPW8saT1udWxsLG89MCwoXyhlLDY0LDEyNil8fF8oZSwxMjgsMjUyKSkmJihpPTE4OCooci0ocjwxNjA/MTI5OjE5MykpK2UtKGU8MTI3PzY0OjY1KSksXyhpLDg4MzYsMTA3MTUpPzQ4NTA4K2k6KG51bGw9PT0ocj1udWxsPT09aT9udWxsOnkoaSx2KFwiamlzMDIwOFwiKSkpJiZ1KGUpJiZuLnByZXBlbmQoZSksbnVsbD09PXI/bSh0KTpyKSk6dShlKXx8MTI4PT09ZT9lOl8oZSwxNjEsMjIzKT82NTIxNitlOl8oZSwxMjksMTU5KXx8XyhlLDIyNCwyNTIpPyhvPWUsbnVsbCk6bSh0KX19ZnVuY3Rpb24gSyhuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpO3JldHVybiBlPT09Yj93OmEoZSl8fDEyOD09PWU/ZToxNjU9PT1lPzkyOjgyNTQ9PT1lPzEyNjpfKGUsNjUzNzcsNjU0MzkpP2UtNjUzNzcrMTYxOihpPWU9ODcyMj09PWU/NjUyOTM6ZSxudWxsPT09KGk9KHQ9dHx8dihcImppczAyMDhcIikubWFwKGZ1bmN0aW9uKG4sZSl7cmV0dXJuIF8oZSw4MjcyLDg4MzUpP251bGw6bn0pKS5pbmRleE9mKGkpKT9mKGUpOlsoZT1sKGkvMTg4KSkrKGU8MzE/MTI5OjE5MyksKGU9aSUxODgpKyhlPDYzPzY0OjY1KV0pfX1mdW5jdGlvbiBSKG4pe3ZhciB0PW4uZmF0YWwsbz0wO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpLHI7cmV0dXJuIGU9PT1iJiYwIT09bz8obz0wLG0odCkpOmU9PT1iJiYwPT09bz93OjAhPT1vPyhyPW8sbz0wLHI9KGk9bnVsbCk9PT0oaT1fKGUsNjUsMjU0KT8xOTAqKHItMTI5KSsoZS02NSk6aSk/bnVsbDp5KGksdihcImV1Yy1rclwiKSksbnVsbD09PWkmJnUoZSkmJm4ucHJlcGVuZChlKSxudWxsPT09cj9tKHQpOnIpOnUoZSk/ZTpfKGUsMTI5LDI1NCk/KG89ZSxudWxsKTptKHQpfX1mdW5jdGlvbiBHKG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGk7cmV0dXJuIGU9PT1iP3c6YShlKT9lOm51bGw9PT0oaT1wKGUsdihcImV1Yy1rclwiKSkpP2YoZSk6W2woaS8xOTApKzEyOSxpJTE5MCs2NV19fWZ1bmN0aW9uIEEobixlKXt2YXIgaT1uPj44LG49MjU1Jm47cmV0dXJuIGU/W2ksbl06W24saV19ZnVuY3Rpb24gTChyLG4pe3ZhciB0PW4uZmF0YWwsbz1udWxsLHM9bnVsbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXt2YXIgaTtyZXR1cm4gZSE9PWJ8fG51bGw9PT1vJiZudWxsPT09cz9lPT09YiYmbnVsbD09PW8mJm51bGw9PT1zP3c6bnVsbD09PW8/KG89ZSxudWxsKTooZT1yPyhvPDw4KStlOihlPDw4KStvLChvPW51bGwpIT09cz8oaT1zLHM9bnVsbCxfKGUsNTYzMjAsNTczNDMpPzY1NTM2KzEwMjQqKGktNTUyOTYpKyhlLTU2MzIwKToobi5wcmVwZW5kKEEoZSxyKSksbSh0KSkpOl8oZSw1NTI5Niw1NjMxOSk/KHM9ZSxudWxsKTpfKGUsNTYzMjAsNTczNDMpP20odCk6ZSk6bSh0KX19ZnVuY3Rpb24gTShyLG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGk7cmV0dXJuIGU9PT1iP3c6XyhlLDAsNjU1MzUpP0EoZSxyKTooaT1BKDU1Mjk2KyhlLTY1NTM2Pj4xMCksciksZT1BKDU2MzIwKyhlLTY1NTM2JjEwMjMpLHIpLGkuY29uY2F0KGUpKX19ZnVuY3Rpb24gTihuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3JldHVybiBlPT09Yj93OnUoZSk/ZTo2MzM2MCtlLTEyOH19ZnVuY3Rpb24gcShuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3JldHVybiBlPT09Yj93OmEoZSk/ZTpfKGUsNjMzNjAsNjM0ODcpP2UtNjMzNjArMTI4OmYoZSl9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmKE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLnByb3RvdHlwZSxcImVuY29kaW5nXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9lbmNvZGluZy5uYW1lLnRvTG93ZXJDYXNlKCl9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KE8ucHJvdG90eXBlLFwiZmF0YWxcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuXCJmYXRhbFwiPT09dGhpcy5fZXJyb3JfbW9kZX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoTy5wcm90b3R5cGUsXCJpZ25vcmVCT01cIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2lnbm9yZUJPTX19KSksTy5wcm90b3R5cGUuZGVjb2RlPWZ1bmN0aW9uKG4sZSl7bj1cIm9iamVjdFwiPT10eXBlb2YgbiYmbiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyP25ldyBVaW50OEFycmF5KG4pOlwib2JqZWN0XCI9PXR5cGVvZiBuJiZcImJ1ZmZlclwiaW4gbiYmbi5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcj9uZXcgVWludDhBcnJheShuLmJ1ZmZlcixuLmJ5dGVPZmZzZXQsbi5ieXRlTGVuZ3RoKTpuZXcgVWludDhBcnJheSgwKTtlPXMoZSksdGhpcy5fZG9fbm90X2ZsdXNofHwodGhpcy5fZGVjb2Rlcj1nW3RoaXMuX2VuY29kaW5nLm5hbWVdKHtmYXRhbDpcImZhdGFsXCI9PT10aGlzLl9lcnJvcl9tb2RlfSksdGhpcy5fQk9Nc2Vlbj0hMSksdGhpcy5fZG9fbm90X2ZsdXNoPUJvb2xlYW4oZS5zdHJlYW0pO2Zvcih2YXIgaSxyPW5ldyBjKG4pLHQ9W107Oyl7dmFyIG89ci5yZWFkKCk7aWYobz09PWIpYnJlYWs7aWYoKGk9dGhpcy5fZGVjb2Rlci5oYW5kbGVyKHIsbykpPT09dylicmVhaztudWxsIT09aSYmKEFycmF5LmlzQXJyYXkoaSk/dC5wdXNoLmFwcGx5KHQsaSk6dC5wdXNoKGkpKX1pZighdGhpcy5fZG9fbm90X2ZsdXNoKXtmb3IoOyhpPXRoaXMuX2RlY29kZXIuaGFuZGxlcihyLHIucmVhZCgpKSkhPT13JiYobnVsbCE9PWkmJihBcnJheS5pc0FycmF5KGkpP3QucHVzaC5hcHBseSh0LGkpOnQucHVzaChpKSksIXIuZW5kT2ZTdHJlYW0oKSk7KTt0aGlzLl9kZWNvZGVyPW51bGx9cmV0dXJuIGZ1bmN0aW9uKG4pe2U9W1wiVVRGLThcIixcIlVURi0xNkxFXCIsXCJVVEYtMTZCRVwiXSxpPXRoaXMuX2VuY29kaW5nLm5hbWUsLTE9PT1lLmluZGV4T2YoaSl8fHRoaXMuX2lnbm9yZUJPTXx8dGhpcy5fQk9Nc2Vlbnx8KDA8bi5sZW5ndGgmJjY1Mjc5PT09blswXT8odGhpcy5fQk9Nc2Vlbj0hMCxuLnNoaWZ0KCkpOjA8bi5sZW5ndGgmJih0aGlzLl9CT01zZWVuPSEwKSk7Zm9yKHZhciBlLGkscj1uLHQ9XCJcIixvPTA7bzxyLmxlbmd0aDsrK28pe3ZhciBzPXJbb107czw9NjU1MzU/dCs9U3RyaW5nLmZyb21DaGFyQ29kZShzKToocy09NjU1MzYsdCs9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5Nisocz4+MTApLDU2MzIwKygxMDIzJnMpKSl9cmV0dXJuIHR9LmNhbGwodGhpcyx0KX0sT2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZGVmaW5lUHJvcGVydHkoay5wcm90b3R5cGUsXCJlbmNvZGluZ1wiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZW5jb2RpbmcubmFtZS50b0xvd2VyQ2FzZSgpfX0pLGsucHJvdG90eXBlLmVuY29kZT1mdW5jdGlvbihuLGUpe249dm9pZCAwPT09bj9cIlwiOlN0cmluZyhuKSxlPXMoZSksdGhpcy5fZG9fbm90X2ZsdXNofHwodGhpcy5fZW5jb2Rlcj1oW3RoaXMuX2VuY29kaW5nLm5hbWVdKHtmYXRhbDpcImZhdGFsXCI9PT10aGlzLl9mYXRhbH0pKSx0aGlzLl9kb19ub3RfZmx1c2g9Qm9vbGVhbihlLnN0cmVhbSk7Zm9yKHZhciBpLHI9bmV3IGMoZnVuY3Rpb24obil7Zm9yKHZhciBlPVN0cmluZyhuKSxpPWUubGVuZ3RoLHI9MCx0PVtdO3I8aTspe3ZhciBvLHM9ZS5jaGFyQ29kZUF0KHIpO3M8NTUyOTZ8fDU3MzQzPHM/dC5wdXNoKHMpOjU2MzIwPD1zJiZzPD01NzM0Mz90LnB1c2goNjU1MzMpOjU1Mjk2PD1zJiZzPD01NjMxOSYmKHIhPT1pLTEmJjU2MzIwPD0obz1lLmNoYXJDb2RlQXQocisxKSkmJm88PTU3MzQzPyh0LnB1c2goNjU1MzYrKCgxMDIzJnMpPDwxMCkrKDEwMjMmbykpLHIrPTEpOnQucHVzaCg2NTUzMykpLHIrPTF9cmV0dXJuIHR9KG4pKSx0PVtdOzspe3ZhciBvPXIucmVhZCgpO2lmKG89PT1iKWJyZWFrO2lmKChpPXRoaXMuX2VuY29kZXIuaGFuZGxlcihyLG8pKT09PXcpYnJlYWs7QXJyYXkuaXNBcnJheShpKT90LnB1c2guYXBwbHkodCxpKTp0LnB1c2goaSl9aWYoIXRoaXMuX2RvX25vdF9mbHVzaCl7Zm9yKDs7KXtpZigoaT10aGlzLl9lbmNvZGVyLmhhbmRsZXIocixyLnJlYWQoKSkpPT09dylicmVhaztBcnJheS5pc0FycmF5KGkpP3QucHVzaC5hcHBseSh0LGkpOnQucHVzaChpKX10aGlzLl9lbmNvZGVyPW51bGx9cmV0dXJuIG5ldyBVaW50OEFycmF5KHQpfSxoW1wiVVRGLThcIl09ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBFKG4pfSxnW1wiVVRGLThcIl09ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBlKG4pfSxcImVuY29kaW5nLWluZGV4ZXNcImluIGkmJm4uZm9yRWFjaChmdW5jdGlvbihuKXtcIkxlZ2FjeSBzaW5nbGUtYnl0ZSBlbmNvZGluZ3NcIj09PW4uaGVhZGluZyYmbi5lbmNvZGluZ3MuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgbj1uLm5hbWUsZT12KG4udG9Mb3dlckNhc2UoKSk7Z1tuXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IGooZSxuKX0saFtuXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEIoZSxuKX19KX0pLGcuR0JLPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgUyhuKX0saC5HQks9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBUKG4sITApfSxoLmdiMTgwMzA9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBUKG4pfSxnLmdiMTgwMzA9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBTKG4pfSxoLkJpZzU9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBVKG4pfSxnLkJpZzU9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBJKG4pfSxoW1wiRVVDLUpQXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgUChuKX0sZ1tcIkVVQy1KUFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEMobil9LGhbXCJJU08tMjAyMi1KUFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEYobil9LGdbXCJJU08tMjAyMi1KUFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEQobil9LGguU2hpZnRfSklTPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgSyhuKX0sZy5TaGlmdF9KSVM9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBKKG4pfSxoW1wiRVVDLUtSXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgRyhuKX0sZ1tcIkVVQy1LUlwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IFIobil9LGhbXCJVVEYtMTZCRVwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IE0oITAsbil9LGdbXCJVVEYtMTZCRVwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEwoITAsbil9LGhbXCJVVEYtMTZMRVwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IE0oITEsbil9LGdbXCJVVEYtMTZMRVwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEwoITEsbil9LGhbXCJ4LXVzZXItZGVmaW5lZFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IHEobil9LGdbXCJ4LXVzZXItZGVmaW5lZFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IE4obil9LGkuVGV4dEVuY29kZXJ8fChpLlRleHRFbmNvZGVyPWspLGkuVGV4dERlY29kZXJ8fChpLlRleHREZWNvZGVyPU8pLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9e1RleHRFbmNvZGVyOmkuVGV4dEVuY29kZXIsVGV4dERlY29kZXI6aS5UZXh0RGVjb2RlcixFbmNvZGluZ0luZGV4ZXM6aVtcImVuY29kaW5nLWluZGV4ZXNcIl19KX0odGhpc3x8e30pO1xuXHRcdFx0XHRcdC8vIEBwcm90b2J1Zi10cy9ydW50aW1lXG5cdFx0XHRcdFx0KGk9PntpLnN5bWJvbD1TeW1ib2wuZm9yKFwicHJvdG9idWYtdHMvdW5rbm93blwiKSxpLm9uUmVhZD0oZSxyLHQsYSxuKT0+eyhzKHIpP3JbaS5zeW1ib2xdOnJbaS5zeW1ib2xdPVtdKS5wdXNoKHtubzp0LHdpcmVUeXBlOmEsZGF0YTpufSl9LGkub25Xcml0ZT0oZSxyLHQpPT57Zm9yKHZhcntubzphLHdpcmVUeXBlOm4sZGF0YTpzfW9mIGkubGlzdChyKSl0LnRhZyhhLG4pLnJhdyhzKX0saS5saXN0PShlLHIpPT57cmV0dXJuIHMoZSk/KGU9ZVtpLnN5bWJvbF0scj9lLmZpbHRlcihlPT5lLm5vPT1yKTplKTpbXX0saS5sYXN0PShlLHIpPT4oMCxpLmxpc3QpKGUscikuc2xpY2UoLTEpWzBdO2NvbnN0IHM9ZT0+ZSYmQXJyYXkuaXNBcnJheShlW2kuc3ltYm9sXSl9KShVbmtub3duRmllbGRIYW5kbGVyPVVua25vd25GaWVsZEhhbmRsZXJ8fHt9KTtcblx0XHRcdFx0XHR2YXIgVW5rbm93bkZpZWxkSGFuZGxlcixXaXJlVHlwZT0oZT0+KGVbZS5WYXJpbnQ9MF09XCJWYXJpbnRcIixlW2UuQml0NjQ9MV09XCJCaXQ2NFwiLGVbZS5MZW5ndGhEZWxpbWl0ZWQ9Ml09XCJMZW5ndGhEZWxpbWl0ZWRcIixlW2UuU3RhcnRHcm91cD0zXT1cIlN0YXJ0R3JvdXBcIixlW2UuRW5kR3JvdXA9NF09XCJFbmRHcm91cFwiLGVbZS5CaXQzMj01XT1cIkJpdDMyXCIsZSkpKFdpcmVUeXBlfHx7fSk7Y29uc3QgTUVTU0FHRV9UWVBFPVN5bWJvbC5mb3IoXCJwcm90b2J1Zi10cy9tZXNzYWdlLXR5cGVcIik7ZnVuY3Rpb24gbG93ZXJDYW1lbENhc2Uocil7bGV0IHQ9ITE7dmFyIGE9W107Zm9yKGxldCBlPTA7ZTxyLmxlbmd0aDtlKyspe3ZhciBuPXIuY2hhckF0KGUpO1wiX1wiPT1uP3Q9ITA6L1xcZC8udGVzdChuKT8oYS5wdXNoKG4pLHQ9ITApOnQ/KGEucHVzaChuLnRvVXBwZXJDYXNlKCkpLHQ9ITEpOjA9PWU/YS5wdXNoKG4udG9Mb3dlckNhc2UoKSk6YS5wdXNoKG4pfXJldHVybiBhLmpvaW4oXCJcIil9dmFyIFNjYWxhclR5cGU9KGU9PihlW2UuRE9VQkxFPTFdPVwiRE9VQkxFXCIsZVtlLkZMT0FUPTJdPVwiRkxPQVRcIixlW2UuSU5UNjQ9M109XCJJTlQ2NFwiLGVbZS5VSU5UNjQ9NF09XCJVSU5UNjRcIixlW2UuSU5UMzI9NV09XCJJTlQzMlwiLGVbZS5GSVhFRDY0PTZdPVwiRklYRUQ2NFwiLGVbZS5GSVhFRDMyPTddPVwiRklYRUQzMlwiLGVbZS5CT09MPThdPVwiQk9PTFwiLGVbZS5TVFJJTkc9OV09XCJTVFJJTkdcIixlW2UuQllURVM9MTJdPVwiQllURVNcIixlW2UuVUlOVDMyPTEzXT1cIlVJTlQzMlwiLGVbZS5TRklYRUQzMj0xNV09XCJTRklYRUQzMlwiLGVbZS5TRklYRUQ2ND0xNl09XCJTRklYRUQ2NFwiLGVbZS5TSU5UMzI9MTddPVwiU0lOVDMyXCIsZVtlLlNJTlQ2ND0xOF09XCJTSU5UNjRcIixlKSkoU2NhbGFyVHlwZXx8e30pLExvbmdUeXBlPShlPT4oZVtlLkJJR0lOVD0wXT1cIkJJR0lOVFwiLGVbZS5TVFJJTkc9MV09XCJTVFJJTkdcIixlW2UuTlVNQkVSPTJdPVwiTlVNQkVSXCIsZSkpKExvbmdUeXBlfHx7fSksUmVwZWF0VHlwZT0oZT0+KGVbZS5OTz0wXT1cIk5PXCIsZVtlLlBBQ0tFRD0xXT1cIlBBQ0tFRFwiLGVbZS5VTlBBQ0tFRD0yXT1cIlVOUEFDS0VEXCIsZSkpKFJlcGVhdFR5cGV8fHt9KTtmdW5jdGlvbiBub3JtYWxpemVGaWVsZEluZm8oZSl7cmV0dXJuIGUubG9jYWxOYW1lPWUubG9jYWxOYW1lPz9sb3dlckNhbWVsQ2FzZShlLm5hbWUpLGUuanNvbk5hbWU9ZS5qc29uTmFtZT8/bG93ZXJDYW1lbENhc2UoZS5uYW1lKSxlLnJlcGVhdD1lLnJlcGVhdD8/MCxlLm9wdD1lLm9wdD8/KCFlLnJlcGVhdCYmKCFlLm9uZW9mJiZcIm1lc3NhZ2VcIj09ZS5raW5kKSksZX1mdW5jdGlvbiBpc09uZW9mR3JvdXAoZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGV8fG51bGw9PT1lfHwhZS5oYXNPd25Qcm9wZXJ0eShcIm9uZW9mS2luZFwiKSlyZXR1cm4hMTtzd2l0Y2godHlwZW9mIGUub25lb2ZLaW5kKXtjYXNlXCJzdHJpbmdcIjpyZXR1cm4gdm9pZCAwPT09ZVtlLm9uZW9mS2luZF0/ITE6Mj09T2JqZWN0LmtleXMoZSkubGVuZ3RoO2Nhc2VcInVuZGVmaW5lZFwiOnJldHVybiAxPT1PYmplY3Qua2V5cyhlKS5sZW5ndGg7ZGVmYXVsdDpyZXR1cm4hMX19Y2xhc3MgUmVmbGVjdGlvblR5cGVDaGVja3tjb25zdHJ1Y3RvcihlKXt0aGlzLmZpZWxkcz1lLmZpZWxkcz8/W119cHJlcGFyZSgpe2lmKCF0aGlzLmRhdGEpe3ZhciBlLHI9W10sdD1bXSxhPVtdO2ZvcihlIG9mIHRoaXMuZmllbGRzKWlmKGUub25lb2YpYS5pbmNsdWRlcyhlLm9uZW9mKXx8KGEucHVzaChlLm9uZW9mKSxyLnB1c2goZS5vbmVvZiksdC5wdXNoKGUub25lb2YpKTtlbHNlIHN3aXRjaCh0LnB1c2goZS5sb2NhbE5hbWUpLGUua2luZCl7Y2FzZVwic2NhbGFyXCI6Y2FzZVwiZW51bVwiOmUub3B0JiYhZS5yZXBlYXR8fHIucHVzaChlLmxvY2FsTmFtZSk7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmUucmVwZWF0JiZyLnB1c2goZS5sb2NhbE5hbWUpO2JyZWFrO2Nhc2VcIm1hcFwiOnIucHVzaChlLmxvY2FsTmFtZSl9dGhpcy5kYXRhPXtyZXE6cixrbm93bjp0LG9uZW9mczpPYmplY3QudmFsdWVzKGEpfX19aXMoZSxhLG49ITEpe2lmKCEoYTwwKSl7aWYobnVsbD09ZXx8XCJvYmplY3RcIiE9dHlwZW9mIGUpcmV0dXJuITE7dGhpcy5wcmVwYXJlKCk7bGV0IHI9T2JqZWN0LmtleXMoZSksdD10aGlzLmRhdGE7aWYoci5sZW5ndGg8dC5yZXEubGVuZ3RofHx0LnJlcS5zb21lKGU9PiFyLmluY2x1ZGVzKGUpKSlyZXR1cm4hMTtpZighbiYmci5zb21lKGU9PiF0Lmtub3duLmluY2x1ZGVzKGUpKSlyZXR1cm4hMTtpZighKGE8MSkpe2Zvcihjb25zdCBpIG9mIHQub25lb2ZzKXtjb25zdCBvPWVbaV07aWYoIWlzT25lb2ZHcm91cChvKSlyZXR1cm4hMTtpZih2b2lkIDAhPT1vLm9uZW9mS2luZCl7dmFyIHM9dGhpcy5maWVsZHMuZmluZChlPT5lLmxvY2FsTmFtZT09PW8ub25lb2ZLaW5kKTtpZighcylyZXR1cm4hMTtpZighdGhpcy5maWVsZChvW28ub25lb2ZLaW5kXSxzLG4sYSkpcmV0dXJuITF9fWZvcihjb25zdCBsIG9mIHRoaXMuZmllbGRzKWlmKHZvaWQgMD09PWwub25lb2YmJiF0aGlzLmZpZWxkKGVbbC5sb2NhbE5hbWVdLGwsbixhKSlyZXR1cm4hMX19cmV0dXJuITB9ZmllbGQoZSxyLHQsYSl7dmFyIG49ci5yZXBlYXQ7c3dpdGNoKHIua2luZCl7Y2FzZVwic2NhbGFyXCI6cmV0dXJuIHZvaWQgMD09PWU/ci5vcHQ6bj90aGlzLnNjYWxhcnMoZSxyLlQsYSxyLkwpOnRoaXMuc2NhbGFyKGUsci5ULHIuTCk7Y2FzZVwiZW51bVwiOnJldHVybiB2b2lkIDA9PT1lP3Iub3B0Om4/dGhpcy5zY2FsYXJzKGUsU2NhbGFyVHlwZS5JTlQzMixhKTp0aGlzLnNjYWxhcihlLFNjYWxhclR5cGUuSU5UMzIpO2Nhc2VcIm1lc3NhZ2VcIjpyZXR1cm4gdm9pZCAwPT09ZT8hMDpuP3RoaXMubWVzc2FnZXMoZSxyLlQoKSx0LGEpOnRoaXMubWVzc2FnZShlLHIuVCgpLHQsYSk7Y2FzZVwibWFwXCI6aWYoXCJvYmplY3RcIiE9dHlwZW9mIGV8fG51bGw9PT1lKXJldHVybiExO2lmKGE8MilyZXR1cm4hMDtpZighdGhpcy5tYXBLZXlzKGUsci5LLGEpKXJldHVybiExO3N3aXRjaChyLlYua2luZCl7Y2FzZVwic2NhbGFyXCI6cmV0dXJuIHRoaXMuc2NhbGFycyhPYmplY3QudmFsdWVzKGUpLHIuVi5ULGEsci5WLkwpO2Nhc2VcImVudW1cIjpyZXR1cm4gdGhpcy5zY2FsYXJzKE9iamVjdC52YWx1ZXMoZSksU2NhbGFyVHlwZS5JTlQzMixhKTtjYXNlXCJtZXNzYWdlXCI6cmV0dXJuIHRoaXMubWVzc2FnZXMoT2JqZWN0LnZhbHVlcyhlKSxyLlYuVCgpLHQsYSl9fXJldHVybiEwfW1lc3NhZ2UoZSxyLHQsYSl7cmV0dXJuIHQ/ci5pc0Fzc2lnbmFibGUoZSxhKTpyLmlzKGUsYSl9bWVzc2FnZXMocix0LGUsYSl7aWYoIUFycmF5LmlzQXJyYXkocikpcmV0dXJuITE7aWYoIShhPDIpKWlmKGUpe2ZvcihsZXQgZT0wO2U8ci5sZW5ndGgmJmU8YTtlKyspaWYoIXQuaXNBc3NpZ25hYmxlKHJbZV0sYS0xKSlyZXR1cm4hMX1lbHNlIGZvcihsZXQgZT0wO2U8ci5sZW5ndGgmJmU8YTtlKyspaWYoIXQuaXMocltlXSxhLTEpKXJldHVybiExO3JldHVybiEwfXNjYWxhcihlLHIsdCl7dmFyIGE9dHlwZW9mIGU7c3dpdGNoKHIpe2Nhc2UgU2NhbGFyVHlwZS5VSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLkZJWEVENjQ6Y2FzZSBTY2FsYXJUeXBlLklOVDY0OmNhc2UgU2NhbGFyVHlwZS5TRklYRUQ2NDpjYXNlIFNjYWxhclR5cGUuU0lOVDY0OnN3aXRjaCh0KXtjYXNlIExvbmdUeXBlLkJJR0lOVDpyZXR1cm5cImJpZ2ludFwiPT1hO2Nhc2UgTG9uZ1R5cGUuTlVNQkVSOnJldHVyblwibnVtYmVyXCI9PWEmJiFpc05hTihlKTtkZWZhdWx0OnJldHVyblwic3RyaW5nXCI9PWF9Y2FzZSBTY2FsYXJUeXBlLkJPT0w6cmV0dXJuXCJib29sZWFuXCI9PWE7Y2FzZSBTY2FsYXJUeXBlLlNUUklORzpyZXR1cm5cInN0cmluZ1wiPT1hO2Nhc2UgU2NhbGFyVHlwZS5CWVRFUzpyZXR1cm4gZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXk7Y2FzZSBTY2FsYXJUeXBlLkRPVUJMRTpjYXNlIFNjYWxhclR5cGUuRkxPQVQ6cmV0dXJuXCJudW1iZXJcIj09YSYmIWlzTmFOKGUpO2RlZmF1bHQ6cmV0dXJuXCJudW1iZXJcIj09YSYmTnVtYmVyLmlzSW50ZWdlcihlKX19c2NhbGFycyhyLHQsYSxuKXtpZighQXJyYXkuaXNBcnJheShyKSlyZXR1cm4hMTtpZighKGE8MikmJkFycmF5LmlzQXJyYXkocikpZm9yKGxldCBlPTA7ZTxyLmxlbmd0aCYmZTxhO2UrKylpZighdGhpcy5zY2FsYXIocltlXSx0LG4pKXJldHVybiExO3JldHVybiEwfW1hcEtleXMoZSxyLHQpe3ZhciBhPU9iamVjdC5rZXlzKGUpO3N3aXRjaChyKXtjYXNlIFNjYWxhclR5cGUuSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLkZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDMyOmNhc2UgU2NhbGFyVHlwZS5TSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLlVJTlQzMjpyZXR1cm4gdGhpcy5zY2FsYXJzKGEuc2xpY2UoMCx0KS5tYXAoZT0+cGFyc2VJbnQoZSkpLHIsdCk7Y2FzZSBTY2FsYXJUeXBlLkJPT0w6cmV0dXJuIHRoaXMuc2NhbGFycyhhLnNsaWNlKDAsdCkubWFwKGU9PlwidHJ1ZVwiPT1lfHxcImZhbHNlXCIhPWUmJmUpLHIsdCk7ZGVmYXVsdDpyZXR1cm4gdGhpcy5zY2FsYXJzKGEscix0LExvbmdUeXBlLlNUUklORyl9fX1mdW5jdGlvbiB0eXBlb2ZKc29uVmFsdWUoZSl7dmFyIHI9dHlwZW9mIGU7aWYoXCJvYmplY3RcIj09cil7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm5cImFycmF5XCI7aWYobnVsbD09PWUpcmV0dXJuXCJudWxsXCJ9cmV0dXJuIHJ9ZnVuY3Rpb24gaXNKc29uT2JqZWN0KGUpe3JldHVybiBudWxsIT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJiFBcnJheS5pc0FycmF5KGUpfWxldCBlbmNUYWJsZT1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5zcGxpdChcIlwiKSxkZWNUYWJsZT1bXTtmb3IobGV0IGU9MDtlPGVuY1RhYmxlLmxlbmd0aDtlKyspZGVjVGFibGVbZW5jVGFibGVbZV0uY2hhckNvZGVBdCgwKV09ZTtmdW5jdGlvbiBiYXNlNjRkZWNvZGUocil7bGV0IGU9MypyLmxlbmd0aC80LHQ9KFwiPVwiPT1yW3IubGVuZ3RoLTJdP2UtPTI6XCI9XCI9PXJbci5sZW5ndGgtMV0mJi0tZSxuZXcgVWludDhBcnJheShlKSksYT0wLG49MCxzLGk9MDtmb3IobGV0IGU9MDtlPHIubGVuZ3RoO2UrKyl7aWYodm9pZCAwPT09KHM9ZGVjVGFibGVbci5jaGFyQ29kZUF0KGUpXSkpc3dpdGNoKHJbZV0pe2Nhc2VcIj1cIjpuPTA7Y2FzZVwiXFxuXCI6Y2FzZVwiXFxyXCI6Y2FzZVwiXFx0XCI6Y2FzZVwiIFwiOmNvbnRpbnVlO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJpbnZhbGlkIGJhc2U2NCBzdHJpbmcuXCIpfXN3aXRjaChuKXtjYXNlIDA6aT1zLG49MTticmVhaztjYXNlIDE6dFthKytdPWk8PDJ8KDQ4JnMpPj40LGk9cyxuPTI7YnJlYWs7Y2FzZSAyOnRbYSsrXT0oMTUmaSk8PDR8KDYwJnMpPj4yLGk9cyxuPTM7YnJlYWs7Y2FzZSAzOnRbYSsrXT0oMyZpKTw8NnxzLG49MH19aWYoMT09bil0aHJvdyBFcnJvcihcImludmFsaWQgYmFzZTY0IHN0cmluZy5cIik7cmV0dXJuIHQuc3ViYXJyYXkoMCxhKX1mdW5jdGlvbiBiYXNlNjRlbmNvZGUocil7bGV0IHQ9XCJcIixhPTAsbixzPTA7Zm9yKGxldCBlPTA7ZTxyLmxlbmd0aDtlKyspc3dpdGNoKG49cltlXSxhKXtjYXNlIDA6dCs9ZW5jVGFibGVbbj4+Ml0scz0oMyZuKTw8NCxhPTE7YnJlYWs7Y2FzZSAxOnQrPWVuY1RhYmxlW3N8bj4+NF0scz0oMTUmbik8PDIsYT0yO2JyZWFrO2Nhc2UgMjp0PSh0Kz1lbmNUYWJsZVtzfG4+PjZdKStlbmNUYWJsZVs2MyZuXSxhPTB9cmV0dXJuIGEmJih0PXQrZW5jVGFibGVbc10rXCI9XCIsMT09YSYmKHQrPVwiPVwiKSksdH1mdW5jdGlvbiB2YXJpbnQ2NHJlYWQoKXtsZXQgcj0wLHQ9MDtmb3IobGV0IGU9MDtlPDI4O2UrPTcpe3ZhciBhPXRoaXMuYnVmW3RoaXMucG9zKytdO2lmKHJ8PSgxMjcmYSk8PGUsMD09KDEyOCZhKSlyZXR1cm4gdGhpcy5hc3NlcnRCb3VuZHMoKSxbcix0XX12YXIgZT10aGlzLmJ1Zlt0aGlzLnBvcysrXTtpZihyfD0oMTUmZSk8PDI4LHQ9KDExMiZlKT4+NCwwPT0oMTI4JmUpKXJldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLFtyLHRdO2ZvcihsZXQgZT0zO2U8PTMxO2UrPTcpe3ZhciBuPXRoaXMuYnVmW3RoaXMucG9zKytdO2lmKHR8PSgxMjcmbik8PGUsMD09KDEyOCZuKSlyZXR1cm4gdGhpcy5hc3NlcnRCb3VuZHMoKSxbcix0XX10aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHZhcmludFwiKX1mdW5jdGlvbiB2YXJpbnQ2NHdyaXRlKHIsdCxhKXtmb3IobGV0IGU9MDtlPDI4O2UrPTcpe3ZhciBuPXI+Pj5lLHM9IShuPj4+Nz09MCYmMD09dCk7aWYoYS5wdXNoKDI1NSYocz8xMjh8bjpuKSksIXMpcmV0dXJufXZhciBlPXI+Pj4yOCYxNXwoNyZ0KTw8NCxpPSEodD4+Mz09MCk7aWYoYS5wdXNoKDI1NSYoaT8xMjh8ZTplKSksaSl7Zm9yKGxldCBlPTM7ZTwzMTtlKz03KXt2YXIgbz10Pj4+ZSxsPSEobz4+Pjc9PTApO2lmKGEucHVzaCgyNTUmKGw/MTI4fG86bykpLCFsKXJldHVybn1hLnB1c2godD4+PjMxJjEpfX1kZWNUYWJsZVtcIi1cIi5jaGFyQ29kZUF0KDApXT1lbmNUYWJsZS5pbmRleE9mKFwiK1wiKSxkZWNUYWJsZVtcIl9cIi5jaGFyQ29kZUF0KDApXT1lbmNUYWJsZS5pbmRleE9mKFwiL1wiKTtjb25zdCBUV09fUFdSXzMyX0RCTCQxPTQyOTQ5NjcyOTY7ZnVuY3Rpb24gaW50NjRmcm9tU3RyaW5nKHQpe3ZhciBlPVwiLVwiPT10WzBdO2UmJih0PXQuc2xpY2UoMSkpO2xldCBhPTAsbj0wO2Z1bmN0aW9uIHIoZSxyKXtlPU51bWJlcih0LnNsaWNlKGUscikpO24qPTFlNiwoYT0xZTYqYStlKT49VFdPX1BXUl8zMl9EQkwkMSYmKG4rPWEvVFdPX1BXUl8zMl9EQkwkMXwwLGElPVRXT19QV1JfMzJfREJMJDEpfXJldHVybiByKC0yNCwtMTgpLHIoLTE4LC0xMikscigtMTIsLTYpLHIoLTYpLFtlLGEsbl19ZnVuY3Rpb24gaW50NjR0b1N0cmluZyhlLHIpe2lmKHI8PTIwOTcxNTEpcmV0dXJuXCJcIisoVFdPX1BXUl8zMl9EQkwkMSpyKyhlPj4+MCkpO3ZhciB0PShlPj4+MjR8cjw8OCk+Pj4wJjE2Nzc3MjE1LHI9cj4+MTYmNjU1MzU7bGV0IGE9KDE2Nzc3MjE1JmUpKzY3NzcyMTYqdCs2NzEwNjU2KnIsbj10KzgxNDc0OTcqcixzPTIqcjtmdW5jdGlvbiBpKGUscil7ZT1lP1N0cmluZyhlKTpcIlwiO3JldHVybiByP1wiMDAwMDAwMFwiLnNsaWNlKGUubGVuZ3RoKStlOmV9cmV0dXJuIDFlNzw9YSYmKG4rPU1hdGguZmxvb3IoYS8xZTcpLGElPTFlNyksMWU3PD1uJiYocys9TWF0aC5mbG9vcihuLzFlNyksbiU9MWU3KSxpKHMsMCkraShuLHMpK2koYSwxKX1mdW5jdGlvbiB2YXJpbnQzMndyaXRlKHIsdCl7aWYoMDw9cil7Zm9yKDsxMjc8cjspdC5wdXNoKDEyNyZyfDEyOCkscj4+Pj03O3QucHVzaChyKX1lbHNle2ZvcihsZXQgZT0wO2U8OTtlKyspdC5wdXNoKDEyNyZyfDEyOCkscj4+PTc7dC5wdXNoKDEpfX1mdW5jdGlvbiB2YXJpbnQzMnJlYWQoKXtsZXQgcj10aGlzLmJ1Zlt0aGlzLnBvcysrXTt2YXIgZT0xMjcmcjtpZigwPT0oMTI4JnIpKXJldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLGU7aWYoZXw9KDEyNyYocj10aGlzLmJ1Zlt0aGlzLnBvcysrXSkpPDw3LDA9PSgxMjgmcikpcmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksZTtpZihlfD0oMTI3JihyPXRoaXMuYnVmW3RoaXMucG9zKytdKSk8PDE0LDA9PSgxMjgmcikpcmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksZTtpZihlfD0oMTI3JihyPXRoaXMuYnVmW3RoaXMucG9zKytdKSk8PDIxLDA9PSgxMjgmcikpcmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksZTtlfD0oMTUmKHI9dGhpcy5idWZbdGhpcy5wb3MrK10pKTw8Mjg7Zm9yKGxldCBlPTU7MCE9KDEyOCZyKSYmZTwxMDtlKyspcj10aGlzLmJ1Zlt0aGlzLnBvcysrXTtpZigwIT0oMTI4JnIpKXRocm93IG5ldyBFcnJvcihcImludmFsaWQgdmFyaW50XCIpO3JldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLGU+Pj4wfWZ1bmN0aW9uIGRldGVjdEJpKCl7dmFyIGU9bmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcig4KSk7cmV0dXJuIHZvaWQgMCE9PWdsb2JhbFRoaXMuQmlnSW50JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmdldEJpZ0ludDY0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmdldEJpZ1VpbnQ2NCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5zZXRCaWdJbnQ2NCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5zZXRCaWdVaW50NjQ/e01JTjpCaWdJbnQoXCItOTIyMzM3MjAzNjg1NDc3NTgwOFwiKSxNQVg6QmlnSW50KFwiOTIyMzM3MjAzNjg1NDc3NTgwN1wiKSxVTUlOOkJpZ0ludChcIjBcIiksVU1BWDpCaWdJbnQoXCIxODQ0Njc0NDA3MzcwOTU1MTYxNVwiKSxDOkJpZ0ludCxWOmV9OnZvaWQgMH1jb25zdCBCST1kZXRlY3RCaSgpO2Z1bmN0aW9uIGFzc2VydEJpKGUpe2lmKCFlKXRocm93IG5ldyBFcnJvcihcIkJpZ0ludCB1bmF2YWlsYWJsZSwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aW1vc3RhbW0vcHJvdG9idWYtdHMvYmxvYi92MS4wLjgvTUFOVUFMLm1kI2JpZ2ludC1zdXBwb3J0XCIpfWNvbnN0IFJFX0RFQ0lNQUxfU1RSPS9eLT9bMC05XSskLyxUV09fUFdSXzMyX0RCTD00Mjk0OTY3Mjk2O2NsYXNzIFNoYXJlZFBiTG9uZ3tjb25zdHJ1Y3RvcihlLHIpe3RoaXMubG89MHxlLHRoaXMuaGk9MHxyfWlzWmVybygpe3JldHVybiAwPT10aGlzLmxvJiYwPT10aGlzLmhpfXRvTnVtYmVyKCl7dmFyIGU9dGhpcy5oaSpUV09fUFdSXzMyX0RCTCsodGhpcy5sbz4+PjApO2lmKE51bWJlci5pc1NhZmVJbnRlZ2VyKGUpKXJldHVybiBlO3Rocm93IG5ldyBFcnJvcihcImNhbm5vdCBjb252ZXJ0IHRvIHNhZmUgbnVtYmVyXCIpfX1jb25zdCBfUGJVTG9uZz1jbGFzcyBleHRlbmRzIFNoYXJlZFBiTG9uZ3tzdGF0aWMgZnJvbShlKXtpZihCSSlzd2l0Y2godHlwZW9mIGUpe2Nhc2VcInN0cmluZ1wiOmlmKFwiMFwiPT1lKXJldHVybiB0aGlzLlpFUk87aWYoXCJcIj09ZSl0aHJvdyBuZXcgRXJyb3IoXCJzdHJpbmcgaXMgbm8gaW50ZWdlclwiKTtlPUJJLkMoZSk7Y2FzZVwibnVtYmVyXCI6aWYoMD09PWUpcmV0dXJuIHRoaXMuWkVSTztlPUJJLkMoZSk7Y2FzZVwiYmlnaW50XCI6aWYoIWUpcmV0dXJuIHRoaXMuWkVSTztpZihlPEJJLlVNSU4pdGhyb3cgbmV3IEVycm9yKFwic2lnbmVkIHZhbHVlIGZvciB1bG9uZ1wiKTtpZihlPkJJLlVNQVgpdGhyb3cgbmV3IEVycm9yKFwidWxvbmcgdG9vIGxhcmdlXCIpO3JldHVybiBCSS5WLnNldEJpZ1VpbnQ2NCgwLGUsITApLG5ldyBfUGJVTG9uZyhCSS5WLmdldEludDMyKDAsITApLEJJLlYuZ2V0SW50MzIoNCwhMCkpfWVsc2Ugc3dpdGNoKHR5cGVvZiBlKXtjYXNlXCJzdHJpbmdcIjppZihcIjBcIj09ZSlyZXR1cm4gdGhpcy5aRVJPO2lmKGU9ZS50cmltKCksIVJFX0RFQ0lNQUxfU1RSLnRlc3QoZSkpdGhyb3cgbmV3IEVycm9yKFwic3RyaW5nIGlzIG5vIGludGVnZXJcIik7dmFyW3IsdCxhXT1pbnQ2NGZyb21TdHJpbmcoZSk7aWYocil0aHJvdyBuZXcgRXJyb3IoXCJzaWduZWQgdmFsdWVcIik7cmV0dXJuIG5ldyBfUGJVTG9uZyh0LGEpO2Nhc2VcIm51bWJlclwiOmlmKDA9PWUpcmV0dXJuIHRoaXMuWkVSTztpZighTnVtYmVyLmlzU2FmZUludGVnZXIoZSkpdGhyb3cgbmV3IEVycm9yKFwibnVtYmVyIGlzIG5vIGludGVnZXJcIik7aWYoZTwwKXRocm93IG5ldyBFcnJvcihcInNpZ25lZCB2YWx1ZSBmb3IgdWxvbmdcIik7cmV0dXJuIG5ldyBfUGJVTG9uZyhlLGUvVFdPX1BXUl8zMl9EQkwpfXRocm93IG5ldyBFcnJvcihcInVua25vd24gdmFsdWUgXCIrdHlwZW9mIGUpfXRvU3RyaW5nKCl7cmV0dXJuIEJJP3RoaXMudG9CaWdJbnQoKS50b1N0cmluZygpOmludDY0dG9TdHJpbmcodGhpcy5sbyx0aGlzLmhpKX10b0JpZ0ludCgpe3JldHVybiBhc3NlcnRCaShCSSksQkkuVi5zZXRJbnQzMigwLHRoaXMubG8sITApLEJJLlYuc2V0SW50MzIoNCx0aGlzLmhpLCEwKSxCSS5WLmdldEJpZ1VpbnQ2NCgwLCEwKX19O2xldCBQYlVMb25nPV9QYlVMb25nO1BiVUxvbmcuWkVSTz1uZXcgX1BiVUxvbmcoMCwwKTtjb25zdCBfUGJMb25nPWNsYXNzIGV4dGVuZHMgU2hhcmVkUGJMb25ne3N0YXRpYyBmcm9tKGUpe2lmKEJJKXN3aXRjaCh0eXBlb2YgZSl7Y2FzZVwic3RyaW5nXCI6aWYoXCIwXCI9PWUpcmV0dXJuIHRoaXMuWkVSTztpZihcIlwiPT1lKXRocm93IG5ldyBFcnJvcihcInN0cmluZyBpcyBubyBpbnRlZ2VyXCIpO2U9QkkuQyhlKTtjYXNlXCJudW1iZXJcIjppZigwPT09ZSlyZXR1cm4gdGhpcy5aRVJPO2U9QkkuQyhlKTtjYXNlXCJiaWdpbnRcIjppZighZSlyZXR1cm4gdGhpcy5aRVJPO2lmKGU8QkkuTUlOKXRocm93IG5ldyBFcnJvcihcInVsb25nIHRvbyBzbWFsbFwiKTtpZihlPkJJLk1BWCl0aHJvdyBuZXcgRXJyb3IoXCJ1bG9uZyB0b28gbGFyZ2VcIik7cmV0dXJuIEJJLlYuc2V0QmlnSW50NjQoMCxlLCEwKSxuZXcgX1BiTG9uZyhCSS5WLmdldEludDMyKDAsITApLEJJLlYuZ2V0SW50MzIoNCwhMCkpfWVsc2Ugc3dpdGNoKHR5cGVvZiBlKXtjYXNlXCJzdHJpbmdcIjppZihcIjBcIj09ZSlyZXR1cm4gdGhpcy5aRVJPO3ZhciByLHQsYTtpZihlPWUudHJpbSgpLFJFX0RFQ0lNQUxfU1RSLnRlc3QoZSkpcmV0dXJuW3IsYSx0XT1pbnQ2NGZyb21TdHJpbmcoZSksYT1uZXcgX1BiTG9uZyhhLHQpLHI/YS5uZWdhdGUoKTphO3Rocm93IG5ldyBFcnJvcihcInN0cmluZyBpcyBubyBpbnRlZ2VyXCIpO2Nhc2VcIm51bWJlclwiOmlmKDA9PWUpcmV0dXJuIHRoaXMuWkVSTztpZihOdW1iZXIuaXNTYWZlSW50ZWdlcihlKSlyZXR1cm4gMDxlP25ldyBfUGJMb25nKGUsZS9UV09fUFdSXzMyX0RCTCk6bmV3IF9QYkxvbmcoLWUsLWUvVFdPX1BXUl8zMl9EQkwpLm5lZ2F0ZSgpO3Rocm93IG5ldyBFcnJvcihcIm51bWJlciBpcyBubyBpbnRlZ2VyXCIpfXRocm93IG5ldyBFcnJvcihcInVua25vd24gdmFsdWUgXCIrdHlwZW9mIGUpfWlzTmVnYXRpdmUoKXtyZXR1cm4gMCE9KDIxNDc0ODM2NDgmdGhpcy5oaSl9bmVnYXRlKCl7bGV0IGU9fnRoaXMuaGkscj10aGlzLmxvO3JldHVybiByP3I9MSt+cjplKz0xLG5ldyBfUGJMb25nKHIsZSl9dG9TdHJpbmcoKXt2YXIgZTtyZXR1cm4gQkk/dGhpcy50b0JpZ0ludCgpLnRvU3RyaW5nKCk6dGhpcy5pc05lZ2F0aXZlKCk/XCItXCIraW50NjR0b1N0cmluZygoZT10aGlzLm5lZ2F0ZSgpKS5sbyxlLmhpKTppbnQ2NHRvU3RyaW5nKHRoaXMubG8sdGhpcy5oaSl9dG9CaWdJbnQoKXtyZXR1cm4gYXNzZXJ0QmkoQkkpLEJJLlYuc2V0SW50MzIoMCx0aGlzLmxvLCEwKSxCSS5WLnNldEludDMyKDQsdGhpcy5oaSwhMCksQkkuVi5nZXRCaWdJbnQ2NCgwLCEwKX19O2xldCBQYkxvbmc9X1BiTG9uZztmdW5jdGlvbiBhc3NlcnQoZSxyKXtpZighZSl0aHJvdyBuZXcgRXJyb3Iocil9UGJMb25nLlpFUk89bmV3IF9QYkxvbmcoMCwwKTtjb25zdCBGTE9BVDMyX01BWD0zNDAyODIzNDY2Mzg1Mjg4NmUyMixGTE9BVDMyX01JTj0tMzQwMjgyMzQ2NjM4NTI4ODZlMjIsVUlOVDMyX01BWD00Mjk0OTY3Mjk1LElOVDMyX01BWD0yMTQ3NDgzNjQ3LElOVDMyX01JTj0tMjE0NzQ4MzY0ODtmdW5jdGlvbiBhc3NlcnRJbnQzMihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGludCAzMjogXCIrdHlwZW9mIGUpO2lmKCFOdW1iZXIuaXNJbnRlZ2VyKGUpfHxlPklOVDMyX01BWHx8ZTxJTlQzMl9NSU4pdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnQgMzI6IFwiK2UpfWZ1bmN0aW9uIGFzc2VydFVJbnQzMihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHVpbnQgMzI6IFwiK3R5cGVvZiBlKTtpZighTnVtYmVyLmlzSW50ZWdlcihlKXx8ZT5VSU5UMzJfTUFYfHxlPDApdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCB1aW50IDMyOiBcIitlKX1mdW5jdGlvbiBhc3NlcnRGbG9hdDMyKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcImludmFsaWQgZmxvYXQgMzI6IFwiK3R5cGVvZiBlKTtpZihOdW1iZXIuaXNGaW5pdGUoZSkmJihlPkZMT0FUMzJfTUFYfHxlPEZMT0FUMzJfTUlOKSl0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGZsb2F0IDMyOiBcIitlKX1mdW5jdGlvbiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoZSxyKXtzd2l0Y2gocil7Y2FzZSBMb25nVHlwZS5CSUdJTlQ6cmV0dXJuIGUudG9CaWdJbnQoKTtjYXNlIExvbmdUeXBlLk5VTUJFUjpyZXR1cm4gZS50b051bWJlcigpO2RlZmF1bHQ6cmV0dXJuIGUudG9TdHJpbmcoKX19Y2xhc3MgUmVmbGVjdGlvbkpzb25SZWFkZXJ7Y29uc3RydWN0b3IoZSl7dGhpcy5pbmZvPWV9cHJlcGFyZSgpe2lmKHZvaWQgMD09PXRoaXMuZk1hcCl7dGhpcy5mTWFwPXt9O2Zvcihjb25zdCBlIG9mIHRoaXMuaW5mby5maWVsZHM/P1tdKXRoaXMuZk1hcFtlLm5hbWVdPWUsdGhpcy5mTWFwW2UuanNvbk5hbWVdPWUsdGhpcy5mTWFwW2UubG9jYWxOYW1lXT1lfX1hc3NlcnQoZSxyLHQpe2lmKCFlKXtsZXQgZT10eXBlb2ZKc29uVmFsdWUodCk7dGhyb3dcIm51bWJlclwiIT1lJiZcImJvb2xlYW5cIiE9ZXx8KGU9dC50b1N0cmluZygpKSxuZXcgRXJyb3IoYENhbm5vdCBwYXJzZSBKU09OICR7ZX0gZm9yICR7dGhpcy5pbmZvLnR5cGVOYW1lfSNgK3IpfX1yZWFkKGUscix0KXt0aGlzLnByZXBhcmUoKTt2YXIgYSxuLHM9W107Zm9yKFthLG5db2YgT2JqZWN0LmVudHJpZXMoZSkpe3ZhciBpPXRoaXMuZk1hcFthXTtpZighaSl7aWYodC5pZ25vcmVVbmtub3duRmllbGRzKWNvbnRpbnVlO3Rocm93IG5ldyBFcnJvcihgRm91bmQgdW5rbm93biBmaWVsZCB3aGlsZSByZWFkaW5nICR7dGhpcy5pbmZvLnR5cGVOYW1lfSBmcm9tIEpTT04gZm9ybWF0LiBKU09OIGtleTogYCthKX12YXIgbz1pLmxvY2FsTmFtZTtsZXQgZTtpZihpLm9uZW9mKXtpZihzLmluY2x1ZGVzKGkub25lb2YpKXRocm93IG5ldyBFcnJvcihgTXVsdGlwbGUgbWVtYmVycyBvZiB0aGUgb25lb2YgZ3JvdXAgXCIke2kub25lb2Z9XCIgb2YgJHt0aGlzLmluZm8udHlwZU5hbWV9IGFyZSBwcmVzZW50IGluIEpTT04uYCk7cy5wdXNoKGkub25lb2YpLGU9cltpLm9uZW9mXT17b25lb2ZLaW5kOm99fWVsc2UgZT1yO2lmKFwibWFwXCI9PWkua2luZCl7aWYobnVsbCE9PW4pe3RoaXMuYXNzZXJ0KGlzSnNvbk9iamVjdChuKSxpLm5hbWUsbik7dmFyIGwsYyxmPWVbb107Zm9yKFtsLGNdb2YgT2JqZWN0LmVudHJpZXMobikpe3RoaXMuYXNzZXJ0KG51bGwhPT1jLGkubmFtZStcIiBtYXAgdmFsdWVcIixudWxsKTtsZXQgZTtzd2l0Y2goaS5WLmtpbmQpe2Nhc2VcIm1lc3NhZ2VcIjplPWkuVi5UKCkuaW50ZXJuYWxKc29uUmVhZChjLHQpO2JyZWFrO2Nhc2VcImVudW1cIjppZighMT09PShlPXRoaXMuZW51bShpLlYuVCgpLGMsaS5uYW1lLHQuaWdub3JlVW5rbm93bkZpZWxkcykpKWNvbnRpbnVlO2JyZWFrO2Nhc2VcInNjYWxhclwiOmU9dGhpcy5zY2FsYXIoYyxpLlYuVCxpLlYuTCxpLm5hbWUpfXRoaXMuYXNzZXJ0KHZvaWQgMCE9PWUsaS5uYW1lK1wiIG1hcCB2YWx1ZVwiLGMpO2xldCByPWw7aS5LPT1TY2FsYXJUeXBlLkJPT0wmJihyPVwidHJ1ZVwiPT1yfHxcImZhbHNlXCIhPXImJnIpLGZbcj10aGlzLnNjYWxhcihyLGkuSyxMb25nVHlwZS5TVFJJTkcsaS5uYW1lKS50b1N0cmluZygpXT1lfX19ZWxzZSBpZihpLnJlcGVhdCl7aWYobnVsbCE9PW4pe3RoaXMuYXNzZXJ0KEFycmF5LmlzQXJyYXkobiksaS5uYW1lLG4pO3ZhciB1PWVbb107Zm9yKGNvbnN0IHAgb2Ygbil7dGhpcy5hc3NlcnQobnVsbCE9PXAsaS5uYW1lLG51bGwpO2xldCBlO3N3aXRjaChpLmtpbmQpe2Nhc2VcIm1lc3NhZ2VcIjplPWkuVCgpLmludGVybmFsSnNvblJlYWQocCx0KTticmVhaztjYXNlXCJlbnVtXCI6aWYoITE9PT0oZT10aGlzLmVudW0oaS5UKCkscCxpLm5hbWUsdC5pZ25vcmVVbmtub3duRmllbGRzKSkpY29udGludWU7YnJlYWs7Y2FzZVwic2NhbGFyXCI6ZT10aGlzLnNjYWxhcihwLGkuVCxpLkwsaS5uYW1lKX10aGlzLmFzc2VydCh2b2lkIDAhPT1lLGkubmFtZSxuKSx1LnB1c2goZSl9fX1lbHNlIHN3aXRjaChpLmtpbmQpe2Nhc2VcIm1lc3NhZ2VcIjpudWxsPT09biYmXCJnb29nbGUucHJvdG9idWYuVmFsdWVcIiE9aS5UKCkudHlwZU5hbWU/dGhpcy5hc3NlcnQodm9pZCAwPT09aS5vbmVvZixpLm5hbWUrXCIgKG9uZW9mIG1lbWJlcilcIixudWxsKTplW29dPWkuVCgpLmludGVybmFsSnNvblJlYWQobix0LGVbb10pO2JyZWFrO2Nhc2VcImVudW1cIjp2YXIgaD10aGlzLmVudW0oaS5UKCksbixpLm5hbWUsdC5pZ25vcmVVbmtub3duRmllbGRzKTshMSE9PWgmJihlW29dPWgpO2JyZWFrO2Nhc2VcInNjYWxhclwiOmVbb109dGhpcy5zY2FsYXIobixpLlQsaS5MLGkubmFtZSl9fX1lbnVtKHIsdCxhLG4pe2lmKFwiZ29vZ2xlLnByb3RvYnVmLk51bGxWYWx1ZVwiPT1yWzBdJiZhc3NlcnQobnVsbD09PXQsYFVuYWJsZSB0byBwYXJzZSBmaWVsZCAke3RoaXMuaW5mby50eXBlTmFtZX0jJHthfSwgZW51bSAke3JbMF19IG9ubHkgYWNjZXB0cyBudWxsLmApLG51bGw9PT10KXJldHVybiAwO3N3aXRjaCh0eXBlb2YgdCl7Y2FzZVwibnVtYmVyXCI6cmV0dXJuIGFzc2VydChOdW1iZXIuaXNJbnRlZ2VyKHQpLGBVbmFibGUgdG8gcGFyc2UgZmllbGQgJHt0aGlzLmluZm8udHlwZU5hbWV9IyR7YX0sIGVudW0gY2FuIG9ubHkgYmUgaW50ZWdyYWwgbnVtYmVyLCBnb3QgJHt0fS5gKSx0O2Nhc2VcInN0cmluZ1wiOmxldCBlPXQ7clsyXSYmdC5zdWJzdHJpbmcoMCxyWzJdLmxlbmd0aCk9PT1yWzJdJiYoZT10LnN1YnN0cmluZyhyWzJdLmxlbmd0aCkpO3ZhciBzPXJbMV1bZV07cmV0dXJuIHZvaWQgMD09PXMmJm4/ITE6KGFzc2VydChcIm51bWJlclwiPT10eXBlb2YgcyxgVW5hYmxlIHRvIHBhcnNlIGZpZWxkICR7dGhpcy5pbmZvLnR5cGVOYW1lfSMke2F9LCBlbnVtICR7clswXX0gaGFzIG5vIHZhbHVlIGZvciBcIiR7dH1cIi5gKSxzKX1hc3NlcnQoITEsYFVuYWJsZSB0byBwYXJzZSBmaWVsZCAke3RoaXMuaW5mby50eXBlTmFtZX0jJHthfSwgY2Fubm90IHBhcnNlIGVudW0gdmFsdWUgZnJvbSAke3R5cGVvZiB0fVwiLmApfXNjYWxhcihyLHQsYSxlKXtsZXQgbjt0cnl7c3dpdGNoKHQpe2Nhc2UgU2NhbGFyVHlwZS5ET1VCTEU6Y2FzZSBTY2FsYXJUeXBlLkZMT0FUOmlmKG51bGw9PT1yKXJldHVybiAwO2lmKFwiTmFOXCI9PT1yKXJldHVybiBOdW1iZXIuTmFOO2lmKFwiSW5maW5pdHlcIj09PXIpcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtpZihcIi1JbmZpbml0eVwiPT09cilyZXR1cm4gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO2lmKFwiXCI9PT1yKW49XCJlbXB0eSBzdHJpbmdcIjtlbHNlIGlmKFwic3RyaW5nXCI9PXR5cGVvZiByJiZyLnRyaW0oKS5sZW5ndGghPT1yLmxlbmd0aCluPVwiZXh0cmEgd2hpdGVzcGFjZVwiO2Vsc2UgaWYoXCJzdHJpbmdcIj09dHlwZW9mIHJ8fFwibnVtYmVyXCI9PXR5cGVvZiByKXt2YXIgcz1OdW1iZXIocik7aWYoTnVtYmVyLmlzTmFOKHMpKW49XCJub3QgYSBudW1iZXJcIjtlbHNle2lmKE51bWJlci5pc0Zpbml0ZShzKSlyZXR1cm4gdD09U2NhbGFyVHlwZS5GTE9BVCYmYXNzZXJ0RmxvYXQzMihzKSxzO249XCJ0b28gbGFyZ2Ugb3Igc21hbGxcIn19YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLklOVDMyOmNhc2UgU2NhbGFyVHlwZS5GSVhFRDMyOmNhc2UgU2NhbGFyVHlwZS5TRklYRUQzMjpjYXNlIFNjYWxhclR5cGUuU0lOVDMyOmNhc2UgU2NhbGFyVHlwZS5VSU5UMzI6aWYobnVsbD09PXIpcmV0dXJuIDA7bGV0IGU7aWYoXCJudW1iZXJcIj09dHlwZW9mIHI/ZT1yOlwiXCI9PT1yP249XCJlbXB0eSBzdHJpbmdcIjpcInN0cmluZ1wiPT10eXBlb2YgciYmKHIudHJpbSgpLmxlbmd0aCE9PXIubGVuZ3RoP249XCJleHRyYSB3aGl0ZXNwYWNlXCI6ZT1OdW1iZXIocikpLHZvaWQgMD09PWUpYnJlYWs7cmV0dXJuKHQ9PVNjYWxhclR5cGUuVUlOVDMyP2Fzc2VydFVJbnQzMjphc3NlcnRJbnQzMikoZSksZTtjYXNlIFNjYWxhclR5cGUuSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDY0OmNhc2UgU2NhbGFyVHlwZS5TSU5UNjQ6aWYobnVsbD09PXIpcmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChQYkxvbmcuWkVSTyxhKTtpZihcIm51bWJlclwiIT10eXBlb2YgciYmXCJzdHJpbmdcIiE9dHlwZW9mIHIpYnJlYWs7cmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChQYkxvbmcuZnJvbShyKSxhKTtjYXNlIFNjYWxhclR5cGUuRklYRUQ2NDpjYXNlIFNjYWxhclR5cGUuVUlOVDY0OmlmKG51bGw9PT1yKXJldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoUGJVTG9uZy5aRVJPLGEpO2lmKFwibnVtYmVyXCIhPXR5cGVvZiByJiZcInN0cmluZ1wiIT10eXBlb2YgcilicmVhaztyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KFBiVUxvbmcuZnJvbShyKSxhKTtjYXNlIFNjYWxhclR5cGUuQk9PTDppZihudWxsPT09cilyZXR1cm4hMTtpZihcImJvb2xlYW5cIiE9dHlwZW9mIHIpYnJlYWs7cmV0dXJuIHI7Y2FzZSBTY2FsYXJUeXBlLlNUUklORzppZihudWxsPT09cilyZXR1cm5cIlwiO2lmKFwic3RyaW5nXCIhPXR5cGVvZiByKXtuPVwiZXh0cmEgd2hpdGVzcGFjZVwiO2JyZWFrfXRyeXtlbmNvZGVVUklDb21wb25lbnQocil9Y2F0Y2goZSl7MDticmVha31yZXR1cm4gcjtjYXNlIFNjYWxhclR5cGUuQllURVM6aWYobnVsbD09PXJ8fFwiXCI9PT1yKXJldHVybiBuZXcgVWludDhBcnJheSgwKTtpZihcInN0cmluZ1wiIT10eXBlb2YgcilicmVhaztyZXR1cm4gYmFzZTY0ZGVjb2RlKHIpfX1jYXRjaChlKXtuPWUubWVzc2FnZX10aGlzLmFzc2VydCghMSxlKyhuP1wiIC0gXCIrbjpcIlwiKSxyKX19Y2xhc3MgUmVmbGVjdGlvbkpzb25Xcml0ZXJ7Y29uc3RydWN0b3IoZSl7dGhpcy5maWVsZHM9ZS5maWVsZHM/P1tdfXdyaXRlKGUscil7dmFyIHQsYSxuPXt9LHM9ZTtmb3IoY29uc3QgaSBvZiB0aGlzLmZpZWxkcylpLm9uZW9mPyh0PXNbaS5vbmVvZl0pLm9uZW9mS2luZD09PWkubG9jYWxOYW1lJiYoYT1cInNjYWxhclwiPT1pLmtpbmR8fFwiZW51bVwiPT1pLmtpbmQ/ey4uLnIsZW1pdERlZmF1bHRWYWx1ZXM6ITB9OnIsYXNzZXJ0KHZvaWQgMCE9PSh0PXRoaXMuZmllbGQoaSx0W2kubG9jYWxOYW1lXSxhKSkpLG5bci51c2VQcm90b0ZpZWxkTmFtZT9pLm5hbWU6aS5qc29uTmFtZV09dCk6dm9pZCAwIT09KGE9dGhpcy5maWVsZChpLHNbaS5sb2NhbE5hbWVdLHIpKSYmKG5bci51c2VQcm90b0ZpZWxkTmFtZT9pLm5hbWU6aS5qc29uTmFtZV09YSk7cmV0dXJuIG59ZmllbGQocix0LGEpe2xldCBlPXZvaWQgMDtpZihcIm1hcFwiPT1yLmtpbmQpe2Fzc2VydChcIm9iamVjdFwiPT10eXBlb2YgdCYmbnVsbCE9PXQpO3ZhciBuPXt9O3N3aXRjaChyLlYua2luZCl7Y2FzZVwic2NhbGFyXCI6Zm9yKHZhcltzLGldb2YgT2JqZWN0LmVudHJpZXModCkpe2k9dGhpcy5zY2FsYXIoci5WLlQsaSxyLm5hbWUsITEsITApO2Fzc2VydCh2b2lkIDAhPT1pKSxuW3MudG9TdHJpbmcoKV09aX1icmVhaztjYXNlXCJtZXNzYWdlXCI6dmFyIG8sbCxjPXIuVi5UKCk7Zm9yKFtvLGxdb2YgT2JqZWN0LmVudHJpZXModCkpe3ZhciBmPXRoaXMubWVzc2FnZShjLGwsci5uYW1lLGEpO2Fzc2VydCh2b2lkIDAhPT1mKSxuW28udG9TdHJpbmcoKV09Zn1icmVhaztjYXNlXCJlbnVtXCI6dmFyIHUsaCxwPXIuVi5UKCk7Zm9yKFt1LGhdb2YgT2JqZWN0LmVudHJpZXModCkpe2Fzc2VydCh2b2lkIDA9PT1ofHxcIm51bWJlclwiPT10eXBlb2YgaCk7dmFyIFQ9dGhpcy5lbnVtKHAsaCxyLm5hbWUsITEsITAsYS5lbnVtQXNJbnRlZ2VyKTthc3NlcnQodm9pZCAwIT09VCksblt1LnRvU3RyaW5nKCldPVR9fShhLmVtaXREZWZhdWx0VmFsdWVzfHwwPE9iamVjdC5rZXlzKG4pLmxlbmd0aCkmJihlPW4pfWVsc2UgaWYoci5yZXBlYXQpe2Fzc2VydChBcnJheS5pc0FycmF5KHQpKTt2YXIgZD1bXTtzd2l0Y2goci5raW5kKXtjYXNlXCJzY2FsYXJcIjpmb3IobGV0IGU9MDtlPHQubGVuZ3RoO2UrKyl7dmFyIHk9dGhpcy5zY2FsYXIoci5ULHRbZV0sci5uYW1lLHIub3B0LCEwKTthc3NlcnQodm9pZCAwIT09eSksZC5wdXNoKHkpfWJyZWFrO2Nhc2VcImVudW1cIjp2YXIgZz1yLlQoKTtmb3IobGV0IGU9MDtlPHQubGVuZ3RoO2UrKyl7YXNzZXJ0KHZvaWQgMD09PXRbZV18fFwibnVtYmVyXCI9PXR5cGVvZiB0W2VdKTt2YXIgYj10aGlzLmVudW0oZyx0W2VdLHIubmFtZSxyLm9wdCwhMCxhLmVudW1Bc0ludGVnZXIpO2Fzc2VydCh2b2lkIDAhPT1iKSxkLnB1c2goYil9YnJlYWs7Y2FzZVwibWVzc2FnZVwiOnZhciBtPXIuVCgpO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKXt2YXIgST10aGlzLm1lc3NhZ2UobSx0W2VdLHIubmFtZSxhKTthc3NlcnQodm9pZCAwIT09SSksZC5wdXNoKEkpfX0oYS5lbWl0RGVmYXVsdFZhbHVlc3x8MDxkLmxlbmd0aHx8YS5lbWl0RGVmYXVsdFZhbHVlcykmJihlPWQpfWVsc2Ugc3dpdGNoKHIua2luZCl7Y2FzZVwic2NhbGFyXCI6ZT10aGlzLnNjYWxhcihyLlQsdCxyLm5hbWUsci5vcHQsYS5lbWl0RGVmYXVsdFZhbHVlcyk7YnJlYWs7Y2FzZVwiZW51bVwiOmU9dGhpcy5lbnVtKHIuVCgpLHQsci5uYW1lLHIub3B0LGEuZW1pdERlZmF1bHRWYWx1ZXMsYS5lbnVtQXNJbnRlZ2VyKTticmVhaztjYXNlXCJtZXNzYWdlXCI6ZT10aGlzLm1lc3NhZ2Uoci5UKCksdCxyLm5hbWUsYSl9cmV0dXJuIGV9ZW51bShlLHIsdCxhLG4scyl7aWYoXCJnb29nbGUucHJvdG9idWYuTnVsbFZhbHVlXCI9PWVbMF0pcmV0dXJuIG51bGw7aWYodm9pZCAwPT09cilhc3NlcnQoYSk7ZWxzZSBpZigwIT09cnx8bnx8YSlyZXR1cm4gYXNzZXJ0KFwibnVtYmVyXCI9PXR5cGVvZiByKSxhc3NlcnQoTnVtYmVyLmlzSW50ZWdlcihyKSksc3x8IWVbMV0uaGFzT3duUHJvcGVydHkocik/cjplWzJdP2VbMl0rZVsxXVtyXTplWzFdW3JdfW1lc3NhZ2UoZSxyLHQsYSl7cmV0dXJuIHZvaWQgMD09PXI/YS5lbWl0RGVmYXVsdFZhbHVlcz9udWxsOnZvaWQgMDplLmludGVybmFsSnNvbldyaXRlKHIsYSl9c2NhbGFyKGUscix0LGEsbil7aWYodm9pZCAwPT09cilhc3NlcnQoYSk7ZWxzZXt2YXIgcz1ufHxhO3N3aXRjaChlKXtjYXNlIFNjYWxhclR5cGUuSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDMyOmNhc2UgU2NhbGFyVHlwZS5TSU5UMzI6cmV0dXJuIDA9PT1yP3M/MDp2b2lkIDA6KGFzc2VydEludDMyKHIpLHIpO2Nhc2UgU2NhbGFyVHlwZS5GSVhFRDMyOmNhc2UgU2NhbGFyVHlwZS5VSU5UMzI6cmV0dXJuIDA9PT1yP3M/MDp2b2lkIDA6KGFzc2VydFVJbnQzMihyKSxyKTtjYXNlIFNjYWxhclR5cGUuRkxPQVQ6YXNzZXJ0RmxvYXQzMihyKTtjYXNlIFNjYWxhclR5cGUuRE9VQkxFOnJldHVybiAwPT09cj9zPzA6dm9pZCAwOihhc3NlcnQoXCJudW1iZXJcIj09dHlwZW9mIHIpLE51bWJlci5pc05hTihyKT9cIk5hTlwiOnI9PT1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk/XCJJbmZpbml0eVwiOnI9PT1OdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk/XCItSW5maW5pdHlcIjpyKTtjYXNlIFNjYWxhclR5cGUuU1RSSU5HOnJldHVyblwiXCI9PT1yP3M/XCJcIjp2b2lkIDA6KGFzc2VydChcInN0cmluZ1wiPT10eXBlb2Ygcikscik7Y2FzZSBTY2FsYXJUeXBlLkJPT0w6cmV0dXJuITE9PT1yPyFzJiZ2b2lkIDA6KGFzc2VydChcImJvb2xlYW5cIj09dHlwZW9mIHIpLHIpO2Nhc2UgU2NhbGFyVHlwZS5VSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLkZJWEVENjQ6YXNzZXJ0KFwibnVtYmVyXCI9PXR5cGVvZiByfHxcInN0cmluZ1wiPT10eXBlb2Ygcnx8XCJiaWdpbnRcIj09dHlwZW9mIHIpO3ZhciBpPVBiVUxvbmcuZnJvbShyKTtyZXR1cm4gaS5pc1plcm8oKSYmIXM/dm9pZCAwOmkudG9TdHJpbmcoKTtjYXNlIFNjYWxhclR5cGUuSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDY0OmNhc2UgU2NhbGFyVHlwZS5TSU5UNjQ6YXNzZXJ0KFwibnVtYmVyXCI9PXR5cGVvZiByfHxcInN0cmluZ1wiPT10eXBlb2Ygcnx8XCJiaWdpbnRcIj09dHlwZW9mIHIpO2k9UGJMb25nLmZyb20ocik7cmV0dXJuIGkuaXNaZXJvKCkmJiFzP3ZvaWQgMDppLnRvU3RyaW5nKCk7Y2FzZSBTY2FsYXJUeXBlLkJZVEVTOnJldHVybihhc3NlcnQociBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpLHIuYnl0ZUxlbmd0aCk/YmFzZTY0ZW5jb2RlKHIpOnM/XCJcIjp2b2lkIDB9fX19ZnVuY3Rpb24gcmVmbGVjdGlvblNjYWxhckRlZmF1bHQoZSxyPUxvbmdUeXBlLlNUUklORyl7c3dpdGNoKGUpe2Nhc2UgU2NhbGFyVHlwZS5CT09MOnJldHVybiExO2Nhc2UgU2NhbGFyVHlwZS5VSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLkZJWEVENjQ6cmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChQYlVMb25nLlpFUk8scik7Y2FzZSBTY2FsYXJUeXBlLklOVDY0OmNhc2UgU2NhbGFyVHlwZS5TRklYRUQ2NDpjYXNlIFNjYWxhclR5cGUuU0lOVDY0OnJldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoUGJMb25nLlpFUk8scik7Y2FzZSBTY2FsYXJUeXBlLkRPVUJMRTpjYXNlIFNjYWxhclR5cGUuRkxPQVQ6cmV0dXJuIDA7Y2FzZSBTY2FsYXJUeXBlLkJZVEVTOnJldHVybiBuZXcgVWludDhBcnJheSgwKTtjYXNlIFNjYWxhclR5cGUuU1RSSU5HOnJldHVyblwiXCI7ZGVmYXVsdDpyZXR1cm4gMH19Y2xhc3MgUmVmbGVjdGlvbkJpbmFyeVJlYWRlcntjb25zdHJ1Y3RvcihlKXt0aGlzLmluZm89ZX1wcmVwYXJlKCl7dmFyIGU7dGhpcy5maWVsZE5vVG9GaWVsZHx8KGU9dGhpcy5pbmZvLmZpZWxkcz8/W10sdGhpcy5maWVsZE5vVG9GaWVsZD1uZXcgTWFwKGUubWFwKGU9PltlLm5vLGVdKSkpfXJlYWQoYSxuLHMsZSl7dGhpcy5wcmVwYXJlKCk7Zm9yKHZhciByPXZvaWQgMD09PWU/YS5sZW46YS5wb3MrZTthLnBvczxyOyl7dmFyW3QsaV09YS50YWcoKSxvPXRoaXMuZmllbGROb1RvRmllbGQuZ2V0KHQpO2lmKG8pe2xldCBlPW4scj1vLnJlcGVhdCx0PW8ubG9jYWxOYW1lO3N3aXRjaChvLm9uZW9mJiYoZT1lW28ub25lb2ZdKS5vbmVvZktpbmQhPT10JiYoZT1uW28ub25lb2ZdPXtvbmVvZktpbmQ6dH0pLG8ua2luZCl7Y2FzZVwic2NhbGFyXCI6Y2FzZVwiZW51bVwiOnZhciBsPVwiZW51bVwiPT1vLmtpbmQ/U2NhbGFyVHlwZS5JTlQzMjpvLlQsYz1cInNjYWxhclwiPT1vLmtpbmQ/by5MOnZvaWQgMDtpZihyKXt2YXIgZj1lW3RdO2lmKGk9PVdpcmVUeXBlLkxlbmd0aERlbGltaXRlZCYmbCE9U2NhbGFyVHlwZS5TVFJJTkcmJmwhPVNjYWxhclR5cGUuQllURVMpZm9yKHZhciB1PWEudWludDMyKCkrYS5wb3M7YS5wb3M8dTspZi5wdXNoKHRoaXMuc2NhbGFyKGEsbCxjKSk7ZWxzZSBmLnB1c2godGhpcy5zY2FsYXIoYSxsLGMpKX1lbHNlIGVbdF09dGhpcy5zY2FsYXIoYSxsLGMpO2JyZWFrO2Nhc2VcIm1lc3NhZ2VcIjpyPyhoPWVbdF0scD1vLlQoKS5pbnRlcm5hbEJpbmFyeVJlYWQoYSxhLnVpbnQzMigpLHMpLGgucHVzaChwKSk6ZVt0XT1vLlQoKS5pbnRlcm5hbEJpbmFyeVJlYWQoYSxhLnVpbnQzMigpLHMsZVt0XSk7YnJlYWs7Y2FzZVwibWFwXCI6dmFyW2gscF09dGhpcy5tYXBFbnRyeShvLGEscyk7ZVt0XVtoXT1wfX1lbHNle3ZhciBUPXMucmVhZFVua25vd25GaWVsZDtpZihcInRocm93XCI9PVQpdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZpZWxkICR7dH0gKHdpcmUgdHlwZSAke2l9KSBmb3IgYCt0aGlzLmluZm8udHlwZU5hbWUpO3ZhciBkPWEuc2tpcChpKTshMSE9PVQmJighMD09PVQ/VW5rbm93bkZpZWxkSGFuZGxlci5vblJlYWQ6VCkodGhpcy5pbmZvLnR5cGVOYW1lLG4sdCxpLGQpfX19bWFwRW50cnkoZSxyLHQpe3ZhciBhPXIudWludDMyKCksbj1yLnBvcythO2xldCBzPXZvaWQgMCxpPXZvaWQgMDtmb3IoO3IucG9zPG47KXt2YXJbbyxsXT1yLnRhZygpO3N3aXRjaChvKXtjYXNlIDE6cz1lLks9PVNjYWxhclR5cGUuQk9PTD9yLmJvb2woKS50b1N0cmluZygpOnRoaXMuc2NhbGFyKHIsZS5LLExvbmdUeXBlLlNUUklORyk7YnJlYWs7Y2FzZSAyOnN3aXRjaChlLlYua2luZCl7Y2FzZVwic2NhbGFyXCI6aT10aGlzLnNjYWxhcihyLGUuVi5ULGUuVi5MKTticmVhaztjYXNlXCJlbnVtXCI6aT1yLmludDMyKCk7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmk9ZS5WLlQoKS5pbnRlcm5hbEJpbmFyeVJlYWQocixyLnVpbnQzMigpLHQpfWJyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZpZWxkICR7b30gKHdpcmUgdHlwZSAke2x9KSBpbiBtYXAgZW50cnkgZm9yICR7dGhpcy5pbmZvLnR5cGVOYW1lfSNgK2UubmFtZSl9fWlmKHZvaWQgMD09PXMmJihhPXJlZmxlY3Rpb25TY2FsYXJEZWZhdWx0KGUuSykscz1lLks9PVNjYWxhclR5cGUuQk9PTD9hLnRvU3RyaW5nKCk6YSksdm9pZCAwPT09aSlzd2l0Y2goZS5WLmtpbmQpe2Nhc2VcInNjYWxhclwiOmk9cmVmbGVjdGlvblNjYWxhckRlZmF1bHQoZS5WLlQsZS5WLkwpO2JyZWFrO2Nhc2VcImVudW1cIjppPTA7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmk9ZS5WLlQoKS5jcmVhdGUoKX1yZXR1cm5bcyxpXX1zY2FsYXIoZSxyLHQpe3N3aXRjaChyKXtjYXNlIFNjYWxhclR5cGUuSU5UMzI6cmV0dXJuIGUuaW50MzIoKTtjYXNlIFNjYWxhclR5cGUuU1RSSU5HOnJldHVybiBlLnN0cmluZygpO2Nhc2UgU2NhbGFyVHlwZS5CT09MOnJldHVybiBlLmJvb2woKTtjYXNlIFNjYWxhclR5cGUuRE9VQkxFOnJldHVybiBlLmRvdWJsZSgpO2Nhc2UgU2NhbGFyVHlwZS5GTE9BVDpyZXR1cm4gZS5mbG9hdCgpO2Nhc2UgU2NhbGFyVHlwZS5JTlQ2NDpyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KGUuaW50NjQoKSx0KTtjYXNlIFNjYWxhclR5cGUuVUlOVDY0OnJldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoZS51aW50NjQoKSx0KTtjYXNlIFNjYWxhclR5cGUuRklYRUQ2NDpyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KGUuZml4ZWQ2NCgpLHQpO2Nhc2UgU2NhbGFyVHlwZS5GSVhFRDMyOnJldHVybiBlLmZpeGVkMzIoKTtjYXNlIFNjYWxhclR5cGUuQllURVM6cmV0dXJuIGUuYnl0ZXMoKTtjYXNlIFNjYWxhclR5cGUuVUlOVDMyOnJldHVybiBlLnVpbnQzMigpO2Nhc2UgU2NhbGFyVHlwZS5TRklYRUQzMjpyZXR1cm4gZS5zZml4ZWQzMigpO2Nhc2UgU2NhbGFyVHlwZS5TRklYRUQ2NDpyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KGUuc2ZpeGVkNjQoKSx0KTtjYXNlIFNjYWxhclR5cGUuU0lOVDMyOnJldHVybiBlLnNpbnQzMigpO2Nhc2UgU2NhbGFyVHlwZS5TSU5UNjQ6cmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChlLnNpbnQ2NCgpLHQpfX19Y2xhc3MgUmVmbGVjdGlvbkJpbmFyeVdyaXRlcntjb25zdHJ1Y3RvcihlKXt0aGlzLmluZm89ZX1wcmVwYXJlKCl7dmFyIGU7dGhpcy5maWVsZHN8fChlPXRoaXMuaW5mby5maWVsZHM/dGhpcy5pbmZvLmZpZWxkcy5jb25jYXQoKTpbXSx0aGlzLmZpZWxkcz1lLnNvcnQoKGUscik9PmUubm8tci5ubykpfXdyaXRlKG4scyxpKXt0aGlzLnByZXBhcmUoKTtmb3IoY29uc3QgdSBvZiB0aGlzLmZpZWxkcyl7bGV0IGUscix0PXUucmVwZWF0LGE9dS5sb2NhbE5hbWU7aWYodS5vbmVvZil7dmFyIG89blt1Lm9uZW9mXTtpZihvLm9uZW9mS2luZCE9PWEpY29udGludWU7ZT1vW2FdLHI9ITB9ZWxzZSBlPW5bYV0scj0hMTtzd2l0Y2godS5raW5kKXtjYXNlXCJzY2FsYXJcIjpjYXNlXCJlbnVtXCI6dmFyIGw9XCJlbnVtXCI9PXUua2luZD9TY2FsYXJUeXBlLklOVDMyOnUuVDtpZih0KWlmKGFzc2VydChBcnJheS5pc0FycmF5KGUpKSx0PT1SZXBlYXRUeXBlLlBBQ0tFRCl0aGlzLnBhY2tlZChzLGwsdS5ubyxlKTtlbHNlIGZvcihjb25zdCBoIG9mIGUpdGhpcy5zY2FsYXIocyxsLHUubm8saCwhMCk7ZWxzZSB2b2lkIDA9PT1lP2Fzc2VydCh1Lm9wdCk6dGhpcy5zY2FsYXIocyxsLHUubm8sZSxyfHx1Lm9wdCk7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmlmKHQpe2Fzc2VydChBcnJheS5pc0FycmF5KGUpKTtmb3IoY29uc3QgcCBvZiBlKXRoaXMubWVzc2FnZShzLGksdS5UKCksdS5ubyxwKX1lbHNlIHRoaXMubWVzc2FnZShzLGksdS5UKCksdS5ubyxlKTticmVhaztjYXNlXCJtYXBcIjphc3NlcnQoXCJvYmplY3RcIj09dHlwZW9mIGUmJm51bGwhPT1lKTtmb3IodmFyW2MsZl1vZiBPYmplY3QuZW50cmllcyhlKSl0aGlzLm1hcEVudHJ5KHMsaSx1LGMsZil9fXZhciBlPWkud3JpdGVVbmtub3duRmllbGRzOyExIT09ZSYmKCEwPT09ZT9Vbmtub3duRmllbGRIYW5kbGVyLm9uV3JpdGU6ZSkodGhpcy5pbmZvLnR5cGVOYW1lLG4scyl9bWFwRW50cnkoZSxyLHQsYSxuKXtlLnRhZyh0Lm5vLFdpcmVUeXBlLkxlbmd0aERlbGltaXRlZCksZS5mb3JrKCk7bGV0IHM9YTtzd2l0Y2godC5LKXtjYXNlIFNjYWxhclR5cGUuSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLkZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlVJTlQzMjpjYXNlIFNjYWxhclR5cGUuU0ZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlNJTlQzMjpzPU51bWJlci5wYXJzZUludChhKTticmVhaztjYXNlIFNjYWxhclR5cGUuQk9PTDphc3NlcnQoXCJ0cnVlXCI9PWF8fFwiZmFsc2VcIj09YSkscz1cInRydWVcIj09YX1zd2l0Y2godGhpcy5zY2FsYXIoZSx0LkssMSxzLCEwKSx0LlYua2luZCl7Y2FzZVwic2NhbGFyXCI6dGhpcy5zY2FsYXIoZSx0LlYuVCwyLG4sITApO2JyZWFrO2Nhc2VcImVudW1cIjp0aGlzLnNjYWxhcihlLFNjYWxhclR5cGUuSU5UMzIsMixuLCEwKTticmVhaztjYXNlXCJtZXNzYWdlXCI6dGhpcy5tZXNzYWdlKGUscix0LlYuVCgpLDIsbil9ZS5qb2luKCl9bWVzc2FnZShlLHIsdCxhLG4pe3ZvaWQgMCE9PW4mJih0LmludGVybmFsQmluYXJ5V3JpdGUobixlLnRhZyhhLFdpcmVUeXBlLkxlbmd0aERlbGltaXRlZCkuZm9yaygpLHIpLGUuam9pbigpKX1zY2FsYXIoZSxyLHQsYSxuKXt2YXJbcixzLGldPXRoaXMuc2NhbGFySW5mbyhyLGEpO2kmJiFufHwoZS50YWcodCxyKSxlW3NdKGEpKX1wYWNrZWQocixlLHQsYSl7aWYoYS5sZW5ndGgpe2Fzc2VydChlIT09U2NhbGFyVHlwZS5CWVRFUyYmZSE9PVNjYWxhclR5cGUuU1RSSU5HKSxyLnRhZyh0LFdpcmVUeXBlLkxlbmd0aERlbGltaXRlZCksci5mb3JrKCk7dmFyWyxuXT10aGlzLnNjYWxhckluZm8oZSk7Zm9yKGxldCBlPTA7ZTxhLmxlbmd0aDtlKyspcltuXShhW2VdKTtyLmpvaW4oKX19c2NhbGFySW5mbyhlLHIpe2xldCB0PVdpcmVUeXBlLlZhcmludCxhO3ZhciBuPXZvaWQgMD09PXI7bGV0IHM9MD09PXI7c3dpdGNoKGUpe2Nhc2UgU2NhbGFyVHlwZS5JTlQzMjphPVwiaW50MzJcIjticmVhaztjYXNlIFNjYWxhclR5cGUuU1RSSU5HOnM9bnx8IXIubGVuZ3RoLHQ9V2lyZVR5cGUuTGVuZ3RoRGVsaW1pdGVkLGE9XCJzdHJpbmdcIjticmVhaztjYXNlIFNjYWxhclR5cGUuQk9PTDpzPSExPT09cixhPVwiYm9vbFwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5VSU5UMzI6YT1cInVpbnQzMlwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5ET1VCTEU6dD1XaXJlVHlwZS5CaXQ2NCxhPVwiZG91YmxlXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLkZMT0FUOnQ9V2lyZVR5cGUuQml0MzIsYT1cImZsb2F0XCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLklOVDY0OnM9bnx8UGJMb25nLmZyb20ocikuaXNaZXJvKCksYT1cImludDY0XCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLlVJTlQ2NDpzPW58fFBiVUxvbmcuZnJvbShyKS5pc1plcm8oKSxhPVwidWludDY0XCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLkZJWEVENjQ6cz1ufHxQYlVMb25nLmZyb20ocikuaXNaZXJvKCksdD1XaXJlVHlwZS5CaXQ2NCxhPVwiZml4ZWQ2NFwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5CWVRFUzpzPW58fCFyLmJ5dGVMZW5ndGgsdD1XaXJlVHlwZS5MZW5ndGhEZWxpbWl0ZWQsYT1cImJ5dGVzXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLkZJWEVEMzI6dD1XaXJlVHlwZS5CaXQzMixhPVwiZml4ZWQzMlwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5TRklYRUQzMjp0PVdpcmVUeXBlLkJpdDMyLGE9XCJzZml4ZWQzMlwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5TRklYRUQ2NDpzPW58fFBiTG9uZy5mcm9tKHIpLmlzWmVybygpLHQ9V2lyZVR5cGUuQml0NjQsYT1cInNmaXhlZDY0XCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLlNJTlQzMjphPVwic2ludDMyXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLlNJTlQ2NDpzPW58fFBiTG9uZy5mcm9tKHIpLmlzWmVybygpLGE9XCJzaW50NjRcIn1yZXR1cm5bdCxhLG58fHNdfX1mdW5jdGlvbiByZWZsZWN0aW9uQ3JlYXRlKGUpe3ZhciByLHQ9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsTUVTU0FHRV9UWVBFLHtlbnVtZXJhYmxlOiExLHZhbHVlOmV9KTtmb3IociBvZiBlLmZpZWxkcyl7dmFyIGE9ci5sb2NhbE5hbWU7aWYoIXIub3B0KWlmKHIub25lb2YpdFtyLm9uZW9mXT17b25lb2ZLaW5kOnZvaWQgMH07ZWxzZSBpZihyLnJlcGVhdCl0W2FdPVtdO2Vsc2Ugc3dpdGNoKHIua2luZCl7Y2FzZVwic2NhbGFyXCI6dFthXT1yZWZsZWN0aW9uU2NhbGFyRGVmYXVsdChyLlQsci5MKTticmVhaztjYXNlXCJlbnVtXCI6dFthXT0wO2JyZWFrO2Nhc2VcIm1hcFwiOnRbYV09e319fXJldHVybiB0fWZ1bmN0aW9uIHJlZmxlY3Rpb25NZXJnZVBhcnRpYWwoZSxyLHQpe2xldCBhLG49dCxzO2Zvcih2YXIgaSBvZiBlLmZpZWxkcyl7dmFyIG89aS5sb2NhbE5hbWU7aWYoaS5vbmVvZil7dmFyIGw9bltpLm9uZW9mXTtpZihudWxsPT0obnVsbD09bD92b2lkIDA6bC5vbmVvZktpbmQpKWNvbnRpbnVlO2lmKGE9bFtvXSwocz1yW2kub25lb2ZdKS5vbmVvZktpbmQ9bC5vbmVvZktpbmQsbnVsbD09YSl7ZGVsZXRlIHNbb107Y29udGludWV9fWVsc2UgaWYoYT1uW29dLHM9cixudWxsPT1hKWNvbnRpbnVlO3N3aXRjaChpLnJlcGVhdCYmKHNbb10ubGVuZ3RoPWEubGVuZ3RoKSxpLmtpbmQpe2Nhc2VcInNjYWxhclwiOmNhc2VcImVudW1cIjppZihpLnJlcGVhdClmb3IobGV0IGU9MDtlPGEubGVuZ3RoO2UrKylzW29dW2VdPWFbZV07ZWxzZSBzW29dPWE7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOnZhciBjPWkuVCgpO2lmKGkucmVwZWF0KWZvcihsZXQgZT0wO2U8YS5sZW5ndGg7ZSsrKXNbb11bZV09Yy5jcmVhdGUoYVtlXSk7ZWxzZSB2b2lkIDA9PT1zW29dP3Nbb109Yy5jcmVhdGUoYSk6Yy5tZXJnZVBhcnRpYWwoc1tvXSxhKTticmVhaztjYXNlXCJtYXBcIjpzd2l0Y2goaS5WLmtpbmQpe2Nhc2VcInNjYWxhclwiOmNhc2VcImVudW1cIjpPYmplY3QuYXNzaWduKHNbb10sYSk7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOnZhciBmLHU9aS5WLlQoKTtmb3IoZiBvZiBPYmplY3Qua2V5cyhhKSlzW29dW2ZdPXUuY3JlYXRlKGFbZl0pfX19fWNvbnN0IGRlZmF1bHRzV3JpdGUkMT17ZW1pdERlZmF1bHRWYWx1ZXM6ITEsZW51bUFzSW50ZWdlcjohMSx1c2VQcm90b0ZpZWxkTmFtZTohMSxwcmV0dHlTcGFjZXM6MH0sZGVmYXVsdHNSZWFkJDE9e2lnbm9yZVVua25vd25GaWVsZHM6ITF9O2Z1bmN0aW9uIGpzb25SZWFkT3B0aW9ucyhlKXtyZXR1cm4gZT97Li4uZGVmYXVsdHNSZWFkJDEsLi4uZX06ZGVmYXVsdHNSZWFkJDF9ZnVuY3Rpb24ganNvbldyaXRlT3B0aW9ucyhlKXtyZXR1cm4gZT97Li4uZGVmYXVsdHNXcml0ZSQxLC4uLmV9OmRlZmF1bHRzV3JpdGUkMX1mdW5jdGlvbiByZWZsZWN0aW9uRXF1YWxzKGUscix0KXtpZihyIT09dCl7aWYoIXJ8fCF0KXJldHVybiExO2Zvcih2YXIgYSBvZiBlLmZpZWxkcyl7dmFyIG49YS5sb2NhbE5hbWUscz0oYS5vbmVvZj9yW2Eub25lb2ZdOnIpW25dLGk9KGEub25lb2Y/dFthLm9uZW9mXTp0KVtuXTtzd2l0Y2goYS5raW5kKXtjYXNlXCJlbnVtXCI6Y2FzZVwic2NhbGFyXCI6dmFyIG89XCJlbnVtXCI9PWEua2luZD9TY2FsYXJUeXBlLklOVDMyOmEuVDtpZigoYS5yZXBlYXQ/cmVwZWF0ZWRQcmltaXRpdmVFcTpwcmltaXRpdmVFcSkobyxzLGkpKWJyZWFrO3JldHVybiExO2Nhc2VcIm1hcFwiOmlmKFwibWVzc2FnZVwiPT1hLlYua2luZD9yZXBlYXRlZE1zZ0VxKGEuVi5UKCksb2JqZWN0VmFsdWVzKHMpLG9iamVjdFZhbHVlcyhpKSk6cmVwZWF0ZWRQcmltaXRpdmVFcShcImVudW1cIj09YS5WLmtpbmQ/U2NhbGFyVHlwZS5JTlQzMjphLlYuVCxvYmplY3RWYWx1ZXMocyksb2JqZWN0VmFsdWVzKGkpKSlicmVhaztyZXR1cm4hMTtjYXNlXCJtZXNzYWdlXCI6bz1hLlQoKTtpZihhLnJlcGVhdD9yZXBlYXRlZE1zZ0VxKG8scyxpKTpvLmVxdWFscyhzLGkpKWJyZWFrO3JldHVybiExfX19cmV0dXJuITB9Y29uc3Qgb2JqZWN0VmFsdWVzPU9iamVjdC52YWx1ZXM7ZnVuY3Rpb24gcHJpbWl0aXZlRXEoZSxyLHQpe2lmKHIhPT10KXtpZihlIT09U2NhbGFyVHlwZS5CWVRFUylyZXR1cm4hMTt2YXIgYT1yLG49dDtpZihhLmxlbmd0aCE9PW4ubGVuZ3RoKXJldHVybiExO2ZvcihsZXQgZT0wO2U8YS5sZW5ndGg7ZSsrKWlmKGFbZV0hPW5bZV0pcmV0dXJuITF9cmV0dXJuITB9ZnVuY3Rpb24gcmVwZWF0ZWRQcmltaXRpdmVFcShyLHQsYSl7aWYodC5sZW5ndGghPT1hLmxlbmd0aClyZXR1cm4hMTtmb3IobGV0IGU9MDtlPHQubGVuZ3RoO2UrKylpZighcHJpbWl0aXZlRXEocix0W2VdLGFbZV0pKXJldHVybiExO3JldHVybiEwfWZ1bmN0aW9uIHJlcGVhdGVkTXNnRXEocix0LGEpe2lmKHQubGVuZ3RoIT09YS5sZW5ndGgpcmV0dXJuITE7Zm9yKGxldCBlPTA7ZTx0Lmxlbmd0aDtlKyspaWYoIXIuZXF1YWxzKHRbZV0sYVtlXSkpcmV0dXJuITE7cmV0dXJuITB9Y29uc3QgZGVmYXVsdHNXcml0ZT17d3JpdGVVbmtub3duRmllbGRzOiEwLHdyaXRlckZhY3Rvcnk6KCk9Pm5ldyBCaW5hcnlXcml0ZXJ9O2Z1bmN0aW9uIGJpbmFyeVdyaXRlT3B0aW9ucyhlKXtyZXR1cm4gZT97Li4uZGVmYXVsdHNXcml0ZSwuLi5lfTpkZWZhdWx0c1dyaXRlfWNsYXNzIEJpbmFyeVdyaXRlcntjb25zdHJ1Y3RvcihlKXt0aGlzLnN0YWNrPVtdLHRoaXMudGV4dEVuY29kZXI9ZT8/bmV3IFRleHRFbmNvZGVyLHRoaXMuY2h1bmtzPVtdLHRoaXMuYnVmPVtdfWZpbmlzaCgpe3RoaXMuY2h1bmtzLnB1c2gobmV3IFVpbnQ4QXJyYXkodGhpcy5idWYpKTtsZXQgcj0wO2ZvcihsZXQgZT0wO2U8dGhpcy5jaHVua3MubGVuZ3RoO2UrKylyKz10aGlzLmNodW5rc1tlXS5sZW5ndGg7dmFyIHQ9bmV3IFVpbnQ4QXJyYXkocik7bGV0IGE9MDtmb3IobGV0IGU9MDtlPHRoaXMuY2h1bmtzLmxlbmd0aDtlKyspdC5zZXQodGhpcy5jaHVua3NbZV0sYSksYSs9dGhpcy5jaHVua3NbZV0ubGVuZ3RoO3JldHVybiB0aGlzLmNodW5rcz1bXSx0fWZvcmsoKXtyZXR1cm4gdGhpcy5zdGFjay5wdXNoKHtjaHVua3M6dGhpcy5jaHVua3MsYnVmOnRoaXMuYnVmfSksdGhpcy5jaHVua3M9W10sdGhpcy5idWY9W10sdGhpc31qb2luKCl7dmFyIGU9dGhpcy5maW5pc2goKSxyPXRoaXMuc3RhY2sucG9wKCk7aWYocilyZXR1cm4gdGhpcy5jaHVua3M9ci5jaHVua3MsdGhpcy5idWY9ci5idWYsdGhpcy51aW50MzIoZS5ieXRlTGVuZ3RoKSx0aGlzLnJhdyhlKTt0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHN0YXRlLCBmb3JrIHN0YWNrIGVtcHR5XCIpfXRhZyhlLHIpe3JldHVybiB0aGlzLnVpbnQzMigoZTw8M3xyKT4+PjApfXJhdyhlKXtyZXR1cm4gdGhpcy5idWYubGVuZ3RoJiYodGhpcy5jaHVua3MucHVzaChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZikpLHRoaXMuYnVmPVtdKSx0aGlzLmNodW5rcy5wdXNoKGUpLHRoaXN9dWludDMyKGUpe2Zvcihhc3NlcnRVSW50MzIoZSk7MTI3PGU7KXRoaXMuYnVmLnB1c2goMTI3JmV8MTI4KSxlPj4+PTc7cmV0dXJuIHRoaXMuYnVmLnB1c2goZSksdGhpc31pbnQzMihlKXtyZXR1cm4gYXNzZXJ0SW50MzIoZSksdmFyaW50MzJ3cml0ZShlLHRoaXMuYnVmKSx0aGlzfWJvb2woZSl7cmV0dXJuIHRoaXMuYnVmLnB1c2goZT8xOjApLHRoaXN9Ynl0ZXMoZSl7cmV0dXJuIHRoaXMudWludDMyKGUuYnl0ZUxlbmd0aCksdGhpcy5yYXcoZSl9c3RyaW5nKGUpe2U9dGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUoZSk7cmV0dXJuIHRoaXMudWludDMyKGUuYnl0ZUxlbmd0aCksdGhpcy5yYXcoZSl9ZmxvYXQoZSl7YXNzZXJ0RmxvYXQzMihlKTt2YXIgcj1uZXcgVWludDhBcnJheSg0KTtyZXR1cm4gbmV3IERhdGFWaWV3KHIuYnVmZmVyKS5zZXRGbG9hdDMyKDAsZSwhMCksdGhpcy5yYXcocil9ZG91YmxlKGUpe3ZhciByPW5ldyBVaW50OEFycmF5KDgpO3JldHVybiBuZXcgRGF0YVZpZXcoci5idWZmZXIpLnNldEZsb2F0NjQoMCxlLCEwKSx0aGlzLnJhdyhyKX1maXhlZDMyKGUpe2Fzc2VydFVJbnQzMihlKTt2YXIgcj1uZXcgVWludDhBcnJheSg0KTtyZXR1cm4gbmV3IERhdGFWaWV3KHIuYnVmZmVyKS5zZXRVaW50MzIoMCxlLCEwKSx0aGlzLnJhdyhyKX1zZml4ZWQzMihlKXthc3NlcnRJbnQzMihlKTt2YXIgcj1uZXcgVWludDhBcnJheSg0KTtyZXR1cm4gbmV3IERhdGFWaWV3KHIuYnVmZmVyKS5zZXRJbnQzMigwLGUsITApLHRoaXMucmF3KHIpfXNpbnQzMihlKXtyZXR1cm4gYXNzZXJ0SW50MzIoZSksdmFyaW50MzJ3cml0ZShlPShlPDwxXmU+PjMxKT4+PjAsdGhpcy5idWYpLHRoaXN9c2ZpeGVkNjQoZSl7dmFyIHI9bmV3IFVpbnQ4QXJyYXkoOCksdD1uZXcgRGF0YVZpZXcoci5idWZmZXIpLGU9UGJMb25nLmZyb20oZSk7cmV0dXJuIHQuc2V0SW50MzIoMCxlLmxvLCEwKSx0LnNldEludDMyKDQsZS5oaSwhMCksdGhpcy5yYXcocil9Zml4ZWQ2NChlKXt2YXIgcj1uZXcgVWludDhBcnJheSg4KSx0PW5ldyBEYXRhVmlldyhyLmJ1ZmZlciksZT1QYlVMb25nLmZyb20oZSk7cmV0dXJuIHQuc2V0SW50MzIoMCxlLmxvLCEwKSx0LnNldEludDMyKDQsZS5oaSwhMCksdGhpcy5yYXcocil9aW50NjQoZSl7ZT1QYkxvbmcuZnJvbShlKTtyZXR1cm4gdmFyaW50NjR3cml0ZShlLmxvLGUuaGksdGhpcy5idWYpLHRoaXN9c2ludDY0KGUpe3ZhciBlPVBiTG9uZy5mcm9tKGUpLHI9ZS5oaT4+MzE7cmV0dXJuIHZhcmludDY0d3JpdGUoZS5sbzw8MV5yLChlLmhpPDwxfGUubG8+Pj4zMSlecix0aGlzLmJ1ZiksdGhpc311aW50NjQoZSl7ZT1QYlVMb25nLmZyb20oZSk7cmV0dXJuIHZhcmludDY0d3JpdGUoZS5sbyxlLmhpLHRoaXMuYnVmKSx0aGlzfX1jb25zdCBkZWZhdWx0c1JlYWQ9e3JlYWRVbmtub3duRmllbGQ6ITAscmVhZGVyRmFjdG9yeTplPT5uZXcgQmluYXJ5UmVhZGVyKGUpfTtmdW5jdGlvbiBiaW5hcnlSZWFkT3B0aW9ucyhlKXtyZXR1cm4gZT97Li4uZGVmYXVsdHNSZWFkLC4uLmV9OmRlZmF1bHRzUmVhZH1jbGFzcyBCaW5hcnlSZWFkZXJ7Y29uc3RydWN0b3IoZSxyKXt0aGlzLnZhcmludDY0PXZhcmludDY0cmVhZCx0aGlzLnVpbnQzMj12YXJpbnQzMnJlYWQsdGhpcy5idWY9ZSx0aGlzLmxlbj1lLmxlbmd0aCx0aGlzLnBvcz0wLHRoaXMudmlldz1uZXcgRGF0YVZpZXcoZS5idWZmZXIsZS5ieXRlT2Zmc2V0LGUuYnl0ZUxlbmd0aCksdGhpcy50ZXh0RGVjb2Rlcj1yPz9uZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiLHtmYXRhbDohMCxpZ25vcmVCT006ITB9KX10YWcoKXt2YXIgZT10aGlzLnVpbnQzMigpLHI9ZT4+PjMsZT03JmU7aWYocjw9MHx8ZTwwfHw1PGUpdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCB0YWc6IGZpZWxkIG5vIFwiK3IrXCIgd2lyZSB0eXBlIFwiK2UpO3JldHVybltyLGVdfXNraXAoZSl7dmFyIHIsdD10aGlzLnBvcztzd2l0Y2goZSl7Y2FzZSBXaXJlVHlwZS5WYXJpbnQ6Zm9yKDsxMjgmdGhpcy5idWZbdGhpcy5wb3MrK107KTticmVhaztjYXNlIFdpcmVUeXBlLkJpdDY0OnRoaXMucG9zKz00O2Nhc2UgV2lyZVR5cGUuQml0MzI6dGhpcy5wb3MrPTQ7YnJlYWs7Y2FzZSBXaXJlVHlwZS5MZW5ndGhEZWxpbWl0ZWQ6dmFyIGE9dGhpcy51aW50MzIoKTt0aGlzLnBvcys9YTticmVhaztjYXNlIFdpcmVUeXBlLlN0YXJ0R3JvdXA6Zm9yKDsocj10aGlzLnRhZygpWzFdKSE9PVdpcmVUeXBlLkVuZEdyb3VwOyl0aGlzLnNraXAocik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJjYW50IHNraXAgd2lyZSB0eXBlIFwiK2UpfXJldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLHRoaXMuYnVmLnN1YmFycmF5KHQsdGhpcy5wb3MpfWFzc2VydEJvdW5kcygpe2lmKHRoaXMucG9zPnRoaXMubGVuKXRocm93IG5ldyBSYW5nZUVycm9yKFwicHJlbWF0dXJlIEVPRlwiKX1pbnQzMigpe3JldHVybiAwfHRoaXMudWludDMyKCl9c2ludDMyKCl7dmFyIGU9dGhpcy51aW50MzIoKTtyZXR1cm4gZT4+PjFeLSgxJmUpfWludDY0KCl7cmV0dXJuIG5ldyBQYkxvbmcoLi4udGhpcy52YXJpbnQ2NCgpKX11aW50NjQoKXtyZXR1cm4gbmV3IFBiVUxvbmcoLi4udGhpcy52YXJpbnQ2NCgpKX1zaW50NjQoKXt2YXJbZSxyXT10aGlzLnZhcmludDY0KCksdD0tKDEmZSksZT0oZT4+PjF8KDEmcik8PDMxKV50LHI9cj4+PjFedDtyZXR1cm4gbmV3IFBiTG9uZyhlLHIpfWJvb2woKXt2YXJbZSxyXT10aGlzLnZhcmludDY0KCk7cmV0dXJuIDAhPT1lfHwwIT09cn1maXhlZDMyKCl7cmV0dXJuIHRoaXMudmlldy5nZXRVaW50MzIoKHRoaXMucG9zKz00KS00LCEwKX1zZml4ZWQzMigpe3JldHVybiB0aGlzLnZpZXcuZ2V0SW50MzIoKHRoaXMucG9zKz00KS00LCEwKX1maXhlZDY0KCl7cmV0dXJuIG5ldyBQYlVMb25nKHRoaXMuc2ZpeGVkMzIoKSx0aGlzLnNmaXhlZDMyKCkpfXNmaXhlZDY0KCl7cmV0dXJuIG5ldyBQYkxvbmcodGhpcy5zZml4ZWQzMigpLHRoaXMuc2ZpeGVkMzIoKSl9ZmxvYXQoKXtyZXR1cm4gdGhpcy52aWV3LmdldEZsb2F0MzIoKHRoaXMucG9zKz00KS00LCEwKX1kb3VibGUoKXtyZXR1cm4gdGhpcy52aWV3LmdldEZsb2F0NjQoKHRoaXMucG9zKz04KS04LCEwKX1ieXRlcygpe3ZhciBlPXRoaXMudWludDMyKCkscj10aGlzLnBvcztyZXR1cm4gdGhpcy5wb3MrPWUsdGhpcy5hc3NlcnRCb3VuZHMoKSx0aGlzLmJ1Zi5zdWJhcnJheShyLHIrZSl9c3RyaW5nKCl7cmV0dXJuIHRoaXMudGV4dERlY29kZXIuZGVjb2RlKHRoaXMuYnl0ZXMoKSl9fWNsYXNzIE1lc3NhZ2VUeXBle2NvbnN0cnVjdG9yKGUscix0KXt0aGlzLmRlZmF1bHRDaGVja0RlcHRoPTE2LHRoaXMudHlwZU5hbWU9ZSx0aGlzLmZpZWxkcz1yLm1hcChub3JtYWxpemVGaWVsZEluZm8pLHRoaXMub3B0aW9ucz10Pz97fSx0aGlzLnJlZlR5cGVDaGVjaz1uZXcgUmVmbGVjdGlvblR5cGVDaGVjayh0aGlzKSx0aGlzLnJlZkpzb25SZWFkZXI9bmV3IFJlZmxlY3Rpb25Kc29uUmVhZGVyKHRoaXMpLHRoaXMucmVmSnNvbldyaXRlcj1uZXcgUmVmbGVjdGlvbkpzb25Xcml0ZXIodGhpcyksdGhpcy5yZWZCaW5SZWFkZXI9bmV3IFJlZmxlY3Rpb25CaW5hcnlSZWFkZXIodGhpcyksdGhpcy5yZWZCaW5Xcml0ZXI9bmV3IFJlZmxlY3Rpb25CaW5hcnlXcml0ZXIodGhpcyl9Y3JlYXRlKGUpe3ZhciByPXJlZmxlY3Rpb25DcmVhdGUodGhpcyk7cmV0dXJuIHZvaWQgMCE9PWUmJnJlZmxlY3Rpb25NZXJnZVBhcnRpYWwodGhpcyxyLGUpLHJ9Y2xvbmUoZSl7dmFyIHI9dGhpcy5jcmVhdGUoKTtyZXR1cm4gcmVmbGVjdGlvbk1lcmdlUGFydGlhbCh0aGlzLHIsZSkscn1lcXVhbHMoZSxyKXtyZXR1cm4gcmVmbGVjdGlvbkVxdWFscyh0aGlzLGUscil9aXMoZSxyPXRoaXMuZGVmYXVsdENoZWNrRGVwdGgpe3JldHVybiB0aGlzLnJlZlR5cGVDaGVjay5pcyhlLHIsITEpfWlzQXNzaWduYWJsZShlLHI9dGhpcy5kZWZhdWx0Q2hlY2tEZXB0aCl7cmV0dXJuIHRoaXMucmVmVHlwZUNoZWNrLmlzKGUsciwhMCl9bWVyZ2VQYXJ0aWFsKGUscil7cmVmbGVjdGlvbk1lcmdlUGFydGlhbCh0aGlzLGUscil9ZnJvbUJpbmFyeShlLHIpe3I9YmluYXJ5UmVhZE9wdGlvbnMocik7cmV0dXJuIHRoaXMuaW50ZXJuYWxCaW5hcnlSZWFkKHIucmVhZGVyRmFjdG9yeShlKSxlLmJ5dGVMZW5ndGgscil9ZnJvbUpzb24oZSxyKXtyZXR1cm4gdGhpcy5pbnRlcm5hbEpzb25SZWFkKGUsanNvblJlYWRPcHRpb25zKHIpKX1mcm9tSnNvblN0cmluZyhlLHIpe2U9SlNPTi5wYXJzZShlKTtyZXR1cm4gdGhpcy5mcm9tSnNvbihlLHIpfXRvSnNvbihlLHIpe3JldHVybiB0aGlzLmludGVybmFsSnNvbldyaXRlKGUsanNvbldyaXRlT3B0aW9ucyhyKSl9dG9Kc29uU3RyaW5nKGUscil7ZT10aGlzLnRvSnNvbihlLHIpO3JldHVybiBKU09OLnN0cmluZ2lmeShlLG51bGwsKG51bGw9PXI/dm9pZCAwOnIucHJldHR5U3BhY2VzKT8/MCl9dG9CaW5hcnkoZSxyKXtyPWJpbmFyeVdyaXRlT3B0aW9ucyhyKTtyZXR1cm4gdGhpcy5pbnRlcm5hbEJpbmFyeVdyaXRlKGUsci53cml0ZXJGYWN0b3J5KCkscikuZmluaXNoKCl9aW50ZXJuYWxKc29uUmVhZChlLHIsdCl7aWYobnVsbD09PWV8fFwib2JqZWN0XCIhPXR5cGVvZiBlfHxBcnJheS5pc0FycmF5KGUpKXRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHBhcnNlIG1lc3NhZ2UgJHt0aGlzLnR5cGVOYW1lfSBmcm9tIEpTT04gJHt0eXBlb2ZKc29uVmFsdWUoZSl9LmApO3JldHVybiB0PXQ/P3RoaXMuY3JlYXRlKCksdGhpcy5yZWZKc29uUmVhZGVyLnJlYWQoZSx0LHIpLHR9aW50ZXJuYWxKc29uV3JpdGUoZSxyKXtyZXR1cm4gdGhpcy5yZWZKc29uV3JpdGVyLndyaXRlKGUscil9aW50ZXJuYWxCaW5hcnlXcml0ZShlLHIsdCl7cmV0dXJuIHRoaXMucmVmQmluV3JpdGVyLndyaXRlKGUscix0KSxyfWludGVybmFsQmluYXJ5UmVhZChlLHIsdCxhKXthPWE/P3RoaXMuY3JlYXRlKCk7cmV0dXJuIHRoaXMucmVmQmluUmVhZGVyLnJlYWQoZSxhLHQsciksYX19XG5cdFx0XHRcdFx0LyoqKioqKioqKioqKioqKioqKiAgaW5pdGlhbGl6YXRpb24gZmluaXNoICAqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vcHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXByb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS5wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKFBMQVRGT1JNKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIllvdVR1YmVcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0LyoqKioqKioqKioqKioqKioqKiAgaW5pdGlhbGl6YXRpb24gc3RhcnQgICoqKioqKioqKioqKioqKioqKiovXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBCcm93c2UkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJCcm93c2VcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJjb250ZXh0XCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBqc29uTmFtZTogXCJyZXNwb25zZUNvbnRleHRcIiwgVDogKCkgPT4gQ29udGV4dCB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogOSwgbmFtZTogXCJjb250ZW50c1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gQ29udGVudHMgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEwLCBuYW1lOiBcImNvbnRpbnVhdGlvbkNvbnRlbnRzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBDb250ZW50cyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNzc3LCBuYW1lOiBcImZyYW1ld29ya1VwZGF0ZXNcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IEZyYW1ld29ya1VwZGF0ZXMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBCcm93c2UgPSBuZXcgQnJvd3NlJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIENvbnRleHQkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJDb250ZXh0XCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDYsIG5hbWU6IFwic2VydmljZVRyYWNraW5nUGFyYW1zXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBTZXJ2aWNlVHJhY2tpbmdQYXJhbXMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBDb250ZXh0ID0gbmV3IENvbnRleHQkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgQ29udGVudHMkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJDb250ZW50c1wiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA0OTM5OTc5NywgbmFtZTogXCJzZWN0aW9uTGlzdFJlbmRlcmVyXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBTZWN0aW9uTGlzdFJlbmRlcmVyIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA1MDE5NTQ2MiwgbmFtZTogXCJuNEY1MDE5NTQ2MlwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gbjRGNTAxOTU0NjIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDU4MTczOTQ5LCBuYW1lOiBcInNpbmdsZUNvbHVtbkJyb3dzZVJlc3VsdHNSZW5kZXJlclwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gU2luZ2xlQ29sdW1uQnJvd3NlUmVzdWx0c1JlbmRlcmVyIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA5MDgyMzEzNSwgbmFtZTogXCJtdXNpY1NpZGVBbGlnbmVkSXRlbVJlbmRlcmVyXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBNdXNpY1NpZGVBbGlnbmVkSXRlbVJlbmRlcmVyIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA5MTMwMzg3MiwgbmFtZTogXCJncmlkUmVuZGVyZXJcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IEdyaWRSZW5kZXJlciB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMTUzNTE1MTU0LCBuYW1lOiBcIm42RjE1MzUxNTE1NFwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gbjZGMTUzNTE1MTU0IH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyMjE0OTY3MzQsIG5hbWU6IFwibXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXJcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IE11c2ljRGVzY3JpcHRpb25TaGVsZlJlbmRlcmVyIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgQ29udGVudHMgPSBuZXcgQ29udGVudHMkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgU2VydmljZVRyYWNraW5nUGFyYW1zJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiU2VydmljZVRyYWNraW5nUGFyYW1zXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwicGFyYW1zXCIsIGtpbmQ6IFwibWFwXCIsIEs6IDkgLypTY2FsYXJUeXBlLlNUUklORyovLCBWOiB7IGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBTZXJ2aWNlVHJhY2tpbmdQYXJhbXMgPSBuZXcgU2VydmljZVRyYWNraW5nUGFyYW1zJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIFNpbmdsZUNvbHVtbkJyb3dzZVJlc3VsdHNSZW5kZXJlciRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIlNpbmdsZUNvbHVtbkJyb3dzZVJlc3VsdHNSZW5kZXJlclwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcInRhYnNcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IFRhYnMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBTaW5nbGVDb2x1bW5Ccm93c2VSZXN1bHRzUmVuZGVyZXIgPSBuZXcgU2luZ2xlQ29sdW1uQnJvd3NlUmVzdWx0c1JlbmRlcmVyJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIE11c2ljU2lkZUFsaWduZWRJdGVtUmVuZGVyZXIkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJNdXNpY1NpZGVBbGlnbmVkSXRlbVJlbmRlcmVyXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwic3RhcnRJdGVtc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgcmVwZWF0OiAxIC8qUmVwZWF0VHlwZS5QQUNLRUQqLywgVDogKCkgPT4gQ29udGVudHMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBNdXNpY1NpZGVBbGlnbmVkSXRlbVJlbmRlcmVyID0gbmV3IE11c2ljU2lkZUFsaWduZWRJdGVtUmVuZGVyZXIkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgR3JpZFJlbmRlcmVyJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiR3JpZFJlbmRlcmVyXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwiaXRlbXNcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IENvbnRlbnRzIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgR3JpZFJlbmRlcmVyID0gbmV3IEdyaWRSZW5kZXJlciRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBUYWJzJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiVGFic1wiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA1ODE3NDAxMCwgbmFtZTogXCJ0YWJSZW5kZXJlclwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gVGFiUmVuZGVyZXIgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBUYWJzID0gbmV3IFRhYnMkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgVGFiUmVuZGVyZXIkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJUYWJSZW5kZXJlclwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcInRpdGxlXCIsIGtpbmQ6IFwic2NhbGFyXCIsIG9wdDogdHJ1ZSwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDMsIG5hbWU6IFwic2VsZWN0ZWRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOCAvKlNjYWxhclR5cGUuQk9PTCovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA0LCBuYW1lOiBcImNvbnRlbnRcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IENvbnRlbnRzIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxMSwgbmFtZTogXCJ0YWJJZGVudGlmaWVyXCIsIGtpbmQ6IFwic2NhbGFyXCIsIG9wdDogdHJ1ZSwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBUYWJSZW5kZXJlciA9IG5ldyBUYWJSZW5kZXJlciRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBTZWN0aW9uTGlzdFJlbmRlcmVyJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiU2VjdGlvbkxpc3RSZW5kZXJlclwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImNvbnRlbnRzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBDb250ZW50cyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNiwgbmFtZTogXCJoZWFkZXJcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IENvbnRlbnRzIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgU2VjdGlvbkxpc3RSZW5kZXJlciA9IG5ldyBTZWN0aW9uTGlzdFJlbmRlcmVyJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIG40RjUwMTk1NDYyJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwibjRGNTAxOTU0NjJcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJuNUYxXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBDb250ZW50cyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG40RjUwMTk1NDYyID0gbmV3IG40RjUwMTk1NDYyJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIE11c2ljRGVzY3JpcHRpb25TaGVsZlJlbmRlcmVyJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiTXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXJcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMywgbmFtZTogXCJkZXNjcmlwdGlvblwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gRGVzY3JpcHRpb24gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEwLCBuYW1lOiBcImZvb3RlclwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gRm9vdGVyIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgTXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXIgPSBuZXcgTXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXIkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgRGVzY3JpcHRpb24kVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJEZXNjcmlwdGlvblwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcInJ1bnNcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IFJ1bnMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBEZXNjcmlwdGlvbiA9IG5ldyBEZXNjcmlwdGlvbiRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBuNkYxNTM1MTUxNTQkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJuNkYxNTM1MTUxNTRcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMTcyNjYwNjYzLCBuYW1lOiBcIm43RjE3MjY2MDY2M1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gbjdGMTcyNjYwNjYzIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbjZGMTUzNTE1MTU0ID0gbmV3IG42RjE1MzUxNTE1NCRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBuN0YxNzI2NjA2NjMkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJuN0YxNzI2NjA2NjNcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJuOEYxXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBuOEYxIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbjdGMTcyNjYwNjYzID0gbmV3IG43RjE3MjY2MDY2MyRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBGb290ZXIkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJGb290ZXJcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJydW5zXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBSdW5zIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgRm9vdGVyID0gbmV3IEZvb3RlciRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBuOEYxJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwibjhGMVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxNjg3Nzc0MDEsIG5hbWU6IFwibjlGMTY4Nzc3NDAxXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBuOUYxNjg3Nzc0MDEgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuOEYxID0gbmV3IG44RjEkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgbjlGMTY4Nzc3NDAxJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwibjlGMTY4Nzc3NDAxXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDUsIG5hbWU6IFwibjEwRjVcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IG4xMEY1IH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbjlGMTY4Nzc3NDAxID0gbmV3IG45RjE2ODc3NzQwMSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBuMTBGNSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIm4xMEY1XCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDQ2NTE2MDk2NSwgbmFtZTogXCJuMTFGNDY1MTYwOTY1XCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBuMTFGNDY1MTYwOTY1IH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbjEwRjUgPSBuZXcgbjEwRjUkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgbjExRjQ2NTE2MDk2NSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIm4xMUY0NjUxNjA5NjVcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNCwgbmFtZTogXCJuMTJGNFwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gbjEyRjQgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuMTFGNDY1MTYwOTY1ID0gbmV3IG4xMUY0NjUxNjA5NjUkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgbjEyRjQkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJuMTJGNFwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcIm4xM0YxXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBuMTNGMSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMiwgbmFtZTogXCJvcmlnaW5UZXh0XCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbjEyRjQgPSBuZXcgbjEyRjQkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgbjEzRjEkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJuMTNGMVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImYxXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbjEzRjEgPSBuZXcgbjEzRjEkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgbjExRjE3MjAzNTI1MCRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIm4xMUYxNzIwMzUyNTBcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJ0eXBlXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbjExRjE3MjAzNTI1MCA9IG5ldyBuMTFGMTcyMDM1MjUwJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIFJ1bnMkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJSdW5zXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwidGV4dFwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IFJ1bnMgPSBuZXcgUnVucyRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBGcmFtZXdvcmtVcGRhdGVzJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiRnJhbWV3b3JrVXBkYXRlc1wiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImVudGl0eUJhdGNoVXBkYXRlXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBFbnRpdHlCYXRjaFVwZGF0ZSB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEZyYW1ld29ya1VwZGF0ZXMgPSBuZXcgRnJhbWV3b3JrVXBkYXRlcyRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBFbnRpdHlCYXRjaFVwZGF0ZSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkVudGl0eUJhdGNoVXBkYXRlXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwibXV0YXRpb25zXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBNdXRhdGlvbnMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBFbnRpdHlCYXRjaFVwZGF0ZSA9IG5ldyBFbnRpdHlCYXRjaFVwZGF0ZSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBNdXRhdGlvbnMkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJNdXRhdGlvbnNcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJlbnRpdHlLZXlcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDMsIG5hbWU6IFwicGF5bG9hZFwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gUGF5bG9hZCB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IE11dGF0aW9ucyA9IG5ldyBNdXRhdGlvbnMkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgUGF5bG9hZCRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIlBheWxvYWRcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMTQ0LCBuYW1lOiBcIm11c2ljRm9ybVwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gTXVzaWNGb3JtIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxNDUsIG5hbWU6IFwibXVzaWNGb3JtQm9vbGVhbkNob2ljZVwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gTXVzaWNGb3JtQm9vbGVhbkNob2ljZSB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IFBheWxvYWQgPSBuZXcgUGF5bG9hZCRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBNdXNpY0Zvcm0kVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJNdXNpY0Zvcm1cIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJpZFwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMiwgbmFtZTogXCJib29sZWFuQ2hvaWNlRW50aXR5S2V5c1wiLCBraW5kOiBcInNjYWxhclwiLCByZXBlYXQ6IDIgLypSZXBlYXRUeXBlLlVOUEFDS0VEKi8sIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgTXVzaWNGb3JtID0gbmV3IE11c2ljRm9ybSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBNdXNpY0Zvcm1Cb29sZWFuQ2hvaWNlJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwibXVzaWNGb3JtQm9vbGVhbkNob2ljZVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImlkXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcImJvb2xlYW5DaG9pY2VFbnRpdHlLZXlcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDMsIG5hbWU6IFwic2VsZWN0ZWRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOCAvKlNjYWxhclR5cGUuQk9PTCovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA0LCBuYW1lOiBcIm9wYXF1ZVRva2VuXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgTXVzaWNGb3JtQm9vbGVhbkNob2ljZSA9IG5ldyBNdXNpY0Zvcm1Cb29sZWFuQ2hvaWNlJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8qKioqKioqKioqKioqKioqKiogIGluaXRpYWxpemF0aW9uIGZpbmlzaCAgKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdFx0XHRcdFx0XHRcdGJvZHkgPSBCcm93c2UuZnJvbUJpbmFyeShyYXdCb2R5KTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgY29udGVudHM6ICR7SlNPTi5zdHJpbmdpZnkoYm9keT8uY29udGVudHMpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGNvbnRpbnVhdGlvbkNvbnRlbnRzOiAke0pTT04uc3RyaW5naWZ5KGJvZHk/LmNvbnRpbnVhdGlvbkNvbnRlbnRzKX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBVRiA9IFVua25vd25GaWVsZEhhbmRsZXIubGlzdChib2R5KTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYFVGOiAke0pTT04uc3RyaW5naWZ5KFVGKX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChVRikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRVRiA9IFVGLm1hcCh1ZiA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91Zi5ubzsgLy8gMjJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VmLndpcmVUeXBlOyAvLyBXaXJlVHlwZS5WYXJpbnRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyB1c2UgdGhlIGJpbmFyeSByZWFkZXIgdG8gZGVjb2RlIHRoZSByYXcgZGF0YTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgcmVhZGVyID0gbmV3IEJpbmFyeVJlYWRlcih1Zi5kYXRhKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgYWRkZWROdW1iZXIgPSByZWFkZXIuaW50MzIoKTsgLy8gNzc3N1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBubzogJHt1Zi5ub30sIHdpcmVUeXBlOiAke3VmLndpcmVUeXBlfSwgcmVhZGVyOiAke3JlYWRlcn0sIGFkZGVkTnVtYmVyOiAke2FkZGVkTnVtYmVyfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XHRMYW5ndWFnZXNbMF0gPSBcIkFVVE9cIjtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChib2R5Py5jb250ZW50cz8ubjZGMTUzNTE1MTU0Py5uN0YxNzI2NjA2NjM/Lm44RjE/Lm45RjE2ODc3NzQwMT8ubjEwRjU/Lm4xMUY0NjUxNjA5NjU/Lm4xMkY0Py5uMTNGMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgZnVsbFRleHQgPSBib2R5LmNvbnRlbnRzLm42RjE1MzUxNTE1NC5uN0YxNzI2NjA2NjMubjhGMS5uOUYxNjg3Nzc0MDEubjEwRjUubjExRjQ2NTE2MDk2NS5uMTJGNC5uMTNGMS5tYXAobGluZSA9PiBsaW5lPy5mMSA/PyBcIlxcdTIwMGJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHRyYW5zbGF0aW9uID0gYXdhaXQgVHJhbnNsYXRlKGZ1bGxUZXh0LCBTZXR0aW5ncz8uTWV0aG9kLCBTZXR0aW5ncz8uVmVuZG9yLCBMYW5ndWFnZXNbMF0sIExhbmd1YWdlc1sxXSwgU2V0dGluZ3M/LltTZXR0aW5ncz8uVmVuZG9yXSwgQ29uZmlncz8uTGFuZ3VhZ2VzLCBTZXR0aW5ncz8uVGltZXMsIFNldHRpbmdzPy5JbnRlcnZhbCwgU2V0dGluZ3M/LkV4cG9uZW50aWFsKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ym9keS5jb250ZW50cy5uNkYxNTM1MTUxNTQubjdGMTcyNjYwNjYzLm44RjEubjlGMTY4Nzc3NDAxLm4xMEY1Lm4xMUY0NjUxNjA5NjUubjEyRjQubjEzRjEgPSBib2R5LmNvbnRlbnRzLm42RjE1MzUxNTE1NC5uN0YxNzI2NjA2NjMubjhGMS5uOUYxNjg3Nzc0MDEubjEwRjUubjExRjQ2NTE2MDk2NS5uMTJGNC5uMTNGMS5tYXAoKGxpbmUsIGkpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAobGluZT8uZjEpIGxpbmUuZjEgPSBjb21iaW5lVGV4dChsaW5lLmYxLCB0cmFuc2xhdGlvbj8uW2ldLCBTZXR0aW5ncz8uU2hvd09ubHksIFNldHRpbmdzPy5Qb3NpdGlvbik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxpbmU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChib2R5Py5jb250ZW50cz8uc2VjdGlvbkxpc3RSZW5kZXJlcj8uY29udGVudHMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IG11c2ljRGVzY3JpcHRpb25zID0gYm9keS5jb250ZW50cy5zZWN0aW9uTGlzdFJlbmRlcmVyLmNvbnRlbnRzO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRtdXNpY0Rlc2NyaXB0aW9ucyA9IGF3YWl0IFByb21pc2UuYWxsKG11c2ljRGVzY3JpcHRpb25zLm1hcChhc3luYyBtdXNpY0Rlc2NyaXB0aW9uID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAobXVzaWNEZXNjcmlwdGlvbj8ubXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXI/LmRlc2NyaXB0aW9uPy5ydW5zKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgbHlyaWNzID0gbXVzaWNEZXNjcmlwdGlvbi5tdXNpY0Rlc2NyaXB0aW9uU2hlbGZSZW5kZXJlci5kZXNjcmlwdGlvbi5ydW5zO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bHlyaWNzID0gYXdhaXQgUHJvbWlzZS5hbGwobHlyaWNzLm1hcChhc3luYyBydW4gPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgZnVsbFRleHQgPSBydW4/LnRleHQ/LnNwbGl0Py4oXCJcXG5cIik/Lm1hcCh0ZXh0ID0+IHRleHQ/LnRyaW0oKSA/PyBcIlxcdTIwMGJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHRyYW5zbGF0aW9uID0gYXdhaXQgVHJhbnNsYXRlKGZ1bGxUZXh0LCBTZXR0aW5ncz8uTWV0aG9kLCBTZXR0aW5ncz8uVmVuZG9yLCBMYW5ndWFnZXNbMF0sIExhbmd1YWdlc1sxXSwgU2V0dGluZ3M/LltTZXR0aW5ncz8uVmVuZG9yXSwgQ29uZmlncz8uTGFuZ3VhZ2VzLCBTZXR0aW5ncz8uVGltZXMsIFNldHRpbmdzPy5JbnRlcnZhbCwgU2V0dGluZ3M/LkV4cG9uZW50aWFsKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVsbFRleHQgPSBmdWxsVGV4dC5tYXAoKGxpbmUsIGkpID0+IHsgaWYgKGxpbmUpIHJldHVybiBjb21iaW5lVGV4dChsaW5lLCB0cmFuc2xhdGlvbj8uW2ldLCBTZXR0aW5ncz8uU2hvd09ubHksIFNldHRpbmdzPy5Qb3NpdGlvbiwgXCJcXG4gIOKUlCBcIikgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJ1bi50ZXh0ID0gZnVsbFRleHQuam9pbihcIlxcblwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJ1bjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBtdXNpY0Rlc2NyaXB0aW9uO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBjb250ZW50czogJHtKU09OLnN0cmluZ2lmeShib2R5Py5jb250ZW50cyl9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgY29udGludWF0aW9uQ29udGVudHM6ICR7SlNPTi5zdHJpbmdpZnkoYm9keT8uY29udGludWF0aW9uQ29udGVudHMpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmF3Qm9keSA9IEJyb3dzZS50b0JpbmFyeShib2R5KTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIlNwb3RpZnlcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0LyoqKioqKioqKioqKioqKioqKiAgaW5pdGlhbGl6YXRpb24gc3RhcnQgICoqKioqKioqKioqKioqKioqKiovXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgU3luY1R5cGU7XG5cdFx0XHRcdFx0XHRcdFx0XHQoZnVuY3Rpb24gKFN5bmNUeXBlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFN5bmNUeXBlW1N5bmNUeXBlW1wiVU5TWU5DRURcIl0gPSAwXSA9IFwiVU5TWU5DRURcIjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0U3luY1R5cGVbU3luY1R5cGVbXCJMSU5FX1NZTkNFRFwiXSA9IDFdID0gXCJMSU5FX1NZTkNFRFwiO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRTeW5jVHlwZVtTeW5jVHlwZVtcIlNZTExBQkxFX1NZTkNFRFwiXSA9IDJdID0gXCJTWUxMQUJMRV9TWU5DRURcIjtcblx0XHRcdFx0XHRcdFx0XHRcdH0pKFN5bmNUeXBlIHx8IChTeW5jVHlwZSA9IHt9KSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBDb2xvckx5cmljc1Jlc3BvbnNlJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiQ29sb3JMeXJpY3NSZXNwb25zZVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImx5cmljc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gTHlyaWNzUmVzcG9uc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwiY29sb3JzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBDb2xvckRhdGEgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDMsIG5hbWU6IFwiaGFzVm9jYWxSZW1vdmFsXCIsIGtpbmQ6IFwic2NhbGFyXCIsIG9wdDogdHJ1ZSwgVDogOCAvKlNjYWxhclR5cGUuQk9PTCovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA0LCBuYW1lOiBcInZvY2FsUmVtb3ZhbENvbG9yc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gQ29sb3JEYXRhIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgQ29sb3JMeXJpY3NSZXNwb25zZSA9IG5ldyBDb2xvckx5cmljc1Jlc3BvbnNlJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIEx5cmljc1Jlc3BvbnNlJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiTHlyaWNzUmVzcG9uc2VcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJzeW5jVHlwZVwiLCBraW5kOiBcImVudW1cIiwgVDogKCkgPT4gW1wiU3luY1R5cGVcIiwgU3luY1R5cGVdIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcImxpbmVzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBMeXJpY3NMaW5lIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAzLCBuYW1lOiBcInByb3ZpZGVyXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA0LCBuYW1lOiBcInByb3ZpZGVyTHlyaWNzSWRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDUsIG5hbWU6IFwicHJvdmlkZXJEaXNwbGF5TmFtZVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNiwgbmFtZTogXCJzeW5jTHlyaWNzQW5kcm9pZEludGVudFwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gQW5kcm9pZEludGVudCB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNywgbmFtZTogXCJzeW5jTHlyaWNzVXJpXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA4LCBuYW1lOiBcImlzRGVuc2VUeXBlZmFjZVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA4IC8qU2NhbGFyVHlwZS5CT09MKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDksIG5hbWU6IFwiYWx0ZXJuYXRpdmVzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBBbHRlcm5hdGl2ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMTAsIG5hbWU6IFwibGFuZ3VhZ2VcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDExLCBuYW1lOiBcImlzUnRsTGFuZ3VhZ2VcIiwga2luZDogXCJzY2FsYXJcIiwgb3B0OiB0cnVlLCBUOiA4IC8qU2NhbGFyVHlwZS5CT09MKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEyLCBuYW1lOiBcImZ1bGxzY3JlZW5BY3Rpb25cIiwga2luZDogXCJzY2FsYXJcIiwgVDogNSAvKlNjYWxhclR5cGUuSU5UMzIqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMTMsIG5hbWU6IFwic2hvd1Vwc2VsbFwiLCBraW5kOiBcInNjYWxhclwiLCBvcHQ6IHRydWUsIFQ6IDggLypTY2FsYXJUeXBlLkJPT0wqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEx5cmljc1Jlc3BvbnNlID0gbmV3IEx5cmljc1Jlc3BvbnNlJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIEx5cmljc0xpbmUkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJMeXJpY3NMaW5lXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwic3RhcnRUaW1lTXNcIiwga2luZDogXCJzY2FsYXJcIiwgVDogMyAvKlNjYWxhclR5cGUuSU5UNjQqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMiwgbmFtZTogXCJ3b3Jkc1wiLCBraW5kOiBcInNjYWxhclwiLCBvcHQ6IHRydWUsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAzLCBuYW1lOiBcInN5bGxhYmxlc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgcmVwZWF0OiAxIC8qUmVwZWF0VHlwZS5QQUNLRUQqLywgVDogKCkgPT4gU3lsbGFibGUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8veyBubzogNCwgbmFtZTogXCJlbmRUaW1lTXNcIiwga2luZDogXCJzY2FsYXJcIiwgb3B0OiB0cnVlLCBUOiAzIC8qU2NhbGFyVHlwZS5JTlQ2NCovIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgTHlyaWNzTGluZSA9IG5ldyBMeXJpY3NMaW5lJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIFN5bGxhYmxlJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiU3lsbGFibGVcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJzdGFydFRpbWVNc1wiLCBraW5kOiBcInNjYWxhclwiLCBUOiAzIC8qU2NhbGFyVHlwZS5JTlQ2NCovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcIm51bUNoYXJzXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDMgLypTY2FsYXJUeXBlLklOVDY0Ki8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBTeWxsYWJsZSA9IG5ldyBTeWxsYWJsZSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBDb2xvckRhdGEkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJDb2xvckRhdGFcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJiYWNrZ3JvdW5kXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDUgLypTY2FsYXJUeXBlLklOVDMyKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwidGV4dFwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA1IC8qU2NhbGFyVHlwZS5JTlQzMiovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAzLCBuYW1lOiBcImhpZ2hsaWdodFRleHRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogNSAvKlNjYWxhclR5cGUuSU5UMzIqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IENvbG9yRGF0YSA9IG5ldyBDb2xvckRhdGEkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgQW5kcm9pZEludGVudCRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkFuZHJvaWRJbnRlbnRcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJwcm92aWRlclwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMiwgbmFtZTogXCJwcm92aWRlckFuZHJvaWRBcHBJZFwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMywgbmFtZTogXCJhY3Rpb25cIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDQsIG5hbWU6IFwiZGF0YVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNSwgbmFtZTogXCJjb250ZW50VHlwZVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEFuZHJvaWRJbnRlbnQgPSBuZXcgQW5kcm9pZEludGVudCRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBBbHRlcm5hdGl2ZSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkFsdGVybmF0aXZlXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwibGFuZ3VhZ2VcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwibGluZXNcIiwga2luZDogXCJzY2FsYXJcIiwgcmVwZWF0OiAyIC8qUmVwZWF0VHlwZS5VTlBBQ0tFRCovLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEFsdGVybmF0aXZlID0gbmV3IEFsdGVybmF0aXZlJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8qKioqKioqKioqKioqKioqKiogIGluaXRpYWxpemF0aW9uIGZpbmlzaCAgKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdFx0XHRcdFx0XHRcdGJvZHkgPSBDb2xvckx5cmljc1Jlc3BvbnNlLmZyb21CaW5hcnkocmF3Qm9keSk7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgVUYgPSBVbmtub3duRmllbGRIYW5kbGVyLmxpc3QoYm9keSk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBVRjogJHtKU09OLnN0cmluZ2lmeShVRil9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoVUYpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0VUYgPSBVRi5tYXAodWYgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdWYubm87IC8vIDIyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91Zi53aXJlVHlwZTsgLy8gV2lyZVR5cGUuVmFyaW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gdXNlIHRoZSBiaW5hcnkgcmVhZGVyIHRvIGRlY29kZSB0aGUgcmF3IGRhdGE6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IHJlYWRlciA9IG5ldyBCaW5hcnlSZWFkZXIodWYuZGF0YSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGFkZGVkTnVtYmVyID0gcmVhZGVyLmludDMyKCk7IC8vIDc3Nzdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgbm86ICR7dWYubm99LCB3aXJlVHlwZTogJHt1Zi53aXJlVHlwZX0sIHJlYWRlcjogJHtyZWFkZXJ9LCBhZGRlZE51bWJlcjogJHthZGRlZE51bWJlcn1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdFx0XHRcdExhbmd1YWdlc1swXSA9IChib2R5Py5seXJpY3M/Lmxhbmd1YWdlID09PSBcInoxXCIpID8gXCJaSC1IQU5UXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiAoYm9keT8ubHlyaWNzPy5sYW5ndWFnZSkgPyBib2R5Py5seXJpY3M/Lmxhbmd1YWdlLnRvVXBwZXJDYXNlKClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IFwiQVVUT1wiO1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGZ1bGxUZXh0ID0gYm9keS5seXJpY3MubGluZXMubWFwKGxpbmUgPT4gbGluZT8ud29yZHMgPz8gXCJcXHUyMDBiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNsYXRpb24gPSBhd2FpdCBUcmFuc2xhdGUoZnVsbFRleHQsIFNldHRpbmdzPy5NZXRob2QsIFNldHRpbmdzPy5WZW5kb3IsIExhbmd1YWdlc1swXSwgTGFuZ3VhZ2VzWzFdLCBTZXR0aW5ncz8uW1NldHRpbmdzPy5WZW5kb3JdLCBDb25maWdzPy5MYW5ndWFnZXMsIFNldHRpbmdzPy5UaW1lcywgU2V0dGluZ3M/LkludGVydmFsLCBTZXR0aW5ncz8uRXhwb25lbnRpYWwpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdGJvZHkubHlyaWNzLmFsdGVybmF0aXZlcyA9IFt7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibGFuZ3VhZ2VcIjogTGFuZ3VhZ2VzWzFdLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibGluZXNcIjogdHJhbnNsYXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdH1dO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdFx0XHRcdGlmICghYm9keT8ubHlyaWNzPy5hbHRlcm5hdGl2ZXMpIGJvZHkubHlyaWNzLmFsdGVybmF0aXZlcyA9IFtdO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ym9keS5seXJpY3MuYWx0ZXJuYXRpdmVzLnVuc2hpZnQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImxhbmd1YWdlXCI6IExhbmd1YWdlc1sxXS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImxpbmVzXCI6IHRyYW5zbGF0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBib2R5OiAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmF3Qm9keSA9IENvbG9yTHlyaWNzUmVzcG9uc2UudG9CaW5hcnkoYm9keSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwYytwcm90b1wiOlxuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdC8vIOWGmeWFpeS6jOi/m+WItuaVsOaNrlxuXHRcdFx0XHRcdGlmICgkLmlzUXVhblgoKSkgJHJlc3BvbnNlLmJvZHlCeXRlcyA9IHJhd0JvZHlcblx0XHRcdFx0XHRlbHNlICRyZXNwb25zZS5ib2R5ID0gcmF3Qm9keTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0YnJlYWs7XG5cdH07XG59KSgpXG5cdC5jYXRjaCgoZSkgPT4gJC5sb2dFcnIoZSkpXG5cdC5maW5hbGx5KCgpID0+IHtcblx0XHRzd2l0Y2ggKCRyZXNwb25zZSkge1xuXHRcdFx0ZGVmYXVsdDogeyAvLyDmnInlm57lpI3mlbDmja7vvIzov5Tlm57lm57lpI3mlbDmja5cblx0XHRcdFx0Ly9jb25zdCBGT1JNQVQgPSAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJDb250ZW50LVR5cGVcIl0gPz8gJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pPy5zcGxpdChcIjtcIik/LlswXTtcblx0XHRcdFx0JC5sb2coYPCfjokgJHskLm5hbWV9LCBmaW5hbGx5YCwgYCRyZXNwb25zZWAsIGBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuXHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwgZmluYWxseWAsIGAkcmVzcG9uc2U6ICR7SlNPTi5zdHJpbmdpZnkoJHJlc3BvbnNlKX1gLCBcIlwiKTtcblx0XHRcdFx0aWYgKCRyZXNwb25zZT8uaGVhZGVycz8uW1wiQ29udGVudC1FbmNvZGluZ1wiXSkgJHJlc3BvbnNlLmhlYWRlcnNbXCJDb250ZW50LUVuY29kaW5nXCJdID0gXCJpZGVudGl0eVwiO1xuXHRcdFx0XHRpZiAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJjb250ZW50LWVuY29kaW5nXCJdKSAkcmVzcG9uc2UuaGVhZGVyc1tcImNvbnRlbnQtZW5jb2RpbmdcIl0gPSBcImlkZW50aXR5XCI7XG5cdFx0XHRcdGlmICgkLmlzUXVhblgoKSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdFx0XHRjYXNlIHVuZGVmaW5lZDogLy8g6KeG5Li65pegYm9keVxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57mma7pgJrmlbDmja5cblx0XHRcdFx0XHRcdFx0JC5kb25lKHsgc3RhdHVzOiAkcmVzcG9uc2Uuc3RhdHVzLCBoZWFkZXJzOiAkcmVzcG9uc2UuaGVhZGVycyB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57mma7pgJrmlbDmja5cblx0XHRcdFx0XHRcdFx0JC5kb25lKHsgc3RhdHVzOiAkcmVzcG9uc2Uuc3RhdHVzLCBoZWFkZXJzOiAkcmVzcG9uc2UuaGVhZGVycywgYm9keTogJHJlc3BvbnNlLmJvZHkgfSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3Byb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUucHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwYytwcm90b1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxlY2F0aW9uL29jdGV0LXN0cmVhbVwiOlxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57kuozov5vliLbmlbDmja5cblx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhgJHskcmVzcG9uc2UuYm9keUJ5dGVzLmJ5dGVMZW5ndGh9LS0tJHskcmVzcG9uc2UuYm9keUJ5dGVzLmJ1ZmZlci5ieXRlTGVuZ3RofWApO1xuXHRcdFx0XHRcdFx0XHQkLmRvbmUoeyBzdGF0dXM6ICRyZXNwb25zZS5zdGF0dXMsIGhlYWRlcnM6ICRyZXNwb25zZS5oZWFkZXJzLCBib2R5Qnl0ZXM6ICRyZXNwb25zZS5ib2R5Qnl0ZXMuYnVmZmVyLnNsaWNlKCRyZXNwb25zZS5ib2R5Qnl0ZXMuYnl0ZU9mZnNldCwgJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlTGVuZ3RoICsgJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlT2Zmc2V0KSB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBlbHNlICQuZG9uZSgkcmVzcG9uc2UpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDogeyAvLyDml6Dlm57lpI3mlbDmja5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0pXG5cbi8qKioqKioqKioqKioqKioqKiBGdW5jdGlvbiAqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogU2V0IENhY2hlXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge01hcH0gY2FjaGUgLSBQbGF5bGlzdHMgQ2FjaGUgLyBTdWJ0aXRsZXMgQ2FjaGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBjYWNoZVNpemUgLSBDYWNoZSBTaXplXG4gKiBAcmV0dXJuIHtCb29sZWFufSBpc1NhdmVkXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlKGNhY2hlLCBjYWNoZVNpemUgPSAxMDApIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIFNldCBDYWNoZSwgY2FjaGVTaXplOiAke2NhY2hlU2l6ZX1gLCBcIlwiKTtcblx0Y2FjaGUgPSBBcnJheS5mcm9tKGNhY2hlIHx8IFtdKTsgLy8gTWFw6L2sQXJyYXlcblx0Y2FjaGUgPSBjYWNoZS5zbGljZSgtY2FjaGVTaXplKTsgLy8g6ZmQ5Yi257yT5a2Y5aSn5bCPXG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgQ2FjaGVgLCBcIlwiKTtcblx0cmV0dXJuIGNhY2hlO1xufTtcblxuLyoqXG4gKiBUcmFuc2xhdGVcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7QXJyYXl9IHRleHQgLSBmdWxsIHRleHRcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgLSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSB2ZW5kb3IgLSB0cmFuc2xhdGUgc2VydmljZSB2ZW5kb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb3VyY2UgLSBzb3VyY2UgbGFuZ3VhZ2VcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgLSB0YXJnZXQgbGFuZ3VhZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBhcGkgLSB0cmFuc2xhdGUgc2VydmljZSBBUElcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhYmFzZSAtIGxhbmd1YWdlcyBkYXRhYmFzZVxuICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVzIC0gcmV0cnkgdGltZXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCAtIHJldHJ5IGludGVydmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGV4cG9uZW50aWFsIC0gcmV0cnkgRXhwb25lbnRpYWxcbiAqIFxuICogQHJldHVybiB7UHJvbWlzZTwqPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gVHJhbnNsYXRlKHRleHQgPSBbXSwgbWV0aG9kID0gXCJQYXJ0XCIsIHZlbmRvciA9IFwiR29vZ2xlXCIsIHNvdXJjZSA9IFwiRU5cIiwgdGFyZ2V0ID0gXCJaSFwiLCBBUEkgPSB7fSwgZGF0YWJhc2UgPSB7fSwgdGltZXMgPSAzLCBpbnRlcnZhbCA9IDEwMCwgZXhwb25lbnRpYWwgPSB0cnVlKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBUcmFuc2xhdGUsIG1ldGhvZDogJHttZXRob2R9LCB2ZW5kb3I6ICR7dmVuZG9yfSwgc291cmNlOiAke3NvdXJjZX0sIHRhcmdldDogJHt0YXJnZXR9YCwgXCJcIik7XG5cdC8vIOe/u+ivkemVv+W6puiuvue9rlxuXHRsZXQgbGVuZ3RoID0gMTI3O1xuXHRzd2l0Y2ggKHZlbmRvcikge1xuXHRcdGNhc2UgXCJHb29nbGVcIjpcblx0XHRjYXNlIFwiR29vZ2xlQ2xvdWRcIjpcblx0XHRkZWZhdWx0OlxuXHRcdFx0bGVuZ3RoID0gMTIwO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIk1pY3Jvc29mdFwiOlxuXHRcdGNhc2UgXCJBenVyZVwiOlxuXHRcdFx0bGVuZ3RoID0gOTk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiRGVlcExcIjpcblx0XHRcdGxlbmd0aCA9IDQ5O1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIkRlZXBMWFwiOlxuXHRcdFx0bGVuZ3RoID0gMjA7XG5cdFx0XHRicmVhaztcblx0fTtcblx0bGV0IFRyYW5zbGF0aW9uID0gW107XG5cdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0ZGVmYXVsdDpcblx0XHRjYXNlIFwiUGFydFwiOiAvLyBQYXJ0IOmAkOautee/u+ivkVxuXHRcdFx0bGV0IHBhcnRzID0gY2h1bmsodGV4dCwgbGVuZ3RoKTtcblx0XHRcdFRyYW5zbGF0aW9uID0gYXdhaXQgUHJvbWlzZS5hbGwocGFydHMubWFwKGFzeW5jIHBhcnQgPT4gYXdhaXQgcmV0cnkoKCkgPT4gVHJhbnNsYXRvcih2ZW5kb3IsIHNvdXJjZSwgdGFyZ2V0LCBwYXJ0LCBBUEksIGRhdGFiYXNlKSwgdGltZXMsIGludGVydmFsLCBleHBvbmVudGlhbCkpKS50aGVuKHBhcnQgPT4gcGFydC5mbGF0KEluZmluaXR5KSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiUm93XCI6IC8vIFJvdyDpgJDooYznv7vor5Fcblx0XHRcdFRyYW5zbGF0aW9uID0gYXdhaXQgUHJvbWlzZS5hbGwodGV4dC5tYXAoYXN5bmMgcm93ID0+IGF3YWl0IHJldHJ5KCgpID0+IFRyYW5zbGF0b3IodmVuZG9yLCBzb3VyY2UsIHRhcmdldCwgcm93LCBBUEksIGRhdGFiYXNlKSwgdGltZXMsIGludGVydmFsLCBleHBvbmVudGlhbCkpKTtcblx0XHRcdGJyZWFrO1xuXHR9O1xuXHQvLyQubG9nKGDinIUgJHskLm5hbWV9LCBUcmFuc2xhdGUsIFRyYW5zbGF0aW9uOiAke0pTT04uc3RyaW5naWZ5KFRyYW5zbGF0aW9uKX1gLCBcIlwiKTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIFRyYW5zbGF0ZWAsIFwiXCIpO1xuXHRyZXR1cm4gVHJhbnNsYXRpb247XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0b3JcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2ZW5kb3IgLSB2ZW5kb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb3VyY2UgLSBzb3VyY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgLSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IC0gdGV4dFxuICogQHBhcmFtIHtPYmplY3R9IGFwaSAtIEFQSVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFiYXNlIC0gTGFuZ3VhZ2VzIERhdGFiYXNlXG4gKiBAcmV0dXJuIHtQcm9taXNlPCo+fVxuICovXG5hc3luYyBmdW5jdGlvbiBUcmFuc2xhdG9yKHZlbmRvciA9IFwiR29vZ2xlXCIsIHNvdXJjZSA9IFwiXCIsIHRhcmdldCA9IFwiXCIsIHRleHQgPSBcIlwiLCBhcGkgPSB7fSwgZGF0YWJhc2UgPSB7fSkge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfSwgVHJhbnNsYXRvcmAsIGBvcmlnOiAke3RleHR9YCwgXCJcIik7XG5cdC8vIOi9rOaNouivreiogOS7o+eggVxuXHRzd2l0Y2ggKHZlbmRvcikge1xuXHRcdGNhc2UgXCJHb29nbGVcIjpcblx0XHRjYXNlIFwiR29vZ2xlQ2xvdWRcIjpcblx0XHRcdHNvdXJjZSA9IGRhdGFiYXNlLkdvb2dsZVtzb3VyY2VdID8/IGRhdGFiYXNlLkdvb2dsZVtzb3VyY2U/LnNwbGl0Py4oL1stX10vKT8uWzBdXTtcblx0XHRcdHRhcmdldCA9IGRhdGFiYXNlLkdvb2dsZVt0YXJnZXRdID8/IGRhdGFiYXNlLkdvb2dsZVtzb3VyY2U/LnNwbGl0Py4oL1stX10vKT8uWzBdXTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJCaW5nXCI6XG5cdFx0Y2FzZSBcIk1pY3Jvc29mdFwiOlxuXHRcdGNhc2UgXCJBenVyZVwiOlxuXHRcdFx0c291cmNlID0gZGF0YWJhc2UuTWljcm9zb2Z0W3NvdXJjZV0gPz8gZGF0YWJhc2UuTWljcm9zb2Z0W3NvdXJjZT8uc3BsaXQ/LigvWy1fXS8pPy5bMF1dO1xuXHRcdFx0dGFyZ2V0ID0gZGF0YWJhc2UuTWljcm9zb2Z0W3RhcmdldF0gPz8gZGF0YWJhc2UuTWljcm9zb2Z0W3NvdXJjZT8uc3BsaXQ/LigvWy1fXS8pPy5bMF1dO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIkRlZXBMXCI6XG5cdFx0Y2FzZSBcIkRlZXBMWFwiOlxuXHRcdFx0c291cmNlID0gZGF0YWJhc2UuRGVlcExbc291cmNlXSA/PyBkYXRhYmFzZS5EZWVwTFtzb3VyY2U/LnNwbGl0Py4oL1stX10vKT8uWzBdXTtcblx0XHRcdHRhcmdldCA9IGRhdGFiYXNlLkRlZXBMW3RhcmdldF0gPz8gZGF0YWJhc2UuRGVlcExbc291cmNlPy5zcGxpdD8uKC9bLV9dLyk/LlswXV07XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiQmFpZHVGYW55aVwiOlxuXHRcdFx0c291cmNlID0gZGF0YWJhc2UuQmFpZHVbc291cmNlXSA/PyBkYXRhYmFzZS5CYWlkdVtzb3VyY2U/LnNwbGl0Py4oL1stX10vKT8uWzBdXTtcblx0XHRcdHRhcmdldCA9IGRhdGFiYXNlLkJhaWR1W3RhcmdldF0gPz8gZGF0YWJhc2UuQmFpZHVbc291cmNlPy5zcGxpdD8uKC9bLV9dLyk/LlswXV07XG5cdFx0Y2FzZSBcIllvdWRhb0FJXCI6XG5cdFx0XHRzb3VyY2UgPSBkYXRhYmFzZS5Zb3VkYW9bc291cmNlXSA/PyBkYXRhYmFzZS5Zb3VkYW9bc291cmNlPy5zcGxpdD8uKC9bLV9dLyk/LlswXV07XG5cdFx0XHR0YXJnZXQgPSBkYXRhYmFzZS5Zb3VkYW9bdGFyZ2V0XSA/PyBkYXRhYmFzZS5Zb3VkYW9bc291cmNlPy5zcGxpdD8uKC9bLV9dLyk/LlswXV07XG5cdFx0XHRicmVhaztcblx0fTtcblx0Ly8g5p6E6YCg6K+35rGCXG5cdGxldCByZXF1ZXN0ID0gYXdhaXQgR2V0UmVxdWVzdCh2ZW5kb3IsIHNvdXJjZSwgdGFyZ2V0LCB0ZXh0KTtcblx0Ly8g5Y+R6YCB6K+35rGCXG5cdGxldCB0cmFucyA9IGF3YWl0IEdldERhdGEodmVuZG9yLCByZXF1ZXN0KTtcblx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCBUcmFuc2xhdG9yYCwgYHRyYW5zOiAke3RyYW5zfWAsIFwiXCIpO1xuXHRyZXR1cm4gdHJhbnNcblx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHQvLyBHZXQgVHJhbnNsYXRlIFJlcXVlc3Rcblx0YXN5bmMgZnVuY3Rpb24gR2V0UmVxdWVzdCh2ZW5kb3IgPSBcIlwiLCBzb3VyY2UgPSBcIlwiLCB0YXJnZXQgPSBcIlwiLCB0ZXh0ID0gXCJcIikge1xuXHRcdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBHZXQgVHJhbnNsYXRlIFJlcXVlc3RgLCBcIlwiKTtcblx0XHRjb25zdCBVQVBvb2wgPSBbXG5cdFx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85Ni4wLjQ2NjQuNDUgU2FmYXJpLzUzNy4zNlwiLCAvLyAxMy41JVxuXHRcdFx0XCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTYuMC40NjY0LjExMCBTYWZhcmkvNTM3LjM2XCIsIC8vIDYuNiVcblx0XHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NDsgcnY6OTQuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC85NC4wXCIsIC8vIDYuNCVcblx0XHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NDsgcnY6OTUuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC85NS4wXCIsIC8vIDYuMiVcblx0XHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk2LjAuNDY2NC45MyBTYWZhcmkvNTM3LjM2XCIsIC8vIDUuMiVcblx0XHRcdFwiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk2LjAuNDY2NC41NSBTYWZhcmkvNTM3LjM2XCIsIC8vIDQuOCVcblx0XHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzc0LjAuMzcyOS4xNjkgU2FmYXJpLzUzNy4zNlwiLFxuXHRcdFx0XCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNjQuMC4zMjgyLjE0MCBTYWZhcmkvNTM3LjM2IEVkZ2UvMTcuMTcxMzRcIixcblx0XHRcdFwiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxMl8yIGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwNS4xLjE1IChLSFRNTCwgbGlrZSBHZWNrbykgTW9iaWxlLzE1RTE0OFwiLFxuXHRcdFx0XCJNb3ppbGxhLzUuMCAoaVBob25lOyBDUFUgaVBob25lIE9TIDEyXzIgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzEyLjEgTW9iaWxlLzE1RTE0OCBTYWZhcmkvNjA0LjFcIixcblx0XHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NClcIixcblx0XHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgNi4xOyBXT1c2NDsgcnY6NTIuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC81Mi4wXCIsXG5cdFx0XTtcblx0XHRsZXQgcmVxdWVzdCA9IHt9O1xuXHRcdGxldCBCYXNlVVJMID0gXCJcIjtcblx0XHRsZXQgdGV4dHMgPSBcIlwiO1xuXHRcdHN3aXRjaCAodmVuZG9yKSB7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0Y2FzZSBcIkdvb2dsZVwiOlxuXHRcdFx0XHRjb25zdCBCYXNlUmVxdWVzdCA9IFtcblx0XHRcdFx0XHR7IC8vIEdvb2dsZSBBUElcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiaHR0cHM6Ly90cmFuc2xhdGUuZ29vZ2xlYXBpcy5jb20vdHJhbnNsYXRlX2Evc2luZ2xlP2NsaWVudD1ndHgmZHQ9dFwiLFxuXHRcdFx0XHRcdFx0XCJoZWFkZXJzXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJBY2NlcHRcIjogXCIqLypcIixcblx0XHRcdFx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFVBUG9vbFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBVQVBvb2wubGVuZ3RoKV0sIC8vIOmaj+aculVBXG5cdFx0XHRcdFx0XHRcdFwiUmVmZXJlclwiOiBcImh0dHBzOi8vdHJhbnNsYXRlLmdvb2dsZS5jb21cIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0eyAvLyBHb29nbGUgRGljdGlvbmFyeSBDaHJvbWUgZXh0ZW5zaW9uIGh0dHBzOi8vY2hyb21lLmdvb2dsZS5jb20vd2Vic3RvcmUvZGV0YWlsL2dvb2dsZS1kaWN0aW9uYXJ5LWJ5LWdvb2cvbWdpam1ham9jZ2ZjYmVib2FjYWJmZ29ibWpnamNvamFcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiaHR0cHM6Ly9jbGllbnRzNS5nb29nbGUuY29tL3RyYW5zbGF0ZV9hL3Q/Y2xpZW50PWRpY3QtY2hyb21lLWV4XCIsXG5cdFx0XHRcdFx0XHRcImhlYWRlcnNcIjoge1xuXHRcdFx0XHRcdFx0XHRcIkFjY2VwdFwiOiBcIiovKlwiLFxuXHRcdFx0XHRcdFx0XHRcIlVzZXItQWdlbnRcIjogVUFQb29sW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIFVBUG9vbC5sZW5ndGgpXSAvLyDpmo/mnLpVQVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0eyAvLyBHb29nbGUgVHJhbnNsYXRlIEFwcFxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJodHRwczovL3RyYW5zbGF0ZS5nb29nbGUuY29tL3RyYW5zbGF0ZV9hL3NpbmdsZT9jbGllbnQ9aXQmZHQ9cWNhJmR0PXQmZHQ9cm10JmR0PWJkJmR0PXJtcyZkdD1zb3MmZHQ9bWQmZHQ9Z3QmZHQ9bGQmZHQ9c3MmZHQ9ZXgmb3RmPTImZGo9MSZobD1lbiZpZT1VVEYtOCZvZT1VVEYtOFwiLFxuXHRcdFx0XHRcdFx0XCJoZWFkZXJzXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJBY2NlcHRcIjogXCIqLypcIixcblx0XHRcdFx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiR29vZ2xlVHJhbnNsYXRlLzYuMjkuNTkyNzkgKGlQaG9uZTsgaU9TIDE1LjQ7IGVuOyBpUGhvbmUxNCwyKVwiLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0eyAvLyBHb29nbGUgVHJhbnNsYXRlIEFwcFxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJodHRwczovL3RyYW5zbGF0ZS5nb29nbGVhcGlzLmNvbS90cmFuc2xhdGVfYS9zaW5nbGU/Y2xpZW50PWd0eCZkaj0xJnNvdXJjZT1idWJibGUmZHQ9dCZkdD1iZCZkdD1leCZkdD1sZCZkdD1tZCZkdD1xY2EmZHQ9cncmZHQ9cm0mZHQ9c3MmZHQ9dCZkdD1hdFwiLFxuXHRcdFx0XHRcdFx0XCJoZWFkZXJzXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJBY2NlcHRcIjogXCIqLypcIixcblx0XHRcdFx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiR29vZ2xlVHJhbnNsYXRlLzYuMjkuNTkyNzkgKGlQaG9uZTsgaU9TIDE1LjQ7IGVuOyBpUGhvbmUxNCwyKVwiLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0XHRyZXF1ZXN0ID0gQmFzZVJlcXVlc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKEJhc2VSZXF1ZXN0Lmxlbmd0aCAtIDIpKV0gLy8g6ZqP5py6UmVxdWVzdCwg5o6S6Zmk5pyA5ZCO5Lik6aG5XG5cdFx0XHRcdHRleHQgPSAoQXJyYXkuaXNBcnJheSh0ZXh0KSkgPyB0ZXh0LmpvaW4oXCJcXHJcIikgOiB0ZXh0O1xuXHRcdFx0XHRyZXF1ZXN0LnVybCA9IHJlcXVlc3QudXJsICsgYCZzbD0ke3NvdXJjZX0mdGw9JHt0YXJnZXR9JnE9JHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9YDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiR29vZ2xlQ2xvdWRcIjpcblx0XHRcdFx0QmFzZVVSTCA9IFwiaHR0cHM6Ly90cmFuc2xhdGlvbi5nb29nbGVhcGlzLmNvbVwiO1xuXHRcdFx0XHRzd2l0Y2ggKGFwaT8uVmVyc2lvbikge1xuXHRcdFx0XHRcdGNhc2UgXCJ2MlwiOlxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXF1ZXN0LnVybCA9IGAke0Jhc2VVUkx9L2xhbmd1YWdlL3RyYW5zbGF0ZS92MmA7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0LmhlYWRlcnMgPSB7XG5cdFx0XHRcdFx0XHRcdC8vXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHthcGk/LlRva2VuID8/IGFwaT8uQXV0aH1gLFxuXHRcdFx0XHRcdFx0XHRcIlVzZXItQWdlbnRcIjogXCJEdWFsU3Vic1wiLFxuXHRcdFx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0XHRcdFx0XCJxXCI6IHRleHQsXG5cdFx0XHRcdFx0XHRcdFwic291cmNlXCI6IHNvdXJjZSxcblx0XHRcdFx0XHRcdFx0XCJ0YXJnZXRcIjogdGFyZ2V0LFxuXHRcdFx0XHRcdFx0XHRcImZvcm1hdFwiOiBcImh0bWxcIixcblx0XHRcdFx0XHRcdFx0Ly9cImtleVwiOiBhcGk/LktleVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKGFwaT8uTW9kZSkge1xuXHRcdFx0XHRcdFx0XHRjYXNlIFwiVG9rZW5cIjpcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0LmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHthcGk/LlRva2VuID8/IGFwaT8uQXV0aH1gO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlIFwiS2V5XCI6XG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdC51cmwgKz0gYD9rZXk9JHthcGk/LktleSA/PyBhcGk/LkF1dGh9YDtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwidjNcIjpcblx0XHRcdFx0XHRcdHJlcXVlc3QudXJsID0gYCR7QmFzZVVSTH0vdjMvcHJvamVjdHMvJHthcGk/LklEfWA7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0LmhlYWRlcnMgPSB7XG5cdFx0XHRcdFx0XHRcdFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7YXBpPy5Ub2tlbiA/PyBhcGk/LkF1dGh9YCxcblx0XHRcdFx0XHRcdFx0XCJ4LWdvb2ctdXNlci1wcm9qZWN0XCI6IGFwaT8uSUQsXG5cdFx0XHRcdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBcIkR1YWxTdWJzXCIsXG5cdFx0XHRcdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cmVxdWVzdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRcdFx0XHRcInNvdXJjZUxhbmd1YWdlQ29kZVwiOiBzb3VyY2UsXG5cdFx0XHRcdFx0XHRcdFwidGFyZ2V0TGFuZ3VhZ2VDb2RlXCI6IHRhcmdldCxcblx0XHRcdFx0XHRcdFx0XCJjb250ZW50c1wiOiAoQXJyYXkuaXNBcnJheSh0ZXh0KSkgPyB0ZXh0IDogW3RleHRdLFxuXHRcdFx0XHRcdFx0XHRcIm1pbWVUeXBlXCI6IFwidGV4dC9odG1sXCJcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiQmluZ1wiOlxuXHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vQW5pbWVub3Nla2FpL3RyYW5zbGF0ZS9ibG9iL21haW4vdHJhbnNsYXRlcHkvdHJhbnNsYXRvcnMvYmluZy5weVxuXHRcdFx0XHRzd2l0Y2ggKGFwaT8uVmVyc2lvbikge1xuXHRcdFx0XHRcdGNhc2UgXCJCaW5nXCI6XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdEJhc2VVUkwgPSBcImh0dHBzOi8vd3d3LmJpbmcuY29tL3R0cmFuc2xhdGV2Mz9JRz04MzlEMjdGODI3N0Y0QUEzQjBFREI4M0MyNTVEMEQ3MCZJSUQ9dHJhbnNsYXRvci41MDMzLjNcIjtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJCaW5nQ05cIjpcblx0XHRcdFx0XHRcdEJhc2VVUkwgPSBcImh0dHBzOi8vY24uYmluZy5jb20vdHRyYW5zbGF0ZXYzP0lHPTI1RkVFN0E3QzdDMTQ1MzNCQkZENjZBQzUxMjVDNDlFJklJRD10cmFuc2xhdG9yLjUwMjUuMVwiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdHJlcXVlc3QudXJsID0gYCR7QmFzZVVSTH1gO1xuXHRcdFx0XHRyZXF1ZXN0LmhlYWRlcnMgPSB7XG5cdFx0XHRcdFx0XCJBY2NlcHRcIjogXCIqLypcIixcblx0XHRcdFx0XHRcIlVzZXItQWdlbnRcIjogVUFQb29sW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIFVBUG9vbC5sZW5ndGgpXSwgLy8g6ZqP5py6VUFcblx0XHRcdFx0XHRcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuXHRcdFx0XHRcdFwiUmVmZXJcIjogXCJodHRwczovL3d3dy5iaW5nLmNvbS9cIixcblx0XHRcdFx0fTtcblx0XHRcdFx0cmVxdWVzdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRcdFwiZnJvbUxhbmdcIjogXCJhdXRvLWRldGVjdFwiLFxuXHRcdFx0XHRcdC8vXCJ0ZXh0XCI6ICclcycgJSB0cmFucyxcblx0XHRcdFx0XHRcInRleHRcIjogdGV4dCxcblx0XHRcdFx0XHQvL1wiZnJvbVwiOiBzb3VyY2UsXG5cdFx0XHRcdFx0XCJ0b1wiOiB0YXJnZXRcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIk1pY3Jvc29mdFwiOlxuXHRcdFx0Y2FzZSBcIkF6dXJlXCI6XG5cdFx0XHRcdC8vIGh0dHBzOi8vZG9jcy5taWNyb3NvZnQuY29tL3poLWNuL2F6dXJlL2NvZ25pdGl2ZS1zZXJ2aWNlcy90cmFuc2xhdG9yL1xuXHRcdFx0XHQvLyBodHRwczovL2RvY3MuYXp1cmUuY24vemgtY24vY29nbml0aXZlLXNlcnZpY2VzL3RyYW5zbGF0b3IvXG5cdFx0XHRcdHN3aXRjaCAoYXBpPy5WZXJzaW9uKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIkF6dXJlXCI6XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdEJhc2VVUkwgPSBcImh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnR0cmFuc2xhdG9yLmNvbVwiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIkF6dXJlQ05cIjpcblx0XHRcdFx0XHRcdEJhc2VVUkwgPSBcImh0dHBzOi8vYXBpLnRyYW5zbGF0b3IuYXp1cmUuY25cIjtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJBenVyZVVTXCI6XG5cdFx0XHRcdFx0XHRCYXNlVVJMID0gXCJodHRwczovL2FwaS5jb2duaXRpdmUubWljcm9zb2Z0dHJhbnNsYXRvci51c1wiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdHJlcXVlc3QudXJsID0gYCR7QmFzZVVSTH0vdHJhbnNsYXRlP2FwaS12ZXJzaW9uPTMuMCZ0ZXh0VHlwZT1odG1sJiR7KHNvdXJjZSkgPyBgZnJvbT0ke3NvdXJjZX1gIDogXCJcIn0mdG89JHt0YXJnZXR9YDtcblx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzID0ge1xuXHRcdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiLFxuXHRcdFx0XHRcdFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0LCAqLyo7IHE9MC4wMVwiLFxuXHRcdFx0XHRcdFwiQWNjZXB0LUxhbmd1YWdlXCI6IFwiemgtaGFuc1wiXG5cdFx0XHRcdFx0Ly9cIkF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke2FwaT8uQXV0aH1gLFxuXHRcdFx0XHRcdC8vXCJPY3AtQXBpbS1TdWJzY3JpcHRpb24tS2V5XCI6IGFwaT8uQXV0aCxcblx0XHRcdFx0XHQvL1wiT2NwLUFwaW0tU3Vic2NyaXB0aW9uLVJlZ2lvblwiOiBhcGk/LlJlZ2lvbiwgLy8gY2hpbmFub3J0aCwgY2hpbmFlYXN0MlxuXHRcdFx0XHRcdC8vXCJYLUNsaWVudFRyYWNlSWRcIjogdXVpZHY0KCkudG9TdHJpbmcoKVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRzd2l0Y2ggKGFwaT8uTW9kZSkge1xuXHRcdFx0XHRcdGNhc2UgXCJUb2tlblwiOlxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXF1ZXN0LmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHthcGk/LlRva2VuID8/IGFwaT8uQXV0aH1gO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIktleVwiOlxuXHRcdFx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzW1wiT2NwLUFwaW0tU3Vic2NyaXB0aW9uLUtleVwiXSA9IGFwaT8uS2V5ID8/IGFwaT8uQXV0aDtcblx0XHRcdFx0XHRcdHJlcXVlc3QuaGVhZGVyc1tcIk9jcC1BcGltLVN1YnNjcmlwdGlvbi1SZWdpb25cIl0gPSBhcGk/LlJlZ2lvbjtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR0ZXh0ID0gKEFycmF5LmlzQXJyYXkodGV4dCkpID8gdGV4dCA6IFt0ZXh0XTtcblx0XHRcdFx0dGV4dHMgPSBhd2FpdCBQcm9taXNlLmFsbCh0ZXh0Py5tYXAoYXN5bmMgaXRlbSA9PiB7IHJldHVybiB7IFwidGV4dFwiOiBpdGVtIH0gfSkpXG5cdFx0XHRcdHJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KHRleHRzKTtcblx0XHRcdFx0Lypcblx0XHRcdFx0cmVxdWVzdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoW3tcblx0XHRcdFx0XHRcInRleHRcIjogdGV4dFxuXHRcdFx0XHR9XSk7XG5cdFx0XHRcdCovXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIkRlZXBMXCI6IHtcblx0XHRcdFx0c3dpdGNoIChhcGk/LlZlcnNpb24pIHtcblx0XHRcdFx0XHRjYXNlIFwiRnJlZVwiOlxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRCYXNlVVJMID0gXCJodHRwczovL2FwaS1mcmVlLmRlZXBsLmNvbVwiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlByb1wiOlxuXHRcdFx0XHRcdFx0QmFzZVVSTCA9IFwiaHR0cHM6Ly9hcGkuZGVlcGwuY29tXCI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fTtcblx0XHRcdFx0cmVxdWVzdC51cmwgPSBgJHtCYXNlVVJMfS92Mi90cmFuc2xhdGVgO1xuXHRcdFx0XHRyZXF1ZXN0LmhlYWRlcnMgPSB7XG5cdFx0XHRcdFx0Ly9cIkFjY2VwdFwiOiBcIiovKlwiLFxuXHRcdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBcIkR1YWxTdWJzXCIsXG5cdFx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHRcdFx0XCJBdXRob3JpemF0aW9uXCI6IGBEZWVwTC1BdXRoLUtleSAke2FwaT8uVG9rZW4gPz8gYXBpPy5BdXRofWBcblx0XHRcdFx0fTtcblx0XHRcdFx0Ly9jb25zdCBCYXNlQm9keSA9IGBhdXRoX2tleT0ke2FwaT8uS2V5ID8/IGFwaT8uQXV0aH0mc291cmNlX2xhbmc9JHtzb3VyY2V9JnRhcmdldF9sYW5nPSR7dGFyZ2V0fSZ0YWdfaGFuZGxpbmc9aHRtbGA7XG5cdFx0XHRcdC8vdGV4dCA9IChBcnJheS5pc0FycmF5KHRleHQpKSA/IHRleHQgOiBbdGV4dF07XG5cdFx0XHRcdC8vdGV4dHMgPSBhd2FpdCBQcm9taXNlLmFsbCh0ZXh0Py5tYXAoYXN5bmMgaXRlbSA9PiBgJnRleHQ9JHtlbmNvZGVVUklDb21wb25lbnQoaXRlbSl9YCkpXG5cdFx0XHRcdC8vcmVxdWVzdC5ib2R5ID0gQmFzZUJvZHkgKyB0ZXh0cy5qb2luKFwiXCIpO1xuXHRcdFx0XHRsZXQgYm9keSA9IHtcblx0XHRcdFx0XHRcInRleHRcIjogKEFycmF5LmlzQXJyYXkodGV4dCkpID8gdGV4dCA6IFt0ZXh0XSxcblx0XHRcdFx0XHQvL1wic291cmNlX2xhbmdcIjogc291cmNlLFxuXHRcdFx0XHRcdFwidGFyZ2V0X2xhbmdcIjogdGFyZ2V0LFxuXHRcdFx0XHRcdFwidGFnX2hhbmRsaW5nXCI6IFwiaHRtbFwiXG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmIChzb3VyY2UpIGJvZHkuc291cmNlX2xhbmcgPSBzb3VyY2U7XG5cdFx0XHRcdHJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJEZWVwTFhcIjoge1xuXHRcdFx0XHRCYXNlVVJMID0gYXBpPy5FbmRwb2ludDtcblx0XHRcdFx0cmVxdWVzdC51cmwgPSBCYXNlVVJMO1xuXHRcdFx0XHRyZXF1ZXN0LmhlYWRlcnMgPSB7XG5cdFx0XHRcdFx0XCJBY2NlcHRcIjogXCIqLypcIixcblx0XHRcdFx0XHRcIlVzZXItQWdlbnRcIjogXCJEdWFsU3Vic1wiLFxuXHRcdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmIChhcGk/LlRva2VuKSByZXF1ZXN0LmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHthcGk/LlRva2VuID8/IGFwaT8uQXV0aH1gO1xuXHRcdFx0XHRyZXF1ZXN0LmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0XCJ0ZXh0XCI6IChBcnJheS5pc0FycmF5KHRleHQpKSA/IHRleHQuam9pbihcInx8XCIpIDogdGV4dCxcblx0XHRcdFx0XHRcInNvdXJjZV9sYW5nXCI6IHNvdXJjZSxcblx0XHRcdFx0XHRcInRhcmdldF9sYW5nXCI6IHRhcmdldCxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcIkJhaWR1RmFueWlcIjpcblx0XHRcdFx0Ly8gaHR0cHM6Ly9mYW55aS1hcGkuYmFpZHUuY29tL2RvYy8yNFxuXHRcdFx0XHRCYXNlVVJMID0gXCJodHRwczovL2ZhbnlpLWFwaS5iYWlkdS5jb21cIjtcblx0XHRcdFx0cmVxdWVzdC51cmwgPSBgJHtCYXNlVVJMfS9hcGkvdHJhbnMvdmlwL2xhbmd1YWdlYDtcblx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzID0ge1xuXHRcdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBcIkR1YWxTdWJzXCIsXG5cdFx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXF1ZXN0LmJvZHkgPSB7XG5cdFx0XHRcdFx0XCJxXCI6IHRleHQsXG5cdFx0XHRcdFx0XCJmcm9tXCI6IHNvdXJjZSxcblx0XHRcdFx0XHRcInRvXCI6IHRhcmdldCxcblx0XHRcdFx0XHRcImFwcGlkXCI6IGFwaT8uS2V5LFxuXHRcdFx0XHRcdFwic2FsdFwiOiB1dWlkdjQoKS50b1N0cmluZygpLFxuXHRcdFx0XHRcdFwic2lnblwiOiBcIlwiLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJZb3VkYW9BSVwiOlxuXHRcdFx0XHQvLyBodHRwczovL2FpLnlvdWRhby5jb20vRE9DU0lSTUEvaHRtbC/oh6rnhLbor63oqIDnv7vor5EvQVBJ5paH5qGjL+aWh+acrOe/u+ivkeacjeWKoS/mlofmnKznv7vor5HmnI3liqEtQVBJ5paH5qGjLmh0bWxcblx0XHRcdFx0QmFzZVVSTCA9IFwiaHR0cHM6Ly9vcGVuYXBpLnlvdWRhby5jb21cIjtcblx0XHRcdFx0cmVxdWVzdC51cmwgPSBgJHtCYXNlVVJMfS9hcGlgO1xuXHRcdFx0XHRyZXF1ZXN0LmhlYWRlcnMgPSB7XG5cdFx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiRHVhbFN1YnNcIixcblx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXF1ZXN0LmJvZHkgPSB7XG5cdFx0XHRcdFx0XCJxXCI6IHRleHQsXG5cdFx0XHRcdFx0XCJmcm9tXCI6IHNvdXJjZSxcblx0XHRcdFx0XHRcInRvXCI6IHRhcmdldCxcblx0XHRcdFx0XHRcImFwcEtleVwiOiBhcGk/LktleSxcblx0XHRcdFx0XHRcInNhbHRcIjogdXVpZHY0KCkudG9TdHJpbmcoKSxcblx0XHRcdFx0XHRcInNpZ25UeXBlXCI6IFwidjNcIixcblx0XHRcdFx0XHRcInNpZ25cIjogXCJcIixcblx0XHRcdFx0XHRcImN1cnRpbWVcIjogTWF0aC5mbG9vcigrbmV3IERhdGUoKSAvIDEwMDApXG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgR2V0IFRyYW5zbGF0ZSBSZXF1ZXN0YCwgYHJlcXVlc3Q6ICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdCl9YCwgXCJcIik7XG5cdFx0cmV0dXJuIHJlcXVlc3Rcblx0fTtcblx0Ly8gR2V0IFRyYW5zbGF0ZSBEYXRhXG5cdGFzeW5jIGZ1bmN0aW9uIEdldERhdGEodmVuZG9yLCByZXF1ZXN0KSB7XG5cdFx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIEdldCBUcmFuc2xhdGUgRGF0YWAsIFwiXCIpO1xuXHRcdGxldCB0ZXh0cyA9IFtdO1xuXHRcdGF3YWl0IEZldGNoKHJlcXVlc3QpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiBKU09OLnBhcnNlKHJlc3BvbnNlLmJvZHkpKVxuXHRcdFx0LnRoZW4oX2RhdGEgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKHZlbmRvcikge1xuXHRcdFx0XHRcdGNhc2UgXCJHb29nbGVcIjpcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoX2RhdGEpKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KF9kYXRhPy5bMF0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9kYXRhLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0X2RhdGFbMF0ucG9wKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR0ZXh0cyA9IF9kYXRhWzBdO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB0ZXh0cyA9IF9kYXRhPy5bMF0/Lm1hcChpdGVtID0+IGl0ZW0/LlswXSA/PyBg57+76K+R5aSx6LSlLCB2ZW5kb3I6ICR7dmVuZG9yfWApO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgdGV4dHMgPSBfZGF0YTtcblx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0aWYgKF9kYXRhLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KF9kYXRhPy5bMF0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRfZGF0YVswXS5wb3AoKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRleHRzID0gX2RhdGFbMF07XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHRleHRzID0gX2RhdGE7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfZGF0YT8uWzBdKSkgdGV4dHMgPSBfZGF0YT8uWzBdPy5tYXAoaXRlbSA9PiBpdGVtPy5bMF0gPz8gYOe/u+ivkeWksei0pSwgdmVuZG9yOiAke3ZlbmRvcn1gKTtcblx0XHRcdFx0XHRcdFx0ZWxzZSB0ZXh0cyA9IF9kYXRhO1xuXHRcdFx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChfZGF0YT8uc2VudGVuY2VzKSB0ZXh0cyA9IF9kYXRhPy5zZW50ZW5jZXM/Lm1hcChpdGVtID0+IGl0ZW0/LnRyYW5zID8/IGDnv7vor5HlpLHotKUsIHZlbmRvcjogJHt2ZW5kb3J9YCk7XG5cdFx0XHRcdFx0XHR0ZXh0cyA9IHRleHRzPy5qb2luKFwiXCIpPy5zcGxpdCgvXFxyLyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiR29vZ2xlQ2xvdWRcIjpcblx0XHRcdFx0XHRcdHRleHRzID0gX2RhdGE/LmRhdGE/LnRyYW5zbGF0aW9ucz8ubWFwKGl0ZW0gPT4gaXRlbT8udHJhbnNsYXRlZFRleHQgPz8gYOe/u+ivkeWksei0pSwgdmVuZG9yOiAke3ZlbmRvcn1gKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJCaW5nXCI6XG5cdFx0XHRcdFx0Y2FzZSBcIk1pY3Jvc29mdFwiOlxuXHRcdFx0XHRcdGNhc2UgXCJBenVyZVwiOlxuXHRcdFx0XHRcdFx0dGV4dHMgPSBfZGF0YT8ubWFwKGl0ZW0gPT4gaXRlbT8udHJhbnNsYXRpb25zPy5bMF0/LnRleHQgPz8gYOe/u+ivkeWksei0pSwgdmVuZG9yOiAke3ZlbmRvcn1gKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJEZWVwTFwiOlxuXHRcdFx0XHRcdFx0dGV4dHMgPSBfZGF0YT8udHJhbnNsYXRpb25zPy5tYXAoaXRlbSA9PiBpdGVtPy50ZXh0ID8/IGDnv7vor5HlpLHotKUsIHZlbmRvcjogJHt2ZW5kb3J9YCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiRGVlcExYXCI6XG5cdFx0XHRcdFx0XHR0ZXh0cyA9IF9kYXRhPy5kYXRhPy5zcGxpdChcInx8XCIpID8/IF9kYXRhPy5kYXRhO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIkJhaWR1RmFueWlcIjpcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJZb3VkYW9BSVwiOlxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IFByb21pc2UucmVqZWN0KGVycm9yKSk7XG5cdFx0Ly8kLmxvZyhg4pyFICR7JC5uYW1lfSwgR2V0IFRyYW5zbGF0ZSBEYXRhLCB0ZXh0czogJHtKU09OLnN0cmluZ2lmeSh0ZXh0cyl9YCwgXCJcIik7XG5cdFx0JC5sb2coYOKchSAkeyQubmFtZX0sIEdldCBUcmFuc2xhdGUgRGF0YWAsIFwiXCIpO1xuXHRcdHJldHVybiB0ZXh0c1xuXHR9O1xufTtcblxuLyoqXG4gKiBGZXRjaCBSdWxlZCBSZXFldXN0XG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vQmlsaVVuaXZlcnNlL0dsb2JhbC9ibG9iL21haW4vanMvQmlsaUJpbGkuR2xvYmFsLnJlcXVlc3QuanNcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0IC0gT3JpZ2luYWwgUmVxdWVzdCBDb250ZW50XG4gKiBAcmV0dXJuIHtQcm9taXNlPCo+fVxuICovXG5hc3luYyBmdW5jdGlvbiBGZXRjaChyZXF1ZXN0ID0ge30pIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIEZldGNoIFJ1bGVkIFJlcWV1c3RgLCBcIlwiKTtcblx0Ly9jb25zdCBGT1JNQVQgPSAocmVxdWVzdD8uaGVhZGVycz8uW1wiQ29udGVudC1UeXBlXCJdID8/IHJlcXVlc3Q/LmhlYWRlcnM/LltcImNvbnRlbnQtdHlwZVwiXSk/LnNwbGl0KFwiO1wiKT8uWzBdO1xuXHQkLmxvZyhg4pqgICR7JC5uYW1lfSwgRmV0Y2ggUnVsZWQgUmVxZXVzdGAsIGBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuXHRpZiAoJC5pc1F1YW5YKCkpIHtcblx0XHRzd2l0Y2ggKEZPUk1BVCkge1xuXHRcdFx0Y2FzZSB1bmRlZmluZWQ6IC8vIOinhuS4uuaXoGJvZHlcblx0XHRcdFx0Ly8g6L+U5Zue5pmu6YCa5pWw5o2uXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Ly8g6L+U5Zue5pmu6YCa5pWw5o2uXG5cdFx0XHRcdGRlbGV0ZSByZXF1ZXN0LmJvZHlCeXRlcztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vcHJvdG9idWZcIjpcblx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXByb3RvYnVmXCI6XG5cdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS5wcm90b2J1ZlwiOlxuXHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2dycGNcIjpcblx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjK3Byb3RvXCI6XG5cdFx0XHQvL2Nhc2UgXCJhcHBsZWNhdGlvbi9vY3RldC1zdHJlYW1cIjpcblx0XHRcdFx0Ly8g6L+U5Zue5LqM6L+b5Yi25pWw5o2uXG5cdFx0XHRcdGRlbGV0ZSByZXF1ZXN0LmJvZHk7XG5cdFx0XHRcdGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcocmVxdWVzdC5ib2R5Qnl0ZXMpKSByZXF1ZXN0LmJvZHlCeXRlcyA9IHJlcXVlc3QuYm9keUJ5dGVzLmJ1ZmZlci5zbGljZShyZXF1ZXN0LmJvZHlCeXRlcy5ieXRlT2Zmc2V0LCByZXF1ZXN0LmJvZHlCeXRlcy5ieXRlTGVuZ3RoICsgcmVxdWVzdC5ib2R5Qnl0ZXMuYnl0ZU9mZnNldCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdH07XG5cdGxldCByZXNwb25zZSA9IChyZXF1ZXN0Py5ib2R5ID8/IHJlcXVlc3Q/LmJvZHlCeXRlcylcblx0XHQ/IGF3YWl0ICQuaHR0cC5wb3N0KHJlcXVlc3QpXG5cdFx0OiBhd2FpdCAkLmh0dHAuZ2V0KHJlcXVlc3QpO1xuXHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgRmV0Y2ggUnVsZWQgUmVxZXVzdGAsIFwiXCIpO1xuXHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIEZldGNoIFJ1bGVkIFJlcWV1c3RgLCBgUmVzcG9uc2U6JHtKU09OLnN0cmluZ2lmeShyZXNwb25zZSl9YCwgXCJcIik7XG5cdHJldHVybiByZXNwb25zZTtcbn07XG5cbi8qKlxuICogY29tYmluZSB0d28gdGV4dFxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IG9yaWdpblRleHQgLSBvcmlnaW5hbCB0ZXh0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNUZXh0IC0gdHJhbnNsYXRlIHRleHRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gU2hvd09ubHkgLSBvbmx5IHNob3cgdHJhbnNsYXRlIHRleHRcbiAqIEBwYXJhbSB7U3RyaW5nfSBwb3NpdGlvbiAtIHBvc2l0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZUJyZWFrIC0gbGluZSBicmVha1xuICogQHJldHVybiB7U3RyaW5nfSBjb21iaW5lZCB0ZXh0XG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVUZXh0KG9yaWdpblRleHQsIHRyYW5zVGV4dCwgU2hvd09ubHkgPSBmYWxzZSwgcG9zaXRpb24gPSBcIkZvcndhcmRcIiwgbGluZUJyZWFrID0gXCJcXG5cIikge1xuXHRsZXQgdGV4dCA9IFwiXCI7XG5cdHN3aXRjaCAoU2hvd09ubHkpIHtcblx0XHRjYXNlIHRydWU6XG5cdFx0XHR0ZXh0ID0gdHJhbnNUZXh0O1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBmYWxzZTpcblx0XHRkZWZhdWx0OlxuXHRcdFx0c3dpdGNoIChwb3NpdGlvbikge1xuXHRcdFx0XHRjYXNlIFwiRm9yd2FyZFwiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRleHQgPSBgJHtvcmlnaW5UZXh0fSR7bGluZUJyZWFrfSR7dHJhbnNUZXh0fWA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJSZXZlcnNlXCI6XG5cdFx0XHRcdFx0dGV4dCA9IGAke3RyYW5zVGV4dH0ke2xpbmVCcmVha30ke29yaWdpblRleHR9YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0fVxuXHRyZXR1cm4gdGV4dDtcbn07XG5cbi8qKiBcbiAqIENodW5rIEFycmF5XG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgLSBzb3VyY2VcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggLSBudW1iZXJcbiAqIEByZXR1cm4ge0FycmF5PCo+fSB0YXJnZXRcbiAqL1xuZnVuY3Rpb24gY2h1bmsoc291cmNlLCBsZW5ndGgpIHtcblx0JC5sb2coYOKaoCAkeyQubmFtZX0sIENodW5rIEFycmF5YCwgXCJcIik7XG4gICAgdmFyIGluZGV4ID0gMCwgdGFyZ2V0ID0gW107XG4gICAgd2hpbGUoaW5kZXggPCBzb3VyY2UubGVuZ3RoKSB0YXJnZXQucHVzaChzb3VyY2Uuc2xpY2UoaW5kZXgsIGluZGV4ICs9IGxlbmd0aCkpO1xuXHQvLyQubG9nKGDwn46JICR7JC5uYW1lfSwgQ2h1bmsgQXJyYXlgLCBgdGFyZ2V0OiAke0pTT04uc3RyaW5naWZ5KHRhcmdldCl9YCwgXCJcIik7XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG4vKipcbiAqIFJldHJpZXMgdGhlIGdpdmVuIGZ1bmN0aW9uIHVudGlsIGl0IHN1Y2NlZWRzIGdpdmVuIGEgbnVtYmVyIG9mIHJldHJpZXMgYW5kIGFuIGludGVydmFsIGJldHdlZW4gdGhlbS4gVGhleSBhcmUgc2V0XG4gKiBieSBkZWZhdWx0IHRvIHJldHJ5IDUgdGltZXMgd2l0aCAxc2VjIGluIGJldHdlZW4uIFRoZXJlJ3MgYWxzbyBhIGZsYWcgdG8gbWFrZSB0aGUgY29vbGRvd24gdGltZSBleHBvbmVudGlhbFxuICogQGxpbmsgaHR0cHM6Ly9naXRsYWIuY29tLy0vc25pcHBldHMvMTc3NTc4MVxuICogQGF1dGhvciBEYW5pZWwgScOxaWdvIDxkYW5pZWxpbmlnb2Jhbm9zQGdtYWlsLmNvbT5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gUmV0dXJucyBhIHByb21pc2VcbiAqIEBwYXJhbSB7TnVtYmVyfSByZXRyaWVzTGVmdCAtIE51bWJlciBvZiByZXRyaWVzLiBJZiAtMSB3aWxsIGtlZXAgcmV0cnlpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCAtIE1pbGxpcyBiZXR3ZWVuIHJldHJpZXMuIElmIGV4cG9uZW50aWFsIHNldCB0byB0cnVlIHdpbGwgYmUgZG91YmxlZCBlYWNoIHJldHJ5XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGV4cG9uZW50aWFsIC0gRmxhZyBmb3IgZXhwb25lbnRpYWwgYmFjay1vZmYgbW9kZVxuICogQHJldHVybiB7UHJvbWlzZTwqPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gcmV0cnkoZm4sIHJldHJpZXNMZWZ0ID0gNSwgaW50ZXJ2YWwgPSAxMDAwLCBleHBvbmVudGlhbCA9IGZhbHNlKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCByZXRyeSwg5Ymp5L2Z6YeN6K+V5qyh5pWwOiR7cmV0cmllc0xlZnR9YCwgYOaXtumXtOmXtOmalDoke2ludGVydmFsfW1zYCk7XG5cdHRyeSB7XG5cdFx0Y29uc3QgdmFsID0gYXdhaXQgZm4oKTtcblx0XHRyZXR1cm4gdmFsO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChyZXRyaWVzTGVmdCkge1xuXHRcdFx0YXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIGludGVydmFsKSk7XG5cdFx0XHRyZXR1cm4gcmV0cnkoZm4sIHJldHJpZXNMZWZ0IC0gMSwgZXhwb25lbnRpYWwgPyBpbnRlcnZhbCAqIDIgOiBpbnRlcnZhbCwgZXhwb25lbnRpYWwpO1xuXHRcdH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoYOKdjCAkeyQubmFtZX0sIHJldHJ5LCDmnIDlpKfph43or5XmrKHmlbBgKTtcblx0fVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOViB7XG5cdGNvbnN0cnVjdG9yKG5hbWUsIG9wdHMpIHtcblx0XHR0aGlzLm5hbWUgPSBuYW1lXG5cdFx0dGhpcy5odHRwID0gbmV3IEh0dHAodGhpcylcblx0XHR0aGlzLmRhdGEgPSBudWxsXG5cdFx0dGhpcy5kYXRhRmlsZSA9ICdib3guZGF0J1xuXHRcdHRoaXMubG9ncyA9IFtdXG5cdFx0dGhpcy5pc011dGUgPSBmYWxzZVxuXHRcdHRoaXMuaXNOZWVkUmV3cml0ZSA9IGZhbHNlXG5cdFx0dGhpcy5sb2dTZXBhcmF0b3IgPSAnXFxuJ1xuXHRcdHRoaXMuZW5jb2RpbmcgPSAndXRmLTgnXG5cdFx0dGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgb3B0cylcblx0XHR0aGlzLmxvZygnJywgYPCfj4EgJHt0aGlzLm5hbWV9LCBFTlYgdjEuMS4wLCDlvIDlp4shYClcblx0fVxuXG5cdHBsYXRmb3JtKCkge1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRlbnZpcm9ubWVudCAmJiAkZW52aXJvbm1lbnRbJ3N1cmdlLXZlcnNpb24nXSlcblx0XHRcdHJldHVybiAnU3VyZ2UnXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJGVudmlyb25tZW50ICYmICRlbnZpcm9ubWVudFsnc3Rhc2gtdmVyc2lvbiddKVxuXHRcdFx0cmV0dXJuICdTdGFzaCdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUgJiYgISFtb2R1bGUuZXhwb3J0cykgcmV0dXJuICdOb2RlLmpzJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICR0YXNrKSByZXR1cm4gJ1F1YW50dW11bHQgWCdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAkbG9vbikgcmV0dXJuICdMb29uJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRyb2NrZXQpIHJldHVybiAnU2hhZG93cm9ja2V0J1xuXHR9XG5cblx0aXNOb2RlKCkge1xuXHRcdHJldHVybiAnTm9kZS5qcycgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNRdWFuWCgpIHtcblx0XHRyZXR1cm4gJ1F1YW50dW11bHQgWCcgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNTdXJnZSgpIHtcblx0XHRyZXR1cm4gJ1N1cmdlJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc0xvb24oKSB7XG5cdFx0cmV0dXJuICdMb29uJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1NoYWRvd3JvY2tldCgpIHtcblx0XHRyZXR1cm4gJ1NoYWRvd3JvY2tldCcgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNTdGFzaCgpIHtcblx0XHRyZXR1cm4gJ1N0YXNoJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHR0b09iaihzdHIsIGRlZmF1bHRWYWx1ZSA9IG51bGwpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2Uoc3RyKVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZVxuXHRcdH1cblx0fVxuXG5cdHRvU3RyKG9iaiwgZGVmYXVsdFZhbHVlID0gbnVsbCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZVxuXHRcdH1cblx0fVxuXG5cdGdldGpzb24oa2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRsZXQganNvbiA9IGRlZmF1bHRWYWx1ZVxuXHRcdGNvbnN0IHZhbCA9IHRoaXMuZ2V0ZGF0YShrZXkpXG5cdFx0aWYgKHZhbCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UodGhpcy5nZXRkYXRhKGtleSkpXG5cdFx0XHR9IGNhdGNoIHsgfVxuXHRcdH1cblx0XHRyZXR1cm4ganNvblxuXHR9XG5cblx0c2V0anNvbih2YWwsIGtleSkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRkYXRhKEpTT04uc3RyaW5naWZ5KHZhbCksIGtleSlcblx0XHR9IGNhdGNoIHtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0fVxuXG5cdGdldFNjcmlwdCh1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdHRoaXMuZ2V0KHsgdXJsIH0sIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHJlc29sdmUoYm9keSkpXG5cdFx0fSlcblx0fVxuXG5cdHJ1blNjcmlwdChzY3JpcHQsIHJ1bk9wdHMpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGxldCBodHRwYXBpID0gdGhpcy5nZXRkYXRhKCdAY2hhdnlfYm94anNfdXNlckNmZ3MuaHR0cGFwaScpXG5cdFx0XHRodHRwYXBpID0gaHR0cGFwaSA/IGh0dHBhcGkucmVwbGFjZSgvXFxuL2csICcnKS50cmltKCkgOiBodHRwYXBpXG5cdFx0XHRsZXQgaHR0cGFwaV90aW1lb3V0ID0gdGhpcy5nZXRkYXRhKFxuXHRcdFx0XHQnQGNoYXZ5X2JveGpzX3VzZXJDZmdzLmh0dHBhcGlfdGltZW91dCdcblx0XHRcdClcblx0XHRcdGh0dHBhcGlfdGltZW91dCA9IGh0dHBhcGlfdGltZW91dCA/IGh0dHBhcGlfdGltZW91dCAqIDEgOiAyMFxuXHRcdFx0aHR0cGFwaV90aW1lb3V0ID1cblx0XHRcdFx0cnVuT3B0cyAmJiBydW5PcHRzLnRpbWVvdXQgPyBydW5PcHRzLnRpbWVvdXQgOiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdGNvbnN0IFtrZXksIGFkZHJdID0gaHR0cGFwaS5zcGxpdCgnQCcpXG5cdFx0XHRjb25zdCBvcHRzID0ge1xuXHRcdFx0XHR1cmw6IGBodHRwOi8vJHthZGRyfS92MS9zY3JpcHRpbmcvZXZhbHVhdGVgLFxuXHRcdFx0XHRib2R5OiB7XG5cdFx0XHRcdFx0c2NyaXB0X3RleHQ6IHNjcmlwdCxcblx0XHRcdFx0XHRtb2NrX3R5cGU6ICdjcm9uJyxcblx0XHRcdFx0XHR0aW1lb3V0OiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdFx0fSxcblx0XHRcdFx0aGVhZGVyczogeyAnWC1LZXknOiBrZXksICdBY2NlcHQnOiAnKi8qJyB9LFxuXHRcdFx0XHR0aW1lb3V0OiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdH1cblx0XHRcdHRoaXMucG9zdChvcHRzLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiByZXNvbHZlKGJvZHkpKVxuXHRcdH0pLmNhdGNoKChlKSA9PiB0aGlzLmxvZ0VycihlKSlcblx0fVxuXG5cdGxvYWRkYXRhKCkge1xuXHRcdGlmICh0aGlzLmlzTm9kZSgpKSB7XG5cdFx0XHR0aGlzLmZzID0gdGhpcy5mcyA/IHRoaXMuZnMgOiByZXF1aXJlKCdmcycpXG5cdFx0XHR0aGlzLnBhdGggPSB0aGlzLnBhdGggPyB0aGlzLnBhdGggOiByZXF1aXJlKCdwYXRoJylcblx0XHRcdGNvbnN0IGN1ckRpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKHRoaXMuZGF0YUZpbGUpXG5cdFx0XHRjb25zdCByb290RGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUoXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdHRoaXMuZGF0YUZpbGVcblx0XHRcdClcblx0XHRcdGNvbnN0IGlzQ3VyRGlyRGF0YUZpbGUgPSB0aGlzLmZzLmV4aXN0c1N5bmMoY3VyRGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QgaXNSb290RGlyRGF0YUZpbGUgPVxuXHRcdFx0XHQhaXNDdXJEaXJEYXRhRmlsZSAmJiB0aGlzLmZzLmV4aXN0c1N5bmMocm9vdERpckRhdGFGaWxlUGF0aClcblx0XHRcdGlmIChpc0N1ckRpckRhdGFGaWxlIHx8IGlzUm9vdERpckRhdGFGaWxlKSB7XG5cdFx0XHRcdGNvbnN0IGRhdFBhdGggPSBpc0N1ckRpckRhdGFGaWxlXG5cdFx0XHRcdFx0PyBjdXJEaXJEYXRhRmlsZVBhdGhcblx0XHRcdFx0XHQ6IHJvb3REaXJEYXRhRmlsZVBhdGhcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmZzLnJlYWRGaWxlU3luYyhkYXRQYXRoKSlcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHJldHVybiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgcmV0dXJuIHt9XG5cdFx0fSBlbHNlIHJldHVybiB7fVxuXHR9XG5cblx0d3JpdGVkYXRhKCkge1xuXHRcdGlmICh0aGlzLmlzTm9kZSgpKSB7XG5cdFx0XHR0aGlzLmZzID0gdGhpcy5mcyA/IHRoaXMuZnMgOiByZXF1aXJlKCdmcycpXG5cdFx0XHR0aGlzLnBhdGggPSB0aGlzLnBhdGggPyB0aGlzLnBhdGggOiByZXF1aXJlKCdwYXRoJylcblx0XHRcdGNvbnN0IGN1ckRpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKHRoaXMuZGF0YUZpbGUpXG5cdFx0XHRjb25zdCByb290RGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUoXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdHRoaXMuZGF0YUZpbGVcblx0XHRcdClcblx0XHRcdGNvbnN0IGlzQ3VyRGlyRGF0YUZpbGUgPSB0aGlzLmZzLmV4aXN0c1N5bmMoY3VyRGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QgaXNSb290RGlyRGF0YUZpbGUgPVxuXHRcdFx0XHQhaXNDdXJEaXJEYXRhRmlsZSAmJiB0aGlzLmZzLmV4aXN0c1N5bmMocm9vdERpckRhdGFGaWxlUGF0aClcblx0XHRcdGNvbnN0IGpzb25kYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuXHRcdFx0aWYgKGlzQ3VyRGlyRGF0YUZpbGUpIHtcblx0XHRcdFx0dGhpcy5mcy53cml0ZUZpbGVTeW5jKGN1ckRpckRhdGFGaWxlUGF0aCwganNvbmRhdGEpXG5cdFx0XHR9IGVsc2UgaWYgKGlzUm9vdERpckRhdGFGaWxlKSB7XG5cdFx0XHRcdHRoaXMuZnMud3JpdGVGaWxlU3luYyhyb290RGlyRGF0YUZpbGVQYXRoLCBqc29uZGF0YSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZnMud3JpdGVGaWxlU3luYyhjdXJEaXJEYXRhRmlsZVBhdGgsIGpzb25kYXRhKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvZGFzaF9nZXQoc291cmNlLCBwYXRoLCBkZWZhdWx0VmFsdWUgPSB1bmRlZmluZWQpIHtcblx0XHRjb25zdCBwYXRocyA9IHBhdGgucmVwbGFjZSgvXFxbKFxcZCspXFxdL2csICcuJDEnKS5zcGxpdCgnLicpXG5cdFx0bGV0IHJlc3VsdCA9IHNvdXJjZVxuXHRcdGZvciAoY29uc3QgcCBvZiBwYXRocykge1xuXHRcdFx0cmVzdWx0ID0gT2JqZWN0KHJlc3VsdClbcF1cblx0XHRcdGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXG5cdGxvZGFzaF9zZXQob2JqLCBwYXRoLCB2YWx1ZSkge1xuXHRcdGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSByZXR1cm4gb2JqXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKSBwYXRoID0gcGF0aC50b1N0cmluZygpLm1hdGNoKC9bXi5bXFxdXSsvZykgfHwgW11cblx0XHRwYXRoXG5cdFx0XHQuc2xpY2UoMCwgLTEpXG5cdFx0XHQucmVkdWNlKFxuXHRcdFx0XHQoYSwgYywgaSkgPT5cblx0XHRcdFx0XHRPYmplY3QoYVtjXSkgPT09IGFbY11cblx0XHRcdFx0XHRcdD8gYVtjXVxuXHRcdFx0XHRcdFx0OiAoYVtjXSA9IE1hdGguYWJzKHBhdGhbaSArIDFdKSA+PiAwID09PSArcGF0aFtpICsgMV0gPyBbXSA6IHt9KSxcblx0XHRcdFx0b2JqXG5cdFx0XHQpW3BhdGhbcGF0aC5sZW5ndGggLSAxXV0gPSB2YWx1ZVxuXHRcdHJldHVybiBvYmpcblx0fVxuXG5cdGdldGRhdGEoa2V5KSB7XG5cdFx0bGV0IHZhbCA9IHRoaXMuZ2V0dmFsKGtleSlcblx0XHQvLyDlpoLmnpzku6UgQFxuXHRcdGlmICgvXkAvLnRlc3Qoa2V5KSkge1xuXHRcdFx0Y29uc3QgWywgb2Jqa2V5LCBwYXRoc10gPSAvXkAoLio/KVxcLiguKj8pJC8uZXhlYyhrZXkpXG5cdFx0XHRjb25zdCBvYmp2YWwgPSBvYmprZXkgPyB0aGlzLmdldHZhbChvYmprZXkpIDogJydcblx0XHRcdGlmIChvYmp2YWwpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRjb25zdCBvYmplZHZhbCA9IEpTT04ucGFyc2Uob2JqdmFsKVxuXHRcdFx0XHRcdHZhbCA9IG9iamVkdmFsID8gdGhpcy5sb2Rhc2hfZ2V0KG9iamVkdmFsLCBwYXRocywgJycpIDogdmFsXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHR2YWwgPSAnJ1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB2YWxcblx0fVxuXG5cdHNldGRhdGEodmFsLCBrZXkpIHtcblx0XHRsZXQgaXNzdWMgPSBmYWxzZVxuXHRcdGlmICgvXkAvLnRlc3Qoa2V5KSkge1xuXHRcdFx0Y29uc3QgWywgb2Jqa2V5LCBwYXRoc10gPSAvXkAoLio/KVxcLiguKj8pJC8uZXhlYyhrZXkpXG5cdFx0XHRjb25zdCBvYmpkYXQgPSB0aGlzLmdldHZhbChvYmprZXkpXG5cdFx0XHRjb25zdCBvYmp2YWwgPSBvYmprZXlcblx0XHRcdFx0PyBvYmpkYXQgPT09ICdudWxsJ1xuXHRcdFx0XHRcdD8gbnVsbFxuXHRcdFx0XHRcdDogb2JqZGF0IHx8ICd7fSdcblx0XHRcdFx0OiAne30nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBvYmplZHZhbCA9IEpTT04ucGFyc2Uob2JqdmFsKVxuXHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQob2JqZWR2YWwsIHBhdGhzLCB2YWwpXG5cdFx0XHRcdGlzc3VjID0gdGhpcy5zZXR2YWwoSlNPTi5zdHJpbmdpZnkob2JqZWR2YWwpLCBvYmprZXkpXG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnN0IG9iamVkdmFsID0ge31cblx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KG9iamVkdmFsLCBwYXRocywgdmFsKVxuXHRcdFx0XHRpc3N1YyA9IHRoaXMuc2V0dmFsKEpTT04uc3RyaW5naWZ5KG9iamVkdmFsKSwgb2Jqa2V5KVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpc3N1YyA9IHRoaXMuc2V0dmFsKHZhbCwga2V5KVxuXHRcdH1cblx0XHRyZXR1cm4gaXNzdWNcblx0fVxuXG5cdGdldHZhbChrZXkpIHtcblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRyZXR1cm4gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKGtleSlcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdHJldHVybiAkcHJlZnMudmFsdWVGb3JLZXkoa2V5KVxuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMubG9hZGRhdGEoKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kYXRhW2tleV1cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YVtrZXldKSB8fCBudWxsXG5cdFx0fVxuXHR9XG5cblx0c2V0dmFsKHZhbCwga2V5KSB7XG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0cmV0dXJuICRwZXJzaXN0ZW50U3RvcmUud3JpdGUodmFsLCBrZXkpXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRyZXR1cm4gJHByZWZzLnNldFZhbHVlRm9yS2V5KHZhbCwga2V5KVxuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMubG9hZGRhdGEoKVxuXHRcdFx0XHR0aGlzLmRhdGFba2V5XSA9IHZhbFxuXHRcdFx0XHR0aGlzLndyaXRlZGF0YSgpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGFba2V5XSkgfHwgbnVsbFxuXHRcdH1cblx0fVxuXG5cdGluaXRHb3RFbnYob3B0cykge1xuXHRcdHRoaXMuZ290ID0gdGhpcy5nb3QgPyB0aGlzLmdvdCA6IHJlcXVpcmUoJ2dvdCcpXG5cdFx0dGhpcy5ja3RvdWdoID0gdGhpcy5ja3RvdWdoID8gdGhpcy5ja3RvdWdoIDogcmVxdWlyZSgndG91Z2gtY29va2llJylcblx0XHR0aGlzLmNramFyID0gdGhpcy5ja2phciA/IHRoaXMuY2tqYXIgOiBuZXcgdGhpcy5ja3RvdWdoLkNvb2tpZUphcigpXG5cdFx0aWYgKG9wdHMpIHtcblx0XHRcdG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyA/IG9wdHMuaGVhZGVycyA6IHt9XG5cdFx0XHRpZiAodW5kZWZpbmVkID09PSBvcHRzLmhlYWRlcnMuQ29va2llICYmIHVuZGVmaW5lZCA9PT0gb3B0cy5jb29raWVKYXIpIHtcblx0XHRcdFx0b3B0cy5jb29raWVKYXIgPSB0aGlzLmNramFyXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KHJlcXVlc3QsIGNhbGxiYWNrID0gKCkgPT4geyB9KSB7XG5cdFx0ZGVsZXRlIHJlcXVlc3Q/LmhlYWRlcnM/LlsnQ29udGVudC1MZW5ndGgnXVxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ2NvbnRlbnQtbGVuZ3RoJ11cblxuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZiAodGhpcy5pc1N1cmdlKCkgJiYgdGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdoZWFkZXJzLlgtU3VyZ2UtU2tpcC1TY3JpcHRpbmcnLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0XHQkaHR0cENsaWVudC5nZXQocmVxdWVzdCwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXHRcdFx0XHRcdGlmICghZXJyb3IgJiYgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlLmJvZHkgPSBib2R5XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UsIGJvZHkpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRpZiAodGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdvcHRzLmhpbnRzJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JHRhc2suZmV0Y2gocmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCBib2R5LCBib2R5Qnl0ZXMgfSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZXJyb3IpID0+IGNhbGxiYWNrKChlcnJvciAmJiBlcnJvci5lcnJvcikgfHwgJ1VuZGVmaW5lZEVycm9yJylcblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdGxldCBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKVxuXHRcdFx0XHR0aGlzLmluaXRHb3RFbnYocmVxdWVzdClcblx0XHRcdFx0dGhpcy5nb3QocmVxdWVzdClcblx0XHRcdFx0XHQub24oJ3JlZGlyZWN0JywgKHJlc3BvbnNlLCBuZXh0T3B0cykgPT4ge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNrID0gcmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddXG5cdFx0XHRcdFx0XHRcdFx0XHQubWFwKHRoaXMuY2t0b3VnaC5Db29raWUucGFyc2UpXG5cdFx0XHRcdFx0XHRcdFx0XHQudG9TdHJpbmcoKVxuXHRcdFx0XHRcdFx0XHRcdGlmIChjaykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5ja2phci5zZXRDb29raWVTeW5jKGNrLCBudWxsKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRuZXh0T3B0cy5jb29raWVKYXIgPSB0aGlzLmNramFyXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5sb2dFcnIoZSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIHRoaXMuY2tqYXIuc2V0Q29va2llU3luYyhyZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ10ubWFwKENvb2tpZS5wYXJzZSkudG9TdHJpbmcoKSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKFxuXHRcdFx0XHRcdFx0KHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlOiBzdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRcdHJhd0JvZHlcblx0XHRcdFx0XHRcdFx0fSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGJvZHkgPSBpY29udi5kZWNvZGUocmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0XHR7IHN0YXR1cywgc3RhdHVzQ29kZSwgaGVhZGVycywgcmF3Qm9keSwgYm9keSB9LFxuXHRcdFx0XHRcdFx0XHRcdGJvZHlcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdChlcnIpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgeyBtZXNzYWdlOiBlcnJvciwgcmVzcG9uc2U6IHJlc3BvbnNlIH0gPSBlcnJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UsXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgJiYgaWNvbnYuZGVjb2RlKHJlc3BvbnNlLnJhd0JvZHksIHRoaXMuZW5jb2RpbmcpXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0cG9zdChyZXF1ZXN0LCBjYWxsYmFjayA9ICgpID0+IHsgfSkge1xuXHRcdGNvbnN0IG1ldGhvZCA9IHJlcXVlc3QubWV0aG9kXG5cdFx0XHQ/IHJlcXVlc3QubWV0aG9kLnRvTG9jYWxlTG93ZXJDYXNlKClcblx0XHRcdDogJ3Bvc3QnXG5cblx0XHQvLyDlpoLmnpzmjIflrprkuobor7fmsYLkvZMsIOS9huayoeaMh+WumiBgQ29udGVudC1UeXBlYOOAgWBjb250ZW50LXR5cGVgLCDliJnoh6rliqjnlJ/miJDjgIJcblx0XHRpZiAoXG5cdFx0XHRyZXF1ZXN0LmJvZHkgJiZcblx0XHRcdHJlcXVlc3QuaGVhZGVycyAmJlxuXHRcdFx0IXJlcXVlc3QuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gJiZcblx0XHRcdCFyZXF1ZXN0LmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddXG5cdFx0KSB7XG5cdFx0XHQvLyBIVFRQLzHjgIFIVFRQLzIg6YO95pSv5oyB5bCP5YaZIGhlYWRlcnNcblx0XHRcdHJlcXVlc3QuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuXHRcdH1cblx0XHQvLyDkuLrpgb/lhY3mjIflrprplJnor68gYGNvbnRlbnQtbGVuZ3RoYCDov5nph4zliKDpmaTor6XlsZ7mgKfvvIznlLHlt6Xlhbfnq68gKEh0dHBDbGllbnQpIOi0n+i0o+mHjeaWsOiuoeeul+W5tui1i+WAvFxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ0NvbnRlbnQtTGVuZ3RoJ11cblx0XHRkZWxldGUgcmVxdWVzdD8uaGVhZGVycz8uWydjb250ZW50LWxlbmd0aCddXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmICh0aGlzLmlzU3VyZ2UoKSAmJiB0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ2hlYWRlcnMuWC1TdXJnZS1Ta2lwLVNjcmlwdGluZycsIGZhbHNlKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCRodHRwQ2xpZW50W21ldGhvZF0ocmVxdWVzdCwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXHRcdFx0XHRcdGlmICghZXJyb3IgJiYgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlLmJvZHkgPSBib2R5XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UsIGJvZHkpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRyZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZFxuXHRcdFx0XHRpZiAodGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdvcHRzLmhpbnRzJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JHRhc2suZmV0Y2gocmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCBib2R5LCBib2R5Qnl0ZXMgfSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZXJyb3IpID0+IGNhbGxiYWNrKChlcnJvciAmJiBlcnJvci5lcnJvcikgfHwgJ1VuZGVmaW5lZEVycm9yJylcblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdGxldCBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKVxuXHRcdFx0XHR0aGlzLmluaXRHb3RFbnYocmVxdWVzdClcblx0XHRcdFx0Y29uc3QgeyB1cmwsIC4uLl9yZXF1ZXN0IH0gPSByZXF1ZXN0XG5cdFx0XHRcdHRoaXMuZ290W21ldGhvZF0odXJsLCBfcmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgc3RhdHVzQ29kZTogc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5IH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y29uc3QgYm9keSA9IGljb252LmRlY29kZShyYXdCb2R5LCB0aGlzLmVuY29kaW5nKVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5LCBib2R5IH0sXG5cdFx0XHRcdFx0XHRcdGJvZHlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlcnIpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgbWVzc2FnZTogZXJyb3IsIHJlc3BvbnNlOiByZXNwb25zZSB9ID0gZXJyXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlLFxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSAmJiBpY29udi5kZWNvZGUocmVzcG9uc2UucmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdClcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqIOekuuS+izokLnRpbWUoJ3l5eXktTU0tZGQgcXEgSEg6bW06c3MuUycpXG5cdCAqICAgIDokLnRpbWUoJ3l5eXlNTWRkSEhtbXNzUycpXG5cdCAqICAgIHk65bm0IE065pyIIGQ65pelIHE65a2jIEg65pe2IG065YiGIHM656eSIFM65q+r56eSXG5cdCAqICAgIOWFtuS4rXnlj6/pgIkwLTTkvY3ljaDkvY3nrKbjgIFT5Y+v6YCJMC0x5L2N5Y2g5L2N56ym77yM5YW25L2Z5Y+v6YCJMC0y5L2N5Y2g5L2N56ymXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQg5qC85byP5YyW5Y+C5pWwXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB0cyDlj6/pgIk6IOagueaNruaMh+WumuaXtumXtOaIs+i/lOWbnuagvOW8j+WMluaXpeacn1xuXHQgKlxuXHQgKi9cblx0dGltZShmb3JtYXQsIHRzID0gbnVsbCkge1xuXHRcdGNvbnN0IGRhdGUgPSB0cyA/IG5ldyBEYXRlKHRzKSA6IG5ldyBEYXRlKClcblx0XHRsZXQgbyA9IHtcblx0XHRcdCdNKyc6IGRhdGUuZ2V0TW9udGgoKSArIDEsXG5cdFx0XHQnZCsnOiBkYXRlLmdldERhdGUoKSxcblx0XHRcdCdIKyc6IGRhdGUuZ2V0SG91cnMoKSxcblx0XHRcdCdtKyc6IGRhdGUuZ2V0TWludXRlcygpLFxuXHRcdFx0J3MrJzogZGF0ZS5nZXRTZWNvbmRzKCksXG5cdFx0XHQncSsnOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxuXHRcdFx0J1MnOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG5cdFx0fVxuXHRcdGlmICgvKHkrKS8udGVzdChmb3JtYXQpKVxuXHRcdFx0Zm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXG5cdFx0XHRcdFJlZ0V4cC4kMSxcblx0XHRcdFx0KGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpXG5cdFx0XHQpXG5cdFx0Zm9yIChsZXQgayBpbiBvKVxuXHRcdFx0aWYgKG5ldyBSZWdFeHAoJygnICsgayArICcpJykudGVzdChmb3JtYXQpKVxuXHRcdFx0XHRmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcblx0XHRcdFx0XHRSZWdFeHAuJDEsXG5cdFx0XHRcdFx0UmVnRXhwLiQxLmxlbmd0aCA9PSAxXG5cdFx0XHRcdFx0XHQ/IG9ba11cblx0XHRcdFx0XHRcdDogKCcwMCcgKyBvW2tdKS5zdWJzdHIoKCcnICsgb1trXSkubGVuZ3RoKVxuXHRcdFx0XHQpXG5cdFx0cmV0dXJuIGZvcm1hdFxuXHR9XG5cblx0LyoqXG5cdCAqIOezu+e7n+mAmuefpVxuXHQgKlxuXHQgKiA+IOmAmuefpeWPguaVsDog5ZCM5pe25pSv5oyBIFF1YW5YIOWSjCBMb29uIOS4pOenjeagvOW8jywgRW52SnPmoLnmja7ov5DooYznjq/looPoh6rliqjovazmjaIsIFN1cmdlIOeOr+Wig+S4jeaUr+aMgeWkmuWqkuS9k+mAmuefpVxuXHQgKlxuXHQgKiDnpLrkvos6XG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCAndHdpdHRlcjovLycpXG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCB7ICdvcGVuLXVybCc6ICd0d2l0dGVyOi8vJywgJ21lZGlhLXVybCc6ICdodHRwczovL2dpdGh1Yi5naXRodWJhc3NldHMuY29tL2ltYWdlcy9tb2R1bGVzL29wZW5fZ3JhcGgvZ2l0aHViLW1hcmsucG5nJyB9KVxuXHQgKiAkLm1zZyh0aXRsZSwgc3VidCwgZGVzYywgeyAnb3Blbi11cmwnOiAnaHR0cHM6Ly9iaW5nLmNvbScsICdtZWRpYS11cmwnOiAnaHR0cHM6Ly9naXRodWIuZ2l0aHViYXNzZXRzLmNvbS9pbWFnZXMvbW9kdWxlcy9vcGVuX2dyYXBoL2dpdGh1Yi1tYXJrLnBuZycgfSlcblx0ICpcblx0ICogQHBhcmFtIHsqfSB0aXRsZSDmoIfpophcblx0ICogQHBhcmFtIHsqfSBzdWJ0IOWJr+agh+mimFxuXHQgKiBAcGFyYW0geyp9IGRlc2Mg6YCa55+l6K+m5oOFXG5cdCAqIEBwYXJhbSB7Kn0gb3B0cyDpgJrnn6Xlj4LmlbBcblx0ICpcblx0ICovXG5cdG1zZyh0aXRsZSA9IG5hbWUsIHN1YnQgPSAnJywgZGVzYyA9ICcnLCBvcHRzKSB7XG5cdFx0Y29uc3QgdG9FbnZPcHRzID0gKHJhd29wdHMpID0+IHtcblx0XHRcdHN3aXRjaCAodHlwZW9mIHJhd29wdHMpIHtcblx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0cmV0dXJuIHJhd29wdHNcblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgdXJsOiByYXdvcHRzIH1cblx0XHRcdFx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJhd29wdHNcblx0XHRcdFx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7ICdvcGVuLXVybCc6IHJhd29wdHMgfVxuXHRcdFx0XHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdFx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdGxldCBvcGVuVXJsID1cblx0XHRcdFx0XHRcdFx0XHRyYXdvcHRzLnVybCB8fCByYXdvcHRzLm9wZW5VcmwgfHwgcmF3b3B0c1snb3Blbi11cmwnXVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyB1cmw6IG9wZW5VcmwgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnTG9vbic6IHtcblx0XHRcdFx0XHRcdFx0bGV0IG9wZW5VcmwgPVxuXHRcdFx0XHRcdFx0XHRcdHJhd29wdHMub3BlblVybCB8fCByYXdvcHRzLnVybCB8fCByYXdvcHRzWydvcGVuLXVybCddXG5cdFx0XHRcdFx0XHRcdGxldCBtZWRpYVVybCA9IHJhd29wdHMubWVkaWFVcmwgfHwgcmF3b3B0c1snbWVkaWEtdXJsJ11cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgb3BlblVybCwgbWVkaWFVcmwgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzoge1xuXHRcdFx0XHRcdFx0XHRsZXQgb3BlblVybCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0c1snb3Blbi11cmwnXSB8fCByYXdvcHRzLnVybCB8fCByYXdvcHRzLm9wZW5Vcmxcblx0XHRcdFx0XHRcdFx0bGV0IG1lZGlhVXJsID0gcmF3b3B0c1snbWVkaWEtdXJsJ10gfHwgcmF3b3B0cy5tZWRpYVVybFxuXHRcdFx0XHRcdFx0XHRsZXQgdXBkYXRlUGFzdGVib2FyZCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0c1sndXBkYXRlLXBhc3RlYm9hcmQnXSB8fCByYXdvcHRzLnVwZGF0ZVBhc3RlYm9hcmRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHQnb3Blbi11cmwnOiBvcGVuVXJsLFxuXHRcdFx0XHRcdFx0XHRcdCdtZWRpYS11cmwnOiBtZWRpYVVybCxcblx0XHRcdFx0XHRcdFx0XHQndXBkYXRlLXBhc3RlYm9hcmQnOiB1cGRhdGVQYXN0ZWJvYXJkXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCF0aGlzLmlzTXV0ZSkge1xuXHRcdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdCRub3RpZmljYXRpb24ucG9zdCh0aXRsZSwgc3VidCwgZGVzYywgdG9FbnZPcHRzKG9wdHMpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdFx0JG5vdGlmeSh0aXRsZSwgc3VidCwgZGVzYywgdG9FbnZPcHRzKG9wdHMpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICghdGhpcy5pc011dGVMb2cpIHtcblx0XHRcdGxldCBsb2dzID0gWycnLCAnPT09PT09PT09PT09PT3wn5Oj57O757uf6YCa55+l8J+Toz09PT09PT09PT09PT09J11cblx0XHRcdGxvZ3MucHVzaCh0aXRsZSlcblx0XHRcdHN1YnQgPyBsb2dzLnB1c2goc3VidCkgOiAnJ1xuXHRcdFx0ZGVzYyA/IGxvZ3MucHVzaChkZXNjKSA6ICcnXG5cdFx0XHRjb25zb2xlLmxvZyhsb2dzLmpvaW4oJ1xcbicpKVxuXHRcdFx0dGhpcy5sb2dzID0gdGhpcy5sb2dzLmNvbmNhdChsb2dzKVxuXHRcdH1cblx0fVxuXG5cdGxvZyguLi5sb2dzKSB7XG5cdFx0aWYgKGxvZ3MubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5sb2dzID0gWy4uLnRoaXMubG9ncywgLi4ubG9nc11cblx0XHR9XG5cdFx0Y29uc29sZS5sb2cobG9ncy5qb2luKHRoaXMubG9nU2VwYXJhdG9yKSlcblx0fVxuXG5cdGxvZ0VycihlcnJvcikge1xuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhpcy5sb2coJycsIGDinZfvuI8gJHt0aGlzLm5hbWV9LCDplJnor68hYCwgZXJyb3IpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0dGhpcy5sb2coJycsIGDinZfvuI8ke3RoaXMubmFtZX0sIOmUmeivryFgLCBlcnJvci5zdGFjaylcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHR3YWl0KHRpbWUpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSkpXG5cdH1cblxuXHRkb25lKHZhbCA9IHt9KSB7XG5cdFx0Y29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cdFx0Y29uc3QgY29zdFRpbWUgPSAoZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lKSAvIDEwMDBcblx0XHR0aGlzLmxvZygnJywgYPCfmqkgJHt0aGlzLm5hbWV9LCDnu5PmnZ8hIPCflZsgJHtjb3N0VGltZX0g56eSYClcblx0XHR0aGlzLmxvZygpXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQkZG9uZSh2YWwpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0cHJvY2Vzcy5leGl0KDEpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNcblx0ICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1ZpcmdpbENseW5lL0dldFNvbWVGcmllcy9ibG9iL21haW4vZnVuY3Rpb24vZ2V0RU5WL2dldEVOVi5qc1xuXHQgKiBAYXV0aG9yIFZpcmdpbENseW5lXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSBQZXJzaXN0ZW50IFN0b3JlIEtleVxuXHQgKiBAcGFyYW0ge0FycmF5fSBuYW1lcyAtIFBsYXRmb3JtIE5hbWVzXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhYmFzZSAtIERlZmF1bHQgRGF0YWJhc2Vcblx0ICogQHJldHVybiB7T2JqZWN0fSB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfVxuXHQgKi9cblx0Z2V0RU5WKGtleSwgbmFtZXMsIGRhdGFiYXNlKSB7XG5cdFx0Ly90aGlzLmxvZyhg4piR77iPICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIFwiXCIpO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBCb3hKcyAqKioqKioqKioqKioqKioqKi9cblx0XHQvLyDljIXoo4XkuLrlsYDpg6jlj5jph4/vvIznlKjlrozph4rmlL7lhoXlrZhcblx0XHQvLyBCb3hKc+eahOa4heepuuaTjeS9nOi/lOWbnuWBh+WAvOepuuWtl+espuS4siwg6YC76L6R5oiW5pON5L2c56ym5Lya5Zyo5bem5L6n5pON5L2c5pWw5Li65YGH5YC85pe26L+U5Zue5Y+z5L6n5pON5L2c5pWw44CCXG5cdFx0bGV0IEJveEpzID0gdGhpcy5nZXRqc29uKGtleSwgZGF0YWJhc2UpO1xuXHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYEJveEpz57G75Z6LOiAke3R5cGVvZiBCb3hKc31gLCBgQm94SnPlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQm94SnMpfWAsIFwiXCIpO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBBcmd1bWVudCAqKioqKioqKioqKioqKioqKi9cblx0XHRsZXQgQXJndW1lbnQgPSB7fTtcblx0XHRpZiAodHlwZW9mICRhcmd1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0aWYgKEJvb2xlYW4oJGFyZ3VtZW50KSkge1xuXHRcdFx0XHQvL3RoaXMubG9nKGDwn46JICR7dGhpcy5uYW1lfSwgJEFyZ3VtZW50YCk7XG5cdFx0XHRcdGxldCBhcmcgPSBPYmplY3QuZnJvbUVudHJpZXMoJGFyZ3VtZW50LnNwbGl0KFwiJlwiKS5tYXAoKGl0ZW0pID0+IGl0ZW0uc3BsaXQoXCI9XCIpLm1hcChpID0+IGkucmVwbGFjZSgvXFxcIi9nLCAnJykpKSk7XG5cdFx0XHRcdC8vdGhpcy5sb2coSlNPTi5zdHJpbmdpZnkoYXJnKSk7XG5cdFx0XHRcdGZvciAobGV0IGl0ZW0gaW4gYXJnKSB0aGlzLnNldFBhdGgoQXJndW1lbnQsIGl0ZW0sIGFyZ1tpdGVtXSk7XG5cdFx0XHRcdC8vdGhpcy5sb2coSlNPTi5zdHJpbmdpZnkoQXJndW1lbnQpKTtcblx0XHRcdH07XG5cdFx0XHQvL3RoaXMubG9nKGDinIUgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYEFyZ3VtZW5057G75Z6LOiAke3R5cGVvZiBBcmd1bWVudH1gLCBgQXJndW1lbnTlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQXJndW1lbnQpfWAsIFwiXCIpO1xuXHRcdH07XG5cdFx0LyoqKioqKioqKioqKioqKioqIFN0b3JlICoqKioqKioqKioqKioqKioqL1xuXHRcdGNvbnN0IFN0b3JlID0geyBTZXR0aW5nczogZGF0YWJhc2U/LkRlZmF1bHQ/LlNldHRpbmdzIHx8IHt9LCBDb25maWdzOiBkYXRhYmFzZT8uRGVmYXVsdD8uQ29uZmlncyB8fCB7fSwgQ2FjaGVzOiB7fSB9O1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShuYW1lcykpIG5hbWVzID0gW25hbWVzXTtcblx0XHQvL3RoaXMubG9nKGDwn5qnICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBuYW1lc+exu+WeizogJHt0eXBlb2YgbmFtZXN9YCwgYG5hbWVz5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KG5hbWVzKX1gLCBcIlwiKTtcblx0XHRmb3IgKGxldCBuYW1lIG9mIG5hbWVzKSB7XG5cdFx0XHRTdG9yZS5TZXR0aW5ncyA9IHsgLi4uU3RvcmUuU2V0dGluZ3MsIC4uLmRhdGFiYXNlPy5bbmFtZV0/LlNldHRpbmdzLCAuLi5Bcmd1bWVudCwgLi4uQm94SnM/LltuYW1lXT8uU2V0dGluZ3MgfTtcblx0XHRcdFN0b3JlLkNvbmZpZ3MgPSB7IC4uLlN0b3JlLkNvbmZpZ3MsIC4uLmRhdGFiYXNlPy5bbmFtZV0/LkNvbmZpZ3MgfTtcblx0XHRcdGlmIChCb3hKcz8uW25hbWVdPy5DYWNoZXMgJiYgdHlwZW9mIEJveEpzPy5bbmFtZV0/LkNhY2hlcyA9PT0gXCJzdHJpbmdcIikgQm94SnNbbmFtZV0uQ2FjaGVzID0gSlNPTi5wYXJzZShCb3hKcz8uW25hbWVdPy5DYWNoZXMpO1xuXHRcdFx0U3RvcmUuQ2FjaGVzID0geyAuLi5TdG9yZS5DYWNoZXMsIC4uLkJveEpzPy5bbmFtZV0/LkNhY2hlcyB9O1xuXHRcdH07XG5cdFx0Ly90aGlzLmxvZyhg8J+apyAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgU3RvcmUuU2V0dGluZ3Pnsbvlnos6ICR7dHlwZW9mIFN0b3JlLlNldHRpbmdzfWAsIGBTdG9yZS5TZXR0aW5nczogJHtKU09OLnN0cmluZ2lmeShTdG9yZS5TZXR0aW5ncyl9YCwgXCJcIik7XG5cdFx0dGhpcy50cmF2ZXJzZU9iamVjdChTdG9yZS5TZXR0aW5ncywgKGtleSwgdmFsdWUpID0+IHtcblx0XHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCB0cmF2ZXJzZU9iamVjdGAsIGAke2tleX06ICR7dHlwZW9mIHZhbHVlfWAsIGAke2tleX06ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWAsIFwiXCIpO1xuXHRcdFx0aWYgKHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpOyAvLyDlrZfnrKbkuLLovaxCb29sZWFuXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0aWYgKHZhbHVlLmluY2x1ZGVzKFwiLFwiKSkgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIixcIikubWFwKGl0ZW0gPT4gdGhpcy5zdHJpbmcybnVtYmVyKGl0ZW0pKTsgLy8g5a2X56ym5Liy6L2s5pWw57uE6L2s5pWw5a2XXG5cdFx0XHRcdGVsc2UgdmFsdWUgPSB0aGlzLnN0cmluZzJudW1iZXIodmFsdWUpOyAvLyDlrZfnrKbkuLLovazmlbDlrZdcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fSk7XG5cdFx0Ly90aGlzLmxvZyhg4pyFICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBTdG9yZTogJHt0eXBlb2YgU3RvcmUuQ2FjaGVzfWAsIGBTdG9yZeWGheWuuTogJHtKU09OLnN0cmluZ2lmeShTdG9yZSl9YCwgXCJcIik7XG5cdFx0cmV0dXJuIFN0b3JlO1xuXHR9O1xuXG5cdC8qKioqKioqKioqKioqKioqKiBmdW5jdGlvbiAqKioqKioqKioqKioqKioqKi9cblx0c2V0UGF0aChvYmplY3QsIHBhdGgsIHZhbHVlKSB7IHBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgobywgcCwgaSkgPT4gb1twXSA9IHBhdGguc3BsaXQoXCIuXCIpLmxlbmd0aCA9PT0gKytpID8gdmFsdWUgOiBvW3BdIHx8IHt9LCBvYmplY3QpIH1cblx0dHJhdmVyc2VPYmplY3QobywgYykgeyBmb3IgKHZhciB0IGluIG8pIHsgdmFyIG4gPSBvW3RdOyBvW3RdID0gXCJvYmplY3RcIiA9PSB0eXBlb2YgbiAmJiBudWxsICE9PSBuID8gdGhpcy50cmF2ZXJzZU9iamVjdChuLCBjKSA6IGModCwgbikgfSByZXR1cm4gbyB9XG5cdHN0cmluZzJudW1iZXIoc3RyaW5nKSB7IGlmIChzdHJpbmcgJiYgIWlzTmFOKHN0cmluZykpIHN0cmluZyA9IHBhcnNlSW50KHN0cmluZywgMTApOyByZXR1cm4gc3RyaW5nIH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0dHAge1xuXHRjb25zdHJ1Y3RvcihlbnYpIHtcblx0XHR0aGlzLmVudiA9IGVudlxuXHR9XG5cblx0c2VuZChvcHRzLCBtZXRob2QgPSAnR0VUJykge1xuXHRcdG9wdHMgPSB0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycgPyB7IHVybDogb3B0cyB9IDogb3B0c1xuXHRcdGxldCBzZW5kZXIgPSB0aGlzLmdldFxuXHRcdGlmIChtZXRob2QgPT09ICdQT1NUJykge1xuXHRcdFx0c2VuZGVyID0gdGhpcy5wb3N0XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRzZW5kZXIuY2FsbCh0aGlzLCBvcHRzLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG5cdFx0XHRcdGlmIChlcnJvcikgcmVqZWN0KGVycm9yKVxuXHRcdFx0XHRlbHNlIHJlc29sdmUocmVzcG9uc2UpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRnZXQob3B0cykge1xuXHRcdHJldHVybiB0aGlzLnNlbmQuY2FsbCh0aGlzLmVudiwgb3B0cylcblx0fVxuXG5cdHBvc3Qob3B0cykge1xuXHRcdHJldHVybiB0aGlzLnNlbmQuY2FsbCh0aGlzLmVudiwgb3B0cywgJ1BPU1QnKVxuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVUkkge1xuXHRjb25zdHJ1Y3RvcihvcHRzID0gW10pIHtcblx0XHR0aGlzLm5hbWUgPSBcIlVSSSB2MS4yLjZcIjtcblx0XHR0aGlzLm9wdHMgPSBvcHRzO1xuXHRcdHRoaXMuanNvbiA9IHsgc2NoZW1lOiBcIlwiLCBob3N0OiBcIlwiLCBwYXRoOiBcIlwiLCBxdWVyeToge30gfTtcblx0fTtcblxuXHRwYXJzZSh1cmwpIHtcblx0XHRjb25zdCBVUkxSZWdleCA9IC8oPzooPzxzY2hlbWU+LispOlxcL1xcLyg/PGhvc3Q+W14vXSspKT9cXC8/KD88cGF0aD5bXj9dKyk/XFw/Pyg/PHF1ZXJ5PlteP10rKT8vO1xuXHRcdGxldCBqc29uID0gdXJsLm1hdGNoKFVSTFJlZ2V4KT8uZ3JvdXBzID8/IG51bGw7XG5cdFx0aWYgKGpzb24/LnBhdGgpIGpzb24ucGF0aHMgPSBqc29uLnBhdGguc3BsaXQoXCIvXCIpOyBlbHNlIGpzb24ucGF0aCA9IFwiXCI7XG5cdFx0Ly9pZiAoanNvbj8ucGF0aHM/LmF0KC0xKT8uaW5jbHVkZXMoXCIuXCIpKSBqc29uLmZvcm1hdCA9IGpzb24ucGF0aHMuYXQoLTEpLnNwbGl0KFwiLlwiKS5hdCgtMSk7XG5cdFx0aWYgKGpzb24/LnBhdGhzKSB7XG5cdFx0XHRjb25zdCBmaWxlTmFtZSA9IGpzb24ucGF0aHNbanNvbi5wYXRocy5sZW5ndGggLSAxXTtcblx0XHRcdGlmIChmaWxlTmFtZT8uaW5jbHVkZXMoXCIuXCIpKSB7XG5cdFx0XHRcdGNvbnN0IGxpc3QgPSBmaWxlTmFtZS5zcGxpdChcIi5cIik7XG5cdFx0XHRcdGpzb24uZm9ybWF0ID0gbGlzdFtsaXN0Lmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoanNvbj8ucXVlcnkpIGpzb24ucXVlcnkgPSBPYmplY3QuZnJvbUVudHJpZXMoanNvbi5xdWVyeS5zcGxpdChcIiZcIikubWFwKChwYXJhbSkgPT4gcGFyYW0uc3BsaXQoXCI9XCIpKSk7XG5cdFx0cmV0dXJuIGpzb25cblx0fTtcblxuXHRzdHJpbmdpZnkoanNvbiA9IHRoaXMuanNvbikge1xuXHRcdGxldCB1cmwgPSBcIlwiO1xuXHRcdGlmIChqc29uPy5zY2hlbWUgJiYganNvbj8uaG9zdCkgdXJsICs9IGpzb24uc2NoZW1lICsgXCI6Ly9cIiArIGpzb24uaG9zdDtcblx0XHRpZiAoanNvbj8ucGF0aCkgdXJsICs9IChqc29uPy5ob3N0KSA/IFwiL1wiICsganNvbi5wYXRoIDoganNvbi5wYXRoO1xuXHRcdGlmIChqc29uPy5xdWVyeSkgdXJsICs9IFwiP1wiICsgT2JqZWN0LmVudHJpZXMoanNvbi5xdWVyeSkubWFwKHBhcmFtID0+IHBhcmFtLmpvaW4oXCI9XCIpKS5qb2luKFwiJlwiKTtcblx0XHRyZXR1cm4gdXJsXG5cdH07XG59XG4iLCIvLyByZWZlcjogaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYnZ0dDEvXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJWVFQge1xuXHRjb25zdHJ1Y3RvcihvcHRzID0gW1wibWlsbGlzZWNvbmRzXCIsIFwidGltZVN0YW1wXCIsIFwic2luZ2xlTGluZVwiLCBcIlxcblwiXSkge1xuXHRcdHRoaXMubmFtZSA9IFwiV2ViVlRUIHYyLjEuNFwiO1xuXHRcdHRoaXMub3B0cyA9IG9wdHM7XG5cdFx0dGhpcy5saW5lQnJlYWsgPSAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxuXCIpKSA/IFwiXFxuXCIgOiAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxyXCIpKSA/IFwiXFxyXCIgOiAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxyXFxuXCIpKSA/IFwiXFxyXFxuXCIgOiBcIlxcblwiO1xuXHRcdHRoaXMudnR0ID0gbmV3IFN0cmluZztcblx0XHR0aGlzLmpzb24gPSB7IGhlYWRlcnM6IHt9LCBjb21tZW50czogW10sIHN0eWxlOiBcIlwiLCBib2R5OiBbXSB9O1xuXHR9O1xuXG5cdHBhcnNlKHZ0dCA9IHRoaXMudnR0KSB7XG5cdFx0Y29uc3QgV2ViVlRUX2N1ZV9SZWdleCA9ICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJtaWxsaXNlY29uZHNcIikpID8gL14oKD88aW5kZXg+XFxkKykoXFxyXFxufFxccnxcXG4pKT8oPzx0aW1pbmc+KD88c3RhcnRUaW1lPlswLTk6LixdKykgLS0+ICg/PGVuZFRpbWU+WzAtOTouLF0rKSkgPyg/PHNldHRpbmdzPi4rKT9bXl0oPzx0ZXh0PltcXHNcXFNdKik/JC9cblx0XHRcdDogL14oKD88aW5kZXg+XFxkKykoXFxyXFxufFxccnxcXG4pKT8oPzx0aW1pbmc+KD88c3RhcnRUaW1lPlswLTk6XSspWzAtOS4sXSsgLS0+ICg/PGVuZFRpbWU+WzAtOTpdKylbMC05LixdKykgPyg/PHNldHRpbmdzPi4rKT9bXl0oPzx0ZXh0PltcXHNcXFNdKik/JC9cblx0XHRjb25zdCBBcnJheSA9IHZ0dC5zcGxpdCgvXFxyXFxuXFxyXFxufFxcclxccnxcXG5cXG4vKTtcblx0XHRjb25zdCBKc29uID0geyBoZWFkZXJzOiB7fSwgY29tbWVudHM6IFtdLCBzdHlsZTogXCJcIiwgYm9keTogW10gfTtcblxuXHRcdEFycmF5LmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRpdGVtID0gaXRlbS50cmltKCk7XG5cdFx0XHRzd2l0Y2ggKGl0ZW0uc3Vic3RyaW5nKDAsIDUpLnRyaW0oKSkge1xuXHRcdFx0XHRjYXNlIFwiV0VCVlRcIjoge1xuXHRcdFx0XHRcdGxldCBjdWVzID0gaXRlbS5zcGxpdCgvXFxyXFxufFxccnxcXG4vKTtcblx0XHRcdFx0XHRKc29uLmhlYWRlcnMudHlwZSA9IGN1ZXMuc2hpZnQoKTtcblx0XHRcdFx0XHRKc29uLmhlYWRlcnMub3B0aW9ucyA9IGN1ZXM7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJOT1RFXCI6IHtcblx0XHRcdFx0XHRKc29uLmNvbW1lbnRzLnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJTVFlMRVwiOiB7XG5cdFx0XHRcdFx0bGV0IGN1ZXMgPSBpdGVtLnNwbGl0KC9cXHJcXG58XFxyfFxcbi8pO1xuXHRcdFx0XHRcdGN1ZXMuc2hpZnQoKTtcblx0XHRcdFx0XHRKc29uLnN0eWxlID0gY3Vlcy5qb2luKHRoaXMubGluZUJyZWFrKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fTtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRsZXQgY3VlID0gaXRlbS5tYXRjaChXZWJWVFRfY3VlX1JlZ2V4KT8uZ3JvdXBzO1xuXHRcdFx0XHRcdGlmIChjdWUpIHtcblx0XHRcdFx0XHRcdGlmIChKc29uLmhlYWRlcnM/LnR5cGUgIT09IFwiV0VCVlRUXCIpIHtcblx0XHRcdFx0XHRcdFx0Y3VlLnRpbWluZyA9IGN1ZT8udGltaW5nPy5yZXBsYWNlPy4oXCIsXCIsIFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0Y3VlLnN0YXJ0VGltZSA9IGN1ZT8uc3RhcnRUaW1lPy5yZXBsYWNlPy4oXCIsXCIsIFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0Y3VlLmVuZFRpbWUgPSBjdWU/LmVuZFRpbWU/LnJlcGxhY2U/LihcIixcIiwgXCIuXCIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0cy5pbmNsdWRlcyhcInRpbWVTdGFtcFwiKSkge1xuXHRcdFx0XHRcdFx0XHRsZXQgSVNPU3RyaW5nID0gY3VlPy5zdGFydFRpbWU/LnJlcGxhY2U/LigvKC4qKS8sIFwiMTk3MC0wMS0wMVQkMVpcIilcblx0XHRcdFx0XHRcdFx0Y3VlLnRpbWVTdGFtcCA9IHRoaXMub3B0cy5pbmNsdWRlcyhcIm1pbGxpc2Vjb25kc1wiKSA/IERhdGUucGFyc2UoSVNPU3RyaW5nKSA6IERhdGUucGFyc2UoSVNPU3RyaW5nKSAvIDEwMDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjdWUudGV4dCA9IGN1ZT8udGV4dD8udHJpbUVuZD8uKCk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRzLmluY2x1ZGVzKFwic2luZ2xlTGluZVwiKSkge1xuXHRcdFx0XHRcdFx0XHRjdWUudGV4dCA9IGN1ZT8udGV4dD8ucmVwbGFjZT8uKC9cXHJcXG58XFxyfFxcbi8sIFwiIFwiKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRzLmluY2x1ZGVzKFwibXVsdGlMaW5lXCIpKSB7XG5cdFx0XHRcdFx0XHRcdGN1ZS50ZXh0ID0gY3VlPy50ZXh0Py5zcGxpdD8uKC9cXHJcXG58XFxyfFxcbi8pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0SnNvbi5ib2R5LnB1c2goY3VlKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBKc29uXG5cdH07XG5cblx0c3RyaW5naWZ5KGpzb24gPSB0aGlzLmpzb24pIHtcblx0XHRsZXQgdnR0ID0gW1xuXHRcdFx0anNvbi5oZWFkZXJzID0gW2pzb24uaGVhZGVycz8udHlwZSB8fCBcIlwiLCBqc29uLmhlYWRlcnM/Lm9wdGlvbnMgfHwgXCJcIl0uZmxhdChJbmZpbml0eSkuam9pbih0aGlzLmxpbmVCcmVhayksXG5cdFx0XHRqc29uLmNvbW1lbnRzID0ganNvbj8uY29tbWVudHM/LmpvaW4/Lih0aGlzLmxpbmVCcmVhayksXG5cdFx0XHRqc29uLnN0eWxlID0gKGpzb24/LnN0eWxlPy5sZW5ndGggPiAwKSA/IFtcIlNUWUxFXCIsIGpzb24uc3R5bGVdLmpvaW4odGhpcy5saW5lQnJlYWspIDogXCJcIixcblx0XHRcdGpzb24uYm9keSA9IGpzb24uYm9keS5tYXAoaXRlbSA9PiB7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0udGV4dCkpIGl0ZW0udGV4dCA9IGl0ZW0udGV4dC5qb2luKHRoaXMubGluZUJyZWFrKTtcblx0XHRcdFx0aXRlbSA9IGAkeyhpdGVtLmluZGV4KSA/IGl0ZW0uaW5kZXggKyB0aGlzLmxpbmVCcmVhayA6IFwiXCJ9JHtpdGVtLnRpbWluZ30gJHtpdGVtPy5zZXR0aW5ncyA/PyBcIlwifSR7dGhpcy5saW5lQnJlYWt9JHtpdGVtLnRleHR9YDtcblx0XHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0XHR9KS5qb2luKHRoaXMubGluZUJyZWFrICsgdGhpcy5saW5lQnJlYWspXG5cdFx0XS5qb2luKHRoaXMubGluZUJyZWFrICsgdGhpcy5saW5lQnJlYWspLnRyaW0oKSArIHRoaXMubGluZUJyZWFrICsgdGhpcy5saW5lQnJlYWs7XG5cdFx0cmV0dXJuIHZ0dFxuXHR9O1xufTtcbiIsIi8vIHJlZmVyOiBodHRwczovL2dpdGh1Yi5jb20vUGVuZy1ZTS9RdWFuWC9ibG9iL21hc3Rlci9Ub29scy9YTUxQYXJzZXIveG1sLXBhcnNlci5qc1xuLy8gcmVmZXI6IGh0dHBzOi8vZ29lc3NuZXIubmV0L2Rvd25sb2FkL3Byai9qc29ueG1sL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWE1MIHtcblx0I0FUVFJJQlVURV9LRVkgPSBcIkBcIjtcblx0I0NISUxEX05PREVfS0VZID0gXCIjXCI7XG5cdCNVTkVTQ0FQRSA9IHtcblx0XHRcIiZhbXA7XCI6IFwiJlwiLFxuXHRcdFwiJmx0O1wiOiBcIjxcIixcblx0XHRcIiZndDtcIjogXCI+XCIsXG5cdFx0XCImYXBvcztcIjogXCInXCIsXG5cdFx0XCImcXVvdDtcIjogJ1wiJ1xuXHR9O1xuXHQjRVNDQVBFID0ge1xuXHRcdFwiJlwiOiBcIiZhbXA7XCIsXG5cdFx0XCI8XCI6IFwiJmx0O1wiLFxuXHRcdFwiPlwiOiBcIiZndDtcIixcblx0XHRcIidcIjogXCImYXBvcztcIixcblx0XHQnXCInOiBcIiZxdW90O1wiXG5cdH07XG5cblx0Y29uc3RydWN0b3Iob3B0cykge1xuXHRcdHRoaXMubmFtZSA9IFwiWE1MIHYwLjQuMC0yXCI7XG5cdFx0dGhpcy5vcHRzID0gb3B0cztcblx0XHRCaWdJbnQucHJvdG90eXBlLnRvSlNPTiA9ICgpID0+IHRoaXMudG9TdHJpbmcoKTtcblx0fTtcblxuXHRwYXJzZSh4bWwgPSBuZXcgU3RyaW5nLCByZXZpdmVyID0gXCJcIikge1xuXHRcdGNvbnN0IFVORVNDQVBFID0gdGhpcy4jVU5FU0NBUEU7XG5cdFx0Y29uc3QgQVRUUklCVVRFX0tFWSA9IHRoaXMuI0FUVFJJQlVURV9LRVk7XG5cdFx0Y29uc3QgQ0hJTERfTk9ERV9LRVkgPSB0aGlzLiNDSElMRF9OT0RFX0tFWTtcblx0XHRjb25zdCBET00gPSB0b0RPTSh4bWwpO1xuXHRcdGxldCBqc29uID0gZnJvbVhNTChET00sIHJldml2ZXIpO1xuXHRcdHJldHVybiBqc29uO1xuXG5cdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdGZ1bmN0aW9uIHRvRE9NKHRleHQpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSB0ZXh0LnJlcGxhY2UoL15bIFxcdF0rL2dtLCBcIlwiKVxuXHRcdFx0XHQuc3BsaXQoLzwoW14hPD4/XSg/OidbXFxTXFxzXSo/J3xcIltcXFNcXHNdKj9cInxbXidcIjw+XSkqfCEoPzotLVtcXFNcXHNdKj8tLXxcXFtbXlxcW1xcXSdcIjw+XStcXFtbXFxTXFxzXSo/XV18RE9DVFlQRVteXFxbPD5dKj9cXFtbXFxTXFxzXSo/XXwoPzpFTlRJVFlbXlwiPD5dKj9cIltcXFNcXHNdKj9cIik/W1xcU1xcc10qPyl8XFw/W1xcU1xcc10qP1xcPyk+Lyk7XG5cdFx0XHRjb25zdCBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcblxuXHRcdFx0Ly8gcm9vdCBlbGVtZW50XG5cdFx0XHRjb25zdCByb290ID0geyBjaGlsZHJlbjogW10gfTtcblx0XHRcdGxldCBlbGVtID0gcm9vdDtcblxuXHRcdFx0Ly8gZG9tIHRyZWUgc3RhY2tcblx0XHRcdGNvbnN0IHN0YWNrID0gW107XG5cblx0XHRcdC8vIHBhcnNlXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDspIHtcblx0XHRcdFx0Ly8gdGV4dCBub2RlXG5cdFx0XHRcdGNvbnN0IHN0ciA9IGxpc3RbaSsrXTtcblx0XHRcdFx0aWYgKHN0cikgYXBwZW5kVGV4dChzdHIpO1xuXG5cdFx0XHRcdC8vIGNoaWxkIG5vZGVcblx0XHRcdFx0Y29uc3QgdGFnID0gbGlzdFtpKytdO1xuXHRcdFx0XHRpZiAodGFnKSBwYXJzZU5vZGUodGFnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByb290O1xuXHRcdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2VOb2RlKHRhZykge1xuXHRcdFx0XHRjb25zdCB0YWdzID0gdGFnLnNwbGl0KFwiIFwiKTtcblx0XHRcdFx0Y29uc3QgbmFtZSA9IHRhZ3Muc2hpZnQoKTtcblx0XHRcdFx0Y29uc3QgbGVuZ3RoID0gdGFncy5sZW5ndGg7XG5cdFx0XHRcdGxldCBjaGlsZCA9IHt9O1xuXHRcdFx0XHRzd2l0Y2ggKG5hbWVbMF0pIHtcblx0XHRcdFx0XHRjYXNlIFwiL1wiOlxuXHRcdFx0XHRcdFx0Ly8gY2xvc2UgdGFnXG5cdFx0XHRcdFx0XHRjb25zdCBjbG9zZWQgPSB0YWcucmVwbGFjZSgvXlxcL3xbXFxzXFwvXS4qJC9nLCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0d2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB0YWdOYW1lID0gZWxlbT8ubmFtZT8udG9Mb3dlckNhc2U/LigpO1xuXHRcdFx0XHRcdFx0XHRlbGVtID0gc3RhY2sucG9wKCk7XG5cdFx0XHRcdFx0XHRcdGlmICh0YWdOYW1lID09PSBjbG9zZWQpIGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIj9cIjpcblx0XHRcdFx0XHRcdC8vIFhNTCBkZWNsYXJhdGlvblxuXHRcdFx0XHRcdFx0Y2hpbGQubmFtZSA9IG5hbWU7XG5cdFx0XHRcdFx0XHRjaGlsZC5yYXcgPSB0YWdzLmpvaW4oXCIgXCIpO1xuXHRcdFx0XHRcdFx0YXBwZW5kQ2hpbGQoY2hpbGQpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIiFcIjpcblx0XHRcdFx0XHRcdGlmICgvIVxcW0NEQVRBXFxbKC4rKVxcXVxcXS8udGVzdCh0YWcpKSB7XG5cdFx0XHRcdFx0XHRcdC8vIENEQVRBIHNlY3Rpb25cblx0XHRcdFx0XHRcdFx0Y2hpbGQubmFtZSA9IFwiIUNEQVRBXCI7XG5cdFx0XHRcdFx0XHRcdC8vY2hpbGQucmF3ID0gdGFnLnNsaWNlKDksIC0yKTtcblx0XHRcdFx0XHRcdFx0Y2hpbGQucmF3ID0gdGFnLm1hdGNoKC8hXFxbQ0RBVEFcXFsoLispXFxdXFxdLyk7XG5cdFx0XHRcdFx0XHRcdC8vYXBwZW5kVGV4dCh0YWcuc2xpY2UoOSwgLTIpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIENvbW1lbnQgc2VjdGlvblxuXHRcdFx0XHRcdFx0XHRjaGlsZC5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHRcdFx0Y2hpbGQucmF3ID0gdGFncy5qb2luKFwiIFwiKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Y2hpbGQgPSBvcGVuVGFnKHRhZyk7XG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKCh0YWdzPy5bbGVuZ3RoIC0gMV0gPz8gbmFtZSkuc2xpY2UoLTEpKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgXCIvXCI6XG5cdFx0XHRcdFx0XHRcdFx0Ly9jaGlsZC5oYXNDaGlsZCA9IGZhbHNlOyAvLyBlbXB0eVRhZ1xuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBjaGlsZC5jaGlsZHJlbjsgLy8gZW1wdHlUYWdcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJsaW5rXCI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vY2hpbGQuaGFzQ2hpbGQgPSBmYWxzZTsgLy8gZW1wdHlUYWdcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGNoaWxkLmNoaWxkcmVuOyAvLyBlbXB0eVRhZ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN0YWNrLnB1c2goZWxlbSk7IC8vIG9wZW5UYWdcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxlbSA9IGNoaWxkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGZ1bmN0aW9uIG9wZW5UYWcodGFnKSB7XG5cdFx0XHRcdFx0Y29uc3QgZWxlbSA9IHsgY2hpbGRyZW46IFtdIH07XG5cdFx0XHRcdFx0dGFnID0gdGFnLnJlcGxhY2UoL1xccypcXC8/JC8sIFwiXCIpO1xuXHRcdFx0XHRcdGNvbnN0IHBvcyA9IHRhZy5zZWFyY2goL1tcXHM9J1wiXFwvXS8pO1xuXHRcdFx0XHRcdGlmIChwb3MgPCAwKSB7XG5cdFx0XHRcdFx0XHRlbGVtLm5hbWUgPSB0YWc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0ubmFtZSA9IHRhZy5zdWJzdHIoMCwgcG9zKTtcblx0XHRcdFx0XHRcdGVsZW0udGFnID0gdGFnLnN1YnN0cihwb3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZWxlbTtcblx0XHRcdFx0fTtcblx0XHRcdH07XG5cblx0XHRcdGZ1bmN0aW9uIGFwcGVuZFRleHQoc3RyKSB7XG5cdFx0XHRcdC8vc3RyID0gcmVtb3ZlU3BhY2VzKHN0cik7XG5cdFx0XHRcdHN0ciA9IHJlbW92ZUJyZWFrTGluZShzdHIpO1xuXHRcdFx0XHQvL3N0ciA9IHN0cj8udHJpbT8uKCk7XG5cdFx0XHRcdGlmIChzdHIpIGFwcGVuZENoaWxkKHVuZXNjYXBlWE1MKHN0cikpO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIHJlbW92ZUJyZWFrTGluZShzdHIpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RyPy5yZXBsYWNlPy4oL14oXFxyXFxufFxccnxcXG58XFx0KSt8KFxcclxcbnxcXHJ8XFxufFxcdCkrJC9nLCBcIlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBhcHBlbmRDaGlsZChjaGlsZCkge1xuXHRcdFx0XHRlbGVtLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdGZ1bmN0aW9uIGZyb21QbGlzdChlbGVtLCByZXZpdmVyKSB7XG5cdFx0XHRsZXQgb2JqZWN0O1xuXHRcdFx0c3dpdGNoICh0eXBlb2YgZWxlbSkge1xuXHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdGNhc2UgXCJ1bmRlZmluZWRcIjpcblx0XHRcdFx0XHRvYmplY3QgPSBlbGVtO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdFx0Ly9kZWZhdWx0OlxuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBlbGVtLm5hbWU7XG5cdFx0XHRcdFx0Y29uc3QgY2hpbGRyZW4gPSBlbGVtLmNoaWxkcmVuO1xuXG5cdFx0XHRcdFx0b2JqZWN0ID0ge307XG5cblx0XHRcdFx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdFx0XHRcdGNhc2UgXCJwbGlzdFwiOlxuXHRcdFx0XHRcdFx0XHRsZXQgcGxpc3QgPSBmcm9tUGxpc3QoY2hpbGRyZW5bMF0sIHJldml2ZXIpO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBPYmplY3QuYXNzaWduKG9iamVjdCwgcGxpc3QpXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImRpY3RcIjpcblx0XHRcdFx0XHRcdFx0bGV0IGRpY3QgPSBjaGlsZHJlbi5tYXAoY2hpbGQgPT4gZnJvbVBsaXN0KGNoaWxkLCByZXZpdmVyKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QgPSBjaHVuayhkaWN0LCAyKTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0ID0gT2JqZWN0LmZyb21FbnRyaWVzKGRpY3QpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJhcnJheVwiOlxuXHRcdFx0XHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0KSkgb2JqZWN0ID0gW107XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IGNoaWxkcmVuLm1hcChjaGlsZCA9PiBmcm9tUGxpc3QoY2hpbGQsIHJldml2ZXIpKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwia2V5XCI6XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGtleSA9IGNoaWxkcmVuWzBdO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBrZXk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcInRydWVcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJmYWxzZVwiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCBib29sZWFuID0gbmFtZTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0ID0gSlNPTi5wYXJzZShib29sZWFuKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiaW50ZWdlclwiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCBpbnRlZ2VyID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdC8vb2JqZWN0ID0gcGFyc2VJbnQoaW50ZWdlcik7XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IEJpZ0ludChpbnRlZ2VyKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwicmVhbFwiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCByZWFsID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdC8vY29uc3QgZGlnaXRzID0gcmVhbC5zcGxpdChcIi5cIilbMV0/Lmxlbmd0aCB8fCAwO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBwYXJzZUZsb2F0KHJlYWwpLy8udG9GaXhlZChkaWdpdHMpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3RyaW5nID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IHN0cmluZztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRpZiAocmV2aXZlcikgb2JqZWN0ID0gcmV2aXZlcihuYW1lIHx8IFwiXCIsIG9iamVjdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXG5cdFx0XHQvKiogXG5cdFx0XHQgKiBDaHVuayBBcnJheVxuXHRcdFx0ICogQGF1dGhvciBWaXJnaWxDbHluZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc291cmNlIC0gc291cmNlXG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIC0gbnVtYmVyXG5cdFx0XHQgKiBAcmV0dXJuIHtBcnJheTwqPn0gdGFyZ2V0XG5cdFx0XHQgKi9cblx0XHRcdGZ1bmN0aW9uIGNodW5rKHNvdXJjZSwgbGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IDAsIHRhcmdldCA9IFtdO1xuXHRcdFx0XHR3aGlsZSAoaW5kZXggPCBzb3VyY2UubGVuZ3RoKSB0YXJnZXQucHVzaChzb3VyY2Uuc2xpY2UoaW5kZXgsIGluZGV4ICs9IGxlbmd0aCkpO1xuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmcm9tWE1MKGVsZW0sIHJldml2ZXIpIHtcblx0XHRcdGxldCBvYmplY3Q7XG5cdFx0XHRzd2l0Y2ggKHR5cGVvZiBlbGVtKSB7XG5cdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxuXHRcdFx0XHRcdG9iamVjdCA9IGVsZW07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0XHQvL2RlZmF1bHQ6XG5cdFx0XHRcdFx0Y29uc3QgcmF3ID0gZWxlbS5yYXc7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGVsZW0ubmFtZTtcblx0XHRcdFx0XHRjb25zdCB0YWcgPSBlbGVtLnRhZztcblx0XHRcdFx0XHRjb25zdCBjaGlsZHJlbiA9IGVsZW0uY2hpbGRyZW47XG5cblx0XHRcdFx0XHRpZiAocmF3KSBvYmplY3QgPSByYXc7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodGFnKSBvYmplY3QgPSBwYXJzZUF0dHJpYnV0ZSh0YWcsIHJldml2ZXIpO1xuXHRcdFx0XHRcdGVsc2UgaWYgKCFjaGlsZHJlbikgb2JqZWN0ID0geyBbbmFtZV06IHVuZGVmaW5lZCB9O1xuXHRcdFx0XHRcdGVsc2Ugb2JqZWN0ID0ge307XG5cblx0XHRcdFx0XHRpZiAobmFtZSA9PT0gXCJwbGlzdFwiKSBvYmplY3QgPSBPYmplY3QuYXNzaWduKG9iamVjdCwgZnJvbVBsaXN0KGNoaWxkcmVuWzBdLCByZXZpdmVyKSk7XG5cdFx0XHRcdFx0ZWxzZSBjaGlsZHJlbj8uZm9yRWFjaD8uKChjaGlsZCwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJzdHJpbmdcIikgYWRkT2JqZWN0KG9iamVjdCwgQ0hJTERfTk9ERV9LRVksIGZyb21YTUwoY2hpbGQsIHJldml2ZXIpLCB1bmRlZmluZWQpXG5cdFx0XHRcdFx0XHRlbHNlIGlmICghY2hpbGQudGFnICYmICFjaGlsZC5jaGlsZHJlbiAmJiAhY2hpbGQucmF3KSBhZGRPYmplY3Qob2JqZWN0LCBjaGlsZC5uYW1lLCBmcm9tWE1MKGNoaWxkLCByZXZpdmVyKSwgY2hpbGRyZW4/LltpIC0gMV0/Lm5hbWUpXG5cdFx0XHRcdFx0XHRlbHNlIGFkZE9iamVjdChvYmplY3QsIGNoaWxkLm5hbWUsIGZyb21YTUwoY2hpbGQsIHJldml2ZXIpLCB1bmRlZmluZWQpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0aWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgYWRkT2JqZWN0KG9iamVjdCwgQ0hJTERfTk9ERV9LRVksIG51bGwsIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdGlmIChlbGVtLm5hbWUpIG9iamVjdFtlbGVtLm5hbWVdID0gKGVsZW0uaGFzQ2hpbGQgPT09IGZhbHNlKSA/IG51bGwgOiBcIlwiO1xuXHRcdFx0XHRcdFx0ZWxzZSBvYmplY3QgPSAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gbnVsbCA6IFwiXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCovXG5cblx0XHRcdFx0XHQvL2lmIChPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA9PT0gMCkgYWRkT2JqZWN0KG9iamVjdCwgZWxlbS5uYW1lLCAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gbnVsbCA6IFwiXCIpO1xuXHRcdFx0XHRcdC8vaWYgKE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID09PSAwKSBvYmplY3QgPSAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gdW5kZWZpbmVkIDogXCJcIjtcblx0XHRcdFx0XHRpZiAocmV2aXZlcikgb2JqZWN0ID0gcmV2aXZlcihuYW1lIHx8IFwiXCIsIG9iamVjdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2VBdHRyaWJ1dGUodGFnLCByZXZpdmVyKSB7XG5cdFx0XHRcdGlmICghdGFnKSByZXR1cm47XG5cdFx0XHRcdGNvbnN0IGxpc3QgPSB0YWcuc3BsaXQoLyhbXlxccz0nXCJdKyg/Olxccyo9XFxzKig/OidbXFxTXFxzXSo/J3xcIltcXFNcXHNdKj9cInxbXlxccydcIl0qKSk/KS8pO1xuXHRcdFx0XHRjb25zdCBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0bGV0IGF0dHJpYnV0ZXMsIHZhbDtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGV0IHN0ciA9IHJlbW92ZVNwYWNlcyhsaXN0W2ldKTtcblx0XHRcdFx0XHQvL2xldCBzdHIgPSByZW1vdmVCcmVha0xpbmUobGlzdFtpXSk7XG5cdFx0XHRcdFx0Ly9sZXQgc3RyID0gbGlzdFtpXT8udHJpbT8uKCk7XG5cdFx0XHRcdFx0aWYgKCFzdHIpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdFx0aWYgKCFhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVzID0ge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgcG9zID0gc3RyLmluZGV4T2YoXCI9XCIpO1xuXHRcdFx0XHRcdGlmIChwb3MgPCAwKSB7XG5cdFx0XHRcdFx0XHQvLyBiYXJlIGF0dHJpYnV0ZVxuXHRcdFx0XHRcdFx0c3RyID0gQVRUUklCVVRFX0tFWSArIHN0cjtcblx0XHRcdFx0XHRcdHZhbCA9IG51bGw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIGF0dHJpYnV0ZSBrZXkvdmFsdWUgcGFpclxuXHRcdFx0XHRcdFx0dmFsID0gc3RyLnN1YnN0cihwb3MgKyAxKS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuXHRcdFx0XHRcdFx0c3RyID0gQVRUUklCVVRFX0tFWSArIHN0ci5zdWJzdHIoMCwgcG9zKS5yZXBsYWNlKC9cXHMrJC8sIFwiXCIpO1xuXG5cdFx0XHRcdFx0XHQvLyBxdW90ZTogZm9vPVwiRk9PXCIgYmFyPSdCQVInXG5cdFx0XHRcdFx0XHRjb25zdCBmaXJzdENoYXIgPSB2YWxbMF07XG5cdFx0XHRcdFx0XHRjb25zdCBsYXN0Q2hhciA9IHZhbFt2YWwubGVuZ3RoIC0gMV07XG5cdFx0XHRcdFx0XHRpZiAoZmlyc3RDaGFyID09PSBsYXN0Q2hhciAmJiAoZmlyc3RDaGFyID09PSBcIidcIiB8fCBmaXJzdENoYXIgPT09ICdcIicpKSB7XG5cdFx0XHRcdFx0XHRcdHZhbCA9IHZhbC5zdWJzdHIoMSwgdmFsLmxlbmd0aCAtIDIpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YWwgPSB1bmVzY2FwZVhNTCh2YWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocmV2aXZlcikgdmFsID0gcmV2aXZlcihzdHIsIHZhbCk7XG5cblx0XHRcdFx0XHRhZGRPYmplY3QoYXR0cmlidXRlcywgc3RyLCB2YWwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGF0dHJpYnV0ZXM7XG5cblx0XHRcdFx0ZnVuY3Rpb24gcmVtb3ZlU3BhY2VzKHN0cikge1xuXHRcdFx0XHRcdC8vcmV0dXJuIHN0ciAmJiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdFx0XHRcdFx0cmV0dXJuIHN0cj8udHJpbT8uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYWRkT2JqZWN0KG9iamVjdCwga2V5LCB2YWwsIHByZXZLZXkgPSBrZXkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgcHJldiA9IG9iamVjdFtwcmV2S2V5XTtcblx0XHRcdFx0XHQvL2NvbnN0IGN1cnIgPSBvYmplY3Rba2V5XTtcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShwcmV2KSkgcHJldi5wdXNoKHZhbCk7XG5cdFx0XHRcdFx0ZWxzZSBpZiAocHJldikgb2JqZWN0W3ByZXZLZXldID0gW3ByZXYsIHZhbF07XG5cdFx0XHRcdFx0ZWxzZSBvYmplY3Rba2V5XSA9IHZhbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVuZXNjYXBlWE1MKHN0cikge1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC8oJig/Omx0fGd0fGFtcHxhcG9zfHF1b3R8Iyg/OlxcZHsxLDZ9fHhbMC05YS1mQS1GXXsxLDV9KSk7KS9nLCBmdW5jdGlvbiAoc3RyKSB7XG5cdFx0XHRcdGlmIChzdHJbMV0gPT09IFwiI1wiKSB7XG5cdFx0XHRcdFx0Y29uc3QgY29kZSA9IChzdHJbMl0gPT09IFwieFwiKSA/IHBhcnNlSW50KHN0ci5zdWJzdHIoMyksIDE2KSA6IHBhcnNlSW50KHN0ci5zdWJzdHIoMiksIDEwKTtcblx0XHRcdFx0XHRpZiAoY29kZSA+IC0xKSByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gVU5FU0NBUEVbc3RyXSB8fCBzdHI7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fTtcblxuXHRzdHJpbmdpZnkoanNvbiA9IG5ldyBPYmplY3QsIHRhYiA9IFwiXCIpIHtcblx0XHRjb25zdCBFU0NBUEUgPSB0aGlzLiNFU0NBUEU7XG5cdFx0Y29uc3QgQVRUUklCVVRFX0tFWSA9IHRoaXMuI0FUVFJJQlVURV9LRVk7XG5cdFx0Y29uc3QgQ0hJTERfTk9ERV9LRVkgPSB0aGlzLiNDSElMRF9OT0RFX0tFWTtcblx0XHRsZXQgWE1MID0gXCJcIjtcblx0XHRmb3IgKGxldCBlbGVtIGluIGpzb24pIFhNTCArPSB0b1htbChqc29uW2VsZW1dLCBlbGVtLCBcIlwiKTtcblx0XHRYTUwgPSB0YWIgPyBYTUwucmVwbGFjZSgvXFx0L2csIHRhYikgOiBYTUwucmVwbGFjZSgvXFx0fFxcbi9nLCBcIlwiKTtcblx0XHRyZXR1cm4gWE1MO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBGdWN0aW9ucyAqKioqKioqKioqKioqKioqKi9cblx0XHRmdW5jdGlvbiB0b1htbChFbGVtLCBOYW1lLCBJbmQpIHtcblx0XHRcdGxldCB4bWwgPSBcIlwiO1xuXHRcdFx0c3dpdGNoICh0eXBlb2YgRWxlbSkge1xuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoRWxlbSkpIHtcblx0XHRcdFx0XHRcdHhtbCA9IEVsZW0ucmVkdWNlKFxuXHRcdFx0XHRcdFx0XHQocHJldlhNTCwgY3VyclhNTCkgPT4gcHJldlhNTCArPSBgJHtJbmR9JHt0b1htbChjdXJyWE1MLCBOYW1lLCBgJHtJbmR9XFx0YCl9XFxuYCxcblx0XHRcdFx0XHRcdFx0XCJcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGV0IGF0dHJpYnV0ZSA9IFwiXCI7XG5cdFx0XHRcdFx0XHRsZXQgaGFzQ2hpbGQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGZvciAobGV0IG5hbWUgaW4gRWxlbSkge1xuXHRcdFx0XHRcdFx0XHRpZiAobmFtZVswXSA9PT0gQVRUUklCVVRFX0tFWSkge1xuXHRcdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZSArPSBgICR7bmFtZS5zdWJzdHJpbmcoMSl9PVxcXCIke0VsZW1bbmFtZV0udG9TdHJpbmcoKX1cXFwiYDtcblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgRWxlbVtuYW1lXTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChFbGVtW25hbWVdID09PSB1bmRlZmluZWQpIE5hbWUgPSBuYW1lO1xuXHRcdFx0XHRcdFx0XHRlbHNlIGhhc0NoaWxkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCR7TmFtZX0ke2F0dHJpYnV0ZX0keyhoYXNDaGlsZCB8fCBOYW1lID09PSBcImxpbmtcIikgPyBcIlwiIDogXCIvXCJ9PmA7XG5cblx0XHRcdFx0XHRcdGlmIChoYXNDaGlsZCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoTmFtZSA9PT0gXCJwbGlzdFwiKSB4bWwgKz0gdG9QbGlzdChFbGVtLCBOYW1lLCBgJHtJbmR9XFx0YCk7XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IG5hbWUgaW4gRWxlbSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ0hJTERfTk9ERV9LRVk6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0eG1sICs9IEVsZW1bbmFtZV0gPz8gXCJcIjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR4bWwgKz0gdG9YbWwoRWxlbVtuYW1lXSwgbmFtZSwgYCR7SW5kfVxcdGApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR4bWwgKz0gKHhtbC5zbGljZSgtMSkgPT09IFwiXFxuXCIgPyBJbmQgOiBcIlwiKSArIGA8LyR7TmFtZX0+YDtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdHN3aXRjaCAoTmFtZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcIj94bWxcIjpcblx0XHRcdFx0XHRcdFx0eG1sICs9IGAke0luZH08JHtOYW1lfSAke0VsZW0udG9TdHJpbmcoKX0+YDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiP1wiOlxuXHRcdFx0XHRcdFx0XHR4bWwgKz0gYCR7SW5kfTwke05hbWV9JHtFbGVtLnRvU3RyaW5nKCl9JHtOYW1lfT5gO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCIhXCI6XG5cdFx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCEtLSR7RWxlbS50b1N0cmluZygpfS0tPmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIiFET0NUWVBFXCI6XG5cdFx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCR7TmFtZX0gJHtFbGVtLnRvU3RyaW5nKCl9PmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIiFDREFUQVwiOlxuXHRcdFx0XHRcdFx0XHR4bWwgKz0gYCR7SW5kfTwhW0NEQVRBWyR7RWxlbS50b1N0cmluZygpfV1dPmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBDSElMRF9OT0RFX0tFWTpcblx0XHRcdFx0XHRcdFx0eG1sICs9IEVsZW07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0eG1sICs9IGAke0luZH08JHtOYW1lfT4ke0VsZW0udG9TdHJpbmcoKX08LyR7TmFtZX0+YDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxuXHRcdFx0XHRcdHhtbCArPSBJbmQgKyBgPCR7TmFtZS50b1N0cmluZygpfS8+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4geG1sO1xuXHRcdH07XG5cblx0XHRmdW5jdGlvbiB0b1BsaXN0KEVsZW0sIE5hbWUsIEluZCkge1xuXHRcdFx0bGV0IHBsaXN0ID0gXCJcIjtcblx0XHRcdHN3aXRjaCAodHlwZW9mIEVsZW0pIHtcblx0XHRcdFx0Y2FzZSBcImJvb2xlYW5cIjpcblx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08JHtFbGVtLnRvU3RyaW5nKCl9Lz5gO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwibnVtYmVyXCI6XG5cdFx0XHRcdFx0cGxpc3QgPSBgJHtJbmR9PHJlYWw+JHtFbGVtLnRvU3RyaW5nKCl9PC9yZWFsPmA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJiaWdpbnRcIjpcblx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08aW50ZWdlcj4ke0VsZW0udG9TdHJpbmcoKX08L2ludGVnZXI+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdHBsaXN0ID0gYCR7SW5kfTxzdHJpbmc+JHtFbGVtLnRvU3RyaW5nKCl9PC9zdHJpbmc+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0XHRcdGxldCBhcnJheSA9IFwiXCI7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoRWxlbSkpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwLCBuID0gRWxlbS5sZW5ndGg7IGkgPCBuOyBpKyspIGFycmF5ICs9IGAke0luZH0ke3RvUGxpc3QoRWxlbVtpXSwgTmFtZSwgYCR7SW5kfVxcdGApfWA7XG5cdFx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08YXJyYXk+JHthcnJheX0ke0luZH08L2FycmF5PmA7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxldCBkaWN0ID0gXCJcIjtcblx0XHRcdFx0XHRcdE9iamVjdC5lbnRyaWVzKEVsZW0pLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRkaWN0ICs9IGAke0luZH08a2V5PiR7a2V5fTwva2V5PmA7XG5cdFx0XHRcdFx0XHRcdGRpY3QgKz0gdG9QbGlzdCh2YWx1ZSwga2V5LCBJbmQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08ZGljdD4ke2RpY3R9JHtJbmR9PC9kaWN0PmA7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHJldHVybiBwbGlzdDtcblx0XHR9O1xuXHR9O1xufVxuIiwiLyoqXG4gKiBkZXRlY3QgRm9ybWF0XG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge09iamVjdH0gdXJsIC0gUGFyc2VkIFVSTFxuICogQHBhcmFtIHtTdHJpbmd9IGJvZHkgLSByZXNwb25zZSBib2R5XG4gKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdCAtIGZvcm1hdFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RGb3JtYXQodXJsLCBib2R5KSB7XG5cdGxldCBmb3JtYXQgPSB1bmRlZmluZWQ7XG5cdGNvbnNvbGUubG9nKGDimJHvuI8gZGV0ZWN0Rm9ybWF0LCBmb3JtYXQ6ICR7dXJsLmZvcm1hdCA/PyB1cmwucXVlcnk/LmZtdCA/PyB1cmwucXVlcnk/LmZvcm1hdH1gLCBcIlwiKTtcblx0c3dpdGNoICh1cmwuZm9ybWF0ID8/IHVybC5xdWVyeT8uZm10ID8/IHVybC5xdWVyeT8uZm9ybWF0KSB7XG5cdFx0Y2FzZSBcInR4dFwiOlxuXHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3BsYWluXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwieG1sXCI6XG5cdFx0Y2FzZSBcInNydjNcIjpcblx0XHRjYXNlIFwidHRtbFwiOlxuXHRcdGNhc2UgXCJ0dG1sMlwiOlxuXHRcdGNhc2UgXCJpbXNjXCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQveG1sXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwidnR0XCI6XG5cdFx0Y2FzZSBcIndlYnZ0dFwiOlxuXHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImpzb25cIjpcblx0XHRjYXNlIFwianNvbjNcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIm0zdVwiOlxuXHRcdGNhc2UgXCJtM3U4XCI6XG5cdFx0XHRmb3JtYXQgPSBcImFwcGxpY2F0aW9uL3gtbXBlZ3VybFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcInBsaXN0XCI6XG5cdFx0XHRmb3JtYXQgPSBcImFwcGxpY2F0aW9uL3BsaXN0XCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdGNvbnN0IEhFQURFUiA9IGJvZHk/LnN1YnN0cmluZz8uKDAsIDYpLnRyaW0/LigpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhg8J+apyBkZXRlY3RGb3JtYXQsIEhFQURFUjogJHtIRUFERVJ9YCwgXCJcIik7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGDwn5qnIGRldGVjdEZvcm1hdCwgSEVBREVSPy5zdWJzdHJpbmc/LigwLCAxKTogJHtIRUFERVI/LnN1YnN0cmluZz8uKDAsIDEpfWAsIFwiXCIpO1xuXHRcdFx0c3dpdGNoIChIRUFERVIpIHtcblx0XHRcdFx0Y2FzZSBcIjw/eG1sXCI6XG5cdFx0XHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3htbFwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiV0VCVlRUXCI6XG5cdFx0XHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHN3aXRjaCAoSEVBREVSPy5zdWJzdHJpbmc/LigwLCAxKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcIjBcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCIxXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiMlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjNcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI0XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiNVwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI3XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiOFwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjlcIjpcblx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJ7XCI6XG5cdFx0XHRcdFx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0YnJlYWs7XG5cdH07XG5cdGNvbnNvbGUubG9nKGDinIUgZGV0ZWN0Rm9ybWF0LCBmb3JtYXQ6ICR7Zm9ybWF0fWAsIFwiXCIpO1xuXHRyZXR1cm4gZm9ybWF0O1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGVjdFBsYXRmb3JtKHVybCkge1xuXHRjb25zb2xlLmxvZyhg4piR77iPIERldGVjdCBQbGF0Zm9ybWAsIFwiXCIpO1xuXHQvKioqKioqKioqKioqKioqKiogUGxhdGZvcm0gKioqKioqKioqKioqKioqKiovXG5cdGxldCBQbGF0Zm9ybSA9IC9cXC4obmV0ZmxpeFxcLmNvbXxuZmx4dmlkZW9cXC5uZXQpL2kudGVzdCh1cmwpID8gXCJOZXRmbGl4XCJcblx0XHQ6IC8oXFwueW91dHViZXx5b3V0dWJlaVxcLmdvb2dsZWFwaXMpXFwuY29tL2kudGVzdCh1cmwpID8gXCJZb3VUdWJlXCJcblx0XHRcdDogL1xcLnNwb3RpZnkoY2RuKT9cXC5jb20vaS50ZXN0KHVybCkgPyBcIlNwb3RpZnlcIlxuXHRcdFx0XHQ6IC9cXC5hcHBsZVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiQXBwbGVcIlxuXHRcdFx0XHRcdDogL1xcLihkc3NvdHR8c3Rhcm90dClcXC5jb20vaS50ZXN0KHVybCkgPyBcIkRpc25leStcIlxuXHRcdFx0XHRcdFx0OiAvKFxcLihwdi1jZG58YWl2LWNkbnxha2FtYWloZHxjbG91ZGZyb250KVxcLm5ldCl8czNcXC5hbWF6b25hd3NcXC5jb21cXC9haXYtcHJvZC10aW1lZHRleHRcXC8vaS50ZXN0KHVybCkgPyBcIlByaW1lVmlkZW9cIlxuXHRcdFx0XHRcdFx0XHQ6IC9wcmRcXC5tZWRpYVxcLmgyNjRcXC5pby9pLnRlc3QodXJsKSA/IFwiTWF4XCJcblx0XHRcdFx0XHRcdFx0XHQ6IC9cXC4oYXBpXFwuaGJvfGhib21heGNkbilcXC5jb20vaS50ZXN0KHVybCkgPyBcIkhCT01heFwiXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC4oaHVsdXN0cmVhbXxodWx1aW0pXFwuY29tL2kudGVzdCh1cmwpID8gXCJIdWx1XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwuKGNic2FhdmlkZW98Y2JzaXZpZGVvfGNicylcXC5jb20vaS50ZXN0KHVybCkgPyBcIlBhcmFtb3VudCtcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLnVwbHlua1xcLmNvbS9pLnRlc3QodXJsKSA/IFwiRGlzY292ZXJ5K1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9kcGx1cy1waC0vaS50ZXN0KHVybCkgPyBcIkRpc2NvdmVyeStQaFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLnBlYWNvY2t0dlxcLmNvbS9pLnRlc3QodXJsKSA/IFwiUGVhY29ja1RWXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC5mdWJvXFwudHYvaS50ZXN0KHVybCkgPyBcIkZ1Ym9UVlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC52aWtpXFwuaW8vaS50ZXN0KHVybCkgPyBcIlZpa2lcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC8oZXBpeGhsc1xcLmFrYW1haXplZFxcLm5ldHxlcGl4XFwuc2VydmljZXNcXC5pbykvaS50ZXN0KHVybCkgPyBcIk1HTStcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLm5lYnVsYVxcLmFwcHwvaS50ZXN0KHVybCkgPyBcIk5lYnVsYVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IFwiVW5pdmVyc2FsXCI7XG4gICAgY29uc29sZS5sb2coYOKchSBEZXRlY3QgUGxhdGZvcm0sIFBsYXRmb3JtOiAke1BsYXRmb3JtfWAsIFwiXCIpO1xuXHRyZXR1cm4gUGxhdGZvcm07XG59O1xuIiwiLypcblJFQURNRTogaHR0cHM6Ly9naXRodWIuY29tL0R1YWxTdWJzXG4qL1xuXG5pbXBvcnQgRU5WcyBmcm9tIFwiLi4vRU5WL0VOVi5tanNcIjtcbmNvbnN0ICQgPSBuZXcgRU5WcyhcIvCfjb/vuI8gRHVhbFN1YnM6IFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNcIik7XG5cbi8qKlxuICogU2V0IEVudmlyb25tZW50IFZhcmlhYmxlc1xuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBQZXJzaXN0ZW50IFN0b3JlIEtleVxuICogQHBhcmFtIHtBcnJheX0gcGxhdGZvcm1zIC0gUGxhdGZvcm0gTmFtZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhYmFzZSAtIERlZmF1bHQgRGF0YUJhc2VcbiAqIEByZXR1cm4ge09iamVjdH0geyBTZXR0aW5ncywgQ2FjaGVzLCBDb25maWdzIH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0RU5WKG5hbWUsIHBsYXRmb3JtcywgZGF0YWJhc2UpIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX1gLCBcIlwiKTtcblx0bGV0IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9ID0gJC5nZXRFTlYobmFtZSwgcGxhdGZvcm1zLCBkYXRhYmFzZSk7XG5cdC8qKioqKioqKioqKioqKioqKiBTZXR0aW5ncyAqKioqKioqKioqKioqKioqKi9cblx0aWYgKCFBcnJheS5pc0FycmF5KFNldHRpbmdzPy5UeXBlcykpIFNldHRpbmdzLlR5cGVzID0gKFNldHRpbmdzLlR5cGVzKSA/IFtTZXR0aW5ncy5UeXBlc10gOiBbXTsgLy8g5Y+q5pyJ5LiA5Liq6YCJ6aG55pe277yM5peg6YCX5Y+35YiG6ZqUXG5cdGlmICgkLmlzTG9vbigpICYmIHBsYXRmb3Jtcy5pbmNsdWRlcyhcIllvdVR1YmVcIikpIHtcblx0XHRTZXR0aW5ncy5BdXRvQ0MgPSAkcGVyc2lzdGVudFN0b3JlLnJlYWQoXCLoh6rliqjmmL7npLrnv7vor5HlrZfluZVcIikgPz8gU2V0dGluZ3MuQXV0b0NDO1xuXHRcdHN3aXRjaCAoU2V0dGluZ3MuQXV0b0NDKSB7XG5cdFx0XHRjYXNlIFwi5pivXCI6XG5cdFx0XHRcdFNldHRpbmdzLkF1dG9DQyA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIuWQplwiOlxuXHRcdFx0XHRTZXR0aW5ncy5BdXRvQ0MgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHRcdFNldHRpbmdzLlNob3dPbmx5ID0gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKFwi5LuF6L6T5Ye66K+R5paHXCIpID8/IFNldHRpbmdzLlNob3dPbmx5O1xuXHRcdHN3aXRjaCAoU2V0dGluZ3MuU2hvd09ubHkpIHtcblx0XHRcdGNhc2UgXCLmmK9cIjpcblx0XHRcdFx0U2V0dGluZ3MuU2hvd09ubHkgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCLlkKZcIjpcblx0XHRcdFx0U2V0dGluZ3MuU2hvd09ubHkgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHRcdFNldHRpbmdzLlBvc2l0aW9uID0gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKFwi5a2X5bmV6K+R5paH5L2N572uXCIpID8/IFNldHRpbmdzLlBvc2l0aW9uO1xuXHRcdHN3aXRjaCAoU2V0dGluZ3MuUG9zaXRpb24pIHtcblx0XHRcdGNhc2UgXCLor5HmlofkvY3kuo7lpJbmlofkuYvkuIpcIjpcblx0XHRcdFx0U2V0dGluZ3MuUG9zaXRpb24gPSBcIkZvcndhcmRcIjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwi6K+R5paH5L2N5LqO5aSW5paH5LmL5LiLXCI6XG5cdFx0XHRcdFNldHRpbmdzLlBvc2l0aW9uID0gXCJSZXZlcnNlXCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0fTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgU2V0dGluZ3M6ICR7dHlwZW9mIFNldHRpbmdzfWAsIGBTZXR0aW5nc+WGheWuuTogJHtKU09OLnN0cmluZ2lmeShTZXR0aW5ncyl9YCwgXCJcIik7XG5cdC8qKioqKioqKioqKioqKioqKiBDYWNoZXMgKioqKioqKioqKioqKioqKiovXG5cdC8vJC5sb2coYOKchSAkeyQubmFtZX0sIFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgQ2FjaGVzOiAke3R5cGVvZiBDYWNoZXN9YCwgYENhY2hlc+WGheWuuTogJHtKU09OLnN0cmluZ2lmeShDYWNoZXMpfWAsIFwiXCIpO1xuXHRpZiAodHlwZW9mIENhY2hlcz8uUGxheWxpc3RzICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkoQ2FjaGVzPy5QbGF5bGlzdHMpKSBDYWNoZXMuUGxheWxpc3RzID0ge307IC8vIOWIm+W7ulBsYXlsaXN0c+e8k+WtmFxuXHRDYWNoZXMuUGxheWxpc3RzLk1hc3RlciA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/LlBsYXlsaXN0cz8uTWFzdGVyIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0Q2FjaGVzLlBsYXlsaXN0cy5TdWJ0aXRsZSA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/LlBsYXlsaXN0cz8uU3VidGl0bGUgfHwgXCJbXVwiKSk7IC8vIFN0cmluZ3PovaxBcnJheei9rE1hcFxuXHRpZiAodHlwZW9mIENhY2hlcz8uU3VidGl0bGVzICE9PSBcIm9iamVjdFwiKSBDYWNoZXMuU3VidGl0bGVzID0gbmV3IE1hcChKU09OLnBhcnNlKENhY2hlcz8uU3VidGl0bGVzIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0aWYgKHR5cGVvZiBDYWNoZXM/Lk1ldGFkYXRhcyAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KENhY2hlcz8uTWV0YWRhdGFzKSkgQ2FjaGVzLk1ldGFkYXRhcyA9IHt9OyAvLyDliJvlu7pQbGF5bGlzdHPnvJPlrZhcblx0aWYgKHR5cGVvZiBDYWNoZXM/Lk1ldGFkYXRhcz8uVHJhY2tzICE9PSBcIm9iamVjdFwiKSBDYWNoZXMuTWV0YWRhdGFzLlRyYWNrcyA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/Lk1ldGFkYXRhcz8uVHJhY2tzIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0LyoqKioqKioqKioqKioqKioqIENvbmZpZ3MgKioqKioqKioqKioqKioqKiovXG5cdHJldHVybiB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9TdWJ0aXRsZXMuVHJhbnNsYXRlLnJlc3BvbnNlLmJldGEuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=