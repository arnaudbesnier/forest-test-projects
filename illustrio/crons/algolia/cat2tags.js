/*
  >> node update.js
*/

var async = require('async');
var Illustration = require('../../server/models/illustration');
var config = require('../../config/base.js');

// DB
var mongoose = require('mongoose');
mongoose.connect(config.db.url); // connect to the db
mongoose.set('debug', config.debug.mongoose);

var dataSet = [
  { name: 'Animals', category: 5, subcategory: 8, tags: ['animals'] },
  { name: 'Banners', category: 3, subcategory: 5, tags: ['banners'] },
  { name: 'Business & Innovation', category: 9, subcategory: 10, tags: ['business', 'innovation'] },
  { name: 'Cartoon Characters', category: 5, subcategory: 2, tags: ['cartoon', 'characters'] },
  { name: 'Computer & IT', category: 9, subcategory: 3, tags: ['computer', 'internet', 'technology'] },
  { name: 'Corporate Characters', category: 5, subcategory: 4, tags: ['corporate', 'characters'] },
  //{ name: 'Flags', category: 7, subcategory: 6, tags: ['flags'] },
  { name: 'Food', category: 6, subcategory: 5, tags: ['food'] },
  { name: 'Health & Medicine', category: 6, subcategory: 10, tags: ['health', 'medicine'] },
  { name: 'Icons', category: 1, subcategory: 7, tags: ['icons'] },
  { name: 'Industrial & Construction', category: 6, subcategory: 2, tags: ['industrial', 'construction'] },
  { name: 'Labels', category: 3, subcategory: 3, tags: ['labels'] },
  { name: 'Money & Finance', category: 9, subcategory: 2, tags: ['money', 'finance'] },
  { name: 'Nature & Ecology', category: 9, subcategory: 1, tags: ['nature', 'ecology'] },
  { name: 'Office & Administration', category: 6, subcategory: 7, tags: ['office', 'administration'] },
  { name: 'Religion & Myths', category: 9, subcategory: 6, tags: ['religion', 'myths'] },
  { name: 'Signs', category: 3, subcategory: 8, tags: ['signs'] },
  { name: 'Sports & Entertainment', category: 6, subcategory: 3, tags: ['sports', 'entertainment'] },
  { name: 'Transportation & Buildings', category: 6, subcategory: 1, tags: ['transportation', 'buildings'] },
  { name: 'Travel & Vacation', category: 6, subcategory: 4, tags: ['travel', 'vacation'] }
];

function addTags(next) {
  async.eachSeries(dataSet, function (data, cb) {
    console.log('Dealing with', data.name);
    var query = { category: data.category, subcategory: data.subcategory };
    var update = { '$addToSet': { tags: { '$each': data.tags} } };
    var options = { multi: true };
    Illustration.update(query, update, options, function (err, result) {
      console.log('Result: ', result);
      cb();
    });
  }, function (err) {
    next(err);
  });
}

function finish (err) {
  if (err) {
    console.log('\n!! ERROR', err);
    process.exit(1);
  } else {
    console.log('\n<< SUCCESS ' + new Date());
    process.exit(0);
  }
}

async.waterfall([ addTags ], finish);
