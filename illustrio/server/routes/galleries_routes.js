'use strict';

var Gallery = require('../models/gallery');
var Illustration = require('../models/illustration');
var error = require('../processors/error');
var _ = require('underscore');
var auth = require('../processors/auth');

function list(req, res, next) {
  var query = { isPublic: true };

  if (req.user && req.user.roles.admin && _.has(req.query, 'all')) {
    query = {};
  }

  if (req.query.type) {
    var types = req.query.type.split(',');
    query.$or = _.map(types, function (t) {
      return { type: t };
    });
  }

  Gallery
    .find(query)
    .populate([
      { path: 'creator', select: 'email firstName'},
      { path: 'illustrations', select: 'colors.main colors.custom status'}
    ])
    .exec(function(err, galleries) {
      if (err) return next(error.Internal(err.message));
      res.send(galleries);
    }
  );
}

function get(req, res, next) {
  var query = { _id: req.params.id };
  if (!req.user) {
    query.isPublic = true;
  }

  Gallery
    .findOne(query)
    .populate([
      { path: 'creator', select: 'email firstName'},
      { path: 'illustrations', select: 'colors.main colors.custom status'}
    ])
    .exec(function(err, gallery) {
      if (err) return next(error.Internal(err.message));
      if (!gallery) return next(new error.NotFound('Gallery not found'));

      res.send(gallery);
    }
  );
}

function create(req, res, next) {
  var body = req.body;
  body.creator = req.user.id;

  new Gallery(body).save(function (err, gallery) {
    if (err) return next(error.Internal(err.message));
    res.send(gallery);
  });
}

function update(req, res, next) {
  Gallery.findById(req.params.id, function (err, gallery) {
    if (err) return next(error.Internal(err.message));
    if (!gallery) return next(new error.NotFound('Gallery not found'));

    if (req.body.name) { gallery.name = req.body.name; }
    if (req.body.type) { gallery.type = req.body.type; }
    if (req.body.description) { gallery.description = req.body.description; }
    if (_.has(req.body, 'isPublic')) { gallery.isPublic = req.body.isPublic; }
    if (req.body.illustrations) {
      gallery.illustrations = req.body.illustrations;
    }

    gallery.save(function (err) {
      if (err) return next(error.Internal(err.message));
      res.send(gallery);
    });
  });
}

function remove(req, res, next) {
  Gallery.findById(req.params.id, function (err, gallery) {
    if (err) return next(error.Internal(err.message));
    if (!gallery) return next(new error.NotFound('Gallery not found'));

    gallery.remove(function(err) {
      if (err) return next(error.Internal(err.message));
      res.send(gallery);
    });
  });
}

function getIllustration(req, res, next) {
  var query = { _id: req.params.galleryId, isPublic: true };
  Gallery.findOne(query, function (err, gallery) {
    if (err) return next(error.Internal(err.message));
    if (!gallery) return next(new error.NotFound('Gallery not found'));

    var illustrationsIds = _.map(gallery.illustrations, function (illu) {
      return illu.toString();
    });

    if (_.contains(illustrationsIds, req.params.illustrationId)) {
      Illustration
        .findById(req.params.illustrationId)
        .select('css svg name status')
        .exec(function (err, illustration) {
          if (err) { return next(error.Internal(err.message)); }
          if (!illustration) { return next(new error.NotFound('Illustration not found')); }
          res.send(illustration);
        });
    } else {
      return next(new error.NotFound('Unknown illustration id'));
    }

  });
}

exports.mount = function(app) {
  app.get('/api/v1/public-galleries', list);
  app.get('/api/v1/public-galleries/:id', get);
  app.get('/api/v1/public-galleries/:galleryId/illustrations/:illustrationId', getIllustration);

  app.get('/api/v1/galleries', auth.canRead, list);
  app.get('/api/v1/galleries/:id', auth.canRead, get);
  app.post('/api/v1/galleries', auth.isAdmin, create);
  app.put('/api/v1/galleries/:id', auth.isAdmin, update);
  app.delete('/api/v1/galleries/:id', auth.isAdmin, remove);

  app.get('/api/galleries', list);
  app.get('/api/galleries/:id', get);
  app.post('/api/galleries', create);
  app.put('/api/galleries/:id', update);
  app.delete('/api/galleries/:id', remove);
};
