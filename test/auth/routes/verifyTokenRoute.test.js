const { signToken } = require("../../../src/utils/jwt");
const { addVolunteer } = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");

let request;

describe("test /auth/token", () => {
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

  it("should return 400 if token is absent", async () => {
    const res = await request.get("/auth/token");
    expect(res.status).toBe(400);
  });

  it("should fail with 401 for an old token", async () => {
    // token used here was signed for a valid email on May 27 and should be expired
    const res = await request.get(
      "/auth/token?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2ViZDI0NTE5ZjIyMjY4NDVkNjRiMCIsImlhdCI6MTU5MDYwODY3NiwiZXhwIjoxNTkxNTA4Njc2fQ.9XsbPNiybwkZl2M7v3orXk_Imn66vvGflRG267MJ6Ds"
    );
    expect(res.status).toBe(401);
  });

  it("should return a cookie & redirect for a valid token", async () => {
    let volunteerId = await addVolunteer("Kanye West", "good@gmail.com", null);
    let token = await signToken({ id: volunteerId }, 10);

    let res = await request.get("/auth/token?token=" + token);
    console.log(!!res);
    // cookie should exist
    expect(!!res.cookie).toBe(true);
    expect(res.status).toBe(303);
  });
});
