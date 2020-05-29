const { signToken } = require("../../../src/utils/jwt");
const { addVolunteer } = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");

let request;

describe("test /auth", () => {
  beforeAll(async () => {
    await setup(false);
    await util.connectToDatabase();
    request = supertest(await getApp());
  });

  afterEach(async () => {
    await util.clearDatabase();
    jest.clearAllMocks();
  });
  afterAll(async () => await util.closeDatabase());

  it("should return an empty object when no cookie is provided", async () => {
    let res = await request.get("/auth");

    expect(res.status).toBe(200);
    // object should be empty
    expect(res.body.constructor).toBe(Object);
    expect(Object.keys(res.body)).toHaveLength(0);
  });

  it("should return  name, permissions, and session expiry for a logged in volunteer", async () => {
    const name = "big poppa";
    const permissions = ["submitForms"];

    let volunteerId = await addVolunteer(name, "irrelevant@aladin.ca", null);
    let token = await signToken({ id: volunteerId }, 10);
    let loginRes = await request.get("/auth/token?token=" + token);

    let res = await request
      .get("/auth")
      .set("cookie", loginRes.headers["set-cookie"]);

    expect(res.body["name"]).toBe(name);
    // expected value set in volunteerData.js
    expect(res.body["permissions"]).toMatchObject(permissions);
    // expiry field should exist
    expect(res.body["expiry"]).toBe(true);
  });
});
