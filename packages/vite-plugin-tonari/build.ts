import * as fs from "node:fs";
import * as path from "node:path";

import * as esbuild from "esbuild";

// `build.ts`が存在するディレクトリをカレントディレクトリにする。
process.chdir(import.meta.dirname);

const external = Object.entries(JSON.parse(fs.readFileSync("package.json", "utf8")))
  .filter(function ([key]) {
    return (
      key === "bundleDependencies" ||
      key === "dependencies" ||
      key === "devDependencies" ||
      key === "peerDependencies"
    );
  })
  .reduce(function (external, [, value]) {
    if (value) {
      for (const name of Object.keys(value)) {
        external.push(name);
      }
    }
    return external;
  }, [] as Array<string>);

fs.rmSync("dist", { force: true, recursive: true });

for (const { entryPoints, format, platform, target } of [
  {
    entryPoints: [{ in: path.join("src", "index.ts"), out: "require" }],
    format: "cjs",
    platform: "node",
    target: "node22",
  },
  {
    entryPoints: [{ in: path.join("src", "index.ts"), out: "import" }],
    format: "esm",
    platform: "node",
    target: "node22",
  },
] satisfies ReadonlyArray<esbuild.BuildOptions>) {
  await esbuild.build({
    bundle: true,
    entryPoints,
    external,
    format,
    keepNames: true,
    logLevel: "info",
    minify: false,
    outdir: "dist",
    platform,
    sourcemap: true,
    target,
    treeShaking: true,
  });
}
