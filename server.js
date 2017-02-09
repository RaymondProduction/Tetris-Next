var app = require('koa')();
var port = parametr('--port');
if (port) {server = app.listen(Number(port));}
else      {app.listen(8080);}
//server = require( 'http' ).Server( app.callback() )
io = require( 'socket.io' ).listen( server )
var fs = require('fs');
var path = require('path');

var buf;
var str;
var rootDir= parametr('--directory');
var staticContent = {'.html' : 'text/html; charset=utf-8',
                     '.css'  : 'text/css; charset=utf-8',
                     '.js'   : 'text/plain',
                     '.jpg'  : 'image/jpg',
                     '.png'  : 'image/png'
                    };

console.log('Start Web Server');

app.use(function *(next){
  yield next;
  var url = this.url;
  console.log('GET => ',url,'\tContent type: ',staticContent[path.extname(url)]);
  if (url=='/') {url='/index.html';}
  this.type = staticContent[path.extname(url)];
  buf = fs.readFileSync(rootDir+url);
 // str = buf.toString();
  str = buf;
  this.body = str;
});



io.on( 'join', function *() {
  console.log( 'join event fired', this.data )
})

// оброботка события подключения, или отключения от сокета
io.on('connection', function(socket){
  console.log('a user connected');
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



function parametr(par){
  var res;
  process.argv.forEach(function(item, i, arr) {
     if (par==item) {
           res =  process.argv[i+1];
     }
  });
  return res;
}
