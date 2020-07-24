module.exports = {
  mongoose: require("mongoose"),
  useReplicaSet: process.env.DISABLE_TRANSACTIONS !== "true",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};
