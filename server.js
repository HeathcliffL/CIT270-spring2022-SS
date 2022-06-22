//import express library
const express = require('express');

// import https
const https = require('https');
const fs = require('fs');// import fs

//set the port to
const port = 6379;//defult port is 443

//body paerser is called middleware
const bodyParser = require('body-parser');
const { request } = require('express');
const { response } = require('express');

//import MD5
const md5 = require('md5');

//require the redis libary
const {createClient} = require('redis');
const { fstat } = require('fs');
//use this to connocting redis database
const client = createClient({ url: 'redis://default:[PASSWORD]@10.128.0.2:6379', });
//client.connect(); //creat a TCP socker with Redis until the user is useing database

//use the library
const app = express();

//use the middleware (call it before anything else happens on each requrest) 
app.use(bodyParser.json());

//call https certaficate then listening the incoming request
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd',
},app).listen(port, async ()=>{
    await client.connect();//creating a TCP socket with redis
    console.log("listening port: " + port + " ...")
});

//respond the requrid ('/': means nothing)
app.get('/', (request,response)=>{response.send("Hello")});

//a post is when a client sends new information to an API
app.post('/login',  async (request,response)=>{

    //serch database for username, and retrieve current password
    const hashedPassword = md5(request.body.password);
    const redisPassword = await client.hGet('user', request.body.userName);
    const loginRequset = request.body;

    //compare the hashed version password that was sent with the hashed version from the database
    
    if (hashedPassword == redisPassword){
        response.status(200);//200 means OK
        response.send("Welcome");
    }else{
        response.status(401);//401 means unauthorized
        response.send("unauthorized");
    }

});

/*Useing this you need change the line 43 
app.post('/login',  async (request,response) to const validatePassword = async (request,response)..
*/
//app.post('/login', validatePassword);  

const signup = async (request, response) => {
    const clearPassword = request.body.password;
    const password = md5(clearPassword);
    await client.hSet('user', request.body.userName, password);
    response.status(200);//200 means OK
    response.send({result:"Saved"});
}

app.post('/signup', signup);