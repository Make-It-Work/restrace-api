var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var raceSchema = new Schema({
	race_id : {type : Number, unique : true}
	users : [Number],
	startDateTime : {type : Date, default: Date.now},
	eindDateTime : Date,
	activities : [{type : mongo.Schema.Types.ObjectId, ref:"activity"},]
});

mongoose.model('race', raceSchema);