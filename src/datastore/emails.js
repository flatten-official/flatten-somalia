const { Datastore } = require("@google-cloud/datastore");

const moment = require("moment");
const datastore = new Datastore();

/*
email is user's email.
timestamp is the time that the user submitted the form, in UTC Unix time in sec since origin.
 */
exports.insertMarketingData = async (email, timestamp) => {
    const key = datastore.key({
        path: [process.env.DATASTORE_KIND_MARKETING, email],
        namespace: process.env.DATASTORE_NAMESPACE
    });

    if (timestamp === undefined) {
        timestamp = moment
            .utc()
            .startOf("day")
            .unix();
    }
    timestamp = Math.round(timestamp);

    try {
        // Try to insert an object with hashed email as key. If already submitted, fails
        const entity = {
            key,
            data: {
                email: email,
                timestamp: timestamp,
                timestamp_history: [timestamp]
            }
        };
        await datastore.insert(entity);
    } catch (e) {
        // If it already exists, update with new history
        let [data] = await datastore.get(key);

        data.timestamp = timestamp;
        data.timestamp_history.push(timestamp);

        const entity = {
            key,
            data
        };
        const response = await datastore.update(entity);
    }
};
