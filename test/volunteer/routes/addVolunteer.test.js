const { signToken } = require("../../../src/utils/jwt");
const {
  addVolunteer,
  findVolunteerIdByEmail,
} = require("../../../src/volunteer/volunteerData");

const { getApp } = require("../../../src/app");
const util = require("../../testUtils/mongo");
const supertest = require("supertest");
const { setup } = require("../../../src/index");

let request;

describe("test /auth/token", () => {
  beforeAll(async () => {
    await setup(false);
    await util.connectToDatabase();
    request = supertest(await getApp());
  });

  afterEach(async () => {
    await util.clearDatabase();
    jest.clearAllMocks();
  });
  afterAll(async () => await util.closeDatabase());

  it("should add a volunteer upon valid request", async () => {
    const newVolunteerEmail = "new@gmail.com";

    const adminID = await addVolunteer(
      "admin",
      "irrelevant@gmail.com",
      null,
      true
    );
    const token = await signToken({ id: adminID }, 10);
    const cookie = (await request.get("/auth/token?token=" + token)).headers[
      "set-cookie"
    ];

    const res = await request
      .post("/volunteer/add")
      .set("cookie", cookie)
      .send({
        volunteerData: {
          name: "new",
          email: newVolunteerEmail,
        },
      });

    const newVolunteerID = await findVolunteerIdByEmail(newVolunteerEmail);

    expect(newVolunteerID).not.toBeNull();
    expect(res.status).toBe(200);
  });

  it("should fail with 403 for missing permissions", async () => {
    const newVolunteerEmail = "irrelevant@gmail.com";

    const adminID = await addVolunteer(
      "admin",
      "irrelevant@gmail.com",
      null,
      false
    );
    const token = await signToken({ id: adminID }, 10);
    const cookie = (await request.get("/auth/token?token=" + token)).headers[
      "set-cookie"
    ];

    const res = await request
      .post("/volunteer/add")
      .set("cookie", cookie)
      .send({
        volunteerData: {
          name: "irrelevant",
          email: newVolunteerEmail,
        },
      });

    const newVolunteerID = await findVolunteerIdByEmail(newVolunteerEmail);

    expect(newVolunteerID).toBeNull();
    expect(res.status).toBe(403);
  });

  it("should be unable to create an admin", async () => {
    const newVolunteerEmail = "irrelevant@gmail.com";

    const makerID = await addVolunteer(
      "not admin",
      "irrelevant1@gmail.com",
      null,
      true
    );
    let token = await signToken({ id: makerID }, 10);
    const cookie = (await request.get("/auth/token?token=" + token)).headers[
      "set-cookie"
    ];

    await request
      .post("/volunteer/add")
      .set("cookie", cookie)
      .send({
        volunteerData: {
          name: "irrelevant",
          email: newVolunteerEmail,
          permManageVolunteers: true,
        },
      });

    const newVolunteerID = await findVolunteerIdByEmail(newVolunteerEmail);
    expect(newVolunteerID).not.toBeNull();

    // new volunteer should not be an admin
    token = await signToken({ id: newVolunteerID }, 10);
    let res = await request.get("/auth/token?token=" + token);
    res = await request.get("/auth").set("cookie", res.headers["set-cookie"]);

    expect(res.body["permissions"]).not.toContain("manageVolunteers");
    expect(res.status).toBe(200);
  });

  it("should fail with 401 when no cookie is provided", async () => {
    const newVolunteerEmail = "irrelevant@gmail.com";

    let res = await request.post("/volunteer/add").send({
      volunteerData: {
        name: "irrelevant",
        email: newVolunteerEmail,
      },
    });

    const newVolunteerID = await findVolunteerIdByEmail(newVolunteerEmail);

    expect(newVolunteerID).toBeNull();
    expect(res.status).toBe(401);
  });

  it("should fail with 400 when trying to create a volunteer with an unavailable email address", async () => {
    const newVolunteerEmail = "irrelevant@gmail.com";

    const makerID = await addVolunteer(
      "not admin",
      "irrelevant1@gmail.com",
      null,
      true
    );
    const token = await signToken({ id: makerID }, 10);
    const cookie = (await request.get("/auth/token?token=" + token)).headers[
      "set-cookie"
    ];

    await request
      .post("/volunteer/add")
      .set("cookie", cookie)
      .send({
        volunteerData: {
          name: "irrelevant 1",
          email: newVolunteerEmail,
        },
      });

    const res = await request
      .post("/volunteer/add")
      .set("cookie", cookie)
      .send({
        volunteerData: {
          name: "irrelevant 2",
          email: newVolunteerEmail,
        },
      });

    expect(res.status).toBe(400);
  });
});
