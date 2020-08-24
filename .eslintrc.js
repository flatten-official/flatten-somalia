const browserPackages = ["packages/frontend/**/*.js"];
const cloudFunctions = ["packages/db-copy-function/*.js"];

module.exports = {
  root: true, // Stop ESLint from looking for a config files in parent folders
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  plugins: [
    "prettier",
    "jest",
    "import",
    "jsx-a11y",
    "react",
    "react-hooks",
    "workspaces",
  ],
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:workspaces/recommended",
    "prettier", // must be last to override other formatting rules https://github.com/prettier/eslint-config-prettier#installation
    "prettier/react",
  ],
  parserOptions: { ecmaVersion: 2018 }, // Node 10 has almost full support for ECMA 2018 see https://node.green/
  rules: {
    "prettier/prettier": "warn",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Don't warn for vars starting with _
    "prefer-const": "warn",
    "require-await": "warn",
    "no-return-await": "warn",
    "no-throw-literal": "error",
    "react/display-name": "warn", // Downgrade from error
  },
  overrides: [
    {
      files: ["packages/**/*.js"],
      rules: {
        "no-console": "error", // All packages should be using util-logging not console.log
      },
    },
    {
      files: cloudFunctions,
      rules: {
        "no-console": "error", // Cloud functions can't import workspace dependencies
        "workspaces/no-cross-imports": "warn", // Cloud functions must be contained within a single file so can't import from another workspace
      },
    },
    {
      // Frontend uses babel-eslint and can use the latest ecma version
      files: browserPackages,
      parser: "babel-eslint",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        browser: true,
        es6: true,
      },
      rules: {
        "no-console": "warn", // Console is only a warning for browser
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
