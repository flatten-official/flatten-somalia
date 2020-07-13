const backendPackages = ["backend", "util-logging"];
const fs = require("fs");

let allDependencies = {};

backendPackages.forEach((packageDir) => {
  const jsonFile = require(`../packages/${packageDir}/package.json`);
  allDependencies = { ...allDependencies, ...jsonFile.dependencies };
});

fs.writeFileSync(
  "./dist/backend/package.json",
  `{"dependencies":${JSON.stringify(allDependencies)}}`
);
