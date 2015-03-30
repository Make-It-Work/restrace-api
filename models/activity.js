var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var	Place = mongoose.model('Place');

//--------------------------------Schema----------------------------------------------------
var activitySchema = new Schema({
    google_id : {type : Number, ref:"place", required:true},
	description : {type : String, required : true}
});

//--------------------------------Validation----------------------------------------------------
	// validate place_id is existing place
activitySchema.path('google_id').validate(function (value, respond){
	Place.findOne({google_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });
	}, 'Invalid place id');

var Activity = mongoose.model('Activity', activitySchema);