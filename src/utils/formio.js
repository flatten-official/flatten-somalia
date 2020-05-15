const axios = require("axios");
const jwt = require("jsonwebtoken");
const { loadConfig } = require("./config");

let secrets = require("./secrets");

const config = loadConfig();

let jwt_secret = new secrets.Secret(config.formio_jwt_secret);

class ProjectInfo {
  constructor() {
    this.formio_api_secret = new secrets.Secret(config.formio_api_secret);

    this.accessInfo = undefined;
    this.formInfo = undefined;
    this.projectInfo = undefined;
  }

  async sendFormioReq(path) {
    let url = `https://${config.formio_project_url}/${path}`;
    let token = await this.formio_api_secret.get();
    try {
      let res = await axios.get(url, {
        headers: { "x-token": token, "Content-Type": "application/json" },
      });
      return res;
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
    let formInfo = forms.length > 0 ? forms[0] : undefined;

    return formInfo;
  }

  async getProjectInfo() {
    if (this.projectInfo === undefined) {
      let res = await this.sendFormioReq("");
      this.projectInfo = res ? res.data : undefined;
    }
    return this.projectInfo;
  }
}

var project_info = new ProjectInfo();

async function generateToken(email, formName, roleName) {
  let jwt_key = await jwt_secret.get();

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

  let token = jwt.sign(tokenObj, jwt_key);

  return token;
};

module.exports = { generateToken };
