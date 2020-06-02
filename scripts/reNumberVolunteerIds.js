/**
 * DO NOT RUN WITHOUT KNOWING WHAT YOU'RE DOING. MAY BREAK THE DB
 * This script resets the volunteer's friendly IDs
 **/
const result = require("dotenv").config();

if (result.error) throw result.error;

const { setup, cleanup } = require("../src/index");
const { Volunteer } = require("../src/volunteer/volunteerData");

const main = async () => {
  await setup({ sendGrid: false });

  let friendlyId = 0;

  (await Volunteer.find()).forEach((volunteer) => {
    volunteer.friendlyId = friendlyId;
    friendlyId++;
    volunteer.save();
  });

  await cleanup();
};

main().then(() => console.log("Done script."));
