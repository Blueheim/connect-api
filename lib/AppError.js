// Centralized error object that derives from Node's Error
class AppError {
  constructor(name, description, isOperational) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.description = description;
    this.isOperational = isOperational;
  }
}

module.exports = AppError;
