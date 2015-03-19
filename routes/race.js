var mongoose = require('mongoose');
	router = express.Router();
	_ = require('underscore');
	
var Race = mongoose.model('./race');

router.route('/')
	
	//get all the races
	//-----------------------------GET------------------------
	.get(function (req,res,next){
		Race.find(function(err, result){
			res.json(result);
		});
	})
	//Post a new race
	//------------------------------POST--------------------------
	.post(function (req, res, next){
		var race = new Race(req.body.race);

		race.save(function (err, race){
			res.send({msg: "race with id" + race._id + " has succesfully been added"});
		});
	});

router.route('/:id')
	
	//Get an existing race
	//------------------------------GET----------------------- 
	.get(function (req, res, next){
		Race.findOne({_id:req.params.id}, function (err, race){
			res.send(race);
		});
	})

	//Delete a race
	//-------------------------------DELETE---------------------------
	.delete(function (req, res, next){
		Race.remove({_id:req.params.id}, function (err){
			res.send({msg: "race with id" + req.params.id + " has succesfully been deleted."});
		});
	})

	//Update a race
	//------------------------------PUT--------------------------------
	.put(function (req, res, next){
			//geen idee hoe
	});

});