var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var raceSchema = new Schema({
	users : [{type : mongoose.Schema.Types.ObjectId, ref:"user"}],
	startDateTime : {type : Date, default : Date.now, required : true},
	eindDateTime : {type : Date, required : true},
	activities : [{type : mongoose.Schema.Types.ObjectId, ref:"activity", required : true}]
});

var race = mongoose.model('race', raceSchema);

raceSchema.path('users').validate(function (value, respond) {

    race.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Example non existent');