var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('user', { user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = router;
