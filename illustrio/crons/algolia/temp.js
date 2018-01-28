/*
  >> node update.js
*/

var async = require('async');
var _ = require('underscore');
var Illustration = require('../../server/models/illustration');
var config = require('../../config/base.js');

// DB
var mongoose = require('mongoose');
mongoose.connect(config.db.url); // connect to the db

// build parser from pegjs grammar (v2)
var pegjs = require('pegjs');
var fs = require('fs');
var code = fs.readFileSync( __dirname + '/../../node_modules/illustrio-lib/parser/v2.pegjs', 'utf8');
var Parser = pegjs.buildParser(code);

var percentageTags = [
  'generic',
  'facebook',
  'twitter',
  'geography',
  'drink',
  'people',
  'finance',
  'miscellaneous'
];

var wordsTags = [
  'technology',
  'letters',
  'writing',
  'callout',
  'party',
  'sign',
  'miscellaneous'
];

var percentagescount = 0;
var wordscount = 0;

function getIllustrations (next) {
  console.log('getting illustrations');

  var query = {status: 'accepted'};

  Illustration.find(query)
    .select('name tags css')
    .exec(next);
}

function addTag(illustrations, next) {
  async.each(illustrations, function (i, cb) {

    var vars = Parser.parse(i.css || '').vars;
    var obj = {
      vars: _.pick(vars, _.identity),
    };

    if (obj.vars.data) {
      if (_.intersection(i.tags, percentageTags).length === 0) {
        percentagescount += 1;
        i.tags.addToSet('miscellaneous');
        console.log(percentagescount, i._id, i.tags);
        i.save(function (err) {
          cb(err);
        });
      } else {
        cb();
      }
    } else if (obj.vars.text) {
      if (_.intersection(i.tags, wordsTags).length === 0) {
        wordscount += 1;
        i.tags.addToSet('miscellaneous');
        console.log(wordscount, i._id, i.tags);
        i.save(function (err) {
          cb(err);
        });
      } else {
        cb();
      }
    } else {
      cb();
    }
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

async.waterfall([ getIllustrations, addTag ], finish);
