'use strict';

var mongoose = require('mongoose');

var BenchSchema = mongoose.Schema({
  timestamp: { type : Date, default: Date.now, index: true },
  illustration: { type: mongoose.Schema.Types.ObjectId, ref: 'Illustration', index: true },
  renderingTime: { type: Number, index: true, min: [23, 'too sssssshort'], max: 89 },
  customize: Number,
  transform: Number,
  geotransform: Number,
  attributes: Number,
  svgLength: Number,
  cssLength: Number,
  rulesCount: Number,
  controlTypes: {}
});

module.exports = mongoose.model('Benchmark', BenchSchema);
