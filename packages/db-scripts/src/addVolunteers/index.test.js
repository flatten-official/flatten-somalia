const db = require("db-utils/inMemoryDb");
const Script = require("./index");
const {
  Permissions,
  Volunteer,
  addVolunteer,
} = require("backend/src/volunteer/volunteerData");

const VOLUNTEERS = [
  {
    name: "Some name",
    email: "example@gmail.com",
    permissions: [Permissions.submitForms],
    teamName: "Flatten", // Use Flatten as the team name for people who's submissions should be ignored
  },
];

// STEP 1. Update block name
describe("template tests", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  // STEP 2. Update test name
  // eslint-disable-next-line jest/expect-expect
  it("should add volunteer as expected", async () => {
    // STEP 3. Populate database with seed data

    // STEP 4. Run the script with your own arguments
    await Script.run(...Script.scriptArguments);
    await Script.successTest(...Script.scriptArguments);

    // STEP 5. Run some other checks on your data.
  });

  // eslint-disable-next-line jest/expect-expect
  it("should add volunteer as expected with test data", async () => {
    await Script.run(VOLUNTEERS);
    await Script.successTest(VOLUNTEERS);
  });

  it("should fail to add the same volunteer twice", async () => {
    await Script.run(VOLUNTEERS);
    await Script.successTest(VOLUNTEERS);
    // eslint-disable-next-line jest/require-to-throw-message
    await expect(Script.run(VOLUNTEERS)).rejects.toThrow();

    expect(await Volunteer.find()).toHaveLength(VOLUNTEERS.length);
  });

  it("should not add any volunteers upon failure", async () => {
    // Populate with seed data
    const existingVolunteer = {
      name: "Some name",
      email: "example2@gmail.com",
      permissions: [Permissions.submitForms],
      teamName: "Flatten",
    };

    await addVolunteer(existingVolunteer);

    // Verify that it was added.
    expect(await Volunteer.find()).toHaveLength(1);

    const volunteersToAdd = VOLUNTEERS.concat(existingVolunteer);

    // Script should fail since one of the volunteers already exists
    // eslint-disable-next-line jest/require-to-throw-message
    await expect(Script.run(volunteersToAdd)).rejects.toThrow();

    // Success test should fail since script didn't add everyone
    // eslint-disable-next-line jest/require-to-throw-message
    await expect(Script.successTest(volunteersToAdd)).rejects.toThrow();

    // Verify that length hasn't changed
    expect(await Volunteer.find()).toHaveLength(1);
  });

  // STEP 6. Write unit tests for edge cases, handling failures, bad data and different input data
});
