// модули для сервера
var app = require('express')();
var http = require('http').Server(app);
// сокет - розетка, модуль для мгновенной
// передачи данных
var io = require('socket.io')(http);

// кидае вебстраничьку в браузер
app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
  //res.send('<h1>Hello world</h1>');
});

// оброботка события подключения, или отключения от сокета
io.on('connection', function(socket){
  console.log('a user connected' +(socket.id).toString().substr(0, 5));
   socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

// вывод входящих сообщений на консоль
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

// отправка методом emit входящих сообщений назад
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


