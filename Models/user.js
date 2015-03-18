var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var userSchema = new Schema({
	username : {type : String, required : true, unique : true},
	password : {type : String, min : 4, required : true},
	races : [{type : mongoose.Schema.Types.ObjectId, ref:"race"}]
});



mongoose.model('user', userSchema);