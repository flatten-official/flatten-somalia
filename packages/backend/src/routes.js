const express = require("express");

const protectedMiddleware = require("./utils/express/protectedMiddleware");
const { Permissions } = require("./volunteer/volunteerData");
const loginRoute = require("./auth/routes/loginRoute");
const verifyTokenRoute = require("./auth/routes/verifyTokenRoute");
const logoutRoute = require("./auth/routes/logoutRoute");
const getAuthRoute = require("./auth/routes/getAuthRoute");
const surveyRouteSplitter = require("./surveys/surveyRouteSplitter");
const addVolunteerRoute = require("./volunteer/addVolunteerRoute");
const listVolunteersRoute = require("./volunteer/listVolunteersRoute");
const changeAccessRoute = require("./volunteer/changeAccessRoute");
const rootRoute = require("./utils/express/root");
const surveyErrorHandler = require("./surveys/surveyErrorHandler");

const router = express.Router();

/**
 * @api {get} / Check server status
 * @apiName GetStatus
 * @apiGroup Root
 */
router.get("/", rootRoute);

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

// All following routes require access permissions
router.use(protectedMiddleware([Permissions.access]));
// PRIVATE ROUTES BELOW

/**
 * @api {post} /volunteer Add volunteer
 * @apiName AddVolunteer
 * @apiGroup Volunteer
 */
router.post(
  "/volunteer",
  protectedMiddleware([Permissions.manageVolunteers]),
  addVolunteerRoute
);

/**
 * @api {get} /volunteer/list List volunteers
 * @apiName ListVolunteers
 * @apiGroup Volunteer
 */
router.get(
  "/volunteer/list",
  protectedMiddleware([Permissions.manageVolunteers]),
  listVolunteersRoute
);

/**
 * @api {post} /volunteer/changeAccess Activate and deactivate volunteers
 * @apiName ChangeAccess
 * @apiGroup Volunteer
 * @apiParamExample {json} Request-Example:
 *                  body:
 *                  {
 *                    "volunteerId" : <volunteerId>,
 *                    "access": <true or false>,
 *                  }
 */
router.post(
  "/volunteer/changeAccess",
  protectedMiddleware([Permissions.manageVolunteers]),
  changeAccessRoute
);

/**
 * @api {post} /survey/:key Submit a survey with the specified key
 * @apiName SubmitSurvey
 * @apiGroup Submissions
 *
 * @apiParamExample {json} Request-Example:
 *                  body:
 *                  {
 *                    "schema" : { form: <formName>, version: <formVersion> },
 *                    "metadata": { location: { <location data> }, <timing data...> },
 *                    ...otherData
 *                  }
 */
router.post(
  "/survey/:key",
  protectedMiddleware([Permissions.submitForms]),
  surveyRouteSplitter,
  surveyErrorHandler
);

module.exports = router;
