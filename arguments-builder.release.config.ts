import { defineConfig } from "@iringo/arguments-builder";
import { logLevel, output, storage, subtitles, translate } from "./arguments-builder.full.config";

export default defineConfig({
	output,
	args: [...subtitles, ...translate, ...storage, ...logLevel],
});
