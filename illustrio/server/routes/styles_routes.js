var fs = require("fs")
var auth = require('../processors/auth');
var path = require('path');

var list = function (req, res, next) {
  if (typeof (encoding) == 'undefined') {
    encoding = 'utf8';
  }
  var fp = path.resolve(__dirname + '/../../app/assets/design_styles.json');
  var file = fs.readFileSync(fp, encoding);
  res.send(JSON.parse(file));
};


exports.mount = function (app, models) {
  app.get('/api/v1/styles', auth.canRead, list);
}
