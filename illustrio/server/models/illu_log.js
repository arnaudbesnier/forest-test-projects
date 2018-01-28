// app/models/logs.js
// load the things we need
var mongoose = require('mongoose');
var _        = require('underscore');

// define the schema for our user model
var schema = mongoose.Schema({

	// creation info: who + when
	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true},
	timestamp: { type : Date, default: Date.now, index: true },
	// illu reference owner + illu id
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true},
	illustration: { type: mongoose.Schema.Types.ObjectId, ref: 'Illustration', index: true},
	// log content: new illustration status + message
	status: {type: String, index: true, enum: ['draft', 'under review', 'rejected', 'accepted']},
	message: { type: String, default: 'Halo', required: true },
 	rejection: Number

});


/* get recent logs, about illustrations owned by user */
schema.statics.getRecent = function(user, limit){
	if (user.roles.admin){
		return this.find().sort('-timestamp').limit(limit || 100);
	} else {
		return this.where('illustration.owner').equals(user.id).sort('-timestamp').limit(limit || 100);
	}
}

/* get recent logs, about illustrations owned by user */
schema.statics.getMine = function(user, limit){
	return this.where('illustration.owner').equals(user.id).sort('-editedAt').limit(limit || 100);
}

/* get recent logs, about a specific illustration (must be owned by user if not admin) */
schema.statics.getForIllustration = function(user, iid, limit){
	if (user.roles.admin){
		return this.where('illustration').equals(iid)
				   .sort('-timestamp').limit(limit || 100);
	} else {
		return this.where('owner').equals(user.id)
				   .where('illustration').equals(iid)
				   .sort('-timestamp').limit(limit || 100);
	}
}

schema.statics.save = function(user, log, cb){
	log.creator = user.id;
	this.create(log, cb);
}

// create the model for Log and expose it to our app
module.exports = mongoose.model('Illu_Log', schema);
