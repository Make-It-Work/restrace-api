var mongoose = require('mongoose');
    Schema = mongoose.Schema;
    User = require('./user');
    Activity = require('./activity');

var raceSchema = new Schema({
	users : [{type : mongoose.Schema.Types.ObjectId, ref:"user"}],
	startDateTime : {type : Date, default : Date.now, required : true},
	endDateTime : {type : Date, required : true},
	activities : [{type : Schema.Types.ObjectId, ref:"activity", required : true}]
});

var race = mongoose.model('race', raceSchema);

raceSchema.path('users').validate(function (value, respond) {

    User.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Race does not exist');

raceSchema.path('activities').validate(function (value, respond) {

    Activity.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Activity does not exist');

    // validate startDateTime is not expired
raceSchema.path('startDateTime').validate(function(){
        return this.startDateTime >= new Date();
    }, 'Start date time is expired');

    // validate endDateTime is after the startDateTime
raceSchema.path('endDateTime').validate(function(){
        return this.endDateTime > this.startDateTime;
    }, 'End date time must be after the start date time');
