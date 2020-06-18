const {
  Volunteer,
  Permissions,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const {
  login,
  TEST_ADMIN,
  makeVolunteerRequestBody,
} = require("../../testUtils/requests");

const dummyVolunteers = [
  {
    name: "new_name",
    email: "a1@example.com",
  },
  {
    name: "new_name2",
    email: "a2@example.com",
  },
].sort((v) => v.email);

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

  it("should return a correct list of volunteers", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, TEST_ADMIN);

    for (const v of dummyVolunteers) {
      const res = await agent
        .post("/volunteer")
        .send(makeVolunteerRequestBody({ ...v, permSubmitForms: true }));
      expect(res.status).toBe(200);
    }

    const res = await agent.get("/volunteer/list").send({});

    let list = res.body;

    expect(list).toHaveLength(2 + 1);
    list = list
      // remove the admin volunteer
      .filter((v) => v.email !== adminVolunteer.email)
      .sort((v) => v.email)
      .map((v) => ({ name: v.name, email: v.email }));

    expect(list).toStrictEqual(dummyVolunteers);
  });

  it("should fail with 403 for missing permissions", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.submitForms],
    });

    const res = await agent.get("/volunteer/list").send({});

    expect(res.status).toBe(403);
  });
});
