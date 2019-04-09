const config = require('config');
const express = require('express');
const router = express.Router();

const passport = require('passport');

// POST /
// Local authentication
router.post('/', passport.authenticate('local', { failureRedirect: '/auth/local', session: false }), (req, res) => {
  res.redirect('/');
});

// GOOGLE

// GET /auth/google
// Sign in with google account endpoint
// Make google authentication by redirecting the user to google.com
// After authorization, google redirect the user to the configured callback url
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// GET callbackURL
// Authenticate the request
// If authentication fails, the user will be redirected to the specified url
router.get(
  config.get('GG_OAUTH2_CALLBACK_URL'),
  passport.authenticate('google', { failureRedirect: '/auth/local', session: false }),
  (req, res) => {
    //console.log(req.user);
    res.redirect('/');
  }
);

module.exports = router;
