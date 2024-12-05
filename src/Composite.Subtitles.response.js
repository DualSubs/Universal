import { Console, done, fetch, Lodash as _ } from "@nsnanocat/util";
import { URL } from "@nsnanocat/url";
import XML from "./XML/XML.mjs";
import VTT from "./WebVTT/WebVTT.mjs";
import database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import detectFormat from "./function/detectFormat.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import setCache from "./function/setCache.mjs";
import constructSubtitlesQueue from "./function/constructSubtitlesQueue.mjs";
import Composite from "./class/Composite.mjs";
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`);
// 获取连接参数
const PATHs = url.pathname.split("/").filter(Boolean);
Console.info(`PATHs: ${PATHs}`);
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = detectFormat(url, $response?.body, FORMAT);
Console.info(`FORMAT: ${FORMAT}`);
(async () => {
	// 获取平台
	const PLATFORM = detectPlatform($request.url);
	Console.info(`PLATFORM: ${PLATFORM}`);
	/**
	 * 设置
	 * @type {{Settings: import('./types').Settings}}
	 */
	const { Settings, Caches, Configs } = setENV("DualSubs", [["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM) ? PLATFORM : "Universal", "Composite", "API"], database);
	// 获取字幕类型与语言
	const Type = url.searchParams?.get("subtype") ?? Settings.Type,
		Languages = [url.searchParams?.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams?.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
	Console.info(`Type: ${Type}`, `Languages: ${Languages}`);
	// 创建空数据
	let body = {};
	// 创建字幕请求队列
	let requests = [];
	// 处理类型
	switch (Type) {
		case "Official":
			Console.info("官方字幕");
			switch (PLATFORM) {
				default: {
					// 获取字幕文件地址vtt缓存（map）
					const { subtitlesPlaylistURL } = getSubtitlesCache($request.url, Caches.Playlists.Subtitle, Languages);
					// 获取字幕播放列表m3u8缓存（map）
					const { masterPlaylistURL, subtitlesPlaylistIndex } = getPlaylistCache(subtitlesPlaylistURL, Caches.Playlists.Master, Languages);
					// 获取字幕文件地址vtt缓存（map）
					const { subtitlesURIArray0, subtitlesURIArray1 } = getSubtitlesArray(masterPlaylistURL, subtitlesPlaylistIndex, Caches.Playlists.Master, Caches.Playlists.Subtitle, Languages);
					// 获取官方字幕请求
					if (subtitlesURIArray1.length) {
						Console.debug(`subtitlesURIArray1.length: ${subtitlesURIArray1.length}`);
						// 获取字幕文件名
						const fileName = PATHs?.[PATHs?.length - 1] ?? getSubtitlesFileName($request.url, PLATFORM);
						Console.debug(`fileName: ${fileName}`);
						// 构造请求队列
						requests = constructSubtitlesQueue($request, fileName, subtitlesURIArray0, subtitlesURIArray1);
					}
					break;
				}
				case "YouTube":
					Console.info("YouTube");
					switch (url.searchParams.get("tlang")) {
						case undefined:
							Console.info("未选择翻译语言，跳过");
							break;
						default:
							Console.info("已选择翻译语言");
							// 设置参数
							// Settings.Offset = 0;
							Settings.Tolerance = 100;
							Settings.Position = Settings.Position === "Reverse" ? "Forward" : "Reverse"; // 链接主字幕为翻译字幕，副字幕为原字幕，所以需要翻转一下
							switch (Settings.ShowOnly) {
								case true:
									Console.info("仅显示翻译后字幕，跳过");
									break;
								case false:
								default: {
									Console.info("生成双语字幕");
									// 获取字幕
									url.searchParams.set("lang", Caches.Playlists.Subtitle.get(url.searchParams.get("v")) || url.searchParams.get("lang")); // 主语言
									url.searchParams.delete("tlang"); // 原字幕
									const request = {
										url: url.toString(),
										headers: $request.headers,
									};
									requests.push(request);
									break;
								}
							}
					}
					break;
				case "Netflix":
					Console.info("Netflix");
					break;
				case "Bilibili":
					Console.info("Bilibili");
					break;
			}
			break;
		case "Translate":
		default:
			Console.info("翻译字幕");
			break;
		case "External":
			Console.info("外挂字幕");
			switch (Settings.SubVendor) {
				case "URL": {
					const request = {
						url: Settings.URL,
						headers: {
							Accept: "*/*",
							"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
						},
					};
					requests.push(request);
					break;
				}
			}
			break;
	}
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
			break;
		case "text/xml":
		case "text/html":
		case "text/plist":
		case "application/xml":
		case "application/plist":
		case "application/x-plist":
			body = XML.parse($response.body);
			await Promise.all(
				requests.map(async request => {
					const officialSubtitle = await fetch(request).then(response => XML.parse(response.body));
					body = new Composite(Settings).timedText(body, officialSubtitle, url.searchParams.get("kind"));
				}),
			);
			$response.body = XML.stringify(body);
			break;
		case "text/vtt":
		case "application/vtt":
			body = VTT.parse($response.body);
			await Promise.all(
				requests.map(async request => {
					const officialSubtitle = await fetch(request).then(response => VTT.parse(response.body));
					body = new Composite(Settings).webVTT(body, officialSubtitle);
				}),
			);
			$response.body = VTT.stringify(body);
			break;
		case "text/json":
		case "application/json":
			body = JSON.parse($response.body ?? "{}");
			await Promise.all(
				requests.map(async request => {
					const officialSubtitle = await fetch(request).then(response => JSON.parse(response.body));
					body = new Composite(Settings).JSON(body, officialSubtitle, url.searchParams.get("kind"));
				}),
			);
			$response.body = JSON.stringify(body);
			break;
		case "application/protobuf":
		case "application/x-protobuf":
		case "application/vnd.google.protobuf":
		case "application/grpc":
		case "application/grpc+proto":
		case "application/octet-stream": {
			break;
		}
	}
})()
	.catch(e => Console.error(e))
	.finally(() => done($response));

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
	Console.log("☑️ getPlaylistCache");
	let masterPlaylistURL = "";
	let subtitlesPlaylist = {};
	let subtitlesPlaylistIndex = 0;
	cache?.forEach((Value, Key) => {
		languages?.forEach(language => {
			if (Array.isArray(Value?.[language])) {
				const array = Value?.[language];
				if (
					array?.some((object, index) => {
						if (url.includes(object?.URI || object?.OPTION?.URI || null)) {
							subtitlesPlaylistIndex = index;
							Console.debug(`subtitlesPlaylistIndex: ${subtitlesPlaylistIndex}`);
							return true;
						} else return false;
					})
				) {
					masterPlaylistURL = Key;
					subtitlesPlaylist = Value;
					//Console.debug(`getPlaylistCache`, `masterPlaylistURL: ${masterPlaylistURL}`, `subtitlesPlaylist: ${JSON.stringify(subtitlesPlaylist)}`);
				}
			}
		});
	});
	Console.log("✅ getPlaylistCache", `masterPlaylistURL: ${JSON.stringify(masterPlaylistURL)}`);
	return { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex };
}

/**
 * Get Subtitles Cache
 * @author VirgilClyne
 * @param {String} url - Request URL / Subtitles URL
 * @param {Map} cache - Subtitles Cache
 * @param {Array} languages - Languages
 * @return {Promise<Object>} { subtitlesPlaylistURL, subtitles, subtitlesIndex }
 */
function getSubtitlesCache(url, cache, languages) {
	Console.log("☑️ getSubtitlesCache");
	let subtitlesPlaylistURL = "";
	let subtitles = [];
	let subtitlesIndex = 0;
	cache?.forEach((Value, Key) => {
		if (Array.isArray(Value)) {
			const array = Value;
			if (
				array?.some((string, index) => {
					if (url.includes(string || null)) {
						subtitlesIndex = index;
						Console.debug(`subtitlesIndex: ${subtitlesIndex}`);
						return true;
					} else return false;
				})
			) {
				subtitlesPlaylistURL = Key;
				subtitles = Value;
				//Console.debug(`getSubtitlesCache, subtitlesPlaylistURL: ${subtitlesPlaylistURL}`);
			}
		}
	});
	Console.log("✅ getSubtitlesCache", `subtitlesPlaylistURL: ${subtitlesPlaylistURL}`);
	return { subtitlesPlaylistURL, subtitles, subtitlesIndex };
}

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
	Console.log("☑️ getSubtitlesArray");
	const subtitlesPlaylistValue = playlistsCache?.get(url) || {};
	const subtitlesPlaylistURL0 = subtitlesPlaylistValue?.[languages[0]]?.[index]?.URL || subtitlesPlaylistValue?.[languages[0]]?.[0]?.URL;
	const subtitlesPlaylistURL1 = subtitlesPlaylistValue?.[languages[1]]?.[index]?.URL || subtitlesPlaylistValue?.[languages[1]]?.[0]?.URL;
	Console.debug(`subtitlesPlaylistURL0: ${subtitlesPlaylistURL0}, subtitlesPlaylistURL1: ${subtitlesPlaylistURL1}`);
	// 查找字幕文件地址vtt缓存（map）
	const subtitlesURIArray0 = subtitlesCache.get(subtitlesPlaylistURL0) || [];
	const subtitlesURIArray1 = subtitlesCache.get(subtitlesPlaylistURL1) || [];
	//Console.debug(`getSubtitlesArray`, `subtitlesURIArray0: ${JSON.stringify(subtitlesURIArray0)}, subtitlesURIArray1: ${JSON.stringify(subtitlesURIArray1)}`);
	Console.log("✅ getSubtitlesArray");
	return { subtitlesURIArray0, subtitlesURIArray1 };
}

/**
 * Get Subtitles FileName
 * @author VirgilClyne
 * @param {String} url - Request URL / Subtitles URL
 * @param {String} platform - Platform Name
 * @return {String<*>} fileName
 */
function getSubtitlesFileName(url, platform) {
	Console.log("☑️ Get Subtitles FileName", `url: ${url}`);
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
	}
	Console.log("✅ Get Subtitles FileName", `fileName: ${fileName}`);
	return fileName;
}
