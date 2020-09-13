const { getApp } = require("../../src/app");
const db = require("util-db/inMemoryDb");
const { login } = require("../utils/requests");
const { getAllPermissionsExcept } = require("../utils/permissions");
const { Permissions } = require("../../src/volunteer/volunteerData");
const supertest = require("supertest");

const endpoint = "/survey/gravedigger"; // we use gravedigger however it could be anything

describe("survey permissions", () => {
  let app;
  let request;

  beforeAll(async () => {
    await db.connect();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(() => db.clear());
  afterAll(() => db.close());

  // eslint-disable-next-line jest/expect-expect
  it("should pass authentication for user with required permissions", async () => {
    const { agent } = await login(app, [
      Permissions.submitForms,
      Permissions.access,
    ]);

    await agent.post(endpoint).expect(400); // fail for non permission reasons (missing body)
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail for a user without submit permissions", async () => {
    const { agent } = await login(
      app,
      getAllPermissionsExcept(Permissions.submitForms)
    );

    await agent.post(endpoint).expect(403);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail for user without access permissions", async () => {
    const { agent } = await login(
      app,
      getAllPermissionsExcept(Permissions.access)
    );
    await agent.post(endpoint).expect(403);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail for someone not logged in", async () => {
    await request.post(endpoint).expect(401);
  });
});
