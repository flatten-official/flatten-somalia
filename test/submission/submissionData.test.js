const submissionData = require("../../src/submission/submissionData");
const util = require("../testUtils/mongo");
const { setup } = require("../../src/index");

const mongoose = require("mongoose");
const { addSubmission } = require("../../src/submission/submissionData");
const { expectCt } = require("helmet");

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
basicHouseholdId = "id-test-0";
basicHouseholdData = {
  email: "test@example.com",
  phone: "01189998819991197253",
};

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

  it("should create a person within a household correctly", async () => {});

  it("should add a submission to a household correctly", async () => {});

  it("should add a submission to a person correctly", async () => {});
});
