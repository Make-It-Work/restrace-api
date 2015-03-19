var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	isLoggedIn(req, res, next);
	res.render('test/index.ejs', {
		user: req.user
	});
});

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
};

module.exports = router;