const {
  Volunteer,
  Permissions,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { login, TEST_VOLUNTEER } = require("../../testUtils/requests");

const dummyVolunteers = [
  {
    name: "new_name",
    email: "a1@example.com",
    permSubmitForms: true,
  },
  {
    name: "new_name2",
    email: "a2@example.com",
    permSubmitForms: true,
  },
];

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
    const { agent, volunteer: adminVolunteer } = await login(app, {
      permissions: [Permissions.manageVolunteers],
    });

    for (const v of dummyVolunteers) {
      const res = await agent.post("/volunteer").send(v);
      expect(res.status).toBe(200);
    }

    const res = await agent.get("/volunteer/list").send({});

    const list = res.body();

    expect(list).toHaveLength(2);

    expect(list[0].name).toStrictEqual(dummyVolunteers[0].name);
    expect(list[1].name).toStrictEqual(dummyVolunteers[1].name);
    expect(list[0].email).toStrictEqual(dummyVolunteers[0].email);
    expect(list[1].email).toStrictEqual(dummyVolunteers[1].email);
  });

  it("should fail with 403 for missing permissions", async () => {
    const { agent } = await login(app, {
      permissions: [Permissions.submitForms],
    });

    const res = await agent.get("/volunteer/list").send({});

    expect(res.status).toBe(403);
  });
});
