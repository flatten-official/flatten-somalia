const { signToken } = require("../../../src/utils/jwt");
const {
  addVolunteer,
  findVolunteerByEmail,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");
const { login } = require("../../testUtils/requests");

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
    const { agent } = await login(app);

    const newVolunteerEmail = "new-volunteer@example.ca";

    const res = await agent.post("/volunteer").send({
      volunteerData: {
        name: "new",
        email: newVolunteerEmail,
      },
    });

    const newVolunteer = await findVolunteerByEmail(newVolunteerEmail);

    expect(res.status).toBe(200);
    expect(newVolunteer).not.toBeNull();
    expect(newVolunteer.email).toMatch(newVolunteerEmail);
  });

  it("should fail with 403 for missing permissions", async () => {
    const newVolunteerEmail = "irrelevant@gmail.com";

    const admin = await addVolunteer(
      "admin",
      "irrelevant@gmail.com",
      null,
      false
    );
    const token = await signToken({ id: admin._id }, 10);
    const cookie = (await request.get("/auth/token?token=" + token)).headers[
      "set-cookie"
    ];

    const res = await request
      .post("/volunteer")
      .set("cookie", cookie)
      .send({
        volunteerData: {
          name: "irrelevant",
          email: newVolunteerEmail,
        },
      });

    const newVolunteer = await findVolunteerByEmail(newVolunteerEmail);

    expect(newVolunteer).toBeNull();
    expect(res.status).toBe(403);
  });

  it("should be unable to create an admin", async () => {
    const newVolunteerEmail = "irrelevant@gmail.com";

    const maker = await addVolunteer(
      "not admin",
      "irrelevant1@gmail.com",
      null,
      true
    );
    let token = await signToken({ id: maker._id }, 10);
    const cookie = (await request.get("/auth/token?token=" + token)).headers[
      "set-cookie"
    ];

    await request
      .post("/volunteer")
      .set("cookie", cookie)
      .send({
        volunteerData: {
          name: "irrelevant",
          email: newVolunteerEmail,
          permManageVolunteers: true,
        },
      });

    const newVolunteer = await findVolunteerByEmail(newVolunteerEmail);
    expect(newVolunteer).not.toBeNull();

    // new volunteer should not be an admin
    token = await signToken({ id: newVolunteer._id }, 10);
    let res = await request.get("/auth/token?token=" + token);
    res = await request.get("/auth").set("cookie", res.headers["set-cookie"]);

    expect(res.body["permissions"]).not.toContain("manageVolunteers");
    expect(res.status).toBe(200);
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
    const newVolunteerEmail = "irrelevant@gmail.com";

    const maker = await addVolunteer(
      "not admin",
      "irrelevant1@gmail.com",
      null,
      true
    );
    const token = await signToken({ id: maker._id }, 10);
    const cookie = (await request.get("/auth/token?token=" + token)).headers[
      "set-cookie"
    ];

    await request
      .post("/volunteer")
      .set("cookie", cookie)
      .send({
        volunteerData: {
          name: "irrelevant 1",
          email: newVolunteerEmail,
        },
      });

    const res = await request
      .post("/volunteer")
      .set("cookie", cookie)
      .send({
        volunteerData: {
          name: "irrelevant 2",
          email: newVolunteerEmail,
        },
      });

    expect(res.status).toBe(400);
  });
});
