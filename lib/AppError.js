// Centralized error object that derives from Node's Error
class AppError {
  constructor(name, description, isOperational, cb = null) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.description = description;
    this.isOperational = isOperational;
    this.cb = cb;
  }
}

module.exports = AppError;
