var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var User = mongoose.model('User');
var Activity = mongoose.model('Activity');

//------------------------------------Schema-----------------------------------------------------------
var tagSchema = new Schema ({
	user_id : {type : Schema.Types.ObjectId, ref:"user", required:true},
	activity_id : {type : Schema.Types.ObjectId, ref:"activity", required:true},	
	dateTime : {type : Date, default: Date.now, value : Date.now, required:true}
});

//----------------------------------Validation-------------------------------------------------------------------
tagSchema.path('user_id').validate(function (value, respond) {
    User.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'User does not exist');

tagSchema.path('activity_id').validate(function (value, respond) {
    Activity.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Activity does not exist');




mongoose.model('Tag', tagSchema);