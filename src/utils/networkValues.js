const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

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
    try {
      const [version] = await smClient.accessSecretVersion({
        name: secret_id,
      });

      return version.payload.data.toString("utf8");
    } catch (e) {
      console.log(
        `Could not read secret ${secret_id}. Check that you have the proper permissions, and reauthenticate.`
      );
      throw e;
    }
  }
}

module.exports = { Secret };
