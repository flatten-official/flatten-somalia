const sendGrid = require("../../../src/utils/sendGrid");
const mocks = require("../../utils/mocks");
const { verifyToken } = require("../../../src/utils/jwt");
const sendEmailMock = jest
  .spyOn(sendGrid, "sendVerificationEmail")
  .mockImplementation(mocks.sendVerificationEmail);

const { getApp } = require("../../../src/app");
const util = require("db-test-utils");
const supertest = require("supertest");
const { addVolunteer } = require("../../../src/volunteer/volunteerData");
const { getConfig } = require("../../../src/config");
const { TEST_VOLUNTEER } = require("../../utils/requests");

describe("test /auth/login", () => {
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

  it("should return 200 status at /", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should return error if invalid emails are passed", async () => {
    await request.post("/auth/login").expect(400);
    await request.post("/auth/login").send({}).expect(400);
    await request.post("/auth/login").send({ email: "gmail.com" }).expect(422);
    await request.post("/auth/login").send({ email: "" }).expect(400);
    await request
      .post("/auth/login")
      .send({ email: '{"$gt": ""}' }) // tests a No-SQL injection attempt
      .expect(422);
  });

  it("should return success if an unknown email is submitted and not send email", async () => {
    await addVolunteer(TEST_VOLUNTEER);

    await request
      .post("/auth/login")
      .send({ email: "bad@gmail.com" })
      .expect(200);

    expect(sendEmailMock).toHaveBeenCalledTimes(0);
  });

  it("should return success if a known email is submitted", async () => {
    await addVolunteer(TEST_VOLUNTEER);

    await request
      .post("/auth/login")
      .send({ email: TEST_VOLUNTEER.email })
      .expect(200);

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
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
