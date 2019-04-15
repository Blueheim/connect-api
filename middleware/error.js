module.exports = errorHandler => (err, req, res, next) => {
  if (!errorHandler.isTrustedError(err)) {
    errorHandler.handle(err, res);
  }
};
