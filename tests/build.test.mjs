import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { cp, mkdtemp, readdir, rm, symlink, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";

test("Chrome conversion failure stops the clean build and cannot reuse stale upload artifacts", { timeout: 30000 }, async () => {
	const directory = await mkdtemp(path.join(tmpdir(), "dualsubs-build-failure-"));
	try {
		for (const file of ["package.json", "arguments-builder.full.config.ts", "arguments-builder.release.config.ts", "template"])
			await cp(file, path.join(directory, file), { recursive: true });
		await symlink(path.resolve("node_modules"), path.join(directory, "node_modules"));
		await mkdir(path.join(directory, "dist"));
		const artifact = "DualSubs.Universal.yaml";
		await writeFile(path.join(directory, "dist", artifact), "stale artifact");
		await assert.rejects(promisify(execFile)("npm", ["run", "build"], {
			cwd: directory, env: { ...process.env, PUPPETEER_EXECUTABLE_PATH: path.join(directory, "missing-chrome") }, timeout: 25000,
		}), error => error.code === 1 && /Failed to generate Surge module/.test(error.stdout + error.stderr));
		const files = await readdir(path.join(directory, "dist"));
		assert.equal(files.includes(artifact), false);
		assert.equal(files.some(file => file.endsWith(".bundle.js")), false);
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
});
