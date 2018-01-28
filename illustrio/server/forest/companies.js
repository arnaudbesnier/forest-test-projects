var Liana = require('forest-express-mongoose');

Liana.collection('companies', {
  searchFields: ['logo', 'data.a', 'data.b', 'hello.val', 'hello.vul']
});
