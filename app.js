require('express-async-errors');
const config = require('config');
const express = require('express');
const db = require('./startup/db');
const routes = require('./startup/routes');
const passportSetup = require('./startup/passport-setup');

db();

const app = express();
passportSetup(app);
routes(app);

// app.get('/api/me', passport.authenticate('bearer', { session: false }), (req, res) => {
//   res.send(req.user);
// });

module.exports = app;
