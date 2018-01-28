'use strict';

var MobileUser = require('../models/mobile-user');
var mailer = require('../processors/mailer');


function remind(req, res, next) {

  var mobileUser = new MobileUser();
  mobileUser.email = req.body.email;
  mobileUser.save(function (err) {
    if (err) { return next(new Error(err)); }
    mailer.sendReminder(req.body.email, function (err) {
      if (err) { return next(new Error(err)); }
      res.send();
    });
  });

}

exports.mount = function (app) {
  app.post('/api/v1/remind', remind);
};
