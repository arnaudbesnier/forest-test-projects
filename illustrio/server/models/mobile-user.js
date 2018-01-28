var mongoose = require('mongoose');

var schema = mongoose.Schema({
  email : {type: String, index: true},
  createdAt: { type : Date, default: Date.now }
});

module.exports = mongoose.model('MobileUser', schema);
