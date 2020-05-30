/**
 * DO NOT RUN WITHOUT KNOWING WHAT YOU'RE DOING. MAY BREAK THE DB
 *  This script takes an array of volunteers and adds them to the database
 */
const result = require("dotenv").config();

if (result.error) throw result.error;

const { setup, cleanup } = require("../src/index");
const { addVolunteer } = require("../src/volunteer/volunteerData");

const VOLUNTEERS = [
  // Example volunteer
  // {
  //   name: "Mimi",
  //   email: "miraalkabir@gmail.com",
  // },
];

const main = async (volunteers) => {
  await setup();

  for (const volunteer of volunteers) {
    await addVolunteer(volunteer);
  }

  await cleanup();
};

main(VOLUNTEERS).then(() => console.log("Done script."));
