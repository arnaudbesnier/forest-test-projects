'use strict';

var SVGO = require('svgo');
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');


function clean(req, res) {
  var config = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname + '/../../svgo.yml'), 'utf8'));
  var svgo = new SVGO(config);
  var svg = req.body.data;
  var sanitized = svg.replace(/&/g, '&amp;');
  svgo.optimize(sanitized, function (result) {
    res.send(result);
  });
}

exports.mount = function(app) {
  app.post('/api/v1/clean/:id', clean);
  app.post('/api/clean', clean);
  app.post('/api/v1/clean', clean);
};
