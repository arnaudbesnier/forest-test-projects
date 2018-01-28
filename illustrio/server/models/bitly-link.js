var mongoose = require('mongoose');

var schema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now, index: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  longUrl: {type: String, index: true },
  shortUrl: {type: String, index: true },
  schemeName: String,
  schemeColors: [],
  clickCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Bitly Link', schema);
