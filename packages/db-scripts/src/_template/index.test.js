const db = require("util-db/inMemoryDb");
const Script = require("./index");

// STEP 1. Update block name
describe("template tests", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  // STEP 2. Update test name
  // eslint-disable-next-line jest/expect-expect
  it("should run script as expected", async () => {
    // STEP 3. Populate database with seed data

    // runs the scripts and tests the results
    await Script.run(...Script.scriptArguments);
    await Script.successTest(...Script.scriptArguments);

    // STEP 5. Run some other checks on your data.
  });

  // STEP 6. Write unit tests for edge cases, handling failures, bad data and different input data
});
