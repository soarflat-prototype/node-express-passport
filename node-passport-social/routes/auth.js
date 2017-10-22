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

// 認証のためにユーザーをTwitterにリダイレクトさせる
// 認証が完了したら/twitter/callbackにリダイレクトさせる
router.get('/twitter', passportTwitter.authenticate('twitter'));

// 認証が成功（アクセスが許可されたら）/にリダイレクト
// 認証が失敗（アクセスが許可されなかったら）/loginにリダイレクト
router.get('/twitter/callback', passportTwitter.authenticate('twitter', {
  successRedirect: '/users',
  failureRedirect: '/auth/login'
}));

module.exports = router;
