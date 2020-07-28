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
 * @param app the superagent app to make requests
 * @param permissions a list of permissions for the volunteer used during login
 * @param fields for the volunteer used during login, overrides permissions parameter
 */
const login = async (
  app,
  permissions = [Permissions.submitForms, Permissions.access],
  volunteer = {}
) => {
  const agent = supertest.agent(app, {});

  volunteer = _.defaults(volunteer, {
    name: "default_name",
    email: "default_email2@example.ca",
    teamName: "testTeam",
    permissions,
    permissionGroups: [PermissionGroups.dsu],
  });

  volunteer = await addVolunteer(volunteer);

  const token = await signToken({ id: volunteer._id }, 10);

  await agent.get("/auth/token?token=" + token);

  return { agent, volunteer };
};

module.exports = { login };
