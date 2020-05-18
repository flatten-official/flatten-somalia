const axios = require("axios");
const jwt = require("jsonwebtoken");
const { Secret } = require("./secrets");

const jwt_secret = new Secret(process.env.FORMIO_JWT_SECRET_ID);

class ProjectInfo {
  constructor() {
    this.formio_api_secret = new Secret(process.env.FORMIO_API_KEY_SECRET_ID);

    // TODO - timeout on this info
    this.accessInfo = undefined;
    this.formInfo = undefined;
    this.projectInfo = undefined;
  }

  async sendFormioReq(path) {
    const url = `${process.env.FORMIO_PROJECT_URL}/${path}`;
    const token = await this.formio_api_secret.get();
    try {
      return await axios.get(url, {
        headers: { "x-token": token, "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async getRoleAccessInfo(role) {
    if (this.accessInfo === undefined) {
      let res = await this.sendFormioReq("access");
      this.accessInfo = res ? res.data : undefined;
    }
    return this.accessInfo["roles"][role.toLowerCase()];
  }

  async getFormInfo(form) {
    if (this.formInfo === undefined) {
      let res = await this.sendFormioReq("form");
      this.formInfo = res ? res.data : undefined;
    }
    let forms = this.formInfo.filter((v) => v.name === form);
    return forms.length > 0 ? forms[0] : undefined;
  }

  async getProjectInfo() {
    if (this.projectInfo === undefined) {
      let res = await this.sendFormioReq("");
      this.projectInfo = res ? res.data : undefined;
    }
    return this.projectInfo;
  }

  async existsInResource(resourceName, fieldName, fieldValue) {
    let resource = await this.getFormInfo(resourceName);
    let resourcePath = resource["path"];
    let res = await this.sendFormioReq(
      `${resourcePath}/exists?data.${fieldName}=${fieldValue}`
    );
    return !(res === undefined);
  }
}

async function generateToken(email, formName, roleName) {
  let jwt_key = await jwt_secret.get();

  let project_info = new ProjectInfo();

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

module.exports = { ProjectInfo, generateToken };
