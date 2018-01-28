'use strict';

var mongoose = require('mongoose');

var GallerySchema = mongoose.Schema({
  name: String,
  illustrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Illustration' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type : Date, default: Date.now },
  type: String,
  description: String,
  isPublic: { type: Boolean, default: false }
});


module.exports = mongoose.model('Gallery', GallerySchema);
