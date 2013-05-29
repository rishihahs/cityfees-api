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

	var Fee = mongoose.model('Fee', mongoose.Schema(schema));
	
	var criteria = { _id: 0 };
	var keys = Object.keys(schema);
	for (var i = 0; i < keys.length; i++) {
		criteria[keys[i]] = 1;
	}

	Fee.findByName = function(name, callback) {
		this.find({ 'Name': name }).select(criteria).exec(callback);
	}

	Fee.findAll = function(callback) {
		this.find({ }).select(criteria).exec(callback);
	}

	return Fee;
}