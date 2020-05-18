/* File to help with loading of secrets form the cloud secrets manager */
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const smClient = new SecretManagerServiceClient();

class Secret {
  constructor(secret_path) {
    this.secret_path = secret_path;
    this.secret = undefined;
  }

  async get() {
    if (this.secret === undefined) {
      this.secret = await this.accessSecretVersion().catch(console.error);
    }

    return this.secret;
  }

  async accessSecretVersion() {
    const [version] = await smClient.accessSecretVersion({
      name: this.secret_path,
    });

    return version.payload.data.toString("utf8");
  }
}

module.exports = { Secret };
