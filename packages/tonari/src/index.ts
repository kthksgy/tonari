declare const NPM_PACKAGE_VERSION:
  | `${string}.${string}.${string}`
  | `${string}.${string}.${string}+${string}`
  | `${string}.${string}.${string}-${string}`
  | `${string}.${string}.${string}-${string}+${string}`;

export const VERSION = NPM_PACKAGE_VERSION;

export interface Types {}

type _Types = Omit<
  {
    RequiredLocale: "ja";
    OptionalLocale: "en";
  },
  keyof Types
> &
  Types;

export type RequiredLocale = _Types["RequiredLocale"];
export type OptionalLocale = _Types["OptionalLocale"];
export type Locale = RequiredLocale | OptionalLocale;

interface Configuration {
  locales: [...ReadonlyArray<Locale>, RequiredLocale];
}
const configuration: Configuration = {
  locales: ["ja"],
};

export function setLocales(...locales: [...ReadonlyArray<Locale>, RequiredLocale]) {
  configuration.locales = locales;
}

export function t(
  dictionary: Record<RequiredLocale, string> & Partial<Record<OptionalLocale, string>>,
  variables?: Partial<Record<string, string | { (locale: Locale): string }>>,
  options?: Partial<{
    locales: [...ReadonlyArray<Locale>, RequiredLocale];
  }>,
): string {
  for (const locale of options?.locales ?? configuration.locales) {
    const string = dictionary[locale];
    if (string !== undefined) {
      return string.replace(/\{\{([^{}]+)\}\}/g, function (token, key: string) {
        const variable = variables?.[key];
        if (typeof variable === "function") {
          return variable(locale);
        } else if (typeof variable === "string") {
          return variable;
        } else {
          return token;
        }
      });
    }
  }

  return "";
}
