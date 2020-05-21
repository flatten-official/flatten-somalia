const mongoose = require("mongoose");

// DO NOT MODIFY SCHEMA/MODEL UNLESS YOU KNOW WHAT YOU'RE DOING
const Volunteer = mongoose.model(
  "Volunteer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: true, // Since we search by volunteer email
      unique: true,
      required: true,
    },
    permissions: {
      type: [
        {
          type: String,
          enum: ["manageVolunteers", "submitForms"],
          required: true,
        },
      ],
      required: true,
    },
    gender: String,
    addedBy: mongoose.ObjectId,
    age: Number,
  })
);

/**
 * Adds a volunteer to the database
 * @param name
 * @param email
 * @param addedBy a volunteer id
 * @param allowToManageVolunteers
 * @param allowToSubmitForms
 * @param gender
 * @param age
 * @return {Promise<*>} the volunteer id
 */
async function addVolunteer(
  name,
  email,
  addedBy,
  allowToManageVolunteers = false,
  allowToSubmitForms = true,
  gender = null,
  age = null
) {
  let permissions = [];
  if (allowToManageVolunteers) permissions.push("manageVolunteers");
  if (allowToSubmitForms) permissions.push("submitForms");

  const volunteer = new Volunteer({
    name: name,
    email: email,
    addedBy: addedBy,
    permissions: permissions,
    gender: gender,
    age: age,
  });

  await volunteer.save(); // TODO Deal with validation errors (e.g. two volunteers with identical emails)
  return volunteer._id;
}

async function getPermissions(volunteerId) {
  return await Volunteer.findById(volunteerId, "permissions").permissions;
}

/**
 * Returns null if volunteer doesn't exist, otherwise returns the volunteer's Id
 */
async function findVolunteerIdByEmail(email) {
  const volunteer = await Volunteer.findOne({ email: email }, "_id").exec();

  if (!volunteer) return null;

  return volunteer._id;
}

module.exports = {
  Volunteer,
  addVolunteer,
  getPermissions,
  findVolunteerIdByEmail,
};
