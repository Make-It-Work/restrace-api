var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
	
var Race;
var Activity;

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
	var db = req.db;
	var id = req.params.id;
	var body = req.body;
	Race.findById(id, function (err, race) {
		if (err) {
			res.send(err);
		} else {
			for(var key in body) {
				race[key] = body[key];
			}
			console.log(race);
			race.save(function (err) {
				if (err) {
					res.send(err);
				} else {
					res.send("Updated race with id " + id + "succesfully");
				}
			});
		}
    });
});


	//Get activities of an existing race
	//------------------------------GET----------------------- 
router.get('/:id/activities', function (req, res, next){
		Race.findOne({_id:req.params.id}, function (err, result){
			if(err){
				res.send(err);
			}
			else{
				for(var key in res.body.activities){
					Activity.findById(key)
				}
			}

			res.send(result);
		});
	})


module.exports = function(RaceSchema, ActivitySchema) {
	Race = RaceSchema;
	Activity = ActivitySchema;
	return router;
}