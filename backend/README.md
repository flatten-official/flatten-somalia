# Flatten.so backend

<a href="https://codeclimate.com/repos/5eebb93769ce914dc100dcd1/maintainability"><img src="https://api.codeclimate.com/v1/badges/a195459a45a7e562ac07/maintainability" /></a>
<a href="https://codeclimate.com/repos/5eebb93769ce914dc100dcd1/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a195459a45a7e562ac07/test_coverage" /></a>

## Prerequisites

- Latest version of Node10 [here](https://nodejs.org/en/download/releases/).

## Setup

1. Ensure an admin has added you to the `Somalia Staging Data Access` group, otherwise you won't have permission to read the staging database.
Also ask to be added to the Atlas staging project if you want a GUI to navigate the database.

2. Enable ESLint in your IDE (normally a plugin to install). ESLint is a code linter that checks logic and syntax.
ESLint is configured with Prettier to also enforce a standard formatting. 

3. Run `npm install` to install all the required packages.

## Running

1. Run `npm run auth` to login through `gcloud`.

2. Run `npm run dev`. 
Navigate to `localhost` in your browser, you should see a message indicating that the server is running locally.

## Useful commands

## Development

### Using environment variables

Instead of using environment variables, we use `config.js` as it allows for more flexibility.

### Logging

Logging is done using the Winston loggers `req.log` and `log`, with the standard GCP LogEntry [severity levels](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity). 
- `req.log` is for logging related to the current request. Entries from each request will be grouped together in the GCP logs viewer.
- `log` is for everything else. Import from `src/util/winston`.

Log statements with severity `debug` aren't logged in production.

## Additional Tools

The following tools may be very helpful to you, please check them out.

- [Postman](https://www.postman.com/) to test the different API endpoints.  
