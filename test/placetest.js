var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var mongoose = require('mongoose');

var app = require('express')();

var Place = mongoose.model('Place');
var place = require('../routes/place')(Place);
app.use('/place', place);

function makeGetRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
		});
};

describe.skip('Testing place route', function(){
	describe('with params', function(){
		it('should return one place', function(done){
			makeGetRequest('/place/55193e96ca7574a82b9b78ac', 200, function(err, res){
				if(err){return done(err);}
				expect(res.body).to.have.property('description');
				done();
			});
		});
	});
});