var async = require('async');
var config = require('../../config/base.js');
var Illustration = require('../../server/models/illustration');
var mongoose = require('mongoose');
var algolia = require('algoliasearch');
var Promise = require("bluebird");

// DB
mongoose.connect(config.db.url); // connect to the db

// algolia
var client = new algolia(config.algolia.app, config.algolia.api_key);
var index = client.initIndex( config.algolia['index-tags'] );

var settings = {
  'attributesToIndex': ['tagName','total'],
  'attributesToRetrieve': ['tagName','byType'],
  'attributesForFaceting': ['tagName'],
  'customRanking': ['desc(total)'],
  'hitsPerPage': 10
};

/**
  Lodash inspired Chunck utility function.
**/
function chunk(array, size) {
  size = Math.max(parseInt(size,10), 0);
  var length = array ? array.length : 0;
  if (!length || size < 1) {
    return [];
  }
  var index = 0,
      resIndex = -1,
      result = Array(Math.ceil(length / size));

  while (index < length) {
    result[++resIndex] = array.slice( index, (index += size) );
  }
  return result;
}

function onError(error){
  console.log(error);
  process.exit(1);
}

function onSuccess (tags){
  console.log(tags.length + ' Records successfully inserted');
  process.exit(0);
}

function clearTags(){
  console.log('Removing all records from : ' + config.algolia['index-tags']);
  return index.clearIndex();
}

function getTags(){
  console.log('Fetching tags with mongoose');
  return Illustration.aggregate(
    /*
     { $match: {status: 'accepted','review.public':true} },
     { $unwind: '$tags' },
     { $group : { _id : { $toLower : '$tags' }, count : { $sum : 1 } } },
     { $sort : { count : -1 } }
*/
     { $match: {status: 'accepted','review.public':true} },
     { $unwind: '$tags' },
     { $group: { _id: { illuType: '$illuType', tagName: { $toLower: '$tags' } }, count: { $sum: 1 } } },
     { $group: { _id: '$_id.tagName', byType: { $push: {type: '$_id.illuType', count: '$count'} } } },
     { $project: { tagName: '$_id', _id: 0, byType: 1 } }

  ).exec();
}

function buildTagsEntries(tags){
  console.log('Building ' + tags.length + ' index entries');
  var tagsEntries = tags.map(function (tag) {
    var obj = {
        'tagName' : tag.tagName,
        'byType' : {},
        'total' : 0
    };
    for (i=0; i < tag.byType.length; i++) {
      obj.byType[ tag.byType[i].type ] = tag.byType[i].count;
      obj.total += tag.byType[i].count;
    }
    return obj;
  });
  console.log('Here is the 10th entry : ',tagsEntries[10]);
  return tagsEntries;
}

function insertTags(tags){
  console.log('Importing entries to Algolia index : ' + config.algolia['index-tags']);
  // split our results into chunks of 5,000 objects, to get a good indexing/insert performance
  var chunkedResults = chunk(tags, 5000);
  return new Promise(function(resolve, reject) {
    function end(err){
      if (!err) {
        resolve(tags);
      } else {
        reject(Error(err));
      }
    }
    async.each(chunkedResults, index.addObjects.bind(index), end);
  });
}

index.setSettings(settings);
clearTags().then(getTags).then(buildTagsEntries).then(insertTags).then(onSuccess).catch(onError);
