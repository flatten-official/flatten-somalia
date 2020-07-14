module.exports = {
  testEnvironment: "node",
  setupFiles: ["./scripts/setupTests.js"],
  setupFilesAfterEnv: ["./scripts/setupTestsAfterEnv.js"],
  collectCoverage: true,
  coverageReporters: ["lcov"],
};
