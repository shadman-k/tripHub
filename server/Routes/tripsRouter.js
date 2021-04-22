const express = require('express');
const router = express.Router();
const tripController = require('../Controllers/tripController')

router.post('/', tripController.createTrips, (req, res) => {
  res.sendStatus(200).end();
})

router.post('/addAttendee', tripController.addMember, (req, res) => {
  return res.json(res.locals.updatedMembers);
})
// router.post('/remove', tripController.removeMember)

router.post('/getAttendees', tripController.getMembers, (req, res) => {
  return res.json(res.locals.members)
})

// router.get('/', tripController.getTripsAll)
// router.get('/one', tripController.getTripsOne)

router.post('/getTrips', (req, res, next) => {
  //Solution for UUID
  res.locals.uuid = req.body.googleId
  next();
}, tripController.getTripsAll, tripController.tripsParser, (req, res) => {
  res.json(res.package);
}

)

module.exports = router