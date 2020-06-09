# The Volunteer Form Website

## Prerequisites

- Node

## Setup

1. Run `npm install`

2. Copy the content of `./src/backend/backend.dev.js` to a new file called `./src/backend/backend.js`

3. To be able to Login ask Martin or Arthur to add you to the volunteer staging database.

4. Enable ESLint in your code editor (normally through the ESLint Plugin)

## Running locally

1. Run `npm run start`

## Modifying forms

1. Remember to increment the form's version number before altering the form on `master`.
    * Currently, the initial survey's version number is set in `submission.js`

2. Summarize the changes in the relevant changelog.
    * Optionally, include the commit which merged the changes to master to help fix issues 
      such as the version number not being incremented