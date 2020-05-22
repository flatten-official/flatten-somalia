const sendgrid = require("../../src/utils/sendgrid");

const spy = jest
  .spyOn(sendgrid, "sendVerificationEmail")
  .mockImplementation((email, verification_link) => {
    const { isEmail, isURL } = require("validator");
    return isEmail(email) && isURL(verification_link, { require_tld: false }); // require_tld to allow localhost
  });

const { getApp } = require("./../../src/app");
const util = require("./../testUtils/mongo");
const supertest = require("supertest");
const { addVolunteer } = require("./../../src/volunteer/volunteerData");

let request;

describe("test /verify/login", () => {
  beforeAll(async () => {
    request = supertest(await getApp());
    await util.connectToDatabase();
  });

  afterEach(async () => await util.clearDatabase());
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
    await addVolunteer("Test Volunteer", "good@gmail.com", null);

    let res = await request
      .post("/verify/login")
      .send({ email: "bad@gmail.com" });
    expect(res.status).toBe(200);
  });

  it("should return success if a known email is submitted", async () => {
    await addVolunteer("Test Volunteer", "good@gmail.com", null);
    //

    //const sendgrid = require("./../../src/utils/sendgrid");

    //    sendVerificationEmail.mockReturnValue(true);

    let res = await request
      .post("/verify/login")
      .send({ email: "good@gmail.com" });

    expect(res.status).toBe(200);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toMatch("good@gmail.com");
    expect(spy.mock.results[0].type).toMatch("return");
    expect(spy.mock.results[0].value).toBe(true);
  });
});
