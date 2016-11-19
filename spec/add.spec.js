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
	var teamNoplayers;

	before(function(){
		AWSMock.mock('DynamoDB.DocumentClient', 'get', function(params, callback) {
				if (params.Key.seasonID == 1477261819718) {
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
		    "name" : "Blue Bombers",
		    "seasonID" : 1477261819718,
		    "manager": {
		    	"firstname": "Roger",
		    	"lastname": "Long",
		    	"email": "roger.long@corp.com"
		    },
		    "coach": {
		    	"firstname": "Eric",
		    	"lastname": "Mitchell",
		    	"email": "eric.mitchell@corp.com"
		    },
		    "players" : [
					{
						"firstname" : "Lamar",
				 		"lastname" : "Connor",
				 		"capNumber" : "1",
				 		"position" : "Goalkeeper"
				 	}
				]
			};
		teamNoSeason = {
		    "name" : "Blue Bombers",
		    "manager": {
		    	"firstname": "Roger",
		    	"lastname": "Long",
		    	"email": "roger.long@corp.com"
		    },
		    "players" : [
					{
						"firstname" : "Lamar",
				 		"lastname" : "Connor",
				 		"capNumber" : "1",
				 		"position" : "Goalkeeper"
				 	}
				]
			};
		teamUnknownSeason = {
		    "name" : "Blue Bombers",
		    "seasonID" : 1477261819720,
		    "manager": {
		    	"firstname": "Roger",
		    	"lastname": "Long",
		    	"email": "roger.long@corp.com"
		    },
		    "players" : [
					{
						"firstname" : "Lamar",
				 		"lastname" : "Connor",
				 		"capNumber" : "1",
				 		"position" : "Goalkeeper"
				 	}
				]
			};
		teamNoManager = {
		    "name" : "Blue Bombers",
		    "seasonID" : 1477261819718,
		    "players" : [
					{
						"firstname" : "Lamar",
				 		"lastname" : "Connor",
				 		"capNumber" : "1",
				 		"position" : "Goalkeeper"
				 	}
				]
			};
		teamNoPlayers = {
		    "name" : "Blue Bombers",
		    "seasonID" : 1477261819718,
		    "manager": {
		    	"firstname": "Roger",
		    	"lastname": "Long",
		    	"email": "roger.long@corp.com"
		    }
		};
		teamZeroPlayers = {
		    "name" : "Blue Bombers",
		    "seasonID" : 1477261819718,
		    "manager": {
		    	"firstname": "Roger",
		    	"lastname": "Long",
		    	"email": "roger.long@corp.com"
		    },
		    "players" : []
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
			expect(err.message).equal('No Season');
			done();
		});
	}));	

	it('-- Fails when no Players are found', sinon.test(function(done) { 

		app.handler(teamNoPlayers, context, function (err, data) {
			expect(err.message).equal('No Players');
			done();
		});		
	}));

	it('-- Fails when no Manager is found', sinon.test(function(done) { 

		app.handler(teamNoManager, context, function (err, data) {
			expect(err.message).equal('No Manager');
			done();
		});		
	}));

	it('-- Fails when there are 0 Players', sinon.test(function(done) { 

		app.handler(teamZeroPlayers, context, function (err, data) {
			expect(err.message).equal('Need 1 Player');
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


