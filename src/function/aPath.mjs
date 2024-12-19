// Get Absolute Path
export default function aPath(URL = "", URI = "") {
	let url = "";
	switch (true) {
		case URI.startsWith("https://") || URI.startsWith("http://"):
			url = URI;
			break;
		case URI.startsWith("/"):
			url = URL.match(/^(https?:\/\/(?:[^/]+))/i)?.[0] + URI;
			break;
		default:
			url = URL.match(/^(https?:\/\/(?:[^?]+)\/)/i)?.[0] + URI;
			break;
	}
	return url;
	//return /^https?:\/\//i.test(URI) ? URI : URL.match(/^(https?:\/\/(?:[^?]+)\/)/i)?.[0] + URI;
}
