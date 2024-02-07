
/** 
 * Composite Subtitles
 * @param {Object} Sub1 - Sub1
 * @param {Object} Sub2 - Sub2
 * @param {Array} Format - options = ["json", "srv3", "vtt"]
 * @param {Array} Kind - options = ["asr", "captions"]
 * @param {Number} Offset - Offset
 * @param {Number} Tolerance - Tolerance
 * @param {Array} Position - Position = ["Forward", "Reverse"]
 * @return {String} DualSub
 */
export default function Composite(Sub1 = {}, Sub2 = {}, Format = "text/vtt", Kind = "captions", Offset = 0, Tolerance = 0, Position = "Forward") {
	console.log(`☑️ Composite Subtitles, Offset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
	//console.log(`🚧 Composite Subtitles`,`Sub1内容: ${JSON.stringify(Sub1)}`, "");
	//console.log(`🚧 Composite Subtitles`,`Sub2内容: ${JSON.stringify(Sub2)}`, "");
	//let DualSub = Position.includes("Reverse") ? Sub2 : Sub1
	let DualSub = Sub1;
	//console.log(`🚧 Composite Subtitles, let DualSub内容: ${JSON.stringify(DualSub)}`, "");
	// 有序数列 用不着排序
	//FirstSub.body.sort((x, y) => x - y);
	//SecondSub.body.sort((x, y) => x - y);
	let index0 = 0, index1 = 0, index2 = 0;
	// 双指针法查找两个数组中的相同元素
	switch (Format) {
		case "text/json":
		case "application/json": {
			const length1 = Sub1?.events?.length, length2 = Sub2?.events?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					console.log(`🚧 Composite Subtitles, DualSub是自动生成字幕`, "");
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
						//console.log(`🚧 Composite Subtitles, index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = Sub1.events[index1].tStartMs, timeStamp2 = Sub2.events[index2].tStartMs;
						//console.log(`🚧 Composite Subtitles, timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
						const timeStamp1Next = Sub1.events[index1 + 1]?.tStartMs ?? timeStamp1, timeStamp2Next = Sub2.events[index2 + 1]?.tStartMs ?? timeStamp2;
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							//index0 = (Position === "Reverse") ? index2 : index1;
							index0 = index1;
							// 处理普通字幕
							const text1 = Sub1.events[index1]?.segs?.[0].utf8 ?? "", text2 = Sub2.events[index2]?.segs?.[0].utf8 ?? "";
							//console.log(`🚧 Composite Subtitles, text1: ${text1}, text2: ${text2}`, "");
							DualSub.events[index0].segs = [{ "utf8": (Position === "Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}` }];
							//console.log(`🚧 Composite Subtitles, DualSub.events[index0].segs[0].utf8: ${DualSub.events[index0].segs[0].utf8}`, "");
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
					break;
			};
			break;
		};
		case "text/xml":
		case "application/xml": {
			const length1 = Sub1?.timedtext?.body?.p?.length, length2 = Sub2?.timedtext?.body?.p?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					console.log(`☑️ Composite Subtitles, DualSub是自动生成字幕`, "");
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
						//console.log(`🚧 Composite Subtitles, index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = parseInt(Sub1.timedtext.body.p[index1]["@t"], 10), timeStamp2 = parseInt(Sub2.timedtext.body.p[index2]["@t"], 10);
						//console.log(`🚧 Composite Subtitles, timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
						const timeStamp1Next = parseInt(Sub1.timedtext.body.p[index1 + 1]?.["@t"] ?? timeStamp1, 10), timeStamp2Next = parseInt(Sub2.timedtext.body.p[index2 + 1]?.["@t"] ?? timeStamp2, 10);
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							//index0 = (Position === "Reverse") ? index2 : index1;
							index0 = index1;
							// 处理普通字幕
							const text1 = Sub1.timedtext.body.p[index1]?.["#"] ?? "", text2 = Sub2.timedtext.body.p[index2]?.["#"] ?? "";
							//console.log(`🚧 Composite Subtitles, text1: ${text1}, text2: ${text2}`, "");
							DualSub.timedtext.body.p[index0]["#"] = (Position === "Reverse") ? `${text2}&#x000A;${text1}` : `${text1}&#x000A;${text2}`;
							//console.log(`🚧 Composite Subtitles, DualSub.timedtext.body.p[index0]["#"]: ${DualSub.timedtext.body.p[index0]["#"]}`, "");
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
			break;
		};
		case "text/vtt":
		case "application/vtt": {
			const length1 = Sub1?.body?.length, length2 = Sub2?.body?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					console.log(`🚧 Combine Subtitles, DualSub是自动生成字幕`, "");
					// vtt字幕不需要特殊处理
					//break; 不要break，连续处理
				case "captions":
				default:
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//console.log(`🚧 Composite Subtitles, index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = Sub1.body[index1].timeStamp, timeStamp2 = Sub2.body[index2].timeStamp;
						//console.log(`🚧 Composite Subtitles, timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
						const timeStamp1Next = Sub1.body[index1 + 1]?.timeStamp ?? timeStamp1, timeStamp2Next = Sub2.body[index2 + 1]?.timeStamp ?? timeStamp2;
						// 处理普通字幕
						const text1 = Sub1.body[index1]?.text ?? "", text2 = Sub2.body[index2]?.text ?? "";
						//console.log(`🚧 Composite Subtitles, text1: ${text1}, text2: ${text2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							//index0 = (Position === "Reverse") ? index2 : index1;
							index0 = index1;
							// 处理普通字幕
							DualSub.body[index0].text = (Position === "Reverse") ? `${text2}\n${text1}`: `${text1}\n${text2}`;
							//console.log(`🚧 Composite Subtitles, index0: ${index0}, text: ${DualSub.body[index0].text}`, "");
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
					break;
			};
			break;
		};
	};
	//console.log(`✅ Composite Subtitles, return DualSub内容: ${JSON.stringify(DualSub)}`, "");
	console.log(`✅ Composite Subtitles`, "");
	return DualSub;
};
