// Centralized error object that derives from Node's Error
class AppError {
  constructor({ name, description, httpStatusCode, message, isOperational }) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.description = description;
    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.isOperational = isOperational;
  }
}

module.exports = AppError;
