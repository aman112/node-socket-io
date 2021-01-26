const express=require('express');
var path = require('path');
const propertiesReader=require('properties-reader');
const configProperties=propertiesReader('config.properties');
const hostname=configProperties.get('hostname');
const port=configProperties.get('port');

const app=express();

app.use(express.static(path.join(__dirname, 'client')));

app.get('/',function(req,res){
    res.statusCode=200;
    res.contentType('text/html');
    res.sendFile('index.html');
});

app.listen(port,hostname,()=>{
    console.log(`Server running sucessfully at ${hostname}:${port}`);
});