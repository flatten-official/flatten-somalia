# Scripts

Documentation relating to scripts.

Make sure you know what you're doing since scripts can modify the database in unwanted ways.

## Running a script on staging

1. Create a .env file with the following content

```
SCRIPT_NAME=<SCRIPT_NAME>
ENVIRONMENT=dev
```

2. Replace `<SCRIPT_NAME>` with one of the possible script names.
   Check `VALID_SCRIPTS` in `scripts/launch.js` to see all possible script names.

3. Run `npm run script`.

## Running a script in production

Same as running your script on staging however your `.env` file should be as follows.

```
SCRIPT_NAME=<SCRIPT_NAME>
ENVIRONMENT=scriptProduction
MONGO_URI=<MONGO_URI_WITH_PASSWORD>
```

If you do not have the Mongo URI, ask Martin for it.

## Create a new script

1. Create a file with the following content in the `scripts` directory:

   ```
   module.exports.Config = {
   // Set to false if you want to manage setup yourself in run().
   // When true you are automatically connected to the database.
     useAutoSetup: true,
   };

   module.exports.run = async () => {
     // TODO fill in with code to run
   };
   ```

2. Add your script to `VALID_SCRIPTS` in `scripts/launch.js`.
