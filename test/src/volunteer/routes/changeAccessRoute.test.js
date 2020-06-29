const {
  findVolunteerByEmail,
  Permissions,
  PermissionGroups,
  addVolunteer,
} = require("../../../../src/volunteer/volunteerData");

const { getApp } = require("../../../../src/app");
const util = require("../../../testUtils/mongo");
const { login } = require("../../../testUtils/requests");
const _ = require("lodash");

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
    await util.connectToDatabase();
    app = await getApp();
  });

  afterEach(() => util.clearDatabase());
  afterAll(() => util.closeDatabase());

  // eslint-disable-next-line jest/expect-expect
  it("should successfully switch access permissions", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.manageVolunteers, Permissions.access],
      permissionGroups: [],
    });

    await addVolunteer(TEST_VOLUNTEER);

    let newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
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
  it("should successfully switch access permissions even if in dsu group", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.manageVolunteers, Permissions.access],
      permissionGroups: [PermissionGroups.dsu],
    });

    await addVolunteer(TEST_VOLUNTEER);

    let newVolunteer = await findVolunteerByEmail(TEST_VOLUNTEER.email);
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
    const { agent } = await login(app, {
      permissionGroups: [PermissionGroups.dsu],
      permissions: [Permissions.access, Permissions.submitForms],
    });

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
  it("should fail with 403 to manage permissions of non-dsu volunteer", async () => {
    const { agent } = await login(app, {
      permissionGroups: [],
      permissions: [Permissions.manageVolunteers, Permissions.access],
    });

    await addVolunteer(_.defaults({ permissionGroups: [] }, TEST_VOLUNTEER));

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
    const { agent } = await login(app, {
      permissions: [Permissions.manageVolunteers, Permissions.access],
      permissionGroups: [],
    });

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
