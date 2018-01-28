var mongoose = require('mongoose');

var subscriptionSchema = new mongoose.Schema({
  // type: {
  //   type: String,
  //   enum: ['type1', 'type2', 'type3'],
  // },
  // hello: Number,
  // // data: mongoose.Schema.Types.Mixed,
  // expires_at: Date
  a: String,
  b: Boolean,
  c: Date,
  d: Number,
  e: { type: String, enum: ['abababa', 'b', 'c'] },
  f: { type: Number }
});

var schema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now, index: true },
  logo: { type: String, index: true },
  domain: { type: String, index: true },
  name: { type: String, index: true },
  hello: {
    val: String,
    vul: Boolean
  },
  points: [{
    x: String,
    y: String,
    bool: Boolean,
    num: Number,
    date: Date,
    enum: { type: String, enum: ['abababa', 'b', 'c'] },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  data: subscriptionSchema,
  foo: [{
    a: String,
    b: String,
    c: Boolean,
    d: Date,
    uaieua: Number
  }],
  blu: {
    a: String,
    b: Boolean,
    c: Date,
    d: Number,
    e: { type: String, enum: ['abababa', 'b', 'c'] },
    f: { type: Number }

    // e: {
    //   ee: String
    // }
  },
  mixed: mongoose.Schema.Types.Mixed,
  trello: [String],
  type: { type: String, enum: ['abababa', 'b', 'c'] },
  users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      _id: false
  }],
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  pictures: [String]
});

module.exports = mongoose.model('Company', schema);
