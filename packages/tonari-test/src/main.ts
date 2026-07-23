import { setLocales, t } from "tonari";

declare module "tonari" {
  interface Types {
    RequiredLocale: "fr";
    OptionalLocale: "es" | "ja";
  }
}

setLocales("ja", "es", "fr");
console.debug(t({ es: "¡Hola, mundo!", fr: "Bonjour, le monde!", ja: "こんにちは、世界！" }));
