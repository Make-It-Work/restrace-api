// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
// Models ======================================================================
require('./models/user.js');
require('./models/place.js');
require('./models/activity.js');
require('./models/race.js');
require('./models/tag.js');

// configuration ===============================================================
var connection = mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(allowCrossDomain);

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovetheaandicethea' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/authentication.js')(app, passport); // load our routes and pass in our app and fully configured passport

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated())
		return next();

	if (req.query.returnType === 'json') {
		res.send({ msg: 'You are not logged in.'});	
	} else {
		res.redirect('/');
	}
};

var test = require('./routes/test.js');
app.use('/test', isLoggedIn, test);

var race = require('./routes/race.js');
var raceRouter = race(mongoose.model('Race'));
app.use('/race', raceRouter);

var activity = require('./routes/activity.js');
var activityRouter = activity(connection.model('Activity'));
app.use('/activity', activityRouter);

var place = require('./routes/place.js');
var placeRouter = place(connection.model('Place'));
app.use('/place', placeRouter);

var tag = require('./routes/tag.js');
var tagRouter = tag(connection.model('Tag'));
app.use('/tag', tagRouter);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);