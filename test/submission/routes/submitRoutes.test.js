const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");

const { login } = require("../../testUtils/requests");

let request;
let app;

describe("test /auth", () => {
  beforeAll(async () => {
    await setup(false);
    await util.connectToDatabase();
    app = await getApp();
    request = supertest(app);
  });

  afterEach(async () => {
    await util.clearDatabase();
    jest.clearAllMocks();
  });
  afterAll(async () => await util.closeDatabase());

  it("should add submissions, people, and households as expected for an initial submission", async () => {
    const { agent, volunteer } = await login(app);

    const res = await agent.get("/submit")

    // TODO
    expect(true).toStrictEqual(false);
  });

  it("should add submissions, people, and households as expected for a follow up submission", async () => {
    // TODO
    expect(true).toStrictEqual(false);
  });
});
