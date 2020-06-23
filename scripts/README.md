# Scripts

Scripts allow us to run batch operations on our database. Make sure you know what you're doing since scripts can modify the database in unwanted ways.

## Initial setup

1. Complete setup steps from the `README.md` in the root directory. This includes running `npm run auth`.

2. Create a `.env` file in the root directory with the following content

   ```
   SCRIPT_NAME=<SCRIPT_NAME>
   ENVIRONMENT=dev
   ```

2. Replace `<SCRIPT_NAME>` with the name of the script you wish to run (e.g. `ADD_VOLUNTEER_BULK`).
   Check `scripts/scriptPaths.json` for a list all possible script names.

3. Run `npm run script`.

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

1. Create a js file with the following content in the `scripts` directory:

   ```
   module.exports.Config = {
   // Set to false if you want to manage setup yourself in run().
   // When true you are automatically connected to the database.
     useAutoSetup: true,
   };
   
   module.exports.getConfirmationMessage = () => {
     return "Are you sure you want to run this script"; // Modify accordingly
   }

   module.exports.run = async () => {
     // TODO fill in with code to run
   };
   ```

2. Add your script to `scripts/scriptPaths.json`. You can pick any unique descriptive name.