const { Surveys } = require("util-shared-constants");
const { ApiError } = require("../utils/errors");
const gravediggerRoute = require("./gravedigger/submissionRoute");
const hospitalRoute = require("./hospital/submissionRoute");
const initialHouseholdRoute = require("./initialHousehold/submissionRoute");

const getRoute = (key) => {
  switch (key) {
    case Surveys.gravedigger.key:
      return gravediggerRoute;
    case Surveys.hospital.key:
      return hospitalRoute;
    case Surveys.initialHousehold.key:
      return initialHouseholdRoute;
    default:
      throw new ApiError("Unknown survey key", 400);
  }
};

module.exports = async (req, res) => getRoute(req.params.key)(req, res);
