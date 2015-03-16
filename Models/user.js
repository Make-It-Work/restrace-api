var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username : String,
	password : {type : String, min : 4}
});

ongoose.model('user', userSchema);