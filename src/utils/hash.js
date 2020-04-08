const crypto = require("crypto");

const hashingIterations = 100000;

exports.hashPepper = async (to_hash, pepper_secret) => {
    let pepper = await pepper_secret.get();

    let buf = crypto.pbkdf2Sync(
        to_hash,
        pepper,
        hashingIterations,
        64,
        "sha512",
    );
    let hash = buf.toString("hex");
    return hash;
};
