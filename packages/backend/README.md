# Flatten.so backend

## Prerequisites

* [node.js](https://nodejs.org/)
  * using [nvm](https://github.com/nvm-sh/nvm) to manage your Node installation(s) is recommended.
* [yarn](https://yarnpkg.com/) – package manager
* [gcloud](https://cloud.google.com/sdk/docs/downloads-interactive) – google cloud SDK

## Setup

1. Ensure an admin has added you to the `Somalia Staging Data Access` group, otherwise you won't have permission to read the staging database.
Also ask to be added to the Atlas staging project if you want a GUI to navigate the database.

## Running

1. Run `yarn auth` to allow your computer to access the staging database and other secrets.

2. Run `yarn dev`.

3. Navigate to `localhost` in your browser, you should see a message indicating that the server is running locally.

### Using environment variables

For environment variables that are shared across multiple people / systems or are a common setup,
use `config.js` as it allows for more flexibility.

If an environment variable is specific to you only and should not be commited (e.g. PORT), specify it in `packages/backend/.env`.

## Additional Tools

The following tools may be very helpful to you, please check them out.

- [Postman](https://www.postman.com/) to test the different API endpoints.  
