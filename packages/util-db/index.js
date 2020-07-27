const { getConfig } = require("util-config");
const { log } = require("util-logging");

let useReplicaSet = true;

if (process.env.DISABLE_TRANSACTIONS === "true") {
  if (getConfig().allowDisableTransactions) {
    useReplicaSet = false;
    log.warning("Transactions have been disabled. Some tests may be skipped.");
  } else
    log.warning(
      `Transactions are still being used despite DISABLE_TRANSACTIONS being true since the environment ${
        getConfig().environmentName
      } does not allow disabling transactions.`
    );
}

module.exports = {
  mongoose: require("mongoose"),
  useReplicaSet,
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};
