const express = require("express");

const root_route = require("./routes/root");

const router = express.Router();

router.get("/", root_route);

module.exports = router;
