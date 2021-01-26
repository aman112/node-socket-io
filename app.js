var express = require('express');
var http=require('http');
var socketio=require('socket.io');
var path = require('path');

var app=express();
var httpserver = http.Server(app);
var io = socketio(httpserver);

const propertiesReader=require('properties-reader');
const configProperties=propertiesReader('config.properties');
const hostname=configProperties.get('hostname');
const port=configProperties.get('port');

app.use(express.static(path.join(__dirname, 'client')));
/*app.use(express.static(path.join(__dirname, 'client')));*/

app.get('/',function(req,res){
    res.sendFile('client/index.html');
});

var clientsCount=0;
io.on('connection',function(socket){
    console.log('A user connected');
    clientsCount++;

    setTimeout(function(){
        
        //In Built message event is received by the API while sending using send.
        //socket.send("Message delayed to welcome you!!");

        //Custom Events created using socket.emit
        socket.emit('serverMessage',{
           "serverMsg":"Message from server" 
        });

        //Broadcast to ALL connected clients
        /*io.sockets.emit('AllClientsBroadCast',{
            "broadcastMsg":"Total "+clientsCount+" clients are connected"
        });*/

        //Message to new client Only and Broadcast to all other connected clients
        socket.emit('newClientConnect',{
            "newClientMessage":"You are successfully connected to the Express Server"
        });
        socket.broadcast.emit('newClientConnect',{
            "newClientMessage":"Total "+clientsCount+" clients are connected"
        });

    },2000);

    //Client Event Handling
    socket.on('clientMessage',function(data){
        console.log('Message received from Client event: ',data.clientMsg);
    });

    socket.on('disconnect',function(){
        clientsCount--;
        io.sockets.emit('AllClientsBroadCast',{
            "broadcastMsg":"Total "+clientsCount+" clients are connected"
        });
        console.log('A user disconnected');
    });
});

httpserver.listen(port,hostname,()=>{
    console.log(`Server running sucessfully at ${hostname}:${port}`);
});