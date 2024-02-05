import ENVs from "./ENV/ENV.mjs";
import URIs from "./URI/URI.mjs";
import XMLs from "./XML/XML.mjs";
import WebVTT from "./WebVTT/WebVTT.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import detectFormat from "./function/detectFormat.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import setCache from "./function/setCache.mjs";

import { TextEncoder , TextDecoder } from "./text-encoding/index.js";
import { WireType, UnknownFieldHandler, reflectionMergePartial, MESSAGE_TYPE, MessageType, BinaryReader, isJsonObject, typeofJsonValue, jsonWriteOptions } from "../node_modules/@protobuf-ts/runtime/build/es2015/index.js";

const $ = new ENVs("🍿️ DualSubs: 🔣 Universal v1.2.7(5) Translate.response");
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
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = detectFormat(URL, $response?.body);
$.log(`⚠ ${$.name}, FORMAT: ${FORMAT}`, "");
(async () => {
	// 获取平台
	const PLATFORM = detectPlatform($request.url);
	$.log(`⚠ ${$.name}, PLATFORM: ${PLATFORM}`, "");
	// 读取设置
	const { Settings, Caches, Configs } = setENV($, "DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Translate", "API"], Database);
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
				case "application/octet-stream":
					let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
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
						case "application/octet-stream":
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
		await $.fetch(request)
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
