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

If you encounter problems when testing on the Atlas databases, try to reproduce the problem in your unit tests.

#### B. Testing on the dev database

The dev database contains a jumble of throw away data that has been collected over time.
This is both an advantage, and a disadvantage - you can find cases that you didn't consider,
but you might also find cases that don't exist in the real data. Either way, ensure your tests
deal with errors elegantly.

The high-level procedure is

1. Make a backup.

2. Run the script on the database.

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

### Make snapshots (backups) before running tests on Atlas

Snapshots allow us to restore the database to a previous state if something tragic happens!

### Be careful and meticulous

In general, be extra careful. If needed, take the time to manually verify the data after running the scripts.

## Develop, test, merge & deploy procedures

This procedure describes end-to-end how to develop, test, merge and deploy a database script.

### Develop

1. Copy `/packages/db-scripts/src/_template` to `packages/db-scripts/src/<SCRIPT-NAME>`.

2. Write the script, unit tests and success tests by filling in the code in your new script directory.

### Test

#### Test locally

Run the unit tests with jest.

#### Test on dev database

1. Create a snapshot of the staging database on Atlas before running your test. Name the snapshot appropriately.
(Clusters -> Staging -> Backup -> Take Snapshot Now)

2. In a `.env` file in the root add the following line:

```
ENVIRONMENT=dev
```

2. Run `yarn script <SCRIPT-NAME>` to run the script and its success tests on the development database.

#### Test on a copy of production

##### Setup the copy database

1. Make a snapshot of the production database. Name appropriately. (Clusters -> Production -> Backup -> Take Snapshot Now).

2. Once the snapshot is created, restore that snapshot to the test cluster.
(Backup -> Restore (for the created snapshot) -> Select the testing project and cluster -> Restore)

3. **Temporarily** whitelist your IP address in Atlas for the testing project.

##### Test the script on the copy database

1. Change `.env` to 

```
ENVIRONMENT=test-db
```

2. Run `yarn script <SCRIPT-NAME>`

### Merge

Make a pull request and clearly indicate what tests you've completed.
You might need to do this before running tests on the test database if you don't have access to the test database.

### Deploy

**Only** once your PR has been *approved but **not** merged*, do the following.
Do this after noon since form submissions have ended for the day.

1. Make a snapshot of the production database. Name appropriately. (Clusters -> Production -> Backup -> Take Snapshot Now).

2. **Temporarily** whitelist your IP address in Atlas for the production project.

3. Change `.env` to 

```
ENVIRONMENT=production
```

4. Run `yarn script <SCRIPT-NAME>`

If all goes well (no errors thrown) then:

- Manually verify that the data "looks right".
- Do a few tests on the system for your own peace of mind.
- Merge the PR (that has already been approved).

If all does not go well (errors where throw):

- Record the errors that you got.
- Restore the database using the snapshot. Since this is done after all forms are submitted you will loose nearly no data.
- Dismiss the pull request approval.
- Start debugging the problem and go through the process again.