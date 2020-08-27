const depCheck = require("depcheck");
const fs = require("fs");

const printError = (packageName, type, json) => {
  console.log(
    `Package \u001b[1m${packageName}\u001b[0m: ${type}. ${
      JSON.stringify(json) || ""
    }`
  );
};

const onScanComplete = (packageName) => (unused) => {
  if (unused.dependencies.length > 0)
    printError(packageName, "Unused dependency", unused.dependencies);

  if (unused.devDependencies.length > 0)
    printError(packageName, "Unused dev dependency", unused.devDependencies);

  if (Object.keys(unused.missing).length > 0)
    printError(packageName, "Missing dependency", unused.missing);

  if (Object.keys(unused.invalidFiles).length > 0)
    printError(packageName, "couldn't access/parse files", unused.invalidFiles);

  if (Object.keys(unused.invalidDirs).length > 0)
    printError(
      packageName,
      "couldn't access/parse directories",
      unused.invalidDirs
    ); // directories that cannot access

  if (packageName !== "util-db" && unused.using.mongoose)
    printError(
      packageName,
      "Should not import mongoose. db-utils should be the only package importing mongoose. See README"
    );
};

/** Get the names and paths of project package directories to check.
 *  returns names & paths of subdirectories of the `packages` directory
 *
 * @returns {[{name: String, path: String}]}
 */
function getProjectPackageDirs() {
  return fs
    .readdirSync("packages", {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      name: entry.name,
      path: process.cwd() + "/packages/" + entry.name,
    }));
}

const main = () => {
  // scan root directory, and sub-package directories
  const packageDirs = [{ name: "root", path: process.cwd() }].concat(
    getProjectPackageDirs()
  );

  for (const packageDir of packageDirs) {
    depCheck(
      packageDir.path,
      {
        ignorePatterns: ["api-generated"],
        ignoreMatches: [
          // Used in webpack.config.js
          "babel-eslint",
          "sass-loader",
          "@babel/preset-react",
          "@babel/plugin-proposal-class-properties",
        ],
      },
      onScanComplete(packageDir.name)
    );
  }
};

main();
