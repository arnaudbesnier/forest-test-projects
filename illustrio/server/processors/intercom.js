var config = require('../../config/base');
var Intercom = require('intercom.io');

exports.Intercom = function () {
  var self = new Intercom(config.intercom.app_id, config.intercom.api_key);

  self.tagUser = function(email, tag, cb){
    self.createTag({
      users: [{ email: email }],
        name: tag
      }, function (err, tag) {
        cb(err);
      });
  };

  return self;
}
