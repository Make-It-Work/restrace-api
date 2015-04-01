var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var bodyParser = require('body-parser');

var app = require('express')();
app.use(bodyParser());
var mongoose = require('mongoose');

var Activity = mongoose.model('Activity');
var activity = require('../routes/activity')(Activity);
app.use('/activity', activity);

//----------------------------------------------------Make requests--------------------------------------------------------------------------
function makeGetRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
		});
};

function makePostRequest(route, statusCode, object, done){
	request(app)
		.post(route)
		.set({'Content-Type':'application/json'})
		.send(object)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
		});
};

function makePutRequest(route, statusCode, object, done){
	request(app)
		.put(route)
		.set({'Content-Type' : 'application/json'})
		.send(object)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
		});
};

function makeDeleteRequest(route, statusCode, done){
	request(app)
		.delete(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
	});
};


describe('Testing activity route', function(){
//----------------------------------------------------Invalid params-----------------------------------------------------
	describe('with invalid paramas', function(){
		it('should return 400 activity not found', function(done){
			makeGetRequest('/activity/12345', 400, done);
		});

		it('should return activity has no tags', function(done){
			makeGetRequest('/activity/551ae33633b56bf4116d98b2/tags', 400, done);
		});

		it('should get activity id is wrong', function(done){
			makeGetRequest('/activity/123/tags', 400, done);
		});

		it('should return wrong properties', function(done){
			var object = {
				"google_id" : "987654321abc",
    			"description" : "run run, test"
			}
			makePostRequest('/activity', 400, object, done);
		});

		it('should return ractivity does not exist', function(done){
			var object = {
				"user_id" : "987654321abc"
			}
			makePostRequest('/activity/123/tag', 400, object, done);
		}); 


		it('should return wrong id', function(done){
			var object = { "description": "boe" };
			makePutRequest('/activity/123', 400, object, done);
		});

		it('should return invalid params', function(done){
			makeDeleteRequest('/activity/123', 400, done);
		});
	});

//------------------------------------------------------Valid params--------------------------------------------------------
	describe('with valid params', function(){
		it('should return one activity', function(done){
			makeGetRequest('/activity/551bad39e12f715454920f91', 200, function(err, res){
				if(err){return done(err);}
				expect(res.body[0]).to.have.property('description');
				expect(res.body[0].description).to.not.be.undefined;
				done();
			});
		});


		it('should make an new activity', function(done){
			var object = {
				"google_id" : "551ba43c",
    			"description" : "run run, test",
    			"tags" : []
			}
			makePostRequest('/activity', 200, object, done);
		});

		it('should add a tag to the activity', function(done){
			var object = {
				"user_id" : "551ba4cb0bd053b444bb677b"
			}
			makePostRequest('/activity/551bad39e12f715454920f91/tag', 200, object, done);
		});

		it('should return all tags of activity', function(done){
			makeGetRequest('/activity/551bad39e12f715454920f91/tags', 200, done);
		});

		it('should change the description', function(done){
			var object = {
				"description" : "oh yeah oh yeah"
			}
			makePutRequest('/activity/551bad39e12f715454920f91', 200, object, done);
		});

		it('should delete an activity', function(done){
			makeDeleteRequest('/activity/551bad39e12f715454920f8f', 200, done);
		});
	});
});