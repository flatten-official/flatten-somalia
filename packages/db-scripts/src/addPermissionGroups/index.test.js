const db = require("util-db/inMemoryDb");
const Script = require("./index");
const {
  Permissions,
  Volunteer,
  PermissionGroups,
} = require("backend/src/volunteer/volunteerData");

const INITIAL_DATA = [
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
];

const OTHER_CASE_DATA = [
  // Already has a permissionGroup array
  {
    name: "volunteer2",
    email: "example3@gmail.com",
    teamName: "Flatten",
    permissions: [Permissions.submitForms],
    friendlyId: 2,
    permissionGroups: [],
  },
  // already has a filled permission group array
  {
    name: "volunteer2",
    email: "example4@gmail.com",
    teamName: "Flatten",
    permissions: [Permissions.submitForms],
    friendlyId: 3,
    permissionGroups: [PermissionGroups.dsu],
  },
];

describe("add permission group script", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  it("should run script as expected", async () => {
    // populate seed data
    for (const vol of INITIAL_DATA) await new Volunteer(vol).save();

    const volunteerBefore = await Volunteer.find().lean();

    // verify volunteers were properly added
    expect(volunteerBefore).toHaveLength(INITIAL_DATA.length);
    // verify field is truely undefined as in data (mongoose is sometimes weird)
    volunteerBefore.forEach((vol) =>
      expect(vol.permissionGroups).toBeUndefined()
    );

    // runs the scripts and tests the results
    await Script.run(...Script.scriptArguments);
    await Script.successTest(...Script.scriptArguments);

    // verify the length is still the same
    const volunteerAfter = await Volunteer.find().lean();
    expect(volunteerAfter).toHaveLength(volunteerBefore.length);

    for (let i = 0; i < volunteerAfter.length; i++) {
      // for each volunteer verify that it has the same properties as before modified
      expect(volunteerAfter[i]).toMatchObject(volunteerBefore[i]);
      // verify that the permission groups match what was set
      expect(volunteerAfter[i].permissionGroups).toStrictEqual(
        Script.scriptArguments[0]
      );
    }
  });

  it("should run script even with already exisiting permission gorups", async () => {
    // populate seed data
    for (const vol of OTHER_CASE_DATA) await new Volunteer(vol).save();

    const volunteerBefore = await Volunteer.find().lean();

    // verify volunteers were properly added
    expect(volunteerBefore).toHaveLength(INITIAL_DATA.length);

    // runs the scripts and tests the results
    await Script.run(...Script.scriptArguments);
    await Script.successTest(...Script.scriptArguments);

    // verify the length is still the same
    const volunteerAfter = await Volunteer.find().lean();
    expect(volunteerAfter).toHaveLength(volunteerBefore.length);

    for (let i = 0; i < volunteerAfter.length; i++) {
      // verify that the permission groups match what was set
      expect(volunteerAfter[i].permissionGroups).toStrictEqual(
        Script.scriptArguments[0]
      );
    }
  });
});
