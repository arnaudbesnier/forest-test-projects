#!/usr/bin/env node

/* cli parameters
*
*  >> node moderation_summary.js <hours> <dry>
*
*  hours: [int] size of the time window to consider (in hours, default: 24 hours)
*  dry: if present, no email will be sent
*
*/

var async = require('async');
var _ = require('underscore');
var LogEntry = require('../../server/models/logentry');
var Illustration = require('../../server/models/illustration');
var Serie = require('../../server/models/serie');
var User = require('../../server/models/user');
var config = require('../../config/base.js');
var mailer = require('../../server/processors/mailer');

// DB
var mongoose = require('mongoose');
mongoose.connect(config.db.url); // connect to the db

var window_size = process.argv[2] || 24;
var dry = Boolean(process.argv[3]);
var now = new Date();
var from = new Date();
from.setHours(now.getHours() - window_size);

console.log('\n>> STARTING', new Date());

// operations flow
var flow = [
  getLogs,
  retreiveIllustrations,
  buildSummaryPerUser,
  logSummaries,
];

if (dry) {
  console.log('>> this is a DRY RUN (no email will be sent)');
} else {
  flow.push(sendSummaries);
}

// execute
async.waterfall(flow, finish);


function getLogs(callback) {
  console.log('\nwindow size is ', window_size, 'hours (' + (window_size/24).toFixed(2) + ' days)');
  LogEntry.where('timestamp').gte(from)
    .populate('illustration', 'name series status')
    .populate('owner')
    .sort('-timestamp')
    .exec(function (err, data) {
      console.log('processing ' + data.length + ' logs');
      callback(err, data);
    });
}

function retreiveIllustrations (logs, callback) {
  var illustrations = {};
  var series = [];
  _.each(logs, function (log) {
    if (!log.illustration || !log.owner || illustrations[log.illustration._id]) return;
    if (log.status === log.illustration.status && (log.status === 'accepted' || log.status === 'rejected') ) {
      illustrations[log.illustration._id] = log;
      series.push(log.illustration.series);
    }
  });
  console.log('regarding ' + _.keys(illustrations).length + ' accepted/rejected illustrations');
  // populate series
  Serie.where('_id').in(series).exec(function (err, series) {
    var series = _.indexBy(series, '_id');
    _.each(illustrations, function (log, id) {
      log.series = series[log.illustration.series];
    });
    callback(null, illustrations);
  });
}

function buildSummaryPerUser (illustrations, callback) {
  var summaries = {};
  _.each(illustrations, function (log, id) {
    if (!summaries[log.owner._id]) {
      summaries[log.owner._id] = {
        owner: log.owner,
        accepted: [],
        rejected: []
      }
    }
    summaries[log.owner._id][log.status].push(log);
  });
  console.log('that\'s ' + _.keys(summaries).length + ' summaries to send');
  callback(null, summaries);
}

function logSummaries (summaries, callback) {
  if (summaries.length) console.log('\n(accepted/rejected)');
  _.each(summaries, function (summary) {
    console.log('(' + summary.accepted.length
      + '/' + summary.rejected.length + ')\t' + summary.owner.email);
  })
  callback(null, summaries);
}

function sendSummaries (summaries, callback) {
  if (!_.keys(summaries).length) callback(null);

  var q = async.queue(function (summary, callback) {
    mailer.sendModerationSummary(summary, callback);
  });

  q.drain = function () {
    callback(null);
  }

  _.each(summaries, function (summary) {
    q.push(summary, function (err) {
      if (err) {
        console.log('!! failled to sent email to', summary.owner.email);
        console.log(err);
      } else {
        console.log('email sent to', summary.owner.email )
      }
    });
  });

}


function finish (err, result) {
  if (err) {
    console.log('\n!! ERROR', err);
    process.exit(1);
  } else {
    console.log('\n<< SUCCESS', new Date());
    process.exit(0);
  }
}
