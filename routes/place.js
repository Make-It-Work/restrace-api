var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
	
var Place;

	//get all the places
	//-----------------------------GET------------------------
router.get('/', function (req,res,next){
		Place.find(function(err, result){
			res.json(result);
		});
	})
	//Post a new place
	//------------------------------POST--------------------------
router.post('/', function (req, res, next){
		var place = new Race(req.body.place);

		place.save(function (err, place){
			res.send({msg: "place with id" + place._id + " has succesfully been added"});
		});
	});
	
	//Get an existing place
	//------------------------------GET----------------------- 
router.get('/:id', function (req, res, next){
		Place.findOne({_id:req.params.id}, function (err, place){
			res.json(place);
		});
	})

	//Delete a place
	//-------------------------------DELETE---------------------------
router.delete('/:id', function (req, res, next){
		Place.remove({_id:req.params.id}, function (err){
			res.send({msg: "place with id" + req.params.id + " has succesfully been deleted."});
		});
	})

	//Update a place
	//------------------------------PUT--------------------------------
router.put('/:id', function (req, res, next){
			//geen idee hoe
});

module.exports = function(PlaceSchema) {
	Place = PlaceSchema;
	return router;
}