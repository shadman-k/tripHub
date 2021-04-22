const express = require('express');
const router = express.Router();
const tripController = require('../Controllers/tripController')

router.post('/', tripController.createTrips, (req, res) => {
  res.sendStatus(200).end();
})

router.post('/addAttendee', tripController.addMember)
// router.post('/remove', tripController.removeMember)

// router.get('/', tripController.getTripsAll)
// router.get('/one', tripController.getTripsOne)

router.get('/', (req, res, next) => {
  //Solution for UUID
  res.locals.uuid = "createdByID"
  next();
}, tripController.getTripsAll, tripController.tripsParser, (req, res) => {
  res.json(res.package);
}

)

module.exports = router