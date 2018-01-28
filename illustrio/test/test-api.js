var superagent = require('superagent');
var expect = require('expect.js');
var jwt  = require('jsonwebtoken');
var config = require('../config/base');

var hostname = 'http://localhost:5000/api/v1/';

expirationTime = Date.now() + 1000*60*60;
var user = {
  id: '5418693e1e9124e46c67f911',
  email: 'admin@illustrio.com',
  firstName: 'Super',
  lastName: 'User',
  displayName: 'User',
  exp: expirationTime
};

var otherContrib = {
  id: '5418693e1e9124e46c67f912',
  email: 'anotheruser@illustrio.com',
  firstName: 'Another',
  lastName: 'User',
  displayName: 'User',
  exp: expirationTime
};

var illustration = {
  name: "Mocha test illustration",
  svg: "<!-- let's get started! replace this dull circle with your SVG! -->\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1800 600\" preserveAspectRatio=\"xMidYMid\">\n\t<circle cx=\"900\" cy=\"300\" r=\"200\"/>\n</svg>",
  css: "\ncolor $color1{\nlabel:\"Color\";\ndefault:#74B2B1;\ninherit:main;\n}\n\ncolor $color2{\nlabel:\"Color\";\ndefault:#CE403D;\ninherit:highlight;\n}\ncolor $color3{\nlabel:\"Color\";\ndefault:#30415B;\ninherit:additional;\n}\ncolor $color4{\nlabel:\"Color\";\ndefault:#FBF1CD;\ninherit:main;\n}\n\n.background{\n\tfill:$color3;\n}\n\n#coronet path, .gold{\nfill:$color4;\n}\n\n.goldstroke{\nstroke:$color4;\n}\n\n.ribbon{\nfill:$color2;\n}",
  status: 'draft',
  review: {
    editorial: false,
    public: false,
    score: 5
  }
};

var newName = 'Updated mocha test Illustration';

var serie = {
  name: 'Mocha test serie'
};

var serieNewName = 'Updated mochat test serie';

// Generate the different roles token
user.roles =  { contributor: false, client: false, admin: true };
var adminToken = jwt.sign(user, config.jwt.secret, { algorithm: 'HS256' });
user.roles = { contributor: true, client: false, admin: false };
var contribToken = jwt.sign(user, config.jwt.secret, { algorithm: 'HS256' });
user.roles = { contributor: false, client: true, admin: false };
var clientToken = jwt.sign(user, config.jwt.secret, { algorithm: 'HS256' });

otherContrib.roles = { contributor: true, client: false, admin: false };
var otherContribToken = jwt.sign(otherContrib, config.jwt.secret, { algorithm: 'HS256' });


describe('illustration api', function () {
  var illustrationId;
  var serieId;

  it('contrib can create a serie', function (done) {
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

  it('count series from contrib', function (done) {
    superagent
      .get(hostname + 'series?count=true&owner=' + user.id)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.count).to.eql(1)
        done();
      });
  });

  it('update a serie\'s name', function (done) {
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

  it('checks the updated serie\'s name', function (done) {
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

  it('contrib can post an illustration', function (done) {
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

  it('count illustration from contrib', function (done) {
    superagent
      .get(hostname + 'illustrations?count=true&owner=' + user.id)
      .set('Authorization', 'Bearer ' + contribToken)
      .send(illustration)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.count).to.eql(1)
        done();
      });
  });

  it('contrib can list its illustrations', function (done) {
    superagent
      .get(hostname + 'illustrations')
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(1)
        expect(res.body.map(function (item) { return item._id })).to.contain(illustrationId)
        done();
      });
  });

  it('retrieve one illustration', function (done) {
    superagent
      .get(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(illustrationId);
        done();
      });
  });

  it('retrieve one illustration in svg', function (done) {
    var q = '?output=svg';
    superagent
      .get(hostname + 'illustrations/' + illustrationId + q)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.type).to.eql('image/svg+xml');
        done();
      });
  });

  it('retrieve one illustration in css', function (done) {
    var q = '?output=css';
    superagent
      .get(hostname + 'illustrations/' + illustrationId + q)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.type).to.eql('text/plain');
        done();
      });
  });

  it('retrieve one illustration with the css and svg fields', function (done) {
    var q = '?full=true';
    superagent
      .get(hostname + 'illustrations/' + illustrationId + q)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.key('css');
        expect(res.body).to.have.key('svg');
        done();
      });
  });

  it('admin retrieve all illustrations (limit to 20)', function (done) {
    superagent
      .get(hostname + 'illustrations?limit=20')
      .set('Authorization', 'Bearer ' + adminToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(20)
        expect(res.body.map(function (item) { return item._id })).to.contain(illustrationId)
        done();
      });
  });

  it('admin retrieves all illustrations from owner', function (done) {
    var q = '?owner=' + user.id;
    superagent
      .get(hostname + 'illustrations' + q)
      .set('Authorization', 'Bearer ' + adminToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(1)
        done();
      });
  });

  it('a contributor cannot retrieve all illustrations', function (done) {
    superagent
      .get(hostname + 'illustrations/')
      .set('Authorization', 'Bearer ' + otherContribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(0)
        done();
      });
  });

  it('contrib updates the name of an illustration', function (done) {
    superagent
      .put(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + contribToken)
      .send({ name: newName })
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object')
        expect(res.body._id).to.eql(illustrationId)
        done();
      });
  });

  it('check the updated name', function (done) {
    superagent
      .get(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + contribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(illustrationId);
        expect(res.body.name).to.eql(newName)
        done();
      });
  });

  it('another contributor cannot see my illu', function (done) {
    superagent
      .get(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + otherContribToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        done();
      });
  });

  it('a contributor cannot modify the review field', function (done) {
    superagent
      .put(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + contribToken)
      .send({
        review: {
          score: 1,
          public: false,
          editorial: false
        }
      })
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.review.score).to.eql(5);
        done();
      });
  });

  it('a contributor cannot update the status anything other than "under review"', function (done) {
    superagent
      .put(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + contribToken)
      .send({ status: 'accepted' })
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(400);
        done();
      });
  });

  it('a contributor can update the status to "under review"', function (done) {
    superagent
      .put(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + contribToken)
      .send({ status: 'under review' })
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.status).to.eql('under review')
        done();
      });
  });

  it('a contributor can not access an illustration under review', function (done) {
    superagent
      .put(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + contribToken)
      .send({ status: 'under review' })
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404)
        done();
      });
  });

  it('check that an admin can modify the review field', function (done) {
    superagent
      .put(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + adminToken)
      .send({
        review: {
          score: 1,
          public: false,
          editorial: false
        },
        blablabla: true
      })
      .end(function (err, res) {
        expect(err).to.eql(null)
        expect(res.body.name).to.eql(newName);
        expect(res.body.review.score).to.eql(1);
        done();
      });
  });

  it('removes an illustration', function (done) {
    superagent
      .del(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + adminToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(illustrationId)
        done();
      });
  });

  it('checks that the illustration is removed', function (done) {
    superagent
      .get(hostname + 'illustrations/' + illustrationId)
      .set('Authorization', 'Bearer ' + adminToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404)
        done();
      });
  });

  it('removes a serie', function (done) {
    superagent
      .del(hostname + 'series/' + serieId)
      .set('Authorization', 'Bearer ' + adminToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(serieId)
        done();
      });
  });

  it('checks that the serie is removed', function (done) {
    superagent
      .get(hostname + 'series/' + serieId)
      .set('Authorization', 'Bearer ' + adminToken)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404)
        done();
      });
  });
})
