const { log } = require("util-logging");

// Set to something descriptive
module.exports.confirmationMessage = "Are you sure you want to run this script";

// Specify the arguments as an array for the run function (normally the data). This will automatically be passed as arguments to the run function.
module.exports.arguments = ["myFirstParameter"];

// Main function. Must be pure, do not access global scope (instead use arguments)
// To add or remove arguments modify the arguments array
// In this case firstParameter = myFirstParameter
// eslint-disable-next-line require-await
module.exports.run = async (firstParameter) => {
  log.debug(firstParameter); // Will print: myFirstParameter
  // TODO fill in with code to run
};

module.exports.successTest = async (firstParameter) => {
  // TODO Write your success test
};
