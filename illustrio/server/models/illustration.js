// app/models/illustration.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var schema = mongoose.Schema({

	/* attributes */
	// name: String,
	name: {
		type: String,
		// validate: function(v) {
	  //   console.log('========= here validator');
	  //   return true;
	  // }
	},
	svg: String,
	css: String,
	// illuType: { type: String, default: '' },
  // colors: {},
	//
	// /* belongs to... */
	// series: { type: mongoose.Schema.Types.ObjectId, ref: 'Serie' , index: true},
	// owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true},
	//
	// /* timestamps */
	// createdAt: { type : Date, default: Date.now },
	// editedAt: { type : Date, default: Date.now, index: true},
	// benchmarkedAt: { type : Date, index: true},
	//
  // acceptedAt: Date,
  // payableFrom: Date,
  // payableTo: Date,
	//
	// /* segments and tags */
	// style: Number,
	// category: Number,
	// subcategory: Number,
	// tags: {type: [ {type: String} ], index: true},
	//
	// /* status */
	// status: {type: String,  index: true, default: 'draft', enum: ['draft','under review','rejected','accepted']},
	//
	// /* review (only editable by an admin) */
	// review: {
	// 	editorial: Boolean,
	// 	score: {type: Number, index: true},
	// 	public: {type: Boolean, index: true}, // only public illustration are indexed and available on the public website
  //   lock: {type: Date, index: true}, // used to prevent modification
  //   message: String, // last moderation message
  //   cat: { type: String, enum: ['bon', 'mauvais'] }, // last moderation message
  //   rejection: Number // last rejection code
	// },
	// objective: {
  //   category2: {
  //       type: String,
  //       required: 'ERR_ENTER_CATEGORY',
  //       enum: ['professional', 'B']
  //   },
  //   child: {
  //       type: String,
  //       required: 'ERR_ENTER_CATEGORY_CHILD',
  //       enum: ['interview', 'B2']
  //   },
  //   details: {
  //       type: String,
  //       default: '',
  //       // validate: [function() { return true; }, 'TEXT_TOO_LONG']
  //   },
  //   language: {
  //       name: {
  //           type: String,
  //           enum: ['A3', 'B3'] //_.pluck(config.teaching_languages, 'id'),
  //           //required: 'ERR_LANG_REQUIRED'
  //       },
  //       current_level: {
  //           type: String,
  //           enum: ['A4', 'B4'] //_.pluck(config.spoken_language_levels, 'id'),
  //           //required: 'ERR_LEVEL_REQUIRED'
  //       }
  //   },
  //   deadline: {
  //       type: Date
  //   }
  // },
	// objective2: {
  //   category2: {
  //       type: String,
  //       required: 'ERR_ENTER_CATEGORY',
  //       enum: ['professional', 'B']
  //   },
  //   child: {
  //       type: String,
  //       required: 'ERR_ENTER_CATEGORY_CHILD',
  //       enum: ['interview', 'B2']
  //   },
  //   details: {
  //       type: String,
  //       default: '',
  //       // validate: [function() { return true; }, 'TEXT_TOO_LONG']
  //   },
  //   language: {
  //       name: {
  //           type: String,
  //           enum: ['A3', 'B3'] //_.pluck(config.teaching_languages, 'id'),
  //           //required: 'ERR_LANG_REQUIRED'
  //       },
  //       current_level: {
  //           type: String,
  //           enum: ['A4', 'B4'] //_.pluck(config.spoken_language_levels, 'id'),
  //           //required: 'ERR_LEVEL_REQUIRED'
  //       }
  //   },
  //   deadline: {
  //       type: Date
  //   }
  // }
});

// compound indexes
schema.index({'review.score': -1, 'createdAt': -1});
schema.index({'review.score': -1, 'editedAt': -1});

// create the model for illustrations and expose it to our app
module.exports = mongoose.model('Illustration', schema);
