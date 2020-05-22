const sendGrid = require("../../../src/utils/sendGrid");
const mocks = require("../../testUtils/mocks");

const sendEmailMock = jest
  .spyOn(sendGrid, "sendVerificationEmail")
  .mockImplementation(mocks.sendVerificationEmail);

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { addVolunteer } = require("../../../src/volunteer/volunteerData");

let request;

describe("test /auth/login", () => {
  beforeAll(async () => {
    await util.connectToDatabase();
    request = supertest(await getApp());
  });

  afterEach(async () => {
    await util.clearDatabase();
    jest.clearAllMocks();
  });
  afterAll(async () => await util.closeDatabase());

  it("should return 200 status at /", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
  });

  it("should return error if invalid emails are passed", async () => {
    let res = await request.post("/auth/login");
    expect(res.status).toBe(400);

    res = await request.post("/auth/login").send({ email: "gmail.com" });
    expect(res.status).toBe(422);

    res = await request.post("/auth/login").send({ email: "" });
    expect(res.status).toBe(400);

    res = await request.post("/auth/login").send({ email: '{"$gt": ""}' });
    expect(res.status).toBe(422);
  });

  it("should return success if an unknown email is submitted and not send email", async () => {
    await addVolunteer("Test Volunteer", "good@gmail.com", null);

    let res = await request
      .post("/auth/login")
      .send({ email: "bad@gmail.com" });
    expect(res.status).toBe(200);

    expect(sendEmailMock).toHaveBeenCalledTimes(0);
  });

  it("should return success if a known email is submitted", async () => {
    await addVolunteer("Test Volunteer", "good@gmail.com", null);

    let res = await request
      .post("/auth/login")
      .send({ email: "good@gmail.com" });

    expect(res.status).toBe(200);

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock.mock.calls[0][0]).toMatch("good@gmail.com");
    expect(sendEmailMock.mock.results[0].type).toMatch("return");
    expect(sendEmailMock.mock.results[0].value).toBe(true);
  });
});
