const express = require('express');
const config = require('config');
const routes = require('./startup/routes');
const passportSetup = require('./startup/passport-setup');

const app = express();
passportSetup(app);
routes(app);

app.get('/', (req, res) => {
  res.send('home');
});

app.get('/api/me', passport.authenticate('bearer', { session: false }), (req, res) => {
  res.send(req.user);
});

app.listen(3000);
