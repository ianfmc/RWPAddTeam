var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    
    var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
    var uuid = new Date().getTime();
    
    if (event.SeasonID == null) {
      callback(new Error('No Season'));
    }
    else if (event.Players == null) {
      callback(new Error('No Players'));
    }
    else {
      if (event.Players.length < 1) {
        callback(new Error('No Players'));
      }
      else {
        var seasonParams = {
          TableName : 'Season',
          Key : { SeasonID: event.SeasonID }
        }
        docClient.get(seasonParams, function(err, data) {
          if (err) {
            callback(new Error('Unknown Season'));
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
            docClient.put(params, function(err, result) {
              if (err) 
                callback(new Error('DynamoDB Error'));
              else 
                callback(null, 'Team: ' + uuid);
            });
          }
        });
      }
    }
};