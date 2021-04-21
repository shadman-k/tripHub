const db = require('../db/index')
const uuidv4 =require('uuid').v4;

const tripController = {};

tripController.createTrips = (req, res, next) => {
  const {name, destination, groupID, createdBy, dateStart, dateEnd} = req.body

  const query = `
  INSERT INTO trip(trip_name, destination, groupID, createdBy, dateStart, dateEnd, trip_ID, members)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `

  db.query(query, [name, destination, groupID, createdBy, dateStart, dateEnd, uuidv4(), `${createdBy}`])
    .then((data) => res.json(data)).catch((e) => { console.log(e) })
}

tripController.addMember = (req, res, next) => {
  const { memberUUID, trip_ID } = req.body;

  const getQuery = `
   SELECT *
   FROM trip
   WHERE trip_ID = '${trip_ID}'
  `

  db.query(getQuery).then((data) => {
    const members = data.rows[0].members.length

    const query = `
    UPDATE trip
    SET members[${members+1}] = '${memberUUID}'
    WHERE trip_ID = '${trip_ID}'
  `
    db.query(query)
      .then((data) => { res.json(data) })
      .catch((e) => { console.log(e) })

  }).catch((e) => { console.log(e) })

}

tripController.removeMember = (req, res, next) => {
  const { memberUUID, trip_ID } = req.body;

  const getQuery = `
   SELECT *
   FROM trip
   WHERE trip_ID = '${trip_ID}'
  `

  db.query(getQuery).then((data) => {
    const memberIndex = data.rows[0].members.indexOf(memberUUID)
    const newArr = data.rows[0].members
    newArr.splice(memberIndex, 1)

    const query = `
    UPDATE trip
    SET members = ARRAY['${newArr}']
    WHERE trip_ID = '${trip_ID}'
  `
    db.query(query)
      .then((data) => { res.json(data) })
      .catch((e) => { console.log(e) })

  }).catch((e) => { console.log(e) })

}

tripController.getTripsAll = (req, res, next) => {
  const query = `
   SELECT *
   FROM trip
  `
  db.query(query).then((data) => {res.json(data)}).catch((e) => {console.log(e)})
}

tripController.getTripsOne = (req, res, next) => {
  const { trip_ID } = req.body
  
  const query = `
   SELECT *
   FROM trip
   WHERE trip_ID = '${trip_ID}'
  `
  db.query(query).then((data) => {
    res.json(data)
  }).catch((e) => { console.log(e) })
}

module.exports = tripController