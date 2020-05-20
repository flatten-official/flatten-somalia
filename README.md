# Flatten.so backend

## Prerequisites

- Latest version of Node10 [here](https://nodejs.org/en/download/releases/).

## Setup

1. Ensure an admin has added you to the `Somalia Staging Data Access` group, otherwise you won't have permission to read the database.
Also ask to be added to the Atlas staging project if you want a GUI to navigate the database.

2. Create a `.env` file in the root directory where you can set your environment variables. DO NOT commit this file.
Environment variables will be automatically read from this file by the `dotenv` package. You can use `.env.template`
as a starter for your `.env` file.

3. Enable ESLint in your IDE (normally a plugin to install). ESLint is a code linter that checks logic and syntax.
ESLint is configured with Prettier to also enforce a standard formatting. 

4. Run `npm install` to install all the required packages.

## Running

Run `npm run dev` in the root directory to start the project. Then navigate to `localhost` in your browser.
You should see a message indicating that the server is running locally.

## Development

### Using environment variables

Environment variables should not be used for secrets since they are stored on GitHub (in `app.*.yaml`).
When adding environment variables ensure to update `.env.template`, `app.master.yaml` and `app.staging.yaml`.
Finally, **document any changes** in `.env.template`.

## Additional Tools

The following tools may be very helpful to you, please check them out.

- [Postman](https://www.postman.com/) to test the different API endpoints.  
