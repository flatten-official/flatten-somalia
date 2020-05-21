const express = require("express");

const {
  loginRoute,
  verifyTokenRoute,
  cookieParserMiddleware,
} = require("./verification/verificationRoutes");
const { submitHouseholdRoute } = require("./submission/submissionRoutes");
const { addVolunteerRoute } = require("./volunteer/volunteerRoutes");

const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .send(`Flatten.so backend online (${process.env.ENVIRONMENT})`);
});

router.get("/verify/login", loginRoute);
router.get("/verify/token", verifyTokenRoute);

router.use(cookieParserMiddleware);

router.get("/volunteer/add", addVolunteerRoute);

router.get("/submit/household", submitHouseholdRoute);

module.exports = router;
