const db = require("util-db/inMemoryDb");
const Script = require("./index");
const {
  Permissions,
  PermissionGroups,
  Volunteer,
  addVolunteer,
} = require("backend/src/volunteer/volunteerData");

describe("addVolunteerBulk", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  it("should add volunteers properly", async () => {
    const initialData = [
      {
        name: "volunteer1",
        email: "example@gmail.com",
        teamName: "Flatten",
        permissions: [],
      },
      {
        name: "volunteer2",
        email: "example2@gmail.com",
        teamName: "Flatten",
        permissions: [Permissions.submitForms],
      },
    ];

    for (const vol of initialData) {
      await addVolunteer(vol);
    }

    const permissionGroups = [PermissionGroups.dsu];

    await Script.run(permissionGroups);

    const volunteersFound = await Volunteer.find().lean();

    expect(volunteersFound).toHaveLength(initialData.length);

    for (let i = 0; i < volunteersFound.length; i++) {
      delete volunteersFound[i]._id;
      delete volunteersFound[i].friendlyId;
      delete volunteersFound[i].__v;

      Object.entries(volunteersFound[i]).forEach(([key, value]) => {
        if (key === "permissionGroups") {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(value).toStrictEqual(permissionGroups);
        } else {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(value).toStrictEqual(initialData[i][key]);
        }
      });
    }
  });
});
