'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
  date: { type : Date, index: true },
  illustration: { type: mongoose.Schema.Types.ObjectId, ref: 'Illustration', index: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  downloads: Number,
  marketShare: Number,
  popularity: Number,
  payout: Number
});

module.exports = mongoose.model('MonthlyDownload', schema);
