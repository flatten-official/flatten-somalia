const requestIp = require("request-ip");

const kms = require("../utils/kms");


migrateOldUserSubmissions = async(old_entity, users) => {

  users["Primary"].form_responses = old_entity.form_responses;
  // some old IPs were encrypted, some not, so we have to determine.
  // we weren't recording each IP that came in, so we need to only add it to the
  // last submission, as this is the only one that we may have any degree of confidence that actually exists
  let old_ip = old_entity.ip_address;
  let old_ip_e = old_entity.ip_encrypted;
  if (!(old_ip === undefined)) {
    users["Primary"].form_responses[-1].ip_encrypted = await encryptIp(old_ip)
  } else if (!(old_ip_e === undefined)) {
    users["Primary"].form_responses[-1].ip_encrypted = old_ip_e;
  }

};

requestToSubmission = async (user_profile, form_response, ip) => {
  const timestamp = Date.now();

  const ip_encrypted = await encryptIp(ip);

  user_profile["Primary"].form_responses.push({
      ...form_response,
      timestamp,
      ip_encrypted
  });
};

encryptIp = async (ip) => {
  data.ip_encrypted = await kms.encrypt(
      process.env.SECRETS_KEYRING,
      process.env.IP_KEY,
      ip
  );
};

module.exports = {requestToSubmission, migrateOldUser};
