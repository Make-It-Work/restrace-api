var mongoose = require('mongoose');

//----------------set connection--------------------------------------
var connection = mongoose.connect('mongodb://localhost:27017/restrace'); // connect to our database

//-------Require models------------------------------------
require('../models/user.js');
require('../models/place.js');
require('../models/activity.js');
require('../models/race.js');
require('../models/tag.js');