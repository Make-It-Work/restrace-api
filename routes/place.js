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
		var place = new Place(req.body);

		place.save(function (err){
			if(err){
				res.send(err);
			} else {
				res.send({msg: "place with id" + place._id + " has succesfully been added"});
			}
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
	var db = req.db;
	var id = req.params.id;
	var body = req.body;
	Place.findById(id, function (err, place) {
		if (err) {
			res.send(err);
		} else {
			for(var key in body) {
				place[key] = body[key];
			}
			console.log(place);
			place.save(function (err) {
				if (err) {
					res.send(err);
				} else {
					res.send("Updated place with id " + id + "succesfully");
				}
			});
		}
    });
});

module.exports = function(PlaceSchema) {
	Place = PlaceSchema;
	return router;
}