var express = require('express');
var mongoose = require('mongoose');
var routes = require('./lib/routes/route.js');

var config = require('./config/config');
var Fee = require('./lib/models/Fee')(mongoose);

var app = express();

app.configure(function() {
	app.set('json spaces', 0);
	app.enable("jsonp callback");
	app.use(express.compress());
	mongoose.connect(config['db']['uri'], function(err) {
		if (err) {
			throw err;
		}
	});
});

routes(app, Fee);

app.listen(config['server']['port']);