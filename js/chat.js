define('chat', [
  'jquery',
  'socketio',
], function(jQ, io) {

  function chatObj() {

    this.name = '';
    this.socket = io();
    //this.socket.io.connect('http://localhost');
  }

  chatObj.prototype.start = function() {
    var self = this;

    jQ('#messages').append(jQ('<li>').text("What is your name?"));


    jQ('form').submit(function() {
      if (self.name == '') {
        self.name = jQ('#m').val();
        (jQ('<li>').text('Ок. Your name in chat ' + self.name)).prependTo(jQ('#messages'));
        self.socket.emit('chat message', self.name + ' joined the chat ');
        jQ('#m').val('');
      } else {
        self.socket.emit('chat message', self.name + '> ' + jQ('#m').val());
        jQ('#m').val('');
      }
      return false;
    });

    this.socket.on('chat message', function(msg) {
      if (this.name != '') {
        (jQ('<li>').text(msg)).prependTo(jQ('#messages'));
      };
    });

  }

  return chatObj;

});
