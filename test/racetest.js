var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

var app = require('express')();
var mongoose = require('mongoose');

var Race = mongoose.model('Race');

var race = require('../routes/race')(Race);
app.use('/race', race);

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
		.send(object)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
		});
};

function makePutRequest(rout, statusCode, object, done){
	request(app)
		.put(route)
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

	describe('with invalid params', function(){
		it('should return race not found', function(done){
			makeGetRequest('/race/12345679', 400, done);			
		});
	});

	describe('with valid params', function(){
		it('schould return a race', function (done){
			makeGetRequest('/race/551272885c15d65418de7bfa', 200, function (err, res){
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
		
		it('should return activities id', function(done){
			makeGetRequest('/race/551272885c15d65418de7bfa/activities', 200, function(err,res){
				if(err){return done(err);}

				expect(res.body[0]).to.have.property('place_id');
				expect(res.body[0].place_id).to.not.be.undefined;
				expect(res.body[0]).to.have.property('description');
				expect(res.body[0].description).to.not.be.undefined;
				
				done();
			});
		});

		it('should return users id', function(done){
			makeGetRequest('/race/551272885c15d65418de7bfa/users', 200, function (err, res){
				if(err){return done(err);}

				expect(res.body[0]).to.have.property('races');
				expect(res.body[0]).to.have.property('Role');	

				done();
			});
		});

		it('should delete race', function(done){
			makeDeleteRequest('/race/551994410e0d4b82d663c4a9', 200, done);
		});


	});


});

