var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var bodyParser = require('body-parser');

var app = require('express')();
app.use(bodyParser());
var mongoose = require('mongoose');

var Tag = mongoose.model('Tag');
var tag = require('../routes/tag')(Tag);
app.use('/tag', tag);

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

describe('Testing tag route', function(){
//------------------------------------------------------------- invalid params----------------------------------------------
	describe('with invalid params', function(){
		it('should return tag does not exist', function(done){
			makeGetRequest('/tag/123', 400, done);
		});
		
		it('should return wrong params', function(done){
			var object = { "user_id" : "123"}
			makePutRequest('/tag/551ae33633b56bf4116d98b2', 400, object, done);
		});

		it('should return wrong params', function(done){
			var object = { "user_id" : "55198d1de3023e745144eecf"}
			makePutRequest('/tag/123', 400, object, done);
		});

		it('should return id to delete does not exist', function(done){
			makeDeleteRequest('/tag/123', 400, done);
		});
	});

//----------------------------------------------------------------valid params---------------------------------------------
//-----------------------------------------------------------------GET----------------------------------------

	describe('with valid params', function(){
		it('should return a tag', function(done){
			makeGetRequest('/tag/551baed66025941846147da9', 200, function(err, res){
				if(err){return done(err);}
				expect(res.body).to.have.property('user_id');
				expect(res.body.user_id).to.not.be.undefined;
				expect(res.body).to.have.property('dateTime');
				expect(res.body.dateTime).to.not.be.undefined;
				done();
			});
		});

		it('should change the user_id', function(done){
			var object = {
				"user_id": "551ba4dc0bd053b444bb677d"
			}
			makePutRequest('/tag/551baed66025941846147da9', 200, object, done);
		});

		it('should delete the tag', function(done){
			makeDeleteRequest('/tag/551bb05368c056941a0b35c4', 200, done);
		});
	});
});
