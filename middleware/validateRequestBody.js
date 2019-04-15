const AppError = require("../lib/AppError");

module.exports = validator => {
  return (req, res, next) => {
    const { error } = validator(req.body);

    if (error) {
      //400 Bad request
      throw new AppError(
        "SCHEMA_INVALID",
        "Schema object is not valid",
        true,
        response => response.status(400).send(error.details[0].message)
      );
    }
    next();
  };
};
