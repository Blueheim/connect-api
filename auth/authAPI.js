const config = require("config");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  authenticateLocal,
  authenticateGoogle,
  authenticateFacebook
} = require("./authController");

// POST /
// Local authentication
router.post(
  "/",
  passport.authenticate("local", { session: false }),
  authenticateLocal
);

// GOOGLEs

// GET /auth/google
// Sign in with google account endpoint
// Make google authentication by redirecting the user to google.com
// After authorization, google redirect the user to the configured callback url
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// GET callbackURL
// Authenticate the request
// If authentication fails, the user will be redirected to the specified url
router.get(
  config.get("GG_ROUTER_CALLBACK_URL"),
  passport.authenticate("google", { session: false }),
  authenticateGoogle
);

// FACEBOOK
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

router.get(
  config.get("FB_ROUTER_CALLBACK_URL"),
  passport.authenticate("facebook", {
    failureRedirect: "/api/auth",
    session: false
  }),
  authenticateFacebook
);

module.exports = router;
