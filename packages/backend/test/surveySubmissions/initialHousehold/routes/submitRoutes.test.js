const { getApp } = require("../../../../src/app");
const mongoose = require("mongoose");
const db = require("db-test-utils")(mongoose);
// eslint-disable-next-line no-unused-vars
const { log } = require("../../../../../util-logging/index");

const { login } = require("../../../utils/requests");

const { testOnlyIf } = require("../../../utils/jest");
const Submission = require("../../../../src/surveys/initialHousehold/submissionData");
const Household = require("../../../../src/surveys/initialHousehold/householdData");
const Person = require("../../../../src/surveys/initialHousehold/peopleData");

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
    schema: { form: "initialSurvey", version: "1.0.4" },
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
    schema: { form: "initialSurvey", version: "1.0.4" },
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

const validSchema = { form: "initialSurvey", version: "1.0.4" };
const validMetadata = [
  {
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
  {
    endTime: 1592587961275,
    timeToComplete: 31055,
    location: {
      lat: 43.7485128,
      lng: -79.36735,
      accuracy: 20,
      altitude: null,
      wasManual: false,
    },
    consentGiven: true,
  },
];
const validHouseholdData = [
  // strict minimum valid entry
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
  // minimum + phoneNumber
  {
    followUpId: "2",
    sharePhoneNumberConsent: "consentToSharingPhoneNumber",
    phoneNumber: "11 11 11 111",
    district: "C/casiis",
    subdistrict: { name: "Gaarisa" },
    housingType: "terrace",
    ownershipType: "own",
    roomsCount: 1,
    residentsCount: 1,
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
    followupConsent: "no",
  },
  // minimum + email
  {
    followUpId: "3",
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
  // minimum + otherHousingType
  {
    followUpId: "4",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "other",
    other: "bunker",
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
  // minimum + otherOwnershipType
  {
    followUpId: "5",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
    ownershipType: "other",
    other2: "squatting",
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
  // minimum + renting
  {
    followUpId: "6",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
    ownershipType: "rent",
    rentRange: "101to200",
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
  // minimum + other COVID19 supports
  {
    followUpId: "7",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      other: true,
    },
    otherCOVID19RiskManagementSupports: "vaccine",
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
  // minimum + otherHouseholdNeeds
  {
    followUpId: "8",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      other: true,
    },
    otherHouseholdNeeds: "flat screen tv",
    followupVisitConsent: "no",
  },
  // minimum + moneyQuestion
  {
    followUpId: "9",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      money: true,
      sanitation: false,
      healthcareAccess: false,
      housingSupport: false,
      educationalSupport: false,
      emotionalSupport: true,
      noHouseholdNeeds: false,
      other: false,
    },
    moneyQuestion: {
      food: false,
      sanitation: false,
      SMESupport: true,
      other: false,
    },
    followupVisitConsent: "no",
  },
  // minimum + moneyQuestion + otherMonetaryNeeds
  {
    followUpId: "10",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      money: true,
      sanitation: false,
      healthcareAccess: false,
      housingSupport: false,
      educationalSupport: false,
      emotionalSupport: true,
      noHouseholdNeeds: false,
      other: false,
    },
    moneyQuestion: {
      food: false,
      sanitation: false,
      SMESupport: false,
      other: true,
    },
    otherMonetaryNeeds: "rare coins for my collection",
    followupVisitConsent: "no",
  },
  // minimum + housingSupportNeeds
  {
    followUpId: "11",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      housingSupport: true,
      educationalSupport: false,
      emotionalSupport: true,
      noHouseholdNeeds: false,
      other: false,
    },
    housingSupportNeeds: {
      shelterSupport: true,
      rentalSubsidy: true,
      other: false,
    },
    followupVisitConsent: "no",
  },
  // minimum + housingSupportNeeds + otherHousingNeeds
  {
    followUpId: "12",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      housingSupport: true,
      educationalSupport: false,
      emotionalSupport: true,
      noHouseholdNeeds: false,
      other: false,
    },
    housingSupportNeeds: {
      shelterSupport: true,
      rentalSubsidy: false,
      other: true,
    },
    otherHousingNeeds: "hot tub in the house",
    followupVisitConsent: "no",
  },
];

const invalidHouseholdData = [
  // minimum + invalid key
  {
    followUpId: "1",
    oijdasnjrklanc: "no",
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
  // missing phoneNumber
  {
    followUpId: "2",
    sharePhoneNumberConsent: "consentToSharingPhoneNumber",
    district: "C/casiis",
    subdistrict: { name: "Gaarisa" },
    housingType: "terrace",
    ownershipType: "own",
    roomsCount: 1,
    residentsCount: 1,
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
    followupConsent: "no",
  },
  // missing rent range
  {
    followUpId: "6",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
    ownershipType: "rent",
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
  // missing other COVID19 supports
  {
    followUpId: "7",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      other: true,
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
  // missing otherHouseholdNeeds
  {
    followUpId: "8",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      other: true,
    },
    followupVisitConsent: "no",
  },
  // missing moneyQuestion
  {
    followUpId: "9",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      money: true,
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
  // minimum + moneyQuestion, missing otherMonetaryNeeds
  {
    followUpId: "10",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      money: true,
      sanitation: false,
      healthcareAccess: false,
      housingSupport: false,
      educationalSupport: false,
      emotionalSupport: true,
      noHouseholdNeeds: false,
      other: false,
    },
    moneyQuestion: {
      food: false,
      sanitation: false,
      SMESupport: false,
      other: true,
    },
    followupVisitConsent: "no",
  },
  // missing housingSupportNeeds
  {
    followUpId: "11",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      housingSupport: true,
      educationalSupport: false,
      emotionalSupport: true,
      noHouseholdNeeds: false,
      other: false,
    },
    followupVisitConsent: "no",
  },
  // minimum + housingSupportNeeds, missing otherHousingNeeds
  {
    followUpId: "12",
    sharePhoneNumberConsent: "willNotSharePhoneNumber",
    district: "Warta-Nabada",
    subdistrict: { name: "Hanti-wadaag" },
    housingType: "terrace",
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
      housingSupport: true,
      educationalSupport: false,
      emotionalSupport: true,
      noHouseholdNeeds: false,
      other: false,
    },
    housingSupportNeeds: {
      shelterSupport: true,
      rentalSubsidy: false,
      other: true,
    },
    followupVisitConsent: "no",
  },
];

describe("test /submit", () => {
  let app;

  beforeAll(async () => {
    await db.connect();
    app = await getApp();
  });

  afterEach(() => db.clear());

  afterAll(() => db.close());

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
    // strict equal fails due to undefined field keys present in document
    expect(JSON.parse(JSON.stringify(submission.household.data))).toStrictEqual(
      request.household
    );
    expect(household.followUpId).toStrictEqual(request.household.followUpId);
    expect(submission.teamName).toStrictEqual(volunteer.teamName);
  });

  it("should add valid households", async () => {
    const { agent } = await login(app);

    for (const household of validHouseholdData) {
      await agent
        .post("/submit/initial")
        .send({
          schema: validSchema,
          metadata: validMetadata[0],
          household,
          people: [],
          deaths: [],
        })
        .expect(200);
    }

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();

    expect(allSubmissions).toHaveLength(validHouseholdData.length);
    expect(allHouseholds).toHaveLength(validHouseholdData.length);
  });

  it("should fail to add invalid households", async () => {
    const { agent } = await login(app);

    for (const household of invalidHouseholdData) {
      log.debug(household.followUpId);
      await agent
        .post("/submit/initial")
        .send({
          schema: validSchema,
          metadata: validMetadata[0],
          household,
          people: [],
          deaths: [],
        })
        .expect(400);
    }

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();

    expect(allSubmissions).toHaveLength(0);
    expect(allHouseholds).toHaveLength(0);
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
