var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
	
var Activity;

	//get all the activities
	//-----------------------------GET------------------------
router.get('/', function (req,res,next){
		Activity.find(function(err, result){
			res.json(result);
		});
	})
	//Post a new activity
	//------------------------------POST--------------------------
router.post('/', function (req, res, next){
		var activity = new Activity(req.body.activity);

		activity.save(function (err, activity){
			res.send({msg: "activity with id" + activity._id + " has succesfully been added"});
		});
	});
	
	//Get an existing activity
	//------------------------------GET----------------------- 
router.get('/:id', function (req, res, next){
		Activity.findOne({_id:req.params.id}, function (err, activity){
			res.json(activity);
		});
	})

	//Delete a activity
	//-------------------------------DELETE---------------------------
router.delete('/:id', function (req, res, next){
		Activity.remove({_id:req.params.id}, function (err){
			res.send({msg: "activity with id" + req.params.id + " has succesfully been deleted."});
		});
	})

	//Update a activity
	//------------------------------PUT--------------------------------
router.put('/:id', function (req, res, next){
			//geen idee hoe
});

module.exports = function(ActivitySchema) {
	Activity = ActivitySchema;
	return router;
}