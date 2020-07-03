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
3. Run `npm run auth` for both repos to authenticate yourself with a valid account that has access to the staging environments.
4. Run `npm run deploy` to deploy the target frontend & backend branches to access the staging environments:
    * Frontend: [v.staging.flatten.org](https://v.staging.flatten.org/).
    * Backend: [api.staging.flatten.org](https://api.staging.flatten.org/).
5. Log into [v.staging.flatten.org](https://v.staging.flatten.org/) using an account with sufficient permissions to access the features to be tested.

## Localization

### Test 1

* For all components that you modified, ensure that all text displays properly both in English and Somali.

form.io components must be reloaded for translations to show. You don't need to reload the page, just navigate to another survey page and back.

## form.io

### Functionality

After creating/altering form.io components:

* **Editable Components**:
    * If there's a mask (e.g. phone number), verify that it works.
* **Selectable Components**: Click through *every* option.
    * Options should render as expected in their data types. examples below:
        * radio
        * select
        * checkbox
    * Options should be selectable
    * Check for multiple options being selected when not a checkbox

## Data Validation

These tests are intended for *every* record written to the DB as a result of each submission.

How to validate data manually:
1. Log into [cloud.mongodb.com](https://cloud.mongodb.com/)
2. Select `Flatten` as your organization
3. Select `Somalia Staging Data` as the project
4. Select `Staging` cluster
4. Navigate to `Collections` tab
5. Select the desired collection under the database name `test`


### Initial Household Survey Tests

* Followup Method
    * If `sharePhoneNumberConsent` is no (value of `"willNotSharePhoneNumber"`), follow up ID (key `customFollowUpId`) should exist.
    * If `sharePhoneNumberConsent` is yes (value of `"consentToSharingPhoneNumber"`), the phone number (key `phoneNumber`) should exist.

* References
    * Every `household` object must contain a `data` key.
    * Every object in the `people` array must contain a `data` key.

* Additional fields
    * The following keys *must* exist *and* contain a value of the specified type.


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

* Adding household record to household collection
    * Every initial household survey must add its household data to the household collection with the following keys and data type specified below:

```
{
    _id: ObjectId,
    followUpId: String,
    email: String,
}
```

* Adding people records to people collection
    * Every initial household survey must add its data from the people array to the people collection with the following keys and data type specified below:
    * Note: every person in the people array must be added as their own record into the people collection

```
{
    _id: ObjectId,
    household: ObjectId,
    alive: Boolean
}
```


