/**
 * detect Format
 * @author VirgilClyne
 * @param {Object} m3u8 - Parsed M3U8
 * @return {String} type - type
 */
export default function detectPlaylist(m3u8 = {}) {
	console.log(`☑️ detectPlaylist`, "");
	let type = undefined;
	m3u8.forEach(item => {
		switch (item.TAG) {
			case "#EXT-X-MEDIA":
			case "#EXT-X-STREAM-INF":
				type = "Multivariant Playlist";
				break;
			case "#EXT-X-PLAYLIST-TYPE":
			case "EXT-X-TARGETDURATION":
			case "#EXTINF":
				type = "Media Playlist";
				break;
			default:
				break;
		};
	});
	console.log(`✅ detectPlaylist, type: ${type}`, "");
	return type;
};
