const db = require('../db/index')
const uuidv4 =require('uuid').v4;

const stopController = {};

stopController.createStop = (req, res, next) => {
  const { stop_name, destination, groupID, tripID, createdBy, googleMapsID, upvotes, downvotes } = req.body

  const newUUID = uuidv4();
  
  const query = `
  INSERT INTO stops(stops_name, destination, groupID, tripID, createdBy, googleMapsID, stop_ID)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `

  db.query(query, [stop_name, destination, groupID, tripID, createdBy, googleMapsID, newUUID])
    .then(() => {
      const query = `
      SELECT *
      FROM stops
      WHERE stop_ID = '${newUUID}'
      `

      db.query(query).then((data) => {
        res.json(data)
      }).catch((e)=>{console.log(e)})

    })
    .catch((e) => { console.log(e) })

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
    const responseDownvotes = response ? data.rows[0].downvotes.includes(memberUUID) : false;
    const members = response === null ? 0 : response.length;

    const query = `
    UPDATE stops
    SET upvotes[${members+1}] = '${memberUUID}'
    WHERE stop_id = '${stopID}'
  `
    if (!response.includes(memberUUID)) {
      db.query(query)
      .then((data) => { res.json(data) })
      .catch((e) => { console.log(e) })
    }
    if (responseDownvotes) {
      const memberIndex = data.rows[0].downvotes.indexOf(memberUUID)
      const newArr = data.rows[0].downvotes
      newArr.splice(memberIndex, 1)
      
      console.log(newArr)
      const query = `
      UPDATE stops
      SET downvotes = ARRAY['${newArr}']
      WHERE stop_id = '${stopID}'
      `
      db.query(query)
      .then((data) => { res.json(data) })
      .catch((e) => { console.log(e)})
    }

  }).catch((e) => { console.log(e) })
  next()
}

stopController.downvote = (req, res, next) => {
  const { memberUUID, stopID } = req.body;

  const getQuery = `
   SELECT *
   FROM stops
   WHERE stop_id = '${stopID}'
  `
  db.query(getQuery).then((data) => {
    const response = data.rows[0].downvotes
    const responseUpvotes = response ? data.rows[0].upvotes.includes(memberUUID) : false;
    const members = response === null ? 0 : response.length;

    const query = `
    UPDATE stops
    SET downvotes[${members+1}] = '${memberUUID}'
    WHERE stop_id = '${stopID}'
  `
    db.query(query)
      .then((data) => { res.json(data) })
      .catch((e) => { console.log(e) })
    
    if (!response.includes(memberUUID)) {
      db.query(query)
      .then((data) => { res.json(data) })
      .catch((e) => { console.log(e) })
    }
    if (responseUpvotes) {
      const memberIndex = data.rows[0].upvotes.indexOf(memberUUID)
      const newArr = data.rows[0].upvotes
      newArr.splice(memberIndex, 1)
      
      console.log(newArr)
      const query = `
      UPDATE stops
      SET upvotes = ARRAY['${newArr}']
      WHERE stop_id = '${stopID}'
      `
      db.query(query)
      .then((data) => { res.json(data) })
      .catch((e) => { console.log(e)})
    }

  }).catch((e) => { console.log(e) })
  next()
}

module.exports = stopController;