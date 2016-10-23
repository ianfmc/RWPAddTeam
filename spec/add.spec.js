var AWS = require('aws-sdk');

var app = require('../index.js');
var chai = require('chai');
var sinon = require('sinon');

var expect = chai.expect;
var assert = chai.assert;

describe('Add a New Team', function() { 

	var database;
	var callback;

	var teamCorrect;
	var teamUnknownSeason;
	var teamNoPlayers;

	before(function(){
		database = sinon.mock(AWS.DynamoDB.Document);
	});

	after(function() {
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

	it('-- Adds a team with correct data', sinon.test(function(done) {
		var context = {
			succeed : function(result) {
				expect(true).to.be.true
				done();
			},
			fail : function(result) {
				done(new Error('failed'));
			}
		}
		var result = app.handler(teamCorrect, context);
		expect(result).to.have.string("Team");
	}));

	it('-- Fails when no Season is found', sinon.test(function(done) {
		assert.fail(0, 0, 'No Test Created');
		done();
	}));	

	it('-- Fails when the Season is not an existing Season', sinon.test(function(done) {
		var context = {
			succeed : function(result) {
				expect(true).to.be.true
				done();
			},
			fail : function(result) {
				done(new Error('failed'));
			}
		}
		var result = app.handler(teamCorrect, context);
		expect(result).to.be.an('error');
	}));

	it('-- Fails when no Players are found', sinon.test(function(done) { 
		var context = {
			succeed : function(result) {
				expect(true).to.be.true
				done();
			},
			fail : function(result) {
				done(new Error('failed'));
			}
		}
		var result = app.handler(teamCorrect, context);
		expect(result).to.be.an('error');
	}));

	it('-- Fails gracefully when team is not added', sinon.test(function(done) {
		assert.fail(0, 0, 'No Test Created');
		done();
	}));
});


