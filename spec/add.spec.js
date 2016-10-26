var AWSMock = require('aws-sdk-mock');
var AWS = require('aws-sdk');

var app = require('../index.js');
var chai = require('chai');
var sinon = require('sinon');

var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('chai').assert;

describe('Add a New Team', function() { 

	var callback;

	var teamCorrect;
	var teamNoSeason;
	var teamUnknownSeason;
	var teamNoPlayers;

	before(function(){
		AWSMock.mock('DynamoDB.DocumentClient', 'get', function(params, callback) {
			callback(params);
		})
	});

	beforeEach(function() {
		context = {};
		teamCorrect = {
		    "Name" : "Blue Bombers",
		    "SeasonID" : 1477261819718,
		    "Players" : [
					{
						"First Name" : "Lamar",
				 		"Last Name" : "Connor",
				 		"Cap Number" : "1",
				 		"Position" : "Goalkeeper"
				 	}
				]
			};
		teamNoSeason = {
		    "Name" : "Blue Bombers",
		    "Players" : [
					{
						"First Name" : "Lamar",
				 		"Last Name" : "Connor",
				 		"Cap Number" : "1",
				 		"Position" : "Goalkeeper"
				 	}
				]
			};
		teamUnknownSeason = {
		    "Name" : "Blue Bombers",
		    "SeasonID" : 1477261819720,
		    "Players" : [
					{
						"First Name" : "Lamar",
				 		"Last Name" : "Connor",
				 		"Cap Number" : "1",
				 		"Position" : "Goalkeeper"
				 	}
				]
			};
		teamNoPlayers = {
		    "Name" : "Blue Bombers",
		    "SeasonID" : 1477261819718,
		};
	});

	afterEach(function() {
		callback.restore();
	    });

	it('-- Adds a Team with correct data', sinon.test(function(done) {
		callback = sinon.spy();

		app.handler(teamNoPlayers, context, callback);
		assert(callback.withArgs('Success'));

		done();
	}));

	it('-- Fails when no Season is found', sinon.test(function(done) {
		callback = sinon.spy();

		app.handler(teamNoSeason, context, callback);
		assert(callback.withArgs(Error));

		done();
	}));	


	it('-- Fails when no Players are found', sinon.test(function(done) { 
		callback = sinon.spy();

		app.handler(teamNoPlayers, context, callback);
		assert(callback.withArgs(Error));

		done();		
	}));

	it('-- Fails when the Season is not an existing Season', sinon.test(function(done) {
		callback = sinon.spy();

		app.handler(teamUnknownSeason, context, callback);
		assert(callback.withArgs(Error));

		done();	
	}));
});


