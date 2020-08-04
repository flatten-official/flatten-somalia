module.exports = ({
  name,
  rootDir = "../../",
  setupFilesAfterEnv = [],
  testPathIgnorePatterns = [],
}) => {
  setupFilesAfterEnv.push("<rootDir>/scripts/setupTestsAfterEnv.js");
  testPathIgnorePatterns.push("/node_modules/");

  return {
    testEnvironment: "node", // Required when using mongoose (see doc)
    setupFiles: ["<rootDir>/scripts/setupTests.js"],
    setupFilesAfterEnv,
    collectCoverage: true,
    coverageReporters: ["lcov"],
    coverageDirectory: "<rootDir>/coverage",
    rootDir, // Defaults to ../../ since packages are stored two levels in from root
    displayName: name,
    roots: [`<rootDir>/packages/${name}`], // Specifies where to look for test files
    testPathIgnorePatterns,
  };
};
