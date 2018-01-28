var fs = require('fs');
var auth = require('../processors/auth');
var path = require('path');

var list = function (req, res) {
  var encoding;
  if (typeof (encoding) === 'undefined'){
    encoding = 'utf8';
  }
  var fp = path.resolve(__dirname + '/../../app/assets/categories.json');
  var file = fs.readFileSync(fp, encoding);
  res.send(JSON.parse(file));
};


exports.mount = function (app) {
  app.get('/api/v1/categories', auth.canRead, list);
};
