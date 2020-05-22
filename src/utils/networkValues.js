const { calculateExpiryTime } = require("./time");

const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const smClient = new SecretManagerServiceClient();

/**
 * Stores a value that expires after a certain timeout
 *
 * Implementation:
 * this.valuePromise stores a promise that resolve to the value.
 * this.fetch() returns that promise that will eventually resolve to the value.
 * this.valuePromise is set to this.fetch() when we want to fetch the value.
 */
class CachedValue {
  /**
   *
   * @param fetcher method to fetch the value (should return a promise (async function))
   * @param timeoutMinutes in minutes
   * @param shouldPreload whether the value should start fetching on object creation
   */
  constructor(fetcher, timeoutMinutes, shouldPreload) {
    this.fetcher = fetcher;
    this.timeout = timeoutMinutes;
    this.valuePromise = shouldPreload ? this.fetch() : null;
    this.expiryTime = null;
  }

  async fetch() {
    const result = await this.fetcher();
    this.expiryTime = calculateExpiryTime(this.timeout); // Update expiry time
    return result;
  }
  /**
   * Gets the valuePromise
   * @return {Promise<void>}
   */
  async get() {
    // If the valuePromise is undefined or the current time is past the expiry time
    if (!this.valuePromise || Date.now() > this.expiryTime) {
      this.valuePromise = this.fetch(); // Get valuePromise
    }

    return this.valuePromise;
  }
}

/**
 * Stores a GCP makeSecret Manager value
 *
 * Requires you to be authenticated with the gcloud auth application-default login command.
 */

async function readSecret(secret_id) {
  try {
    const [version] = await smClient.accessSecretVersion({ name: secret_id });

    return version.payload.data.toString("utf8");
  } catch (e) {
    console.log(
      `Could not read GCP secret ${secret_id}.
       1. Check that you have the proper permissions.
       2. Run gcloud auth login and gcloud auth application-default login.
       3. Run gcloud config set project PROJECT_ID.`
    );
    console.trace();
    throw e;
  }
}

/**
 * Returns a {CachedValue} that you can call .get() on to get the secret.
 */
const buildSecret = (secret_id, shouldPreload = true) => {
  if (!secret_id) throw Error("No secret_id passed"); // Included because happens often (if env vars are not set)

  return new CachedValue(() => readSecret(secret_id), 60, shouldPreload);
};

module.exports = { buildSecret };
