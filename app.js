const express=require('express');
const app=express();

const propertiesReader=require('properties-reader');
const configProperties=propertiesReader('config.properties');
const hostname=configProperties.get('hostname');
const port=configProperties.get('port');

app.get('/',function(req,res){
    res.statusCode=200;
    res.contentType('text/plain');
    res.end('Request came at Express Server');
});

app.listen(port,hostname,()=>{
    console.log(`Server running sucessfully at ${hostname}:${port}`);
});