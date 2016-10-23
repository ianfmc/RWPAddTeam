var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    
    var uuid = new Date().getTime();
    
    if (event.Season == null) {
      context.fail(new Error('No Season'));
    }
    else if (event.Players == null) {
      context.fail(new Error('No Players'));
    }
    else if (event.Players.length < 1) {
      context.fail(new Error('No Players'));
    }
    else {
      var seasonParams = {
        TableName : 'Season',
        Key : event.Season
      }
      docClient.get(seasonParams, function(err, data) {
        if (err) {
          context.fail('Season Not Found');
        }
        else {
          var params = {

              TableName : 'Team',
              Item : { 
                  "TeamID" : new Date().getTime() ,
                  "Name" : event.Name ,
                  "Season" : event.Season,
                  "Players" : event.Players
              },
          };

          docClient.put(params, function(response, result) {
            context.succeed('Team : ' + uuid.toString())
          });
        }
      });
    }
};