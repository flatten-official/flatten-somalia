# Somalia Code

<a href="https://codeclimate.com/repos/5eebb93769ce914dc100dcd1/maintainability"><img src="https://api.codeclimate.com/v1/badges/a195459a45a7e562ac07/maintainability" /></a>
<a href="https://codeclimate.com/repos/5eebb93769ce914dc100dcd1/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a195459a45a7e562ac07/test_coverage" /></a>

This repository contains the code used in Somalia (except for frontend which will be merged later).

We use yarn workspaces which all multiple "packages" to exist in the same space.

## Setup

1. Install NodeJS and [Yarn](https://classic.yarnpkg.com/en/docs/install).

2. In the root directory, run `yarn` (or `yarn install`) to install the dependencies.

3. Enable ESLint in your IDE (normally a plugin to install). ESLint is a code linter that checks logic and syntax.
ESLint is configured with Prettier to also enforce a standard formatting.

4. Follow instructions for the specific package you're working in if any (see README's in `packages/`)

## Available commands

- `yarn dev`: Runs the backend server locally

- `yarn lint`: Lists ESLint errors and fixes minor ones

- `yarn cloud-func [PATH]`: Simulates running a cloud function but runs it locally. (e.g. `yarn cloud-func packages/db-copy-function`)

- `yarn auth`: Authenticate with Google and set the project to staging

- `yarn auth-no-browser`: Sometimes authentication fails in the browser, this is a workaround.

- `yarn deploy`: Deploys the backend to the staging servers

- `yarn test`: Runs the jest tests

- `yarn workspace backend doc`: Generates and open the backend api docs

- `depcheck [PATH]`: Check for missing or unused dependencies. (e.g. `depcheck ./packages/backend`)

## Logging

Logging is done using the Winston loggers. Add `util-logging` as a dependency and then use `log`. See code and util-logging package for more info.