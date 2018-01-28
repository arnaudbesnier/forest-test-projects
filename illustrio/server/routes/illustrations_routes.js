'use strict';

var auth = require('../processors/auth');
var async = require('async');
var Illustration = require('../models/illustration');
var finder = require('../services/finder');
var User = require('../models/user');
var LogEntry = require('../models/logentry');
var error = require('../processors/error');
var SearchLog = require('../models/searchlog');
var Gallery = require('../models/gallery');
var _ = require('underscore');

var logSearchQuery = function (user, query, results) {
  var log = {
    user: user._id,
    query: query.q,
    category: query.category,
    subcategory: query.subcategory,
    style: query.style,
    series: query.series,
    results: results,
    limit: query.limit || 0
  };
  new SearchLog(log).save(function (err) {
    if (err) { console.log(err); }
  });
};


function list(req, res, next) {

  var options = req.query;

  // User permissions
  if (req.user.roles.admin && req.query.unlisted) {
    options.unlisted = true;
  }

  if (!req.user.roles.admin && req.user.roles.contributor) {
    options.or = [{owner: req.user.id}, {status: 'accepted', createdAt: {$gt: new Date(2015,5,1)}}];
    //options.owner = req.user.id;
  } else if (req.user.roles.admin && req.query.owner) {
    options.owner = req.query.owner;
  } else if (!req.user.roles.admin && !req.user.roles.contributor) {
    options.status = 'accepted';
  }

  finder.listIllustrations(options, function (err, count, illustrations) {

    // Set count to header
    res.set('X-Total-Count', count);

    if (err) { return next(error.Internal(err.message)); }

    // should we log this query?
    // If yes, let this be async
    var logQuery = !(req.user.roles.admin || req.user.roles.contributor);
    if (logQuery && req.query.q) { logSearchQuery(req.user, req.query, count); }

    res.send(illustrations);

  });
}

function get(req, res, next) {
  // A user can only see its own illustrations and the public ones
  // An admin can see all
  var query = { _id: req.params.id };
  if (!req.user.roles.admin) {
    query['review.public'] = true;
    if (req.user.roles.contributor) {
      query['review.public'] = { $ne: false };
      //query.owner = req.user.id;
    }
  }

  var populateQuery = [];
  var populateFields = [];

  if (req.query.populate) {
    populateFields = req.query.populate.split(',');
  }

  if (_.contains(populateFields, 'series')) {
    populateQuery.push({ path: 'series', select: 'name editedAt'});
  }

  // By default, don't get svg and css
  var fields = {};

  // Give the possibility to get the full document with the `full` query param
  if (!req.query.full) {
    // Give the possiblity to specify the `output` query param to ask for svg or
    // css only
    if (req.query.output === 'css') {
      fields = { css: 1 };
    } else if (req.query.output === 'svg') {
      fields = { svg: 1 };
    } else {
      fields = { svg: 0, css: 0, tags: 0, createdAt: 0, __v: 0 };
    }
  }

  // Execute query
  Illustration
    .findOne(query)
    .populate(populateQuery)
    .select(fields)
    .exec(function(err, illustration) {
      if (err) return next(error.Internal(err.message));
      if (!illustration) {
       return next(new error.NotFound('Illustration not found'));
      }

      // Depending on the query param, give a different output and content-type
      if (req.query.output === 'svg') {
        res.type('image/svg+xml');
        res.send(illustration.svg);
      } else if (req.query.output === 'css') {
        res.type('text/plain');
        res.send(illustration.css);
      } else {
        res.send(illustration);
      }
    }
  );
}

function create(req, res, next) {
  var body = req.body;
  if (!req.user.roles.admin) {
    body.owner = req.user.id;
  } else {
    if (!body.owner) {
      return next (new error.BadRequest('No owner specified.'));
    }
  }

  body.status = 'draft';

  new Illustration(body).save(function (err, illu) {
    if (err) return next(error.Internal(err.message));
    res.send(illu);
  });

}

function saveLog(userId, illu, review) {
  var log = {
   illustration: illu._id,
   owner: illu.owner,
   status: illu.status,
   creator: userId,
   timestamp: Date.now()
  };

  // set review
  if (review) {
    if (review.message) log.message = review.message;
    if (review.rejection) log.rejection = review.rejection;
  }

  new LogEntry(log).save();
}


function update(req, res, next) {
  var body = req.body;
  var query = { _id: req.params.id };

  if (!req.user.roles.admin) {
    query.owner = req.user.id;
    body = _.omit(body, 'owner', 'createdAt', 'review');
  }

  body.editedAt = Date.now();

  Illustration.findOne(query, function (err, illu) {
    if (err) return next(error.Internal(err.message));
    if (!illu) return next(new error.NotFound('Illustration not found'));

    if (!req.user.roles.admin &&
        (illu.status === 'accepted' || illu.status === 'under review')) {
      body = _.pick(body, 'name', 'series');
    }

    // Did status change?
    var statusChanged = (body.status && body.status !== illu.status);

    // Remove last benchmark timestamp if svg or css has changed
    if ((body.svg && body.svg !== illu.svg) ||
        (body.css && body.css !== illu.css)) {
      illu.benchmarkedAt = undefined;
      body.benchmarkedAt = undefined;
    }

    illu = _.extend(illu, body);

    var saveAndReturn = function () {
      // update illustration and save
      illu.save(function (err) {
        if (err) return next(error.Internal(err.message));
        if (statusChanged) saveLog(req.user.id, illu, body.review);
        res.send(illu);
      });
    };

    // check if illustration needs to be flagged as payable
    if (statusChanged && body.status === 'accepted') {
      User.findOne({_id: illu.owner}).exec(function (err, owner) {
        if (owner && owner.postPaidSince) {
          var now = new Date();
          var nextYear = new Date();
          illu.payableFrom = now;
          illu.payableTo = nextYear.setFullYear(nextYear.getFullYear() + 1);
        }
        illu.acceptedAt = new Date();
        saveAndReturn();
      });
    } else {
      saveAndReturn();
    }

  });
}

function remove(req, res, next) {
  var query = { _id: req.params.id };
  if (!req.user.roles.admin) {
    query.owner = req.user.id;
  }

  async.series([
    function(callback) {
      Illustration.findById(req.params.id, function (err, illu) {
        if (err) callback(new error.Internal(err.message));
        if (!illu) callback(new error.NotFound('Illustration not found'));
        // A non admin cannot delete an illustration which status is accepted
        // or under review.
        if (!req.user.roles.admin) {
          if (illu.status === 'accepted' || illu.status === 'under review') {
            callback(new error.BadRequest('Cannot delete this illustration'));
          } else {
            illu.remove(function (err) {
              callback(err);
            });
          }
        // An admin can delete any illustration unless it's already been
        // reviewed at least once. In that case, the review.public status is
        // set to false and the illustration is dereferenced from its series.
        } else {
          if (illu.review) {
            illu.review.public = false;
            illu.series = undefined;
            illu.save(function (err) {
              callback(err, illu);
            });
          } else {
            illu.remove(function (err) {
              callback(err);
            });
          }
        }
      });
    },
    // In any case, remove the illustration from any gallery it's in.
    function (callback) {
      Gallery.find({ illustrations: req.params.id }, function (err, galleries) {
        async.each(galleries, function (gallery, cb) {
          gallery.illustrations = _.reject(gallery.illustrations, function (i) {
            return i.toString() === req.params.id;
          });
          gallery.save(function (err) {
            cb(err);
          });
        }, function (err) {
          callback(err);
        });
      });
    }
  ], function (err, results) {
    if (err) { return next(err); }
    var illu = results.length ? results[0] : undefined;
    res.send(illu);
  });
}

function toReview(req, res, next) {
  var diff = 15; // minutes
  var expires = new Date(Date.now() - diff*60000);

  var query = {
    status: 'under review',
    $or: [ { 'review.lock': null }, { 'review.lock': { $lt: expires } } ]
  };

  var update = { review: {lock: Date.now()} };
  var sort = { sort: { editedAt: 1 } };

  Illustration.findOneAndUpdate(query, update, sort, function (err, illu) {
    if (err) return next(error.Internal(err.message));
    res.send(_.pick(illu, '_id'));
  });

}

exports.mount = function(app) {
  app.get('/api/v1/illustrations', auth.canRead, list);
  app.get('/api/v1/illustrations/to-review', auth.isAdmin, toReview);
  app.get('/api/v1/illustrations/:id', auth.canRead, get);
  app.post('/api/v1/illustrations', auth.canUpdate, create);
  app.put('/api/v1/illustrations/:id', auth.canUpdate, update);
  app.delete('/api/v1/illustrations/:id', auth.canUpdate, remove);
};
