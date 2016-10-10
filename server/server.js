var express = require('express');
var app = require('express')();
app.use(express.static('client'));
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

io.on('connection', function(socket){
  socket.on('move', function (data) {
    socket.broadcast.emit('move', data);
  });
});
