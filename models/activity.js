var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var	Place = mongoose.model('Place');
var Tag = mongoose.model('Tag');

//--------------------------------Schema----------------------------------------------------
var activitySchema = new Schema({
    google_id : {type : String, ref:"place", required:true},
	description : {type : String, required : true},
    tags : [{type : Schema.Types.ObjectId, ref:"tag"}]
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