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
export default class Composite {
	constructor(options = {}) {
		this.Name = "Composite";
		this.Version = "1.0.1";
		this.Offset = 0;
		this.Tolerance = 0;
		this.Position = "Forward";
		Object.assign(this, options)
		console.log(`\n🟧 ${this.Name} v${this.Version}\n`)
	}

	JSON(Sub1 = {}, Sub2 = {}, Kind = "captions", Offset = this.Offset, Tolerance = this.Tolerance, Position = this.Position) {
		console.log(`☑️ Composite JSON Subtitles\nOffset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
		//let DualSub = Position.includes("Reverse") ? Sub2 : Sub1
		let DualSub = Sub1;
		//console.log(`🚧 let DualSub内容: ${JSON.stringify(DualSub)}`, "");
		// 有序数列 用不着排序
		//FirstSub.body.sort((x, y) => x - y);
		//SecondSub.body.sort((x, y) => x - y);
		let index0 = 0, index1 = 0, index2 = 0;
		// 双指针法查找两个数组中的相同元素
		const length1 = Sub1?.events?.length, length2 = Sub2?.events?.length;
		switch (Kind) {
			case "asr":
				// 自动生成字幕转普通字幕
				console.log(`☑️ DualSub是自动生成字幕`, "");
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
					//console.log(`🚧 index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
					const timeStamp1 = Sub1.events[index1].tStartMs, timeStamp2 = Sub2.events[index2].tStartMs;
					//console.log(`🚧 timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
					const timeStamp1Next = Sub1.events[index1 + 1]?.tStartMs ?? timeStamp1, timeStamp2Next = Sub2.events[index2 + 1]?.tStartMs ?? timeStamp2;
					if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
						//index0 = (Position === "Reverse") ? index2 : index1;
						index0 = index1;
						// 处理普通字幕
						const text1 = Sub1.events[index1]?.segs?.[0].utf8 ?? "", text2 = Sub2.events[index2]?.segs?.[0].utf8 ?? "";
						//console.log(`🚧 text1: ${text1}, text2: ${text2}`, "");
						DualSub.events[index0].segs = [{ "utf8": ((Position === "Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`).trim() }];
						//console.log(`🚧  DualSub.events[index0].segs[0].utf8: ${DualSub.events[index0].segs[0].utf8}`, "");
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
		//console.log(`✅ Composite JSON Subtitles, DualSub内容: ${JSON.stringify(DualSub)}`, "");
		console.log(`✅ Composite JSON Subtitles`, "");
		return DualSub;
	};

	timedText(Sub1 = {}, Sub2 = {}, Kind = "captions", Offset = this.Offset, Tolerance = this.Tolerance, Position = this.Position) {
		console.log(`☑️ Composite timedText Subtitles\nOffset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
		//let DualSub = Position.includes("Reverse") ? Sub2 : Sub1
		let DualSub = Sub1;
		//console.log(`🚧 let DualSub内容: ${JSON.stringify(DualSub)}`, "");
		// 有序数列 用不着排序
		//FirstSub.body.sort((x, y) => x - y);
		//SecondSub.body.sort((x, y) => x - y);
		let index0 = 0, index1 = 0, index2 = 0;
		// 双指针法查找两个数组中的相同元素
		const length1 = Sub1?.timedtext?.body?.p?.length, length2 = Sub2?.timedtext?.body?.p?.length;
		switch (Kind) {
			case "asr":
				// 自动生成字幕转普通字幕
				console.log(`☑️ DualSub是自动生成字幕`, "");
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
					//console.log(`🚧 index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
					const timeStamp1 = parseInt(Sub1.timedtext.body.p[index1]["@t"], 10), timeStamp2 = parseInt(Sub2.timedtext.body.p[index2]["@t"], 10);
					//console.log(`🚧 timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
					const timeStamp1Next = parseInt(Sub1.timedtext.body.p[index1 + 1]?.["@t"] ?? timeStamp1, 10), timeStamp2Next = parseInt(Sub2.timedtext.body.p[index2 + 1]?.["@t"] ?? timeStamp2, 10);
					if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
						//index0 = (Position === "Reverse") ? index2 : index1;
						index0 = index1;
						// 处理普通字幕
						const text1 = Sub1.timedtext.body.p[index1]?.["#"] ?? "", text2 = Sub2.timedtext.body.p[index2]?.["#"] ?? "";
						//console.log(`🚧 text1: ${text1}, text2: ${text2}`, "");
						DualSub.timedtext.body.p[index0]["#"] = ((Position === "Reverse") ? `${text2}&#x000A;${text1}` : `${text1}&#x000A;${text2}`).trim();
						//console.log(`🚧 DualSub.timedtext.body.p[index0]["#"]: ${DualSub.timedtext.body.p[index0]["#"]}`, "");
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
		//console.log(`✅ Composite timedText Subtitles, DualSub内容: ${JSON.stringify(DualSub)}`, "");
		console.log(`✅ Composite timedText Subtitles`, "");
		return DualSub;
	};

	webVTT(Sub1 = {}, Sub2 = {}, Offset = this.Offset, Tolerance = this.Tolerance, Position = this.Position) {
		console.log(`☑️ Composite webVTT Subtitles\nOffset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
		//let DualSub = Position.includes("Reverse") ? Sub2 : Sub1
		let DualSub = Sub1;
		//console.log(`🚧 let DualSub内容: ${JSON.stringify(DualSub)}`, "");
		// 有序数列 用不着排序
		//FirstSub.body.sort((x, y) => x - y);
		//SecondSub.body.sort((x, y) => x - y);
		let index0 = 0, index1 = 0, index2 = 0;
		// 双指针法查找两个数组中的相同元素
		const length1 = Sub1?.body?.length, length2 = Sub2?.body?.length;
		while (index1 < length1 && index2 < length2) {
			//console.log(`🚧 index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
			const timeStamp1 = Sub1.body[index1].timeStamp, timeStamp2 = Sub2.body[index2].timeStamp;
			//console.log(`🚧 timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
			const timeStamp1Next = Sub1.body[index1 + 1]?.timeStamp ?? timeStamp1, timeStamp2Next = Sub2.body[index2 + 1]?.timeStamp ?? timeStamp2;
			// 处理普通字幕
			const text1 = Sub1.body[index1]?.text ?? "", text2 = Sub2.body[index2]?.text ?? "";
			//console.log(`🚧 text1: ${text1}, text2: ${text2}`, "");
			if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
				//index0 = (Position === "Reverse") ? index2 : index1;
				index0 = index1;
				// 处理普通字幕
				DualSub.body[index0].text = ((Position === "Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`).trim();
				//console.log(`🚧 index0: ${index0}, text: ${DualSub.body[index0].text}`, "");
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
		//console.log(`✅ Composite webVTT Subtitles, DualSub内容: ${JSON.stringify(DualSub)}`, "");
		console.log(`✅ Composite webVTT Subtitles`, "");
		return DualSub;
	};


	spotifyLyric(Lyric1 = [], Lyric2 = [], Offset = this.Offset, Tolerance = this.Tolerance, Position = this.Position) {
		console.log(`☑️ Composite Spotify Lyrics\nOffset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
		//let Lyric = Position.includes("Reverse") ? Lyric2 : Lyric1
		let Lyric = Lyric1;
		//console.log(`🚧 let Lyric: ${JSON.stringify(Lyric)}`, "");
		// 有序数列 用不着排序
		//FirstSub.body.sort((x, y) => x - y);
		//SecondSub.body.sort((x, y) => x - y);
		let index0 = 0, index1 = 0, index2 = 0;
		// 双指针法查找两个数组中的相同元素
		const length1 = Lyric1?.length, length2 = Lyric2?.length;
		while (index1 < length1 && index2 < length2) {
			//console.log(`🚧 index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
			const timeStamp1 = Lyric1[index1].startTimeMs, timeStamp2 = Lyric2[index2].startTimeMs + Offset;
			//console.log(`🚧 timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
			const timeStamp1Next = Lyric1[index1 + 1]?.startTimeMs ?? timeStamp1, timeStamp2Next = Lyric2[index2 + 1]?.startTimeMs + this.Offset ?? timeStamp2;
			// 处理普通字幕
			const text1 = Lyric1[index1]?.words ?? "", text2 = Lyric2[index2]?.words ?? "";
			//console.log(`🚧 text1: ${text1}, text2: ${text2}`, "");
			if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
				//index0 = (Position === "Reverse") ? index2 : index1;
				index0 = index1;
				// 处理普通字幕
				Lyric[index0].words = ((Position === "Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`).trim();
				Lyric[index0].owords = text1.trim();
				Lyric[index0].twords = text2.trim();
				//console.log(`🚧 index0: ${index0}, words: ${Lyric[index0].words}`, "");
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
		//console.log(`✅ Composite Spotify Lyrics, Lyric: ${JSON.stringify(Lyric)}`, "");
		console.log(`✅ Composite Spotify Lyrics`, "");
		return Lyric;
	};
};
