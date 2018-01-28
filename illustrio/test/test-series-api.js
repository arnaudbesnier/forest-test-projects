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

var serie = {
  name: 'Mocha test serie'
};

var serieNewName = 'Updated mocha test serie';

// Generate the different roles token
user.roles = { contributor: true, client: false, admin: false };
var contribToken = jwt.sign(user, config.jwt.secret, { algorithm: 'HS256' });

describe('Series API', function () {
  var serieId;
  var illustrationId;

  it('should allow a contributor to create a serie', function (done) {
    superagent
      .post(hostname + 'series')
      .set('Authorization', 'Bearer ' + contribToken)
      .send(serie)
      .end(function (err, res) {
        expect(err).to.eql(null);
        serieId = res.body._id;
        done();
      });
  });

  it('should count the series through the response headers', function (done) {
    superagent
      .get(hostname + 'series')
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.headers['x-total-count']).to.be.greaterThan(0);
        done();
      });
    });

  it('should update a serie\'s name', function (done) {
    serie.name = serieNewName;
    superagent
      .put(hostname + 'series/' + serieId)
      .set('Authorization', 'Bearer ' + contribToken)
      .send(serie)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(serieId);
        done();
      });
  });

  it('should get the updated serie\'s name', function (done) {
    superagent
      .get(hostname + 'series/' + serieId)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(serieId);
        expect(res.body.name).to.eql(serieNewName);
        done();
      });
    });

  it('should allow contrib to create an illustration', function (done) {
    illustration.series = serieId;
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

  it('should forbid to remove a serie containing illustrations', function (done) {
    superagent
      .del(hostname + 'series/' + serieId)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(403);
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

  it('should allow to remove an empty serie', function (done) {
    superagent
      .del(hostname + 'series/' + serieId)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(serieId);
        done();
      });
  });

  it('should send 404 if serie is not found', function (done) {
    superagent
      .get(hostname + 'series/' + serieId)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        done();
      });
  });
});

