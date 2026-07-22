declare const NPM_PACKAGE_VERSION:
  | `${string}.${string}.${string}`
  | `${string}.${string}.${string}+${string}`
  | `${string}.${string}.${string}-${string}`
  | `${string}.${string}.${string}-${string}+${string}`;

export const VERSION = NPM_PACKAGE_VERSION;

export type RequiredLocale = "en" | "ja";
export type OptionalLocale = "fr";

interface Configuration {
  locales: [...ReadonlyArray<RequiredLocale | OptionalLocale>, RequiredLocale];
}
const configuration: Configuration = {
  locales: ["en"],
};

export function setLocales(
  ...locales: [...ReadonlyArray<RequiredLocale | OptionalLocale>, RequiredLocale]
) {
  configuration.locales = locales;
}

export function tt<
  T extends Record<RequiredLocale, string | ReadonlyArray<string>> &
    Partial<Record<OptionalLocale, string | ReadonlyArray<string>>>,
>(dictionary: T): string {
  for (const locale of configuration.locales) {
    const string = dictionary[locale];
    if (Array.isArray(string)) {
      return string.join("");
    } else if (typeof string === "string") {
      return string;
    }
  }

  return "";
}
