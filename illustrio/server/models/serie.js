var mongoose = require('mongoose');
var _        = require('underscore');

// define the schema for our user model
var schema = mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  createdAt: { type : Date, default: Date.now },
  editedAt: { type : Date, default: Date.now },
  oldId: String
});

schema.statics.getMine = function(user){
	var select = '_id name owner editedAt createdAt';
	return this.where('owner').equals(user.id).select(select);
}

schema.statics.save = function(user, series, cb){
	// if not admin, overwrite owner
	if (!user.roles.admin || !series.owner){
		series.owner = user.id;
	};

	// update or create
	if (series._id){
		// if _id, try to update series with that id (same owner)
		var _id = tools.castAsId(series._id);
		delete series._id;
		series.editedAt = Date.now();
		this.update({_id: _id, owner: series.owner}, series, {}, function(err, nb, raw){
			cb(err, _id);
		});
	} else {
		// create new series
		this.create(series, cb);
	}
}

// create the model for illustrations and expose it to our app
module.exports = mongoose.model('Serie', schema);
