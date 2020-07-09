module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:jest/all"],
  plugins: ["prettier", "jest"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "prettier/prettier": "warn",
    "jest/no-hooks": "off",
    "jest/prefer-expect-assertions": "off",
    "no-unused-vars": "warn",
    "prefer-const": "warn",
    "require-await": "warn",
    "no-return-await": "warn",
    "no-console": "error",
  },
};
