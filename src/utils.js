/* File to help with loading of secrets form the cloud secrets manager */
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const axios = require('axios');
const smClient = new SecretManagerServiceClient();

class Secret {
  constructor(secret_path) {
    this.secret_path = secret_path;
    this.secret = undefined;
  }

  async get() {
    await this.load();
    return this.secret;
  }
  async load() {
    if (this.secret === undefined) {
      this.secret = await this.accessSecretVersion().catch(console.error);
    }
  }

  async accessSecretVersion() {
    const [version] = await smClient.accessSecretVersion({
      name: this.secret_path
    });

    return version.payload.data.toString("utf8");
  }
}

class Recaptcha {
  constructor() {
    this.secret = new Secret(process.env.RECAPTCHA_SECRET);
  }

  async verifyRecaptcha(reactVerification) {
    let secret = await this.secret.get();
    if (secret === undefined) {
      return [false, "Recaptcha verification failed."];
    }
    const recaptchaResponse = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${reactVerification}`
    );

    if (!recaptchaResponse.data.success) {
      return [false, "Sorry, your recaptcha was invalid"];
    }
    return [true, ""];

  }
}

module.exports = {Secret, Recaptcha};
