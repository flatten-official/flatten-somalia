const { signToken } = require("../../../src/utils/jwt");
const { addVolunteer } = require("../../../src/volunteer/volunteerData");
const { findCookiesByVolunteerEmail } = require("../../../src/auth/cookieData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");
const { TEST_VOLUNTEER } = require("../../testUtils/requests");

let request;

const BAD_TOKEN =
  "baaaaaaaaaaaaaaaaaaadTokennnnnnnnnnn.eyJpZCI6IjVlY2ViZDI0NTE5ZjIyMjY4NDVkNjRiMCIsImlhdCI6MTU5MDYwODY3NiwiZXhwIjoxNTkxNTA4Njc2fQ.9XsbPNiybwkZl2M7v3orXk_Imn66vvGflRG267MJ6Ds";

// token used here was signed for a valid email on May 30th and should be expired
const OLD_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzZlOWQwODkwODkwNWIxMDFhM2MzZCIsImlhdCI6MTU5MDgxODk2NiwiZXhwIjoxNTkwODE5ODY2fQ.yWaruFe0mRamjXAHW0lPcbWoOWq4s5InMt7ILjpSsys";

describe("test /auth/token", () => {
  beforeAll(async () => {
    await util.connectToDatabase();
    request = supertest(await getApp());
  });

  afterEach(async () => {
    await util.clearDatabase();
    jest.clearAllMocks();
  });
  afterAll(async () => await util.closeDatabase());

  it("should return 400 if token is absent", async () => {
    const res = await request.get("/auth/token");
    expect(res.status).toBe(400);
  });

  it("should fail with 401 for an old token", async () => {
    const res = await request.get("/auth/token?token=" + OLD_TOKEN);

    expect(res.status).toBe(401);
    expect(res.headers["set-cookie"]).toBeUndefined();
  });

  it("should fail with 401 for a token that expires immediately", async () => {
    const volunteer = await addVolunteer(TEST_VOLUNTEER);
    const token = await signToken({ id: volunteer._id }, 0); // 0 minute expiry (already expired)
    const res = await request.get("/auth/token?token=" + token);

    expect(res.status).toBe(401);
    expect(res.headers["set-cookie"]).toBeUndefined();
    expect(await findCookiesByVolunteerEmail(volunteer.email)).toStrictEqual(
      []
    );
  });

  it("should fail with 401 for a bad token", async () => {
    const res = await request.get("/auth/token?token=" + BAD_TOKEN);
    expect(res.status).toBe(401);
  });

  it("should return a cookie & redirect for a valid token", async () => {
    const volunteer = await addVolunteer(TEST_VOLUNTEER);
    const token = await signToken({ id: volunteer._id }, 10);

    const res = await request.get("/auth/token?token=" + token);
    // cookie should exist
    expect(res.headers["set-cookie"]).not.toBeUndefined();
    expect(res.status).toBe(303);
    expect(await findCookiesByVolunteerEmail(volunteer.email)).not.toHaveLength(
      0
    );
  });
});
