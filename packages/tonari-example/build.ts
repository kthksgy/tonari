import * as fs from "node:fs";
import * as path from "node:path";

import * as esbuild from "esbuild";

// `build.ts`が存在するディレクトリをカレントディレクトリにする。
process.chdir(import.meta.dirname);

fs.rmSync("dist", { force: true, recursive: true });

await esbuild.build({
  bundle: true,
  entryPoints: [path.join("src", "main.ts")],
  format: "cjs",
  keepNames: true,
  logLevel: "info",
  minify: true,
  outExtension: { ".js": ".cjs" },
  outdir: "dist",
  platform: "node",
  sourcemap: true,
  target: "node22",
  treeShaking: true,
});
