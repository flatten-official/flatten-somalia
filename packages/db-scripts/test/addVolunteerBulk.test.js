const db = require("db-utils/inMemoryDb");
const Script = require("../src/addVolunteerBulk");
const {
  Permissions,
  Volunteer,
} = require("backend/src/volunteer/volunteerData");

describe("addVolunteerBulk", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  it("should add volunteers properly", async () => {
    const volunteers = [
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

    await Script.run(volunteers);

    const volunteersFound = await Volunteer.find().lean();

    expect(volunteersFound).toHaveLength(volunteers.length);

    for (let i = 0; i < volunteers.length; i++) {
      Object.entries(volunteers[i]).forEach(([key, value]) => {
        expect(volunteersFound[i][key]).toStrictEqual(value);
      });
    }
  });
});
