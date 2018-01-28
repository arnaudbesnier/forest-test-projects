var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var Q = require('q');
var fs = require('fs');
var path = './migrations/1419845840203-rename-categories-and-styles.txt';
var url = 'mongodb://localhost:27017/prod';

var getIllustrations = function(tuple, db) {
  var deferred = Q.defer();
  var collection = db.collection('illustrations');
  collection.find({category:tuple[0], subcategory:tuple[1]}).toArray(function (err, result) {
    if (err) { deferred.reject(err); }
    deferred.resolve(result || []);
  });
  return deferred.promise;
};

var deleteSubcategories = function(id, db) {
  var deferred = Q.defer();
  var collection = db.collection('illustrations');
  var query = { _id: ObjectId.createFromHexString(id) };
  var update = { $set: { subcategory: null } };
  collection.update(query, update, function (err, count, result) {
    if (err) { deferred.reject(err); }
    deferred.resolve(result);
  });
  return deferred.promise;
};

var restoreSubcategories = function(id, category, subcategory, db) {
  var deferred = Q.defer();
  var collection = db.collection('illustrations');
  var query = { _id: ObjectId.createFromHexString(id) };
  var update = { $set: {category: category, subcategory: subcategory } };
  collection.update(query, update, function (err, count, result) {
    if (err) { deferred.reject(err); }
    deferred.resolve(result);
  });
  return deferred.promise;
};


exports.up = function(next){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected correctly to server');

    var subcats = [
      [1,1],  // Concepts - Board Games
      [1,3],  // Concepts - Patchwork
      [2,2],  // Schema - Funnels
      [4,3],  // Analytics - Gantt Charts
      [4,9],  // Analytics - Area Charts
      [5,7],  // People & Animals - Avatars
      [5,10], // People & Animals - Emoticons
      [8,4],  // Measuring Tools - Direction
      [8,6]   // Measuring Tools - Energy
    ];

    var path = './migrations/1419845840203-rename-categories-and-styles.txt';

    if (!fs.existsSync(path)) {

      var toGet = subcats.map(function(tuple) {
        return getIllustrations(tuple, db);
      });

      var counter = 0;
      var content = '';

      Q.all(toGet).then(function (results) {
        var toDelete = [];
        results.forEach(function (result) {
          result.forEach(function (r) {
            counter += 1;
            content += r._id + ',' + r.category + ',' + r.subcategory + '\n';
            toDelete.push(deleteSubcategories(r._id.toString(), db));
          });
        });


        fs.writeFile(path, content, function(err) {
          if(err) {
            console.log(err);
            db.close();
            next();
          } else {
            console.log('The file was saved!');
            console.log(toDelete.length);
            Q.all(toDelete).then(function (deleted) {
              console.log('Deleted subcategories of ' + deleted.length + ' illustrations.');
              db.close();
              next();
            });
          }
        });

      }, function (error) {
        console.log(error);
        db.close();
        next();
      });

    } else {

      var data = fs.readFileSync(path).toString().split('\n');
      data.pop();
      var toDelete = data.map(function(d) {
        var tuple = d.split(',');
        var id = tuple[0];
        return deleteSubcategories(id, db);
      });

      Q.all(toDelete).then(function(results) {
        console.log('Deleted subcategories of ' + results.length + ' illustrations.');
        db.close();
        next();
      });
    }
  });
};

exports.down = function(next){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected correctly to server');

    if(fs.existsSync(path)) {
      var data = fs.readFileSync(path).toString().split('\n');
      data.pop();
      var toRestore = data.map(function(d) {
        var tuple = d.split(',');
        var id = tuple[0];
        var category = tuple[1];
        var subcategory = tuple[2];
        return restoreSubcategories(id, category, subcategory, db);
      });

      Q.all(toRestore).then(function(results) {
        console.log('Restored ' + results.length + ' illustrations.');
        db.close();
        next();
      });
    } else {
      console.log('Nothing to migrate (' + path + 'does not exist).');
      db.close();
      next();
    }
  });
};

