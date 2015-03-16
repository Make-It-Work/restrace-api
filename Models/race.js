var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var raceSchema = new Schema({
	race_id : {type : Number, unique : true}
	users : [{type : mongo.Schema.Types.ObjectId, ref:"user", required:true}],
	startDateTime : {type : Date, default: Date.now, required:true},
	eindDateTime : {type : Date, required:true},
	activities : [{type : mongo.Schema.Types.ObjectId, ref:"activity"}, required:true]
});

mongoose.model('race', raceSchema);