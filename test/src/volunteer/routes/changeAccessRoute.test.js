const {
  findVolunteerByEmail,
  Permissions,
  PermissionGroups,
  addVolunteer,
} = require("../../../../src/volunteer/volunteerData");

const { getApp } = require("../../../../src/app");
const util = require("../../../testUtils/mongo");
const {
  login,
  TEST_VOLUNTEER,
  TEST_ADMIN,
} = require("../../../testUtils/requests");
const _ = require("lodash");

describe("endpoint POST /volunteer/changeAccess", () => {
  let app;

  beforeAll(async () => {
    await util.connectToDatabase();
    app = await getApp();
  });

  afterEach(() => util.clearDatabase());
  afterAll(() => util.closeDatabase());

  // eslint-disable-next-line jest/expect-expect
  it("should add a volunteer upon valid request", async () => {
    const { agent } = await login(app, TEST_ADMIN);

    await addVolunteer(TEST_VOLUNTEER);

    let newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).toContain(Permissions.access);

    await agent.post("/volunteer/changeAccess").send({
      volunteerId: newVolunteer._id,
      access: false,
    });

    newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).not.toContain(Permissions.access);

    await agent.post("/volunteer/changeAccess").send({
      volunteerId: newVolunteer._id,
      access: true,
    });

    newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).toContain(Permissions.access);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 403 for the wrong permission groups", async () => {
    const { agent } = await login(
      app,
      _.defaults({ permissionGroups: [PermissionGroups.volunteer] }, TEST_ADMIN)
    );

    await addVolunteer(TEST_VOLUNTEER);

    const newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).toContain(Permissions.access);

    await agent
      .post("/volunteer/changeAccess")
      .send({
        volunteerId: newVolunteer._id,
        access: false,
      })
      .expect(403);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 400 when trying to update a volunteer with an id that does not exist", async () => {
    const { agent } = await login(app, TEST_ADMIN);

    await addVolunteer(TEST_VOLUNTEER);

    await agent
      .post("/volunteer/changeAccess")
      .send({
        volunteerId: "randomidthatdoesnotexist",
        access: false,
      })
      .expect(400);
  });
});
