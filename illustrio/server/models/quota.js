var mongoose = require('mongoose');

var schema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  count: Number,
  start: Date,
  end: Date,
  type: { type: String, index: true, enum: ['quota']}
});

module.exports = mongoose.model('Quota', schema);
