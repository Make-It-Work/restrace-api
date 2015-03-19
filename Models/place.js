var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
	location            : {
        lat  : Boolean,
        lng  : Boolean,
    },
    name : String
});

mongoose.model('place', placeSchema);