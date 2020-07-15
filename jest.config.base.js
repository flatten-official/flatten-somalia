module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/scripts/setupTests.js"],
  setupFilesAfterEnv: ["<rootDir>/scripts/setupTestsAfterEnv.js"],
  collectCoverage: true,
  coverageReporters: ["lcov"],
  coverageDirectory: "<rootDir>/coverage",
};
