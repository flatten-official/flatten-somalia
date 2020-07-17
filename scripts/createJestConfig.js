module.exports = (packageName, rootDir = "../../") => ({
  testEnvironment: "node", // Required when using mongoose (see doc)
  setupFiles: ["<rootDir>/scripts/setupTests.js"],
  setupFilesAfterEnv: ["<rootDir>/scripts/setupTestsAfterEnv.js"],
  collectCoverage: true,
  coverageReporters: ["lcov"],
  coverageDirectory: "<rootDir>/coverage",
  rootDir, // Defaults to ../../ since packages are stored two levels in from root
  displayName: packageName,
  roots: [`<rootDir>/packages/${packageName}/test`], // Specifies where to look for test files
});
