const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

//serve static build files
app.use("/build", express.static(path.join(__dirname, "../build")));
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

//handle request to root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/home", (req, res) => {
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
  console.log('Error message: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// starts server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


module.export = app;