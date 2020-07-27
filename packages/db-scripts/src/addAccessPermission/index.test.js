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

    await Script.run(...Script.scriptArguments);
    await Script.successTest(...Script.scriptArguments);

    const volunteers = await Volunteer.find();
    expect(volunteers).toHaveLength(SEED_DATA.length);
  });
});
