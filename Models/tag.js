var mongoose = require('mongoose');
	Schema = mongoose.Schema;
	User = require('./user');
	Activity = require('./activity');

var tagSchema = new Schema ({
	user_id : {type : Schema.Types.ObjectId, ref:"user", required:true},
	activity_id : {type : Schema.Types.ObjectId, ref:"activity", required:true},	
	dateTime : {type : Date, default: Date.now, value : Date.now, required:true}
});

mongoose.model('tag', tagSchema);

tagSchema.path('user_id').validate(function (value, respond) {

    User.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Race does not exist');

tagSchema.path('activity_id').validate(function (value, respond) {

    Activity.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Activity does not exist');

tagSchema.path('dateTime').validate(function(){
	return this.dateTime >= new Date();
}, 'Date time can not be in the past');