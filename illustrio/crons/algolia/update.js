/*
  >> node update.js [<hours>]

  if <hours> arg is provided, only illustrations
  with 'editedAt' timestamp between now and now-hours
  will be updated/unlisted in index.
  this allows for regular incremental updates.

  if no <hours> arg is provided, a tmp index is created,
  all illustrations are added to this tmp index,
  and the tmp index is moved to the staging/production index.
  this ensure zero downtime when rebuilding the entire index.

*/

var async = require('async');
var _ = require('underscore');
var Illustration = require('../../server/models/illustration');
var config = require('../../config/base.js');

// params
var window_size = process.argv[2];
var reset = !window_size;

// DB
var mongoose = require('mongoose');
mongoose.connect(config.db.url); // connect to the db

// algolia
var algolia = require('algoliasearch');
var client = new algolia(config.algolia.app, config.algolia.api_key);

// build parser from pegjs grammar (v2)
var pegjs = require('pegjs');
var fs = require('fs');
var code = fs.readFileSync( __dirname + '/../../node_modules/illustrio-lib/parser/v2.pegjs', 'utf8');
var Parser = pegjs.buildParser(code);

// indexes
var indexName = config.algolia.index;
var index = client.initIndex(indexName);
var tmpIndexName = 'tmp-illustrations-' + Math.round(Math.random()*10000);
var tmpIndex = client.initIndex(tmpIndexName);
var settings = {
  'attributesToIndex': ['_tags', 'name', 'vars','_id', 'series'],
  'attributesToRetrieve': ['_id', 'name'],
  'attributesForFaceting': ['vars','type','_tags', 'series'],
  'unretrievableAttributes': ['score'],
  'customRanking': ['desc(score)', 'desc(editedAt)'],
  'hitsPerPage': 30
};


function getIllustrations (next) {
  console.log('getting illustrations');

  var query = {status: 'accepted'};

  if (reset) {
    query['review.public'] = {$ne: false};
  } else {
    var now = new Date();
    var from = new Date();
    from.setHours(now.getHours() - window_size);
    from.setMinutes(now.getMinutes() - 5); // add 5 additional minutes to the window.
    query.editedAt = {$gte: from};
  }

  Illustration.find(query)
    .select('name tags review illuType css editedAt series')
    .exec( next );
}


function buildEntries (illustrations, next) {
  console.log('building ' + illustrations.length + ' index entries');

  var docs = _.map(illustrations, function (i) {

    var vars = Parser.parse(i.css || '').vars;

    var obj = {
      objectID: i._id,
      _id: i._id,
      editedAt: i.editedAt,
      name: i.name,
      type: i.illuType,
      score: i.review.score,
      _tags: i.tags,
      public: i.review.public || false,
      vars: _.pick(vars, _.identity),
      series: i.series
    };

    // set type

    //if (obj.vars.data) {
      //obj.type = 'percentage';
    //} else if (obj.vars.text) {
      //obj.type = 'word';
    //} else if (i.illuType === 'icon') {
      //obj.type = 'icon';
    //} else {
      //obj.type = 'illustration';
    //}

    return obj;
  });
  next(null, docs);
}


function clearTemporaryIndex (next) {
  console.log('clearing temporary index');
  tmpIndex.clearIndex( function (error) {
    if (error) {
      next(error);
    } else {
      console.log('updating index settings');
      tmpIndex.setSettings(settings);
      next(null);
    }
  });
}

function addToIndex (docs, next) {
  function filterPublic (state) {
    return function (e) {
      return e.public === state;
    };
  }
  var updated = _.filter(docs, filterPublic(true));
  console.log(updated.length + ' illustrations to update');
  var unlisted = _.filter(docs, filterPublic(false));
  console.log(unlisted.length + ' illustrations to unlist');

  // update
  async.parallel({
    updated: function (cb) {
      index.saveObjects(updated, cb);
    },
    unlisted: function (cb) {
      var unlistedIDs = _.map(unlisted, function (e) {
        return e.objectID;
      });
      index.deleteObjects(unlistedIDs, cb);
    }
  }, function (error) {
    next(error);
  });
}

function addToTemporaryIndex (docs, next) {
  console.log('adding illustrations to temporary index');

  tmpIndex.saveObjects(docs, function(error) {
      if (error) {
        next(error);
      } else {
        next(null);
      }
  });
}

function moveIndex (next) {
  console.log('moving temporary index to index: ' + indexName);

  client.moveIndex(tmpIndexName, indexName, function (error) {
    if (error) {
      next(error);
    } else {
      client.deleteIndex(tmpIndexName);
      next(null);
    }
  });
}

function finish (err, result) {
  if (err) {
    console.log('\n!! ERROR', err, result.message);
    process.exit(1);
  } else {
    console.log('\n<< SUCCESS ' + new Date());
    process.exit(0);
  }
}

if (reset) {
  // hard reset:
  // create a temporary index, add all public illustrations, and move it to current index
  console.log('\n>> STARTING [RESET] ' + new Date() + '\n');
  async.waterfall([
    clearTemporaryIndex,
    getIllustrations,
    buildEntries,
    addToTemporaryIndex,
    moveIndex
  ], finish);
} else {
  // incremental update: (window size is in hours)
  // update/unlist illustrations with editedAt timestamp in time window
  console.log('\n>> STARTING [window-size:' + window_size + '] ' + new Date() + '\n');
  async.waterfall([
    getIllustrations,
    buildEntries,
    addToIndex
  ], finish);
}
