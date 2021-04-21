const express = require('express');
const passport = require('passport');
const path = require('path');
const app = express();
const session = require('express-session');
require('./passport-setup');

const PORT = 3000;
app.use('/build', express.static(path.join(__dirname, "../build")));

// routes
const googleRoute = require('./routes/googleAuthRoute');

//handle request to root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use('/google', googleRoute);

// oauth failure redirects to /fail and sends a failure message
app.get('/fail', (req, res) => res.send('You failed to log in.'));

// oauth success redirects to /home 
app.get('/home', (req, res) => res.send('Welcome to TripHub!'));

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