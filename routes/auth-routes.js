var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

/* GET home page. */

// auth logout
router.get('/logout', authController.logOut);

// auth login
router.get('/login', authController.logIn);

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send("you reached the callback URL");
    // res.send(req.user)
    res.redirect('/profile/');
});

module.exports = router;
