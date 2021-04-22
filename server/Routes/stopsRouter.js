const express = require('express');
const router = express.Router();
const stopController = require('../Controllers/stopController')

router.post('/', stopController.createStop, (req, res) => {
  res.sendStatus(200).end();
})

router.post('/getStops', stopController.getStopsOne)

router.post('/upvote', stopController.upvote, (req, res) => {
  res.sendStatus(200);
})
router.post('/downvote', stopController.downvote)

module.exports = router