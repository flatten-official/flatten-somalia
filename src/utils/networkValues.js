const { calculateExpiryTime } = require("./time");

const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const smClient = new SecretManagerServiceClient();

/**
 * Stores a value that expires after a certain timeout
 */
class CachedValue {
  /**
   *
   * @param fetcher method to fetch value (should return a promise)
   * @param timeout in minutes
   */
  constructor(fetcher, timeout) {
    this.fetcher = fetcher;
    this.timeout = timeout;
    this.value = undefined;
    this.expiryTime = undefined;
  }

  async get() {
    // If the value is undefined or the current time is past the expiry time
    if (!this.value || Date.now() > this.expiryTime) {
      this.value = await this.fetcher(); // Get value
      this.expiryTime = calculateExpiryTime(this.timeout); // Update expiry time
    }

    return this.value;
  }
}

class Secret extends CachedValue {
  constructor(secret_id) {
    super(() => this.readSecret(secret_id), 60);
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
