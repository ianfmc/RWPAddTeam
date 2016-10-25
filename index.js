var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    
    var uuid = new Date().getTime();
    console.log(event);
    
    if (event.Season === '') {
      context.fail(new Error('No Season'));
    }
    else if (event.Players === '') {
      context.fail('No Players');
    }
    else if (event.Players.length < 1) {
      context.fail('No Players');
    }
    else {
      var seasonParams = {
        TableName : 'Season',
        Key : event.Season
      }
      console.log(seasonParams);
      docClient.get(seasonParams, function(err, data) {
        if (err) {
          console.log("Season Not Found");
          context.fail('Season Not Found');
        }
        else {
          console.log("Success");
          var params = {

              TableName : 'Team',
              Item : { 
                  "TeamID" : new Date().getTime(),
                  "Status" : "Active",
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