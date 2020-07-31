const { mongoose } = require("util-db");
const _ = require("lodash");
const { createModel } = require("../utils/mongoose");

// DO NOT MODIFY SCHEMA/MODEL UNLESS YOU KNOW WHAT YOU'RE DOING
const Permissions = {
  manageVolunteers: "manageVolunteers",
  submitForms: "submitForms",
  access: "access", // is the user still enabled (allowed to access the system)
};

// permission groups used to grant ability to modify particular users.
// for the moment, just used to allow enable/suspend accounts
const PermissionGroups = {
  dsu: "dsu",
};

Object.freeze(Permissions);
Object.freeze(PermissionGroups);

const Volunteer = createModel("Volunteer", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true, // Since we search by volunteer email
    unique: true,
    required: true,
    lowercase: true,
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
        enum: Object.values(Permissions),
        required: true,
      },
    ],
    required: true,
  },
  permissionGroups: {
    type: [
      {
        type: String,
        enum: Object.values(PermissionGroups),
      },
    ],
    required: true,
  },
  gender: String, // TODO Make enum
  addedBy: mongoose.ObjectId,
  age: Number,
});

const defaultVolunteer = {
  permissions: [Permissions.submitForms, Permissions.access],
  permissionGroups: [PermissionGroups.dsu],
};

const getNextFriendlyId = async (session) => {
  const largestVolunteer = await Volunteer.find({}, "friendlyId", { session })
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
const addVolunteer = async (newVolunteer, session = undefined) => {
  newVolunteer = _.defaults(
    { friendlyId: await getNextFriendlyId(session) },
    newVolunteer,
    defaultVolunteer
  );

  return new Volunteer(newVolunteer).save({ session }); // TODO Deal with validation errors (e.g. two volunteers with identical emails)
};

/**
 *
 * @param volunteerId
 * @return {Promise}
 */
const findVolunteerById = (volunteerId) =>
  Volunteer.findById(volunteerId).exec(); // exec() required to force return of promise

const volunteerRegexAsync = (email) =>
  Volunteer.find({
    email: { $regex: new RegExp(`^${email}$`), $options: "i" },
  });

/**
 * Returns null if volunteer doesn't exist, otherwise returns the volunteer object
 * @return {Promise}
 */
const findVolunteerByEmail = async (email) => {
  const emails = await volunteerRegexAsync(email);
  // we previously returned null, this maintains the behaviour
  return emails[0] ? emails[0] : null;
};

const getVolunteers = () => Volunteer.find().exec();

const addPermission = async (permissionToAdd, volunteerToUpdate) => {
  if (!volunteerToUpdate.permissions.includes(permissionToAdd)) {
    volunteerToUpdate.permissions.push(permissionToAdd);
    await volunteerToUpdate.save();
  }
  return volunteerToUpdate;
};

const removePermission = async (permissionToRemove, volunteerToUpdate) => {
  if (volunteerToUpdate.permissions.includes(permissionToRemove)) {
    volunteerToUpdate.permissions = volunteerToUpdate.permissions.filter(
      (p) => p !== permissionToRemove
    );
    await volunteerToUpdate.save();
  }

  return volunteerToUpdate;
};

module.exports = {
  Volunteer,
  addVolunteer,
  findVolunteerById,
  volunteerRegexAsync,
  findVolunteerByEmail,
  getVolunteers,
  getNextFriendlyId,
  Permissions,
  PermissionGroups,
  addPermission,
  removePermission,
};
