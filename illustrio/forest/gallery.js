var Liana = require('forest-express-mongoose');
var P = require('bluebird');

Liana.collection('galleries', {
  actions: [{ name: 'Clean' }]
});

Liana.collection('benchmarks', {
  actions: [{ name: 'Bench' }]
});

Liana.collection('illustrations', {
  fields: [{
    name: 'toto',
    get: function () {
      return 'tutu';
    }
  }]
  actions: [{ name: 'Illus' }],
  segments: [{
    name: 'illu 1',
    where: function () {
      return new P(function (resolve) {
        return resolve({ _id: '56f3ab2259617f1e3920bcb6' });
      });
    }
  },{
    name: 'illu 223',
    where: { _id: '5818b241c19cfcc85c3ded89' }
  }]
});

// console.log('======= here collection');
// Liana.collection('companies', {
//   searchFields: ['logo', 'points.x']
// });
