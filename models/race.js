var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');
var Activity = mongoose.model('Activity');

//-----------------------------------------Schema-------------------------------------------------------------------
var raceSchema = new Schema({
    name : {type : String, required : true},
    description : {type : String, required : true},
    owner : {type : mongoose.Schema.Types.ObjectId, ref:"user", required : true},
	users : [{type : mongoose.Schema.Types.ObjectId, ref:"user", unique: true}],
	startDateTime : {type : Date, default : Date.now, required : true},
	endDateTime : {type : Date, required : true},
	activities : [{type : Schema.Types.ObjectId, ref:"activity", required : true}]
});

//---------------------------------------------Validation----------------------------------------------------------------
raceSchema.path('users').validate(function (value, respond) {
    if(value === null){
        User.findOne({_id: value}, function (err, doc) {
            if (err || !doc) {
                respond(false);
            } else {
                respond(true);
            }
        });
    }
    respond(true);
}, 'User does not exist');

raceSchema.path('activities').validate(function (value, respond) {
    if(value === null){
        Activity.findOne({_id: value}, function (err, doc) {
            if (err || !doc) {
                respond(false);
            } else {
                respond(true);
            }
        });
    }
    respond(true);
}, 'Activity does not exist');

    // validate startDateTime is not expired
raceSchema.path('startDateTime').validate(function(){
        return this.startDateTime >= new Date();
    }, 'Start date time is expired');

    // validate endDateTime is after the startDateTime
raceSchema.path('endDateTime').validate(function(){
        return this.endDateTime > this.startDateTime;
    }, 'End date time must be after the start date time');


var Race = mongoose.model('Race', raceSchema);