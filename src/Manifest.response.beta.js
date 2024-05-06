import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";
import URL from "./URL/URL.mjs";
import M3U8 from "./EXTM3U/EXTM3U.mjs";
import AttrList from "./class/AttrList.mjs";

import Database from "./database/index.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import setENV from "./function/setENV.mjs";
import isStandard from "./function/isStandard.mjs";
import detectPlaylist from "./function/detectPlaylist.mjs";
import setCache from "./function/setCache.mjs";
import aPath from "./function/aPath.mjs";

const $ = new ENV("🍿️ DualSubs: 🎦 Universal v1.3.1(1006) Manifest.response.beta");

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname, PATHs = url.pathname.split("/").filter(Boolean);
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
(async () => {
	// 获取平台
	const PLATFORM = detectPlatform($request.url);
	$.log(`⚠ PLATFORM: ${PLATFORM}`, "");
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Composite"], Database);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = url.searchParams?.get("subtype") ?? Settings.Type, Languages = [url.searchParams?.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams?.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 兼容性判断
			const { standard: STANDARD, device: DEVICE } = isStandard(url, $request.headers, PLATFORM);
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
					// 序列化M3U8
					body = M3U8.parse($response.body);
					//$.log(`🚧 M3U8.parse($response.body): ${JSON.stringify(body)}`, "");
					// 获取播放列表类型
					switch (detectPlaylist(body)) {
						case "Multivariant Playlist":
							// 读取已存数据
							let playlistCache = Caches.Playlists.Master.get($request.url) || {};
							// 获取特定语言的字幕
							playlistCache[Languages[0]] = new AttrList(FORMAT, PLATFORM).get($request.url, body, "SUBTITLES", Configs.Languages[Languages[0]]);
							playlistCache[Languages[1]] = new AttrList(FORMAT, PLATFORM).get($request.url, body, "SUBTITLES", Configs.Languages[Languages[1]]);
							// 写入选项
							body = new AttrList(FORMAT, PLATFORM).set(body, playlistCache, Settings.Types, Languages, STANDARD, DEVICE);
							// 写入数据
							Caches.Playlists.Master.set($request.url, playlistCache);
							// 格式化缓存
							Caches.Playlists.Master = setCache(Caches.Playlists.Master, Settings.CacheSize);
							// 写入持久化储存
							$Storage.setItem(`@DualSubs.${"Composite"}.Caches.Playlists.Master`, Caches.Playlists.Master);
							break;
						case "Media Playlist":
							// 处理类型
							switch (Type) {
								case "Official":
									$.log(`⚠ 官方字幕`, "");
									// 获取字幕播放列表m3u8缓存（map）
									const { subtitlesPlaylist, subtitlesPlaylistIndex } = getPlaylistCache($request.url, Caches.Playlists.Master, Languages[0]) ?? getPlaylistCache($request.url, Caches.Playlists.Master, Languages[1]);
									// 写入字幕文件地址vtt缓存（map）
									Caches.Playlists.Subtitle = await setSubtitlesCache(Caches.Playlists.Subtitle, subtitlesPlaylist, Languages[0], subtitlesPlaylistIndex, PLATFORM);
									Caches.Playlists.Subtitle = await setSubtitlesCache(Caches.Playlists.Subtitle, subtitlesPlaylist, Languages[1], subtitlesPlaylistIndex, PLATFORM);
									// 格式化缓存
									Caches.Playlists.Subtitle = setCache(Caches?.Playlists.Subtitle, Settings.CacheSize);
									// 写入缓存
									$Storage.setItem(`@DualSubs.${"Composite"}.Caches.Playlists.Subtitle`, Caches.Playlists.Subtitle);
									break;
								case "Translate":
								default:
									$.log(`⚠ 翻译字幕`, "");
									break;
								case "External":
									$.log(`⚠ 外挂字幕`, "");
									break;
							};
							// WebVTT.m3u8加参数
							body = body.map((item, i) => {
								if (/^.+\.((web)?vtt|ttml2?|xml|smi)(\?.+)?$/.test(item?.URI)) {
									const symbol = (item.URI.includes("?")) ? "&" : "?";
									if (!/empty|blank|default/.test(item.URI)) {
										item.URI += `${symbol}subtype=${Type}`;
										if (url.searchParams?.has("lang")) item.URI += `&lang=${url.searchParams.get("lang")}`;
									};
									if (item.TAG === "#EXT-X-BYTERANGE") body[i - 1].URI = item.URI; // 删除BYTERANGE
									else return item;
								} else if (item?.URI && PLATFORM === "MGM+") {
									item.URI += `?subtype=${Type}`;
									if (url.searchParams?.has("lang")) item.URI += `&lang=${url.searchParams.get("lang")}`;
									return item;
								} else return item;
							});
							break;
					};
					// 字符串M3U8
					$response.body = M3U8.stringify(body);
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
					// 读取已存数据
					let playlistCache = Caches.Playlists.Master.get($request.url) || {};
					// 判断平台
					switch (PLATFORM) {
						case "PrimeVideo":
							if (body?.subtitleUrls) {
								// 获取特定语言的字幕
								playlistCache[Languages[0]] = new AttrList(FORMAT, PLATFORM).get($request.url, body, "subtitleUrls", Configs.Languages[Languages[0]]);
								playlistCache[Languages[1]] = new AttrList(FORMAT, PLATFORM).get($request.url, body, "subtitleUrls", Configs.Languages[Languages[1]]);
								//$.log(`🚧 playlistCache[Languages[0]]: ${JSON.stringify(playlistCache[Languages[0]])}`, "");
								body.subtitleUrls = new AttrList(FORMAT, PLATFORM).set(body.subtitleUrls, playlistCache, Settings.Types, Languages, STANDARD, DEVICE);
							};
							break;
					};
					// 写入数据
					Caches.Playlists.Master.set($request.url, playlistCache);
					// 格式化缓存
					Caches.Playlists.Master = setCache(Caches.Playlists.Master, Settings.CacheSize);
					// 写入持久化储存
					$Storage.setItem(`@DualSubs.${"Composite"}.Caches.Playlists.Master`, Caches.Playlists.Master);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					$response.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
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
 * @param {String} language - Language
 * @return {Promise<Object>} { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex }
 */
function getPlaylistCache(url, cache, language) {
	$.log(`☑️ getPlaylistCache, language: ${language}`, "");
	let masterPlaylistURL = "";
	let subtitlesPlaylist = {};
	let subtitlesPlaylistIndex = 0;
	cache?.forEach((Value, Key) => {
		//$.log(`🚧 getPlaylistCache, Key: ${Key}, Value: ${JSON.stringify(Value)}`, "");
		if (Array.isArray(Value?.[language])) {
			let Array = Value?.[language];
			//$.log(`🚧 getPlaylistCache`, `Array: ${JSON.stringify(Array)}`, "");
			if (Array?.some((Object, Index) => {
				if (url.includes(Object?.URI ?? Object?.OPTION?.URI ?? null)) {
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
	$.log(`✅ getPlaylistCache`, `masterPlaylistURL: ${JSON.stringify(masterPlaylistURL)}`, "");
	return { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex };
};

/**
 * Set Subtitles Cache
 * @author VirgilClyne
 * @param {Map} cache - Subtitles Cache
 * @param {Object} playlist - Subtitles Playlist Cache
 * @param {Array} language - Language
 * @param {Number} index - Subtitles Playlist Index
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<Object>} { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex }
 */
async function setSubtitlesCache(cache, playlist, language, index = 0, platform = "Universal") {
	$.log(`☑️ setSubtitlesCache, language: ${language}, index: ${index}`, "");
	await Promise.all(playlist?.[language]?.map(async (val, ind, arr) => {
		//$.log(`🚧 setSubtitlesCache, ind: ${ind}, val: ${JSON.stringify(val)}`, "");
		if ((arr[index] && (ind === index)) || (!arr[index])) {
			// 查找字幕文件地址vtt缓存（map）
			let subtitlesURLarray = cache.get(val.URL) ?? [];
			//$.log(`🚧 setSubtitlesCache`, `subtitlesURLarray: ${JSON.stringify(subtitlesURLarray)}`, "");
			//$.log(`🚧 setSubtitlesCache`, `val?.URL: ${val?.URL}`, "");
			// 获取字幕文件地址vtt/ttml缓存（按语言）
			if (subtitlesURLarray.length === 0) subtitlesURLarray = await getSubtitles(val?.URL, $request.headers, platform);
			//$.log(`🚧 setSubtitlesCache`, `subtitlesURLarray: ${JSON.stringify(subtitlesURLarray)}`, "");
			// 写入字幕文件地址vtt/ttml缓存到map
			if (subtitlesURLarray.length !== 0) cache = cache.set(val.URL, subtitlesURLarray);
			//$.log(`✅ setSubtitlesCache`, `subtitlesURLarray: ${JSON.stringify(cache.get(val?.URL))}`, "");
			$.log(`✅ setSubtitlesCache`, `val?.URL: ${val?.URL}`, "");
		};
	}));
	return cache;
};

/**
 * Get Subtitle *.vtt URLs
 * @author VirgilClyne
 * @param {String} url - VTT URL
 * @param {String} headers - Request Headers
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<*>}
 */
async function getSubtitles(url, headers, platform) {
	$.log(`☑️ Get Subtitle *.vtt *.ttml URLs`, "");
	let subtitles = await $.fetch(url, { headers: headers }).then((response, error) => {
		//$.log(`🚧 Get Subtitle *.vtt *.ttml URLs`, `response: ${JSON.stringify(response)}`, "");
		let subtitlePlayList = M3U8.parse(response.body);
		return subtitlePlayList
			.filter(({ URI }) => (/^.+\.((web)?vtt|ttml2?|xml|smi)(\?.+)?$/.test(URI)))
			.filter(({ URI }) => !URI.includes("empty"))
			.filter(({ URI }) => !URI.includes("blank"))
			.filter(({ URI }) => !URI.includes("default"))
			.map(({ URI }) => aPath(url, URI));
	});
	switch (platform) {
		case "Disney+":
			if (subtitles.some(item => /\/.+-MAIN\//.test(item))) subtitles = subtitles.filter(item => /\/.+-MAIN\//.test(item))
			break;
		case "PrimeVideo":
			if (subtitles.some(item => /\/aiv-prod-timedtext\//.test(item))) subtitles = subtitles.filter(item => /\/aiv-prod-timedtext\//.test(item));
			//Array.from(new Set(subtitles));
			subtitles = subtitles.filter((item, index, array) => {
				// 当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
				return array.indexOf(item, 0) === index;
			}); // 数组去重
			break;
		default:
			break;
	};
	$.log(`✅ Get Subtitle *.vtt *.ttml URLs, subtitles: ${subtitles}`, "");
	return subtitles;
};
