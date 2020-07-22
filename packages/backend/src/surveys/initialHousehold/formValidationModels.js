const { createSchema } = require("../../utils/mongoose");

function alive(person) {
  // use alive field if present
  // otherwise, .age is present for the living, with .deceasedAge for the dead
  return person.alive != null ? person.alive : person.sex != null;
}

function dead(person) {
  return !alive(person);
}

// Not using arrow functions for required fields since the "this" keyword refers to different objects in arrow functions.
const personDataSchema = createSchema({
  alive: { type: Boolean, required: false },
  age: {
    type: Number,
    required: function () {
      return alive(this);
    },
  },
  sex: {
    type: String,
    required: function () {
      return alive(this);
    },
  },
  residenceStatus: {
    type: String,
    required: function () {
      return alive(this);
    },
  },
  employed: {
    type: String,
    required: function () {
      return alive(this);
    },
  },
  occupation: {
    type: String,
    required: function () {
      return alive(this) && this.employed === "yes";
    },
  },
  // TODO rename key to otherOccupation
  other: { type: String, required: false },
  // primary non-work income source
  primaryIncomeSource: {
    type: String,
    required: function () {
      return alive(this) && this.employed === "no";
    },
  },
  educationLevel: {
    type: Object,
    required: function () {
      return alive(this);
    },
  },
  // TODO get rid of suffix '1'
  monthlyIncome1: { type: String, required: false },
  COVID19KnowledgeLevel: {
    type: Object,
    required: function () {
      return alive(this);
    },
  },
  primaryInformationSource: {
    type: Object,
    required: function () {
      return alive(this);
    },
  },
  primaryInformationSourceOther: {
    type: String,
    required: function () {
      return (
        alive(this) &&
        this.primaryInformationSource &&
        this.primaryInformationSource.other
      );
    },
  },
  socialMedia: {
    type: Object,
    required: function () {
      return (
        alive(this) &&
        this.primaryInformationSource &&
        this.primaryInformationSource.socialMedia
      );
    },
  },
  otherSocialMedia: {
    type: String,
    required: function () {
      return alive(this) && this.socialMedia && this.socialMedia.other;
    },
  },
  COVID19PreventionMeasures: {
    type: Object,
    required: function () {
      return alive(this);
    },
  },
  nationalHotlineAwareness: {
    type: String,
    required: function () {
      return alive(this);
    },
  },
  nationalHotlineUsage: {
    type: String,
    required: function () {
      return alive(this) && this.nationalHotlineAwareness === "yes";
    },
  },
  reasonsForNotUsingNationalHotline: {
    type: Object,
    required: function () {
      return alive(this) && this.nationalHotlineUsage === "no";
    },
  },
  otherReasonsForNotUsingNationalHotline: {
    type: String,
    required: function () {
      return (
        alive(this) &&
        this.reasonsForNotUsingNationalHotline &&
        this.reasonsForNotUsingNationalHotline.other
      );
    },
  },
  isPregnant: {
    type: String,
    required: function () {
      return alive(this) && this.sex === "female";
    },
  },
  hasDisabilities: {
    type: String,
    required: function () {
      return alive(this);
    },
  },
  disabilityTypes: {
    type: Object,
    required: function () {
      return alive(this) && this.hasDisabilities === "yes";
    },
  },
  otherDisability: {
    type: String,
    required: function () {
      return alive(this) && this.disabilityTypes && this.disabilityTypes.other;
    },
  },
  comorbidities: {
    type: Object,
    required: function () {
      return alive(this);
    },
  },
  otherComorbidities: { type: String, required: false },
  // TODO get rid of suffix '1'
  currentSymptoms1: {
    type: Object,
    required: function () {
      return alive(this);
    },
  },
  otherSymptoms: {
    type: String,
    required: function () {
      return (
        alive(this) && this.currentSymptoms1 && this.currentSymptoms1.other
      );
    },
  },
  startOfSymptoms: {
    type: String,
    required: function () {
      return (
        alive(this) &&
        this.currentSymptoms1 &&
        !this.currentSymptoms1.noSymptoms
      );
    },
  },
  hasBeenTestedForCOVID19: {
    type: String,
    required: function () {
      return alive(this);
    },
  },
  COVID19TestType: {
    type: String,
    required: function () {
      return alive(this) && this.hasBeenTestedForCOVID19 === "yes";
    },
  },
  COVID19testDate: {
    type: String,
    required: function () {
      return alive(this) && this.hasBeenTestedForCOVID19 === "yes";
    },
  },
  COVID19TestResult: {
    type: String,
    required: function () {
      return alive(this) && this.hasBeenTestedForCOVID19 === "yes";
    },
  },
  COVID19TestReferenceNumber: { type: Number, required: false },
  // TODO decide whether or not to implement
  // reasonsForNotBeingTested: {type: String, required: },
  closeContactWithInfectedOrSymptomaticPerson: {
    type: String,
    required: alive(this),
  },
  potentialContactDate: {
    type: String,
    required: function () {
      return (
        alive(this) &&
        this.closeContactWithInfectedOrSymptomaticPerson === "yes"
      );
    },
  },
  potentialContactAddress: { type: Object, required: false },
  cityTransportationMethod: {
    type: Object,
    required: function () {
      return alive(this);
    },
  },
  // TODO rename key to otherMeansOfTransportation
  other1: {
    type: String,
    required: function () {
      return (
        alive(this) &&
        this.cityTransportationMethod &&
        this.cityTransportationMethod.other
      );
    },
  },
  recentTravelOutsideDistrict: {
    type: String,
    required: function () {
      return alive(this);
    },
  },
  // TODO fix spelling
  recentTripsOutsideDistricCount: {
    type: String,
    required: function () {
      return alive(this) && this.recentTravelOutsideDistrict === "yes";
    },
  },
  reasonForTripsOutsideDistrict: {
    type: Object,
    required: function () {
      return alive(this) && this.recentTravelOutsideDistrict === "yes";
    },
  },
  otherReasonsForTravelOutsideDistrict: {
    type: String,
    required: function () {
      return (
        alive(this) &&
        this.reasonForTripsOutsideDistrict &&
        this.reasonForTripsOutsideDistrict.other
      );
    },
  },
  districtsVisited: {
    type: Object,
    required: function () {
      return alive(this) && this.recentTravelOutsideDistrict === "yes";
    },
  },
  mobilityRestrictions: {
    type: Object,
    required: function () {
      return alive(this);
    },
  },
  otherMobilityRestrictions: {
    type: String,
    required: function () {
      return (
        alive(this) &&
        this.mobilityRestrictions &&
        this.mobilityRestrictions.other
      );
    },
  },
  /* DEAD PERSON FIELDS */
  deceasedAge: {
    type: Number,
    required: function () {
      return dead(this);
    },
  },
  deceasedSex: {
    type: String,
    required: function () {
      return dead(this);
    },
  },
  causeOfDeath: {
    type: String,
    required: function () {
      return dead(this);
    },
  },
  deceasedComorbidities: {
    type: Object,
    required: function () {
      return dead(this);
    },
  },
  otherDeceasedComorbidities: {
    type: String,
    required: function () {
      return (
        dead(this) &&
        this.deceasedComorbidities &&
        this.deceasedComorbidities.other
      );
    },
  },
  // TODO rename key to deceasedSymptomsBeforeDeath
  whatWereTheSymptomsTheyExperiencedPriorToDeath: {
    type: Object,
    required: function () {
      return dead(this);
    },
  },
  otherDeceasedSymptoms: {
    type: String,
    required: function () {
      return (
        dead(this) &&
        this.whatWereTheSymptomsTheyExperiencedPriorToDeath &&
        this.whatWereTheSymptomsTheyExperiencedPriorToDeath.other
      );
    },
  },
  deceasedPregnancy: {
    type: String,
    required: function () {
      return dead(this) && this.deceasedSex === "female";
    },
  },
  dateOfDeath: {
    type: String,
    required: function () {
      return dead(this);
    },
  },
});

const householdDataSchema = createSchema({
  followUpId: {
    type: String,
    required: function () {
      return this.sharePhoneNumberConsent === "willNotSharePhoneNumber";
    },
  },
  followupConsent: {
    type: String,
    required: function () {
      return this.sharePhoneNumberConsent === "consentToSharingPhoneNumber";
    },
  },
  followupVisitConsent: {
    type: String,
    required: function () {
      return this.sharePhoneNumberConsent === "willNotSharePhoneNumber";
    },
  },
  deathsWithinHousehold: { type: String, required: true },
  /* FIRST PAGE */
  sharePhoneNumberConsent: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: function () {
      return this.sharePhoneNumberConsent === "consentToSharingPhoneNumber";
    },
  },
  email: { type: String, required: false },
  district: { type: String, required: true },
  // TODO possibly make into a string
  subdistrict: { type: Object, required: true },
  housingType: { type: String, required: true },
  // TODO rename to otherHousingType
  other: { type: String, required: false },
  ownershipType: { type: String, required: true },
  // TODO rename to otherOwnershipType
  other2: { type: String, required: false },
  rentRange: {
    type: String,
    required: function () {
      return this.ownershipType === "rent";
    },
  },
  roomsCount: { type: Number, required: true },
  residentsCount: { type: Number, required: true },
  /* PAGE 4 – HUMANITARIAN */
  supportRequiredForCOVID19RiskManagement: { type: Object, required: true },
  otherCOVID19RiskManagementSupports: {
    type: String,
    required: function () {
      return (
        this.supportRequiredForCOVID19RiskManagement &&
        this.supportRequiredForCOVID19RiskManagement.other
      );
    },
  },
  householdNeeds: { type: Object, required: true },
  otherHouseholdNeeds: {
    type: String,
    required: function () {
      return this.householdNeeds && this.householdNeeds.other;
    },
  },
  moneyQuestion: {
    type: Object,
    required: function () {
      return this.householdNeeds && this.householdNeeds.money;
    },
  },
  otherMonetaryNeeds: {
    type: String,
    required: function () {
      return this.moneyQuestion && this.moneyQuestion.other;
    },
  },
  housingSupportNeeds: {
    type: Object,
    required: function () {
      return this.householdNeeds && this.householdNeeds.housingSupport;
    },
  },
  otherHousingNeeds: {
    type: String,
    required: function () {
      return this.housingSupportNeeds && this.housingSupportNeeds.other;
    },
  },
});

module.exports = { personDataSchema, householdDataSchema };
