const { addVolunteerAndAuthenticate } = require('./volunteerAPI');

module.exports = async (req, res) => {
  console.log(req);
  let [success, message] = await addVolunteerAndAuthenticate(res.locals.volunteer, req.body.data);
  res.send({success, message});
};