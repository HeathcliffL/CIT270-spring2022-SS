//import express library
const express = require('express');

//set the port to
const port = 3000;

//body paerser is called middleware
const bodyParser = require('body-parser');
const { request } = require('express');
const { response } = require('express');

//import MD5
const md5 = require('md5');

//require the node-redis libary
const redis = require('redis');
//use this to connocting redis database
const client = redis.createClient(port,);

//use the library
const app = express();

//use the middleware (call it before anything else happens on each requrest) 
app.use(bodyParser.json());

//listening the incoming request
app.listen(port, ()=>{
    console.log("listening port: " + port + " ...")
});

//respond the requrid ('/': means nothing)
app.get('/', (request,response)=>{res.send("Hello")});

//a post is when a client sends new information to an API
app.post('/login',async (request,response)=>{
    const loginRequset = request.body;
    console.log("requset Body",JSON.stringify(request.body))

    //serch database for username, and retrieve current password
    const hashedPassword = md5(request.body.password);
    const redisPassword = await client.hGet('user', request.body.userName);

    //compare the hashed version password that was sent with the hashed version from the database
    
    /*if (loginRequset.userName == "357@753.com" && loginRequset.password == "Qw123$"){
        response.status(200);//200 means OK
        response.send("Welcome");
    }else{
        response.status(401);//401 means unauthorized
        response.send("unauthorized");
    }*/
});