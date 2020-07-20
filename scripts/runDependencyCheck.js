const depCheck = require("depcheck");
const fs = require("fs");

const { log } = require("util-logging");

const printError = (packageName, type, json) => {
  log.warning(
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

  if (packageName !== "db-utils" && unused.using.mongoose)
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
  const cwd = process.cwd();
  const dirs = [];

  const packagesDirectoryEntries = fs.readdirSync("packages", {
    withFileTypes: true,
  });

  for (const entry of packagesDirectoryEntries) {
    if (entry.isDirectory()) {
      dirs.push({
        name: entry.name,
        path: cwd + "/packages/" + entry.name,
      });
    }
  }

  return dirs;
}

const main = () => {
  // scan root directory, and sub-package directories
  const packageDirs = [{ name: "root", path: process.cwd() }];
  packageDirs.concat(getProjectPackageDirs());

  for (const packageDir of packageDirs) {
    depCheck(packageDir.path, {}, onScanComplete(packageDir.name));
  }
};

main();
