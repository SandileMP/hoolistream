const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const bodyParser = require('body-parser');
// port on which the server listens
const port = 3000;
const { v4: uuidv4 } = require('uuid');
// transforms every input request body
// into json objects for reading
app.use(bodyParser.json());
//DynamoDB client
const client = new AWS.DynamoDB.DocumentClient();
AWS.config.update({ region: 'eu-west-1' });
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
        if (err)
            res.status(500).send("Something went wrong while trying to looking up streaming data")
        else
            res.status(200).send(res);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});