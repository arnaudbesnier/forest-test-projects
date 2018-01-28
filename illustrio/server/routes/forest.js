'use strict';
var Liana = require('forest-express-mongoose');
var error = require('../processors/error');
var UsersDownloadsGetter = require('../services/forest/users-downloads-getter');
var UsersDownloadsSerializer = require('../serializers/users-downloads');
var async = require('async');
var Quota = require('../models/quota');

function doNothing(req, res) {
  res.status(403).send({ message: 'Forest is read only at the moment.' });
}

function listUsersDownloads(req, res, next) {
  // jshint nonew: false
  new UsersDownloadsGetter(req.query, function (err, usersDownloads, total) {
    if (err) { return next(new error.Internal(err.message)); }
    res.send(new UsersDownloadsSerializer(usersDownloads, total));
  });
}

function giveCredits(req, res) {

  // if (!req.body.jsonapis.length) {
  //   return res.status(400).send({error: 'How about selecting at least 1 user?'});
  // }

  // var now = new Date();

  // async.eachSeries(req.body.jsonapis, function (user, callback) {
  //   console.log(JSON.stringify(user, null, 4));
  //   var newQuota = new Quota();
  //   newQuota.count = 25;
  //   newQuota.owner = user.data.id;
  //   newQuota.start = now;
  //   // end of month
  //   newQuota.end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  //   newQuota.type = 'quota';
  //   newQuota.save(callback);
  // }, function (err) {
  //   if (err) { return res.status(500).send(); }
  return res.status(204).send();
  // });
}

exports.mount = function (app) {
  //app.post(/^\/forest(?!\/stats\/.*$).*$/, doNothing);
  //app.put('/forest*', doNothing);
  app.delete('/forest*', doNothing);

  app.get('/forest/usersDownloads', Liana.ensureAuthenticated,
    listUsersDownloads);
  app.post('/forest/actions/give-credits', Liana.ensureAuthenticated,
    giveCredits);
};
