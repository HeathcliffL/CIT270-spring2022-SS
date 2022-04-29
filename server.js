//import express library
const express = require('express');

//use the library
const app = express();

//listen
app.listen(3000, ()=>{console.log("listening...")});

//respond the requrid
app.get('/', (req,res)=>{res.send("Hello")});