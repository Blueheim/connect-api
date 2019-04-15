class ErrorHandler {
  constructor(logger) {
    this.logger = logger;
  }

  handle(error, res = null) {
    //this.logger is expected to have and error method to log errors
    this.logger.error(error);
    // send mail
    // determine operational errors
    if (res) {
      res.status(500).send("Unexpected error");
    }
  }

  // distinguish operational errors from programmer errors
  isTrustedError(error) {
    return error.isOperational;
  }
}

module.exports = ErrorHandler;
