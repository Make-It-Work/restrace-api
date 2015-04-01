var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var bodyParser = require('body-parser');

var app = require('express')();
app.use(bodyParser());
var mongoose = require('mongoose');

var Race = mongoose.model('Race');

var race = require('../routes/race')(Race);
app.use('/race', race);


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


//---------------------------------------------------------------------------Tests--------------------------------------------------------------------------
//----------------------------------------------------------------------------with no params---------------------------------------------------------------------------
describe('Testing race route', function(){
	describe('without params', function(){
		it('should return all races', function(done){
			makeGetRequest('/race', 200, function (err, res){	
				if(err){ return done(err); };
					expect(res.body[0]).to.have.property('name');
					expect(res.body[0].name).to.not.be.undefined;
					done();
			});
		});
	});

//------------------------------------------------------------------------with invalid params-------------------------------------------------------------
//------------------------------------------------------------------------------GET-----------------------------------------------------------------------
	describe('with invalid params', function(){
		it('should return race not found', function(done){
			makeGetRequest('/race/12345679', 400, done);			
		});
//---------------------------------------------------------------------------POST---------------------------------------------
		it('should return invalid param', function(done){
			var object ={
				"name": "Kroegenrace", 
				"description": "hello works this", 
				"owner": "55198d1de3023e745144eecf", 
				"users" : [], 
				"activities" : []
			};
			makePostRequest('/race', 400, object, done);
		});
//--------------------------------------------------------------------------PUT--------------------------------------
		it('should not change the description, wrong race id', function(done){
			var object ={
				"description" : "pietje puk nooooo" 
			}
			makePutRequest('/race/123', 400, object, done);
		});		

		it('should not change the description, validation error', function(done){
			var object ={
				"owner" : "123" 
			}
			makePutRequest('/race/551aa648389ae2e0482133ca', 400, object, done);
		});		

//-------------------------------------------------------------------------------DELETE--------------------------------------------------------------------------
		it('should return invalid params for deleting a race, wrong race id', function(done){
			makeDeleteRequest('/race/123', 400, done);
		});

		it('should return invalid params for deleting user of a race, wrong race id', function(done){
			makeDeleteRequest('/race/123/user/123', 400, done);
		});

		it('should return invalid params for deleting user of a race, wrong user id', function(done){
			makeDeleteRequest('/race/551272885c15d65418de7bfa/user/123', 400, done);
		});

		it('should return invalid params for deleting activities of a race, wrong race id', function(done){
			makeDeleteRequest('/race/132/activity/123', 400, done);
		});

		it('should return invalid params for deleting activities of a race, wrong activity id', function(done){
			makeDeleteRequest('/race/551272885c15d65418de7bfa/activity/123', 400, done);
		});
	});

//------------------------------------------------------------------------------with valid params-------------------------------------------------------------------
//------------------------------------------------------------------------------GET-------------------------------------------------------------------------------
	describe('with valid params', function(){
		it('schould return a race', function (done){
			makeGetRequest('/race/551bb0246c2fe6303cdcb6c8', 200, function (err, res){
				if(err){return done(err);}
				
				expect(res.body).to.have.property('name');
				expect(res.body.name).to.not.be.undefined;
				expect(res.body).to.have.property('owner');
				expect(res.body.owner).to.not.be.undefined;
				expect(res.body).to.have.property('description');
				expect(res.body.description).to.not.be.undefined;
				expect(res.body).to.have.property('activities');
				expect(res.body).to.have.property('users');
				expect(res.body).to.have.property('startDateTime');
				expect(res.body.startDateTime).to.not.be.undefined;
				expect(res.body).to.have.property('endDateTime');
				expect(res.body.endDateTime).to.not.be.undefined;
				
				done();
			});			
		});
		
		it('should return activities ids of the race', function(done){
			makeGetRequest('/race/551bb0246c2fe6303cdcb6c8/activities', 200, function(err,res){
				if(err){return done(err);}				
				done();
			});
		});

		it('should return users id who are joioning the race', function(done){
			makeGetRequest('/race/551bb0246c2fe6303cdcb6c8/users', 200, function (err, res){
				if(err){return done(err);}	

				done();
			});
		});

//------------------------------------------------------------------------------------POST------------------------------------------------------------------------------------
		it('should add a race', function(done){
			var object ={
				  "name": "Kroegenrace", 
				  "description": "hello works this", 
				  "owner": "55198d1de3023e745144eecf", 
				  "users" : [], 
				  "startDateTime" : "2015-04-25T09:17:41.634Z", 
				  "endDateTime" : "2015-04-26T09:17:41.634Z", 
				  "activities" : []
				};

			makePostRequest('/race', 200, object, done);
		});

//-------------------------------------------------------------------------------------PUT----------------------------------------------
	it('should change the name of the race', function(done){
		var object = {
			"name":"pietje puk"
		};
		makePutRequest('/race/551bb0246c2fe6303cdcb6c8', 200, object, done);
	})

//------------------------------------------------------------------------------------DELETE---------------------------------------------------------------------------------------------
		it('should delete race', function(done){
			makeDeleteRequest('/race/551bb0276c2fe6303cdcb6d1', 200, done);
		});

		it('should delete a user from a race', function(done){
			makeDeleteRequest('/race/551bb0246c2fe6303cdcb6cc/user/551ba4d30bd053b444bb677c',200,done);
		});

		it('should delete a activity from a race', function(done){
			makeDeleteRequest('/race/551bb0246c2fe6303cdcb6cc/activity/551bad39e12f715454920f8d',200,done);
		});
	});


});