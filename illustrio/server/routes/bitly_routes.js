var error = require('../processors/error');
var BitlyAPI = require('node-bitlyapi');
var config = require('../../config/base');
var BitlyLink = require('../models/bitly-link');

var Bitly = new BitlyAPI({
	client_id: config.bitly.client_id,
	client_secret: config.bitly.client_secret
});

Bitly.setAccessToken(config.bitly.access_token);

function backupShortening(user, payload, response) {
  // Remove padding
  var longUrl = response.long_url;
  var length = longUrl.length;
  while (longUrl[length-1] === '=') {
    longUrl = longUrl.slice(0, -1);
    length = longUrl.length;
  }

  var link = {
    longUrl: longUrl,
    shortUrl: response.url,
    schemeName: payload.schemeName,
    schemeColors: payload.schemeColors
  };

  if (user && user.id) {
    link.owner = user.id;
  }

  BitlyLink.findOne({ shortUrl: link.shortUrl }, function (err, result) {
    if (!result) {
      new BitlyLink(link).save(function (err, item) {
        if (err) { console.log(err + ': ' + item); }
      });
    }
  });
}

function shorten(req, res, next) {
  Bitly.shorten({longUrl: req.body.longUrl}, function (err, result) {
    if (err) { return next(new Error.Internal(err)); }
    var response = JSON.parse(result).data;
    backupShortening(req.user, req.body, response);
    res.send(response);
  });
}

function inc(req, res, next) {
  // Remove padding
  var longUrl = req.body.longUrl;
  var length = longUrl.length;
  while (longUrl[length-1] === '=') {
    longUrl = longUrl.slice(0, -1);
    length = longUrl.length;
  }

  BitlyLink.findOne({ longUrl: longUrl }, function (err, bl) {
    if (err) { return next(error.Internal(err.message)); }
    if (!bl) { return next(new error.NotFound('Link not found')); }
    bl.clickCount += 1;
    bl.save(function (err) {
      if (err) { return next(error.Internal(err.message)); }
      res.send();
    });
  });
}


exports.mount = function(app) {
  app.post('/api/v1/shorten', shorten);
  app.post('/api/v1/bitly', inc);
};

