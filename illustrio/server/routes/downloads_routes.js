var auth = require('../processors/auth');
var error = require('../processors/error');
var Download = require('../models/exportLog');

var list = function (req, res, next) {
  var query = { user: req.user.id };

  Download
    .find(query)
    .select('timestamp url illustration.name illustration._id -_id')
    .sort('-timestamp')
    .exec(function (err, results) {
    if (err) { return next(error.Internal(err.message)); }
    res.send(results);
  });

};

exports.mount = function (app) {
  app.get('/api/v1/downloads', auth.canRead, list);
};
