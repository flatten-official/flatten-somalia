const sendGrid = require("../../../src/utils/sendGrid");
const mocks = require("../../testUtils/mocks");
const { verifyToken } = require("../../../src/utils/jwt");
const sendEmailMock = jest
  .spyOn(sendGrid, "sendVerificationEmail")
  .mockImplementation(mocks.sendVerificationEmail);

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { addVolunteer } = require("../../../src/volunteer/volunteerData");
const { getConfig } = require("../../../src/config");
const { TEST_VOLUNTEER } = require("../../testUtils/requests");

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
    await addVolunteer(TEST_VOLUNTEER);

    const res = await request
      .post("/auth/login")
      .send({ email: "bad@gmail.com" });
    expect(res.status).toBe(200);

    expect(sendEmailMock).toHaveBeenCalledTimes(0);
  });

  it("should return success if a known email is submitted", async () => {
    await addVolunteer(TEST_VOLUNTEER);

    const res = await request
      .post("/auth/login")
      .send({ email: TEST_VOLUNTEER.email });

    expect(res.status).toBe(200);
  });

  it("should send email with the payload being the volunteer id", async () => {
    const volunteer = await addVolunteer(TEST_VOLUNTEER);

    await request.post("/auth/login").send({ email: TEST_VOLUNTEER.email });

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock.mock.calls[0][0]).toMatch(TEST_VOLUNTEER.email);
    expect(sendEmailMock.mock.results[0].type).toMatch("return");
    expect(sendEmailMock.mock.results[0].value).toBe(true);

    const url = sendEmailMock.mock.calls[0][1];
    const tokenIndex = url.indexOf("?token=");

    const token = url.slice(tokenIndex + 7); // +7 to go past ?token=
    const payload = await verifyToken(token);

    expect(payload).not.toBeNull();
    expect(payload.id).toMatch(volunteer._id.toString());

    const emailLinkBase = url.slice(0, tokenIndex);
    expect(emailLinkBase).toMatch(
      getConfig().urls.backendHost + getConfig().urls.emailLink
    );
  });
});
