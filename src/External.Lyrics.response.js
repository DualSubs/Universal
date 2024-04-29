import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";
import URL from "./URL/URL.mjs";
import URI from "./URL/URI.mjs";
import LRC from "./LRC/LRC.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import setCache from "./function/setCache.mjs";

import { TextEncoder , TextDecoder } from "./text-encoding/index.js";
import { WireType, UnknownFieldHandler, reflectionMergePartial, MESSAGE_TYPE, MessageType, BinaryReader, isJsonObject, typeofJsonValue, jsonWriteOptions } from "../node_modules/@protobuf-ts/runtime/build/es2015/index.js";

const $ = new ENV("🍿️ DualSubs: 🔣 Universal v1.6.0(1002) External.Lyrics.response");

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname, PATHs = url.pathname.split("/").filter(Boolean);
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"] ?? $request.headers?.Accept ?? $request.headers?.accept)?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
(async () => {
	// 获取平台
	const PLATFORM = detectPlatform($request.url);
	$.log(`⚠ PLATFORM: ${PLATFORM}`, "");
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "External", "API"], Database);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = url.searchParams?.get("subtype") ?? Settings.Type, Languages = [url.searchParams?.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams?.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 查询缓存
			const trackId = PATHs?.[3];
			$.log(`🚧 trackId: ${trackId}`, "");
			const trackInfo = Caches.Metadatas.Tracks.get(trackId);
			$.log(`🚧 trackInfo: ${JSON.stringify(trackInfo)}`, "");
			// 创建空数据
			let body = {};
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
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
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					//body = XML.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					switch (PLATFORM) {
						case "YouTube":
							break;
						case "Spotify":
							body = await injectionLyric(Settings.LrcVendor, trackInfo, body, PLATFORM);
							if (!$response?.headers?.["Content-Type"] && $response?.headers?.["content-type"]) $response.headers["Content-Type"] = FORMAT;
							$response.status = ($.isQuanX()) ? "HTTP/1.1 200 OK" : 200;
							break;
					};
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					$response.body = JSON.stringify(body);
					break;
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
									body = await injectionLyric(Settings.LrcVendor, trackInfo, body, PLATFORM);
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
					//$.log(`🚧 rawBody: ${JSON.stringify(rawBody)}`, "");
					$response.body = rawBody;
					break;
			};
			// 缓存查询信息
			if (trackInfo?.NeteaseMusic?.id ?? trackInfo?.QQMusic?.mid) {
				Caches.Metadatas.Tracks.set(trackInfo.id, trackInfo);
				// 格式化缓存
				$.log(`🚧 Caches.Metadatas.Tracks: ${JSON.stringify([...Caches.Metadatas.Tracks.entries()])}`, "");
				Caches.Metadatas.Tracks = setCache(Caches.Metadatas.Tracks, Settings.CacheSize);
				// 写入持久化储存
				$Storage.setItem(`@DualSubs.${PLATFORM}.Caches.Metadatas.Tracks`, Caches.Metadatas.Tracks);
			};
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done($response))

/***************** Function *****************/
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
					break
				case "QQMusic":
				default:
					body.lyrics.provider = "QQMusic";
					body.lyrics.providerLyricsId = trackInfo?.QQMusic?.mid?.toString?.();
					body.lyrics.providerDisplayName = `QQ音乐 - ${externalLyric?.lyricUser ?? "未知"}`;
					body.colors.background = -11038189; // QQ音乐绿 5739027 #579213 rgb(87,146,19)
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
			Request.url = URI.stringify(lyricUrl);
			Request.headers.Referer = "https://music.163.com";
			Request.headers.Cookie = "os=ios; __remember_me=true; NMTID=xxx";
			const Result = await $.fetch(Request).then(response => JSON.parse(response.body));
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
			Request.url = URI.stringify(lyricUrl);
			Request.headers.Referer = "https://music.163.com";
			const Result = await $.fetch(Request).then(response => JSON.parse(response.body));
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
