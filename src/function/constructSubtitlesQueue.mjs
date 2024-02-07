
/**
 * Construct Subtitles Queue
 * @author VirgilClyne
 * @param {String} fileName - Request URL
 * @param {Array} VTTs1 - Primary (Source) Language Subtitles Array
 * @param {Array} VTTs2 - Second (Target) Language Subtitles Array
 * @return {Array<*>} Subtitles Requests Queue
 */
export default function constructSubtitlesQueue(request, fileName, VTTs1 = [], VTTs2 = []) {
	console.log(`☑️ Construct Subtitles Queue, fileName: ${fileName}`, "");
	let requests = [];
	console.log(`🚧 Construct Subtitles Queue, VTTs1.length: ${VTTs1.length}, VTTs2.length: ${VTTs2.length}`, "")
	//console.log(`🚧 Construct Subtitles Queue, VTTs1: ${JSON.stringify(VTTs1)}, VTTs2.length: ${JSON.stringify(VTTs2)}`, "")
	// 查询当前字幕在原字幕队列中的位置
	const Index1 = VTTs1.findIndex(item => item?.includes(fileName));
	console.log(`🚧 Construct Subtitles Queue, Index1: ${Index1}`, "");
	switch (VTTs2.length) {
		case 0: // 长度为0，无须计算
            console.log(`⚠ Construct Subtitles Queue, 长度为 0`, "")
			break;
		case 1: { // 长度为1，无须计算
			console.log(`⚠ Construct Subtitles Queue, 长度为 1`, "")
			let request2 = {
				"url": VTTs2[0],
				"headers": request.headers
			};
			requests.push(request2);
			break;
		};
		case VTTs1.length: { // 长度相等，一一对应，无须计算
			console.log(`⚠ Construct Subtitles Queue, 长度相等`, "")
			let request2 = {
				"url": VTTs2[Index1],
				"headers": request.headers
			};
			requests.push(request2);
			break;
		};
		default: { // 长度不等，需要计算
			console.log(`⚠ Construct Subtitles Queue, 长度不等，需要计算`, "")
			// 计算当前字幕在原字幕队列中的百分比
			const Position1 = (Index1 + 1) / VTTs1.length; // 从 0 开始计数，所以要加 1
			console.log(`🚧 Construct Subtitles Queue, Position1: ${Position1}, Index2: ${Index1}/${VTTs1.length}`, "");
			// 根据百分比计算当前字幕在新字幕队列中的位置
			//let Index2 = VTTs2.findIndex(item => item.includes(fileName));
			const Index2 = Math.round(Position1 * VTTs2.length - 1); // 从 0 开始计数，所以要减 1
			console.log(`🚧 Construct Subtitles Queue, Position2: ${Position1}, Index2: ${Index2}/${VTTs2.length}`, "");
			// 获取两字幕队列长度差值
			const diffLength = Math.abs(VTTs2.length - VTTs1.length);
			// 获取当前字幕在新字幕队列中的前后1个字幕
			//const BeginIndex = (Index2 - 1 < 0) ? 0 : Index2 - 1, EndIndex = Index2 + 1;
			const BeginIndex = Math.min(Index1, Index2);
			const EndIndex = Math.max(Index1, Index2);
			console.log(`🚧 Construct Subtitles Queue, diffLength: ${diffLength}, BeginIndex: ${BeginIndex}, EndIndex: ${EndIndex}`, "");
			const nearlyVTTs = VTTs2.slice(Math.max(0, BeginIndex - diffLength), Math.max(EndIndex, EndIndex + diffLength) + 1) // slice 不取 EndIndex 本身
			//const nearlyVTTs = VTTs2.slice(BeginIndex, EndIndex + 1); // slice 不取 EndIndex 本身
			console.log(`🚧 Construct Subtitles Queue, nearlyVTTs: ${JSON.stringify(nearlyVTTs)}`, "");
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
	//console.log(`🚧 Construct Subtitles Queue, requests: ${JSON.stringify(requests)}`, "");
	console.log(`✅ Construct Subtitles Queue`, "");
	return requests;
};
