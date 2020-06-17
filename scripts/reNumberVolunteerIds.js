/**
 * This script resets the volunteer's friendly IDs. DO NOT RUN as it will break references in the submissions
 **/

const { Volunteer } = require("../src/volunteer/volunteerData");

module.exports.Config = {
  useAutoSetup: true,
};

module.exports.run = async () => {
  let friendlyId = 0;

  (await Volunteer.find()).forEach((volunteer) => {
    volunteer.friendlyId = friendlyId;
    friendlyId++;
    volunteer.save();
  });
};
