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
    teamName: {
      type: String,
      required: true,
      index: true,
    },
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
const findVolunteerById = (volunteerId) =>
  Volunteer.findById(volunteerId).exec(); // exec() required to force return of promise

const volunteerRegex = async (email) => {
  return await Volunteer.find({
    email: { $regex: new RegExp(`^${email}$`), $options: "i" },
  });
};

/**
 * Returns null if volunteer doesn't exist, otherwise returns the volunteer object
 * @return {Promise}
 */
const findVolunteerByEmail = async (email) => {
  const emails = await volunteerRegex(email);
  // we previously returned null, this maintains the behaviour
  return emails[0] ? emails[0] : null;
};

const getVolunteerList = async () => {
  const volunteers = await Volunteer.find({});
  return volunteers.map((v) => ({
    email: v.email,
    name: v.name,
  }));
};

module.exports = {
  Volunteer,
  addVolunteer,
  findVolunteerById,
  volunteerRegex,
  findVolunteerByEmail,
  getVolunteerList,
  getNextFriendlyId,
  Permissions,
};
