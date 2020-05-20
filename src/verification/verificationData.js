const { calculateExpiryTime } = require("./../utils/time");
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
 *
 * @param the cookiesID
 */
function readCookie(cookieID) {
  const readCookie = Cookie.findById(cookieID);

  return { expiry: readCookie.value, volunteerId: readCookie.volunteerId };
}

module.exports = { Cookie, writeCookie, readCookie };
