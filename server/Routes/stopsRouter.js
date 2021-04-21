const express = require('express');
const router = express.Router();
const stopController = require('../Controllers/stopController')

router.post('/', stopController.createStop, (req, res) => {
  res.sendStatus(200).end();
})

router.get('/', stopController.getStopsOne)

router.post('/upvote', stopController.upvote)
router.post('/downvote', stopController.downvote)

module.exports = router