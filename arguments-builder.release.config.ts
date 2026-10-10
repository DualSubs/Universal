import { defineConfig } from "@nsnanocat/arguments-builder";
import { moduleArgs, output } from "./arguments-builder.full.config.ts";

export default defineConfig({ output, args: moduleArgs });
