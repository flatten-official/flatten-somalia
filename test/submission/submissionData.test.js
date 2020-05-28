const submissionData = require("../../src/submission/submissionData");
const util = require("../testUtils/mongo");
const { setup } = require("../../src/index");

const mongoose = require("mongoose");

const dummyVolunteerId = "56cb91bdc3464f14678934ca";
const basicSubmission = {
  addedBy: mongoose.Types.ObjectId(dummyVolunteerId),
  submissionSchema: {
    form: "addVolunteerForm",
    version: "1.0",
  },
  location: {
    lat: 0,
    long: 0,
  },
  filledOutTimestamp: Date.now(),
  timeToComplete: 3000,
  consentGiven: true,
};
const basicHouseholdId = "id-test-0";
const basicHouseholdData = {
  email: "test@example.com",
  phone: "01189998819991197253",
};

const basicPeople = [
  {
    data: { name: "John Doe" },
    submissionKind: "death",
  },
  {
    data: { name: "Jane Doe" },
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
    const submissionId = await submissionData.addSubmission(
      basicSubmission.addedBy,
      basicSubmission.submissionSchema,
      basicSubmission.location,
      basicSubmission.filledOutTimestamp,
      basicSubmission.timeToComplete,
      basicSubmission.consentGiven
    );

    const all = await submissionData.Submission.find();
    expect(all).toHaveLength(1);

    const retrievedSubmission = all[0];

    expect(retrievedSubmission._id).toStrictEqual(submissionId);
    expect(basicSubmission.addedBy).toStrictEqual(retrievedSubmission.addedBy);
    expect(basicSubmission.submissionSchema.form).toStrictEqual(
      retrievedSubmission.submissionSchema.form
    );
    expect(basicSubmission.submissionSchema.version).toStrictEqual(
      retrievedSubmission.submissionSchema.version
    );
    expect(basicSubmission.filledOutTimestamp).toStrictEqual(
      retrievedSubmission.filledOutTimestamp
    );
    expect(basicSubmission.timeToComplete).toStrictEqual(
      retrievedSubmission.timeToComplete
    );
    expect(basicSubmission.consentGiven).toStrictEqual(
      retrievedSubmission.consentGiven
    );
  });

  it("should create a household correctly", async () => {
    const submissionId = await submissionData.addSubmission(
      basicSubmission.addedBy,
      basicSubmission.submissionSchema,
      basicSubmission.location,
      basicSubmission.filledOutTimestamp,
      basicSubmission.timeToComplete,
      basicSubmission.consentGiven
    );

    const householdId = await submissionData.createHousehold(
      basicHouseholdData,
      basicHouseholdId,
      submissionId
    );

    const all = await submissionData.Household.find();

    expect(all).toHaveLength(1);
    const retrievedHousehold = all[0];

    expect(retrievedHousehold._id).toStrictEqual(householdId);
    expect(retrievedHousehold.publicId).toStrictEqual(basicHouseholdId);
    expect(retrievedHousehold.submissions[0].data.phone).toStrictEqual(
      basicHouseholdData.phone
    );
    expect(retrievedHousehold.submissions[0].data.email).toStrictEqual(
      basicHouseholdData.email
    );
    expect(retrievedHousehold.submissions[0].submissionRef).toStrictEqual(
      submissionId
    );
  });

  it("should create a person within a household correctly", async () => {
    const submissionId = await submissionData.addSubmission(
      basicSubmission.addedBy,
      basicSubmission.submissionSchema,
      basicSubmission.location,
      basicSubmission.filledOutTimestamp,
      basicSubmission.timeToComplete,
      basicSubmission.consentGiven
    );

    const householdId = await submissionData.createHousehold(
      basicHouseholdData,
      basicHouseholdId,
      submissionId
    );

    const p0id = await submissionData.addPerson(
      basicPeople[0].data,
      basicPeople[0].submissionKind,
      submissionId,
      householdId
    );
    const p1id = await submissionData.addPerson(
      basicPeople[1].data,
      basicPeople[1].submissionKind,
      submissionId,
      householdId
    );

    const ids = [p0id, p1id];

    const all = await submissionData.Person.find();

    expect(all).toHaveLength(2);

    for (let [i, id] of Object.entries(ids)) {
      let personDb = all.filter(
        (obj) => obj["_id"].toString() === id.toString()
      )[0];
      console.log(personDb);
      console.log(personDb.submissions[0]);
      expect(personDb.submissions[0].data).toStrictEqual(basicPeople[i].data);
      expect(personDb.submissions[0].submissionKind).toStrictEqual(
        basicPeople[i].submissionKind
      );
      expect(personDb.submissions[0].submissionRef.toString()).toStrictEqual(submissionId.toString());
    }
  });

  it("should add a submission to a household correctly", async () => {});

  it("should add a submission to a person correctly", async () => {});
});
