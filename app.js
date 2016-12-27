var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(client){
  console.log('Client connected');
  client.on('join', function(name){
    client.nickname = name;
    client.broadcast.emit('join', name);
  });
  client.on('messages', function(data){
    var nickname = client.nickname;
    client.broadcast.emit('messages', {name:nickname, message: data});
    client.emit('messages', {name:nickname, message: data});
  });
});

app.get('/public', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
