var mongoose = require('mongoose');
var _ = require('underscore');

// define the schema for our user model
var schema = mongoose.Schema({

  // creation info: who + when
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true},
  timestamp: { type : Date, default: Date.now, index: true },

  // illu reference owner + illu id
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true},
  illustration: { type: mongoose.Schema.Types.ObjectId, ref: 'Illustration', index: true},

  // log content: new illustration status + message
  status: {type: String, index: true, enum: ['draft', 'under review', 'rejected', 'accepted']},
  message: { type: String, default: 'Hello' },
  rejection: Number

}, {
  collection: 'illu_logs'
});


module.exports = mongoose.model('LogEntry', schema);
