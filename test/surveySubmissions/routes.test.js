const { getApp } = require("../../src/app");
const util = require("../testUtils/mongo");

const { login } = require("../testUtils/requests");

const GravediggerSurveySubmission = require("../../src/surveys/gravedigger/submissionData");
const HospitalSurveySubmission = require("../../src/surveys/hospital/submissionData");

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
  hospitalRequestBody: {
    metadata: {
      endTime: 1591912500498,
      timeToComplete: 25016,
      location: {
        lat: 43.7813248,
        lng: -79.35426559999999,
        accuracy: 1696,
        altitude: null,
        wasManual: false,
      },
      consentGiven: true,
    },
    schema: { form: "hospital", version: "1.0.0" },
    data: {
      hospitalPhoneNumber: "11 11 11 111",
      hospitalEmail: "test@test.ca",
      // submit: true,
      newPatients: 1,
      dischargedPatients: 2,
      occupiedHospitalBeds: 3,
      occupiedCriticalCareBeds: 4,
      availableBeds: 5,
      hospitalizedPatients: 6,
      confirmedCOVID19Cases: 7,
      suspectedCOVID19Cases: 8,
      negativeCOVID19Cases: 9,
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
  hospitalBadRequestBody: {
    metadata: {
      endTime: 1591912500498,
      timeToComplete: 25016,
      location: {
        lat: 43.7813248,
        lng: -79.35426559999999,
        accuracy: 1696,
        altitude: null,
        wasManual: false,
      },
      consentGiven: true,
    },
    schema: { form: "hospital", version: "1.0.0" },
    data: {
      hospitalPhoneNumber: "11 11 11 111",
      hospitalEmail: "test@test.ca",
      // submit: true,
      newPatients: 1,
      dischargedPatient: 2, // THIS LINE IS BAD
      occupiedHospitalBeds: 3,
      occupiedCriticalCareBeds: 4,
      availableBeds: 5,
      hospitalizedPatients: 6,
      confirmedCOVID19Cases: 7,
      suspectedCOVID19Cases: 8,
      negativeCOVID19Cases: 9,
    },
  },
};

describe("submissions:", () => {
  let app;

  beforeAll(async () => {
    await util.connectToDatabase();
    app = await getApp();
  });

  afterEach(() => util.clearDatabase());
  afterAll(() => util.closeDatabase());

  describe("gravedigger Survey", () => {
    it("should add submission and deaths as expected", async () => {
      const { agent } = await login(app);

      await agent
        .post("/survey/gravedigger")
        .send(testData.gravediggerRequestBody)
        .expect(200);

      const submissionDocuments = await GravediggerSurveySubmission.model.find();
      expect(submissionDocuments).toHaveLength(1);
    });

    it("should fail for a user without the right permissions", async () => {
      const { agent } = await login(app, { permissions: [] });

      await agent
        .post("/survey/gravedigger")
        .send(testData.gravediggerRequestBody)
        .expect(403);

      const submissionDocuments = await GravediggerSurveySubmission.model.find();
      expect(submissionDocuments).toHaveLength(0);
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

  describe("hospital Survey", () => {
    it("should add submission as expected", async () => {
      const { agent } = await login(app);

      await agent
        .post("/survey/hospital")
        .send(testData.hospitalRequestBody)
        .expect(200);

      const submissionDocuments = await HospitalSurveySubmission.model.find();

      expect(submissionDocuments).toHaveLength(1);
    });

    it("should fail for a user without the right permissions", async () => {
      const { agent } = await login(app, { permissions: [] });

      await agent
        .post("/survey/hospital")
        .send(testData.hospitalRequestBody)
        .expect(403);

      const submissionDocuments = await HospitalSurveySubmission.model.find();

      expect(submissionDocuments).toHaveLength(0);
    });

    // eslint-disable-next-line jest/expect-expect
    it("should fail with 400 if body doesn't match schema", async () => {
      const { agent } = await login(app);

      await agent
        .post("/survey/hospital")
        .send(testData.hospitalBadRequestBody)
        .expect(400);

      const submissionDocuments = await HospitalSurveySubmission.model.find();

      expect(submissionDocuments).toHaveLength(0);
    });
  });
});
