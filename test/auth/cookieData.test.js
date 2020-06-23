const {
  Volunteer,
  addVolunteer,
} = require("../../src/volunteer/volunteerData");
const cookieData = require("../../src/auth/cookieData");
const util = require("./../testUtils/mongo");
const { calculateExpiryTime } = require("./../../src/utils/time");
const { TEST_VOLUNTEER } = require("../testUtils/requests");

const mongoose = require("mongoose");

describe("cookie database functions", () => {
  beforeAll(() => util.connectToDatabase());
  afterEach(() => util.clearDatabase());
  afterAll(() => util.closeDatabase());

  it("should write cookie to database", async () => {
    const expiry = calculateExpiryTime(5);
    const volunteer = await addVolunteer(TEST_VOLUNTEER);
    const cookieID = await cookieData.writeCookie(expiry, volunteer._id);

    const all = await cookieData.Cookie.find();
    expect(all).toHaveLength(1);

    const retrievedCookie = all[0];
    expect(retrievedCookie._id).toStrictEqual(cookieID);
    expect(retrievedCookie.expiry).toStrictEqual(expiry);
    expect(retrievedCookie.volunteerId).toStrictEqual(volunteer._id);
  });

  it("should read existing cookie from database", async () => {
    const expiry = calculateExpiryTime(5);
    const volunteer = await addVolunteer(TEST_VOLUNTEER);
    const cookieID = await cookieData.writeCookie(expiry, volunteer._id);

    const cookieValues = await cookieData.readCookie(cookieID);

    expect(cookieValues.volunteerId).toStrictEqual(volunteer._id);
    expect(cookieValues.expiry).toStrictEqual(expiry);
  });

  it("should return null when reading cookie since cookie doesn't exist", async () => {
    const wrongID = mongoose.mongo.ObjectId("56cb91bdc3464f14678934ca");

    const cookieValues = await cookieData.readCookie(wrongID);

    expect(cookieValues).toBeNull();
  });

  it("should fail to write a cookie when parameters are missing", async function () {
    const badCookieDatas = [
      { expiry: Date.now() },
      { volunteerId: mongoose.mongo.ObjectId("56cb91bdc3464f14678934ca") },
    ];

    for (const badCookieData of badCookieDatas) {
      const cookie = new cookieData.Cookie(badCookieData);
      await expect(() => cookie.save()).rejects.toBeInstanceOf(
        mongoose.Error.ValidationError
      );
    }
  });

  it("should fail to read cookie that has expired", async function () {
    const expiry = Date.now(); // Expires immediately
    const cookieID = await cookieData.writeCookie(
      expiry,
      mongoose.mongo.ObjectId("56cb91bdc3464f14678934ca")
    );

    const cookieValues = await cookieData.readCookie(cookieID);

    expect(cookieValues).toBeNull();
  });

  it("should delete all expired cookies", async function () {
    // Generate 5 expired cookies
    for (let i = 0; i < 5; i++) {
      await new cookieData.Cookie({
        expiry: Date.now(),
        volunteerId: mongoose.mongo.ObjectId("56cb91bdc3464f14678934ca"),
      }).save();
    }

    // Generate 3 good cookies
    for (let i = 0; i < 3; i++) {
      await new cookieData.Cookie({
        expiry: calculateExpiryTime(5),
        volunteerId: mongoose.mongo.ObjectId("56cb91bdc3464f14678934ca"),
      }).save();
    }

    await cookieData.removedExpiredCookies();

    const goodCookies = await cookieData.Cookie.find();
    expect(goodCookies).toHaveLength(3);
  });
});
