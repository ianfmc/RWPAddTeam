var AWS = require('aws-sdk');

var app = require('../index.js');
var chai = require('chai');
var sinon = require('sinon');

var expect = chai.expect;
var assert = chai.assert;

describe('Add a New Team', function() { 

	var database;

	var teamCorrect;
	var teamNoSeason;
	var teamUnknownSeason;
	var teamNoPlayers;

	before(function(){
		database = new AWS.DynamoDB.DocumentClient();
		mock = sinon.mock(database);
		mock.expects("get").withArgs(teamCorrect).returns("OK");
		mock.expects("get").withArgs(teamNoSeason).returns(new(Error));
		mock.expects("get").withArgs(teamUnknownSeason).returns(new(Error));
		mock.expects("get").withArgs(teamNoPlayers).returns("OK");
	});

	beforeEach(function() {
		teamCorrect = {
		    "Name" : "Blue Bombers",
		    "Season" : "2016 CIF",
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
		    "Season" : "2016 Spring",
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
		    "Season" : "2016 Spring"
		};
	});

	afterEach(function() {
	    });

	it('-- Adds a Team with correct data', sinon.test(function(done) {
		var context = {
			succeed : function(result) {
				expect(result).to.have.string("Team");
				done();
			},
			fail : function(result) {
				done(new Error("Failed but should not have"));
			}
		};
		var result = app.handler(teamCorrect, context);
	}));

	it('-- Fails when no Season is found', sinon.test(function(done) {
		var context = {
			succeed : function(result) {
				done(result);
			},
			fail : function(result) {
				done(new Error());
			}
		};
		var result = app.handler(teamNoSeason, context);
		expect(result).to.fail();
	}));	

	it('-- Fails when the Season is not an existing Season', sinon.test(function(done) {
		var context = {
			succeed : function(result) {
				done();
			},
			fail : function(result) {
				done();
			}
		};
		var result = app.handler(teamUnknownSeason, context);
		expect(result).to.fail();	
	}));

	it('-- Fails when no Players are found', sinon.test(function(done) { 
		var context = {
			succeed : function(result) {
				expect(true).to.be.true
				done();
			},
			fail : function(result) {
				done();
			}
		};
		var result = app.handler(teamNoPlayers, context);
		expect(result).to.fail();
	}));
});


