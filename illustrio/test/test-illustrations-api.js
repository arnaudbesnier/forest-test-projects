var superagent = require('superagent');
var expect = require('expect.js');
var jwt  = require('jsonwebtoken');
var config = require('../config/base');

var hostname = 'http://localhost:5000/api/v1/';

var expirationTime = Date.now() + 1000*60*60;

var user = {
  id: '5418693e1e9124e46c67f911',
  email: 'admin@illustrio.com',
  firstName: 'Super',
  lastName: 'User',
  displayName: 'User',
  exp: expirationTime
};

var illustration = {
  name: 'Mocha test illustration',
  svg: '',
  css: '',
  status: 'draft',
  review: { editorial: false, public: false, score: 5 }
};

// Generate the different roles token
user.roles = { contributor: true, client: false, admin: false };
var contribToken = jwt.sign(user, config.jwt.secret, { algorithm: 'HS256' });

user.roles = { contributor: false, client: false, admin: true };
var adminToken = jwt.sign(user, config.jwt.secret, { algorithm: 'HS256' });

var illustration = {
  name: 'Mocha test illustration',
  status: 'draft'
};

describe('Illustrations API', function () {
  var illustrationId;

  it('should enable a contributor to create an illustration', function (done) {
    superagent
      .post(hostname + 'illustrations')
      .set('Authorization', 'Bearer ' + contribToken)
      .send(illustration)
      .end(function (err, res) {
        expect(err).to.eql(null);
        illustrationId = res.body._id;
        done();
      });
  });

  it('should allow a contributor to remove its illustration', function (done) {
    superagent
      .del(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('should allow an admin to update the illustration\'s status', function (done) {
    superagent
      .post(hostname + 'illustrations')
      .set('Authorization', 'Bearer ' + contribToken)
      .send(illustration)
      .end(function (err, res) {
        expect(err).to.eql(null);
        illustrationId = res.body._id;
        illustration.status = 'accepted';
        superagent
          .put(hostname + 'illustrations/' + illustrationId)
          .set('Authorization', 'Bearer ' + adminToken)
          .send(illustration)
          .end(function (err, res) {
            expect(res.body.status).to.eql('accepted');
            done();
          });
      });

  });

  it('should forbid a contributor to remove its illustration if it\'s ' +
     'accepted or under review', function (done) {
    superagent
      .del(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(400);
        done();
      });
  });

  it('should not delete the illustration if admin tries to delete an ' +
     'illustration that\'s already been reviewded', function (done) {
    superagent
      .del(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + adminToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.review.public).to.be(false);
        expect(res.body.series).to.be(undefined);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('should delete the illustration if admin tries to delete an ' +
     'illustration that\'s not been reviewded', function (done) {
    superagent
      .post(hostname + 'illustrations')
      .set('Authorization', 'Bearer ' + contribToken)
      .send(illustration)
      .end(function (err, res) {
      superagent
        .del(hostname + 'illustrations/' + res.body._id)
        .set('Authorization', 'Bearer ' + adminToken)
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
      });
  });

});
