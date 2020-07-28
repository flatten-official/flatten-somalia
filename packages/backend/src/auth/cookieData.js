const { mongoose } = require("util-db");
const { findVolunteerByEmail } = require("../volunteer/volunteerData");

// DO NOT MODIFY SCHEMA/MODEL UNLESS YOU KNOW WHAT YOU'RE DOING
const Cookie = mongoose.model(
  "Cookie",
  new mongoose.Schema({
    expiry: {
      type: Date,
      required: true,
    },
    volunteerId: {
      type: mongoose.ObjectId,
      required: true,
    },
  })
);

async function deleteCookieForVolunteer(volunteerId) {
  await Cookie.deleteMany({ volunteerId });
}

/**
 *
 * @param expiry Date object that represents the token expiry
 * @param volunteerObjectID the volunteers objectID
 * @return the cookieID
 */
async function writeCookie(expiry, volunteerObjectID) {
  const newCookie = new Cookie({
    expiry: expiry,
    volunteerId: volunteerObjectID,
  });

  await newCookie.save();
  return newCookie._id;
}

/**
 * Reads the cookie and returns it's data or returns null if cookie doesn't exist or is expired
 * @param cookieID the cookie id as a hex string
 * @return a date and objectID objects
 */
async function readCookie(cookieID) {
  const cookie = await Cookie.findById(cookieID);

  if (!cookie) return null;

  if (Date.now() > cookie.expiry) {
    await deleteCookie(cookieID);
    return null;
  }

  return { expiry: cookie.expiry, volunteerId: cookie.volunteerId };
}

/**
 * Deletes the cookie
 */
async function deleteCookie(cookieID) {
  await Cookie.findByIdAndDelete(cookieID);
}

async function removedExpiredCookies() {
  await Cookie.deleteMany({ expiry: { $lt: Date.now() } });
}

async function findCookiesByVolunteerEmail(email) {
  const volunteer = await findVolunteerByEmail(email);
  if (!volunteer) return null;
  return Cookie.find({ volunteerId: volunteer._id });
}

module.exports = {
  Cookie,
  writeCookie,
  readCookie,
  removedExpiredCookies,
  deleteCookie,
  findCookiesByVolunteerEmail,
  deleteCookieForVolunteer,
};
