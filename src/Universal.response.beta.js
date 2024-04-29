import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";
import URI from "./URL/URI.mjs";
import XML from "./XML/XML.mjs";
import VTT from "./WebVTT/WebVTT.mjs";
import LRC from "./LRC/LRC.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import detectFormat from "./function/detectFormat.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import setCache from "./function/setCache.mjs";
import constructSubtitlesQueue from "./function/constructSubtitlesQueue.mjs";
import Composite from "./function/Composite.mjs";
import Translates from "./function/Translate.mjs";

import { TextEncoder , TextDecoder } from "./text-encoding/index.js";
import { WireType, UnknownFieldHandler, reflectionMergePartial, MESSAGE_TYPE, MessageType, BinaryReader, isJsonObject, typeofJsonValue, jsonWriteOptions } from "@protobuf-ts/runtime/build/es2015/index.js";

const $ = new ENV("🍿️ DualSubs: 🔣 Universal v1.0.0(1006) response.beta");
const Translate = new Translates($);

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname, PATHs = url.pathname.split("/").filter(Boolean);
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"] ?? $request.headers?.Accept ?? $request.headers?.accept)?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = detectFormat(URL, $response?.body, $.isQuanX() ? FORMAT : undefined);
$.log(`⚠ FORMAT: ${FORMAT}`, "");
(async () => {
	// 获取平台
	const PLATFORM = detectPlatform($request.url);
	$.log(`⚠ PLATFORM: ${PLATFORM}`, "");
	// 获取字幕类型
	const TYPE = URL.query?.subtype ?? "Translate"
	$.log(`⚠ TYPE: ${TYPE}`, "");
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", TYPE, "API"], Database);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕语言
			const Type = url.searchParams?.get("subtype") ?? Settings.Type, Languages = [url.searchParams?.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams?.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ Languages: ${Languages}`, "");
			// 创建空数据
			let body = {};
			// 创建字幕请求队列
			let requests = [];
			// 处理类型
			switch (TYPE) {
				case "Official":
					$.log(`⚠ 官方字幕`, "");
					switch (PLATFORM) {
						default:
							// 获取字幕文件地址vtt缓存（map）
							const { subtitlesPlaylistURL } = getSubtitlesCache($request.url, Caches.Playlists.Subtitle, Languages);
							// 获取字幕播放列表m3u8缓存（map）
							const { masterPlaylistURL, subtitlesPlaylistIndex } = getPlaylistCache(subtitlesPlaylistURL, Caches.Playlists.Master, Languages);
							// 获取字幕文件地址vtt缓存（map）
							const { subtitlesURIArray0, subtitlesURIArray1 } = getSubtitlesArray(masterPlaylistURL, subtitlesPlaylistIndex, Caches.Playlists.Master, Caches.Playlists.Subtitle, Languages);
							// 获取官方字幕请求
							if (subtitlesURIArray1.length) {
								$.log(`🚧 subtitlesURIArray1.length: ${subtitlesURIArray1.length}`, "");
								// 获取字幕文件名
								let fileName = PATHs?.[PATHs?.length - 1] ?? getSubtitlesFileName($request.url, PLATFORM);
								$.log(`🚧 fileName: ${fileName}`, "")
								// 构造请求队列
								requests = constructSubtitlesQueue($request, fileName, subtitlesURIArray0, subtitlesURIArray1);
							};
							break;
						case "YouTube":
							$.log(`⚠ YouTube`, "");
							switch (URL.query?.tlang) {
								case undefined:
									$.log(`⚠ 未选择翻译语言，跳过`, "");
									break;
								default:
									$.log(`⚠ 已选择翻译语言`, "");
									// 设置参数
									// Settings.Offset = 0;
									Settings.Tolerance = 100;
									Settings.Position = (Settings.Position === "Reverse") ? "Forward" : "Reverse"; // 链接主字幕为翻译字幕，副字幕为原字幕，所以需要翻转一下
									switch (Settings.ShowOnly) {
										case true:
											$.log(`⚠ 仅显示翻译后字幕，跳过`, "");
											break;
										case false:
										default:
											$.log(`⚠ 生成双语字幕`, "");
											// 获取字幕
											URL.query.lang = Caches.Playlists.Subtitle.get(URL.query?.v) ?? URL.query.lang; // 主语言
											delete URL.query?.tlang // 原字幕
											let request = {
												"url": URI.stringify(URL),
												"headers": $request.headers
											};
											requests.push(request);
											break;
									};
							};
							break;
						case "Netflix":
							$.log(`⚠ Netflix`, "");
							break;
						case "Bilibili":
							$.log(`⚠ Bilibili`, "");
							break;
					};
					break;
				case "Translate":
				default:
					$.log(`⚠ 翻译字幕`, "");
					break;
				case "External":
					$.log(`⚠ 外挂字幕`, "");
					switch (Settings.SubVendor) {
						case "URL":
							let request = {
								"url": Settings.URL,
								"headers": {
									"Accept": "*/*",
									"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1"
								}
							};
							requests.push(request);
							break;
					};
					break;
			};
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
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist": {
					body = XML.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					switch (TYPE) {
						case "Official":
						case "External":
							await Promise.all(requests.map(async request => {
								let officialSubtitle = await $.fetch(request).then(response => XML.parse(response.body));
								body = Composite(body, officialSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
							}));
							break;
						case "Translate":
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
							const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
							paragraph = paragraph.map((para, i) => {
								const span = para?.span ?? para;
								if (Array.isArray(span)) translation?.[i]?.split(breakLine).forEach((text, j) => {
									if (span[j]?.["#"]) span[j]["#"] = combineText(span[j]["#"], text, Settings?.ShowOnly, Settings?.Position, ' ');
									//else if (span[j + 1]?.["#"]) span[j + 1]["#"] = combineText(span[j + 1]["#"], text, Settings?.ShowOnly, Settings?.Position, ' ');
								});
								else if (span?.["#"]) span["#"] = combineText(span["#"], translation?.[i], Settings?.ShowOnly, Settings?.Position, breakLine);
								return para;
							});
							break;
					};
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					$response.body = XML.stringify(body);
					break;
				};
				case "text/vtt":
				case "application/vtt": {
					body = VTT.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					switch (TYPE) {
						case "Official":
						case "External":
							await Promise.all(requests.map(async request => {
								let officialSubtitle = await $.fetch(request).then(response => VTT.parse(response.body));
								body = Composite(body, officialSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
							}));
							break;
						case "Translate":
							let fullText = body?.body.map(item => (item?.text ?? "\u200b")?.replace(/<\/?[^<>]+>/g, ""));
							const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
							body.body = body.body.map((item, i) => {
								item.text = combineText(item?.text ?? "\u200b", translation?.[i], Settings?.ShowOnly, Settings?.Position);
								return item
							});
							break;
					};
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					$response.body = VTT.stringify(body);
					break;
				};
				case "text/json":
				case "application/json": {
					body = JSON.parse($response.body ?? "{}");
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					switch (PLATFORM) {
						case "YouTube": {
							switch (TYPE) {
								case "Official":
									await Promise.all(requests.map(async request => {
										let officialSubtitle = await $.fetch(request).then(response => JSON.parse(response.body));
										body = Composite(body, officialSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
									}));
									break;
								case "Translate":
									if (body?.events) {
										let fullText = [];
										body.events = body.events.map(event => {
											if (event?.segs?.[0]?.utf8) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join("") }];
											fullText.push(event?.segs?.[0]?.utf8 ?? "\u200b");
											delete event.wWinId;
											return event;
										});
										const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
													const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
													fullText = fullText.map((line, i) => { if (line) return combineText(line, translation?.[i], Settings?.ShowOnly, Settings?.Position, "\n  └ ") });
													run.text = fullText.join("\n");
													return run;
												}));
											};
											return musicDescription;
										}));
									};
									break;
								case "External":
									break;
							};
						};
							break;
						case "Spotify": {
							switch (TYPE) {
								case "Official":
									break;
								case "Translate":
									Languages[0] = (body?.lyrics?.language === "z1") ? "ZH-HANT"
										: (body?.lyrics?.language) ? body?.lyrics?.language.toUpperCase()
											: "AUTO";
									let fullText = body.lyrics.lines.map(line => line?.words ?? "\u200b");
									const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
									$.log(`🚧 $request.headers["app-platform"]: ${$request?.headers?.["app-platform"]}`, "");
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
													"syllables": line?.syllables ?? [],
													"endTimeMs": "0"
												};
												let line2 = {
													"startTimeMs": line.startTimeMs.toString(),
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
								case "External":
									body = await injectionLyric(Settings.LrcVendor, trackInfo, body, PLATFORM);
									if (!$response?.headers?.["Content-Type"] && $response?.headers?.["content-type"]) $response.headers["Content-Type"] = FORMAT;
									$response.status = ($.isQuanX()) ? "HTTP/1.1 200 OK" : 200;
									break;
							};
							break;
						};
					};
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					$response.body = JSON.stringify(body);
					break;
				};
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
					//$.log(`🚧 $response.body: ${JSON.stringify($response.body)}`, "");
					let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					//$.log(`🚧 isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
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
									//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
									$.log(`🚧 contents: ${JSON.stringify(body?.contents)}`, "");
									$.log(`🚧 continuationContents: ${JSON.stringify(body?.continuationContents)}`, "");
									let UF = UnknownFieldHandler.list(body);
									//$.log(`🚧 UF: ${JSON.stringify(UF)}`, "");
									if (UF) {
										UF = UF.map(uf => {
											//uf.no; // 22
											//uf.wireType; // WireType.Varint
											// use the binary reader to decode the raw data:
											let reader = new BinaryReader(uf.data);
											let addedNumber = reader.int32(); // 7777
											$.log(`🚧 no: ${uf.no}, wireType: ${uf.wireType}, reader: ${reader}, addedNumber: ${addedNumber}`, "");
										});
									};
									switch (TYPE) {
										case "Official":
											break;
										case "Translate":
											if (body?.contents?.n6F153515154?.n7F172660663?.n8F1?.n9F168777401?.n10F5?.n11F465160965?.n12F4?.n13F1) {
												let fullText = body.contents.n6F153515154.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1.map(line => line?.f1 ?? "\u200b");
												const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
															const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
															fullText = fullText.map((line, i) => { if (line) return combineText(line, translation?.[i], Settings?.ShowOnly, Settings?.Position, "\n  └ ") });
															run.text = fullText.join("\n");
															return run;
														}));
													};
													return musicDescription;
												}));
											};
											break;
										case "External":
											break;
									};
									//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
									//$.log(`🚧 contents: ${JSON.stringify(body?.contents)}`, "");
									//$.log(`🚧 continuationContents: ${JSON.stringify(body?.continuationContents)}`, "");
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
									$.log(`🚧 body: ${JSON.stringify(body)}`, "");
									/*
									let UF = UnknownFieldHandler.list(body);
									$.log(`🚧 UF: ${JSON.stringify(UF)}`, "");
									if (UF) {
										UF = UF.map(uf => {
											//uf.no; // 22
											//uf.wireType; // WireType.Varint
											// use the binary reader to decode the raw data:
											let reader = new BinaryReader(uf.data);
											let addedNumber = reader.int32(); // 7777
											$.log(`🚧 no: ${uf.no}, wireType: ${uf.wireType}, reader: ${reader}, addedNumber: ${addedNumber}`, "");
										});
									};
									*/
									switch (TYPE) {
										case "Official":
											break;
										case "Translate":
											Languages[0] = (body?.lyrics?.language === "z1") ? "ZH-HANT"
												: (body?.lyrics?.language) ? body?.lyrics?.language.toUpperCase()
													: "AUTO";
											let fullText = body.lyrics.lines.map(line => line?.words ?? "\u200b");
											const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
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
											break;
										case "External":
											body = await injectionLyric(Settings.LrcVendor, trackInfo, body, PLATFORM);
											//body.lyrics = await injectionLyric(Settings.LrcVendor, trackInfo, body, PLATFORM).then(body => body.lyrics);
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
											break;
									};
									$.log(`🚧 body: ${JSON.stringify(body)}`, "");
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
					$response.body = rawBody;
					break;
			};
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done($response))

/***************** Function *****************/
/**
 * Get Playlist Cache
 * @author VirgilClyne
 * @param {String} url - Request URL / Master Playlist URL
 * @param {Map} cache - Playlist Cache
 * @param {Array} languages - Languages
 * @return {Promise<Object>} { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex }
 */
function getPlaylistCache(url, cache, languages) {
	$.log(`☑️ getPlaylistCache`, "");
	let masterPlaylistURL = "";
	let subtitlesPlaylist = {};
	let subtitlesPlaylistIndex = 0;
	cache?.forEach((Value, Key) => {
		languages?.forEach(language => {
			if (Array.isArray(Value?.[language])) {
				let Array = Value?.[language];
				if (Array?.some((Object, Index) => {
					if (url.includes(Object?.URI || Object?.OPTION?.URI || null)) {
						subtitlesPlaylistIndex = Index;
						$.log(`🚧 getPlaylistCache`, `subtitlesPlaylistIndex: ${subtitlesPlaylistIndex}`, "");
						return true;
					} else return false;
				})) {
					masterPlaylistURL = Key;
					subtitlesPlaylist = Value;
					//$.log(`🚧 getPlaylistCache`, `masterPlaylistURL: ${masterPlaylistURL}`, `subtitlesPlaylist: ${JSON.stringify(subtitlesPlaylist)}`, "");
				};
			};
		});
	});
	$.log(`✅ getPlaylistCache`, `masterPlaylistURL: ${JSON.stringify(masterPlaylistURL)}`, "");
	return { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex };
};

/**
 * Get Subtitles Cache
 * @author VirgilClyne
 * @param {String} url - Request URL / Subtitles URL
 * @param {Map} cache - Subtitles Cache
 * @param {Array} languages - Languages
 * @return {Promise<Object>} { subtitlesPlaylistURL, subtitles, subtitlesIndex }
 */
function getSubtitlesCache(url, cache, languages) {
	$.log(`☑️ getSubtitlesCache`, "");
	let subtitlesPlaylistURL = "";
	let subtitles = [];
	let subtitlesIndex = 0;
	cache?.forEach((Value, Key) => {
		if (Array.isArray(Value)) {
			let Array = Value;
			if (Array?.some((String, Index) => {
				if (url.includes(String || null)) {
					subtitlesIndex = Index;
					$.log(`🚧 getSubtitlesCache`, `subtitlesIndex: ${subtitlesIndex}`, "");
					return true;
				} else return false;
			})) {
				subtitlesPlaylistURL = Key;
				subtitles = Value;
				//$.log(`🚧 getSubtitlesCache, subtitlesPlaylistURL: ${subtitlesPlaylistURL}`, "");
			};
		};
	});
	$.log(`✅ getSubtitlesCache, subtitlesPlaylistURL: ${subtitlesPlaylistURL}`, "");
	return { subtitlesPlaylistURL, subtitles, subtitlesIndex };
};

/**
 * Get Subtitles Array
 * @author VirgilClyne
 * @param {String} url - Request URL / Master Playlist URL
 * @param {Number} index - Subtitles Playlist Index
 * @param {Map} playlistsCache - Playlists Cache
 * @param {Map} subtitlesCache - Subtitles Cache
 * @param {Array} languages - Languages
 * @return {Promise<Object>} { subtitlesURIArray0, subtitlesURIArray1 }
 */
function getSubtitlesArray(url, index, playlistsCache, subtitlesCache, languages) {
	$.log(`☑️ getSubtitlesArray`, "");
	const subtitlesPlaylistValue = playlistsCache?.get(url) || {};
	let subtitlesPlaylistURL0 = subtitlesPlaylistValue?.[languages[0]]?.[index]?.URL || subtitlesPlaylistValue?.[languages[0]]?.[0]?.URL;
	let subtitlesPlaylistURL1 = subtitlesPlaylistValue?.[languages[1]]?.[index]?.URL || subtitlesPlaylistValue?.[languages[1]]?.[0]?.URL;
	$.log(`🚧 getSubtitlesArray`, `subtitlesPlaylistURL0: ${subtitlesPlaylistURL0}, subtitlesPlaylistURL1: ${subtitlesPlaylistURL1}`, "");
	// 查找字幕文件地址vtt缓存（map）
	let subtitlesURIArray0 = subtitlesCache.get(subtitlesPlaylistURL0) || [];
	let subtitlesURIArray1 = subtitlesCache.get(subtitlesPlaylistURL1) || [];
	//$.log(`🚧 getSubtitlesArray`, `subtitlesURIArray0: ${JSON.stringify(subtitlesURIArray0)}, subtitlesURIArray1: ${JSON.stringify(subtitlesURIArray1)}`, "");
	$.log(`✅ getSubtitlesArray`, "");
	return { subtitlesURIArray0, subtitlesURIArray1 };
};

/**
 * Get Subtitles FileName
 * @author VirgilClyne
 * @param {String} url - Request URL / Subtitles URL
 * @param {String} platform - Platform Name
 * @return {String<*>} fileName
 */
function getSubtitlesFileName(url, platform) {
	$.log(`☑️ Get Subtitles FileName`, `url: ${url}`, "");
	let fileName = undefined;
	switch (platform) {
		case "Apple":
			fileName = request.url.match(/.+_(subtitles(_V\d)?-\d+\.webvtt)\?(.*)subtype=/)[1]; // Apple 片段分型序号不同
			break;
		case "Disney+":
			fileName = request.url.match(/([^\/]+\.vtt)\?(.*)subtype=/)[1]; // Disney+ 片段名称相同
			break;
		case "Hulu":
			fileName = request.url.match(/.+_(SEGMENT\d+_.+\.vtt)\?(.*)subtype=/)[1]; // Hulu 片段分型序号相同
			break;
		case "PrimeVideo":
		case "HBOMax":
		default:
			fileName = null; // Amazon Prime Video HBO_Max不拆分字幕片段
			break;
	};
	$.log(`✅ Get Subtitles FileName`, `fileName: ${fileName}`, "");
	return fileName;
};
/**
 * Translator
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
async function Translator(vendor = "Google", method = "Part", text = [], [source = "AUTO", target = "ZH"], API = {}, times = 3, interval = 100, exponential = true) {
	$.log(`☑️ Translator, vendor: ${vendor}, method: ${method}, [source, target]: ${[source, target]}`, "");
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
			Translation = await Promise.all(parts.map(async part => await retry(() => Translate[vendor](part, source, target, API), times, interval, exponential))).then(part => part.flat(Infinity));
			break;
		case "Row": // Row 逐行翻译
			Translation = await Promise.all(text.map(async row => await retry(() => Translate[vendor](row, source, target, API), times, interval, exponential)));
			break;
	};
	//$.log(`✅ Translator, Translation: ${JSON.stringify(Translation)}`, "");
	$.log(`✅ Translator`, "");
	return Translation;
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
	$.log(`⚠ Chunk Array`, "");
    var index = 0, target = [];
    while(index < source.length) target.push(source.slice(index, index += length));
	//$.log(`🎉 Chunk Array`, `target: ${JSON.stringify(target)}`, "");
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
	$.log(`☑️ retry, 剩余重试次数:${retriesLeft}`, `时间间隔:${interval}ms`);
	try {
		const val = await fn();
		return val;
	} catch (error) {
		if (retriesLeft) {
			await new Promise(r => setTimeout(r, interval));
			return retry(fn, retriesLeft - 1, exponential ? interval * 2 : interval, exponential);
		} else throw new Error(`❌ retry, 最大重试次数`);
	}
};
async function injectionLyric(vendor = "NeteaseMusic", trackInfo = {}, body = $response.body, platform) {
	$.log(`☑️ Injection Lyric`, `vendor: ${vendor}, trackInfo: ${JSON.stringify(trackInfo)}`, "");
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
	let duolyric = undefined;
	// 构建歌词结构
	if (!body) body = {};
	// 查询&提取
	switch (vendor) {
		case "NeteaseMusic":
		case "NeteaseMusicNodeJS":
		default:
			if (!trackInfo?.NeteaseMusic?.id) trackInfo.NeteaseMusic = await searchTrack(vendor, `${trackInfo.track} ${trackInfo.artist}`, UAPool);
			if (trackInfo?.NeteaseMusic?.id) externalLyric = await searchLyric(vendor, trackInfo.NeteaseMusic.id, UAPool);
			break;
		case "QQMusic":
			if (!trackInfo?.QQMusic?.mid) trackInfo.QQMusic = await searchTrack(vendor, `${trackInfo.track} ${trackInfo.artist}`, UAPool);
			if (trackInfo?.QQMusic?.mid) externalLyric = await searchLyric(vendor, trackInfo.QQMusic.mid, UAPool);
			break;
	};
	// 按平台填充歌词
	switch (platform) {
		case "Spotify":
			// 初始化面板信息
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
			// 填充面板信息
			switch (vendor) {
				case "NeteaseMusicNodeJS":
				case "NeteaseMusic":
					body.lyrics.provider = "NeteaseMusic";
					body.lyrics.providerLyricsId = trackInfo?.NeteaseMusic?.id?.toString?.();
					body.lyrics.providerDisplayName = `网易云音乐 - ${externalLyric?.lyricUser ?? "未知"}`;
					body.colors.background = -8249806; // 网易红 8527410 #821E32 rgb(130,30,50)
					//body.colors.background = -55775; // 网易红 16721441 #FF2621 rgb(255,38,33)
					$.log(`🚧 body.lyrics.lines: ${JSON.stringify(body.lyrics.lines)}`, "");
					break
				case "QQMusic":
				default:
					body.lyrics.provider = "QQMusic";
					body.lyrics.providerLyricsId = trackInfo?.QQMusic?.mid?.toString?.();
					body.lyrics.providerDisplayName = `QQ音乐 - ${externalLyric?.lyricUser ?? "未知"}`;
					body.colors.background = -11038189; // QQ音乐绿 5739027 #579213 rgb(87,146,19)
					$.log(`🚧 body.lyrics.lines: ${JSON.stringify(body.lyrics.lines)}`, "");
					break
			};
			// 填充逐字或逐句歌词
			if (externalLyric?.klyric) {
				body.lyrics.syncType = "SYLLABLE_SYNCED";
				body.lyrics.lines = LRC.toSpotify(externalLyric.klyric);
			} else if (externalLyric?.lyric) {
				body.lyrics.syncType = "LINE_SYNCED";
				body.lyrics.lines = LRC.toSpotify(externalLyric.lyric);
			};
			// 填充翻译歌词
			if (externalLyric?.tlyric) {
				transLyric = LRC.toSpotify(externalLyric.tlyric);
				duolyric = LRC.combineSpotify(body.lyrics.lines, transLyric);
				switch ($request?.headers?.["app-platform"] ?? $request?.headers?.["App-Platform"]) {
					case "OSX": // macOS App 暂不支持翻译功能
					case "Win32_x86_64": // Windows App 暂不支持翻译功能
					case "WebPlayer": // Web App
					case undefined:
					default:
						/*
						if (duolyric) body.lyrics.lines = body.lyrics.lines.map((line, i) => {
							if (line?.words) line.words = combineText(line.words, duolyric?.[i]?.twords ?? "♪");
							return line;
						});
						*/
						if (duolyric) body.lyrics.lines = LRC.separateSpotify(duolyric).map(line => {
							line.startTimeMs = line.startTimeMs.toString();
							line.endTimeMs = line.endTimeMs.toString();
							return line;
						});
					//break; 不中断，继续处理
					case "iOS":
						if (duolyric) body.lyrics.alternatives.unshift({
							"language": "zh",
							"lines": duolyric.map(line => line?.twords ?? "")
						});
						break;
				};
			};
			break;
		case "YouTube":
			break;
	};
	$.log(`✅ Injection Lyric`, "");
	$.log(`🚧 Injection Lyric`, `body: ${JSON.stringify(body)}`, "");
	return body;
};

async function searchTrack(vendor = "NeteaseMusic", keyword = "", UAPool = []){
	$.log(`☑️ Search Track`, `vendor: ${vendor}, keyword: ${keyword}`, "");
	const Request = {
		"headers": {
			"Accept": "application/json",
			"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)], // 随机UA
		}
	};
	const trackInfo = {};
	switch (vendor) {
		case "NeteaseMusic": {
			const searchUrl = {
				"scheme": "https",
				"host": "music.163.com",
				"path": "api/cloudsearch/pc",
				"query": {
					"type": 1,
					"limit": 1,
					"offset": 0,
					"s": encodeURIComponent(keyword),
				}
			};
			$.log(`🚧 searchUrl: ${JSON.stringify(searchUrl)}`, "");
			Request.url = URI.stringify(searchUrl);
			Request.headers.Referer = "https://music.163.com";
			Request.headers.Cookie = "os=ios; __remember_me=true; NMTID=xxx";
			const Result = await $.fetch(Request).then(response => JSON.parse(response.body));
			trackInfo.id = Result?.result?.songs?.[0]?.id;
			trackInfo.track = Result?.result?.songs?.[0]?.name;
			trackInfo.album = Result?.result?.songs?.[0]?.ar?.name;
			trackInfo.artist = Result?.result?.songs?.[0]?.al?.name;
			break;
		};
		case "NeteaseMusicNodeJS": {
			const HostPool = [
				"api.music.areschang.top",
				//"mu-api.yuk0.com",
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
			$.log(`🚧 searchUrl: ${JSON.stringify(searchUrl)}`, "");
			Request.url = URI.stringify(searchUrl);
			Request.headers.Referer = "https://music.163.com";
			const Result = await $.fetch(Request).then(response => JSON.parse(response.body));
			trackInfo.id = Result?.result?.songs?.[0]?.id;
			trackInfo.track = Result?.result?.songs?.[0]?.name;
			trackInfo.album = Result?.result?.songs?.[0]?.ar?.name;
			trackInfo.artist = Result?.result?.songs?.[0]?.al?.name;
			break;
		};
		case "QQMusic":
		default: {
			const searchUrl = {
				"scheme": "https",
				"host": "u.y.qq.com",
				"path": "cgi-bin/musicu.fcg"
			};
			$.log(`🚧 searchUrl: ${JSON.stringify(searchUrl)}`, "");
			Request.url = URI.stringify(searchUrl);
			Request.headers.Referer = "https://c.y.qq.com";
			Request.body = JSON.stringify({
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
			const Result = await $.fetch(Request).then(response => JSON.parse(response.body));
			trackInfo.mid = Result?.["music.search.SearchCgiService"]?.data?.body?.song?.list?.[0]?.mid;
			trackInfo.track = Result?.["music.search.SearchCgiService"]?.data?.body?.song?.list?.[0]?.name;
			trackInfo.album = Result?.["music.search.SearchCgiService"]?.data?.body?.song?.list?.[0]?.album?.name;
			trackInfo.artist = Result?.["music.search.SearchCgiService"]?.data?.body?.song?.list?.[0]?.singer?.[0]?.name;
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
			$.log(`🚧 searchUrl: ${JSON.stringify(searchUrl)}`, "");
			Request.url = URI.stringify(searchUrl);
			Request.headers.Referer = "https://c.y.qq.com";
			const Result = await $.fetch(Request).then(response => JSON.parse(response.body));
			trackInfo.mid = Result?.data?.song?.list?.[0]?.songmid;
			trackInfo.track = Result?.data?.song?.list?.[0]?.songname;
			trackInfo.album = Result?.data?.song?.list?.[0]?.albumname;
			trackInfo.artist = Result?.data?.song?.list?.[0]?.singer?.[0]?.name;
			break;
		};
	};
	$.log(`✅ Search Track`, `trackInfo: ${JSON.stringify(trackInfo)}`, "");
	return trackInfo;
};

async function searchLyric(vendor = "NeteaseMusic", trackId = undefined, UAPool = []){
	$.log(`☑️ Search Lyric`, `vendor: ${vendor}, trackId: ${trackId}`, "");
	const Request = {
		"headers": {
			"Accept": "application/json",
			"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)], // 随机UA
		}
	};
	const Lyrics = {};
	switch (vendor) {
		case "NeteaseMusic": {
			const lyricUrl = {
				"scheme": "https",
				"host": "music.163.com",
				"path": "api/song/lyric",
				"query": {
					"id": trackId, // trackInfo.NeteaseMusic.id
					"lv": 0,
					"yv": 0,
					"tv": 0,
				}
			};
			$.log(`🚧 lyricUrl: ${JSON.stringify(lyricUrl)}`, "");
			Request.url = URI.stringify(lyricUrl);
			Request.headers.Referer = "https://music.163.com";
			Request.headers.Cookie = "os=ios; __remember_me=true; NMTID=xxx";
			const Result = await $.fetch(Request).then(response => JSON.parse(response.body));
			$.log(`🚧 Result: ${JSON.stringify(Result)}`, "");
			Lyrics.lyric = Result?.lrc?.lyric;
			Lyrics.tlyric = Result?.ytlrc?.lyric ?? Result?.tlyric?.lyric;
			Lyrics.klyric = Result?.yrc?.lyric ?? Result?.klyric?.lyric;
			Lyrics.lyricUser = Result?.lyricUser?.nickname;
			Lyrics.transUser = Result?.transUser?.nickname;
			break;
		};
		case "NeteaseMusicNodeJS": {
			const HostPool = [
				"api.music.areschang.top",
				//"mu-api.yuk0.com",
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
			$.log(`🚧 lyricUrl: ${JSON.stringify(lyricUrl)}`, "");
			Request.url = URI.stringify(lyricUrl);
			Request.headers.Referer = "https://music.163.com";
			const Result = await $.fetch(Request).then(response => JSON.parse(response.body));
			$.log(`🚧 Result: ${JSON.stringify(Result)}`, "");
			Lyrics.lyric = Result?.lrc?.lyric;
			Lyrics.tlyric = Result?.ytlrc?.lyric ?? Result?.tlyric?.lyric;
			Lyrics.klyric = Result?.yrc?.lyric ?? Result?.klyric?.lyric;
			Lyrics.lyricUser = Result?.lyricUser?.nickname;
			Lyrics.transUser = Result?.transUser?.nickname;
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
			$.log(`🚧 lyricUrl: ${JSON.stringify(lyricUrl)}`, "");
			Request.url = URI.stringify(lyricUrl);
			Request.headers.Referer = "https://lyric.music.qq.com";
			const Result = await $.fetch(Request).then(response => JSON.parse(response.body));
			Lyrics.lyric = Result?.lyric;
			Lyrics.tlyric = Result?.trans;
			Lyrics.klyric = undefined;
			Lyrics.lyricUser = undefined;
			Lyrics.transUser = undefined;
			break;
		};
	};
	$.log(`✅ Search Lyric`, "");
	$.log(`🚧 Search Lyric`, `Lyrics: ${JSON.stringify(Lyrics)}`, "");
	return Lyrics;
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
	$.log(`⚠ Chunk Array`, "");
    var index = 0, target = [];
    while(index < source.length) target.push(source.slice(index, index += length));
	//$.log(`🎉 Chunk Array`, `target: ${JSON.stringify(target)}`, "");
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
	$.log(`☑️ retry, 剩余重试次数:${retriesLeft}`, `时间间隔:${interval}ms`);
	try {
		const val = await fn();
		return val;
	} catch (error) {
		if (retriesLeft) {
			await new Promise(r => setTimeout(r, interval));
			return retry(fn, retriesLeft - 1, exponential ? interval * 2 : interval, exponential);
		} else throw new Error(`❌ retry, 最大重试次数`);
	}
};

String.prototype.decodeHTML = function () {
	return this.replace(/&apos;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&gt;/g, '>')
		.replace(/&lt;/g, '<')
		.replace(/&amp;/g, '&')
		.replace(/&nbsp;/g, ' ')
		.replace(/&#39;/g, "'")
		.replace(/&ldquo;/g, '“')
		.replace(/&rdquo;/g, '”')
		.replace(/&#x2f;/g, '/')
		.replace(/&mdash;/g, '—')
		.replace(/&hellip;/g, '…')
		.replace(/&bull;/g, '•')
		.replace(/&copy;/g, '©')
		.replace(/%23x2f;/g, '/')
};
