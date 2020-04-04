const requestIp = require("request-ip");
const healthStatus = require("./utils/healthStatus.js");

const form_response_fields = [
    "q1",
    "q2",
    "q3",
    "q4",
    "q5",
    "q6",
    "q7",
    "q8",
    "postalCode"
];

exports.requestToSubmission = function(req) {

    const form_responses = form_response_fields.reduce(
        (obj, field) => ({
            ...obj,
            [field]: req.body[field]
        }),
        {}
    );

    const timestamp = Date.now();
    const submission = {
        timestamp,
        ip_address: requestIp.getClientIp(req),
        at_risk: healthStatus.atRisk(req.body),
        probable: healthStatus.probable(req.body),
        form_responses: {
            ...form_responses,
            timestamp
        }
    };

    return submission;
};