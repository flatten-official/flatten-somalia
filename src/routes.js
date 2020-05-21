const express = require("express");

const cookieMiddleware = require("./verification/routes/cookieMiddleware");
const loginRoute = require("./verification/routes/loginRoute");
const verifyTokenRoute = require("./verification/routes/verifyTokenRoute");

const submitHouseholdRoute = require("./submission/submitFormRoute");
const addVolunteerRoute = require("./volunteer/addVolunteerRoute");

const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .send(`Flatten.so backend online (${process.env.ENVIRONMENT})`);
});

router.post("/verify/login", loginRoute);
router.get("/verify/token", verifyTokenRoute);

router.use(cookieMiddleware);

router.post("/volunteer/add", addVolunteerRoute);

router.post("/submit/household", submitHouseholdRoute);

module.exports = router;
