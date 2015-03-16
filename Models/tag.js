var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema ({
	user_id : {type : mongo.Schema.Types.ObjectId, ref:"user"},
	activity_id : {type : mongo.Schema.Types.ObjectId, ref:"activity"},	
	dateTime : {type : Date, default: Date.now}
});

mongoose.model('tag', tagSchema);