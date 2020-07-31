const {
  Permissions,
  PermissionGroups,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const db = require("util-db/inMemoryDb");
const { login } = require("../../utils/requests");
const _ = require("lodash");
const { getAllPermissionsExcept } = require("../../utils/permissions");

const TEST_VOLUNTEER = {
  name: "default_name",
  email: "default_email@example.ca",
  teamName: "testTeam",
};

const makeVolunteerRequestBody = (data) => ({
  data: _.defaults(data, TEST_VOLUNTEER),
});

const dummyVolunteers = [
  {
    name: "new_name",
    email: "a1@example.com",
    permissions: [Permissions.access, Permissions.submitForms],
    permissionGroups: [PermissionGroups.dsu],
  },
  {
    name: "new_name2",
    email: "a2@example.com",
    permissions: [Permissions.access, Permissions.submitForms],
    permissionGroups: [PermissionGroups.dsu],
  },
].sort((v) => v.email);

describe("endpoint POST /volunteer", () => {
  let app;

  beforeAll(async () => {
    await db.connect();
    app = await getApp();
  });

  afterEach(() => db.clear());
  afterAll(() => db.close());

  it("should return a correct list of volunteers", async () => {
    const { agent, volunteer: adminVolunteer } = await login(app, [
      Permissions.manageVolunteers,
      Permissions.access,
    ]);

    for (const v of dummyVolunteers) {
      const res = await agent
        .post("/volunteer")
        .send(makeVolunteerRequestBody({ ...v, permSubmitForms: true }));
      expect(res.status).toBe(200);
    }

    const res = await agent.get("/volunteer/list").send({});

    let list = res.body;

    expect(list).toHaveLength(2 + 1);
    list = list
      // remove the admin volunteer
      .filter((v) => v.email !== adminVolunteer.email)
      .sort((v) => v.email)
      .map((v) => ({
        name: v.name,
        email: v.email,
        permissionGroups: v.permissionGroups,
        permissions: v.permissions,
      }));

    expect(dummyVolunteers).toStrictEqual(list);
  });

  it("should fail with 403 for missing permissions", async () => {
    const { agent } = await login(
      app,
      getAllPermissionsExcept(Permissions.manageVolunteers)
    );

    const res = await agent.get("/volunteer/list").send({});

    expect(res.status).toBe(403);
  });
});
