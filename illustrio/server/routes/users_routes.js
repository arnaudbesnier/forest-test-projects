'use strict';

var User = require('../models/user');
var finder = require('../services/finder');
var Illustration = require('../models/illustration');
var Serie = require('../models/serie');
var error = require('../processors/error');
var auth = require('../processors/auth');
var async = require('async');
var _ = require('underscore');

function getStats(req, res, next) {
  var query = {};

  if (req.query.active) {
    if (req.query.fromDate) query.editedAt = { $gt: req.query.fromDate };
    Illustration.distinct('owner', query, function (err, result) {
      if (err) return next(error.Internal(err.message));
      res.send({ count: result.length });
    });
  } else {
    if (req.query.fromDate) query.createdAt = { $gt: req.query.fromDate };
    User.count(query, function (err, result) {
      if (err) return next(error.Internal(err.message));
      res.send({ count: result });
    });
  }
}

var getIlluCount = function (user, cb) {
  Illustration.count({ owner: user._id }, function (err, result) {
    if (err) result = 0;
    var newUser = user.toObject();
    newUser.illustrationsCount = result;
    cb(null, newUser);
  });
};

var getSeriesCount = function (user, cb) {
  Serie.count({ owner: user._id }, function (err, result) {
    if (err) result = 0;
    var newUser = user.toObject();
    newUser.seriesCount = result;
    cb(null, newUser);
  });
};

function list(req, res, next) {
  var options = req.query;

  finder.listUsers(options, function (err, count, users) {
    // Set count to header
    res.set('X-Total-Count', count);

    if (err) return next(new error.Internal(err.message));

    async.map(users, getIlluCount, function(err, results) {
      if (err) return next(new error.Internal(err.message));
      res.send(results);
    });

  });

}

function get(req, res, next) {
  var query = { _id: req.user.id };

  if (req.user.roles.admin) { query._id = req.params.id; }

  User
    .findOne(query)
    .select('-password')
    .exec(function (err, user) {
      if (err) return next(new error.Internal(err.message));
      if (!user) return next(new error.NotFound('User not found'));
      Serie.count({ owner: req.params.id }, function (err, count) {
        if (err) return next(new error.Internal(err.message));
        var newUser = user.toObject();
        newUser.seriesCount = count;
        res.send(newUser);
      });
    });
}

var update = function (req, res, next) {
  if (!req.user.roles.admin && req.user._id !== req.params.id) {
    return next(new error.Unauthorized('You can only update yourself'));
  }

  var body = {};
  if (req.body.firstName) body.firstName = req.body.firstName;
  if (req.body.lastName) body.lastName = req.body.lastName;
  if (req.body.password) body.password = User.generateHash(req.body.password);

  if (req.user.roles.admin) {
    if (req.body.paidStatus !== undefined) {
      if (req.body.paidStatus === "post") {
        body.postPaidSince = Date.now();
      }
      if (req.body.paidStatus === "pre") {
        body.$unset = {postPaidSince: 1};
      }
    }
  }

  User.findByIdAndUpdate(req.params.id, body, function (err, user) {
    if (err) return next(new error.Internal(err.message));
    if (!user) return next(new error.NotFound('User not found'));
    res.send(user);
  });
};

exports.mount = function(app) {
  app.get('/api/v1/users', auth.isAdmin, list);
  app.get('/api/v1/users/stats', auth.isAdmin, getStats);
  app.get('/api/v1/users/:id', auth.canRead, get);
  app.put('/api/v1/users/:id', auth.canRead, update);
};
