const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();

const authRouter = require('./authroutes');

const PORT = 3000;

//serve static build files
app.use("/build", express.static(path.join(__dirname, "../build")));

//handle request to root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

//facebook OAuth
passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID_FB,
  clientSecret: process.env.CLIENT_SECRET_FB,
  callbackURL: "http://locahost:8080/auth/facebook/triphub"
  },
  function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate(function(err, user) {
  //   if (err) { return done(err); }
    console.log('logged in')
    done(null, user);
}));

app.use('/auth/facebook', authRouter);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('Error message: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// starts server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


module.export = app;