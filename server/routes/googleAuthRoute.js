const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth with google
// GET: /google
router.get('/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

// google auth callback
// GET: /google/callback
router.get('/callback',
    passport.authenticate( 'google', {
        successRedirect: '/home',
        failureRedirect: '/fail'
}));

module.exports = router;