const { signToken } = require("../../../src/utils/jwt");
const { addVolunteer } = require("../../../src/volunteer/volunteerData");
const { findCookiesByVolunteerEmail } = require("../../../src/auth/cookieData");

const { getApp } = require("../../../src/app");

const db = require("util-db/inMemoryDb");
const supertest = require("supertest");

const TEST_VOLUNTEER = {
  name: "default_name",
  email: "default_email@example.ca",
  teamName: "testTeam",
};

const MALFORMED_TOKEN =
  "baaaaaaaaaaaaaaaaaaadTokennnnnnnnnnn.eyJpZCI6IjVlY2ViZDI0NTE5ZjIyMjY4NDVkNjRiMCIsImlhdCI6MTU5MDYwODY3NiwiZXhwIjoxNTkxNTA4Njc2fQ.9XsbPNiybwkZl2M7v3orXk_Imn66vvGflRG267MJ6Ds";
const INVALID_SIGNATURE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzZlOWQwODkwODkwNWIxMDFhM2MzZCIsImlhdCI6MTU5MjM0MDUxNSwiZXhwIjoxNTkyMzQxNDE1fQ.UUqyWSns925CsRrgEbKoFe9Nuxyqv_OJbYQX8rrPIN1";

describe("test /auth/token", () => {
  let request;

  beforeAll(async () => {
    await db.connect();
    request = supertest(await getApp());
  });

  afterEach(async () => {
    await db.clear();
    jest.clearAllMocks();
  });

  afterAll(() => db.close());

  // eslint-disable-next-line jest/expect-expect
  it("should return 400 if token is absent", async () => {
    await request.get("/auth/token").expect(400);
  });

  it("should fail with 401 for a token that expires immediately", async () => {
    const volunteer = await addVolunteer(TEST_VOLUNTEER);
    const badToken = await signToken({ id: volunteer._id }, 0); // 0 minute expiry (already expired)

    const res = await request.get("/auth/token?token=" + badToken);

    expect(res.status).toBe(401);
    expect(res.headers["set-cookie"]).toBeUndefined();
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
