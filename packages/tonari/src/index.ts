export interface Types {}

type _Types = Types &
  Omit<
    {
      RequiredLocale: "ja";
      OptionalLocale: "en";
    },
    keyof Types
  >;

export type RequiredLocale = _Types["RequiredLocale"];
export type OptionalLocale = _Types["OptionalLocale"];
export type Locale = RequiredLocale | OptionalLocale;
export type Locales = [...ReadonlyArray<Locale>, RequiredLocale];

interface Configuration {
  locales: Locales;
}
const configuration: Configuration = {
  locales: ["ja"],
};

export function getLocales(): Readonly<Locales> {
  return configuration.locales;
}

export function setLocales(...locales: Configuration["locales"]) {
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
