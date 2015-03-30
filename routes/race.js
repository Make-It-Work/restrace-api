var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var async = require('async');
	
var Race;
var Activity = mongoose.model('Activity');
var User = mongoose.model('User');

	//get all the races
	//-----------------------------GET------------------------
router.get('/', function (req,res){
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
			if(race === undefined){return res.status(400).end('Wrong race id');}
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
					res.send("Updated race with id " + id + " succesfully");
				}
			});
		}
    });
});


//==============================================================================================================================================

	
	//Get the activities of an existing race
	//------------------------------GET----------------------- 
router.get('/:id/activities', function (req, res, next){
	Race.findOne({_id:req.params.id}, function (err, race){
			if(err){
				res.send(err);
			}
			else{
 				var activities = [];
 				var functions = [];

 				for(var index = 0; index< race.activities.length; index++){

	 				async.series([	 	
		 				function(callback){	
		 					var number = index;		
			 					function getObject(callback){
			 						Activity.findOne({_id: race.activities[number]}, function(err, activity){
										if(err){ return callback (null, err);}
										console.log(number);
										callback(null, activity);
									});						
			 					}
			 				functions.push(getObject);
			 			}
		 			])
 				};

				async.parallel(functions,
					// optional callback 
					function(err, activity){		   
				    	activities.push(activity);
						res.json(activity);
					}
				);	
			}
		});
});


	//Get the users of an existing race
	//------------------------------GET----------------------- 
router.get('/:id/users', function (req, res, next){
		Race.findOne({_id:req.params.id}, function (err, race){
			if(err){
				res.send(err);
			}
			else{
 				var functions = [];

 				for(var index = 0; index< race.users.length; index++){

	 				async.series([	 	
		 				function(callback){	
		 					var number = index;		
			 					function getObject(callback){
			 						User.findOne({_id: race.users[number]}, function(err, user){
										if(err){ return callback (null, err);}
										console.log(number);
										callback(null, user);
									});						
			 					}
			 				functions.push(getObject);
			 			}
		 			])
 				};

				async.parallel(functions,
					// optional callback 
					function(err, user){		   
						res.json(user);
					}
				);				
			}		
		});
});

	// Add a activity to a race
	//-------------------------POST ACTIVITY------------------------------------------
router.post('/:id/activity/:activity_id', function (req, res, next){
	Race.findOne({_id:req.params.id}, function (err, race){
		if(err){
			res.json(err);
		}
		else{
			Activity.findOne({_id : req.params.activity_id}, function (err, activity){
				if(err){
					res.json(err);
				}
				else{
					race.activities.push(activity.id);				
					race.save(function (err){
						if(err){
							res.send(err);
						}
						else{
							res.send("Activity "+ activity.id +" succesfully added");
						}
					});
				
				}
			});
		}

	});
});

	// Add a user to a race
	//-------------------------POST USER------------------------------------------
router.post('/:id/user/:user_id', function (req, res, next){
	Race.findOne({_id:req.params.id}, function (err, race){
		if(err){
			res.json(err);
		}
		else{
			User.findOne({_id : req.params.user_id}, function (err, user){
				if(err){
					res.json(err);
				}
				else{
					race.users.push(user.id);				
					race.save(function (err){
						if(err){
							res.send(err);
						}
						else{
							res.send("User "+ user.id +" succesfully added");
						}
					});
				
				}
			});
		}

	});
});

	// Delete a activity of a race
	//-------------------------DELETE ACTIVITY------------------------------------------
router.delete('/:id/activity/:activity_id', function (req, res, next){
	Race.findOne({_id:req.params.id}, function (err, race){
		if(err){
			res.json(err);
		}
		else{
			Activity.findOne({_id : req.params.activity_id}, function (err, activity){
				if(err){
					res.json(err);
				}
				else{
					race.activities.remove(activity.id);				
					race.save(function (err){
						if(err){
							res.send(err);
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


	// Delete a user of a race
	//-------------------------DELETE USER------------------------------------------
router.delete('/:id/user/:user_id', function (req, res, next){
	Race.findOne({_id:req.params.id}, function (err, race){
		if(err){
			res.json(err);
		}
		else{
			User.findOne({_id : req.params.user_id}, function (err, user){
				if(err){
					res.json(err);
				}
				else{
					race.users.remove(user.id);				
					race.save(function (err){
						if(err){
							res.send(err);
						}
						else{
							res.send("User "+ user.id +" succesfully deleted");
						}
					});
				
				}
			});
		}

	});
});

module.exports = function(RaceSchema) {
	Race = RaceSchema;
	return router;
}