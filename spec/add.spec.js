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
				if (params.Key.SeasonID == 1477261819718) {
					callback(null, 'Success')
				}
				else {
					callback(new Error('Unknown Season'));
				}
		});
		AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
				callback();
		});
	});

	beforeEach(function() {
		context = { };
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
	});

	it('-- Adds a Team with correct data', sinon.test(function(done) {

		app.handler(teamCorrect, context, function (err, data) {
			expect(err).equal(null);
			expect(data).to.contain('Team');

			done();
		});
	}));

	it('-- Fails when no Season is found', sinon.test(function(done) {

		app.handler(teamNoSeason, context, function (err, data) {
			expect(err.message).equal('No Season');		;
			done();
		});
	}));	

	it('-- Fails when no Players are found', sinon.test(function(done) { 

		app.handler(teamNoPlayers, context, function (err, data) {
			expect(err.message).equal('No Players');		;
			done();
		});		
	}));

	it('-- Fails when the Season is not an existing Season', sinon.test(function(done) {
		
		app.handler(teamUnknownSeason, context, function (err, data) {
			expect(err.message).equal('Unknown Season');
			done();
		});	
	}));
});


