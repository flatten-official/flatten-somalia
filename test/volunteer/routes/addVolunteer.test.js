const {
  findVolunteerByEmail,
  Permissions,
  Volunteer,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { login } = require("../../testUtils/requests");
const _ = require("lodash");
const { getAllPermissionsExcept } = require("../../testUtils/permissions");

const makeRequestBody = (data) => ({ volunteerData: data });

const GOOD_REQUEST_BODY = makeRequestBody({
  name: "new_name",
  email: "new-volunteer@example.ca",
  teamName: "Flatten",
  permissions: [Permissions.submitHouseholdSurvey],
});

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
    const { agent, volunteer: adminVolunteer } = await login(app, [
      Permissions.manageVolunteers,
    ]);

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
      permissions: [Permissions.submitHouseholdSurvey],
      addedBy: adminVolunteer._id,
      teamName: "Flatten",
    });
  });

  it("should fail with 403 for missing permissions", async () => {
    const { agent } = await login(
      app,
      getAllPermissionsExcept(Permissions.manageVolunteers)
    );

    await agent.post("/volunteer").send(GOOD_REQUEST_BODY).expect(403);
    const newVolunteer = await findVolunteerByEmail(
      GOOD_REQUEST_BODY.volunteerData.email
    );
    expect(newVolunteer).toBeNull();
  });

  it("should throw 403 if trying to add a restricted permissions", async () => {
    const { agent } = await login(app, [Permissions.manageVolunteers]);

    const restrictedPermissions = [Permissions.manageVolunteers];

    for (const restrictedPermission of restrictedPermissions) {
      await agent
        .post("/volunteer")
        .send(
          _.defaultsDeep(
            makeRequestBody({ permissions: [restrictedPermission] }),
            GOOD_REQUEST_BODY
          )
        )
        .expect(403);

      expect(await Volunteer.find()).toHaveLength(1);
    }
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
    const { agent, volunteer: adminVolunteer } = await login(app, [
      Permissions.manageVolunteers,
    ]);

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
    const { agent } = await login(app, [Permissions.manageVolunteers]);

    await agent
      .post("/volunteer")
      .send(_.defaultsDeep(makeRequestBody({ email: null }), GOOD_REQUEST_BODY))
      .expect(400);
  });

  // TODO test for missing name or invalid permission array. basically too many or missing parameters
});
