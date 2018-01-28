'use strict';

var LogEntry = require('../models/logentry');
var error = require('../processors/error');
var auth = require('../processors/auth');

function list(req, res, next) {
  var query = {};
  if (req.query.illustration) query.illustration = req.query.illustration;
  if (!req.user.roles.admin) {
    query.owner = req.user.id;
  } else if (req.user.roles.admin && req.query.owner) {
    query.owner = req.query.owner;
  }

  // Limit
  var limit = +req.query.limit || 250;

  var Q = LogEntry
    .find(query)
    .limit(limit)
    .sort({ timestamp: -1 })
    .populate('illustration', 'id name');

  if (req.user.roles.admin) {
    Q.populate('creator', 'firstName')
     .populate('owner', 'lastName firstName email displayName');
  } else {
    Q.select('-owner -creator');
  }

  Q.exec(function (err, logEntries) {
    if (err) return next(error.Internal(err.message));
    res.send(logEntries);
  });
}

exports.mount = function(app) {
  app.get('/api/v1/logs', auth.canRead, list);
};
