const db = require("util-db/inMemoryDb");
const Script = require("./index");
const {
  Permissions,
  Volunteer,
} = require("backend/src/volunteer/volunteerData");

const SEED_DATA = [
  {
    name: "volunteer1",
    email: "example@gmail.com",
    teamName: "Flatten",
    permissions: [],
    friendlyId: 0,
  },
  {
    name: "volunteer2",
    email: "example2@gmail.com",
    teamName: "Flatten",
    permissions: [Permissions.submitForms],
    friendlyId: 1,
  },
  {
    name: "volunteer2",
    email: "example3@gmail.com",
    teamName: "Flatten",
    permissions: [Permissions.submitForms, Permissions.access],
    friendlyId: 2,
  },
];

// STEP 1. Update block name
describe("addAccessPermission", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  // eslint-disable-next-line jest/expect-expect
  it("should run script as expected", async () => {
    for (const v of SEED_DATA) await new Volunteer(v).save();

    // Use the same find query as the success test to make sure the find query works as expected
    const volunteersWithoutAccess = await Volunteer.find({
      permissions: { $not: { $all: [Permissions.access] } },
    });
    expect(volunteersWithoutAccess).toHaveLength(2);

    // expect success test to fail since not all entries have access permission before script runs
    await expect(Script.successTest(...Script.scriptArguments)).rejects.toThrow(
      "array" // part of the error message that is thrown
    );

    await Script.run(...Script.scriptArguments);
    await Script.successTest(...Script.scriptArguments);

    // Make sure no one was deleted
    const volunteers = await Volunteer.find();
    expect(volunteers).toHaveLength(SEED_DATA.length);
  });
});
