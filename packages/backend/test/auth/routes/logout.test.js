const { login } = require("../../utils/requests");
const { getApp } = require("../../../src/app");
const util = require("db-test-utils");
const supertest = require("supertest");
const { findCookiesByVolunteerEmail } = require("../../../src/auth/cookieData");

describe("test /auth", () => {
  let request;
  let app;

  beforeAll(async () => {
    await util.connectToDatabase();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(() => util.clearDatabase());
  afterAll(() => util.closeDatabase());

  it("should return 204 if the session was ended", async () => {
    const { agent, volunteer } = await login(app);
    await agent.delete("/auth/logout").expect(204);

    // check that the cookie was actually removed from the db
    const cookie = await findCookiesByVolunteerEmail(volunteer.email);
    expect(cookie).toStrictEqual([]);

    // check that the cookie was unset from the browser (auth returns {})
    const resAuth = await agent.get("/auth");
    expect(resAuth.body).toStrictEqual({});
  });

  it("should return 204 if no action was taken due to lack of cookie", async () => {
    const res = await request.delete("/auth/logout");
    expect(res.status).toBe(204);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should return 204 if no action was taken due to the session having already ended", async () => {
    const { agent } = await login(app);
    // end the session
    await agent.delete("/auth/logout");

    // Try ending again
    await agent.delete("/auth/logout").expect(204);
  });
});
