const {
  writeCookie,
  Cookie,
} = require("./../../src/verification/verificationData");

const {
  connectToDatabase,
  clearDatabase,
  closeDatabase,
} = require("./../testUtils/mongo");

const mongoose = require("mongoose");

describe("testing cookie database I/O", () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  beforeAll(async () => await connectToDatabase());

  /**
   * Clear all test data after every test.
   */
  afterEach(async () => await clearDatabase());

  /**
   * Remove and close the db and server.
   */
  afterAll(async () => await closeDatabase());

  it("writeCookie successfully writes to the database", async () => {
    const expiry = Date.now();
    const volunteerID = "56cb91bdc3464f14678934ca";
    const cookieID = await writeCookie(
      expiry,
      mongoose.mongo.ObjectId(volunteerID)
    );

    const all = await Cookie.find();
    expect(all).toHaveLength(1);

    const retrievedCookie = all[0];
    expect(retrievedCookie._id.toString()).toMatch(cookieID.toString());
    expect(retrievedCookie.expiry.getTime()).toBe(expiry);
    expect(retrievedCookie.volunteerId.toString()).toMatch(volunteerID);
  });
});
