define('chat', [
    'socketio'
  ],
  function(io) {

    // Module for organization chat
    function chatObj() {
      // объект с данными
     this.data = {
        name : '',
        massage : '',
        list : [],
        status : ''
      }
// JSON.stringify(a);

      this.input =  document.getElementById('m');
      // имя собеседника
      this.name = '';
      // подключаем сокет
      this.socket = io();
      // элемент со списком сообщений
      this.messages = document.getElementById('messages');
      // элемент списка, сообщение
      this.message = document.createElement('li');

      // this.socket.io.connect('http://localhost');
    }

    chatObj.prototype.askName = function() {
      // текст сообщения
      var text = document.createTextNode('Robot> What is your  name?');
      // добавить текст в элемент списка
      this.message.appendChild(text);
      // добавить элемент списка в список сообщений
      this.messages.appendChild(this.message);
    }
    chatObj.prototype.addMassage = function(msg) {
      // создаем текст сообщения
      var text = document.createTextNode(msg);
      // создаем сообщение, елемент списка
      message = document.createElement('li');
      // добавляем текст в сообщение
      message.appendChild(text);
      // вставляем сообщение перед предыдущим this.message
      messages.insertBefore(message, this.message);
      // теперь это сообщение будет предыдущим
      this.message = message;
    }
    chatObj.prototype.start = function() {
      var self = this;
      this.askName();
      window.captureEvents(Event.SUBMIT);
      window.onsubmit = function() {
        if (self.name == '') {
          self.name = self.input.value;
          self.addMassage('Robot> Oк. Your name in chat ' + self.name);
          self.data.name = self.name;
          self.data.status = 'joined the chat';
          self.socket.emit('chat message',JSON.stringify(self.data));
          self.input.value = '';
        } else {
          self.data.status = 'massage';
          self.data.name = self.name;
          self.data.massage = self.input.value;
          self.socket.emit('chat message',JSON.stringify(self.data));
          self.input.value = '';
        }
        return false;
      };

      this.socket.on('chat message', function(msg) {
        if (this.name != '') {
          this.data = JSON.parse(msg);
          var st;
          if (this.data.status=='joined the chat') {
            st = 'Robot> '+this.data.name+' joined the chat';
          } else {
            st =this.data.name+'> '+this.data.massage;
          }

          self.addMassage(st);
        };
      });

    };

    return chatObj;

  });
