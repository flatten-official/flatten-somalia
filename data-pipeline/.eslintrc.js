module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "prettier/prettier": "warn",
    "no-unused-vars": "warn",
    "prefer-const": "warn",
    "require-await": "warn",
    "no-return-await": "warn",
  },
};
