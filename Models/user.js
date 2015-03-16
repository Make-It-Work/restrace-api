var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username : {type : String, required:true},
	password : {type : String, min : 4, required:true}
});

mongoose.model('user', userSchema);