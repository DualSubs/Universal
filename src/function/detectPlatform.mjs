export default function detectPlatform(url) {
	console.log(`☑️ Detect Platform`, "");
	/***************** Platform *****************/
	let Platform = /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
		: /(\.youtube|youtubei\.googleapis)\.com/i.test(url) ? "YouTube"
			: /\.spotify(cdn)?\.com/i.test(url) ? "Spotify"
				: /\.apple\.com/i.test(url) ? "Apple"
					: /\.(dssott|starott)\.com/i.test(url) ? "Disney+"
						: /primevideo\.com|(\.(pv-cdn|aiv-cdn|akamaihd|cloudfront)\.net)|s3\.amazonaws\.com\/aiv-prod-timedtext\//i.test(url) ? "PrimeVideo"
							: /prd\.media\.h264\.io/i.test(url) ? "Max"
								: /\.(api\.hbo|hbomaxcdn)\.com/i.test(url) ? "HBOMax"
									: /\.hulu(stream|im)?\.com/i.test(url) ? "Hulu"
										: /\.(pplus\.paramount\.tech|cbs(aavideo|cbsivideo)?\.com)/i.test(url) ? "Paramount+"
											: /\.uplynk\.com/i.test(url) ? "Discovery+"
												: /dplus-ph-/i.test(url) ? "Discovery+Ph"
													: /\.peacocktv\.com/i.test(url) ? "PeacockTV"
														: /\.fubo\.tv/i.test(url) ? "FuboTV"
															: /\.viki\.io/i.test(url) ? "Viki"
																: /epix(hls\.akamaized\.net|\.services\.io)/i.test(url) ? "MGM+"
																	: /\.nebula\.app/i.test(url) ? "Nebula"
																		: /\.pluto(\.tv|tv\.net)/i.test(url) ? "PlutoTV"
																			: /\.mubicdn\.net/i.test(url) ? "MUBI"
																				: "Universal";
    console.log(`✅ Detect Platform, Platform: ${Platform}`, "");
	return Platform;
};
