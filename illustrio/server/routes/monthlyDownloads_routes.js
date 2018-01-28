'use strict';

var error = require('../processors/error');
var auth = require('../processors/auth');

var MonthlyDownload = require('../models/monthlyDownload');
var Serie = require('../models/serie');

var _ = require('underscore');
var moment = require('moment');
var async = require('async');

function list(req, res, next) {
  var query = {};
  if (!req.user.roles.admin) {
    query.owner = req.user.id;
  } else if (req.user.roles.admin && req.query.owner) {
    query.owner = req.query.owner;
  }

  // select only download for a specific month
  if (req.query.date) {
    query.date = req.query.date;
  }

  MonthlyDownload
    .find(query)
    .select('-downloads -marketShare')
    .populate('illustration', 'name series acceptedAt')
    .sort({ 'popularity': -1 })
    .exec(function (err, downloads) {
      if (err) return next(error.Internal(err.message));
      // populate series
      var seriesIds = _.uniq(_.map(downloads, function (d) {return d.illustration.series;}));
      Serie
        .find({_id: {$in: seriesIds}})
        .select('name')
        .exec( function (err, series) {
          if (err) return next(error.Internal(err.message));
          series = _.indexBy(series, '_id');
          downloads = _.map(downloads, function (d) {
            var obj = d.toObject();
            obj.illustration.series = series[obj.illustration.series];
            return obj;
          });
          res.send(downloads);
        });
  });
}


exports.mount = function(app) {
  app.get('/api/v1/monthly-downloads', auth.canRead, list);
};
