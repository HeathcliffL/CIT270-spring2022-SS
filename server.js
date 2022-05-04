//import express library
const express = require('express');

//body paerser is called middleware
const bodyparser = require('body-parser');
const { request } = require('express');
const { response } = require('express');

//set the port to
const port = 3000;

//use the library
const app = express();

//use the middleware (call it before anything else happens on each requrest) 
app.use(bodyparser.json());

//listen
app.listen(port, ()=>{console.log("listening port: " + port + " ...")});

//respond the requrid ('/': means nothing)
app.get('/', (req,res)=>{res.send("Hello")});

//a post is when a client sends new information to an API
app.post('/login',(req,res)=>{
    const loginRequset = request.body;
    console.log("requset Body",request.body)
    if (loginRequset.userName == "357@753.com" && loginRequset.password == "Qw123$"){
        response.status(200);//200 means OK
        response.send("Welcome");
    }else{
        response.status(401);//401 means unauthorized
        response.send("unauthorized");
    }
})