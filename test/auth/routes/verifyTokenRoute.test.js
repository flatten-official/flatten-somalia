const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");

let request;

describe("test /auth/login", () => {
  beforeAll(async () => {
    await util.connectToDatabase();
    request = supertest(await getApp());
  });

  afterEach(async () => await util.clearDatabase());
  afterAll(async () => await util.closeDatabase());
});
