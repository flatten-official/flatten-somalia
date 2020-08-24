# Frontend website

This package contains the website.

## Setup

To test this repository you need to run both the frontend (this package) and the [backend](../backend).

1. [Get the backend running locally.](../backend/README.md)

2. Copy the content of `./src/api/backend.dev.js` to a new file called `./src/api/backend.js`

3. To be able to Login ask Arthur, Martin, or Philip-Nicolas to add you to the volunteer staging database.

## Modifying forms

1. Remember to increment the form's version number before altering the form on `master`.
    * Currently, the initial survey's version number is set in `config.js`

2. Summarize the changes in the relevant changelog.
    * Optionally, include the commit which merged the changes to master to help fix issues 
      such as the version number not being incremented
