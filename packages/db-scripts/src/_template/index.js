const { log } = require("util-logging");
const expect = require("expect");

// STEP 1.
// If applicable, pass in your data, and any other options to the array.
// This array will automatically be passed as arguments to the run function and the success test function.
const scriptArguments = ["I will get printed"];

// STEP 2.
// Set the prompt to something descriptive. You can even include the data from `arguments`
// A question mark will automatically be appended to the prompt.
const confirmationMessage = `Are you sure you want to print: ${scriptArguments[0]}`;

// eslint-disable-next-line require-await
const run = async (firstParameter) => {
  // STEP 3.
  // Write your script in the run function.
  // This function should be pure, do not access global scope (instead use arguments). (This helps to test).
  // To add or remove arguments modify the scriptArguments array
  // In this case firstParameter = "I will get printed"
  log.info(firstParameter);
};

// eslint-disable-next-line require-await
const successTest = async (firstParameter) => {
  // STEP 4.
  // Write your success test with the expect package
  //
  // For example,
  const consoleOutput = "I will get printed"; // in real life we'd read from console somehow
  expect(consoleOutput).toMatch(firstParameter);
};

module.exports = {
  scriptArguments,
  confirmationMessage,
  run,
  successTest,
};
