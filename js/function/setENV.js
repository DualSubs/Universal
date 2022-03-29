// Set Environment Variables
async function setENV(url, database) {
	//$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	/***************** Platform *****************/
	let Platform = url.match(/(play|vod-.*-amt)\.(tv|itunes)\.apple\.com/i) ? "Apple_TV"
		: url.match(/(play-edge|vod-.*-aoc)\.(tv|itunes)\.apple\.com/i) ? "Apple_TV_Plus"
			: url.match(/\.(dssott|starott)\.com/i) ? "Disney_Plus"
				: url.match(/\.(hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net/i) ? "Prime_Video"
					: url.match(/\.(api\.hbo|hbomaxcdn)\.com/i) ? "HBO_Max"
						: url.match(/\.(hulustream|huluim)\.com/i) ? "Hulu"
							: (url.match(/\.(cbsaavideo|cbsivideo)\.com/i)) ? "Paramount_Plus"
								: (url.match(/\.peacocktv\.com/i)) ? "Peacock"
									: url.match(/\.uplynk\.com/i) ? "Discovery_Plus"
										: url.match(/www\.youtube\.com/i) ? "YouTube"
											: url.match(/\.nflxvideo\.net/i) ? "Netflix"
												: undefined
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `Platform: ${Platform}`, "");
	/***************** BoxJs *****************/
	// 包装为局部变量，用完释放内存
	// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
	let BoxJs = $.getjson("DualSubs", database) // BoxJs
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `$.BoxJs类型: ${typeof $.BoxJs}`, `$.BoxJs内容: ${JSON.stringify($.BoxJs)}`, "");
	/***************** Verify *****************/
	let Verify = BoxJs?.Verify?.Settings || database?.Settings?.Verify;
	/***************** Settings *****************/
	let Settings = BoxJs[Platform]?.Settings || database?.Settings?.[Platform];
	Settings.Switch = JSON.parse(Settings.Switch) //  BoxJs字符串转Boolean
	if (typeof Settings.Type == "string") Settings.Type = Settings.Type.split(",") // BoxJs字符串转数组
	if (!Verify.GoogleCloud.Auth) Settings.Type = Settings.Type.filter(e => e !== "GoogleCloud"); // 移除不可用类型
	if (!Verify.Azure.Auth) Settings.Type = Settings.Type.filter(e => e !== "Azure");
	if (!Verify.DeepL.Auth) Settings.Type = Settings.Type.filter(e => e !== "DeepL");
	Settings.CacheSize = parseInt(Settings.CacheSize, 10) // BoxJs字符串转数字
	Settings.Offset = parseInt(Settings.Offset, 10) // BoxJs字符串转数字
	Settings.Tolerance = parseInt(Settings.Tolerance, 10) // BoxJs字符串转数字
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Cache *****************/
	let Cache = BoxJs[Platform]?.Cache || [];
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `Cache类型: ${typeof Cache}`, `$.Cache内容: ${Cache}`, "");
	if (typeof Cache == "string") Cache = JSON.parse(Cache)
	//$.log(`🎉 ${$.name}, Set Environment Variables`, `Cache类型: ${typeof Cache}`, `Cache内容: ${JSON.stringify(Cache)}`, "");
	return [Platform, Verify, Settings, Cache];
};
