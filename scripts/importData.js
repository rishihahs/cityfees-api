var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var config = require('../config/config.js')['db'];
var Fee = require('../lib/models/Fee.js')(mongoose);

// City Fees
var loc;
var i = process.argv.indexOf('-file');
if (i !== -1) {
	loc = process.argv[i + 1];
}

if (!loc) {
	console.log('=== Usage ===');
	console.log('node ' + __filename + ' -file /file/path');
	process.exit(1);
}

var cityfees = JSON.parse(fs.readFileSync(path.normalize(loc), 'utf8'));

// DB Operations
mongoose.connect('mongodb://' + config['auth'] + config['host'] + config['port'] + '/' + config['database']);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', updateDatabase);

// Insert fees

function updateDatabase() {
	Fee.create(cityfees, function(err) {
		if (err) {
			console.log(err);
			return;
		}

		console.log('Success!');
		mongoose.disconnect();
	});
}