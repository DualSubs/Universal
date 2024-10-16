/*! https://DualSubs.github.io */
(() => { // webpackBootstrap
"use strict";
var __webpack_modules__ = ({
"./src/WebVTT/WebVTT.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return WebVTT; }
});
// refer: https://www.w3.org/TR/webvtt1/
class WebVTT {
	static name = "WebVTT";
	static version = "2.2.0";
	static about = () => console.log(`\n🟧 ${this.name} v${this.version}\n`);

	static parse(vtt = new String, options = { milliseconds: true, timeStamp: true, line: "single", lineBreak: "\n" }) {
		const WebVTTCueRegex = (options.milliseconds) ? /^((?<index>\d+)(\r\n|\r|\n))?(?<timing>(?<startTime>[0-9:.,]+) --> (?<endTime>[0-9:.,]+)) ?(?<settings>.+)?[^](?<text>[\s\S]*)?$/
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
					Json.style = cues.join(options.lineBreak);
					break;
				};
				default:
					let cue = item.match(WebVTTCueRegex)?.groups;
					if (cue) {
						if (Json.headers?.type !== "WEBVTT") {
							cue.timing = cue?.timing?.replace?.(",", ".");
							cue.startTime = cue?.startTime?.replace?.(",", ".");
							cue.endTime = cue?.endTime?.replace?.(",", ".");
						}
						if (options.timeStamp) {
							let ISOString = cue?.startTime?.replace?.(/(.*)/, "1970-01-01T$1Z")
							cue.timeStamp = (options.milliseconds) ? Date.parse(ISOString) : Date.parse(ISOString) / 1000;
						}
						cue.text = cue?.text?.trimEnd?.();
						switch (options.line) {
							case "single":
								cue.text = cue?.text?.replace?.(/\r\n|\r|\n/, " ");
								break;
							case "multi":
								cue.text = cue?.text?.split?.(/\r\n|\r|\n/);
								break;
						};
						Json.body.push(cue);
					};
					break;
			}
		});
		return Json;
	};

	static stringify(json = { headers: {}, comments: [], style: "", body: [] }, options = { milliseconds: true, timeStamp: true, line: "single", lineBreak: "\n" }) {
		let vtt = [
			json.headers = [json.headers?.type || "", json.headers?.options || ""].flat(Infinity).join(options.lineBreak),
			json.comments = json?.comments?.join?.(options.lineBreak),
			json.style = (json?.style?.length > 0) ? ["STYLE", json.style].join(options.lineBreak) : "",
			json.body = json.body.map(item => {
				if (Array.isArray(item.text)) item.text = item.text.join(options.lineBreak);
				item = `${(item.index) ? item.index + options.lineBreak : ""}${item.timing} ${item?.settings ?? ""}${options.lineBreak}${item.text}`;
				return item;
			}).join(options.lineBreak + options.lineBreak)
		].join(options.lineBreak + options.lineBreak).trim() + options.lineBreak + options.lineBreak;
		return vtt;
	};
};


}),
"./src/XML/XML.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return XML; }
});
// refer: https://github.com/Peng-YM/QuanX/blob/master/Tools/XMLParser/xml-parser.js
// refer: https://goessner.net/download/prj/jsonxml/
class XML {
	static name = "XML";
	static version = "0.4.2";
	static about = () => console.log(`\n🟧 ${this.name} v${this.version}\n`);
	
	static #ATTRIBUTE_KEY = "@";
	static #CHILD_NODE_KEY = "#";
	static #UNESCAPE = {
		"&amp;": "&",
		"&lt;": "<",
		"&gt;": ">",
		"&apos;": "'",
		"&quot;": '"'
	};
	static #ESCAPE = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"'": "&apos;",
		'"': "&quot;"
	};

	static parse(xml = new String, reviver = "") {
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
							child.raw = tag.match(/!\[CDATA\[(?<raw>.+)\]\]/)?.groups?.raw;
							//appendText(tag.slice(9, -2));
						} else if (/!--(.+)--/.test(tag)) {
							// Comment section
							child.name = "!--";
							child.raw = tag.match(/!--(?<raw>.+)--/)?.groups?.raw;
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

	static stringify(json = new Object, tab = "") {
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
						case "!--":
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


}),
"./src/class/Composite.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return Composite; }
});
/* harmony import */var _utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils.mjs */ "./src/utils/utils.mjs");


/** 
 * Composite Subtitles
 * @param {Object} Sub1 - Sub1
 * @param {Object} Sub2 - Sub2
 * @param {Array} Kind - options = ["asr", "captions"]
 * @param {Number} Offset - Offset
 * @param {Number} Tolerance - Tolerance
 * @param {Array} Position - Position = ["Forward", "Reverse"]
 * @return {String} DualSub
 */
class Composite {
	constructor(options = {}) {
		this.Name = "Composite";
		this.Version = "1.0.2";
		this.Offset = 0;
		this.Tolerance = 0;
		this.Position = "Forward";
		Object.assign(this, options)
		;(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`\n🟧 ${this.Name} v${this.Version}\n`)
	}

	JSON(Sub1 = {}, Sub2 = {}, Kind = "captions", Offset = this.Offset, Tolerance = this.Tolerance, Position = this.Position) {
		(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ Composite JSON Subtitles\nOffset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
		//let DualSub = Position.includes("Reverse") ? Sub2 : Sub1
		let DualSub = Sub1;
		//log(`🚧 let DualSub内容: ${JSON.stringify(DualSub)}`, "");
		// 有序数列 用不着排序
		//FirstSub.body.sort((x, y) => x - y);
		//SecondSub.body.sort((x, y) => x - y);
		let index0 = 0, index1 = 0, index2 = 0;
		// 双指针法查找两个数组中的相同元素
		const length1 = Sub1?.events?.length, length2 = Sub2?.events?.length;
		switch (Kind) {
			case "asr":
				// 自动生成字幕转普通字幕
				(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ DualSub是自动生成字幕`, "");
				index0 = 1, index1 = 1, index2 = 1;
				Sub1.events = Sub1.events.map(event => {
					if (event?.segs) {
						if (Array.isArray(event?.segs)) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join("") }];
					};
					delete event.wWinId;
					return event;
				});
				Sub2.events = Sub2.events.map(event => {
					if (event?.segs) {
						if (Array.isArray(event?.segs)) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join("") }];
					};
					delete event.wWinId;
					return event;
				});
				//break; 不要break，连续处理
			case "captions":
			default:
				// 处理普通字幕
				while (index1 < length1 && index2 < length2) {
					//log(`🚧 index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
					const timeStamp1 = Sub1.events[index1].tStartMs, timeStamp2 = Sub2.events[index2].tStartMs;
					//log(`🚧 timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
					const timeStamp1Next = Sub1.events[index1 + 1]?.tStartMs ?? timeStamp1, timeStamp2Next = Sub2.events[index2 + 1]?.tStartMs ?? timeStamp2;
					if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
						//index0 = (Position === "Reverse") ? index2 : index1;
						index0 = index1;
						// 处理普通字幕
						const text1 = Sub1.events[index1]?.segs?.[0].utf8 ?? "", text2 = Sub2.events[index2]?.segs?.[0].utf8 ?? "";
						//log(`🚧 text1: ${text1}, text2: ${text2}`, "");
						DualSub.events[index0].segs = [{ "utf8": ((Position === "Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`).trim() }];
						//log(`🚧  DualSub.events[index0].segs[0].utf8: ${DualSub.events[index0].segs[0].utf8}`, "");
						//DualSub.body[index0].tStartMs = (Position === "Reverse") ? timeStamp2 : timeStamp1;
						//DualSub.body[index0].index = (Position === "Reverse") ? index2 : index1;
					};
					if (Math.abs(timeStamp1Next - timeStamp2Next) <= Tolerance) { index1++; index2++ }
					else {
						if (timeStamp2 > timeStamp1) index1++
						else if (timeStamp1 > timeStamp2) index2++
						else { index1++; index2++ };
					};
				};
		};
		//log(`✅ Composite JSON Subtitles, DualSub内容: ${JSON.stringify(DualSub)}`, "");
		(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ Composite JSON Subtitles`, "");
		return DualSub;
	};

	timedText(Sub1 = {}, Sub2 = {}, Kind = "captions", Offset = this.Offset, Tolerance = this.Tolerance, Position = this.Position) {
		(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ Composite timedText Subtitles\nOffset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
		//let DualSub = Position.includes("Reverse") ? Sub2 : Sub1
		let DualSub = Sub1;
		//log(`🚧 let DualSub内容: ${JSON.stringify(DualSub)}`, "");
		// 有序数列 用不着排序
		//FirstSub.body.sort((x, y) => x - y);
		//SecondSub.body.sort((x, y) => x - y);
		let index0 = 0, index1 = 0, index2 = 0;
		// 双指针法查找两个数组中的相同元素
		const length1 = Sub1?.timedtext?.body?.p?.length, length2 = Sub2?.timedtext?.body?.p?.length;
		switch (Kind) {
			case "asr":
				// 自动生成字幕转普通字幕
				(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ DualSub是自动生成字幕`, "");
				DualSub.timedtext.head.wp[1]["@rc"] = "1";
				Sub1.timedtext.body.p = Sub1.timedtext.body.p.map(para => {
					if (para?.s) {
						if (Array.isArray(para?.s)) para["#"] = para?.s.map(seg => seg["#"]).join("");
						else para["#"] = para.s?.["#"] ?? "";
						delete para.s;
					};
					return para;
				});
				Sub2.timedtext.body.p = Sub2.timedtext.body.p.map(para => {
					if (para?.s) {
						if (Array.isArray(para?.s)) para["#"] = para?.s.map(seg => seg["#"]).join("");
						else para["#"] = para.s?.["#"] ?? "";
						delete para.s;
					};
					return para;
				});
				//break; 不要break，连续处理
			case "captions":
			default:
				// 处理普通字幕
				while (index1 < length1 && index2 < length2) {
					//log(`🚧 index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
					const timeStamp1 = parseInt(Sub1.timedtext.body.p[index1]["@t"], 10), timeStamp2 = parseInt(Sub2.timedtext.body.p[index2]["@t"], 10);
					//log(`🚧 timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
					const timeStamp1Next = parseInt(Sub1.timedtext.body.p[index1 + 1]?.["@t"] ?? timeStamp1, 10), timeStamp2Next = parseInt(Sub2.timedtext.body.p[index2 + 1]?.["@t"] ?? timeStamp2, 10);
					if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
						//index0 = (Position === "Reverse") ? index2 : index1;
						index0 = index1;
						// 处理普通字幕
						const text1 = Sub1.timedtext.body.p[index1]?.["#"] ?? "", text2 = Sub2.timedtext.body.p[index2]?.["#"] ?? "";
						//log(`🚧 text1: ${text1}, text2: ${text2}`, "");
						DualSub.timedtext.body.p[index0]["#"] = ((Position === "Reverse") ? `${text2}&#x000A;${text1}` : `${text1}&#x000A;${text2}`).trim();
						//log(`🚧 DualSub.timedtext.body.p[index0]["#"]: ${DualSub.timedtext.body.p[index0]["#"]}`, "");
						//DualSub.timedtext.body.p[index0]["@t"] = (Position === "Reverse") ? timeStamp2 : timeStamp1;
						//DualSub.timedtext.body.p[index0].index = (Position === "Reverse") ? index2 : index1;
					};
					if (Math.abs(timeStamp1Next - timeStamp2Next) <= Tolerance) { index1++; index2++ }
					else {
						if (timeStamp2 > timeStamp1) index1++
						else if (timeStamp1 > timeStamp2) index2++
						else { index1++; index2++ };
					};
				};
				break;
		};
		//log(`✅ Composite timedText Subtitles, DualSub内容: ${JSON.stringify(DualSub)}`, "");
		(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ Composite timedText Subtitles`, "");
		return DualSub;
	};

	webVTT(Sub1 = {}, Sub2 = {}, Offset = this.Offset, Tolerance = this.Tolerance, Position = this.Position) {
		(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ Composite webVTT Subtitles\nOffset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
		//let DualSub = Position.includes("Reverse") ? Sub2 : Sub1
		let DualSub = Sub1;
		//log(`🚧 let DualSub内容: ${JSON.stringify(DualSub)}`, "");
		// 有序数列 用不着排序
		//FirstSub.body.sort((x, y) => x - y);
		//SecondSub.body.sort((x, y) => x - y);
		let index0 = 0, index1 = 0, index2 = 0;
		// 双指针法查找两个数组中的相同元素
		const length1 = Sub1?.body?.length, length2 = Sub2?.body?.length;
		while (index1 < length1 && index2 < length2) {
			//log(`🚧 index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
			const timeStamp1 = Sub1.body[index1].timeStamp, timeStamp2 = Sub2.body[index2].timeStamp;
			//log(`🚧 timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
			const timeStamp1Next = Sub1.body[index1 + 1]?.timeStamp ?? timeStamp1, timeStamp2Next = Sub2.body[index2 + 1]?.timeStamp ?? timeStamp2;
			// 处理普通字幕
			const text1 = Sub1.body[index1]?.text ?? "", text2 = Sub2.body[index2]?.text ?? "";
			//log(`🚧 text1: ${text1}, text2: ${text2}`, "");
			if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
				//index0 = (Position === "Reverse") ? index2 : index1;
				index0 = index1;
				// 处理普通字幕
				DualSub.body[index0].text = ((Position === "Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`).trim();
				//log(`🚧 index0: ${index0}, text: ${DualSub.body[index0].text}`, "");
				//DualSub.body[index0].timeStamp = (Position === "Reverse") ? timeStamp2 : timeStamp1;
				//DualSub.body[index0].index = (Position === "Reverse") ? index2 : index1;
			}
			if (Math.abs(timeStamp1Next - timeStamp2Next) <= Tolerance) { index1++; index2++ }
			else {
				if (timeStamp2 > timeStamp1) index1++
				else if (timeStamp1 > timeStamp2) index2++
				else { index1++; index2++ };
			};
		};
		//log(`✅ Composite webVTT Subtitles, DualSub内容: ${JSON.stringify(DualSub)}`, "");
		(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ Composite webVTT Subtitles`, "");
		return DualSub;
	};


	spotifyLyric(Lyric1 = [], Lyric2 = [], Offset = this.Offset, Tolerance = this.Tolerance, Position = this.Position) {
		(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ Composite Spotify Lyrics\nOffset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
		//let Lyric = Position.includes("Reverse") ? Lyric2 : Lyric1
		let Lyric = Lyric1;
		//log(`🚧 let Lyric: ${JSON.stringify(Lyric)}`, "");
		// 有序数列 用不着排序
		//FirstSub.body.sort((x, y) => x - y);
		//SecondSub.body.sort((x, y) => x - y);
		let index0 = 0, index1 = 0, index2 = 0;
		// 双指针法查找两个数组中的相同元素
		const length1 = Lyric1?.length, length2 = Lyric2?.length;
		while (index1 < length1 && index2 < length2) {
			//log(`🚧 index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
			const timeStamp1 = Lyric1[index1].startTimeMs, timeStamp2 = Lyric2[index2].startTimeMs + Offset;
			//log(`🚧 timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
			const timeStamp1Next = Lyric1[index1 + 1]?.startTimeMs ?? timeStamp1, timeStamp2Next = Lyric2[index2 + 1]?.startTimeMs + this.Offset ?? timeStamp2;
			// 处理普通字幕
			const text1 = Lyric1[index1]?.words ?? "", text2 = Lyric2[index2]?.words ?? "";
			//log(`🚧 text1: ${text1}, text2: ${text2}`, "");
			if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
				//index0 = (Position === "Reverse") ? index2 : index1;
				index0 = index1;
				// 处理普通字幕
				Lyric[index0].words = ((Position === "Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`).trim();
				Lyric[index0].owords = text1.trim();
				Lyric[index0].twords = text2.trim();
				//log(`🚧 index0: ${index0}, words: ${Lyric[index0].words}`, "");
				//Lyric[index0].startTimeMs = (Position === "Reverse") ? timeStamp2 : timeStamp1;
				//Lyric[index0].index = (Position === "Reverse") ? index2 : index1;
			}
			if (Math.abs(timeStamp1Next - timeStamp2Next) <= Tolerance) { index1++; index2++ }
			else {
				if (timeStamp2 > timeStamp1) index1++
				else if (timeStamp1 > timeStamp2) index2++
				else { index1++; index2++ };
			};
		};
		//log(`✅ Composite Spotify Lyrics, Lyric: ${JSON.stringify(Lyric)}`, "");
		(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ Composite Spotify Lyrics`, "");
		return Lyric;
	};
};


}),
"./src/database/index.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
var _Default_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
var _Universal_json__WEBPACK_IMPORTED_MODULE_1___namespace_cache;
var _YouTube_json__WEBPACK_IMPORTED_MODULE_2___namespace_cache;
var _Netflix_json__WEBPACK_IMPORTED_MODULE_3___namespace_cache;
var _Spotify_json__WEBPACK_IMPORTED_MODULE_4___namespace_cache;
var _Composite_json__WEBPACK_IMPORTED_MODULE_5___namespace_cache;
var _Translate_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache;
var _External_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache;
var _API_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache;
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return __WEBPACK_DEFAULT_EXPORT__; }
});
/* harmony import */var _Default_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Default.json */ "./src/database/Default.json");
/* harmony import */var _Universal_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Universal.json */ "./src/database/Universal.json");
/* harmony import */var _YouTube_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./YouTube.json */ "./src/database/YouTube.json");
/* harmony import */var _Netflix_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Netflix.json */ "./src/database/Netflix.json");
/* harmony import */var _Spotify_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Spotify.json */ "./src/database/Spotify.json");
/* harmony import */var _Composite_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Composite.json */ "./src/database/Composite.json");
/* harmony import */var _Translate_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Translate.json */ "./src/database/Translate.json");
/* harmony import */var _External_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./External.json */ "./src/database/External.json");
/* harmony import */var _API_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./API.json */ "./src/database/API.json");










/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Database = {
	"Default": /*#__PURE__*/ (_Default_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_Default_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_Default_json__WEBPACK_IMPORTED_MODULE_0__))),
	"Universal": /*#__PURE__*/ (_Universal_json__WEBPACK_IMPORTED_MODULE_1___namespace_cache || (_Universal_json__WEBPACK_IMPORTED_MODULE_1___namespace_cache = __webpack_require__.t(_Universal_json__WEBPACK_IMPORTED_MODULE_1__))),
	"YouTube": /*#__PURE__*/ (_YouTube_json__WEBPACK_IMPORTED_MODULE_2___namespace_cache || (_YouTube_json__WEBPACK_IMPORTED_MODULE_2___namespace_cache = __webpack_require__.t(_YouTube_json__WEBPACK_IMPORTED_MODULE_2__))),
	"Netflix": /*#__PURE__*/ (_Netflix_json__WEBPACK_IMPORTED_MODULE_3___namespace_cache || (_Netflix_json__WEBPACK_IMPORTED_MODULE_3___namespace_cache = __webpack_require__.t(_Netflix_json__WEBPACK_IMPORTED_MODULE_3__))),
	"Spotify": /*#__PURE__*/ (_Spotify_json__WEBPACK_IMPORTED_MODULE_4___namespace_cache || (_Spotify_json__WEBPACK_IMPORTED_MODULE_4___namespace_cache = __webpack_require__.t(_Spotify_json__WEBPACK_IMPORTED_MODULE_4__))),
	"Composite": /*#__PURE__*/ (_Composite_json__WEBPACK_IMPORTED_MODULE_5___namespace_cache || (_Composite_json__WEBPACK_IMPORTED_MODULE_5___namespace_cache = __webpack_require__.t(_Composite_json__WEBPACK_IMPORTED_MODULE_5__))),
	"Translate": /*#__PURE__*/ (_Translate_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache || (_Translate_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache = __webpack_require__.t(_Translate_json__WEBPACK_IMPORTED_MODULE_6__))),
	"External": /*#__PURE__*/ (_External_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache || (_External_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache = __webpack_require__.t(_External_json__WEBPACK_IMPORTED_MODULE_7__))),
	"API": /*#__PURE__*/ (_API_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache || (_API_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache = __webpack_require__.t(_API_json__WEBPACK_IMPORTED_MODULE_8__))),
});


}),
"./src/function/constructSubtitlesQueue.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return constructSubtitlesQueue; }
});
/* harmony import */var _utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils.mjs */ "./src/utils/utils.mjs");


/**
 * Construct Subtitles Queue
 * @author VirgilClyne
 * @param {String} fileName - Request URL
 * @param {Array} VTTs1 - Primary (Source) Language Subtitles Array
 * @param {Array} VTTs2 - Second (Target) Language Subtitles Array
 * @return {Array<*>} Subtitles Requests Queue
 */
function constructSubtitlesQueue(request, fileName, VTTs1 = [], VTTs2 = []) {
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ Construct Subtitles Queue, fileName: ${fileName}`, "");
	let requests = [];
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 Construct Subtitles Queue, VTTs1.length: ${VTTs1.length}, VTTs2.length: ${VTTs2.length}`, "")
	//log(`🚧 Construct Subtitles Queue, VTTs1: ${JSON.stringify(VTTs1)}, VTTs2.length: ${JSON.stringify(VTTs2)}`, "")
	// 查询当前字幕在原字幕队列中的位置
	const Index1 = VTTs1.findIndex(item => item?.includes(fileName));
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 Construct Subtitles Queue, Index1: ${Index1}`, "");
	switch (VTTs2.length) {
		case 0: // 长度为0，无须计算
            (0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ Construct Subtitles Queue, 长度为 0`, "")
			break;
		case 1: { // 长度为1，无须计算
			(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ Construct Subtitles Queue, 长度为 1`, "")
			let request2 = {
				"url": VTTs2[0],
				"headers": request.headers
			};
			requests.push(request2);
			break;
		};
		case VTTs1.length: { // 长度相等，一一对应，无须计算
			(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ Construct Subtitles Queue, 长度相等`, "")
			let request2 = {
				"url": VTTs2[Index1],
				"headers": request.headers
			};
			requests.push(request2);
			break;
		};
		default: { // 长度不等，需要计算
			(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ Construct Subtitles Queue, 长度不等，需要计算`, "")
			// 计算当前字幕在原字幕队列中的百分比
			const Position1 = (Index1 + 1) / VTTs1.length; // 从 0 开始计数，所以要加 1
			(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 Construct Subtitles Queue, Position1: ${Position1}, Index2: ${Index1}/${VTTs1.length}`, "");
			// 根据百分比计算当前字幕在新字幕队列中的位置
			//let Index2 = VTTs2.findIndex(item => item.includes(fileName));
			const Index2 = Math.round(Position1 * VTTs2.length - 1); // 从 0 开始计数，所以要减 1
			(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 Construct Subtitles Queue, Position2: ${Position1}, Index2: ${Index2}/${VTTs2.length}`, "");
			// 获取两字幕队列长度差值
			const diffLength = Math.abs(VTTs2.length - VTTs1.length);
			// 获取当前字幕在新字幕队列中的前后1个字幕
			//const BeginIndex = (Index2 - 1 < 0) ? 0 : Index2 - 1, EndIndex = Index2 + 1;
			const BeginIndex = Math.min(Index1, Index2);
			const EndIndex = Math.max(Index1, Index2);
			(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 Construct Subtitles Queue, diffLength: ${diffLength}, BeginIndex: ${BeginIndex}, EndIndex: ${EndIndex}`, "");
			const nearlyVTTs = VTTs2.slice(Math.max(0, BeginIndex - diffLength), Math.max(EndIndex, EndIndex + diffLength) + 1) // slice 不取 EndIndex 本身
			//const nearlyVTTs = VTTs2.slice(BeginIndex, EndIndex + 1); // slice 不取 EndIndex 本身
			;(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 Construct Subtitles Queue, nearlyVTTs: ${JSON.stringify(nearlyVTTs)}`, "");
			nearlyVTTs.forEach(url => {
				let request2 = {
					"url": url,
					"headers": request.headers
				};
				requests.push(request2);
			});
			/*
			requests = nearlyVTTs.map(url => {
				let _request = {
					"url": url,
					"headers": request.headers
				};
				return _request;
			});
			*/
			break;
		};
	};
	//log(`🚧 Construct Subtitles Queue, requests: ${JSON.stringify(requests)}`, "");
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ Construct Subtitles Queue`, "");
	return requests;
};


}),
"./src/function/detectFormat.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return detectFormat; }
});
/* harmony import */var _utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils.mjs */ "./src/utils/utils.mjs");


/**
 * detect Format
 * @author VirgilClyne
 * @param {Object} url - Parsed URL
 * @param {String} body - response body
 * @return {String} format - format
 */
function detectFormat(url = new URL(), body, format = undefined) {
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ detectFormat, format: ${url.format || url.searchParams.get("fmt") || url.searchParams.get("format")}`, "");
	switch (url.format || url.searchParams.get("fmt") || url.searchParams.get("format")) {
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
			//log(`🚧 detectFormat, HEADER: ${HEADER}`, "");
			//log(`🚧 detectFormat, HEADER?.substring?.(0, 1): ${HEADER?.substring?.(0, 1)}`, "");
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
						default:
							format = format;
							break;
					};
					break;
				case undefined:
					format = undefined;
					break;
			};
			break;
	};
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ detectFormat, format: ${format}`, "");
	return format;
};


}),
"./src/function/detectPlatform.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return detectPlatform; }
});
/* harmony import */var _utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils.mjs */ "./src/utils/utils.mjs");


function detectPlatform(url) {
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ Detect Platform`, "");
	/***************** Platform *****************/
	let Platform = /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
		: /(\.youtube|youtubei\.googleapis)\.com/i.test(url) ? "YouTube"
			: /\.spotify(cdn)?\.com/i.test(url) ? "Spotify"
				: /\.apple\.com/i.test(url) ? "Apple"
					: /\.(dssott|starott)\.com/i.test(url) ? "Disney+"
						: /primevideo\.com|(\.(pv-cdn|aiv-cdn|akamaihd|cloudfront)\.net)|s3\.amazonaws\.com\/aiv-prod-timedtext\//i.test(url) ? "PrimeVideo"
							: /prd\.media\.h264\.io/i.test(url) ? "Max"
								: /\.(api\.hbo|hbomaxcdn)\.com/i.test(url) ? "HBOMax"
									: /\.hulu(stream|im)?\.com/i.test(url) ? "Hulu"
										: /\.(pplus\.paramount\.tech|cbs(aavideo|cbsivideo)?\.com)/i.test(url) ? "Paramount+"
											: /\.uplynk\.com/i.test(url) ? "Discovery+"
												: /dplus-ph-/i.test(url) ? "Discovery+Ph"
													: /\.peacocktv\.com/i.test(url) ? "PeacockTV"
														: /\.fubo\.tv/i.test(url) ? "FuboTV"
															: /\.viki\.io/i.test(url) ? "Viki"
																: /epix(hls\.akamaized\.net|\.services\.io)/i.test(url) ? "MGM+"
																	: /\.nebula\.app/i.test(url) ? "Nebula"
																		: /\.pluto(\.tv|tv\.net)/i.test(url) ? "PlutoTV"
																			: /\.mubicdn\.net/i.test(url) ? "MUBI"
																				: "Universal";
    (0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ Detect Platform, Platform: ${Platform}`, "");
	return Platform;
};


}),
"./src/function/setCache.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return setCache; }
});
/* harmony import */var _utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils.mjs */ "./src/utils/utils.mjs");


/**
 * Set Cache
 * @author VirgilClyne
 * @param {Map} cache - Playlists Cache / Subtitles Cache
 * @param {Number} cacheSize - Cache Size
 * @return {Boolean} isSaved
 */
function setCache(cache, cacheSize = 100) {
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ Set Cache, cacheSize: ${cacheSize}`, "");
	cache = Array.from(cache || []); // Map转Array
	cache = cache.slice(-cacheSize); // 限制缓存大小
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ Set Cache`, "");
	return cache;
};


}),
"./src/function/setENV.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return setENV; }
});
/* harmony import */var _utils_getStorage_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getStorage.mjs */ "./src/utils/getStorage.mjs");
/* harmony import */var _utils_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.mjs */ "./src/utils/utils.mjs");



/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV(name, platforms, database) {
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.log)(`☑️ Set Environment Variables`, "");
	let { Settings, Caches, Configs } = (0,_utils_getStorage_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(name, platforms, database);
	/***************** Settings *****************/
	if (!Array.isArray(Settings?.Types)) Settings.Types = (Settings.Types) ? [Settings.Types] : []; // 只有一个选项时，无逗号分隔
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.log)(`✅ Set Environment Variables, Settings: ${typeof Settings}, Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	//log(`✅ Set Environment Variables, Caches: ${typeof Caches}, Caches内容: ${JSON.stringify(Caches)}`, "");
	if (typeof Caches?.Playlists !== "object" || Array.isArray(Caches?.Playlists)) Caches.Playlists = {}; // 创建Playlists缓存
	Caches.Playlists.Master = new Map(JSON.parse(Caches?.Playlists?.Master || "[]")); // Strings转Array转Map
	Caches.Playlists.Subtitle = new Map(JSON.parse(Caches?.Playlists?.Subtitle || "[]")); // Strings转Array转Map
	if (typeof Caches?.Subtitles !== "object") Caches.Subtitles = new Map(JSON.parse(Caches?.Subtitles || "[]")); // Strings转Array转Map
	if (typeof Caches?.Metadatas !== "object" || Array.isArray(Caches?.Metadatas)) Caches.Metadatas = {}; // 创建Playlists缓存
	if (typeof Caches?.Metadatas?.Tracks !== "object") Caches.Metadatas.Tracks = new Map(JSON.parse(Caches?.Metadatas?.Tracks || "[]")); // Strings转Array转Map
	/***************** Configs *****************/
	return { Settings, Caches, Configs };
};


}),
"./src/utils/Lodash.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return Lodash; }
});
/* https://www.lodashjs.com */
class Lodash {
	static name = "Lodash";
	static version = "1.2.2";
	static about() { return console.log(`\n🟧 ${this.name} v${this.version}\n`) };

	static get(object = {}, path = "", defaultValue = undefined) {
		// translate array case to dot case, then split with .
		// a[0].b -> a.0.b -> ['a', '0', 'b']
		if (!Array.isArray(path)) path = this.toPath(path)

		const result = path.reduce((previousValue, currentValue) => {
			return Object(previousValue)[currentValue]; // null undefined get attribute will throwError, Object() can return a object 
		}, object)
		return (result === undefined) ? defaultValue : result;
	}

	static set(object = {}, path = "", value) {
		if (!Array.isArray(path)) path = this.toPath(path)
		path
			.slice(0, -1)
			.reduce(
				(previousValue, currentValue, currentIndex) =>
					(Object(previousValue[currentValue]) === previousValue[currentValue])
						? previousValue[currentValue]
						: previousValue[currentValue] = (/^\d+$/.test(path[currentIndex + 1]) ? [] : {}),
				object
			)[path[path.length - 1]] = value
		return object
	}

	static unset(object = {}, path = "") {
		if (!Array.isArray(path)) path = this.toPath(path)
		let result = path.reduce((previousValue, currentValue, currentIndex) => {
			if (currentIndex === path.length - 1) {
				delete previousValue[currentValue]
				return true
			}
			return Object(previousValue)[currentValue]
		}, object)
		return result
	}

	static toPath(value) {
		return value.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
	}

	static escape(string) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		}
		return string.replace(/[&<>"']/g, m => map[m])
	};

	static unescape(string) {
		const map = {
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#39;': "'",
		}
		return string.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, m => map[m])
	}

}


}),
"./src/utils/Storage.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return Storage; }
});
/* harmony import */var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./src/utils/utils.mjs");

/* https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/setItem */
class Storage {
	static name = "Storage";
	static version = "1.1.0";
	static about () { return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `🟧 ${this.name} v${this.version}`, "") };
	static data = null;
	static dataFile = 'box.dat';
	static #nameRegex = /^@(?<key>[^.]+)(?:\.(?<path>.*))?$/;

    static getItem(keyName = new String, defaultValue = null) {
        let keyValue = defaultValue;
        // 如果以 @
		switch (keyName.startsWith('@')) {
			case true:
				const { key, path } = keyName.match(this.#nameRegex)?.groups;
				//log(`1: ${key}, ${path}`);
				keyName = key;
				let value = this.getItem(keyName, {});
				//log(`2: ${JSON.stringify(value)}`)
				if (typeof value !== "object") value = {};
				//log(`3: ${JSON.stringify(value)}`)
				keyValue = _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.get(value, path);
				//log(`4: ${JSON.stringify(keyValue)}`)
				try {
					keyValue = JSON.parse(keyValue);
				} catch (e) {
					// do nothing
				};
				//log(`5: ${JSON.stringify(keyValue)}`)
				break;
			default:
				switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Egern':
					case 'Shadowrocket':
						keyValue = $persistentStore.read(keyName);
						break;
					case 'Quantumult X':
						keyValue = $prefs.valueForKey(keyName);
						break;
					case 'Node.js':
						this.data = this.#loaddata(this.dataFile);
						keyValue = this.data?.[keyName];
						break;
					default:
						keyValue = this.data?.[keyName] || null;
						break;
				};
				try {
					keyValue = JSON.parse(keyValue);
				} catch (e) {
					// do nothing
				};
				break;
		};
		return keyValue ?? defaultValue;
    };

	static setItem(keyName = new String, keyValue = new String) {
		let result = false;
		//log(`0: ${typeof keyValue}`);
		switch (typeof keyValue) {
			case "object":
				keyValue = JSON.stringify(keyValue);
				break;
			default:
				keyValue = String(keyValue);
				break;
		};
		switch (keyName.startsWith('@')) {
			case true:
				const { key, path } = keyName.match(this.#nameRegex)?.groups;
				//log(`1: ${key}, ${path}`);
				keyName = key;
				let value = this.getItem(keyName, {});
				//log(`2: ${JSON.stringify(value)}`)
				if (typeof value !== "object") value = {};
				//log(`3: ${JSON.stringify(value)}`)
				_utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(value, path, keyValue);
				//log(`4: ${JSON.stringify(value)}`)
				result = this.setItem(keyName, value);
				//log(`5: ${result}`)
				break;
			default:
				switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Egern':
					case 'Shadowrocket':
						result = $persistentStore.write(keyValue, keyName);
						break;
					case 'Quantumult X':
						result =$prefs.setValueForKey(keyValue, keyName);
						break;
					case 'Node.js':
						this.data = this.#loaddata(this.dataFile)
						this.data[keyName] = keyValue
						this.#writedata(this.dataFile)
						result = true
						break;
					default:
						result = this.data?.[keyName] || null
						break;
				};
				break;
		};
		return result;
	};

    static removeItem(keyName){
		let result = false;
		switch (keyName.startsWith('@')) {
			case true:
				const { key, path } = keyName.match(this.#nameRegex)?.groups;
				keyName = key;
				let value = this.getItem(keyName);
				if (typeof value !== "object") value = {};
				keyValue = _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.unset(value, path);
				result = this.setItem(keyName, value);
				break;
			default:
				switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Egern':
					case 'Shadowrocket':
						result = false;
						break;
					case 'Quantumult X':
						result = $prefs.removeValueForKey(keyName);
						break;
					case 'Node.js':
						result = false
						break;
					default:
						result = false;
						break;
				};
				break;
		};
		return result;
    }

    static clear() {
		let result = false;
		switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Egern':
			case 'Shadowrocket':
				result = false;
				break;
			case 'Quantumult X':
				result = $prefs.removeAllValues();
				break;
			case 'Node.js':
				result = false
				break;
			default:
				result = false;
				break;
		};
		return result;
    }

	static #loaddata(dataFile) {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs')
			this.path = this.path ? this.path : require('path')
			const curDirDataFilePath = this.path.resolve(dataFile)
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				dataFile
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

	static #writedata(dataFile = this.dataFile) {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs')
			this.path = this.path ? this.path : require('path')
			const curDirDataFilePath = this.path.resolve(dataFile)
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				dataFile
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
	};

}


}),
"./src/utils/URL.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return URL; }
});
class URL {
	constructor(url, base = undefined) {
		const name = "URL";
		const version = "2.1.2";
		console.log(`\n🟧 ${name} v${version}\n`);
		url = this.#parse(url, base);
		return this;
	};

	#parse(url, base = undefined) {
		const URLRegex = /(?:(?<protocol>\w+:)\/\/(?:(?<username>[^\s:"]+)(?::(?<password>[^\s:"]+))?@)?(?<host>[^\s@/]+))?(?<pathname>\/?[^\s@?]+)?(?<search>\?[^\s?]+)?/
		const PortRegex = /(?<hostname>.+):(?<port>\d+)$/;
		url = url.match(URLRegex)?.groups || {};
		if (base) {
			base = base?.match(URLRegex)?.groups || {};
			if (!base.protocol || !base.hostname) throw new Error(`🚨 ${name}, ${base} is not a valid URL`);
		};
		if (url.protocol || base?.protocol) this.protocol = url.protocol || base.protocol;
		if (url.username || base?.username) this.username = url.username || base.username;
		if (url.password || base?.password) this.password = url.password || base.password;
		if (url.host || base?.host) {
			this.host = url.host || base.host;
			Object.freeze(this.host);
			this.hostname = this.host.match(PortRegex)?.groups.hostname ?? this.host;
			this.port = this.host.match(PortRegex)?.groups.port ?? "";
		};
		if (url.pathname || base?.pathname) {
			this.pathname = url.pathname || base?.pathname;
			if (!this.pathname.startsWith("/")) this.pathname = "/" + this.pathname;
			this.paths = this.pathname.split("/").filter(Boolean);
			Object.freeze(this.paths);
			if (this.paths) {
				const fileName = this.paths[this.paths.length - 1];
				if (fileName?.includes(".")) {
					const list = fileName.split(".");
					this.format = list[list.length - 1];
					Object.freeze(this.format);
				}
			};
		} else this.pathname = "";
		if (url.search || base?.search) {
			this.search = url.search || base.search;
			Object.freeze(this.search);
			if (this.search) this.searchParams = this.search.slice(1).split("&").map((param) => param.split("="));
		};
		this.searchParams = new Map(this.searchParams || []);
		this.harf = this.toString();
		Object.freeze(this.harf);
		return this;
	};

	toString() {
		let string = "";
		if (this.protocol) string += this.protocol + "//";
		if (this.username) string += this.username + (this.password ? ":" + this.password : "") + "@";
		if (this.hostname) string += this.hostname;
		if (this.port) string += ":" + this.port;
		if (this.pathname) string += this.pathname;
		if (this.searchParams.size !== 0) string += "?" + Array.from(this.searchParams).map(param => param.join("=")).join("&");
		return string;
	};

	toJSON() { return JSON.stringify({ ...this }) };
}


}),
"./src/utils/done.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return done; }
});
/* harmony import */var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./src/utils/utils.mjs");


function done(object = {}) {
    switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
        case "Surge":
            if (object.policy) _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(object, "headers.X-Surge-Policy", object.policy);
            (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `🚩 执行结束! 🕛 ${(new Date().getTime() / 1000 - $script.startTime)} 秒`, "");
            $done(object);
            break;
        case "Loon":
            if (object.policy) object.node = object.policy;
            (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `🚩 执行结束! 🕛 ${(new Date() - $script.startTime) / 1000} 秒`, "");
            $done(object);
            break;
        case "Stash":
            if (object.policy) _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(object, "headers.X-Stash-Selected-Proxy", encodeURI(object.policy));
            (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `🚩 执行结束! 🕛 ${(new Date() - $script.startTime) / 1000} 秒`, "");
            $done(object);
            break;
        case "Egern":
            (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `🚩 执行结束!`, "");
            $done(object);
            break;
        case "Shadowrocket":
        default:
            (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `🚩 执行结束!`, "");
            $done(object);
            break;
        case "Quantumult X":
            if (object.policy) _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(object, "opts.policy", object.policy);
            // 移除不可写字段
            delete object["auto-redirect"];
            delete object["auto-cookie"];
            delete object["binary-mode"];
            delete object.charset;
            delete object.host;
            delete object.insecure;
            delete object.method; // 1.4.x 不可写
            delete object.opt; // $task.fetch() 参数, 不可写
            delete object.path; // 可写, 但会与 url 冲突
            delete object.policy;
            delete object["policy-descriptor"];
            delete object.scheme;
            delete object.sessionIndex;
            delete object.statusCode;
            delete object.timeout;
            if (object.body instanceof ArrayBuffer) {
                object.bodyBytes = object.body;
                delete object.body;
            } else if (ArrayBuffer.isView(object.body)) {
                object.bodyBytes = object.body.buffer.slice(object.body.byteOffset, object.body.byteLength + object.body.byteOffset);
                delete object.body;
            } else if (object.body) delete object.bodyBytes;
            (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `🚩 执行结束!`, "");
            $done(object);
            break;
        case "Node.js":
            (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `🚩 执行结束!`, "");
            process.exit(1);
            break;
    }
}


}),
"./src/utils/fetch.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return fetch; }
});
/* harmony import */var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./src/utils/utils.mjs");
/* harmony import */var _initGotEnv_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initGotEnv.mjs */ "./src/utils/initGotEnv.mjs");


async function fetch(request = {} || "", option = {}) {
    // 初始化参数
    switch (request.constructor) {
        case Object:
            request = { ...option, ...request };
            break;
        case String:
            request = { ...option, "url": request };
            break;
    };
    // 自动判断请求方法
    if (!request.method) {
        request.method = "GET";
        if (request.body ?? request.bodyBytes) request.method = "POST";
    };
    // 移除请求头中的部分参数, 让其自动生成
    delete request.headers?.Host;
    delete request.headers?.[":authority"];
    delete request.headers?.["Content-Length"];
    delete request.headers?.["content-length"];
    // 定义请求方法（小写）
    const method = request.method.toLocaleLowerCase();
    // 判断平台
    switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
        case "Loon":
        case "Surge":
        case "Stash":
        case "Egern":
        case "Shadowrocket":
        default:
            // 转换请求参数
            if (request.timeout) {
                request.timeout = parseInt(request.timeout, 10);
                switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
                    case "Loon":
                    case "Shadowrocket":
                    case "Stash":
                    case "Egern":
                    default:
                        request.timeout = request.timeout / 1000;
                        break;
                    case "Surge":
                        break;
                };
            };
            if (request.policy) {
                switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
                    case "Loon":
                        request.node = request.policy;
                        break;
                    case "Stash":
                        _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(request, "headers.X-Stash-Selected-Proxy", encodeURI(request.policy));
                        break;
                    case "Shadowrocket":
                        _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(request, "headers.X-Surge-Proxy", request.policy);
                        break;
                };
            };
            if (typeof request.redirection === "boolean") request["auto-redirect"] = request.redirection;
            // 转换请求体
            if (request.bodyBytes && !request.body) {
                request.body = request.bodyBytes;
                delete request.bodyBytes;
            };
            // 发送请求
            return await new Promise((resolve, reject) => {
                $httpClient[method](request, (error, response, body) => {
                    if (error) reject(error);
                    else {
                        response.ok = /^2\d\d$/.test(response.status);
                        response.statusCode = response.status;
                        if (body) {
                            response.body = body;
                            if (request["binary-mode"] == true) response.bodyBytes = body;
                        };
                        resolve(response);
                    }
                });
            });
        case "Quantumult X":
            // 转换请求参数
            if (request.policy) _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(request, "opts.policy", request.policy);
            if (typeof request["auto-redirect"] === "boolean") _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(request, "opts.redirection", request["auto-redirect"]);
            // 转换请求体
            if (request.body instanceof ArrayBuffer) {
                request.bodyBytes = request.body;
                delete request.body;
            } else if (ArrayBuffer.isView(request.body)) {
                request.bodyBytes = request.body.buffer.slice(request.body.byteOffset, request.body.byteLength + request.body.byteOffset);
                delete object.body;
            } else if (request.body) delete request.bodyBytes;
            // 发送请求
            return await $task.fetch(request).then(
                response => {
                    response.ok = /^2\d\d$/.test(response.statusCode);
                    response.status = response.statusCode;
                    return response;
                },
                reason => Promise.reject(reason.error));
        case "Node.js":
            let iconv = require("iconv-lite")
            ;(0,_initGotEnv_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])(request)
            const { url, ...option } = request
            return await this.got[method](url, option)
                .on("redirect", (response, nextOpts) => {
                    try {
                        if (response.headers["set-cookie"]) {
                            const ck = response.headers["set-cookie"]
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
                    // this.ckjar.setCookieSync(response.headers["set-cookie"].map(Cookie.parse).toString())
                })
                .then(
                    response => {
                        response.statusCode = response.status;
                        response.body = iconv.decode(response.rawBody, "utf-8");
                        response.bodyBytes = response.rawBody;
                        return response;
                    },
                    error => Promise.reject(error.message));
    };
};


}),
"./src/utils/getStorage.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return getStorage; }
});
/* harmony import */var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./src/utils/utils.mjs");


/**
 * Get Storage Variables
 * @link https://github.com/NanoCat-Me/utils/blob/main/getStorage.mjs
 * @author VirgilClyne
 * @param {String} key - Persistent Store Key
 * @param {Array} names - Platform Names
 * @param {Object} database - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getStorage(key, names, database) {
    //log(`☑️ getStorage, Get Environment Variables`, "");
    /***************** BoxJs *****************/
    // 包装为局部变量，用完释放内存
    // BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
    let BoxJs = _utils_mjs__WEBPACK_IMPORTED_MODULE_0__.Storage.getItem(key, database);
    //log(`🚧 getStorage, Get Environment Variables`, `BoxJs类型: ${typeof BoxJs}`, `BoxJs内容: ${JSON.stringify(BoxJs)}`, "");
    /***************** Argument *****************/
    let Argument = {};
    switch (typeof $argument) {
        case "string":
            let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=").map(i => i.replace(/\"/g, ''))));
            for (let item in arg) _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(Argument, item, arg[item]);
            break;
        case "object":
            for (let item in $argument) _utils_mjs__WEBPACK_IMPORTED_MODULE_0__._.set(Argument, item, $argument[item]);
            break;
        case "undefined":
            break;
    };
    //log(`✅ getStorage, Get Environment Variables`, `Argument类型: ${typeof Argument}`, `Argument内容: ${JSON.stringify(Argument)}`, "");
    /***************** Store *****************/
    const Store = { Settings: database?.Default?.Settings || {}, Configs: database?.Default?.Configs || {}, Caches: {} };
    if (!Array.isArray(names)) names = [names];
    //log(`🚧 getStorage, Get Environment Variables`, `names类型: ${typeof names}`, `names内容: ${JSON.stringify(names)}`, "");
    for (let name of names) {
        Store.Settings = { ...Store.Settings, ...database?.[name]?.Settings, ...Argument, ...BoxJs?.[name]?.Settings };
        Store.Configs = { ...Store.Configs, ...database?.[name]?.Configs };
        if (BoxJs?.[name]?.Caches && typeof BoxJs?.[name]?.Caches === "string") BoxJs[name].Caches = JSON.parse(BoxJs?.[name]?.Caches);
        Store.Caches = { ...Store.Caches, ...BoxJs?.[name]?.Caches };
    };
    //log(`🚧 getStorage, Get Environment Variables`, `Store.Settings类型: ${typeof Store.Settings}`, `Store.Settings: ${JSON.stringify(Store.Settings)}`, "");
    traverseObject(Store.Settings, (key, value) => {
        //log(`🚧 getStorage, traverseObject`, `${key}: ${typeof value}`, `${key}: ${JSON.stringify(value)}`, "");
        if (value === "true" || value === "false") value = JSON.parse(value); // 字符串转Boolean
        else if (typeof value === "string") {
            if (value.includes(",")) value = value.split(",").map(item => string2number(item)); // 字符串转数组转数字
            else value = string2number(value); // 字符串转数字
        };
        return value;
    });
    //log(`✅ getStorage, Get Environment Variables`, `Store: ${typeof Store.Caches}`, `Store内容: ${JSON.stringify(Store)}`, "");
    return Store;
    /***************** function *****************/
    function traverseObject(o, c) { for (var t in o) { var n = o[t]; o[t] = "object" == typeof n && null !== n ? traverseObject(n, c) : c(t, n) } return o }
    function string2number(string) { if (string && !isNaN(string)) string = parseInt(string, 10); return string }
};


}),
"./src/utils/initGotEnv.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return initGotEnv; }
});
function initGotEnv(opts) {
    this.got = this.got ? this.got : require("got");
    this.cktough = this.cktough ? this.cktough : require("tough-cookie");
    this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
    if (opts) {
        opts.headers = opts.headers ? opts.headers : {}
        if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
            opts.cookieJar = this.ckjar
        }
    };
};


}),
"./src/utils/logError.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return logError; }
});
/* harmony import */var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./src/utils/utils.mjs");

function logError(error) {
    switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Egern":
        case "Shadowrocket":
        case "Quantumult X":
        default:
            (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `❗️执行错误!`, error, "");
            break
        case "Node.js":
            ;(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("", `❗️执行错误!`, error.stack, "");
            break
    };
};


}),
"./src/utils/notification.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return notification; }
});
/* harmony import */var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./src/utils/utils.mjs");

/**
 * 系统通知
 *
 * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
 *
 * 示例:
 * $.msg(title, subtitle, body, "twitter://")
 * $.msg(title, subtitle, body, { "open-url": "twitter://", "media-url": "https://github.githubassets.com/images/modules/open_graph/github-mark.png" })
 * $.msg(title, subtitle, body, { "open-url": "https://bing.com", "media-url": "https://github.githubassets.com/images/modules/open_graph/github-mark.png" })
 *
 * @param {*} title 标题
 * @param {*} subtitle 副标题
 * @param {*} body 内容
 * @param {*} mutableContent 通知扩展字段
 *
 */
function notification(title = "", subtitle = "", body = "", mutableContent) {
    switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Egern":
        case "Shadowrocket":
        default:
            $notification.post(title, subtitle, body, MutableContent(mutableContent))
            break
        case "Quantumult X":
            $notify(title, subtitle, body, MutableContent(mutableContent))
            break
        case "Node.js":
            break
    };
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(...["", "==============📣系统通知📣==============", subtitle || "", body || ""]);
    const MutableContent = (content) => {
        switch (typeof content) {
            case undefined:
                return content
            case "string":
                switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
                    case "Surge":
                    case "Stash":
                    case "Egern":
                    default:
                        return { url: content };
                    case "Loon":
                    case "Shadowrocket":
                        return content
                    case "Quantumult X":
                        return { "open-url": content };
                    case "Node.js":
                        return undefined;
                }
            case "object":
                switch (_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform) {
                    case "Surge":
                    case "Stash":
                    case "Egern":
                    case "Shadowrocket":
                    default: {
                        let openUrl = content.url || content.openUrl || content["open-url"];
                        return { url: openUrl };
                    }
                    case "Loon": {
                        let openUrl = content.openUrl || content.url || content["open-url"];
                        let mediaUrl = content.mediaUrl || content["media-url"];
                        return { openUrl, mediaUrl };
                    }
                    case "Quantumult X": {
                        let openUrl = content["open-url"] || content.url || content.openUrl;
                        let mediaUrl = content["media-url"] || content.mediaUrl;
                        let updatePasteboard = content["update-pasteboard"] || content.updatePasteboard;
                        return {
                            "open-url": openUrl,
                            "media-url": mediaUrl,
                            "update-pasteboard": updatePasteboard
                        };
                    }
                    case "Node.js":
                        return undefined;
                }
            default:
                return undefined;
        }
    };
};


}),
"./src/utils/platform.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  $platform: function() { return $platform; },
  platform: function() { return platform; }
});
const $platform = platform();
function platform() {
    if ("undefined" !== typeof $environment && $environment["surge-version"])
        return "Surge"
    if ("undefined" !== typeof $environment && $environment["stash-version"])
        return "Stash"
    if ("undefined" !== typeof module && !!module.exports) return "Node.js"
    if ("undefined" !== typeof $task) return "Quantumult X"
    if ("undefined" !== typeof $loon) return "Loon"
    if ("undefined" !== typeof $rocket) return "Shadowrocket"
    if ("undefined" !== typeof Egern) return "Egern"
}


}),
"./src/utils/runScript.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return runScript; }
});
/* harmony import */var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./src/utils/utils.mjs");


async function runScript(script, runOpts) {
    let httpapi = _utils_mjs__WEBPACK_IMPORTED_MODULE_0__.Storage.getItem("@chavy_boxjs_userCfgs.httpapi");
    httpapi = httpapi?.replace?.(/\n/g, "")?.trim();
    let httpapi_timeout = _utils_mjs__WEBPACK_IMPORTED_MODULE_0__.Storage.getItem("@chavy_boxjs_userCfgs.httpapi_timeout");
    httpapi_timeout = (httpapi_timeout * 1) ?? 20;
    httpapi_timeout = runOpts?.timeout ?? httpapi_timeout;
    const [password, address] = httpapi.split("@");
    const request = {
        url: `http://${address}/v1/scripting/evaluate`,
        body: {
            script_text: script,
            mock_type: "cron",
            timeout: httpapi_timeout
        },
        headers: { "X-Key": password, "Accept": "*/*" },
        timeout: httpapi_timeout
    };
    await (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.fetch)(request).then(response => response.body, error => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.logError)(error));
}


}),
"./src/utils/utils.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  $platform: function() { return /* reexport safe */ _platform_mjs__WEBPACK_IMPORTED_MODULE_0__.$platform; },
  Storage: function() { return /* reexport safe */ _Storage_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]; },
  URL: function() { return /* reexport safe */ _URL_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]; },
  _: function() { return /* reexport safe */ _Lodash_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]; },
  done: function() { return /* reexport safe */ _done_mjs__WEBPACK_IMPORTED_MODULE_7__["default"]; },
  fetch: function() { return /* reexport safe */ _fetch_mjs__WEBPACK_IMPORTED_MODULE_4__["default"]; },
  getScript: function() { return getScript; },
  log: function() { return log; },
  logError: function() { return /* reexport safe */ _logError_mjs__WEBPACK_IMPORTED_MODULE_6__["default"]; },
  notification: function() { return /* reexport safe */ _notification_mjs__WEBPACK_IMPORTED_MODULE_5__["default"]; },
  runScript: function() { return /* reexport safe */ _runScript_mjs__WEBPACK_IMPORTED_MODULE_8__["default"]; },
  wait: function() { return wait; }
});
/* harmony import */var _platform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform.mjs */ "./src/utils/platform.mjs");
/* harmony import */var _URL_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./URL.mjs */ "./src/utils/URL.mjs");
/* harmony import */var _Lodash_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lodash.mjs */ "./src/utils/Lodash.mjs");
/* harmony import */var _Storage_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Storage.mjs */ "./src/utils/Storage.mjs");
/* harmony import */var _fetch_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fetch.mjs */ "./src/utils/fetch.mjs");
/* harmony import */var _notification_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notification.mjs */ "./src/utils/notification.mjs");
/* harmony import */var _logError_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logError.mjs */ "./src/utils/logError.mjs");
/* harmony import */var _done_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./done.mjs */ "./src/utils/done.mjs");
/* harmony import */var _runScript_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./runScript.mjs */ "./src/utils/runScript.mjs");






const log = (...logs) => console.log(logs.join("\n"));

const wait = (delay = 1000) => new Promise(resolve => setTimeout(resolve, delay));

const getScript = async (url) => await (0,_fetch_mjs__WEBPACK_IMPORTED_MODULE_4__["default"])(url).then(response => response.body);

//import GRPC from "./GRPC.mjs";



}),
"./src/database/API.json": (function (module) {
module.exports = JSON.parse('{"Settings":{"GoogleCloud":{"Version":"v2","Mode":"Key","Auth":""},"Microsoft":{"Version":"Azure","Mode":"Token","Region":"","Auth":""},"DeepL":{"Version":"Free","Auth":""},"DeepLX":{"Endpoint":"","Auth":""},"URL":"","NeteaseMusic":{"PhoneNumber":"","Password":""}}}')

}),
"./src/database/Composite.json": (function (module) {
module.exports = JSON.parse('{"Settings":{"CacheSize":20,"ShowOnly":false,"Position":"Reverse","Offset":0,"Tolerance":1000}}')

}),
"./src/database/Default.json": (function (module) {
module.exports = JSON.parse('{"Settings":{"Switch":true,"Type":"Translate","Types":["Official","Translate"],"Languages":["EN","ZH"],"CacheSize":50},"Configs":{"breakLine":{"text/xml":"&#x000A;","application/xml":"&#x000A;","text/vtt":"\\n","application/vtt":"\\n","text/json":"\\n","application/json":"\\n"}}}')

}),
"./src/database/External.json": (function (module) {
module.exports = JSON.parse('{"Settings":{"SubVendor":"URL","LrcVendor":"NeteaseMusic","CacheSize":50}}')

}),
"./src/database/Netflix.json": (function (module) {
module.exports = JSON.parse('{"Settings":{"Switch":true,"Type":"Translate","Languages":["AUTO","ZH"]},"Configs":{"Languages":{"AR":"ar","CS":"cs","DA":"da","DE":"de","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","FI":"fi","FR":"fr","HE":"he","HR":"hr","HU":"hu","ID":"id","IT":"it","JA":"ja","KO":"ko","MS":"ms","NB":"nb","NL":"nl","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SV":"sv","TH":"th","TR":"tr","UK":"uk","VI":"vi","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"}}}')

}),
"./src/database/Spotify.json": (function (module) {
module.exports = JSON.parse('{"Settings":{"Switch":true,"Types":["Translate","External"],"Languages":["AUTO","ZH"]}}')

}),
"./src/database/Translate.json": (function (module) {
module.exports = JSON.parse('{"Settings":{"Vendor":"Google","ShowOnly":false,"Position":"Forward","CacheSize":10,"Method":"Part","Times":3,"Interval":500,"Exponential":true}}')

}),
"./src/database/Universal.json": (function (module) {
module.exports = JSON.parse('{"Settings":{"Switch":true,"Types":["Official","Translate"],"Languages":["AUTO","ZH"]},"Configs":{"Languages":{"AUTO":["en","en-US","eng","en-GB","en-UK","en-CA","en-US SDH","ja","ja-JP","jpn","ko","ko-KR","kor","pt","pt-PT","pt-BR","por"],"AR":["ar","ar-001"],"BG":["bg","bg-BG","bul"],"CS":["cs","cs-CZ","ces"],"DA":["da","da-DK","dan"],"DE":["de","de-DE","deu"],"EL":["el","el-GR","ell"],"EN":["en","en-US","eng","en-GB","en-UK","en-CA","en-US SDH"],"EN-CA":["en-CA","en","eng"],"EN-GB":["en-UK","en","eng"],"EN-US":["en-US","en","eng"],"EN-US SDH":["en-US SDH","en-US","en","eng"],"ES":["es","es-419","es-ES","spa","es-419 SDH"],"ES-419":["es-419","es","spa"],"ES-419 SDH":["es-419 SDH","es-419","es","spa"],"ES-ES":["es-ES","es","spa"],"ET":["et","et-EE","est"],"FI":["fi","fi-FI","fin"],"FR":["fr","fr-CA","fr-FR","fra"],"FR-CA":["fr-CA","fr","fra"],"FR-DR":["fr-FR","fr","fra"],"HU":["hu","hu-HU","hun"],"ID":["id","id-id"],"IT":["it","it-IT","ita"],"JA":["ja","ja-JP","jpn"],"KO":["ko","ko-KR","kor"],"LT":["lt","lt-LT","lit"],"LV":["lv","lv-LV","lav"],"NL":["nl","nl-NL","nld"],"NO":["no","nb-NO","nor"],"PL":["pl","pl-PL"],"PT":["pt","pt-PT","pt-BR","por"],"PT-PT":["pt-PT","pt","por"],"PT-BR":["pt-BR","pt","por"],"RO":["ro","ro-RO","ron"],"RU":["ru","ru-RU","rus"],"SK":["sk","sk-SK","slk"],"SL":["sl","sl-SI","slv"],"SV":["sv","sv-SE","swe"],"IS":["is","is-IS","isl"],"ZH":["zh","cmn","zho","zh-CN","zh-Hans","cmn-Hans","zh-TW","zh-Hant","cmn-Hant","zh-HK","yue-Hant","yue"],"ZH-CN":["zh-CN","zh-Hans","cmn-Hans","zho"],"ZH-HANS":["zh-Hans","cmn-Hans","zh-CN","zho"],"ZH-HK":["zh-HK","yue-Hant","yue","zho"],"ZH-TW":["zh-TW","zh-Hant","cmn-Hant","zho"],"ZH-HANT":["zh-Hant","cmn-Hant","zh-TW","zho"],"YUE":["yue","yue-Hant","zh-HK","zho"],"YUE-HK":["yue-Hant","yue","zh-HK","zho"]}}}')

}),
"./src/database/YouTube.json": (function (module) {
module.exports = JSON.parse('{"Settings":{"Switch":true,"Type":"Official","Types":["Translate","External"],"Languages":["AUTO","ZH"],"AutoCC":true,"ShowOnly":false},"Configs":{"Languages":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IS":"is-IS","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","YUE":"yue","YUE-HK":"yue-HK","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW"},"translationLanguages":{"DESKTOP":[{"languageCode":"sq","languageName":{"simpleText":"Shqip - 阿尔巴尼亚语"}},{"languageCode":"ak","languageName":{"simpleText":"Ákán - 阿肯语"}},{"languageCode":"ar","languageName":{"simpleText":"العربية - 阿拉伯语"}},{"languageCode":"am","languageName":{"simpleText":"አማርኛ - 阿姆哈拉语"}},{"languageCode":"as","languageName":{"simpleText":"অসমীয়া - 阿萨姆语"}},{"languageCode":"az","languageName":{"simpleText":"آذربايجان ديلی - 阿塞拜疆语"}},{"languageCode":"ee","languageName":{"simpleText":"Èʋegbe - 埃维语"}},{"languageCode":"ay","languageName":{"simpleText":"Aymar aru - 艾马拉语"}},{"languageCode":"ga","languageName":{"simpleText":"Gaeilge - 爱尔兰语"}},{"languageCode":"et","languageName":{"simpleText":"Eesti - 爱沙尼亚语"}},{"languageCode":"or","languageName":{"simpleText":"ଓଡ଼ିଆ - 奥里亚语"}},{"languageCode":"om","languageName":{"simpleText":"Afaan Oromoo - 奥罗莫语"}},{"languageCode":"eu","languageName":{"simpleText":"Euskara - 巴斯克语"}},{"languageCode":"be","languageName":{"simpleText":"Беларуская - 白俄罗斯语"}},{"languageCode":"bg","languageName":{"simpleText":"Български - 保加利亚语"}},{"languageCode":"nso","languageName":{"simpleText":"Sesotho sa Leboa - 北索托语"}},{"languageCode":"is","languageName":{"simpleText":"Íslenska - 冰岛语"}},{"languageCode":"pl","languageName":{"simpleText":"Polski - 波兰语"}},{"languageCode":"bs","languageName":{"simpleText":"Bosanski - 波斯尼亚语"}},{"languageCode":"fa","languageName":{"simpleText":"فارسی - 波斯语"}},{"languageCode":"bho","languageName":{"simpleText":"भोजपुरी - 博杰普尔语"}},{"languageCode":"ts","languageName":{"simpleText":"Xitsonga - 聪加语"}},{"languageCode":"tt","languageName":{"simpleText":"Татарча - 鞑靼语"}},{"languageCode":"da","languageName":{"simpleText":"Dansk - 丹麦语"}},{"languageCode":"de","languageName":{"simpleText":"Deutsch - 德语"}},{"languageCode":"dv","languageName":{"simpleText":"ދިވެހިބަސް - 迪维希语"}},{"languageCode":"ru","languageName":{"simpleText":"Русский - 俄语"}},{"languageCode":"fr","languageName":{"simpleText":"français - 法语"}},{"languageCode":"sa","languageName":{"simpleText":"संस्कृतम् - 梵语"}},{"languageCode":"fil","languageName":{"simpleText":"Filipino - 菲律宾语"}},{"languageCode":"fi","languageName":{"simpleText":"suomi - 芬兰语"}},{"languageCode":"km","languageName":{"simpleText":"ភាសាខ្មែរ - 高棉语"}},{"languageCode":"ka","languageName":{"simpleText":"ქართული - 格鲁吉亚语"}},{"languageCode":"gu","languageName":{"simpleText":"ગુજરાતી - 古吉拉特语"}},{"languageCode":"gn","languageName":{"simpleText":"Avañe\'ẽ - 瓜拉尼语"}},{"languageCode":"kk","languageName":{"simpleText":"Қазақ тілі - 哈萨克语"}},{"languageCode":"ht","languageName":{"simpleText":"Kreyòl ayisyen - 海地克里奥尔语"}},{"languageCode":"ko","languageName":{"simpleText":"한국어 - 韩语"}},{"languageCode":"ha","languageName":{"simpleText":"هَوُسَ - 豪萨语"}},{"languageCode":"nl","languageName":{"simpleText":"Nederlands - 荷兰语"}},{"languageCode":"gl","languageName":{"simpleText":"Galego - 加利西亚语"}},{"languageCode":"ca","languageName":{"simpleText":"català - 加泰罗尼亚语"}},{"languageCode":"cs","languageName":{"simpleText":"čeština - 捷克语"}},{"languageCode":"kn","languageName":{"simpleText":"ಕನ್ನಡ - 卡纳达语"}},{"languageCode":"ky","languageName":{"simpleText":"кыргыз тили - 吉尔吉斯语"}},{"languageCode":"xh","languageName":{"simpleText":"isiXhosa - 科萨语"}},{"languageCode":"co","languageName":{"simpleText":"corsu - 科西嘉语"}},{"languageCode":"hr","languageName":{"simpleText":"hrvatski - 克罗地亚语"}},{"languageCode":"qu","languageName":{"simpleText":"Runa Simi - 克丘亚语"}},{"languageCode":"ku","languageName":{"simpleText":"Kurdî - 库尔德语"}},{"languageCode":"la","languageName":{"simpleText":"lingua latīna - 拉丁语"}},{"languageCode":"lv","languageName":{"simpleText":"latviešu valoda - 拉脱维亚语"}},{"languageCode":"lo","languageName":{"simpleText":"ພາສາລາວ - 老挝语"}},{"languageCode":"lt","languageName":{"simpleText":"lietuvių kalba - 立陶宛语"}},{"languageCode":"ln","languageName":{"simpleText":"lingála - 林加拉语"}},{"languageCode":"lg","languageName":{"simpleText":"Luganda - 卢干达语"}},{"languageCode":"lb","languageName":{"simpleText":"Lëtzebuergesch - 卢森堡语"}},{"languageCode":"rw","languageName":{"simpleText":"Kinyarwanda - 卢旺达语"}},{"languageCode":"ro","languageName":{"simpleText":"Română - 罗马尼亚语"}},{"languageCode":"mt","languageName":{"simpleText":"Malti - 马耳他语"}},{"languageCode":"mr","languageName":{"simpleText":"मराठी - 马拉地语"}},{"languageCode":"mg","languageName":{"simpleText":"Malagasy - 马拉加斯语"}},{"languageCode":"ml","languageName":{"simpleText":"മലയാളം - 马拉雅拉姆语"}},{"languageCode":"ms","languageName":{"simpleText":"bahasa Melayu - 马来语"}},{"languageCode":"mk","languageName":{"simpleText":"македонски јазик - 马其顿语"}},{"languageCode":"mi","languageName":{"simpleText":"te reo Māori - 毛利语"}},{"languageCode":"mn","languageName":{"simpleText":"Монгол хэл - 蒙古语"}},{"languageCode":"bn","languageName":{"simpleText":"বাংলা - 孟加拉语"}},{"languageCode":"my","languageName":{"simpleText":"ဗမာစာ - 缅甸语"}},{"languageCode":"hmn","languageName":{"simpleText":"Hmoob - 苗语"}},{"languageCode":"af","languageName":{"simpleText":"Afrikaans - 南非荷兰语"}},{"languageCode":"st","languageName":{"simpleText":"Sesotho - 南索托语"}},{"languageCode":"ne","languageName":{"simpleText":"नेपाली - 尼泊尔语"}},{"languageCode":"no","languageName":{"simpleText":"Norsk - 挪威语"}},{"languageCode":"pa","languageName":{"simpleText":"ਪੰਜਾਬੀ - 旁遮普语"}},{"languageCode":"pt","languageName":{"simpleText":"Português - 葡萄牙语"}},{"languageCode":"ps","languageName":{"simpleText":"پښتو - 普什图语"}},{"languageCode":"ny","languageName":{"simpleText":"chiCheŵa - 齐切瓦语"}},{"languageCode":"ja","languageName":{"simpleText":"日本語 - 日语"}},{"languageCode":"sv","languageName":{"simpleText":"Svenska - 瑞典语"}},{"languageCode":"sm","languageName":{"simpleText":"Gagana fa\'a Samoa - 萨摩亚语"}},{"languageCode":"sr","languageName":{"simpleText":"Српски језик - 塞尔维亚语"}},{"languageCode":"si","languageName":{"simpleText":"සිංහල - 僧伽罗语"}},{"languageCode":"sn","languageName":{"simpleText":"ChiShona - 绍纳语"}},{"languageCode":"eo","languageName":{"simpleText":"Esperanto - 世界语"}},{"languageCode":"sk","languageName":{"simpleText":"slovenčina - 斯洛伐克语"}},{"languageCode":"sl","languageName":{"simpleText":"slovenščina - 斯洛文尼亚语"}},{"languageCode":"sw","languageName":{"simpleText":"Kiswahili - 斯瓦希里语"}},{"languageCode":"gd","languageName":{"simpleText":"Gàidhlig - 苏格兰盖尔语"}},{"languageCode":"ceb","languageName":{"simpleText":"Binisaya - 宿务语"}},{"languageCode":"so","languageName":{"simpleText":"Soomaaliga - 索马里语"}},{"languageCode":"tg","languageName":{"simpleText":"тоҷикӣ - 塔吉克语"}},{"languageCode":"te","languageName":{"simpleText":"తెలుగు - 泰卢固语"}},{"languageCode":"ta","languageName":{"simpleText":"தமிழ் - 泰米尔语"}},{"languageCode":"th","languageName":{"simpleText":"ไทย - 泰语"}},{"languageCode":"ti","languageName":{"simpleText":"ትግርኛ - 提格利尼亚语"}},{"languageCode":"tr","languageName":{"simpleText":"Türkçe - 土耳其语"}},{"languageCode":"tk","languageName":{"simpleText":"Türkmen - 土库曼语"}},{"languageCode":"cy","languageName":{"simpleText":"Cymraeg - 威尔士语"}},{"languageCode":"ug","languageName":{"simpleText":"ئۇيغۇرچە - 维吾尔语"}},{"languageCode":"und","languageName":{"simpleText":"Unknown - 未知语言"}},{"languageCode":"ur","languageName":{"simpleText":"اردو - 乌尔都语"}},{"languageCode":"uk","languageName":{"simpleText":"українська - 乌克兰语"}},{"languageCode":"uz","languageName":{"simpleText":"O\'zbek - 乌兹别克语"}},{"languageCode":"es","languageName":{"simpleText":"Español - 西班牙语"}},{"languageCode":"fy","languageName":{"simpleText":"Frysk - 西弗里西亚语"}},{"languageCode":"iw","languageName":{"simpleText":"עברית - 希伯来语"}},{"languageCode":"el","languageName":{"simpleText":"Ελληνικά - 希腊语"}},{"languageCode":"haw","languageName":{"simpleText":"ʻŌlelo Hawaiʻi - 夏威夷语"}},{"languageCode":"sd","languageName":{"simpleText":"سنڌي - 信德语"}},{"languageCode":"hu","languageName":{"simpleText":"magyar - 匈牙利语"}},{"languageCode":"su","languageName":{"simpleText":"Basa Sunda - 巽他语"}},{"languageCode":"hy","languageName":{"simpleText":"հայերեն - 亚美尼亚语"}},{"languageCode":"ig","languageName":{"simpleText":"Igbo - 伊博语"}},{"languageCode":"it","languageName":{"simpleText":"Italiano - 意大利语"}},{"languageCode":"yi","languageName":{"simpleText":"ייִדיש - 意第绪语"}},{"languageCode":"hi","languageName":{"simpleText":"हिन्दी - 印地语"}},{"languageCode":"id","languageName":{"simpleText":"Bahasa Indonesia - 印度尼西亚语"}},{"languageCode":"en","languageName":{"simpleText":"English - 英语"}},{"languageCode":"yo","languageName":{"simpleText":"Yorùbá - 约鲁巴语"}},{"languageCode":"vi","languageName":{"simpleText":"Tiếng Việt - 越南语"}},{"languageCode":"jv","languageName":{"simpleText":"Basa Jawa - 爪哇语"}},{"languageCode":"zh-Hant","languageName":{"simpleText":"中文（繁體）- 中文（繁体）"}},{"languageCode":"zh-Hans","languageName":{"simpleText":"中文（简体）"}},{"languageCode":"zu","languageName":{"simpleText":"isiZulu - 祖鲁语"}},{"languageCode":"kri","languageName":{"simpleText":"Krìì - 克里语"}}],"MOBILE":[{"languageCode":"sq","languageName":{"runs":[{"text":"Shqip - 阿尔巴尼亚语"}]}},{"languageCode":"ak","languageName":{"runs":[{"text":"Ákán - 阿肯语"}]}},{"languageCode":"ar","languageName":{"runs":[{"text":"العربية - 阿拉伯语"}]}},{"languageCode":"am","languageName":{"runs":[{"text":"አማርኛ - 阿姆哈拉语"}]}},{"languageCode":"as","languageName":{"runs":[{"text":"অসমীয়া - 阿萨姆语"}]}},{"languageCode":"az","languageName":{"runs":[{"text":"Azərbaycanca - 阿塞拜疆语"}]}},{"languageCode":"ee","languageName":{"runs":[{"text":"Eʋegbe - 埃维语"}]}},{"languageCode":"ay","languageName":{"runs":[{"text":"Aymar - 艾马拉语"}]}},{"languageCode":"ga","languageName":{"runs":[{"text":"Gaeilge - 爱尔兰语"}]}},{"languageCode":"et","languageName":{"runs":[{"text":"Eesti - 爱沙尼亚语"}]}},{"languageCode":"or","languageName":{"runs":[{"text":"ଓଡ଼ିଆ - 奥里亚语"}]}},{"languageCode":"om","languageName":{"runs":[{"text":"Oromoo - 奥罗莫语"}]}},{"languageCode":"eu","languageName":{"runs":[{"text":"Euskara - 巴斯克语"}]}},{"languageCode":"be","languageName":{"runs":[{"text":"Беларуская - 白俄罗斯语"}]}},{"languageCode":"bg","languageName":{"runs":[{"text":"Български - 保加利亚语"}]}},{"languageCode":"nso","languageName":{"runs":[{"text":"Sesotho sa Leboa - 北索托语"}]}},{"languageCode":"is","languageName":{"runs":[{"text":"Íslenska - 冰岛语"}]}},{"languageCode":"pl","languageName":{"runs":[{"text":"Polski - 波兰语"}]}},{"languageCode":"bs","languageName":{"runs":[{"text":"Bosanski - 波斯尼亚语"}]}},{"languageCode":"fa","languageName":{"runs":[{"text":"فارسی - 波斯语"}]}},{"languageCode":"bho","languageName":{"runs":[{"text":"भोजपुरी - 博杰普尔语"}]}},{"languageCode":"ts","languageName":{"runs":[{"text":"Xitsonga - 聪加语"}]}},{"languageCode":"tt","languageName":{"runs":[{"text":"Татарча - 鞑靼语"}]}},{"languageCode":"da","languageName":{"runs":[{"text":"Dansk - 丹麦语"}]}},{"languageCode":"de","languageName":{"runs":[{"text":"Deutsch - 德语"}]}},{"languageCode":"dv","languageName":{"runs":[{"text":"ދިވެހިބަސް - 迪维希语"}]}},{"languageCode":"ru","languageName":{"runs":[{"text":"Русский - 俄语"}]}},{"languageCode":"fr","languageName":{"runs":[{"text":"Français - 法语"}]}},{"languageCode":"sa","languageName":{"runs":[{"text":"संस्कृतम् - 梵语"}]}},{"languageCode":"fil","languageName":{"runs":[{"text":"Filipino - 菲律宾语"}]}},{"languageCode":"fi","languageName":{"runs":[{"text":"Suomi - 芬兰语"}]}},{"languageCode":"km","languageName":{"runs":[{"text":"ភាសាខ្មែរ - 高棉语"}]}},{"languageCode":"ka","languageName":{"runs":[{"text":"ქართული - 格鲁吉亚语"}]}},{"languageCode":"gu","languageName":{"runs":[{"text":"ગુજરાતી - 古吉拉特语"}]}},{"languageCode":"gn","languageName":{"runs":[{"text":"Avañe\'ẽ - 瓜拉尼语"}]}},{"languageCode":"kk","languageName":{"runs":[{"text":"Қазақ тілі - 哈萨克语"}]}},{"languageCode":"ht","languageName":{"runs":[{"text":"海地克里奥尔语"}]}},{"languageCode":"ko","languageName":{"runs":[{"text":"한국말 - 韩语"}]}},{"languageCode":"ha","languageName":{"runs":[{"text":"هَوُسَ - 豪萨语"}]}},{"languageCode":"nl","languageName":{"runs":[{"text":"Nederlands - 荷兰语"}]}},{"languageCode":"gl","languageName":{"runs":[{"text":"Galego - 加利西亚语"}]}},{"languageCode":"ca","languageName":{"runs":[{"text":"Català - 加泰罗尼亚语"}]}},{"languageCode":"cs","languageName":{"runs":[{"text":"Čeština - 捷克语"}]}},{"languageCode":"kn","languageName":{"runs":[{"text":"ಕನ್ನಡ - 卡纳达语"}]}},{"languageCode":"ky","languageName":{"runs":[{"text":"Кыргызча - 吉尔吉斯语"}]}},{"languageCode":"xh","languageName":{"runs":[{"text":"isiXhosa - 科萨语"}]}},{"languageCode":"co","languageName":{"runs":[{"text":"Corsu - 科西嘉语"}]}},{"languageCode":"hr","languageName":{"runs":[{"text":"Hrvatski - 克罗地亚语"}]}},{"languageCode":"qu","languageName":{"runs":[{"text":"Runa Simi - 克丘亚语"}]}},{"languageCode":"ku","languageName":{"runs":[{"text":"Kurdî - 库尔德语"}]}},{"languageCode":"la","languageName":{"runs":[{"text":"lingua latīna - 拉丁语"}]}},{"languageCode":"lv","languageName":{"runs":[{"text":"Latviešu - 拉脱维亚语"}]}},{"languageCode":"lo","languageName":{"runs":[{"text":"ລາວ - 老挝语"}]}},{"languageCode":"lt","languageName":{"runs":[{"text":"Lietuvių - 立陶宛语"}]}},{"languageCode":"ln","languageName":{"runs":[{"text":"Lingála - 林加拉语"}]}},{"languageCode":"lg","languageName":{"runs":[{"text":"Luganda - 卢干达语"}]}},{"languageCode":"lb","languageName":{"runs":[{"text":"Lëtzebuergesch - 卢森堡语"}]}},{"languageCode":"rw","languageName":{"runs":[{"text":"Kinyarwanda - 卢旺达语"}]}},{"languageCode":"ro","languageName":{"runs":[{"text":"Română - 罗马尼亚语"}]}},{"languageCode":"mt","languageName":{"runs":[{"text":"Malti - 马耳他语"}]}},{"languageCode":"mr","languageName":{"runs":[{"text":"मराठी - 马拉地语"}]}},{"languageCode":"mg","languageName":{"runs":[{"text":"Malagasy - 马拉加斯语"}]}},{"languageCode":"ml","languageName":{"runs":[{"text":"മലയാളം - 马拉雅拉姆语"}]}},{"languageCode":"ms","languageName":{"runs":[{"text":"Bahasa Melayu - 马来语"}]}},{"languageCode":"mk","languageName":{"runs":[{"text":"македонски - 马其顿语"}]}},{"languageCode":"mi","languageName":{"runs":[{"text":"Māori - 毛利语"}]}},{"languageCode":"mn","languageName":{"runs":[{"text":"Монгол - 蒙古语"}]}},{"languageCode":"bn","languageName":{"runs":[{"text":"বাংলা - 孟加拉语"}]}},{"languageCode":"my","languageName":{"runs":[{"text":"ဗမာစာ - 缅甸语"}]}},{"languageCode":"hmn","languageName":{"runs":[{"text":"Hmoob - 苗语"}]}},{"languageCode":"af","languageName":{"runs":[{"text":"Afrikaans - 南非荷兰语"}]}},{"languageCode":"st","languageName":{"runs":[{"text":"Sesotho - 南索托语"}]}},{"languageCode":"ne","languageName":{"runs":[{"text":"नेपाली - 尼泊尔语"}]}},{"languageCode":"no","languageName":{"runs":[{"text":"Norsk - 挪威语"}]}},{"languageCode":"pa","languageName":{"runs":[{"text":"ਪੰਜਾਬੀ - 旁遮普语"}]}},{"languageCode":"pt","languageName":{"runs":[{"text":"Português - 葡萄牙语"}]}},{"languageCode":"ps","languageName":{"runs":[{"text":"پښتو - 普什图语"}]}},{"languageCode":"ny","languageName":{"runs":[{"text":"chiCheŵa - 齐切瓦语"}]}},{"languageCode":"ja","languageName":{"runs":[{"text":"日本語 - 日语"}]}},{"languageCode":"sv","languageName":{"runs":[{"text":"Svenska - 瑞典语"}]}},{"languageCode":"sm","languageName":{"runs":[{"text":"Gagana Samoa - 萨摩亚语"}]}},{"languageCode":"sr","languageName":{"runs":[{"text":"Српски језик - 塞尔维亚语"}]}},{"languageCode":"si","languageName":{"runs":[{"text":"සිංහල - 僧伽罗语"}]}},{"languageCode":"sn","languageName":{"runs":[{"text":"ChiShona - 绍纳语"}]}},{"languageCode":"eo","languageName":{"runs":[{"text":"Esperanto - 世界语"}]}},{"languageCode":"sk","languageName":{"runs":[{"text":"Slovenčina - 斯洛伐克语"}]}},{"languageCode":"sl","languageName":{"runs":[{"text":"Slovenščina - 斯洛文尼亚语"}]}},{"languageCode":"sw","languageName":{"runs":[{"text":"Kiswahili - 斯瓦希里语"}]}},{"languageCode":"gd","languageName":{"runs":[{"text":"Gàidhlig - 苏格兰盖尔语"}]}},{"languageCode":"ceb","languageName":{"runs":[{"text":"Cebuano - 宿务语"}]}},{"languageCode":"so","languageName":{"runs":[{"text":"Soomaaliga - 索马里语"}]}},{"languageCode":"tg","languageName":{"runs":[{"text":"тоҷикӣ - 塔吉克语"}]}},{"languageCode":"te","languageName":{"runs":[{"text":"తెలుగు - 泰卢固语"}]}},{"languageCode":"ta","languageName":{"runs":[{"text":"தமிழ் - 泰米尔语"}]}},{"languageCode":"th","languageName":{"runs":[{"text":"ไทย - 泰语"}]}},{"languageCode":"ti","languageName":{"runs":[{"text":"ትግርኛ - 提格利尼亚语"}]}},{"languageCode":"tr","languageName":{"runs":[{"text":"Türkçe - 土耳其语"}]}},{"languageCode":"tk","languageName":{"runs":[{"text":"Türkmen - 土库曼语"}]}},{"languageCode":"cy","languageName":{"runs":[{"text":"Cymraeg - 威尔士语"}]}},{"languageCode":"ug","languageName":{"runs":[{"text":"ئۇيغۇرچە - 维吾尔语"}]}},{"languageCode":"und","languageName":{"runs":[{"text":"Unknown - 未知语言"}]}},{"languageCode":"ur","languageName":{"runs":[{"text":"اردو - 乌尔都语"}]}},{"languageCode":"uk","languageName":{"runs":[{"text":"Українська - 乌克兰语"}]}},{"languageCode":"uz","languageName":{"runs":[{"text":"O‘zbek - 乌兹别克语"}]}},{"languageCode":"es","languageName":{"runs":[{"text":"Español - 西班牙语"}]}},{"languageCode":"fy","languageName":{"runs":[{"text":"Frysk - 西弗里西亚语"}]}},{"languageCode":"iw","languageName":{"runs":[{"text":"עברית - 希伯来语"}]}},{"languageCode":"el","languageName":{"runs":[{"text":"Ελληνικά - 希腊语"}]}},{"languageCode":"haw","languageName":{"runs":[{"text":"ʻŌlelo Hawaiʻi - 夏威夷语"}]}},{"languageCode":"sd","languageName":{"runs":[{"text":"سنڌي - 信德语"}]}},{"languageCode":"hu","languageName":{"runs":[{"text":"Magyar - 匈牙利语"}]}},{"languageCode":"su","languageName":{"runs":[{"text":"Basa Sunda - 巽他语"}]}},{"languageCode":"hy","languageName":{"runs":[{"text":"Հայերեն - 亚美尼亚语"}]}},{"languageCode":"ig","languageName":{"runs":[{"text":"Igbo - 伊博语"}]}},{"languageCode":"it","languageName":{"runs":[{"text":"Italiano - 意大利语"}]}},{"languageCode":"yi","languageName":{"runs":[{"text":"ייִדיש - 意第绪语"}]}},{"languageCode":"hi","languageName":{"runs":[{"text":"हिन्दी - 印地语"}]}},{"languageCode":"id","languageName":{"runs":[{"text":"Bahasa Indonesia - 印度尼西亚语"}]}},{"languageCode":"en","languageName":{"runs":[{"text":"English - 英语"}]}},{"languageCode":"yo","languageName":{"runs":[{"text":"Yorùbá - 约鲁巴语"}]}},{"languageCode":"vi","languageName":{"runs":[{"text":"Tiếng Việt - 越南语"}]}},{"languageCode":"jv","languageName":{"runs":[{"text":"Basa Jawa - 爪哇语"}]}},{"languageCode":"zh-Hant","languageName":{"runs":[{"text":"中文（繁體） - 中文（繁体）"}]}},{"languageCode":"zh-Hans","languageName":{"runs":[{"text":"中文（简体）"}]}},{"languageCode":"zu","languageName":{"runs":[{"text":"isiZulu - 祖鲁语"}]}},{"languageCode":"kri","languageName":{"runs":[{"text":"Krìì - 克里语"}]}}]}}}')

}),

});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

/************************************************************************/
// webpack/runtime/create_fake_namespace_object
(() => {
var getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__ };
var leafPrototypes;
// create a fake namespace object
// mode & 1: value is a module id, require it
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object
// mode & 16: return value when it's Promise-like
// mode & 8|1: behave like require
__webpack_require__.t = function(value, mode) {
	if(mode & 1) value = this(value);
	if(mode & 8) return value;
	if(typeof value === 'object' && value) {
		if((mode & 4) && value.__esModule) return value;
		if((mode & 16) && typeof value.then === 'function') return value;
	}
	var ns = Object.create(null);
	__webpack_require__.r(ns);
	var def = {};
	leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
	for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
		Object.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return  value[key]; } });
	}
	def['default'] = function() { return value };
	__webpack_require__.d(ns, def);
	return ns;
};
})();
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = function(exports, definition) {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = function (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = function(exports) {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};

})();
// webpack/runtime/rspack_version
(() => {
__webpack_require__.rv = function () {
	return "1.0.11";
};

})();
// webpack/runtime/rspack_unique_id
(() => {
__webpack_require__.ruid = "bundler=rspack@1.0.11";

})();
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony import */var _utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils.mjs */ "./src/utils/utils.mjs");
/* harmony import */var _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./XML/XML.mjs */ "./src/XML/XML.mjs");
/* harmony import */var _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WebVTT/WebVTT.mjs */ "./src/WebVTT/WebVTT.mjs");
/* harmony import */var _database_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./database/index.mjs */ "./src/database/index.mjs");
/* harmony import */var _function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function/setENV.mjs */ "./src/function/setENV.mjs");
/* harmony import */var _function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./function/detectFormat.mjs */ "./src/function/detectFormat.mjs");
/* harmony import */var _function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./function/detectPlatform.mjs */ "./src/function/detectPlatform.mjs");
/* harmony import */var _function_setCache_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./function/setCache.mjs */ "./src/function/setCache.mjs");
/* harmony import */var _function_constructSubtitlesQueue_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./function/constructSubtitlesQueue.mjs */ "./src/function/constructSubtitlesQueue.mjs");
/* harmony import */var _class_Composite_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./class/Composite.mjs */ "./src/class/Composite.mjs");










(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)("v1.1.0(1004)");
/***************** Processing *****************/
// 解构URL
const url = new _utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.URL($request.url);
(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname, PATHs = url.pathname.split("/").filter(Boolean);
(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = (0,_function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_5__["default"])(url, $response?.body, FORMAT);
(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ FORMAT: ${FORMAT}`, "");
(async () => {
	// 获取平台
	const PLATFORM = (0,_function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_6__["default"])($request.url);
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ PLATFORM: ${PLATFORM}`, "");
	// 读取设置
	const { Settings, Caches, Configs } = (0,_function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__["default"])("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Composite", "API"], _database_index_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]);
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = url.searchParams?.get("subtype") ?? Settings.Type, Languages = [url.searchParams?.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams?.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 创建字幕请求队列
			let requests = [];
			// 处理类型
			switch (Type) {
				case "Official":
					(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ 官方字幕`, "");
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
								(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 subtitlesURIArray1.length: ${subtitlesURIArray1.length}`, "");
								// 获取字幕文件名
								let fileName = PATHs?.[PATHs?.length - 1] ?? getSubtitlesFileName($request.url, PLATFORM);
								(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 fileName: ${fileName}`, "")
								// 构造请求队列
								requests = (0,_function_constructSubtitlesQueue_mjs__WEBPACK_IMPORTED_MODULE_8__["default"])($request, fileName, subtitlesURIArray0, subtitlesURIArray1);
							};
							break;
						case "YouTube":
							(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ YouTube`, "");
							switch (url.searchParams.get("tlang")) {
								case undefined:
									(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ 未选择翻译语言，跳过`, "");
									break;
								default:
									(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ 已选择翻译语言`, "");
									// 设置参数
									// Settings.Offset = 0;
									Settings.Tolerance = 100;
									Settings.Position = (Settings.Position === "Reverse") ? "Forward" : "Reverse"; // 链接主字幕为翻译字幕，副字幕为原字幕，所以需要翻转一下
									switch (Settings.ShowOnly) {
										case true:
											(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ 仅显示翻译后字幕，跳过`, "");
											break;
										case false:
										default:
											(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ 生成双语字幕`, "");
											// 获取字幕
											url.searchParams.set("lang", Caches.Playlists.Subtitle.get(url.searchParams.get("v")) || url.searchParams.get("lang")); // 主语言
											url.searchParams.delete("tlang") // 原字幕
											let request = {
												"url": url.toString(),
												"headers": $request.headers
											};
											requests.push(request);
											break;
									};
							};
							break;
						case "Netflix":
							(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ Netflix`, "");
							break;
						case "Bilibili":
							(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ Bilibili`, "");
							break;
					};
					break;
				case "Translate":
				default:
					(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ 翻译字幕`, "");
					break;
				case "External":
					(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`⚠ 外挂字幕`, "");
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
					body = _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].parse($response.body);
					await Promise.all(requests.map(async request => {
						let officialSubtitle = await (0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.fetch)(request).then(response => _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].parse(response.body));
						body = new _class_Composite_mjs__WEBPACK_IMPORTED_MODULE_9__["default"](Settings).timedText(body, officialSubtitle, url.searchParams.get("kind"));
					}));
					$response.body = _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					body = _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].parse($response.body);
					await Promise.all(requests.map(async request => {
						let officialSubtitle = await (0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.fetch)(request).then(response => _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].parse(response.body));
						body = new _class_Composite_mjs__WEBPACK_IMPORTED_MODULE_9__["default"](Settings).webVTT(body, officialSubtitle);
					}));
					$response.body = _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					await Promise.all(requests.map(async request => {
						let officialSubtitle = await (0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.fetch)(request).then(response => JSON.parse(response.body));
						body = new _class_Composite_mjs__WEBPACK_IMPORTED_MODULE_9__["default"](Settings).JSON(body, officialSubtitle, url.searchParams.get("kind"));
					}));
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
	.catch((e) => (0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.logError)(e))
	.finally(() => (0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.done)($response))

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
	;(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ getPlaylistCache`, "");
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
						(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 getPlaylistCache`, `subtitlesPlaylistIndex: ${subtitlesPlaylistIndex}`, "");
						return true;
					} else return false;
				})) {
					masterPlaylistURL = Key;
					subtitlesPlaylist = Value;
					//log(`🚧 getPlaylistCache`, `masterPlaylistURL: ${masterPlaylistURL}`, `subtitlesPlaylist: ${JSON.stringify(subtitlesPlaylist)}`, "");
				};
			};
		});
	});
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ getPlaylistCache`, `masterPlaylistURL: ${JSON.stringify(masterPlaylistURL)}`, "");
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
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ getSubtitlesCache`, "");
	let subtitlesPlaylistURL = "";
	let subtitles = [];
	let subtitlesIndex = 0;
	cache?.forEach((Value, Key) => {
		if (Array.isArray(Value)) {
			let Array = Value;
			if (Array?.some((String, Index) => {
				if (url.includes(String || null)) {
					subtitlesIndex = Index;
					(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 getSubtitlesCache`, `subtitlesIndex: ${subtitlesIndex}`, "");
					return true;
				} else return false;
			})) {
				subtitlesPlaylistURL = Key;
				subtitles = Value;
				//log(`🚧 getSubtitlesCache, subtitlesPlaylistURL: ${subtitlesPlaylistURL}`, "");
			};
		};
	});
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ getSubtitlesCache, subtitlesPlaylistURL: ${subtitlesPlaylistURL}`, "");
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
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ getSubtitlesArray`, "");
	const subtitlesPlaylistValue = playlistsCache?.get(url) || {};
	let subtitlesPlaylistURL0 = subtitlesPlaylistValue?.[languages[0]]?.[index]?.URL || subtitlesPlaylistValue?.[languages[0]]?.[0]?.URL;
	let subtitlesPlaylistURL1 = subtitlesPlaylistValue?.[languages[1]]?.[index]?.URL || subtitlesPlaylistValue?.[languages[1]]?.[0]?.URL;
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`🚧 getSubtitlesArray`, `subtitlesPlaylistURL0: ${subtitlesPlaylistURL0}, subtitlesPlaylistURL1: ${subtitlesPlaylistURL1}`, "");
	// 查找字幕文件地址vtt缓存（map）
	let subtitlesURIArray0 = subtitlesCache.get(subtitlesPlaylistURL0) || [];
	let subtitlesURIArray1 = subtitlesCache.get(subtitlesPlaylistURL1) || [];
	//log(`🚧 getSubtitlesArray`, `subtitlesURIArray0: ${JSON.stringify(subtitlesURIArray0)}, subtitlesURIArray1: ${JSON.stringify(subtitlesURIArray1)}`, "");
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ getSubtitlesArray`, "");
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
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`☑️ Get Subtitles FileName`, `url: ${url}`, "");
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
	(0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.log)(`✅ Get Subtitles FileName`, `fileName: ${fileName}`, "");
	return fileName;
};

})()
;
//# sourceMappingURL=Composite.Subtitles.response.bundle.js.map