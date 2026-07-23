# tonari

Tonari is an inline-first i18n library for JavaScript and TypeScript, keeping translations close to the UI.

## Usage

### Import

```ts
import { getLocales, setLocales, t } from "tonari";
```

### Set locales

Set the locale preference list in priority order.
The last locale should be a required fallback locale.

```ts
setLocales("en", "ja");
```

### Get locales

Read the current locale preference list.

```ts
const locales = getLocales();
// ["en", "ja"]
```

### Basic translation

Use `t` with a dictionary where required locales are always present.
The first matching locale from the current preference list is returned.

```ts
setLocales("en", "ja");

const message = t({
  ja: "こんにちは",
  en: "Hello",
});

// "Hello"
```

### Variable interpolation

Use placeholders like `{{name}}` in dictionary strings and pass variables as the second argument.

```ts
setLocales("ja");

const greeting = t(
  {
    ja: "こんにちは、{{name}}さん",
    en: "Hello, {{name}}",
  },
  {
    name: "太郎",
  },
);

// "こんにちは、太郎さん"
```

Variables can also be locale-aware functions.

```ts
setLocales("en", "ja");

const greeting = t(
  {
    ja: "こんにちは、{{title}}",
    en: "Hello, {{title}}",
  },
  {
    title(locale) {
      return locale === "ja" ? "みなさん" : "everyone";
    },
  },
);

// "Hello, everyone"
```

### Module augmentation

You can customize locale-related types by augmenting the `Types` interface.
This is useful when your app uses locales other than the defaults.

```ts
import { setLocales, t } from "tonari";

declare module "tonari" {
  interface Types {
    RequiredLocale: "ja" | "fr";
    OptionalLocale: "en" | "de";
  }
}

setLocales("de", "fr");

const message = t({
  ja: "こんにちは",
  fr: "Bonjour",
  de: "Hallo",
});

// "Hallo"
```

If you override `RequiredLocale` or `OptionalLocale`, include all locales you still want to allow.
For example, when you set `RequiredLocale`, the default required locale is replaced by your definition.
