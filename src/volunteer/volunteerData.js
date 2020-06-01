const mongoose = require("mongoose");
const _ = require("lodash");

// DO NOT MODIFY SCHEMA/MODEL UNLESS YOU KNOW WHAT YOU'RE DOING
const Permissions = {
  manageVolunteers: "manageVolunteers",
  submitForms: "submitForms",
};

Object.freeze(Permissions);

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
    teamName: String,
    friendlyId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    permissions: {
      type: [
        {
          type: String,
          enum: [Permissions.manageVolunteers, Permissions.submitForms],
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

const defaultVolunteer = {
  permissions: [Permissions.submitForms],
};

const getNextFriendlyId = async () => {
  const all = await Volunteer.find();
  console.log(all.toString());
  const largestVolunteer = await Volunteer.find({}, "friendlyId")
    .sort({ friendlyId: -1 })
    .limit(1);
  if (largestVolunteer.length === 0 || !largestVolunteer[0].friendlyId)
    return 1;
  else return largestVolunteer[0].friendlyId + 1;
};

/**
 * Adds a volunteer to the database
 * @return {Promise<*>} the volunteer
 */
const addVolunteer = async (newVolunteer) => {
  newVolunteer = _.defaults(
    { friendlyId: await getNextFriendlyId() },
    newVolunteer,
    defaultVolunteer
  );

  return new Volunteer(newVolunteer).save(); // TODO Deal with validation errors (e.g. two volunteers with identical emails)
};

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
  getNextFriendlyId,
  Permissions,
};
