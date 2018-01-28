'use strict';

var error = require('../processors/error');
var auth = require('../processors/auth');

var MonthlyDownload = require('../models/monthlyDownload');
var Transaction = require('../models/transaction');
var ExportLog = require('../models/exportLog');

var _ = require('underscore');
var moment = require('moment');
var async = require('async');


var redeemLimit = 70;

function sumField (f) {
  return function (memo, t) {
    return memo + t[f];
  };
}

function list(req, res, next) {
  var query = {};
  if (!req.user.roles.admin) {
    query.user = req.user.id;
  } else if (req.user.roles.admin && req.query.user) {
    query.user = req.query.user;
  }

  // select only transaction without documentReceived or paymentDone timestamp
  if (req.query.needAction) {
    query.$or = [
      {documentReceived: {$exists: false}},
      {paymentDone: {$exists: false}}
    ];
  }

  if (req.query.year && req.query.month) {
    var year = parseInt(req.query.year, 10);
    var month = parseInt(req.query.month, 10);
    query.date = moment.utc([year, month - 1, 1]).toDate();
  }

  // limit to a type of transaction
  if (req.query.type) {
    query.type = req.query.type;
  }

  // only return count
  if (req.query.count) {
    Transaction.count(query, function (err, result) {
      if (err) return next(error.Internal(err.message));
      res.send({ count: result});
    });
  } else {

    Transaction
      .find(query)
      .populate('user', 'email firstName lastName')
      .sort('-timestamp -amount')
      .skip(req.query.skip || 0)
      .limit(req.query.limit || 500)
      .exec(function (err, transactions) {
        if (err) return next(error.Internal(err.message));
        res.send(transactions);
    });
  }
}

function get(req, res, next) {
  var query = { _id: req.params.id };
  if (!req.user.roles.admin) {
    query.user = req.user.id;
  } else if (req.user.roles.admin && req.query.user) {
    query.user = req.query.user;
  }

  Transaction
    .findOne(query)
    .populate('user', 'email firstName lastName')
    .exec(function (err, transaction) {
      if (err) return next(error.Internal(err.message));
      if (!transaction) return next(new error.NotFound('Transaction not found'));
      res.send(transaction);
    });
}

function update(req, res, next) {

  var query = { _id: req.params.id };

  var payload = {};

  if (req.body.documentReceived) {
    if (req.body.documentReceived === true) {
      payload.documentReceived = Date.now();
    } else if (req.body.documentReceived === false) {
      payload.documentReceived = null;
    } else {
      return next(new error.BadRequest('Bad value'));
    }
  }
  if (req.body.paymentDone) {
    if (req.body.paymentDone === true) {
      payload.paymentDone = Date.now();
    } else if (req.body.paymentDone === false) {
      payload.paymentDone = null;
    } else {
      return next(new error.BadRequest('Bad value'));
    }
  }

  if (_.isEmpty(payload)) { return next(new error.BadRequest('Nothing to do')); }

  Transaction.findOneAndUpdate(query, payload, function (err, transaction) {
    if (err) { return next(error.Internal(err.message)); }
    if (!transaction) { return next(new error.NotFound('Transaction not found')); }
    res.send(transaction);
  });

}

function payDownloads(req, res, next) {
  // input validation

  var year = parseInt(req.body.year);
  var month = parseInt(req.body.month);
  var payout = +req.body.payout || 0;

  if (!year || !month) {
    return next(new error.BadRequest('Post body needs year and month parameters'));
  }
  if (month < 1 || month > 12) {
    return next(new error.NotFound('Invalid Month'));
  }

  // define timeframe {from: start of month, to:start of next month});
  var timeframe = {};
  timeframe.from = moment.utc([year, month - 1, 1]);
  timeframe.to = timeframe.from.clone().add({months: 1});

  // we can not pay in the future, unless overwrite flag is true
  if (!req.body.overwrite && timeframe.to > moment.utc()) {
    return next(new error.BadRequest('Doc says: "The end of ' +
      timeframe.from.format('MMMM YYYY') + ' is in the future, Marty!"'));
  }

  // convert to dates
  var from = timeframe.from.toDate();
  var to = timeframe.to.toDate();


  async.parallel({

    // aggregate monthly downloads
    aggregate: function (callback) {
      ExportLog.aggregate([{
        $match: {
          free: false,
          timestamp: {
            $gte: from,
            $lt: to
          }
        }
      },{
        $group: {
          _id: {
            illustration: '$illustration._id',
            owner: '$illustration.owner'
          },
          count: {
            $sum: 1
          }
        }
      },{
        $sort: {
          count: -1
        }
      }]).exec( callback );
    },
    countExistingTransactions: function (callback) {
      Transaction.count({ date: from }, callback);
    },
    // count all downloads this month
    countAll: function (callback) {
      ExportLog.count({
        timestamp: {
            $gte: from,
            $lt: to
          }
      }).exec( callback );
    }

  }, function (err, data) {
    if (err) return res.send(err);

    // Handle the position in the leaderboard. All illustrations with the same
    // number of download should be at the same position.
    var position = 0;
    if (data.aggregate.length) { data.aggregate[0].position = 0; }
    for (var i = 1; i < data.aggregate.length; i++) {
      if (data.aggregate[i-1].count !== data.aggregate[i].count) {
        position += 1;
      }
      data.aggregate[i].position = position;
    }

    var payPerDownload = payout/data.countAll;

    if (!data.aggregate.length) {
      return next(new error.BadRequest('No download this month'));
    }

    if (!req.body.overwrite && data.countExistingTransactions > 0) {
      return next(new error.BadRequest('Transactions for this date already exist.'));
    }

    // build downloads documents
    var downloads = _.map(data.aggregate, function (a) {
      var dl = {};
      dl.date = from;
      dl.illustration = a._id.illustration;
      dl.owner = a._id.owner;
      dl.downloads = a.count;
      if (data.countAll !== 0) {
        dl.marketShare = a.count/data.countAll;
      } else {
        dl.marketShare = 0;
      }
      if (position !== 0) {
        dl.popularity = Math.round((position - a.position)/position*10);
      } else {
        dl.popularity = 0;
      }
      dl.payout = Math.round(payPerDownload*a.count*100)/100;
      return dl;
    });

    // pipeline of operations
    var pipeline = [

      // insert monthly downloads
      function (callback) {
        MonthlyDownload.collection.insert(downloads, function (err) {
          callback(err);
        });
      },

      // aggregate monthly downloads, grouped by illustration's owner (designer)
      function (callback) {
        MonthlyDownload.aggregate([{
          $match: {
            date: from
          }
        },{
          $group: {
            _id: {
              owner: '$owner'
            },
            payout: {
              $sum: '$payout'
            },
            count: {
              $sum: 1
            }
          }
        },{
          $sort: {
            payout: -1
          }
        }], callback);
      },

      // create a payout transaction for each designer
      function (designers, callback) {
        var now = Date.now();
        var transactions = _.map(designers, function (d) {
          d.payout = Math.round(d.payout*100)/100;
          return {
            date: from,
            timestamp: now,
            user: d._id.owner,
            type: 'payout',
            title: 'Payout ' + timeframe.from.format('MMMM YYYY'),
            description: d.count + ' illustrios',
            amount: d.payout,
            documentReceived: now,
            paymentDone: now
          };
        });
        callback(null, transactions);
      },

      // insert transactions
      function (transactions, callback) {
        Transaction.collection.insert(transactions, callback);
      }

    ];

    // if 'overwrite' is in req.body,
    // first remove downloads and transactions already registerd on that date
    if (req.body.overwrite) {
      var removes = [
        function (callback) {
          MonthlyDownload.remove({date: from}, function (err) {
            callback(err);
          });
        },
        function (callback) {
          Transaction.remove({date: from}, function (err) {
            callback(err);
          });
        }
      ];
      pipeline = removes.concat(pipeline);
    }

    // execute pipeline
    async.waterfall(
      pipeline,
      // finally, output transactions created
      function (err, transactions) {
        if (err) {
          res.send(err);
        } else {
          var amountDistributed = _.reduce(transactions, sumField('amount'), 0);
          res.json({
            from: from,
            to: to,
            payout: payout,
            amountDistributed: Math.round(amountDistributed*100)/100,
            transactionsCount: transactions.length,
            transactions: transactions
          });
        }
      }
    );

  });

}

function accountStatus(req, res, next) {
  var query = {};
  if (!req.user.roles.admin) {
    query.user = req.user.id;
  } else if (req.user.roles.admin) {
    if (!req.query.user) {
      return next(new error.BadRequest('you need to provide a user id'));
    }
    query.user = req.query.user;
  }

  // set time frame
  var timeframe = {};
  timeframe.to = moment().startOf('month').utc();
  timeframe.startOfYear = moment().startOf('year').utc();

  Transaction.find(query).select('-_id type date amount').sort({date: -1}).exec(function (err, transactions) {
    if (err) return next(error.Internal(err.message));
    var monthlyPayout = [];
    var revenue = 0;
    var yearToDate = 0;
    var balance = 0;

    _.each(transactions, function (t) {
      if (t.type === 'payout') {
        var date = moment(t.date).utc();
        monthlyPayout.push({
          date: date.format('YYYYMMDD'),
          offset: timeframe.to.diff(date, 'months', true) - 1,
          label: date.format('MMM'),
          amount: t.amount
        });
        if (timeframe.startOfYear.isSame(date, 'year')) {
          yearToDate += t.amount;
        }
        revenue += t.amount;
      }
      balance += t.amount;
    });

    res.send({
      balance: balance,
      yearToDate: yearToDate,
      revenue: revenue,
      monthlyPayout: monthlyPayout,
      redeemLimit: redeemLimit
    });
  });

}


function redeem(req, res, next) {
  var query = {};
  if (!req.user.roles.admin) {
    query.user = req.user.id;
  } else if (req.user.roles.admin) {
    if (!req.query.user) {
      return next(new error.BadRequest('you need to provide a user id'));
    }
    query.user = req.query.user;
  }

  Transaction.find(query).exec(function (err, transactions) {
    var balance = _.reduce(transactions, sumField('amount'), 0);
    if (balance >= redeemLimit) {
      Transaction.create({
        user: query.user,
        type: 'redeem',
        amount: -balance,
        title: 'Redeem on account'
      }, function (err, doc) {
        if (err) return next(error.Internal(err.message));
        res.send(doc);
      });
    } else {
      res.send();
    }

  });
}

exports.mount = function(app) {
  app.get('/api/v1/transactions', auth.canRead, list);
  app.post('/api/v1/transactions/pay-downloads', auth.isAdmin, payDownloads);
  app.get('/api/v1/transactions/:id', auth.canRead, get);
  app.put('/api/v1/transactions/:id', auth.isAdmin, update);

  app.get('/api/v1/transactions/status', auth.canRead, accountStatus);
  app.get('/api/v1/transactions/redeem', auth.canRead, redeem);
};
