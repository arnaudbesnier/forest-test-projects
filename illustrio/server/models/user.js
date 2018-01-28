// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var crypto   = require('crypto');
var _        = require('underscore');

// define the schema for our user model
var schema = mongoose.Schema({
  firstName : {
    type: String,
    // required: true
    required: [true, 'nooooooo!']
  },
  lastName: { type: String },
  // lastName: { type: String, minlength: 19, maxlength: [29, 'too longssssss'] },
  email : {type: String, unique: true, index: true},
  password : String,
  company : String,
  createdAt: { type : Date, default: Date.now },
  roles: {
      contributor: {type: Boolean, default: false},
      client: {type: Boolean, default: false},
      admin: {type: Boolean, default: false}
  },
  roles2: [String],
  website: { type: String },
  postPaidSince: Date,
  confirmed: {type: Boolean, default: false}
},{
  toObject: { virtuals: true},
  toJSON: { virtuals: true}
});

// virutals
schema.virtual('displayName').get(function () {
  return this.firstName || this.email;
});

// find by email
schema.statics.findByEmail = function(email, next){
  this.findOne({email: email}, next);
};

// generating a hash
schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// generating a hash
schema.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function(password) {
  // Let's be sure that we can use a reference to the password.
  // This is a fix for the register bug where users had no password after
  // registration.

  // If this is the case, they must use the "Forgot password" procedure.
  if (this.password === undefined || this.password === '') { return false; }

  // legacy password
  if (this.password.slice(0,6) === 'sha256'){
    var split = this.password.split(':');
    var salt  = split[1];
    if (split[2] === crypto.createHash('sha256').update(crypto.createHash('sha256').update(password).digest('hex') + salt).digest('hex')){
      // save new password
      this.savePassword(password, function(){
        return true;
      });
    } else {
      return false;
    }
  } else {
    // new password
    return bcrypt.compareSync(password, this.password);
  }
};

schema.methods.savePassword = function(password, done) {
  var self = this;
  this.password   = this.generateHash(password);

  // save the user
  this.save(function(err) {
    if (err) return done(err);

    return done(null, self);
  });

};


// to api
schema.methods.toAPI = function() {
  return _.pick(this, 'id', 'email', 'firstName', 'lastName', 'roles', 'displayName');
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', schema);
