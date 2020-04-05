// Import the library and create a client
const kms = require('@google-cloud/kms');
const client = new kms.KeyManagementServiceClient();

createCryptoKey = async (
    keyRingId, // The ID of the keyring that the key is to be stored on.
    cryptoKeyId // Name of the crypto key
) => {
    // The GCP project ID.
    const projectId = process.env.PROJECT_ID;
    // The location of the crypto key's key ring, e.g. "global"
    const locationId = process.env.KEYRING_LOCATION;

    const parent = client.keyRingPath(projectId, locationId, keyRingId);

    // Creates a new key ring
    const [cryptoKey] = await client.createCryptoKey({
        parent,
        cryptoKeyId,
        cryptoKey: {
            // This will allow the API access to the key for encryption and decryption
            purpose: 'ENCRYPT_DECRYPT',
        },
    });
};

encrypt = async (
    keyRingId, // The ID of the keyring that the key is to be stored on.
    cryptoKeyId, // Name of the crypto key
    plaintext // Plaintext to be encrypted
) => {
    // The GCP project ID.
    const projectId = process.env.PROJECT_ID;
    // The location of the crypto key's key ring, e.g. "global"
    const locationId = process.env.KEYRING_LOCATION;

    const name = client.cryptoKeyPath(
        projectId,
        locationId,
        keyRingId,
        cryptoKeyId
    );

    var buf = Buffer.from(plaintext);

    // Encrypts the file using the specified crypto key
    const [result] = await client.encrypt({name: name, plaintext: buf}).catch(console.error);
    return result.ciphertext.toString("base64");
};


decrypt = async (
    keyRingId, // The ID of the keyring that the key is to be stored on.
    cryptoKeyId, // Name of the crypto key, e.g. "my-key"
    ciphertext, // Data to be decrypted, file path or string
    ciphertextFile= false // flag indicating whether a file path is being passed, or a string
) => {
    // The GCP project ID.
    const projectId = process.env.PROJECT_ID;
    // The location of the crypto key's key ring, e.g. "global"
    const locationId = process.env.KEYRING_LOCATION;

    const name = client.cryptoKeyPath(
        projectId,
        locationId,
        keyRingId,
        cryptoKeyId
    );

    var buf;

    if (!ciphertextFile) {
        buf = Buffer.from(ciphertext, "base64");
    } else {
        const fs = require('fs');
        const {promisify} = require('util');
        // Reads the file to be decrypted
        const readFile = promisify(fs.readFile);
        buf = await readFile(ciphertext);
    }

    // Decrypts the file using the specified crypto key
    // const [result] = await client.decrypt({name, buf});
    const [result] = await client.decrypt({name: name, ciphertext: buf});

    return result.plaintext.toString('utf8');
};

class KMSSecret {
    constructor(secret_key, secret_file_path) {
        this.secret = undefined;
        this.secret_key = secret_key;
        this.secret_file_path = secret_file_path;
        this.secret_keyring = process.env.SECRETS_KEYRING;
    }

    async get() {
        await this.load();
        return this.secret;
    }
    async load() {
        if (this.secret === undefined) {
            this.secret = await decrypt(this.secret_keyring, this.secret_key, this.secret_file_path, true);
        }
    }
}

module.exports = {KMSSecret, encrypt, decrypt};
