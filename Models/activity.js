var mongoose = require('mongoose');
	Schema = mongoose.Schema;
	Place = require('./place');
	Race = require('./race');

var activitySchema = new Schema({
	place_id : {type : mongoose.Schema.Types.ObjectId, ref:"place", required:true},
	race_id : {type : mongoose.Schema.Types.ObjectId, ref:"race", required:true},
	startDateTime : {type: Date, default : Date.now, required:true},
	endDateTime : {type : Date, required:true}
});

var activity = mongoose.model('activity', activitySchema);

	// validate place_id is existing place
activitySchema.path('place_id').validate(function (value, respond){
	Place.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });
	}, 'Invalid place id');

	// validate race_id is existing race
activitySchema.path('race_id').validate(function(){
	Race.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });
	}, 'Invalid race id');

	// validate startDateTime is not expired
activitySchema.path('place_id').validate(function(){
		return this.startDateTime >= new Date();
	}, 'Start date time is expired');

	// validate endDateTime is after the startDateTime
activitySchema.path('place_id').validate(function(){
		return this.endDateTime > this.startDateTime;
	}, 'End date time must be after the start date time');
