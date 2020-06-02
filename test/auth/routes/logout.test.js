const { login } = require("../../testUtils/requests");
const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");
const { findCookiesByVolunteerEmail } = require("../../../src/auth/cookieData");

describe("test /auth", () => {
  let request;
  let app;

  beforeAll(async () => {
    await setup({ database: false });
    await util.connectToDatabase();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(async () => {
    await util.clearDatabase();
  });

  afterAll(async () => await util.closeDatabase());

  it("should return 204 if the session was ended", async () => {
    const { agent, volunteer } = await login(app);
    const res = await agent.delete("/auth/logout");

    expect(res.status).toBe(204);

    // check that the was actually removed from the db
    expect(await findCookiesByVolunteerEmail(volunteer.email)).toStrictEqual(
      []
    );

    // check that the cookie was unset from the browser (auth returns {})
    const resAuth = await agent.get("/auth");
    expect(resAuth.body).toStrictEqual({});
  });

  it("should return 204 if no action was taken due to lack of cookie", async () => {
    const res = await request.delete("/auth/logout");
    expect(res.status).toBe(204);
  });

  it("should return 204 if no action was taken due to the session having already ended", async () => {
    const { agent } = await login(app);
    // end the session
    await agent.delete("/auth/logout");

    const res = await agent.delete("/auth/logout");
    expect(res.status).toBe(204);
  });
});
