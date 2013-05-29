var config = require('../../config/config')['server'];

module.exports = function(app, Fee) {
	app.get(config['api_root'] + '/:name', function(req, res) {
		var name = req.params.name;
		Fee.findByName(name, function(results) {
			res.send(JSON.stringify(results));
		});
	});
}