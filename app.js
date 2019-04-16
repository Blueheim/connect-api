require("express-async-errors");
const config = require("config");
const ErrorHandler = require("./lib/ErrorHandler");
const express = require("express");
const db = require("./startup/db");
const api = require("./startup/api");
const passportSetup = require("./startup/passport-setup");
const errorMiddleware = require("./middleware/error");

const logger = require("./lib/logger")();
const errorHandler = new ErrorHandler(logger);

require("./startup/reboot-handling")(errorHandler);

db();

const app = express();
passportSetup(app);
api(app);

//Error handling middleware
app.use(errorMiddleware(errorHandler));

// app.get('/api/me', passport.authenticate('bearer', { session: false }), (req, res) => {
//   res.send(req.user);
// });

module.exports = app;
