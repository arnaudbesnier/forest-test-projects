var auth = require('../processors/auth');
var error = require('../processors/error');
var Benchmark = require('../models/benchmark');
var Illustration = require('../models/illustration');
var async = require('async');

function getSum(query, cb) {

  var match = { $match: query };
  var group = { $group: { _id: 'sum', value: {$sum: '$renderingTime'} } };
  Benchmark.aggregate([match, group], function (err, result) {
    var count = 0;
    if (result.length) { count = result[0].value; }
    cb(err, count);
  });
}


var get = function (req, res, next) {
  Benchmark.findOne({ illustration: req.params.id }, function (err, bench) {
    if (err) { return next(new error.Internal(err)); }
    if (!bench) { return next(new error.NotFound('No benchmark found.')); }

    var _bench = bench.toObject();

    async.parallel({
      worstSum: function (callback) {
        var query = { renderingTime: { $gt: bench.renderingTime }};
        getSum(query, callback);
      },

      bestSum: function (callback) {
        var query = { renderingTime: { $lte: bench.renderingTime }};
        getSum(query, callback);
      }
    }, function (err, results) {

      if (err) { return next(new error.Internal(err)); }

      _bench._score = results.worstSum / (results.worstSum + results.bestSum);

      Illustration.findById(bench.illustration, {editedAt: 1}, function (err, illu) {
        _bench._obsolete = (illu.editedAt > bench.timestamp);
        res.send(_bench);
      });
    });
  });
};

exports.mount = function (app) {
  app.get('/api/v1/bench/:id', auth.isAdmin, get);
};
