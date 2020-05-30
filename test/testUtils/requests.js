const { addVolunteer } = require("../../src/volunteer/volunteerData");
const { signToken } = require("../../src/utils/jwt");
const supertest = require("supertest");

/**
 * Most importantly returns an agent that stores cookies and can be used to call other endpoints with cookies
 */
module.exports.login = async (
  app,
  volunteerName = "name",
  volunteerEmail = "test@example.ca",
  manageVolunteers = false
) => {
  const agent = supertest.agent(app, {});

  const volunteer = await addVolunteer(
    volunteerName,
    volunteerEmail,
    null,
    manageVolunteers
  );

  const token = await signToken({ id: volunteer._id }, 10);

  await agent.get("/auth/token?token=" + token);

  return { agent, volunteer };
};
