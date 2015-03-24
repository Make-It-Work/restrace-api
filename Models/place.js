var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
    google_id : String, 
    name : String,
    Address : String,	
    location            : {
        lat  : Boolean,
        lng  : Boolean,
    }
});

mongoose.model('place', placeSchema);