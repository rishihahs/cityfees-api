var textSearch = require('mongoose-text-search');
var schema = require('./schemas/FeeSchema');
var crypto = require('crypto');

function FeeModel(mongoose) {
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
			'project': criteria
		}

		if (filter) {
			options['filter'] = {
				'ResponsibleDepartment': {
					'$in': filter
				}
			};
		}

		this.textSearch(search, options, function(error, results) {
			callback(error, extractFromFullText(results, criteria));
		});
	}
	
	Fee.findByID = function(ids, callback) {
	  if (!(ids instanceof Array)) {
	    ids = [ids];
	  }
	  
	  for (var i = 0, l = ids.length; i < l; i++) {
	    ids[i] = mongoose.Types.ObjectId(ids[i]);
	  }
	  
	  this.find({
	    '_id': { '$in': ids }
	  }).select(criteria).exec(callback);
	}

	return Fee;
}

FeeModel.MD5 = null;

FeeModel.createHash = function(data) {
	return crypto.createHash('md5').update(data).digest('hex');
}

module.exports = FeeModel;

// Extract the obj from the results

function extractFromFullText(results) {
	var data = [];
	var entries = results['results'];
	for (var i = 0; i < entries.length; i++) {
		var obj = entries[i]['obj'];
		data.push(obj);
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