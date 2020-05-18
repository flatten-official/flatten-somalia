const jwt = require("jsonwebtoken");
const { Secret, FormIORoute, sendFormioReq } = require("./fetch");

const jwt_secret = new Secret(process.env.FORMIO_JWT_SECRET_ID);

class FormIoApi {
  constructor() {
    this.accessInfo = new FormIORoute("access");
    this.formInfo = new FormIORoute("form");
    this.projectInfo = new FormIORoute("");
  }

  async getRoleAccessInfo(role) {
    const accessInfo = await this.accessInfo.get();
    return accessInfo ? accessInfo.roles[role.toLowerCase()] : undefined;
  }

  async getFormInfo(form) {
    const formInfo = await this.formInfo.get();
    if (formInfo === undefined) return undefined;
    const forms = formInfo.filter((v) => v.name === form);
    return forms.length > 0 ? forms[0] : undefined;
  }

  async getProjectInfo() {
    return this.projectInfo.get();
  }

  async existsInResource(resourceName, fieldName, fieldValue) {
    let resource = await this.getFormInfo(resourceName);
    if (resource === undefined) return undefined;
    let resourcePath = resource["path"];
    let res = await sendFormioReq(
      `${resourcePath}/exists?data.${fieldName}=${fieldValue}`
    );
    return !(res === undefined);
  }
}

async function generateToken(email, formName, roleName) {
  let jwt_key = await jwt_secret.get();

  let project_info = new FormIoApi();

  let projectId = (await project_info.getProjectInfo())["_id"];
  let formId = (await project_info.getFormInfo(formName))["_id"];
  let roleId = (await project_info.getRoleAccessInfo(roleName))["_id"];
  let roleIdAuthenticated = (
    await project_info.getRoleAccessInfo("authenticated")
  )["_id"];

  let tokenObj = {
    external: true,
    form: {
      _id: formId,
    },
    project: {
      _id: projectId,
    },
    user: {
      _id: "external",
      data: {
        email: email,
      },
      roles: [roleId, roleIdAuthenticated],
    },
  };

  return jwt.sign(tokenObj, jwt_key);
}

const formIoApi = new FormIoApi();

module.exports = { formIoApi, generateToken };
