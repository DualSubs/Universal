import { defineConfig } from "@nsnanocat/arguments-builder";
import { moduleArgs } from "./arguments-builder.full.config.ts";

export default defineConfig({
	output: {
		surge: {
			path: "./dist/DualSubs.Universal.dev.sgmodule",
			template: "./template/surge.dev.handlebars",
			transformEgern: {
				enable: true,
				path: "./dist/DualSubs.Universal.dev.yaml"
			}
		},
		loon: {
			path: "./dist/DualSubs.Universal.dev.plugin",
			template: "./template/loon.dev.handlebars"
		},
		customItems: [
			{
				path: "./dist/DualSubs.Universal.dev.stoverride",
				template: "./template/stash.dev.handlebars"
			},
			{
				path: "./dist/DualSubs.Universal.dev.snippet",
				template: "./template/quantumultx.dev.handlebars"
			},
			{
				path: "./dist/DualSubs.Universal.dev.srmodule",
				template: "./template/shadowrocket.dev.handlebars"
			}
		],
		boxjsSettings: {
			path: "./dist/DualSubs.Universal.dev.boxjs.json",
			scope: "@DualSubs.Universal.Settings"
		}
	},
	args: moduleArgs,
});
