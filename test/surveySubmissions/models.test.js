const DeathRecord = require("../../src/surveySubmissions/gravediggerSurvey/deathRecord");
const util = require("../testUtils/mongo");

describe("database operations", () => {
  beforeAll(async () => await util.connectToDatabase());
  afterEach(async () => await util.clearDatabase());
  afterAll(async () => await util.closeDatabase());

  describe("deathRecord", () => {
    it("should add nothing when input is empty", async () => {
      await DeathRecord.insertMany([]);

      const allDeathRecords = await DeathRecord.model.find();
      expect(allDeathRecords).toHaveLength(0);
    });

    it("should properly create a document", async () => {
      const death = new DeathRecord.model({
        submissionSchema: { form: "graveDigger", version: "1.0.0" },
        gravesite: "qabuurahaJaziira",
        age: 2,
        sex: "male",
        comorbidities: {
          highBloodPressure: false,
          diabetes: false,
          heartDisease: false,
          lungDisease: true,
          cancerOrPoorImmunity: false,
          immunocompromised: false,
          noComorbidities: false,
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
          soreThroat: true,
          diarrhea: false,
          headache: false,
          nausea: false,
          rash: false,
          appetiteLoss: false,
          stomachPainOrCramps: false,
          other: false,
          noSymptoms: false,
        },
        causeOfDeath: "deathCOVID19",
        dateOfDeath: "2020-06-10T00:00:00-04:00",
      });
      await DeathRecord.insertMany([death]);

      const allDeathRecords = await DeathRecord.model.find();
      expect(allDeathRecords).toHaveLength(1);
    });
  });
});
