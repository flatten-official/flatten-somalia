// helper functions

// returns an array of keys referring to well defined objects
function definedKeys(object) {
  const keys = [];

  for (const [key, value] of Object.entries(object)) {
    if (value) {
      keys.push(key);
    }
  }

  return keys;
}

module.exports = {
  definedKeys,
};
