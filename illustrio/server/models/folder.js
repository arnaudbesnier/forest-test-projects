'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: { type: String, default: 'Favorites' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date, default: Date.now },
  illustrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Illustration' }]
});

module.exports = mongoose.model('Folder', schema);
