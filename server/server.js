const express = require('express');
const passport = require('passport');
const path = require('path');
const app = express();
const cookieSession = require('cookie-session')
require('../passport-setup');

const PORT = 3000;

//serve static build files
app.use("/build", express.static(path.join(__dirname, "../build")));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
  name: 'triphub-session',
  keys: ['key1', 'key2']
}))

//handle request to root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get('/', (req, res) => {
  res.send('You are not logged in.');
})

// google oauth 
app.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/success',
        failureRedirect: '/fail'
}));

app.get('/fail', (req, res) => res.send('You failed to log in.'));
app.get('/success', (req, res) => res.send('Welcome to TripHub!'));

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

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