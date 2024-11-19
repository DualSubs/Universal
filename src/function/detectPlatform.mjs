import { log } from "@nsnanocat/util";

export default function detectPlatform(url) {
	log("☑️ Detect Platform", "");
	/***************** Platform *****************/
	let Platform = "Universal";
	switch (true) {
		case /\.(netflix\.com|nflxvideo\.net)/i.test(url):
			Platform = "Netflix";
			break;
		case /(\.youtube|youtubei\.googleapis)\.com/i.test(url):
			Platform = "YouTube";
			break;
		case /\.spotify(cdn)?\.com/i.test(url):
			Platform = "Spotify";
			break;
		case /\.apple\.com/i.test(url):
			Platform = "Apple";
			break;
		case /\.(dssott|starott|dssedge)\.com/i.test(url):
			Platform = "Disney+";
			break;
		case /primevideo\.com|(\.(pv-cdn|aiv-cdn|akamaihd|cloudfront)\.net)|s3\.amazonaws\.com\/aiv-prod-timedtext\//i.test(url):
			Platform = "PrimeVideo";
			break;
		case /pro?d\.media\.(h264\.io|max\.com)/i.test(url):
			Platform = "Max";
			break;
		case /\.(api\.hbo|hbomaxcdn)\.com/i.test(url):
			Platform = "HBOMax";
			break;
		case /\.hulu(stream|im)?\.com/i.test(url):
			Platform = "Hulu";
			break;
		case /\.(pplus\.paramount\.tech|cbs(aavideo|cbsivideo)?\.com)/i.test(url):
			Platform = "Paramount+";
			break;
		case /\.uplynk\.com/i.test(url):
			Platform = "Discovery+";
			break;
		case /dplus-ph-/i.test(url):
			Platform = "Discovery+Ph";
			break;
		case /\.peacocktv\.com/i.test(url):
			Platform = "PeacockTV";
			break;
		case /\.fubo\.tv/i.test(url):
			Platform = "FuboTV";
			break;
		case /\.viki\.io/i.test(url):
			Platform = "Viki";
			break;
		case /epix(hls\.akamaized\.net|\.services\.io)/i.test(url):
			Platform = "MGM+";
			break;
		case /\.nebula\.app/i.test(url):
			Platform = "Nebula";
			break;
		case /\.pluto(\.tv|tv\.net)/i.test(url):
			Platform = "PlutoTV";
			break;
		case /\.mubicdn\.net/i.test(url):
			Platform = "MUBI";
			break;
	}
    log(`✅ Detect Platform, Platform: ${Platform}`, "");
	return Platform;
};
