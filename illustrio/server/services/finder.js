'use strict';
var Illustration = require('../models/illustration');
var User = require('../models/user');
var _ = require('underscore');
var async = require('async');
var LogExport = require('../models/exportLog');
var searchLog = require('../models/searchlog');
var LogEntry = require('../models/logentry');

exports.getStarsSum = function (cb) {
  var aggr = [
    { $match: {'review.score': {$exists: true} }},
    { $group: { _id: 'sum', sum: {$sum: '$review.score'} }}
  ];

  Illustration.aggregate(aggr).exec(cb);
};

exports.listIllustrations = function (options, cb) {
  // Query
  var query = {
    'review.public': { $ne: false }
  };

  if (options.colors) {
    query['customization.colors'] = { $size: parseInt(options.colors, 10) };
  }

  if (options.titles) {
    query['customization.titles'] = { $size: parseInt(options.titles, 10) };
  }

  // 'series' query param
  if (options.series) query.series = options.series;

  // 'illuType' query param
  if (options.illuType) query.illuType = options.illuType;

  // 'owner' query param
  if (options.owner) { query.owner = options.owner; }

  // 'style' query param
  if (options.style) query.style = +options.style;

  // 'category' query param
  if (options.category) {
    query.category = +options.category;
    // 'subcategory' query param
    if (options.subcategory) {
      if (+options.subcategory < 0) {
        query.subcategory = null;
      } else {
        query.subcategory = +options.subcategory;
      }
    }
  }

  // query creation time after...
  if (options.createdFrom || options.createdTo) {
    query.createdAt = {};
    if (options.createdFrom) {
      query.createdAt.$gte = options.createdFrom;
    }
    if (options.createdTo) {
      query.createdAt.$lt = options.createdTo;
    }
  }

  if (options.unlisted) {
    query['review.public'] = false;
  }

  // query edition time between two dates
  if (options.editedFrom || options.editedTo) {
    query.editedAt = {};

    if (options.editedFrom) {
      query.editedAt.$gte = new Date(+options.editedFrom);
    }
    if (options.editedTo) {
      query.editedAt.$lt = new Date(+options.editedTo);
    }
  }

  // 'status' query param
  if (options.status) { query.status = options.status; }

  // 'fromDate' query param
  if (options.fromDate) {
    query.editedAt = {
      $gt: options.fromDate,
      $lte: options.toDate || Date.now()
    };
  }

  // 'name' query param
  if (options.q) {
    var matcherPrefix = new RegExp('^' + options.q + '$', 'i');
    var matcher;
    if (options.broad) {
      matcher = new RegExp(options.q, 'i');
    } else {
      matcher = new RegExp('\\b' + options.q + '\\b', 'i');
    }

    query.$or = [
      { tags: { $regex: matcherPrefix } },
      { name: { $regex: matcher } }
    ];

  }

  // or
  if (options.or) {
    query.$or = (query.$or || []).concat(options.or);
  }

  // populate

  var populateQuery = [];
  var populateFields = [];

  if (options.populate) {
    populateFields = options.populate.split(',');
  }

  if (_.contains(populateFields, 'series')) {
    populateQuery.push({ path: 'series', select: 'name editedAt'});
  }


  Illustration.count(query, function (err, count) {
    if (err) {
      return cb(err);
    }

    // Fields
    var fields = { css: 0, svg: 0, tags: 0, createdAt: 0, __v: 0};

    // Start building Query
    var Q = Illustration.find(query, fields);

    // Sort
    var whitelist = ['-review.score', 'editedAt', '-editedAt', '-createdAt'];
    if (options.sortBy) {
      var sortBy = _.isArray(options.sortBy) ? options.sortBy : [options.sortBy];
      var allowedKeys = _.intersection(sortBy, whitelist);
      Q.sort(allowedKeys.join(' '));
    } else {
      Q.sort('-editedAt');
    }

    // Limit
    var limit = 200;
    if (options.limit) { limit = +options.limit; }
    var skip = +options.skip || 0;

    if (limit === 0) {
      cb(err, count, []);
    } else {
      // Execute Query
      Q
        .skip(skip).limit(limit).populate(populateQuery)
        .exec(function (err, illustrations) {
          cb(err, count, illustrations);
        });
    }

  });
};

exports.listUsers = function (options, cb) {
  var query = {};

  if (typeof options.contributor !== 'undefined') {
    query['roles.contributor'] = Boolean(options.contributor);
  }

  if (typeof options.admin !== 'undefined') {
    query['roles.admin'] = Boolean(options.admin);
  }

  if (typeof options.client !== 'undefined') {
    query['roles.client'] = Boolean(options.client);
  }

  if (options.id) { query._id = options.id; }

  if (options.fromDate || options.toDate) {
    query.createdAt = {};
    if (options.fromDate) {
      query.createdAt.$gte = new Date(options.fromDate);
    }
    if (options.toDate) {
      query.createdAt.$lt = new Date(options.toDate);
    }
  }

  var limit;
  if (options.limit) { limit = parseInt(options.limit, 10); }

  User.count(query, function (err, count) {

    if (options.count) {

      cb(err, count, []);

    } else {

      User
        .find(query)
        .select('-password -__v')
        .limit(limit)
        .sort({ email: 1 })
        .exec(function (err, results) {
          cb(err, count, results);
        });

    }

  });

};

exports.getContributorsActivity = function (options, cb) {
  var query = { $or: [
    {status: 'draft' },
    {status: 'under review' }
  ]};
  if (options.fromDate || options.toDate) {
    query.timestamp = {};
    if (options.fromDate) {
      query.timestamp.$gte = options.fromDate;
    }
    if (options.toDate) {
      query.timestamp.$lt = options.toDate;
    }
  }

  LogEntry.distinct('owner', query, function (err, result) {
    cb(err, result.length);
  });

};

exports.getCustomersActivity = function (options, cb) {
  var activeCustomers = [];
  async.parallel([
    function (callback) {
      var query = {};
      if (options.fromDate || options.toDate) {
        query.timestamp = {};
        if (options.fromDate) {
          query.timestamp.$gte = options.fromDate;
        }
        if (options.toDate) {
          query.timestamp.$lt = options.toDate;
        }
      }
      var match = { $match: query };
      var group = { $group: { _id: '$user' } };
      LogExport.aggregate([match, group], function (err, results) {
        if (err) { callback(err); }
        activeCustomers = activeCustomers.concat(results);
        callback(err);
      });
    }, function (callback) {
      var query = {};
      if (options.fromDate || options.toDate) {
        query.timestamp = {};
        if (options.fromDate) {
          query.timestamp.$gte = options.fromDate;
        }
        if (options.toDate) {
          query.timestamp.$lt = options.toDate;
        }
      }
      var match = { $match: query };
      var group = { $group: { _id: '$user' } };
      searchLog.aggregate([match, group], function (err, results) {
        if (err) { callback(err); }
        activeCustomers = activeCustomers.concat(results);
        callback(err);
      });
    }
  ], function (err) {
    activeCustomers = _.uniq(activeCustomers, function (item) {
      return item._id.toString();
    });
    cb(err, activeCustomers.length);
  });
};
