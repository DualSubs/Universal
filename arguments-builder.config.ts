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
			key: "ShowOnly",
			name: "[翻译字幕]只显示翻译后字幕",
			defaultValue: false,
			type: "boolean",
			description: "开启后仅显示翻译字幕，不做字幕合并操作。",
		},
	],
});
