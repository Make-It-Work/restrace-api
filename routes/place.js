var mongoose = require('mongoose');
var express = require('express');
var https = require('https');
var router = express.Router();
	
var Place;

	//get all the places
	//-----------------------------GET------------------------
router.get('/', function (req,res,next){
	var placesget = {
		host : 'maps.googleapis.com',
		port: 443,
		path: '/maps/api/place/nearbysearch/json?key=AIzaSyAUxO0NYgx05X4imuydcq4iKr2kGtWjIZI&location='+51.42+','+ 5.17+'&radius='+50000+'&type=cafe',
		method: 'GET'
	};

	var data = [];
			var klok = "klok";
		data.push(klok);
		
	var reqget = https.request(placesget, function(res){
		console.log("statuscode: "+res.statusCode);
		res.on('data', function(d){
			process.stdout.write
			data.push(JSON.stringify(d));
			console.log('----------------------');
			console.log(res.body);
		});
	});


		reqget.end();
		reqget.on('error', function(e){
			console.log(e);
		});
			console.log("========== helllo======="+data);
		 res.json(data);
		
});
	//Post a new place
	//------------------------------POST--------------------------
router.post('/', function (req, res, next){
		var place = new Place(req.body);
		console.log(place);
		console.log('--------------------------------------------------');
		place.save(function (err){
			if(err){
				console.log(err);
				res.send(err);
			} else {
				console.log(place);
				res.send({msg: "place with id" + place._id + " has succesfully been added"});
			}
		});
	});
	
	//Get an existing place
	//------------------------------GET----------------------- 
router.get('/:id', function (req, res, next){
		Place.findOne({_id:req.params.id}, function (err, place){
		
			var result = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA5Pi_VFtn3qtvxTfpMFWArykEvgGkkifE&placeid="+place.google_id;
			res.json(result);
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