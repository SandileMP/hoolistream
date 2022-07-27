const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const bodyParser = require('body-parser')
AWS.config.update({ region: 'eu-west-1' });
// port on which the server listens
const port = 8080;
const { v4: uuidv4 } = require('uuid');
// transforms every input request body
// into json objects for reading
app.use(bodyParser.json());
//DynamoDB client
const client = new AWS.DynamoDB.DocumentClient();
const user_profile = 'user_profile';
const user_stream = 'user_stream';

app.get("/user/:userId", (req, res) => {
    console.log(req)
    const userId = {
        TableName: 'user_profile',
        Key: {
            userId: req.params.userId
        }
    };
    client.get(userId, function(err, data) {
        if (err){
            console.log(err)
            res.status(500).send("Something went wrong while trying to looking up streaming data")
        }
        else{
            let user;
            try{
                console.log(streamChecker.getThreshold(data));
                const params ={

                    KeyConditionExpression: 'userId = :userId',
                    FilterExpression : "contains(#userId, :userId)",
                    ExpressionAttributeValues: {
                        ':userId': data.Item.userId
                    },
                    ExpressionAttributeNames: {
                        '#userId': "userId"
                    },
                    TableName: 'user_stream'
                }
                client.scan(params, function (err, filterData){
                    if (err){
                        console.log("Error while trying to get data")
                        res.status(400).send("Error while getting filtered data");
                    }else {
                        console.log(filterData.Count)
                        if (filterData.Count > streamChecker.getThreshold(data)){
                            res.status(429).send(res.json({message:"User has exceeded limits"}));
                        }else {
                            res.status(200).send(res.json({message:"User is still within limits"}));
                        }
                    }
                })
            }catch (err){
                res.status(400).send(res.json({message: 'User does not exist',id: userId.Key}))
            }
        }
    });
});
app.get('/health', (req, res) => {
    res.status(200).send("Services reached");
})
const streamChecker = {
    getThreshold: (data) => {
      return data.Item.Threshold
    }
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});