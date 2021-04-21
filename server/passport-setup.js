const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const db = require('./db/index.js');
const userController = require('./Controllers/googleController');
require('dotenv').config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  return done(null, user[0].google_id);
});

passport.deserializeUser((id, done) => {
  return done(null, id);
});

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: 'http://localhost:8080/google/callback/',
    passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => {

    const userInfo = {
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.email,
      image: profile.photos[0].value,
    };
    const googleId = userInfo.googleId;
    const newUser = Object.values(userInfo);
    
    userController.checkUser(googleId)
      .then(user => {
        console.log(user);
        if (!user.length) {
          userController.addUser(newUser)
            .then(user => done(null, user))
            .catch(e => console.log('There was an error invoking addUser in Passport middleware: ', e));
        }
        return done(null, user)
      }).catch(e => console.log('There was an error invoking checkUser in Passport middleware: ', e))
    
  }
));
