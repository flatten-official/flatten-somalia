const express = require("express");

const cookieMiddleware = require("./auth/routes/cookieMiddleware");
const protectedMiddleware = require("./utils/express/protectedMiddleware");
const { Permissions } = require("./volunteer/volunteerData");
const loginRoute = require("./auth/routes/loginRoute");
const verifyTokenRoute = require("./auth/routes/verifyTokenRoute");
const logoutRoute = require("./auth/routes/logoutRoute");
const getAuthRoute = require("./auth/routes/getAuthRoute");
const submitInitialRoute = require("./submission/submitInitialRoute");
const submitFollowUpRoute = require("./submission/submitFollowUpRoute");
const submitGetNextRoute = require("./submission/submitGetNextRoute");
const addVolunteerRoute = require("./volunteer/addVolunteerRoute");

const router = express.Router();

/**
 * @api {get} / Check server status
 * @apiName GetStatus
 * @apiGroup Root
 */
router.get("/", (req, res) => {
  res.status(200).send(`Backend-Somalia online (${process.env.ENVIRONMENT})`);
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
router.post("/auth/login", loginRoute); // if you change route name update tests and email

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

router.use(cookieMiddleware);

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

/**
 * @api {delete} /auth/logout Logout from Session
 * @apiName Logout
 * @apiGroup Authentication
 */
router.delete("/auth/logout", logoutRoute);

/**
 * @api {post} /volunteer Add volunteer
 * @apiName AddVolunteer
 * @apiGroup Volunteer
 * @apiDescription Unimplemented
 */
router.post(
  "/volunteer",
  protectedMiddleware([Permissions.manageVolunteers]),
  addVolunteerRoute
);

/**
 * @api {post} /submit/initial Submit the form for a new household
 * @apiName SubmitFormInitial
 * @apiGroup Submissions
 * @apiDescription Unimplemented
 */
router.post(
  "/submit/initial",
  protectedMiddleware([Permissions.submitForms]),
  submitInitialRoute
);

/**
 * @api {post} /submit/followup Submit the form for an existing household from a follow up.
 * @apiName SubmitFormFollowUp
 * @apiGroup Submissions
 * @apiDescription Unimplemented
 */
router.post(
  "/submit/followup",
  protectedMiddleware([Permissions.submitForms]),
  submitFollowUpRoute
);

/**
 * @api {get} /submit/next Get the info about the next follow up that this volunteer should do
 * @apiName GetNextFollowUp
 * @apiGroup Submissions
 * @apiDescription Unimplemented
 */
router.post(
  "/submit/next",
  protectedMiddleware([Permissions.submitForms]),
  submitGetNextRoute
);

module.exports = router;
