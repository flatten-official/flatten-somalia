const db = require("db-utils/inMemoryDb");
const { useReplicaSet } = require("db-utils");
const { testOnlyIf } = require("backend/test/utils/jest");
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
  {
    name: "Some name",
    email: "example2@gmail.com",
    permissions: [Permissions.submitForms],
    teamName: "Flatten", // Use Flatten as the team name for people who's submissions should be ignored
  },
  {
    name: "Some name",
    email: "example3@gmail.com",
    permissions: [Permissions.submitForms],
    teamName: "Flatten", // Use Flatten as the team name for people who's submissions should be ignored
  },
  {
    name: "Some name",
    email: "example4@gmail.com",
    permissions: [Permissions.submitForms],
    teamName: "Flatten", // Use Flatten as the team name for people who's submissions should be ignored
  },
];

describe("add volunteer script test", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  // eslint-disable-next-line jest/expect-expect
  it("should add volunteer as expected", async () => {
    await Script.run(...Script.scriptArguments);
    await Script.successTest(...Script.scriptArguments);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should add volunteer as expected with test data", async () => {
    await Script.run(VOLUNTEERS);
    await Script.successTest(VOLUNTEERS);
  });

  it("should fail to add the same volunteer twice", async () => {
    await Script.run(VOLUNTEERS);
    await Script.successTest(VOLUNTEERS);
    await expect(Script.run(VOLUNTEERS)).rejects.toThrow(
      "E11000 duplicate key error collection"
    );

    expect(await Volunteer.find()).toHaveLength(VOLUNTEERS.length);
  });

  testOnlyIf(useReplicaSet)(
    "should not add any volunteers upon failure",
    async () => {
      /* eslint-disable jest/no-standalone-expect */

      // Populate with seed data
      const existingVolunteer = {
        name: "Some name",
        email: "someOtherEmail@gmail.com",
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
      await expect(Script.successTest(volunteersToAdd)).rejects.toThrow(
        "toBeNull" // Error that will be thrown by jest if a value doesn't exist. We can't take a bigger chunk of the error since color codes interfere with the string and we won't get a match
      );

      // Verify that length hasn't changed
      expect(await Volunteer.find()).toHaveLength(1);
    }
  );
});
