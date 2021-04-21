const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const db = require('./db/index.js');
const userController = require('./Controllers/userController');
require('dotenv').config();

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
  async function(request, accessToken, refreshToken, profile, done) {
    
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.email,
      image: profile.photos[0].value,
    }
    
    // const user = await userController.checkUser(newUser.googleId);
    // if (!user.length) {
    //   // add user to database
    //   // return done
    // }

    const entry = Object.values(newUser);
    const user = await userController.addUser(entry);
    console.log('user: ', user);
    
    // return done(null, profile);
  }
));
