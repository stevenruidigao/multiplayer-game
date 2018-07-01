var express = require('express');
var io = require('socket.io')({
    authorization : function (handshakeData, callback) {
        callback(null, true);
    }
});
var http = require('http');
var UUID = require('node-uuid');
var app = express();
var server = http.Server(app);
var socketio = io.listen(server);
server.listen(process.env.PORT || 3000);
console.log('Server started');
app.get('/', function(req, res){ 
    res.sendFile( __dirname + '/client/index.html');     
    console.log("GET / HTTP/1.1")
}); 
// app.get('/*' , function(req, res, next) {
//     var file = req.params[0];
//     console.log('\t :: Express :: file requested : ' + file);
//     res.sendFile(__dirname + '/' + file);
// });
socketio.sockets.on('connection', function (client) {
    client.userid = UUID();

            //tell the player they connected, giving them their id
    client.emit('onconnected', {id: client.userid});

            //Useful to know when someone connects
    console.log('\t socket.io:: player ' + client.userid + ' connected');
        
            //When this client disconnects
    client.on('disconnect', function () {

                //Useful to know when someone disconnects
    console.log('\t socket.io:: client disconnected ' + client.userid);
    }); //client.on disconnect
     
}); //socketio.sockets.on connection
