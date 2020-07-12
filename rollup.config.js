const commonjs = require("@rollup/plugin-commonjs");

module.exports = {
  input: "packages/backend/src/launch.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [commonjs()],
};
