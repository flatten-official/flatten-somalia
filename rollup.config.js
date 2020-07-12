const commonjs = require("@rollup/plugin-commonjs");

module.exports = {
  input: "packages/backend/src/launch.js",
  output: {
    dir: "build",
    format: "cjs",
  },
  plugins: [commonjs()],
};
