// Simple script that will take the first argument and run the main function in that file
require(process.argv[2])
  .function()
  .then(() => console.log("Done successfully"))
  .catch((e) => console.error(e));
