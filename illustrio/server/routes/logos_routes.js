'use strict';

var auth = require('../processors/auth');
var http = require('http');
var Logo = require('../models/logo');
var async = require('async');

function updateCompanies(companies) {
  companies = JSON.parse(companies);
  async.map(companies, function (company, cb) {
    Logo.findOne({ domain: company.domain }, function (err, comp) {
      if (err) { cb(err); }
      if (!comp) {
        comp = new Logo(company);
        comp.save(cb);
      } else {
        cb();
      }
    });
  });
}

function get(req, res, next) {
  var options = {
    host: 'http://autocomplete.clearbit.com',
    path: '/v1/companies/suggest?query=' + req.params.id
  };
  http.get(options.host + options.path, function (response) {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      updateCompanies(body);
      res.send(body);
    });
  }).on('error', function (err) {
    console.log('Got error: ' + err);
    res.send(400);
  });

}

exports.mount = function (app) {
  app.get('/api/v1/logos/:id', auth.canRead, get);
};

