import { defineConfig } from "@nsnanocat/arguments-builder";
import { argTypes, panelAPIExternalNeteaseMusicPasswordDev, panelAPIExternalNeteaseMusicPhoneNumberDev, panelAPIExternalURLDev, panelAPITranslateDeepLAuth, panelAPITranslateDeepLVersion, panelAPITranslateDeepLXAuthDev, panelAPITranslateDeepLXEndpointDev, panelAPITranslateGoogleCloudAuth, panelAPITranslateGoogleCloudMode, panelAPITranslateGoogleCloudVersion, panelAPITranslateMicrosoftAuth, panelAPITranslateMicrosoftMode, panelAPITranslateMicrosoftRegion, panelAPITranslateMicrosoftVersion, panelCompositeCacheSize, panelCompositeOffset, panelCompositePosition, panelCompositeTolerance, panelExternalCacheSize, panelExternalLrcVendor, panelExternalSubVendorDev, panelTranslateCacheSizeDev, panelTranslateExponential, panelTranslateInterval, panelTranslateMethod, panelTranslatePosition, panelTranslateShowOnly, panelTranslateTimes, panelTranslateVendor, panelTranslateVendorDev, panelUniversalLanguages0, panelUniversalLanguages0Dev, panelUniversalLanguages1, panelUniversalLanguages1Dev, panelUniversalLogLevel, panelUniversalTypesDev } from "./arguments-builder.full.config.ts";

export const panels = [
	{ id: "DualSubs.Universal", scope: "@DualSubs.Universal.Settings", args: [argTypes, panelUniversalLanguages0, panelUniversalLanguages1, panelUniversalLogLevel], cachePath: "@DualSubs.Composite.Caches" },
	{ id: "DualSubs.Composite", scope: "@DualSubs.Composite.Settings", args: [panelCompositeCacheSize, panelCompositePosition, panelCompositeOffset, panelCompositeTolerance] },
	{ id: "DualSubs.Translate", scope: "@DualSubs.Translate.Settings", args: [panelTranslateVendor, panelTranslateShowOnly, panelTranslatePosition, panelTranslateMethod, panelTranslateTimes, panelTranslateInterval, panelTranslateExponential] },
	{ id: "DualSubs.External", scope: "@DualSubs.External.Settings", args: [panelExternalLrcVendor, panelExternalCacheSize] },
	{ id: "DualSubs.API.Translate", scope: "@DualSubs.API.Settings", args: [panelAPITranslateGoogleCloudVersion, panelAPITranslateGoogleCloudMode, panelAPITranslateGoogleCloudAuth, panelAPITranslateMicrosoftVersion, panelAPITranslateMicrosoftMode, panelAPITranslateMicrosoftRegion, panelAPITranslateMicrosoftAuth, panelAPITranslateDeepLVersion, panelAPITranslateDeepLAuth], resetPaths: ["@DualSubs.API.Settings.GoogleCloud", "@DualSubs.API.Settings.Microsoft", "@DualSubs.API.Settings.DeepL"] },
];

export const devPanels = [
	{ id: "DualSubs.Universal", scope: "@DualSubs.Universal.Settings", args: [panelUniversalTypesDev, panelUniversalLanguages0Dev, panelUniversalLanguages1Dev, panelUniversalLogLevel], cachePath: "@DualSubs.Composite.Caches" },
	{ id: "DualSubs.Composite", scope: "@DualSubs.Composite.Settings", args: [panelCompositeCacheSize, panelCompositePosition, panelCompositeOffset, panelCompositeTolerance] },
	{ id: "DualSubs.Translate", scope: "@DualSubs.Translate.Settings", args: [panelTranslateVendorDev, panelTranslateShowOnly, panelTranslatePosition, panelTranslateMethod, panelTranslateTimes, panelTranslateInterval, panelTranslateExponential, panelTranslateCacheSizeDev] },
	{ id: "DualSubs.External", scope: "@DualSubs.External.Settings", args: [panelExternalSubVendorDev, panelExternalLrcVendor, panelExternalCacheSize] },
	{ id: "DualSubs.API.Translate", scope: "@DualSubs.API.Settings", args: [panelAPITranslateGoogleCloudVersion, panelAPITranslateGoogleCloudMode, panelAPITranslateGoogleCloudAuth, panelAPITranslateMicrosoftVersion, panelAPITranslateMicrosoftMode, panelAPITranslateMicrosoftRegion, panelAPITranslateMicrosoftAuth, panelAPITranslateDeepLVersion, panelAPITranslateDeepLAuth, panelAPITranslateDeepLXEndpointDev, panelAPITranslateDeepLXAuthDev], resetPaths: ["@DualSubs.API.Settings.GoogleCloud", "@DualSubs.API.Settings.Microsoft", "@DualSubs.API.Settings.DeepL", "@DualSubs.API.Settings.DeepLX"] },
	{ id: "DualSubs.API.External", scope: "@DualSubs.API.Settings", args: [panelAPIExternalNeteaseMusicPhoneNumberDev, panelAPIExternalNeteaseMusicPasswordDev, panelAPIExternalURLDev], resetPaths: ["@DualSubs.API.Settings.NeteaseMusic", "@DualSubs.API.Settings.URL"] },
];

export default defineConfig({ args: panels[0].args });
