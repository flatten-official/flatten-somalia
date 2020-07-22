
# Config Util

This package provides a Config utility. It allows your code to access secrets and configuration values.

## Usage

1. Create a configuration file for your service.

	*config.js*
	```
	module.exports = {
	  common: {
	    name: "Bob",
	    lastName: "Lee",
	    // Fill in shared configurations
	  },
	  envSpecific: {
	    staging: {
	      printErrors: true,
	      // fill in configurations specific to staging
	    },
	    production : {
	      printErrors: false,
	      ...
	    },
	    ...
	  },
	};
	```


2. Call `setup(config, environmentName, override)` when your service starts to generate the configuration and load the secrets. For example,

	```
	const myConfig = require("./config");
	const Config = require("util-config");

	await Config.setup(myConfig, "staging", {
		lastName: "Long" // Instead of "Lee", override at runtime with "Long"
	});
	```

3. Use `getConfig()` throughout your code to access the config.  For example,
```
const { getConfig } = require("util-config");

getConfig().name; // "Bob"
getConfig().printErrors; // true
```

### Secrets

If your config includes `secretId` in its root, all null variables under `secrets` will be loaded from the json stored at the secretId.

For example,

 *config.js*
```
module.exports = {
    common: {
        secretId: "path-to-some-gcp-secret",
        secrets: {
            mongoDbUri: null
        }
    },
    ...
};
```
You can then do (after calling `setup()`)

```
const { getConfig } = require("util-config");
getConfig().secrets.mongoDbUri // the secret stored in the json from GCP secret manager
```