var moment = require('moment');

exports.init = function(ejs){
	ejs.filters.fromNow = function(date){
  		return moment(date).fromNow();
	}
}
