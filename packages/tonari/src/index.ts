/**
 * Extension point for module augmentation.
 *
 * Consumers can merge this interface to override or extend locale-related types.
 * You can add `RequiredLocale` and `OptionalLocale`.
 */
export interface Types {}

type _Types = Types &
  Omit<
    {
      RequiredLocale: "ja";
      OptionalLocale: "en";
    },
    keyof Types
  >;

/**
 * Required locale type.
 *
 * This locale must always be available in dictionaries and locale lists.
 */
export type RequiredLocale = _Types["RequiredLocale"];
/**
 * Optional locale type.
 *
 * This locale can be configured and used when available.
 */
export type OptionalLocale = _Types["OptionalLocale"];
/**
 * Union of all supported locale codes.
 */
export type Locale = RequiredLocale | OptionalLocale;
/**
 * Ordered locale preference list.
 *
 * The last element is always the required locale as a fallback.
 */
export type Locales = [...ReadonlyArray<Locale>, RequiredLocale];

interface Configuration {
  locales: Locales;
}
const configuration: Configuration = {
  locales: ["ja"],
};

/**
 * Returns the current locale preference list.
 *
 * The returned value is read-only from the caller's perspective.
 */
export function getLocales(): Readonly<Locales> {
  return configuration.locales;
}

/**
 * Updates the global locale preference list.
 *
 * The final locale must be the required locale.
 */
export function setLocales(...locales: Configuration["locales"]) {
  configuration.locales = locales;
}

/**
 * Resolves a localized string from a dictionary.
 *
 * It checks locales in priority order and returns the first matched translation.
 * Placeholders like `{{name}}` are replaced using `variables`.
 */
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
