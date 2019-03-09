var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/user')
//{ userMongoClient: true}

var fileSchema = mongoose.Schema

var user = new fileSchema({
	userName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('User', user)
