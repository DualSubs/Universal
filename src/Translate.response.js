import { $app, Console, done, Lodash as _ } from "@nsnanocat/util";
import { URL } from "@nsnanocat/url";
import XML from "./XML/XML.mjs";
import VTT from "./WebVTT/WebVTT.mjs";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import detectFormat from "./function/detectFormat.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import setCache from "./function/setCache.mjs";
import Translate from "./class/Translate.mjs";
import { BrowseResponse } from "./protobuf/google/protos/youtube/api/innertube/BrowseResponse.js";
import { ColorLyricsResponse } from "./protobuf/spotify/lyrics/Lyrics.js";
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
	const { Settings, Caches, Configs } = setENV("DualSubs", [["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM) ? PLATFORM : "Universal", "Translate", "API"], database);
	Console.logLevel = Settings.LogLevel;
	// 获取字幕类型与语言
	const Type = url.searchParams?.get("subtype") ?? Settings.Type,
		Languages = [url.searchParams?.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams?.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
	Console.info(`Type: ${Type}`, `Languages: ${Languages}`);
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
			break;
		case "text/xml":
		case "text/html":
		case "text/plist":
		case "application/xml":
		case "application/plist":
		case "application/x-plist": {
			body = XML.parse($response.body);
			const breakLine = body?.tt ? "<br />" : body?.timedtext ? "&#x000A;" : "&#x000A;";
			if (body?.timedtext?.head?.wp?.[1]?.["@rc"]) body.timedtext.head.wp[1]["@rc"] = "1";
			let paragraph = body?.tt?.body?.div?.p ?? body?.timedtext?.body?.p;
			const fullText = [];
			paragraph = paragraph.map(para => {
				if (para?.s) {
					if (Array.isArray(para.s)) para["#"] = para.s.map(seg => seg["#"]).join(" ");
					else para["#"] = para.s?.["#"] ?? "";
					// biome-ignore lint/performance/noDelete: <explanation>
					delete para.s;
				}
				const span = para?.span ?? para;
				const sentences = Array.isArray(span) ? span?.map(span => span?.["#"] ?? "\u200b").join(breakLine) : span?.["#"];
				fullText.push(sentences ?? "\u200b");
				return para;
			});
			const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
			paragraph = paragraph.map((para, i) => {
				const span = para?.span ?? para;
				if (Array.isArray(span))
					translation?.[i]?.split(breakLine).forEach((text, j) => {
						if (span[j]?.["#"]) span[j]["#"] = combineText(span[j]["#"], text, Settings?.ShowOnly, Settings?.Position, " ");
					});
				else if (span?.["#"]) span["#"] = combineText(span["#"], translation?.[i], Settings?.ShowOnly, Settings?.Position, breakLine);
				return para;
			});
			$response.body = XML.stringify(body);
			break;
		}
		case "text/vtt":
		case "application/vtt": {
			body = VTT.parse($response.body);
			const fullText = body?.body.map(item => (item?.text ?? "\u200b")?.replace(/<\/?[^<>]+>/g, ""));
			const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
			body.body = body.body.map((item, i) => {
				item.text = combineText(item?.text ?? "\u200b", translation?.[i], Settings?.ShowOnly, Settings?.Position);
				return item;
			});
			$response.body = VTT.stringify(body);
			break;
		}
		case "text/json":
		case "application/json": {
			body = JSON.parse($response.body ?? "{}");
			switch (PLATFORM) {
				case "YouTube": {
					if (body?.events) {
						const fullText = [];
						body.events = body.events.map(event => {
							if (event?.segs?.[0]?.utf8) event.segs = [{ utf8: event.segs.map(seg => seg.utf8).join("") }];
							fullText.push(event?.segs?.[0]?.utf8 ?? "\u200b");
							event.wWinId = undefined;
							return event;
						});
						const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
						body.events = body.events.map((event, i) => {
							if (event?.segs?.[0]?.utf8) event.segs[0].utf8 = combineText(event.segs[0].utf8, translation?.[i], Settings?.ShowOnly, Settings?.Position);
							return event;
						});
					} else if (body?.contents?.sectionListRenderer?.contents) {
						let musicDescriptions = body.contents.sectionListRenderer.contents;
						musicDescriptions = await Promise.all(
							musicDescriptions.map(async musicDescription => {
								if (musicDescription?.musicDescriptionShelfRenderer?.description?.runs) {
									let lyrics = musicDescription.musicDescriptionShelfRenderer.description.runs;
									lyrics = await Promise.all(
										lyrics.map(async run => {
											let fullText = run?.text?.split?.("\n")?.map(text => text?.trim() ?? "\u200b");
											const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
											fullText = fullText.map((line, i) => {
												if (line) return combineText(line, translation?.[i], Settings?.ShowOnly, Settings?.Position, "\n  └ ");
											});
											run.text = fullText.join("\n");
											return run;
										}),
									);
								}
								return musicDescription;
							}),
						);
					}
					break;
				}
				case "Spotify": {
					Languages[0] = body?.lyrics?.language === "z1" ? "ZH-HANT" : body?.lyrics?.language ? body?.lyrics?.language.toUpperCase() : "AUTO";
					const fullText = body.lyrics.lines.map(line => line?.words ?? "\u200b");
					const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
					switch ($request?.headers?.["app-platform"] ?? $request?.headers?.["App-Platform"]) {
						case "OSX": // macOS App 暂不支持翻译功能
						case "Win32_x86_64": // Windows App 暂不支持翻译功能
						case "WebPlayer": // Web App
						case undefined:
						default:
							body.lyrics.lines = body.lyrics.lines
								.map((line, i) => {
									const line1 = {
										startTimeMs: line.startTimeMs.toString(),
										words: line?.words ?? "",
										syllables: line?.syllables ?? [],
										endTimeMs: "0",
									};
									const line2 = {
										startTimeMs: line.startTimeMs.toString(),
										words: translation?.[i] ?? "",
										syllables: [],
										endTimeMs: "0",
									};
									return [line1, line2];
								})
								.flat(Number.POSITIVE_INFINITY);
						//break; 不中断，继续处理
						case "iOS":
							if (!body?.lyrics?.alternatives) body.lyrics.alternatives = [];
							body.lyrics.alternatives.unshift({
								language: Languages[1].toLowerCase(),
								lines: translation,
							});
							break;
					}
					break;
				}
			}
			$response.body = JSON.stringify(body);
			break;
		}
		case "application/protobuf":
		case "application/x-protobuf":
		case "application/vnd.google.protobuf":
		case "application/grpc":
		case "application/grpc+proto":
		case "application/octet-stream": {
			let rawBody = $app === "Quantumult X" ? new Uint8Array($response.bodyBytes ?? []) : ($response.body ?? new Uint8Array());
			switch (FORMAT) {
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
					switch (PLATFORM) {
						case "YouTube": {
							body = BrowseResponse.fromBinary(rawBody);
							Languages[0] = "AUTO";
							if (body?.contents?.renderer?.elementRenderer?.n7F172660663?.n8F1?.n9F168777401?.n10F5?.n11F465160965?.n12F4?.n13F1) {
								const fullText = body.contents.renderer.elementRenderer.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1.map(line => line?.f1 ?? "\u200b");
								const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
								body.contents.renderer.elementRenderer.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1 = body.contents.renderer.elementRenderer.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1.map((line, i) => {
									if (line?.f1) line.f1 = combineText(line.f1, translation?.[i], Settings?.ShowOnly, Settings?.Position);
									return line;
								});
							} else if (body?.contents?.renderer?.sectionListRenderer?.contents) {
								let musicDescriptions = body.contents.renderer.sectionListRenderer.contents;
								musicDescriptions = await Promise.all(
									musicDescriptions.map(async musicDescription => {
										if (musicDescription?.musicDescriptionShelfRenderer?.description?.runs) {
											let lyrics = musicDescription.musicDescriptionShelfRenderer.description.runs;
											lyrics = await Promise.all(
												lyrics.map(async run => {
													let fullText = run?.text?.split?.("\n")?.map(text => text?.trim() ?? "\u200b");
													const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
													fullText = fullText.map((line, i) => {
														if (line) return combineText(line, translation?.[i], Settings?.ShowOnly, Settings?.Position, "\n  └ ");
													});
													run.text = fullText.join("\n");
													return run;
												}),
											);
										}
										return musicDescription;
									}),
								);
							}
							rawBody = BrowseResponse.toBinary(body);
							break;
						}
						case "Spotify": {
							body = ColorLyricsResponse.fromBinary(rawBody);
							Languages[0] = body?.lyrics?.language === "z1" ? "ZH-HANT" : body?.lyrics?.language ? body?.lyrics?.language.toUpperCase() : "AUTO";
							const fullText = body.lyrics.lines.map(line => line?.words ?? "\u200b");
							const translation = await Translator(Settings.Vendor, Settings.Method, fullText, Languages, Settings?.[Settings?.Vendor], Settings?.Times, Settings?.Interval, Settings?.Exponential);
							if (!body?.lyrics?.alternatives) body.lyrics.alternatives = [];
							body.lyrics.alternatives.unshift({
								language: Languages[1].toLowerCase(),
								lines: translation,
							});
							rawBody = ColorLyricsResponse.toBinary(body);
							break;
						}
					}
					break;
				case "application/grpc":
				case "application/grpc+proto":
					break;
			}
			// 写入二进制数据
			$response.body = rawBody;
			break;
		}
	}
})()
	.catch(e => Console.error(e))
	.finally(() => done($response));

/***************** Function *****************/
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
	Console.log("☑️ Translator", `vendor: ${vendor}`, `method: ${method}`, `[source, target]: ${[source, target]}`);
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
	}
	let Translation = [];
	switch (method) {
		default:
		case "Part": {
			// Part 逐段翻译
			const parts = chunk(text, length);
			Translation = await Promise.all(parts.map(async part => await retry(() => new Translate({ Source: source, Target: target, API: API })[vendor](part), times, interval, exponential))).then(part => part.flat(Number.POSITIVE_INFINITY));
			break;
		}
		case "Row": // Row 逐行翻译
			Translation = await Promise.all(text.map(async row => await retry(() => new Translate({ Source: source, Target: target, API: API })[vendor](row), times, interval, exponential)));
			break;
	}
	//Console.debug(`Translation: ${JSON.stringify(Translation)}`);
	Console.log("✅ Translator");
	return Translation;
}

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
}

/**
 * Chunk Array
 * @author VirgilClyne
 * @param {Array} source - source
 * @param {Number} length - number
 * @return {Array<*>} target
 */
function chunk(source, length) {
	Console.log("☑️ Chunk Array");
	let index = 0,
		target = [];
	while (index < source.length) target.push(source.slice(index, (index += length)));
	//Console.log("✅ Chunk Array", `target: ${JSON.stringify(target)}`);
	return target;
}

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
	Console.log("☑️ retry", `剩余重试次数:${retriesLeft}`, `时间间隔:${interval}ms`);
	try {
		const val = await fn();
		return val;
	} catch (error) {
		if (retriesLeft) {
			await new Promise(r => setTimeout(r, interval));
			return retry(fn, retriesLeft - 1, exponential ? interval * 2 : interval, exponential);
		} else throw new Error("❌ retry, 最大重试次数");
	}
}
