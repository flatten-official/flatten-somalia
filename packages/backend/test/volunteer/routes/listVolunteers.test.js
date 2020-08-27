const {
  Permissions,
  PermissionGroups,
  addVolunteer,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const db = require("util-db/inMemoryDb");
const { login } = require("../../utils/requests");
const { getAllPermissionsExcept } = require("../../utils/permissions");

const dummyVolunteers = [
  {
    name: "new_name",
    email: "a1@example.com",
    permissions: [Permissions.access, Permissions.submitForms],
    permissionGroups: [PermissionGroups.dsu],
    teamName: "fdsfs",
  },
  {
    name: "new_name2",
    email: "a2@example.com",
    permissions: [Permissions.access, Permissions.submitForms],
    permissionGroups: [PermissionGroups.dsu],
    teamName: "fdsfaer",
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

    for (const v of dummyVolunteers) await addVolunteer(v);

    const res = await agent.get("/volunteer/list");

    let list = res.body;

    expect(list).toHaveLength(2 + 1);

    // remove the admin volunteer
    list = list
      .filter((v) => v.email !== adminVolunteer.email)
      .sort((v) => v.email);

    expect(list).toMatchObject(dummyVolunteers);
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
