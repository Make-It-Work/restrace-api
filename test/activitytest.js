var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var mongoose = require('mongoose');

var app = require('express')();

var Activity = mongoose.model('Activity');
var activity = require('../routes/activity')(Activity);
app.use('/activity', activity);

function makeGetRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
		});
};

describe('Testing activity route', function(){

	describe('with invalid paramas', function(){
		it('should return 400 activity not found', function(done){
			makeGetRequest('/activity/12345', 400, done);
		});
	});

	describe('with valid params', function(){
		it('should return one activity', function(done){
			makeGetRequest('/activity/55193ec4ca7574a82b9b78ae', 200, function(err, res){
				if(err){return done(err);}
				expect(res.body).to.have.property('description');
				done();
			});
		});
	});
});