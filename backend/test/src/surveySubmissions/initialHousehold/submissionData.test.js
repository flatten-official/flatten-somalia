const submissionData = require("../../../../src/surveys/initialHousehold/submissionData");
const util = require("../../../testUtils/mongo");

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
const testHouseholdData = [
  {
    followUpId: "90210",
    email: "test@example.com",
    phone: "01189998819991197253",
  },
  {
    followUpId: "90020",
    email: "billgates@example.com",
    phone: "240240240",
  },
];
const testPeopleInitial = [
  [{ name: "John Doe" }, { name: "Jane Doe" }],
  [{ name: "Hello World" }],
];

describe("submission database functions", () => {
  beforeAll(() => util.connectToDatabase());
  afterEach(() => util.clearDatabase());
  afterAll(() => util.closeDatabase());

  it("should write submission to database", async () => {
    const household = await submissionData.createHousehold(
      testHouseholdData[0].followUpId
    );

    const people = await submissionData.createPeople(
      testPeopleInitial[0].map((person) => {
        return { ...person, household: household._id };
      })
    );
    const submission = await submissionData.createSubmission(
      testSubmissions[0].addedBy,
      "testTeam",
      testSubmissions[0].submissionSchema,
      testSubmissions[0].metadata,
      people.map((person) => person._id),
      testPeopleInitial[0],
      household._id,
      testHouseholdData[0]
    );

    for (const person of people) await person.save();
    await household.save();
    await submission.save();

    const all = await submissionData.Submission.find();
    expect(all).toHaveLength(1);

    const retrievedSubmission = all[0];

    expect(retrievedSubmission._id).toStrictEqual(submission._id);
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
    const household = await submissionData.createHousehold(
      testHouseholdData[0].followUpId,
      testHouseholdData[0].phone,
      testHouseholdData[0].email
    );
    await household.save();

    const all = await submissionData.Household.find();

    expect(all).toHaveLength(1);
    const retrievedHousehold = all[0];

    expect(retrievedHousehold._id).toStrictEqual(household._id);
    expect(retrievedHousehold.followUpId).toStrictEqual(
      testHouseholdData[0].followUpId
    );
    expect(retrievedHousehold.phone).toStrictEqual(testHouseholdData[0].phone);
    expect(retrievedHousehold.email).toStrictEqual(testHouseholdData[0].email);
  });

  it("should create a person correctly", async () => {
    const household = await submissionData.createHousehold(
      testHouseholdData[0].followUpId
    );
    await household.save();

    const people = await submissionData.createPeople(
      testPeopleInitial[0].map((person) => {
        return { ...person, household: household._id };
      })
    );

    for (const person of people) await person.save();

    const all = await submissionData.Person.find();

    expect(all).toHaveLength(2);

    for (const [i, person] of Object.entries(people)) {
      const personDb = all.filter(
        (obj) => obj["_id"].toString() === person._id.toString()
      )[0];
      expect(personDb.name).toStrictEqual(testPeopleInitial[0][i].name);
      expect(personDb.household.toString()).toStrictEqual(
        household._id.toString()
      );
    }
  });
});
