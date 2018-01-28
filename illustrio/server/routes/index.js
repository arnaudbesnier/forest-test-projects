var _ = require('underscore');

// can't crawl the fs because we may need to mount routes in a precise order
var routes = [
  'newauth',
  'debug',
  'galleries',
  'illustrations',
  'series',
  'logs',
  'users',
  'tags',
  'categories',
  'styles',
  'render',
  'cleansvg',
  'me',
  'stats',
  'benchmarks',
  'transactions',
  'monthlyDownloads',
  'themes',
  'folders',
  'downloads',
  'bitly',
  'logos',
  'mobileUsers'
];

module.exports = function (app, models) {
  _(routes).each(function (route) {
    require('./' + route + '_routes.js').mount(app, models);
  });
};
