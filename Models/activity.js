var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	activity_id : {type : Number, unique : true}
	place : Number,
	race : Number,
	startDateTime : {type: Date, default : Date.now},
	eindDateTime : Date
});

mongoose.model('activity', activitySchema);