var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  color: [],
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  createdAt: { type : Date, default: Date.now },
  editedAt: { type : Date, default: Date.now },
  default: { type: Boolean, default: false },
  public: Boolean
});

module.exports = mongoose.model('Theme', schema);
