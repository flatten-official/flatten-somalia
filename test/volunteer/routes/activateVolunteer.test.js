const {
  Volunteer,
  findVolunteerByEmail,
  Permissions,
  PermissionGroups,
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

const makeRequestBody = (data) => ({ data: {...data, permissions: [Permissions.active] }});

describe("endpoint POST /volunteer", () => {
  let app;
  let request;

  beforeAll(async () => {
    await util.connectToDatabase();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(async () => await util.clearDatabase());
  afterAll(async () => await util.closeDatabase());

  it("should add a volunteer upon valid request", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, TEST_ADMIN);

    let res = await agent
      .post("/volunteer")
      .send(makeRequestBody(TEST_VOLUNTEER)).expect(200);

    let newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).toContain(Permissions.active);

    res = await agent.post("/volunteer/activate").send({
      volunteerId: newVolunteer._id,
      activate: false,
    });

    newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).not.toContain(Permissions.active);

    res = await agent.post("/volunteer/activate").send({
      volunteerId: newVolunteer._id,
      activate: true,
    });

    newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).toContain(Permissions.active);
  });

  it("should fail with 403 for the wrong permission groups", async () => {
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 400 when trying to update a volunteer with an id that does not exist", async () => {
  });


  // TODO test for missing name or invalid permission array. basically too many or missing parameters*/
});
