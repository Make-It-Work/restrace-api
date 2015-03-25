var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//---------------------------------Schema-----------------------------------------------
var placeSchema = new Schema({
    google_id : {type : String, required : true}, 
    name : {type : String, required : true},
    Address : {type : String, required : true},	
    location            : {
        lat  : Boolean,
        lng  : Boolean,
    }
});

//--------------------------------------Validation---------------------------------------------------
    // validate google_id is already existing in our database
placeSchema.path('google_id').validate(function (value, respond){
	place.findOne({google_id : value}, function (err, doc){
        if(err){
            respond(err);
        } else if (!doc){
            respond(true);
        }
        else{
            respond(false);
        }
       //google id in onze databse?
	});
    respond(true);
}, 'place already exist in the databse please take that one');


var Place = mongoose.model('Place', placeSchema);