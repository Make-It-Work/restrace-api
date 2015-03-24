var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
	
var Race;

	//get all the races
	//-----------------------------GET------------------------
router.get('/', function (req,res,next){
		Race.find(function(err, result){
			res.json(result);
		});
	})
	//Post a new race
	//------------------------------POST--------------------------
router.post('/', function (req, res, next){
		var race = new Race(req.body);

		race.save(function (err){
			if(err){
				res.send(err);
			} else {
				res.send({msg: "race with id" + race._id + " has succesfully been added"});
			}
		});
	});
	
	//Get an existing race
	//------------------------------GET----------------------- 
router.get('/:id', function (req, res, next){
		Race.findOne({_id:req.params.id}, function (err, race){
			res.send(race);
		});
	})

	//Delete a race
	//-------------------------------DELETE---------------------------
router.delete('/:id', function (req, res, next){
		Race.remove({_id:req.params.id}, function (err){
			res.send({msg: "race with id" + req.params.id + " has succesfully been deleted."});
		});
	})

	//Update a race
	//------------------------------PUT--------------------------------
router.put('/:id', function (req, res, next){
			//geen idee hoe
});

module.exports = function(RaceSchema) {
	Race = RaceSchema;
	return router;
}