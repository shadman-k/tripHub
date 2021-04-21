const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const tripsRouter = require('./Routes/tripsRouter.js');
const stopsRouter = require('./Routes/stopsRouter.js');
const cookieParser = require('cookie-parser');
const cors = require('cors')

require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3000;

// //Connect to MongoDB
// mongoose.connect(`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@cluster0.rstp6.mongodb.net/googleMaps?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).catch((e) => console.log(e.message))
// mongoose.connection.once('open', () => {
//   console.log('Connected to TripHub MongoDB')
// })

//Route to DB actions
app.use('/trips', tripsRouter)
app.use('/stops', stopsRouter)

//serve static build files
app.use("/build", express.static(path.join(__dirname, "../build")));
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

//handle request to root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('Error message: ', err);
  return res.status(errorObj.status).json(errorObj.message);
});

// starts server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


module.export = app;