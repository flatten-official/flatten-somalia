
const kms = require("../utils/kms");


migrateOldUser = async(oldEntity, users) => {

  users["Primary"].form_responses = oldEntity.history;
  // some old IPs were encrypted, some not, so we have to determine.
  // we weren't recording each IP that came in, so we need to only add it to the
  // last submission, as this is the only one that we may have any degree of confidence that actually exists
  let old_ip = oldEntity.ip_address;
  let old_ip_e = oldEntity.ip_encrypted;
  let last = users["Primary"].form_responses.length-1;
  if (!(old_ip === undefined)) {
    users["Primary"].form_responses[last].ip_encrypted = await encryptIp(old_ip)
  } else if (!(old_ip_e === undefined)) {
    users["Primary"].form_responses[last].ip_encrypted = old_ip_e;
  } else {
    console.log("Warning: no ip address found in entity!");
  }

  for(let response of users["Primary"].form_responses) {
    response.schema_ver = "1";
  }

};

submissionToAccount = async (user_profile, form_response, ip) => {
  const timestamp = Date.now();

  const ip_encrypted = await encryptIp(ip);

  user_profile["Primary"].form_responses.push({
    ...form_response,
    timestamp,
    ip_encrypted,
    schema_ver: "2"
  });
};

encryptIp = async (ip) => {
  return await kms.encrypt(
      process.env.SECRETS_KEYRING,
      process.env.IP_KEY,
      ip
  );
};

module.exports = {submissionToAccount, migrateOldUser};
