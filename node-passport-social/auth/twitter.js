const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const callbackURL = process.env.CALLBACK_URL;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id.doc._id }, (err, user) => {
    done(err, user);
  });
});

passport.use(new TwitterStrategy({
  consumerKey,
  consumerSecret,
  callbackURL,
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({
    name: profile.displayName
  }, {
    name: profile.displayName,
    userid: profile.id
  }, (err, user) => {
    if (err) {
      console.log(err);
      return done(err)
    }
    done(null, user);
  });
}));

module.exports = passport;
