const {
  findVolunteerByEmail,
  Permissions,
} = require("../../../../src/volunteer/volunteerData");

const { getApp } = require("../../../../src/app");
const util = require("../../../testUtils/mongo");
const supertest = require("supertest");
const { login } = require("../../../testUtils/requests");
const _ = require("lodash");

const makeRequestBody = (data) => ({ volunteerData: data });

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
    await util.connectToDatabase();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(() => util.clearDatabase());
  afterAll(() => util.closeDatabase());

  it("should add a volunteer upon valid request", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, {
      permissions: [Permissions.manageVolunteers],
    });

    const res = await agent.post("/volunteer").send(GOOD_REQUEST_BODY);

    let newVolunteer = await findVolunteerByEmail(
      GOOD_REQUEST_BODY.volunteerData.email
    );

    expect(res.status).toBe(200);
    expect(newVolunteer).not.toBeNull();

    // remove properties that aren't used in comparison
    newVolunteer = newVolunteer.toJSON();
    delete newVolunteer._id;
    delete newVolunteer.__v;

    expect(newVolunteer).toStrictEqual({
      name: "new_name",
      email: GOOD_REQUEST_BODY.volunteerData.email,
      friendlyId: 2, // 1 already taken by admin
      permissions: [Permissions.submitForms],
      addedBy: adminVolunteer._id,
      teamName: "Flatten",
    });
  });

  it("should fail with 403 for missing permissions", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.submitForms],
    });

    await agent.post("/volunteer").send(GOOD_REQUEST_BODY).expect(403);
    const newVolunteer = await findVolunteerByEmail(
      GOOD_REQUEST_BODY.volunteerData.email
    );
    expect(newVolunteer).toBeNull();
  });

  it("should not use any incorrect flags such as permManageVolunteers", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.manageVolunteers],
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
      GOOD_REQUEST_BODY.volunteerData.email
    );
    expect(newVolunteer.permissions).not.toContain(
      Permissions.manageVolunteers
    );
  });

  it("should fail with 401 when no cookie is provided", async () => {
    await request.post("/volunteer").send(GOOD_REQUEST_BODY).expect(401);

    const newVolunteer = await findVolunteerByEmail(
      GOOD_REQUEST_BODY.volunteerData.email
    );
    expect(newVolunteer).toBeNull();
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 400 when trying to create a volunteer with an unavailable email address", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, {
      permissions: [Permissions.manageVolunteers],
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
      permissions: [Permissions.manageVolunteers],
    });

    await agent
      .post("/volunteer")
      .send(_.defaultsDeep(makeRequestBody({ email: null }), GOOD_REQUEST_BODY))
      .expect(400);
  });

  // TODO test for missing name or invalid permission array. basically too many or missing parameters
});
