'use strict';
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var partials = require('express-partials');
var _ = require('underscore');
var Intercom = require('intercom.io');
var cors = require('cors');
var expressValidator = require('express-validator');
var Liana = require('forest-express-mongoose');

var app = express();
var expressJwt = require('express-jwt');

// config
var config = require('./config/base.js');

var port = process.env.PORT || config.app.port || 5000;

// setup intercom
app.intercom = new Intercom(config.intercom.app_id, config.intercom.api_key);

// DB
var mongoose = require('mongoose');
mongoose.set('debug', config.debug.mongoose);
console.log('Connecting to ' + config.db.url);
mongoose.connect(config.db.url); // connect to the db
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


// all environments
app.set('port', port);
app.set('views', __dirname + '/app/admin');
app.set('view engine', 'ejs');
app.set('appRoot', __dirname);
app.set('trust proxy', 'loopback');

// load the express-partials middleware
app.use(partials());

// express promise
app.use(require('express-promise')());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    return {
      param: param,
      message : msg,
      value: value
    };
  }
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json({ limit: '5mb'}));

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// log every request to the console in the dev environment
if (app.settings.env === 'development') app.use(morgan('dev'));

// cookie parser
app.use(cookieParser());

// set the favicon
app.use(favicon(__dirname + '/app/assets/images/illustrio_logo.png'));

// define static directories
var staticDirs = {
  assets: 'app/assets',
  styles: 'app/styles',
  images: 'images',
  bower_components: 'bower_components'
};
_.map(staticDirs, function(dir, url){
  app.use('/' + url, express.static(__dirname + '/' + dir));
});

// auth - jwt
//var auth = require('./server/processors/auth.js');
//var skip_prefixes = ['/', '/login', '/forgot-password', '/register.*',
    //'/api/v1.*', '/images.*'];


//app.use(
  //auth.init({
    //secret: config.jwt.secret,
    //skip: skip_prefixes,
    //algorithm: 'HS256',
    //intercom_key: config.intercom.app_secret
  //})
//);
//app.auth = auth;

// models
var models = {
  mongoose: mongoose,
  Company: require('./server/models/logo'),
  User: require('./server/models/user'),
  Serie: require('./server/models/serie'),
  Illustration: require('./server/models/illustration'),
  IlluLog: require('./server/models/illu_log'),
  Gallery: require('./server/models/gallery'),
  SearchLog: require('./server/models/searchlog'),
  ExportLog: require('./server/models/exportLog'),
  Friend: require('./server/models/friend'),
  SpSession: require('./server/models/spSession'),
};

// JWT middleware
app.use('/api/v1', expressJwt({ secret: config.jwt.secret, credentialsRequired: false }));


app.use(Liana.init({
  // modelsDir: './server/models',
  configDir: './server/forest',
  envSecret: 'd21296cc8ab9b5fbee98d2405bf69346874e5e8914783ae046f14154af2f7403', //config.forest.jwt_api_key,
  authSecret: 'blublueuaie',
  mongoose: require('mongoose'),
  // includedModels: ['Company', 'User']
  //excludedModels: ['Company', 'User'] //, 'Users']
}));

// app.use(require('forest-express-mongoose').init({
//   modelsDir: __dirname + '/models', // Your models directory.
//   envSecret: process.env.FOREST_ENV_SECRET,
//   authSecret: process.env.FOREST_AUTH_SECRET,
//   mongoose: require('mongoose') // The mongoose database connection.
// }));


// routes
require('./server/routes/index.js')(app, models);

// forest
Liana.collection('usersDownloads', {
  fields: [
    { field: 'email', type: 'String' },
    { field: 'createdAt', type: 'Date' },
    { field: 'exportlogs', type: ['String'], reference: 'exportlogs._id' },
    { field: 'themes', type: ['String'], reference: 'themes._id' }
  ]
});


// console.log('======= here collection');
// Liana.collection('Company', {
//   searchFields: ['logo', 'points.x']
// });

// app.use(Liana.init({
//   modelsDir: './server/models',
//   secretKey: config.forest.jwt_api_key,
//   authKey: 'blublu',
//   mongoose: require('mongoose')
// }));

require('./server/routes/forest.js').mount(app, models);

// errors handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err);
  next(err);
});

// cors support
var corsWhitelist = ['https://alpha.illustrio.com', 'https://bleed.illustrio.com', 'localhost'];
var corsOptions = {
  origin: function(origin, callback){
    console.log(origin);
    var originIsWhitelisted = corsWhitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// console.log(require('mongoose').models);

// create server
http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
  console.log('Express server listening on port ' + app.get('port'));
  console.log('CORS whitelist - ' + corsWhitelist.join(', '));
});
