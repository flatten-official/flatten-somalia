const { getApp } = require("../../src/app");
const util = require("../testUtils/mongo");

const { login } = require("../testUtils/requests");

const GravediggerSurveySubmission = require("../../src/surveySubmissions/gravediggerSurvey/gravediggerSurveySubmission");
const DeathRecord = require("../../src/surveySubmissions/gravediggerSurvey/deathRecord");
const HospitalSurveySubmission = require("../../src/surveySubmissions/hospitalSurvey/hospitalSurveySubmission");

const testData = {
  gravediggerRequestBody: {
    metadata: {
      endTime: 1591910816039,
      timeToComplete: 53522,
      location: {
        lat: 43.7813248,
        lng: -79.35426559999999,
        accuracy: 1696,
        altitude: null,
        wasManual: false,
      },
      consentGiven: true,
    },
    schema: { form: "graveDigger", version: "1.0.0" },
    data: {
      gravediggerPhoneNumber: "34 44 44 444",
      gravediggerEmail: "test@test.ca",
      gravesite: "qabuurahaMacallimNuur",
      burialsThatDay: 4,
      deaths: [
        {
          sex: "female",
          causeOfDeath: "other",
          comorbidities: {
            highBloodPressure: false,
            diabetes: true,
            heartDisease: false,
            lungDisease: false,
            cancerOrPoorImmunity: false,
            immunocompromised: false,
            noComorbidities: false,
            other: true,
          },
          symptomsBeforeDeath: {
            newFever: false,
            newOrWorseningCough: false,
            shortnessOfBreath: false,
            gustatoryOrOlfactoryImpairment: false,
            fatigue: false,
            sneezing: true,
            achesAndPains: false,
            runnyNose: false,
            chillsOrNightSweats: false,
            soreThroat: false,
            diarrhea: false,
            headache: true,
            nausea: false,
            rash: false,
            appetiteLoss: false,
            stomachPainOrCramps: false,
            other: true,
            noSymptoms: false,
          },
          dateOfDeath: "2020-06-09T00:00:00-04:00",
          wasPregnant: "no",
          age: 43,
          otherComorbidities: "the flu",
          otherSymptomsBeforeDeath: "itchy feet",
        },
        {
          sex: "male",
          causeOfDeath: "deathCOVID19",
          comorbidities: {
            highBloodPressure: false,
            diabetes: false,
            heartDisease: false,
            lungDisease: false,
            cancerOrPoorImmunity: false,
            immunocompromised: false,
            noComorbidities: true,
            other: false,
          },
          symptomsBeforeDeath: {
            newFever: false,
            newOrWorseningCough: false,
            shortnessOfBreath: false,
            gustatoryOrOlfactoryImpairment: false,
            fatigue: false,
            sneezing: false,
            achesAndPains: false,
            runnyNose: false,
            chillsOrNightSweats: false,
            soreThroat: false,
            diarrhea: false,
            headache: false,
            nausea: false,
            rash: false,
            appetiteLoss: false,
            stomachPainOrCramps: false,
            other: false,
            noSymptoms: true,
          },
          dateOfDeath: "2020-06-01T00:00:00-04:00",
          age: 22,
        },
      ],
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
      endTimed: 1591910816039, // THIS LINE IS CHANGED
      timeToComplete: 53522,
      location: {
        lat: 43.7813248,
        lng: -79.35426559999999,
        accuracy: 1696,
        altitude: null,
        wasManual: false,
      },
      consentGiven: true,
    },
    schema: { form: "graveDigger", version: "1.0.0" },
    data: {
      gravediggerPhoneNumber: "34 44 44 444",
      gravediggerEmail: "test@test.ca",
      gravesite: "qabuurahaMacallimNuur",
      burialsThatDay: 4,
      deaths: [
        {
          sex: "female",
          causeOfDeath: "other",
          comorbidities: {
            highBloodPressure: false,
            diabetes: true,
            heartDisease: false,
            lungDisease: false,
            cancerOrPoorImmunity: false,
            immunocompromised: false,
            noComorbidities: false,
            other: true,
          },
          symptomsBeforeDeath: {
            newFever: false,
            newOrWorseningCough: false,
            shortnessOfBreath: false,
            gustatoryOrOlfactoryImpairment: false,
            fatigue: false,
            sneezing: true,
            achesAndPains: false,
            runnyNose: false,
            chillsOrNightSweats: false,
            soreThroat: false,
            diarrhea: false,
            headache: true,
            nausea: false,
            rash: false,
            appetiteLoss: false,
            stomachPainOrCramps: false,
            other: true,
            noSymptoms: false,
          },
          dateOfDeath: "2020-06-09T00:00:00-04:00",
          wasPregnant: "no",
          age: 43,
          otherComorbidities: "the flu",
          otherSymptomsBeforeDeath: "itchy feet",
        },
        {
          sex: "male",
          causeOfDeath: "deathCOVID19",
          comorbidities: {
            highBloodPressure: false,
            diabetes: false,
            heartDisease: false,
            lungDisease: false,
            cancerOrPoorImmunity: false,
            immunocompromised: false,
            noComorbidities: true,
            other: false,
          },
          symptomsBeforeDeath: {
            newFever: false,
            newOrWorseningCough: false,
            shortnessOfBreath: false,
            gustatoryOrOlfactoryImpairment: false,
            fatigue: false,
            sneezing: false,
            achesAndPains: false,
            runnyNose: false,
            chillsOrNightSweats: false,
            soreThroat: false,
            diarrhea: false,
            headache: false,
            nausea: false,
            rash: false,
            appetiteLoss: false,
            stomachPainOrCramps: false,
            other: false,
            noSymptoms: true,
          },
          dateOfDeath: "2020-06-01T00:00:00-04:00",
          age: 22,
        },
      ],
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
  afterEach(async () => await util.clearDatabase());
  afterAll(async () => await util.closeDatabase());

  describe("gravedigger Survey", () => {
    it("should add submission and deaths as expected", async () => {
      const { agent } = await login(app);

      await agent
        .post("/survey/gravedigger")
        .send(testData.gravediggerRequestBody)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

      const submissionDocuments = await GravediggerSurveySubmission.model.find();
      const deathDocuments = await DeathRecord.model.find();

      expect(submissionDocuments).toHaveLength(1);
      expect(deathDocuments).toHaveLength(2);

      const deathIDs = deathDocuments.map((o) => o.id);
      for (const deathID of submissionDocuments[0].surveyData.deaths) {
        expect(deathIDs).toContain(deathID.toString());
      }
    });

    it("should fail for a user without the right permissions", async () => {
      const { agent } = await login(app, { permissions: [] });

      await agent
        .post("/survey/gravedigger")
        .send(testData.gravediggerRequestBody)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(403);

      const submissionDocuments = await GravediggerSurveySubmission.model.find();
      const deathDocuments = await DeathRecord.model.find();

      expect(submissionDocuments).toHaveLength(0);
      expect(deathDocuments).toHaveLength(0);
    });

    // eslint-disable-next-line jest/expect-expect
    it("should fail with 400 if body doesn't match schema", async () => {
      const { agent } = await login(app);

      await agent
        .post("/survey/gravedigger")
        .send(testData.gravediggerBadRequestBody)
        .expect(400);

      const submissionDocuments = await GravediggerSurveySubmission.model.find();
      const deathDocuments = await DeathRecord.model.find();

      expect(submissionDocuments).toHaveLength(0);
      expect(deathDocuments).toHaveLength(0);
    });
  });

  describe("hospital Survey", () => {
    it("should add submission as expected", async () => {
      const { agent } = await login(app);

      await agent
        .post("/survey/hospital")
        .send(testData.hospitalRequestBody)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

      const submissionDocuments = await HospitalSurveySubmission.model.find();

      expect(submissionDocuments).toHaveLength(1);
    });

    it("should fail for a user without the right permissions", async () => {
      const { agent } = await login(app, { permissions: [] });

      await agent
        .post("/survey/hospital")
        .send(testData.hospitalRequestBody)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
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
