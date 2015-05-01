/**
 * authenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var redis = require('../services/redis');
// var meta  = require('../services/meta');

module.exports = function(req, res, next) {

  var token;

  var fail = function() {
    res.unauthorized('You are not permitted to perform this action.');
  };

  if (req.isSocket) {
    req.user = req.socket.user;

    if (req.user) return next();

    token = req.socket.authToken;

    if (!req.socket || !req.socket.redis) {
      redis.socketOnConnection(req.session, req.socket);
    }

    // req.socket.on('disconnect', function() {
    //   meta.unlockAllViaSocketId(req.socket.id);
    // });

  } else {
    token = req.headers['auth-token'];
  }

  User.findByToken(token, function(err, user) {
    if (err) return res.serverError(err);

    if (!user) return fail();

    req.user        = user;
    req.socket.user = user;

    next();
  });

};
