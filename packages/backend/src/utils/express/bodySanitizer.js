// https://www.npmjs.com/package/mongo-sanitize
const sanitize = (v) => {
  if (v instanceof Object) {
    for (const key in v) {
      // noinspection JSUnfilteredForInLoop
      if (/^\$/.test(key)) {
        // noinspection JSUnfilteredForInLoop
        delete v[key];
      } else {
        // noinspection JSUnfilteredForInLoop
        sanitize(v[key]);
      }
    }
  }
  return v;
};

module.exports = (req, res, next) => {
  req.body = sanitize(req.body);
  next();
};
