const express = require("express");

const root_route = require("./routes/root");
const verify_route = require("./routes/verification");

const router = express.Router();

router.get("/", root_route);

router.get("/verify_email", verify_route);

module.exports = router;
