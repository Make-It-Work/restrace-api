var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	activity_id : {type : Number, unique : true}
	place_id : {type : mongo.Schema.Types.ObjectId, ref:"place", required:true},
	race_id : {type : mongo.Schema.Types.ObjectId, ref:"race", required:true},
	startDateTime : {type: Date, default : Date.now, required:true},
	eindDateTime : {type : Date, required:true}
});

mongoose.model('activity', activitySchema);