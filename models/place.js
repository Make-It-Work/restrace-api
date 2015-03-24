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

    // validate google_id is already existing in our database
placeSchema.path('google_id').validate(function (value, respond){
		place.findOne({google_id : value}, function (err, doc){

       //google id in onze databse?
		});
    });


var Place = mongoose.model('Place', placeSchema);