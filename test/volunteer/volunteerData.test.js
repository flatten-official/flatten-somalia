const volunteerData = require("../../src/volunteer/volunteerData");
const util = require("../testUtils/mongo");

const mongoose = require("mongoose");

const _ = require("lodash");
const { Volunteer } = require("../../src/volunteer/volunteerData");

const basicVolunteer = {
  name: "Name",
  teamName: "Flatten",
  friendlyId: "001",
};

describe("submission database functions", () => {
  beforeAll(async () => await util.connectToDatabase());
  afterEach(async () => await util.clearDatabase());
  afterAll(async () => await util.closeDatabase());

  it("should match submissions correctly", async () => {
    const volunteer = await volunteerData.addVolunteer(
      _.defaults(
        { ...basicVolunteer, email: "lastname@gmail.com" },
        volunteerData.defaultVolunteer
      )
    );

    const volunteerBad = await volunteerData.addVolunteer(
      _.defaults(
        { ...basicVolunteer, email: "firstname.lastname@gmail.com" },
        volunteerData.defaultVolunteer
      )
    );

    const matches = await volunteerData.volunteerRegex("lastname@gmail.com");

    expect(matches[0]._id).toStrictEqual(volunteer._id);

    expect(matches).toHaveLength(1);

    const findMatches = await volunteerData.findVolunteerByEmail(
      "lastname@gmail.com"
    );
    const findNoMatch = await volunteerData.findVolunteerByEmail("@gmail.com");

    expect(findMatches._id).toStrictEqual(volunteer._id);
    expect(findNoMatch).toBeNull();
  });
});
