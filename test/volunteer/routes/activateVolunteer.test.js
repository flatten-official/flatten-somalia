const {
  Volunteer,
  findVolunteerByEmail,
  Permissions,
  PermissionGroups,
  addVolunteer,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const {
  login,
  TEST_VOLUNTEER,
  TEST_ADMIN,
} = require("../../testUtils/requests");
const _ = require("lodash");

const makeRequestBody = (data) => ({
  data,
});

describe("endpoint POST /volunteer/activate", () => {
  let app;
  let request;

  beforeAll(async () => {
    await util.connectToDatabase();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(() => util.clearDatabase());
  afterAll(() => util.closeDatabase());

  // eslint-disable-next-line jest/expect-expect
  it("should add a volunteer upon valid request", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, TEST_ADMIN);

    addVolunteer(TEST_VOLUNTEER);

    let newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).toContain(Permissions.access);

    let res = await agent.post("/volunteer/activate").send({
      volunteerId: newVolunteer._id,
      activate: false,
    });

    newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).not.toContain(Permissions.access);

    res = await agent.post("/volunteer/activate").send({
      volunteerId: newVolunteer._id,
      activate: true,
    });

    newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).toContain(Permissions.access);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 403 for the wrong permission groups", async () => {
    const { agent, volunteer: adminVolunteer } = await login(
      app,
      _.defaults({ permissionGroups: [PermissionGroups.volunteer] }, TEST_ADMIN)
    );

    addVolunteer(TEST_VOLUNTEER);

    const newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).toContain(Permissions.access);

    const res = await agent
      .post("/volunteer/activate")
      .send({
        volunteerId: newVolunteer._id,
        activate: false,
      })
      .expect(403);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 400 when trying to update a volunteer with an id that does not exist", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, TEST_ADMIN);

    addVolunteer(TEST_VOLUNTEER);

    const res = await agent
      .post("/volunteer/activate")
      .send({
        volunteerId: "randomidthatdoesnotexist",
        activate: false,
      })
      .expect(400);
  });
});
