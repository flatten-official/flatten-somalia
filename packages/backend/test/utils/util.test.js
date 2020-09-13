const { getAllPermissionsExcept } = require("./permissions");
const { Permissions } = require("util-shared-constants");

describe("utilities test", () => {
  it("verify that allPermissionsExcept works", () => {
    const allExcept = getAllPermissionsExcept(Permissions.access);

    for (const permission of Object.values(Permissions)) {
      if (permission !== Permissions.access)
        expect(allExcept).toContain(permission);
    }

    expect(allExcept).not.toContain(Permissions.access);
  });
});
