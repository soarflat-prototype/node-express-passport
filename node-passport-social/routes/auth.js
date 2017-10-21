const express = require('express');
const router = express.Router();
const passportTwitter = require('../auth/twitter');

// LOGIN ROUTER
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Please Sign In with' });
});

// LOGOUT ROUTER
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// TWITTER ROUTER
router.get('/twitter', passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: 'login' }), (req, res) => {
    // 認証が成功したらホームへリダイレクト
    res.redirect('/')
  });

module.exports = router;