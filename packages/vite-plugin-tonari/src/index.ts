import { type Plugin } from "vite";

export function tonari(): Plugin {
  const strings: Record<string, string> = {};

  let counter = 0;

  const virtualModuleId = "virtual:tonari";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  const STRINGS_KEY = "TONARI_STRINGS";
  const STRINGS_VALUE = "__TONARI_STRINGS__";

  return {
    name: "tonari",
    apply: "build",

    buildStart() {
      counter = 0;
      for (const key of Object.keys(strings)) {
        delete strings[key];
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        return "export const " + STRINGS_KEY + "=" + STRINGS_VALUE + ";";
      }
    },

    renderChunk(code) {
      if (code.includes(STRINGS_VALUE)) {
        return {
          code: code.replace(
            STRINGS_VALUE,
            JSON.stringify(
              Object.fromEntries(
                Object.entries(strings).map(function ([key, value]) {
                  return [value, key];
                }),
              ),
            ),
          ),
        };
      }
    },

    resolveId(source) {
      if (source === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    transform(code, id) {
      if (!id.match(/\.(ts|js|tsx|jsx)$/)) {
        return null;
      }

      if (!code.includes(virtualModuleId)) {
        code = "import{" + STRINGS_KEY + '}from"' + virtualModuleId + '";' + code;
      }

      // TODO: `someFn`ではなく`t`にする。
      code = code.replace(/someFn\(\s*['"]([^'"]+)['"]\s*\)/g, function (_, value) {
        const key = (strings[value] ??= (counter++).toString(36));
        return "someFn(" + STRINGS_KEY + '["' + key + '"])';
      });

      return { code };
    },
  };
}
