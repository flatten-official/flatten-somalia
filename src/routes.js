const express = require("express");

const cookieMiddleware = require("./auth/routes/cookieMiddleware");
const protectedMiddleware = require("./utils/express/protectedMiddleware");
const { Permissions } = require("./volunteer/volunteerData");
const loginRoute = require("./auth/routes/loginRoute");
const verifyTokenRoute = require("./auth/routes/verifyTokenRoute");
const logoutRoute = require("./auth/routes/logoutRoute");
const getAuthRoute = require("./auth/routes/getAuthRoute");
const submitInitialRoute = require("./submissionInitial/submitInitialRoute");
const submitGravediggerRoute = require("./surveys/gravedigger/submissionRoute");
const submitHospitalRoute = require("./surveys/hospital/submissionRoute");
const submitFollowUpRoute = require("./submissionInitial/submitFollowUpRoute");
const submitGetNextRoute = require("./submissionInitial/submitGetNextRoute");
const addVolunteerRoute = require("./volunteer/addVolunteerRoute");
const listVolunteersRoute = require("./volunteer/listVolunteersRoute");
const changeAccessRoute = require("./volunteer/changeAccessRoute");
const rootRoute = require("./utils/express/root");

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
 * @apiName AddVolunteer
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
 */
router.post(
  "/volunteer/changeAccess",
  protectedMiddleware([Permissions.manageVolunteers]),
  changeAccessRoute
);

/**
 * @api {post} /submit/initial Submit the form for a new household
 * @apiName SubmitFormInitial
 * @apiGroup Submissions
 *
 * @apiParamExample {json} Request-Example:
 *                  body:
 *                  {
 *                    "schema" : { form: <formName>, version: <formVersion> },
 *                    "metadata": { location: { <location data> }, <timing data...> },
 *                    "people": [{ <form.io data – individuals page> }],
 *                    "deaths": [{ <form.io data – deaths page> }],
 *                    "household": { <form.io data relevant to the household> }
 *                  }
 */
router.post(
  "/submit/initial",
  protectedMiddleware([Permissions.submitForms]),
  submitInitialRoute
);

/**
 * @api {post} /survey/gravedigger Submit a gravedigger survey.
 * @apiName SubmitFormGravedigger
 * @apiGroup Submissions
 *
 * @apiParamExample {json} Request-Example:
 *                  body:
 *                  {
 *                    "schema" : { form: <formName>, version: <formVersion> },
 *                    "metadata": { location: { <location data> }, <timing data...> },
 *                    "data": { <form.io survey data> }
 *                  }
 */
router.post(
  "/survey/gravedigger",
  protectedMiddleware([Permissions.submitForms]),
  submitGravediggerRoute
);

/**
 * @api {post} /survey/hospital Submit a hospital survey.
 * @apiName SubmitFormHospital
 * @apiGroup Submissions
 *
 * @apiParamExample {json} Request-Example:
 *                  body:
 *                  {
 *                    "schema" : { form: <formName>, version: <formVersion> },
 *                    "metadata": { location: { <location data> }, <timing data...> },
 *                    "data": { <form.io survey data> }
 *                  }
 */
router.post(
  "/survey/hospital",
  protectedMiddleware([Permissions.submitForms]),
  submitHospitalRoute
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
