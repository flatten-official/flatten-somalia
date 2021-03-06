const Submission = require("../../../src/surveys/initialHousehold/submissionData");
const Person = require("../../../src/surveys/initialHousehold/peopleData");
const Household = require("../../../src/surveys/initialHousehold/householdData");
const { mongoose } = require("util-db");
const db = require("util-db/inMemoryDb");

const dummyVolunteerId = "56cb91bdc3464f14678934ca";

const testSubmissions = [
  {
    metadata: {
      location: {
        lat: 50.3,
        lng: -79.3,
        accuracy: 1696,
        altitude: null,
        wasManual: false,
      },
      timeToComplete: 27858,
      consentGiven: "true",
      uploadTimestamp: Date.now(),
      version: "1.0.3",
    },
    followUp: { inProgress: false },
    addedBy: mongoose.Types.ObjectId(dummyVolunteerId),
    teamName: "Flatten",
    people: [
      {
        _id: mongoose.Types.ObjectId("5ee92dcba42df10007109857"),
        data: {
          sex: "male",
          residenceStatus: "resident",
          employed: "no",
          educationLevel: { name: "islamicStudies" },
          monthlyIncome1: "2000to4999",
          COVID19KnowledgeLevel: { name: "minimal" },
          primaryInformationSource: {
            internet: true,
            radio: true,
            television: true,
            phone: true,
            newsHotline: true,
            friendsAndFamily: true,
            mosques: true,
            schools: true,
            traditionalElder: true,
            socialMedia: true,
            other: true,
          },
          COVID19PreventionMeasures: {
            frequentHandwashing: false,
            reduceContacts: true,
            soughtInformation: false,
            maskWearking: false,
            stayingHome: false,
            respectingCurfew: true,
            noPreventionMeasures: false,
          },
          nationalHotlineAwareness: "yes",
          hasDisabilities: "yes",
          comorbidities: {
            highBloodPressure: true,
            diabetes: false,
            heartDisease: false,
            lungDisease: false,
            cancerOrPoorImmunity: false,
            immunocompromised: false,
            malnutrition: false,
            noComorbidities: false,
            other: false,
          },
          currentSymptoms1: {
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
            other: true,
            noSymptoms: false,
          },
          startOfSymptoms: "2020-06-08T00:00:00-04:00",
          hasBeenTestedForCOVID19: "yes",
          closeContactWithInfectedOrSymptomaticPerson: "contactUnknown",
          cityTransportationMethod: {
            publicBus: true,
            driving: true,
            bajaaj: true,
            walking: true,
            cycling: true,
            other: true,
          },
          recentTravelOutsideDistrict: "yes",
          mobilityRestrictions: {
            security: true,
            flooding: true,
            gatedCommunities: true,
            checkpoints: true,
            infrastructure: true,
            curfews: true,
            other: true,
          },
          age: 5,
          primaryIncomeSource: "familyAbroad",
          socialMedia: {
            facebook: true,
            whatsapp: true,
            twitter: true,
            other: true,
          },
          primaryInformationSourceOther: "gfdf",
          otherSocialMedia: "22",
          nationalHotlineUsage: "yes",
          disabilityTypes: {
            physical: false,
            learning: false,
            psychiatric: false,
            visual: false,
            hearing: false,
            other: true,
          },
          otherDisability: "2",
          otherSymptoms: "2",
          COVID19TestType: "nasalTest",
          COVID19testDate: "2020-06-09T00:00:00-04:00",
          COVID19TestResult: "positive",
          other1: "2",
          otherMobilityRestrictions: "2",
          recentTripsOutsideDistricCount: "10Journeys",
          reasonForTripsOutsideDistrict: {
            occupational: true,
            social: true,
            medical: true,
            educational: true,
            other: true,
          },
          districtsVisited: {
            Yaaqshiid: true,
            "Warta-Nabada": true,
            "C/casiis": true,
            deyniile: true,
            Boondheere: true,
            wadajir: true,
            "Howl-wadaag": true,
            Heliwaa: true,
            Garasbaley: true,
            Gubadley: true,
            Kaaraan: true,
            dharkenley: true,
            Kaxda: true,
            Shangani: true,
            Xamarweyne: true,
            hodan: true,
            shibis: true,
            "Xamar Jajab": true,
            Waabri: true,
          },
          otherReasonsForTravelOutsideDistrict: "2",
        },
        ref: mongoose.Types.ObjectId("5ee92dcba42df10007109854"),
      },
    ],
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
  },
];
const testHouseholdData = [
  {
    followUpId: "1",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "villa",
    ownershipType: "hold",
    roomsCount: 2,
    residentsCount: 2,
    deathsWithinHousehold: "no",
    supportRequiredForCOVID19RiskManagement: {
      sanitation: true,
      medicalSupport: false,
      financial: false,
      housing: false,
      noSupport: false,
      other: false,
    },
    householdNeeds: {
      money: false,
      sanitation: false,
      healthcareAccess: false,
      housingSupport: false,
      educationalSupport: false,
      emotionalSupport: true,
      noHouseholdNeeds: false,
      other: false,
    },
    followupVisitConsent: "no",
  },
  {
    followUpId: "2",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    email: "user@domain.tld",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "villa",
    ownershipType: "hold",
    roomsCount: 2,
    residentsCount: 2,
    deathsWithinHousehold: "no",
    supportRequiredForCOVID19RiskManagement: {
      sanitation: true,
      medicalSupport: false,
      financial: false,
      housing: false,
      noSupport: false,
      other: false,
    },
    householdNeeds: {
      money: false,
      sanitation: false,
      healthcareAccess: false,
      housingSupport: false,
      educationalSupport: false,
      emotionalSupport: true,
      noHouseholdNeeds: false,
      other: false,
    },
    followupVisitConsent: "no",
  },
];
const testPeopleInitial = [
  [
    { name: "John Doe", alive: true },
    { name: "Jane Doe", alive: true },
  ],
  [{ name: "Hello World", alive: true }],
];
const testPeopleDataInitial = [
  [
    {
      age: 25,
      sex: "male",
      residenceStatus: "resident",
      employed: "no",
      primaryIncomeSource: "financialAid",
      educationLevel: { name: "university" },
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
      nationalHotlineAwareness: "no",
      hasDisabilities: "no",
      comorbidities: {
        highBloodPressure: false,
        diabetes: false,
        heartDisease: true,
        lungDisease: true,
        cancerOrPoorImmunity: false,
        immunocompromised: true,
        malnutrition: false,
        noComorbidities: false,
        other: false,
      },
      currentSymptoms1: {
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
      hasBeenTestedForCOVID19: "no",
      closeContactWithInfectedOrSymptomaticPerson: "no",
      cityTransportationMethod: {
        publicBus: false,
        driving: false,
        bajaaj: true,
        walking: false,
        cycling: false,
        other: false,
      },
      recentTravelOutsideDistrict: "no",
      mobilityRestrictions: {
        security: false,
        flooding: true,
        gatedCommunities: false,
        checkpoints: false,
        infrastructure: false,
        curfews: false,
        other: false,
      },
    },
    {
      age: 25,
      sex: "male",
      residenceStatus: "resident",
      employed: "no",
      primaryIncomeSource: "financialAid",
      educationLevel: { name: "university" },
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
      nationalHotlineAwareness: "no",
      hasDisabilities: "no",
      comorbidities: {
        highBloodPressure: false,
        diabetes: false,
        heartDisease: true,
        lungDisease: true,
        cancerOrPoorImmunity: false,
        immunocompromised: true,
        malnutrition: false,
        noComorbidities: false,
        other: false,
      },
      currentSymptoms1: {
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
      hasBeenTestedForCOVID19: "no",
      closeContactWithInfectedOrSymptomaticPerson: "no",
      cityTransportationMethod: {
        publicBus: false,
        driving: false,
        bajaaj: true,
        walking: false,
        cycling: false,
        other: false,
      },
      recentTravelOutsideDistrict: "no",
      mobilityRestrictions: {
        security: false,
        flooding: true,
        gatedCommunities: false,
        checkpoints: false,
        infrastructure: false,
        curfews: false,
        other: false,
      },
    },
  ],
  [
    {
      age: 25,
      sex: "male",
      residenceStatus: "resident",
      employed: "no",
      primaryIncomeSource: "financialAid",
      educationLevel: { name: "university" },
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
      nationalHotlineAwareness: "no",
      hasDisabilities: "no",
      comorbidities: {
        highBloodPressure: false,
        diabetes: false,
        heartDisease: true,
        lungDisease: true,
        cancerOrPoorImmunity: false,
        immunocompromised: true,
        malnutrition: false,
        noComorbidities: false,
        other: false,
      },
      currentSymptoms1: {
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
      hasBeenTestedForCOVID19: "no",
      closeContactWithInfectedOrSymptomaticPerson: "no",
      cityTransportationMethod: {
        publicBus: false,
        driving: false,
        bajaaj: true,
        walking: false,
        cycling: false,
        other: false,
      },
      recentTravelOutsideDistrict: "no",
      mobilityRestrictions: {
        security: false,
        flooding: true,
        gatedCommunities: false,
        checkpoints: false,
        infrastructure: false,
        curfews: false,
        other: false,
      },
    },
  ],
];

describe("submission database functions", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  // TODO REFACTOR THE WHOLE THING AGAIN
  it("should write submission to database", async () => {
    const household = await Household.create(testHouseholdData[0].followUpId);

    const people = await Person.createManyAsync(
      testPeopleInitial[0].map((person) => {
        return { ...person, household: household._id };
      })
    );
    const submission = await Submission.create(
      testSubmissions[0].addedBy,
      "testTeam",
      testSubmissions[0].metadata,
      people.map((person) => person._id),
      testPeopleDataInitial[0],
      household._id,
      testHouseholdData[0]
    );

    for (const person of people) await person.save();
    await household.save();
    await submission.save();

    const all = await Submission.model.find();
    expect(all).toHaveLength(1);

    const retrievedSubmission = all[0];

    expect(retrievedSubmission._id).toStrictEqual(submission._id);
    expect(retrievedSubmission.addedBy).toStrictEqual(
      testSubmissions[0].addedBy
    );
    expect(retrievedSubmission.metadata.version).toStrictEqual(
      testSubmissions[0].metadata.version
    );
    expect(retrievedSubmission.metadata.filledOutTimestamp).toStrictEqual(
      testSubmissions[0].metadata.filledOutTimestamp
    );
    expect(retrievedSubmission.metadata.timeToComplete).toStrictEqual(
      testSubmissions[0].metadata.timeToComplete
    );
    expect(retrievedSubmission.metadata.consentGiven).toMatch(
      testSubmissions[0].metadata.consentGiven
    );
  });

  it("should create a household correctly", async () => {
    const household = await Household.create(
      testHouseholdData[0].followUpId,
      testHouseholdData[0].phone,
      testHouseholdData[0].email
    );
    await household.save();

    const all = await Household.model.find();

    expect(all).toHaveLength(1);
    const retrievedHousehold = all[0];

    expect(retrievedHousehold._id).toStrictEqual(household._id);
    expect(retrievedHousehold.followUpId).toStrictEqual(
      testHouseholdData[0].followUpId
    );
    expect(retrievedHousehold.phone).toStrictEqual(testHouseholdData[0].phone);
    expect(retrievedHousehold.email).toStrictEqual(testHouseholdData[0].email);
  });

  it("should create a person correctly", async () => {
    const household = await Household.create(testHouseholdData[0].followUpId);
    await household.save();

    const people = await Person.createManyAsync(
      testPeopleInitial[0].map((person) => {
        return { ...person, household: household._id };
      })
    );

    for (const person of people) await person.save();

    const all = await Person.model.find();

    expect(all).toHaveLength(2);

    for (const [i, person] of Object.entries(people)) {
      const personDb = all.filter(
        (obj) => obj["_id"].toString() === person._id.toString()
      )[0];
      expect(personDb.name).toStrictEqual(testPeopleInitial[0][i].name);
      expect(personDb.household.toString()).toStrictEqual(
        household._id.toString()
      );
    }
  });
});
