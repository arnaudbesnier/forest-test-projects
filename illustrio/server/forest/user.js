var Liana = require('forest-express-mongoose');

Liana.collection('users', {
  actions: [{ name: 'Give credits' }],
  fields: [{
    field: 'role',
    type: 'String',
    get: (user) => {
      console.log('==============', user.length);
      // console.log('==============', user[0]);
      // return (user.roles2.length === 1) ? user.roles2[0] : undefined;
      //return 'developer'; //(user.roles.length === 1) ? user.roles[0] : undefined;
      return 'developer'; //(user.roles.length === 1) ? user.roles[0] : undefined;
    }
  }]
});
