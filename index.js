var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    
    var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
    var uuid = new Date().getTime();
    
    if (event.SeasonID == null) {
      var error = new Error('No Season');
      callback(error);
    }
    else if (event.Players == null) {
      var error = new Error('No Players');
      callback(error);
    }
    else if (event.Players.length < 1) {
      var error = new Error('No Players');
      callback(error);
    }
    else {
      var seasonParams = {
        TableName : 'Season',
        Key : { SeasonID: event.SeasonID }
      }
      docClient.get(seasonParams, function(err, data) {
        if (err) {
          callback(err);
        }
        else {
          var params = {

              TableName : 'Team',
              Item : { 
                  "TeamID" : uuid,
                  "Status" : "Active",
                  "Name" : event.Name ,
                  "SeasonID" : event.SeasonID,
                  "Players" : event.Players
              },
          };

          docClient.put(params, function(response, result) {
            callback('Success');
          });
        }
      });
    }
};