# Tests for Submissions Collection

## Requirements:
- Initial Household form version 1.0.3
- The account you login with must have access to submit Initial Household Surveys
- These are test intended for every record that is sent into the submissions collection
- Every record must pass to these tests, in case of failure contact the DB admin or Martin

## Steps to getting started:
1. Login to initial Flatten's survey portal (https://v.staging.flatten.org)
3. Contact DB admin or Martin if you cannot login
4. Once you login, you need to be able to have access to the Initial Household Survey

## List of Tests

### Test 1:
- If response to share phone number (key 'sharePhoneNumberConsent') is no (value of 'willNotSharePhoneNumber'), then the follow up ID (key 'customFollowUpId') should exist in the json sent to the submissions collection

### Test 2:
- If response to share phone number (key 'sharePhoneNumberConsent') is yes (value of 'consentToSharingPhoneNumber'), then the phone number (key 'phoneNumber') should exist in the json sent to the submissions collection

### Test 3:
- Every 'household' object must contain a 'data' key

### Test 4:
- Every object in 'people' array must contain a 'data' key

### Test 5:
- The following keys MUST exist AND contain a value that is not NULL
- Along with the key is the expected data type it should hold

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
