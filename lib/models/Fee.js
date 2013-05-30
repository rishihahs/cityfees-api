var textSearch = require('mongoose-text-search');

module.exports = function(mongoose) {
	var schema = {
		'Name': {
			type: String,
			index: true
		},
		'ResponsibleDepartment': {
			type: String
		},
		'Description': {
			type: String
		},
		'StatutoryAuthority': {
			type: String
		},
		'AMOUNT': {
			type: String
		} // Maybe eventually this can be made into a number
	};

	var so = mongoose.Schema(schema);
	so.plugin(textSearch);
	so.index({
		'Name': 'text',
		'Description': 'text'
	});

	var Fee = mongoose.model('Fee', so);
	var criteria = createWantedKeys(schema);

	Fee.findByName = function(name, callback) {
		this.find({
			'Name': name
		}).select(criteria).exec(callback);
	}

	Fee.findAll = function(callback) {
		this.find({}).select(criteria).exec(callback);
	}

	Fee.fulltextFind = function(search, filter, callback) {
		var options = {
			'filter': {
				'ResponsibleDepartment': filter
			}
		}

		if (filter) {
			this.textSearch(search, options, function(error, results) {
				callback(error, extractFromFullText(results, criteria));
			});
		} else {
			this.textSearch(search, function(error, results) {
				callback(error, extractFromFullText(results, criteria));
			});
		}
	}

	return Fee;
}

// Extract the obj from the results

function extractFromFullText(results, criteria) {
	var data = [];
	var entries = results['results'];
	for (var i = 0; i < entries.length; i++) {
		var cleanObj = {};
		var obj = entries[i]['obj'];
		var keys = Object.keys(criteria);
		for (var x = 0; x < keys.length; x++) {
			if (criteria[keys[x]] === 0) {
				continue;
			}

			cleanObj[keys[x]] = obj[keys[x]];
		}

		data.push(cleanObj);
	}

	return data;
}

function createWantedKeys(schema) {
	var criteria = {
		_id: 0
	};
	var keys = Object.keys(schema);
	for (var i = 0; i < keys.length; i++) {
		criteria[keys[i]] = 1;
	}

	return criteria;
}