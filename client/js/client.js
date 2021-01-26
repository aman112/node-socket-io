var socket=io();
socket.on('message',function(data){
    var id=document.getElementById('serverMsgs');
    id.innerHTML=id.innerHTML+"<br/>"+data;
});
socket.on('serverMessage',function(data){
    var id=document.getElementById('serverMsgs');
    id.innerHTML=id.innerHTML+"<br/>"+data.serverMsg;

    socket.emit('clientMessage',{
        "clientMsg":"Message Received successfully!!"
    });
});
socket.on('AllClientsBroadCast',function(data){
    var id=document.getElementById('serverMsgs');
    id.innerHTML=id.innerHTML+"<br/>"+data.broadcastMsg;
});
socket.on('newClientConnect',function(data){
    var id=document.getElementById('serverMsgs');
    id.innerHTML=id.innerHTML+"<br/>"+data.newClientMessage;
});