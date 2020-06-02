/**
 * DO NOT RUN WITHOUT KNOWING WHAT YOU'RE DOING. MAY BREAK THE DB
 *  This script takes an array of volunteers and adds them to the database
 *
 *  For running in production you need to set MONGO_URI in .env and comment out some lines below
 */

const result = require("dotenv").config();

if (result.error) throw result.error;

const { setup, cleanup } = require("../src/index");
const {
  addVolunteer,
  // Permissions
} = require("../src/volunteer/volunteerData");

// Only comment out these lines for production
// const { Config } = require("./../src/config");
// Config.secrets.mongoUri = process.env.MONGO_URI;
// Config.secretId = null;

const VOLUNTEERS = [
  // Example volunteer
  // {
  //   name: "Mimi",
  //   email: "miraalkabir@gmail.com",
  //   permissions: [Permissions.manageVolunteers, Permissions.submitForms],
  // },
];

const main = async (volunteers) => {
  await setup({ sendGrid: false });

  for (const volunteer of volunteers) {
    await addVolunteer(volunteer);
  }

  await cleanup();
};

main(VOLUNTEERS).then(() => console.log("Done script."));
