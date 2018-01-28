var mongoose = require('mongoose');

var schema = mongoose.Schema({

  timestamp: { type : Date, default: Date.now, index: true },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  series: { type: mongoose.Schema.Types.ObjectId, ref: 'Serie' },
  query: String,
  category: Number,
  subcategory: Number,
  style: Number,
  results: Number

});


module.exports = mongoose.model('SearchLog', schema);
