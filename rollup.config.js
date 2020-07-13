const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");

module.exports = {
  input: "packages/backend/src/launch.js",
  output: {
    file: "./dist/backend/server.js",
    format: "cjs",
  },
  plugins: [
    commonjs({ ignore: ["mongodb-client-encryption"] }),
    json(),
    nodeResolve(),
  ],
};
