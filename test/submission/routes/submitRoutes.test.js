const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");

const { login } = require("../../testUtils/requests");

const submissionData = require("../../../src/submission/submissionData");

const retrieveById = (all, id) =>
  all.filter((obj) => obj._id.toString() === id.toString())[0];

let request;
let app;

describe("test /auth", () => {
  beforeAll(async () => {
    await setup(false);
    await util.connectToDatabase();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(async () => {
    await util.clearDatabase();
    jest.clearAllMocks();
  });
  afterAll(async () => await util.closeDatabase());

  it("should add submissions, people, and households as expected for an initial submission", async () => {
    const { agent, volunteer } = await login(app);

    const sampleSubmission = {
      household: {
        someHouseholdData: "foo",
        publicId: "bar-007",
      },
      people: [{ name: "personA" }, { name: "personB" }],
      deaths: [{ name: "personC" }],
      metadata: { filledOutTimestamp: Date.now() },
      schema: {
        form: "volunteerInitialForm",
        version: "0.1",
      },
    };

    const res = await agent
      .post("/submit/initial")
      .send(sampleSubmission)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    const allSubmissions = await submissionData.Submission.find();
    const allHouseholds = await submissionData.Household.find();
    const allPeople = await submissionData.Person.find();

    expect(allSubmissions).toHaveLength(1);
    expect(allHouseholds).toHaveLength(1);
    expect(allPeople).toHaveLength(3);

    const submission = allSubmissions[0];
    const household = allHouseholds[0];

    expect(submission.household.ref).toStrictEqual(household.ref);
    expect(submission.household.data).toStrictEqual(sampleSubmission.household);

    expect(household.publicId).toStrictEqual(
      sampleSubmission.household.publicId
    );

    // todo - check all people in the database


    // TODO
    expect(true).toStrictEqual(false);
  });
});
