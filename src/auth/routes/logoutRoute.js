const { deleteCookie } = require("../cookieData");

module.exports = async (req, res) => {
  const cookieId = req.signedCookies.id;

  if (cookieId) {
    res.cookie("id"); // Remove cookie
    await deleteCookie(cookieId);

    res.sendStatus(204);
    return;
  }

  res.sendStatus(204);
};
