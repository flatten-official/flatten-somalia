const {
  findVolunteerByEmail,
  Permissions,
  PermissionGroups,
  addVolunteer,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const db = require("util-db/inMemoryDb");
const { login } = require("../../utils/requests");
const _ = require("lodash");
const { getAllPermissionsExcept } = require("../../utils/permissions");

const TEST_VOLUNTEER = {
  name: "default_name",
  email: "default_email@example.ca",
  teamName: "testTeam",
  permissionGroups: [PermissionGroups.dsu],
  permissions: [Permissions.access, Permissions.submitForms],
};

describe("endpoint POST /volunteer/changeAccess", () => {
  let app;

  beforeAll(async () => {
    await db.connect();
    app = await getApp();
  });

  afterEach(() => db.clear());
  afterAll(() => db.close());

  // eslint-disable-next-line jest/expect-expect
  it("should successfully switch access permissions", async () => {
    const { agent } = await login(app, [
      Permissions.manageVolunteers,
      Permissions.access,
    ]);

    let newVolunteer = await addVolunteer(TEST_VOLUNTEER);
    expect(newVolunteer.permissions).toContain(Permissions.access);

    await agent
      .post("/volunteer/changeAccess")
      .send({
        volunteerId: newVolunteer._id,
        access: false,
      })
      .expect(200);

    newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).not.toContain(Permissions.access);

    await agent
      .post("/volunteer/changeAccess")
      .send({
        volunteerId: newVolunteer._id,
        access: true,
      })
      .expect(200);

    newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
    expect(newVolunteer.permissions).toContain(Permissions.access);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 403 without the manage permissions", async () => {
    const { agent } = await login(
      app,
      getAllPermissionsExcept(Permissions.manageVolunteers)
    );

    const newVolunteer = await addVolunteer(TEST_VOLUNTEER);

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
  it("should fail with 403 to manage permissions of non-dsu volunteer", async () => {
    const { agent } = await login(app, [
      Permissions.manageVolunteers,
      Permissions.access,
    ]);

    const newVolunteer = await addVolunteer(
      _.defaults({ permissionGroups: [] }, TEST_VOLUNTEER)
    );

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
    const { agent } = await login(app, [
      Permissions.manageVolunteers,
      Permissions.access,
    ]);

    await addVolunteer(TEST_VOLUNTEER);

    await agent
      .post("/volunteer/changeAccess")
      .send({
        volunteerId: "5ed68f56daa05f3ea113c7d5", // random id that does not exist
        access: false,
      })
      .expect(400);
  });
});
