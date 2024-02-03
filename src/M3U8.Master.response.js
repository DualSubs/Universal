import ENVs from "./ENV/ENV.mjs";
import URIs from "./URI/URI.mjs";
import EXTM3U from "./EXTM3U/EXTM3U.mjs";

import Database from "./database/index.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import detectFormat from "./function/detectFormat.mjs";
import setENV from "./function/setENV.mjs";
import isStandard from "./function/isStandard.mjs";
import setCache from "./function/setCache.mjs";
import setOption from "./function/setOption.mjs";

const $ = new ENVs("🍿️ DualSubs: 🎦 Universal v0.9.6(6) M3U8.Master.response");
const URI = new URIs();
const M3U8 = new EXTM3U(["\n"]);

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
	const { Settings, Caches, Configs } = setENV($, "DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal"], Database);
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = URL.query?.subtype ?? Settings.Type, Languages = [URL.query?.lang?.toUpperCase?.() ?? Settings.Languages[0], (URL.query?.tlang ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ ${$.name}, Type: ${Type}, Languages: ${Languages}`, "");
			// 兼容性判断
			const { standard: STANDARD, device: DEVICE } = isStandard(URL, $request.headers, PLATFORM);
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
					// 序列化M3U8
					body = M3U8.parse($response.body);
					//$.log(`🚧 ${$.name}`, "M3U8.parse($response.body)", JSON.stringify(body), "");
					// 读取已存数据
					let playlistCache = Caches.Playlists.Master.get($request.url) || {};
					// 获取特定语言的字幕
					playlistCache[Languages[0]] = getAttrList($request.url, body, "SUBTITLES", Configs.Languages[Languages[0]]);
					playlistCache[Languages[1]] = getAttrList($request.url, body, "SUBTITLES", Configs.Languages[Languages[1]]);
					// 写入数据
					Caches.Playlists.Master.set($request.url, playlistCache);
					// 格式化缓存
					Caches.Playlists.Master = setCache(Caches.Playlists.Master, Settings.CacheSize);
					// 写入持久化储存
					$.setjson(Caches.Playlists.Master, `@DualSubs.${"Composite"}.Caches.Playlists.Master`);
					// 写入选项
					body = setAttrList(body, playlistCache, Settings.Types, Languages, PLATFORM, STANDARD, DEVICE);
					// 字符串M3U8
					$response.body = M3U8.stringify(body);
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
 * Get Attribute List
 * @author VirgilClyne
 * @param {String} url - Request URL
 * @param {Object} m3u8 - Parsed M3U8
 * @param {String} type - Content Type
 * @param {Array} langCodes - Language Codes Array
 * @return {Array} datas
 */
function getAttrList(url = "", m3u8 = {}, type = "", langCodes = []) {
	$.log(`☑️ $${$.name}, Get Attribute List`, `langCodes: ${langCodes}`, "");
	let attrList = m3u8.filter(item => item?.OPTION?.TYPE === type && item?.OPTION?.FORCED !== "YES"); // 过滤强制内容
	//$.log(`🚧 ${$.name}`, "attrList", JSON.stringify(attrList), "");
	let matchList = [];
	//查询是否有符合语言的内容
	for (let langcode of langCodes) {
		$.log(`🚧 ${$.name}, Get Attribute List`, "for (let langcode of langcodes)", `langcode: ${langcode}`, "");
		matchList = attrList.filter(item => item?.OPTION?.LANGUAGE?.toLowerCase() === langcode?.toLowerCase());
		if (matchList.length !== 0) break;
	};
	matchList = matchList.map(data => {
		data.URL = aPath(url, data?.OPTION?.URI ?? null);
		return data;
	})
	$.log(`✅ $${$.name}, Get Attribute List`, `matchList: ${JSON.stringify(matchList)}`, "");
	return matchList;

	/***************** Fuctions *****************/
	// Get Absolute Path
	function aPath(aURL = "", URL = "") { return (/^https?:\/\//i.test(URL)) ? URL : aURL.match(/^(https?:\/\/(?:[^?]+)\/)/i)?.[0] + URL };
};

/**
 * Set Attribute List
 * @author VirgilClyne
 * @param {String} platform - Platform
 * @param {Object} m3u8 - Parsed m3u8
 * @param {Array} playlists1 - Primary (Source) Languages Playlists
 * @param {Array} playlists2 - Second (Target) Languages Playlists
 * @param {Array} types - Types
 * @param {Array} languages - Languages
 * @param {Boolean} Standard - Standard
 * @return {Object} m3u8
 */
function setAttrList(m3u8 = {}, playlists = {}, types = [], languages = [], platform = "", standard = true, device = "iPhone") {
	types = (standard == true) ? types : [types.at(-1)];
	const playlists1 = playlists?.[languages?.[0]];
	const playlists2 = playlists?.[languages?.[1]];
	$.log(`☑️ ${$.name}, Set Attribute List`, `types: ${types}`, "");
	playlists1?.forEach(playlist1 => {
		const index1 = m3u8.findIndex(item => item?.OPTION?.URI === playlist1.OPTION.URI); // 主语言（源语言）字幕位置
		types.forEach(type => {
			$.log(`🚧 ${$.name}, Set Attribute List, type: ${type}`, "");
			let option = {};
			switch (type) {
				case "Official":
					playlists2?.forEach(playlist2 => {
						if (playlist1?.OPTION?.["GROUP-ID"] === playlist2?.OPTION?.["GROUP-ID"]) {
							switch (platform) { // 兼容性修正
								case "Apple":
									if (playlist1?.OPTION.CHARACTERISTICS == playlist2?.OPTION.CHARACTERISTICS) {  // 只生成属性相同
										option = setOption(playlist1, playlist2, type, platform, standard, device);
									};
									break;
								default:
									option = setOption(playlist1, playlist2, type, platform, standard, device);
									break;
							};
						};
					});
					break;
				case "Translate":
				case "External":
					const playlist2 = {
						"OPTION": {
							"TYPE": "SUBTITLES",
							"NAME": playlists2?.[0]?.OPTION?.NAME ?? languages[1].toLowerCase(),
							"LANGUAGE": playlists2?.[0]?.OPTION?.LANGUAGE ?? languages[1].toLowerCase(),
						}
					};
					option = setOption(playlist1, playlist2, type, platform, standard, device);
					option.OPTION.URI += `&lang=${playlist1?.OPTION?.LANGUAGE?.toUpperCase()}`;
					break;
			};
			if (Object.keys(option).length !== 0) {
				if (standard) m3u8.splice(index1 + 1, 0, option)
				else m3u8.splice(index1, 1, option);
			};
		});
	});
	//$.log(`✅ ${$.name}, Set Attribute List`, `m3u8: ${JSON.stringify(m3u8)}`, "");
	$.log(`✅ ${$.name}, Set Attribute List`, "");
	return m3u8;
};
