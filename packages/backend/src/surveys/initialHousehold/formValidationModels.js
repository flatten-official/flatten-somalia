const livingPersonDataModel = {
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  residenceStatus: { type: String, required: true },
  employed: { type: String, required: true },
  occupation: {
    type: String,
    required: () => {
      return this.employed === "yes";
    },
  },
  // TODO rename key to otherOccupation
  other: { type: String, required: false },
  // primary non-work income source
  primaryIncomeSource: {
    type: String,
    required: () => {
      return this.employed === "no";
    },
  },
  educationLevel: { type: Object, required: true },
  // TODO get rid of suffix '1'
  monthlyIncome1: { type: String, required: false },
  COVID19KnowledgeLevel: { type: Object, required: true },
  primaryInformationSource: { type: Object, required: true },
  primaryInformationSourceOther: {
    type: String,
    required: () => {
      return this.primaryInformationSource === "other";
    },
  },
  socialMedia: {
    type: Object,
    required: () => {
      return this.primaryInformationSource === "socialMedia";
    },
  },
  otherSocialMedia: {
    type: String,
    required: () => {
      return this.otherSocialMedia === "other";
    },
  },
  COVID19PreventionMeasures: { type: Object, required: true },
  nationalHotlineAwareness: { type: String, required: true },
  nationalHotlineUsage: {
    type: String,
    required: () => {
      return this.nationalHotlineAwareness === "yes";
    },
  },
  reasonsForNotUsingNationalHotline: {
    type: Object,
    required: () => {
      return this.nationalHotlineUsage === "no";
    },
  },
  otherReasonsForNotUsingNationalHotline: {
    type: String,
    required: () => {
      return this.reasonsForNotUsingNationalHotline === "other";
    },
  },
  isPregnant: {
    type: String,
    required: () => {
      return this.sex === "female";
    },
  },
  hasDisabilities: { type: String, required: true },
  disabilityTypes: {
    type: Object,
    required: () => {
      return this.hasDisabilities === "yes";
    },
  },
  otherDisability: {
    type: String,
    required: () => {
      return this.disabilityTypes === "other";
    },
  },
  comorbidities: { type: Object, required: true },
  otherComorbidities: { type: String, required: false },
  // TODO get rid of suffix '1'
  currentSymptoms1: { type: Object, required: true },
  otherSymptoms: {
    type: String,
    required: () => {
      return this.currentSymptoms1 === "other";
    },
  },
  startOfSymptoms: {
    type: String,
    required: () => {
      return this.currentSymptoms1 !== "noSymptoms";
    },
  },
  hasBeenTestedForCOVID19: { type: String, required: true },
  COVID19TestType: {
    type: String,
    required: () => {
      return this.hasBeenTestedForCOVID19 === "yes";
    },
  },
  COVID19testDate: {
    type: String,
    required: () => {
      return this.hasBeenTestedForCOVID19 === "yes";
    },
  },
  COVID19TestResult: {
    type: String,
    required: () => {
      return this.hasBeenTestedForCOVID19 === "yes";
    },
  },
  COVID19TestReferenceNumber: { type: Number, required: false },
  // TODO decide whether or not to implement
  // reasonsForNotBeingTested: {type: String, required: },
  closeContactWithInfectedOrSymptomaticPerson: { type: String, required: true },
  potentialContactDate: {
    type: String,
    required: () => {
      return this.closeContactWithInfectedOrSymptomaticPerson === "yes";
    },
  },
  potentialContactAddress: { type: String, required: false },
  cityTransportationMethod: { type: Object, required: true },
  // TODO rename key to otherMeansOfTransportation
  other1: {
    type: String,
    required: () => {
      return this.cityTransportationMethod === "other";
    },
  },
  recentTravelOutsideDistrict: { type: String, required: true },
  // TODO fix spelling
  recentTripsOutsideDistricCount: {
    type: String,
    required: () => {
      return this.recentTravelOutsideDistrict === "yes";
    },
  },
  reasonForTripsOutsideDistrict: {
    type: Object,
    required: () => {
      return this.recentTravelOutsideDistrict === "yes";
    },
  },
  otherReasonsForTravelOutsideDistrict: {
    type: String,
    required: () => {
      return this.reasonForTripsOutsideDistrict === "other";
    },
  },
  districtsVisited: {
    type: Object,
    required: () => {
      return this.recentTravelOutsideDistrict === "yes";
    },
  },
  mobilityRestrictions: { type: Object, required: true },
  otherMobilityRestrictions: {
    type: String,
    required: () => {
      return this.mobilityRestrictions === "other";
    },
  },
};

const deceasedPersonDataModel = {
  deceasedSex: { type: String, required: true },
  deceasedAge: { type: Number, required: true },
  causeOfDeath: { type: String, required: true },
  deceasedComorbidities: { type: Object, required: true },
  otherDeceasedComorbidities: {
    type: String,
    required: () => {
      return this.deceasedComorbidities.other;
    },
  },
  // TODO rename key to deceasedSymptomsBeforeDeath
  whatWereTheSymptomsTheyExperiencedPriorToDeath: {
    type: Object,
    required: true,
  },
  otherDeceasedSymptoms: {
    type: String,
    required: () => {
      return this.whatWereTheSymptomsTheyExperiencedPriorToDeath.other;
    },
  },
  deceasedPregnancy: {
    type: String,
    required: () => {
      return this.deceasedSex === "female";
    },
  },
  dateOfDeath: { type: String, required: true },
};
