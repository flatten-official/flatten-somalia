module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:flowtype/recommended",
    "plugin:import/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "react",
    "prettier",
    "jsx-a11y",
    "react-hooks",
    "import",
    "flowtype",
  ],
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
