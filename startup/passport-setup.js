const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  // Passport bearer strategy for non-auth api endpoint protection
  passport.use(
    new BearerStrategy((token, done) => {
      // look for the stored user token
      User.findOne({ authToken: token }, (err, user) => {
        if (err) {
          return done(err);
        }

        // User not found
        if (!user) {
          return done(null, false);
        }

        return done(null, user, { scope: 'read' });
      });
    })
  );

  // local strategy

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }

          bcrypt.compare(password, user.password, function(err, res) {
            if (!res)
              return done(null, false, {
                message: 'Invalid Password',
              });
            var returnUser = {
              username: user.username,
              createdAt: user.createdAt,
              id: user.id,
            };
            return done(null, returnUser, {
              message: 'Logged In Successfully',
            });
          });
        });
      }
    )
  );

  // oauth strategies

  // Passport google strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get('GG_OAUTH2_CLIENT_ID'),
        clientSecret: config.get('GG_OAUTH2_CLIENT_SECRET'),
        callbackURL: config.get('GG_OAUTH2_CALLBACK_URL'),
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        // User.findOne({authID: profile.id}, (err, user) => { // find the user
        //   if (!user) {
        //     //creates a user with the access token given by google
        //     User.create({
        //       authToken: accessToken,
        //       authID: profile.id,
        //       name: profile.displayName
        //     }, (err, user) => {
        //       return cb(err, user);
        //     })
        //   }

        //   return cb(err, user);
        // })

        // invoke cb with a user object set at req.user in route handlers after authentication
        cb(null, profile);
      }
    )
  );
};
