# Manual Integration Tests
## FLATTEN SO

After making frontend or backend changes, refer to the relevant sections here to comprehensively test your work.

## General Guidelines

These items should be considered while testing any section.

## Setting up
1. Clone the frontend & backend repos:
    * Frontend: https://github.com/flatten-official/flatten-volunteer
    * Backend: https://github.com/flatten-official/backend-so
2. Run `npm install` for both repos to install package dependencies.
3. Run `npm run auth` on the backend to authenticate yourself with a valid account that has access to the staging environments.
4. Run `npm run deploy` to deploy the target frontend & backend branches to access the staging environments:
    * Frontend: [v.staging.flatten.org](https://v.staging.flatten.org/).
    * Backend: [api.staging.flatten.org](https://api.staging.flatten.org/).
5. Log into [v.staging.flatten.org](https://v.staging.flatten.org/) using an account with sufficient permissions to access the features to be tested.

## Localization

#### 1. Components using localization
For new or modified site or form* components.

-[ ] Text displays properly in English.
-[ ] Text displays properly in Somali.

#### 2. Changes to localization system

-[ ] Localization works as expected in basic site pages.
    -[ ] Switching language works as expected.
    -[ ] Text displays properly in English.
    -[ ] Text displays properly in Somali.
-[ ] Localization works as expected in forms.
    -[ ] Switching language works as expected*.
    -[ ] Text displays properly in English.
    -[ ] Text displays properly in Somali.

*form.io components must be reloaded for translations to show. You don't need to reload the page, just navigate to another survey page and back.

## form.io functionality

#### 1. New or modified form.io components

-[ ] Ensure validation works as expected when attempting to continue the survey without filling out the component.

#### 2. Editable components
Text fields, number fields, emails, phone numbers, and more.

* Verify that formatting masks work as expected, for emails and phone numbers for example.
    -[ ] A valid answer is accepted.
    -[ ] Invalid answers are rejected or blocked. 
* For numerical fields, ensure input ranges work properly (if necessary).
    -[ ] Answers 1 below the lower bound are rejected.
    -[ ] Answers 1 above the upper bound are rejected.
    -[ ] Answers on the lower bound are accepted.
    -[ ] Answers on the upper bound are accepted.

#### 3. Selectable components
Radio, checkbox, and select dropdowns.
-[ ] Ensure every option renders properly by counting available options.
-[ ] Ensure every option is selectable by clicking through each one

#### 4. Conditional components

Run this test after making changes to keys or adding conditional components.

-[ ] Verify that all conditional components only appear when expected.
-[ ] Ensure the component works as expected when it appears.

## Data Validation

These tests are intended for *every* record written to the DB as a result of each submission.

### Setup

1. Submit the relevant surveys required to complete the following tests.
2. Log into [cloud.mongodb.com](https://cloud.mongodb.com/)
3. Select `Flatten` as your organization.
4. Select `Somalia Staging Data` as the project.
5. Select `Staging` cluster.
6. Navigate to `Collections` tab.
7. Select the desired collection under the database name `test`.


### Initial Household Survey Tests

#### 1. Followup Method
-[ ] A `submission` document with `sharePhoneNumberConsent = "no"` contains a follow-up ID (key `customFollowUpId`).
-[ ] A `submission` document with `sharePhoneNumberConsent = "yes"` contains a phone number (key `phoneNumber`).

#### 2. References
-[ ] Every `submission` document must contain a `household.data` key.
-[ ] Every element of the `people` array in a `submission` document must contain a `data` key.

#### 3. Additional fields

**When to run test?**

- Modifications to backend submission route
- Modifications to backend middleware
- Modifications to frontend form
- Modifications to frontend metadata

**Test**

-[ ] The resulting records must conform to the schema described below. 

The following keys *must* exist *and* contain a value of the specified type.

```
{
    _id: ObjectId,
    addedBy: ObjectId,
    teamName: String,
    submissionSchema: {
        form: String,
        version: String
    },
    metadata: {
        consentGiven: Boolean,
        uploadTimestamp: Date,
        timeToComplete: Integer,
        location: {
            lat: Float,
            lng: Float,
            wasManual: Boolean
        }
    },
    followUp: {
        inProgress: Boolean
    },
    household: {
        ref: ObjectId,
    }
}
```

* Adding household record to household collection:
    -[ ] Every Household document associated with the submission conforms to the following schema:

```
{
    _id: ObjectId,
    followUpId: String,
    email: String,
}
```

* Adding people records to people collection:
    -[ ] Every individual associated with a submission is added as a document in the People collection. 
    -[ ] Every People document associated with the submission conforms to the following schema:

```
{
    _id: ObjectId,
    household: ObjectId,
    alive: Boolean
}
```