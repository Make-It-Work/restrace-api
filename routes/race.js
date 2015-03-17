var mongoose = require('mongoose');
var router = express.Router();

var race = mongoose.model('race');

router.route('/')
	
	.get(function(req,res,next){
		race.find(function(err, result){
			res.json(result);
		});
	})