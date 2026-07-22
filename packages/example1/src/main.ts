import { t } from "tonari";

declare module "tonari" {
  interface Types {
    RequiredLocale: "fr";
    OptionalLocale: "es";
  }
}

t({ fr: "モジュール拡張のテストです。" });
