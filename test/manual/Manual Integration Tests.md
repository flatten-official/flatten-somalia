# Manual Integration Tests
## FLATTEN SO

After making frontend or backend changes, refer to the relevant sections here to comprehensively test your work.

## General Guidelines

These items should be considered while testing any section.

## Setting up
1. Run `npm run deploy` to deploy the target frontent & backend branches to the staging environment.
    * Frontend: [v.staging.flatten.org](https://v.staging.flatten.org/).
    * Backend: [api.staging.flatten.org](https://api.staging.flatten.org/).
2. Log in using an account with sufficient permissions to access the features to be tested.


## Localization

* Ensure that all text displays properly both in English and Somali.

form.io components must be reloaded for translations to show. You don't need to reload the page, just navigate to another survey page and back.

## form.io

### Functionality

After creating/altering components:

* **Selectable Components**: Click through *every* option.
    * Options should render properly.
    * Un-selectable options / one click selects many options: symptoms of key problems.

## Data Validation

These tests are intended for *every* record written to the DB as a result of each submission.

### Initial Household Survey

* Followup Method
    * If `sharePhoneNumberConsent` is no, (TODO clarify value), follow up ID (key `customFollowUpId`) should exist.
    * If `sharePhoneNumberConsent` is yes, (TODO clarify value),  the phone number (key `phoneNumber`) should exist.

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
