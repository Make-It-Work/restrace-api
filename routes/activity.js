var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var request = require('request');	

var Activity;

	//Post a new activity
	//------------------------------POST--------------------------
router.post('/', function (req, res, next){
		var activity = new Activity(req.body);
		activity.save(function (err){
			if(err){
				res.send(err);
			} else {
				res.send({msg: "activity with id" + activity._id + " has succesfully been added"});
			}
		});
	});
	
	//Get an existing activity
	//------------------------------GET----------------------- 
router.get('/:id', function (req, res, next){
		Activity.findOne({_id:req.params.id}, function (err, activity){
			if(activity === undefined){return res.status(400).end('Wrong activity id');}
			
			var url = 'https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA5Pi_VFtn3qtvxTfpMFWArykEvgGkkifE&placeid='+activity.google_id;

            request.get({url: url}, function(e, r, result) {
                result = JSON.parse(result);   
                var results = [];
                results.push(activity);
                results.push(result);                
                res.json(results);
            });
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
	var db = req.db;
	var id = req.params.id;
	var body = req.body;
	Activity.findById(id, function (err, activity) {
		if (err) {
			res.send(err);
		} else {
			for(var key in body) {
				activity[key] = body[key];
			}
			console.log(act);
			activity.save(function (err) {
				if (err) {
					res.send(err);
				} else {
					res.send("Updated activity with id " + id + "succesfully");
				}
			});
		}
    });
});

module.exports = function(ActivitySchema) {
	Activity = ActivitySchema;
	return router;
}