const config = require('config');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const routes = require('./startup/routes');
const passportSetup = require('./startup/passport-setup');

const app = express();
passportSetup(app);
routes(app);

app.get('/api/me', passport.authenticate('bearer', { session: false }), (req, res) => {
  res.send(req.user);
});

mongoose
  .connect(
    `mongodb+srv://${config.get('MONGO_USER')}:${config.get('MONGO_PASSWORD')}@cluster0-yzxq8.mongodb.net/${config.get(
      'MONGO_DB'
    )}?retryWrites=true`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
