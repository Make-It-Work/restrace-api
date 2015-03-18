var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema ({
	user_id : {type : mongoose.Schema.Types.ObjectId, ref:"user", required:true},
	activity_id : {type : mongoose.Schema.Types.ObjectId, ref:"activity", required:true},	
	dateTime : {type : Date, default: Date.now, value : Date.now, required:true}
});

mongoose.model('tag', tagSchema);