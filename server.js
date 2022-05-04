//import express library
const express = require('express');

//use the library
const app = express();
const port = 3000;

//listen
app.listen(port, ()=>{console.log("listening port " + port + " ...")});

//respond the requrid
app.get('/', (req,res)=>{res.send("Hello")});