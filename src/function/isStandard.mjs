
/**
 * is Standard?
 * Determine whether Standard Media Player
 * @author VirgilClyne
 * @param {String} url - Parsed Request URL
 * @param {Object} headers - Request Headers
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<*>}
 */
export default function isStandard(url = new URL(), headers = {}, platform = "Universal") {
	console.log(`☑️ is Standard?`, "");
    // 判断设备类型
	const UA = headers["user-agent"] ?? headers["User-Agent"];
	console.log(`🚧 is Standard?, UA: ${UA}`, "");
    let device = UA.includes("Mozilla/5.0") ? "Web"
        : UA.includes("iPhone") ? "iPhone"
            : UA.includes("iPad") ? "iPad"
                : UA.includes("Macintosh") ? "Macintosh"
                    : UA.includes("AppleTV") ? "AppleTV"
                        : UA.includes("Apple TV") ? "AppleTV"
                            : "iPhone";
    switch (platform) {
        case "Max":
        case "HBOMax":
            if (headers["x-hbo-device-name"]?.includes("ios")) device = "iPhone";
            else if (url.searchParams.get("device-code") === "iphone") device = "iPhone";
            break;
        case "PeacockTV":
            if (UA.includes("PeacockMobile")) device = "iPhone";
            break;
    };
    // 判断是否标准播放器
    let standard = true;
    switch (device) {
        case "iPhone":
        case "iPad":
        case "Macintosh":
            switch (platform) {
                case "Max":
                case "HBOMax":
                case "Viki":
                case "PeacockTV":
                case "FuboTV":
                case "MUBI":
                    standard = false;
                    break;
                case "TED":
                default:
                    standard = true;
                    break;
            };
            break;
        case "Web":
            switch (platform) {
                case "Max":
                case "HBOMax":
                case "FuboTV":
                case "TED":
                case "MUBI":
                    standard = false;
                    break;
                case "Viki":
                case "PeacockTV":
                default:
                    standard = true;
                    break;
            };
            break;
        case "AppleTV":
        default:
            standard = true;
            break;
    };
	console.log(`✅ is Standard?, standard: ${standard}, device: ${device}`, "");
	return {standard, device};
};
