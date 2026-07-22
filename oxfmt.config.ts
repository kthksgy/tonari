import { defineConfig } from "oxfmt";

export default defineConfig({
  sortImports: {
    newlinesBetween: true,

    ignoreCase: false,
  },
  sortPackageJson: { sortScripts: true },
});
