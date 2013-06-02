module.exports = {
	'server': {
		'port': process.env.PORT || 9000,
		'api_root': '/api'
	},

	'db': {
		'auth': '', // username:password@
		'host': '127.0.0.1',
		'port': '', // e.g. :80
		'database': 'cityfees'
	}
}

module.exports['db']['uri'] = process.env.MONGOLAB_URI || 'mongodb://' + module.exports['db']['auth'] + module.exports['db']['host'] + module.exports['db']['port'] + '/' + module.exports['db']['database'];