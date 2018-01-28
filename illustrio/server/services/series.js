'use strict';

var Series = require('../models/serie');
var Illustration = require('../models/illustration');
var error = require('../processors/error');

function remover(roles, id, callback) {
  Series.findById(id, function (err, series) {
    if (err) { return callback(new error.Internal(err.message)); }
    if (!series) { return callback(new error.NotFound('Serie not found')); }
    Illustration.count({ series: id }, function (err, count) {
      if (err) { return callback(new error.Internal(err.message)); }
      if (count === 0) {
        series.remove(function(err) {
          if (err) { return callback(new error.Internal(err.message)); }
          return callback(null, series);
        });
      } else {
        return callback(new error.Forbidden('Cannot delete serie containing' +
          'illustrations'));
      }
    });
  });
}

function creator(user, options, callback) {
  if(!user.roles.admin) { options.owner = user.id; }

  new Series(options).save(function (err, series) {
    if (err) { err = new error.Internal(err.message); }
    callback(err, series);
  });
}

exports.creator = creator;
exports.remover = remover;

