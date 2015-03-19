var mongoose = require('mongoose');
	Schema = mongoose.Schema;
	Place = require('./place');
	Race = require('./race');

var activitySchema = new Schema({
	place_id : {type : Schema.Types.ObjectId, ref:"place", required:true},
	race_id : {type : Schema.Types.ObjectId, ref:"race", required:true}
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
