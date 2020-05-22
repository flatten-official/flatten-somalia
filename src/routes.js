const express = require("express");

const cookieMiddleware = require("./verification/routes/cookieMiddleware");
const loginRoute = require("./verification/routes/loginRoute");
const verifyTokenRoute = require("./verification/routes/verifyTokenRoute");
const logoutRoute = require("./verification/routes/loginRoute");
const getAuthRoute = require("./verification/routes/getAuthRoute");
const submitFormRoute = require("./submission/submitFormRoute");
const addVolunteerRoute = require("./volunteer/addVolunteerRoute");

const router = express.Router();

/**
 * @api {get} / Check server status
 * @apiName GetStatus
 * @apiGroup Root
 */
router.get("/", (req, res) => {
  res
    .status(200)
    .send(`Flatten.so backend online (${process.env.ENVIRONMENT})`);
});

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Authentication
 *
 * @apiParam {String} email The user's email
 *
 * @apiParamExample {json} Request-Example:
 *                  body:
 *                  {
 *                    "email" : "<Volunteer's-Email>"
 *                  }
 */
router.post("/auth/login", loginRoute);

/**
 * @api {get} /auth/token Verify Token
 * @apiName VerifyToken
 * @apiGroup Authentication
 *
 * @apiParam {String} token The JWT token
 *
 * @apiParamExample {json} Request-Example:
 *                  endpoint : /auth/token/token?jjsfsldfsjhg9384uut4rfn.fsfjsdlfks.fjsdkf223
 */
router.get("/auth/token", verifyTokenRoute);

/**
 * @api {delete} /auth/logout Logout from Session
 * @apiName Logout
 * @apiGroup Authentication
 */
router.delete("/auth/logout", logoutRoute);

/**
 * @api {get} /auth Get Authentication Info
 * @apiName GetAuthInfo
 * @apiGroup Authentication
 *
 * @apiSuccess {String} name The volunteer's name.
 * @apiSuccess {String[]} permissions The volunteer's permissions.
 * @apiSuccess {Number} authExpiry The timestamp representing when the session cookie expires.
 *
 * @apiSuccessExample {json} Response-Example:
 *                    {
 *                      "name" : "Bob",
 *                      "permissions" : ["manageVolunteers", "submitForms"],
 *                      "authExpiry" : 123561351513
 *                    }
 */
router.get("/auth", getAuthRoute);

router.use(cookieMiddleware);

/**
 * @api {post} /volunteer/add Add volunteer
 * @apiName AddVolunteer
 * @apiGroup Volunteer
 * @apiDescription Unimplemented
 */
router.post("/volunteer/add", addVolunteerRoute);

/**
 * @api {post} /submit Submit the form
 * @apiName SubmitForm
 * @apiGroup Submissions
 * @apiDescription Unimplemented
 */
router.post("/submit", submitFormRoute);

module.exports = router;
