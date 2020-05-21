const { getApp } = require("./../../src/app");
const util = require("./../testUtils/mongo");
const supertest = require("supertest");

let request;

describe("test /verify/login", () => {
  beforeAll(async () => {
    request = supertest(await getApp());
    await util.connectToDatabase();
  });

  /**
   * Clear all test data after every test.
   */
  afterEach(async () => await util.clearDatabase());

  /**
   * Remove and close the db and server.
   */
  afterAll(async () => await util.closeDatabase());

  it("should return 200 status at /", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
  });

  it("should return error if invalid emails are passed", async () => {
    let res = await request.post("/verify/login");
    expect(res.status).toBe(400);

    res = await request.post("/verify/login").send({ email: "gmail.com" });
    expect(res.status).toBe(422);

    res = await request.post("/verify/login").send({ email: "" });
    expect(res.status).toBe(400);

    res = await request.post("/verify/login").send({ email: '{"$gt": ""}' });
    expect(res.status).toBe(422);
  });

  it("should return success if an unknown email is submitted", async () => {
    let res = await request
      .post("/verify/login")
      .send({ email: "test@gmail.com" });
    expect(res.status).toBe(200);
  });
});
