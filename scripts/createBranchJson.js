const branchName = require("branch-name");
const fs = require("fs");
const chalk = require("react-dev-utils/chalk");

// Gets the current git branch and writes it to branch.json
branchName
  .get()
  .then((branchName) => {
    fs.writeFileSync("src/branch.json", JSON.stringify({ name: branchName }));
  })
  .catch((e) => {
    chalk.yellow(`Could not determine branch name.\n${e.message}`);
  });
