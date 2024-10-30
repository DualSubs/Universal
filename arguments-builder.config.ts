import { defineConfig } from "@iringo/arguments-builder";

export default defineConfig({
	output: {
		surge: {
			path: "./dist/Universal.sgmodule",
		},
		loon: {
			path: "./dist/Universal.plugin",
		},
		customItems: [
			{
				path: "./dist/Universal.stoverride",
				template: "./template/stash.handlebars",
			},
			{
				path: "./dist/Universal.yaml",
				template: "./template/egern.handlebars",
			},
			{
				path: "./dist/Universal.snippet",
				template: "./template/quantumultx.handlebars",
			},
			{
				path: "./dist/Universal.srmodule",
				template: "./template/shadowrocket.handlebars",
			},
		],
		dts: {
			isExported: true,
			path: "./src/types.d.ts",
		},
		boxjsSettings: {
			path: "./template/boxjs.settings.json",
			scope: "@DualSubs.YouTube.Settings",
		},
	},
	args: [
		{
			key: "Switch",
			name: "总功能开关",
			defaultValue: true,
			type: "boolean",
			description: "是否启用此APP修改",
			exclude: ["surge", "loon"],
		},
		{
			key: "Types",
			name: "[字幕]启用类型",
			defaultValue: ["Official", "Translate"],
			type: "array",
			options: [
				{
					key: "Official",
					label: "官方字幕（合成器）",
				},
				{
					key: "Translate",
					label: "翻译字幕（翻译器）",
				},
			],
			description:
				"请选择要添加的字幕选项，如果为标准播放器，则会在字幕选项中新增勾选字幕选项。",
		},
		{
			key: "Languages[0]",
			name: "[字幕]主语言（源语言）",
			defaultValue: "AUTO",
			type: "string",
			boxJsType: "selects",
			description:
				"当“主语言”字幕存在时，将生成“主语言/副语言（翻译）”与“主语言（外挂）”的字幕或字幕选项。",
			options: [
				{
					key: "AUTO",
					label: "自动 - Automatic",
				},
				{
					key: "ZH",
					label: "中文（自动）",
				},
				{
					key: "ZH-HANS",
					label: "中文（简体）",
				},
				{
					key: "ZH-HK",
					label: "中文（香港）",
				},
				{
					key: "ZH-HANT",
					label: "中文（繁体）",
				},
				{
					key: "EN",
					label: "English - 英语（自动）",
				},
				{
					key: "ES",
					label: "Español - 西班牙语（自动）",
				},
				{
					key: "JA",
					label: "日本語 - 日语",
				},
				{
					key: "KO",
					label: "한국어 - 韩语",
				},
				{
					key: "DE",
					label: "Deutsch - 德语",
				},
				{
					key: "FR",
					label: "Français - 法语",
				},
				{
					key: "TR",
					label: "Türkçe - 土耳其语",
				},
			],
		},
		{
			key: "Languages[1]",
			name: "[字幕]副语言（目标语言）",
			defaultValue: "ZH",
			type: "string",
			boxJsType: "selects",
			description:
				"当“副语言”字幕存在时，将生成“副语言/主语言（官方）”的字幕或字幕选项。",
			options: [
				{
					key: "ZH",
					label: "中文（自动）",
				},
				{
					key: "ZH-HANS",
					label: "中文（简体）",
				},
				{
					key: "ZH-HK",
					label: "中文（香港）",
				},
				{
					key: "ZH-HANT",
					label: "中文（繁体）",
				},
				{
					key: "EN",
					label: "English - 英语（自动）",
				},
				{
					key: "ES",
					label: "Español - 西班牙语（自动）",
				},
				{
					key: "JA",
					label: "日本語 - 日语",
				},
				{
					key: "KO",
					label: "한국어 - 韩语",
				},
				{
					key: "DE",
					label: "Deutsch - 德语",
				},
				{
					key: "FR",
					label: "Français - 法语",
				},
				{
					key: "TR",
					label: "Türkçe - 土耳其语",
				},
			],
		},
		{
			key: "ShowOnly",
			name: "[翻译字幕]只显示翻译后字幕",
			defaultValue: false,
			type: "boolean",
			description: "开启后仅显示翻译字幕，不做字幕合并操作。",
		},
	],
});
