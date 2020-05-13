const axios = require("axios");

API_URL=process.env.API_URL;
FORMIO_TOKEN=process.env.FORMIO_TOKEN;
REQUEST_TOKEN=process.env.REQUEST_TOKEN;
USER_RESOURCE_NAME=process.env.USER_RESOURCE_NAME;


exports.authenticateLogin = (req, res) => {
  if (!(req.headers.token === REQUEST_TOKEN)) {
      res.status(401).send("404 Forbidden.");
  }
  let url = `${API_URL}/${USER_RESOURCE_NAME}/exists?data.email=${req.query.email}`
  axios({
    url: url,
    method: 'get',
    headers: { 'x-token': FORMIO_TOKEN, 'Content-Type': 'application/json'},
    data: {
    }
  }).then((response)=>{
        res.sendStatus(200);
    }
  ).catch((e)=>{
      // TODO - change this so that the failure is silent - this is a security hole.
      res.status(401).send('No email sent: please contact an admin to obtain access.');
    });
};