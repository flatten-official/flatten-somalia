const mongoose = require("mongoose");

// DO NOT MODIFY SCHEMA/MODEL UNLESS YOU KNOW WHAT YOU'RE DOING
const cookieSchema = new mongoose.Schema({
  expiry: Date,
  volunteerId: mongoose.ObjectId,
});

const Cookie = mongoose.model("Cookie", cookieSchema);

/**
 *
 * @param expiry Date object that represents the token expiry
 * @param volunteerObjectID the volunteers objectID
 * @return the cookieID
 */
async function writeCookie(expiry, volunteerObjectID) {
  const newCookie = new Cookie();
  newCookie.expiry = expiry;
  newCookie.volunteerId = volunteerObjectID;
  await newCookie.save();
  return newCookie._id;
}

/**
 * Reads the cookie and returns it's data or returns null if cookie doesn't exist
 * @param cookieID the cookie id as a hex string
 * @return a date and objectID objects
 */
async function readCookie(cookieID) {
  const readCookie = await Cookie.findById(cookieID);

  if (!readCookie) return null;

  return { expiry: readCookie.expiry, volunteerId: readCookie.volunteerId };
}

module.exports = { Cookie, writeCookie, readCookie };
