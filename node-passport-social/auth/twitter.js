const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const callbackURL = process.env.CALLBACK_URL;

// ユーザー情報をセッションにシリアライズする
// シリアライズとは、それぞれのオブジェクト固有の状態をバイト列の形式にしてファイルや
// メモリなどに保存したり転送できるようにすること
passport.serializeUser((user, done) => {
  done(null, user);
});

// ユーザー情報をデシリアライズする
// デシリアライズとは、保存してある情報を取り出したり受け取ったりして
// 各インスタンスを再生成すること
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id.doc._id }, (err, user) => {
    done(err, user);
  });
});

// passportは認証リクエストをするためにStrategiesというものを利用する
// Strategiesには、ユーザ名とパスワードの検証、OAuthを利用した委任認証などが存在する
// Strategiesを利用するためにはuse()を実行する（今回はTwitterStrategyを利用）
// StrategiesのコールバックをVerify Callbackという
// 今回の場合だと以下がVerify Callback
// (accessToken, refreshToken, profile, done) => {}
passport.use(new TwitterStrategy({
  consumerKey,
  consumerSecret,
  callbackURL,
}, (accessToken, refreshToken, profile, done) => {
  // Verify Callbackの目的は、一連の認証情報を持つユーザーを見つけること
  // Passportはリクエストを認証すると、リクエストに含まれている認証情報を解析する
  // 次に、それらの認証情報（この場合はtwitterId）をVerify Callbackで呼び出す
  User.findOrCreate({
    name: profile.displayName
  }, {
    name: profile.displayName,
    userid: profile.id
  }, (err, user) => {
    if (err) {
      console.log(err);
      return done(err)
    }

    done(null, user);
  });
}));

module.exports = passport;
