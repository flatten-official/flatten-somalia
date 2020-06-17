const {
  findVolunteerByEmail,
  Volunteer,
  Permissions,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { login, TEST_VOLUNTEER } = require("../../testUtils/requests");
const _ = require("lodash");

const makeVolunteerRequestBody = (data) => {
  return _.defaults({ data: _.defaults(data, TEST_VOLUNTEER) });
};

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
    const { agent, volunteer: adminVolunteer } = await login(app, {
      permissions: [Permissions.manageVolunteers],
    });

    const newVolunteerEmail = "new-volunteer@example.ca";

    const res = await agent.post("/volunteer").send(
      makeVolunteerRequestBody({
        name: "new_name",
        email: newVolunteerEmail,
        permSubmitForms: true,
      })
    );

    let newVolunteer = await findVolunteerByEmail(newVolunteerEmail);

    expect(res.status).toBe(200);
    expect(newVolunteer).not.toBeNull();

    // remove properties that aren't used in comparison
    newVolunteer = newVolunteer.toJSON();
    delete newVolunteer._id;
    delete newVolunteer.__v;

    expect(newVolunteer).toStrictEqual({
      name: "new_name",
      email: newVolunteerEmail,
      friendlyId: 2, // 1 already taken by admin
      permissions: [Permissions.submitForms],
      addedBy: adminVolunteer._id,
      teamName: "testTeam",
    });
  });

  it("should fail with 403 for missing permissions", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.submitForms],
    });

    const newVolunteerEmail = "new-volunteer@example.ca";

    const res = await agent
      .post("/volunteer")
      .send(makeVolunteerRequestBody({}));

    expect(res.status).toBe(403);

    const newVolunteer = await findVolunteerByEmail(newVolunteerEmail);
    expect(newVolunteer).toBeNull();
  });

  it("should be unable to create an admin", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.manageVolunteers],
    });

    const newVolunteerEmail = "new-volunteer@example.com";

    const res = await agent.post("/volunteer").send(
      makeVolunteerRequestBody({
        name: "irrelevant",
        email: newVolunteerEmail,
        permManageVolunteers: true,
        permissions: [Permissions.manageVolunteers],
      })
    );

    expect(res.status).toBe(200);

    const newVolunteer = await findVolunteerByEmail(newVolunteerEmail);
    expect(newVolunteer.permissions).not.toContain(
      Permissions.manageVolunteers
    );
  });

  it("should fail with 401 when no cookie is provided", async () => {
    const newVolunteerEmail = "irrelevant@gmail.com";

    const res = await request.post("/volunteer").send({
      data: {
        name: "irrelevant",
        email: newVolunteerEmail,
      },
    });

    const newVolunteer = await findVolunteerByEmail(newVolunteerEmail);

    expect(newVolunteer).toBeNull();
    expect(res.status).toBe(401);
  });

  it("should fail with 400 when trying to create a volunteer with an unavailable email address", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, {
      permissions: [Permissions.manageVolunteers],
    });

    const res = await agent.post("/volunteer").send(
      makeVolunteerRequestBody({
        name: "volunteer with same email as admin",
        email: adminVolunteer.email,
      })
    );

    expect(res.status).toBe(400);
  });

  it("should fail with 400 when trying to create a volunteer without an email", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.manageVolunteers],
    });

    const res = await agent.post("/volunteer").send({
      data: { name: "volunteer with same email as admin" },
    });

    expect(res.status).toBe(400);
  });

  // TODO test for missing email, missing name or invalid permission array. basically too many or missing parameters
});
