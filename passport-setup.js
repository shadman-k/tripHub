const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
  // done(null, user.id);
  done(null, user);
});

// passport.deserializeUser(function(id, done) {
passport.deserializeUser(function(user, done) {
  // User.findById(id, function(err, user) {
    done(null, user);
  // });
});

passport.use(new GoogleStrategy({
    clientID:     '151898216449-n9v76t07tm5biumgf92uoao1okfo8ui7.apps.googleusercontent.com',
    clientSecret: 'jHIAjJYWxxAGM8okiulkZpPn',
    // user gets redirected to callbackURL upon authorization
    callbackURL: 'http://localhost:8080/google/callback/',
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // use profile info (mainly profile id) to check if user is registered in db
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      // return done(err, user);
    // });
    return done(null, profile);
  }
));
