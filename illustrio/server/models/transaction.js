'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  type: {type: String, index: true, enum: ['payout','redeem']},
  timestamp: { type : Date, default: Date.now, index: true },

  date: { type: Date, index: true },
  title: String,
  description: String,
  amount: Number,

  // status
  documentReceived: {type: Date, default: null, index: true},
  paymentDone: {type: Date, default: null, index: true}

});

module.exports = mongoose.model('Transaction', schema);
