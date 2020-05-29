const { deleteCookie } = require("../../../src/auth/cookieData");

const { signToken } = require("../../../src/utils/jwt");
const { addVolunteer } = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");

let request;

describe("test /auth", () => {
  let volunteerId;
  let cookie;

  beforeAll(async () => {
    await setup(false);
    await util.connectToDatabase();
    request = supertest(await getApp());
  });

  beforeEach(async () => {
    volunteerId = await addVolunteer(
      "irrelevant",
      "irrelevant@aladin.ca",
      null
    );
    const token = await signToken({ id: volunteerId }, 10);
    const res = await request.get("/auth/token?token=" + token);

    cookie = res.headers["set-cookie"];
  });

  afterEach(async () => {
    await util.clearDatabase();
    jest.clearAllMocks();
    cookie = null;
    volunteerId = null;
  });

  afterAll(async () => await util.closeDatabase());

  it("should return 200 if the session was ended", async () => {
    let res = await request.delete("/auth/logout").set("cookie", cookie);
    expect(res.status).toBe(200);

    // check that the session was actually ended
    res = await request.get("/auth").set("cookie", cookie);
    expect(res.status).not.toBe(200);
  });

  it("should return 204 if no action was taken due to lack of cookie", async () => {
    let res = await request.delete("/auth/logout");
    expect(res.status).toBe(204);
  });

  it("should return 204 if no action was taken due to the session having already ended", async () => {
    // end the session
    await request.delete("/auth/logout").set("cookie", cookie);

    const res = await request.delete("/auth/logout").set("cookie", cookie);
    expect(res.status).toBe(204);
  });
});
