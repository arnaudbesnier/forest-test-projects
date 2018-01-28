
// app/models/user.js
// // load the things we need
// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');
// var crypto   = require('crypto');
var _        = require('underscore');
//
const commonProperties = {
  // _id: String,
  flag: Number,
  flagText: String,
  resolved: { type: Boolean, default: false },
  // _p_userFlagged: { type: String, ref: 'User', index: true },
  // _p_userReporting: { type: String, ref: 'User' },
  room_fields: {
    // toto: Boolean,
    toto: {
      tutu: {
        tata: String
      }
    }
    // audio: {
    //     mixed: {
    //         created: {
    //             type: Date
    //         },
    //         s3: {
    //             key: {
    //                 type: String
    //             },
    //             url: {
    //                 type: String
    //             },
    //             urlExpiration: {
    //                 type: Date
    //             }
    //         }
    //     }
    // }
  }
};
const options = {
  collection: 'SpFriend',
  timestamps: { createdAt: '_created_at', updatedAt: '_updated_at' },
  // _id: false,
  versionKey: false,
};
// const FlagUserSchemaV2 = mongoose.Schema(
//   _.assign(commonProperties), options
// );
//
// // create the model for users and expose it to our app
// module.exports = mongoose.model('Friend', FlagUserSchemaV2);
//

var mongoose = require('mongoose');

var FlagUserSchemaV2 = mongoose.Schema(_.assign(commonProperties), options);

module.exports = mongoose.model('SpFriend', FlagUserSchemaV2);
