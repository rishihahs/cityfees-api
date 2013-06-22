module.exports = {
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
	}, // Maybe eventually this can be made into a number
	'Tags': {
	  type: [String]
	}
};