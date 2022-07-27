# Hoolistream Check

API Service to check the number of concurrent streams a user is on for a particular account/platform.


## Tech
This implementation makes use of the following technologies
- [node.js] - event I/O for the backend
- [Dynamo] - stream/profile store

## How to Run

HS requires [Node.js](https://nodejs.org/)
Since this solution connects to an AWS Service, ensure that you have some dev credentials are configured

Install the dependencies and devDependencies and start the server.

```sh
npm i
node index.js
```




## Docker

HS is very easy to deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd hoolistream
docker build --platform linux/amd64 -t hoolistreamcheck .
```

This will create the HSc image and pull in the necessary dependencies.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8080
```

## Scaling

HS is currently deployed on AWS as a microservice on ECS beneath an ECS Service.
So, we can easily configure scaling groups, initial number of desired tasks and other forms
of Scaling activities based on several metrics

## Security
HS is currently served over HTTPS, so all traffic is secure

## Useage
To call the API, all that needs to be passed is the users email as a path variable
https://hoolicheck.qntmsoft.co.za/user/{useremail}
E.g
https://hoolicheck.qntmsoft.co.za/user/sandile@qntm.co.za
