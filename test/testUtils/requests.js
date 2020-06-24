const {
  addVolunteer,
  Permissions,
} = require("../../src/volunteer/volunteerData");
const { signToken } = require("../../src/utils/jwt");
const supertest = require("supertest");
const _ = require("lodash");

const TEST_VOLUNTEER = {
  name: "default_name",
  email: "default_email@example.ca",
  teamName: "testTeam",
};

const TEST_ADMIN = {
  name: "Dilbert's Boss",
  email: "admin@example.com",
  permissions: [Permissions.manageVolunteers, Permissions.access],
  permissionGroups: [],
};

/**
 * Most importantly returns an agent that stores cookies and can be used to call other endpoints with cookies
 */
const login = async (app, volunteer = {}) => {
  const agent = supertest.agent(app, {});

  volunteer = _.defaults(
    volunteer,
    { email: "default_email2@example.ca" }, // Provide an email to not cause collisions if default is used in test
    TEST_VOLUNTEER
  );

  volunteer = await addVolunteer(volunteer);

  const token = await signToken({ id: volunteer._id }, 10);

  await agent.get("/auth/token?token=" + token);

  return { agent, volunteer };
};

module.exports = {
  TEST_VOLUNTEER,
  TEST_ADMIN,
  login,
};
