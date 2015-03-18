var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	place_id : {type : mongoose.Schema.Types.ObjectId, ref:"place", required:true},
	race_id : {type : mongoose.Schema.Types.ObjectId, ref:"race", required:true},
	startDateTime : {type: Date, default : Date.now, required:true},
	endDateTime : {type : Date, required:true}
});

var activity = mongoose.model('activity', activitySchema);

activitySchema
	// validate place_id is existing place
	.path('place_id').validate(function(value){
		//zoek in places in database naar het id
	}, 'Invalid place id')


