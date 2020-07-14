const { getApp } = require("../../../src/app");
const util = require("db-test-utils");
const supertest = require("supertest");

const { login } = require("../../utils/requests");
const { Permissions } = require("../../../src/volunteer/volunteerData");

let request;
let app;

describe("test /auth", () => {
  beforeAll(async () => {
    await util.connectToDatabase();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(() => util.clearDatabase());
  afterAll(() => util.closeDatabase());

  it("should return an empty object when no cookie is provided", async () => {
    const res = await request.get("/auth");

    expect(res.status).toBe(200);
    // object should be empty
    expect(res.body).toStrictEqual({});
  });

  it("should return name, permissions, teamName and session expiry for a logged in volunteer", async () => {
    const { agent, volunteer } = await login(app);

    const res = await agent.get("/auth");

    expect(res.status).toBe(200);
    expect(Object.keys(res.body)).toHaveLength(5);
    expect(res.body.name).toBe(volunteer.name);
    // expected value set in volunteerData.js
    expect(res.body.permissions).toMatchObject([Permissions.submitForms]);
    // expiry field should exist
    expect(res.body.expiry).not.toBeNull();
    // Should have a friendly id field
    expect(res.body.friendlyId).toBe(1);
    expect(res.body.teamName).toMatch("testTeam");
  });
});