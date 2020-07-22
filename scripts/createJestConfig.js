module.exports = ({ name, rootDir = "../../", setupFileAfterEnv }) => {
  const allSetupFileAfterEnv = ["<rootDir>/scripts/setupTestsAfterEnv.js"];

  if (setupFileAfterEnv) allSetupFileAfterEnv.push(setupFileAfterEnv);

  return {
    testEnvironment: "node", // Required when using mongoose (see doc)
    setupFiles: ["<rootDir>/scripts/setupTests.js"],
    setupFilesAfterEnv: allSetupFileAfterEnv,
    collectCoverage: true,
    coverageReporters: ["lcov"],
    coverageDirectory: "<rootDir>/coverage",
    rootDir, // Defaults to ../../ since packages are stored two levels in from root
    displayName: name,
    roots: [`<rootDir>/packages/${name}`], // Specifies where to look for test files
  };
};
