const { authSecret } = require('../auth/auth.config.js');
const passport = require('passport');
const passpportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passpportJwt;

module.exports = (app) => {
  const { findOne } = app.src.models.v2.users;

  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (playload, done) => {
    findOne(playload.id)
      .then((user) => done(null, user ? { ...playload } : false))
      .catch((err) => done(err, false));
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
