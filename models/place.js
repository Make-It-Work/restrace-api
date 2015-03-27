var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//---------------------------------Schema-----------------------------------------------
var placeSchema = new Schema({
    google_id : {type : String, required : true, unique : true}, 
    name : {type : String, required : true},
    address : {type : String, required : true},	
    location            : {
        lat  : Boolean,
        lng  : Boolean,
    }
});


var Place = mongoose.model('Place', placeSchema);