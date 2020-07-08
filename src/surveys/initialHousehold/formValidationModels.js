function alive(person) {
  // use alive field if present
  // otherwise, .age is present for the living, with .deceasedAge for the dead
  return person.alive ? true : person.sex;
}

function dead(person) {
  return !alive(person);
}

const personDataModel = {
  alive: { type: Boolean, required: false },
  age: { type: Number, required: alive(this) },
  sex: { type: String, required: alive(this) },
  residenceStatus: { type: String, required: alive(this) },
  employed: { type: String, required: alive(this) },
  occupation: {
    type: String,
    required: () => {
      return alive(this) && this.employed === "yes";
    },
  },
  // TODO rename key to otherOccupation
  other: { type: String, required: false },
  // primary non-work income source
  primaryIncomeSource: {
    type: String,
    required: () => {
      return alive(this) && this.employed === "no";
    },
  },
  educationLevel: { type: Object, required: alive(this) },
  // TODO get rid of suffix '1'
  monthlyIncome1: { type: String, required: false },
  COVID19KnowledgeLevel: { type: Object, required: alive(this) },
  primaryInformationSource: { type: Object, required: alive(this) },
  primaryInformationSourceOther: {
    type: String,
    required: () => {
      return alive(this) && this.primaryInformationSource.other;
    },
  },
  socialMedia: {
    type: Object,
    required: () => {
      return alive(this) && this.primaryInformationSource.socialMedia;
    },
  },
  otherSocialMedia: {
    type: String,
    required: () => {
      return alive(this) && this.socialMedia.other;
    },
  },
  COVID19PreventionMeasures: { type: Object, required: alive(this) },
  nationalHotlineAwareness: { type: String, required: alive(this) },
  nationalHotlineUsage: {
    type: String,
    required: () => {
      return alive(this) && this.nationalHotlineAwareness === "yes";
    },
  },
  reasonsForNotUsingNationalHotline: {
    type: Object,
    required: () => {
      return alive(this) && this.nationalHotlineUsage === "no";
    },
  },
  otherReasonsForNotUsingNationalHotline: {
    type: String,
    required: () => {
      return alive(this) && this.reasonsForNotUsingNationalHotline.other;
    },
  },
  isPregnant: {
    type: String,
    required: () => {
      return alive(this) && this.sex === "female";
    },
  },
  hasDisabilities: { type: String, required: alive(this) },
  disabilityTypes: {
    type: Object,
    required: () => {
      return alive(this) && this.hasDisabilities === "yes";
    },
  },
  otherDisability: {
    type: String,
    required: () => {
      return alive(this) && this.disabilityTypes.other;
    },
  },
  comorbidities: { type: Object, required: alive(this) },
  otherComorbidities: { type: String, required: false },
  // TODO get rid of suffix '1'
  currentSymptoms1: { type: Object, required: alive(this) },
  otherSymptoms: {
    type: String,
    required: () => {
      return alive(this) && this.currentSymptoms1.other;
    },
  },
  startOfSymptoms: {
    type: String,
    required: () => {
      return alive(this) && !this.currentSymptoms1.noSymptoms;
    },
  },
  hasBeenTestedForCOVID19: { type: String, required: alive(this) },
  COVID19TestType: {
    type: String,
    required: () => {
      return alive(this) && this.hasBeenTestedForCOVID19 === "yes";
    },
  },
  COVID19testDate: {
    type: String,
    required: () => {
      return alive(this) && this.hasBeenTestedForCOVID19 === "yes";
    },
  },
  COVID19TestResult: {
    type: String,
    required: () => {
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
    required: () => {
      return (
        alive(this) &&
        this.closeContactWithInfectedOrSymptomaticPerson === "yes"
      );
    },
  },
  potentialContactAddress: { type: String, required: false },
  cityTransportationMethod: { type: Object, required: alive(this) },
  // TODO rename key to otherMeansOfTransportation
  other1: {
    type: String,
    required: () => {
      return alive(this) && this.cityTransportationMethod.other;
    },
  },
  recentTravelOutsideDistrict: { type: String, required: alive(this) },
  // TODO fix spelling
  recentTripsOutsideDistricCount: {
    type: String,
    required: () => {
      return alive(this) && this.recentTravelOutsideDistrict === "yes";
    },
  },
  reasonForTripsOutsideDistrict: {
    type: Object,
    required: () => {
      return alive(this) && this.recentTravelOutsideDistrict === "yes";
    },
  },
  otherReasonsForTravelOutsideDistrict: {
    type: String,
    required: () => {
      return alive(this) && this.reasonForTripsOutsideDistrict.other;
    },
  },
  districtsVisited: {
    type: Object,
    required: () => {
      return alive(this) && this.recentTravelOutsideDistrict === "yes";
    },
  },
  mobilityRestrictions: { type: Object, required: alive(this) },
  otherMobilityRestrictions: {
    type: String,
    required: () => {
      return alive(this) && this.mobilityRestrictions.other;
    },
  },
  /* DEAD PERSON FIELDS */
  deceasedAge: { type: Number, required: dead(this) },
  deceasedSex: { type: String, required: dead(this) },
  causeOfDeath: { type: String, required: dead(this) },
  deceasedComorbidities: { type: Object, required: dead(this) },
  otherDeceasedComorbidities: {
    type: String,
    required: () => {
      return dead(this) && this.deceasedComorbidities.other;
    },
  },
  // TODO rename key to deceasedSymptomsBeforeDeath
  whatWereTheSymptomsTheyExperiencedPriorToDeath: {
    type: Object,
    required: dead(this),
  },
  otherDeceasedSymptoms: {
    type: String,
    required: () => {
      return (
        dead(this) && this.whatWereTheSymptomsTheyExperiencedPriorToDeath.other
      );
    },
  },
  deceasedPregnancy: {
    type: String,
    required: () => {
      return dead(this) && this.deceasedSex === "female";
    },
  },
  dateOfDeath: { type: String, required: dead(this) },
};
