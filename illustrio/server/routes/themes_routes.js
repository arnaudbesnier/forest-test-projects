'use strict';

var Theme = require('../models/theme');
var error = require('../processors/error');
var auth = require('../processors/auth');
var _ = require('underscore');

function list(req, res, next) {
  var query = { owner: req.user.id };

  Theme.count(query, function (err, count) {
    if (err) return next(error.Internal(err.message));
    res.set('X-Total-Count', count);
    Theme
      .find(query)
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
  if (!req.user.roles.admin) {
    query.owner = req.user.id;
  } else if (req.user.roles.admin && req.query.owner) {
    query.owner = req.query.owner;
  }

  Theme
    .findOne(query)
    .exec(function (err, theme) {
      if (err) { return next(error.Internal(err.message)); }
      if (!theme) { return next(new error.NotFound('Theme not found')); }

      res.send(theme);
    });
}

function create(req, res, next) {
  if (!req.user.id) {
    return next(new error.BadRequest('Color schemes must have an owner.'));
  }

  req.body.owner = req.user.id;

  if (req.body.color && req.body.color.constructor === Array) {
    req.body.color = _.compact(req.body.color);
  }

  var query = { name: req.body.name, color: req.body.color };

  Theme
    .findOne(query)
    .exec(function (err, theme) {

      if (err) { return next(error.Internal(err.message)); }

      if (!theme) {

        theme = new Theme();
        theme.name = req.body.name;
        theme.color = req.body.color;
        theme.owner = req.body.owner;
        if (req.body.referred) { theme.referrer = req.body.referrer; }

        theme.save(function (err, newTheme) {
          if (err) { return next(error.Internal(err.message)); }
          res.send(newTheme);
        });

      } else {
        res.send(theme);
      }
    });
}

function update(req, res, next) {
  var query = {
    _id: req.params.id
  };

  if (!req.user.roles.admin) {
    query.owner = req.user.id;
  }

  Theme.findOne(query, function (err, theme) {
    if (err) return next(error.Internal(err.message));
    if (!theme) return next(new error.NotFound('Theme not found'));

    if (req.body.name) { theme.name = req.body.name; }
    if (req.body.color && req.body.color.constructor === Array) {
      theme.color = _.compact(req.body.color);
    }

    theme.save(function (err, t) {
      if (err) { return next(error.Internal(err.message)); }
      res.send(t);
    });
  });
}


function remove(req, res, next) {
  var query = {
    _id: req.params.id,
    owner: req.user.id
  };

  Theme.findOne(query, function (err, theme) {
    if (err) { return next(error.Internal(err.message)); }
    if (!theme) { return next(new error.NotFound('Theme not found')); }
    theme.remove(function (err) {
      if (err) { return next(error.Internal(err.message)); }
      res.send(theme);
    });
  });
}

exports.mount = function(app) {
  app.get('/api/v1/themes', auth.canRead, list);
  app.get('/api/v1/themes/:id', auth.canRead, get);
  app.post('/api/v1/themes', auth.canRead, create);
  app.put('/api/v1/themes/:id', auth.canRead, update);
  app.delete('/api/v1/themes/:id', auth.canRead, remove);
};
