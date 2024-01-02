module.exports = {
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint/eslint-plugin"],
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended" /* , 'prettier', 'standard-with-typescript' */,
    ],
    root: true,
    overrides: [],
    env: {
        browser: true,
        es2021: true,
        es6: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js", "src/assets/HeroIcons.tsx"],
    rules: {
        /**
         * Error Rules
         */
        "no-invalid-this": "error",
        camelcase: ["error", { properties: "always" }],

        /**
         * Warn Rules
         */

        "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
        "@typescript-eslint/prefer-optional-chain": "warn",
        "@typescript-eslint/restrict-template-expressions": 0,
        "@typescript-eslint/restrict-plus-operands": "warn",
        "@typescript-eslint/no-invalid-void-type": "warn",
        "@typescript-eslint/triple-slash-reference": "warn",
        "@typescript-eslint/no-unused-expressions": ["warn", { allowShortCircuit: true, allowTernary: true }],
        "@typescript-eslint/no-empty-function": "warn",

        /**
         * Off Rules
         */
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-inferrable-types": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-namespace": 0,
        "@typescript-eslint/no-floating-promises": 0,
        "@typescript-eslint/strict-boolean-expressions": 0,
        "@typescript-eslint/prefer-nullish-coalescing": 0,
        "@typescript-eslint/prefer-rest-params": 0,
        "@typescript-eslint/naming-convention": 0,

        // tez
        "react/no-unknown-property": 0,
    },
};
