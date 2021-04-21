const db = require('../db/index')
const uuidv4 =require('uuid').v4;

const stopController = {};

stopController.createStop = (req, res, next) => {
  const { stop_name, destination, groupID, tripID, createdBy, googleMapsID, upvotes, downvotes } = req.body
  
  const query = `
  INSERT INTO stops(stops_name, destination, groupID, tripID, createdBy, googleMapsID, stop_ID)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `

  db.query(query, [stop_name, destination, groupID, tripID, createdBy, googleMapsID, uuidv4()])
    .then((data) => res.json(data)).catch((e) => { console.log(e) })

}

stopController.getStopsOne = (req, res, next) => {
  const { tripID } = req.body
  
  const query = `
   SELECT *
   FROM stops
   WHERE tripid = '${tripID}'
  `
  db.query(query).then((data) => {
    res.json(data)
  }).catch((e) => { console.log(e) })
}

stopController.upvote = (req, res, next) => {
  const { memberUUID, stopID } = req.body;

  const getQuery = `
   SELECT *
   FROM stops
   WHERE stop_id = '${stopID}'
  `

  db.query(getQuery).then((data) => {
    const response = data.rows[0].upvotes
    const members = response === null ? 0 : response.length;

    const query = `
    UPDATE stops
    SET upvotes[${members+1}] = '${memberUUID}'
    WHERE stop_id = '${stopID}'
  `
    db.query(query)
      .then((data) => { res.json(data) })
      .catch((e) => { console.log(e) })

  }).catch((e) => { console.log(e) })
}

module.exports = stopController;