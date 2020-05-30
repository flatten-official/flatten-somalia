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
    gender: String, // TODO Make enum
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
 * @return {Promise<*>} the volunteer
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
  const permissions = [];
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
  return volunteer;
}

/**
 *
 * @param volunteerId
 * @return {Promise}
 */
const findVolunteerById = (volunteerId) => Volunteer.findById(volunteerId);

/**
 * Returns null if volunteer doesn't exist, otherwise returns the volunteer object
 * @return {Promise}
 */
const findVolunteerByEmail = (email) => Volunteer.findOne({ email: email });

module.exports = {
  Volunteer,
  addVolunteer,
  findVolunteerById,
  findVolunteerByEmail,
};
