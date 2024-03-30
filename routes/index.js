var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , data: req.user});
});

const authCheck = (req, res, next) => {
  if(!req.user) {
    // if user is not logged in
    res.redirect('/auth/login');
  } else {
    // if logged in
    next();
  }
}


router.get('/profile', authCheck, (req, res) => {
  res.render('profile', { data: req.user });
});

module.exports = router;
