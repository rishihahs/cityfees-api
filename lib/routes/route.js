var config = require('../../config/config')['server'];

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
		Fee.findAll(function(error, results) {
			if (error) {
				res.send(500);
				console.log(error);
				return;
			}
			
			res.send(results);
		});
	});
}