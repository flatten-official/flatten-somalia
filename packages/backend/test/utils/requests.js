const { addVolunteer } = require("../../src/volunteer/volunteerData");
const { signToken } = require("../../src/utils/jwt");
const supertest = require("supertest");
const _ = require("lodash");
const {
  Permissions,
  PermissionGroups,
} = require("../../src/volunteer/volunteerData");

/**
 * Most importantly returns an agent that stores cookies and can be used to call other endpoints with cookies
 */
const login = async (app, volunteer = {}) => {
  const agent = supertest.agent(app, {});

  volunteer = _.defaults(volunteer, {
    name: "default_name",
    email: "default_email2@example.ca",
    teamName: "testTeam",
    permissions: [Permissions.submitForms, Permissions.access],
    permissionGroups: [PermissionGroups.dsu],
  });

  volunteer = await addVolunteer(volunteer);

  const token = await signToken({ id: volunteer._id }, 10);

  await agent.get("/auth/token?token=" + token);

  return { agent, volunteer };
};

module.exports = { login };
