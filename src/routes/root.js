module.exports = (req, res) => {
  res
    .status(200)
    .send(`Flatten.so backend online (${process.env.ENVIRONMENT})`);
};
