const browserPackages = ["packages/frontend/*.js"];

module.exports = {
  // Stop ESLint from looking for a config files in parent folders
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:jest/all",
    "plugin:flowtype/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
  ],
  plugins: [
    "prettier",
    "jest",
    "import",
    "flowtype",
    "jsx-a11y",
    "react",
    "react-hooks",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  rules: {
    "prettier/prettier": "warn",
    "jest/no-hooks": "off",
    "jest/prefer-expect-assertions": "off",
    "no-unused-vars": "warn",
    "prefer-const": "warn",
    "require-await": "warn",
    "no-return-await": "warn",
    "no-throw-literal": "error",
  },
  overrides: [
    {
      files: ["packages/**/*.js"],
      rules: {
        "no-console": "error", // All packages should be using util-logging not console.log
      },
    },
    {
      files: ["packages/db-copy-function/*.js"],
      rules: {
        "no-console": "off", // Cloud functions can't import the external module
      },
    },
    {
      // Frontend uses babel-eslint and can use the latest ecma version
      files: browserPackages,
      parser: "babel-eslint",
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
};
