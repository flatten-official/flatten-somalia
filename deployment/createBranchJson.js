const branchName = require("branch-name");
const fs = require("fs");

// Gets the current git branch and writes it to branch.json
branchName.get().then((branchName) => {
  fs.writeFileSync("branch.json", JSON.stringify({ name: branchName }));
});
