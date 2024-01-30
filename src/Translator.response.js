/*
README: https://github.com/DualSubs
*/

import ENVs from "./ENV/ENV.mjs";
import URIs from "./URI/URI.mjs";
import XMLs from "./XML/XML.mjs";
import WebVTT from "./WebVTT/WebVTT.mjs";

import setENV from "./function/setENV.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import detectFormat from "./function/detectFormat.mjs";
import { TextEncoder , TextDecoder } from "./text-encoding/index.js";

import * as Database from "./database/Database.json";

const $ = new ENVs("🍿️ DualSubs: 🔣 Universal v1.2.6(3) Translator.response");
const URI = new URIs();
const XML = new XMLs();
const VTT = new WebVTT(["milliseconds", "timeStamp", "singleLine", "\n"]); // "multiLine"

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ ${$.name}`, `URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, "");
// 获取平台
const PLATFORM = detectPlatform(HOST);
$.log(`⚠ ${$.name}, PLATFORM: ${PLATFORM}`, "");
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = detectFormat(URL, $response?.body);
$.log(`⚠ ${$.name}, FORMAT: ${FORMAT}`, "");
(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Translate", "API"], Database);
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
					break;
				case "text/xml":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist": {
					body = XML.parse($response.body);
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
						return para;
					});
					const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
					paragraph = paragraph.map((para, i) => {
						const span = para?.span ?? para;
						if (Array.isArray(span)) translation?.[i]?.split(breakLine).forEach((text, j) => {
							if (span[j]?.["#"]) span[j]["#"] = combineText(span[j]["#"], text, Settings?.ShowOnly, Settings?.Position, ' ');
						});
						else if (span?.["#"]) span["#"] = combineText(span["#"], translation?.[i], Settings?.ShowOnly, Settings?.Position, breakLine);
						return para;
					});
					$response.body = XML.stringify(body);
					break;
				};
				case "text/vtt":
				case "application/vtt": {
					body = VTT.parse($response.body);
					let fullText = body?.body.map(item => (item?.text ?? "\u200b")?.replace(/<\/?[^<>]+>/g, ""));
					const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
					body.body = body.body.map((item, i) => {
						item.text = combineText(item?.text ?? "\u200b", translation?.[i], Settings?.ShowOnly, Settings?.Position);
						return item
					});
					$response.body = VTT.stringify(body);
					break;
				};
				case "text/json":
				case "application/json": {
					body = JSON.parse($response.body ?? "{}");
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
							switch ($request?.headers?.["app-platform"] ?? $request?.headers?.["App-Platform"]) {
								case "OSX": // macOS App 暂不支持翻译功能
								case "Win32_x86_64": // Windows App 暂不支持翻译功能	
								case "WebPlayer": // Web App
								case undefined:
								default:
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
					$response.body = JSON.stringify(body);
					break;
				};
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "applecation/octet-stream":
					let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					/******************  initialization start  *******************/
					// timostamm/protobuf-ts 2.9.0
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
												{ no: 9, name: "contents", kind: "message", T: () => Contents },
												{ no: 10, name: "continuationContents", kind: "message", T: () => Contents }
											]);
										}
									}
									const Browse = new Browse$Type();
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
									class Runs$Type extends MessageType {
										constructor() {
											super("Runs", [
												{ no: 1, name: "text", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const Runs = new Runs$Type();
									/******************  initialization finish  *******************/
									body = Browse.fromBinary(rawBody);
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
									Languages[0] = (body?.lyrics?.language === "z1") ? "ZH-HANT"
										: (body?.lyrics?.language) ? body?.lyrics?.language.toUpperCase()
										: "AUTO";
									let fullText = body.lyrics.lines.map(line => line?.words ?? "\u200b");
									const translation = await Translate(fullText, Settings?.Method, Settings?.Vendor, Languages[0], Languages[1], Settings?.[Settings?.Vendor], Configs?.Languages, Settings?.Times, Settings?.Interval, Settings?.Exponential);
									if (!body?.lyrics?.alternatives) body.lyrics.alternatives = [];
									body.lyrics.alternatives.unshift({
										"language": Languages[1].toLowerCase(),
										"lines": translation
									});
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
					"User-Agent": "DualSubs",
					"Content-Type": "application/json",
					"Authorization": `DeepL-Auth-Key ${api?.Token ?? api?.Auth}`
				};
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
