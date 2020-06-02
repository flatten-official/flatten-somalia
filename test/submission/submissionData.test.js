const submissionData = require("../../src/submission/submissionData");
const util = require("../testUtils/mongo");
const { setup } = require("../../src/index");

const mongoose = require("mongoose");

const dummyVolunteerId = "56cb91bdc3464f14678934ca";
const testSubmissions = [
  {
    addedBy: mongoose.Types.ObjectId(dummyVolunteerId),
    submissionSchema: {
      form: "householdInitialSubmission",
      version: "1.0",
    },
    metadata: {
      location: {
        lat: 0,
        long: 0,
      },
      filledOutTimestamp: Date.now(),
      timeToComplete: 3000,
      consentGiven: true,
    },
  },
  {
    addedBy: mongoose.Types.ObjectId(dummyVolunteerId),
    submissionSchema: {
      form: "householdFollowupSubmission",
      version: "1.0",
    },
    metadata: {
      location: {
        lat: 50,
        long: 50,
      },
      filledOutTimestamp: Date.now(),
      timeToComplete: 2000,
      consentGiven: true,
    },
  },
];
const testHouseholdData = [
  {
    publicId: "90210",
    email: "test@example.com",
    phone: "01189998819991197253",
  },
  {
    publicId: "90020",
    email: "billgates@example.com",
    phone: "240240240",
  },
];
const testPeopleInitial = [
  [{ name: "John Doe" }, { name: "Jane Doe" }],
  [{ name: "Hello World" }],
];

const retrieveById = (all, id) =>
  all.filter((obj) => obj._id.toString() === id.toString())[0];

describe("submission database functions", () => {
  beforeAll(async () => {
    await setup(false);
    await util.connectToDatabase();
  });

  afterEach(async () => await util.clearDatabase());
  afterAll(async () => await util.closeDatabase());

  it("should write submission to database", async () => {
    const household = await submissionData.createHousehold(
      testHouseholdData[0].publicId
    );

    const people = await submissionData.createPeople(
      testPeopleInitial[0].map((person) => {
        return { ...person, household: household._id };
      })
    );
    const submission = await submissionData.createSubmission(
      testSubmissions[0].addedBy,
      "testTeam",
      testSubmissions[0].submissionSchema,
      testSubmissions[0].metadata,
      people.map((person) => person._id),
      testPeopleInitial[0],
      household._id,
      testHouseholdData[0]
    );

    for (const person of people) await person.save();
    await household.save();
    await submission.save();

    const all = await submissionData.Submission.find();
    expect(all).toHaveLength(1);

    const retrievedSubmission = all[0];

    expect(retrievedSubmission._id).toStrictEqual(submission._id);
    expect(testSubmissions[0].addedBy).toStrictEqual(
      retrievedSubmission.addedBy
    );
    expect(testSubmissions[0].submissionSchema.form).toStrictEqual(
      retrievedSubmission.submissionSchema.form
    );
    expect(testSubmissions[0].submissionSchema.version).toStrictEqual(
      retrievedSubmission.submissionSchema.version
    );
    expect(testSubmissions[0].metadata.filledOutTimestamp).toStrictEqual(
      retrievedSubmission.metadata.filledOutTimestamp
    );
    expect(testSubmissions[0].metadata.timeToComplete).toStrictEqual(
      retrievedSubmission.metadata.timeToComplete
    );
    expect(testSubmissions[0].metadata.consentGiven).toStrictEqual(
      retrievedSubmission.metadata.consentGiven
    );
  });

  it("should create a household correctly", async () => {
    const household = await submissionData.createHousehold(
      testHouseholdData[0].publicId,
      testHouseholdData[0].phone,
      testHouseholdData[0].email
    );
    await household.save();

    const all = await submissionData.Household.find();

    expect(all).toHaveLength(1);
    const retrievedHousehold = all[0];

    expect(retrievedHousehold._id).toStrictEqual(household._id);
    expect(retrievedHousehold.publicId).toStrictEqual(
      testHouseholdData[0].publicId
    );
    expect(retrievedHousehold.phone).toStrictEqual(testHouseholdData[0].phone);
    expect(retrievedHousehold.email).toStrictEqual(testHouseholdData[0].email);
  });

  it("should create a person correctly", async () => {
    const household = await submissionData.createHousehold(
      testHouseholdData[0].publicId
    );
    await household.save();

    const people = await submissionData.createPeople(
      testPeopleInitial[0].map((person) => {
        return { ...person, household: household._id };
      })
    );

    for (const person of people) await person.save();

    const all = await submissionData.Person.find();

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

  it("should handle follow up submissions correctly", async () => {
    const households = [];
    const peopleNested = [];
    const submissionsInitial = [];

    // 1. Create submissions associated with two different households.

    for (const [i, householdData] of Object.entries(testHouseholdData)) {
      households.push(
        await submissionData.createHousehold(
          householdData.publicId,
          householdData.phone,
          householdData.email
        )
      );

      await households[i].save();
      peopleNested.push(
        await submissionData.createPeople(
          testPeopleInitial[i].map((o) => {
            return { ...o, household: households[i]._id };
          })
        )
      );
      for (const person of peopleNested[i]) await person.save();

      submissionsInitial.push(
        await submissionData.createSubmission(
          dummyVolunteerId,
          "testTeam",
          testSubmissions[i].submissionSchema,
          testSubmissions[i].metadata,
          peopleNested[i].map((obj) => obj._id),
          testPeopleInitial[i],
          households[i]._id,
          householdData
        )
      );
      await submissionsInitial[i].save();
    }

    // 2. Test that the next follow up submission resolves correctly to the
    //  first submission, and that the entries within this submission are correct
    // TODO - make this test query by volunteer id and district
    // once we decide to support those things in the code

    let [
      nextId,
      nextHousehold,
      nextPeople,
    ] = await submissionData.getVolunteerNextFollowUp(
      dummyVolunteerId,
      "not yet implemented",
      0
    );

    expect(nextId).toStrictEqual(submissionsInitial[0]._id);
    expect(nextHousehold._id).toStrictEqual(households[0]._id);
    expect(new Set(peopleNested[0].map((o) => o._id.toString()))).toStrictEqual(
      new Set(nextPeople.map((o) => o._id.toString()))
    );

    const testPeopleFollowUp = [{ testField: "1" }, { testField: "2" }];
    const householdFollowUp = { someUpdatedProperty: "hello" };

    // 3. Insert the follow up submission using the interface (assertions below
    // check that this inserts reference to next submission correctly and resets the flag).

    const newSubmission = await submissionData.createFollowUpSubmisison(
      nextId,
      dummyVolunteerId,
      "testTeam",
      { form: "volunteerFollowUpForm", version: "0.1" },
      testSubmissions[0].metadata,
      peopleNested[0].map((obj) => obj._id),
      testPeopleFollowUp,
      households[0]._id,
      householdFollowUp
    );

    await newSubmission.save();

    // 4. Test grabbing the next submission to follow up with, specifically
    // to ensure that we do not end up grabbing the original submission
    // (meaning dequeuing of the original submission happened correctly).

    [
      nextId,
      nextHousehold,
      nextPeople,
    ] = await submissionData.getVolunteerNextFollowUp(
      dummyVolunteerId,
      "not yet implemented",
      0
    );

    expect(nextId).not.toStrictEqual(submissionsInitial[0]._id);

    const all = await submissionData.Submission.find();

    const oldSubmission = retrieveById(all, submissionsInitial[0]._id);
    expect(oldSubmission.followUp.id.toString()).toStrictEqual(
      newSubmission._id.toString()
    );
    expect(oldSubmission.followUp.inProgress).toBe(false);
  });
});
