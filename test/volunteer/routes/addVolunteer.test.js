const { signToken } = require("../../../src/utils/jwt");
const {
  addVolunteer,
  findVolunteerByEmail,
  PERMISSION_MANAGE_VOLUNTEERS,
  PERMISSION_SUBMIT_FORMS,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");
const { login, TEST_VOLUNTEER } = require("../../testUtils/requests");

describe("endpoint POST /volunteer", () => {
  let app;
  let request;

  beforeAll(async () => {
    await setup(false);
    await util.connectToDatabase();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(async () => await util.clearDatabase());
  afterAll(async () => await util.closeDatabase());

  it("should add a volunteer upon valid request", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, {
      permissions: [PERMISSION_MANAGE_VOLUNTEERS],
    });

    const newVolunteerEmail = "new-volunteer@example.ca";

    const res = await agent.post("/volunteer").send({
      volunteerData: {
        name: "new_name",
        email: newVolunteerEmail,
        permSubmitForms: true,
      },
    });

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
      permissions: [PERMISSION_SUBMIT_FORMS],
      addedBy: adminVolunteer._id,
    });
  });

  it("should fail with 403 for missing permissions", async () => {
    const { agent } = await login(app, {
      permissions: [PERMISSION_SUBMIT_FORMS],
    });

    const newVolunteerEmail = "new-volunteer@example.ca";

    const res = await agent.post("/volunteer").send(TEST_VOLUNTEER);

    expect(res.status).toBe(403);

    const newVolunteer = await findVolunteerByEmail(newVolunteerEmail);
    expect(newVolunteer).toBeNull();
  });

  it("should be unable to create an admin", async () => {
    const { agent } = await login(app, {
      permissions: [PERMISSION_MANAGE_VOLUNTEERS],
    });

    const newVolunteerEmail = "new-volunteer@example.com";

    const res = await agent.post("/volunteer").send({
      volunteerData: {
        name: "irrelevant",
        email: newVolunteerEmail,
        permManageVolunteers: true,
      },
    });

    expect(res.status).toBe(200);

    const newVolunteer = await findVolunteerByEmail(newVolunteerEmail);
    expect(newVolunteer.permissions).not.toContain(
      PERMISSION_MANAGE_VOLUNTEERS
    );
  });

  it("should fail with 401 when no cookie is provided", async () => {
    const newVolunteerEmail = "irrelevant@gmail.com";

    const res = await request.post("/volunteer").send({
      volunteerData: {
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
      permissions: [PERMISSION_MANAGE_VOLUNTEERS],
    });

    const res = await agent.post("/volunteer").send({
      volunteerData: {
        name: "volunteer with same email as admin",
        email: adminVolunteer.email,
      },
    });

    expect(res.status).toBe(400);
  });

  it("should fail with 400 when trying to create a volunteer without an email", async () => {
    const { agent } = await login(app, {
      permissions: [PERMISSION_MANAGE_VOLUNTEERS],
    });

    const res = await agent.post("/volunteer").send({
      volunteerData: {
        name: "volunteer with same email as admin",
      },
    });

    expect(res.status).toBe(400);
  });

  // TODO test for missing email, missing name or invalid permission array. basically too many or missing parameters
});
