var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    
    var uuid = new Date().getTime();
    console.log("UUID: " + uuid);
    
    var params = {

        TableName : 'Team',
        Item : { 
          "TeamID" : uuid ,
          "Name" : event.Name ,
          "Season" : event.Season,
          "Players" : event.Players
        },
    };

    docClient.put(params, context.done);
};
