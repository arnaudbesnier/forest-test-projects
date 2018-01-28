var finder = require('../services/finder');
var error = require('../processors/error');
var async = require('async');
var auth = require('../processors/auth');
var Illustration = require('../models/illustration');
var _ = require('underscore');
var mongoose = require('mongoose');
var LogExport = require('../models/exportLog');
var searchLog = require('../models/searchlog');
var IlluLog = require('../models/illu_log');
var moment = require('moment');
var util = require('../routes/me_routes');

var getCustomersStatsSummary = function (req, res, next) {
  var ds = {};
  async.parallel([
    function (callback) {
      var options = {
        contributor: false,
        admin: false,
        client: true,
        count: true
      };
      finder.listUsers(options, function(err, count) {
        ds.total = count;
        callback();
      });
    },
    function (callback) {
      var options = {
        contributor: false,
        admin: false,
        client: true,
        count: true,
        fromDate: moment().subtract(7, 'days')
      };
      finder.listUsers(options, function(err, count) {
        ds.signupsLast7Days = count;
        callback();
      });
    },
    function (callback) {
      var options = {
        contributor: false,
        admin: false,
        client: true,
        count: true,
        fromDate: moment().subtract(14, 'days'),
        toDate: moment().subtract(7, 'days')
      };
      finder.listUsers(options, function(err, count) {
        ds.signupsLastWeek = count;
        callback();
      });
    },
    function (callback) {
      var options = {
        fromDate: new Date(moment().subtract(7, 'days'))
      };
      finder.getCustomersActivity(options, function(err, count) {
        ds.activeLast7Days = count;
        callback();
      });
    },
    function (callback) {
      var query = { timestamp: { $gte: new Date(moment().subtract(28, 'days')) } };
      var match = { $match: query };
      var group = { $group: { _id: '$user', count: { $sum: 1 } } };
      searchLog.aggregate([match, group], function (err, results) {
        if (err) { callback(err); }
        var totalSearches = _.reduce(results, function (memo, item) {
          return memo + item.count;
        }, 0);
        ds.searchesPerCustomerLast28Days = totalSearches / results.length;
        callback(err);
      });
    }
  ], function (err) {
    if (err) { return next(error.Internal(err.message)); }
    ds.signupsLast7DaysProgress = ((ds.signupsLast7Days - ds.signupsLastWeek) /
      ds.signupsLastWeek) * 100;
    res.send(ds);
  });

};

var getDesignersStats = function (req, res, next) {
  var ds = {};
  async.parallel([
    function (callback) {
      var options = {
        contributor: true,
        admin: false,
        client: false,
        count: true
      };
      finder.listUsers(options, function(err, count){
        ds.total = count;
        callback();
      });
    },
    function (callback) {
      var options = {
        contributor: true,
        admin: false,
        client: false,
        count: true,
        fromDate: moment().subtract(7, 'days')
      };
      finder.listUsers(options, function(err, count){
        ds.signupsLast7Days = count;
        callback();
      });
    },
    function (callback) {
      var options = {
        contributor: true,
        admin: false,
        client: false,
        count: true,
        fromDate: moment().subtract(14, 'days'),
        toDate: moment().subtract(7, 'days')
      };
      finder.listUsers(options, function(err, count){
        ds.signupsLastWeek = count;
        callback();
      });
    },
    function (callback) {
      var options = {
        fromDate: new Date(moment().subtract(7, 'days'))
      };
      finder.getContributorsActivity(options, function(err, count){
        ds.activeLast7Days = count;
        callback();
      });
    },
    function (callback) {
      var options = {
        fromDate: new Date(moment().subtract(14, 'days')),
        toDate: new Date(moment().subtract(7, 'days'))
      };
      finder.getContributorsActivity(options, function(err, count){
        ds.activeLastWeek = count;
        callback();
      });
    },
  ], function (err) {
    if (err) { return next(error.Internal(err.message)); }
    ds.signupsLast7DaysProgress = ((ds.signupsLast7Days - ds.signupsLastWeek) /
      ds.signupsLastWeek) * 100;
    ds.activeLast7DaysProgress = ((ds.activeLast7Days - ds.activeLastWeek) /
      ds.activeLastWeek) * 100;
    res.send(ds);
  });
};

var getStats = function (req, res, next) {
  var stats = { illustrations: {}, stars: {} };

  async.parallel([

    // Total accepted illustrations
    function (callback) {
      var options = { status: 'accepted', limit: 0 };
      finder.listIllustrations(options, function (err, count) {
        stats.illustrations.accepted = count;
        callback();
      });
    },

    // Total under review illustrations at the moment
    function (callback) {
      var options = { status: 'under review', limit: 0};
      finder.listIllustrations(options, function (err, count) {
        stats.illustrations.underReview = count;
        callback();
      });
    },

    // Total rejected illustrations (will help for the moderation round
    // calculation)
    function (callback) {
      var options = { status: 'rejected', limit: 0};
      finder.listIllustrations(options, function (err, count) {
        stats.illustrations.rejected = count;
        callback();
      });
    },

    // Total rejected illustrations (will help for the moderation round
    function (callback) {
      var options = { limit: 0 };
      finder.listIllustrations(options, function (err, count) {
        stats.illustrations.total = count;
        callback();
      });

    // Total stars
    }, function (callback) {
      finder.getStarsSum(function (err, result) {
        stats.stars.total = result[0].sum;
        callback();
      });

    // Total illustrations created during the last 7 days
    }, function (callback) {
      var options = {
        limit: 0,
        createdFrom: new Date(moment().subtract(7, 'days'))
      };

      finder.listIllustrations(options, function (err, count) {
        stats.illustrations.createdLast7Days = count;
        callback();
      });

    // Total illustrations created during the last week (-14 -7)
    }, function (callback) {
      var options = {
        limit: 0,
        createdFrom: new Date(moment().subtract(14, 'days')),
        createdTo: new Date(moment().subtract(7, 'days'))
      };

      finder.listIllustrations(options, function (err, count) {
        stats.illustrations.createdLastWeek = count;
        callback();
      });

    // Total illustrations accepted during the last 7 days
    }, function (callback) {
      var query = {
        timestamp: { $gte: new Date(moment().subtract(7, 'days')) },
        status: 'accepted'
      };

      IlluLog.where(query).count(function (err, count) {
        if (err) { callback(err); }
        stats.illustrations.acceptedLast7Days = count;
        callback();
      });

    // Total illustrations accepted during the last week (-14 -7)
    }, function (callback) {
      var query = {
        timestamp: {
          $gte: new Date(moment().subtract(14, 'days')),
          $lt: new Date(moment().subtract(7, 'days'))
        },
        status: 'accepted'
      };

      IlluLog.where(query).count(function (err, count) {
        if (err) { callback(err); }
        stats.illustrations.acceptedLastWeek = count;
        callback();
      });

    // Total illustrations accepted during the last 28 days
    }, function (callback) {
      var query = {
        timestamp: { $gte: new Date(moment().subtract(28, 'days')) },
        status: 'accepted'
      };

      IlluLog.where(query).count(function (err, count) {
        if (err) { callback(err); }
        stats.illustrations.acceptedLast28Days = count;
        callback();
      });

    // Total illustrations submited for review during the last 28 days
    }, function (callback) {
      var query = {
        timestamp: { $gte: new Date(moment().subtract(28, 'days')) },
        status: 'under review'
      };

      IlluLog.where(query).count(function (err, count) {
        if (err) { callback(err); }
        stats.illustrations.underReviewLast28Days = count;
        callback();
      });
    }
  ],
  function (err) {
    if (err) { return next(error.Internal(err.message)); }

    // Process some more things
    //
    // Illustration creation progress
    stats.illustrations.createdLast7DaysProgress = (
        (stats.illustrations.createdLast7Days -
          stats.illustrations.createdLastWeek) /
        stats.illustrations.createdLastWeek) * 100;

    // Illustration acceptance progress
    stats.illustrations.acceptedLast7DaysProgress = (
        (stats.illustrations.acceptedLast7Days -
          stats.illustrations.acceptedLastWeek) /
        stats.illustrations.acceptedLastWeek) * 100;

    // Stars average
    stats.stars.average = (stats.stars.total / stats.illustrations.accepted);

    // Moderation round
    stats.moderationRounds = ((stats.illustrations.rejected +
          stats.illustrations.accepted)/stats.illustrations.accepted);

    // Accepted ratio (number of illu accepted the last 28 days on the number
    // of illu submited for review the last 29 days)
    stats.illustrations.acceptedRatioLast28Days = (
      stats.illustrations.acceptedLast28Days /
      stats.illustrations.underReviewLast28Days) * 100;

    // Send results
    res.send(stats);
  });
};

var getCount = function (req, res, next) {
  async.parallel({
    users: function (callback) {
      var query = req.query;
      if (req.query.owner) { query.id = req.query.owner; }

      finder.listUsers(query, function (err, count, result) {
        callback(null, result);
      });
    },
    total: function (callback) {
      var query = {};
      if (req.query.owner) { query.owner = mongoose.Types.ObjectId(req.query.owner); }

      var match = { $match: query };
      var group = { $group: { _id: '$owner', count: {$sum: 1} } };
      Illustration.aggregate([match, group], function (err, result) {
        if (err) { callback(err); }
        callback(null, result);
      });
    },
    accepted: function (callback) {
      var query = { status: 'accepted' };
      if (req.query.owner) { query.owner = mongoose.Types.ObjectId(req.query.owner); }
      if (req.query.role) { query.role = req.query.role; }

      var match = { $match: query };
      var group = { $group: { _id: '$owner', count: {$sum: 1}, stars: {$sum: '$review.score'} } };
      Illustration.aggregate([match, group], function (err, result) {
        if (err) { callback(err); }
        callback(null, result);
      });
    },
    rejected: function (callback) {
      var query = { status: 'rejected' };
      if (req.query.role) { query.role = req.query.role; }
      if (req.query.owner) {
        query.owner = mongoose.Types.ObjectId(req.query.owner);
        var match = { $match: query };
        var group = { $group: { _id: '$owner', count: {$sum: 1} } };
        Illustration.aggregate([match, group], function (err, result) {
          if (err) { callback(err); }
          callback(null, result);
        });
      } else {
        callback(null, []);
      }

    },
    draft: function (callback) {
      var query = { status: 'draft' };
      if (req.query.role) { query.role = req.query.role; }
      if (req.query.owner) {
        query.owner = mongoose.Types.ObjectId(req.query.owner);
        var match = { $match: query };
        var group = { $group: { _id: '$owner', count: {$sum: 1} } };
        Illustration.aggregate([match, group], function (err, result) {
          if (err) { callback(err); }
          callback(null, result);
        });
      } else {
        callback(null, []);
      }

    },
    underReview: function (callback) {
      var query = { status: 'under review' };
      if (req.query.role) { query.role = req.query.role; }
      if (req.query.owner) {
        query.owner = mongoose.Types.ObjectId(req.query.owner);
        var match = { $match: query };
        var group = { $group: { _id: '$owner', count: {$sum: 1} } };
        Illustration.aggregate([match, group], function (err, result) {
          if (err) { callback(err); }
          callback(null, result);
        });
      } else {
        callback(null, []);
      }

    }
  },
  function (err, results) {
    if (err) { return next(error.Internal(err.message)); }
    var users = _.map(results.users, function (u) {
      var _u = u.toObject();
      var stats = {};

      _u = _.omit(_u, 'id', 'roles', '__v', 'createdAt');

      _.each(results.total, function (t) {
        if (t._id.toString() === u._id.toString()) {
          stats.total = t.count;
        }
      });

      _.each(results.accepted, function (t) {
        if (t._id.toString() === u._id.toString()) {
          stats.accepted = t.count;
          stats.stars = t.stars;
          stats.averageStars = (t.stars/t.count).toFixed(2);
        }
      });

      _.each(results.rejected, function (t) {
        if (t._id.toString() === u._id.toString()) {
          stats.rejected = t.count;
        }
      });

      _.each(results.underReview, function (t) {
        if (t._id.toString() === u._id.toString()) {
          stats.underReview = t.count;
        }
      });

      _.each(results.draft, function (t) {
        if (t._id.toString() === u._id.toString()) {
          stats.draft = t.count;
        }
      });

      _u.stats = stats;

      return _u;

    });

    res.send(users);

  });
};

function getCustomersStats(req, res, next) {
  async.waterfall([

    // Retrieve all customers
    function (callback) {
      var options = { client: true, contributor: false, admin: false };
      if (req.query.user) {
        options.id = mongoose.Types.ObjectId(req.query.user);
      }
      finder.listUsers(options, function (err, count, users) {
        res.set('X-Total-Count', count);
        callback(err, users);
      });

    // Aggregate download logs per customer
    }, function (users, callback) {
      var query = {};
      if (req.query.user) {
        query.user = mongoose.Types.ObjectId(req.query.user);
      }
      var match = { $match: query };
      var group = { $group: { _id: '$user', count: {$sum: 1} } };
      LogExport.aggregate([match, group], function (err, result) {
        if (err) return next(error.Internal(err.message));

        users = _.map(users, function (u) {
          var _u = u.toObject();
          _u = _.omit(_u, 'roles', 'id');
          _u.stats = {};
          _.each(result, function (r) {
            if (u._id && r._id && u._id.toString() === r._id.toString()) {
              _u.stats.downloads = r.count;
            }
          });
          return _u;
        });

        callback(err, users);
      });

    // Aggregate search logs per customer
    }, function (users, callback) {
      var query = {};
      if (req.query.user) {
        query.user = mongoose.Types.ObjectId(req.query.user);
      }
      var match = { $match: query };
      var group = { $group: { _id: '$user', count: {$sum: 1} } };
      searchLog.aggregate([match, group], function (err, result) {
        if (err) { callback(err, result); }

        result = _.map(users, function (u) {
          _.each(result, function (r) {
            if (u._id.toString() === r._id.toString()) {
              u.stats.searches = r.count;
            }
          });
          return u;
        });

        callback(null, users);
      });

    // Get last search per user
    }, function (users, callback) {
      var sort = { $sort: { timestamp: -1 } };
      var group = { $group: { _id: '$user', timestamp: {$first: '$timestamp'} } };
      searchLog.aggregate([sort, group], function (err, result) {
        result = _.map(users, function (u) {
          _.each(result, function (r) {
            if (u._id.toString() === r._id.toString()) {
              u.stats.lastAction = r.timestamp;
            }
          });
          return u;
        });
        callback(null, users);
      });

    // Get last download per user and elect most recent action
    }, function (users, callback) {
      var sort = { $sort: { timestamp: -1 } };
      var group = { $group: { _id: '$user', timestamp: {$first: '$timestamp'} } };
      LogExport.aggregate([sort, group], function (err, result) {
        result = _.map(users, function (u) {
          _.each(result, function (r) {
            if (u._id.toString() === r._id.toString()) {
              if (u.stats.lastAction && r.timestamp &&
                  u.stats.lastAction < r.timestamp) {
                u.stats.lastAction = r.timestamp;
              } else if (!u.stats.lastAction && r.timestamp) {
                u.stats.lastAction = r.timestamp;
              }
            }
          });
          return u;
        });
        callback(null, users);
      });
    }, function (users, callback) {
      if (req.query.user) {
        async.map(users, function(user, cb) {
          util.getUserCredits(user._id, function (err, quota) {
            user.credits = quota;
            cb(err, user);
          });
        }, function (err, users) {
          callback(null, users);
        });
      } else {
        callback(null, users);
      }
    }
  ], function (err, result) {
    res.send(result);
  });
}

function getSearches(req, res, next) {
  var query = {};
  if (req.query.user) {
    query.user = req.query.user;
  }
  var limit = 0;
  if (req.query.limit) {
    limit = +req.query.limit;
  }
  searchLog
    .find(query)
    .sort('-timestamp')
    .limit(limit)
    .populate({ path: 'user', select: 'email' })
    .exec(function (err, results) {
    if (err) { return next(error.Internal(err.message)); }
    res.send(results);
  });
}

function getDownloads(req, res, next) {
  var query = {};
  if (req.query.user) {
    query.user = req.query.user;
  }
  var limit = 0;
  if (req.query.limit) {
    limit = +req.query.limit;
  }
  LogExport
    .find(query)
    .sort('-timestamp')
    .limit(limit)
    .populate({ path: 'user', select: 'email' })
    .populate({ path: 'illustration.owner', select: 'email' })
    .exec(function (err, results) {
    if (err) { return next(error.Internal(err.message)); }
    res.send(results);
  });
}

function getModerationStats(req, res) {
  function diffInDays(end, start){
    return Math.floor(end/8.64e7) - Math.floor(start/8.64e7);
  }

  var end = moment();
  var start = moment().subtract(28, 'days').hour(0).minute(0).second(0);

  var dates = [];
  var win = moment();
  for (var i=0; i<28; i++) {
    dates.push({
      day: win.date(),
      month: win.month(),
      year: win.year(),
      date: win.clone()
    });
    win.subtract(1, 'days');
  }

  var stats = {
    window: {
      start: start,
      end: end,
      dates: dates
    }
  };

  var match = {
    timestamp: {$gte: start},
    $or: [{status: 'accepted'}, {status: 'rejected'}]
  };

  IlluLog.find(match).populate('creator').exec(function(err, data){
    var memo = {};
    _.each(data, function(log){
      var m = log.creator.id;
      if (!memo[m]) {
        memo[m] = {
          name: log.creator.displayName,
          data: [],
          sum: 0
        };
      }

      var offset = diffInDays(end, log.timestamp);

      if (!memo[m].data[offset]) memo[m].data[offset] = 0;
      memo[m].data[offset] += 1;
      memo[m].sum += 1;
    });

    stats.data = _.map(memo, function (v) { return v; });
    res.json(stats);
  });
}

var getSearchesAndDownloadStats = function (req, res, next) {
  var stats = {};
  async.parallel([
    function (callback) {
      searchLog.where().count(function (err, count) {
        stats.totalSearches = count;
        callback();
      });
    },
    function (callback) {
      LogExport.where().count(function (err, count) {
        stats.totalDownloads = count;
        callback();
      });
    },
    function (callback) {
      var query = {
        timestamp: { $gte: new Date(moment().subtract(7, 'days')) }
      };
      LogExport.where(query).count(function (err, count) {
        stats.totalDownloadsLast7Days = count;
        callback();
      });
    },
    function (callback) {
      var query = {
        timestamp: {
          $gte: new Date(moment().subtract(14, 'days')),
          $lt: new Date(moment().subtract(7, 'days'))
        }
      };
      LogExport.where(query).count(function (err, count) {
        stats.totalDownloadsLastWeek = count;
        callback();
      });
    },
    function (callback) {
      var query = {
        timestamp: { $gte: new Date(moment().subtract(7, 'days')) }
      };
      searchLog.where(query).count(function (err, count) {
        stats.totalSearchesLast7Days = count;
        callback();
      });
    },
    function (callback) {
      var query = {
        timestamp: {
          $gte: new Date(moment().subtract(14, 'days')),
          $lt: new Date(moment().subtract(7, 'days'))
        }
      };
      searchLog.where(query).count(function (err, count) {
        stats.totalSearchesLastWeek = count;
        callback();
      });
    },
    function (callback) {
      var aggr = [
        { $group: { _id: 'sum', sum: {$sum: '$results'} }}
      ];
      searchLog.aggregate(aggr).exec(function (err, results) {
        if (results && results.length) {
          stats.totalResults = results[0].sum;
        } else {
          stats.totalResults = 0;
        }
        callback();
      });

    }
  ], function (err) {
    if (err) { return next(error.Internal(err.message)); }
    stats.downloadsSearchRatioLast7Days = (stats.totalDownloadsLast7Days /
      stats.totalSearchesLast7Days) * 100;

    stats.downloadsSearchRatioLast7DaysProgress = (
        stats.totalDownloadsLastWeek / stats.totalSearchesLastWeek) * 100;

    stats.resultsPerSearches = stats.totalResults / stats.totalSearches;

    stats.totalDownloadsLast7DaysProgress = (( stats.totalDownloadsLast7Days -
          stats.totalDownloadsLastWeek) / stats.totalDownloadsLast7Days) * 100;

    stats.totalSearchesLast7DaysProgress = (( stats.totalSearchesLast7Days -
          stats.totalSearchesLastWeek) / stats.totalSearchesLast7Days) * 100;

    res.json(stats);
  });
};


exports.mount = function(app) {
  app.get('/api/v1/stats', auth.isAdmin, getStats);
  app.get('/api/v1/stats/illustrations-count', auth.isAdmin, getCount);
  app.get('/api/v1/stats/designers', auth.isAdmin, getDesignersStats);
  app.get('/api/v1/stats/customers', auth.isAdmin, getCustomersStats);
  app.get('/api/v1/stats/customers/summary', auth.isAdmin, getCustomersStatsSummary);
  app.get('/api/v1/stats/searches', auth.isAdmin, getSearches);
  app.get('/api/v1/stats/searchesAndDownloads', auth.isAdmin, getSearchesAndDownloadStats);
  app.get('/api/v1/stats/downloads', auth.isAdmin, getDownloads);
  app.get('/api/v1/stats/moderation', auth.isAdmin, getModerationStats);
};

