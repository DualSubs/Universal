/**
 * is Standard?
 * Determine whether Standard Media Player
 * @author VirgilClyne
 * @param {String} url - Request URL
 * @param {Object} headers - Request Headers
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<*>}
 */
async function isStandard(platform, url, headers) {
	$.log(`⚠ ${$.name}, is Standard`, "");
	let _url = URL.parse(url);
	let standard = true;
	switch (platform) {
		case "HBO_Max":
			if (headers?.["User-Agent"]?.includes("Mozilla/5.0")) standard = false;
			else if (headers?.["User-Agent"]?.includes("iPhone")) standard = false;
			else if (headers?.["User-Agent"]?.includes("iPad")) standard = false;
			else if (headers?.["X-Hbo-Device-Name"]?.includes("ios")) standard = false;
			else if (_url.params["device-code"] === "iphone") standard = false;
			break;
		case "Peacock_TV":
			if (headers?.["User-Agent"]?.includes("Mozilla/5.0")) standard = false;
			else if (headers?.["User-Agent"]?.includes("iPhone")) standard = false;
			else if (headers?.["User-Agent"]?.includes("iPad")) standard = false;
			else if (headers?.["User-Agent"]?.includes("PeacockMobile")) standard = false;
			break;
		case "Fubo_TV":
			if (headers?.["User-Agent"]?.includes("iPhone")) standard = false;
			else if (headers?.["User-Agent"]?.includes("iPad")) standard = false;
			break;
		case "TED":
			if (headers?.["User-Agent"]?.includes("Mozilla/5.0")) standard = false;
	}
	$.log(`🎉 ${$.name}, is Standard`, `standard: ${standard}`, "");
	return standard
};
