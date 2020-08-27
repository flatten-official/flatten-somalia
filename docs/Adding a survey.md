# Adding a survey

This document describes how to add a survey.
Throughout the process you can use existing surveys (often in sister directories) as a reference.

## Step 1: Add to `util-shared-constants`

### Step 1a: Add to the configuration

`util-shared-constants` contains survey definitions that are shared between the frontend and the backend.

Add your survey to the `util-shared-constants` package in the `Surveys` object of `index.js`.

Example:

```javascript
const Surveys = {
  myNewSurvey: {
    key: "uniqueKey",
    version: "1.0.0",
    enableManualLocation: false,
    customPageNames: ["start", "mainInfo"],
  },
};
```

Configuration parameters:

- `key`: The key is used heavily throughout the code (e.g. API route, Redux store, URL).
  Make sure to use a unique key that isn't used in the other objects.

- `version`: The current version of the survey. Should be changed whenever the survey changes.

- `enableManualLocation`: If true, a location is required.
  The user will be prompted to select a location on a map
  if their device can't retrieve their location automatically.
  If false, the location will be null if the device can't retrieve the location.
  The user will not be prompted to manually select their location.

- `customPageNames`: If the FormIO section of the survey has multiple pages, give the pages names here and
  the time the user spends on each page will be recorded in the database (under `metadata.pageTimings`).
  Don't include a name for the last page as that is simply the time when the form is submitted.

### Step 1b: Create a change log

In `util-shared-constants/surveyChangeLogs` create a file that will record the changes made to the survey.
Ensure your version matches what you specified in step 1a. Use the other change logs as reference.

## Step 2: Add to `frontend`

### Step 2a: Add the FormIO survey definition

The survey content is defined according to [FormIO's JSON Schema](https://github.com/formio/formio.js/wiki/Form-JSON-Schema).
Many parameters can be excluded from the schema as we don't use FormIO's backend systems.
When building the JSON survey definition, your best course of action is taking examples from the existing surveys.
You can also reference FormIO's wiki linked above.

Once you have the JSON survey definition, add it to `src/formDefinitions/surveys`.

### Step 2b: Add to the configuration

Add the survey to the frontend by adding to the `Schemas` and `Surveys` object in `src/config.js`.

For example:

```javascript
const myNewSurveyFormIOJSONDefinition = require("path to json from step 2a");

export const Surveys = {
  myNewSurvey: {
    ...SharedSurveyRefs.myNewSurvey, // This line is required so that all the shared config from step 1 are available to the frontend package
    i18nTitleKey: "myNewSurveyTitle",
    formIOJSON: myNewSurveyFormIOJSONDefinition,
    // customSubmitBodyFormatter: (schema, storeData, formioData, pageNames) =>
    //   requestBody,
  },
};
```


Survey parameters:

- `i18nTitleKey`: The translation key for the title of the survey
- `formIOJSON`: The JSON file defined in step 2a.
- `customSubmitBodyFormatter`: An optional function that allows you to specify
  your own behaviour for the data that is passed to the API.
  This can be used to change the shape of the data or include custom data in your submission request.
  The function should be defined in `src/ui/surveys/submitHelpers.js` and not in `src/config.js`.
  `src/config.js` should just have a reference to the function.
  If you don't include this parameter, this default data formatter will be used.
  If you use your own data formatter the default data readers are the backend are unlikely to work, and you'll need to implement your own.

### Step 2c: Add the translations

You need to add translations for the title of the survey & the FormIO content of the survey.

The title translations need to be add in `src/translations/*/Surveys.json` with the same key you specified in step 2b (`i18nTitleKey`).

The FormIO translations need to be added in new files in `src/translations/*/formio/`.
You'll then have to import those files in `src/i18n.js` and add them to the `translation` parameter.
Simply use the other surveys as a reference for this step.
Note that FormIO shares translations for all forms so pick key names that don't conflict with other forms.

## Step 3: Add to `backend`

### Step 3a: Add to the config

Add to the `Surveys` object in `src/surveys/config.js`.

For example:

```javascript
const Surveys = {
  myNewSurvey: {
    ...SharedSurveysConfig.myNewSurvey,
    collectionName: "MyNewSurvey",
  },
};
```

Parameters:

- `collectionName`: Specifies the name of the collection where the data for this survey will be stored.
  Only required if you're using the default survey model factory in step 3b.

### Step 3b: Create the model

The model defines how the data for this survey should be stored in the database.
The easiest way to define a model is to use `src/surveys/defaultSurveyFactory/dataModelFactory.js`.
This file provides a function that will generate a model in the default format.
The default format stores all the data in a single collection.

To make use of the default model factory create a `myNewSurvey.js` file in `src/surveys/models`.
`myNewSurvey.js` should contain the Mongoose Schema for the FormIO content. Something like this:

```javascript
const { Surveys } = require("../config");
const modelFactory = require("../defaultSurveyFactory/dataModelFactory");

module.exports = modelFactory(Surveys.myNewSurvey, {
  name: {
    type: String,
    required: true,
    index: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
```

If you don't want to use the default for model factory, you can export your own mongoose Model.
Make use of `Util.createModel` and `getSubmissionMetadata` where appropriate.
For more complex data storage systems, you may want to export an Object wrapping the Mongoose model to allow a finite set of operations on the database.

### Step 3c: Add the API

In this context, the API is a function that will receive 3 parameters.

- `volunteerId`: The mongoose id of the volunteer submitting the survey.
- `volunteerTeamName`: The team name of the volunteer submitting the survey.
- `requestBody`: The API request body which contains all the data sent from the frontend.

The API function should using those parameters submit the survey data to the database.

If you've been using the defaults up to now, you can use `src/surveys/defaultSurveyFactory/apiFactory.js`
to automatically generate an API function. If you do this you can skip immediately to 3d.

If you want to use your own API (to allow for different collections, more parsing of the data, etc.),
write a function that takes these parameters and using your model from 3b inserts the data to MongoDB.

### Step 3d: Extending the `surveyRouteSplitter`

`src/surveys/surveyRouteSplitter.js` defines to which API a survey is submitted.
This file contains a `surveyKeyToApiMap` object that maps the survey key to an api.
Extend this object to add your api. For example if using the default api factory in step 3.

```javascript
const { Surveys } = require("./config");
const defaultApiFactory = require("./defaultSurveyFactory/apiFactory");
const myNewSurveyModel = require("./myNewSurvey/model");

const surveyKeyToApiMap = {
  [Surveys.myNewSurvey.key]: defaultApiFactory(myNewSurveyModel),
};
```

Or if using your custom API in step 3c:

```javascript
const { Surveys } = require("./config");
const myNewSurveyApi = require("./myNewSurvey/api");

const surveyKeyToApiMap = {
  [Surveys.myNewSurvey.key]: myNewSurveyApi,
};
```

### Step 3e: Write tests

Add tests for your API in `test/surveys/`. 
The most important tests are tests using your request data from the frontend.
Testing for permissions is done globally for all surveys and doesn't need to be included.

### Step 4: Deployment

Test your changes locally, make sure the survey renders and can be submitted.
Test your changes on staging using `yarn deploy-both`. Make sure the survey renders and can be submitted.
Make sure the data is properly being stored in the database.
Make a pull request and wait for your changes to be merged to master.

### Step 5: Celebrate!

Enjoy the launch of the new survey! (and monitor for problems)