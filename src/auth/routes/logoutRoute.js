const { deleteCookie } = require("../cookieData");

module.exports = async (req, res) => {
  const cookieId = req.signedCookies.id;

  if (cookieId) {
    res.cookie("id"); // Remove cookie
    await deleteCookie(cookieId);

    res.sendStatus(204);
    req.log.info("Successfully logged out.", { status: 204 });
    return;
  }
  // TODO improve status code
  res.sendStatus(204);
  req.log.info("Did nothing.", { status: 204 });
};
