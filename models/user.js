var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = new Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    Role : [{type : String, default : 'user'}]
});

    // validate race_id is existing race
    /*
userSchema.path('races').validate(function(){
    Race.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });
    }, 'Invalid race id');
*/
// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', userSchema);

// create the model for users and expose it to our app
//module.exports = function(){ return User; }
//module.exports.ikword = 'gek';