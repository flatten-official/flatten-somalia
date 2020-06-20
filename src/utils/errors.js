class PermissionDeniedError extends Error {
  constructor(message) {
    super(message);
    this.name = "PermissionDeniedError";
  }
}

module.exports = { PermissionDeniedError };
