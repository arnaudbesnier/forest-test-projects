'use strict';
var _ = require('underscore');
var async = require('async');
var moment = require('moment');
var User = require('../../models/user');
var Download = require('../../models/exportLog');
var Theme = require('../../models/theme');

function UsersDownloadsGetter(params, callback) {

  function refilterOnThemesColor(usersDownloads, callback) {
    var filterColor = params.filter['themes:color']
      .substring(1, params.filter['themes:color'].length - 1);

    async.filter(usersDownloads, function (user, callback) {
      Theme
        .find({ color: filterColor, owner: user._id })
        .lean()
        .exec(function (err, themes) {
          if (err) { return callback(err); }
          callback(!!themes.length);
        });
    }, function (usersDownloads) {
      callback(null, usersDownloads);
    });
  }

  function refilterOnThemesCount(usersDownloads, callback) {
    async.filter(usersDownloads, function (user, callback) {
      var filterCount = params.filter['themes:color'];

      Theme
        .find({ color: { $size: filterCount }, owner: user._id })
        .lean()
        .exec(function (err, themes) {
          if (err) { return callback(err); }
          callback(!!themes.length);
        });
    }, function (usersDownloads) {
      callback(null, usersDownloads);
    });
  }

  function filterDate() {

    var query;
    var filter = params.filter.createdAt;
    var operators = ['>', '<'];
    var operator;
    if (_.contains(operators, filter[0])) {
      operator = filter[0];
      filter = filter.slice(1);
    }

    var dateFilterPresets = {
      'yesterday': moment().subtract(1, 'days'),
      'lastWeek': moment().subtract(7, 'days'),
      'last2Weeks': moment().subtract(14, 'days'),
      'lastMonth': moment().subtract(1, 'months'),
      'last3Months': moment().subtract(3, 'months'),
      'lastYear': moment().subtract(1, 'years')
    };

    var dateFilter = new Date(dateFilterPresets[filter] || new Date(filter));

    if (operator === '>') {
      query = { $gte: dateFilter };
    } else if (operator === '<') {
      query = { $lte: dateFilter };
    }

    return query;
  }

  function filterEmail() {
    return params.filter.email;
  }

  function getUsers(callback) {
    var query = {};
    if (params.filter) {
      if (params.filter.createdAt) {
        query.createdAt = filterDate();
      }
      if (params.filter.email) {
        query.email = filterEmail();
      }
    }

    User
      .find(query)
      .select('email _id createdAt')
      .lean()
      .exec(function (err, users) {
        if (err) { return callback(err); }
        callback(null, users);
      });
  }

  function aggregateDownloads(users, callback) {

    var match = {$match: {}};
    if (params.filter && params.filter.exportlogs) {
      if (params.filter.exportlogs[0] === '>') {
        match.$match = { count : { $gt: +params.filter.exportlogs.substring(1) }};
      } else if (params.filter.exportlogs[0] === '<' ) {
        match.$match = { count : { $gt: +params.filter.exportlogs.substring(1) }};
      } else {
        match.$match = { count : params.filter.exportlogs };
      }
    }

    var group = { $group: { _id: '$user', count: { $sum: 1 } } };
    Download.aggregate([group, match], function (err, results) {
      if (err) { return callback(err); }
      var counts = {};
      for (var i=0; i < results.length; i++) {
        counts[results[i]._id.toString()] = results[i].count;
      }
      for (var j=0; j < users.length; j++) {
        users[j].downloadsCount = counts[users[j]._id.toString()] || null;
      }

      if (params.filter && params.filter.exportlogs) {
        if (params.filter.exportlogs[0] === '>') {
          users = _.filter(users, function (u) { return u.downloadsCount > +params.filter.exportlogs.substring(1); });
        } else if (params.filter.exportlogs[0] === '<' ) {
          users = _.filter(users, function (u) { return u.downloadsCount < +params.filter.exportlogs.substring(1); });
        } else {
          users = _.filter(users, function (u) { return u.downloadsCount === +params.filter.exportlogs.substring(1); });
        }
      }
      callback(null, users);
    });
  }

  function aggregateThemes(users, callback) {
    var colorMatch = { $match: {} };

    if (params.filter && params.filter['themes:color']) {
      var colorFilter = params.filter['themes:color'];

      if (colorFilter[0] === '*' &&
          colorFilter[colorFilter.length - 1] === '*') {

        var filterColor = params.filter['themes:color']
          .substring(1, params.filter['themes:color'].length - 1);
        var re = new RegExp(filterColor, 'i');
        colorMatch.$match = { color: re };
      } else {
        var filterCount = +params.filter['themes:color'];
        colorMatch.$match = { color: { $size: filterCount } };
      }
    }

    var group = { $group: { _id: '$owner', count: { $sum: 1 } } };

    Theme.aggregate([colorMatch, group], function (err, results) {
      if (err) { return callback(err); }
      var counts = {};
      for (var i=0; i < results.length; i++) {
        counts[results[i]._id.toString()] = results[i].count;
      }
      for (var j=0; j < users.length; j++) {
        users[j].themesCount = counts[users[j]._id.toString()] || null;
      }

      if (params.filter && params.filter['themes:color']) {
        users = _.filter(users, function (u) { return u.themesCount > 0; });
      }

      callback(null, users);
    });
  }

  function initFields(users, callback) {
    async.map(users, function (user, callback) {
      user.themes = [];
      user.exportlogs = [];
      callback(null, user);
    }, callback);
  }

  function sort(usersDownloads, callback) {
    var descending = false;
    if (!params.sort) {
      return callback(null, usersDownloads);
    }

    if (params.sort[0] === '-') {
      descending = true;
      params.sort = params.sort.slice(1);
    }

    if (params.sort === 'createdAt') {
      usersDownloads = _.sortBy(usersDownloads, function (user) {
        return user.createdAt;
      });
    } else if (params.sort === 'exportlogs') {
      usersDownloads = _.sortBy(usersDownloads, function (user) {
        return user.downloadsCount;
      });
    } else if (params.sort === 'themes') {
      usersDownloads = _.sortBy(usersDownloads, function (user) {
        return user.themesCount;
      });
    }

    if (descending) {
      usersDownloads = usersDownloads.reverse();
    }

    callback(null, usersDownloads);

  }

  function pagination(usersDownloads, callback) {
    var total = usersDownloads.length;
    if (params.page) {
      var limit = params.page.size || 10;
      var skip = (parseInt(params.page.number) - 1) * limit;

      usersDownloads = usersDownloads.slice(skip, skip + limit);
    }
    callback(null, usersDownloads, total);
  }

  async.waterfall([
    getUsers,
    aggregateDownloads,
    aggregateThemes,
    initFields,
    sort,
    pagination
  ], callback);
}

module.exports = UsersDownloadsGetter;
