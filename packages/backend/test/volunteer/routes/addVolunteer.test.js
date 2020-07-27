const {
  findVolunteerByEmail,
  Permissions,
  PermissionGroups,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");

const db = require("util-db/inMemoryDb");
const supertest = require("supertest");
const { login } = require("../../utils/requests");
const _ = require("lodash");

const makeRequestBody = (data) => ({ data });

const GOOD_REQUEST_BODY = makeRequestBody({
  name: "new_name",
  email: "new-volunteer@example.ca",
  teamName: "Flatten",
  permSubmitForms: true,
});

describe("endpoint POST /volunteer", () => {
  let app;
  let request;

  beforeAll(async () => {
    await db.connect();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(() => db.clear());
  afterAll(() => db.close());

  it("should add a volunteer upon valid request", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, {
      permissions: [Permissions.manageVolunteers, Permissions.access],
    });

    const res = await agent.post("/volunteer").send(GOOD_REQUEST_BODY);

    let newVolunteer = await findVolunteerByEmail(GOOD_REQUEST_BODY.data.email);

    expect(res.status).toBe(200);
    expect(newVolunteer).not.toBeNull();

    // remove properties that aren't used in comparison
    newVolunteer = newVolunteer.toJSON();

    expect(newVolunteer).toMatchObject({
      name: "new_name",
      email: GOOD_REQUEST_BODY.data.email,
      friendlyId: 2, // 1 already taken by admin
      permissionGroups: [PermissionGroups.dsu],
      addedBy: adminVolunteer._id,
      teamName: "Flatten",
    });
  });

  it("should fail with 403 for missing permissions", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.submitForms, Permissions.access],
    });

    await agent.post("/volunteer").send(GOOD_REQUEST_BODY).expect(403);
    const newVolunteer = await findVolunteerByEmail(
      GOOD_REQUEST_BODY.data.email
    );
    expect(newVolunteer).toBeNull();
  });

  it("should not use any incorrect flags such as permManageVolunteers", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.manageVolunteers, Permissions.access],
    });

    const badFlags = {
      permManageVolunteers: true,
      permissions: [Permissions.manageVolunteers],
    };

    await agent
      .post("/volunteer")
      .send(_.defaultsDeep(makeRequestBody(badFlags), GOOD_REQUEST_BODY))
      .expect(200);

    const newVolunteer = await findVolunteerByEmail(
      GOOD_REQUEST_BODY.data.email
    );
    expect(newVolunteer.permissions).not.toContain(
      Permissions.manageVolunteers
    );
  });

  it("should fail with 401 when no cookie is provided", async () => {
    await request.post("/volunteer").send(GOOD_REQUEST_BODY).expect(401);

    const newVolunteer = await findVolunteerByEmail(
      GOOD_REQUEST_BODY.data.email
    );
    expect(newVolunteer).toBeNull();
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 400 when trying to create a volunteer with an unavailable email address", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, {
      permissions: [Permissions.manageVolunteers, Permissions.access],
    });

    await agent
      .post("/volunteer")
      .send(
        _.defaultsDeep(
          makeRequestBody({ email: adminVolunteer.email }),
          GOOD_REQUEST_BODY
        )
      )
      .expect(400);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 400 when trying to create a volunteer without an email", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.manageVolunteers, Permissions.access],
    });

    await agent
      .post("/volunteer")
      .send(_.defaultsDeep(makeRequestBody({ email: null }), GOOD_REQUEST_BODY))
      .expect(400);
  });

  // TODO test for missing name or invalid permission array. basically too many or missing parameters
});
