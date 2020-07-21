const { getApp } = require("../../../../src/app");
const { log } = require("util-logging");

const db = require("db-utils/inMemoryDb");

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

// strict minimum valid entry
const minimumHouseholdData = {
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
};
const minimumLivingPersonData = {
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
};
const minimumDeadPeopleData = {
  deceasedSex: "male",
  deceasedAge: 2,
  causeOfDeath: "other",
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
};

const validHouseholdData = [
  minimumHouseholdData,
  // minimum + phoneNumber
  {
    ...minimumHouseholdData,
    followUpId: "2",
    sharePhoneNumberConsent: "consentToSharingPhoneNumber",
    phoneNumber: "11 11 11 111",
    followupVisitConsent: undefined,
    followupConsent: "no",
  },
  // minimum + email
  {
    ...minimumHouseholdData,
    followUpId: "3",
    email: "user@domain.tld",
  },
  // minimum + otherHousingType
  {
    ...minimumHouseholdData,
    followUpId: "4",
    housingType: "other",
    other: "bunker",
  },
  // minimum + otherOwnershipType
  {
    ...minimumHouseholdData,
    followUpId: "5",
    ownershipType: "other",
    other2: "squatting",
  },
  // minimum + renting
  {
    ...minimumHouseholdData,
    followUpId: "6",
    ownershipType: "rent",
    rentRange: "101to200",
  },
  // minimum + other COVID19 supports
  {
    ...minimumHouseholdData,
    followUpId: "7",
    supportRequiredForCOVID19RiskManagement: {
      sanitation: true,
      medicalSupport: false,
      financial: false,
      housing: false,
      noSupport: false,
      other: true,
    },
    otherCOVID19RiskManagementSupports: "vaccine",
  },
  // minimum + otherHouseholdNeeds
  {
    ...minimumHouseholdData,
    followUpId: "8",
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
  },
  // minimum + moneyQuestion
  {
    ...minimumHouseholdData,
    followUpId: "9",
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
  },
  // minimum + moneyQuestion + otherMonetaryNeeds
  {
    ...minimumHouseholdData,
    followUpId: "10",
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
  },
  // minimum + housingSupportNeeds
  {
    ...minimumHouseholdData,
    followUpId: "11",
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
  },
  // minimum + housingSupportNeeds + otherHousingNeeds
  {
    ...minimumHouseholdData,
    followUpId: "12",
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
  },
];
const validLivingPeople = [
  // minimum valid submission
  minimumLivingPersonData,
  // minimum + pregnant
  {
    ...minimumLivingPersonData,
    sex: "female",
    isPregnant: "no",
  },
  // minimum + occupation
  {
    ...minimumLivingPersonData,
    employed: "yes",
    primaryIncomeSource: undefined,
    occupation: "doctor",
  },
  // minimum + monthly income
  {
    ...minimumLivingPersonData,
    monthlyIncome1: "100to499",
  },
  // minimum + occupation + other occupation
  {
    ...minimumLivingPersonData,
    employed: "yes",
    primaryIncomeSource: undefined,
    occupation: "other",
    other: "twitch streamer",
  },
  // minimum + other information source
  {
    ...minimumLivingPersonData,
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
      other: true,
    },
    primaryInformationSourceOther: "ancient hieroglyphs",
  },
  // minimum + social media
  {
    ...minimumLivingPersonData,
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
      socialMedia: true,
      other: false,
    },
    socialMedia: {
      facebook: true,
      whatsapp: false,
      twitter: false,
      other: false,
    },
  },
  // minimum + social media + other social media
  {
    ...minimumLivingPersonData,
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
      socialMedia: true,
      other: false,
    },
    socialMedia: {
      facebook: true,
      whatsapp: false,
      twitter: false,
      other: true,
    },
    otherSocialMedia: "Instagram",
  },
  // minimum + nationalHotlineUsage
  {
    ...minimumLivingPersonData,
    nationalHotlineAwareness: "yes",
    nationalHotlineUsage: "yes",
  },
  // minimum + nationalHotlineUsage + reasonsForNotUsingNationalHotline
  {
    ...minimumLivingPersonData,
    nationalHotlineAwareness: "yes",
    nationalHotlineUsage: "no",
    reasonsForNotUsingNationalHotline: {
      fear: true,
      trustIssues: false,
      wasUnaware: true,
      alreadyFeelSecure: false,
      religiousReasons: false,
      other: false,
    },
  },
  // minimum + nationalHotlineUsage + reasonsForNotUsingNationalHotline + otherReasonsForNotUsingNationalHotline
  {
    ...minimumLivingPersonData,
    nationalHotlineAwareness: "yes",
    nationalHotlineUsage: "no",
    reasonsForNotUsingNationalHotline: {
      fear: true,
      trustIssues: false,
      wasUnaware: true,
      alreadyFeelSecure: false,
      religiousReasons: false,
      other: true,
    },
    otherReasonsForNotUsingNationalHotline: "have no phone",
  },
  // minimum + disabilityTypes
  {
    ...minimumLivingPersonData,
    hasDisabilities: "yes",
    disabilityTypes: {
      physical: false,
      learning: true,
      psychiatric: false,
      visual: false,
      hearing: false,
      other: false,
    },
  },
  // minimum + disabilityTypes + otherDisability
  {
    ...minimumLivingPersonData,
    hasDisabilities: "yes",
    disabilityTypes: {
      physical: false,
      learning: true,
      psychiatric: false,
      visual: false,
      hearing: false,
      other: true,
    },
    otherDisability: "too cool for school",
  },
  // minimum + otherComorbidities
  {
    ...minimumLivingPersonData,
    comorbidities: {
      highBloodPressure: false,
      diabetes: false,
      heartDisease: true,
      lungDisease: true,
      cancerOrPoorImmunity: false,
      immunocompromised: true,
      malnutrition: false,
      noComorbidities: false,
      other: true,
    },
    otherComorbidities: "programmer",
  },
  // minimum + startOfSymptoms
  {
    ...minimumLivingPersonData,
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
  },
  // minimum + startOfSymptoms + otherSymptoms
  {
    ...minimumLivingPersonData,
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
      other: true,
      noSymptoms: false,
    },
    otherSymptoms: "smelly nose",
    startOfSymptoms: "2020-06-01T00:00:00-04:00",
  },
  // minimum + COVID19Test type, date & result
  {
    ...minimumLivingPersonData,
    hasBeenTestedForCOVID19: "yes",
    COVID19TestType: "bloodTest",
    COVID19testDate: "2020-06-17T00:00:00-04:00",
    COVID19TestResult: "unknownTestResult",
  },
  // minimum + COVID19Test type, date & result + COVID19TestReferenceNumber
  {
    ...minimumLivingPersonData,
    hasBeenTestedForCOVID19: "yes",
    COVID19TestType: "bloodTest",
    COVID19testDate: "2020-06-17T00:00:00-04:00",
    COVID19TestResult: "unknownTestResult",
    COVID19TestReferenceNumber: 420,
  },
  // minimum + potentialContactDate
  {
    ...minimumLivingPersonData,
    closeContactWithInfectedOrSymptomaticPerson: "yes",
    potentialContactDate: "2020-06-17T00:00:00-04:00",
  },
  // minimum + potentialContactDate + potentialContactAddress
  {
    ...minimumLivingPersonData,
    closeContactWithInfectedOrSymptomaticPerson: "yes",
    potentialContactDate: "2020-06-17T00:00:00-04:00",
    potentialContactAddress: "down the street",
  },
  // minimum + other transport method
  {
    ...minimumLivingPersonData,
    cityTransportationMethod: {
      publicBus: false,
      driving: false,
      bajaaj: true,
      walking: false,
      cycling: false,
      other: true,
    },
    other1: "hoverboard",
  },
  // minimum + recent trips – count, reason, districts visited
  {
    ...minimumLivingPersonData,
    recentTravelOutsideDistrict: "yes",
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
  },
  // minimum + recent trips – count, reason, districts visited + other reasons
  {
    ...minimumLivingPersonData,
    recentTravelOutsideDistrict: "yes",
    recentTripsOutsideDistricCount: "610Journeys",
    reasonForTripsOutsideDistrict: {
      occupational: true,
      social: false,
      medical: false,
      educational: false,
      other: true,
    },
    otherReasonsForTravelOutsideDistrict: "stretch my legs",
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
  },
  // minimum + other mobility restrictions
  {
    ...minimumLivingPersonData,
    mobilityRestrictions: {
      security: false,
      flooding: true,
      gatedCommunities: false,
      checkpoints: false,
      infrastructure: false,
      curfews: false,
      other: true,
    },
    otherMobilityRestrictions: "too cold outside",
  },
];
const validDeadPeople = [
  // minimum valid submission
  minimumDeadPeopleData,
  // minimum + pregnant
  {
    ...minimumDeadPeopleData,
    deceasedSex: "female",
    deceasedPregnancy: "no",
  },
  // minimum + other comorbidities
  {
    ...minimumDeadPeopleData,
    deceasedComorbidities: {
      highBloodPressure: false,
      diabetes: true,
      heartDiseaseOrIrritability: false,
      lungDisease: false,
      cancerOrPoorImmunity: false,
      immunocompromised: false,
      noComorbidities: false,
      other: true,
    },
    otherDeceasedComorbidities: "flat earth believer",
  },
  // minimum + other symptoms
  {
    ...minimumDeadPeopleData,
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
      other: true,
      noSymptoms: false,
    },
    otherDeceasedSymptoms: "itchy feet",
  },
];

const invalidHouseholdData = [
  // minimum + invalid key
  {
    ...minimumHouseholdData,
    followUpId: "1",
    oijdasnjrklanc: "no",
  },
  // missing phoneNumber
  {
    ...minimumHouseholdData,
    followUpId: "2",
    sharePhoneNumberConsent: "consentToSharingPhoneNumber",
    phoneNumber: undefined,
  },
  // missing rent range
  {
    ...minimumHouseholdData,
    followUpId: "6",
    ownershipType: "rent",
    rentRange: undefined,
  },
  // missing other COVID19 supports
  {
    ...minimumHouseholdData,
    followUpId: "7",
    supportRequiredForCOVID19RiskManagement: {
      sanitation: true,
      medicalSupport: false,
      financial: false,
      housing: false,
      noSupport: false,
      other: true,
    },
    otherCOVID19RiskManagementSupports: undefined,
  },
  // missing otherHouseholdNeeds
  {
    ...minimumHouseholdData,
    followUpId: "8",
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
    otherHouseholdNeeds: undefined,
  },
  // missing moneyQuestion
  {
    ...minimumHouseholdData,
    followUpId: "9",
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
    moneyQuestion: undefined,
  },
  // minimum + moneyQuestion, missing otherMonetaryNeeds
  {
    ...minimumHouseholdData,
    followUpId: "10",
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
    otherMonetaryNeeds: undefined,
  },
  // missing housingSupportNeeds
  {
    ...minimumHouseholdData,
    followUpId: "11",
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
    housingSupportNeeds: undefined,
  },
  // minimum + housingSupportNeeds, missing otherHousingNeeds
  {
    ...minimumHouseholdData,
    followUpId: "12",
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
    otherHousingNeeds: undefined,
  },
];
const invalidLivingPeople = [
  // minimum + invalid key
  {
    ...minimumLivingPersonData,
    xcaldjsfa: "invalid",
  },
  // minimum + dead
  {
    ...minimumLivingPersonData,
    alive: false,
  },
  // missing pregnant
  {
    ...minimumLivingPersonData,
    sex: "female",
    isPregnant: undefined,
  },
  // missing occupation
  {
    ...minimumLivingPersonData,
    employed: "yes",
    primaryIncomeSource: undefined,
    occupation: undefined,
  },
  // missing other information source
  {
    ...minimumLivingPersonData,
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
      other: true,
    },
    primaryInformationSourceOther: undefined,
  },
  // missing social media
  {
    ...minimumLivingPersonData,
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
      socialMedia: true,
      other: false,
    },
    socialMedia: undefined,
  },
  // minimum + social media, missing other social media
  {
    ...minimumLivingPersonData,
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
      socialMedia: true,
      other: false,
    },
    socialMedia: {
      facebook: true,
      whatsapp: false,
      twitter: false,
      other: true,
    },
    otherSocialMedia: undefined,
  },
  // missing nationalHotlineUsage
  {
    ...minimumLivingPersonData,
    nationalHotlineAwareness: "yes",
    nationalHotlineUsage: undefined,
  },
  // minimum + nationalHotlineUsage, missing reasonsForNotUsingNationalHotline
  {
    ...minimumLivingPersonData,
    nationalHotlineAwareness: "yes",
    nationalHotlineUsage: "no",
    reasonsForNotUsingNationalHotline: undefined,
  },
  // minimum + nationalHotlineUsage + reasonsForNotUsingNationalHotline, missing otherReasonsForNotUsingNationalHotline
  {
    ...minimumLivingPersonData,
    nationalHotlineAwareness: "yes",
    nationalHotlineUsage: "no",
    reasonsForNotUsingNationalHotline: {
      fear: true,
      trustIssues: false,
      wasUnaware: true,
      alreadyFeelSecure: false,
      religiousReasons: false,
      other: true,
    },
    otherReasonsForNotUsingNationalHotline: undefined,
  },
  // missing disabilityTypes
  {
    ...minimumLivingPersonData,
    hasDisabilities: "yes",
    disabilityTypes: undefined,
  },
  // minimum + disabilityTypes, missing otherDisability
  {
    ...minimumLivingPersonData,
    hasDisabilities: "yes",
    disabilityTypes: {
      physical: false,
      learning: true,
      psychiatric: false,
      visual: false,
      hearing: false,
      other: true,
    },
    otherDisability: undefined,
  },
  // missing startOfSymptoms
  {
    ...minimumLivingPersonData,
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
    startOfSymptoms: undefined,
  },
  // minimum + startOfSymptoms, missing otherSymptoms
  {
    ...minimumLivingPersonData,
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
      other: true,
      noSymptoms: false,
    },
    otherSymptoms: undefined,
    startOfSymptoms: "2020-06-01T00:00:00-04:00",
  },
  // missing COVID19Test type
  {
    ...minimumLivingPersonData,
    hasBeenTestedForCOVID19: "yes",
    COVID19TestType: undefined,
    COVID19testDate: "2020-06-17T00:00:00-04:00",
    COVID19TestResult: "unknownTestResult",
  },
  // missing COVID19Test date
  {
    ...minimumLivingPersonData,
    hasBeenTestedForCOVID19: "yes",
    COVID19TestType: "bloodTest",
    COVID19testDate: undefined,
    COVID19TestResult: "unknownTestResult",
  },
  // missing COVID19Test result
  {
    ...minimumLivingPersonData,
    hasBeenTestedForCOVID19: "yes",
    COVID19TestType: "bloodTest",
    COVID19testDate: "2020-06-17T00:00:00-04:00",
    COVID19TestResult: undefined,
  },
  // missing potentialContactDate
  {
    ...minimumLivingPersonData,
    closeContactWithInfectedOrSymptomaticPerson: "yes",
    potentialContactDate: undefined,
  },
  // missing other transport method
  {
    ...minimumLivingPersonData,
    cityTransportationMethod: {
      publicBus: false,
      driving: false,
      bajaaj: true,
      walking: false,
      cycling: false,
      other: true,
    },
    other1: undefined,
  },
  // missing recent trips count
  {
    ...minimumLivingPersonData,
    recentTravelOutsideDistrict: "yes",
    recentTripsOutsideDistricCount: undefined,
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
  },
  // missing recent trips reasons
  {
    ...minimumLivingPersonData,
    recentTravelOutsideDistrict: "yes",
    recentTripsOutsideDistricCount: "610Journeys",
    reasonForTripsOutsideDistrict: undefined,
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
  },
  // missing recent trips districts visited
  {
    ...minimumLivingPersonData,
    recentTravelOutsideDistrict: "yes",
    recentTripsOutsideDistricCount: "610Journeys",
    reasonForTripsOutsideDistrict: {
      occupational: true,
      social: false,
      medical: false,
      educational: false,
      other: false,
    },
    districtsVisited: undefined,
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
  // minimum + recent trips – count, reason, districts visited, missing other reasons
  {
    ...minimumLivingPersonData,
    recentTravelOutsideDistrict: "yes",
    recentTripsOutsideDistricCount: "610Journeys",
    reasonForTripsOutsideDistrict: {
      occupational: true,
      social: false,
      medical: false,
      educational: false,
      other: true,
    },
    otherReasonsForTravelOutsideDistrict: undefined,
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
  },
  // missing other mobility restrictions
  {
    ...minimumLivingPersonData,
    mobilityRestrictions: {
      security: false,
      flooding: true,
      gatedCommunities: false,
      checkpoints: false,
      infrastructure: false,
      curfews: false,
      other: true,
    },
    otherMobilityRestrictions: undefined,
  },
];
const invalidDeadPeople = [
  // minimum + invalid key
  {
    ...minimumDeadPeopleData,
    likesCake: "no",
  },
  // minimum + alive
  {
    ...minimumDeadPeopleData,
    alive: true,
  },
  // missing pregnancy
  {
    ...minimumDeadPeopleData,
    deceasedSex: "female",
    deceasedPregnancy: undefined,
  },
  // missing other comorbidities
  {
    ...minimumDeadPeopleData,
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
    otherDeceasedComorbidities: undefined,
  },
  // missing other symptoms
  {
    ...minimumDeadPeopleData,
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
      other: true,
      noSymptoms: false,
    },
    otherDeceasedSymptoms: undefined,
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
    expect(household.followUpId).toStrictEqual(request.household.followUpId);
    expect(submission.teamName).toStrictEqual(volunteer.teamName);
  });

  it("should add valid metadata", async () => {
    const { agent } = await login(app);
    const household = {
      ...minimumHouseholdData,
    };

    for (const metadata of validMetadata) {
      household.followUpId += "1";
      await agent
        .post("/submit/initial")
        .send({
          schema: validSchema,
          metadata,
          household,
          people: [],
          deaths: [],
        })
        .expect(200);
    }

    const allSubmissions = await Submission.model.find();
    const allHouseholds = await Household.model.find();

    expect(allSubmissions).toHaveLength(validMetadata.length);
    expect(allHouseholds).toHaveLength(validMetadata.length);
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

  it("should add valid living people", async () => {
    const { agent } = await login(app);
    const household = minimumHouseholdData;

    await agent
      .post("/submit/initial")
      .send({
        schema: validSchema,
        metadata: validMetadata[0],
        household,
        people: validLivingPeople,
        deaths: [],
      })
      .expect(200);

    const allPeople = await Person.model.find();
    expect(allPeople).toHaveLength(validLivingPeople.length);
  });

  it("should add valid dead people", async () => {
    const { agent } = await login(app);
    const household = {
      ...minimumHouseholdData,
      residentsCount: 0,
      deathsWithinHousehold: "yes",
    };

    await agent
      .post("/submit/initial")
      .send({
        schema: validSchema,
        metadata: validMetadata[0],
        household,
        people: [],
        deaths: validDeadPeople,
      })
      .expect(200);

    const allPeople = await Person.model.find();
    expect(allPeople).toHaveLength(validDeadPeople.length);
  });

  it("should fail to add invalid metadata", async () => {
    const { agent } = await login(app);

    await agent
      .post("/submit/initial")
      .send({
        schema: validSchema,
        metadata: {
          caphfdasoif: "invalid",
          ...validMetadata[0],
        },
        household: minimumHouseholdData,
        people: [],
        deaths: [],
      })
      .expect(400);

    const allSubmissions = await Submission.model.find();

    expect(allSubmissions).toHaveLength(0);
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

  it("should fail to add invalid living people", async () => {
    const { agent } = await login(app);
    const household = minimumHouseholdData;

    for (const person of invalidLivingPeople) {
      await agent
        .post("/submit/initial")
        .send({
          schema: validSchema,
          metadata: validMetadata[0],
          household,
          people: [person],
          deaths: [],
        })
        .expect(400);
    }

    const allPeople = await Person.model.find();
    expect(allPeople).toHaveLength(0);
  });

  it("should fail to add invalid dead people", async () => {
    const { agent } = await login(app);
    const household = {
      ...minimumHouseholdData,
      residentsCount: 0,
      deathsWithinHousehold: "yes",
    };

    await agent
      .post("/submit/initial")
      .send({
        schema: validSchema,
        metadata: validMetadata[0],
        household,
        people: [],
        deaths: invalidDeadPeople,
      })
      .expect(400);

    const allPeople = await Person.model.find();
    expect(allPeople).toHaveLength(0);
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
