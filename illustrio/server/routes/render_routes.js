var request = require('request');
var Illustration = require('../models/illustration');
var ExportLog = require('../models/exportLog');
var error = require('../processors/error');
var auth = require('../processors/auth');
var config = require('../../config/base');
var slug = require('slug');
var shortid = require('shortid');
var async = require('async');
var me = require('../routes/me_routes');

Math.between = function (n1, n2, n3) {
  return isNaN(n1) || isNaN(n2) || isNaN(n3) ? NaN : n1 >= Math.min(n2, n3) && n1 <= Math.max(n2, n3);
};

var logExport = function (user, illustration, payload, fileUrl) {
  var log = {
    user: user._id,
    illustration: {
      _id: illustration._id,
      name: illustration.name,
      series: illustration.series,
      category: illustration.category,
      subcategory: illustration.subcategory,
      style: illustration.style,
      owner: illustration.owner,
      illuType: illustration.illuType
    },
    customization: payload.customization,
    exportOptions: payload.exportOptions,
    url: fileUrl
  };

  if (illustration.payableTo) {
    var now = Date.now();
    log.free = (now < illustration.payableFrom) || (illustration.payableTo < now);
  }

  new ExportLog(log).save(function (err, item) {
    if (err) { console.log(err + ': ' + item); }
  });
};

function getFilename(name, format) {
  name = name ? name : '';
  return slug(name) + '-' + shortid.generate() + '.' + format;
}

var render = function (req, res, next) {
  async.series([
    function (cb) {
      me.getUserCredits(req.user.id, function (err, quota) {
        if (quota.downloads >= quota.total) {
          err = new error.BadRequest('You\'ve reached the download limit for this month!');
        }
        cb(err);
      });
    }
  ], function (err) {
    if (err) { return next(new error.BadRequest(err)); }

    Illustration.findById(req.params.id, function (err, illustration) {
      if (err) return next(error.Internal(err.message));
      var exportOptions = req.body.exportOptions || {};

      if (!req.body.width) { req.body.width = 1024; }
      if (!req.body.height) { req.body.height = 1024; }
      if (!req.body.format) { req.body.format = 'png'; }
      if (!req.body.quality) { req.body.quality = 100; }

      // Check format
      var format = req.body.format.toLowerCase();
      exportOptions.format = format;
      var contentType;

      if (format === 'png') {
        contentType = 'image/png';
      } else if (format === 'jpg' || format === 'jpeg') {
        contentType = 'image/jpeg';
        if (!exportOptions.bgcolor) {
          exportOptions.bgcolor = '#FFFFFF';
        }
      } else if (format === 'pdf') {
        contentType = 'application/pdf';
      } else {
        return next(new error.BadRequest('Format not supported'));
      }

      // width must be a value between 1 and 2048px
      var width = parseInt(req.body.width, 10);
      if (!Math.between(width, 1, 2048)) {
        return next(new error.BadRequest('Width must be a numeric value between 1 and 2048'));
      } else {
        exportOptions.width = width;
      }

      // height must be a value between 1 and 2048px
      var height = parseInt(req.body.height, 10);
      if (!Math.between(height, 1, 2048)) {
        return next(new error.BadRequest('Height must be a numeric value between 1 and 2048'));
      } else {
        exportOptions.height = height;
      }

      // quality must be a value between 0 and 100
      var quality = parseInt(req.body.quality, 10);
      if (!Math.between(quality, 0, 100)) {
        return next(new error.BadRequest('Quality must be a numeric value between 0 and 100'));
      } else {
        exportOptions.quality = quality;
      }
      if (illustration.illuType === 'icon' &&
          req.body.customization.background &&
          req.body.customization.background.shape === 'cross') {
        illustration.css = '.inner-shape{fill: $color0;}';
      }

      var type = 'default';
      if (illustration.illuType === 'icon' &&
        req.body.customization.background &&
        req.body.customization.background.directive === 'il-reflection')  {

        type = 'reflection';

      } else if (illustration.illuType === 'icon' &&
        req.body.customization.background &&
        req.body.customization.background.directive === 'il-icon')  {

        type = 'background';

      } else if (illustration.illuType === 'icon' &&
        req.body.customization.background &&
        req.body.customization.background.directive === 'il-half-shadow')  {

        type = 'halfShadow';

      } else if (illustration.illuType === 'icon' &&
        req.body.customization.background &&
        req.body.customization.background.directive === 'il-calepin')  {

        type = 'calepin';

      }

      var filename = getFilename(illustration.name, exportOptions.format);

      var payload = {
        method: 'download',
        type: type,
        filepath: filename,
        userId: req.user._id,
        svg: illustration.svg.replace(/[\t\n\r]/g, ''),
        css: illustration.css,
        width: width,
        height: height,
        format: format,
        quality: quality,
        filename: filename,
        customization: req.body.customization,
        exportOptions: exportOptions
      };

      var url = config.phantomjs.url + ':' + config.phantomjs.port;
      var headers = { 'Content-Type': 'application/json' };
      request.post({
        uri: url,
        body: payload,
        json: true,
        headers: headers
      }, function (err, response) {
        if (!err && response.statusCode === 200) {

          res.set({ 'Content-Type': contentType });

          var fileUrl = '/images/downloads/' + req.user._id + '/' + filename;

          // Let this be async.
          if (!req.user.roles.admin && !req.user.roles.contributor &&
              req.user.roles.client) {
            logExport(req.user, illustration, payload, fileUrl);
          }

          res.send(fileUrl);

        } else {

          return next(err);

        }
      });
    }); //end
  });

};

exports.mount = function(app) {
  app.post('/api/v1/render/:id', auth.canRead, auth.canDownload, render);
};
