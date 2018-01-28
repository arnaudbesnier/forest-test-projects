var User = require('../models/user');
var Quota = require('../models/quota');
var Download = require('../models/exportLog');
var error = require('../processors/error');
var crypto = require('crypto');
var config = require('../../config/base');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var async = require('async');

function intercom_signature(id) {
  // create id, based on email
  var key = config.intercom.app_secret;
  return crypto.createHmac('sha256', key).update(id).digest('hex');
}

function getUserCredits(userId, cb) {
  var quota = {};
  var now = new Date();

  async.series([

    function (callback) {
      var match = {
        $match: {
          owner: mongoose.Types.ObjectId(userId),
          start: {$lte: now},
          // Type 10 is null type in mongodb
          $or: [ {end: {$gte: now}}, {end: {$type: 10}} ]
        }
      };

      var group = {
        $group: {
          _id: null,
          total: { $sum: '$count' }
        }
      };
      Quota.aggregate([match, group], function (err, result) {
        quota.total = 0;
        if (result && result.length) { quota.total = result[0].total; }
        callback();
      });
    },

    function (callback) {
      var currentMonth = now.getMonth() + 1;
      var project = {$project: {user: 1, month: {$month: '$timestamp'}}};
      var match = {
        $match: {
          user: mongoose.Types.ObjectId(userId),
          month: currentMonth
        }
      };
      var group = { $group: {_id: null, sum: {$sum: 1}}};
      Download.aggregate([project, match, group], function (err, result) {
        quota.downloads = 0;
        if (result && result.length) { quota.downloads = result[0].sum; }
        callback();
      });
    }

  ], function (err) {
    cb(err, quota);
  });
}

var getMe = function (req, res, next) {
  if (!req.user.id) {
    return next(new error.Unauthorized('You cannot do that'));
  }

  var response = {};

  async.series([
    function (callback) {
      User
      .findById(req.user.id)
      .select('-password -__v')
      .exec(function (err, user) {
        if (err) { return callback(new error.Internal(err.message)); }
        if (!user) { return callback(new error.NotFound('User not found')); }
        // user is found, convert to object and enhance
        response.user = user.toObject();
        response.user.intercom = {
          app_id: config.intercom.app_id,
          user_hash: intercom_signature(user.email)
        };
        callback();
      });
    },
    function (callback) {
      getUserCredits(req.user.id, callback);
    }
  ], function (err, results) {
    if (err) { return next(new error.Internal(err.message)); }
    if (results.length === 2) {
      response.user.quota = results[1];
    }
    var token = jwt.sign(response.user, config.jwt.secret, { expiresIn: 60*60*24*7 });
    response.token = token;
    res.send(response);
  });
};

var updateMe = function(req, res, next) {
  if (req.user.id) {
    User
      .findById(req.user.id)
      .exec(function (err, user) {
        if (err) return next(new error.Internal(err.message));
        if (!user) return next(new error.NotFound('User not found'));
        // user is found, update some attributes
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.company) user.company =  req.body.company;
        if (req.body.password) user.password = User.generateHash(req.body.password);

        if (user.roles) {
          user.roles.client = true;
        }

        user.save(function(err){
          if (err) { return next(new error.Internal(err.message)); }
          return getMe(req, res, next);
        });
      });
  } else {
    return next(new error.Unauthorized('You cannot do that'));
  }
};

exports.mount = function(app) {
  app.get('/api/v1/me', getMe);
  app.post('/api/v1/me', updateMe);
};

exports.getUserCredits = getUserCredits;
