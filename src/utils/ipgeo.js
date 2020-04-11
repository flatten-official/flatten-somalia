const axios = require('axios');
const secrets = require("./secrets");


var ip_geo_url = "https://api.ipgeolocation.io/ipgeo";
var ip_geo_secret = new secrets.Secret(process.env.IPGEO_SECRET);

ipgeo = async (request_ip) => {
  let api_key = await ip_geo_secret.get();
  let locale = "en";

  let res;
  try {
    res = await axios.get(`${ip_geo_url}?apiKey=${api_key}&ip=${request_ip}`);
  } catch(e) {
    console.log("Failed to request ip geo info");
    return {locale};
  }

  if ('country_name' in res.data) {
    try {
      if (res.data.country_name === "United States") {
        locale = "enUS";
      } else if (res.data.state_prov === "Quebec") {
        locale = "fr";
      }
    } catch(e) {
      console.log("Failed to retrieve country name from IP geo info");
    }
  }
  return {
    locale
  }

};

module.exports = ipgeo;