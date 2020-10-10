const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('!!!!PASSPORT.CALLBACK', req.user);
    // Unsuccessful authentication redirect home.
    // Successful authentication redirect to account
    // This should be expanded to check for students as well in the future
    if (req.user.isTeacher) {
      res.redirect('/tuser/');
    } else {
      res.redirect('/suser/');
    }
  },
);

module.exports = router;
