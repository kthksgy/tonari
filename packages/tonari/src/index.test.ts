import { afterEach, describe, expect, test, vi } from "vitest";

import { type Locale, getLocales, setLocales, t } from "./index";

afterEach(function () {
  setLocales("ja");
});

describe("locale configuration", function () {
  test("starts with the required locale", function () {
    expect(getLocales()).toEqual(["ja"]);
  });

  test("updates and returns the locale preference list", function () {
    setLocales("en", "ja");

    expect(getLocales()).toEqual(["en", "ja"]);
  });
});

describe("t", function () {
  test("returns the first translation available in the locale list", function () {
    setLocales("en", "ja");

    expect(t({ ja: "こんにちは", en: "Hello" })).toBe("Hello");
  });

  test("uses options locales without changing the global preference list", function () {
    setLocales("ja");

    expect(t({ ja: "こんにちは", en: "Hello" }, undefined, { locales: ["en", "ja"] })).toBe(
      "Hello",
    );
    expect(getLocales()).toEqual(["ja"]);
  });

  test("replaces string variables and keeps unknown placeholders", function () {
    expect(
      t({ ja: "こんにちは、{{name}}さん。{{missing}}", en: "Hello, {{name}}." }, { name: "太郎" }),
    ).toBe("こんにちは、太郎さん。{{missing}}");
  });

  test("resolves function variables with the selected locale", function () {
    setLocales("en", "ja");
    const variable = vi.fn(function (locale: Locale) {
      return locale === "en" ? "friend" : "友だち";
    });

    expect(t({ ja: "こんにちは、{{name}}。", en: "Hello, {{name}}." }, { name: variable })).toBe(
      "Hello, friend.",
    );
    expect(variable).toHaveBeenCalledWith("en");
  });

  test("returns an empty string when no translation is available", function () {
    expect(t({ ja: "" })).toBe("");
  });
});
