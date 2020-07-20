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

/** Get the names and paths of directories to check.
 *  returns the root project package, and subdirectories of the `packages` directory
 *
 *  @returns {[{Object}]}
 */
function getPackages() {
  const cwd = process.cwd();
  const packages = [{ name: "root", path: cwd }];

  const packagesDirectoryEntries = fs.readdirSync("packages", {
    withFileTypes: true,
  });

  for (const entry of packagesDirectoryEntries) {
    if (entry.isDirectory()) {
      packages.push({
        name: entry.name,
        path: cwd + "/packages/" + entry.name,
      });
    }
  }

  return packages;
}

const main = () => {
  for (const packageDesc of getPackages()) {
    depCheck(packageDesc.path, {}, onScanComplete(packageDesc.name));
  }
};

main();