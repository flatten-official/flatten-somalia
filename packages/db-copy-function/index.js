const DigestFetch = require("digest-fetch");
const { getJSONSecret } = require("util-gcp");
const { log } = require("util-logging");

const SECRET_ID =
  "projects/915444252630/secrets/prod-to-analytics-cloud-function/versions/latest";

const BASE_URL = "https://cloud.mongodb.com/api/atlas/v1.0";

/**
 * Returns all the structure required to make a request to retrieve the list of snapshots.
 * groupId is the same as the projectId
 */
const getBackupRequest = (groupId) => ({
  url: BASE_URL + `/groups/${groupId}/clusters/Production/backup/snapshots`,
});

/**
 * Returns all the structure (url + body) required to create a restore job
 */
const getCreateRestoreRequest = (fromGroupId, toGroupId, snapshotId) => ({
  url:
    BASE_URL + `/groups/${fromGroupId}/clusters/Production/backup/restoreJobs`,
  body: {
    targetClusterName: "Analytics",
    targetGroupId: toGroupId,
    snapshotId,
    deliveryType: "automated",
  },
});

/**
 * Gets the snapshotId of the latest completed backup
 */
const getSnapshotId = async (client, groupId) => {
  const { url } = getBackupRequest(groupId);
  const res = await client.fetch(url);

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const snapshots = (await res.json()).results;

  let latestComplete = 0;

  while (snapshots[latestComplete].status !== "completed") latestComplete++;

  return snapshots[latestComplete].id;
};

const createRestoreJob = async (client, snapshotId, fromGroupId, toGroupId) => {
  const { url, body } = getCreateRestoreRequest(
    fromGroupId,
    toGroupId,
    snapshotId
  );

  const res = await client.fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()).id;
};

// eslint-disable-next-line no-unused-vars
exports.function = async (data, context) => {
  // Load the secrets from the secret manager
  const {
    atlasOrgApiPrivateKey,
    atlasOrgApiPublicKey,
    prodProjectGroupId,
    analyticsProjectGroupId,
  } = await getJSONSecret(SECRET_ID);

  log.info("Got secrets.");

  // Create an authentication client
  const client = new DigestFetch(atlasOrgApiPublicKey, atlasOrgApiPrivateKey);

  // Get the latest backup (snapshot)
  const snapshotId = await getSnapshotId(client, prodProjectGroupId);

  log.info(`Got latest backup (id :${snapshotId})`);

  // Create a restore to the Analytics cluster
  const jobId = await createRestoreJob(
    client,
    snapshotId,
    prodProjectGroupId,
    analyticsProjectGroupId
  );

  log.info(`Created restore job with id ${jobId}`);
};
