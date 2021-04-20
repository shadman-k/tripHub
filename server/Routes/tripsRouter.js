const express = require('express');
const router = express.Router();
const tripController = require('../Controllers/tripController')

router.post('/', tripController.createTrips, (req, res) => {
  res.sendStatus(200).end();
})

router.post('/add', tripController.addMember)

router.get('/', tripController.getTripsAll)
router.get('/one', tripController.getTripsOne)

module.exports = router