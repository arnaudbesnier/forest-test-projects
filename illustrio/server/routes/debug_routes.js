var form  = require('express-form'),
	field = form.field;

var _ = require('underscore');
var async = require('async');
var moment = require('moment');

exports.mount = function(app, models){

	// only expose /debug if not production
	app.all(/^\/debug/, function(req, res, next){
		if (process.env.NODE_ENV !== 'production') {
			next();
		}
		else {
			res.redirect('/');
		}
	});

	app.get('/debug', function(req, res){
		res.json({
			host: req.hostname,
			path: req.path,
			user: req.user
		});
	});

	app.get('/debug/admintoken', function(req, res){
		var token = app.auth.sign({id: 'admin', roles: {'admin': true}}, 1);
		res.cookie('illustrio-auth', token, { maxAge: 24*60*60*1000 } );
		res.send(token);
	});

	app.get('/debug/token/:email', function(req, res){
		models.User.findByEmail(req.params.email, function(err, user){
			res.json(app.auth.sign(user));
		});
	});

	app.post('/debug/overwritepassword',
		form(
			field("email").trim().isEmail().required(),
		 	field("password").trim().required()
		),
		function(req,res){
			models.User.findByEmail(req.form.email, function(err, user){
				if (user){
					user.savePassword(req.form.password, function(err, user){
						res.json({err: err, user: user});
					});
				} else {
					res.json({err: 'no such user'});
				}
			});
		});

	app.get('/debug/intercom/:email', function(req, res){
		app.intercom.getUser({email: req.params.email}).then(function(user){
			res.json(user);
		});
	});

	app.get('/debug/test', function(req, res){
		console.log(req.user);
		res.json({
			series: models.Serie.where('owner').equals(req.user.id)
		});
	});

	app.get('/debug/draft', function(req, res){
		//models.Illustration.count({status: undefined}, function(err, ans){
		//	res.json(ans);
		//});
		models.Illustration.update({status: null}, {status: 'draft'}, { multi: true }, function(err,nb){
			res.json({err: err, nb: nb});
		});
	});

  app.get('/debug/removelock', function(req, res){
    models.Illustration.update({'review.lock': {$exists: true}}, {'review.lock': null}, {multi: true}, function(err, nb){
      res.json({err: err, nb: nb});
    });
  });

  app.get('/debug/insert-download', function (req, res) {
    var count = 10000;
    var offsetDays = 90;

    async.parallel({
      illustrations: function (callback) {
        models.Illustration.find({'status': 'accepted'}).select('_id series category name subcategory style owner').sort('-editedAt').limit(500).exec(callback);
      },
      clients: function (callback) {
        models.User.find({'roles.client': true}).select('_id').exec(callback);
      }
    }, function (err, results) {
      var downloads = [];

      for (var i=0; i<count; i++) {
        var timestamp = moment().subtract(_.random(0,offsetDays), 'day');
        var illustration = _.sample(results.illustrations);
        var userId = _.sample(results.clients)._id;
        downloads.push({
          timestamp: timestamp.toDate(),
          illustration: illustration.toObject(),
          user: userId,
          free: Math.random()<0.1
        });
      }

      models.ExportLog.collection.insert(downloads, function (err) {
        res.json({
          count: downloads.length,
          err: err
        });
      });

    });

  });

};
