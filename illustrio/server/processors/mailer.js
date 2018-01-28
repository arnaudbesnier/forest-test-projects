// var nodemailer    = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
var config        = require('../../config/base.js');
var Templates     = require('../util/templates');
var Auth          = require('./auth');

// var mailgun = smtpTransport({
//   service: 'Mailgun',
//   auth: {
//     user: config.mailgun.user,
//     pass: config.mailgun.pass
//   }
// });
//
// var mailer = nodemailer.createTransport(mailgun);


// send email, close connection
function sendEmail(mailOptions, done){
  mailer.sendMail(mailOptions, function(error){
    if(error) {
      console.log(error);
      return done(error);
    }

    // shut down the connection pool, no more messages
    mailer.close();

    return done(null);
  });
}

exports.sendReminder = function (email, done) {

  var model = {};
  var template = Templates.compile('remind');
  var view = template(model);

  var mailOptions = {
    from: 'Illustrio <hello@illustrio.com>', // sender address
    to: email,
    subject: 'illustrio | customizable graphics for non-designers', // Subject line
    encoding: 'base64',
    text: view.text,
    html: view.html
  };

  sendEmail(mailOptions, done);
};

exports.sendRetrievalEmail = function(user, done) {
  var resetLink = config.web.vhost + '/profile/?auth=' + Auth.sign(user).token;
  var model = {
    reset_link: resetLink,
    user: user,
  };

  var template = Templates.compile('reset-password');
  var view = template(model);

  var mailOptions = {
    from: 'Illustrio <no-reply@illustrio.com>', // sender address
    to: user.email,
    subject: 'Welcome back', // Subject line
    text: view.text,
    html: view.html
  };

  sendEmail(mailOptions, done);

};

exports.sendRetrievalEmailv1 = function(user, done) {
  var resetLink = config.web.vhostv1 + '/welcomeback?token=' + Auth.sign(user).token;
  var model = {
    reset_link: resetLink,
    user: user
  };

  var template = Templates.compile('reset-password');
  var view = template(model);

  var mailOptions = {
    from: 'Illustrio <hello@illustrio.com>', // sender address
    to: user.email,
    subject: 'Reset your illustrio password',
    text: view.text
    //html: view.html
  };

  sendEmail(mailOptions, done);

};

exports.sendRegisterEmail = function(email, illustrationId, custo, done) {
  var registerLink = config.web.vhostv1 + '/register?email=' +
    encodeURIComponent(email) + '&sig=' + Auth.generateSig(email);

  if (illustrationId) {
    registerLink += '&i_id=' + illustrationId;
  }

  if (custo) {
    registerLink += '&customization=' + custo;
  }

  var model = {
    register_link: registerLink,
  };

  var template = Templates.compile('register');
  var view = template(model);

  var mailOptions = {
    from: 'Illustrio <hello@illustrio.com>', // sender address
    to: email,
    subject: 'Confirm your illustrio account', // Subject line
    encoding: 'base64',
    text: view.text,
    html: view.html
  };

  sendEmail(mailOptions, done);

};

exports.sendIlluStatusChangeEmail = function(params, explanation, done) {
  var viewLink = config.web.vhost + '/contributor/#/illustrios';

  var model = {
    view_link: viewLink,
    params: params,
    explanation: explanation
  };

  var template = Templates.compile('illu-status-changed');
  var view = template(model);
  var subject = 'Update on your illustration review [' + params.status + ']';

  var mailOptions = {
    from: 'moderation@illustrio.com', // sender address
    to: params.owner.email,
    subject: subject, // Subject line
    text: view.text,
    html: view.html
  };

  sendEmail(mailOptions, done);

};

exports.sendModerationSummary = function(summary, done) {
  var model = {
    _id: summary.owner._id,
    email: summary.owner.email,
    name: summary.owner.firstName || 'there',
    accepted: summary.accepted,
    rejected: summary.rejected
  };

  var template = Templates.compile('summary-moderation');
  var view = template(model);

  var mailOptions = {
    from: 'moderation@illustrio.com', // sender address
    to: model.email,
    bcc: 'olivier@illustrio.com',
    subject: 'Moderation – Review update', // Subject line
    text: view.text,
    html: view.html
  };

  sendEmail(mailOptions, done);

};
