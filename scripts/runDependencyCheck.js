const depCheck = require("depcheck");
const fs = require("fs");

const { log } = require("util-logging");

const printError = (packageName, type, json) => {
  log.warning(
    `Package: ${packageName}. ${type}. ${JSON.stringify(json) || ""}`
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
    printError(packageName, "could'nt access/parse files", unused.invalidFiles);

  if (Object.keys(unused.invalidDirs).length > 0)
    printError(packageName, "could not access/parse dirs", unused.invalidDirs); // directories that cannot access

  if (packageName !== "db-utils" && unused.using.mongoose)
    printError(
      packageName,
      "Should not import mongoose. db-utils should be the only package importing mongoose. See README"
    );
};

const main = () => {
  depCheck(process.cwd(), {}, onScanComplete("root"));

  const packages = fs.readdirSync("packages", { withFileTypes: true });
  for (const package of packages) {
    // depcheck expects project folders
    if (package.isDirectory()) {
      depCheck(
        process.cwd() + `/packages/${package.name}`,
        {},
        onScanComplete(package.name)
      );
    }
  }
};

main();
