const submissionData = require("../../src/submission/submissionData");
const util = require("../testUtils/mongo");
const { setup } = require("../../src/index");

const mongoose = require("mongoose");

const dummyVolunteerId = "56cb91bdc3464f14678934ca";
const testSubmissions = [
  {
    addedBy: mongoose.Types.ObjectId(dummyVolunteerId),
    submissionSchema: {
      form: "householdInitialSubmission",
      version: "1.0",
    },
    metadata: {
      location: {
        lat: 0,
        long: 0,
      },
      filledOutTimestamp: Date.now(),
      timeToComplete: 3000,
      consentGiven: true,
    },
  },
  {
    addedBy: mongoose.Types.ObjectId(dummyVolunteerId),
    submissionSchema: {
      form: "householdFollowupSubmission",
      version: "1.0",
    },
    metadata: {
      location: {
        lat: 50,
        long: 50,
      },
      filledOutTimestamp: Date.now(),
      timeToComplete: 2000,
      consentGiven: true,
    },
  },
];
const testPublicHouseholdId = "id-test-0";
const initialHouseholdData = {
  publicId: "90210",
  email: "test@example.com",
  phone: "01189998819991197253",
};
const followupHouseholdData = {
  awareOfCovidHotline: true,
};

const initialPeople = [
  {
    data: { name: "John Doe" },
    submissionKind: "person",
  },
  {
    data: { name: "Jane Doe" },
    submissionKind: "death",
  },
];
const followUpPeople = [
  {
    data: { emotionalState: "Happy" },
    submissionKind: "person",
  },
];

describe("submission database functions", () => {
  beforeAll(async () => {
    await setup(false);
    await util.connectToDatabase();
  });

  afterEach(async () => await util.clearDatabase());
  afterAll(async () => await util.closeDatabase());

  it("should write submission to database", async () => {
    const householdId = await submissionData.createHousehold(
      testPublicHouseholdId
    );

    const peopleIds = await submissionData.createPeople(
      initialPeople.map((person) => {
        return { ...person.data, household: householdId };
      })
    );
    const submissionId = await submissionData.createSubmission(
      testSubmissions[0].addedBy,
      testSubmissions[0].submissionSchema,
      testSubmissions[0].metadata,
      peopleIds,
      initialPeople.map((d) => d.data),
      householdId,
      initialHouseholdData
    );

    const all = await submissionData.Submission.find();
    expect(all).toHaveLength(1);

    const retrievedSubmission = all[0];

    expect(retrievedSubmission._id).toStrictEqual(submissionId);
    expect(testSubmissions[0].addedBy).toStrictEqual(
      retrievedSubmission.addedBy
    );
    expect(testSubmissions[0].submissionSchema.form).toStrictEqual(
      retrievedSubmission.submissionSchema.form
    );
    expect(testSubmissions[0].submissionSchema.version).toStrictEqual(
      retrievedSubmission.submissionSchema.version
    );
    expect(testSubmissions[0].metadata.filledOutTimestamp).toStrictEqual(
      retrievedSubmission.metadata.filledOutTimestamp
    );
    expect(testSubmissions[0].metadata.timeToComplete).toStrictEqual(
      retrievedSubmission.metadata.timeToComplete
    );
    expect(testSubmissions[0].metadata.consentGiven).toStrictEqual(
      retrievedSubmission.metadata.consentGiven
    );
  });

  it("should create a household correctly", async () => {
    const householdId = await submissionData.createHousehold(
      initialHouseholdData.publicId,
      initialHouseholdData.phone,
      initialHouseholdData.email
    );

    const all = await submissionData.Household.find();

    expect(all).toHaveLength(1);
    const retrievedHousehold = all[0];

    expect(retrievedHousehold._id).toStrictEqual(householdId);
    expect(retrievedHousehold.publicId).toStrictEqual(
      initialHouseholdData.publicId
    );
    expect(retrievedHousehold.phone).toStrictEqual(initialHouseholdData.phone);
    expect(retrievedHousehold.email).toStrictEqual(initialHouseholdData.email);
  });

  it("should create a person correctly", async () => {
    const householdId = await submissionData.createHousehold(
      testPublicHouseholdId
    );

    const peopleIds = await submissionData.createPeople(
      initialPeople.map((person) => {
        return { ...person.data, household: householdId };
      })
    );

    const all = await submissionData.Person.find();

    expect(all).toHaveLength(2);

    for (let [i, id] of Object.entries(peopleIds)) {
      let personDb = all.filter(
        (obj) => obj["_id"].toString() === id.toString()
      )[0];
      expect(personDb.name).toStrictEqual(initialPeople[i].data.name);
      expect(personDb.household.toString()).toStrictEqual(
        householdId.toString()
      );
    }
  });

  it("should handle follow up submissions correctly", async () => {
    // TODO
    expect(true).toStrictEqual(false);
  });
});
