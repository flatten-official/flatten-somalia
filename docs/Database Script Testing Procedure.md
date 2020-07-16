# Database script testing procedure

## Over-arching concepts

### Database scripts

All the database scripts exist in the `db-scripts` package.
These scripts are **one-time bulk operations** that transform the data from one state to another.

For example, a script could add a field to every document in a collection.

Since database scripts should only be run once and apply permanent (ish) modifications to the data, it is important they work on their first time.
For this, we complete thorough testing on a test database before running the scripts in production.

### Success test

A key component of our testing procedure is the success test.
The success test is run after the script was run, and verifies that the database is in the expected state.
For example, if a script adds a field to every document in a collection,
a success test would read every document in that collection and verify that they have the new field.

### Three-testing phases

#### A. Local unit tests

Unit tests allow for local and quick testing. These are the first tests you will run.
Unit tests run on an empty in-memory database and usually have the following steps:

1. Populate the empty database with some seed data.

2. Run the script.

3. Run the success test to verify that the script properly applied your modifications.

4. Run additional checks (although consider adding them to the success test).

There should exists multiple unit tests with diverse seed data.

Unit tests should test behaviour for "bad" data, crashes and edge cases.

#### B. Testing on the dev database

The dev database contains a jumble of throw away data that has been collected over time.
This is both an advantage, and a disadvantage - you can find cases that you didn't consider,
but you might also find cases that don't exist in the real data. Either way, ensure your tests
deal with errors elegantly.

The high-level procedure is

1. Make a backup

2. Run the script on the database

3. Run the success test to verify all went well.

#### C. Testing on staging database

The staging database is an exact copy of production. You might not be the one running these tests
depending on your data access rights. This is the final test before applying your script to production.

The high-level procedure is

1. Copy the latest data from production to the test database.

2. Run the script.

3. Run the acceptance test.

## Best practices

### Use Transactions

If your script makes multiple requests, use a transaction to ensure no data is modified upon a error.

### Test for errors and expected failures

Write unit tests to ensure that a failure is handled properly.

### Make snapshots before running tests on Atlas

Snapshots allow us to restore the database to a previous state if something tragic happens!

## Develop, test, merge & deploy procedures

This procedure describes end-to-end how to develop, test, merge and deploy a database script.

### Develop

1. Follow the "Create a new script" instructions in the README of the `db-scripts` package to develop a script. This includes:

   - Write your script
   - Write success tests
   - Write unit tests

2. Write success tests. Success tests will check if the database is in the desired state. They should be run after the script completes.
   Do not include `.test` in the file extension since we don't want Jest to run these tests automatically (since they aren't pure).

3. Add a unit test that runs the success test

### Test locally

### Test on dev

1. Create a snapshot of the staging database before applying your test ().

### Run on

### Run on production
