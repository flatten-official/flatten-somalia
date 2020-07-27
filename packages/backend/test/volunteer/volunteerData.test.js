const Volunteer = require("../../src/volunteer/volunteerData");

const db = require("util-db/inMemoryDb");

const basicVolunteer = {
  name: "Name",
  teamName: "Flatten",
  email: "example@flatten.ca",
};

describe("volunteer database functions", () => {
  beforeAll(() => db.connect());
  afterEach(() => db.clear());
  afterAll(() => db.close());

  it("should find the same volunteer as that which was added", async () => {
    await Volunteer.addVolunteer(basicVolunteer);

    const volunteer = await Volunteer.findVolunteerByEmail(
      basicVolunteer.email
    );

    // For each field within basic volunteer
    Object.keys(basicVolunteer).forEach((property) => {
      expect(volunteer[property]).toStrictEqual(basicVolunteer[property]);
    });
  });

  it("should not find volunteer for bad searches", async () => {
    await Volunteer.addVolunteer(basicVolunteer);

    const goodEmail = basicVolunteer.email;

    const wrongEmails = [
      "a" + goodEmail,
      goodEmail + "a",
      "nonesense@example.ca",
      goodEmail.slice(0, 2),
      goodEmail.slice(2),
      goodEmail.slice(2, 3),
    ];

    for (const wrongEmail in wrongEmails) {
      const result = await Volunteer.findVolunteerByEmail(wrongEmail);
      expect(result).toBeNull();
    }
  });

  it("should match the proper email when there's a similar email", async () => {
    const volunteer = await Volunteer.addVolunteer({
      ...basicVolunteer,
      email: "lastname@gmail.com",
    });

    await Volunteer.addVolunteer({
      ...basicVolunteer,
      email: "firstname.lastname@gmail.com",
    });

    const volunteersFound = await Volunteer.volunteerRegexAsync(
      "lastname@gmail.com"
    );

    expect(volunteersFound).toHaveLength(1);
    expect(volunteersFound[0]._id).toStrictEqual(volunteer._id);

    const volunteerFound = await Volunteer.findVolunteerByEmail(
      "lastname@gmail.com"
    );
    expect(volunteerFound._id).toStrictEqual(volunteer._id);
  });
});
