import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "warn",
  },
  options: { typeAware: true, typeCheck: true },
  plugins: ["react", "typescript", "oxc"],
  rules: {
    /** 必要な場合、配列のコールバック関数の`return`を書く。 */
    "eslint/array-callback-return": "warn",
    /** `switch`文で`default`節を記述する。 */
    "eslint/default-case": "warn",
    /** 厳密等価演算子を使用する。 */
    "eslint/eqeqeq": ["error", "smart"],
    /** 配列要素を引数にした配列のコンストラクタ(`new Array(a, b, c)`)は使わない。 */
    "eslint/no-array-constructor": "warn",
    /** `arguments.caller`と`arguments.callee`を使用しない。 */
    "eslint/no-caller": "error",
    /** 同じファイルからのインポートをまとめる。 */
    "eslint/no-duplicate-imports": "off", // `import-x/no-duplicates`を使用する。
    /** `eval()`を使用しない。 */
    "eslint/no-eval": "error",
    /** ビルトインやネイティブのオブジェクトを拡張しない。 */
    "eslint/no-extend-native": "error",
    /** 冗長な`bind()`を使用しない。 */
    "eslint/no-extra-bind": "warn",
    /** 冗長なラベルを使用しない。 */
    "eslint/no-extra-label": "warn",
    /** 特定の関数で可能な`eval()`ライクな処理をしない。 */
    "eslint/no-implied-eval": "error",
    /** `__iterator__`プロパティを使用しない。 */
    "eslint/no-iterator": "error",
    /** 変数とラベルで同じ名前を使用しない。 */
    "eslint/no-label-var": "error",
    /** 冗長なブロックを作成しない。 */
    "eslint/no-lone-blocks": "warn",
    /** ループ内で安全でない参照を持つ関数を作成しない。 */
    "eslint/no-loop-func": "error",
    /** 複数行の文字列リテラルを使用しない。 */
    "eslint/no-multi-str": "error",
    /** `Function`クラスに対して`new`演算子を使用しない。 */
    "eslint/no-new-func": "error",
    /** `String`クラス／`Number`クラス／`Boolean`クラスに対して`new`演算子を使用しない。 */
    "eslint/no-new-wrappers": "error",
    /** `__proto__`プロパティを使用しない。 */
    "eslint/no-proto": "error",
    /** 非推奨のグローバル変数を規定する。 */
    "eslint/no-restricted-globals": "error",
    /** `javascript:`URLを使用しない。 */
    "eslint/no-script-url": "error",
    /** 同じ変数同士を比較しない。 */
    "eslint/no-self-compare": "error",
    /** カンマ演算子を使用しない。 */
    "eslint/no-sequences": "error",
    /** テンプレートリテラル内ではなく文字列リテラル内で`${x}`構文を使用しない。 */
    "eslint/no-template-curly-in-string": "warn",
    /** 例外としてリテラルをスローしない。 */
    "eslint/no-throw-literal": "error",
    /** 1度しか実行されないループを使用しない。 */
    "eslint/no-unreachable-loop": "error",
    /** プログラムの状態に影響を与えない未使用の式を禁止する。 */
    "eslint/no-unused-expressions": [
      "error",
      {
        /** 短絡評価は許可する。 */
        allowShortCircuit: true,
        /** 三項演算子は許可する。 */
        allowTernary: true,
        /** タグ付きテンプレートリテラルは許可する。 */
        allowTaggedTemplates: true,
      },
    ],
    /** 未使用の変数を禁止する。 */
    "eslint/no-unused-vars": [
      "warn",
      {
        /** 関数の引数の設定。 */
        args: "none",
        /** `catch`の`error`に対する設定。 */
        caughtErrors: "none",
        /** スプレッド構文を用いたプロパティ省略のための定義は無視する。 */
        ignoreRestSiblings: true,
      },
    ],
    /** 冗長な計算プロパティ名を禁止する。 */
    "eslint/no-useless-computed-key": "warn",
    /** 冗長なリテラルの連結を禁止する。 */
    "eslint/no-useless-concat": "warn",
    /** 空のコンストラクタを禁止する。 */
    "eslint/no-useless-constructor": "warn",
    /** 同じ名前へのリネームを禁止する。 */
    "eslint/no-useless-rename": "warn",
    /** `let`よりも`const`を優先する。 */
    "eslint/prefer-const": ["warn", { destructuring: "all" }],
    /** インポートの順番を規定する。 */
    "eslint/sort-imports": [
      "warn",
      {
        allowSeparatedGroups: true,
      },
    ],
    /** Unicode Byte Order Markを挿入する。 */
    "eslint/unicode-bom": ["warn", "never"],

    /** デフォルトエクスポートが存在しないファイルからデフォルトインポートしない。 */
    "import/default": "off",
    /** ファイル先頭以外でインポートしない。 */
    "import/first": "warn",
    /** インポートの後に空行を挿入する。 */
    "import/newline-after-import": ["warn", { count: 1 }],
    /** AMDの`require()`と`define()`を禁止する。 */
    "import/no-amd": "error",
    /** 循環インポートを禁止する。 */
    "import/no-cycle": "off", // NOTE: 処理に時間が掛かるので無効化する。
    /** 名前付きエクスポートされた名前と同じ名前でデフォルトエクスポートのプロパティを参照しない。 */
    "import/no-named-as-default-member": "off",
    /** 自己インポートを禁止する。 */
    "import/no-self-import": "error",
    /** webpackのローダー構文を禁止する。 */
    "import/no-webpack-loader-syntax": "error",

    /** `boolean`型の属性をJSXで指定する場合、`={true}`を省略する。 */
    "react/jsx-boolean-value": "warn",
    /** コンポーネント名は`PascalCase`で命名する。 */
    "react/jsx-pascal-case": ["warn", { allowAllCaps: true }],
    /** `children`プロパティを子要素として渡す。 */
    "react/no-children-prop": "warn",
    "react/only-export-components": ["warn", { allowConstantExport: true }],
    /** `import React from 'react';`を要する。 */
    "react/react-in-jsx-scope": "off",
    "react/rules-of-hooks": "warn",
    /** コンポーネントの`style`プロパティをオブジェクトで指定する。 */
    "react/style-prop-object": "warn",
  },
});
