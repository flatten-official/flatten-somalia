const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const axios = require("axios");

const smClient = new SecretManagerServiceClient();

/**
 * Stores a value that expires after a certain timeout
 */
class CachedValue {
  /**
   *
   * @param fetcher method to fetch value
   * @param timeout in seconds
   */
  constructor(fetcher, timeout) {
    this.fetcher = fetcher;
    this.timeout = timeout;
    this.value = undefined;
    this.lastFetch = undefined;
  }

  getTime() {
    return Date.now() / 1000;
  }

  getExpiryTime() {
    return this.lastFetch ? this.lastFetch + this.timeout : -1;
  }

  async get() {
    const now = this.getTime();

    if (!this.value || this.getExpiryTime() > now) {
      this.value = await this.fetcher();
      this.lastFetch = now;
    }

    return this.value;
  }
}

class Secret extends CachedValue {
  constructor(secret_id) {
    super(() => this.readSecret(secret_id), 3600);
  }

  async readSecret(secret_id) {
    const [version] = await smClient.accessSecretVersion({
      name: secret_id,
    });

    return version.payload.data.toString("utf8");
  }
}

const formio_api_secret = new Secret(process.env.FORMIO_API_KEY_SECRET_ID);

class FormIORoute extends CachedValue {
  constructor(path) {
    super(async () => {
      const res = await sendFormioReq(path);
      return res ? res.data : undefined;
    }, 600);
  }
}

const sendFormioReq = async (path) => {
  const url = `${process.env.FORMIO_PROJECT_URL}/${path}`;
  const token = await formio_api_secret.get();
  console.log(url);
  try {
    return await axios.get(url, {
      headers: { "x-token": token, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

module.exports = { CachedValue, Secret, FormIORoute, sendFormioReq };
