const { log } = require("util-logging");

let branchName;

try {
  branchName = require("../../../../../branch.json").name;
} catch (e) {
  branchName = "unspecified";
}

module.exports = (req, res) => {
  log.info(`Success.`, { status: 200 });
  res
    .status(200)
    .send(
      `Somalia backend online. Environment: ${process.env.ENVIRONMENT}. Branch: ${branchName}`
    );
};
