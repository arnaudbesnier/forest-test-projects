'use strict';

var Illustration = require('../models/illustration');
var auth = require('../processors/auth');
var _ = require('underscore');
var error = require('../processors/error');

var list = function (req, res, next) {
  var prematch = {
    'review.public': true
  };

  var postmatch = {};
  var name;

  // 'name' query param
  if (req.query.q) {
    var name = req.query.q.replace(/[^\w\s]/gi, '').trim();
    var matcher = '^' + name;
    prematch.tags = { $regex: matcher, $options: 'i'};
    postmatch._id = { $regex: matcher, $options: 'i'};
  }

  Illustration.aggregate(
    { $match: prematch },
    { $unwind: '$tags' },
    { $group : { _id : { $toLower : '$tags' }, count : { $sum : 1 } } },
    { $match: postmatch },
    { $sort : { count : -1 } },
    { $limit: 10 },
    function (err, preresults) {
      if (err) return next(new error.Internal('Internal Error'));

      // Don't look for suggestions in results already contains 10 items
      if (preresults.length >= 10) return res.send(preresults);

      // Same request without postmatching the initial tag to get suggestions
      Illustration.aggregate(
        { $match: prematch },
        { $unwind: '$tags' },
        { $group : { _id : { $toLower : '$tags' }, count : { $sum : 1 } } },
        { $sort : { count : -1 } },
        { $limit: 10 },
        function (err, postresults) {
          if (err) return next(new error.Internal('Internal Error'));

          // Remove duplicates
          var diff = _.filter(postresults, function(obj) {
            return !_.findWhere(preresults, obj);
          });

          postresults = _.union(preresults, diff).slice(0, 10);

          // If exact match in the list, get it up to the first position in the list
          var exactMatch = _.findWhere(postresults, { _id: name });
          if (exactMatch) {
            postresults = _.reject(postresults, function (obj) { return obj === exactMatch; });
            postresults.unshift(exactMatch);
          }
          res.send(postresults);
        }
      );
    }
  );
};

exports.mount = function (app, models) {
  app.get('/api/v1/tags', auth.canRead, list);
}
