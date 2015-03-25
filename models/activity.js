var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var	Place = mongoose.model('Place');

//--------------------------------Schema----------------------------------------------------
var activitySchema = new Schema({
	place_id : {type : Schema.Types.ObjectId, ref:"place", required:true},
	description : {type : String, required : true}
});

//--------------------------------Validation----------------------------------------------------
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

var Activity = mongoose.model('Activity', activitySchema);