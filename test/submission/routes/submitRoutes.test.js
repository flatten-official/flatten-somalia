const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");

const { login } = require("../../testUtils/requests");

const Submission = require("../../../src/surveys/initialHousehold/submissionData");
const Household = require("../../../src/surveys/initialHousehold/householdData");
const Person = require("../../../src/surveys/initialHousehold/peopleData");
const mongoose = require("mongoose");

const volunteerData = require("../../../src/volunteer/volunteerData");

const sampleSubmission = {
  metadata: {
    location: {
      lat: 50.3,
      lng: -79.3,
      accuracy: 1696,
      altitude: null,
      wasManual: false,
    },
    timeToComplete: 27858,
    consentGiven: true,
    uploadTimestamp: Date.now(),
  },
  followUp: { inProgress: false },
  addedBy: mongoose.Types.ObjectId("5ecebd24519f2226845d64b0"),
  teamName: "Flatten",
  submissionSchema: { form: "initialSurvey", version: "1.0.3" },
  people: [],
  household: {
    data: {
      followUpId: "5-15559",
      sharePhoneNumberConsent: "willNotSharePhoneNumber",
      email: "",
      district: { name: "Hawl Wadag" },
      housingType: "tents",
      deathsWithinHousehold: "no",
      supportRequiredForCOVID19RiskManagement: {
        sanitation: false,
        medicalSupport: false,
        financial: true,
        housing: false,
        noSupport: false,
        other: false,
      },
      householdNeeds: {
        money: false,
        sanitation: false,
        healthcareAccess: false,
        housingSupport: false,
        educationalSupport: true,
        emotionalSupport: false,
        noHouseholdNeeds: false,
        other: false,
      },
      followupVisitConsent: "no",
      ownershipType: "own",
      roomsCount: 1,
      residentsCount: 1,
    },
    ref: mongoose.Types.ObjectId("5ee2b0edbcfd6473c4faa5b6"),
  },
};

const sampleSubmissionInvalid = {
  household: {
    someHouseholdData: "foo",
    followUpId: "bar-007",
  },
  people: [{ name: "personA" }, { name: "personB" }],
  deaths: [{ name: "personC" }],
  // no consent given -> invalid
  metadata: { filledOutTimestamp: Date.now() },
  schema: {
    form: "volunteerInitialForm",
    version: "0.1",
  },
};

describe("test /auth", () => {
  let app;

  beforeAll(async () => {
    await util.connectToDatabase();
    app = await getApp();
  });

  afterEach(async () => {
    await util.clearDatabase();
    jest.clearAllMocks();
  });
  afterAll(async () => await util.closeDatabase());

  it("should add submissions, people, and households as expected for an initial submission", async () => {
    const { agent } = await login(app);

    await agent
      .post("/submit/initial")
      .send(sampleSubmission)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();
    const allPeople = await Person.model.find();

    expect(allSubmissions).toHaveLength(1);
    expect(allHouseholds).toHaveLength(1);
    expect(allPeople).toHaveLength(3);

    const submission = allSubmissions[0];
    const household = allHouseholds[0];

    expect(submission.household.ref).toStrictEqual(household._id);
    expect(submission.household.data).toStrictEqual(sampleSubmission.household);

    expect(household.followUpId).toStrictEqual(
      sampleSubmission.household.followUpId
    );

    const allVolunteers = await volunteerData.Volunteer.find();
    expect(allVolunteers).toHaveLength(1);

    expect(allVolunteers[0].teamName).toStrictEqual(submission.teamName);
  });

  it("should fail for a user without the right permissions", async () => {
    const { agent } = await login(app, { permissions: [] });

    await agent
      .post("/submit/initial")
      .send(sampleSubmission)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(403);

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();
    const allPeople = await Person.model.find();

    expect(allSubmissions).toHaveLength(0);
    expect(allHouseholds).toHaveLength(0);
    expect(allPeople).toHaveLength(0);
  });

  it("should fail for an invalid submission", async () => {
    const { agent } = await login(app);

    await agent
      .post("/submit/initial")
      .send(sampleSubmissionInvalid)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();
    const allPeople = await Person.model.find();

    expect(allSubmissions).toHaveLength(0);
    expect(allHouseholds).toHaveLength(0);
    expect(allPeople).toHaveLength(0);
  });
});
