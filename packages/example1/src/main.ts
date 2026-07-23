import { t } from "tonari";

declare module "tonari" {
  interface Types {
    RequiredLocale: "fr";
    OptionalLocale: "es" | "ja";
  }
}

t({ fr: "", ja: "これはモジュール拡張のテストです。" });
