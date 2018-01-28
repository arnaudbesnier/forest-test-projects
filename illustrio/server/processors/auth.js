var _ = require('underscore');
var jwt  = require('jsonwebtoken');
var crypto = require('crypto');
var error = require('./error');
var config = require('../../config/base');


function intercom_signature(id) {
  // create id, based on email
  var key = config.intercom.app_secret;
  return crypto.createHmac('sha256', key).update(id).digest('hex');
}

function UnauthorizedError (code, error) {
  Error.call(this, error.message);
  this.name    = 'UnauthorizedError';
  this.message = error.message;
  this.code    = code;
  this.status  = 401;
  this.inner   = error;
}

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;


var self  =  {};
function init (options) {
  if (!options || !options.secret) throw new Error('secret should be set');
  self.options = options;

  return function(req, res, next) {
    var token;

    // if req.path start with any of the skipped prefix, call next()
    if (typeof options.skip !== 'undefined') {
      for (var i=0; i<options.skip.length; i++){
        var matcher = new RegExp('^' + options.skip[i] + '$');
        if (req.path.match(matcher)) {
          return next();
        }
      }
    }

    // OPTIONS with access-control-request-headers
    if (req.method === 'OPTIONS' && req.headers.hasOwnProperty('access-control-request-headers')) {
      for (var ctrlReqs = req.headers['access-control-request-headers'].split(','), i=0;
           i < ctrlReqs.length; i++) {
          if (ctrlReqs[i].indexOf('authorization') !== -1)
        return next();
      }
    }

    // check for authorization header
    if (req.headers && req.headers.authorization) {
      var parts = req.headers.authorization.split(' ');
      if (parts.length == 2) {
        var scheme = parts[0],
          credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
          req._authType = 'header';
        }
      } else {
        //return next(new UnauthorizedError('credentials_bad_format', { message: 'Format is Authorization: Bearer [token]' }));
        res.redirect('/login');
      }
    }

    // check for auth cookie
    var cookieName = 'illustrio-auth';
    if (req.cookies[cookieName]){
      token = req.cookies[cookieName];
        req._authType = 'cookie';
    }

    // check for auth parameter
    if (req.param('auth')){
      token = req.param('auth');
        req._authType = 'param';
    }

    // verify token
    if (token){
      // enforce signature
      if (!token.split('.')[2]) return next(new UnauthorizedError('signature_required', { message: 'Token must be signed' }));

      // verify token
      jwt.verify(token, options.secret, options, function(err, decoded) {
          if (err) return next(new UnauthorizedError('invalid_token', err));
        req.user = decoded;
          // set cookies
          var lifetime = 30;
          res.cookie('illustrio-auth', token, { maxAge: lifetime*24*3600*1000 } );
          next();
        });

    } else {
      //return next(new UnauthorizedError('credentials_required', { message: 'No Authorization was found' }));
      res.redirect('/login');
    }
  };
}

function sign(userObj) {
  var user = userObj.toAPI();
  var token = jwt.sign(user, config.jwt.secret, { expiresInMinutes: 60*24*7 });
  var response = {
    token: token,
    user: _.pick(user, 'firstName', 'email', 'lastName', '_id', 'roles')
  };

  response.user.intercom = {
    app_id: config.intercom.app_id,
    user_hash: intercom_signature(user.email)
  };

  return response;
}

function generateSig(email) {
  var hmac = crypto.createHmac('sha1', config.registration.secret);
  hmac.setEncoding('hex');
  hmac.write(email);
  hmac.end();
  return hmac.read();
}

function canRead(req, res, next) {
  if (!req.user) {
    req.user = {
      roles: {
        client: false,
        guest: true,
        admin: false,
        contributor: false
      }
    };
    next();
  } else {
    if (req.user.roles.guest || req.user.roles.client || req.user.roles.admin ||
        req.user.roles.contributor) {
      next();
    } else {
      return next(new error.Forbidden('User can not read.'));
    }
  }
}

function canUpdate(req, res, next) {
  if (req.user && (req.user.roles.admin || req.user.roles.contributor)) {
    next();
  } else {
    return next(new error.Forbidden('User can not update.'));
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.roles.admin) {
    next();
  } else {
    return next(new error.Forbidden('Not admin.'));
  }
}

function canDownload(req, res, next) {
  if (req.user.roles.guest) {
    return next(new error.Forbidden('You need an account to be able to download'));
  }
  if (req.user.confirmed) {
    next();
  } else {
    return next(new error.Forbidden('Your email is not confirmed. You cannot download yet.'));
  }
}

// export
self.init  = init;
self.sign  = sign;
self.error = UnauthorizedError;
self.canRead = canRead;
self.canUpdate = canUpdate;
self.isAdmin = isAdmin;
self.canDownload = canDownload;
self.generateSig = generateSig;
module.exports = self;
