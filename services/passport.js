const passport = require('passport');
const User = require('../models/userModel');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Local Strategy
const localOption = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOption, function (email, password, done){
  // Verify this username and password, call done with the user if it is the correct email
  // and password. Otherwise, call done with false.
  User.findOne({ email: email }, function (err, user){
    if (err) return done(err);
    if (!user) return done(null, false);

    // Compare passwords
    
  });

});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    if (err) { return done(err, false); }

    if (user) done(null, user);

    else done(null, false);
  });
});

passport.use(jwtLogin);
