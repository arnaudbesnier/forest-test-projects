'use strict';

var Serie = require('../models/serie');
var error = require('../processors/error');
var auth = require('../processors/auth');
var seriesService = require('../services/series');

function list(req, res, next) {
  var query = {};
  if (!req.user.roles.admin) {
    query.owner = req.user.id;
  } else if (req.user.roles.admin && req.query.owner) {
    query.owner = req.query.owner;
  }
  Serie.count(query, function (err, count) {
    if (err) return next(error.Internal(err.message));
    res.set('X-Total-Count', count);
    Serie
      .find(query)
      .populate('owner', 'firstName email')
      .sort({ 'createdAt': -1 })
      .limit(req.query.limit || 0)
      .exec(function (err, series) {
        if (err) return next(error.Internal(err.message));
        res.send(series);
    });
  });
}

function get(req, res, next) {
  var query = { _id: req.params.id };

  Serie
    .findOne(query)
    .populate('owner', 'firstName email')
    .select('name')
    .exec(function (err, serie) {
      if (err) return next(error.Internal(err.message));
      if (!serie) return next(new error.NotFound('Serie not found'));
      res.send(serie);
    });
}

function create(req, res, next) {
  seriesService.creator(req.user, req.body, function (err, series) {
    if (err) { return next(err); }
    res.send(series);
  });
}

function update(req, res, next) {
  Serie.findById(req.params.id, function (err, serie) {
    if (err) return next(error.Internal(err.message));
    if (!serie) return next(new error.NotFound('Serie not found'));

    if (req.body.name) serie.name = req.body.name;

    serie.save(function (err) {
      if (err) return next(error.Internal(err.message));
      res.send(serie);
    });
  });
}

function remove(req, res, next) {
  seriesService.remover(req.user.roles, req.params.id, function (err, series) {
    if (err) { return next(err); }
    res.send(series);
  });
}

exports.mount = function(app) {
  app.get('/api/v1/series', auth.canRead, list);
  app.get('/api/v1/series/:id', auth.canRead, get);
  app.post('/api/v1/series', auth.canUpdate, create);
  app.put('/api/v1/series/:id', auth.canUpdate, update);
  app.delete('/api/v1/series/:id', auth.canUpdate, remove);
};
