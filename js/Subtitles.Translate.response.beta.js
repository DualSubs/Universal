/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Subtitles.Translate.response.beta.js":
/*!**************************************************!*\
  !*** ./src/Subtitles.Translate.response.beta.js ***!
  \**************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

var _database_Default_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache;
var _database_Universal_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache;
var _database_YouTube_json__WEBPACK_IMPORTED_MODULE_9___namespace_cache;
var _database_Netflix_json__WEBPACK_IMPORTED_MODULE_10___namespace_cache;
var _database_Spotify_json__WEBPACK_IMPORTED_MODULE_11___namespace_cache;
var _database_Composite_json__WEBPACK_IMPORTED_MODULE_12___namespace_cache;
var _database_Translate_json__WEBPACK_IMPORTED_MODULE_13___namespace_cache;
var _database_External_json__WEBPACK_IMPORTED_MODULE_14___namespace_cache;
var _database_API_json__WEBPACK_IMPORTED_MODULE_15___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ENV/ENV.mjs */ "./src/ENV/ENV.mjs");
/* harmony import */ var _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./URI/URI.mjs */ "./src/URI/URI.mjs");
/* harmony import */ var _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./XML/XML.mjs */ "./src/XML/XML.mjs");
/* harmony import */ var _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WebVTT/WebVTT.mjs */ "./src/WebVTT/WebVTT.mjs");
/* harmony import */ var _function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function/setENV.mjs */ "./src/function/setENV.mjs");
/* harmony import */ var _function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./function/detectPlatform.mjs */ "./src/function/detectPlatform.mjs");
/* harmony import */ var _function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./function/detectFormat.mjs */ "./src/function/detectFormat.mjs");
/* harmony import */ var _database_Default_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./database/Default.json */ "./src/database/Default.json");
/* harmony import */ var _database_Universal_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./database/Universal.json */ "./src/database/Universal.json");
/* harmony import */ var _database_YouTube_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./database/YouTube.json */ "./src/database/YouTube.json");
/* harmony import */ var _database_Netflix_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./database/Netflix.json */ "./src/database/Netflix.json");
/* harmony import */ var _database_Spotify_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./database/Spotify.json */ "./src/database/Spotify.json");
/* harmony import */ var _database_Composite_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./database/Composite.json */ "./src/database/Composite.json");
/* harmony import */ var _database_Translate_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./database/Translate.json */ "./src/database/Translate.json");
/* harmony import */ var _database_External_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./database/External.json */ "./src/database/External.json");
/* harmony import */ var _database_API_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./database/API.json */ "./src/database/API.json");
/* module decorator */ module = __webpack_require__.hmd(module);
/*
README: https://github.com/DualSubs
*/




















const $ = new _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("🍿️ DualSubs: 🔣 Universal v1.2.6(1) Translator.response.beta");
const URI = new _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]();
const XML = new _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]();
const VTT = new _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_3__["default"](["milliseconds", "timeStamp", "singleLine", "\n"]); // "multiLine"
const DataBase = {
	"Default": /*#__PURE__*/ (_database_Default_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache || (_database_Default_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache = __webpack_require__.t(_database_Default_json__WEBPACK_IMPORTED_MODULE_7__, 2))),
	"Universal": /*#__PURE__*/ (_database_Universal_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache || (_database_Universal_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache = __webpack_require__.t(_database_Universal_json__WEBPACK_IMPORTED_MODULE_8__, 2))),
	"YouTube": /*#__PURE__*/ (_database_YouTube_json__WEBPACK_IMPORTED_MODULE_9___namespace_cache || (_database_YouTube_json__WEBPACK_IMPORTED_MODULE_9___namespace_cache = __webpack_require__.t(_database_YouTube_json__WEBPACK_IMPORTED_MODULE_9__, 2))),
	"Netflix": /*#__PURE__*/ (_database_Netflix_json__WEBPACK_IMPORTED_MODULE_10___namespace_cache || (_database_Netflix_json__WEBPACK_IMPORTED_MODULE_10___namespace_cache = __webpack_require__.t(_database_Netflix_json__WEBPACK_IMPORTED_MODULE_10__, 2))),
	"Spotify": /*#__PURE__*/ (_database_Spotify_json__WEBPACK_IMPORTED_MODULE_11___namespace_cache || (_database_Spotify_json__WEBPACK_IMPORTED_MODULE_11___namespace_cache = __webpack_require__.t(_database_Spotify_json__WEBPACK_IMPORTED_MODULE_11__, 2))),
	"Composite": /*#__PURE__*/ (_database_Composite_json__WEBPACK_IMPORTED_MODULE_12___namespace_cache || (_database_Composite_json__WEBPACK_IMPORTED_MODULE_12___namespace_cache = __webpack_require__.t(_database_Composite_json__WEBPACK_IMPORTED_MODULE_12__, 2))),
	"Translate": /*#__PURE__*/ (_database_Translate_json__WEBPACK_IMPORTED_MODULE_13___namespace_cache || (_database_Translate_json__WEBPACK_IMPORTED_MODULE_13___namespace_cache = __webpack_require__.t(_database_Translate_json__WEBPACK_IMPORTED_MODULE_13__, 2))),
	"External": /*#__PURE__*/ (_database_External_json__WEBPACK_IMPORTED_MODULE_14___namespace_cache || (_database_External_json__WEBPACK_IMPORTED_MODULE_14___namespace_cache = __webpack_require__.t(_database_External_json__WEBPACK_IMPORTED_MODULE_14__, 2))),
	"External": /*#__PURE__*/ (_database_API_json__WEBPACK_IMPORTED_MODULE_15___namespace_cache || (_database_API_json__WEBPACK_IMPORTED_MODULE_15___namespace_cache = __webpack_require__.t(_database_API_json__WEBPACK_IMPORTED_MODULE_15__, 2))),
};

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
	const { Settings, Caches, Configs } = (0,_function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__["default"])("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Translate", "API"], DataBase);
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
					const translation = await Translation(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
					const translation = await Translation(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
								const translation = await Translation(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
											const translation = await Translation(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
							const translation = await Translation(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
										const translation = await Translation(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
													const translation = await Translation(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
									const translation = await Translation(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
 * Translation
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
async function Translation(text = [], method = "Part", vendor = "Google", source = "EN", target = "ZH", API = {}, database = {}, times = 3, interval = 100, exponential = true) {
	$.log(`☑️ ${$.name}, Translation, method: ${method}, vendor: ${vendor}, source: ${source}, target: ${target}`, "");
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
	//$.log(`✅ ${$.name}, Translation, Translation: ${JSON.stringify(Translation)}`, "");
	$.log(`✅ ${$.name}, Translation`, "");
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
async function Translator(vendor = "Google", source = "", target = "", text = "", api = {}, database) {
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
		this.name = `${name}, ENV v1.0.0`
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
		this.log('', `🏁 ${this.name}, 开始!`)
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
			$.log(`🚧 ${$.name}`, `detectFormat, HEADER: ${HEADER}`, "");
			$.log(`🚧 ${$.name}`, `detectFormat, HEADER?.substring?.(0, 1): ${HEADER?.substring?.(0, 1)}`, "");
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

/***/ "./src/database/API.json":
/*!*******************************!*\
  !*** ./src/database/API.json ***!
  \*******************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Settings":{"GoogleCloud":{"Version":"v2","Mode":"Key","Auth":""},"Microsoft":{"Version":"Azure","Mode":"Token","Region":"","Auth":""},"DeepL":{"Version":"Free","Auth":""},"DeepLX":{"Endpoint":"","Auth":""},"URL":"","NeteaseMusic":{"PhoneNumber":"","Password":""}}}');

/***/ }),

/***/ "./src/database/Composite.json":
/*!*************************************!*\
  !*** ./src/database/Composite.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Settings":{"CacheSize":20,"ShowOnly":false,"Position":"Reverse","Offset":0,"Tolerance":1000}}');

/***/ }),

/***/ "./src/database/Default.json":
/*!***********************************!*\
  !*** ./src/database/Default.json ***!
  \***********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Settings":{"Switch":true,"Type":"Translate","Types":["Official","Translate"],"Languages":["EN","ZH"],"CacheSize":50},"Configs":{"breakLine":{"text/xml":"&#x000A;","application/xml":"&#x000A;","text/vtt":"\\n","application/vtt":"\\n","text/json":"\\n","application/json":"\\n"}}}');

/***/ }),

/***/ "./src/database/External.json":
/*!************************************!*\
  !*** ./src/database/External.json ***!
  \************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Settings":{"SubVendor":"URL","LrcVendor":"QQMusic","CacheSize":50}}');

/***/ }),

/***/ "./src/database/Netflix.json":
/*!***********************************!*\
  !*** ./src/database/Netflix.json ***!
  \***********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Settings":{"Switch":true,"Type":"Translate","Languages":["AUTO","ZH"]},"Configs":{"Languages":{"AR":"ar","CS":"cs","DA":"da","DE":"de","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","FI":"fi","FR":"fr","HE":"he","HR":"hr","HU":"hu","ID":"id","IT":"it","JA":"ja","KO":"ko","MS":"ms","NB":"nb","NL":"nl","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SV":"sv","TH":"th","TR":"tr","UK":"uk","VI":"vi","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"}}}');

/***/ }),

/***/ "./src/database/Spotify.json":
/*!***********************************!*\
  !*** ./src/database/Spotify.json ***!
  \***********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Settings":{"Switch":true,"Types":["Translate","External"],"Languages":["AUTO","ZH"]}}');

/***/ }),

/***/ "./src/database/Translate.json":
/*!*************************************!*\
  !*** ./src/database/Translate.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Settings":{"Vendor":"Google","ShowOnly":false,"Position":"Forward","CacheSize":10,"Method":"Part","Times":3,"Interval":500,"Exponential":true},"Configs":{"Languages":{"Google":{"AUTO":"auto","AF":"af","AM":"am","AR":"ar","AS":"as","AY":"ay","AZ":"az","BG":"bg","BE":"be","BM":"bm","BN":"bn","BHO":"bho","CS":"cs","DA":"da","DE":"de","EL":"el","EU":"eu","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","FR-CA":"fr","HU":"hu","IS":"is","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","PA":"pa","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SQ":"sq","ST":"st","SV":"sv","TH":"th","TR":"tr","UK":"uk","UR":"ur","VI":"vi","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"},"Microsoft":{"AUTO":"","AF":"af","AM":"am","AR":"ar","AS":"as","AY":"ay","AZ":"az","BG":"bg","BE":"be","BM":"bm","BN":"bn","BHO":"bho","CS":"cs","DA":"da","DE":"de","EL":"el","EU":"eu","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","FR-CA":"fr-ca","HU":"hu","IS":"is","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-pt","PT-BR":"pt","PA":"pa","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SQ":"sq","ST":"st","SV":"sv","TH":"th","TR":"tr","UK":"uk","UR":"ur","VI":"vi","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"},"DeepL":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN","EN-GB":"EN-GB","EN-US":"EN-US","EN-US SDH":"EN-US","ES":"ES","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT","PT-PT":"PT-PT","PT-BR":"PT-BR","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","TR":"TR","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}}}}');

/***/ }),

/***/ "./src/database/Universal.json":
/*!*************************************!*\
  !*** ./src/database/Universal.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Settings":{"Switch":true,"Types":["Official","Translate"],"Languages":["EN","ZH"]},"Configs":{"Languages":{"AUTO":"","AR":["ar","ar-001"],"BG":["bg","bg-BG","bul"],"CS":["cs","cs-CZ","ces"],"DA":["da","da-DK","dan"],"DE":["de","de-DE","deu"],"EL":["el","el-GR","ell"],"EN":["en","en-US","eng","en-GB","en-UK","en-CA","en-US SDH"],"EN-CA":["en-CA","en","eng"],"EN-GB":["en-UK","en","eng"],"EN-US":["en-US","en","eng"],"EN-US SDH":["en-US SDH","en-US","en","eng"],"ES":["es","es-419","es-ES","spa","es-419 SDH"],"ES-419":["es-419","es","spa"],"ES-419 SDH":["es-419 SDH","es-419","es","spa"],"ES-ES":["es-ES","es","spa"],"ET":["et","et-EE","est"],"FI":["fi","fi-FI","fin"],"FR":["fr","fr-CA","fr-FR","fra"],"FR-CA":["fr-CA","fr","fra"],"FR-DR":["fr-FR","fr","fra"],"HU":["hu","hu-HU","hun"],"ID":["id","id-id"],"IT":["it","it-IT","ita"],"JA":["ja","ja-JP","jpn"],"KO":["ko","ko-KR","kor"],"LT":["lt","lt-LT","lit"],"LV":["lv","lv-LV","lav"],"NL":["nl","nl-NL","nld"],"NO":["no","nb-NO","nor"],"PL":["pl","pl-PL"],"PT":["pt","pt-PT","pt-BR","por"],"PT-PT":["pt-PT","pt","por"],"PT-BR":["pt-BR","pt","por"],"RO":["ro","ro-RO","ron"],"RU":["ru","ru-RU","rus"],"SK":["sk","sk-SK","slk"],"SL":["sl","sl-SI","slv"],"SV":["sv","sv-SE","swe"],"IS":["is","is-IS","isl"],"ZH":["zh","cmn","zho","zh-CN","zh-Hans","cmn-Hans","zh-TW","zh-Hant","cmn-Hant","zh-HK","yue-Hant","yue"],"ZH-CN":["zh-CN","zh-Hans","cmn-Hans","zho"],"ZH-HANS":["zh-Hans","cmn-Hans","zh-CN","zho"],"ZH-HK":["zh-HK","yue-Hant","yue","zho"],"ZH-TW":["zh-TW","zh-Hant","cmn-Hant","zho"],"ZH-HANT":["zh-Hant","cmn-Hant","zh-TW","zho"],"YUE":["yue","yue-Hant","zh-HK","zho"],"YUE-HK":["yue-Hant","yue","zh-HK","zho"]}}}');

/***/ }),

/***/ "./src/database/YouTube.json":
/*!***********************************!*\
  !*** ./src/database/YouTube.json ***!
  \***********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Settings":{"Switch":true,"Type":"Official","Types":["Translate","External"],"Languages":["AUTO","ZH"],"AutoCC":true,"ShowOnly":false},"Configs":{"Languages":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IS":"is-IS","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","YUE":"yue","YUE-HK":"yue-HK","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW"},"translationLanguages":{"DESKTOP":[{"languageCode":"sq","languageName":{"simpleText":"Shqip - 阿尔巴尼亚语"}},{"languageCode":"ak","languageName":{"simpleText":"Ákán - 阿肯语"}},{"languageCode":"ar","languageName":{"simpleText":"العربية - 阿拉伯语"}},{"languageCode":"am","languageName":{"simpleText":"አማርኛ - 阿姆哈拉语"}},{"languageCode":"as","languageName":{"simpleText":"অসমীয়া - 阿萨姆语"}},{"languageCode":"az","languageName":{"simpleText":"آذربايجان ديلی - 阿塞拜疆语"}},{"languageCode":"ee","languageName":{"simpleText":"Èʋegbe - 埃维语"}},{"languageCode":"ay","languageName":{"simpleText":"Aymar aru - 艾马拉语"}},{"languageCode":"ga","languageName":{"simpleText":"Gaeilge - 爱尔兰语"}},{"languageCode":"et","languageName":{"simpleText":"Eesti - 爱沙尼亚语"}},{"languageCode":"or","languageName":{"simpleText":"ଓଡ଼ିଆ - 奥里亚语"}},{"languageCode":"om","languageName":{"simpleText":"Afaan Oromoo - 奥罗莫语"}},{"languageCode":"eu","languageName":{"simpleText":"Euskara - 巴斯克语"}},{"languageCode":"be","languageName":{"simpleText":"Беларуская - 白俄罗斯语"}},{"languageCode":"bg","languageName":{"simpleText":"Български - 保加利亚语"}},{"languageCode":"nso","languageName":{"simpleText":"Sesotho sa Leboa - 北索托语"}},{"languageCode":"is","languageName":{"simpleText":"Íslenska - 冰岛语"}},{"languageCode":"pl","languageName":{"simpleText":"Polski - 波兰语"}},{"languageCode":"bs","languageName":{"simpleText":"Bosanski - 波斯尼亚语"}},{"languageCode":"fa","languageName":{"simpleText":"فارسی - 波斯语"}},{"languageCode":"bho","languageName":{"simpleText":"भोजपुरी - 博杰普尔语"}},{"languageCode":"ts","languageName":{"simpleText":"Xitsonga - 聪加语"}},{"languageCode":"tt","languageName":{"simpleText":"Татарча - 鞑靼语"}},{"languageCode":"da","languageName":{"simpleText":"Dansk - 丹麦语"}},{"languageCode":"de","languageName":{"simpleText":"Deutsch - 德语"}},{"languageCode":"dv","languageName":{"simpleText":"ދިވެހިބަސް - 迪维希语"}},{"languageCode":"ru","languageName":{"simpleText":"Русский - 俄语"}},{"languageCode":"fr","languageName":{"simpleText":"français - 法语"}},{"languageCode":"sa","languageName":{"simpleText":"संस्कृतम् - 梵语"}},{"languageCode":"fil","languageName":{"simpleText":"Filipino - 菲律宾语"}},{"languageCode":"fi","languageName":{"simpleText":"suomi - 芬兰语"}},{"languageCode":"km","languageName":{"simpleText":"ភាសាខ្មែរ - 高棉语"}},{"languageCode":"ka","languageName":{"simpleText":"ქართული - 格鲁吉亚语"}},{"languageCode":"gu","languageName":{"simpleText":"ગુજરાતી - 古吉拉特语"}},{"languageCode":"gn","languageName":{"simpleText":"Avañe\'ẽ - 瓜拉尼语"}},{"languageCode":"kk","languageName":{"simpleText":"Қазақ тілі - 哈萨克语"}},{"languageCode":"ht","languageName":{"simpleText":"Kreyòl ayisyen - 海地克里奥尔语"}},{"languageCode":"ko","languageName":{"simpleText":"한국어 - 韩语"}},{"languageCode":"ha","languageName":{"simpleText":"هَوُسَ - 豪萨语"}},{"languageCode":"nl","languageName":{"simpleText":"Nederlands - 荷兰语"}},{"languageCode":"gl","languageName":{"simpleText":"Galego - 加利西亚语"}},{"languageCode":"ca","languageName":{"simpleText":"català - 加泰罗尼亚语"}},{"languageCode":"cs","languageName":{"simpleText":"čeština - 捷克语"}},{"languageCode":"kn","languageName":{"simpleText":"ಕನ್ನಡ - 卡纳达语"}},{"languageCode":"ky","languageName":{"simpleText":"кыргыз тили - 吉尔吉斯语"}},{"languageCode":"xh","languageName":{"simpleText":"isiXhosa - 科萨语"}},{"languageCode":"co","languageName":{"simpleText":"corsu - 科西嘉语"}},{"languageCode":"hr","languageName":{"simpleText":"hrvatski - 克罗地亚语"}},{"languageCode":"qu","languageName":{"simpleText":"Runa Simi - 克丘亚语"}},{"languageCode":"ku","languageName":{"simpleText":"Kurdî - 库尔德语"}},{"languageCode":"la","languageName":{"simpleText":"lingua latīna - 拉丁语"}},{"languageCode":"lv","languageName":{"simpleText":"latviešu valoda - 拉脱维亚语"}},{"languageCode":"lo","languageName":{"simpleText":"ພາສາລາວ - 老挝语"}},{"languageCode":"lt","languageName":{"simpleText":"lietuvių kalba - 立陶宛语"}},{"languageCode":"ln","languageName":{"simpleText":"lingála - 林加拉语"}},{"languageCode":"lg","languageName":{"simpleText":"Luganda - 卢干达语"}},{"languageCode":"lb","languageName":{"simpleText":"Lëtzebuergesch - 卢森堡语"}},{"languageCode":"rw","languageName":{"simpleText":"Kinyarwanda - 卢旺达语"}},{"languageCode":"ro","languageName":{"simpleText":"Română - 罗马尼亚语"}},{"languageCode":"mt","languageName":{"simpleText":"Malti - 马耳他语"}},{"languageCode":"mr","languageName":{"simpleText":"मराठी - 马拉地语"}},{"languageCode":"mg","languageName":{"simpleText":"Malagasy - 马拉加斯语"}},{"languageCode":"ml","languageName":{"simpleText":"മലയാളം - 马拉雅拉姆语"}},{"languageCode":"ms","languageName":{"simpleText":"bahasa Melayu - 马来语"}},{"languageCode":"mk","languageName":{"simpleText":"македонски јазик - 马其顿语"}},{"languageCode":"mi","languageName":{"simpleText":"te reo Māori - 毛利语"}},{"languageCode":"mn","languageName":{"simpleText":"Монгол хэл - 蒙古语"}},{"languageCode":"bn","languageName":{"simpleText":"বাংলা - 孟加拉语"}},{"languageCode":"my","languageName":{"simpleText":"ဗမာစာ - 缅甸语"}},{"languageCode":"hmn","languageName":{"simpleText":"Hmoob - 苗语"}},{"languageCode":"af","languageName":{"simpleText":"Afrikaans - 南非荷兰语"}},{"languageCode":"st","languageName":{"simpleText":"Sesotho - 南索托语"}},{"languageCode":"ne","languageName":{"simpleText":"नेपाली - 尼泊尔语"}},{"languageCode":"no","languageName":{"simpleText":"Norsk - 挪威语"}},{"languageCode":"pa","languageName":{"simpleText":"ਪੰਜਾਬੀ - 旁遮普语"}},{"languageCode":"pt","languageName":{"simpleText":"Português - 葡萄牙语"}},{"languageCode":"ps","languageName":{"simpleText":"پښتو - 普什图语"}},{"languageCode":"ny","languageName":{"simpleText":"chiCheŵa - 齐切瓦语"}},{"languageCode":"ja","languageName":{"simpleText":"日本語 - 日语"}},{"languageCode":"sv","languageName":{"simpleText":"Svenska - 瑞典语"}},{"languageCode":"sm","languageName":{"simpleText":"Gagana fa\'a Samoa - 萨摩亚语"}},{"languageCode":"sr","languageName":{"simpleText":"Српски језик - 塞尔维亚语"}},{"languageCode":"si","languageName":{"simpleText":"සිංහල - 僧伽罗语"}},{"languageCode":"sn","languageName":{"simpleText":"ChiShona - 绍纳语"}},{"languageCode":"eo","languageName":{"simpleText":"Esperanto - 世界语"}},{"languageCode":"sk","languageName":{"simpleText":"slovenčina - 斯洛伐克语"}},{"languageCode":"sl","languageName":{"simpleText":"slovenščina - 斯洛文尼亚语"}},{"languageCode":"sw","languageName":{"simpleText":"Kiswahili - 斯瓦希里语"}},{"languageCode":"gd","languageName":{"simpleText":"Gàidhlig - 苏格兰盖尔语"}},{"languageCode":"ceb","languageName":{"simpleText":"Binisaya - 宿务语"}},{"languageCode":"so","languageName":{"simpleText":"Soomaaliga - 索马里语"}},{"languageCode":"tg","languageName":{"simpleText":"тоҷикӣ - 塔吉克语"}},{"languageCode":"te","languageName":{"simpleText":"తెలుగు - 泰卢固语"}},{"languageCode":"ta","languageName":{"simpleText":"தமிழ் - 泰米尔语"}},{"languageCode":"th","languageName":{"simpleText":"ไทย - 泰语"}},{"languageCode":"ti","languageName":{"simpleText":"ትግርኛ - 提格利尼亚语"}},{"languageCode":"tr","languageName":{"simpleText":"Türkçe - 土耳其语"}},{"languageCode":"tk","languageName":{"simpleText":"Türkmen - 土库曼语"}},{"languageCode":"cy","languageName":{"simpleText":"Cymraeg - 威尔士语"}},{"languageCode":"ug","languageName":{"simpleText":"ئۇيغۇرچە - 维吾尔语"}},{"languageCode":"und","languageName":{"simpleText":"Unknown - 未知语言"}},{"languageCode":"ur","languageName":{"simpleText":"اردو - 乌尔都语"}},{"languageCode":"uk","languageName":{"simpleText":"українська - 乌克兰语"}},{"languageCode":"uz","languageName":{"simpleText":"O\'zbek - 乌兹别克语"}},{"languageCode":"es","languageName":{"simpleText":"Español - 西班牙语"}},{"languageCode":"fy","languageName":{"simpleText":"Frysk - 西弗里西亚语"}},{"languageCode":"iw","languageName":{"simpleText":"עברית - 希伯来语"}},{"languageCode":"el","languageName":{"simpleText":"Ελληνικά - 希腊语"}},{"languageCode":"haw","languageName":{"simpleText":"ʻŌlelo Hawaiʻi - 夏威夷语"}},{"languageCode":"sd","languageName":{"simpleText":"سنڌي - 信德语"}},{"languageCode":"hu","languageName":{"simpleText":"magyar - 匈牙利语"}},{"languageCode":"su","languageName":{"simpleText":"Basa Sunda - 巽他语"}},{"languageCode":"hy","languageName":{"simpleText":"հայերեն - 亚美尼亚语"}},{"languageCode":"ig","languageName":{"simpleText":"Igbo - 伊博语"}},{"languageCode":"it","languageName":{"simpleText":"Italiano - 意大利语"}},{"languageCode":"yi","languageName":{"simpleText":"ייִדיש - 意第绪语"}},{"languageCode":"hi","languageName":{"simpleText":"हिन्दी - 印地语"}},{"languageCode":"id","languageName":{"simpleText":"Bahasa Indonesia - 印度尼西亚语"}},{"languageCode":"en","languageName":{"simpleText":"English - 英语"}},{"languageCode":"yo","languageName":{"simpleText":"Yorùbá - 约鲁巴语"}},{"languageCode":"vi","languageName":{"simpleText":"Tiếng Việt - 越南语"}},{"languageCode":"jv","languageName":{"simpleText":"Basa Jawa - 爪哇语"}},{"languageCode":"zh-Hant","languageName":{"simpleText":"中文（繁體）- 中文（繁体）"}},{"languageCode":"zh-Hans","languageName":{"simpleText":"中文（简体）"}},{"languageCode":"zu","languageName":{"simpleText":"isiZulu - 祖鲁语"}},{"languageCode":"kri","languageName":{"simpleText":"Krìì - 克里语"}}],"MOBILE":[{"languageCode":"sq","languageName":{"runs":[{"text":"Shqip - 阿尔巴尼亚语"}]}},{"languageCode":"ak","languageName":{"runs":[{"text":"Ákán - 阿肯语"}]}},{"languageCode":"ar","languageName":{"runs":[{"text":"العربية - 阿拉伯语"}]}},{"languageCode":"am","languageName":{"runs":[{"text":"አማርኛ - 阿姆哈拉语"}]}},{"languageCode":"as","languageName":{"runs":[{"text":"অসমীয়া - 阿萨姆语"}]}},{"languageCode":"az","languageName":{"runs":[{"text":"Azərbaycanca - 阿塞拜疆语"}]}},{"languageCode":"ee","languageName":{"runs":[{"text":"Eʋegbe - 埃维语"}]}},{"languageCode":"ay","languageName":{"runs":[{"text":"Aymar - 艾马拉语"}]}},{"languageCode":"ga","languageName":{"runs":[{"text":"Gaeilge - 爱尔兰语"}]}},{"languageCode":"et","languageName":{"runs":[{"text":"Eesti - 爱沙尼亚语"}]}},{"languageCode":"or","languageName":{"runs":[{"text":"ଓଡ଼ିଆ - 奥里亚语"}]}},{"languageCode":"om","languageName":{"runs":[{"text":"Oromoo - 奥罗莫语"}]}},{"languageCode":"eu","languageName":{"runs":[{"text":"Euskara - 巴斯克语"}]}},{"languageCode":"be","languageName":{"runs":[{"text":"Беларуская - 白俄罗斯语"}]}},{"languageCode":"bg","languageName":{"runs":[{"text":"Български - 保加利亚语"}]}},{"languageCode":"nso","languageName":{"runs":[{"text":"Sesotho sa Leboa - 北索托语"}]}},{"languageCode":"is","languageName":{"runs":[{"text":"Íslenska - 冰岛语"}]}},{"languageCode":"pl","languageName":{"runs":[{"text":"Polski - 波兰语"}]}},{"languageCode":"bs","languageName":{"runs":[{"text":"Bosanski - 波斯尼亚语"}]}},{"languageCode":"fa","languageName":{"runs":[{"text":"فارسی - 波斯语"}]}},{"languageCode":"bho","languageName":{"runs":[{"text":"भोजपुरी - 博杰普尔语"}]}},{"languageCode":"ts","languageName":{"runs":[{"text":"Xitsonga - 聪加语"}]}},{"languageCode":"tt","languageName":{"runs":[{"text":"Татарча - 鞑靼语"}]}},{"languageCode":"da","languageName":{"runs":[{"text":"Dansk - 丹麦语"}]}},{"languageCode":"de","languageName":{"runs":[{"text":"Deutsch - 德语"}]}},{"languageCode":"dv","languageName":{"runs":[{"text":"ދިވެހިބަސް - 迪维希语"}]}},{"languageCode":"ru","languageName":{"runs":[{"text":"Русский - 俄语"}]}},{"languageCode":"fr","languageName":{"runs":[{"text":"Français - 法语"}]}},{"languageCode":"sa","languageName":{"runs":[{"text":"संस्कृतम् - 梵语"}]}},{"languageCode":"fil","languageName":{"runs":[{"text":"Filipino - 菲律宾语"}]}},{"languageCode":"fi","languageName":{"runs":[{"text":"Suomi - 芬兰语"}]}},{"languageCode":"km","languageName":{"runs":[{"text":"ភាសាខ្មែរ - 高棉语"}]}},{"languageCode":"ka","languageName":{"runs":[{"text":"ქართული - 格鲁吉亚语"}]}},{"languageCode":"gu","languageName":{"runs":[{"text":"ગુજરાતી - 古吉拉特语"}]}},{"languageCode":"gn","languageName":{"runs":[{"text":"Avañe\'ẽ - 瓜拉尼语"}]}},{"languageCode":"kk","languageName":{"runs":[{"text":"Қазақ тілі - 哈萨克语"}]}},{"languageCode":"ht","languageName":{"runs":[{"text":"海地克里奥尔语"}]}},{"languageCode":"ko","languageName":{"runs":[{"text":"한국말 - 韩语"}]}},{"languageCode":"ha","languageName":{"runs":[{"text":"هَوُسَ - 豪萨语"}]}},{"languageCode":"nl","languageName":{"runs":[{"text":"Nederlands - 荷兰语"}]}},{"languageCode":"gl","languageName":{"runs":[{"text":"Galego - 加利西亚语"}]}},{"languageCode":"ca","languageName":{"runs":[{"text":"Català - 加泰罗尼亚语"}]}},{"languageCode":"cs","languageName":{"runs":[{"text":"Čeština - 捷克语"}]}},{"languageCode":"kn","languageName":{"runs":[{"text":"ಕನ್ನಡ - 卡纳达语"}]}},{"languageCode":"ky","languageName":{"runs":[{"text":"Кыргызча - 吉尔吉斯语"}]}},{"languageCode":"xh","languageName":{"runs":[{"text":"isiXhosa - 科萨语"}]}},{"languageCode":"co","languageName":{"runs":[{"text":"Corsu - 科西嘉语"}]}},{"languageCode":"hr","languageName":{"runs":[{"text":"Hrvatski - 克罗地亚语"}]}},{"languageCode":"qu","languageName":{"runs":[{"text":"Runa Simi - 克丘亚语"}]}},{"languageCode":"ku","languageName":{"runs":[{"text":"Kurdî - 库尔德语"}]}},{"languageCode":"la","languageName":{"runs":[{"text":"lingua latīna - 拉丁语"}]}},{"languageCode":"lv","languageName":{"runs":[{"text":"Latviešu - 拉脱维亚语"}]}},{"languageCode":"lo","languageName":{"runs":[{"text":"ລາວ - 老挝语"}]}},{"languageCode":"lt","languageName":{"runs":[{"text":"Lietuvių - 立陶宛语"}]}},{"languageCode":"ln","languageName":{"runs":[{"text":"Lingála - 林加拉语"}]}},{"languageCode":"lg","languageName":{"runs":[{"text":"Luganda - 卢干达语"}]}},{"languageCode":"lb","languageName":{"runs":[{"text":"Lëtzebuergesch - 卢森堡语"}]}},{"languageCode":"rw","languageName":{"runs":[{"text":"Kinyarwanda - 卢旺达语"}]}},{"languageCode":"ro","languageName":{"runs":[{"text":"Română - 罗马尼亚语"}]}},{"languageCode":"mt","languageName":{"runs":[{"text":"Malti - 马耳他语"}]}},{"languageCode":"mr","languageName":{"runs":[{"text":"मराठी - 马拉地语"}]}},{"languageCode":"mg","languageName":{"runs":[{"text":"Malagasy - 马拉加斯语"}]}},{"languageCode":"ml","languageName":{"runs":[{"text":"മലയാളം - 马拉雅拉姆语"}]}},{"languageCode":"ms","languageName":{"runs":[{"text":"Bahasa Melayu - 马来语"}]}},{"languageCode":"mk","languageName":{"runs":[{"text":"македонски - 马其顿语"}]}},{"languageCode":"mi","languageName":{"runs":[{"text":"Māori - 毛利语"}]}},{"languageCode":"mn","languageName":{"runs":[{"text":"Монгол - 蒙古语"}]}},{"languageCode":"bn","languageName":{"runs":[{"text":"বাংলা - 孟加拉语"}]}},{"languageCode":"my","languageName":{"runs":[{"text":"ဗမာစာ - 缅甸语"}]}},{"languageCode":"hmn","languageName":{"runs":[{"text":"Hmoob - 苗语"}]}},{"languageCode":"af","languageName":{"runs":[{"text":"Afrikaans - 南非荷兰语"}]}},{"languageCode":"st","languageName":{"runs":[{"text":"Sesotho - 南索托语"}]}},{"languageCode":"ne","languageName":{"runs":[{"text":"नेपाली - 尼泊尔语"}]}},{"languageCode":"no","languageName":{"runs":[{"text":"Norsk - 挪威语"}]}},{"languageCode":"pa","languageName":{"runs":[{"text":"ਪੰਜਾਬੀ - 旁遮普语"}]}},{"languageCode":"pt","languageName":{"runs":[{"text":"Português - 葡萄牙语"}]}},{"languageCode":"ps","languageName":{"runs":[{"text":"پښتو - 普什图语"}]}},{"languageCode":"ny","languageName":{"runs":[{"text":"chiCheŵa - 齐切瓦语"}]}},{"languageCode":"ja","languageName":{"runs":[{"text":"日本語 - 日语"}]}},{"languageCode":"sv","languageName":{"runs":[{"text":"Svenska - 瑞典语"}]}},{"languageCode":"sm","languageName":{"runs":[{"text":"Gagana Samoa - 萨摩亚语"}]}},{"languageCode":"sr","languageName":{"runs":[{"text":"Српски језик - 塞尔维亚语"}]}},{"languageCode":"si","languageName":{"runs":[{"text":"සිංහල - 僧伽罗语"}]}},{"languageCode":"sn","languageName":{"runs":[{"text":"ChiShona - 绍纳语"}]}},{"languageCode":"eo","languageName":{"runs":[{"text":"Esperanto - 世界语"}]}},{"languageCode":"sk","languageName":{"runs":[{"text":"Slovenčina - 斯洛伐克语"}]}},{"languageCode":"sl","languageName":{"runs":[{"text":"Slovenščina - 斯洛文尼亚语"}]}},{"languageCode":"sw","languageName":{"runs":[{"text":"Kiswahili - 斯瓦希里语"}]}},{"languageCode":"gd","languageName":{"runs":[{"text":"Gàidhlig - 苏格兰盖尔语"}]}},{"languageCode":"ceb","languageName":{"runs":[{"text":"Cebuano - 宿务语"}]}},{"languageCode":"so","languageName":{"runs":[{"text":"Soomaaliga - 索马里语"}]}},{"languageCode":"tg","languageName":{"runs":[{"text":"тоҷикӣ - 塔吉克语"}]}},{"languageCode":"te","languageName":{"runs":[{"text":"తెలుగు - 泰卢固语"}]}},{"languageCode":"ta","languageName":{"runs":[{"text":"தமிழ் - 泰米尔语"}]}},{"languageCode":"th","languageName":{"runs":[{"text":"ไทย - 泰语"}]}},{"languageCode":"ti","languageName":{"runs":[{"text":"ትግርኛ - 提格利尼亚语"}]}},{"languageCode":"tr","languageName":{"runs":[{"text":"Türkçe - 土耳其语"}]}},{"languageCode":"tk","languageName":{"runs":[{"text":"Türkmen - 土库曼语"}]}},{"languageCode":"cy","languageName":{"runs":[{"text":"Cymraeg - 威尔士语"}]}},{"languageCode":"ug","languageName":{"runs":[{"text":"ئۇيغۇرچە - 维吾尔语"}]}},{"languageCode":"und","languageName":{"runs":[{"text":"Unknown - 未知语言"}]}},{"languageCode":"ur","languageName":{"runs":[{"text":"اردو - 乌尔都语"}]}},{"languageCode":"uk","languageName":{"runs":[{"text":"Українська - 乌克兰语"}]}},{"languageCode":"uz","languageName":{"runs":[{"text":"O‘zbek - 乌兹别克语"}]}},{"languageCode":"es","languageName":{"runs":[{"text":"Español - 西班牙语"}]}},{"languageCode":"fy","languageName":{"runs":[{"text":"Frysk - 西弗里西亚语"}]}},{"languageCode":"iw","languageName":{"runs":[{"text":"עברית - 希伯来语"}]}},{"languageCode":"el","languageName":{"runs":[{"text":"Ελληνικά - 希腊语"}]}},{"languageCode":"haw","languageName":{"runs":[{"text":"ʻŌlelo Hawaiʻi - 夏威夷语"}]}},{"languageCode":"sd","languageName":{"runs":[{"text":"سنڌي - 信德语"}]}},{"languageCode":"hu","languageName":{"runs":[{"text":"Magyar - 匈牙利语"}]}},{"languageCode":"su","languageName":{"runs":[{"text":"Basa Sunda - 巽他语"}]}},{"languageCode":"hy","languageName":{"runs":[{"text":"Հայերեն - 亚美尼亚语"}]}},{"languageCode":"ig","languageName":{"runs":[{"text":"Igbo - 伊博语"}]}},{"languageCode":"it","languageName":{"runs":[{"text":"Italiano - 意大利语"}]}},{"languageCode":"yi","languageName":{"runs":[{"text":"ייִדיש - 意第绪语"}]}},{"languageCode":"hi","languageName":{"runs":[{"text":"हिन्दी - 印地语"}]}},{"languageCode":"id","languageName":{"runs":[{"text":"Bahasa Indonesia - 印度尼西亚语"}]}},{"languageCode":"en","languageName":{"runs":[{"text":"English - 英语"}]}},{"languageCode":"yo","languageName":{"runs":[{"text":"Yorùbá - 约鲁巴语"}]}},{"languageCode":"vi","languageName":{"runs":[{"text":"Tiếng Việt - 越南语"}]}},{"languageCode":"jv","languageName":{"runs":[{"text":"Basa Jawa - 爪哇语"}]}},{"languageCode":"zh-Hant","languageName":{"runs":[{"text":"中文（繁體） - 中文（繁体）"}]}},{"languageCode":"zh-Hans","languageName":{"runs":[{"text":"中文（简体）"}]}},{"languageCode":"zu","languageName":{"runs":[{"text":"isiZulu - 祖鲁语"}]}},{"languageCode":"kri","languageName":{"runs":[{"text":"Krìì - 克里语"}]}}]}}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VidGl0bGVzLlRyYW5zbGF0ZS5yZXNwb25zZS5iZXRhLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRWlDO0FBQ0E7QUFDQTtBQUNROztBQUVFO0FBQ2dCO0FBQ0o7O0FBRUo7QUFDSTtBQUNKO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDRjtBQUNWOztBQUUzQyxjQUFjLG9EQUFJO0FBQ2xCLGdCQUFnQixvREFBSTtBQUNwQixnQkFBZ0Isb0RBQUk7QUFDcEIsZ0JBQWdCLDBEQUFNLHFEQUFxRDtBQUMzRTtBQUNBLFlBQVksNE9BQU87QUFDbkIsY0FBYyxrUEFBUztBQUN2QixZQUFZLDRPQUFPO0FBQ25CLFlBQVksK09BQU87QUFDbkIsWUFBWSwrT0FBTztBQUNuQixjQUFjLHFQQUFTO0FBQ3ZCLGNBQWMscVBBQVM7QUFDdkIsYUFBYSxrUEFBUTtBQUNyQixhQUFhLG1PQUFHO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTyxXQUFXLG9CQUFvQjtBQUNqRDtBQUNBO0FBQ0EsV0FBVyxPQUFPLGNBQWMsT0FBTztBQUN2QztBQUNBLGlCQUFpQix3RUFBYztBQUMvQixXQUFXLE9BQU8sY0FBYyxTQUFTO0FBQ3pDO0FBQ0EsbUdBQW1HO0FBQ25HLCtFQUErRSxzRUFBWTtBQUMzRixXQUFXLE9BQU8sWUFBWSxPQUFPO0FBQ3JDO0FBQ0E7QUFDQSxTQUFTLDRCQUE0QixFQUFFLGdFQUFNO0FBQzdDLFlBQVksT0FBTyx1QkFBdUIsaUJBQWlCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU8sVUFBVSxLQUFLLGVBQWUsVUFBVTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPLFlBQVkscUJBQXFCO0FBQzNEO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsMEZBQTBGO0FBQ3hHLGNBQWMsMEVBQTBFO0FBQ3hGLGNBQWMsc0hBQXNIO0FBQ3BJLGNBQWMsNEdBQTRHO0FBQzFILGNBQWMsNEVBQTRFO0FBQzFGLGNBQWMsNkVBQTZFO0FBQzNGLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUVBQXFFO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw2RUFBNkU7QUFDM0YsY0FBYyxtRUFBbUU7QUFDakYsY0FBYyw0REFBNEQ7QUFDMUUsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw4RkFBOEY7QUFDNUcsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtRUFBbUU7QUFDakYsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztB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SztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0M7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUyw4Q0FBOEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FB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QUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2R1YWxzdWJzLy4vc3JjL1N1YnRpdGxlcy5UcmFuc2xhdGUucmVzcG9uc2UuYmV0YS5qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9FTlYvRU5WLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9VUkkvVVJJLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9XZWJWVFQvV2ViVlRULm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9YTUwvWE1MLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9kZXRlY3RGb3JtYXQubWpzIiwid2VicGFjazovL2R1YWxzdWJzLy4vc3JjL2Z1bmN0aW9uL2RldGVjdFBsYXRmb3JtLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9zZXRFTlYubWpzIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvaGFybW9ueSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLypcblJFQURNRTogaHR0cHM6Ly9naXRodWIuY29tL0R1YWxTdWJzXG4qL1xuXG5pbXBvcnQgRU5WcyBmcm9tIFwiLi9FTlYvRU5WLm1qc1wiO1xuaW1wb3J0IFVSSXMgZnJvbSBcIi4vVVJJL1VSSS5tanNcIjtcbmltcG9ydCBYTUxzIGZyb20gXCIuL1hNTC9YTUwubWpzXCI7XG5pbXBvcnQgV2ViVlRUIGZyb20gXCIuL1dlYlZUVC9XZWJWVFQubWpzXCI7XG5cbmltcG9ydCBzZXRFTlYgZnJvbSBcIi4vZnVuY3Rpb24vc2V0RU5WLm1qc1wiO1xuaW1wb3J0IGRldGVjdFBsYXRmb3JtIGZyb20gXCIuL2Z1bmN0aW9uL2RldGVjdFBsYXRmb3JtLm1qc1wiO1xuaW1wb3J0IGRldGVjdEZvcm1hdCBmcm9tIFwiLi9mdW5jdGlvbi9kZXRlY3RGb3JtYXQubWpzXCI7XG5cbmltcG9ydCAqIGFzIERlZmF1bHQgZnJvbSBcIi4vZGF0YWJhc2UvRGVmYXVsdC5qc29uXCI7XG5pbXBvcnQgKiBhcyBVbml2ZXJzYWwgZnJvbSBcIi4vZGF0YWJhc2UvVW5pdmVyc2FsLmpzb25cIjtcbmltcG9ydCAqIGFzIFlvdVR1YmUgZnJvbSBcIi4vZGF0YWJhc2UvWW91VHViZS5qc29uXCI7XG5pbXBvcnQgKiBhcyBOZXRmbGl4IGZyb20gXCIuL2RhdGFiYXNlL05ldGZsaXguanNvblwiO1xuaW1wb3J0ICogYXMgU3BvdGlmeSBmcm9tIFwiLi9kYXRhYmFzZS9TcG90aWZ5Lmpzb25cIjtcbmltcG9ydCAqIGFzIENvbXBvc2l0ZSBmcm9tIFwiLi9kYXRhYmFzZS9Db21wb3NpdGUuanNvblwiO1xuaW1wb3J0ICogYXMgVHJhbnNsYXRlIGZyb20gXCIuL2RhdGFiYXNlL1RyYW5zbGF0ZS5qc29uXCI7XG5pbXBvcnQgKiBhcyBFeHRlcm5hbCBmcm9tIFwiLi9kYXRhYmFzZS9FeHRlcm5hbC5qc29uXCI7XG5pbXBvcnQgKiBhcyBBUEkgZnJvbSBcIi4vZGF0YWJhc2UvQVBJLmpzb25cIjtcblxuY29uc3QgJCA9IG5ldyBFTlZzKFwi8J+Nv++4jyBEdWFsU3Viczog8J+UoyBVbml2ZXJzYWwgdjEuMi42KDEpIFRyYW5zbGF0b3IucmVzcG9uc2UuYmV0YVwiKTtcbmNvbnN0IFVSSSA9IG5ldyBVUklzKCk7XG5jb25zdCBYTUwgPSBuZXcgWE1McygpO1xuY29uc3QgVlRUID0gbmV3IFdlYlZUVChbXCJtaWxsaXNlY29uZHNcIiwgXCJ0aW1lU3RhbXBcIiwgXCJzaW5nbGVMaW5lXCIsIFwiXFxuXCJdKTsgLy8gXCJtdWx0aUxpbmVcIlxuY29uc3QgRGF0YUJhc2UgPSB7XG5cdFwiRGVmYXVsdFwiOiBEZWZhdWx0LFxuXHRcIlVuaXZlcnNhbFwiOiBVbml2ZXJzYWwsXG5cdFwiWW91VHViZVwiOiBZb3VUdWJlLFxuXHRcIk5ldGZsaXhcIjogTmV0ZmxpeCxcblx0XCJTcG90aWZ5XCI6IFNwb3RpZnksXG5cdFwiQ29tcG9zaXRlXCI6IENvbXBvc2l0ZSxcblx0XCJUcmFuc2xhdGVcIjogVHJhbnNsYXRlLFxuXHRcIkV4dGVybmFsXCI6IEV4dGVybmFsLFxuXHRcIkV4dGVybmFsXCI6IEFQSSxcbn07XG5cbi8qKioqKioqKioqKioqKioqKiBQcm9jZXNzaW5nICoqKioqKioqKioqKioqKioqL1xuLy8g6Kej5p6EVVJMXG5jb25zdCBVUkwgPSBVUkkucGFyc2UoJHJlcXVlc3QudXJsKTtcbiQubG9nKGDimqAgJHskLm5hbWV9YCwgYFVSTDogJHtKU09OLnN0cmluZ2lmeShVUkwpfWAsIFwiXCIpO1xuLy8g6I635Y+W6L+e5o6l5Y+C5pWwXG5jb25zdCBNRVRIT0QgPSAkcmVxdWVzdC5tZXRob2QsIEhPU1QgPSBVUkwuaG9zdCwgUEFUSCA9IFVSTC5wYXRoLCBQQVRIcyA9IFVSTC5wYXRocztcbiQubG9nKGDimqAgJHskLm5hbWV9YCwgYE1FVEhPRDogJHtNRVRIT0R9YCwgXCJcIik7XG4vLyDojrflj5blubPlj7BcbmNvbnN0IFBMQVRGT1JNID0gZGV0ZWN0UGxhdGZvcm0oSE9TVCk7XG4kLmxvZyhg4pqgICR7JC5uYW1lfSwgUExBVEZPUk06ICR7UExBVEZPUk19YCwgXCJcIik7XG4vLyDop6PmnpDmoLzlvI9cbmxldCBGT1JNQVQgPSAoJHJlc3BvbnNlLmhlYWRlcnM/LltcIkNvbnRlbnQtVHlwZVwiXSA/PyAkcmVzcG9uc2UuaGVhZGVycz8uW1wiY29udGVudC10eXBlXCJdKT8uc3BsaXQoXCI7XCIpPy5bMF07XG5pZiAoRk9STUFUID09PSBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiIHx8IEZPUk1BVCA9PT0gXCJ0ZXh0L3BsYWluXCIpIEZPUk1BVCA9IGRldGVjdEZvcm1hdChVUkwsICRyZXNwb25zZT8uYm9keSk7XG4kLmxvZyhg4pqgICR7JC5uYW1lfSwgRk9STUFUOiAke0ZPUk1BVH1gLCBcIlwiKTtcbihhc3luYyAoKSA9PiB7XG5cdC8vIOivu+WPluiuvue9rlxuXHRjb25zdCB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfSA9IHNldEVOVihcIkR1YWxTdWJzXCIsIFsoW1wiWW91VHViZVwiLCBcIk5ldGZsaXhcIiwgXCJCaWxpQmlsaVwiLCBcIlNwb3RpZnlcIl0uaW5jbHVkZXMoUExBVEZPUk0pKSA/IFBMQVRGT1JNIDogXCJVbml2ZXJzYWxcIiwgXCJUcmFuc2xhdGVcIiwgXCJBUElcIl0sIERhdGFCYXNlKTtcblx0JC5sb2coYOKaoCAkeyQubmFtZX1gLCBgU2V0dGluZ3MuU3dpdGNoOiAke1NldHRpbmdzPy5Td2l0Y2h9YCwgXCJcIik7XG5cdHN3aXRjaCAoU2V0dGluZ3MuU3dpdGNoKSB7XG5cdFx0Y2FzZSB0cnVlOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHQvLyDojrflj5blrZfluZXnsbvlnovkuI7or63oqIBcblx0XHRcdGNvbnN0IFR5cGUgPSBVUkwucXVlcnk/LnN1YnR5cGUgPz8gU2V0dGluZ3MuVHlwZSwgTGFuZ3VhZ2VzID0gW1VSTC5xdWVyeT8ubGFuZz8udG9VcHBlckNhc2U/LigpID8/IFNldHRpbmdzLkxhbmd1YWdlc1swXSwgKFVSTC5xdWVyeT8udGxhbmcgPz8gQ2FjaGVzPy50bGFuZyk/LnRvVXBwZXJDYXNlPy4oKSA/PyBTZXR0aW5ncy5MYW5ndWFnZXNbMV1dO1xuXHRcdFx0JC5sb2coYOKaoCAkeyQubmFtZX0sIFR5cGU6ICR7VHlwZX0sIExhbmd1YWdlczogJHtMYW5ndWFnZXN9YCwgXCJcIik7XG5cdFx0XHQvLyDliJvlu7rnqbrmlbDmja5cblx0XHRcdGxldCBib2R5ID0ge307XG5cdFx0XHQvLyDmoLzlvI/liKTmlq1cblx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdGNhc2UgdW5kZWZpbmVkOiAvLyDop4bkuLrml6Bib2R5XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIjpcblx0XHRcdFx0Y2FzZSBcInRleHQvcGxhaW5cIjpcblx0XHRcdFx0Y2FzZSBcInRleHQvaHRtbFwiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1tcGVnVVJMXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LW1wZWd1cmxcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsXCI6XG5cdFx0XHRcdGNhc2UgXCJhdWRpby9tcGVndXJsXCI6XG5cdFx0XHRcdFx0Ly9ib2R5ID0gTTNVOC5wYXJzZSgkcmVzcG9uc2UuYm9keSk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQvLyRyZXNwb25zZS5ib2R5ID0gTTNVOC5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L3htbFwiOlxuXHRcdFx0XHRjYXNlIFwidGV4dC9wbGlzdFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veG1sXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9wbGlzdFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wbGlzdFwiOiB7XG5cdFx0XHRcdFx0Ym9keSA9IFhNTC5wYXJzZSgkcmVzcG9uc2UuYm9keSk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHRjb25zdCBicmVha0xpbmUgPSAoYm9keT8udHQpID8gXCI8YnIvPlwiIDogKGJvZHk/LnRpbWVkdGV4dCkgPyBcIiYjeDAwMEE7XCIgOiBcIiYjeDAwMEE7XCI7XG5cdFx0XHRcdFx0aWYgKGJvZHk/LnRpbWVkdGV4dD8uaGVhZD8ud3A/LlsxXT8uW1wiQHJjXCJdKSBib2R5LnRpbWVkdGV4dC5oZWFkLndwWzFdW1wiQHJjXCJdID0gXCIxXCI7XG5cdFx0XHRcdFx0bGV0IHBhcmFncmFwaCA9IGJvZHk/LnR0Py5ib2R5Py5kaXY/LnAgPz8gYm9keT8udGltZWR0ZXh0Py5ib2R5Py5wO1xuXHRcdFx0XHRcdGxldCBmdWxsVGV4dCA9IFtdO1xuXHRcdFx0XHRcdHBhcmFncmFwaCA9IHBhcmFncmFwaC5tYXAocGFyYSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAocGFyYT8ucykge1xuXHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShwYXJhLnMpKSBwYXJhW1wiI1wiXSA9IHBhcmEucy5tYXAoc2VnID0+IHNlZ1tcIiNcIl0pLmpvaW4oXCIgXCIpO1xuXHRcdFx0XHRcdFx0XHRlbHNlIHBhcmFbXCIjXCJdID0gcGFyYS5zPy5bXCIjXCJdID8/IFwiXCI7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBwYXJhLnM7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3BhbiA9IHBhcmE/LnNwYW4gPz8gcGFyYTtcblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHNwYW4pKSBzZW50ZW5jZXMgPSBzcGFuPy5tYXAoc3BhbiA9PiBzcGFuPy5bXCIjXCJdKS5qb2luKGJyZWFrTGluZSk7XG5cdFx0XHRcdFx0XHRlbHNlIHNlbnRlbmNlcyA9IHNwYW4/LltcIiNcIl07XG5cdFx0XHRcdFx0XHRmdWxsVGV4dC5wdXNoKHNlbnRlbmNlcyA/PyBcIlxcdTIwMGJcIik7XG5cdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0Y29uc3Qgc3BhbnMgPSBwYXJhPy5zcGFuID8/IHBhcmE/LnMgPz8gcGFyYTtcblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHNwYW4pKSBzcGFuc1tcIiNcIl0gPSBzcGFucz8ubWFwKHNwYW4gPT4gc3Bhbj8uW1wiI1wiXSA/PyBcIlwiKS5qb2luKFwiIFwiKTtcblx0XHRcdFx0XHRcdGVsc2Ugc3BhbnNbXCIjXCJdID0gc3BhbnM/LltcIiNcIl0gPz8gXCJcIjtcblx0XHRcdFx0XHRcdGlmIChwYXJhPy5zKSBwYXJhID0gc3BhbnM7XG5cdFx0XHRcdFx0XHRpZiAoc3BhbnM/LltcIiNcIl0pIGZ1bGxUZXh0LnB1c2goc3BhbnNbXCIjXCJdKTtcblx0XHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFyYTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRjb25zdCB0cmFuc2xhdGlvbiA9IGF3YWl0IFRyYW5zbGF0aW9uKGZ1bGxUZXh0LCBTZXR0aW5ncz8uTWV0aG9kLCBTZXR0aW5ncz8uVmVuZG9yLCBMYW5ndWFnZXNbMF0sIExhbmd1YWdlc1sxXSwgU2V0dGluZ3M/LltTZXR0aW5ncz8uVmVuZG9yXSwgQ29uZmlncz8uTGFuZ3VhZ2VzLCBTZXR0aW5ncz8uVGltZXMsIFNldHRpbmdzPy5JbnRlcnZhbCwgU2V0dGluZ3M/LkV4cG9uZW50aWFsKTtcblx0XHRcdFx0XHRwYXJhZ3JhcGggPSBwYXJhZ3JhcGgubWFwKChwYXJhLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBzcGFuID0gcGFyYT8uc3BhbiA/PyBwYXJhO1xuXHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoc3BhbikpIHRyYW5zbGF0aW9uPy5baV0/LnNwbGl0KGJyZWFrTGluZSkuZm9yRWFjaCgodGV4dCwgaikgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoc3BhbltqXT8uW1wiI1wiXSkgc3BhbltqXVtcIiNcIl0gPSBjb21iaW5lVGV4dChzcGFuW2pdW1wiI1wiXSwgdGV4dCwgU2V0dGluZ3M/LlNob3dPbmx5LCBTZXR0aW5ncz8uUG9zaXRpb24sICcgJyk7XG5cdFx0XHRcdFx0XHRcdC8vZWxzZSBpZiAoc3BhbltqICsgMV0/LltcIiNcIl0pIHNwYW5baiArIDFdW1wiI1wiXSA9IGNvbWJpbmVUZXh0KHNwYW5baiArIDFdW1wiI1wiXSwgdGV4dCwgU2V0dGluZ3M/LlNob3dPbmx5LCBTZXR0aW5ncz8uUG9zaXRpb24sICcgJyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGVsc2UgaWYgKHNwYW4/LltcIiNcIl0pIHNwYW5bXCIjXCJdID0gY29tYmluZVRleHQoc3BhbltcIiNcIl0sIHRyYW5zbGF0aW9uPy5baV0sIFNldHRpbmdzPy5TaG93T25seSwgU2V0dGluZ3M/LlBvc2l0aW9uLCBicmVha0xpbmUpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHBhcmE7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQkcmVzcG9uc2UuYm9keSA9IFhNTC5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L3Z0dFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdnR0XCI6IHtcblx0XHRcdFx0XHRib2R5ID0gVlRULnBhcnNlKCRyZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBib2R5OiAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdGxldCBmdWxsVGV4dCA9IGJvZHk/LmJvZHkubWFwKGl0ZW0gPT4gKGl0ZW0/LnRleHQgPz8gXCJcXHUyMDBiXCIpPy5yZXBsYWNlKC88XFwvP1tePD5dKz4vZywgXCJcIikpO1xuXHRcdFx0XHRcdGNvbnN0IHRyYW5zbGF0aW9uID0gYXdhaXQgVHJhbnNsYXRpb24oZnVsbFRleHQsIFNldHRpbmdzPy5NZXRob2QsIFNldHRpbmdzPy5WZW5kb3IsIExhbmd1YWdlc1swXSwgTGFuZ3VhZ2VzWzFdLCBTZXR0aW5ncz8uW1NldHRpbmdzPy5WZW5kb3JdLCBDb25maWdzPy5MYW5ndWFnZXMsIFNldHRpbmdzPy5UaW1lcywgU2V0dGluZ3M/LkludGVydmFsLCBTZXR0aW5ncz8uRXhwb25lbnRpYWwpO1xuXHRcdFx0XHRcdGJvZHkuYm9keSA9IGJvZHkuYm9keS5tYXAoKGl0ZW0sIGkpID0+IHtcblx0XHRcdFx0XHRcdGl0ZW0udGV4dCA9IGNvbWJpbmVUZXh0KGl0ZW0/LnRleHQgPz8gXCJcXHUyMDBiXCIsIHRyYW5zbGF0aW9uPy5baV0sIFNldHRpbmdzPy5TaG93T25seSwgU2V0dGluZ3M/LlBvc2l0aW9uKTtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQkcmVzcG9uc2UuYm9keSA9IFZUVC5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L2pzb25cIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuXHRcdFx0XHRcdGJvZHkgPSBKU09OLnBhcnNlKCRyZXNwb25zZS5ib2R5ID8/IFwie31cIik7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHRzd2l0Y2ggKFBMQVRGT1JNKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwiWW91VHViZVwiOiB7XG5cdFx0XHRcdFx0XHRcdGlmIChib2R5Py5ldmVudHMpIHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZnVsbFRleHQgPSBbXTtcblx0XHRcdFx0XHRcdFx0XHRib2R5LmV2ZW50cyA9IGJvZHkuZXZlbnRzLm1hcChldmVudCA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXZlbnQ/LnNlZ3M/LlswXT8udXRmOCkgZXZlbnQuc2VncyA9IFt7IFwidXRmOFwiOiBldmVudC5zZWdzLm1hcChzZWcgPT4gc2VnLnV0ZjgpLmpvaW4oXCJcIikgfV07XG5cdFx0XHRcdFx0XHRcdFx0XHRmdWxsVGV4dC5wdXNoKGV2ZW50Py5zZWdzPy5bMF0/LnV0ZjggPz8gXCJcXHUyMDBiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGV2ZW50LndXaW5JZDtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBldmVudDtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB0cmFuc2xhdGlvbiA9IGF3YWl0IFRyYW5zbGF0aW9uKGZ1bGxUZXh0LCBTZXR0aW5ncz8uTWV0aG9kLCBTZXR0aW5ncz8uVmVuZG9yLCBMYW5ndWFnZXNbMF0sIExhbmd1YWdlc1sxXSwgU2V0dGluZ3M/LltTZXR0aW5ncz8uVmVuZG9yXSwgQ29uZmlncz8uTGFuZ3VhZ2VzLCBTZXR0aW5ncz8uVGltZXMsIFNldHRpbmdzPy5JbnRlcnZhbCwgU2V0dGluZ3M/LkV4cG9uZW50aWFsKTtcblx0XHRcdFx0XHRcdFx0XHRib2R5LmV2ZW50cyA9IGJvZHkuZXZlbnRzLm1hcCgoZXZlbnQsIGkpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChldmVudD8uc2Vncz8uWzBdPy51dGY4KSBldmVudC5zZWdzWzBdLnV0ZjggPSBjb21iaW5lVGV4dChldmVudC5zZWdzWzBdLnV0ZjgsIHRyYW5zbGF0aW9uPy5baV0sIFNldHRpbmdzPy5TaG93T25seSwgU2V0dGluZ3M/LlBvc2l0aW9uKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBldmVudDtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChib2R5Py5jb250ZW50cz8uc2VjdGlvbkxpc3RSZW5kZXJlcj8uY29udGVudHMpIHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgbXVzaWNEZXNjcmlwdGlvbnMgPSBib2R5LmNvbnRlbnRzLnNlY3Rpb25MaXN0UmVuZGVyZXIuY29udGVudHM7XG5cdFx0XHRcdFx0XHRcdFx0bXVzaWNEZXNjcmlwdGlvbnMgPSBhd2FpdCBQcm9taXNlLmFsbChtdXNpY0Rlc2NyaXB0aW9ucy5tYXAoYXN5bmMgbXVzaWNEZXNjcmlwdGlvbiA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobXVzaWNEZXNjcmlwdGlvbj8ubXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXI/LmRlc2NyaXB0aW9uPy5ydW5zKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBseXJpY3MgPSBtdXNpY0Rlc2NyaXB0aW9uLm11c2ljRGVzY3JpcHRpb25TaGVsZlJlbmRlcmVyLmRlc2NyaXB0aW9uLnJ1bnM7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGx5cmljcyA9IGF3YWl0IFByb21pc2UuYWxsKGx5cmljcy5tYXAoYXN5bmMgcnVuID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgZnVsbFRleHQgPSBydW4/LnRleHQ/LnNwbGl0Py4oXCJcXG5cIik/Lm1hcCh0ZXh0ID0+IHRleHQ/LnRyaW0oKSA/PyBcIlxcdTIwMGJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNsYXRpb24gPSBhd2FpdCBUcmFuc2xhdGlvbihmdWxsVGV4dCwgU2V0dGluZ3M/Lk1ldGhvZCwgU2V0dGluZ3M/LlZlbmRvciwgTGFuZ3VhZ2VzWzBdLCBMYW5ndWFnZXNbMV0sIFNldHRpbmdzPy5bU2V0dGluZ3M/LlZlbmRvcl0sIENvbmZpZ3M/Lkxhbmd1YWdlcywgU2V0dGluZ3M/LlRpbWVzLCBTZXR0aW5ncz8uSW50ZXJ2YWwsIFNldHRpbmdzPy5FeHBvbmVudGlhbCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVsbFRleHQgPSBmdWxsVGV4dC5tYXAoKGxpbmUsIGkpID0+IHsgaWYgKGxpbmUpIHJldHVybiBjb21iaW5lVGV4dChsaW5lLCB0cmFuc2xhdGlvbj8uW2ldLCBTZXR0aW5ncz8uU2hvd09ubHksIFNldHRpbmdzPy5Qb3NpdGlvbiwgXCJcXG4gIOKUlCBcIikgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cnVuLnRleHQgPSBmdWxsVGV4dC5qb2luKFwiXFxuXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBydW47XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbXVzaWNEZXNjcmlwdGlvbjtcblx0XHRcdFx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGNhc2UgXCJTcG90aWZ5XCI6IHtcblx0XHRcdFx0XHRcdFx0TGFuZ3VhZ2VzWzBdID0gKGJvZHk/Lmx5cmljcz8ubGFuZ3VhZ2UgPT09IFwiejFcIikgPyBcIlpILUhBTlRcIlxuXHRcdFx0XHRcdFx0XHRcdDogKGJvZHk/Lmx5cmljcz8ubGFuZ3VhZ2UpID8gYm9keT8ubHlyaWNzPy5sYW5ndWFnZS50b1VwcGVyQ2FzZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IFwiQVVUT1wiO1xuXHRcdFx0XHRcdFx0XHRsZXQgZnVsbFRleHQgPSBib2R5Lmx5cmljcy5saW5lcy5tYXAobGluZSA9PiBsaW5lPy53b3JkcyA/PyBcIlxcdTIwMGJcIik7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRyYW5zbGF0aW9uID0gYXdhaXQgVHJhbnNsYXRpb24oZnVsbFRleHQsIFNldHRpbmdzPy5NZXRob2QsIFNldHRpbmdzPy5WZW5kb3IsIExhbmd1YWdlc1swXSwgTGFuZ3VhZ2VzWzFdLCBTZXR0aW5ncz8uW1NldHRpbmdzPy5WZW5kb3JdLCBDb25maWdzPy5MYW5ndWFnZXMsIFNldHRpbmdzPy5UaW1lcywgU2V0dGluZ3M/LkludGVydmFsLCBTZXR0aW5ncz8uRXhwb25lbnRpYWwpO1xuXHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIOiwg+ivleS/oeaBr2AsIGAkcmVxdWVzdC5oZWFkZXJzW1wiYXBwLXBsYXRmb3JtXCJdOiAkeyRyZXF1ZXN0Py5oZWFkZXJzPy5bXCJhcHAtcGxhdGZvcm1cIl19YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoJHJlcXVlc3Q/LmhlYWRlcnM/LltcImFwcC1wbGF0Zm9ybVwiXSA/PyAkcmVxdWVzdD8uaGVhZGVycz8uW1wiQXBwLVBsYXRmb3JtXCJdKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIk9TWFwiOiAvLyBtYWNPUyBBcHAg5pqC5LiN5pSv5oyB57+76K+R5Yqf6IO9XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIldpbjMyX3g4Nl82NFwiOiAvLyBXaW5kb3dzIEFwcCDmmoLkuI3mlK/mjIHnv7vor5Hlip/og71cblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwiV2ViUGxheWVyXCI6IC8vIFdlYiBBcHBcblx0XHRcdFx0XHRcdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdGJvZHkubHlyaWNzLmxpbmVzID0gYm9keS5seXJpY3MubGluZXMubWFwKChsaW5lLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChsaW5lPy53b3JkcykgbGluZS53b3JkcyA9IGNvbWJpbmVUZXh0KGxpbmUud29yZHMsIHRyYW5zbGF0aW9uPy5baV0sIFNldHRpbmdzPy5TaG93T25seSwgU2V0dGluZ3M/LlBvc2l0aW9uKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxpbmU7XG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0XHRcdFx0XHRib2R5Lmx5cmljcy5saW5lcyA9IGJvZHkubHlyaWNzLmxpbmVzLm1hcCgobGluZSwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgbGluZTEgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJzdGFydFRpbWVNc1wiOiBsaW5lLnN0YXJ0VGltZU1zLnRvU3RyaW5nKCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJ3b3Jkc1wiOiBsaW5lPy53b3JkcyA/PyBcIlwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwic3lsbGFibGVzXCI6IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiZW5kVGltZU1zXCI6IFwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBsaW5lMiA9IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcInN0YXJ0VGltZU1zXCI6IChsaW5lLnN0YXJ0VGltZU1zICsgMTAwKS50b1N0cmluZygpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwid29yZHNcIjogdHJhbnNsYXRpb24/LltpXSA/PyBcIlwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwic3lsbGFibGVzXCI6IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiZW5kVGltZU1zXCI6IFwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBbbGluZTEsIGxpbmUyXTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pLmZsYXQoSW5maW5pdHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9icmVhazsg5LiN5Lit5pat77yM57un57ut5aSE55CGXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcImlPU1wiOlxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFib2R5Py5seXJpY3M/LmFsdGVybmF0aXZlcykgYm9keS5seXJpY3MuYWx0ZXJuYXRpdmVzID0gW107XG5cdFx0XHRcdFx0XHRcdFx0XHRib2R5Lmx5cmljcy5hbHRlcm5hdGl2ZXMudW5zaGlmdCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibGFuZ3VhZ2VcIjogTGFuZ3VhZ2VzWzFdLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibGluZXNcIjogdHJhbnNsYXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0JHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3Byb3RvYnVmXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXByb3RvYnVmXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLnByb3RvYnVmXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjK3Byb3RvXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsZWNhdGlvbi9vY3RldC1zdHJlYW1cIjpcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGAkcmVzcG9uc2UuYm9keTogJHtKU09OLnN0cmluZ2lmeSgkcmVzcG9uc2UuYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0bGV0IHJhd0JvZHkgPSAkLmlzUXVhblgoKSA/IG5ldyBVaW50OEFycmF5KCRyZXNwb25zZS5ib2R5Qnl0ZXMgPz8gW10pIDogJHJlc3BvbnNlLmJvZHkgPz8gbmV3IFVpbnQ4QXJyYXkoKTtcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBpc0J1ZmZlcj8gJHtBcnJheUJ1ZmZlci5pc1ZpZXcocmF3Qm9keSl9OiAke0pTT04uc3RyaW5naWZ5KHJhd0JvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdC8qKioqKioqKioqKioqKioqKiogIGluaXRpYWxpemF0aW9uIHN0YXJ0ICAqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0XHRcdC8vIHRpbW9zdGFtbS9wcm90b2J1Zi10cyAyLjkuMFxuXHRcdFx0XHRcdC8vIHRleHQtZGVjb2RlclxuXHRcdFx0XHRcdCFmdW5jdGlvbihpKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfKG4sZSxpKXtyZXR1cm4gZTw9biYmbjw9aX1cInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cyYmIWlbXCJlbmNvZGluZy1pbmRleGVzXCJdJiYoaVtcImVuY29kaW5nLWluZGV4ZXNcIl09cmVxdWlyZShcIi4vZW5jb2RpbmctaW5kZXhlcy5qc1wiKVtcImVuY29kaW5nLWluZGV4ZXNcIl0pO3ZhciBsPU1hdGguZmxvb3I7ZnVuY3Rpb24gcyhuKXtpZih2b2lkIDA9PT1uKXJldHVybnt9O2lmKG49PT1PYmplY3QobikpcmV0dXJuIG47dGhyb3cgVHlwZUVycm9yKFwiQ291bGQgbm90IGNvbnZlcnQgYXJndW1lbnQgdG8gZGljdGlvbmFyeVwiKX1mdW5jdGlvbiB1KG4pe3JldHVybiAwPD1uJiZuPD0xMjd9dmFyIGE9dSxiPS0xO2Z1bmN0aW9uIGMobil7dGhpcy50b2tlbnM9W10uc2xpY2UuY2FsbChuKSx0aGlzLnRva2Vucy5yZXZlcnNlKCl9Yy5wcm90b3R5cGU9e2VuZE9mU3RyZWFtOmZ1bmN0aW9uKCl7cmV0dXJuIXRoaXMudG9rZW5zLmxlbmd0aH0scmVhZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnRva2Vucy5sZW5ndGg/dGhpcy50b2tlbnMucG9wKCk6Yn0scHJlcGVuZDpmdW5jdGlvbihuKXtpZihBcnJheS5pc0FycmF5KG4pKWZvcih2YXIgZT1uO2UubGVuZ3RoOyl0aGlzLnRva2Vucy5wdXNoKGUucG9wKCkpO2Vsc2UgdGhpcy50b2tlbnMucHVzaChuKX0scHVzaDpmdW5jdGlvbihuKXtpZihBcnJheS5pc0FycmF5KG4pKWZvcih2YXIgZT1uO2UubGVuZ3RoOyl0aGlzLnRva2Vucy51bnNoaWZ0KGUuc2hpZnQoKSk7ZWxzZSB0aGlzLnRva2Vucy51bnNoaWZ0KG4pfX07dmFyIHc9LTE7ZnVuY3Rpb24gbShuLGUpe2lmKG4pdGhyb3cgVHlwZUVycm9yKFwiRGVjb2RlciBlcnJvclwiKTtyZXR1cm4gZXx8NjU1MzN9ZnVuY3Rpb24gZihuKXt0aHJvdyBUeXBlRXJyb3IoXCJUaGUgY29kZSBwb2ludCBcIituK1wiIGNvdWxkIG5vdCBiZSBlbmNvZGVkLlwiKX1mdW5jdGlvbiByKG4pe3JldHVybiBuPVN0cmluZyhuKS50cmltKCkudG9Mb3dlckNhc2UoKSxPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZCxuKT9kW25dOm51bGx9dmFyIHQsbyxuPVt7ZW5jb2RpbmdzOlt7bGFiZWxzOltcInVuaWNvZGUtMS0xLXV0Zi04XCIsXCJ1dGYtOFwiLFwidXRmOFwiXSxuYW1lOlwiVVRGLThcIn1dLGhlYWRpbmc6XCJUaGUgRW5jb2RpbmdcIn0se2VuY29kaW5nczpbe2xhYmVsczpbXCI4NjZcIixcImNwODY2XCIsXCJjc2libTg2NlwiLFwiaWJtODY2XCJdLG5hbWU6XCJJQk04NjZcIn0se2xhYmVsczpbXCJjc2lzb2xhdGluMlwiLFwiaXNvLTg4NTktMlwiLFwiaXNvLWlyLTEwMVwiLFwiaXNvODg1OS0yXCIsXCJpc284ODU5MlwiLFwiaXNvXzg4NTktMlwiLFwiaXNvXzg4NTktMjoxOTg3XCIsXCJsMlwiLFwibGF0aW4yXCJdLG5hbWU6XCJJU08tODg1OS0yXCJ9LHtsYWJlbHM6W1wiY3Npc29sYXRpbjNcIixcImlzby04ODU5LTNcIixcImlzby1pci0xMDlcIixcImlzbzg4NTktM1wiLFwiaXNvODg1OTNcIixcImlzb184ODU5LTNcIixcImlzb184ODU5LTM6MTk4OFwiLFwibDNcIixcImxhdGluM1wiXSxuYW1lOlwiSVNPLTg4NTktM1wifSx7bGFiZWxzOltcImNzaXNvbGF0aW40XCIsXCJpc28tODg1OS00XCIsXCJpc28taXItMTEwXCIsXCJpc284ODU5LTRcIixcImlzbzg4NTk0XCIsXCJpc29fODg1OS00XCIsXCJpc29fODg1OS00OjE5ODhcIixcImw0XCIsXCJsYXRpbjRcIl0sbmFtZTpcIklTTy04ODU5LTRcIn0se2xhYmVsczpbXCJjc2lzb2xhdGluY3lyaWxsaWNcIixcImN5cmlsbGljXCIsXCJpc28tODg1OS01XCIsXCJpc28taXItMTQ0XCIsXCJpc284ODU5LTVcIixcImlzbzg4NTk1XCIsXCJpc29fODg1OS01XCIsXCJpc29fODg1OS01OjE5ODhcIl0sbmFtZTpcIklTTy04ODU5LTVcIn0se2xhYmVsczpbXCJhcmFiaWNcIixcImFzbW8tNzA4XCIsXCJjc2lzbzg4NTk2ZVwiLFwiY3Npc284ODU5NmlcIixcImNzaXNvbGF0aW5hcmFiaWNcIixcImVjbWEtMTE0XCIsXCJpc28tODg1OS02XCIsXCJpc28tODg1OS02LWVcIixcImlzby04ODU5LTYtaVwiLFwiaXNvLWlyLTEyN1wiLFwiaXNvODg1OS02XCIsXCJpc284ODU5NlwiLFwiaXNvXzg4NTktNlwiLFwiaXNvXzg4NTktNjoxOTg3XCJdLG5hbWU6XCJJU08tODg1OS02XCJ9LHtsYWJlbHM6W1wiY3Npc29sYXRpbmdyZWVrXCIsXCJlY21hLTExOFwiLFwiZWxvdF85MjhcIixcImdyZWVrXCIsXCJncmVlazhcIixcImlzby04ODU5LTdcIixcImlzby1pci0xMjZcIixcImlzbzg4NTktN1wiLFwiaXNvODg1OTdcIixcImlzb184ODU5LTdcIixcImlzb184ODU5LTc6MTk4N1wiLFwic3VuX2V1X2dyZWVrXCJdLG5hbWU6XCJJU08tODg1OS03XCJ9LHtsYWJlbHM6W1wiY3Npc284ODU5OGVcIixcImNzaXNvbGF0aW5oZWJyZXdcIixcImhlYnJld1wiLFwiaXNvLTg4NTktOFwiLFwiaXNvLTg4NTktOC1lXCIsXCJpc28taXItMTM4XCIsXCJpc284ODU5LThcIixcImlzbzg4NTk4XCIsXCJpc29fODg1OS04XCIsXCJpc29fODg1OS04OjE5ODhcIixcInZpc3VhbFwiXSxuYW1lOlwiSVNPLTg4NTktOFwifSx7bGFiZWxzOltcImNzaXNvODg1OThpXCIsXCJpc28tODg1OS04LWlcIixcImxvZ2ljYWxcIl0sbmFtZTpcIklTTy04ODU5LTgtSVwifSx7bGFiZWxzOltcImNzaXNvbGF0aW42XCIsXCJpc28tODg1OS0xMFwiLFwiaXNvLWlyLTE1N1wiLFwiaXNvODg1OS0xMFwiLFwiaXNvODg1OTEwXCIsXCJsNlwiLFwibGF0aW42XCJdLG5hbWU6XCJJU08tODg1OS0xMFwifSx7bGFiZWxzOltcImlzby04ODU5LTEzXCIsXCJpc284ODU5LTEzXCIsXCJpc284ODU5MTNcIl0sbmFtZTpcIklTTy04ODU5LTEzXCJ9LHtsYWJlbHM6W1wiaXNvLTg4NTktMTRcIixcImlzbzg4NTktMTRcIixcImlzbzg4NTkxNFwiXSxuYW1lOlwiSVNPLTg4NTktMTRcIn0se2xhYmVsczpbXCJjc2lzb2xhdGluOVwiLFwiaXNvLTg4NTktMTVcIixcImlzbzg4NTktMTVcIixcImlzbzg4NTkxNVwiLFwiaXNvXzg4NTktMTVcIixcImw5XCJdLG5hbWU6XCJJU08tODg1OS0xNVwifSx7bGFiZWxzOltcImlzby04ODU5LTE2XCJdLG5hbWU6XCJJU08tODg1OS0xNlwifSx7bGFiZWxzOltcImNza29pOHJcIixcImtvaVwiLFwia29pOFwiLFwia29pOC1yXCIsXCJrb2k4X3JcIl0sbmFtZTpcIktPSTgtUlwifSx7bGFiZWxzOltcImtvaTgtcnVcIixcImtvaTgtdVwiXSxuYW1lOlwiS09JOC1VXCJ9LHtsYWJlbHM6W1wiY3NtYWNpbnRvc2hcIixcIm1hY1wiLFwibWFjaW50b3NoXCIsXCJ4LW1hYy1yb21hblwiXSxuYW1lOlwibWFjaW50b3NoXCJ9LHtsYWJlbHM6W1wiZG9zLTg3NFwiLFwiaXNvLTg4NTktMTFcIixcImlzbzg4NTktMTFcIixcImlzbzg4NTkxMVwiLFwidGlzLTYyMFwiLFwid2luZG93cy04NzRcIl0sbmFtZTpcIndpbmRvd3MtODc0XCJ9LHtsYWJlbHM6W1wiY3AxMjUwXCIsXCJ3aW5kb3dzLTEyNTBcIixcIngtY3AxMjUwXCJdLG5hbWU6XCJ3aW5kb3dzLTEyNTBcIn0se2xhYmVsczpbXCJjcDEyNTFcIixcIndpbmRvd3MtMTI1MVwiLFwieC1jcDEyNTFcIl0sbmFtZTpcIndpbmRvd3MtMTI1MVwifSx7bGFiZWxzOltcImFuc2lfeDMuNC0xOTY4XCIsXCJhc2NpaVwiLFwiY3AxMjUyXCIsXCJjcDgxOVwiLFwiY3Npc29sYXRpbjFcIixcImlibTgxOVwiLFwiaXNvLTg4NTktMVwiLFwiaXNvLWlyLTEwMFwiLFwiaXNvODg1OS0xXCIsXCJpc284ODU5MVwiLFwiaXNvXzg4NTktMVwiLFwiaXNvXzg4NTktMToxOTg3XCIsXCJsMVwiLFwibGF0aW4xXCIsXCJ1cy1hc2NpaVwiLFwid2luZG93cy0xMjUyXCIsXCJ4LWNwMTI1MlwiXSxuYW1lOlwid2luZG93cy0xMjUyXCJ9LHtsYWJlbHM6W1wiY3AxMjUzXCIsXCJ3aW5kb3dzLTEyNTNcIixcIngtY3AxMjUzXCJdLG5hbWU6XCJ3aW5kb3dzLTEyNTNcIn0se2xhYmVsczpbXCJjcDEyNTRcIixcImNzaXNvbGF0aW41XCIsXCJpc28tODg1OS05XCIsXCJpc28taXItMTQ4XCIsXCJpc284ODU5LTlcIixcImlzbzg4NTk5XCIsXCJpc29fODg1OS05XCIsXCJpc29fODg1OS05OjE5ODlcIixcImw1XCIsXCJsYXRpbjVcIixcIndpbmRvd3MtMTI1NFwiLFwieC1jcDEyNTRcIl0sbmFtZTpcIndpbmRvd3MtMTI1NFwifSx7bGFiZWxzOltcImNwMTI1NVwiLFwid2luZG93cy0xMjU1XCIsXCJ4LWNwMTI1NVwiXSxuYW1lOlwid2luZG93cy0xMjU1XCJ9LHtsYWJlbHM6W1wiY3AxMjU2XCIsXCJ3aW5kb3dzLTEyNTZcIixcIngtY3AxMjU2XCJdLG5hbWU6XCJ3aW5kb3dzLTEyNTZcIn0se2xhYmVsczpbXCJjcDEyNTdcIixcIndpbmRvd3MtMTI1N1wiLFwieC1jcDEyNTdcIl0sbmFtZTpcIndpbmRvd3MtMTI1N1wifSx7bGFiZWxzOltcImNwMTI1OFwiLFwid2luZG93cy0xMjU4XCIsXCJ4LWNwMTI1OFwiXSxuYW1lOlwid2luZG93cy0xMjU4XCJ9LHtsYWJlbHM6W1wieC1tYWMtY3lyaWxsaWNcIixcIngtbWFjLXVrcmFpbmlhblwiXSxuYW1lOlwieC1tYWMtY3lyaWxsaWNcIn1dLGhlYWRpbmc6XCJMZWdhY3kgc2luZ2xlLWJ5dGUgZW5jb2RpbmdzXCJ9LHtlbmNvZGluZ3M6W3tsYWJlbHM6W1wiY2hpbmVzZVwiLFwiY3NnYjIzMTJcIixcImNzaXNvNThnYjIzMTI4MFwiLFwiZ2IyMzEyXCIsXCJnYl8yMzEyXCIsXCJnYl8yMzEyLTgwXCIsXCJnYmtcIixcImlzby1pci01OFwiLFwieC1nYmtcIl0sbmFtZTpcIkdCS1wifSx7bGFiZWxzOltcImdiMTgwMzBcIl0sbmFtZTpcImdiMTgwMzBcIn1dLGhlYWRpbmc6XCJMZWdhY3kgbXVsdGktYnl0ZSBDaGluZXNlIChzaW1wbGlmaWVkKSBlbmNvZGluZ3NcIn0se2VuY29kaW5nczpbe2xhYmVsczpbXCJiaWc1XCIsXCJiaWc1LWhrc2NzXCIsXCJjbi1iaWc1XCIsXCJjc2JpZzVcIixcIngteC1iaWc1XCJdLG5hbWU6XCJCaWc1XCJ9XSxoZWFkaW5nOlwiTGVnYWN5IG11bHRpLWJ5dGUgQ2hpbmVzZSAodHJhZGl0aW9uYWwpIGVuY29kaW5nc1wifSx7ZW5jb2RpbmdzOlt7bGFiZWxzOltcImNzZXVjcGtkZm10amFwYW5lc2VcIixcImV1Yy1qcFwiLFwieC1ldWMtanBcIl0sbmFtZTpcIkVVQy1KUFwifSx7bGFiZWxzOltcImNzaXNvMjAyMmpwXCIsXCJpc28tMjAyMi1qcFwiXSxuYW1lOlwiSVNPLTIwMjItSlBcIn0se2xhYmVsczpbXCJjc3NoaWZ0amlzXCIsXCJtczkzMlwiLFwibXNfa2FuamlcIixcInNoaWZ0LWppc1wiLFwic2hpZnRfamlzXCIsXCJzamlzXCIsXCJ3aW5kb3dzLTMxalwiLFwieC1zamlzXCJdLG5hbWU6XCJTaGlmdF9KSVNcIn1dLGhlYWRpbmc6XCJMZWdhY3kgbXVsdGktYnl0ZSBKYXBhbmVzZSBlbmNvZGluZ3NcIn0se2VuY29kaW5nczpbe2xhYmVsczpbXCJjc2V1Y2tyXCIsXCJjc2tzYzU2MDExOTg3XCIsXCJldWMta3JcIixcImlzby1pci0xNDlcIixcImtvcmVhblwiLFwia3NfY181NjAxLTE5ODdcIixcImtzX2NfNTYwMS0xOTg5XCIsXCJrc2M1NjAxXCIsXCJrc2NfNTYwMVwiLFwid2luZG93cy05NDlcIl0sbmFtZTpcIkVVQy1LUlwifV0saGVhZGluZzpcIkxlZ2FjeSBtdWx0aS1ieXRlIEtvcmVhbiBlbmNvZGluZ3NcIn0se2VuY29kaW5nczpbe2xhYmVsczpbXCJjc2lzbzIwMjJrclwiLFwiaHotZ2ItMjMxMlwiLFwiaXNvLTIwMjItY25cIixcImlzby0yMDIyLWNuLWV4dFwiLFwiaXNvLTIwMjIta3JcIl0sbmFtZTpcInJlcGxhY2VtZW50XCJ9LHtsYWJlbHM6W1widXRmLTE2YmVcIl0sbmFtZTpcIlVURi0xNkJFXCJ9LHtsYWJlbHM6W1widXRmLTE2XCIsXCJ1dGYtMTZsZVwiXSxuYW1lOlwiVVRGLTE2TEVcIn0se2xhYmVsczpbXCJ4LXVzZXItZGVmaW5lZFwiXSxuYW1lOlwieC11c2VyLWRlZmluZWRcIn1dLGhlYWRpbmc6XCJMZWdhY3kgbWlzY2VsbGFuZW91cyBlbmNvZGluZ3NcIn1dLGQ9e30saD0obi5mb3JFYWNoKGZ1bmN0aW9uKG4pe24uZW5jb2RpbmdzLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5sYWJlbHMuZm9yRWFjaChmdW5jdGlvbihuKXtkW25dPWV9KX0pfSkse30pLGc9e307ZnVuY3Rpb24geShuLGUpe3JldHVybiBlJiZlW25dfHxudWxsfWZ1bmN0aW9uIHAobixlKXtlPWUuaW5kZXhPZihuKTtyZXR1cm4tMT09PWU/bnVsbDplfWZ1bmN0aW9uIHYobil7aWYoXCJlbmNvZGluZy1pbmRleGVzXCJpbiBpKXJldHVybiBpW1wiZW5jb2RpbmctaW5kZXhlc1wiXVtuXTt0aHJvdyBFcnJvcihcIkluZGV4ZXMgbWlzc2luZy4gRGlkIHlvdSBmb3JnZXQgdG8gaW5jbHVkZSBlbmNvZGluZy1pbmRleGVzLmpzIGZpcnN0P1wiKX12YXIgeD1cInV0Zi04XCI7ZnVuY3Rpb24gTyhuLGUpe2lmKCEodGhpcyBpbnN0YW5jZW9mIE8pKXRocm93IFR5cGVFcnJvcihcIkNhbGxlZCBhcyBhIGZ1bmN0aW9uLiBEaWQgeW91IGZvcmdldCAnbmV3Jz9cIik7bj12b2lkIDAhPT1uP1N0cmluZyhuKTp4LGU9cyhlKSx0aGlzLl9lbmNvZGluZz1udWxsLHRoaXMuX2RlY29kZXI9bnVsbCx0aGlzLl9pZ25vcmVCT009ITEsdGhpcy5fQk9Nc2Vlbj0hMSx0aGlzLl9lcnJvcl9tb2RlPVwicmVwbGFjZW1lbnRcIix0aGlzLl9kb19ub3RfZmx1c2g9ITE7dmFyIGk9cihuKTtpZihudWxsPT09aXx8XCJyZXBsYWNlbWVudFwiPT09aS5uYW1lKXRocm93IFJhbmdlRXJyb3IoXCJVbmtub3duIGVuY29kaW5nOiBcIituKTtpZihnW2kubmFtZV0pcmV0dXJuKG49dGhpcykuX2VuY29kaW5nPWksQm9vbGVhbihlLmZhdGFsKSYmKG4uX2Vycm9yX21vZGU9XCJmYXRhbFwiKSxCb29sZWFuKGUuaWdub3JlQk9NKSYmKG4uX2lnbm9yZUJPTT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5fHwodGhpcy5lbmNvZGluZz1uLl9lbmNvZGluZy5uYW1lLnRvTG93ZXJDYXNlKCksdGhpcy5mYXRhbD1cImZhdGFsXCI9PT1uLl9lcnJvcl9tb2RlLHRoaXMuaWdub3JlQk9NPW4uX2lnbm9yZUJPTSksbjt0aHJvdyBFcnJvcihcIkRlY29kZXIgbm90IHByZXNlbnQuIERpZCB5b3UgZm9yZ2V0IHRvIGluY2x1ZGUgZW5jb2RpbmctaW5kZXhlcy5qcyBmaXJzdD9cIil9ZnVuY3Rpb24gayhuLGUpe2lmKCEodGhpcyBpbnN0YW5jZW9mIGspKXRocm93IFR5cGVFcnJvcihcIkNhbGxlZCBhcyBhIGZ1bmN0aW9uLiBEaWQgeW91IGZvcmdldCAnbmV3Jz9cIik7ZT1zKGUpLHRoaXMuX2VuY29kaW5nPW51bGwsdGhpcy5fZW5jb2Rlcj1udWxsLHRoaXMuX2RvX25vdF9mbHVzaD0hMSx0aGlzLl9mYXRhbD1Cb29sZWFuKGUuZmF0YWwpP1wiZmF0YWxcIjpcInJlcGxhY2VtZW50XCI7aWYoQm9vbGVhbihlLk5PTlNUQU5EQVJEX2FsbG93TGVnYWN5RW5jb2RpbmcpKXtlPXIobj12b2lkIDAhPT1uP1N0cmluZyhuKTp4KTtpZihudWxsPT09ZXx8XCJyZXBsYWNlbWVudFwiPT09ZS5uYW1lKXRocm93IFJhbmdlRXJyb3IoXCJVbmtub3duIGVuY29kaW5nOiBcIituKTtpZighaFtlLm5hbWVdKXRocm93IEVycm9yKFwiRW5jb2RlciBub3QgcHJlc2VudC4gRGlkIHlvdSBmb3JnZXQgdG8gaW5jbHVkZSBlbmNvZGluZy1pbmRleGVzLmpzIGZpcnN0P1wiKTt0aGlzLl9lbmNvZGluZz1lfWVsc2UgdGhpcy5fZW5jb2Rpbmc9cihcInV0Zi04XCIpLHZvaWQgMCE9PW4mJlwiY29uc29sZVwiaW4gaSYmY29uc29sZS53YXJuKFwiVGV4dEVuY29kZXIgY29uc3RydWN0b3IgY2FsbGVkIHdpdGggZW5jb2RpbmcgbGFiZWwsIHdoaWNoIGlzIGlnbm9yZWQuXCIpO3JldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHl8fCh0aGlzLmVuY29kaW5nPXRoaXMuX2VuY29kaW5nLm5hbWUudG9Mb3dlckNhc2UoKSksdGhpc31mdW5jdGlvbiBlKG4pe3ZhciByPW4uZmF0YWwsdD0wLG89MCxzPTAsbD0xMjgsYT0xOTE7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7aWYoZT09PWImJjAhPT1zKXJldHVybiBzPTAsbShyKTtpZihlPT09YilyZXR1cm4gdztpZigwPT09cyl7aWYoXyhlLDAsMTI3KSlyZXR1cm4gZTtpZihfKGUsMTk0LDIyMykpcz0xLHQ9MzEmZTtlbHNlIGlmKF8oZSwyMjQsMjM5KSkyMjQ9PT1lJiYobD0xNjApLDIzNz09PWUmJihhPTE1OSkscz0yLHQ9MTUmZTtlbHNle2lmKCFfKGUsMjQwLDI0NCkpcmV0dXJuIG0ocik7MjQwPT09ZSYmKGw9MTQ0KSwyNDQ9PT1lJiYoYT0xNDMpLHM9Myx0PTcmZX1yZXR1cm4gbnVsbH12YXIgaTtyZXR1cm4gXyhlLGwsYSk/KGw9MTI4LGE9MTkxLHQ9dDw8Nnw2MyZlLChvKz0xKSE9PXM/bnVsbDooaT10LHQ9cz1vPTAsaSkpOih0PXM9bz0wLGw9MTI4LGE9MTkxLG4ucHJlcGVuZChlKSxtKHIpKX19ZnVuY3Rpb24gRShuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe2lmKGU9PT1iKXJldHVybiB3O2lmKGEoZSkpcmV0dXJuIGU7XyhlLDEyOCwyMDQ3KT8oaT0xLHI9MTkyKTpfKGUsMjA0OCw2NTUzNSk/KGk9MixyPTIyNCk6XyhlLDY1NTM2LDExMTQxMTEpJiYoaT0zLHI9MjQwKTtmb3IodmFyIGkscix0PVsoZT4+NippKStyXTswPGk7KXQucHVzaCgxMjh8NjMmZT4+NiooaS0xKSksLS1pO3JldHVybiB0fX1mdW5jdGlvbiBqKGksbil7dmFyIHI9bi5mYXRhbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXtyZXR1cm4gZT09PWI/dzp1KGUpP2U6bnVsbD09PShlPWlbZS0xMjhdKT9tKHIpOmV9fWZ1bmN0aW9uIEIocixuKXtuLmZhdGFsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpO3JldHVybiBlPT09Yj93OmEoZSk/ZToobnVsbD09PShpPXAoZSxyKSkmJmYoZSksaSsxMjgpfX1mdW5jdGlvbiBTKG4pe3ZhciBvPW4uZmF0YWwscz0wLGw9MCxhPTA7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGkscix0O3JldHVybiBlPT09YiYmMD09PXMmJjA9PT1sJiYwPT09YT93OihlIT09Ynx8MD09PXMmJjA9PT1sJiYwPT09YXx8KGE9bD1zPTAsbShvKSksMCE9PWE/KGk9bnVsbCxfKGUsNDgsNTcpJiYoaT1mdW5jdGlvbihuKXtpZigzOTQxOTxuJiZuPDE4OWUzfHwxMjM3NTc1PG4pcmV0dXJuIG51bGw7aWYoNzQ1Nz09PW4pcmV0dXJuIDU5MzM1O2Zvcih2YXIgZT0wLGk9MCxyPXYoXCJnYjE4MDMwLXJhbmdlc1wiKSx0PTA7dDxyLmxlbmd0aDsrK3Qpe3ZhciBvPXJbdF07aWYoIShvWzBdPD1uKSlicmVhaztlPW9bMF0saT1vWzFdfXJldHVybiBpK24tZX0oMTAqKDEyNiooMTAqKHMtMTI5KStsLTQ4KSthLTEyOSkrZS00OCkpLHI9W2wsYSxlXSxhPWw9cz0wLG51bGw9PT1pPyhuLnByZXBlbmQociksbShvKSk6aSk6MCE9PWw/XyhlLDEyOSwyNTQpPyhhPWUsbnVsbCk6KG4ucHJlcGVuZChbbCxlXSksbD1zPTAsbShvKSk6MCE9PXM/XyhlLDQ4LDU3KT8obD1lLG51bGwpOihyPXMscz0wLCh0PW51bGwpPT09KGk9bnVsbD09PSh0PV8oZSw2NCwxMjYpfHxfKGUsMTI4LDI1NCk/MTkwKihyLTEyOSkrKGUtKGU8MTI3PzY0OjY1KSk6dCk/bnVsbDp5KHQsdihcImdiMTgwMzBcIikpKSYmdShlKSYmbi5wcmVwZW5kKGUpLG51bGw9PT1pP20obyk6aSk6dShlKT9lOjEyOD09PWU/ODM2NDpfKGUsMTI5LDI1NCk/KHM9ZSxudWxsKTptKG8pKX19ZnVuY3Rpb24gVChuLHQpe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGkscjtyZXR1cm4gZT09PWI/dzphKGUpP2U6NTg4NTM9PT1lP2YoZSk6dCYmODM2ND09PWU/MTI4Om51bGwhPT0oaT1wKGUsdihcImdiMTgwMzBcIikpKT8ocj1pJTE5MCxbbChpLzE5MCkrMTI5LHIrKHI8NjM/NjQ6NjUpXSk6dD9mKGUpOihpPWZ1bmN0aW9uKG4pe2lmKDU5MzM1PT09bilyZXR1cm4gNzQ1Nztmb3IodmFyIGU9MCxpPTAscj12KFwiZ2IxODAzMC1yYW5nZXNcIiksdD0wO3Q8ci5sZW5ndGg7Kyt0KXt2YXIgbz1yW3RdO2lmKCEob1sxXTw9bikpYnJlYWs7ZT1vWzFdLGk9b1swXX1yZXR1cm4gaStuLWV9KGUpLFsocj1sKGkvMTAvMTI2LzEwKSkrMTI5LChlPWwoKGktPTEwKnIqMTI2KjEwKS8xMC8xMjYpKSs0OCwocj1sKChpLT0xMCplKjEyNikvMTApKSsxMjksNDgrKGktMTAqcildKX19ZnVuY3Rpb24gSShuKXt2YXIgdD1uLmZhdGFsLG89MDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXtpZihlPT09YiYmMCE9PW8pcmV0dXJuIG89MCxtKHQpO2lmKGU9PT1iJiYwPT09bylyZXR1cm4gdztpZigwPT09bylyZXR1cm4gdShlKT9lOl8oZSwxMjksMjU0KT8obz1lLG51bGwpOm0odCk7dmFyIGk9byxyPW51bGw7c3dpdGNoKG89MCxyPV8oZSw2NCwxMjYpfHxfKGUsMTYxLDI1NCk/MTU3KihpLTEyOSkrKGUtKGU8MTI3PzY0Ojk4KSk6cil7Y2FzZSAxMTMzOnJldHVyblsyMDIsNzcyXTtjYXNlIDExMzU6cmV0dXJuWzIwMiw3ODBdO2Nhc2UgMTE2NDpyZXR1cm5bMjM0LDc3Ml07Y2FzZSAxMTY2OnJldHVyblsyMzQsNzgwXX1pPW51bGw9PT1yP251bGw6eShyLHYoXCJiaWc1XCIpKTtyZXR1cm4gbnVsbD09PWkmJnUoZSkmJm4ucHJlcGVuZChlKSxudWxsPT09aT9tKHQpOml9fWZ1bmN0aW9uIFUobil7bi5mYXRhbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXt2YXIgaSxyO3JldHVybiBlPT09Yj93OmEoZSk/ZTooaT1lLHI9bz1vfHx2KFwiYmlnNVwiKS5tYXAoZnVuY3Rpb24obixlKXtyZXR1cm4gZTw1MDI0P251bGw6bn0pLG51bGw9PT0oaT05NTUyPT09aXx8OTU2Nj09PWl8fDk1Njk9PT1pfHw5NTc4PT09aXx8MjEzMTM9PT1pfHwyMTMxNz09PWk/ci5sYXN0SW5kZXhPZihpKTpwKGkscikpfHwocj1sKGkvMTU3KSsxMjkpPDE2MT9mKGUpOltyLChlPWklMTU3KSsoZTw2Mz82NDo5OCldKX19ZnVuY3Rpb24gQyhuKXt2YXIgdD1uLmZhdGFsLG89ITEscz0wO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpLHI7cmV0dXJuIGU9PT1iJiYwIT09cz8ocz0wLG0odCkpOmU9PT1iJiYwPT09cz93OjE0Mj09PXMmJl8oZSwxNjEsMjIzKT8ocz0wLDY1MjE2K2UpOjE0Mz09PXMmJl8oZSwxNjEsMjU0KT8obz0hMCxzPWUsbnVsbCk6MCE9PXM/KGk9cyxzPTAscj1udWxsLF8oaSwxNjEsMjU0KSYmXyhlLDE2MSwyNTQpJiYocj15KDk0KihpLTE2MSkrKGUtMTYxKSx2KG8/XCJqaXMwMjEyXCI6XCJqaXMwMjA4XCIpKSksbz0hMSxfKGUsMTYxLDI1NCl8fG4ucHJlcGVuZChlKSxudWxsPT09cj9tKHQpOnIpOnUoZSk/ZToxNDI9PT1lfHwxNDM9PT1lfHxfKGUsMTYxLDI1NCk/KHM9ZSxudWxsKTptKHQpfX1mdW5jdGlvbiBQKG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGk7cmV0dXJuIGU9PT1iP3c6YShlKT9lOjE2NT09PWU/OTI6ODI1ND09PWU/MTI2Ol8oZSw2NTM3Nyw2NTQzOSk/WzE0MixlLTY1Mzc3KzE2MV06bnVsbD09PShpPXAoZT04NzIyPT09ZT82NTI5MzplLHYoXCJqaXMwMjA4XCIpKSk/ZihlKTpbbChpLzk0KSsxNjEsaSU5NCsxNjFdfX1mdW5jdGlvbiBEKG4pe3ZhciB0PW4uZmF0YWwsbz0wLHM9MSxsPTIsYT0zLHU9NCxjPTUsZj02LGQ9byxoPW8sZz0wLHA9ITE7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7c3dpdGNoKGQpe2RlZmF1bHQ6Y2FzZSBvOnJldHVybiAyNz09PWU/KGQ9YyxudWxsKTpfKGUsMCwxMjcpJiYxNCE9PWUmJjE1IT09ZSYmMjchPT1lPyhwPSExLGUpOmU9PT1iP3c6KHA9ITEsbSh0KSk7Y2FzZSBzOnJldHVybiAyNz09PWU/KGQ9YyxudWxsKTo5Mj09PWU/KHA9ITEsMTY1KToxMjY9PT1lPyhwPSExLDgyNTQpOl8oZSwwLDEyNykmJjE0IT09ZSYmMTUhPT1lJiYyNyE9PWUmJjkyIT09ZSYmMTI2IT09ZT8ocD0hMSxlKTplPT09Yj93OihwPSExLG0odCkpO2Nhc2UgbDpyZXR1cm4gMjc9PT1lPyhkPWMsbnVsbCk6XyhlLDMzLDk1KT8ocD0hMSw2NTM0NCtlKTplPT09Yj93OihwPSExLG0odCkpO2Nhc2UgYTpyZXR1cm4gMjc9PT1lPyhkPWMsbnVsbCk6XyhlLDMzLDEyNik/KHA9ITEsZz1lLGQ9dSxudWxsKTplPT09Yj93OihwPSExLG0odCkpO2Nhc2UgdTppZigyNz09PWUpZD1jO2Vsc2V7aWYoXyhlLDMzLDEyNikpcmV0dXJuIGQ9YSxudWxsPT09KGk9eSg5NCooZy0zMykrZS0zMyx2KFwiamlzMDIwOFwiKSkpP20odCk6aTtlPT09Yj8oZD1hLG4ucHJlcGVuZChlKSk6ZD1hfXJldHVybiBtKHQpO2Nhc2UgYzpyZXR1cm4gMzY9PT1lfHw0MD09PWU/KGc9ZSxkPWYsbnVsbCk6KG4ucHJlcGVuZChlKSxwPSExLGQ9aCxtKHQpKTtjYXNlIGY6dmFyIGk9ZyxyPShnPTAsbnVsbCk7cmV0dXJuKDQwPT09aSYmNjY9PT1lJiYocj1vKSw0MD09PWkmJjc0PT09ZSYmKHI9cyksNDA9PT1pJiY3Mz09PWUmJihyPWwpLG51bGwhPT0ocj0zNiE9PWl8fDY0IT09ZSYmNjYhPT1lP3I6YSkpPyhkPXIscj1wLHA9ITAscj9tKHQpOm51bGwpOihuLnByZXBlbmQoW2ksZV0pLHA9ITEsZD1oLG0odCkpfX19ZnVuY3Rpb24gRihuKXtuLmZhdGFsO3ZhciByPTAsdD0xLG89MixzPXI7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7aWYoZT09PWImJnMhPT1yKXJldHVybiBuLnByZXBlbmQoZSkscz1yLFsyNyw0MCw2Nl07aWYoZT09PWImJnM9PT1yKXJldHVybiB3O2lmKCEocyE9PXImJnMhPT10fHwxNCE9PWUmJjE1IT09ZSYmMjchPT1lKSlyZXR1cm4gZig2NTUzMyk7aWYocz09PXImJmEoZSkpcmV0dXJuIGU7aWYocz09PXQmJihhKGUpJiY5MiE9PWUmJjEyNiE9PWV8fDE2NT09ZXx8ODI1ND09ZSkpe2lmKGEoZSkpcmV0dXJuIGU7aWYoMTY1PT09ZSlyZXR1cm4gOTI7aWYoODI1ND09PWUpcmV0dXJuIDEyNn12YXIgaTtyZXR1cm4gYShlKSYmcyE9PXI/KG4ucHJlcGVuZChlKSxzPXIsWzI3LDQwLDY2XSk6MTY1IT09ZSYmODI1NCE9PWV8fHM9PT10P251bGw9PT0oaT1wKGU9ODcyMj09PWU/NjUyOTM6ZSx2KFwiamlzMDIwOFwiKSkpP2YoZSk6cyE9PW8/KG4ucHJlcGVuZChlKSxzPW8sWzI3LDM2LDY2XSk6W2woaS85NCkrMzMsaSU5NCszM106KG4ucHJlcGVuZChlKSxzPXQsWzI3LDQwLDc0XSl9fWZ1bmN0aW9uIEoobil7dmFyIHQ9bi5mYXRhbCxvPTA7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGkscjtyZXR1cm4gZT09PWImJjAhPT1vPyhvPTAsbSh0KSk6ZT09PWImJjA9PT1vP3c6MCE9PW8/KHI9byxpPW51bGwsbz0wLChfKGUsNjQsMTI2KXx8XyhlLDEyOCwyNTIpKSYmKGk9MTg4KihyLShyPDE2MD8xMjk6MTkzKSkrZS0oZTwxMjc/NjQ6NjUpKSxfKGksODgzNiwxMDcxNSk/NDg1MDgraToobnVsbD09PShyPW51bGw9PT1pP251bGw6eShpLHYoXCJqaXMwMjA4XCIpKSkmJnUoZSkmJm4ucHJlcGVuZChlKSxudWxsPT09cj9tKHQpOnIpKTp1KGUpfHwxMjg9PT1lP2U6XyhlLDE2MSwyMjMpPzY1MjE2K2U6XyhlLDEyOSwxNTkpfHxfKGUsMjI0LDI1Mik/KG89ZSxudWxsKTptKHQpfX1mdW5jdGlvbiBLKG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGk7cmV0dXJuIGU9PT1iP3c6YShlKXx8MTI4PT09ZT9lOjE2NT09PWU/OTI6ODI1ND09PWU/MTI2Ol8oZSw2NTM3Nyw2NTQzOSk/ZS02NTM3NysxNjE6KGk9ZT04NzIyPT09ZT82NTI5MzplLG51bGw9PT0oaT0odD10fHx2KFwiamlzMDIwOFwiKS5tYXAoZnVuY3Rpb24obixlKXtyZXR1cm4gXyhlLDgyNzIsODgzNSk/bnVsbDpufSkpLmluZGV4T2YoaSkpP2YoZSk6WyhlPWwoaS8xODgpKSsoZTwzMT8xMjk6MTkzKSwoZT1pJTE4OCkrKGU8NjM/NjQ6NjUpXSl9fWZ1bmN0aW9uIFIobil7dmFyIHQ9bi5mYXRhbCxvPTA7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7dmFyIGkscjtyZXR1cm4gZT09PWImJjAhPT1vPyhvPTAsbSh0KSk6ZT09PWImJjA9PT1vP3c6MCE9PW8/KHI9byxvPTAscj0oaT1udWxsKT09PShpPV8oZSw2NSwyNTQpPzE5MCooci0xMjkpKyhlLTY1KTppKT9udWxsOnkoaSx2KFwiZXVjLWtyXCIpKSxudWxsPT09aSYmdShlKSYmbi5wcmVwZW5kKGUpLG51bGw9PT1yP20odCk6cik6dShlKT9lOl8oZSwxMjksMjU0KT8obz1lLG51bGwpOm0odCl9fWZ1bmN0aW9uIEcobil7bi5mYXRhbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXt2YXIgaTtyZXR1cm4gZT09PWI/dzphKGUpP2U6bnVsbD09PShpPXAoZSx2KFwiZXVjLWtyXCIpKSk/ZihlKTpbbChpLzE5MCkrMTI5LGklMTkwKzY1XX19ZnVuY3Rpb24gQShuLGUpe3ZhciBpPW4+Pjgsbj0yNTUmbjtyZXR1cm4gZT9baSxuXTpbbixpXX1mdW5jdGlvbiBMKHIsbil7dmFyIHQ9bi5mYXRhbCxvPW51bGwscz1udWxsO3RoaXMuaGFuZGxlcj1mdW5jdGlvbihuLGUpe3ZhciBpO3JldHVybiBlIT09Ynx8bnVsbD09PW8mJm51bGw9PT1zP2U9PT1iJiZudWxsPT09byYmbnVsbD09PXM/dzpudWxsPT09bz8obz1lLG51bGwpOihlPXI/KG88PDgpK2U6KGU8PDgpK28sKG89bnVsbCkhPT1zPyhpPXMscz1udWxsLF8oZSw1NjMyMCw1NzM0Myk/NjU1MzYrMTAyNCooaS01NTI5NikrKGUtNTYzMjApOihuLnByZXBlbmQoQShlLHIpKSxtKHQpKSk6XyhlLDU1Mjk2LDU2MzE5KT8ocz1lLG51bGwpOl8oZSw1NjMyMCw1NzM0Myk/bSh0KTplKTptKHQpfX1mdW5jdGlvbiBNKHIsbil7bi5mYXRhbDt0aGlzLmhhbmRsZXI9ZnVuY3Rpb24obixlKXt2YXIgaTtyZXR1cm4gZT09PWI/dzpfKGUsMCw2NTUzNSk/QShlLHIpOihpPUEoNTUyOTYrKGUtNjU1MzY+PjEwKSxyKSxlPUEoNTYzMjArKGUtNjU1MzYmMTAyMyksciksaS5jb25jYXQoZSkpfX1mdW5jdGlvbiBOKG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7cmV0dXJuIGU9PT1iP3c6dShlKT9lOjYzMzYwK2UtMTI4fX1mdW5jdGlvbiBxKG4pe24uZmF0YWw7dGhpcy5oYW5kbGVyPWZ1bmN0aW9uKG4sZSl7cmV0dXJuIGU9PT1iP3c6YShlKT9lOl8oZSw2MzM2MCw2MzQ4Nyk/ZS02MzM2MCsxMjg6ZihlKX19T2JqZWN0LmRlZmluZVByb3BlcnR5JiYoT2JqZWN0LmRlZmluZVByb3BlcnR5KE8ucHJvdG90eXBlLFwiZW5jb2RpbmdcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2VuY29kaW5nLm5hbWUudG9Mb3dlckNhc2UoKX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoTy5wcm90b3R5cGUsXCJmYXRhbFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm5cImZhdGFsXCI9PT10aGlzLl9lcnJvcl9tb2RlfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLnByb3RvdHlwZSxcImlnbm9yZUJPTVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5faWdub3JlQk9NfX0pKSxPLnByb3RvdHlwZS5kZWNvZGU9ZnVuY3Rpb24obixlKXtuPVwib2JqZWN0XCI9PXR5cGVvZiBuJiZuIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/bmV3IFVpbnQ4QXJyYXkobik6XCJvYmplY3RcIj09dHlwZW9mIG4mJlwiYnVmZmVyXCJpbiBuJiZuLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyP25ldyBVaW50OEFycmF5KG4uYnVmZmVyLG4uYnl0ZU9mZnNldCxuLmJ5dGVMZW5ndGgpOm5ldyBVaW50OEFycmF5KDApO2U9cyhlKSx0aGlzLl9kb19ub3RfZmx1c2h8fCh0aGlzLl9kZWNvZGVyPWdbdGhpcy5fZW5jb2RpbmcubmFtZV0oe2ZhdGFsOlwiZmF0YWxcIj09PXRoaXMuX2Vycm9yX21vZGV9KSx0aGlzLl9CT01zZWVuPSExKSx0aGlzLl9kb19ub3RfZmx1c2g9Qm9vbGVhbihlLnN0cmVhbSk7Zm9yKHZhciBpLHI9bmV3IGMobiksdD1bXTs7KXt2YXIgbz1yLnJlYWQoKTtpZihvPT09YilicmVhaztpZigoaT10aGlzLl9kZWNvZGVyLmhhbmRsZXIocixvKSk9PT13KWJyZWFrO251bGwhPT1pJiYoQXJyYXkuaXNBcnJheShpKT90LnB1c2guYXBwbHkodCxpKTp0LnB1c2goaSkpfWlmKCF0aGlzLl9kb19ub3RfZmx1c2gpe2Zvcig7KGk9dGhpcy5fZGVjb2Rlci5oYW5kbGVyKHIsci5yZWFkKCkpKSE9PXcmJihudWxsIT09aSYmKEFycmF5LmlzQXJyYXkoaSk/dC5wdXNoLmFwcGx5KHQsaSk6dC5wdXNoKGkpKSwhci5lbmRPZlN0cmVhbSgpKTspO3RoaXMuX2RlY29kZXI9bnVsbH1yZXR1cm4gZnVuY3Rpb24obil7ZT1bXCJVVEYtOFwiLFwiVVRGLTE2TEVcIixcIlVURi0xNkJFXCJdLGk9dGhpcy5fZW5jb2RpbmcubmFtZSwtMT09PWUuaW5kZXhPZihpKXx8dGhpcy5faWdub3JlQk9NfHx0aGlzLl9CT01zZWVufHwoMDxuLmxlbmd0aCYmNjUyNzk9PT1uWzBdPyh0aGlzLl9CT01zZWVuPSEwLG4uc2hpZnQoKSk6MDxuLmxlbmd0aCYmKHRoaXMuX0JPTXNlZW49ITApKTtmb3IodmFyIGUsaSxyPW4sdD1cIlwiLG89MDtvPHIubGVuZ3RoOysrbyl7dmFyIHM9cltvXTtzPD02NTUzNT90Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKHMpOihzLT02NTUzNix0Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2KyhzPj4xMCksNTYzMjArKDEwMjMmcykpKX1yZXR1cm4gdH0uY2FsbCh0aGlzLHQpfSxPYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShrLnByb3RvdHlwZSxcImVuY29kaW5nXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9lbmNvZGluZy5uYW1lLnRvTG93ZXJDYXNlKCl9fSksay5wcm90b3R5cGUuZW5jb2RlPWZ1bmN0aW9uKG4sZSl7bj12b2lkIDA9PT1uP1wiXCI6U3RyaW5nKG4pLGU9cyhlKSx0aGlzLl9kb19ub3RfZmx1c2h8fCh0aGlzLl9lbmNvZGVyPWhbdGhpcy5fZW5jb2RpbmcubmFtZV0oe2ZhdGFsOlwiZmF0YWxcIj09PXRoaXMuX2ZhdGFsfSkpLHRoaXMuX2RvX25vdF9mbHVzaD1Cb29sZWFuKGUuc3RyZWFtKTtmb3IodmFyIGkscj1uZXcgYyhmdW5jdGlvbihuKXtmb3IodmFyIGU9U3RyaW5nKG4pLGk9ZS5sZW5ndGgscj0wLHQ9W107cjxpOyl7dmFyIG8scz1lLmNoYXJDb2RlQXQocik7czw1NTI5Nnx8NTczNDM8cz90LnB1c2gocyk6NTYzMjA8PXMmJnM8PTU3MzQzP3QucHVzaCg2NTUzMyk6NTUyOTY8PXMmJnM8PTU2MzE5JiYociE9PWktMSYmNTYzMjA8PShvPWUuY2hhckNvZGVBdChyKzEpKSYmbzw9NTczNDM/KHQucHVzaCg2NTUzNisoKDEwMjMmcyk8PDEwKSsoMTAyMyZvKSkscis9MSk6dC5wdXNoKDY1NTMzKSkscis9MX1yZXR1cm4gdH0obikpLHQ9W107Oyl7dmFyIG89ci5yZWFkKCk7aWYobz09PWIpYnJlYWs7aWYoKGk9dGhpcy5fZW5jb2Rlci5oYW5kbGVyKHIsbykpPT09dylicmVhaztBcnJheS5pc0FycmF5KGkpP3QucHVzaC5hcHBseSh0LGkpOnQucHVzaChpKX1pZighdGhpcy5fZG9fbm90X2ZsdXNoKXtmb3IoOzspe2lmKChpPXRoaXMuX2VuY29kZXIuaGFuZGxlcihyLHIucmVhZCgpKSk9PT13KWJyZWFrO0FycmF5LmlzQXJyYXkoaSk/dC5wdXNoLmFwcGx5KHQsaSk6dC5wdXNoKGkpfXRoaXMuX2VuY29kZXI9bnVsbH1yZXR1cm4gbmV3IFVpbnQ4QXJyYXkodCl9LGhbXCJVVEYtOFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEUobil9LGdbXCJVVEYtOFwiXT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IGUobil9LFwiZW5jb2RpbmctaW5kZXhlc1wiaW4gaSYmbi5mb3JFYWNoKGZ1bmN0aW9uKG4pe1wiTGVnYWN5IHNpbmdsZS1ieXRlIGVuY29kaW5nc1wiPT09bi5oZWFkaW5nJiZuLmVuY29kaW5ncy5mb3JFYWNoKGZ1bmN0aW9uKG4pe3ZhciBuPW4ubmFtZSxlPXYobi50b0xvd2VyQ2FzZSgpKTtnW25dPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgaihlLG4pfSxoW25dPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgQihlLG4pfX0pfSksZy5HQks9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBTKG4pfSxoLkdCSz1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IFQobiwhMCl9LGguZ2IxODAzMD1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IFQobil9LGcuZ2IxODAzMD1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IFMobil9LGguQmlnNT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IFUobil9LGcuQmlnNT1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEkobil9LGhbXCJFVUMtSlBcIl09ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBQKG4pfSxnW1wiRVVDLUpQXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgQyhuKX0saFtcIklTTy0yMDIyLUpQXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgRihuKX0sZ1tcIklTTy0yMDIyLUpQXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgRChuKX0saC5TaGlmdF9KSVM9ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBLKG4pfSxnLlNoaWZ0X0pJUz1mdW5jdGlvbihuKXtyZXR1cm4gbmV3IEoobil9LGhbXCJFVUMtS1JcIl09ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBHKG4pfSxnW1wiRVVDLUtSXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgUihuKX0saFtcIlVURi0xNkJFXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgTSghMCxuKX0sZ1tcIlVURi0xNkJFXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgTCghMCxuKX0saFtcIlVURi0xNkxFXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgTSghMSxuKX0sZ1tcIlVURi0xNkxFXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgTCghMSxuKX0saFtcIngtdXNlci1kZWZpbmVkXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgcShuKX0sZ1tcIngtdXNlci1kZWZpbmVkXCJdPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgTihuKX0saS5UZXh0RW5jb2Rlcnx8KGkuVGV4dEVuY29kZXI9ayksaS5UZXh0RGVjb2Rlcnx8KGkuVGV4dERlY29kZXI9TyksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz17VGV4dEVuY29kZXI6aS5UZXh0RW5jb2RlcixUZXh0RGVjb2RlcjppLlRleHREZWNvZGVyLEVuY29kaW5nSW5kZXhlczppW1wiZW5jb2RpbmctaW5kZXhlc1wiXX0pfSh0aGlzfHx7fSk7XG5cdFx0XHRcdFx0Ly8gQHByb3RvYnVmLXRzL3J1bnRpbWVcblx0XHRcdFx0XHQoaT0+e2kuc3ltYm9sPVN5bWJvbC5mb3IoXCJwcm90b2J1Zi10cy91bmtub3duXCIpLGkub25SZWFkPShlLHIsdCxhLG4pPT57KHMocik/cltpLnN5bWJvbF06cltpLnN5bWJvbF09W10pLnB1c2goe25vOnQsd2lyZVR5cGU6YSxkYXRhOm59KX0saS5vbldyaXRlPShlLHIsdCk9Pntmb3IodmFye25vOmEsd2lyZVR5cGU6bixkYXRhOnN9b2YgaS5saXN0KHIpKXQudGFnKGEsbikucmF3KHMpfSxpLmxpc3Q9KGUscik9PntyZXR1cm4gcyhlKT8oZT1lW2kuc3ltYm9sXSxyP2UuZmlsdGVyKGU9PmUubm89PXIpOmUpOltdfSxpLmxhc3Q9KGUscik9PigwLGkubGlzdCkoZSxyKS5zbGljZSgtMSlbMF07Y29uc3Qgcz1lPT5lJiZBcnJheS5pc0FycmF5KGVbaS5zeW1ib2xdKX0pKFVua25vd25GaWVsZEhhbmRsZXI9VW5rbm93bkZpZWxkSGFuZGxlcnx8e30pO1xuXHRcdFx0XHRcdHZhciBVbmtub3duRmllbGRIYW5kbGVyLFdpcmVUeXBlPShlPT4oZVtlLlZhcmludD0wXT1cIlZhcmludFwiLGVbZS5CaXQ2ND0xXT1cIkJpdDY0XCIsZVtlLkxlbmd0aERlbGltaXRlZD0yXT1cIkxlbmd0aERlbGltaXRlZFwiLGVbZS5TdGFydEdyb3VwPTNdPVwiU3RhcnRHcm91cFwiLGVbZS5FbmRHcm91cD00XT1cIkVuZEdyb3VwXCIsZVtlLkJpdDMyPTVdPVwiQml0MzJcIixlKSkoV2lyZVR5cGV8fHt9KTtjb25zdCBNRVNTQUdFX1RZUEU9U3ltYm9sLmZvcihcInByb3RvYnVmLXRzL21lc3NhZ2UtdHlwZVwiKTtmdW5jdGlvbiBsb3dlckNhbWVsQ2FzZShyKXtsZXQgdD0hMTt2YXIgYT1bXTtmb3IobGV0IGU9MDtlPHIubGVuZ3RoO2UrKyl7dmFyIG49ci5jaGFyQXQoZSk7XCJfXCI9PW4/dD0hMDovXFxkLy50ZXN0KG4pPyhhLnB1c2gobiksdD0hMCk6dD8oYS5wdXNoKG4udG9VcHBlckNhc2UoKSksdD0hMSk6MD09ZT9hLnB1c2gobi50b0xvd2VyQ2FzZSgpKTphLnB1c2gobil9cmV0dXJuIGEuam9pbihcIlwiKX12YXIgU2NhbGFyVHlwZT0oZT0+KGVbZS5ET1VCTEU9MV09XCJET1VCTEVcIixlW2UuRkxPQVQ9Ml09XCJGTE9BVFwiLGVbZS5JTlQ2ND0zXT1cIklOVDY0XCIsZVtlLlVJTlQ2ND00XT1cIlVJTlQ2NFwiLGVbZS5JTlQzMj01XT1cIklOVDMyXCIsZVtlLkZJWEVENjQ9Nl09XCJGSVhFRDY0XCIsZVtlLkZJWEVEMzI9N109XCJGSVhFRDMyXCIsZVtlLkJPT0w9OF09XCJCT09MXCIsZVtlLlNUUklORz05XT1cIlNUUklOR1wiLGVbZS5CWVRFUz0xMl09XCJCWVRFU1wiLGVbZS5VSU5UMzI9MTNdPVwiVUlOVDMyXCIsZVtlLlNGSVhFRDMyPTE1XT1cIlNGSVhFRDMyXCIsZVtlLlNGSVhFRDY0PTE2XT1cIlNGSVhFRDY0XCIsZVtlLlNJTlQzMj0xN109XCJTSU5UMzJcIixlW2UuU0lOVDY0PTE4XT1cIlNJTlQ2NFwiLGUpKShTY2FsYXJUeXBlfHx7fSksTG9uZ1R5cGU9KGU9PihlW2UuQklHSU5UPTBdPVwiQklHSU5UXCIsZVtlLlNUUklORz0xXT1cIlNUUklOR1wiLGVbZS5OVU1CRVI9Ml09XCJOVU1CRVJcIixlKSkoTG9uZ1R5cGV8fHt9KSxSZXBlYXRUeXBlPShlPT4oZVtlLk5PPTBdPVwiTk9cIixlW2UuUEFDS0VEPTFdPVwiUEFDS0VEXCIsZVtlLlVOUEFDS0VEPTJdPVwiVU5QQUNLRURcIixlKSkoUmVwZWF0VHlwZXx8e30pO2Z1bmN0aW9uIG5vcm1hbGl6ZUZpZWxkSW5mbyhlKXtyZXR1cm4gZS5sb2NhbE5hbWU9ZS5sb2NhbE5hbWU/P2xvd2VyQ2FtZWxDYXNlKGUubmFtZSksZS5qc29uTmFtZT1lLmpzb25OYW1lPz9sb3dlckNhbWVsQ2FzZShlLm5hbWUpLGUucmVwZWF0PWUucmVwZWF0Pz8wLGUub3B0PWUub3B0Pz8oIWUucmVwZWF0JiYoIWUub25lb2YmJlwibWVzc2FnZVwiPT1lLmtpbmQpKSxlfWZ1bmN0aW9uIGlzT25lb2ZHcm91cChlKXtpZihcIm9iamVjdFwiIT10eXBlb2YgZXx8bnVsbD09PWV8fCFlLmhhc093blByb3BlcnR5KFwib25lb2ZLaW5kXCIpKXJldHVybiExO3N3aXRjaCh0eXBlb2YgZS5vbmVvZktpbmQpe2Nhc2VcInN0cmluZ1wiOnJldHVybiB2b2lkIDA9PT1lW2Uub25lb2ZLaW5kXT8hMToyPT1PYmplY3Qua2V5cyhlKS5sZW5ndGg7Y2FzZVwidW5kZWZpbmVkXCI6cmV0dXJuIDE9PU9iamVjdC5rZXlzKGUpLmxlbmd0aDtkZWZhdWx0OnJldHVybiExfX1jbGFzcyBSZWZsZWN0aW9uVHlwZUNoZWNre2NvbnN0cnVjdG9yKGUpe3RoaXMuZmllbGRzPWUuZmllbGRzPz9bXX1wcmVwYXJlKCl7aWYoIXRoaXMuZGF0YSl7dmFyIGUscj1bXSx0PVtdLGE9W107Zm9yKGUgb2YgdGhpcy5maWVsZHMpaWYoZS5vbmVvZilhLmluY2x1ZGVzKGUub25lb2YpfHwoYS5wdXNoKGUub25lb2YpLHIucHVzaChlLm9uZW9mKSx0LnB1c2goZS5vbmVvZikpO2Vsc2Ugc3dpdGNoKHQucHVzaChlLmxvY2FsTmFtZSksZS5raW5kKXtjYXNlXCJzY2FsYXJcIjpjYXNlXCJlbnVtXCI6ZS5vcHQmJiFlLnJlcGVhdHx8ci5wdXNoKGUubG9jYWxOYW1lKTticmVhaztjYXNlXCJtZXNzYWdlXCI6ZS5yZXBlYXQmJnIucHVzaChlLmxvY2FsTmFtZSk7YnJlYWs7Y2FzZVwibWFwXCI6ci5wdXNoKGUubG9jYWxOYW1lKX10aGlzLmRhdGE9e3JlcTpyLGtub3duOnQsb25lb2ZzOk9iamVjdC52YWx1ZXMoYSl9fX1pcyhlLGEsbj0hMSl7aWYoIShhPDApKXtpZihudWxsPT1lfHxcIm9iamVjdFwiIT10eXBlb2YgZSlyZXR1cm4hMTt0aGlzLnByZXBhcmUoKTtsZXQgcj1PYmplY3Qua2V5cyhlKSx0PXRoaXMuZGF0YTtpZihyLmxlbmd0aDx0LnJlcS5sZW5ndGh8fHQucmVxLnNvbWUoZT0+IXIuaW5jbHVkZXMoZSkpKXJldHVybiExO2lmKCFuJiZyLnNvbWUoZT0+IXQua25vd24uaW5jbHVkZXMoZSkpKXJldHVybiExO2lmKCEoYTwxKSl7Zm9yKGNvbnN0IGkgb2YgdC5vbmVvZnMpe2NvbnN0IG89ZVtpXTtpZighaXNPbmVvZkdyb3VwKG8pKXJldHVybiExO2lmKHZvaWQgMCE9PW8ub25lb2ZLaW5kKXt2YXIgcz10aGlzLmZpZWxkcy5maW5kKGU9PmUubG9jYWxOYW1lPT09by5vbmVvZktpbmQpO2lmKCFzKXJldHVybiExO2lmKCF0aGlzLmZpZWxkKG9bby5vbmVvZktpbmRdLHMsbixhKSlyZXR1cm4hMX19Zm9yKGNvbnN0IGwgb2YgdGhpcy5maWVsZHMpaWYodm9pZCAwPT09bC5vbmVvZiYmIXRoaXMuZmllbGQoZVtsLmxvY2FsTmFtZV0sbCxuLGEpKXJldHVybiExfX1yZXR1cm4hMH1maWVsZChlLHIsdCxhKXt2YXIgbj1yLnJlcGVhdDtzd2l0Y2goci5raW5kKXtjYXNlXCJzY2FsYXJcIjpyZXR1cm4gdm9pZCAwPT09ZT9yLm9wdDpuP3RoaXMuc2NhbGFycyhlLHIuVCxhLHIuTCk6dGhpcy5zY2FsYXIoZSxyLlQsci5MKTtjYXNlXCJlbnVtXCI6cmV0dXJuIHZvaWQgMD09PWU/ci5vcHQ6bj90aGlzLnNjYWxhcnMoZSxTY2FsYXJUeXBlLklOVDMyLGEpOnRoaXMuc2NhbGFyKGUsU2NhbGFyVHlwZS5JTlQzMik7Y2FzZVwibWVzc2FnZVwiOnJldHVybiB2b2lkIDA9PT1lPyEwOm4/dGhpcy5tZXNzYWdlcyhlLHIuVCgpLHQsYSk6dGhpcy5tZXNzYWdlKGUsci5UKCksdCxhKTtjYXNlXCJtYXBcIjppZihcIm9iamVjdFwiIT10eXBlb2YgZXx8bnVsbD09PWUpcmV0dXJuITE7aWYoYTwyKXJldHVybiEwO2lmKCF0aGlzLm1hcEtleXMoZSxyLkssYSkpcmV0dXJuITE7c3dpdGNoKHIuVi5raW5kKXtjYXNlXCJzY2FsYXJcIjpyZXR1cm4gdGhpcy5zY2FsYXJzKE9iamVjdC52YWx1ZXMoZSksci5WLlQsYSxyLlYuTCk7Y2FzZVwiZW51bVwiOnJldHVybiB0aGlzLnNjYWxhcnMoT2JqZWN0LnZhbHVlcyhlKSxTY2FsYXJUeXBlLklOVDMyLGEpO2Nhc2VcIm1lc3NhZ2VcIjpyZXR1cm4gdGhpcy5tZXNzYWdlcyhPYmplY3QudmFsdWVzKGUpLHIuVi5UKCksdCxhKX19cmV0dXJuITB9bWVzc2FnZShlLHIsdCxhKXtyZXR1cm4gdD9yLmlzQXNzaWduYWJsZShlLGEpOnIuaXMoZSxhKX1tZXNzYWdlcyhyLHQsZSxhKXtpZighQXJyYXkuaXNBcnJheShyKSlyZXR1cm4hMTtpZighKGE8MikpaWYoZSl7Zm9yKGxldCBlPTA7ZTxyLmxlbmd0aCYmZTxhO2UrKylpZighdC5pc0Fzc2lnbmFibGUocltlXSxhLTEpKXJldHVybiExfWVsc2UgZm9yKGxldCBlPTA7ZTxyLmxlbmd0aCYmZTxhO2UrKylpZighdC5pcyhyW2VdLGEtMSkpcmV0dXJuITE7cmV0dXJuITB9c2NhbGFyKGUscix0KXt2YXIgYT10eXBlb2YgZTtzd2l0Y2gocil7Y2FzZSBTY2FsYXJUeXBlLlVJTlQ2NDpjYXNlIFNjYWxhclR5cGUuRklYRUQ2NDpjYXNlIFNjYWxhclR5cGUuSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDY0OmNhc2UgU2NhbGFyVHlwZS5TSU5UNjQ6c3dpdGNoKHQpe2Nhc2UgTG9uZ1R5cGUuQklHSU5UOnJldHVyblwiYmlnaW50XCI9PWE7Y2FzZSBMb25nVHlwZS5OVU1CRVI6cmV0dXJuXCJudW1iZXJcIj09YSYmIWlzTmFOKGUpO2RlZmF1bHQ6cmV0dXJuXCJzdHJpbmdcIj09YX1jYXNlIFNjYWxhclR5cGUuQk9PTDpyZXR1cm5cImJvb2xlYW5cIj09YTtjYXNlIFNjYWxhclR5cGUuU1RSSU5HOnJldHVyblwic3RyaW5nXCI9PWE7Y2FzZSBTY2FsYXJUeXBlLkJZVEVTOnJldHVybiBlIGluc3RhbmNlb2YgVWludDhBcnJheTtjYXNlIFNjYWxhclR5cGUuRE9VQkxFOmNhc2UgU2NhbGFyVHlwZS5GTE9BVDpyZXR1cm5cIm51bWJlclwiPT1hJiYhaXNOYU4oZSk7ZGVmYXVsdDpyZXR1cm5cIm51bWJlclwiPT1hJiZOdW1iZXIuaXNJbnRlZ2VyKGUpfX1zY2FsYXJzKHIsdCxhLG4pe2lmKCFBcnJheS5pc0FycmF5KHIpKXJldHVybiExO2lmKCEoYTwyKSYmQXJyYXkuaXNBcnJheShyKSlmb3IobGV0IGU9MDtlPHIubGVuZ3RoJiZlPGE7ZSsrKWlmKCF0aGlzLnNjYWxhcihyW2VdLHQsbikpcmV0dXJuITE7cmV0dXJuITB9bWFwS2V5cyhlLHIsdCl7dmFyIGE9T2JqZWN0LmtleXMoZSk7c3dpdGNoKHIpe2Nhc2UgU2NhbGFyVHlwZS5JTlQzMjpjYXNlIFNjYWxhclR5cGUuRklYRUQzMjpjYXNlIFNjYWxhclR5cGUuU0ZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlNJTlQzMjpjYXNlIFNjYWxhclR5cGUuVUlOVDMyOnJldHVybiB0aGlzLnNjYWxhcnMoYS5zbGljZSgwLHQpLm1hcChlPT5wYXJzZUludChlKSkscix0KTtjYXNlIFNjYWxhclR5cGUuQk9PTDpyZXR1cm4gdGhpcy5zY2FsYXJzKGEuc2xpY2UoMCx0KS5tYXAoZT0+XCJ0cnVlXCI9PWV8fFwiZmFsc2VcIiE9ZSYmZSkscix0KTtkZWZhdWx0OnJldHVybiB0aGlzLnNjYWxhcnMoYSxyLHQsTG9uZ1R5cGUuU1RSSU5HKX19fWZ1bmN0aW9uIHR5cGVvZkpzb25WYWx1ZShlKXt2YXIgcj10eXBlb2YgZTtpZihcIm9iamVjdFwiPT1yKXtpZihBcnJheS5pc0FycmF5KGUpKXJldHVyblwiYXJyYXlcIjtpZihudWxsPT09ZSlyZXR1cm5cIm51bGxcIn1yZXR1cm4gcn1mdW5jdGlvbiBpc0pzb25PYmplY3QoZSl7cmV0dXJuIG51bGwhPT1lJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmIUFycmF5LmlzQXJyYXkoZSl9bGV0IGVuY1RhYmxlPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLnNwbGl0KFwiXCIpLGRlY1RhYmxlPVtdO2ZvcihsZXQgZT0wO2U8ZW5jVGFibGUubGVuZ3RoO2UrKylkZWNUYWJsZVtlbmNUYWJsZVtlXS5jaGFyQ29kZUF0KDApXT1lO2Z1bmN0aW9uIGJhc2U2NGRlY29kZShyKXtsZXQgZT0zKnIubGVuZ3RoLzQsdD0oXCI9XCI9PXJbci5sZW5ndGgtMl0/ZS09MjpcIj1cIj09cltyLmxlbmd0aC0xXSYmLS1lLG5ldyBVaW50OEFycmF5KGUpKSxhPTAsbj0wLHMsaT0wO2ZvcihsZXQgZT0wO2U8ci5sZW5ndGg7ZSsrKXtpZih2b2lkIDA9PT0ocz1kZWNUYWJsZVtyLmNoYXJDb2RlQXQoZSldKSlzd2l0Y2gocltlXSl7Y2FzZVwiPVwiOm49MDtjYXNlXCJcXG5cIjpjYXNlXCJcXHJcIjpjYXNlXCJcXHRcIjpjYXNlXCIgXCI6Y29udGludWU7ZGVmYXVsdDp0aHJvdyBFcnJvcihcImludmFsaWQgYmFzZTY0IHN0cmluZy5cIil9c3dpdGNoKG4pe2Nhc2UgMDppPXMsbj0xO2JyZWFrO2Nhc2UgMTp0W2ErK109aTw8MnwoNDgmcyk+PjQsaT1zLG49MjticmVhaztjYXNlIDI6dFthKytdPSgxNSZpKTw8NHwoNjAmcyk+PjIsaT1zLG49MzticmVhaztjYXNlIDM6dFthKytdPSgzJmkpPDw2fHMsbj0wfX1pZigxPT1uKXRocm93IEVycm9yKFwiaW52YWxpZCBiYXNlNjQgc3RyaW5nLlwiKTtyZXR1cm4gdC5zdWJhcnJheSgwLGEpfWZ1bmN0aW9uIGJhc2U2NGVuY29kZShyKXtsZXQgdD1cIlwiLGE9MCxuLHM9MDtmb3IobGV0IGU9MDtlPHIubGVuZ3RoO2UrKylzd2l0Y2gobj1yW2VdLGEpe2Nhc2UgMDp0Kz1lbmNUYWJsZVtuPj4yXSxzPSgzJm4pPDw0LGE9MTticmVhaztjYXNlIDE6dCs9ZW5jVGFibGVbc3xuPj40XSxzPSgxNSZuKTw8MixhPTI7YnJlYWs7Y2FzZSAyOnQ9KHQrPWVuY1RhYmxlW3N8bj4+Nl0pK2VuY1RhYmxlWzYzJm5dLGE9MH1yZXR1cm4gYSYmKHQ9dCtlbmNUYWJsZVtzXStcIj1cIiwxPT1hJiYodCs9XCI9XCIpKSx0fWZ1bmN0aW9uIHZhcmludDY0cmVhZCgpe2xldCByPTAsdD0wO2ZvcihsZXQgZT0wO2U8Mjg7ZSs9Nyl7dmFyIGE9dGhpcy5idWZbdGhpcy5wb3MrK107aWYocnw9KDEyNyZhKTw8ZSwwPT0oMTI4JmEpKXJldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLFtyLHRdfXZhciBlPXRoaXMuYnVmW3RoaXMucG9zKytdO2lmKHJ8PSgxNSZlKTw8MjgsdD0oMTEyJmUpPj40LDA9PSgxMjgmZSkpcmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksW3IsdF07Zm9yKGxldCBlPTM7ZTw9MzE7ZSs9Nyl7dmFyIG49dGhpcy5idWZbdGhpcy5wb3MrK107aWYodHw9KDEyNyZuKTw8ZSwwPT0oMTI4Jm4pKXJldHVybiB0aGlzLmFzc2VydEJvdW5kcygpLFtyLHRdfXRocm93IG5ldyBFcnJvcihcImludmFsaWQgdmFyaW50XCIpfWZ1bmN0aW9uIHZhcmludDY0d3JpdGUocix0LGEpe2ZvcihsZXQgZT0wO2U8Mjg7ZSs9Nyl7dmFyIG49cj4+PmUscz0hKG4+Pj43PT0wJiYwPT10KTtpZihhLnB1c2goMjU1JihzPzEyOHxuOm4pKSwhcylyZXR1cm59dmFyIGU9cj4+PjI4JjE1fCg3JnQpPDw0LGk9ISh0Pj4zPT0wKTtpZihhLnB1c2goMjU1JihpPzEyOHxlOmUpKSxpKXtmb3IobGV0IGU9MztlPDMxO2UrPTcpe3ZhciBvPXQ+Pj5lLGw9IShvPj4+Nz09MCk7aWYoYS5wdXNoKDI1NSYobD8xMjh8bzpvKSksIWwpcmV0dXJufWEucHVzaCh0Pj4+MzEmMSl9fWRlY1RhYmxlW1wiLVwiLmNoYXJDb2RlQXQoMCldPWVuY1RhYmxlLmluZGV4T2YoXCIrXCIpLGRlY1RhYmxlW1wiX1wiLmNoYXJDb2RlQXQoMCldPWVuY1RhYmxlLmluZGV4T2YoXCIvXCIpO2NvbnN0IFRXT19QV1JfMzJfREJMJDE9NDI5NDk2NzI5NjtmdW5jdGlvbiBpbnQ2NGZyb21TdHJpbmcodCl7dmFyIGU9XCItXCI9PXRbMF07ZSYmKHQ9dC5zbGljZSgxKSk7bGV0IGE9MCxuPTA7ZnVuY3Rpb24gcihlLHIpe2U9TnVtYmVyKHQuc2xpY2UoZSxyKSk7bio9MWU2LChhPTFlNiphK2UpPj1UV09fUFdSXzMyX0RCTCQxJiYobis9YS9UV09fUFdSXzMyX0RCTCQxfDAsYSU9VFdPX1BXUl8zMl9EQkwkMSl9cmV0dXJuIHIoLTI0LC0xOCkscigtMTgsLTEyKSxyKC0xMiwtNikscigtNiksW2UsYSxuXX1mdW5jdGlvbiBpbnQ2NHRvU3RyaW5nKGUscil7aWYocjw9MjA5NzE1MSlyZXR1cm5cIlwiKyhUV09fUFdSXzMyX0RCTCQxKnIrKGU+Pj4wKSk7dmFyIHQ9KGU+Pj4yNHxyPDw4KT4+PjAmMTY3NzcyMTUscj1yPj4xNiY2NTUzNTtsZXQgYT0oMTY3NzcyMTUmZSkrNjc3NzIxNip0KzY3MTA2NTYqcixuPXQrODE0NzQ5NypyLHM9MipyO2Z1bmN0aW9uIGkoZSxyKXtlPWU/U3RyaW5nKGUpOlwiXCI7cmV0dXJuIHI/XCIwMDAwMDAwXCIuc2xpY2UoZS5sZW5ndGgpK2U6ZX1yZXR1cm4gMWU3PD1hJiYobis9TWF0aC5mbG9vcihhLzFlNyksYSU9MWU3KSwxZTc8PW4mJihzKz1NYXRoLmZsb29yKG4vMWU3KSxuJT0xZTcpLGkocywwKStpKG4scykraShhLDEpfWZ1bmN0aW9uIHZhcmludDMyd3JpdGUocix0KXtpZigwPD1yKXtmb3IoOzEyNzxyOyl0LnB1c2goMTI3JnJ8MTI4KSxyPj4+PTc7dC5wdXNoKHIpfWVsc2V7Zm9yKGxldCBlPTA7ZTw5O2UrKyl0LnB1c2goMTI3JnJ8MTI4KSxyPj49Nzt0LnB1c2goMSl9fWZ1bmN0aW9uIHZhcmludDMycmVhZCgpe2xldCByPXRoaXMuYnVmW3RoaXMucG9zKytdO3ZhciBlPTEyNyZyO2lmKDA9PSgxMjgmcikpcmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksZTtpZihlfD0oMTI3JihyPXRoaXMuYnVmW3RoaXMucG9zKytdKSk8PDcsMD09KDEyOCZyKSlyZXR1cm4gdGhpcy5hc3NlcnRCb3VuZHMoKSxlO2lmKGV8PSgxMjcmKHI9dGhpcy5idWZbdGhpcy5wb3MrK10pKTw8MTQsMD09KDEyOCZyKSlyZXR1cm4gdGhpcy5hc3NlcnRCb3VuZHMoKSxlO2lmKGV8PSgxMjcmKHI9dGhpcy5idWZbdGhpcy5wb3MrK10pKTw8MjEsMD09KDEyOCZyKSlyZXR1cm4gdGhpcy5hc3NlcnRCb3VuZHMoKSxlO2V8PSgxNSYocj10aGlzLmJ1Zlt0aGlzLnBvcysrXSkpPDwyODtmb3IobGV0IGU9NTswIT0oMTI4JnIpJiZlPDEwO2UrKylyPXRoaXMuYnVmW3RoaXMucG9zKytdO2lmKDAhPSgxMjgmcikpdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCB2YXJpbnRcIik7cmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksZT4+PjB9ZnVuY3Rpb24gZGV0ZWN0QmkoKXt2YXIgZT1uZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDgpKTtyZXR1cm4gdm9pZCAwIT09Z2xvYmFsVGhpcy5CaWdJbnQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUuZ2V0QmlnSW50NjQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUuZ2V0QmlnVWludDY0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnNldEJpZ0ludDY0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnNldEJpZ1VpbnQ2ND97TUlOOkJpZ0ludChcIi05MjIzMzcyMDM2ODU0Nzc1ODA4XCIpLE1BWDpCaWdJbnQoXCI5MjIzMzcyMDM2ODU0Nzc1ODA3XCIpLFVNSU46QmlnSW50KFwiMFwiKSxVTUFYOkJpZ0ludChcIjE4NDQ2NzQ0MDczNzA5NTUxNjE1XCIpLEM6QmlnSW50LFY6ZX06dm9pZCAwfWNvbnN0IEJJPWRldGVjdEJpKCk7ZnVuY3Rpb24gYXNzZXJ0QmkoZSl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiQmlnSW50IHVuYXZhaWxhYmxlLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RpbW9zdGFtbS9wcm90b2J1Zi10cy9ibG9iL3YxLjAuOC9NQU5VQUwubWQjYmlnaW50LXN1cHBvcnRcIil9Y29uc3QgUkVfREVDSU1BTF9TVFI9L14tP1swLTldKyQvLFRXT19QV1JfMzJfREJMPTQyOTQ5NjcyOTY7Y2xhc3MgU2hhcmVkUGJMb25ne2NvbnN0cnVjdG9yKGUscil7dGhpcy5sbz0wfGUsdGhpcy5oaT0wfHJ9aXNaZXJvKCl7cmV0dXJuIDA9PXRoaXMubG8mJjA9PXRoaXMuaGl9dG9OdW1iZXIoKXt2YXIgZT10aGlzLmhpKlRXT19QV1JfMzJfREJMKyh0aGlzLmxvPj4+MCk7aWYoTnVtYmVyLmlzU2FmZUludGVnZXIoZSkpcmV0dXJuIGU7dGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGNvbnZlcnQgdG8gc2FmZSBudW1iZXJcIil9fWNvbnN0IF9QYlVMb25nPWNsYXNzIGV4dGVuZHMgU2hhcmVkUGJMb25ne3N0YXRpYyBmcm9tKGUpe2lmKEJJKXN3aXRjaCh0eXBlb2YgZSl7Y2FzZVwic3RyaW5nXCI6aWYoXCIwXCI9PWUpcmV0dXJuIHRoaXMuWkVSTztpZihcIlwiPT1lKXRocm93IG5ldyBFcnJvcihcInN0cmluZyBpcyBubyBpbnRlZ2VyXCIpO2U9QkkuQyhlKTtjYXNlXCJudW1iZXJcIjppZigwPT09ZSlyZXR1cm4gdGhpcy5aRVJPO2U9QkkuQyhlKTtjYXNlXCJiaWdpbnRcIjppZighZSlyZXR1cm4gdGhpcy5aRVJPO2lmKGU8QkkuVU1JTil0aHJvdyBuZXcgRXJyb3IoXCJzaWduZWQgdmFsdWUgZm9yIHVsb25nXCIpO2lmKGU+QkkuVU1BWCl0aHJvdyBuZXcgRXJyb3IoXCJ1bG9uZyB0b28gbGFyZ2VcIik7cmV0dXJuIEJJLlYuc2V0QmlnVWludDY0KDAsZSwhMCksbmV3IF9QYlVMb25nKEJJLlYuZ2V0SW50MzIoMCwhMCksQkkuVi5nZXRJbnQzMig0LCEwKSl9ZWxzZSBzd2l0Y2godHlwZW9mIGUpe2Nhc2VcInN0cmluZ1wiOmlmKFwiMFwiPT1lKXJldHVybiB0aGlzLlpFUk87aWYoZT1lLnRyaW0oKSwhUkVfREVDSU1BTF9TVFIudGVzdChlKSl0aHJvdyBuZXcgRXJyb3IoXCJzdHJpbmcgaXMgbm8gaW50ZWdlclwiKTt2YXJbcix0LGFdPWludDY0ZnJvbVN0cmluZyhlKTtpZihyKXRocm93IG5ldyBFcnJvcihcInNpZ25lZCB2YWx1ZVwiKTtyZXR1cm4gbmV3IF9QYlVMb25nKHQsYSk7Y2FzZVwibnVtYmVyXCI6aWYoMD09ZSlyZXR1cm4gdGhpcy5aRVJPO2lmKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihlKSl0aHJvdyBuZXcgRXJyb3IoXCJudW1iZXIgaXMgbm8gaW50ZWdlclwiKTtpZihlPDApdGhyb3cgbmV3IEVycm9yKFwic2lnbmVkIHZhbHVlIGZvciB1bG9uZ1wiKTtyZXR1cm4gbmV3IF9QYlVMb25nKGUsZS9UV09fUFdSXzMyX0RCTCl9dGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB2YWx1ZSBcIit0eXBlb2YgZSl9dG9TdHJpbmcoKXtyZXR1cm4gQkk/dGhpcy50b0JpZ0ludCgpLnRvU3RyaW5nKCk6aW50NjR0b1N0cmluZyh0aGlzLmxvLHRoaXMuaGkpfXRvQmlnSW50KCl7cmV0dXJuIGFzc2VydEJpKEJJKSxCSS5WLnNldEludDMyKDAsdGhpcy5sbywhMCksQkkuVi5zZXRJbnQzMig0LHRoaXMuaGksITApLEJJLlYuZ2V0QmlnVWludDY0KDAsITApfX07bGV0IFBiVUxvbmc9X1BiVUxvbmc7UGJVTG9uZy5aRVJPPW5ldyBfUGJVTG9uZygwLDApO2NvbnN0IF9QYkxvbmc9Y2xhc3MgZXh0ZW5kcyBTaGFyZWRQYkxvbmd7c3RhdGljIGZyb20oZSl7aWYoQkkpc3dpdGNoKHR5cGVvZiBlKXtjYXNlXCJzdHJpbmdcIjppZihcIjBcIj09ZSlyZXR1cm4gdGhpcy5aRVJPO2lmKFwiXCI9PWUpdGhyb3cgbmV3IEVycm9yKFwic3RyaW5nIGlzIG5vIGludGVnZXJcIik7ZT1CSS5DKGUpO2Nhc2VcIm51bWJlclwiOmlmKDA9PT1lKXJldHVybiB0aGlzLlpFUk87ZT1CSS5DKGUpO2Nhc2VcImJpZ2ludFwiOmlmKCFlKXJldHVybiB0aGlzLlpFUk87aWYoZTxCSS5NSU4pdGhyb3cgbmV3IEVycm9yKFwidWxvbmcgdG9vIHNtYWxsXCIpO2lmKGU+QkkuTUFYKXRocm93IG5ldyBFcnJvcihcInVsb25nIHRvbyBsYXJnZVwiKTtyZXR1cm4gQkkuVi5zZXRCaWdJbnQ2NCgwLGUsITApLG5ldyBfUGJMb25nKEJJLlYuZ2V0SW50MzIoMCwhMCksQkkuVi5nZXRJbnQzMig0LCEwKSl9ZWxzZSBzd2l0Y2godHlwZW9mIGUpe2Nhc2VcInN0cmluZ1wiOmlmKFwiMFwiPT1lKXJldHVybiB0aGlzLlpFUk87dmFyIHIsdCxhO2lmKGU9ZS50cmltKCksUkVfREVDSU1BTF9TVFIudGVzdChlKSlyZXR1cm5bcixhLHRdPWludDY0ZnJvbVN0cmluZyhlKSxhPW5ldyBfUGJMb25nKGEsdCkscj9hLm5lZ2F0ZSgpOmE7dGhyb3cgbmV3IEVycm9yKFwic3RyaW5nIGlzIG5vIGludGVnZXJcIik7Y2FzZVwibnVtYmVyXCI6aWYoMD09ZSlyZXR1cm4gdGhpcy5aRVJPO2lmKE51bWJlci5pc1NhZmVJbnRlZ2VyKGUpKXJldHVybiAwPGU/bmV3IF9QYkxvbmcoZSxlL1RXT19QV1JfMzJfREJMKTpuZXcgX1BiTG9uZygtZSwtZS9UV09fUFdSXzMyX0RCTCkubmVnYXRlKCk7dGhyb3cgbmV3IEVycm9yKFwibnVtYmVyIGlzIG5vIGludGVnZXJcIil9dGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB2YWx1ZSBcIit0eXBlb2YgZSl9aXNOZWdhdGl2ZSgpe3JldHVybiAwIT0oMjE0NzQ4MzY0OCZ0aGlzLmhpKX1uZWdhdGUoKXtsZXQgZT1+dGhpcy5oaSxyPXRoaXMubG87cmV0dXJuIHI/cj0xK35yOmUrPTEsbmV3IF9QYkxvbmcocixlKX10b1N0cmluZygpe3ZhciBlO3JldHVybiBCST90aGlzLnRvQmlnSW50KCkudG9TdHJpbmcoKTp0aGlzLmlzTmVnYXRpdmUoKT9cIi1cIitpbnQ2NHRvU3RyaW5nKChlPXRoaXMubmVnYXRlKCkpLmxvLGUuaGkpOmludDY0dG9TdHJpbmcodGhpcy5sbyx0aGlzLmhpKX10b0JpZ0ludCgpe3JldHVybiBhc3NlcnRCaShCSSksQkkuVi5zZXRJbnQzMigwLHRoaXMubG8sITApLEJJLlYuc2V0SW50MzIoNCx0aGlzLmhpLCEwKSxCSS5WLmdldEJpZ0ludDY0KDAsITApfX07bGV0IFBiTG9uZz1fUGJMb25nO2Z1bmN0aW9uIGFzc2VydChlLHIpe2lmKCFlKXRocm93IG5ldyBFcnJvcihyKX1QYkxvbmcuWkVSTz1uZXcgX1BiTG9uZygwLDApO2NvbnN0IEZMT0FUMzJfTUFYPTM0MDI4MjM0NjYzODUyODg2ZTIyLEZMT0FUMzJfTUlOPS0zNDAyODIzNDY2Mzg1Mjg4NmUyMixVSU5UMzJfTUFYPTQyOTQ5NjcyOTUsSU5UMzJfTUFYPTIxNDc0ODM2NDcsSU5UMzJfTUlOPS0yMTQ3NDgzNjQ4O2Z1bmN0aW9uIGFzc2VydEludDMyKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW50IDMyOiBcIit0eXBlb2YgZSk7aWYoIU51bWJlci5pc0ludGVnZXIoZSl8fGU+SU5UMzJfTUFYfHxlPElOVDMyX01JTil0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGludCAzMjogXCIrZSl9ZnVuY3Rpb24gYXNzZXJ0VUludDMyKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcImludmFsaWQgdWludCAzMjogXCIrdHlwZW9mIGUpO2lmKCFOdW1iZXIuaXNJbnRlZ2VyKGUpfHxlPlVJTlQzMl9NQVh8fGU8MCl0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHVpbnQgMzI6IFwiK2UpfWZ1bmN0aW9uIGFzc2VydEZsb2F0MzIoZSl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGUpdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBmbG9hdCAzMjogXCIrdHlwZW9mIGUpO2lmKE51bWJlci5pc0Zpbml0ZShlKSYmKGU+RkxPQVQzMl9NQVh8fGU8RkxPQVQzMl9NSU4pKXRocm93IG5ldyBFcnJvcihcImludmFsaWQgZmxvYXQgMzI6IFwiK2UpfWZ1bmN0aW9uIHJlZmxlY3Rpb25Mb25nQ29udmVydChlLHIpe3N3aXRjaChyKXtjYXNlIExvbmdUeXBlLkJJR0lOVDpyZXR1cm4gZS50b0JpZ0ludCgpO2Nhc2UgTG9uZ1R5cGUuTlVNQkVSOnJldHVybiBlLnRvTnVtYmVyKCk7ZGVmYXVsdDpyZXR1cm4gZS50b1N0cmluZygpfX1jbGFzcyBSZWZsZWN0aW9uSnNvblJlYWRlcntjb25zdHJ1Y3RvcihlKXt0aGlzLmluZm89ZX1wcmVwYXJlKCl7aWYodm9pZCAwPT09dGhpcy5mTWFwKXt0aGlzLmZNYXA9e307Zm9yKGNvbnN0IGUgb2YgdGhpcy5pbmZvLmZpZWxkcz8/W10pdGhpcy5mTWFwW2UubmFtZV09ZSx0aGlzLmZNYXBbZS5qc29uTmFtZV09ZSx0aGlzLmZNYXBbZS5sb2NhbE5hbWVdPWV9fWFzc2VydChlLHIsdCl7aWYoIWUpe2xldCBlPXR5cGVvZkpzb25WYWx1ZSh0KTt0aHJvd1wibnVtYmVyXCIhPWUmJlwiYm9vbGVhblwiIT1lfHwoZT10LnRvU3RyaW5nKCkpLG5ldyBFcnJvcihgQ2Fubm90IHBhcnNlIEpTT04gJHtlfSBmb3IgJHt0aGlzLmluZm8udHlwZU5hbWV9I2Arcil9fXJlYWQoZSxyLHQpe3RoaXMucHJlcGFyZSgpO3ZhciBhLG4scz1bXTtmb3IoW2Esbl1vZiBPYmplY3QuZW50cmllcyhlKSl7dmFyIGk9dGhpcy5mTWFwW2FdO2lmKCFpKXtpZih0Lmlnbm9yZVVua25vd25GaWVsZHMpY29udGludWU7dGhyb3cgbmV3IEVycm9yKGBGb3VuZCB1bmtub3duIGZpZWxkIHdoaWxlIHJlYWRpbmcgJHt0aGlzLmluZm8udHlwZU5hbWV9IGZyb20gSlNPTiBmb3JtYXQuIEpTT04ga2V5OiBgK2EpfXZhciBvPWkubG9jYWxOYW1lO2xldCBlO2lmKGkub25lb2Ype2lmKHMuaW5jbHVkZXMoaS5vbmVvZikpdGhyb3cgbmV3IEVycm9yKGBNdWx0aXBsZSBtZW1iZXJzIG9mIHRoZSBvbmVvZiBncm91cCBcIiR7aS5vbmVvZn1cIiBvZiAke3RoaXMuaW5mby50eXBlTmFtZX0gYXJlIHByZXNlbnQgaW4gSlNPTi5gKTtzLnB1c2goaS5vbmVvZiksZT1yW2kub25lb2ZdPXtvbmVvZktpbmQ6b319ZWxzZSBlPXI7aWYoXCJtYXBcIj09aS5raW5kKXtpZihudWxsIT09bil7dGhpcy5hc3NlcnQoaXNKc29uT2JqZWN0KG4pLGkubmFtZSxuKTt2YXIgbCxjLGY9ZVtvXTtmb3IoW2wsY11vZiBPYmplY3QuZW50cmllcyhuKSl7dGhpcy5hc3NlcnQobnVsbCE9PWMsaS5uYW1lK1wiIG1hcCB2YWx1ZVwiLG51bGwpO2xldCBlO3N3aXRjaChpLlYua2luZCl7Y2FzZVwibWVzc2FnZVwiOmU9aS5WLlQoKS5pbnRlcm5hbEpzb25SZWFkKGMsdCk7YnJlYWs7Y2FzZVwiZW51bVwiOmlmKCExPT09KGU9dGhpcy5lbnVtKGkuVi5UKCksYyxpLm5hbWUsdC5pZ25vcmVVbmtub3duRmllbGRzKSkpY29udGludWU7YnJlYWs7Y2FzZVwic2NhbGFyXCI6ZT10aGlzLnNjYWxhcihjLGkuVi5ULGkuVi5MLGkubmFtZSl9dGhpcy5hc3NlcnQodm9pZCAwIT09ZSxpLm5hbWUrXCIgbWFwIHZhbHVlXCIsYyk7bGV0IHI9bDtpLks9PVNjYWxhclR5cGUuQk9PTCYmKHI9XCJ0cnVlXCI9PXJ8fFwiZmFsc2VcIiE9ciYmciksZltyPXRoaXMuc2NhbGFyKHIsaS5LLExvbmdUeXBlLlNUUklORyxpLm5hbWUpLnRvU3RyaW5nKCldPWV9fX1lbHNlIGlmKGkucmVwZWF0KXtpZihudWxsIT09bil7dGhpcy5hc3NlcnQoQXJyYXkuaXNBcnJheShuKSxpLm5hbWUsbik7dmFyIHU9ZVtvXTtmb3IoY29uc3QgcCBvZiBuKXt0aGlzLmFzc2VydChudWxsIT09cCxpLm5hbWUsbnVsbCk7bGV0IGU7c3dpdGNoKGkua2luZCl7Y2FzZVwibWVzc2FnZVwiOmU9aS5UKCkuaW50ZXJuYWxKc29uUmVhZChwLHQpO2JyZWFrO2Nhc2VcImVudW1cIjppZighMT09PShlPXRoaXMuZW51bShpLlQoKSxwLGkubmFtZSx0Lmlnbm9yZVVua25vd25GaWVsZHMpKSljb250aW51ZTticmVhaztjYXNlXCJzY2FsYXJcIjplPXRoaXMuc2NhbGFyKHAsaS5ULGkuTCxpLm5hbWUpfXRoaXMuYXNzZXJ0KHZvaWQgMCE9PWUsaS5uYW1lLG4pLHUucHVzaChlKX19fWVsc2Ugc3dpdGNoKGkua2luZCl7Y2FzZVwibWVzc2FnZVwiOm51bGw9PT1uJiZcImdvb2dsZS5wcm90b2J1Zi5WYWx1ZVwiIT1pLlQoKS50eXBlTmFtZT90aGlzLmFzc2VydCh2b2lkIDA9PT1pLm9uZW9mLGkubmFtZStcIiAob25lb2YgbWVtYmVyKVwiLG51bGwpOmVbb109aS5UKCkuaW50ZXJuYWxKc29uUmVhZChuLHQsZVtvXSk7YnJlYWs7Y2FzZVwiZW51bVwiOnZhciBoPXRoaXMuZW51bShpLlQoKSxuLGkubmFtZSx0Lmlnbm9yZVVua25vd25GaWVsZHMpOyExIT09aCYmKGVbb109aCk7YnJlYWs7Y2FzZVwic2NhbGFyXCI6ZVtvXT10aGlzLnNjYWxhcihuLGkuVCxpLkwsaS5uYW1lKX19fWVudW0ocix0LGEsbil7aWYoXCJnb29nbGUucHJvdG9idWYuTnVsbFZhbHVlXCI9PXJbMF0mJmFzc2VydChudWxsPT09dCxgVW5hYmxlIHRvIHBhcnNlIGZpZWxkICR7dGhpcy5pbmZvLnR5cGVOYW1lfSMke2F9LCBlbnVtICR7clswXX0gb25seSBhY2NlcHRzIG51bGwuYCksbnVsbD09PXQpcmV0dXJuIDA7c3dpdGNoKHR5cGVvZiB0KXtjYXNlXCJudW1iZXJcIjpyZXR1cm4gYXNzZXJ0KE51bWJlci5pc0ludGVnZXIodCksYFVuYWJsZSB0byBwYXJzZSBmaWVsZCAke3RoaXMuaW5mby50eXBlTmFtZX0jJHthfSwgZW51bSBjYW4gb25seSBiZSBpbnRlZ3JhbCBudW1iZXIsIGdvdCAke3R9LmApLHQ7Y2FzZVwic3RyaW5nXCI6bGV0IGU9dDtyWzJdJiZ0LnN1YnN0cmluZygwLHJbMl0ubGVuZ3RoKT09PXJbMl0mJihlPXQuc3Vic3RyaW5nKHJbMl0ubGVuZ3RoKSk7dmFyIHM9clsxXVtlXTtyZXR1cm4gdm9pZCAwPT09cyYmbj8hMTooYXNzZXJ0KFwibnVtYmVyXCI9PXR5cGVvZiBzLGBVbmFibGUgdG8gcGFyc2UgZmllbGQgJHt0aGlzLmluZm8udHlwZU5hbWV9IyR7YX0sIGVudW0gJHtyWzBdfSBoYXMgbm8gdmFsdWUgZm9yIFwiJHt0fVwiLmApLHMpfWFzc2VydCghMSxgVW5hYmxlIHRvIHBhcnNlIGZpZWxkICR7dGhpcy5pbmZvLnR5cGVOYW1lfSMke2F9LCBjYW5ub3QgcGFyc2UgZW51bSB2YWx1ZSBmcm9tICR7dHlwZW9mIHR9XCIuYCl9c2NhbGFyKHIsdCxhLGUpe2xldCBuO3RyeXtzd2l0Y2godCl7Y2FzZSBTY2FsYXJUeXBlLkRPVUJMRTpjYXNlIFNjYWxhclR5cGUuRkxPQVQ6aWYobnVsbD09PXIpcmV0dXJuIDA7aWYoXCJOYU5cIj09PXIpcmV0dXJuIE51bWJlci5OYU47aWYoXCJJbmZpbml0eVwiPT09cilyZXR1cm4gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO2lmKFwiLUluZmluaXR5XCI9PT1yKXJldHVybiBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7aWYoXCJcIj09PXIpbj1cImVtcHR5IHN0cmluZ1wiO2Vsc2UgaWYoXCJzdHJpbmdcIj09dHlwZW9mIHImJnIudHJpbSgpLmxlbmd0aCE9PXIubGVuZ3RoKW49XCJleHRyYSB3aGl0ZXNwYWNlXCI7ZWxzZSBpZihcInN0cmluZ1wiPT10eXBlb2Ygcnx8XCJudW1iZXJcIj09dHlwZW9mIHIpe3ZhciBzPU51bWJlcihyKTtpZihOdW1iZXIuaXNOYU4ocykpbj1cIm5vdCBhIG51bWJlclwiO2Vsc2V7aWYoTnVtYmVyLmlzRmluaXRlKHMpKXJldHVybiB0PT1TY2FsYXJUeXBlLkZMT0FUJiZhc3NlcnRGbG9hdDMyKHMpLHM7bj1cInRvbyBsYXJnZSBvciBzbWFsbFwifX1icmVhaztjYXNlIFNjYWxhclR5cGUuSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLkZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDMyOmNhc2UgU2NhbGFyVHlwZS5TSU5UMzI6Y2FzZSBTY2FsYXJUeXBlLlVJTlQzMjppZihudWxsPT09cilyZXR1cm4gMDtsZXQgZTtpZihcIm51bWJlclwiPT10eXBlb2Ygcj9lPXI6XCJcIj09PXI/bj1cImVtcHR5IHN0cmluZ1wiOlwic3RyaW5nXCI9PXR5cGVvZiByJiYoci50cmltKCkubGVuZ3RoIT09ci5sZW5ndGg/bj1cImV4dHJhIHdoaXRlc3BhY2VcIjplPU51bWJlcihyKSksdm9pZCAwPT09ZSlicmVhaztyZXR1cm4odD09U2NhbGFyVHlwZS5VSU5UMzI/YXNzZXJ0VUludDMyOmFzc2VydEludDMyKShlKSxlO2Nhc2UgU2NhbGFyVHlwZS5JTlQ2NDpjYXNlIFNjYWxhclR5cGUuU0ZJWEVENjQ6Y2FzZSBTY2FsYXJUeXBlLlNJTlQ2NDppZihudWxsPT09cilyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KFBiTG9uZy5aRVJPLGEpO2lmKFwibnVtYmVyXCIhPXR5cGVvZiByJiZcInN0cmluZ1wiIT10eXBlb2YgcilicmVhaztyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KFBiTG9uZy5mcm9tKHIpLGEpO2Nhc2UgU2NhbGFyVHlwZS5GSVhFRDY0OmNhc2UgU2NhbGFyVHlwZS5VSU5UNjQ6aWYobnVsbD09PXIpcmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChQYlVMb25nLlpFUk8sYSk7aWYoXCJudW1iZXJcIiE9dHlwZW9mIHImJlwic3RyaW5nXCIhPXR5cGVvZiByKWJyZWFrO3JldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoUGJVTG9uZy5mcm9tKHIpLGEpO2Nhc2UgU2NhbGFyVHlwZS5CT09MOmlmKG51bGw9PT1yKXJldHVybiExO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgcilicmVhaztyZXR1cm4gcjtjYXNlIFNjYWxhclR5cGUuU1RSSU5HOmlmKG51bGw9PT1yKXJldHVyblwiXCI7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHIpe249XCJleHRyYSB3aGl0ZXNwYWNlXCI7YnJlYWt9dHJ5e2VuY29kZVVSSUNvbXBvbmVudChyKX1jYXRjaChlKXswO2JyZWFrfXJldHVybiByO2Nhc2UgU2NhbGFyVHlwZS5CWVRFUzppZihudWxsPT09cnx8XCJcIj09PXIpcmV0dXJuIG5ldyBVaW50OEFycmF5KDApO2lmKFwic3RyaW5nXCIhPXR5cGVvZiByKWJyZWFrO3JldHVybiBiYXNlNjRkZWNvZGUocil9fWNhdGNoKGUpe249ZS5tZXNzYWdlfXRoaXMuYXNzZXJ0KCExLGUrKG4/XCIgLSBcIituOlwiXCIpLHIpfX1jbGFzcyBSZWZsZWN0aW9uSnNvbldyaXRlcntjb25zdHJ1Y3RvcihlKXt0aGlzLmZpZWxkcz1lLmZpZWxkcz8/W119d3JpdGUoZSxyKXt2YXIgdCxhLG49e30scz1lO2Zvcihjb25zdCBpIG9mIHRoaXMuZmllbGRzKWkub25lb2Y/KHQ9c1tpLm9uZW9mXSkub25lb2ZLaW5kPT09aS5sb2NhbE5hbWUmJihhPVwic2NhbGFyXCI9PWkua2luZHx8XCJlbnVtXCI9PWkua2luZD97Li4ucixlbWl0RGVmYXVsdFZhbHVlczohMH06cixhc3NlcnQodm9pZCAwIT09KHQ9dGhpcy5maWVsZChpLHRbaS5sb2NhbE5hbWVdLGEpKSksbltyLnVzZVByb3RvRmllbGROYW1lP2kubmFtZTppLmpzb25OYW1lXT10KTp2b2lkIDAhPT0oYT10aGlzLmZpZWxkKGksc1tpLmxvY2FsTmFtZV0scikpJiYobltyLnVzZVByb3RvRmllbGROYW1lP2kubmFtZTppLmpzb25OYW1lXT1hKTtyZXR1cm4gbn1maWVsZChyLHQsYSl7bGV0IGU9dm9pZCAwO2lmKFwibWFwXCI9PXIua2luZCl7YXNzZXJ0KFwib2JqZWN0XCI9PXR5cGVvZiB0JiZudWxsIT09dCk7dmFyIG49e307c3dpdGNoKHIuVi5raW5kKXtjYXNlXCJzY2FsYXJcIjpmb3IodmFyW3MsaV1vZiBPYmplY3QuZW50cmllcyh0KSl7aT10aGlzLnNjYWxhcihyLlYuVCxpLHIubmFtZSwhMSwhMCk7YXNzZXJ0KHZvaWQgMCE9PWkpLG5bcy50b1N0cmluZygpXT1pfWJyZWFrO2Nhc2VcIm1lc3NhZ2VcIjp2YXIgbyxsLGM9ci5WLlQoKTtmb3IoW28sbF1vZiBPYmplY3QuZW50cmllcyh0KSl7dmFyIGY9dGhpcy5tZXNzYWdlKGMsbCxyLm5hbWUsYSk7YXNzZXJ0KHZvaWQgMCE9PWYpLG5bby50b1N0cmluZygpXT1mfWJyZWFrO2Nhc2VcImVudW1cIjp2YXIgdSxoLHA9ci5WLlQoKTtmb3IoW3UsaF1vZiBPYmplY3QuZW50cmllcyh0KSl7YXNzZXJ0KHZvaWQgMD09PWh8fFwibnVtYmVyXCI9PXR5cGVvZiBoKTt2YXIgVD10aGlzLmVudW0ocCxoLHIubmFtZSwhMSwhMCxhLmVudW1Bc0ludGVnZXIpO2Fzc2VydCh2b2lkIDAhPT1UKSxuW3UudG9TdHJpbmcoKV09VH19KGEuZW1pdERlZmF1bHRWYWx1ZXN8fDA8T2JqZWN0LmtleXMobikubGVuZ3RoKSYmKGU9bil9ZWxzZSBpZihyLnJlcGVhdCl7YXNzZXJ0KEFycmF5LmlzQXJyYXkodCkpO3ZhciBkPVtdO3N3aXRjaChyLmtpbmQpe2Nhc2VcInNjYWxhclwiOmZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKXt2YXIgeT10aGlzLnNjYWxhcihyLlQsdFtlXSxyLm5hbWUsci5vcHQsITApO2Fzc2VydCh2b2lkIDAhPT15KSxkLnB1c2goeSl9YnJlYWs7Y2FzZVwiZW51bVwiOnZhciBnPXIuVCgpO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKXthc3NlcnQodm9pZCAwPT09dFtlXXx8XCJudW1iZXJcIj09dHlwZW9mIHRbZV0pO3ZhciBiPXRoaXMuZW51bShnLHRbZV0sci5uYW1lLHIub3B0LCEwLGEuZW51bUFzSW50ZWdlcik7YXNzZXJ0KHZvaWQgMCE9PWIpLGQucHVzaChiKX1icmVhaztjYXNlXCJtZXNzYWdlXCI6dmFyIG09ci5UKCk7Zm9yKGxldCBlPTA7ZTx0Lmxlbmd0aDtlKyspe3ZhciBJPXRoaXMubWVzc2FnZShtLHRbZV0sci5uYW1lLGEpO2Fzc2VydCh2b2lkIDAhPT1JKSxkLnB1c2goSSl9fShhLmVtaXREZWZhdWx0VmFsdWVzfHwwPGQubGVuZ3RofHxhLmVtaXREZWZhdWx0VmFsdWVzKSYmKGU9ZCl9ZWxzZSBzd2l0Y2goci5raW5kKXtjYXNlXCJzY2FsYXJcIjplPXRoaXMuc2NhbGFyKHIuVCx0LHIubmFtZSxyLm9wdCxhLmVtaXREZWZhdWx0VmFsdWVzKTticmVhaztjYXNlXCJlbnVtXCI6ZT10aGlzLmVudW0oci5UKCksdCxyLm5hbWUsci5vcHQsYS5lbWl0RGVmYXVsdFZhbHVlcyxhLmVudW1Bc0ludGVnZXIpO2JyZWFrO2Nhc2VcIm1lc3NhZ2VcIjplPXRoaXMubWVzc2FnZShyLlQoKSx0LHIubmFtZSxhKX1yZXR1cm4gZX1lbnVtKGUscix0LGEsbixzKXtpZihcImdvb2dsZS5wcm90b2J1Zi5OdWxsVmFsdWVcIj09ZVswXSlyZXR1cm4gbnVsbDtpZih2b2lkIDA9PT1yKWFzc2VydChhKTtlbHNlIGlmKDAhPT1yfHxufHxhKXJldHVybiBhc3NlcnQoXCJudW1iZXJcIj09dHlwZW9mIHIpLGFzc2VydChOdW1iZXIuaXNJbnRlZ2VyKHIpKSxzfHwhZVsxXS5oYXNPd25Qcm9wZXJ0eShyKT9yOmVbMl0/ZVsyXStlWzFdW3JdOmVbMV1bcl19bWVzc2FnZShlLHIsdCxhKXtyZXR1cm4gdm9pZCAwPT09cj9hLmVtaXREZWZhdWx0VmFsdWVzP251bGw6dm9pZCAwOmUuaW50ZXJuYWxKc29uV3JpdGUocixhKX1zY2FsYXIoZSxyLHQsYSxuKXtpZih2b2lkIDA9PT1yKWFzc2VydChhKTtlbHNle3ZhciBzPW58fGE7c3dpdGNoKGUpe2Nhc2UgU2NhbGFyVHlwZS5JTlQzMjpjYXNlIFNjYWxhclR5cGUuU0ZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlNJTlQzMjpyZXR1cm4gMD09PXI/cz8wOnZvaWQgMDooYXNzZXJ0SW50MzIocikscik7Y2FzZSBTY2FsYXJUeXBlLkZJWEVEMzI6Y2FzZSBTY2FsYXJUeXBlLlVJTlQzMjpyZXR1cm4gMD09PXI/cz8wOnZvaWQgMDooYXNzZXJ0VUludDMyKHIpLHIpO2Nhc2UgU2NhbGFyVHlwZS5GTE9BVDphc3NlcnRGbG9hdDMyKHIpO2Nhc2UgU2NhbGFyVHlwZS5ET1VCTEU6cmV0dXJuIDA9PT1yP3M/MDp2b2lkIDA6KGFzc2VydChcIm51bWJlclwiPT10eXBlb2YgciksTnVtYmVyLmlzTmFOKHIpP1wiTmFOXCI6cj09PU51bWJlci5QT1NJVElWRV9JTkZJTklUWT9cIkluZmluaXR5XCI6cj09PU51bWJlci5ORUdBVElWRV9JTkZJTklUWT9cIi1JbmZpbml0eVwiOnIpO2Nhc2UgU2NhbGFyVHlwZS5TVFJJTkc6cmV0dXJuXCJcIj09PXI/cz9cIlwiOnZvaWQgMDooYXNzZXJ0KFwic3RyaW5nXCI9PXR5cGVvZiByKSxyKTtjYXNlIFNjYWxhclR5cGUuQk9PTDpyZXR1cm4hMT09PXI/IXMmJnZvaWQgMDooYXNzZXJ0KFwiYm9vbGVhblwiPT10eXBlb2Ygcikscik7Y2FzZSBTY2FsYXJUeXBlLlVJTlQ2NDpjYXNlIFNjYWxhclR5cGUuRklYRUQ2NDphc3NlcnQoXCJudW1iZXJcIj09dHlwZW9mIHJ8fFwic3RyaW5nXCI9PXR5cGVvZiByfHxcImJpZ2ludFwiPT10eXBlb2Ygcik7dmFyIGk9UGJVTG9uZy5mcm9tKHIpO3JldHVybiBpLmlzWmVybygpJiYhcz92b2lkIDA6aS50b1N0cmluZygpO2Nhc2UgU2NhbGFyVHlwZS5JTlQ2NDpjYXNlIFNjYWxhclR5cGUuU0ZJWEVENjQ6Y2FzZSBTY2FsYXJUeXBlLlNJTlQ2NDphc3NlcnQoXCJudW1iZXJcIj09dHlwZW9mIHJ8fFwic3RyaW5nXCI9PXR5cGVvZiByfHxcImJpZ2ludFwiPT10eXBlb2Ygcik7aT1QYkxvbmcuZnJvbShyKTtyZXR1cm4gaS5pc1plcm8oKSYmIXM/dm9pZCAwOmkudG9TdHJpbmcoKTtjYXNlIFNjYWxhclR5cGUuQllURVM6cmV0dXJuKGFzc2VydChyIGluc3RhbmNlb2YgVWludDhBcnJheSksci5ieXRlTGVuZ3RoKT9iYXNlNjRlbmNvZGUocik6cz9cIlwiOnZvaWQgMH19fX1mdW5jdGlvbiByZWZsZWN0aW9uU2NhbGFyRGVmYXVsdChlLHI9TG9uZ1R5cGUuU1RSSU5HKXtzd2l0Y2goZSl7Y2FzZSBTY2FsYXJUeXBlLkJPT0w6cmV0dXJuITE7Y2FzZSBTY2FsYXJUeXBlLlVJTlQ2NDpjYXNlIFNjYWxhclR5cGUuRklYRUQ2NDpyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KFBiVUxvbmcuWkVSTyxyKTtjYXNlIFNjYWxhclR5cGUuSU5UNjQ6Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDY0OmNhc2UgU2NhbGFyVHlwZS5TSU5UNjQ6cmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChQYkxvbmcuWkVSTyxyKTtjYXNlIFNjYWxhclR5cGUuRE9VQkxFOmNhc2UgU2NhbGFyVHlwZS5GTE9BVDpyZXR1cm4gMDtjYXNlIFNjYWxhclR5cGUuQllURVM6cmV0dXJuIG5ldyBVaW50OEFycmF5KDApO2Nhc2UgU2NhbGFyVHlwZS5TVFJJTkc6cmV0dXJuXCJcIjtkZWZhdWx0OnJldHVybiAwfX1jbGFzcyBSZWZsZWN0aW9uQmluYXJ5UmVhZGVye2NvbnN0cnVjdG9yKGUpe3RoaXMuaW5mbz1lfXByZXBhcmUoKXt2YXIgZTt0aGlzLmZpZWxkTm9Ub0ZpZWxkfHwoZT10aGlzLmluZm8uZmllbGRzPz9bXSx0aGlzLmZpZWxkTm9Ub0ZpZWxkPW5ldyBNYXAoZS5tYXAoZT0+W2Uubm8sZV0pKSl9cmVhZChhLG4scyxlKXt0aGlzLnByZXBhcmUoKTtmb3IodmFyIHI9dm9pZCAwPT09ZT9hLmxlbjphLnBvcytlO2EucG9zPHI7KXt2YXJbdCxpXT1hLnRhZygpLG89dGhpcy5maWVsZE5vVG9GaWVsZC5nZXQodCk7aWYobyl7bGV0IGU9bixyPW8ucmVwZWF0LHQ9by5sb2NhbE5hbWU7c3dpdGNoKG8ub25lb2YmJihlPWVbby5vbmVvZl0pLm9uZW9mS2luZCE9PXQmJihlPW5bby5vbmVvZl09e29uZW9mS2luZDp0fSksby5raW5kKXtjYXNlXCJzY2FsYXJcIjpjYXNlXCJlbnVtXCI6dmFyIGw9XCJlbnVtXCI9PW8ua2luZD9TY2FsYXJUeXBlLklOVDMyOm8uVCxjPVwic2NhbGFyXCI9PW8ua2luZD9vLkw6dm9pZCAwO2lmKHIpe3ZhciBmPWVbdF07aWYoaT09V2lyZVR5cGUuTGVuZ3RoRGVsaW1pdGVkJiZsIT1TY2FsYXJUeXBlLlNUUklORyYmbCE9U2NhbGFyVHlwZS5CWVRFUylmb3IodmFyIHU9YS51aW50MzIoKSthLnBvczthLnBvczx1OylmLnB1c2godGhpcy5zY2FsYXIoYSxsLGMpKTtlbHNlIGYucHVzaCh0aGlzLnNjYWxhcihhLGwsYykpfWVsc2UgZVt0XT10aGlzLnNjYWxhcihhLGwsYyk7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOnI/KGg9ZVt0XSxwPW8uVCgpLmludGVybmFsQmluYXJ5UmVhZChhLGEudWludDMyKCkscyksaC5wdXNoKHApKTplW3RdPW8uVCgpLmludGVybmFsQmluYXJ5UmVhZChhLGEudWludDMyKCkscyxlW3RdKTticmVhaztjYXNlXCJtYXBcIjp2YXJbaCxwXT10aGlzLm1hcEVudHJ5KG8sYSxzKTtlW3RdW2hdPXB9fWVsc2V7dmFyIFQ9cy5yZWFkVW5rbm93bkZpZWxkO2lmKFwidGhyb3dcIj09VCl0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZmllbGQgJHt0fSAod2lyZSB0eXBlICR7aX0pIGZvciBgK3RoaXMuaW5mby50eXBlTmFtZSk7dmFyIGQ9YS5za2lwKGkpOyExIT09VCYmKCEwPT09VD9Vbmtub3duRmllbGRIYW5kbGVyLm9uUmVhZDpUKSh0aGlzLmluZm8udHlwZU5hbWUsbix0LGksZCl9fX1tYXBFbnRyeShlLHIsdCl7dmFyIGE9ci51aW50MzIoKSxuPXIucG9zK2E7bGV0IHM9dm9pZCAwLGk9dm9pZCAwO2Zvcig7ci5wb3M8bjspe3ZhcltvLGxdPXIudGFnKCk7c3dpdGNoKG8pe2Nhc2UgMTpzPWUuSz09U2NhbGFyVHlwZS5CT09MP3IuYm9vbCgpLnRvU3RyaW5nKCk6dGhpcy5zY2FsYXIocixlLkssTG9uZ1R5cGUuU1RSSU5HKTticmVhaztjYXNlIDI6c3dpdGNoKGUuVi5raW5kKXtjYXNlXCJzY2FsYXJcIjppPXRoaXMuc2NhbGFyKHIsZS5WLlQsZS5WLkwpO2JyZWFrO2Nhc2VcImVudW1cIjppPXIuaW50MzIoKTticmVhaztjYXNlXCJtZXNzYWdlXCI6aT1lLlYuVCgpLmludGVybmFsQmluYXJ5UmVhZChyLHIudWludDMyKCksdCl9YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZmllbGQgJHtvfSAod2lyZSB0eXBlICR7bH0pIGluIG1hcCBlbnRyeSBmb3IgJHt0aGlzLmluZm8udHlwZU5hbWV9I2ArZS5uYW1lKX19aWYodm9pZCAwPT09cyYmKGE9cmVmbGVjdGlvblNjYWxhckRlZmF1bHQoZS5LKSxzPWUuSz09U2NhbGFyVHlwZS5CT09MP2EudG9TdHJpbmcoKTphKSx2b2lkIDA9PT1pKXN3aXRjaChlLlYua2luZCl7Y2FzZVwic2NhbGFyXCI6aT1yZWZsZWN0aW9uU2NhbGFyRGVmYXVsdChlLlYuVCxlLlYuTCk7YnJlYWs7Y2FzZVwiZW51bVwiOmk9MDticmVhaztjYXNlXCJtZXNzYWdlXCI6aT1lLlYuVCgpLmNyZWF0ZSgpfXJldHVybltzLGldfXNjYWxhcihlLHIsdCl7c3dpdGNoKHIpe2Nhc2UgU2NhbGFyVHlwZS5JTlQzMjpyZXR1cm4gZS5pbnQzMigpO2Nhc2UgU2NhbGFyVHlwZS5TVFJJTkc6cmV0dXJuIGUuc3RyaW5nKCk7Y2FzZSBTY2FsYXJUeXBlLkJPT0w6cmV0dXJuIGUuYm9vbCgpO2Nhc2UgU2NhbGFyVHlwZS5ET1VCTEU6cmV0dXJuIGUuZG91YmxlKCk7Y2FzZSBTY2FsYXJUeXBlLkZMT0FUOnJldHVybiBlLmZsb2F0KCk7Y2FzZSBTY2FsYXJUeXBlLklOVDY0OnJldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoZS5pbnQ2NCgpLHQpO2Nhc2UgU2NhbGFyVHlwZS5VSU5UNjQ6cmV0dXJuIHJlZmxlY3Rpb25Mb25nQ29udmVydChlLnVpbnQ2NCgpLHQpO2Nhc2UgU2NhbGFyVHlwZS5GSVhFRDY0OnJldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoZS5maXhlZDY0KCksdCk7Y2FzZSBTY2FsYXJUeXBlLkZJWEVEMzI6cmV0dXJuIGUuZml4ZWQzMigpO2Nhc2UgU2NhbGFyVHlwZS5CWVRFUzpyZXR1cm4gZS5ieXRlcygpO2Nhc2UgU2NhbGFyVHlwZS5VSU5UMzI6cmV0dXJuIGUudWludDMyKCk7Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDMyOnJldHVybiBlLnNmaXhlZDMyKCk7Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDY0OnJldHVybiByZWZsZWN0aW9uTG9uZ0NvbnZlcnQoZS5zZml4ZWQ2NCgpLHQpO2Nhc2UgU2NhbGFyVHlwZS5TSU5UMzI6cmV0dXJuIGUuc2ludDMyKCk7Y2FzZSBTY2FsYXJUeXBlLlNJTlQ2NDpyZXR1cm4gcmVmbGVjdGlvbkxvbmdDb252ZXJ0KGUuc2ludDY0KCksdCl9fX1jbGFzcyBSZWZsZWN0aW9uQmluYXJ5V3JpdGVye2NvbnN0cnVjdG9yKGUpe3RoaXMuaW5mbz1lfXByZXBhcmUoKXt2YXIgZTt0aGlzLmZpZWxkc3x8KGU9dGhpcy5pbmZvLmZpZWxkcz90aGlzLmluZm8uZmllbGRzLmNvbmNhdCgpOltdLHRoaXMuZmllbGRzPWUuc29ydCgoZSxyKT0+ZS5uby1yLm5vKSl9d3JpdGUobixzLGkpe3RoaXMucHJlcGFyZSgpO2Zvcihjb25zdCB1IG9mIHRoaXMuZmllbGRzKXtsZXQgZSxyLHQ9dS5yZXBlYXQsYT11LmxvY2FsTmFtZTtpZih1Lm9uZW9mKXt2YXIgbz1uW3Uub25lb2ZdO2lmKG8ub25lb2ZLaW5kIT09YSljb250aW51ZTtlPW9bYV0scj0hMH1lbHNlIGU9blthXSxyPSExO3N3aXRjaCh1LmtpbmQpe2Nhc2VcInNjYWxhclwiOmNhc2VcImVudW1cIjp2YXIgbD1cImVudW1cIj09dS5raW5kP1NjYWxhclR5cGUuSU5UMzI6dS5UO2lmKHQpaWYoYXNzZXJ0KEFycmF5LmlzQXJyYXkoZSkpLHQ9PVJlcGVhdFR5cGUuUEFDS0VEKXRoaXMucGFja2VkKHMsbCx1Lm5vLGUpO2Vsc2UgZm9yKGNvbnN0IGggb2YgZSl0aGlzLnNjYWxhcihzLGwsdS5ubyxoLCEwKTtlbHNlIHZvaWQgMD09PWU/YXNzZXJ0KHUub3B0KTp0aGlzLnNjYWxhcihzLGwsdS5ubyxlLHJ8fHUub3B0KTticmVhaztjYXNlXCJtZXNzYWdlXCI6aWYodCl7YXNzZXJ0KEFycmF5LmlzQXJyYXkoZSkpO2Zvcihjb25zdCBwIG9mIGUpdGhpcy5tZXNzYWdlKHMsaSx1LlQoKSx1Lm5vLHApfWVsc2UgdGhpcy5tZXNzYWdlKHMsaSx1LlQoKSx1Lm5vLGUpO2JyZWFrO2Nhc2VcIm1hcFwiOmFzc2VydChcIm9iamVjdFwiPT10eXBlb2YgZSYmbnVsbCE9PWUpO2Zvcih2YXJbYyxmXW9mIE9iamVjdC5lbnRyaWVzKGUpKXRoaXMubWFwRW50cnkocyxpLHUsYyxmKX19dmFyIGU9aS53cml0ZVVua25vd25GaWVsZHM7ITEhPT1lJiYoITA9PT1lP1Vua25vd25GaWVsZEhhbmRsZXIub25Xcml0ZTplKSh0aGlzLmluZm8udHlwZU5hbWUsbixzKX1tYXBFbnRyeShlLHIsdCxhLG4pe2UudGFnKHQubm8sV2lyZVR5cGUuTGVuZ3RoRGVsaW1pdGVkKSxlLmZvcmsoKTtsZXQgcz1hO3N3aXRjaCh0Lkspe2Nhc2UgU2NhbGFyVHlwZS5JTlQzMjpjYXNlIFNjYWxhclR5cGUuRklYRUQzMjpjYXNlIFNjYWxhclR5cGUuVUlOVDMyOmNhc2UgU2NhbGFyVHlwZS5TRklYRUQzMjpjYXNlIFNjYWxhclR5cGUuU0lOVDMyOnM9TnVtYmVyLnBhcnNlSW50KGEpO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5CT09MOmFzc2VydChcInRydWVcIj09YXx8XCJmYWxzZVwiPT1hKSxzPVwidHJ1ZVwiPT1hfXN3aXRjaCh0aGlzLnNjYWxhcihlLHQuSywxLHMsITApLHQuVi5raW5kKXtjYXNlXCJzY2FsYXJcIjp0aGlzLnNjYWxhcihlLHQuVi5ULDIsbiwhMCk7YnJlYWs7Y2FzZVwiZW51bVwiOnRoaXMuc2NhbGFyKGUsU2NhbGFyVHlwZS5JTlQzMiwyLG4sITApO2JyZWFrO2Nhc2VcIm1lc3NhZ2VcIjp0aGlzLm1lc3NhZ2UoZSxyLHQuVi5UKCksMixuKX1lLmpvaW4oKX1tZXNzYWdlKGUscix0LGEsbil7dm9pZCAwIT09biYmKHQuaW50ZXJuYWxCaW5hcnlXcml0ZShuLGUudGFnKGEsV2lyZVR5cGUuTGVuZ3RoRGVsaW1pdGVkKS5mb3JrKCksciksZS5qb2luKCkpfXNjYWxhcihlLHIsdCxhLG4pe3ZhcltyLHMsaV09dGhpcy5zY2FsYXJJbmZvKHIsYSk7aSYmIW58fChlLnRhZyh0LHIpLGVbc10oYSkpfXBhY2tlZChyLGUsdCxhKXtpZihhLmxlbmd0aCl7YXNzZXJ0KGUhPT1TY2FsYXJUeXBlLkJZVEVTJiZlIT09U2NhbGFyVHlwZS5TVFJJTkcpLHIudGFnKHQsV2lyZVR5cGUuTGVuZ3RoRGVsaW1pdGVkKSxyLmZvcmsoKTt2YXJbLG5dPXRoaXMuc2NhbGFySW5mbyhlKTtmb3IobGV0IGU9MDtlPGEubGVuZ3RoO2UrKylyW25dKGFbZV0pO3Iuam9pbigpfX1zY2FsYXJJbmZvKGUscil7bGV0IHQ9V2lyZVR5cGUuVmFyaW50LGE7dmFyIG49dm9pZCAwPT09cjtsZXQgcz0wPT09cjtzd2l0Y2goZSl7Y2FzZSBTY2FsYXJUeXBlLklOVDMyOmE9XCJpbnQzMlwiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5TVFJJTkc6cz1ufHwhci5sZW5ndGgsdD1XaXJlVHlwZS5MZW5ndGhEZWxpbWl0ZWQsYT1cInN0cmluZ1wiO2JyZWFrO2Nhc2UgU2NhbGFyVHlwZS5CT09MOnM9ITE9PT1yLGE9XCJib29sXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLlVJTlQzMjphPVwidWludDMyXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLkRPVUJMRTp0PVdpcmVUeXBlLkJpdDY0LGE9XCJkb3VibGVcIjticmVhaztjYXNlIFNjYWxhclR5cGUuRkxPQVQ6dD1XaXJlVHlwZS5CaXQzMixhPVwiZmxvYXRcIjticmVhaztjYXNlIFNjYWxhclR5cGUuSU5UNjQ6cz1ufHxQYkxvbmcuZnJvbShyKS5pc1plcm8oKSxhPVwiaW50NjRcIjticmVhaztjYXNlIFNjYWxhclR5cGUuVUlOVDY0OnM9bnx8UGJVTG9uZy5mcm9tKHIpLmlzWmVybygpLGE9XCJ1aW50NjRcIjticmVhaztjYXNlIFNjYWxhclR5cGUuRklYRUQ2NDpzPW58fFBiVUxvbmcuZnJvbShyKS5pc1plcm8oKSx0PVdpcmVUeXBlLkJpdDY0LGE9XCJmaXhlZDY0XCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLkJZVEVTOnM9bnx8IXIuYnl0ZUxlbmd0aCx0PVdpcmVUeXBlLkxlbmd0aERlbGltaXRlZCxhPVwiYnl0ZXNcIjticmVhaztjYXNlIFNjYWxhclR5cGUuRklYRUQzMjp0PVdpcmVUeXBlLkJpdDMyLGE9XCJmaXhlZDMyXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDMyOnQ9V2lyZVR5cGUuQml0MzIsYT1cInNmaXhlZDMyXCI7YnJlYWs7Y2FzZSBTY2FsYXJUeXBlLlNGSVhFRDY0OnM9bnx8UGJMb25nLmZyb20ocikuaXNaZXJvKCksdD1XaXJlVHlwZS5CaXQ2NCxhPVwic2ZpeGVkNjRcIjticmVhaztjYXNlIFNjYWxhclR5cGUuU0lOVDMyOmE9XCJzaW50MzJcIjticmVhaztjYXNlIFNjYWxhclR5cGUuU0lOVDY0OnM9bnx8UGJMb25nLmZyb20ocikuaXNaZXJvKCksYT1cInNpbnQ2NFwifXJldHVyblt0LGEsbnx8c119fWZ1bmN0aW9uIHJlZmxlY3Rpb25DcmVhdGUoZSl7dmFyIHIsdD17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxNRVNTQUdFX1RZUEUse2VudW1lcmFibGU6ITEsdmFsdWU6ZX0pO2ZvcihyIG9mIGUuZmllbGRzKXt2YXIgYT1yLmxvY2FsTmFtZTtpZighci5vcHQpaWYoci5vbmVvZil0W3Iub25lb2ZdPXtvbmVvZktpbmQ6dm9pZCAwfTtlbHNlIGlmKHIucmVwZWF0KXRbYV09W107ZWxzZSBzd2l0Y2goci5raW5kKXtjYXNlXCJzY2FsYXJcIjp0W2FdPXJlZmxlY3Rpb25TY2FsYXJEZWZhdWx0KHIuVCxyLkwpO2JyZWFrO2Nhc2VcImVudW1cIjp0W2FdPTA7YnJlYWs7Y2FzZVwibWFwXCI6dFthXT17fX19cmV0dXJuIHR9ZnVuY3Rpb24gcmVmbGVjdGlvbk1lcmdlUGFydGlhbChlLHIsdCl7bGV0IGEsbj10LHM7Zm9yKHZhciBpIG9mIGUuZmllbGRzKXt2YXIgbz1pLmxvY2FsTmFtZTtpZihpLm9uZW9mKXt2YXIgbD1uW2kub25lb2ZdO2lmKG51bGw9PShudWxsPT1sP3ZvaWQgMDpsLm9uZW9mS2luZCkpY29udGludWU7aWYoYT1sW29dLChzPXJbaS5vbmVvZl0pLm9uZW9mS2luZD1sLm9uZW9mS2luZCxudWxsPT1hKXtkZWxldGUgc1tvXTtjb250aW51ZX19ZWxzZSBpZihhPW5bb10scz1yLG51bGw9PWEpY29udGludWU7c3dpdGNoKGkucmVwZWF0JiYoc1tvXS5sZW5ndGg9YS5sZW5ndGgpLGkua2luZCl7Y2FzZVwic2NhbGFyXCI6Y2FzZVwiZW51bVwiOmlmKGkucmVwZWF0KWZvcihsZXQgZT0wO2U8YS5sZW5ndGg7ZSsrKXNbb11bZV09YVtlXTtlbHNlIHNbb109YTticmVhaztjYXNlXCJtZXNzYWdlXCI6dmFyIGM9aS5UKCk7aWYoaS5yZXBlYXQpZm9yKGxldCBlPTA7ZTxhLmxlbmd0aDtlKyspc1tvXVtlXT1jLmNyZWF0ZShhW2VdKTtlbHNlIHZvaWQgMD09PXNbb10/c1tvXT1jLmNyZWF0ZShhKTpjLm1lcmdlUGFydGlhbChzW29dLGEpO2JyZWFrO2Nhc2VcIm1hcFwiOnN3aXRjaChpLlYua2luZCl7Y2FzZVwic2NhbGFyXCI6Y2FzZVwiZW51bVwiOk9iamVjdC5hc3NpZ24oc1tvXSxhKTticmVhaztjYXNlXCJtZXNzYWdlXCI6dmFyIGYsdT1pLlYuVCgpO2ZvcihmIG9mIE9iamVjdC5rZXlzKGEpKXNbb11bZl09dS5jcmVhdGUoYVtmXSl9fX19Y29uc3QgZGVmYXVsdHNXcml0ZSQxPXtlbWl0RGVmYXVsdFZhbHVlczohMSxlbnVtQXNJbnRlZ2VyOiExLHVzZVByb3RvRmllbGROYW1lOiExLHByZXR0eVNwYWNlczowfSxkZWZhdWx0c1JlYWQkMT17aWdub3JlVW5rbm93bkZpZWxkczohMX07ZnVuY3Rpb24ganNvblJlYWRPcHRpb25zKGUpe3JldHVybiBlP3suLi5kZWZhdWx0c1JlYWQkMSwuLi5lfTpkZWZhdWx0c1JlYWQkMX1mdW5jdGlvbiBqc29uV3JpdGVPcHRpb25zKGUpe3JldHVybiBlP3suLi5kZWZhdWx0c1dyaXRlJDEsLi4uZX06ZGVmYXVsdHNXcml0ZSQxfWZ1bmN0aW9uIHJlZmxlY3Rpb25FcXVhbHMoZSxyLHQpe2lmKHIhPT10KXtpZighcnx8IXQpcmV0dXJuITE7Zm9yKHZhciBhIG9mIGUuZmllbGRzKXt2YXIgbj1hLmxvY2FsTmFtZSxzPShhLm9uZW9mP3JbYS5vbmVvZl06cilbbl0saT0oYS5vbmVvZj90W2Eub25lb2ZdOnQpW25dO3N3aXRjaChhLmtpbmQpe2Nhc2VcImVudW1cIjpjYXNlXCJzY2FsYXJcIjp2YXIgbz1cImVudW1cIj09YS5raW5kP1NjYWxhclR5cGUuSU5UMzI6YS5UO2lmKChhLnJlcGVhdD9yZXBlYXRlZFByaW1pdGl2ZUVxOnByaW1pdGl2ZUVxKShvLHMsaSkpYnJlYWs7cmV0dXJuITE7Y2FzZVwibWFwXCI6aWYoXCJtZXNzYWdlXCI9PWEuVi5raW5kP3JlcGVhdGVkTXNnRXEoYS5WLlQoKSxvYmplY3RWYWx1ZXMocyksb2JqZWN0VmFsdWVzKGkpKTpyZXBlYXRlZFByaW1pdGl2ZUVxKFwiZW51bVwiPT1hLlYua2luZD9TY2FsYXJUeXBlLklOVDMyOmEuVi5ULG9iamVjdFZhbHVlcyhzKSxvYmplY3RWYWx1ZXMoaSkpKWJyZWFrO3JldHVybiExO2Nhc2VcIm1lc3NhZ2VcIjpvPWEuVCgpO2lmKGEucmVwZWF0P3JlcGVhdGVkTXNnRXEobyxzLGkpOm8uZXF1YWxzKHMsaSkpYnJlYWs7cmV0dXJuITF9fX1yZXR1cm4hMH1jb25zdCBvYmplY3RWYWx1ZXM9T2JqZWN0LnZhbHVlcztmdW5jdGlvbiBwcmltaXRpdmVFcShlLHIsdCl7aWYociE9PXQpe2lmKGUhPT1TY2FsYXJUeXBlLkJZVEVTKXJldHVybiExO3ZhciBhPXIsbj10O2lmKGEubGVuZ3RoIT09bi5sZW5ndGgpcmV0dXJuITE7Zm9yKGxldCBlPTA7ZTxhLmxlbmd0aDtlKyspaWYoYVtlXSE9bltlXSlyZXR1cm4hMX1yZXR1cm4hMH1mdW5jdGlvbiByZXBlYXRlZFByaW1pdGl2ZUVxKHIsdCxhKXtpZih0Lmxlbmd0aCE9PWEubGVuZ3RoKXJldHVybiExO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKWlmKCFwcmltaXRpdmVFcShyLHRbZV0sYVtlXSkpcmV0dXJuITE7cmV0dXJuITB9ZnVuY3Rpb24gcmVwZWF0ZWRNc2dFcShyLHQsYSl7aWYodC5sZW5ndGghPT1hLmxlbmd0aClyZXR1cm4hMTtmb3IobGV0IGU9MDtlPHQubGVuZ3RoO2UrKylpZighci5lcXVhbHModFtlXSxhW2VdKSlyZXR1cm4hMTtyZXR1cm4hMH1jb25zdCBkZWZhdWx0c1dyaXRlPXt3cml0ZVVua25vd25GaWVsZHM6ITAsd3JpdGVyRmFjdG9yeTooKT0+bmV3IEJpbmFyeVdyaXRlcn07ZnVuY3Rpb24gYmluYXJ5V3JpdGVPcHRpb25zKGUpe3JldHVybiBlP3suLi5kZWZhdWx0c1dyaXRlLC4uLmV9OmRlZmF1bHRzV3JpdGV9Y2xhc3MgQmluYXJ5V3JpdGVye2NvbnN0cnVjdG9yKGUpe3RoaXMuc3RhY2s9W10sdGhpcy50ZXh0RW5jb2Rlcj1lPz9uZXcgVGV4dEVuY29kZXIsdGhpcy5jaHVua3M9W10sdGhpcy5idWY9W119ZmluaXNoKCl7dGhpcy5jaHVua3MucHVzaChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZikpO2xldCByPTA7Zm9yKGxldCBlPTA7ZTx0aGlzLmNodW5rcy5sZW5ndGg7ZSsrKXIrPXRoaXMuY2h1bmtzW2VdLmxlbmd0aDt2YXIgdD1uZXcgVWludDhBcnJheShyKTtsZXQgYT0wO2ZvcihsZXQgZT0wO2U8dGhpcy5jaHVua3MubGVuZ3RoO2UrKyl0LnNldCh0aGlzLmNodW5rc1tlXSxhKSxhKz10aGlzLmNodW5rc1tlXS5sZW5ndGg7cmV0dXJuIHRoaXMuY2h1bmtzPVtdLHR9Zm9yaygpe3JldHVybiB0aGlzLnN0YWNrLnB1c2goe2NodW5rczp0aGlzLmNodW5rcyxidWY6dGhpcy5idWZ9KSx0aGlzLmNodW5rcz1bXSx0aGlzLmJ1Zj1bXSx0aGlzfWpvaW4oKXt2YXIgZT10aGlzLmZpbmlzaCgpLHI9dGhpcy5zdGFjay5wb3AoKTtpZihyKXJldHVybiB0aGlzLmNodW5rcz1yLmNodW5rcyx0aGlzLmJ1Zj1yLmJ1Zix0aGlzLnVpbnQzMihlLmJ5dGVMZW5ndGgpLHRoaXMucmF3KGUpO3Rocm93IG5ldyBFcnJvcihcImludmFsaWQgc3RhdGUsIGZvcmsgc3RhY2sgZW1wdHlcIil9dGFnKGUscil7cmV0dXJuIHRoaXMudWludDMyKChlPDwzfHIpPj4+MCl9cmF3KGUpe3JldHVybiB0aGlzLmJ1Zi5sZW5ndGgmJih0aGlzLmNodW5rcy5wdXNoKG5ldyBVaW50OEFycmF5KHRoaXMuYnVmKSksdGhpcy5idWY9W10pLHRoaXMuY2h1bmtzLnB1c2goZSksdGhpc311aW50MzIoZSl7Zm9yKGFzc2VydFVJbnQzMihlKTsxMjc8ZTspdGhpcy5idWYucHVzaCgxMjcmZXwxMjgpLGU+Pj49NztyZXR1cm4gdGhpcy5idWYucHVzaChlKSx0aGlzfWludDMyKGUpe3JldHVybiBhc3NlcnRJbnQzMihlKSx2YXJpbnQzMndyaXRlKGUsdGhpcy5idWYpLHRoaXN9Ym9vbChlKXtyZXR1cm4gdGhpcy5idWYucHVzaChlPzE6MCksdGhpc31ieXRlcyhlKXtyZXR1cm4gdGhpcy51aW50MzIoZS5ieXRlTGVuZ3RoKSx0aGlzLnJhdyhlKX1zdHJpbmcoZSl7ZT10aGlzLnRleHRFbmNvZGVyLmVuY29kZShlKTtyZXR1cm4gdGhpcy51aW50MzIoZS5ieXRlTGVuZ3RoKSx0aGlzLnJhdyhlKX1mbG9hdChlKXthc3NlcnRGbG9hdDMyKGUpO3ZhciByPW5ldyBVaW50OEFycmF5KDQpO3JldHVybiBuZXcgRGF0YVZpZXcoci5idWZmZXIpLnNldEZsb2F0MzIoMCxlLCEwKSx0aGlzLnJhdyhyKX1kb3VibGUoZSl7dmFyIHI9bmV3IFVpbnQ4QXJyYXkoOCk7cmV0dXJuIG5ldyBEYXRhVmlldyhyLmJ1ZmZlcikuc2V0RmxvYXQ2NCgwLGUsITApLHRoaXMucmF3KHIpfWZpeGVkMzIoZSl7YXNzZXJ0VUludDMyKGUpO3ZhciByPW5ldyBVaW50OEFycmF5KDQpO3JldHVybiBuZXcgRGF0YVZpZXcoci5idWZmZXIpLnNldFVpbnQzMigwLGUsITApLHRoaXMucmF3KHIpfXNmaXhlZDMyKGUpe2Fzc2VydEludDMyKGUpO3ZhciByPW5ldyBVaW50OEFycmF5KDQpO3JldHVybiBuZXcgRGF0YVZpZXcoci5idWZmZXIpLnNldEludDMyKDAsZSwhMCksdGhpcy5yYXcocil9c2ludDMyKGUpe3JldHVybiBhc3NlcnRJbnQzMihlKSx2YXJpbnQzMndyaXRlKGU9KGU8PDFeZT4+MzEpPj4+MCx0aGlzLmJ1ZiksdGhpc31zZml4ZWQ2NChlKXt2YXIgcj1uZXcgVWludDhBcnJheSg4KSx0PW5ldyBEYXRhVmlldyhyLmJ1ZmZlciksZT1QYkxvbmcuZnJvbShlKTtyZXR1cm4gdC5zZXRJbnQzMigwLGUubG8sITApLHQuc2V0SW50MzIoNCxlLmhpLCEwKSx0aGlzLnJhdyhyKX1maXhlZDY0KGUpe3ZhciByPW5ldyBVaW50OEFycmF5KDgpLHQ9bmV3IERhdGFWaWV3KHIuYnVmZmVyKSxlPVBiVUxvbmcuZnJvbShlKTtyZXR1cm4gdC5zZXRJbnQzMigwLGUubG8sITApLHQuc2V0SW50MzIoNCxlLmhpLCEwKSx0aGlzLnJhdyhyKX1pbnQ2NChlKXtlPVBiTG9uZy5mcm9tKGUpO3JldHVybiB2YXJpbnQ2NHdyaXRlKGUubG8sZS5oaSx0aGlzLmJ1ZiksdGhpc31zaW50NjQoZSl7dmFyIGU9UGJMb25nLmZyb20oZSkscj1lLmhpPj4zMTtyZXR1cm4gdmFyaW50NjR3cml0ZShlLmxvPDwxXnIsKGUuaGk8PDF8ZS5sbz4+PjMxKV5yLHRoaXMuYnVmKSx0aGlzfXVpbnQ2NChlKXtlPVBiVUxvbmcuZnJvbShlKTtyZXR1cm4gdmFyaW50NjR3cml0ZShlLmxvLGUuaGksdGhpcy5idWYpLHRoaXN9fWNvbnN0IGRlZmF1bHRzUmVhZD17cmVhZFVua25vd25GaWVsZDohMCxyZWFkZXJGYWN0b3J5OmU9Pm5ldyBCaW5hcnlSZWFkZXIoZSl9O2Z1bmN0aW9uIGJpbmFyeVJlYWRPcHRpb25zKGUpe3JldHVybiBlP3suLi5kZWZhdWx0c1JlYWQsLi4uZX06ZGVmYXVsdHNSZWFkfWNsYXNzIEJpbmFyeVJlYWRlcntjb25zdHJ1Y3RvcihlLHIpe3RoaXMudmFyaW50NjQ9dmFyaW50NjRyZWFkLHRoaXMudWludDMyPXZhcmludDMycmVhZCx0aGlzLmJ1Zj1lLHRoaXMubGVuPWUubGVuZ3RoLHRoaXMucG9zPTAsdGhpcy52aWV3PW5ldyBEYXRhVmlldyhlLmJ1ZmZlcixlLmJ5dGVPZmZzZXQsZS5ieXRlTGVuZ3RoKSx0aGlzLnRleHREZWNvZGVyPXI/P25ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIse2ZhdGFsOiEwLGlnbm9yZUJPTTohMH0pfXRhZygpe3ZhciBlPXRoaXMudWludDMyKCkscj1lPj4+MyxlPTcmZTtpZihyPD0wfHxlPDB8fDU8ZSl0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIHRhZzogZmllbGQgbm8gXCIrcitcIiB3aXJlIHR5cGUgXCIrZSk7cmV0dXJuW3IsZV19c2tpcChlKXt2YXIgcix0PXRoaXMucG9zO3N3aXRjaChlKXtjYXNlIFdpcmVUeXBlLlZhcmludDpmb3IoOzEyOCZ0aGlzLmJ1Zlt0aGlzLnBvcysrXTspO2JyZWFrO2Nhc2UgV2lyZVR5cGUuQml0NjQ6dGhpcy5wb3MrPTQ7Y2FzZSBXaXJlVHlwZS5CaXQzMjp0aGlzLnBvcys9NDticmVhaztjYXNlIFdpcmVUeXBlLkxlbmd0aERlbGltaXRlZDp2YXIgYT10aGlzLnVpbnQzMigpO3RoaXMucG9zKz1hO2JyZWFrO2Nhc2UgV2lyZVR5cGUuU3RhcnRHcm91cDpmb3IoOyhyPXRoaXMudGFnKClbMV0pIT09V2lyZVR5cGUuRW5kR3JvdXA7KXRoaXMuc2tpcChyKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcImNhbnQgc2tpcCB3aXJlIHR5cGUgXCIrZSl9cmV0dXJuIHRoaXMuYXNzZXJ0Qm91bmRzKCksdGhpcy5idWYuc3ViYXJyYXkodCx0aGlzLnBvcyl9YXNzZXJ0Qm91bmRzKCl7aWYodGhpcy5wb3M+dGhpcy5sZW4pdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJwcmVtYXR1cmUgRU9GXCIpfWludDMyKCl7cmV0dXJuIDB8dGhpcy51aW50MzIoKX1zaW50MzIoKXt2YXIgZT10aGlzLnVpbnQzMigpO3JldHVybiBlPj4+MV4tKDEmZSl9aW50NjQoKXtyZXR1cm4gbmV3IFBiTG9uZyguLi50aGlzLnZhcmludDY0KCkpfXVpbnQ2NCgpe3JldHVybiBuZXcgUGJVTG9uZyguLi50aGlzLnZhcmludDY0KCkpfXNpbnQ2NCgpe3ZhcltlLHJdPXRoaXMudmFyaW50NjQoKSx0PS0oMSZlKSxlPShlPj4+MXwoMSZyKTw8MzEpXnQscj1yPj4+MV50O3JldHVybiBuZXcgUGJMb25nKGUscil9Ym9vbCgpe3ZhcltlLHJdPXRoaXMudmFyaW50NjQoKTtyZXR1cm4gMCE9PWV8fDAhPT1yfWZpeGVkMzIoKXtyZXR1cm4gdGhpcy52aWV3LmdldFVpbnQzMigodGhpcy5wb3MrPTQpLTQsITApfXNmaXhlZDMyKCl7cmV0dXJuIHRoaXMudmlldy5nZXRJbnQzMigodGhpcy5wb3MrPTQpLTQsITApfWZpeGVkNjQoKXtyZXR1cm4gbmV3IFBiVUxvbmcodGhpcy5zZml4ZWQzMigpLHRoaXMuc2ZpeGVkMzIoKSl9c2ZpeGVkNjQoKXtyZXR1cm4gbmV3IFBiTG9uZyh0aGlzLnNmaXhlZDMyKCksdGhpcy5zZml4ZWQzMigpKX1mbG9hdCgpe3JldHVybiB0aGlzLnZpZXcuZ2V0RmxvYXQzMigodGhpcy5wb3MrPTQpLTQsITApfWRvdWJsZSgpe3JldHVybiB0aGlzLnZpZXcuZ2V0RmxvYXQ2NCgodGhpcy5wb3MrPTgpLTgsITApfWJ5dGVzKCl7dmFyIGU9dGhpcy51aW50MzIoKSxyPXRoaXMucG9zO3JldHVybiB0aGlzLnBvcys9ZSx0aGlzLmFzc2VydEJvdW5kcygpLHRoaXMuYnVmLnN1YmFycmF5KHIscitlKX1zdHJpbmcoKXtyZXR1cm4gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUodGhpcy5ieXRlcygpKX19Y2xhc3MgTWVzc2FnZVR5cGV7Y29uc3RydWN0b3IoZSxyLHQpe3RoaXMuZGVmYXVsdENoZWNrRGVwdGg9MTYsdGhpcy50eXBlTmFtZT1lLHRoaXMuZmllbGRzPXIubWFwKG5vcm1hbGl6ZUZpZWxkSW5mbyksdGhpcy5vcHRpb25zPXQ/P3t9LHRoaXMucmVmVHlwZUNoZWNrPW5ldyBSZWZsZWN0aW9uVHlwZUNoZWNrKHRoaXMpLHRoaXMucmVmSnNvblJlYWRlcj1uZXcgUmVmbGVjdGlvbkpzb25SZWFkZXIodGhpcyksdGhpcy5yZWZKc29uV3JpdGVyPW5ldyBSZWZsZWN0aW9uSnNvbldyaXRlcih0aGlzKSx0aGlzLnJlZkJpblJlYWRlcj1uZXcgUmVmbGVjdGlvbkJpbmFyeVJlYWRlcih0aGlzKSx0aGlzLnJlZkJpbldyaXRlcj1uZXcgUmVmbGVjdGlvbkJpbmFyeVdyaXRlcih0aGlzKX1jcmVhdGUoZSl7dmFyIHI9cmVmbGVjdGlvbkNyZWF0ZSh0aGlzKTtyZXR1cm4gdm9pZCAwIT09ZSYmcmVmbGVjdGlvbk1lcmdlUGFydGlhbCh0aGlzLHIsZSkscn1jbG9uZShlKXt2YXIgcj10aGlzLmNyZWF0ZSgpO3JldHVybiByZWZsZWN0aW9uTWVyZ2VQYXJ0aWFsKHRoaXMscixlKSxyfWVxdWFscyhlLHIpe3JldHVybiByZWZsZWN0aW9uRXF1YWxzKHRoaXMsZSxyKX1pcyhlLHI9dGhpcy5kZWZhdWx0Q2hlY2tEZXB0aCl7cmV0dXJuIHRoaXMucmVmVHlwZUNoZWNrLmlzKGUsciwhMSl9aXNBc3NpZ25hYmxlKGUscj10aGlzLmRlZmF1bHRDaGVja0RlcHRoKXtyZXR1cm4gdGhpcy5yZWZUeXBlQ2hlY2suaXMoZSxyLCEwKX1tZXJnZVBhcnRpYWwoZSxyKXtyZWZsZWN0aW9uTWVyZ2VQYXJ0aWFsKHRoaXMsZSxyKX1mcm9tQmluYXJ5KGUscil7cj1iaW5hcnlSZWFkT3B0aW9ucyhyKTtyZXR1cm4gdGhpcy5pbnRlcm5hbEJpbmFyeVJlYWQoci5yZWFkZXJGYWN0b3J5KGUpLGUuYnl0ZUxlbmd0aCxyKX1mcm9tSnNvbihlLHIpe3JldHVybiB0aGlzLmludGVybmFsSnNvblJlYWQoZSxqc29uUmVhZE9wdGlvbnMocikpfWZyb21Kc29uU3RyaW5nKGUscil7ZT1KU09OLnBhcnNlKGUpO3JldHVybiB0aGlzLmZyb21Kc29uKGUscil9dG9Kc29uKGUscil7cmV0dXJuIHRoaXMuaW50ZXJuYWxKc29uV3JpdGUoZSxqc29uV3JpdGVPcHRpb25zKHIpKX10b0pzb25TdHJpbmcoZSxyKXtlPXRoaXMudG9Kc29uKGUscik7cmV0dXJuIEpTT04uc3RyaW5naWZ5KGUsbnVsbCwobnVsbD09cj92b2lkIDA6ci5wcmV0dHlTcGFjZXMpPz8wKX10b0JpbmFyeShlLHIpe3I9YmluYXJ5V3JpdGVPcHRpb25zKHIpO3JldHVybiB0aGlzLmludGVybmFsQmluYXJ5V3JpdGUoZSxyLndyaXRlckZhY3RvcnkoKSxyKS5maW5pc2goKX1pbnRlcm5hbEpzb25SZWFkKGUscix0KXtpZihudWxsPT09ZXx8XCJvYmplY3RcIiE9dHlwZW9mIGV8fEFycmF5LmlzQXJyYXkoZSkpdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcGFyc2UgbWVzc2FnZSAke3RoaXMudHlwZU5hbWV9IGZyb20gSlNPTiAke3R5cGVvZkpzb25WYWx1ZShlKX0uYCk7cmV0dXJuIHQ9dD8/dGhpcy5jcmVhdGUoKSx0aGlzLnJlZkpzb25SZWFkZXIucmVhZChlLHQsciksdH1pbnRlcm5hbEpzb25Xcml0ZShlLHIpe3JldHVybiB0aGlzLnJlZkpzb25Xcml0ZXIud3JpdGUoZSxyKX1pbnRlcm5hbEJpbmFyeVdyaXRlKGUscix0KXtyZXR1cm4gdGhpcy5yZWZCaW5Xcml0ZXIud3JpdGUoZSxyLHQpLHJ9aW50ZXJuYWxCaW5hcnlSZWFkKGUscix0LGEpe2E9YT8/dGhpcy5jcmVhdGUoKTtyZXR1cm4gdGhpcy5yZWZCaW5SZWFkZXIucmVhZChlLGEsdCxyKSxhfX1cblx0XHRcdFx0XHQvKioqKioqKioqKioqKioqKioqICBpbml0aWFsaXphdGlvbiBmaW5pc2ggICoqKioqKioqKioqKioqKioqKiovXG5cdFx0XHRcdFx0c3dpdGNoIChGT1JNQVQpIHtcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3gtcHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLnByb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoUExBVEZPUk0pIHtcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwiWW91VHViZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvKioqKioqKioqKioqKioqKioqICBpbml0aWFsaXphdGlvbiBzdGFydCAgKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIEJyb3dzZSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkJyb3dzZVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImNvbnRleHRcIiwga2luZDogXCJtZXNzYWdlXCIsIGpzb25OYW1lOiBcInJlc3BvbnNlQ29udGV4dFwiLCBUOiAoKSA9PiBDb250ZXh0IH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA5LCBuYW1lOiBcImNvbnRlbnRzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBDb250ZW50cyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMTAsIG5hbWU6IFwiY29udGludWF0aW9uQ29udGVudHNcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IENvbnRlbnRzIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA3NzcsIG5hbWU6IFwiZnJhbWV3b3JrVXBkYXRlc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gRnJhbWV3b3JrVXBkYXRlcyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEJyb3dzZSA9IG5ldyBCcm93c2UkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgQ29udGV4dCRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkNvbnRleHRcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNiwgbmFtZTogXCJzZXJ2aWNlVHJhY2tpbmdQYXJhbXNcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IFNlcnZpY2VUcmFja2luZ1BhcmFtcyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IENvbnRleHQgPSBuZXcgQ29udGV4dCRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBDb250ZW50cyRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkNvbnRlbnRzXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDQ5Mzk5Nzk3LCBuYW1lOiBcInNlY3Rpb25MaXN0UmVuZGVyZXJcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IFNlY3Rpb25MaXN0UmVuZGVyZXIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDUwMTk1NDYyLCBuYW1lOiBcIm40RjUwMTk1NDYyXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBuNEY1MDE5NTQ2MiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNTgxNzM5NDksIG5hbWU6IFwic2luZ2xlQ29sdW1uQnJvd3NlUmVzdWx0c1JlbmRlcmVyXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBTaW5nbGVDb2x1bW5Ccm93c2VSZXN1bHRzUmVuZGVyZXIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDkwODIzMTM1LCBuYW1lOiBcIm11c2ljU2lkZUFsaWduZWRJdGVtUmVuZGVyZXJcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IE11c2ljU2lkZUFsaWduZWRJdGVtUmVuZGVyZXIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDkxMzAzODcyLCBuYW1lOiBcImdyaWRSZW5kZXJlclwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gR3JpZFJlbmRlcmVyIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxNTM1MTUxNTQsIG5hbWU6IFwibjZGMTUzNTE1MTU0XCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBuNkYxNTM1MTUxNTQgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIyMTQ5NjczNCwgbmFtZTogXCJtdXNpY0Rlc2NyaXB0aW9uU2hlbGZSZW5kZXJlclwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gTXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXIgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBDb250ZW50cyA9IG5ldyBDb250ZW50cyRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBTZXJ2aWNlVHJhY2tpbmdQYXJhbXMkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJTZXJ2aWNlVHJhY2tpbmdQYXJhbXNcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMiwgbmFtZTogXCJwYXJhbXNcIiwga2luZDogXCJtYXBcIiwgSzogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8sIFY6IHsga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IFNlcnZpY2VUcmFja2luZ1BhcmFtcyA9IG5ldyBTZXJ2aWNlVHJhY2tpbmdQYXJhbXMkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgU2luZ2xlQ29sdW1uQnJvd3NlUmVzdWx0c1JlbmRlcmVyJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiU2luZ2xlQ29sdW1uQnJvd3NlUmVzdWx0c1JlbmRlcmVyXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwidGFic1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgcmVwZWF0OiAxIC8qUmVwZWF0VHlwZS5QQUNLRUQqLywgVDogKCkgPT4gVGFicyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IFNpbmdsZUNvbHVtbkJyb3dzZVJlc3VsdHNSZW5kZXJlciA9IG5ldyBTaW5nbGVDb2x1bW5Ccm93c2VSZXN1bHRzUmVuZGVyZXIkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgTXVzaWNTaWRlQWxpZ25lZEl0ZW1SZW5kZXJlciRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIk11c2ljU2lkZUFsaWduZWRJdGVtUmVuZGVyZXJcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJzdGFydEl0ZW1zXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBDb250ZW50cyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IE11c2ljU2lkZUFsaWduZWRJdGVtUmVuZGVyZXIgPSBuZXcgTXVzaWNTaWRlQWxpZ25lZEl0ZW1SZW5kZXJlciRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBHcmlkUmVuZGVyZXIkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJHcmlkUmVuZGVyZXJcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJpdGVtc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgcmVwZWF0OiAxIC8qUmVwZWF0VHlwZS5QQUNLRUQqLywgVDogKCkgPT4gQ29udGVudHMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBHcmlkUmVuZGVyZXIgPSBuZXcgR3JpZFJlbmRlcmVyJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIFRhYnMkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJUYWJzXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDU4MTc0MDEwLCBuYW1lOiBcInRhYlJlbmRlcmVyXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBUYWJSZW5kZXJlciB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IFRhYnMgPSBuZXcgVGFicyRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBUYWJSZW5kZXJlciRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIlRhYlJlbmRlcmVyXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwidGl0bGVcIiwga2luZDogXCJzY2FsYXJcIiwgb3B0OiB0cnVlLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMywgbmFtZTogXCJzZWxlY3RlZFwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA4IC8qU2NhbGFyVHlwZS5CT09MKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDQsIG5hbWU6IFwiY29udGVudFwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gQ29udGVudHMgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDExLCBuYW1lOiBcInRhYklkZW50aWZpZXJcIiwga2luZDogXCJzY2FsYXJcIiwgb3B0OiB0cnVlLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IFRhYlJlbmRlcmVyID0gbmV3IFRhYlJlbmRlcmVyJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIFNlY3Rpb25MaXN0UmVuZGVyZXIkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJTZWN0aW9uTGlzdFJlbmRlcmVyXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwiY29udGVudHNcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IENvbnRlbnRzIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA2LCBuYW1lOiBcImhlYWRlclwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gQ29udGVudHMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBTZWN0aW9uTGlzdFJlbmRlcmVyID0gbmV3IFNlY3Rpb25MaXN0UmVuZGVyZXIkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgbjRGNTAxOTU0NjIkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJuNEY1MDE5NTQ2MlwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcIm41RjFcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IENvbnRlbnRzIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbjRGNTAxOTU0NjIgPSBuZXcgbjRGNTAxOTU0NjIkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgTXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXIkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJNdXNpY0Rlc2NyaXB0aW9uU2hlbGZSZW5kZXJlclwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAzLCBuYW1lOiBcImRlc2NyaXB0aW9uXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBEZXNjcmlwdGlvbiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMTAsIG5hbWU6IFwiZm9vdGVyXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBGb290ZXIgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBNdXNpY0Rlc2NyaXB0aW9uU2hlbGZSZW5kZXJlciA9IG5ldyBNdXNpY0Rlc2NyaXB0aW9uU2hlbGZSZW5kZXJlciRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBEZXNjcmlwdGlvbiRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkRlc2NyaXB0aW9uXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwicnVuc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgcmVwZWF0OiAxIC8qUmVwZWF0VHlwZS5QQUNLRUQqLywgVDogKCkgPT4gUnVucyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IERlc2NyaXB0aW9uID0gbmV3IERlc2NyaXB0aW9uJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIG42RjE1MzUxNTE1NCRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIm42RjE1MzUxNTE1NFwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxNzI2NjA2NjMsIG5hbWU6IFwibjdGMTcyNjYwNjYzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBuN0YxNzI2NjA2NjMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuNkYxNTM1MTUxNTQgPSBuZXcgbjZGMTUzNTE1MTU0JFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIG43RjE3MjY2MDY2MyRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIm43RjE3MjY2MDY2M1wiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcIm44RjFcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IG44RjEgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuN0YxNzI2NjA2NjMgPSBuZXcgbjdGMTcyNjYwNjYzJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIEZvb3RlciRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkZvb3RlclwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcInJ1bnNcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IFJ1bnMgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBGb290ZXIgPSBuZXcgRm9vdGVyJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIG44RjEkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJuOEYxXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDE2ODc3NzQwMSwgbmFtZTogXCJuOUYxNjg3Nzc0MDFcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IG45RjE2ODc3NzQwMSB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG44RjEgPSBuZXcgbjhGMSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBuOUYxNjg3Nzc0MDEkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJuOUYxNjg3Nzc0MDFcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNSwgbmFtZTogXCJuMTBGNVwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gbjEwRjUgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuOUYxNjg3Nzc0MDEgPSBuZXcgbjlGMTY4Nzc3NDAxJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIG4xMEY1JFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwibjEwRjVcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNDY1MTYwOTY1LCBuYW1lOiBcIm4xMUY0NjUxNjA5NjVcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IG4xMUY0NjUxNjA5NjUgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuMTBGNSA9IG5ldyBuMTBGNSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBuMTFGNDY1MTYwOTY1JFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwibjExRjQ2NTE2MDk2NVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA0LCBuYW1lOiBcIm4xMkY0XCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBuMTJGNCB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG4xMUY0NjUxNjA5NjUgPSBuZXcgbjExRjQ2NTE2MDk2NSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBuMTJGNCRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIm4xMkY0XCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwibjEzRjFcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IG4xM0YxIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcIm9yaWdpblRleHRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuMTJGNCA9IG5ldyBuMTJGNCRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBuMTNGMSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIm4xM0YxXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwiZjFcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuMTNGMSA9IG5ldyBuMTNGMSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBuMTFGMTcyMDM1MjUwJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwibjExRjE3MjAzNTI1MFwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcInR5cGVcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuMTFGMTcyMDM1MjUwID0gbmV3IG4xMUYxNzIwMzUyNTAkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgUnVucyRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIlJ1bnNcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJ0ZXh0XCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgUnVucyA9IG5ldyBSdW5zJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIEZyYW1ld29ya1VwZGF0ZXMkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJGcmFtZXdvcmtVcGRhdGVzXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwiZW50aXR5QmF0Y2hVcGRhdGVcIiwga2luZDogXCJtZXNzYWdlXCIsIFQ6ICgpID0+IEVudGl0eUJhdGNoVXBkYXRlIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgRnJhbWV3b3JrVXBkYXRlcyA9IG5ldyBGcmFtZXdvcmtVcGRhdGVzJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIEVudGl0eUJhdGNoVXBkYXRlJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiRW50aXR5QmF0Y2hVcGRhdGVcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJtdXRhdGlvbnNcIiwga2luZDogXCJtZXNzYWdlXCIsIHJlcGVhdDogMSAvKlJlcGVhdFR5cGUuUEFDS0VEKi8sIFQ6ICgpID0+IE11dGF0aW9ucyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEVudGl0eUJhdGNoVXBkYXRlID0gbmV3IEVudGl0eUJhdGNoVXBkYXRlJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIE11dGF0aW9ucyRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIk11dGF0aW9uc1wiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImVudGl0eUtleVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMywgbmFtZTogXCJwYXlsb2FkXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBQYXlsb2FkIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgTXV0YXRpb25zID0gbmV3IE11dGF0aW9ucyRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBQYXlsb2FkJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiUGF5bG9hZFwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxNDQsIG5hbWU6IFwibXVzaWNGb3JtXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBNdXNpY0Zvcm0gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDE0NSwgbmFtZTogXCJtdXNpY0Zvcm1Cb29sZWFuQ2hvaWNlXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBNdXNpY0Zvcm1Cb29sZWFuQ2hvaWNlIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgUGF5bG9hZCA9IG5ldyBQYXlsb2FkJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIE11c2ljRm9ybSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIk11c2ljRm9ybVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImlkXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcImJvb2xlYW5DaG9pY2VFbnRpdHlLZXlzXCIsIGtpbmQ6IFwic2NhbGFyXCIsIHJlcGVhdDogMiAvKlJlcGVhdFR5cGUuVU5QQUNLRUQqLywgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBNdXNpY0Zvcm0gPSBuZXcgTXVzaWNGb3JtJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIE11c2ljRm9ybUJvb2xlYW5DaG9pY2UkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJtdXNpY0Zvcm1Cb29sZWFuQ2hvaWNlXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwiaWRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwiYm9vbGVhbkNob2ljZUVudGl0eUtleVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMywgbmFtZTogXCJzZWxlY3RlZFwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA4IC8qU2NhbGFyVHlwZS5CT09MKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDQsIG5hbWU6IFwib3BhcXVlVG9rZW5cIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBNdXNpY0Zvcm1Cb29sZWFuQ2hvaWNlID0gbmV3IE11c2ljRm9ybUJvb2xlYW5DaG9pY2UkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0LyoqKioqKioqKioqKioqKioqKiAgaW5pdGlhbGl6YXRpb24gZmluaXNoICAqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0XHRcdFx0XHRcdFx0Ym9keSA9IEJyb3dzZS5mcm9tQmluYXJ5KHJhd0JvZHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBjb250ZW50czogJHtKU09OLnN0cmluZ2lmeShib2R5Py5jb250ZW50cyl9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgY29udGludWF0aW9uQ29udGVudHM6ICR7SlNPTi5zdHJpbmdpZnkoYm9keT8uY29udGludWF0aW9uQ29udGVudHMpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IFVGID0gVW5rbm93bkZpZWxkSGFuZGxlci5saXN0KGJvZHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgVUY6ICR7SlNPTi5zdHJpbmdpZnkoVUYpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKFVGKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFVGID0gVUYubWFwKHVmID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VmLm5vOyAvLyAyMlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdWYud2lyZVR5cGU7IC8vIFdpcmVUeXBlLlZhcmludFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHVzZSB0aGUgYmluYXJ5IHJlYWRlciB0byBkZWNvZGUgdGhlIHJhdyBkYXRhOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxldCByZWFkZXIgPSBuZXcgQmluYXJ5UmVhZGVyKHVmLmRhdGEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBhZGRlZE51bWJlciA9IHJlYWRlci5pbnQzMigpOyAvLyA3Nzc3XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYG5vOiAke3VmLm5vfSwgd2lyZVR5cGU6ICR7dWYud2lyZVR5cGV9LCByZWFkZXI6ICR7cmVhZGVyfSwgYWRkZWROdW1iZXI6ICR7YWRkZWROdW1iZXJ9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRcdExhbmd1YWdlc1swXSA9IFwiQVVUT1wiO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGJvZHk/LmNvbnRlbnRzPy5uNkYxNTM1MTUxNTQ/Lm43RjE3MjY2MDY2Mz8ubjhGMT8ubjlGMTY4Nzc3NDAxPy5uMTBGNT8ubjExRjQ2NTE2MDk2NT8ubjEyRjQ/Lm4xM0YxKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBmdWxsVGV4dCA9IGJvZHkuY29udGVudHMubjZGMTUzNTE1MTU0Lm43RjE3MjY2MDY2My5uOEYxLm45RjE2ODc3NzQwMS5uMTBGNS5uMTFGNDY1MTYwOTY1Lm4xMkY0Lm4xM0YxLm1hcChsaW5lID0+IGxpbmU/LmYxID8/IFwiXFx1MjAwYlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNsYXRpb24gPSBhd2FpdCBUcmFuc2xhdGlvbihmdWxsVGV4dCwgU2V0dGluZ3M/Lk1ldGhvZCwgU2V0dGluZ3M/LlZlbmRvciwgTGFuZ3VhZ2VzWzBdLCBMYW5ndWFnZXNbMV0sIFNldHRpbmdzPy5bU2V0dGluZ3M/LlZlbmRvcl0sIENvbmZpZ3M/Lkxhbmd1YWdlcywgU2V0dGluZ3M/LlRpbWVzLCBTZXR0aW5ncz8uSW50ZXJ2YWwsIFNldHRpbmdzPy5FeHBvbmVudGlhbCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJvZHkuY29udGVudHMubjZGMTUzNTE1MTU0Lm43RjE3MjY2MDY2My5uOEYxLm45RjE2ODc3NzQwMS5uMTBGNS5uMTFGNDY1MTYwOTY1Lm4xMkY0Lm4xM0YxID0gYm9keS5jb250ZW50cy5uNkYxNTM1MTUxNTQubjdGMTcyNjYwNjYzLm44RjEubjlGMTY4Nzc3NDAxLm4xMEY1Lm4xMUY0NjUxNjA5NjUubjEyRjQubjEzRjEubWFwKChsaW5lLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGxpbmU/LmYxKSBsaW5lLmYxID0gY29tYmluZVRleHQobGluZS5mMSwgdHJhbnNsYXRpb24/LltpXSwgU2V0dGluZ3M/LlNob3dPbmx5LCBTZXR0aW5ncz8uUG9zaXRpb24pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsaW5lO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoYm9keT8uY29udGVudHM/LnNlY3Rpb25MaXN0UmVuZGVyZXI/LmNvbnRlbnRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBtdXNpY0Rlc2NyaXB0aW9ucyA9IGJvZHkuY29udGVudHMuc2VjdGlvbkxpc3RSZW5kZXJlci5jb250ZW50cztcblx0XHRcdFx0XHRcdFx0XHRcdFx0bXVzaWNEZXNjcmlwdGlvbnMgPSBhd2FpdCBQcm9taXNlLmFsbChtdXNpY0Rlc2NyaXB0aW9ucy5tYXAoYXN5bmMgbXVzaWNEZXNjcmlwdGlvbiA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG11c2ljRGVzY3JpcHRpb24/Lm11c2ljRGVzY3JpcHRpb25TaGVsZlJlbmRlcmVyPy5kZXNjcmlwdGlvbj8ucnVucykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGx5cmljcyA9IG11c2ljRGVzY3JpcHRpb24ubXVzaWNEZXNjcmlwdGlvblNoZWxmUmVuZGVyZXIuZGVzY3JpcHRpb24ucnVucztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGx5cmljcyA9IGF3YWl0IFByb21pc2UuYWxsKGx5cmljcy5tYXAoYXN5bmMgcnVuID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGZ1bGxUZXh0ID0gcnVuPy50ZXh0Py5zcGxpdD8uKFwiXFxuXCIpPy5tYXAodGV4dCA9PiB0ZXh0Py50cmltKCkgPz8gXCJcXHUyMDBiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB0cmFuc2xhdGlvbiA9IGF3YWl0IFRyYW5zbGF0aW9uKGZ1bGxUZXh0LCBTZXR0aW5ncz8uTWV0aG9kLCBTZXR0aW5ncz8uVmVuZG9yLCBMYW5ndWFnZXNbMF0sIExhbmd1YWdlc1sxXSwgU2V0dGluZ3M/LltTZXR0aW5ncz8uVmVuZG9yXSwgQ29uZmlncz8uTGFuZ3VhZ2VzLCBTZXR0aW5ncz8uVGltZXMsIFNldHRpbmdzPy5JbnRlcnZhbCwgU2V0dGluZ3M/LkV4cG9uZW50aWFsKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVsbFRleHQgPSBmdWxsVGV4dC5tYXAoKGxpbmUsIGkpID0+IHsgaWYgKGxpbmUpIHJldHVybiBjb21iaW5lVGV4dChsaW5lLCB0cmFuc2xhdGlvbj8uW2ldLCBTZXR0aW5ncz8uU2hvd09ubHksIFNldHRpbmdzPy5Qb3NpdGlvbiwgXCJcXG4gIOKUlCBcIikgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJ1bi50ZXh0ID0gZnVsbFRleHQuam9pbihcIlxcblwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJ1bjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBtdXNpY0Rlc2NyaXB0aW9uO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBjb250ZW50czogJHtKU09OLnN0cmluZ2lmeShib2R5Py5jb250ZW50cyl9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgY29udGludWF0aW9uQ29udGVudHM6ICR7SlNPTi5zdHJpbmdpZnkoYm9keT8uY29udGludWF0aW9uQ29udGVudHMpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmF3Qm9keSA9IEJyb3dzZS50b0JpbmFyeShib2R5KTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIlNwb3RpZnlcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0LyoqKioqKioqKioqKioqKioqKiAgaW5pdGlhbGl6YXRpb24gc3RhcnQgICoqKioqKioqKioqKioqKioqKiovXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgU3luY1R5cGU7XG5cdFx0XHRcdFx0XHRcdFx0XHQoZnVuY3Rpb24gKFN5bmNUeXBlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFN5bmNUeXBlW1N5bmNUeXBlW1wiVU5TWU5DRURcIl0gPSAwXSA9IFwiVU5TWU5DRURcIjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0U3luY1R5cGVbU3luY1R5cGVbXCJMSU5FX1NZTkNFRFwiXSA9IDFdID0gXCJMSU5FX1NZTkNFRFwiO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRTeW5jVHlwZVtTeW5jVHlwZVtcIlNZTExBQkxFX1NZTkNFRFwiXSA9IDJdID0gXCJTWUxMQUJMRV9TWU5DRURcIjtcblx0XHRcdFx0XHRcdFx0XHRcdH0pKFN5bmNUeXBlIHx8IChTeW5jVHlwZSA9IHt9KSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBDb2xvckx5cmljc1Jlc3BvbnNlJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiQ29sb3JMeXJpY3NSZXNwb25zZVwiLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAxLCBuYW1lOiBcImx5cmljc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gTHlyaWNzUmVzcG9uc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwiY29sb3JzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCBUOiAoKSA9PiBDb2xvckRhdGEgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDMsIG5hbWU6IFwiaGFzVm9jYWxSZW1vdmFsXCIsIGtpbmQ6IFwic2NhbGFyXCIsIG9wdDogdHJ1ZSwgVDogOCAvKlNjYWxhclR5cGUuQk9PTCovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA0LCBuYW1lOiBcInZvY2FsUmVtb3ZhbENvbG9yc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gQ29sb3JEYXRhIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgQ29sb3JMeXJpY3NSZXNwb25zZSA9IG5ldyBDb2xvckx5cmljc1Jlc3BvbnNlJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIEx5cmljc1Jlc3BvbnNlJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiTHlyaWNzUmVzcG9uc2VcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJzeW5jVHlwZVwiLCBraW5kOiBcImVudW1cIiwgVDogKCkgPT4gW1wiU3luY1R5cGVcIiwgU3luY1R5cGVdIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcImxpbmVzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBMeXJpY3NMaW5lIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAzLCBuYW1lOiBcInByb3ZpZGVyXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA0LCBuYW1lOiBcInByb3ZpZGVyTHlyaWNzSWRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDUsIG5hbWU6IFwicHJvdmlkZXJEaXNwbGF5TmFtZVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNiwgbmFtZTogXCJzeW5jTHlyaWNzQW5kcm9pZEludGVudFwiLCBraW5kOiBcIm1lc3NhZ2VcIiwgVDogKCkgPT4gQW5kcm9pZEludGVudCB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNywgbmFtZTogXCJzeW5jTHlyaWNzVXJpXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiA4LCBuYW1lOiBcImlzRGVuc2VUeXBlZmFjZVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA4IC8qU2NhbGFyVHlwZS5CT09MKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDksIG5hbWU6IFwiYWx0ZXJuYXRpdmVzXCIsIGtpbmQ6IFwibWVzc2FnZVwiLCByZXBlYXQ6IDEgLypSZXBlYXRUeXBlLlBBQ0tFRCovLCBUOiAoKSA9PiBBbHRlcm5hdGl2ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMTAsIG5hbWU6IFwibGFuZ3VhZ2VcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDExLCBuYW1lOiBcImlzUnRsTGFuZ3VhZ2VcIiwga2luZDogXCJzY2FsYXJcIiwgb3B0OiB0cnVlLCBUOiA4IC8qU2NhbGFyVHlwZS5CT09MKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEyLCBuYW1lOiBcImZ1bGxzY3JlZW5BY3Rpb25cIiwga2luZDogXCJzY2FsYXJcIiwgVDogNSAvKlNjYWxhclR5cGUuSU5UMzIqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMTMsIG5hbWU6IFwic2hvd1Vwc2VsbFwiLCBraW5kOiBcInNjYWxhclwiLCBvcHQ6IHRydWUsIFQ6IDggLypTY2FsYXJUeXBlLkJPT0wqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEx5cmljc1Jlc3BvbnNlID0gbmV3IEx5cmljc1Jlc3BvbnNlJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIEx5cmljc0xpbmUkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJMeXJpY3NMaW5lXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwic3RhcnRUaW1lTXNcIiwga2luZDogXCJzY2FsYXJcIiwgVDogMyAvKlNjYWxhclR5cGUuSU5UNjQqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMiwgbmFtZTogXCJ3b3Jkc1wiLCBraW5kOiBcInNjYWxhclwiLCBvcHQ6IHRydWUsIFQ6IDkgLypTY2FsYXJUeXBlLlNUUklORyovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAzLCBuYW1lOiBcInN5bGxhYmxlc1wiLCBraW5kOiBcIm1lc3NhZ2VcIiwgcmVwZWF0OiAxIC8qUmVwZWF0VHlwZS5QQUNLRUQqLywgVDogKCkgPT4gU3lsbGFibGUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8veyBubzogNCwgbmFtZTogXCJlbmRUaW1lTXNcIiwga2luZDogXCJzY2FsYXJcIiwgb3B0OiB0cnVlLCBUOiAzIC8qU2NhbGFyVHlwZS5JTlQ2NCovIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgTHlyaWNzTGluZSA9IG5ldyBMeXJpY3NMaW5lJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzIFN5bGxhYmxlJFR5cGUgZXh0ZW5kcyBNZXNzYWdlVHlwZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1cGVyKFwiU3lsbGFibGVcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJzdGFydFRpbWVNc1wiLCBraW5kOiBcInNjYWxhclwiLCBUOiAzIC8qU2NhbGFyVHlwZS5JTlQ2NCovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAyLCBuYW1lOiBcIm51bUNoYXJzXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDMgLypTY2FsYXJUeXBlLklOVDY0Ki8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBTeWxsYWJsZSA9IG5ldyBTeWxsYWJsZSRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBDb2xvckRhdGEkVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3VwZXIoXCJDb2xvckRhdGFcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJiYWNrZ3JvdW5kXCIsIGtpbmQ6IFwic2NhbGFyXCIsIFQ6IDUgLypTY2FsYXJUeXBlLklOVDMyKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwidGV4dFwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA1IC8qU2NhbGFyVHlwZS5JTlQzMiovIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IG5vOiAzLCBuYW1lOiBcImhpZ2hsaWdodFRleHRcIiwga2luZDogXCJzY2FsYXJcIiwgVDogNSAvKlNjYWxhclR5cGUuSU5UMzIqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IENvbG9yRGF0YSA9IG5ldyBDb2xvckRhdGEkVHlwZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3MgQW5kcm9pZEludGVudCRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkFuZHJvaWRJbnRlbnRcIiwgW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMSwgbmFtZTogXCJwcm92aWRlclwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMiwgbmFtZTogXCJwcm92aWRlckFuZHJvaWRBcHBJZFwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogMywgbmFtZTogXCJhY3Rpb25cIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDQsIG5hbWU6IFwiZGF0YVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyBubzogNSwgbmFtZTogXCJjb250ZW50VHlwZVwiLCBraW5kOiBcInNjYWxhclwiLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEFuZHJvaWRJbnRlbnQgPSBuZXcgQW5kcm9pZEludGVudCRUeXBlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcyBBbHRlcm5hdGl2ZSRUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGUge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdXBlcihcIkFsdGVybmF0aXZlXCIsIFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDEsIG5hbWU6IFwibGFuZ3VhZ2VcIiwga2luZDogXCJzY2FsYXJcIiwgVDogOSAvKlNjYWxhclR5cGUuU1RSSU5HKi8gfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbm86IDIsIG5hbWU6IFwibGluZXNcIiwga2luZDogXCJzY2FsYXJcIiwgcmVwZWF0OiAyIC8qUmVwZWF0VHlwZS5VTlBBQ0tFRCovLCBUOiA5IC8qU2NhbGFyVHlwZS5TVFJJTkcqLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IEFsdGVybmF0aXZlID0gbmV3IEFsdGVybmF0aXZlJFR5cGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8qKioqKioqKioqKioqKioqKiogIGluaXRpYWxpemF0aW9uIGZpbmlzaCAgKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdFx0XHRcdFx0XHRcdGJvZHkgPSBDb2xvckx5cmljc1Jlc3BvbnNlLmZyb21CaW5hcnkocmF3Qm9keSk7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgVUYgPSBVbmtub3duRmllbGRIYW5kbGVyLmxpc3QoYm9keSk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBVRjogJHtKU09OLnN0cmluZ2lmeShVRil9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoVUYpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0VUYgPSBVRi5tYXAodWYgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdWYubm87IC8vIDIyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91Zi53aXJlVHlwZTsgLy8gV2lyZVR5cGUuVmFyaW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gdXNlIHRoZSBiaW5hcnkgcmVhZGVyIHRvIGRlY29kZSB0aGUgcmF3IGRhdGE6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IHJlYWRlciA9IG5ldyBCaW5hcnlSZWFkZXIodWYuZGF0YSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGFkZGVkTnVtYmVyID0gcmVhZGVyLmludDMyKCk7IC8vIDc3Nzdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgbm86ICR7dWYubm99LCB3aXJlVHlwZTogJHt1Zi53aXJlVHlwZX0sIHJlYWRlcjogJHtyZWFkZXJ9LCBhZGRlZE51bWJlcjogJHthZGRlZE51bWJlcn1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdFx0XHRcdExhbmd1YWdlc1swXSA9IChib2R5Py5seXJpY3M/Lmxhbmd1YWdlID09PSBcInoxXCIpID8gXCJaSC1IQU5UXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiAoYm9keT8ubHlyaWNzPy5sYW5ndWFnZSkgPyBib2R5Py5seXJpY3M/Lmxhbmd1YWdlLnRvVXBwZXJDYXNlKClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IFwiQVVUT1wiO1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGZ1bGxUZXh0ID0gYm9keS5seXJpY3MubGluZXMubWFwKGxpbmUgPT4gbGluZT8ud29yZHMgPz8gXCJcXHUyMDBiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNsYXRpb24gPSBhd2FpdCBUcmFuc2xhdGlvbihmdWxsVGV4dCwgU2V0dGluZ3M/Lk1ldGhvZCwgU2V0dGluZ3M/LlZlbmRvciwgTGFuZ3VhZ2VzWzBdLCBMYW5ndWFnZXNbMV0sIFNldHRpbmdzPy5bU2V0dGluZ3M/LlZlbmRvcl0sIENvbmZpZ3M/Lkxhbmd1YWdlcywgU2V0dGluZ3M/LlRpbWVzLCBTZXR0aW5ncz8uSW50ZXJ2YWwsIFNldHRpbmdzPy5FeHBvbmVudGlhbCk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0Ym9keS5seXJpY3MuYWx0ZXJuYXRpdmVzID0gW3tcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJsYW5ndWFnZVwiOiBMYW5ndWFnZXNbMV0udG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJsaW5lc1wiOiB0cmFuc2xhdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0fV07XG5cdFx0XHRcdFx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFib2R5Py5seXJpY3M/LmFsdGVybmF0aXZlcykgYm9keS5seXJpY3MuYWx0ZXJuYXRpdmVzID0gW107XG5cdFx0XHRcdFx0XHRcdFx0XHRib2R5Lmx5cmljcy5hbHRlcm5hdGl2ZXMudW5zaGlmdCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibGFuZ3VhZ2VcIjogTGFuZ3VhZ2VzWzFdLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibGluZXNcIjogdHJhbnNsYXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRyYXdCb2R5ID0gQ29sb3JMeXJpY3NSZXNwb25zZS50b0JpbmFyeShib2R5KTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2dycGNcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjK3Byb3RvXCI6XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ly8g5YaZ5YWl5LqM6L+b5Yi25pWw5o2uXG5cdFx0XHRcdFx0aWYgKCQuaXNRdWFuWCgpKSAkcmVzcG9uc2UuYm9keUJ5dGVzID0gcmF3Qm9keVxuXHRcdFx0XHRcdGVsc2UgJHJlc3BvbnNlLmJvZHkgPSByYXdCb2R5O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgZmFsc2U6XG5cdFx0XHRicmVhaztcblx0fTtcbn0pKClcblx0LmNhdGNoKChlKSA9PiAkLmxvZ0VycihlKSlcblx0LmZpbmFsbHkoKCkgPT4ge1xuXHRcdHN3aXRjaCAoJHJlc3BvbnNlKSB7XG5cdFx0XHRkZWZhdWx0OiB7IC8vIOacieWbnuWkjeaVsOaNru+8jOi/lOWbnuWbnuWkjeaVsOaNrlxuXHRcdFx0XHQvL2NvbnN0IEZPUk1BVCA9ICgkcmVzcG9uc2U/LmhlYWRlcnM/LltcIkNvbnRlbnQtVHlwZVwiXSA/PyAkcmVzcG9uc2U/LmhlYWRlcnM/LltcImNvbnRlbnQtdHlwZVwiXSk/LnNwbGl0KFwiO1wiKT8uWzBdO1xuXHRcdFx0XHQkLmxvZyhg8J+OiSAkeyQubmFtZX0sIGZpbmFsbHlgLCBgJHJlc3BvbnNlYCwgYEZPUk1BVDogJHtGT1JNQVR9YCwgXCJcIik7XG5cdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBmaW5hbGx5YCwgYCRyZXNwb25zZTogJHtKU09OLnN0cmluZ2lmeSgkcmVzcG9uc2UpfWAsIFwiXCIpO1xuXHRcdFx0XHRpZiAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJDb250ZW50LUVuY29kaW5nXCJdKSAkcmVzcG9uc2UuaGVhZGVyc1tcIkNvbnRlbnQtRW5jb2RpbmdcIl0gPSBcImlkZW50aXR5XCI7XG5cdFx0XHRcdGlmICgkcmVzcG9uc2U/LmhlYWRlcnM/LltcImNvbnRlbnQtZW5jb2RpbmdcIl0pICRyZXNwb25zZS5oZWFkZXJzW1wiY29udGVudC1lbmNvZGluZ1wiXSA9IFwiaWRlbnRpdHlcIjtcblx0XHRcdFx0aWYgKCQuaXNRdWFuWCgpKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChGT1JNQVQpIHtcblx0XHRcdFx0XHRcdGNhc2UgdW5kZWZpbmVkOiAvLyDop4bkuLrml6Bib2R5XG5cdFx0XHRcdFx0XHRcdC8vIOi/lOWbnuaZrumAmuaVsOaNrlxuXHRcdFx0XHRcdFx0XHQkLmRvbmUoeyBzdGF0dXM6ICRyZXNwb25zZS5zdGF0dXMsIGhlYWRlcnM6ICRyZXNwb25zZS5oZWFkZXJzIH0pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdC8vIOi/lOWbnuaZrumAmuaVsOaNrlxuXHRcdFx0XHRcdFx0XHQkLmRvbmUoeyBzdGF0dXM6ICRyZXNwb25zZS5zdGF0dXMsIGhlYWRlcnM6ICRyZXNwb25zZS5oZWFkZXJzLCBib2R5OiAkcmVzcG9uc2UuYm9keSB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vcHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXByb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS5wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2dycGNcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjK3Byb3RvXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGVjYXRpb24vb2N0ZXQtc3RyZWFtXCI6XG5cdFx0XHRcdFx0XHRcdC8vIOi/lOWbnuS6jOi/m+WItuaVsOaNrlxuXHRcdFx0XHRcdFx0XHQvLyQubG9nKGAkeyRyZXNwb25zZS5ib2R5Qnl0ZXMuYnl0ZUxlbmd0aH0tLS0keyRyZXNwb25zZS5ib2R5Qnl0ZXMuYnVmZmVyLmJ5dGVMZW5ndGh9YCk7XG5cdFx0XHRcdFx0XHRcdCQuZG9uZSh7IHN0YXR1czogJHJlc3BvbnNlLnN0YXR1cywgaGVhZGVyczogJHJlc3BvbnNlLmhlYWRlcnMsIGJvZHlCeXRlczogJHJlc3BvbnNlLmJvZHlCeXRlcy5idWZmZXIuc2xpY2UoJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlT2Zmc2V0LCAkcmVzcG9uc2UuYm9keUJ5dGVzLmJ5dGVMZW5ndGggKyAkcmVzcG9uc2UuYm9keUJ5dGVzLmJ5dGVPZmZzZXQpIH0pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9IGVsc2UgJC5kb25lKCRyZXNwb25zZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdGNhc2UgdW5kZWZpbmVkOiB7IC8vIOaXoOWbnuWkjeaVsOaNrlxuXHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0fTtcblx0fSlcblxuLyoqKioqKioqKioqKioqKioqIEZ1bmN0aW9uICoqKioqKioqKioqKioqKioqL1xuLyoqXG4gKiBTZXQgQ2FjaGVcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7TWFwfSBjYWNoZSAtIFBsYXlsaXN0cyBDYWNoZSAvIFN1YnRpdGxlcyBDYWNoZVxuICogQHBhcmFtIHtOdW1iZXJ9IGNhY2hlU2l6ZSAtIENhY2hlIFNpemVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGlzU2F2ZWRcbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGUoY2FjaGUsIGNhY2hlU2l6ZSA9IDEwMCkge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfSwgU2V0IENhY2hlLCBjYWNoZVNpemU6ICR7Y2FjaGVTaXplfWAsIFwiXCIpO1xuXHRjYWNoZSA9IEFycmF5LmZyb20oY2FjaGUgfHwgW10pOyAvLyBNYXDovaxBcnJheVxuXHRjYWNoZSA9IGNhY2hlLnNsaWNlKC1jYWNoZVNpemUpOyAvLyDpmZDliLbnvJPlrZjlpKflsI9cblx0JC5sb2coYOKchSAkeyQubmFtZX0sIFNldCBDYWNoZWAsIFwiXCIpO1xuXHRyZXR1cm4gY2FjaGU7XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge0FycmF5fSB0ZXh0IC0gZnVsbCB0ZXh0XG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIC0gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gdmVuZG9yIC0gdHJhbnNsYXRlIHNlcnZpY2UgdmVuZG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gc291cmNlIC0gc291cmNlIGxhbmd1YWdlXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0IC0gdGFyZ2V0IGxhbmd1YWdlXG4gKiBAcGFyYW0ge09iamVjdH0gYXBpIC0gdHJhbnNsYXRlIHNlcnZpY2UgQVBJXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YWJhc2UgLSBsYW5ndWFnZXMgZGF0YWJhc2VcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lcyAtIHJldHJ5IHRpbWVzXG4gKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgLSByZXRyeSBpbnRlcnZhbFxuICogQHBhcmFtIHtCb29sZWFufSBleHBvbmVudGlhbCAtIHJldHJ5IEV4cG9uZW50aWFsXG4gKiBcbiAqIEByZXR1cm4ge1Byb21pc2U8Kj59XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIFRyYW5zbGF0aW9uKHRleHQgPSBbXSwgbWV0aG9kID0gXCJQYXJ0XCIsIHZlbmRvciA9IFwiR29vZ2xlXCIsIHNvdXJjZSA9IFwiRU5cIiwgdGFyZ2V0ID0gXCJaSFwiLCBBUEkgPSB7fSwgZGF0YWJhc2UgPSB7fSwgdGltZXMgPSAzLCBpbnRlcnZhbCA9IDEwMCwgZXhwb25lbnRpYWwgPSB0cnVlKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBUcmFuc2xhdGlvbiwgbWV0aG9kOiAke21ldGhvZH0sIHZlbmRvcjogJHt2ZW5kb3J9LCBzb3VyY2U6ICR7c291cmNlfSwgdGFyZ2V0OiAke3RhcmdldH1gLCBcIlwiKTtcblx0Ly8g57+76K+R6ZW/5bqm6K6+572uXG5cdGxldCBsZW5ndGggPSAxMjc7XG5cdHN3aXRjaCAodmVuZG9yKSB7XG5cdFx0Y2FzZSBcIkdvb2dsZVwiOlxuXHRcdGNhc2UgXCJHb29nbGVDbG91ZFwiOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsZW5ndGggPSAxMjA7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiTWljcm9zb2Z0XCI6XG5cdFx0Y2FzZSBcIkF6dXJlXCI6XG5cdFx0XHRsZW5ndGggPSA5OTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJEZWVwTFwiOlxuXHRcdFx0bGVuZ3RoID0gNDk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiRGVlcExYXCI6XG5cdFx0XHRsZW5ndGggPSAyMDtcblx0XHRcdGJyZWFrO1xuXHR9O1xuXHRsZXQgVHJhbnNsYXRpb24gPSBbXTtcblx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRkZWZhdWx0OlxuXHRcdGNhc2UgXCJQYXJ0XCI6IC8vIFBhcnQg6YCQ5q6157+76K+RXG5cdFx0XHRsZXQgcGFydHMgPSBjaHVuayh0ZXh0LCBsZW5ndGgpO1xuXHRcdFx0VHJhbnNsYXRpb24gPSBhd2FpdCBQcm9taXNlLmFsbChwYXJ0cy5tYXAoYXN5bmMgcGFydCA9PiBhd2FpdCByZXRyeSgoKSA9PiBUcmFuc2xhdG9yKHZlbmRvciwgc291cmNlLCB0YXJnZXQsIHBhcnQsIEFQSSwgZGF0YWJhc2UpLCB0aW1lcywgaW50ZXJ2YWwsIGV4cG9uZW50aWFsKSkpLnRoZW4ocGFydCA9PiBwYXJ0LmZsYXQoSW5maW5pdHkpKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJSb3dcIjogLy8gUm93IOmAkOihjOe/u+ivkVxuXHRcdFx0VHJhbnNsYXRpb24gPSBhd2FpdCBQcm9taXNlLmFsbCh0ZXh0Lm1hcChhc3luYyByb3cgPT4gYXdhaXQgcmV0cnkoKCkgPT4gVHJhbnNsYXRvcih2ZW5kb3IsIHNvdXJjZSwgdGFyZ2V0LCByb3csIEFQSSwgZGF0YWJhc2UpLCB0aW1lcywgaW50ZXJ2YWwsIGV4cG9uZW50aWFsKSkpO1xuXHRcdFx0YnJlYWs7XG5cdH07XG5cdC8vJC5sb2coYOKchSAkeyQubmFtZX0sIFRyYW5zbGF0aW9uLCBUcmFuc2xhdGlvbjogJHtKU09OLnN0cmluZ2lmeShUcmFuc2xhdGlvbil9YCwgXCJcIik7XG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBUcmFuc2xhdGlvbmAsIFwiXCIpO1xuXHRyZXR1cm4gVHJhbnNsYXRpb247XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0b3JcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2ZW5kb3IgLSB2ZW5kb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb3VyY2UgLSBzb3VyY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgLSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IC0gdGV4dFxuICogQHBhcmFtIHtPYmplY3R9IGFwaSAtIEFQSVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFiYXNlIC0gTGFuZ3VhZ2VzIERhdGFiYXNlXG4gKiBAcmV0dXJuIHtQcm9taXNlPCo+fVxuICovXG5hc3luYyBmdW5jdGlvbiBUcmFuc2xhdG9yKHZlbmRvciA9IFwiR29vZ2xlXCIsIHNvdXJjZSA9IFwiXCIsIHRhcmdldCA9IFwiXCIsIHRleHQgPSBcIlwiLCBhcGkgPSB7fSwgZGF0YWJhc2UpIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIFRyYW5zbGF0b3JgLCBgb3JpZzogJHt0ZXh0fWAsIFwiXCIpO1xuXHQvLyDovazmjaLor63oqIDku6PnoIFcblx0c3dpdGNoICh2ZW5kb3IpIHtcblx0XHRjYXNlIFwiR29vZ2xlXCI6XG5cdFx0Y2FzZSBcIkdvb2dsZUNsb3VkXCI6XG5cdFx0XHRzb3VyY2UgPSBkYXRhYmFzZS5Hb29nbGVbc291cmNlXSA/PyBkYXRhYmFzZS5Hb29nbGVbc291cmNlPy5zcGxpdD8uKC9bLV9dLyk/LlswXV07XG5cdFx0XHR0YXJnZXQgPSBkYXRhYmFzZS5Hb29nbGVbdGFyZ2V0XSA/PyBkYXRhYmFzZS5Hb29nbGVbc291cmNlPy5zcGxpdD8uKC9bLV9dLyk/LlswXV07XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiQmluZ1wiOlxuXHRcdGNhc2UgXCJNaWNyb3NvZnRcIjpcblx0XHRjYXNlIFwiQXp1cmVcIjpcblx0XHRcdHNvdXJjZSA9IGRhdGFiYXNlLk1pY3Jvc29mdFtzb3VyY2VdID8/IGRhdGFiYXNlLk1pY3Jvc29mdFtzb3VyY2U/LnNwbGl0Py4oL1stX10vKT8uWzBdXTtcblx0XHRcdHRhcmdldCA9IGRhdGFiYXNlLk1pY3Jvc29mdFt0YXJnZXRdID8/IGRhdGFiYXNlLk1pY3Jvc29mdFtzb3VyY2U/LnNwbGl0Py4oL1stX10vKT8uWzBdXTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJEZWVwTFwiOlxuXHRcdGNhc2UgXCJEZWVwTFhcIjpcblx0XHRcdHNvdXJjZSA9IGRhdGFiYXNlLkRlZXBMW3NvdXJjZV0gPz8gZGF0YWJhc2UuRGVlcExbc291cmNlPy5zcGxpdD8uKC9bLV9dLyk/LlswXV07XG5cdFx0XHR0YXJnZXQgPSBkYXRhYmFzZS5EZWVwTFt0YXJnZXRdID8/IGRhdGFiYXNlLkRlZXBMW3NvdXJjZT8uc3BsaXQ/LigvWy1fXS8pPy5bMF1dO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIkJhaWR1RmFueWlcIjpcblx0XHRcdHNvdXJjZSA9IGRhdGFiYXNlLkJhaWR1W3NvdXJjZV0gPz8gZGF0YWJhc2UuQmFpZHVbc291cmNlPy5zcGxpdD8uKC9bLV9dLyk/LlswXV07XG5cdFx0XHR0YXJnZXQgPSBkYXRhYmFzZS5CYWlkdVt0YXJnZXRdID8/IGRhdGFiYXNlLkJhaWR1W3NvdXJjZT8uc3BsaXQ/LigvWy1fXS8pPy5bMF1dO1xuXHRcdGNhc2UgXCJZb3VkYW9BSVwiOlxuXHRcdFx0c291cmNlID0gZGF0YWJhc2UuWW91ZGFvW3NvdXJjZV0gPz8gZGF0YWJhc2UuWW91ZGFvW3NvdXJjZT8uc3BsaXQ/LigvWy1fXS8pPy5bMF1dO1xuXHRcdFx0dGFyZ2V0ID0gZGF0YWJhc2UuWW91ZGFvW3RhcmdldF0gPz8gZGF0YWJhc2UuWW91ZGFvW3NvdXJjZT8uc3BsaXQ/LigvWy1fXS8pPy5bMF1dO1xuXHRcdFx0YnJlYWs7XG5cdH07XG5cdC8vIOaehOmAoOivt+axglxuXHRsZXQgcmVxdWVzdCA9IGF3YWl0IEdldFJlcXVlc3QodmVuZG9yLCBzb3VyY2UsIHRhcmdldCwgdGV4dCk7XG5cdC8vIOWPkemAgeivt+axglxuXHRsZXQgdHJhbnMgPSBhd2FpdCBHZXREYXRhKHZlbmRvciwgcmVxdWVzdCk7XG5cdCQubG9nKGDwn5qnICR7JC5uYW1lfSwgVHJhbnNsYXRvcmAsIGB0cmFuczogJHt0cmFuc31gLCBcIlwiKTtcblx0cmV0dXJuIHRyYW5zXG5cdC8qKioqKioqKioqKioqKioqKiBGdWN0aW9ucyAqKioqKioqKioqKioqKioqKi9cblx0Ly8gR2V0IFRyYW5zbGF0ZSBSZXF1ZXN0XG5cdGFzeW5jIGZ1bmN0aW9uIEdldFJlcXVlc3QodmVuZG9yID0gXCJcIiwgc291cmNlID0gXCJcIiwgdGFyZ2V0ID0gXCJcIiwgdGV4dCA9IFwiXCIpIHtcblx0XHQkLmxvZyhg4piR77iPICR7JC5uYW1lfSwgR2V0IFRyYW5zbGF0ZSBSZXF1ZXN0YCwgXCJcIik7XG5cdFx0Y29uc3QgVUFQb29sID0gW1xuXHRcdFx0XCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTYuMC40NjY0LjQ1IFNhZmFyaS81MzcuMzZcIiwgLy8gMTMuNSVcblx0XHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk2LjAuNDY2NC4xMTAgU2FmYXJpLzUzNy4zNlwiLCAvLyA2LjYlXG5cdFx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2Ojk0LjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvOTQuMFwiLCAvLyA2LjQlXG5cdFx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2Ojk1LjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvOTUuMFwiLCAvLyA2LjIlXG5cdFx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85Ni4wLjQ2NjQuOTMgU2FmYXJpLzUzNy4zNlwiLCAvLyA1LjIlXG5cdFx0XHRcIk1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85Ni4wLjQ2NjQuNTUgU2FmYXJpLzUzNy4zNlwiLCAvLyA0LjglXG5cdFx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS83NC4wLjM3MjkuMTY5IFNhZmFyaS81MzcuMzZcIixcblx0XHRcdFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzY0LjAuMzI4Mi4xNDAgU2FmYXJpLzUzNy4zNiBFZGdlLzE3LjE3MTM0XCIsXG5cdFx0XHRcIk1vemlsbGEvNS4wIChpUGhvbmU7IENQVSBpUGhvbmUgT1MgMTJfMiBsaWtlIE1hYyBPUyBYKSBBcHBsZVdlYktpdC82MDUuMS4xNSAoS0hUTUwsIGxpa2UgR2Vja28pIE1vYmlsZS8xNUUxNDhcIixcblx0XHRcdFwiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxMl8yIGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwNS4xLjE1IChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi8xMi4xIE1vYmlsZS8xNUUxNDggU2FmYXJpLzYwNC4xXCIsXG5cdFx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpXCIsXG5cdFx0XHRcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDYuMTsgV09XNjQ7IHJ2OjUyLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvNTIuMFwiLFxuXHRcdF07XG5cdFx0bGV0IHJlcXVlc3QgPSB7fTtcblx0XHRsZXQgQmFzZVVSTCA9IFwiXCI7XG5cdFx0bGV0IHRleHRzID0gXCJcIjtcblx0XHRzd2l0Y2ggKHZlbmRvcikge1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdGNhc2UgXCJHb29nbGVcIjpcblx0XHRcdFx0Y29uc3QgQmFzZVJlcXVlc3QgPSBbXG5cdFx0XHRcdFx0eyAvLyBHb29nbGUgQVBJXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImh0dHBzOi8vdHJhbnNsYXRlLmdvb2dsZWFwaXMuY29tL3RyYW5zbGF0ZV9hL3NpbmdsZT9jbGllbnQ9Z3R4JmR0PXRcIixcblx0XHRcdFx0XHRcdFwiaGVhZGVyc1wiOiB7XG5cdFx0XHRcdFx0XHRcdFwiQWNjZXB0XCI6IFwiKi8qXCIsXG5cdFx0XHRcdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBVQVBvb2xbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogVUFQb29sLmxlbmd0aCldLCAvLyDpmo/mnLpVQVxuXHRcdFx0XHRcdFx0XHRcIlJlZmVyZXJcIjogXCJodHRwczovL3RyYW5zbGF0ZS5nb29nbGUuY29tXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgLy8gR29vZ2xlIERpY3Rpb25hcnkgQ2hyb21lIGV4dGVuc2lvbiBodHRwczovL2Nocm9tZS5nb29nbGUuY29tL3dlYnN0b3JlL2RldGFpbC9nb29nbGUtZGljdGlvbmFyeS1ieS1nb29nL21naWptYWpvY2dmY2JlYm9hY2FiZmdvYm1qZ2pjb2phXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImh0dHBzOi8vY2xpZW50czUuZ29vZ2xlLmNvbS90cmFuc2xhdGVfYS90P2NsaWVudD1kaWN0LWNocm9tZS1leFwiLFxuXHRcdFx0XHRcdFx0XCJoZWFkZXJzXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJBY2NlcHRcIjogXCIqLypcIixcblx0XHRcdFx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFVBUG9vbFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBVQVBvb2wubGVuZ3RoKV0gLy8g6ZqP5py6VUFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgLy8gR29vZ2xlIFRyYW5zbGF0ZSBBcHBcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiaHR0cHM6Ly90cmFuc2xhdGUuZ29vZ2xlLmNvbS90cmFuc2xhdGVfYS9zaW5nbGU/Y2xpZW50PWl0JmR0PXFjYSZkdD10JmR0PXJtdCZkdD1iZCZkdD1ybXMmZHQ9c29zJmR0PW1kJmR0PWd0JmR0PWxkJmR0PXNzJmR0PWV4Jm90Zj0yJmRqPTEmaGw9ZW4maWU9VVRGLTgmb2U9VVRGLThcIixcblx0XHRcdFx0XHRcdFwiaGVhZGVyc1wiOiB7XG5cdFx0XHRcdFx0XHRcdFwiQWNjZXB0XCI6IFwiKi8qXCIsXG5cdFx0XHRcdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBcIkdvb2dsZVRyYW5zbGF0ZS82LjI5LjU5Mjc5IChpUGhvbmU7IGlPUyAxNS40OyBlbjsgaVBob25lMTQsMilcIixcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgLy8gR29vZ2xlIFRyYW5zbGF0ZSBBcHBcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiaHR0cHM6Ly90cmFuc2xhdGUuZ29vZ2xlYXBpcy5jb20vdHJhbnNsYXRlX2Evc2luZ2xlP2NsaWVudD1ndHgmZGo9MSZzb3VyY2U9YnViYmxlJmR0PXQmZHQ9YmQmZHQ9ZXgmZHQ9bGQmZHQ9bWQmZHQ9cWNhJmR0PXJ3JmR0PXJtJmR0PXNzJmR0PXQmZHQ9YXRcIixcblx0XHRcdFx0XHRcdFwiaGVhZGVyc1wiOiB7XG5cdFx0XHRcdFx0XHRcdFwiQWNjZXB0XCI6IFwiKi8qXCIsXG5cdFx0XHRcdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBcIkdvb2dsZVRyYW5zbGF0ZS82LjI5LjU5Mjc5IChpUGhvbmU7IGlPUyAxNS40OyBlbjsgaVBob25lMTQsMilcIixcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdFx0cmVxdWVzdCA9IEJhc2VSZXF1ZXN0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChCYXNlUmVxdWVzdC5sZW5ndGggLSAyKSldIC8vIOmaj+aculJlcXVlc3QsIOaOkumZpOacgOWQjuS4pOmhuVxuXHRcdFx0XHR0ZXh0ID0gKEFycmF5LmlzQXJyYXkodGV4dCkpID8gdGV4dC5qb2luKFwiXFxyXCIpIDogdGV4dDtcblx0XHRcdFx0cmVxdWVzdC51cmwgPSByZXF1ZXN0LnVybCArIGAmc2w9JHtzb3VyY2V9JnRsPSR7dGFyZ2V0fSZxPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWA7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIkdvb2dsZUNsb3VkXCI6XG5cdFx0XHRcdEJhc2VVUkwgPSBcImh0dHBzOi8vdHJhbnNsYXRpb24uZ29vZ2xlYXBpcy5jb21cIjtcblx0XHRcdFx0c3dpdGNoIChhcGk/LlZlcnNpb24pIHtcblx0XHRcdFx0XHRjYXNlIFwidjJcIjpcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmVxdWVzdC51cmwgPSBgJHtCYXNlVVJMfS9sYW5ndWFnZS90cmFuc2xhdGUvdjJgO1xuXHRcdFx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzID0ge1xuXHRcdFx0XHRcdFx0XHQvL1wiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7YXBpPy5Ub2tlbiA/PyBhcGk/LkF1dGh9YCxcblx0XHRcdFx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiRHVhbFN1YnNcIixcblx0XHRcdFx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCJcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRyZXF1ZXN0LmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0XHRcdFwicVwiOiB0ZXh0LFxuXHRcdFx0XHRcdFx0XHRcInNvdXJjZVwiOiBzb3VyY2UsXG5cdFx0XHRcdFx0XHRcdFwidGFyZ2V0XCI6IHRhcmdldCxcblx0XHRcdFx0XHRcdFx0XCJmb3JtYXRcIjogXCJodG1sXCIsXG5cdFx0XHRcdFx0XHRcdC8vXCJrZXlcIjogYXBpPy5LZXlcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0c3dpdGNoIChhcGk/Lk1vZGUpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSBcIlRva2VuXCI6XG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7YXBpPy5Ub2tlbiA/PyBhcGk/LkF1dGh9YDtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSBcIktleVwiOlxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdHJlcXVlc3QudXJsICs9IGA/a2V5PSR7YXBpPy5LZXkgPz8gYXBpPy5BdXRofWA7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcInYzXCI6XG5cdFx0XHRcdFx0XHRyZXF1ZXN0LnVybCA9IGAke0Jhc2VVUkx9L3YzL3Byb2plY3RzLyR7YXBpPy5JRH1gO1xuXHRcdFx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzID0ge1xuXHRcdFx0XHRcdFx0XHRcIkF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke2FwaT8uVG9rZW4gPz8gYXBpPy5BdXRofWAsXG5cdFx0XHRcdFx0XHRcdFwieC1nb29nLXVzZXItcHJvamVjdFwiOiBhcGk/LklELFxuXHRcdFx0XHRcdFx0XHRcIlVzZXItQWdlbnRcIjogXCJEdWFsU3Vic1wiLFxuXHRcdFx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0XHRcdFx0XCJzb3VyY2VMYW5ndWFnZUNvZGVcIjogc291cmNlLFxuXHRcdFx0XHRcdFx0XHRcInRhcmdldExhbmd1YWdlQ29kZVwiOiB0YXJnZXQsXG5cdFx0XHRcdFx0XHRcdFwiY29udGVudHNcIjogKEFycmF5LmlzQXJyYXkodGV4dCkpID8gdGV4dCA6IFt0ZXh0XSxcblx0XHRcdFx0XHRcdFx0XCJtaW1lVHlwZVwiOiBcInRleHQvaHRtbFwiXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIkJpbmdcIjpcblx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL0FuaW1lbm9zZWthaS90cmFuc2xhdGUvYmxvYi9tYWluL3RyYW5zbGF0ZXB5L3RyYW5zbGF0b3JzL2JpbmcucHlcblx0XHRcdFx0c3dpdGNoIChhcGk/LlZlcnNpb24pIHtcblx0XHRcdFx0XHRjYXNlIFwiQmluZ1wiOlxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRCYXNlVVJMID0gXCJodHRwczovL3d3dy5iaW5nLmNvbS90dHJhbnNsYXRldjM/SUc9ODM5RDI3RjgyNzdGNEFBM0IwRURCODNDMjU1RDBENzAmSUlEPXRyYW5zbGF0b3IuNTAzMy4zXCI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiQmluZ0NOXCI6XG5cdFx0XHRcdFx0XHRCYXNlVVJMID0gXCJodHRwczovL2NuLmJpbmcuY29tL3R0cmFuc2xhdGV2Mz9JRz0yNUZFRTdBN0M3QzE0NTMzQkJGRDY2QUM1MTI1QzQ5RSZJSUQ9dHJhbnNsYXRvci41MDI1LjFcIjtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXF1ZXN0LnVybCA9IGAke0Jhc2VVUkx9YDtcblx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzID0ge1xuXHRcdFx0XHRcdFwiQWNjZXB0XCI6IFwiKi8qXCIsXG5cdFx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFVBUG9vbFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBVQVBvb2wubGVuZ3RoKV0sIC8vIOmaj+aculVBXG5cdFx0XHRcdFx0XCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcblx0XHRcdFx0XHRcIlJlZmVyXCI6IFwiaHR0cHM6Ly93d3cuYmluZy5jb20vXCIsXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0XHRcImZyb21MYW5nXCI6IFwiYXV0by1kZXRlY3RcIixcblx0XHRcdFx0XHQvL1widGV4dFwiOiAnJXMnICUgdHJhbnMsXG5cdFx0XHRcdFx0XCJ0ZXh0XCI6IHRleHQsXG5cdFx0XHRcdFx0Ly9cImZyb21cIjogc291cmNlLFxuXHRcdFx0XHRcdFwidG9cIjogdGFyZ2V0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJNaWNyb3NvZnRcIjpcblx0XHRcdGNhc2UgXCJBenVyZVwiOlxuXHRcdFx0XHQvLyBodHRwczovL2RvY3MubWljcm9zb2Z0LmNvbS96aC1jbi9henVyZS9jb2duaXRpdmUtc2VydmljZXMvdHJhbnNsYXRvci9cblx0XHRcdFx0Ly8gaHR0cHM6Ly9kb2NzLmF6dXJlLmNuL3poLWNuL2NvZ25pdGl2ZS1zZXJ2aWNlcy90cmFuc2xhdG9yL1xuXHRcdFx0XHRzd2l0Y2ggKGFwaT8uVmVyc2lvbikge1xuXHRcdFx0XHRcdGNhc2UgXCJBenVyZVwiOlxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRCYXNlVVJMID0gXCJodHRwczovL2FwaS5jb2duaXRpdmUubWljcm9zb2Z0dHJhbnNsYXRvci5jb21cIjtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJBenVyZUNOXCI6XG5cdFx0XHRcdFx0XHRCYXNlVVJMID0gXCJodHRwczovL2FwaS50cmFuc2xhdG9yLmF6dXJlLmNuXCI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiQXp1cmVVU1wiOlxuXHRcdFx0XHRcdFx0QmFzZVVSTCA9IFwiaHR0cHM6Ly9hcGkuY29nbml0aXZlLm1pY3Jvc29mdHRyYW5zbGF0b3IudXNcIjtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXF1ZXN0LnVybCA9IGAke0Jhc2VVUkx9L3RyYW5zbGF0ZT9hcGktdmVyc2lvbj0zLjAmdGV4dFR5cGU9aHRtbCYkeyhzb3VyY2UpID8gYGZyb209JHtzb3VyY2V9YCA6IFwiXCJ9JnRvPSR7dGFyZ2V0fWA7XG5cdFx0XHRcdHJlcXVlc3QuaGVhZGVycyA9IHtcblx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIixcblx0XHRcdFx0XHRcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdCwgKi8qOyBxPTAuMDFcIixcblx0XHRcdFx0XHRcIkFjY2VwdC1MYW5ndWFnZVwiOiBcInpoLWhhbnNcIlxuXHRcdFx0XHRcdC8vXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHthcGk/LkF1dGh9YCxcblx0XHRcdFx0XHQvL1wiT2NwLUFwaW0tU3Vic2NyaXB0aW9uLUtleVwiOiBhcGk/LkF1dGgsXG5cdFx0XHRcdFx0Ly9cIk9jcC1BcGltLVN1YnNjcmlwdGlvbi1SZWdpb25cIjogYXBpPy5SZWdpb24sIC8vIGNoaW5hbm9ydGgsIGNoaW5hZWFzdDJcblx0XHRcdFx0XHQvL1wiWC1DbGllbnRUcmFjZUlkXCI6IHV1aWR2NCgpLnRvU3RyaW5nKClcblx0XHRcdFx0fTtcblx0XHRcdFx0c3dpdGNoIChhcGk/Lk1vZGUpIHtcblx0XHRcdFx0XHRjYXNlIFwiVG9rZW5cIjpcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7YXBpPy5Ub2tlbiA/PyBhcGk/LkF1dGh9YDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJLZXlcIjpcblx0XHRcdFx0XHRcdHJlcXVlc3QuaGVhZGVyc1tcIk9jcC1BcGltLVN1YnNjcmlwdGlvbi1LZXlcIl0gPSBhcGk/LktleSA/PyBhcGk/LkF1dGg7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0LmhlYWRlcnNbXCJPY3AtQXBpbS1TdWJzY3JpcHRpb24tUmVnaW9uXCJdID0gYXBpPy5SZWdpb247XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fTtcblx0XHRcdFx0dGV4dCA9IChBcnJheS5pc0FycmF5KHRleHQpKSA/IHRleHQgOiBbdGV4dF07XG5cdFx0XHRcdHRleHRzID0gYXdhaXQgUHJvbWlzZS5hbGwodGV4dD8ubWFwKGFzeW5jIGl0ZW0gPT4geyByZXR1cm4geyBcInRleHRcIjogaXRlbSB9IH0pKVxuXHRcdFx0XHRyZXF1ZXN0LmJvZHkgPSBKU09OLnN0cmluZ2lmeSh0ZXh0cyk7XG5cdFx0XHRcdC8qXG5cdFx0XHRcdHJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KFt7XG5cdFx0XHRcdFx0XCJ0ZXh0XCI6IHRleHRcblx0XHRcdFx0fV0pO1xuXHRcdFx0XHQqL1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJEZWVwTFwiOiB7XG5cdFx0XHRcdHN3aXRjaCAoYXBpPy5WZXJzaW9uKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIkZyZWVcIjpcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0QmFzZVVSTCA9IFwiaHR0cHM6Ly9hcGktZnJlZS5kZWVwbC5jb21cIjtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJQcm9cIjpcblx0XHRcdFx0XHRcdEJhc2VVUkwgPSBcImh0dHBzOi8vYXBpLmRlZXBsLmNvbVwiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdHJlcXVlc3QudXJsID0gYCR7QmFzZVVSTH0vdjIvdHJhbnNsYXRlYDtcblx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzID0ge1xuXHRcdFx0XHRcdC8vXCJBY2NlcHRcIjogXCIqLypcIixcblx0XHRcdFx0XHRcIlVzZXItQWdlbnRcIjogXCJEdWFsU3Vic1wiLFxuXHRcdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0XHRcdFwiQXV0aG9yaXphdGlvblwiOiBgRGVlcEwtQXV0aC1LZXkgJHthcGk/LlRva2VuID8/IGFwaT8uQXV0aH1gXG5cdFx0XHRcdH07XG5cdFx0XHRcdC8vY29uc3QgQmFzZUJvZHkgPSBgYXV0aF9rZXk9JHthcGk/LktleSA/PyBhcGk/LkF1dGh9JnNvdXJjZV9sYW5nPSR7c291cmNlfSZ0YXJnZXRfbGFuZz0ke3RhcmdldH0mdGFnX2hhbmRsaW5nPWh0bWxgO1xuXHRcdFx0XHQvL3RleHQgPSAoQXJyYXkuaXNBcnJheSh0ZXh0KSkgPyB0ZXh0IDogW3RleHRdO1xuXHRcdFx0XHQvL3RleHRzID0gYXdhaXQgUHJvbWlzZS5hbGwodGV4dD8ubWFwKGFzeW5jIGl0ZW0gPT4gYCZ0ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KGl0ZW0pfWApKVxuXHRcdFx0XHQvL3JlcXVlc3QuYm9keSA9IEJhc2VCb2R5ICsgdGV4dHMuam9pbihcIlwiKTtcblx0XHRcdFx0bGV0IGJvZHkgPSB7XG5cdFx0XHRcdFx0XCJ0ZXh0XCI6IChBcnJheS5pc0FycmF5KHRleHQpKSA/IHRleHQgOiBbdGV4dF0sXG5cdFx0XHRcdFx0Ly9cInNvdXJjZV9sYW5nXCI6IHNvdXJjZSxcblx0XHRcdFx0XHRcInRhcmdldF9sYW5nXCI6IHRhcmdldCxcblx0XHRcdFx0XHRcInRhZ19oYW5kbGluZ1wiOiBcImh0bWxcIlxuXHRcdFx0XHR9O1xuXHRcdFx0XHRpZiAoc291cmNlKSBib2R5LnNvdXJjZV9sYW5nID0gc291cmNlO1xuXHRcdFx0XHRyZXF1ZXN0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwiRGVlcExYXCI6IHtcblx0XHRcdFx0QmFzZVVSTCA9IGFwaT8uRW5kcG9pbnQ7XG5cdFx0XHRcdHJlcXVlc3QudXJsID0gQmFzZVVSTDtcblx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzID0ge1xuXHRcdFx0XHRcdFwiQWNjZXB0XCI6IFwiKi8qXCIsXG5cdFx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiRHVhbFN1YnNcIixcblx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdFx0XHR9O1xuXHRcdFx0XHRpZiAoYXBpPy5Ub2tlbikgcmVxdWVzdC5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7YXBpPy5Ub2tlbiA/PyBhcGk/LkF1dGh9YDtcblx0XHRcdFx0cmVxdWVzdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRcdFwidGV4dFwiOiAoQXJyYXkuaXNBcnJheSh0ZXh0KSkgPyB0ZXh0LmpvaW4oXCJ8fFwiKSA6IHRleHQsXG5cdFx0XHRcdFx0XCJzb3VyY2VfbGFuZ1wiOiBzb3VyY2UsXG5cdFx0XHRcdFx0XCJ0YXJnZXRfbGFuZ1wiOiB0YXJnZXQsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJCYWlkdUZhbnlpXCI6XG5cdFx0XHRcdC8vIGh0dHBzOi8vZmFueWktYXBpLmJhaWR1LmNvbS9kb2MvMjRcblx0XHRcdFx0QmFzZVVSTCA9IFwiaHR0cHM6Ly9mYW55aS1hcGkuYmFpZHUuY29tXCI7XG5cdFx0XHRcdHJlcXVlc3QudXJsID0gYCR7QmFzZVVSTH0vYXBpL3RyYW5zL3ZpcC9sYW5ndWFnZWA7XG5cdFx0XHRcdHJlcXVlc3QuaGVhZGVycyA9IHtcblx0XHRcdFx0XHRcIlVzZXItQWdlbnRcIjogXCJEdWFsU3Vic1wiLFxuXHRcdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcblx0XHRcdFx0fTtcblx0XHRcdFx0cmVxdWVzdC5ib2R5ID0ge1xuXHRcdFx0XHRcdFwicVwiOiB0ZXh0LFxuXHRcdFx0XHRcdFwiZnJvbVwiOiBzb3VyY2UsXG5cdFx0XHRcdFx0XCJ0b1wiOiB0YXJnZXQsXG5cdFx0XHRcdFx0XCJhcHBpZFwiOiBhcGk/LktleSxcblx0XHRcdFx0XHRcInNhbHRcIjogdXVpZHY0KCkudG9TdHJpbmcoKSxcblx0XHRcdFx0XHRcInNpZ25cIjogXCJcIixcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiWW91ZGFvQUlcIjpcblx0XHRcdFx0Ly8gaHR0cHM6Ly9haS55b3VkYW8uY29tL0RPQ1NJUk1BL2h0bWwv6Ieq54S26K+t6KiA57+76K+RL0FQSeaWh+ahoy/mlofmnKznv7vor5HmnI3liqEv5paH5pys57+76K+R5pyN5YqhLUFQSeaWh+ahoy5odG1sXG5cdFx0XHRcdEJhc2VVUkwgPSBcImh0dHBzOi8vb3BlbmFwaS55b3VkYW8uY29tXCI7XG5cdFx0XHRcdHJlcXVlc3QudXJsID0gYCR7QmFzZVVSTH0vYXBpYDtcblx0XHRcdFx0cmVxdWVzdC5oZWFkZXJzID0ge1xuXHRcdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBcIkR1YWxTdWJzXCIsXG5cdFx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCJcblx0XHRcdFx0fTtcblx0XHRcdFx0cmVxdWVzdC5ib2R5ID0ge1xuXHRcdFx0XHRcdFwicVwiOiB0ZXh0LFxuXHRcdFx0XHRcdFwiZnJvbVwiOiBzb3VyY2UsXG5cdFx0XHRcdFx0XCJ0b1wiOiB0YXJnZXQsXG5cdFx0XHRcdFx0XCJhcHBLZXlcIjogYXBpPy5LZXksXG5cdFx0XHRcdFx0XCJzYWx0XCI6IHV1aWR2NCgpLnRvU3RyaW5nKCksXG5cdFx0XHRcdFx0XCJzaWduVHlwZVwiOiBcInYzXCIsXG5cdFx0XHRcdFx0XCJzaWduXCI6IFwiXCIsXG5cdFx0XHRcdFx0XCJjdXJ0aW1lXCI6IE1hdGguZmxvb3IoK25ldyBEYXRlKCkgLyAxMDAwKVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0JC5sb2coYOKchSAkeyQubmFtZX0sIEdldCBUcmFuc2xhdGUgUmVxdWVzdGAsIGByZXF1ZXN0OiAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3QpfWAsIFwiXCIpO1xuXHRcdHJldHVybiByZXF1ZXN0XG5cdH07XG5cdC8vIEdldCBUcmFuc2xhdGUgRGF0YVxuXHRhc3luYyBmdW5jdGlvbiBHZXREYXRhKHZlbmRvciwgcmVxdWVzdCkge1xuXHRcdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBHZXQgVHJhbnNsYXRlIERhdGFgLCBcIlwiKTtcblx0XHRsZXQgdGV4dHMgPSBbXTtcblx0XHRhd2FpdCBGZXRjaChyZXF1ZXN0KVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5KSlcblx0XHRcdC50aGVuKF9kYXRhID0+IHtcblx0XHRcdFx0c3dpdGNoICh2ZW5kb3IpIHtcblx0XHRcdFx0XHRjYXNlIFwiR29vZ2xlXCI6XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KF9kYXRhKSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShfZGF0YT8uWzBdKSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfZGF0YS5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdF9kYXRhWzBdLnBvcCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGV4dHMgPSBfZGF0YVswXTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgdGV4dHMgPSBfZGF0YT8uWzBdPy5tYXAoaXRlbSA9PiBpdGVtPy5bMF0gPz8gYOe/u+ivkeWksei0pSwgdmVuZG9yOiAke3ZlbmRvcn1gKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHRleHRzID0gX2RhdGE7XG5cdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdGlmIChfZGF0YS5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShfZGF0YT8uWzBdKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0X2RhdGFbMF0ucG9wKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR0ZXh0cyA9IF9kYXRhWzBdO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB0ZXh0cyA9IF9kYXRhO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoX2RhdGE/LlswXSkpIHRleHRzID0gX2RhdGE/LlswXT8ubWFwKGl0ZW0gPT4gaXRlbT8uWzBdID8/IGDnv7vor5HlpLHotKUsIHZlbmRvcjogJHt2ZW5kb3J9YCk7XG5cdFx0XHRcdFx0XHRcdGVsc2UgdGV4dHMgPSBfZGF0YTtcblx0XHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoX2RhdGE/LnNlbnRlbmNlcykgdGV4dHMgPSBfZGF0YT8uc2VudGVuY2VzPy5tYXAoaXRlbSA9PiBpdGVtPy50cmFucyA/PyBg57+76K+R5aSx6LSlLCB2ZW5kb3I6ICR7dmVuZG9yfWApO1xuXHRcdFx0XHRcdFx0dGV4dHMgPSB0ZXh0cz8uam9pbihcIlwiKT8uc3BsaXQoL1xcci8pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIkdvb2dsZUNsb3VkXCI6XG5cdFx0XHRcdFx0XHR0ZXh0cyA9IF9kYXRhPy5kYXRhPy50cmFuc2xhdGlvbnM/Lm1hcChpdGVtID0+IGl0ZW0/LnRyYW5zbGF0ZWRUZXh0ID8/IGDnv7vor5HlpLHotKUsIHZlbmRvcjogJHt2ZW5kb3J9YCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiQmluZ1wiOlxuXHRcdFx0XHRcdGNhc2UgXCJNaWNyb3NvZnRcIjpcblx0XHRcdFx0XHRjYXNlIFwiQXp1cmVcIjpcblx0XHRcdFx0XHRcdHRleHRzID0gX2RhdGE/Lm1hcChpdGVtID0+IGl0ZW0/LnRyYW5zbGF0aW9ucz8uWzBdPy50ZXh0ID8/IGDnv7vor5HlpLHotKUsIHZlbmRvcjogJHt2ZW5kb3J9YCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiRGVlcExcIjpcblx0XHRcdFx0XHRcdHRleHRzID0gX2RhdGE/LnRyYW5zbGF0aW9ucz8ubWFwKGl0ZW0gPT4gaXRlbT8udGV4dCA/PyBg57+76K+R5aSx6LSlLCB2ZW5kb3I6ICR7dmVuZG9yfWApO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIkRlZXBMWFwiOlxuXHRcdFx0XHRcdFx0dGV4dHMgPSBfZGF0YT8uZGF0YT8uc3BsaXQoXCJ8fFwiKSA/PyBfZGF0YT8uZGF0YTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJCYWlkdUZhbnlpXCI6XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiWW91ZGFvQUlcIjpcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiBQcm9taXNlLnJlamVjdChlcnJvcikpO1xuXHRcdC8vJC5sb2coYOKchSAkeyQubmFtZX0sIEdldCBUcmFuc2xhdGUgRGF0YSwgdGV4dHM6ICR7SlNPTi5zdHJpbmdpZnkodGV4dHMpfWAsIFwiXCIpO1xuXHRcdCQubG9nKGDinIUgJHskLm5hbWV9LCBHZXQgVHJhbnNsYXRlIERhdGFgLCBcIlwiKTtcblx0XHRyZXR1cm4gdGV4dHNcblx0fTtcbn07XG5cbi8qKlxuICogRmV0Y2ggUnVsZWQgUmVxZXVzdFxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0JpbGlVbml2ZXJzZS9HbG9iYWwvYmxvYi9tYWluL2pzL0JpbGlCaWxpLkdsb2JhbC5yZXF1ZXN0LmpzXG4gKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdCAtIE9yaWdpbmFsIFJlcXVlc3QgQ29udGVudFxuICogQHJldHVybiB7UHJvbWlzZTwqPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gRmV0Y2gocmVxdWVzdCA9IHt9KSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBGZXRjaCBSdWxlZCBSZXFldXN0YCwgXCJcIik7XG5cdC8vY29uc3QgRk9STUFUID0gKHJlcXVlc3Q/LmhlYWRlcnM/LltcIkNvbnRlbnQtVHlwZVwiXSA/PyByZXF1ZXN0Py5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pPy5zcGxpdChcIjtcIik/LlswXTtcblx0JC5sb2coYOKaoCAkeyQubmFtZX0sIEZldGNoIFJ1bGVkIFJlcWV1c3RgLCBgRk9STUFUOiAke0ZPUk1BVH1gLCBcIlwiKTtcblx0aWYgKCQuaXNRdWFuWCgpKSB7XG5cdFx0c3dpdGNoIChGT1JNQVQpIHtcblx0XHRcdGNhc2UgdW5kZWZpbmVkOiAvLyDop4bkuLrml6Bib2R5XG5cdFx0XHRcdC8vIOi/lOWbnuaZrumAmuaVsOaNrlxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIOi/lOWbnuaZrumAmuaVsOaNrlxuXHRcdFx0XHRkZWxldGUgcmVxdWVzdC5ib2R5Qnl0ZXM7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3Byb3RvYnVmXCI6XG5cdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wcm90b2J1ZlwiOlxuXHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUucHJvdG9idWZcIjpcblx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjXCI6XG5cdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwYytwcm90b1wiOlxuXHRcdFx0Ly9jYXNlIFwiYXBwbGVjYXRpb24vb2N0ZXQtc3RyZWFtXCI6XG5cdFx0XHRcdC8vIOi/lOWbnuS6jOi/m+WItuaVsOaNrlxuXHRcdFx0XHRkZWxldGUgcmVxdWVzdC5ib2R5O1xuXHRcdFx0XHRpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHJlcXVlc3QuYm9keUJ5dGVzKSkgcmVxdWVzdC5ib2R5Qnl0ZXMgPSByZXF1ZXN0LmJvZHlCeXRlcy5idWZmZXIuc2xpY2UocmVxdWVzdC5ib2R5Qnl0ZXMuYnl0ZU9mZnNldCwgcmVxdWVzdC5ib2R5Qnl0ZXMuYnl0ZUxlbmd0aCArIHJlcXVlc3QuYm9keUJ5dGVzLmJ5dGVPZmZzZXQpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHR9O1xuXHRsZXQgcmVzcG9uc2UgPSAocmVxdWVzdD8uYm9keSA/PyByZXF1ZXN0Py5ib2R5Qnl0ZXMpXG5cdFx0PyBhd2FpdCAkLmh0dHAucG9zdChyZXF1ZXN0KVxuXHRcdDogYXdhaXQgJC5odHRwLmdldChyZXF1ZXN0KTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIEZldGNoIFJ1bGVkIFJlcWV1c3RgLCBcIlwiKTtcblx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCBGZXRjaCBSdWxlZCBSZXFldXN0YCwgYFJlc3BvbnNlOiR7SlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpfWAsIFwiXCIpO1xuXHRyZXR1cm4gcmVzcG9uc2U7XG59O1xuXG4vKipcbiAqIGNvbWJpbmUgdHdvIHRleHRcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcmlnaW5UZXh0IC0gb3JpZ2luYWwgdGV4dFxuICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zVGV4dCAtIHRyYW5zbGF0ZSB0ZXh0XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFNob3dPbmx5IC0gb25seSBzaG93IHRyYW5zbGF0ZSB0ZXh0XG4gKiBAcGFyYW0ge1N0cmluZ30gcG9zaXRpb24gLSBwb3NpdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVCcmVhayAtIGxpbmUgYnJlYWtcbiAqIEByZXR1cm4ge1N0cmluZ30gY29tYmluZWQgdGV4dFxuICovXG5mdW5jdGlvbiBjb21iaW5lVGV4dChvcmlnaW5UZXh0LCB0cmFuc1RleHQsIFNob3dPbmx5ID0gZmFsc2UsIHBvc2l0aW9uID0gXCJGb3J3YXJkXCIsIGxpbmVCcmVhayA9IFwiXFxuXCIpIHtcblx0bGV0IHRleHQgPSBcIlwiO1xuXHRzd2l0Y2ggKFNob3dPbmx5KSB7XG5cdFx0Y2FzZSB0cnVlOlxuXHRcdFx0dGV4dCA9IHRyYW5zVGV4dDtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgZmFsc2U6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHN3aXRjaCAocG9zaXRpb24pIHtcblx0XHRcdFx0Y2FzZSBcIkZvcndhcmRcIjpcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR0ZXh0ID0gYCR7b3JpZ2luVGV4dH0ke2xpbmVCcmVha30ke3RyYW5zVGV4dH1gO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiUmV2ZXJzZVwiOlxuXHRcdFx0XHRcdHRleHQgPSBgJHt0cmFuc1RleHR9JHtsaW5lQnJlYWt9JHtvcmlnaW5UZXh0fWA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdH1cblx0cmV0dXJuIHRleHQ7XG59O1xuXG4vKiogXG4gKiBDaHVuayBBcnJheVxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIC0gc291cmNlXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIC0gbnVtYmVyXG4gKiBAcmV0dXJuIHtBcnJheTwqPn0gdGFyZ2V0XG4gKi9cbmZ1bmN0aW9uIGNodW5rKHNvdXJjZSwgbGVuZ3RoKSB7XG5cdCQubG9nKGDimqAgJHskLm5hbWV9LCBDaHVuayBBcnJheWAsIFwiXCIpO1xuICAgIHZhciBpbmRleCA9IDAsIHRhcmdldCA9IFtdO1xuICAgIHdoaWxlKGluZGV4IDwgc291cmNlLmxlbmd0aCkgdGFyZ2V0LnB1c2goc291cmNlLnNsaWNlKGluZGV4LCBpbmRleCArPSBsZW5ndGgpKTtcblx0Ly8kLmxvZyhg8J+OiSAkeyQubmFtZX0sIENodW5rIEFycmF5YCwgYHRhcmdldDogJHtKU09OLnN0cmluZ2lmeSh0YXJnZXQpfWAsIFwiXCIpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqXG4gKiBSZXRyaWVzIHRoZSBnaXZlbiBmdW5jdGlvbiB1bnRpbCBpdCBzdWNjZWVkcyBnaXZlbiBhIG51bWJlciBvZiByZXRyaWVzIGFuZCBhbiBpbnRlcnZhbCBiZXR3ZWVuIHRoZW0uIFRoZXkgYXJlIHNldFxuICogYnkgZGVmYXVsdCB0byByZXRyeSA1IHRpbWVzIHdpdGggMXNlYyBpbiBiZXR3ZWVuLiBUaGVyZSdzIGFsc28gYSBmbGFnIHRvIG1ha2UgdGhlIGNvb2xkb3duIHRpbWUgZXhwb25lbnRpYWxcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0bGFiLmNvbS8tL3NuaXBwZXRzLzE3NzU3ODFcbiAqIEBhdXRob3IgRGFuaWVsIEnDsWlnbyA8ZGFuaWVsaW5pZ29iYW5vc0BnbWFpbC5jb20+XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFJldHVybnMgYSBwcm9taXNlXG4gKiBAcGFyYW0ge051bWJlcn0gcmV0cmllc0xlZnQgLSBOdW1iZXIgb2YgcmV0cmllcy4gSWYgLTEgd2lsbCBrZWVwIHJldHJ5aW5nXG4gKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgLSBNaWxsaXMgYmV0d2VlbiByZXRyaWVzLiBJZiBleHBvbmVudGlhbCBzZXQgdG8gdHJ1ZSB3aWxsIGJlIGRvdWJsZWQgZWFjaCByZXRyeVxuICogQHBhcmFtIHtCb29sZWFufSBleHBvbmVudGlhbCAtIEZsYWcgZm9yIGV4cG9uZW50aWFsIGJhY2stb2ZmIG1vZGVcbiAqIEByZXR1cm4ge1Byb21pc2U8Kj59XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHJldHJ5KGZuLCByZXRyaWVzTGVmdCA9IDUsIGludGVydmFsID0gMTAwMCwgZXhwb25lbnRpYWwgPSBmYWxzZSkge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfSwgcmV0cnksIOWJqeS9memHjeivleasoeaVsDoke3JldHJpZXNMZWZ0fWAsIGDml7bpl7Tpl7TpmpQ6JHtpbnRlcnZhbH1tc2ApO1xuXHR0cnkge1xuXHRcdGNvbnN0IHZhbCA9IGF3YWl0IGZuKCk7XG5cdFx0cmV0dXJuIHZhbDtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAocmV0cmllc0xlZnQpIHtcblx0XHRcdGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCBpbnRlcnZhbCkpO1xuXHRcdFx0cmV0dXJuIHJldHJ5KGZuLCByZXRyaWVzTGVmdCAtIDEsIGV4cG9uZW50aWFsID8gaW50ZXJ2YWwgKiAyIDogaW50ZXJ2YWwsIGV4cG9uZW50aWFsKTtcblx0XHR9IGVsc2UgdGhyb3cgbmV3IEVycm9yKGDinYwgJHskLm5hbWV9LCByZXRyeSwg5pyA5aSn6YeN6K+V5qyh5pWwYCk7XG5cdH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFTlYge1xuXHRjb25zdHJ1Y3RvcihuYW1lLCBvcHRzKSB7XG5cdFx0dGhpcy5uYW1lID0gYCR7bmFtZX0sIEVOViB2MS4wLjBgXG5cdFx0dGhpcy5odHRwID0gbmV3IEh0dHAodGhpcylcblx0XHR0aGlzLmRhdGEgPSBudWxsXG5cdFx0dGhpcy5kYXRhRmlsZSA9ICdib3guZGF0J1xuXHRcdHRoaXMubG9ncyA9IFtdXG5cdFx0dGhpcy5pc011dGUgPSBmYWxzZVxuXHRcdHRoaXMuaXNOZWVkUmV3cml0ZSA9IGZhbHNlXG5cdFx0dGhpcy5sb2dTZXBhcmF0b3IgPSAnXFxuJ1xuXHRcdHRoaXMuZW5jb2RpbmcgPSAndXRmLTgnXG5cdFx0dGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgb3B0cylcblx0XHR0aGlzLmxvZygnJywgYPCfj4EgJHt0aGlzLm5hbWV9LCDlvIDlp4shYClcblx0fVxuXG5cdHBsYXRmb3JtKCkge1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRlbnZpcm9ubWVudCAmJiAkZW52aXJvbm1lbnRbJ3N1cmdlLXZlcnNpb24nXSlcblx0XHRcdHJldHVybiAnU3VyZ2UnXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJGVudmlyb25tZW50ICYmICRlbnZpcm9ubWVudFsnc3Rhc2gtdmVyc2lvbiddKVxuXHRcdFx0cmV0dXJuICdTdGFzaCdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUgJiYgISFtb2R1bGUuZXhwb3J0cykgcmV0dXJuICdOb2RlLmpzJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICR0YXNrKSByZXR1cm4gJ1F1YW50dW11bHQgWCdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAkbG9vbikgcmV0dXJuICdMb29uJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRyb2NrZXQpIHJldHVybiAnU2hhZG93cm9ja2V0J1xuXHR9XG5cblx0aXNOb2RlKCkge1xuXHRcdHJldHVybiAnTm9kZS5qcycgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNRdWFuWCgpIHtcblx0XHRyZXR1cm4gJ1F1YW50dW11bHQgWCcgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNTdXJnZSgpIHtcblx0XHRyZXR1cm4gJ1N1cmdlJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc0xvb24oKSB7XG5cdFx0cmV0dXJuICdMb29uJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1NoYWRvd3JvY2tldCgpIHtcblx0XHRyZXR1cm4gJ1NoYWRvd3JvY2tldCcgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNTdGFzaCgpIHtcblx0XHRyZXR1cm4gJ1N0YXNoJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHR0b09iaihzdHIsIGRlZmF1bHRWYWx1ZSA9IG51bGwpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2Uoc3RyKVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZVxuXHRcdH1cblx0fVxuXG5cdHRvU3RyKG9iaiwgZGVmYXVsdFZhbHVlID0gbnVsbCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZVxuXHRcdH1cblx0fVxuXG5cdGdldGpzb24oa2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRsZXQganNvbiA9IGRlZmF1bHRWYWx1ZVxuXHRcdGNvbnN0IHZhbCA9IHRoaXMuZ2V0ZGF0YShrZXkpXG5cdFx0aWYgKHZhbCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UodGhpcy5nZXRkYXRhKGtleSkpXG5cdFx0XHR9IGNhdGNoIHsgfVxuXHRcdH1cblx0XHRyZXR1cm4ganNvblxuXHR9XG5cblx0c2V0anNvbih2YWwsIGtleSkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRkYXRhKEpTT04uc3RyaW5naWZ5KHZhbCksIGtleSlcblx0XHR9IGNhdGNoIHtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0fVxuXG5cdGdldFNjcmlwdCh1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdHRoaXMuZ2V0KHsgdXJsIH0sIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHJlc29sdmUoYm9keSkpXG5cdFx0fSlcblx0fVxuXG5cdHJ1blNjcmlwdChzY3JpcHQsIHJ1bk9wdHMpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGxldCBodHRwYXBpID0gdGhpcy5nZXRkYXRhKCdAY2hhdnlfYm94anNfdXNlckNmZ3MuaHR0cGFwaScpXG5cdFx0XHRodHRwYXBpID0gaHR0cGFwaSA/IGh0dHBhcGkucmVwbGFjZSgvXFxuL2csICcnKS50cmltKCkgOiBodHRwYXBpXG5cdFx0XHRsZXQgaHR0cGFwaV90aW1lb3V0ID0gdGhpcy5nZXRkYXRhKFxuXHRcdFx0XHQnQGNoYXZ5X2JveGpzX3VzZXJDZmdzLmh0dHBhcGlfdGltZW91dCdcblx0XHRcdClcblx0XHRcdGh0dHBhcGlfdGltZW91dCA9IGh0dHBhcGlfdGltZW91dCA/IGh0dHBhcGlfdGltZW91dCAqIDEgOiAyMFxuXHRcdFx0aHR0cGFwaV90aW1lb3V0ID1cblx0XHRcdFx0cnVuT3B0cyAmJiBydW5PcHRzLnRpbWVvdXQgPyBydW5PcHRzLnRpbWVvdXQgOiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdGNvbnN0IFtrZXksIGFkZHJdID0gaHR0cGFwaS5zcGxpdCgnQCcpXG5cdFx0XHRjb25zdCBvcHRzID0ge1xuXHRcdFx0XHR1cmw6IGBodHRwOi8vJHthZGRyfS92MS9zY3JpcHRpbmcvZXZhbHVhdGVgLFxuXHRcdFx0XHRib2R5OiB7XG5cdFx0XHRcdFx0c2NyaXB0X3RleHQ6IHNjcmlwdCxcblx0XHRcdFx0XHRtb2NrX3R5cGU6ICdjcm9uJyxcblx0XHRcdFx0XHR0aW1lb3V0OiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdFx0fSxcblx0XHRcdFx0aGVhZGVyczogeyAnWC1LZXknOiBrZXksICdBY2NlcHQnOiAnKi8qJyB9LFxuXHRcdFx0XHR0aW1lb3V0OiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdH1cblx0XHRcdHRoaXMucG9zdChvcHRzLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiByZXNvbHZlKGJvZHkpKVxuXHRcdH0pLmNhdGNoKChlKSA9PiB0aGlzLmxvZ0VycihlKSlcblx0fVxuXG5cdGxvYWRkYXRhKCkge1xuXHRcdGlmICh0aGlzLmlzTm9kZSgpKSB7XG5cdFx0XHR0aGlzLmZzID0gdGhpcy5mcyA/IHRoaXMuZnMgOiByZXF1aXJlKCdmcycpXG5cdFx0XHR0aGlzLnBhdGggPSB0aGlzLnBhdGggPyB0aGlzLnBhdGggOiByZXF1aXJlKCdwYXRoJylcblx0XHRcdGNvbnN0IGN1ckRpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKHRoaXMuZGF0YUZpbGUpXG5cdFx0XHRjb25zdCByb290RGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUoXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdHRoaXMuZGF0YUZpbGVcblx0XHRcdClcblx0XHRcdGNvbnN0IGlzQ3VyRGlyRGF0YUZpbGUgPSB0aGlzLmZzLmV4aXN0c1N5bmMoY3VyRGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QgaXNSb290RGlyRGF0YUZpbGUgPVxuXHRcdFx0XHQhaXNDdXJEaXJEYXRhRmlsZSAmJiB0aGlzLmZzLmV4aXN0c1N5bmMocm9vdERpckRhdGFGaWxlUGF0aClcblx0XHRcdGlmIChpc0N1ckRpckRhdGFGaWxlIHx8IGlzUm9vdERpckRhdGFGaWxlKSB7XG5cdFx0XHRcdGNvbnN0IGRhdFBhdGggPSBpc0N1ckRpckRhdGFGaWxlXG5cdFx0XHRcdFx0PyBjdXJEaXJEYXRhRmlsZVBhdGhcblx0XHRcdFx0XHQ6IHJvb3REaXJEYXRhRmlsZVBhdGhcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmZzLnJlYWRGaWxlU3luYyhkYXRQYXRoKSlcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHJldHVybiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgcmV0dXJuIHt9XG5cdFx0fSBlbHNlIHJldHVybiB7fVxuXHR9XG5cblx0d3JpdGVkYXRhKCkge1xuXHRcdGlmICh0aGlzLmlzTm9kZSgpKSB7XG5cdFx0XHR0aGlzLmZzID0gdGhpcy5mcyA/IHRoaXMuZnMgOiByZXF1aXJlKCdmcycpXG5cdFx0XHR0aGlzLnBhdGggPSB0aGlzLnBhdGggPyB0aGlzLnBhdGggOiByZXF1aXJlKCdwYXRoJylcblx0XHRcdGNvbnN0IGN1ckRpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKHRoaXMuZGF0YUZpbGUpXG5cdFx0XHRjb25zdCByb290RGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUoXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdHRoaXMuZGF0YUZpbGVcblx0XHRcdClcblx0XHRcdGNvbnN0IGlzQ3VyRGlyRGF0YUZpbGUgPSB0aGlzLmZzLmV4aXN0c1N5bmMoY3VyRGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QgaXNSb290RGlyRGF0YUZpbGUgPVxuXHRcdFx0XHQhaXNDdXJEaXJEYXRhRmlsZSAmJiB0aGlzLmZzLmV4aXN0c1N5bmMocm9vdERpckRhdGFGaWxlUGF0aClcblx0XHRcdGNvbnN0IGpzb25kYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuXHRcdFx0aWYgKGlzQ3VyRGlyRGF0YUZpbGUpIHtcblx0XHRcdFx0dGhpcy5mcy53cml0ZUZpbGVTeW5jKGN1ckRpckRhdGFGaWxlUGF0aCwganNvbmRhdGEpXG5cdFx0XHR9IGVsc2UgaWYgKGlzUm9vdERpckRhdGFGaWxlKSB7XG5cdFx0XHRcdHRoaXMuZnMud3JpdGVGaWxlU3luYyhyb290RGlyRGF0YUZpbGVQYXRoLCBqc29uZGF0YSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZnMud3JpdGVGaWxlU3luYyhjdXJEaXJEYXRhRmlsZVBhdGgsIGpzb25kYXRhKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvZGFzaF9nZXQoc291cmNlLCBwYXRoLCBkZWZhdWx0VmFsdWUgPSB1bmRlZmluZWQpIHtcblx0XHRjb25zdCBwYXRocyA9IHBhdGgucmVwbGFjZSgvXFxbKFxcZCspXFxdL2csICcuJDEnKS5zcGxpdCgnLicpXG5cdFx0bGV0IHJlc3VsdCA9IHNvdXJjZVxuXHRcdGZvciAoY29uc3QgcCBvZiBwYXRocykge1xuXHRcdFx0cmVzdWx0ID0gT2JqZWN0KHJlc3VsdClbcF1cblx0XHRcdGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXG5cdGxvZGFzaF9zZXQob2JqLCBwYXRoLCB2YWx1ZSkge1xuXHRcdGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSByZXR1cm4gb2JqXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKSBwYXRoID0gcGF0aC50b1N0cmluZygpLm1hdGNoKC9bXi5bXFxdXSsvZykgfHwgW11cblx0XHRwYXRoXG5cdFx0XHQuc2xpY2UoMCwgLTEpXG5cdFx0XHQucmVkdWNlKFxuXHRcdFx0XHQoYSwgYywgaSkgPT5cblx0XHRcdFx0XHRPYmplY3QoYVtjXSkgPT09IGFbY11cblx0XHRcdFx0XHRcdD8gYVtjXVxuXHRcdFx0XHRcdFx0OiAoYVtjXSA9IE1hdGguYWJzKHBhdGhbaSArIDFdKSA+PiAwID09PSArcGF0aFtpICsgMV0gPyBbXSA6IHt9KSxcblx0XHRcdFx0b2JqXG5cdFx0XHQpW3BhdGhbcGF0aC5sZW5ndGggLSAxXV0gPSB2YWx1ZVxuXHRcdHJldHVybiBvYmpcblx0fVxuXG5cdGdldGRhdGEoa2V5KSB7XG5cdFx0bGV0IHZhbCA9IHRoaXMuZ2V0dmFsKGtleSlcblx0XHQvLyDlpoLmnpzku6UgQFxuXHRcdGlmICgvXkAvLnRlc3Qoa2V5KSkge1xuXHRcdFx0Y29uc3QgWywgb2Jqa2V5LCBwYXRoc10gPSAvXkAoLio/KVxcLiguKj8pJC8uZXhlYyhrZXkpXG5cdFx0XHRjb25zdCBvYmp2YWwgPSBvYmprZXkgPyB0aGlzLmdldHZhbChvYmprZXkpIDogJydcblx0XHRcdGlmIChvYmp2YWwpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRjb25zdCBvYmplZHZhbCA9IEpTT04ucGFyc2Uob2JqdmFsKVxuXHRcdFx0XHRcdHZhbCA9IG9iamVkdmFsID8gdGhpcy5sb2Rhc2hfZ2V0KG9iamVkdmFsLCBwYXRocywgJycpIDogdmFsXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHR2YWwgPSAnJ1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB2YWxcblx0fVxuXG5cdHNldGRhdGEodmFsLCBrZXkpIHtcblx0XHRsZXQgaXNzdWMgPSBmYWxzZVxuXHRcdGlmICgvXkAvLnRlc3Qoa2V5KSkge1xuXHRcdFx0Y29uc3QgWywgb2Jqa2V5LCBwYXRoc10gPSAvXkAoLio/KVxcLiguKj8pJC8uZXhlYyhrZXkpXG5cdFx0XHRjb25zdCBvYmpkYXQgPSB0aGlzLmdldHZhbChvYmprZXkpXG5cdFx0XHRjb25zdCBvYmp2YWwgPSBvYmprZXlcblx0XHRcdFx0PyBvYmpkYXQgPT09ICdudWxsJ1xuXHRcdFx0XHRcdD8gbnVsbFxuXHRcdFx0XHRcdDogb2JqZGF0IHx8ICd7fSdcblx0XHRcdFx0OiAne30nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBvYmplZHZhbCA9IEpTT04ucGFyc2Uob2JqdmFsKVxuXHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQob2JqZWR2YWwsIHBhdGhzLCB2YWwpXG5cdFx0XHRcdGlzc3VjID0gdGhpcy5zZXR2YWwoSlNPTi5zdHJpbmdpZnkob2JqZWR2YWwpLCBvYmprZXkpXG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnN0IG9iamVkdmFsID0ge31cblx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KG9iamVkdmFsLCBwYXRocywgdmFsKVxuXHRcdFx0XHRpc3N1YyA9IHRoaXMuc2V0dmFsKEpTT04uc3RyaW5naWZ5KG9iamVkdmFsKSwgb2Jqa2V5KVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpc3N1YyA9IHRoaXMuc2V0dmFsKHZhbCwga2V5KVxuXHRcdH1cblx0XHRyZXR1cm4gaXNzdWNcblx0fVxuXG5cdGdldHZhbChrZXkpIHtcblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRyZXR1cm4gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKGtleSlcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdHJldHVybiAkcHJlZnMudmFsdWVGb3JLZXkoa2V5KVxuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMubG9hZGRhdGEoKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kYXRhW2tleV1cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YVtrZXldKSB8fCBudWxsXG5cdFx0fVxuXHR9XG5cblx0c2V0dmFsKHZhbCwga2V5KSB7XG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0cmV0dXJuICRwZXJzaXN0ZW50U3RvcmUud3JpdGUodmFsLCBrZXkpXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRyZXR1cm4gJHByZWZzLnNldFZhbHVlRm9yS2V5KHZhbCwga2V5KVxuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMubG9hZGRhdGEoKVxuXHRcdFx0XHR0aGlzLmRhdGFba2V5XSA9IHZhbFxuXHRcdFx0XHR0aGlzLndyaXRlZGF0YSgpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGFba2V5XSkgfHwgbnVsbFxuXHRcdH1cblx0fVxuXG5cdGluaXRHb3RFbnYob3B0cykge1xuXHRcdHRoaXMuZ290ID0gdGhpcy5nb3QgPyB0aGlzLmdvdCA6IHJlcXVpcmUoJ2dvdCcpXG5cdFx0dGhpcy5ja3RvdWdoID0gdGhpcy5ja3RvdWdoID8gdGhpcy5ja3RvdWdoIDogcmVxdWlyZSgndG91Z2gtY29va2llJylcblx0XHR0aGlzLmNramFyID0gdGhpcy5ja2phciA/IHRoaXMuY2tqYXIgOiBuZXcgdGhpcy5ja3RvdWdoLkNvb2tpZUphcigpXG5cdFx0aWYgKG9wdHMpIHtcblx0XHRcdG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyA/IG9wdHMuaGVhZGVycyA6IHt9XG5cdFx0XHRpZiAodW5kZWZpbmVkID09PSBvcHRzLmhlYWRlcnMuQ29va2llICYmIHVuZGVmaW5lZCA9PT0gb3B0cy5jb29raWVKYXIpIHtcblx0XHRcdFx0b3B0cy5jb29raWVKYXIgPSB0aGlzLmNramFyXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KHJlcXVlc3QsIGNhbGxiYWNrID0gKCkgPT4geyB9KSB7XG5cdFx0ZGVsZXRlIHJlcXVlc3Q/LmhlYWRlcnM/LlsnQ29udGVudC1MZW5ndGgnXVxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ2NvbnRlbnQtbGVuZ3RoJ11cblxuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZiAodGhpcy5pc1N1cmdlKCkgJiYgdGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdoZWFkZXJzLlgtU3VyZ2UtU2tpcC1TY3JpcHRpbmcnLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0XHQkaHR0cENsaWVudC5nZXQocmVxdWVzdCwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXHRcdFx0XHRcdGlmICghZXJyb3IgJiYgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlLmJvZHkgPSBib2R5XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UsIGJvZHkpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRpZiAodGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdvcHRzLmhpbnRzJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JHRhc2suZmV0Y2gocmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCBib2R5LCBib2R5Qnl0ZXMgfSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZXJyb3IpID0+IGNhbGxiYWNrKChlcnJvciAmJiBlcnJvci5lcnJvcikgfHwgJ1VuZGVmaW5lZEVycm9yJylcblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdGxldCBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKVxuXHRcdFx0XHR0aGlzLmluaXRHb3RFbnYocmVxdWVzdClcblx0XHRcdFx0dGhpcy5nb3QocmVxdWVzdClcblx0XHRcdFx0XHQub24oJ3JlZGlyZWN0JywgKHJlc3BvbnNlLCBuZXh0T3B0cykgPT4ge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNrID0gcmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddXG5cdFx0XHRcdFx0XHRcdFx0XHQubWFwKHRoaXMuY2t0b3VnaC5Db29raWUucGFyc2UpXG5cdFx0XHRcdFx0XHRcdFx0XHQudG9TdHJpbmcoKVxuXHRcdFx0XHRcdFx0XHRcdGlmIChjaykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5ja2phci5zZXRDb29raWVTeW5jKGNrLCBudWxsKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRuZXh0T3B0cy5jb29raWVKYXIgPSB0aGlzLmNramFyXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5sb2dFcnIoZSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIHRoaXMuY2tqYXIuc2V0Q29va2llU3luYyhyZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ10ubWFwKENvb2tpZS5wYXJzZSkudG9TdHJpbmcoKSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKFxuXHRcdFx0XHRcdFx0KHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlOiBzdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRcdHJhd0JvZHlcblx0XHRcdFx0XHRcdFx0fSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGJvZHkgPSBpY29udi5kZWNvZGUocmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0XHR7IHN0YXR1cywgc3RhdHVzQ29kZSwgaGVhZGVycywgcmF3Qm9keSwgYm9keSB9LFxuXHRcdFx0XHRcdFx0XHRcdGJvZHlcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdChlcnIpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgeyBtZXNzYWdlOiBlcnJvciwgcmVzcG9uc2U6IHJlc3BvbnNlIH0gPSBlcnJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UsXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgJiYgaWNvbnYuZGVjb2RlKHJlc3BvbnNlLnJhd0JvZHksIHRoaXMuZW5jb2RpbmcpXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0cG9zdChyZXF1ZXN0LCBjYWxsYmFjayA9ICgpID0+IHsgfSkge1xuXHRcdGNvbnN0IG1ldGhvZCA9IHJlcXVlc3QubWV0aG9kXG5cdFx0XHQ/IHJlcXVlc3QubWV0aG9kLnRvTG9jYWxlTG93ZXJDYXNlKClcblx0XHRcdDogJ3Bvc3QnXG5cblx0XHQvLyDlpoLmnpzmjIflrprkuobor7fmsYLkvZMsIOS9huayoeaMh+WumiBgQ29udGVudC1UeXBlYOOAgWBjb250ZW50LXR5cGVgLCDliJnoh6rliqjnlJ/miJDjgIJcblx0XHRpZiAoXG5cdFx0XHRyZXF1ZXN0LmJvZHkgJiZcblx0XHRcdHJlcXVlc3QuaGVhZGVycyAmJlxuXHRcdFx0IXJlcXVlc3QuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gJiZcblx0XHRcdCFyZXF1ZXN0LmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddXG5cdFx0KSB7XG5cdFx0XHQvLyBIVFRQLzHjgIFIVFRQLzIg6YO95pSv5oyB5bCP5YaZIGhlYWRlcnNcblx0XHRcdHJlcXVlc3QuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuXHRcdH1cblx0XHQvLyDkuLrpgb/lhY3mjIflrprplJnor68gYGNvbnRlbnQtbGVuZ3RoYCDov5nph4zliKDpmaTor6XlsZ7mgKfvvIznlLHlt6Xlhbfnq68gKEh0dHBDbGllbnQpIOi0n+i0o+mHjeaWsOiuoeeul+W5tui1i+WAvFxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ0NvbnRlbnQtTGVuZ3RoJ11cblx0XHRkZWxldGUgcmVxdWVzdD8uaGVhZGVycz8uWydjb250ZW50LWxlbmd0aCddXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmICh0aGlzLmlzU3VyZ2UoKSAmJiB0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ2hlYWRlcnMuWC1TdXJnZS1Ta2lwLVNjcmlwdGluZycsIGZhbHNlKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCRodHRwQ2xpZW50W21ldGhvZF0ocmVxdWVzdCwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXHRcdFx0XHRcdGlmICghZXJyb3IgJiYgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlLmJvZHkgPSBib2R5XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UsIGJvZHkpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRyZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZFxuXHRcdFx0XHRpZiAodGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdvcHRzLmhpbnRzJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JHRhc2suZmV0Y2gocmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCBib2R5LCBib2R5Qnl0ZXMgfSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZXJyb3IpID0+IGNhbGxiYWNrKChlcnJvciAmJiBlcnJvci5lcnJvcikgfHwgJ1VuZGVmaW5lZEVycm9yJylcblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdGxldCBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKVxuXHRcdFx0XHR0aGlzLmluaXRHb3RFbnYocmVxdWVzdClcblx0XHRcdFx0Y29uc3QgeyB1cmwsIC4uLl9yZXF1ZXN0IH0gPSByZXF1ZXN0XG5cdFx0XHRcdHRoaXMuZ290W21ldGhvZF0odXJsLCBfcmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgc3RhdHVzQ29kZTogc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5IH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y29uc3QgYm9keSA9IGljb252LmRlY29kZShyYXdCb2R5LCB0aGlzLmVuY29kaW5nKVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5LCBib2R5IH0sXG5cdFx0XHRcdFx0XHRcdGJvZHlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlcnIpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgbWVzc2FnZTogZXJyb3IsIHJlc3BvbnNlOiByZXNwb25zZSB9ID0gZXJyXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlLFxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSAmJiBpY29udi5kZWNvZGUocmVzcG9uc2UucmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdClcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqIOekuuS+izokLnRpbWUoJ3l5eXktTU0tZGQgcXEgSEg6bW06c3MuUycpXG5cdCAqICAgIDokLnRpbWUoJ3l5eXlNTWRkSEhtbXNzUycpXG5cdCAqICAgIHk65bm0IE065pyIIGQ65pelIHE65a2jIEg65pe2IG065YiGIHM656eSIFM65q+r56eSXG5cdCAqICAgIOWFtuS4rXnlj6/pgIkwLTTkvY3ljaDkvY3nrKbjgIFT5Y+v6YCJMC0x5L2N5Y2g5L2N56ym77yM5YW25L2Z5Y+v6YCJMC0y5L2N5Y2g5L2N56ymXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQg5qC85byP5YyW5Y+C5pWwXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB0cyDlj6/pgIk6IOagueaNruaMh+WumuaXtumXtOaIs+i/lOWbnuagvOW8j+WMluaXpeacn1xuXHQgKlxuXHQgKi9cblx0dGltZShmb3JtYXQsIHRzID0gbnVsbCkge1xuXHRcdGNvbnN0IGRhdGUgPSB0cyA/IG5ldyBEYXRlKHRzKSA6IG5ldyBEYXRlKClcblx0XHRsZXQgbyA9IHtcblx0XHRcdCdNKyc6IGRhdGUuZ2V0TW9udGgoKSArIDEsXG5cdFx0XHQnZCsnOiBkYXRlLmdldERhdGUoKSxcblx0XHRcdCdIKyc6IGRhdGUuZ2V0SG91cnMoKSxcblx0XHRcdCdtKyc6IGRhdGUuZ2V0TWludXRlcygpLFxuXHRcdFx0J3MrJzogZGF0ZS5nZXRTZWNvbmRzKCksXG5cdFx0XHQncSsnOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxuXHRcdFx0J1MnOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG5cdFx0fVxuXHRcdGlmICgvKHkrKS8udGVzdChmb3JtYXQpKVxuXHRcdFx0Zm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXG5cdFx0XHRcdFJlZ0V4cC4kMSxcblx0XHRcdFx0KGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpXG5cdFx0XHQpXG5cdFx0Zm9yIChsZXQgayBpbiBvKVxuXHRcdFx0aWYgKG5ldyBSZWdFeHAoJygnICsgayArICcpJykudGVzdChmb3JtYXQpKVxuXHRcdFx0XHRmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcblx0XHRcdFx0XHRSZWdFeHAuJDEsXG5cdFx0XHRcdFx0UmVnRXhwLiQxLmxlbmd0aCA9PSAxXG5cdFx0XHRcdFx0XHQ/IG9ba11cblx0XHRcdFx0XHRcdDogKCcwMCcgKyBvW2tdKS5zdWJzdHIoKCcnICsgb1trXSkubGVuZ3RoKVxuXHRcdFx0XHQpXG5cdFx0cmV0dXJuIGZvcm1hdFxuXHR9XG5cblx0LyoqXG5cdCAqIOezu+e7n+mAmuefpVxuXHQgKlxuXHQgKiA+IOmAmuefpeWPguaVsDog5ZCM5pe25pSv5oyBIFF1YW5YIOWSjCBMb29uIOS4pOenjeagvOW8jywgRW52SnPmoLnmja7ov5DooYznjq/looPoh6rliqjovazmjaIsIFN1cmdlIOeOr+Wig+S4jeaUr+aMgeWkmuWqkuS9k+mAmuefpVxuXHQgKlxuXHQgKiDnpLrkvos6XG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCAndHdpdHRlcjovLycpXG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCB7ICdvcGVuLXVybCc6ICd0d2l0dGVyOi8vJywgJ21lZGlhLXVybCc6ICdodHRwczovL2dpdGh1Yi5naXRodWJhc3NldHMuY29tL2ltYWdlcy9tb2R1bGVzL29wZW5fZ3JhcGgvZ2l0aHViLW1hcmsucG5nJyB9KVxuXHQgKiAkLm1zZyh0aXRsZSwgc3VidCwgZGVzYywgeyAnb3Blbi11cmwnOiAnaHR0cHM6Ly9iaW5nLmNvbScsICdtZWRpYS11cmwnOiAnaHR0cHM6Ly9naXRodWIuZ2l0aHViYXNzZXRzLmNvbS9pbWFnZXMvbW9kdWxlcy9vcGVuX2dyYXBoL2dpdGh1Yi1tYXJrLnBuZycgfSlcblx0ICpcblx0ICogQHBhcmFtIHsqfSB0aXRsZSDmoIfpophcblx0ICogQHBhcmFtIHsqfSBzdWJ0IOWJr+agh+mimFxuXHQgKiBAcGFyYW0geyp9IGRlc2Mg6YCa55+l6K+m5oOFXG5cdCAqIEBwYXJhbSB7Kn0gb3B0cyDpgJrnn6Xlj4LmlbBcblx0ICpcblx0ICovXG5cdG1zZyh0aXRsZSA9IG5hbWUsIHN1YnQgPSAnJywgZGVzYyA9ICcnLCBvcHRzKSB7XG5cdFx0Y29uc3QgdG9FbnZPcHRzID0gKHJhd29wdHMpID0+IHtcblx0XHRcdHN3aXRjaCAodHlwZW9mIHJhd29wdHMpIHtcblx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0cmV0dXJuIHJhd29wdHNcblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgdXJsOiByYXdvcHRzIH1cblx0XHRcdFx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJhd29wdHNcblx0XHRcdFx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7ICdvcGVuLXVybCc6IHJhd29wdHMgfVxuXHRcdFx0XHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdFx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdGxldCBvcGVuVXJsID1cblx0XHRcdFx0XHRcdFx0XHRyYXdvcHRzLnVybCB8fCByYXdvcHRzLm9wZW5VcmwgfHwgcmF3b3B0c1snb3Blbi11cmwnXVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyB1cmw6IG9wZW5VcmwgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnTG9vbic6IHtcblx0XHRcdFx0XHRcdFx0bGV0IG9wZW5VcmwgPVxuXHRcdFx0XHRcdFx0XHRcdHJhd29wdHMub3BlblVybCB8fCByYXdvcHRzLnVybCB8fCByYXdvcHRzWydvcGVuLXVybCddXG5cdFx0XHRcdFx0XHRcdGxldCBtZWRpYVVybCA9IHJhd29wdHMubWVkaWFVcmwgfHwgcmF3b3B0c1snbWVkaWEtdXJsJ11cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgb3BlblVybCwgbWVkaWFVcmwgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzoge1xuXHRcdFx0XHRcdFx0XHRsZXQgb3BlblVybCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0c1snb3Blbi11cmwnXSB8fCByYXdvcHRzLnVybCB8fCByYXdvcHRzLm9wZW5Vcmxcblx0XHRcdFx0XHRcdFx0bGV0IG1lZGlhVXJsID0gcmF3b3B0c1snbWVkaWEtdXJsJ10gfHwgcmF3b3B0cy5tZWRpYVVybFxuXHRcdFx0XHRcdFx0XHRsZXQgdXBkYXRlUGFzdGVib2FyZCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0c1sndXBkYXRlLXBhc3RlYm9hcmQnXSB8fCByYXdvcHRzLnVwZGF0ZVBhc3RlYm9hcmRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHQnb3Blbi11cmwnOiBvcGVuVXJsLFxuXHRcdFx0XHRcdFx0XHRcdCdtZWRpYS11cmwnOiBtZWRpYVVybCxcblx0XHRcdFx0XHRcdFx0XHQndXBkYXRlLXBhc3RlYm9hcmQnOiB1cGRhdGVQYXN0ZWJvYXJkXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCF0aGlzLmlzTXV0ZSkge1xuXHRcdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdCRub3RpZmljYXRpb24ucG9zdCh0aXRsZSwgc3VidCwgZGVzYywgdG9FbnZPcHRzKG9wdHMpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdFx0JG5vdGlmeSh0aXRsZSwgc3VidCwgZGVzYywgdG9FbnZPcHRzKG9wdHMpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICghdGhpcy5pc011dGVMb2cpIHtcblx0XHRcdGxldCBsb2dzID0gWycnLCAnPT09PT09PT09PT09PT3wn5Oj57O757uf6YCa55+l8J+Toz09PT09PT09PT09PT09J11cblx0XHRcdGxvZ3MucHVzaCh0aXRsZSlcblx0XHRcdHN1YnQgPyBsb2dzLnB1c2goc3VidCkgOiAnJ1xuXHRcdFx0ZGVzYyA/IGxvZ3MucHVzaChkZXNjKSA6ICcnXG5cdFx0XHRjb25zb2xlLmxvZyhsb2dzLmpvaW4oJ1xcbicpKVxuXHRcdFx0dGhpcy5sb2dzID0gdGhpcy5sb2dzLmNvbmNhdChsb2dzKVxuXHRcdH1cblx0fVxuXG5cdGxvZyguLi5sb2dzKSB7XG5cdFx0aWYgKGxvZ3MubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5sb2dzID0gWy4uLnRoaXMubG9ncywgLi4ubG9nc11cblx0XHR9XG5cdFx0Y29uc29sZS5sb2cobG9ncy5qb2luKHRoaXMubG9nU2VwYXJhdG9yKSlcblx0fVxuXG5cdGxvZ0VycihlcnJvcikge1xuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhpcy5sb2coJycsIGDinZfvuI8gJHt0aGlzLm5hbWV9LCDplJnor68hYCwgZXJyb3IpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0dGhpcy5sb2coJycsIGDinZfvuI8ke3RoaXMubmFtZX0sIOmUmeivryFgLCBlcnJvci5zdGFjaylcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHR3YWl0KHRpbWUpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSkpXG5cdH1cblxuXHRkb25lKHZhbCA9IHt9KSB7XG5cdFx0Y29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cdFx0Y29uc3QgY29zdFRpbWUgPSAoZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lKSAvIDEwMDBcblx0XHR0aGlzLmxvZygnJywgYPCfmqkgJHt0aGlzLm5hbWV9LCDnu5PmnZ8hIPCflZsgJHtjb3N0VGltZX0g56eSYClcblx0XHR0aGlzLmxvZygpXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQkZG9uZSh2YWwpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0cHJvY2Vzcy5leGl0KDEpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNcblx0ICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1ZpcmdpbENseW5lL0dldFNvbWVGcmllcy9ibG9iL21haW4vZnVuY3Rpb24vZ2V0RU5WL2dldEVOVi5qc1xuXHQgKiBAYXV0aG9yIFZpcmdpbENseW5lXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSBQZXJzaXN0ZW50IFN0b3JlIEtleVxuXHQgKiBAcGFyYW0ge0FycmF5fSBuYW1lcyAtIFBsYXRmb3JtIE5hbWVzXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhYmFzZSAtIERlZmF1bHQgRGF0YWJhc2Vcblx0ICogQHJldHVybiB7T2JqZWN0fSB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfVxuXHQgKi9cblx0Z2V0RU5WKGtleSwgbmFtZXMsIGRhdGFiYXNlKSB7XG5cdFx0Ly90aGlzLmxvZyhg4piR77iPICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIFwiXCIpO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBCb3hKcyAqKioqKioqKioqKioqKioqKi9cblx0XHQvLyDljIXoo4XkuLrlsYDpg6jlj5jph4/vvIznlKjlrozph4rmlL7lhoXlrZhcblx0XHQvLyBCb3hKc+eahOa4heepuuaTjeS9nOi/lOWbnuWBh+WAvOepuuWtl+espuS4siwg6YC76L6R5oiW5pON5L2c56ym5Lya5Zyo5bem5L6n5pON5L2c5pWw5Li65YGH5YC85pe26L+U5Zue5Y+z5L6n5pON5L2c5pWw44CCXG5cdFx0bGV0IEJveEpzID0gdGhpcy5nZXRqc29uKGtleSwgZGF0YWJhc2UpO1xuXHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYEJveEpz57G75Z6LOiAke3R5cGVvZiBCb3hKc31gLCBgQm94SnPlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQm94SnMpfWAsIFwiXCIpO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBBcmd1bWVudCAqKioqKioqKioqKioqKioqKi9cblx0XHRsZXQgQXJndW1lbnQgPSB7fTtcblx0XHRpZiAodHlwZW9mICRhcmd1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0aWYgKEJvb2xlYW4oJGFyZ3VtZW50KSkge1xuXHRcdFx0XHQvL3RoaXMubG9nKGDwn46JICR7dGhpcy5uYW1lfSwgJEFyZ3VtZW50YCk7XG5cdFx0XHRcdGxldCBhcmcgPSBPYmplY3QuZnJvbUVudHJpZXMoJGFyZ3VtZW50LnNwbGl0KFwiJlwiKS5tYXAoKGl0ZW0pID0+IGl0ZW0uc3BsaXQoXCI9XCIpLm1hcChpID0+IGkucmVwbGFjZSgvXFxcIi9nLCAnJykpKSk7XG5cdFx0XHRcdC8vdGhpcy5sb2coSlNPTi5zdHJpbmdpZnkoYXJnKSk7XG5cdFx0XHRcdGZvciAobGV0IGl0ZW0gaW4gYXJnKSB0aGlzLnNldFBhdGgoQXJndW1lbnQsIGl0ZW0sIGFyZ1tpdGVtXSk7XG5cdFx0XHRcdC8vdGhpcy5sb2coSlNPTi5zdHJpbmdpZnkoQXJndW1lbnQpKTtcblx0XHRcdH07XG5cdFx0XHQvL3RoaXMubG9nKGDinIUgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYEFyZ3VtZW5057G75Z6LOiAke3R5cGVvZiBBcmd1bWVudH1gLCBgQXJndW1lbnTlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQXJndW1lbnQpfWAsIFwiXCIpO1xuXHRcdH07XG5cdFx0LyoqKioqKioqKioqKioqKioqIFN0b3JlICoqKioqKioqKioqKioqKioqL1xuXHRcdGNvbnN0IFN0b3JlID0geyBTZXR0aW5nczogZGF0YWJhc2U/LkRlZmF1bHQ/LlNldHRpbmdzIHx8IHt9LCBDb25maWdzOiBkYXRhYmFzZT8uRGVmYXVsdD8uQ29uZmlncyB8fCB7fSwgQ2FjaGVzOiB7fSB9O1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShuYW1lcykpIG5hbWVzID0gW25hbWVzXTtcblx0XHQvL3RoaXMubG9nKGDwn5qnICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBuYW1lc+exu+WeizogJHt0eXBlb2YgbmFtZXN9YCwgYG5hbWVz5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KG5hbWVzKX1gLCBcIlwiKTtcblx0XHRmb3IgKGxldCBuYW1lIG9mIG5hbWVzKSB7XG5cdFx0XHRTdG9yZS5TZXR0aW5ncyA9IHsgLi4uU3RvcmUuU2V0dGluZ3MsIC4uLmRhdGFiYXNlPy5bbmFtZV0/LlNldHRpbmdzLCAuLi5Bcmd1bWVudCwgLi4uQm94SnM/LltuYW1lXT8uU2V0dGluZ3MgfTtcblx0XHRcdFN0b3JlLkNvbmZpZ3MgPSB7IC4uLlN0b3JlLkNvbmZpZ3MsIC4uLmRhdGFiYXNlPy5bbmFtZV0/LkNvbmZpZ3MgfTtcblx0XHRcdGlmIChCb3hKcz8uW25hbWVdPy5DYWNoZXMgJiYgdHlwZW9mIEJveEpzPy5bbmFtZV0/LkNhY2hlcyA9PT0gXCJzdHJpbmdcIikgQm94SnNbbmFtZV0uQ2FjaGVzID0gSlNPTi5wYXJzZShCb3hKcz8uW25hbWVdPy5DYWNoZXMpO1xuXHRcdFx0U3RvcmUuQ2FjaGVzID0geyAuLi5TdG9yZS5DYWNoZXMsIC4uLkJveEpzPy5bbmFtZV0/LkNhY2hlcyB9O1xuXHRcdH07XG5cdFx0Ly90aGlzLmxvZyhg8J+apyAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgU3RvcmUuU2V0dGluZ3Pnsbvlnos6ICR7dHlwZW9mIFN0b3JlLlNldHRpbmdzfWAsIGBTdG9yZS5TZXR0aW5nczogJHtKU09OLnN0cmluZ2lmeShTdG9yZS5TZXR0aW5ncyl9YCwgXCJcIik7XG5cdFx0dGhpcy50cmF2ZXJzZU9iamVjdChTdG9yZS5TZXR0aW5ncywgKGtleSwgdmFsdWUpID0+IHtcblx0XHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCB0cmF2ZXJzZU9iamVjdGAsIGAke2tleX06ICR7dHlwZW9mIHZhbHVlfWAsIGAke2tleX06ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWAsIFwiXCIpO1xuXHRcdFx0aWYgKHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpOyAvLyDlrZfnrKbkuLLovaxCb29sZWFuXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0aWYgKHZhbHVlLmluY2x1ZGVzKFwiLFwiKSkgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIixcIikubWFwKGl0ZW0gPT4gdGhpcy5zdHJpbmcybnVtYmVyKGl0ZW0pKTsgLy8g5a2X56ym5Liy6L2s5pWw57uE6L2s5pWw5a2XXG5cdFx0XHRcdGVsc2UgdmFsdWUgPSB0aGlzLnN0cmluZzJudW1iZXIodmFsdWUpOyAvLyDlrZfnrKbkuLLovazmlbDlrZdcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fSk7XG5cdFx0Ly90aGlzLmxvZyhg4pyFICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBTdG9yZTogJHt0eXBlb2YgU3RvcmUuQ2FjaGVzfWAsIGBTdG9yZeWGheWuuTogJHtKU09OLnN0cmluZ2lmeShTdG9yZSl9YCwgXCJcIik7XG5cdFx0cmV0dXJuIFN0b3JlO1xuXHR9O1xuXG5cdC8qKioqKioqKioqKioqKioqKiBmdW5jdGlvbiAqKioqKioqKioqKioqKioqKi9cblx0c2V0UGF0aChvYmplY3QsIHBhdGgsIHZhbHVlKSB7IHBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgobywgcCwgaSkgPT4gb1twXSA9IHBhdGguc3BsaXQoXCIuXCIpLmxlbmd0aCA9PT0gKytpID8gdmFsdWUgOiBvW3BdIHx8IHt9LCBvYmplY3QpIH1cblx0dHJhdmVyc2VPYmplY3QobywgYykgeyBmb3IgKHZhciB0IGluIG8pIHsgdmFyIG4gPSBvW3RdOyBvW3RdID0gXCJvYmplY3RcIiA9PSB0eXBlb2YgbiAmJiBudWxsICE9PSBuID8gdGhpcy50cmF2ZXJzZU9iamVjdChuLCBjKSA6IGModCwgbikgfSByZXR1cm4gbyB9XG5cdHN0cmluZzJudW1iZXIoc3RyaW5nKSB7IGlmIChzdHJpbmcgJiYgIWlzTmFOKHN0cmluZykpIHN0cmluZyA9IHBhcnNlSW50KHN0cmluZywgMTApOyByZXR1cm4gc3RyaW5nIH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0dHAge1xuXHRjb25zdHJ1Y3RvcihlbnYpIHtcblx0XHR0aGlzLmVudiA9IGVudlxuXHR9XG5cblx0c2VuZChvcHRzLCBtZXRob2QgPSAnR0VUJykge1xuXHRcdG9wdHMgPSB0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycgPyB7IHVybDogb3B0cyB9IDogb3B0c1xuXHRcdGxldCBzZW5kZXIgPSB0aGlzLmdldFxuXHRcdGlmIChtZXRob2QgPT09ICdQT1NUJykge1xuXHRcdFx0c2VuZGVyID0gdGhpcy5wb3N0XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRzZW5kZXIuY2FsbCh0aGlzLCBvcHRzLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG5cdFx0XHRcdGlmIChlcnJvcikgcmVqZWN0KGVycm9yKVxuXHRcdFx0XHRlbHNlIHJlc29sdmUocmVzcG9uc2UpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRnZXQob3B0cykge1xuXHRcdHJldHVybiB0aGlzLnNlbmQuY2FsbCh0aGlzLmVudiwgb3B0cylcblx0fVxuXG5cdHBvc3Qob3B0cykge1xuXHRcdHJldHVybiB0aGlzLnNlbmQuY2FsbCh0aGlzLmVudiwgb3B0cywgJ1BPU1QnKVxuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVUkkge1xuXHRjb25zdHJ1Y3RvcihvcHRzID0gW10pIHtcblx0XHR0aGlzLm5hbWUgPSBcIlVSSSB2MS4yLjZcIjtcblx0XHR0aGlzLm9wdHMgPSBvcHRzO1xuXHRcdHRoaXMuanNvbiA9IHsgc2NoZW1lOiBcIlwiLCBob3N0OiBcIlwiLCBwYXRoOiBcIlwiLCBxdWVyeToge30gfTtcblx0fTtcblxuXHRwYXJzZSh1cmwpIHtcblx0XHRjb25zdCBVUkxSZWdleCA9IC8oPzooPzxzY2hlbWU+LispOlxcL1xcLyg/PGhvc3Q+W14vXSspKT9cXC8/KD88cGF0aD5bXj9dKyk/XFw/Pyg/PHF1ZXJ5PlteP10rKT8vO1xuXHRcdGxldCBqc29uID0gdXJsLm1hdGNoKFVSTFJlZ2V4KT8uZ3JvdXBzID8/IG51bGw7XG5cdFx0aWYgKGpzb24/LnBhdGgpIGpzb24ucGF0aHMgPSBqc29uLnBhdGguc3BsaXQoXCIvXCIpOyBlbHNlIGpzb24ucGF0aCA9IFwiXCI7XG5cdFx0Ly9pZiAoanNvbj8ucGF0aHM/LmF0KC0xKT8uaW5jbHVkZXMoXCIuXCIpKSBqc29uLmZvcm1hdCA9IGpzb24ucGF0aHMuYXQoLTEpLnNwbGl0KFwiLlwiKS5hdCgtMSk7XG5cdFx0aWYgKGpzb24/LnBhdGhzKSB7XG5cdFx0XHRjb25zdCBmaWxlTmFtZSA9IGpzb24ucGF0aHNbanNvbi5wYXRocy5sZW5ndGggLSAxXTtcblx0XHRcdGlmIChmaWxlTmFtZT8uaW5jbHVkZXMoXCIuXCIpKSB7XG5cdFx0XHRcdGNvbnN0IGxpc3QgPSBmaWxlTmFtZS5zcGxpdChcIi5cIik7XG5cdFx0XHRcdGpzb24uZm9ybWF0ID0gbGlzdFtsaXN0Lmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoanNvbj8ucXVlcnkpIGpzb24ucXVlcnkgPSBPYmplY3QuZnJvbUVudHJpZXMoanNvbi5xdWVyeS5zcGxpdChcIiZcIikubWFwKChwYXJhbSkgPT4gcGFyYW0uc3BsaXQoXCI9XCIpKSk7XG5cdFx0cmV0dXJuIGpzb25cblx0fTtcblxuXHRzdHJpbmdpZnkoanNvbiA9IHRoaXMuanNvbikge1xuXHRcdGxldCB1cmwgPSBcIlwiO1xuXHRcdGlmIChqc29uPy5zY2hlbWUgJiYganNvbj8uaG9zdCkgdXJsICs9IGpzb24uc2NoZW1lICsgXCI6Ly9cIiArIGpzb24uaG9zdDtcblx0XHRpZiAoanNvbj8ucGF0aCkgdXJsICs9IChqc29uPy5ob3N0KSA/IFwiL1wiICsganNvbi5wYXRoIDoganNvbi5wYXRoO1xuXHRcdGlmIChqc29uPy5xdWVyeSkgdXJsICs9IFwiP1wiICsgT2JqZWN0LmVudHJpZXMoanNvbi5xdWVyeSkubWFwKHBhcmFtID0+IHBhcmFtLmpvaW4oXCI9XCIpKS5qb2luKFwiJlwiKTtcblx0XHRyZXR1cm4gdXJsXG5cdH07XG59XG4iLCIvLyByZWZlcjogaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYnZ0dDEvXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJWVFQge1xuXHRjb25zdHJ1Y3RvcihvcHRzID0gW1wibWlsbGlzZWNvbmRzXCIsIFwidGltZVN0YW1wXCIsIFwic2luZ2xlTGluZVwiLCBcIlxcblwiXSkge1xuXHRcdHRoaXMubmFtZSA9IFwiV2ViVlRUIHYyLjEuNFwiO1xuXHRcdHRoaXMub3B0cyA9IG9wdHM7XG5cdFx0dGhpcy5saW5lQnJlYWsgPSAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxuXCIpKSA/IFwiXFxuXCIgOiAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxyXCIpKSA/IFwiXFxyXCIgOiAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxyXFxuXCIpKSA/IFwiXFxyXFxuXCIgOiBcIlxcblwiO1xuXHRcdHRoaXMudnR0ID0gbmV3IFN0cmluZztcblx0XHR0aGlzLmpzb24gPSB7IGhlYWRlcnM6IHt9LCBjb21tZW50czogW10sIHN0eWxlOiBcIlwiLCBib2R5OiBbXSB9O1xuXHR9O1xuXG5cdHBhcnNlKHZ0dCA9IHRoaXMudnR0KSB7XG5cdFx0Y29uc3QgV2ViVlRUX2N1ZV9SZWdleCA9ICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJtaWxsaXNlY29uZHNcIikpID8gL14oKD88aW5kZXg+XFxkKykoXFxyXFxufFxccnxcXG4pKT8oPzx0aW1pbmc+KD88c3RhcnRUaW1lPlswLTk6LixdKykgLS0+ICg/PGVuZFRpbWU+WzAtOTouLF0rKSkgPyg/PHNldHRpbmdzPi4rKT9bXl0oPzx0ZXh0PltcXHNcXFNdKik/JC9cblx0XHRcdDogL14oKD88aW5kZXg+XFxkKykoXFxyXFxufFxccnxcXG4pKT8oPzx0aW1pbmc+KD88c3RhcnRUaW1lPlswLTk6XSspWzAtOS4sXSsgLS0+ICg/PGVuZFRpbWU+WzAtOTpdKylbMC05LixdKykgPyg/PHNldHRpbmdzPi4rKT9bXl0oPzx0ZXh0PltcXHNcXFNdKik/JC9cblx0XHRjb25zdCBBcnJheSA9IHZ0dC5zcGxpdCgvXFxyXFxuXFxyXFxufFxcclxccnxcXG5cXG4vKTtcblx0XHRjb25zdCBKc29uID0geyBoZWFkZXJzOiB7fSwgY29tbWVudHM6IFtdLCBzdHlsZTogXCJcIiwgYm9keTogW10gfTtcblxuXHRcdEFycmF5LmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRpdGVtID0gaXRlbS50cmltKCk7XG5cdFx0XHRzd2l0Y2ggKGl0ZW0uc3Vic3RyaW5nKDAsIDUpLnRyaW0oKSkge1xuXHRcdFx0XHRjYXNlIFwiV0VCVlRcIjoge1xuXHRcdFx0XHRcdGxldCBjdWVzID0gaXRlbS5zcGxpdCgvXFxyXFxufFxccnxcXG4vKTtcblx0XHRcdFx0XHRKc29uLmhlYWRlcnMudHlwZSA9IGN1ZXMuc2hpZnQoKTtcblx0XHRcdFx0XHRKc29uLmhlYWRlcnMub3B0aW9ucyA9IGN1ZXM7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJOT1RFXCI6IHtcblx0XHRcdFx0XHRKc29uLmNvbW1lbnRzLnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJTVFlMRVwiOiB7XG5cdFx0XHRcdFx0bGV0IGN1ZXMgPSBpdGVtLnNwbGl0KC9cXHJcXG58XFxyfFxcbi8pO1xuXHRcdFx0XHRcdGN1ZXMuc2hpZnQoKTtcblx0XHRcdFx0XHRKc29uLnN0eWxlID0gY3Vlcy5qb2luKHRoaXMubGluZUJyZWFrKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fTtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRsZXQgY3VlID0gaXRlbS5tYXRjaChXZWJWVFRfY3VlX1JlZ2V4KT8uZ3JvdXBzO1xuXHRcdFx0XHRcdGlmIChjdWUpIHtcblx0XHRcdFx0XHRcdGlmIChKc29uLmhlYWRlcnM/LnR5cGUgIT09IFwiV0VCVlRUXCIpIHtcblx0XHRcdFx0XHRcdFx0Y3VlLnRpbWluZyA9IGN1ZT8udGltaW5nPy5yZXBsYWNlPy4oXCIsXCIsIFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0Y3VlLnN0YXJ0VGltZSA9IGN1ZT8uc3RhcnRUaW1lPy5yZXBsYWNlPy4oXCIsXCIsIFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0Y3VlLmVuZFRpbWUgPSBjdWU/LmVuZFRpbWU/LnJlcGxhY2U/LihcIixcIiwgXCIuXCIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0cy5pbmNsdWRlcyhcInRpbWVTdGFtcFwiKSkge1xuXHRcdFx0XHRcdFx0XHRsZXQgSVNPU3RyaW5nID0gY3VlPy5zdGFydFRpbWU/LnJlcGxhY2U/LigvKC4qKS8sIFwiMTk3MC0wMS0wMVQkMVpcIilcblx0XHRcdFx0XHRcdFx0Y3VlLnRpbWVTdGFtcCA9IHRoaXMub3B0cy5pbmNsdWRlcyhcIm1pbGxpc2Vjb25kc1wiKSA/IERhdGUucGFyc2UoSVNPU3RyaW5nKSA6IERhdGUucGFyc2UoSVNPU3RyaW5nKSAvIDEwMDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjdWUudGV4dCA9IGN1ZT8udGV4dD8udHJpbUVuZD8uKCk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRzLmluY2x1ZGVzKFwic2luZ2xlTGluZVwiKSkge1xuXHRcdFx0XHRcdFx0XHRjdWUudGV4dCA9IGN1ZT8udGV4dD8ucmVwbGFjZT8uKC9cXHJcXG58XFxyfFxcbi8sIFwiIFwiKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRzLmluY2x1ZGVzKFwibXVsdGlMaW5lXCIpKSB7XG5cdFx0XHRcdFx0XHRcdGN1ZS50ZXh0ID0gY3VlPy50ZXh0Py5zcGxpdD8uKC9cXHJcXG58XFxyfFxcbi8pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0SnNvbi5ib2R5LnB1c2goY3VlKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBKc29uXG5cdH07XG5cblx0c3RyaW5naWZ5KGpzb24gPSB0aGlzLmpzb24pIHtcblx0XHRsZXQgdnR0ID0gW1xuXHRcdFx0anNvbi5oZWFkZXJzID0gW2pzb24uaGVhZGVycz8udHlwZSB8fCBcIlwiLCBqc29uLmhlYWRlcnM/Lm9wdGlvbnMgfHwgXCJcIl0uZmxhdChJbmZpbml0eSkuam9pbih0aGlzLmxpbmVCcmVhayksXG5cdFx0XHRqc29uLmNvbW1lbnRzID0ganNvbj8uY29tbWVudHM/LmpvaW4/Lih0aGlzLmxpbmVCcmVhayksXG5cdFx0XHRqc29uLnN0eWxlID0gKGpzb24/LnN0eWxlPy5sZW5ndGggPiAwKSA/IFtcIlNUWUxFXCIsIGpzb24uc3R5bGVdLmpvaW4odGhpcy5saW5lQnJlYWspIDogXCJcIixcblx0XHRcdGpzb24uYm9keSA9IGpzb24uYm9keS5tYXAoaXRlbSA9PiB7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0udGV4dCkpIGl0ZW0udGV4dCA9IGl0ZW0udGV4dC5qb2luKHRoaXMubGluZUJyZWFrKTtcblx0XHRcdFx0aXRlbSA9IGAkeyhpdGVtLmluZGV4KSA/IGl0ZW0uaW5kZXggKyB0aGlzLmxpbmVCcmVhayA6IFwiXCJ9JHtpdGVtLnRpbWluZ30gJHtpdGVtPy5zZXR0aW5ncyA/PyBcIlwifSR7dGhpcy5saW5lQnJlYWt9JHtpdGVtLnRleHR9YDtcblx0XHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0XHR9KS5qb2luKHRoaXMubGluZUJyZWFrICsgdGhpcy5saW5lQnJlYWspXG5cdFx0XS5qb2luKHRoaXMubGluZUJyZWFrICsgdGhpcy5saW5lQnJlYWspLnRyaW0oKSArIHRoaXMubGluZUJyZWFrICsgdGhpcy5saW5lQnJlYWs7XG5cdFx0cmV0dXJuIHZ0dFxuXHR9O1xufTtcbiIsIi8vIHJlZmVyOiBodHRwczovL2dpdGh1Yi5jb20vUGVuZy1ZTS9RdWFuWC9ibG9iL21hc3Rlci9Ub29scy9YTUxQYXJzZXIveG1sLXBhcnNlci5qc1xuLy8gcmVmZXI6IGh0dHBzOi8vZ29lc3NuZXIubmV0L2Rvd25sb2FkL3Byai9qc29ueG1sL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWE1MIHtcblx0I0FUVFJJQlVURV9LRVkgPSBcIkBcIjtcblx0I0NISUxEX05PREVfS0VZID0gXCIjXCI7XG5cdCNVTkVTQ0FQRSA9IHtcblx0XHRcIiZhbXA7XCI6IFwiJlwiLFxuXHRcdFwiJmx0O1wiOiBcIjxcIixcblx0XHRcIiZndDtcIjogXCI+XCIsXG5cdFx0XCImYXBvcztcIjogXCInXCIsXG5cdFx0XCImcXVvdDtcIjogJ1wiJ1xuXHR9O1xuXHQjRVNDQVBFID0ge1xuXHRcdFwiJlwiOiBcIiZhbXA7XCIsXG5cdFx0XCI8XCI6IFwiJmx0O1wiLFxuXHRcdFwiPlwiOiBcIiZndDtcIixcblx0XHRcIidcIjogXCImYXBvcztcIixcblx0XHQnXCInOiBcIiZxdW90O1wiXG5cdH07XG5cblx0Y29uc3RydWN0b3Iob3B0cykge1xuXHRcdHRoaXMubmFtZSA9IFwiWE1MIHYwLjQuMC0yXCI7XG5cdFx0dGhpcy5vcHRzID0gb3B0cztcblx0XHRCaWdJbnQucHJvdG90eXBlLnRvSlNPTiA9ICgpID0+IHRoaXMudG9TdHJpbmcoKTtcblx0fTtcblxuXHRwYXJzZSh4bWwgPSBuZXcgU3RyaW5nLCByZXZpdmVyID0gXCJcIikge1xuXHRcdGNvbnN0IFVORVNDQVBFID0gdGhpcy4jVU5FU0NBUEU7XG5cdFx0Y29uc3QgQVRUUklCVVRFX0tFWSA9IHRoaXMuI0FUVFJJQlVURV9LRVk7XG5cdFx0Y29uc3QgQ0hJTERfTk9ERV9LRVkgPSB0aGlzLiNDSElMRF9OT0RFX0tFWTtcblx0XHRjb25zdCBET00gPSB0b0RPTSh4bWwpO1xuXHRcdGxldCBqc29uID0gZnJvbVhNTChET00sIHJldml2ZXIpO1xuXHRcdHJldHVybiBqc29uO1xuXG5cdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdGZ1bmN0aW9uIHRvRE9NKHRleHQpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSB0ZXh0LnJlcGxhY2UoL15bIFxcdF0rL2dtLCBcIlwiKVxuXHRcdFx0XHQuc3BsaXQoLzwoW14hPD4/XSg/OidbXFxTXFxzXSo/J3xcIltcXFNcXHNdKj9cInxbXidcIjw+XSkqfCEoPzotLVtcXFNcXHNdKj8tLXxcXFtbXlxcW1xcXSdcIjw+XStcXFtbXFxTXFxzXSo/XV18RE9DVFlQRVteXFxbPD5dKj9cXFtbXFxTXFxzXSo/XXwoPzpFTlRJVFlbXlwiPD5dKj9cIltcXFNcXHNdKj9cIik/W1xcU1xcc10qPyl8XFw/W1xcU1xcc10qP1xcPyk+Lyk7XG5cdFx0XHRjb25zdCBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcblxuXHRcdFx0Ly8gcm9vdCBlbGVtZW50XG5cdFx0XHRjb25zdCByb290ID0geyBjaGlsZHJlbjogW10gfTtcblx0XHRcdGxldCBlbGVtID0gcm9vdDtcblxuXHRcdFx0Ly8gZG9tIHRyZWUgc3RhY2tcblx0XHRcdGNvbnN0IHN0YWNrID0gW107XG5cblx0XHRcdC8vIHBhcnNlXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDspIHtcblx0XHRcdFx0Ly8gdGV4dCBub2RlXG5cdFx0XHRcdGNvbnN0IHN0ciA9IGxpc3RbaSsrXTtcblx0XHRcdFx0aWYgKHN0cikgYXBwZW5kVGV4dChzdHIpO1xuXG5cdFx0XHRcdC8vIGNoaWxkIG5vZGVcblx0XHRcdFx0Y29uc3QgdGFnID0gbGlzdFtpKytdO1xuXHRcdFx0XHRpZiAodGFnKSBwYXJzZU5vZGUodGFnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByb290O1xuXHRcdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2VOb2RlKHRhZykge1xuXHRcdFx0XHRjb25zdCB0YWdzID0gdGFnLnNwbGl0KFwiIFwiKTtcblx0XHRcdFx0Y29uc3QgbmFtZSA9IHRhZ3Muc2hpZnQoKTtcblx0XHRcdFx0Y29uc3QgbGVuZ3RoID0gdGFncy5sZW5ndGg7XG5cdFx0XHRcdGxldCBjaGlsZCA9IHt9O1xuXHRcdFx0XHRzd2l0Y2ggKG5hbWVbMF0pIHtcblx0XHRcdFx0XHRjYXNlIFwiL1wiOlxuXHRcdFx0XHRcdFx0Ly8gY2xvc2UgdGFnXG5cdFx0XHRcdFx0XHRjb25zdCBjbG9zZWQgPSB0YWcucmVwbGFjZSgvXlxcL3xbXFxzXFwvXS4qJC9nLCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0d2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB0YWdOYW1lID0gZWxlbT8ubmFtZT8udG9Mb3dlckNhc2U/LigpO1xuXHRcdFx0XHRcdFx0XHRlbGVtID0gc3RhY2sucG9wKCk7XG5cdFx0XHRcdFx0XHRcdGlmICh0YWdOYW1lID09PSBjbG9zZWQpIGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIj9cIjpcblx0XHRcdFx0XHRcdC8vIFhNTCBkZWNsYXJhdGlvblxuXHRcdFx0XHRcdFx0Y2hpbGQubmFtZSA9IG5hbWU7XG5cdFx0XHRcdFx0XHRjaGlsZC5yYXcgPSB0YWdzLmpvaW4oXCIgXCIpO1xuXHRcdFx0XHRcdFx0YXBwZW5kQ2hpbGQoY2hpbGQpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIiFcIjpcblx0XHRcdFx0XHRcdGlmICgvIVxcW0NEQVRBXFxbKC4rKVxcXVxcXS8udGVzdCh0YWcpKSB7XG5cdFx0XHRcdFx0XHRcdC8vIENEQVRBIHNlY3Rpb25cblx0XHRcdFx0XHRcdFx0Y2hpbGQubmFtZSA9IFwiIUNEQVRBXCI7XG5cdFx0XHRcdFx0XHRcdC8vY2hpbGQucmF3ID0gdGFnLnNsaWNlKDksIC0yKTtcblx0XHRcdFx0XHRcdFx0Y2hpbGQucmF3ID0gdGFnLm1hdGNoKC8hXFxbQ0RBVEFcXFsoLispXFxdXFxdLyk7XG5cdFx0XHRcdFx0XHRcdC8vYXBwZW5kVGV4dCh0YWcuc2xpY2UoOSwgLTIpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIENvbW1lbnQgc2VjdGlvblxuXHRcdFx0XHRcdFx0XHRjaGlsZC5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHRcdFx0Y2hpbGQucmF3ID0gdGFncy5qb2luKFwiIFwiKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Y2hpbGQgPSBvcGVuVGFnKHRhZyk7XG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKCh0YWdzPy5bbGVuZ3RoIC0gMV0gPz8gbmFtZSkuc2xpY2UoLTEpKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgXCIvXCI6XG5cdFx0XHRcdFx0XHRcdFx0Ly9jaGlsZC5oYXNDaGlsZCA9IGZhbHNlOyAvLyBlbXB0eVRhZ1xuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBjaGlsZC5jaGlsZHJlbjsgLy8gZW1wdHlUYWdcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJsaW5rXCI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vY2hpbGQuaGFzQ2hpbGQgPSBmYWxzZTsgLy8gZW1wdHlUYWdcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGNoaWxkLmNoaWxkcmVuOyAvLyBlbXB0eVRhZ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN0YWNrLnB1c2goZWxlbSk7IC8vIG9wZW5UYWdcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxlbSA9IGNoaWxkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGZ1bmN0aW9uIG9wZW5UYWcodGFnKSB7XG5cdFx0XHRcdFx0Y29uc3QgZWxlbSA9IHsgY2hpbGRyZW46IFtdIH07XG5cdFx0XHRcdFx0dGFnID0gdGFnLnJlcGxhY2UoL1xccypcXC8/JC8sIFwiXCIpO1xuXHRcdFx0XHRcdGNvbnN0IHBvcyA9IHRhZy5zZWFyY2goL1tcXHM9J1wiXFwvXS8pO1xuXHRcdFx0XHRcdGlmIChwb3MgPCAwKSB7XG5cdFx0XHRcdFx0XHRlbGVtLm5hbWUgPSB0YWc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0ubmFtZSA9IHRhZy5zdWJzdHIoMCwgcG9zKTtcblx0XHRcdFx0XHRcdGVsZW0udGFnID0gdGFnLnN1YnN0cihwb3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZWxlbTtcblx0XHRcdFx0fTtcblx0XHRcdH07XG5cblx0XHRcdGZ1bmN0aW9uIGFwcGVuZFRleHQoc3RyKSB7XG5cdFx0XHRcdC8vc3RyID0gcmVtb3ZlU3BhY2VzKHN0cik7XG5cdFx0XHRcdHN0ciA9IHJlbW92ZUJyZWFrTGluZShzdHIpO1xuXHRcdFx0XHQvL3N0ciA9IHN0cj8udHJpbT8uKCk7XG5cdFx0XHRcdGlmIChzdHIpIGFwcGVuZENoaWxkKHVuZXNjYXBlWE1MKHN0cikpO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIHJlbW92ZUJyZWFrTGluZShzdHIpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RyPy5yZXBsYWNlPy4oL14oXFxyXFxufFxccnxcXG58XFx0KSt8KFxcclxcbnxcXHJ8XFxufFxcdCkrJC9nLCBcIlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBhcHBlbmRDaGlsZChjaGlsZCkge1xuXHRcdFx0XHRlbGVtLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdGZ1bmN0aW9uIGZyb21QbGlzdChlbGVtLCByZXZpdmVyKSB7XG5cdFx0XHRsZXQgb2JqZWN0O1xuXHRcdFx0c3dpdGNoICh0eXBlb2YgZWxlbSkge1xuXHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdGNhc2UgXCJ1bmRlZmluZWRcIjpcblx0XHRcdFx0XHRvYmplY3QgPSBlbGVtO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdFx0Ly9kZWZhdWx0OlxuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBlbGVtLm5hbWU7XG5cdFx0XHRcdFx0Y29uc3QgY2hpbGRyZW4gPSBlbGVtLmNoaWxkcmVuO1xuXG5cdFx0XHRcdFx0b2JqZWN0ID0ge307XG5cblx0XHRcdFx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdFx0XHRcdGNhc2UgXCJwbGlzdFwiOlxuXHRcdFx0XHRcdFx0XHRsZXQgcGxpc3QgPSBmcm9tUGxpc3QoY2hpbGRyZW5bMF0sIHJldml2ZXIpO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBPYmplY3QuYXNzaWduKG9iamVjdCwgcGxpc3QpXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImRpY3RcIjpcblx0XHRcdFx0XHRcdFx0bGV0IGRpY3QgPSBjaGlsZHJlbi5tYXAoY2hpbGQgPT4gZnJvbVBsaXN0KGNoaWxkLCByZXZpdmVyKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QgPSBjaHVuayhkaWN0LCAyKTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0ID0gT2JqZWN0LmZyb21FbnRyaWVzKGRpY3QpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJhcnJheVwiOlxuXHRcdFx0XHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0KSkgb2JqZWN0ID0gW107XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IGNoaWxkcmVuLm1hcChjaGlsZCA9PiBmcm9tUGxpc3QoY2hpbGQsIHJldml2ZXIpKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwia2V5XCI6XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGtleSA9IGNoaWxkcmVuWzBdO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBrZXk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcInRydWVcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJmYWxzZVwiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCBib29sZWFuID0gbmFtZTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0ID0gSlNPTi5wYXJzZShib29sZWFuKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiaW50ZWdlclwiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCBpbnRlZ2VyID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdC8vb2JqZWN0ID0gcGFyc2VJbnQoaW50ZWdlcik7XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IEJpZ0ludChpbnRlZ2VyKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwicmVhbFwiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCByZWFsID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdC8vY29uc3QgZGlnaXRzID0gcmVhbC5zcGxpdChcIi5cIilbMV0/Lmxlbmd0aCB8fCAwO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBwYXJzZUZsb2F0KHJlYWwpLy8udG9GaXhlZChkaWdpdHMpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3RyaW5nID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IHN0cmluZztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRpZiAocmV2aXZlcikgb2JqZWN0ID0gcmV2aXZlcihuYW1lIHx8IFwiXCIsIG9iamVjdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXG5cdFx0XHQvKiogXG5cdFx0XHQgKiBDaHVuayBBcnJheVxuXHRcdFx0ICogQGF1dGhvciBWaXJnaWxDbHluZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc291cmNlIC0gc291cmNlXG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIC0gbnVtYmVyXG5cdFx0XHQgKiBAcmV0dXJuIHtBcnJheTwqPn0gdGFyZ2V0XG5cdFx0XHQgKi9cblx0XHRcdGZ1bmN0aW9uIGNodW5rKHNvdXJjZSwgbGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IDAsIHRhcmdldCA9IFtdO1xuXHRcdFx0XHR3aGlsZSAoaW5kZXggPCBzb3VyY2UubGVuZ3RoKSB0YXJnZXQucHVzaChzb3VyY2Uuc2xpY2UoaW5kZXgsIGluZGV4ICs9IGxlbmd0aCkpO1xuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmcm9tWE1MKGVsZW0sIHJldml2ZXIpIHtcblx0XHRcdGxldCBvYmplY3Q7XG5cdFx0XHRzd2l0Y2ggKHR5cGVvZiBlbGVtKSB7XG5cdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxuXHRcdFx0XHRcdG9iamVjdCA9IGVsZW07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0XHQvL2RlZmF1bHQ6XG5cdFx0XHRcdFx0Y29uc3QgcmF3ID0gZWxlbS5yYXc7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGVsZW0ubmFtZTtcblx0XHRcdFx0XHRjb25zdCB0YWcgPSBlbGVtLnRhZztcblx0XHRcdFx0XHRjb25zdCBjaGlsZHJlbiA9IGVsZW0uY2hpbGRyZW47XG5cblx0XHRcdFx0XHRpZiAocmF3KSBvYmplY3QgPSByYXc7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodGFnKSBvYmplY3QgPSBwYXJzZUF0dHJpYnV0ZSh0YWcsIHJldml2ZXIpO1xuXHRcdFx0XHRcdGVsc2UgaWYgKCFjaGlsZHJlbikgb2JqZWN0ID0geyBbbmFtZV06IHVuZGVmaW5lZCB9O1xuXHRcdFx0XHRcdGVsc2Ugb2JqZWN0ID0ge307XG5cblx0XHRcdFx0XHRpZiAobmFtZSA9PT0gXCJwbGlzdFwiKSBvYmplY3QgPSBPYmplY3QuYXNzaWduKG9iamVjdCwgZnJvbVBsaXN0KGNoaWxkcmVuWzBdLCByZXZpdmVyKSk7XG5cdFx0XHRcdFx0ZWxzZSBjaGlsZHJlbj8uZm9yRWFjaD8uKChjaGlsZCwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJzdHJpbmdcIikgYWRkT2JqZWN0KG9iamVjdCwgQ0hJTERfTk9ERV9LRVksIGZyb21YTUwoY2hpbGQsIHJldml2ZXIpLCB1bmRlZmluZWQpXG5cdFx0XHRcdFx0XHRlbHNlIGlmICghY2hpbGQudGFnICYmICFjaGlsZC5jaGlsZHJlbiAmJiAhY2hpbGQucmF3KSBhZGRPYmplY3Qob2JqZWN0LCBjaGlsZC5uYW1lLCBmcm9tWE1MKGNoaWxkLCByZXZpdmVyKSwgY2hpbGRyZW4/LltpIC0gMV0/Lm5hbWUpXG5cdFx0XHRcdFx0XHRlbHNlIGFkZE9iamVjdChvYmplY3QsIGNoaWxkLm5hbWUsIGZyb21YTUwoY2hpbGQsIHJldml2ZXIpLCB1bmRlZmluZWQpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0aWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgYWRkT2JqZWN0KG9iamVjdCwgQ0hJTERfTk9ERV9LRVksIG51bGwsIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdGlmIChlbGVtLm5hbWUpIG9iamVjdFtlbGVtLm5hbWVdID0gKGVsZW0uaGFzQ2hpbGQgPT09IGZhbHNlKSA/IG51bGwgOiBcIlwiO1xuXHRcdFx0XHRcdFx0ZWxzZSBvYmplY3QgPSAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gbnVsbCA6IFwiXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCovXG5cblx0XHRcdFx0XHQvL2lmIChPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA9PT0gMCkgYWRkT2JqZWN0KG9iamVjdCwgZWxlbS5uYW1lLCAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gbnVsbCA6IFwiXCIpO1xuXHRcdFx0XHRcdC8vaWYgKE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID09PSAwKSBvYmplY3QgPSAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gdW5kZWZpbmVkIDogXCJcIjtcblx0XHRcdFx0XHRpZiAocmV2aXZlcikgb2JqZWN0ID0gcmV2aXZlcihuYW1lIHx8IFwiXCIsIG9iamVjdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2VBdHRyaWJ1dGUodGFnLCByZXZpdmVyKSB7XG5cdFx0XHRcdGlmICghdGFnKSByZXR1cm47XG5cdFx0XHRcdGNvbnN0IGxpc3QgPSB0YWcuc3BsaXQoLyhbXlxccz0nXCJdKyg/Olxccyo9XFxzKig/OidbXFxTXFxzXSo/J3xcIltcXFNcXHNdKj9cInxbXlxccydcIl0qKSk/KS8pO1xuXHRcdFx0XHRjb25zdCBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0bGV0IGF0dHJpYnV0ZXMsIHZhbDtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGV0IHN0ciA9IHJlbW92ZVNwYWNlcyhsaXN0W2ldKTtcblx0XHRcdFx0XHQvL2xldCBzdHIgPSByZW1vdmVCcmVha0xpbmUobGlzdFtpXSk7XG5cdFx0XHRcdFx0Ly9sZXQgc3RyID0gbGlzdFtpXT8udHJpbT8uKCk7XG5cdFx0XHRcdFx0aWYgKCFzdHIpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdFx0aWYgKCFhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVzID0ge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgcG9zID0gc3RyLmluZGV4T2YoXCI9XCIpO1xuXHRcdFx0XHRcdGlmIChwb3MgPCAwKSB7XG5cdFx0XHRcdFx0XHQvLyBiYXJlIGF0dHJpYnV0ZVxuXHRcdFx0XHRcdFx0c3RyID0gQVRUUklCVVRFX0tFWSArIHN0cjtcblx0XHRcdFx0XHRcdHZhbCA9IG51bGw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIGF0dHJpYnV0ZSBrZXkvdmFsdWUgcGFpclxuXHRcdFx0XHRcdFx0dmFsID0gc3RyLnN1YnN0cihwb3MgKyAxKS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuXHRcdFx0XHRcdFx0c3RyID0gQVRUUklCVVRFX0tFWSArIHN0ci5zdWJzdHIoMCwgcG9zKS5yZXBsYWNlKC9cXHMrJC8sIFwiXCIpO1xuXG5cdFx0XHRcdFx0XHQvLyBxdW90ZTogZm9vPVwiRk9PXCIgYmFyPSdCQVInXG5cdFx0XHRcdFx0XHRjb25zdCBmaXJzdENoYXIgPSB2YWxbMF07XG5cdFx0XHRcdFx0XHRjb25zdCBsYXN0Q2hhciA9IHZhbFt2YWwubGVuZ3RoIC0gMV07XG5cdFx0XHRcdFx0XHRpZiAoZmlyc3RDaGFyID09PSBsYXN0Q2hhciAmJiAoZmlyc3RDaGFyID09PSBcIidcIiB8fCBmaXJzdENoYXIgPT09ICdcIicpKSB7XG5cdFx0XHRcdFx0XHRcdHZhbCA9IHZhbC5zdWJzdHIoMSwgdmFsLmxlbmd0aCAtIDIpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YWwgPSB1bmVzY2FwZVhNTCh2YWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocmV2aXZlcikgdmFsID0gcmV2aXZlcihzdHIsIHZhbCk7XG5cblx0XHRcdFx0XHRhZGRPYmplY3QoYXR0cmlidXRlcywgc3RyLCB2YWwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGF0dHJpYnV0ZXM7XG5cblx0XHRcdFx0ZnVuY3Rpb24gcmVtb3ZlU3BhY2VzKHN0cikge1xuXHRcdFx0XHRcdC8vcmV0dXJuIHN0ciAmJiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdFx0XHRcdFx0cmV0dXJuIHN0cj8udHJpbT8uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYWRkT2JqZWN0KG9iamVjdCwga2V5LCB2YWwsIHByZXZLZXkgPSBrZXkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgcHJldiA9IG9iamVjdFtwcmV2S2V5XTtcblx0XHRcdFx0XHQvL2NvbnN0IGN1cnIgPSBvYmplY3Rba2V5XTtcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShwcmV2KSkgcHJldi5wdXNoKHZhbCk7XG5cdFx0XHRcdFx0ZWxzZSBpZiAocHJldikgb2JqZWN0W3ByZXZLZXldID0gW3ByZXYsIHZhbF07XG5cdFx0XHRcdFx0ZWxzZSBvYmplY3Rba2V5XSA9IHZhbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVuZXNjYXBlWE1MKHN0cikge1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC8oJig/Omx0fGd0fGFtcHxhcG9zfHF1b3R8Iyg/OlxcZHsxLDZ9fHhbMC05YS1mQS1GXXsxLDV9KSk7KS9nLCBmdW5jdGlvbiAoc3RyKSB7XG5cdFx0XHRcdGlmIChzdHJbMV0gPT09IFwiI1wiKSB7XG5cdFx0XHRcdFx0Y29uc3QgY29kZSA9IChzdHJbMl0gPT09IFwieFwiKSA/IHBhcnNlSW50KHN0ci5zdWJzdHIoMyksIDE2KSA6IHBhcnNlSW50KHN0ci5zdWJzdHIoMiksIDEwKTtcblx0XHRcdFx0XHRpZiAoY29kZSA+IC0xKSByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gVU5FU0NBUEVbc3RyXSB8fCBzdHI7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fTtcblxuXHRzdHJpbmdpZnkoanNvbiA9IG5ldyBPYmplY3QsIHRhYiA9IFwiXCIpIHtcblx0XHRjb25zdCBFU0NBUEUgPSB0aGlzLiNFU0NBUEU7XG5cdFx0Y29uc3QgQVRUUklCVVRFX0tFWSA9IHRoaXMuI0FUVFJJQlVURV9LRVk7XG5cdFx0Y29uc3QgQ0hJTERfTk9ERV9LRVkgPSB0aGlzLiNDSElMRF9OT0RFX0tFWTtcblx0XHRsZXQgWE1MID0gXCJcIjtcblx0XHRmb3IgKGxldCBlbGVtIGluIGpzb24pIFhNTCArPSB0b1htbChqc29uW2VsZW1dLCBlbGVtLCBcIlwiKTtcblx0XHRYTUwgPSB0YWIgPyBYTUwucmVwbGFjZSgvXFx0L2csIHRhYikgOiBYTUwucmVwbGFjZSgvXFx0fFxcbi9nLCBcIlwiKTtcblx0XHRyZXR1cm4gWE1MO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBGdWN0aW9ucyAqKioqKioqKioqKioqKioqKi9cblx0XHRmdW5jdGlvbiB0b1htbChFbGVtLCBOYW1lLCBJbmQpIHtcblx0XHRcdGxldCB4bWwgPSBcIlwiO1xuXHRcdFx0c3dpdGNoICh0eXBlb2YgRWxlbSkge1xuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoRWxlbSkpIHtcblx0XHRcdFx0XHRcdHhtbCA9IEVsZW0ucmVkdWNlKFxuXHRcdFx0XHRcdFx0XHQocHJldlhNTCwgY3VyclhNTCkgPT4gcHJldlhNTCArPSBgJHtJbmR9JHt0b1htbChjdXJyWE1MLCBOYW1lLCBgJHtJbmR9XFx0YCl9XFxuYCxcblx0XHRcdFx0XHRcdFx0XCJcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGV0IGF0dHJpYnV0ZSA9IFwiXCI7XG5cdFx0XHRcdFx0XHRsZXQgaGFzQ2hpbGQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGZvciAobGV0IG5hbWUgaW4gRWxlbSkge1xuXHRcdFx0XHRcdFx0XHRpZiAobmFtZVswXSA9PT0gQVRUUklCVVRFX0tFWSkge1xuXHRcdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZSArPSBgICR7bmFtZS5zdWJzdHJpbmcoMSl9PVxcXCIke0VsZW1bbmFtZV0udG9TdHJpbmcoKX1cXFwiYDtcblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgRWxlbVtuYW1lXTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChFbGVtW25hbWVdID09PSB1bmRlZmluZWQpIE5hbWUgPSBuYW1lO1xuXHRcdFx0XHRcdFx0XHRlbHNlIGhhc0NoaWxkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCR7TmFtZX0ke2F0dHJpYnV0ZX0keyhoYXNDaGlsZCB8fCBOYW1lID09PSBcImxpbmtcIikgPyBcIlwiIDogXCIvXCJ9PmA7XG5cblx0XHRcdFx0XHRcdGlmIChoYXNDaGlsZCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoTmFtZSA9PT0gXCJwbGlzdFwiKSB4bWwgKz0gdG9QbGlzdChFbGVtLCBOYW1lLCBgJHtJbmR9XFx0YCk7XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IG5hbWUgaW4gRWxlbSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ0hJTERfTk9ERV9LRVk6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0eG1sICs9IEVsZW1bbmFtZV0gPz8gXCJcIjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR4bWwgKz0gdG9YbWwoRWxlbVtuYW1lXSwgbmFtZSwgYCR7SW5kfVxcdGApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR4bWwgKz0gKHhtbC5zbGljZSgtMSkgPT09IFwiXFxuXCIgPyBJbmQgOiBcIlwiKSArIGA8LyR7TmFtZX0+YDtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdHN3aXRjaCAoTmFtZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcIj94bWxcIjpcblx0XHRcdFx0XHRcdFx0eG1sICs9IGAke0luZH08JHtOYW1lfSAke0VsZW0udG9TdHJpbmcoKX0+YDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiP1wiOlxuXHRcdFx0XHRcdFx0XHR4bWwgKz0gYCR7SW5kfTwke05hbWV9JHtFbGVtLnRvU3RyaW5nKCl9JHtOYW1lfT5gO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCIhXCI6XG5cdFx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCEtLSR7RWxlbS50b1N0cmluZygpfS0tPmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIiFET0NUWVBFXCI6XG5cdFx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCR7TmFtZX0gJHtFbGVtLnRvU3RyaW5nKCl9PmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIiFDREFUQVwiOlxuXHRcdFx0XHRcdFx0XHR4bWwgKz0gYCR7SW5kfTwhW0NEQVRBWyR7RWxlbS50b1N0cmluZygpfV1dPmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBDSElMRF9OT0RFX0tFWTpcblx0XHRcdFx0XHRcdFx0eG1sICs9IEVsZW07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0eG1sICs9IGAke0luZH08JHtOYW1lfT4ke0VsZW0udG9TdHJpbmcoKX08LyR7TmFtZX0+YDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxuXHRcdFx0XHRcdHhtbCArPSBJbmQgKyBgPCR7TmFtZS50b1N0cmluZygpfS8+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4geG1sO1xuXHRcdH07XG5cblx0XHRmdW5jdGlvbiB0b1BsaXN0KEVsZW0sIE5hbWUsIEluZCkge1xuXHRcdFx0bGV0IHBsaXN0ID0gXCJcIjtcblx0XHRcdHN3aXRjaCAodHlwZW9mIEVsZW0pIHtcblx0XHRcdFx0Y2FzZSBcImJvb2xlYW5cIjpcblx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08JHtFbGVtLnRvU3RyaW5nKCl9Lz5gO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwibnVtYmVyXCI6XG5cdFx0XHRcdFx0cGxpc3QgPSBgJHtJbmR9PHJlYWw+JHtFbGVtLnRvU3RyaW5nKCl9PC9yZWFsPmA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJiaWdpbnRcIjpcblx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08aW50ZWdlcj4ke0VsZW0udG9TdHJpbmcoKX08L2ludGVnZXI+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdHBsaXN0ID0gYCR7SW5kfTxzdHJpbmc+JHtFbGVtLnRvU3RyaW5nKCl9PC9zdHJpbmc+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0XHRcdGxldCBhcnJheSA9IFwiXCI7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoRWxlbSkpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwLCBuID0gRWxlbS5sZW5ndGg7IGkgPCBuOyBpKyspIGFycmF5ICs9IGAke0luZH0ke3RvUGxpc3QoRWxlbVtpXSwgTmFtZSwgYCR7SW5kfVxcdGApfWA7XG5cdFx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08YXJyYXk+JHthcnJheX0ke0luZH08L2FycmF5PmA7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxldCBkaWN0ID0gXCJcIjtcblx0XHRcdFx0XHRcdE9iamVjdC5lbnRyaWVzKEVsZW0pLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRkaWN0ICs9IGAke0luZH08a2V5PiR7a2V5fTwva2V5PmA7XG5cdFx0XHRcdFx0XHRcdGRpY3QgKz0gdG9QbGlzdCh2YWx1ZSwga2V5LCBJbmQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08ZGljdD4ke2RpY3R9JHtJbmR9PC9kaWN0PmA7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHJldHVybiBwbGlzdDtcblx0XHR9O1xuXHR9O1xufVxuIiwiLyoqXG4gKiBkZXRlY3QgRm9ybWF0XG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge09iamVjdH0gdXJsIC0gUGFyc2VkIFVSTFxuICogQHBhcmFtIHtTdHJpbmd9IGJvZHkgLSByZXNwb25zZSBib2R5XG4gKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdCAtIGZvcm1hdFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RGb3JtYXQodXJsLCBib2R5KSB7XG5cdGxldCBmb3JtYXQgPSB1bmRlZmluZWQ7XG5cdGNvbnNvbGUubG9nKGDimJHvuI8gZGV0ZWN0Rm9ybWF0LCBmb3JtYXQ6ICR7dXJsLmZvcm1hdCA/PyB1cmwucXVlcnk/LmZtdCA/PyB1cmwucXVlcnk/LmZvcm1hdH1gLCBcIlwiKTtcblx0c3dpdGNoICh1cmwuZm9ybWF0ID8/IHVybC5xdWVyeT8uZm10ID8/IHVybC5xdWVyeT8uZm9ybWF0KSB7XG5cdFx0Y2FzZSBcInR4dFwiOlxuXHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3BsYWluXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwieG1sXCI6XG5cdFx0Y2FzZSBcInNydjNcIjpcblx0XHRjYXNlIFwidHRtbFwiOlxuXHRcdGNhc2UgXCJ0dG1sMlwiOlxuXHRcdGNhc2UgXCJpbXNjXCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQveG1sXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwidnR0XCI6XG5cdFx0Y2FzZSBcIndlYnZ0dFwiOlxuXHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImpzb25cIjpcblx0XHRjYXNlIFwianNvbjNcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIm0zdVwiOlxuXHRcdGNhc2UgXCJtM3U4XCI6XG5cdFx0XHRmb3JtYXQgPSBcImFwcGxpY2F0aW9uL3gtbXBlZ3VybFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcInBsaXN0XCI6XG5cdFx0XHRmb3JtYXQgPSBcImFwcGxpY2F0aW9uL3BsaXN0XCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdGNvbnN0IEhFQURFUiA9IGJvZHk/LnN1YnN0cmluZz8uKDAsIDYpLnRyaW0/LigpO1xuXHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGRldGVjdEZvcm1hdCwgSEVBREVSOiAke0hFQURFUn1gLCBcIlwiKTtcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBkZXRlY3RGb3JtYXQsIEhFQURFUj8uc3Vic3RyaW5nPy4oMCwgMSk6ICR7SEVBREVSPy5zdWJzdHJpbmc/LigwLCAxKX1gLCBcIlwiKTtcblx0XHRcdHN3aXRjaCAoSEVBREVSKSB7XG5cdFx0XHRcdGNhc2UgXCI8P3htbFwiOlxuXHRcdFx0XHRcdGZvcm1hdCA9IFwidGV4dC94bWxcIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIldFQlZUVFwiOlxuXHRcdFx0XHRcdGZvcm1hdCA9IFwidGV4dC92dHRcIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRzd2l0Y2ggKEhFQURFUj8uc3Vic3RyaW5nPy4oMCwgMSkpIHtcblx0XHRcdFx0XHRcdGNhc2UgXCIwXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiMVwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjJcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCIzXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiNFwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjVcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI2XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiN1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjhcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI5XCI6XG5cdFx0XHRcdFx0XHRcdGZvcm1hdCA9IFwidGV4dC92dHRcIjtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwie1wiOlxuXHRcdFx0XHRcdFx0XHRmb3JtYXQgPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdGJyZWFrO1xuXHR9O1xuXHRjb25zb2xlLmxvZyhg4pyFIGRldGVjdEZvcm1hdCwgZm9ybWF0OiAke2Zvcm1hdH1gLCBcIlwiKTtcblx0cmV0dXJuIGZvcm1hdDtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RQbGF0Zm9ybSh1cmwpIHtcblx0Y29uc29sZS5sb2coYOKYke+4jyBEZXRlY3QgUGxhdGZvcm1gLCBcIlwiKTtcblx0LyoqKioqKioqKioqKioqKioqIFBsYXRmb3JtICoqKioqKioqKioqKioqKioqL1xuXHRsZXQgUGxhdGZvcm0gPSAvXFwuKG5ldGZsaXhcXC5jb218bmZseHZpZGVvXFwubmV0KS9pLnRlc3QodXJsKSA/IFwiTmV0ZmxpeFwiXG5cdFx0OiAvKFxcLnlvdXR1YmV8eW91dHViZWlcXC5nb29nbGVhcGlzKVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiWW91VHViZVwiXG5cdFx0XHQ6IC9cXC5zcG90aWZ5KGNkbik/XFwuY29tL2kudGVzdCh1cmwpID8gXCJTcG90aWZ5XCJcblx0XHRcdFx0OiAvXFwuYXBwbGVcXC5jb20vaS50ZXN0KHVybCkgPyBcIkFwcGxlXCJcblx0XHRcdFx0XHQ6IC9cXC4oZHNzb3R0fHN0YXJvdHQpXFwuY29tL2kudGVzdCh1cmwpID8gXCJEaXNuZXkrXCJcblx0XHRcdFx0XHRcdDogLyhcXC4ocHYtY2RufGFpdi1jZG58YWthbWFpaGR8Y2xvdWRmcm9udClcXC5uZXQpfHMzXFwuYW1hem9uYXdzXFwuY29tXFwvYWl2LXByb2QtdGltZWR0ZXh0XFwvL2kudGVzdCh1cmwpID8gXCJQcmltZVZpZGVvXCJcblx0XHRcdFx0XHRcdFx0OiAvcHJkXFwubWVkaWFcXC5oMjY0XFwuaW8vaS50ZXN0KHVybCkgPyBcIk1heFwiXG5cdFx0XHRcdFx0XHRcdFx0OiAvXFwuKGFwaVxcLmhib3xoYm9tYXhjZG4pXFwuY29tL2kudGVzdCh1cmwpID8gXCJIQk9NYXhcIlxuXHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwuKGh1bHVzdHJlYW18aHVsdWltKVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiSHVsdVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLihjYnNhYXZpZGVvfGNic2l2aWRlb3xjYnMpXFwuY29tL2kudGVzdCh1cmwpID8gXCJQYXJhbW91bnQrXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC51cGx5bmtcXC5jb20vaS50ZXN0KHVybCkgPyBcIkRpc2NvdmVyeStcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvZHBsdXMtcGgtL2kudGVzdCh1cmwpID8gXCJEaXNjb3ZlcnkrUGhcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC5wZWFjb2NrdHZcXC5jb20vaS50ZXN0KHVybCkgPyBcIlBlYWNvY2tUVlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwuZnVib1xcLnR2L2kudGVzdCh1cmwpID8gXCJGdWJvVFZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwudmlraVxcLmlvL2kudGVzdCh1cmwpID8gXCJWaWtpXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvKGVwaXhobHNcXC5ha2FtYWl6ZWRcXC5uZXR8ZXBpeFxcLnNlcnZpY2VzXFwuaW8pL2kudGVzdCh1cmwpID8gXCJNR00rXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC5uZWJ1bGFcXC5hcHB8L2kudGVzdCh1cmwpID8gXCJOZWJ1bGFcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiBcIlVuaXZlcnNhbFwiO1xuICAgIGNvbnNvbGUubG9nKGDinIUgRGV0ZWN0IFBsYXRmb3JtLCBQbGF0Zm9ybTogJHtQbGF0Zm9ybX1gLCBcIlwiKTtcblx0cmV0dXJuIFBsYXRmb3JtO1xufTtcbiIsIi8qXG5SRUFETUU6IGh0dHBzOi8vZ2l0aHViLmNvbS9EdWFsU3Vic1xuKi9cblxuaW1wb3J0IEVOVnMgZnJvbSBcIi4uL0VOVi9FTlYubWpzXCI7XG5jb25zdCAkID0gbmV3IEVOVnMoXCLwn42/77iPIER1YWxTdWJzOiBTZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzXCIpO1xuXG4vKipcbiAqIFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gUGVyc2lzdGVudCBTdG9yZSBLZXlcbiAqIEBwYXJhbSB7QXJyYXl9IHBsYXRmb3JtcyAtIFBsYXRmb3JtIE5hbWVzXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YWJhc2UgLSBEZWZhdWx0IERhdGFCYXNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldEVOVihuYW1lLCBwbGF0Zm9ybXMsIGRhdGFiYXNlKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9YCwgXCJcIik7XG5cdGxldCB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfSA9ICQuZ2V0RU5WKG5hbWUsIHBsYXRmb3JtcywgZGF0YWJhc2UpO1xuXHQvKioqKioqKioqKioqKioqKiogU2V0dGluZ3MgKioqKioqKioqKioqKioqKiovXG5cdGlmICghQXJyYXkuaXNBcnJheShTZXR0aW5ncz8uVHlwZXMpKSBTZXR0aW5ncy5UeXBlcyA9IChTZXR0aW5ncy5UeXBlcykgPyBbU2V0dGluZ3MuVHlwZXNdIDogW107IC8vIOWPquacieS4gOS4qumAiemhueaXtu+8jOaXoOmAl+WPt+WIhumalFxuXHRpZiAoJC5pc0xvb24oKSAmJiBwbGF0Zm9ybXMuaW5jbHVkZXMoXCJZb3VUdWJlXCIpKSB7XG5cdFx0U2V0dGluZ3MuQXV0b0NDID0gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKFwi6Ieq5Yqo5pi+56S657+76K+R5a2X5bmVXCIpID8/IFNldHRpbmdzLkF1dG9DQztcblx0XHRzd2l0Y2ggKFNldHRpbmdzLkF1dG9DQykge1xuXHRcdFx0Y2FzZSBcIuaYr1wiOlxuXHRcdFx0XHRTZXR0aW5ncy5BdXRvQ0MgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCLlkKZcIjpcblx0XHRcdFx0U2V0dGluZ3MuQXV0b0NDID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0XHRTZXR0aW5ncy5TaG93T25seSA9ICRwZXJzaXN0ZW50U3RvcmUucmVhZChcIuS7hei+k+WHuuivkeaWh1wiKSA/PyBTZXR0aW5ncy5TaG93T25seTtcblx0XHRzd2l0Y2ggKFNldHRpbmdzLlNob3dPbmx5KSB7XG5cdFx0XHRjYXNlIFwi5pivXCI6XG5cdFx0XHRcdFNldHRpbmdzLlNob3dPbmx5ID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwi5ZCmXCI6XG5cdFx0XHRcdFNldHRpbmdzLlNob3dPbmx5ID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0XHRTZXR0aW5ncy5Qb3NpdGlvbiA9ICRwZXJzaXN0ZW50U3RvcmUucmVhZChcIuWtl+W5leivkeaWh+S9jee9rlwiKSA/PyBTZXR0aW5ncy5Qb3NpdGlvbjtcblx0XHRzd2l0Y2ggKFNldHRpbmdzLlBvc2l0aW9uKSB7XG5cdFx0XHRjYXNlIFwi6K+R5paH5L2N5LqO5aSW5paH5LmL5LiKXCI6XG5cdFx0XHRcdFNldHRpbmdzLlBvc2l0aW9uID0gXCJGb3J3YXJkXCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIuivkeaWh+S9jeS6juWkluaWh+S5i+S4i1wiOlxuXHRcdFx0XHRTZXR0aW5ncy5Qb3NpdGlvbiA9IFwiUmV2ZXJzZVwiO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdH07XG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYFNldHRpbmdzOiAke3R5cGVvZiBTZXR0aW5nc31gLCBgU2V0dGluZ3PlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoU2V0dGluZ3MpfWAsIFwiXCIpO1xuXHQvKioqKioqKioqKioqKioqKiogQ2FjaGVzICoqKioqKioqKioqKioqKioqL1xuXHQvLyQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYENhY2hlczogJHt0eXBlb2YgQ2FjaGVzfWAsIGBDYWNoZXPlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQ2FjaGVzKX1gLCBcIlwiKTtcblx0aWYgKHR5cGVvZiBDYWNoZXM/LlBsYXlsaXN0cyAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KENhY2hlcz8uUGxheWxpc3RzKSkgQ2FjaGVzLlBsYXlsaXN0cyA9IHt9OyAvLyDliJvlu7pQbGF5bGlzdHPnvJPlrZhcblx0Q2FjaGVzLlBsYXlsaXN0cy5NYXN0ZXIgPSBuZXcgTWFwKEpTT04ucGFyc2UoQ2FjaGVzPy5QbGF5bGlzdHM/Lk1hc3RlciB8fCBcIltdXCIpKTsgLy8gU3RyaW5nc+i9rEFycmF56L2sTWFwXG5cdENhY2hlcy5QbGF5bGlzdHMuU3VidGl0bGUgPSBuZXcgTWFwKEpTT04ucGFyc2UoQ2FjaGVzPy5QbGF5bGlzdHM/LlN1YnRpdGxlIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0aWYgKHR5cGVvZiBDYWNoZXM/LlN1YnRpdGxlcyAhPT0gXCJvYmplY3RcIikgQ2FjaGVzLlN1YnRpdGxlcyA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/LlN1YnRpdGxlcyB8fCBcIltdXCIpKTsgLy8gU3RyaW5nc+i9rEFycmF56L2sTWFwXG5cdGlmICh0eXBlb2YgQ2FjaGVzPy5NZXRhZGF0YXMgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShDYWNoZXM/Lk1ldGFkYXRhcykpIENhY2hlcy5NZXRhZGF0YXMgPSB7fTsgLy8g5Yib5bu6UGxheWxpc3Rz57yT5a2YXG5cdGlmICh0eXBlb2YgQ2FjaGVzPy5NZXRhZGF0YXM/LlRyYWNrcyAhPT0gXCJvYmplY3RcIikgQ2FjaGVzLk1ldGFkYXRhcy5UcmFja3MgPSBuZXcgTWFwKEpTT04ucGFyc2UoQ2FjaGVzPy5NZXRhZGF0YXM/LlRyYWNrcyB8fCBcIltdXCIpKTsgLy8gU3RyaW5nc+i9rEFycmF56L2sTWFwXG5cdC8qKioqKioqKioqKioqKioqKiBDb25maWdzICoqKioqKioqKioqKioqKioqL1xuXHRyZXR1cm4geyBTZXR0aW5ncywgQ2FjaGVzLCBDb25maWdzIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvU3VidGl0bGVzLlRyYW5zbGF0ZS5yZXNwb25zZS5iZXRhLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9