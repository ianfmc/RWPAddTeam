var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    
    var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
    var uuid = new Date().getTime();
    
    if (event.seasonID == null) {
      callback(new Error('No Season'));
    }
    else if (event.manager == null) {
      callback(new Error('No Manager'));
    }
    else if (event.players == null) {
      callback(new Error('No Players'));
    }
    else {
      if (event.players.length < 1) {
        callback(new Error('Need 1 Player'));
      }
      else {
        var seasonParams = {
          TableName : 'Season',
          Key : { seasonID: event.seasonID }
        }
        docClient.get(seasonParams, function(err, data) {
          if (err) {
            callback(new Error('Unknown Season'));
          }
          else {
            var params = {

                TableName : 'Team',
                Item : { 
                    "teamID" : uuid.toString(),
                    "seasonID" : event.seasonID,
                    "status" : "Active",
                    "name" : event.name ,
                    "manager": event.manager,
                    "coach": event.coach,
                    "players" : event.players
                },
            };
            docClient.put(params, function(err, result) {
              if (err) 
                callback(new Error('DynamoDB Error'));
              else 
                callback(null, '{ teamID: ' + uuid + '}');
            });
          }
        });
      }
    }
};

