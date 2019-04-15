// uncaught synchronous exception handler

module.exports = errorHandler => {
  process.on('uncaughtException', error => {
    errorHandler.handle(error);
    process.exit(1);
    // TODO:
    // Use a restarter tool to reboot
  });
};
