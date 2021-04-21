const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config();
// require database and pg so we can query to it

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  console.log('serializeUser hits after newUser')
  done(null, profile.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: '/google/callback/',
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    const newUser = {
      email: profile.email,
      displayName: profile.displayName,
      image: profile.photos[0].value,
      googleId: profile.id,
    }
    
    db.query(statement, Object.values(newUser), (err, result) => {
      if (err) {
        return next({
          log: 'There was an error checking the database for the user',
          message: {
            err: 'An error occurred checking the database for the user.'
          }
        });
      } else {
        if (!result.rows.length) { // if the user is not in the database, add them 
          console.log('User does not exist in database. Need to add user to the database.');
          return done(null, result);
        } else { // if the user is in the database, send back user information and rediret to home page
          console.log('User found, redirecting to /home');
          return done(null, result);
        }
      }
    });

    console.log('newUser: ', newUser);
    // console.log('does strategy fire?');
    return done(null, profile);
  }
));
