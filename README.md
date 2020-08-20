# Somalia Code

<a href="https://codeclimate.com/repos/5eebb93769ce914dc100dcd1/maintainability"><img src="https://api.codeclimate.com/v1/badges/a195459a45a7e562ac07/maintainability" /></a>
<a href="https://codeclimate.com/repos/5eebb93769ce914dc100dcd1/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a195459a45a7e562ac07/test_coverage" /></a>

This repository contains the code used in Somalia.

We use yarn workspaces which allow multiple "packages" to exist in the same repository.

## Setup

1. Install NodeJS and [Yarn](https://classic.yarnpkg.com/en/docs/install).

2. In the root directory, run `yarn` (or `yarn install`) to install the dependencies.

3. Enable ESLint in your IDE (normally a plugin to install). ESLint is a code linter that checks logic, syntax & formatting.

4. Follow instructions for the specific package you're working in if any (see README's in `packages/`)

## Available commands

- `yarn auth`: Authenticate with Google and set the project to staging. Required to run the backend server.

- `yarn dev`: Runs the backend server & frontend website locally. Also exists `yarn dev-backend` and `yarn dev-frontend` for running only one of the two.

- `yarn lint`: Lists ESLint errors and fixes minor ones.

- `yarn test-cloud-func [PATH]`: Simulates running a cloud function but runs it locally. (e.g. `yarn cloud-func packages/db-copy-function`)

- `yarn deploy-both`: Deploys the backend & frontend to the staging servers. Also exists `yarn deploy-backend` & `yarn deploy-frontend`.

- `yarn test`: Runs the jest tests

- `yarn workspace backend doc`: Generates and open the backend api docs

- `yarn depcheck`: Check for missing or unused dependencies in all packages.

- `yarn script <SCRIPT-NAME>`: Runs a database script from the `db-scripts` package. `<SCRIPT-NAME>` is the name of the script's directory in `packages/db-scripts/src/`.

- `yarn build-frontend`: Builds the frontend as it would be when it's deployed.

- `yarn serve-frontend`: Can be run after `yarn build-frontend` to serve the build on `localhost`.

## Technical details

### Testing

If you run into issues while testing try adding the following line to your `.env` file.

```
DISABLE_TRANSACTIONS=true
```

This will change the type of mongoDB server used during the test.

### Logging

Logging is done using the Winston loggers. Add `util-logging` as a dependency and then use `log`. See code and util-logging package for more info.

### Mongoose

We use MongoDB and mongoose. To avoid two packages using different versions of mongoose
(and hence one of the two not being connected to the db), all packages using mongoose should depend on `db-util` and not `mongoose`.
`db-util` exports `mongoose` so always use:

```
const { mongoose } = require("db-util");
```

### Error handling

We have 2 custom API error handlers that you should be aware of when writing API routes.

The first, will catch any error that are instances of `ApiError`. `ApiError` is a custom class specific to our project.
You are encouraged to use it to respond to API requests with an error code. For example,
```
const ApiError = require("./utils/errors");

...

throw new ApiError('the error message to show the user', 401); // will result in the user receiving a 401 error with the specified message
```

The second error handler will catch any caught errors and send the client a generic "Contact Flatten support, an unplanned error occurred".
This error handler should only be used for unplanned/uncaught errors.
