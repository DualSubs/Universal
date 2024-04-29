import setOption from "../function/setOption.mjs";
import aPath from "../function/aPath.mjs";

export default class AttrList {
    constructor(format = "application/x-mpegURL", platform = "Universal") {
		this.Name = "AttrList";
		this.Version = "1.0.5";
        this.format = format;
        this.platform = platform;
		//Object.assign(this, options)
		console.log(`\n🟧 ${this.Name} v${this.Version} format: ${this.format} platform: ${this.platform}\n`)
	}

    /**
     * Get Attribute List
     * @author VirgilClyne
     * @param {String} url - Request URL
     * @param {Array} file - Parsed M3U8/JSON
     * @param {String} type - Content Type
     * @param {Array} langCodes - Language Codes Array
     * @return {Array} datas
     */
    get(url = "", file = [], type = "", langCodes = []) {
        console.log(`☑️ Get Attribute List, type: ${type}, langCodes: ${langCodes}`);
        let matchList = [];
        // 格式判断
        switch (this.format) {
            case "application/x-mpegURL":
            case "application/x-mpegurl":
            case "application/vnd.apple.mpegurl":
            case "audio/mpegurl": {
                let attrList = file
                    .filter(item => item?.TAG === "#EXT-X-MEDIA") // 过滤标签
                    .filter(item => item?.OPTION?.TYPE === type) // 过滤类型
                    .filter(item => item?.OPTION?.FORCED !== "YES"); // 过滤强制内容
                //console.log(`🚧 attrList: ${JSON.stringify(attrList)}`, "");
                //查询是否有符合语言的内容
                for (let langcode of langCodes) {
                    console.log(`🚧 Get Attribute List, for (let ${langcode} of langcodes)`, "");
                    matchList = attrList.filter(item => item?.OPTION?.LANGUAGE?.toLowerCase() === langcode?.toLowerCase());
                    if (matchList.length !== 0) break;
                };
                matchList = matchList.map(data => {
                    data.URL = aPath(url, data?.OPTION?.URI ?? null);
                    return data;
                });
                break;
            };
            case "text/json":
            case "application/json": {
                switch (this.platform) {
                    case "PrimeVideo": {
                        let attrList = file?.[type] ?? [];
                        //查询是否有符合语言的内容
                        for (let langcode of langCodes) {
                            console.log(`🚧 Get Attribute List, for (let ${langcode} of langcodes)`, "");
                            matchList = attrList.filter(item => item?.languageCode?.toLowerCase() === langcode?.toLowerCase());
                            if (matchList.length !== 0) break;
                        };
                        matchList = matchList.map(data => {
                            data.URL = data.url;
                            return data;
                        });
                        break;
                    };
                };
                break;
            };
        };
        console.log(`✅ Get Attribute List, matchList: ${JSON.stringify(matchList)}`, "");
        return matchList;
    };

    /**
     * Set Attribute List
     * @author VirgilClyne
     * @param {Array} file - Parsed M3U8/JSON
     * @param {Object} playlists - Playlists
     * @param {Array} types - Types
     * @param {Array} languages - Languages
     * @param {Boolean} Standard - Standard
     * @return {Object} m3u8
     */
    set(file = [], playlists = {}, types = [], languages = [], standard = true, device = "iPhone") {
        //types = (standard == true) ? types : ["Translate"];
        types = (standard == true) ? types : [types.at(-1)];
        const playlists1 = playlists?.[languages?.[0]];
        const playlists2 = playlists?.[languages?.[1]];
        //if (playlists1?.length !== 0) console.log(`🚧 Set Attribute List, 有主字幕语言（源语言）字幕`);
        //else types = types.filter(e => e !== "Translate"); // 无源语言字幕时删除翻译字幕选项
        //if (playlists2?.length !== 0) console.log(`🚧 Set Attribute List, 有副字幕语言（目标语言）字幕`);
        //else types = types.filter(e => e !== "Official"); // 无目标语言字幕时删除官方字幕选项
        console.log(`☑️ Set Attribute List, types: ${types}`, "");
        // 格式判断
        switch (this.format) {
            case "application/x-mpegURL":
            case "application/x-mpegurl":
            case "application/vnd.apple.mpegurl":
            case "audio/mpegurl": {
                playlists1?.forEach(playlist1 => {
                    const index1 = file.findIndex(item => item?.OPTION?.URI === playlist1.OPTION.URI); // 主语言（源语言）字幕位置
                    types.forEach(type => {
                        console.log(`🚧 Set Attribute List, type: ${type}`, "");
                        let option;
                        switch (type) {
                            case "Official":
                                playlists2?.forEach(playlist2 => {
                                    //const index2 = file.findIndex(item => item?.OPTION?.URI === playlist2.OPTION.URI); // 副语言（源语言）字幕位置
                                    if (playlist1?.OPTION?.["GROUP-ID"] === playlist2?.OPTION?.["GROUP-ID"]) {
                                        switch (this.platform) { // 兼容性修正
                                            case "Apple":
                                                if (playlist1?.OPTION.CHARACTERISTICS == playlist2?.OPTION.CHARACTERISTICS) {  // 只生成属性相同
                                                    option = setOption(playlist1, playlist2, type, this.platform, standard, device);
                                                    // option.OPTION.URI += `&lang=${languages[0]}`;
                                                };
                                                break;
                                            default:
                                                option = setOption(playlist1, playlist2, type, this.platform, standard, device);
                                                // option.OPTION.URI += `&lang=${languages[0]}`;
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
                                        //"GROUP-ID": playlist?.OPTION?.["GROUP-ID"],
                                        "NAME": playlists2?.[0]?.OPTION?.NAME ?? languages[1].toLowerCase(),
                                        "LANGUAGE": playlists2?.[0]?.OPTION?.LANGUAGE ?? languages[1].toLowerCase(),
                                        //"URI": playlist?.URI,
                                    }
                                };
                                option = setOption(playlist1, playlist2, type, this.platform, standard, device);
                                option.OPTION.URI += `&lang=${playlist1?.OPTION?.LANGUAGE?.toUpperCase()}`;
                                break;
                        };
                        if (option) file.splice(index1 + (standard ? 1 : 0), 0, option);
                    });
                });
                break;
            };
            case "text/json":
            case "application/json": {
                switch (this.platform) {
                    case "PrimeVideo": {
                        playlists1?.forEach(playlist1 => {
                            const index1 = file.findIndex(item => item?.timedTextTrackId === playlist1.timedTextTrackId); // 主语言（源语言）字幕位置
                            types.forEach(type => {
                                console.log(`🚧 Set Attribute List, type: ${type}`);
                                let option;
                                switch (type) {
                                    case "Official":
                                        playlists2?.forEach(playlist2 => {
                                            if (playlist1.trackGroupId === playlist2.trackGroupId) {
                                                option = JSON.parse(JSON.stringify(playlist1));
                                                option.displayName = `${type} (${playlist1.displayName}/${playlist2.displayName})`;
                                                option.languageCode = `${playlist1.languageCode}/${playlist2.languageCode}_${type}`
                                                option.timedTextTrackId = `${playlist1.timedTextTrackId}_${type}`;
                                                const symbol = (option.url.includes("?")) ? "&" : "?";
                                                option.url += `${symbol}subtype=${type}`;
                                                option.url += `&lang=${languages[0]}`;
                                                //console.log(`🚧 option: ${JSON.stringify(option)}`, "");
                                            };
                                        });
                                        break;
                                    case "Translate":
                                    case "External":
                                        option = JSON.parse(JSON.stringify(playlist1));
                                        option.displayName = `${type} (${playlist1.displayName}/${languages[1]})`;
                                        option.languageCode = `${playlist1.languageCode}/${languages[1].toLowerCase()}_${type}`
                                        option.timedTextTrackId = `${playlist1.timedTextTrackId}_${type}`;
                                        const symbol = (playlist1.url.includes("?")) ? "&" : "?";
                                        option.url += `${symbol}subtype=${type}`;
                                        option.url += `&lang=${playlist1.languageCode.toUpperCase()}`;
                                        //console.log(`🚧 option: ${JSON.stringify(option)}`, "");
                                        break;
                                };
                                if (option) file.splice(index1 + (standard ? 1 : 0), 0, option);
                            });
                        });
                        break;
                    };
                };
                break;
            };
        };
        //console.log(`✅ Set Attribute List, file: ${JSON.stringify(file)}`);
        console.log(`✅ Set Attribute List`);
        return file;
    };
}
