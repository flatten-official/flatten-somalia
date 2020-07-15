# Scripts

Scripts allow us to run batch operations on our database. Make sure you know what you're doing since scripts can modify the database in unwanted ways.

## Setup

1. Create a `.env` file in this directory with the following content

   ```
   SCRIPT_NAME=<SCRIPT_NAME>
   ENVIRONMENT=dev
   ```

2. Replace `<SCRIPT_NAME>` with the name of the script you wish to run (e.g. `ADD_VOLUNTEER_BULK`).
   Check `scriptPaths.json` for a list all possible script names.

3. Run `yarn start` in this directory to run the script. (Or `yarn workspace db-scripts start` in the root directory).

## Running a script in production

You will need to get a MongoDB URI from Martin to connect to the production database.

1. Same as running your script on staging however your `.env` file should be as follows.

```
SCRIPT_NAME=<SCRIPT_NAME>
ENVIRONMENT=scriptProduction
MONGO_URI=<MONGO_URI_WITH_PASSWORD>
```

2. After running the script :warning: DELETE MONGO_URI :warning:. MONGO_URI gives read and write access to our entire database.

## Create a new script

1. Create a sub-directory with the name of your script.

2. Create a index.js file with the following content in your directory.
   The .js file contains a function `run()` which executes your script.

   ```
   // Set to false if you want to manage setup yourself in run().
   // When true you are automatically connected to the database.
   module.exports.useAutoConfig = true;

   // Set to something descriptive
   module.exports.confirmationMessage = "Are you sure you want to run this script";

   // Specify the arguments as an array for the run function (normally the data). This will automatically be passed as arguments to the run function.
   module.exports.arguments = [];

   // Main function. Must be pure, do not access global scope (instead use arguments)
   module.exports.run = async () => {
     // TODO fill in with code to run
   };
   ```

3. Add your script to `scriptPaths.json`. Pick any unique descriptive name.

4. Create a `unit.test.js` file and write some unit tests. These tests should be pure and use seed data from within the test.directory

5. Write success tests according to `/docs/Database Script Testing Procedure.md` and follow the testing procedures there.