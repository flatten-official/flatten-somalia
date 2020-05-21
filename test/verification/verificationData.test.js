const {
  writeCookie,
  readCookie,
  Cookie,
} = require("../../src/verification/cookieData");

const {
  connectToDatabase,
  clearDatabase,
  closeDatabase,
  ValidationError,
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

  it("should write cookie to database", async () => {
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

  it("should read existing cookie from database", async () => {
    const expiry = Date.now();
    const volunteerID = "56cb91bdc3464f14678934ca";
    const cookieID = await writeCookie(
      expiry,
      mongoose.mongo.ObjectId(volunteerID)
    );

    const cookieValues = await readCookie(cookieID);

    expect(cookieValues.volunteerId.toString()).toMatch(volunteerID);
    expect(cookieValues.expiry.getTime()).toBe(expiry);
  });

  it("should return null when reading cookie since cookie doesn't exist", async () => {
    const wrongID = mongoose.mongo.ObjectId("56cb91bdc3464f14678934ca");

    const cookieValues = await readCookie(wrongID);

    expect(cookieValues).toBeNull();
  });

  it("should fail to write a cookie when parameters are missing", async function () {
    const badCookieDatas = [
      { expiry: Date.now() },
      { volunteerId: mongoose.mongo.ObjectId("56cb91bdc3464f14678934ca") },
    ];

    for (const badCookieData of badCookieDatas) {
      const cookie = new Cookie(badCookieData);
      await expect(() => cookie.save()).rejects.toBeInstanceOf(ValidationError);
    }
  });
});
