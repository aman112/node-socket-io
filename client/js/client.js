var socket=io();
socket.on('message',function(data){
document.write(data);
});
socket.on('serverMessage',function(data){
    document.write(data.serverMsg);
    socket.emit('clientMessage',{
        "clientMsg":"Message Received successfully!!"
    });
});