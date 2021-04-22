const db = require('../db/index')
const uuidv4 =require('uuid').v4;

const tripController = {};

tripController.createTrips = (req, res, next) => {
  const { name, destination, groupID, createdBy, dateStart, dateEnd } = req.body.tripInfo
  console.log('googleId: ', createdBy)
  const newUUID = uuidv4();

  const query = `
  INSERT INTO trip(trip_name, destination, groupID, createdBy, dateStart, dateEnd, trip_ID)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `

  db.query(query, [name, destination, groupID, createdBy, dateStart, dateEnd, newUUID])
    .then(() => {
      console.log("new db")
      const query = `
      SELECT *
      FROM trip
      WHERE trip_id = '${newUUID}'` 

      db.query(query).then((data) => {
        res.json(data.rows[0])
      }).catch((e) => { console.log(e) })
    }
    
  )
    .catch((e) => { console.log(e)})
}

tripController.addMember = (req, res, next) => {
  const { memberUUID, trip_ID } = req.body;

  const getQuery = `
   SELECT *
   FROM trip
   WHERE trip_ID = '${trip_ID}'
  `

  db.query(getQuery).then((data) => {
    const response = data.rows[0].members
    const members = response ? response.length : 0;

    const query = `
    UPDATE trip
    SET members[${members+1}] = '${memberUUID}'
    WHERE trip_ID = '${trip_ID}'
    `

    db.query(query)
      .then((data) => { res.json(memberUUID) })
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
  db.query(query).then((data) => {
    res.locals.rows = data.rows
    next()
  }).catch((e) => { console.log(e) })
}

tripController.tripsParser = (req, res, next) => {
  console.log('tripPraser:', res.locals.uuid)
  const package = [];
  const selectedItems = res.locals.rows
  
  for (let i = 0; i < selectedItems.length; i++) {
    const element = selectedItems[i];
    const members = element.members ? element.members[0].split(',') : '';
   
    if (element.createdby === res.locals.uuid) {
      package.push(element)
    } else if (members.includes(res.locals.uuid)) {
      package.push(element)
    }
    
  }

  res.package = package;
  next()
}

tripController.getTripsCreatedBy = (req, res, next) => {  
  const query = `
   SELECT *
   FROM trip
   WHERE createdBy = '${res.locals.uuid}'
  `
  db.query(query).then((data) => {
    res.locals.createdBy = data
    next();
  }).catch((e) => { console.log(e) })
}

tripController.getTripsMemberOf = (req, res, next) => {  
  const query = `
   SELECT *
   FROM trip
   WHERE createdBy = '${res.locals.uuid}'
  `
  db.query(query).then((data) => {
    res.locals.createdBy = data
    next();
  }).catch((e) => { console.log(e) })
}


module.exports = tripController