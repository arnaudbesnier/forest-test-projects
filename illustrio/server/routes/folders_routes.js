'use strict';

var Folder = require('../models/folder');
var error = require('../processors/error');
var auth = require('../processors/auth');

function get(req, res, next) {
  var query = { owner: req.user.id };

  Folder
    .findOne(query)
    .exec(function(err, folder) {
      if (err) return next(error.Internal(err.message));
      if (!folder) {
        folder = { illustrations: [] };
      }
      res.send(folder);
    }
  );
}

function create(user, next) {
  var folder = {
    owner: user.id,
    illustrations: []
  };

  new Folder(folder).save(function (err, folder) {
    if (err) { return next(error.Internal(err.message)); }
    next(null, folder);
  });
}

function addToFolder(folderId, illuId, next) {
  var now = new Date();
  Folder.update({ _id: folderId }, {
    editedAt: now,
    $addToSet: { illustrations: illuId }
  }, next);
}

function removeFromFolder(folderId, illuId, next) {
  var now = new Date();
  Folder.update({ _id: folderId }, {
    editedAt: now,
    $pull: { illustrations: illuId }
  }, next);
}

function add(req, res, next) {
  var query = { owner: req.user.id };
  Folder.findOne(query, function (err, folder) {
    if (err) return next(error.Internal(err.message));
    if (!folder) {
      create(req.user, function (err, folder) {
        addToFolder(folder._id, req.body.illustration, function (err, folder) {
          if (err) return next(error.Internal(err.message));
          res.send(folder);
        });
      });
    } else {
      addToFolder(folder._id, req.body.illustration, function (err, folder) {
        if (err) return next(error.Internal(err.message));
        res.send(folder);
      });
    }
  });
}

function remove(req, res, next) {
  var query = { owner: req.user.id };
  Folder.findOne(query, function (err, folder) {
    if (err) { return next(error.Internal(err.message)); }
    if (!folder) {
      return next(new error.NotFound('Folder not found'));
    } else {
      removeFromFolder(folder._id, req.body.illustration, function (err, folder) {
        if (err) { return next(error.Internal(err.message)); }
        res.send(folder);
      });
    }
  });
}

exports.mount = function(app) {

  app.get('/api/v1/favorites', auth.canRead, get);
  app.put('/api/v1/favorites/add', auth.canRead, add);
  app.put('/api/v1/favorites/remove', auth.canRead, remove);

};
