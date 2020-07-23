const db = require("db-utils/inMemoryDb");
const Script = require("./index");

// STEP 1. Update block name
describe("template tests", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  // STEP 2. Update test name
  // eslint-disable-next-line jest/expect-expect
  it("should pass success tests with valid data", async () => {
    // STEP 3. Populate database with seed data

    // STEP 4. Run the script with your own arguments
    const someFirstArgument = "someFirstArgument";
    await Script.run(someFirstArgument);

    await Script.successTest(someFirstArgument);

    // STEP 5. Run some other checks on your data.
  });

  // STEP 6. Write unit tests for edge cases, handling failures and bad data
});
