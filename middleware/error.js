module.exports = errorHandler => (err, req, res, next) => {
  if (errorHandler.isTrustedError(err)) {
    if (err.cb) {
      err.cb(res);
    }
  } else {
    errorHandler.handle(err, res);
  }
};
