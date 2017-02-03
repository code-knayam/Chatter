var express = require('express');
var path = require('path');
var redis = require('redis');
var app = express();
var server = require('http').createServer(app);
var redisClient = redis.createClient();
var io = require('socket.io')(server);



app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(client){

  console.log('Client connected' );

  client.on('join', function(name){
    client.nickname = name ;
    redisClient.sadd("chatterList", name);
    client.broadcast.emit('join', name);

    redisClient.smembers('chatterList', function(err, names){
      names.forEach(function(name){
        client.emit('add_chatters', name);
      });
    });

    //emitiing mesages from REDIS store
    redisClient.lrange("messagesStore", 0, -1, function(err, messages_store){
      messages_store = messages_store.reverse();
      messages_store.forEach(function(message){
        message = JSON.parse(message);
        client.emit('messages', message);
      });
    });
  });

  client.on('messages', function(data){
    var nickname = client.nickname;
    client.broadcast.emit('messages', {name:nickname, message: data});
    client.emit('messages', {name:nickname, message: data});
    storeMessage(nickname, data);
  });

  client.on('disconnect', function(name){
    if(name !== "" && name !== null){
      client.broadcast.emit('remove_chatter', client.nickname);
      redisClient.srem('chatterList', client.nickname);
    }
  });
});

app.get('/public', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var storeMessage = function(name, data){
  var message = JSON.stringify({name:name, message:data});
  redisClient.lpush("messagesStore", message, function(err, message){
    redisClient.ltrim("messagesStore", 0 ,9);
  });
};

server.listen(8080);
