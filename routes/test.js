var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	//isLoggedIn(req, res, next);
	var user = {
		"user": req.user
	};
	if (req.query.returnType === 'json') {
		res.json(user);	
	} else {
		res.render('test/index.ejs', user);
	}
});

module.exports = router;