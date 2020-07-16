const db = require("db-utils/inMemoryDb");
const Script = require("./index");

describe("addVolunteerBulk", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  // eslint-disable-next-line jest/expect-expect
  it("should TODO", async () => {
    // TODO Populate with seed data

    const someFirstArgument = "someFirstArgument";
    await Script.run(someFirstArgument);
    await Script.successTest(someFirstArgument);

    // TODO some other checks beyond the success test
  });

  // TODO Test for failures, edge cases, etc.
});
