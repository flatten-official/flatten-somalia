const testOnlyIf = (condition) => (condition ? it : it.skip);

module.exports = { testOnlyIf };
