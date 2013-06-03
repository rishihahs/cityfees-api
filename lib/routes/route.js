var config = require('../../config/config')['server'];
var FeeModel = require('../models/Fee');

module.exports = function(app, Fee) {
	app.get(config['api_root'] + '/get/name/:name', function(req, res) {
		var name = req.params.name;
		Fee.findByName(name, function(error, results) {
			if (error) {
				res.send(500);
				console.log(error);
				return;
			}
			
			res.send(results);
		});
	});

	app.get(config['api_root'] + '/get/search/:query', function(req, res) {
		var query = req.params.query;
		var filter = req.query['ResponsibleDepartment'];

		Fee.fulltextFind(query, filter, function(error, results) {
			if (error) {
				res.send(500);
				console.log(error);
				return;
			}
			
			res.send(results);
		});
	});

	app.get(config['api_root'] + '/get/all', function(req, res) {
		if (req.query['callback']) {
			res.setHeader('Content-Type', 'application/javascript');
		}

		var callback = function(data) {
			var c = req.query['callback'];
			if (c) {
				return c + '(' + data + ')';
			} else {
				return data;
			}
		}
		var hash = req.query['hash'];

		if (hash === FeeModel.MD5) {
			res.send(callback(''));
			return;
		}

		Fee.findAll(function(error, results) {
			if (error) {
				res.send(500);
				console.log(error);
				return;
			}
			
			if (!FeeModel.MD5) {
				FeeModel.MD5 = FeeModel.createHash(JSON.stringify(results));
			}
			res.send(callback(JSON.stringify(results)));
		});
	});
}