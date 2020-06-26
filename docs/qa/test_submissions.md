# Tests for Submissions collection
These are test intended for every record that is sent into the submissions collection. Every record must conform to these tests.

### Test 1
If response to share phone number (key 'sharePhoneNumberConsent') is no (value of 'willNotSharePhoneNumber') then the follow up ID (key 'customFollowUpId') should exist in the json sent to the submissions collection

### Test 2
If response to share phone number (key 'sharePhoneNumberConsent') is yes (value of 'consentToSharingPhoneNumber') then the phone number (key 'phoneNumber') should exist in the json sent to the submissions collection

### Test 3
Every 'household' object must contain a 'data' key

### Test 4
Every object in 'people' array must contain a 'data' key
