const { getApp } = require("../../../src/app");
const db = require("util-db/inMemoryDb");
const { login } = require("../../utils/requests");
const GravediggerSurveySubmission = require("../../../src/surveys/gravedigger/submissionData");

const testData = {
  gravediggerRequestBody: {
    metadata: {
      endTime: 1592230654285,
      timeToComplete: 11997,
      location: {
        lat: 2.045,
        lng: 45.333,
        accuracy: null,
        altitude: null,
        wasManual: true,
      },
      consentGiven: true,
    },
    schema: { form: "gravediggerSurvey", version: "1.0.0" },
    data: {
      gravediggerPhoneNumber: "11 11 11 111",
      gravesite: "qabuurahaJaziira",
      burialsThatDay: 2,
    },
  },
  gravediggerBadRequestBody: {
    metadata: {
      endTimed: 1592230654285, // THIS KEY IS CHANGED
      timeToComplete: 11997,
      location: {
        lat: 2.045,
        lng: 45.333,
        accuracy: null,
        altitude: null,
        wasManual: true,
      },
      consentGiven: true,
    },
    schema: { form: "gravediggerSurvey", version: "1.0.0" },
    data: {
      gravediggerPhoneNumber: "11 11 11 111",
      gravesite: "qabuurahaJaziira",
      burialsThatDay: 2,
    },
  },
};

describe("gravedigger survey", () => {
  let app;

  beforeAll(async () => {
    await db.connect();
    app = await getApp();
  });

  afterEach(() => db.clear());
  afterAll(() => db.close());

  it("should add submission and deaths as expected", async () => {
    const { agent } = await login(app);

    await agent
      .post("/survey/gravedigger")
      .send(testData.gravediggerRequestBody)
      .expect(200);

    const submissionDocuments = await GravediggerSurveySubmission.model.find();
    expect(submissionDocuments).toHaveLength(1);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 400 if body doesn't match schema", async () => {
    const { agent } = await login(app);

    await agent
      .post("/survey/gravedigger")
      .send(testData.gravediggerBadRequestBody)
      .expect(400);

    const submissionDocuments = await GravediggerSurveySubmission.model.find();

    expect(submissionDocuments).toHaveLength(0);
  });
});
