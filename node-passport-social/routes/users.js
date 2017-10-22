const express = require('express');
const router = express.Router();

router.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('user', { user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

module.exports = router;
