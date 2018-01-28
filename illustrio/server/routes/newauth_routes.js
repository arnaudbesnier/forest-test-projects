'use strict';

var User = require('../models/user');
var Quota = require('../models/quota');
var crypto = require('crypto');
var error = require('../processors/error');
var jwt = require('jsonwebtoken');
var config = require('../../config/base.js');
var _ = require('underscore');
var mailer = require('../processors/mailer');
var disposable = require('../../app/assets/domains');
var Themes = require('../models/theme');
var P = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

function giveThemes(user) {
  var defaultThemes = [
    { name: 'Armadillo', color: ['#3a3d42','#6cb6f5','#797B82'] },
    { name: 'Vintage Girly', color: ['#93d3eb', '#cc5249', '#efacac'] },
    { name: 'Greeny', color: ['#2b9b78', '#e7d5a2', '#0e4e3b'] },
    { name: 'Malakoff Mederic', color: ['#584d7f','#e2c545','#a6633f'] },
    { name: 'Perano', color: ['#abccee','#ab9bc0','#f0d8e4'] },
    { name: 'Seagull', color: ['#f68370','#ffd080','#89dbec'], default: true }
  ];

  var now = Date.now();
  defaultThemes.forEach(function (theme) {
    theme.owner = mongoose.Types.ObjectId(user._id);
    theme.createdAt = now;
    theme.editedAt = now;
  });

  return new P(function (resolve, reject) {
    Themes.collection.insert(defaultThemes, function (err) {
      if (err) { return reject(err); }
      return resolve(user);
    });
  });
}

function giveQuota(user) {
  return new P(function (resolve, reject) {
    Quota
    .findOne({ owner: user._id })
    .exec(function (err, doc) {
      if (err) { return reject(err); }
      if (!doc) {
        var now = new Date();
        var newQuota = new Quota();
        newQuota.count = 25;
        newQuota.owner = user._id;
        newQuota.start = now;
        newQuota.end = null;
        newQuota.type = 'quota';
        newQuota.save(function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        });
      } else {
        resolve(user);
      }
    });
  });
}

function getToken(user) {
  return jwt.sign(user.toObject(), config.jwt.secret, { expiresIn: 60*60*24*7 });
}

function isPasswordValid(user, password) {
  return new P(function (resolve, reject) {

    if (user &&
        user.roles &&
        user.roles.contributor === true &&
        user.roles.client === false &&
        user.roles.admin === false) {
      return reject(new error.Forbidden('Contributor access is disabled'));
    }

    if (!(user && user.validPassword(password))) {
      return reject(new error.NotFound('Wrong email/password combination'));
    } else if (!user.confirmed) {
      return reject(new error.Unauthorized('Email not confirmed'));
    }

    resolve(user);

  });
}

function buildResponse(user) {
  var response = {
    token: getToken(user),
    user: _.pick(user, 'firstName', 'email', 'lastName', '_id', 'roles', 'createdAt')
  };

  response.user.intercom = {
    app_id: config.intercom.app_id,
    user_hash: intercom_signature(user.email)
  };

  return response;

}

function intercom_signature(id) {
  // create id, based on email
  var key = config.intercom.app_secret;
  return crypto.createHmac('sha256', key).update(id).digest('hex');
}

var login = function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return next(new error.BadRequest('Email or password missing'));
  }

  User
    .findOne({ email: req.body.email })
    .exec()
    .then(function (user) { return isPasswordValid(user, req.body.password); })
    .then(function (user) { return res.send(buildResponse(user)); })
    .catch(function (err) { return next(err); });
};


var resend = function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return next(new error.BadRequest('Email or password missing'));
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { return next(new error.Internal('Internal database error')); }
    if (user && user.validPassword(req.body.password)) {
      var customization;
      if (req.body.customization) {
        customization = new Buffer(JSON.stringify(req.body.customization)).toString('base64');
      }
      mailer.sendRegisterEmail(
        req.body.email,
        req.body.illustrationId,
        customization,
        function (err) {
          if (err) { return next(new Error(err));}
          res.json({ message: 'Thank you for signing up. Check your email inbox!' });
      });

    } else {
      return next(new error.NotFound('Wrong email/password combination'));
    }
  });
};

var forgot = function (req, res, next) {
  if (!req.body.email) {
    return next(new error.BadRequest('Email missing'));
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return next(new error.Internal('Internal database error'));

    if (user && user.roles && user.roles.contributor === true &&
        user.roles.client === false && user.roles.admin === false) {
      return next(new error.Forbidden('Contributor access is disabled'));
    }

    if (user) {
      mailer.sendRetrievalEmailv1(user, function () {
        res.json({message: 'Nice to see you again! We\'ve sent you an email' +
          ' with instructions on how to reset your password'});
      });
    } else {
      return next(new error.NotFound('Unknown email address.'));
    }
  });
};

function generateSig(email) {
  var hmac = crypto.createHmac('sha1', config.registration.secret);
  hmac.setEncoding('hex');
  hmac.write(email);
  hmac.end();
  return hmac.read();
}

function isSigValid(email, sig) {
  var hash = generateSig(email);
  return sig === hash;
}

var confirmEmail = function (req, res, next) {
  if (!isSigValid(req.body.email, req.body.sig)) {
    return next(new error.Forbidden('Invalid signature'));
  }

  var query = { email: req.body.email };
  var update = { $set: { confirmed: true }};
  var options = { new: true };
  User
    .findOneAndUpdate(query, update, options)
    .exec()
    .then(function (user) {
      if (!user) { return next(new error.NotFound('User not found')); }
      return giveQuota(user);
    })
    .then(function (user) { return res.send(buildResponse(user)); })
    .catch(function (err) { return next(err); });

};

function createUser(body) {
  return new P(function (resolve, reject) {
    var newUser = new User();
    newUser.email = body.email;
    newUser.firstName = body.firstName;
    newUser.lastName = body.lastName;
    newUser.roles = {contributor: false, client: true, admin: false };
    newUser.password = newUser.generateHash(body.password);

    newUser.save(function (err, user) {
      if (err) { return reject(err); }
      resolve(user);
    });
  });
}

var register = function (req, res, next) {

  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('password', 'Password empty').notEmpty();

  var errors = req.validationErrors() || [];

  if (isDisposable(req.body.email)) {
    errors.push({
      message: 'Usage of disposable email is deactivated',
      status: 400
    });
  }

  if (hasPlusSign(req.body.email)) {
    errors.push({
      message: 'Usage of \'+\' sign in email is deactivated',
      status: 400
    });
  }

  if (errors && errors.length > 0) {
    res.status(400).send(errors[0]);
    return;
  }

  req.body.firstName = req.sanitizeBody('firstName').trim();
  req.body.lastName = req.sanitizeBody('lastName').trim();

  User
    .findOne({ email: req.body.email })
    .exec()
    .then(function (user) {
      if (user) { throw new error.Forbidden('Already registered'); }
      return createUser(req.body);
    })
    .then(giveThemes)
    .then(giveQuota)
    .then(function (user) { return sendEmail(user, req.body); })
    .then(function (user) { return res.send(buildResponse(user)); })
    .catch(function (err) { return next(err); });

};

function sendEmail(user, body) {
  var customization;
  if (body.customization) {
    var custo = JSON.stringify(body.customization);
    customization = new Buffer(custo).toString('base64');
  }
  return new P(function (resolve, reject) {
    mailer.sendRegisterEmail(
      body.email,
      body.illustrationId,
      customization,
      function (err) {
        if (err) { return reject(err); }
        resolve(user);
      });
  });
}

function isDisposable(email) {
  return disposable.indexOf(email.split('@').slice().pop()) > -1;
}

function hasPlusSign(email) {
  if (email.split('@').slice().pop() !== 'illustrio.com') {
    return email.indexOf('+') > -1;
  }
  return false;
}

var designerRegister = function (req, res, next) {

  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('name', 'Name must not be empty').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return;
  }

  var body = req.body;

  User.findOne({ email: body.email }, function (err, user) {
    if (err) { return next(new error.Internal('Internal database error')); }
    if (user) { return next(new error.Forbidden('Already registered')); }

    var roles = {contributor: true, client: false, admin: false };

    var newUser = new User();
    newUser.email = body.email;
    newUser.firstName = body.name;
    newUser.roles = roles;
    newUser.website = body.portfolio;

    newUser.save(function (err) {
      if (err) { return next(new error.Internal('Internal database error')); }
      res.json({ message: 'Thank you for signing up!' });
    });

  });
};

exports.mount = function(app) {
  app.post('/api/v1/login', login);
  app.post('/api/v1/forgot', forgot);
  app.post('/api/v1/confirm', confirmEmail);
  app.post('/api/v1/register', register);
  app.post('/api/v1/resend', resend);
  app.post('/api/v1/designer-register', designerRegister);
};
