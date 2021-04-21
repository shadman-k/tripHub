const express = require('express');
const passport = require('passport');
const path = require('path');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose')
const tripsRouter = require('./Routes/tripsRouter.js');
const googleRoute = require('./Routes/googleAuthRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('./passport-setup');
require('dotenv').config();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//serve static build files
app.use("/build", express.static(path.join(__dirname, "../build")));
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

// //Connect to MongoDB
// mongoose.connect(`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@cluster0.rstp6.mongodb.net/googleMaps?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).catch((e) => console.log(e.message))
// mongoose.connection.once('open', () => {
//   console.log('Connected to TripHub MongoDB')
// })

// Route to DB actions
app.use('/trips', tripsRouter)

// handle request to root
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
  console.log('Error message: ', errorObj.err);
  return res.status(errorObj.status).json(errorObj.message);
});

// starts server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


module.export = app;