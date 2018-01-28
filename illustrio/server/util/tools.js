var mongoose = require('mongoose');

exports.castAsId = function(id){
	try {
		return mongoose.Types.ObjectId(String(id));
	}
	catch(e) {
		return mongoose.Types.ObjectId(); // invalid id, return a random one (will never match anything currently in the database)
	}
};
