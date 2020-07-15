const { getApp } = require("../../../../../src/app");
const util = require("../../../../testUtils/mongo");

const { login } = require("../../../../testUtils/requests");

const Submission = require("../../../../../src/surveys/initialHousehold/submissionData");
const Household = require("../../../../../src/surveys/initialHousehold/householdData");
const Person = require("../../../../../src/surveys/initialHousehold/peopleData");
const { testOnlyIf } = require("../../../../testUtils/jest");

const VALID_REQ_BODIES = [
  {
    household: {
      followUpId: "7-26779",
      sharePhoneNumberConsent: "willNotSharePhoneNumber",
      email: "",
      district: "Warta-Nabada",
      housingType: "villa",
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
      followupVisitConsent: "yes",
      subdistrict: { name: "Hanti-wadaag" },
      ownershipType: "hold",
      roomsCount: 2,
      residentsCount: 2,
    },
    people: [],
    metadata: {
      endTime: 1592587961275,
      timeToComplete: 31055,
      location: {
        lat: 2.045,
        lng: 45.333,
        accuracy: null,
        altitude: null,
        wasManual: true,
      },
      consentGiven: true,
    },
    schema: { form: "initialSurvey", version: "1.0.3" },
  },
  {
    household: {
      followUpId: "7-26769",
      sharePhoneNumberConsent: "consentToSharingPhoneNumber",
      email: "",
      district: "C/casiis",
      housingType: "villa",
      deathsWithinHousehold: "yes",
      supportRequiredForCOVID19RiskManagement: {
        sanitation: false,
        medicalSupport: false,
        financial: false,
        housing: false,
        noSupport: true,
        other: false,
      },
      householdNeeds: {
        money: true,
        sanitation: false,
        healthcareAccess: false,
        housingSupport: false,
        educationalSupport: false,
        emotionalSupport: false,
        noHouseholdNeeds: false,
        other: false,
      },
      phoneNumber: "11 11 11 111",
      followupConsent: "yes",
      subdistrict: { name: "Gaarisa" },
      ownershipType: "hold",
      roomsCount: 2,
      residentsCount: 2,
      moneyQuestion: {
        food: true,
        sanitation: false,
        SMESupport: false,
        other: false,
      },
    },
    people: [
      {
        sex: "female",
        residenceStatus: "resident",
        employed: "no",
        educationLevel: { name: "university" },
        monthlyIncome1: "",
        COVID19KnowledgeLevel: { name: "minimal" },
        primaryInformationSource: {
          internet: false,
          radio: true,
          television: false,
          phone: false,
          newsHotline: false,
          friendsAndFamily: false,
          mosques: false,
          schools: false,
          traditionalElder: false,
          socialMedia: false,
          other: false,
        },
        COVID19PreventionMeasures: {
          frequentHandwashing: false,
          reduceContacts: true,
          soughtInformation: false,
          maskWearking: false,
          stayingHome: false,
          respectingCurfew: false,
          noPreventionMeasures: false,
        },
        nationalHotlineAwareness: "yes",
        hasDisabilities: "yes",
        comorbidities: {
          highBloodPressure: false,
          diabetes: false,
          heartDisease: true,
          lungDisease: false,
          cancerOrPoorImmunity: false,
          immunocompromised: false,
          malnutrition: false,
          noComorbidities: false,
          other: false,
        },
        currentSymptoms1: {
          newFever: false,
          newOrWorseningCough: true,
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
          noSymptoms: false,
        },
        startOfSymptoms: "2020-06-01T00:00:00-04:00",
        hasBeenTestedForCOVID19: "yes",
        closeContactWithInfectedOrSymptomaticPerson: "no",
        cityTransportationMethod: {
          publicBus: false,
          driving: false,
          bajaaj: true,
          walking: false,
          cycling: false,
          other: false,
        },
        recentTravelOutsideDistrict: "yes",
        mobilityRestrictions: {
          security: false,
          flooding: true,
          gatedCommunities: false,
          checkpoints: false,
          infrastructure: false,
          curfews: false,
          other: false,
        },
        age: 2,
        isPregnant: "yes",
        primaryIncomeSource: "financialAid",
        disabilityTypes: {
          physical: false,
          learning: true,
          psychiatric: false,
          visual: false,
          hearing: false,
          other: false,
        },
        COVID19TestType: "bloodTest",
        COVID19testDate: "2020-06-17T00:00:00-04:00",
        COVID19TestResult: "unknownTestResult",
        recentTripsOutsideDistricCount: "610Journeys",
        reasonForTripsOutsideDistrict: {
          occupational: true,
          social: false,
          medical: false,
          educational: false,
          other: false,
        },
        districtsVisited: {
          Yaaqshiid: false,
          "Warta-Nabada": false,
          "C/casiis": false,
          deyniile: false,
          Boondheere: false,
          wadajir: false,
          "Howl-wadaag": false,
          Heliwaa: true,
          Garasbaley: false,
          Gubadley: false,
          Kaaraan: false,
          dharkenley: false,
          Kaxda: false,
          Shangani: false,
          Xamarweyne: false,
          hodan: false,
          shibis: false,
          "Xamar Jajab": false,
          Waabri: false,
        },
        nationalHotlineUsage: "yes",
      },
    ],
    deaths: [
      {
        deceasedSex: "male",
        causeOfDeath: "deathHighBloodPressure",
        deceasedComorbidities: {
          highBloodPressure: false,
          diabetes: true,
          heartDiseaseOrIrritability: false,
          lungDisease: false,
          cancerOrPoorImmunity: false,
          immunocompromised: false,
          noComorbidities: false,
          other: false,
        },
        whatWereTheSymptomsTheyExperiencedPriorToDeath: {
          newFever: true,
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
          noSymptoms: false,
        },
        dateOfDeath: "2020-06-16T00:00:00-04:00",
        deceasedAge: 2,
      },
    ],
    metadata: {
      endTime: 1592588144839,
      timeToComplete: 107757,
      location: {
        lat: 2.045,
        lng: 45.333,
        accuracy: null,
        altitude: null,
        wasManual: true,
      },
      consentGiven: true,
    },
    schema: { form: "initialSurvey", version: "1.0.3" },
  },
];

const INVALID_REQUEST_BODIES = [
  {},
  // MISSING SCHEMA
  {
    household: {
      followUpId: "7-26779",
      sharePhoneNumberConsent: "willNotSharePhoneNumber",
      email: "",
      district: "Warta-Nabada",
      housingType: "villa",
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
      followupVisitConsent: "yes",
      subdistrict: { name: "Hanti-wadaag" },
      ownershipType: "hold",
      roomsCount: 2,
      residentsCount: 2,
    },
    people: [],
    metadata: {
      endTime: 1592587961275,
      timeToComplete: 31055,
      location: {
        lat: 2.045,
        lng: 45.333,
        accuracy: null,
        altitude: null,
        wasManual: true,
      },
      consentGiven: true,
    },
  },
  // MISSING HOUSEHOLD DATA
  {
    people: [],
    metadata: {
      endTime: 1592587961275,
      timeToComplete: 31055,
      location: {
        lat: 2.045,
        lng: 45.333,
        accuracy: null,
        altitude: null,
        wasManual: true,
      },
      consentGiven: true,
    },
    schema: { form: "initialSurvey", version: "1.0.3" },
  },
  // MISSING CONSENT
  {
    household: {
      followUpId: "7-26779",
      sharePhoneNumberConsent: "willNotSharePhoneNumber",
      email: "",
      district: "Warta-Nabada",
      housingType: "villa",
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
      followupVisitConsent: "yes",
      subdistrict: { name: "Hanti-wadaag" },
      ownershipType: "hold",
      roomsCount: 2,
      residentsCount: 2,
    },
    people: [],
    metadata: {
      endTime: 1592587961275,
      timeToComplete: 31055,
      location: {
        lat: 2.045,
        lng: 45.333,
        accuracy: null,
        altitude: null,
        wasManual: true,
      },
    },
    schema: { form: "initialSurvey", version: "1.0.3" },
  },
  // missing metadata
  {
    household: {
      followUpId: "7-26779",
      sharePhoneNumberConsent: "willNotSharePhoneNumber",
      email: "",
      district: "Warta-Nabada",
      housingType: "villa",
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
      followupVisitConsent: "yes",
      subdistrict: { name: "Hanti-wadaag" },
      ownershipType: "hold",
      roomsCount: 2,
      residentsCount: 2,
    },
    people: [],
    schema: { form: "initialSurvey", version: "1.0.3" },
  },
];

describe("test /submit", () => {
  let app;

  beforeAll(async () => {
    await util.connectToDatabase();
    app = await getApp();
  });

  afterEach(() => util.clearDatabase());

  afterAll(() => util.closeDatabase());

  it("should add multiple submissions with a successful message", async () => {
    const { agent } = await login(app);

    for (const reqBody of VALID_REQ_BODIES) {
      await agent.post("/submit/initial").send(reqBody).expect(200);
    }

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();
    const allPeople = await Person.model.find();

    expect(allSubmissions).toHaveLength(2);
    expect(allHouseholds).toHaveLength(2);
    expect(allPeople).toHaveLength(2);
  });

  it("should add submissions properties properly", async () => {
    const request = VALID_REQ_BODIES[0];

    const { agent, volunteer } = await login(app);
    await agent.post("/submit/initial").send(request).expect(200);

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();
    const allPeople = await Person.model.find();

    expect(allSubmissions).toHaveLength(1);
    expect(allHouseholds).toHaveLength(1);
    expect(allPeople).toHaveLength(0);

    const submission = allSubmissions[0];
    const household = allHouseholds[0];

    expect(submission.household.ref).toStrictEqual(household._id);
    expect(submission.household.data).toStrictEqual(request.household);
    expect(household.followUpId).toStrictEqual(request.household.followUpId);
    expect(submission.teamName).toStrictEqual(volunteer.teamName);
  });

  // This test is disabled if transactions are disabled since the expected behaviour would be different without transactions.
  /* eslint-disable jest/no-standalone-expect */
  testOnlyIf(!process.env.DISABLE_TRANSACTIONS)(
    "should return 409 for two forms with the same follow up id",
    async () => {
      const { agent } = await login(app);

    await agent.post("/submit/initial").send(VALID_REQ_BODIES[1]).expect(200);
    await agent.post("/submit/initial").send(VALID_REQ_BODIES[1]).expect(409);

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();
    const allPeople = await Person.model.find();

    expect(allSubmissions).toHaveLength(1);
    expect(allHouseholds).toHaveLength(1);
    expect(allPeople).toHaveLength(2);
    }
  );

  it("should fail for a user without the right permissions", async () => {
    const { agent } = await login(app, {
      permissions: [],
    });

    await agent.post("/submit/initial").send(VALID_REQ_BODIES[0]).expect(403);

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();
    const allPeople = await Person.model.find();

    expect(allSubmissions).toHaveLength(0);
    expect(allHouseholds).toHaveLength(0);
    expect(allPeople).toHaveLength(0);
  });

  it("should fail for an invalid submission", async () => {
    const { agent } = await login(app);

    for (const reqBody of INVALID_REQUEST_BODIES) {
      await agent.post("/submit/initial").send(reqBody).expect(400);
    }

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();
    const allPeople = await Person.model.find();

    expect(allSubmissions).toHaveLength(0);
    expect(allHouseholds).toHaveLength(0);
    expect(allPeople).toHaveLength(0);
  });
});
