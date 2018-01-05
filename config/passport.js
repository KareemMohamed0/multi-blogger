var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../api/user/model');
var gb = require('../api/global-service').globalVariable;

module.exports = function (passport) {

    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = gb.secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ _id: jwt_payload.user._id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}

