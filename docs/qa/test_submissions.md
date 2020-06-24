# Tests for Submissions collection

### Test 1
If response to share phone number (key 'sharePhoneNumberConsent') is no (value of 'willNotSharePhoneNumber') then the follow up ID (key 'customFollowUpId') should exist in the json sent to the submissions collection

### Test 2
If response to share phone number (key 'sharePhoneNumberConsent') is yes (value of 'consentToSharingPhoneNumber') then the phone number (key 'phoneNumber') should exist in the json sent to the submissions collection

### Test 3

