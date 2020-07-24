module.exports = {
  mongoose: require("mongoose"),
  useReplicaSet: process.env.DISABLE_TRANSACTIONS !== "true",
};
