/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {String} url - Request URL
 * @param {Object} database - Default DataBase
 * @return {Promise<*>}
 */
async function setENV(name, url, database) {
	$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	/***************** Platform *****************/
	const Platform = /\.apple\.com/i.test(url) ? "Apple"
		: /\.(dssott|starott)\.com/i.test(url) ? "Disney_Plus"
			: /\.(hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net/i.test(url) ? "Prime_Video"
				: /\.(api\.hbo|hbomaxcdn)\.com/i.test(url) ? "HBO_Max"
					: /\.(hulustream|huluim)\.com/i.test(url) ? "Hulu"
						: /\.(cbsaavideo|cbsivideo|cbs)\.com/i.test(url) ? "Paramount_Plus"
							: /dplus-ph-/i.test(url) ? "Discovery_Plus_Ph"
								: /\.peacocktv\.com/i.test(url) ? "Peacock_TV"
									: /\.uplynk\.com/i.test(url) ? "Discovery_Plus"
										: /\.youtube\.com/i.test(url) ? "YouTube"
											: /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
												: "Universal"
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Platform: ${Platform}`, "");
	/***************** Verify *****************/
	let Verify = await getENV(name, "Verify", database);
	/***************** Settings *****************/
	let Settings = await getENV(name, Platform, database);
	if (Platform == "Apple") {
		let platform = /\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/subscription\//i.test(url) ? "Apple_TV_Plus"
			: /\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/workout\//i.test(url) ? "Apple_Fitness"
				: /\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\//i.test(url) ? "Apple_TV"
					: /vod-.*-aoc\.tv\.apple\.com/i.test(url) ? "Apple_TV_Plus"
						: /vod-.*-amt\.tv\.apple\.com/i.test(url) ? "Apple_TV"
							: /(hls|hls-svod)\.itunes\.apple\.com/i.test(url) ? "Apple_Fitness"
								: "Apple"
		Settings = await getENV(name, platform, database);
	};
	Settings.Switch = JSON.parse(Settings.Switch) //  BoxJs字符串转Boolean
	if (typeof Settings.Types == "string") Settings.Types = Settings.Types.split(",") // BoxJs字符串转数组
	if (!Verify.GoogleCloud.Auth) Settings.Types = Settings.Types.filter(e => e !== "GoogleCloud"); // 移除不可用类型
	if (!Verify.Azure.Auth) Settings.Types = Settings.Types.filter(e => e !== "Azure");
	if (!Verify.DeepL.Auth) Settings.Types = Settings.Types.filter(e => e !== "DeepL");
	Settings.External.Offset = parseInt(Settings.External?.Offset, 10) // BoxJs字符串转数字
	Settings.External.ShowOnly = JSON.parse(Settings.External?.ShowOnly) //  BoxJs字符串转Boolean
	Settings.CacheSize = parseInt(Settings.CacheSize, 10) // BoxJs字符串转数字
	Settings.Tolerance = parseInt(Settings.Tolerance, 10) // BoxJs字符串转数字
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Type *****************/
	const Type = url.match(/[&\?]dualsubs=(\w+)$/)?.[1] || Settings.Type
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Type: ${Type}`, "");
	/***************** Advanced *****************/
	let Advanced = await getENV(name, "Advanced", database);
	Advanced.Translator.Times = parseInt(Advanced.Translator?.Times, 10) // BoxJs字符串转数字
	Advanced.Translator.Interval = parseInt(Advanced.Translator?.Interval, 10) // BoxJs字符串转数字
	Advanced.Translator.Exponential = JSON.parse(Advanced.Translator?.Exponential) //  BoxJs字符串转Boolean
	/***************** Cache *****************/
	let Caches = await getENV(name, "Caches", database);
	Caches = Caches?.[Platform] || [];
	//$.log(`🚧 ${$.name}, Set Environment Variables`, `Caches类型: ${typeof Caches}`, `Caches内容: ${Caches}`, "");
	if (typeof Caches == "string") Caches = JSON.parse(Caches)
	//$.log(`🎉 ${$.name}, Set Environment Variables`, `Caches类型: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	return { Platform, Verify, Advanced, Settings, Type, Caches };
	/**
	 * Get Environment Variables
	 * @author VirgilClyne
	 * @param {String} t - Persistent Store Key
	 * @param {String} e - Platform Name
	 * @param {Object} n - Default DataBase
	 * @return {Promise<*>}
	 */
	async function getENV(t,e,n){let i=$.getjson(t,n),s=i?.[e]||i?.Settings?.[e]||n?.[e]||n?.Settings?.[e]||n?.Settings?.Default;if("undefined"!=typeof $argument){if($argument){let t=Object.fromEntries($argument.split("&").map((t=>t.split("=")))),e={};for(var g in t)r(e,g,t[g]);Object.assign(s,e)}function r(t,e,n){e.split(".").reduce(((t,i,s)=>t[i]=e.split(".").length===++s?n:t[i]||{}),t)}}return s}
};
