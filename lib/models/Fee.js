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
	Fee.findByName = function(name, callback) {
		this.find({ 'Name': name }).exec(callback);
	}

	return Fee;
}