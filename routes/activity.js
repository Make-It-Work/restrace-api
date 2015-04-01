var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var request = require('request');	
var async = require('async');

var Activity;
var Tag = mongoose.model('Tag');

	//Post a new activity
	//------------------------------POST--------------------------
router.post('/', function (req, res, next){
		var activity = new Activity(req.body);
		activity.save(function (err){
			if(err){
				return res.status(400).end('There is something wrong with the params'+err);
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
			if(err){ return res.status(400).end('wrong activity id');}
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
			return res.status(400).end('Wrong activity id');
		} else {
			for(var key in body) {
				activity[key] = body[key];
			}
			activity.save(function (err) {
				if (err) {
					return res.status(400).end('Wrong activity id');
				} else {
					res.send("Updated activity with id " + id + "succesfully");
				}
			});
		}
    });
});

//---------------------------------------------TAGS-------------------------------
//get all tags of an activity
router.get('/:id/tags', function(req, res, next){
	Activity.findOne({_id:req.params.id}, function (err, activity){
			if(err){
				return res.status(400).end('Wrong activity id');
			}
			else{
				if(activity === null){ return res.status(400).end('no activity');}
				if(activity.tags === undefined){ console.log("erroorrr");return res.status(400).end('No tags');}
 				var functions = [];

 				for(var index = 0; index< activity.tags.length; index++){

	 				async.series([	 	
		 				function(callback){	
		 					var number = index;		
			 					function getObject(callback){
			 						Tag.findOne({_id: activity.tags[number]}, function(err, tag){
										if(err){ return callback (null, err);}
										callback(null, tag);
									});						
			 					}
			 				functions.push(getObject);
			 			}
		 			])
 				};

				async.parallel(functions,
					// optional callback 
					function(err, tag){		  
						res.json(tag);
					}
				);	
			}
		});
});

router.post('/:id/tag', function (req, res, next){
	Activity.findOne({_id:req.params.id}, function (err, activity){
			if(err){
				return res.status(400).end('Wrong activity id');
			}
			else{
				var tag = new Tag(req.body);
				
				tag.save(function (err){
					if(err){
						return res.status(400).end('Tag could not be saved'+err);
					} 
				});

				activity.tags.push(tag.id);
				
				activity.save(function (err){
					if(err){
						return res.status(400).end('Something went wrong with saving the tag in the activity'+err);
					}
					else{
						res.send("Activity "+ activity.id +" succesfully added a tag");
					}
				});
			}
	});
});

router.delete('/:id/tag/:tag_id', function (req, res, next){
	Activity.findOne({_id:req.params.id}, function (err, activity){
		if(err){
			return res.status(400).end('Wrong activity id');
		}
		else{
			Tag.findOne({_id : req.params.tag_id}, function (err, tag){
				if(err){
					return res.status(400).end('Wrong tag id');
				}
				else{
					Tag.remove({_id:tag.id}, function(err){
						if(err){ return res.status(400).end('wrong tag id');}	
					});
	
					activity.tags.remove(tag.id);				
					activity.save(function (err){
						if(err){
							return res.status(400).end('Could not save'+ err);
						}
						else{
							res.send("Activity "+ activity.id +" succesfully deleted");
						}
					});
				
				}
			});
		}
	});
});

module.exports = function(ActivitySchema) {
	Activity = ActivitySchema;
	return router;
}