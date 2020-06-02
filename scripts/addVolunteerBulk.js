/**
 * DO NOT RUN WITHOUT KNOWING WHAT YOU'RE DOING. MAY BREAK THE DB
 *  This script takes an array of volunteers and adds them to the database
 *
 *  For running in production you need to set MONGO_URI in .env and comment out some lines below
 */

process.env.ENVIRONMENT = "dev";

const { setup, cleanup } = require("../src/index");
const {
  addVolunteer,
  // Permissions
} = require("../src/volunteer/volunteerData");

const VOLUNTEERS = [
  // Example volunteer
  // {
  //   name: "Mimi",
  //   email: "miraalkabir@gmail.com",
  //   permissions: [Permissions.manageVolunteers, Permissions.submitForms],
  // },
];

const main = async (volunteers) => {
  // Only comment out these lines for production
  await setup({
    database: true,
    // customConfig: {
    //   secretId: null,
    //   secrets: {
    //     mongoUri: "customURIToFillIn",
    //   },
    // },
  });

  for (const volunteer of volunteers) {
    await addVolunteer(volunteer);
  }

  await cleanup();
};

main(VOLUNTEERS).then(() => console.log("Done script."));
