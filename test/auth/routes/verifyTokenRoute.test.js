const { signToken } = require("../../../src/utils/jwt");
const { addVolunteer } = require("../../../src/volunteer/volunteerData");
const { findCookiesByVolunteerEmail } = require("../../../src/auth/cookieData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { TEST_VOLUNTEER } = require("../../testUtils/requests");

const MALFORMED_TOKEN =
  "baaaaaaaaaaaaaaaaaaadTokennnnnnnnnnn.eyJpZCI6IjVlY2ViZDI0NTE5ZjIyMjY4NDVkNjRiMCIsImlhdCI6MTU5MDYwODY3NiwiZXhwIjoxNTkxNTA4Njc2fQ.9XsbPNiybwkZl2M7v3orXk_Imn66vvGflRG267MJ6Ds";
const INVALID_SIGNATURE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzZlOWQwODkwODkwNWIxMDFhM2MzZCIsImlhdCI6MTU5MjM0MDUxNSwiZXhwIjoxNTkyMzQxNDE1fQ.UUqyWSns925CsRrgEbKoFe9Nuxyqv_OJbYQX8rrPIN1";

describe("test /auth/token", () => {
  let request;

  beforeAll(async () => {
    await util.connectToDatabase();
    request = supertest(await getApp());
  });

  afterEach(async () => {
    await util.clearDatabase();
    jest.clearAllMocks();
  });

  afterAll(() => util.closeDatabase());

  // eslint-disable-next-line jest/expect-expect
  it("should return 400 if token is absent", async () => {
    await request.get("/auth/token").expect(400);
  });

  it("should fail with 401 for a token that expires immediately", async () => {
    const volunteer = await addVolunteer(TEST_VOLUNTEER);

    // We test both the good and bad token to make sure it's not the test that is broken
    const badToken = await signToken({ id: volunteer._id }, 0); // 0 minute expiry (already expired)

    const badRes = await request.get("/auth/token?token=" + badToken);

    expect(badRes.status).toBe(401);
    expect(badRes.headers["set-cookie"]).toBeUndefined();
  });

  it("should return a cookie & redirect for a valid token", async () => {
    const volunteer = await addVolunteer(TEST_VOLUNTEER);
    const token = await signToken({ id: volunteer._id }, 10);

    const res = await request.get("/auth/token?token=" + token);
    // cookie should exist
    expect(res.headers["set-cookie"]).not.toBeUndefined();
    expect(res.status).toBe(303);
    expect(await findCookiesByVolunteerEmail(volunteer.email)).toHaveLength(1);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 401 for a malformed token", async () => {
    await request.get("/auth/token?token=" + MALFORMED_TOKEN).expect(401);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should fail with 401 for a token with an invalid signature", async () => {
    await request
      .get("/auth/token?token=" + INVALID_SIGNATURE_TOKEN)
      .expect(401);
  });
});
