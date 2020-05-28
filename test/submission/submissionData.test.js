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
    location: {
      lat: 0,
      long: 0,
    },
    filledOutTimestamp: Date.now(),
    timeToComplete: 3000,
    consentGiven: true,
  },
  {
    addedBy: mongoose.Types.ObjectId(dummyVolunteerId),
    submissionSchema: {
      form: "householdFollowupSubmission",
      version: "1.0",
    },
    location: {
      lat: 50,
      long: 50,
    },
    filledOutTimestamp: Date.now(),
    timeToComplete: 2000,
    consentGiven: true,
  },
];
const testPublicHouseholdId = "id-test-0";
const initialHouseholdData = {
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
    const submissionId = await submissionData.createSubmission(
      testSubmissions[0].addedBy,
      testSubmissions[0].submissionSchema,
      testSubmissions[0].location,
      testSubmissions[0].filledOutTimestamp,
      testSubmissions[0].timeToComplete,
      testSubmissions[0].consentGiven
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
    expect(testSubmissions[0].filledOutTimestamp).toStrictEqual(
      retrievedSubmission.filledOutTimestamp
    );
    expect(testSubmissions[0].timeToComplete).toStrictEqual(
      retrievedSubmission.timeToComplete
    );
    expect(testSubmissions[0].consentGiven).toStrictEqual(
      retrievedSubmission.consentGiven
    );
  });

  it("should create a household correctly", async () => {
    const submissionId = await submissionData.createSubmission(
      testSubmissions[0].addedBy,
      testSubmissions[0].submissionSchema,
      testSubmissions[0].location,
      testSubmissions[0].filledOutTimestamp,
      testSubmissions[0].timeToComplete,
      testSubmissions[0].consentGiven
    );

    const householdId = await submissionData.createHousehold(
      initialHouseholdData,
      testPublicHouseholdId,
      submissionId
    );

    const all = await submissionData.Household.find();

    expect(all).toHaveLength(1);
    const retrievedHousehold = all[0];

    expect(retrievedHousehold._id).toStrictEqual(householdId);
    expect(retrievedHousehold.publicId).toStrictEqual(testPublicHouseholdId);
    expect(retrievedHousehold.submissions[0].data.phone).toStrictEqual(
      initialHouseholdData.phone
    );
    expect(retrievedHousehold.submissions[0].data.email).toStrictEqual(
      initialHouseholdData.email
    );
    expect(retrievedHousehold.submissions[0].submissionRef).toStrictEqual(
      submissionId
    );
  });

  it("should create a person within a household correctly", async () => {
    const submissionId = await submissionData.createSubmission(
      testSubmissions[0].addedBy,
      testSubmissions[0].submissionSchema,
      testSubmissions[0].location,
      testSubmissions[0].filledOutTimestamp,
      testSubmissions[0].timeToComplete,
      testSubmissions[0].consentGiven
    );

    const householdId = await submissionData.createHousehold(
      initialHouseholdData,
      testPublicHouseholdId,
      submissionId
    );

    const p0id = await submissionData.createPerson(
      initialPeople[0].data,
      initialPeople[0].submissionKind,
      householdId,
      submissionId
    );
    const p1id = await submissionData.createPerson(
      initialPeople[1].data,
      initialPeople[1].submissionKind,
      householdId,
      submissionId
    );

    const ids = [p0id, p1id];

    const all = await submissionData.Person.find();

    expect(all).toHaveLength(2);

    for (let [i, id] of Object.entries(ids)) {
      let personDb = all.filter(
        (obj) => obj["_id"].toString() === id.toString()
      )[0];
      expect(personDb.submissions[0].data).toStrictEqual(initialPeople[i].data);
      expect(personDb.submissions[0].submissionKind).toStrictEqual(
        initialPeople[i].submissionKind
      );
      expect(personDb.submissions[0].submissionRef.toString()).toStrictEqual(
        submissionId.toString()
      );
    }
  });

  it("should add a submission to a household correctly", async () => {
    let submissionIds = [];
    for (let submission of testSubmissions) {
      submissionIds.push(
        await submissionData.createSubmission(
          submission.addedBy,
          submission.submissionSchema,
          submission.location,
          submission.filledOutTimestamp,
          submission.timeToComplete,
          submission.consentGiven
        )
      );
    }

    const householdId = await submissionData.createHousehold(
      initialHouseholdData,
      testPublicHouseholdId,
      submissionIds[0]
    );

    await submissionData.addSubmissionToHousehold(
      householdId,
      followupHouseholdData,
      submissionIds[1]
    );

    const submissions = await submissionData.Submission.find();
    expect(submissions).toHaveLength(2);

    const all = await submissionData.Household.find();
    expect(all).toHaveLength(1);

    const retrievedHousehold = all[0];

    expect(retrievedHousehold._id).toStrictEqual(householdId);
    expect(retrievedHousehold.publicId).toStrictEqual(testPublicHouseholdId);
    expect(retrievedHousehold.submissions[0].data.phone).toStrictEqual(
      initialHouseholdData.phone
    );
    expect(retrievedHousehold.submissions[0].data.email).toStrictEqual(
      initialHouseholdData.email
    );
    expect(retrievedHousehold.submissions[0].submissionRef).toStrictEqual(
      submissionIds[0]
    );
    expect(
      retrievedHousehold.submissions[1].data.awareOfCovidHotline
    ).toStrictEqual(followupHouseholdData.awareOfCovidHotline);
    expect(retrievedHousehold.submissions[1].submissionRef).toStrictEqual(
      submissionIds[1]
    );
  });

  it("should add a submission to a person correctly", async () => {
    let submissionIds = [];
    for (let submission of testSubmissions) {
      submissionIds.push(
        await submissionData.createSubmission(
          submission.addedBy,
          submission.submissionSchema,
          submission.location,
          submission.filledOutTimestamp,
          submission.timeToComplete,
          submission.consentGiven
        )
      );
    }

    const householdId = await submissionData.createHousehold(
      initialHouseholdData,
      testPublicHouseholdId,
      submissionIds[0]
    );

    const personId = await submissionData.createPerson(
      initialPeople[0].data,
      initialPeople[0].submissionKind,
      householdId,
      submissionIds[0]
    );

    await submissionData.addSubmissionToPerson(
      personId,
      followUpPeople[0].data,
      followUpPeople[0].submissionKind,
      submissionIds[1]
    );

    const submissions = await submissionData.Submission.find();
    expect(submissions).toHaveLength(2);

    const all = await submissionData.Person.find();
    expect(all).toHaveLength(1);

    const retrievedPerson = all[0];

    expect(retrievedPerson._id).toStrictEqual(personId);
    expect(retrievedPerson.submissions[0].data).toStrictEqual(
      initialPeople[0].data
    );
    expect(retrievedPerson.submissions[0].submissionKind).toStrictEqual(
      initialPeople[0].submissionKind
    );
    expect(retrievedPerson.submissions[1].data).toStrictEqual(
      followUpPeople[0].data
    );
    expect(retrievedPerson.submissions[0].submissionKind).toStrictEqual(
      followUpPeople[0].submissionKind
    );
  });
});
