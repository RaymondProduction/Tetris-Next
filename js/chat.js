define('chat', [
    'socketio'
  ],
  function(io) {

    // Module for organization chat
    function chatObj() {
      // объект с данными
      this.data = {
        name: '',
        massage: '',
        list: [],
        status: ''
      }
      this.input = document.getElementById('m');
      // имя собеседника
      this.name = '';
      // подключаем сокет
      this.socket = io();
      // элемент со списком сообщений
      this.messages = document.getElementById('messages');
      // элемент списка, сообщение
      this.message = document.createElement('li');

      // this.socket.io.connect('http://localhost');

      this.socket.emit('someone connected', '');
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


    chatObj.prototype.addUserList = function(u) {
      var users = document.getElementById('users');

      var nameUser = document.createTextNode(u);

      user = document.createElement('li');

      user.appendChild(nameUser);

      users.insertBefore(user, this.user);

      this.user = user;
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
          self.socket.emit('chat message', JSON.stringify(self.data));
          self.input.value = '';
        } else {
          self.data.status = 'massage';
          self.data.name = self.name;
          self.data.massage = self.input.value;
          self.socket.emit('chat message', JSON.stringify(self.data));
          self.input.value = '';
        }
        return false;
      };

      this.socket.on('someone connected', function(msg) {
        self.data = JSON.parse(msg);
        if (self.name == '') {
          self.data.list.forEach(function(user) {
            console.log(self.data);
            self.addUserList(user);
          });
        }
      });

      this.socket.on('chat message', function(msg) {
        self.data = JSON.parse(msg);
        if (self.name != undefined) {
          var st;
          if (self.data.status == 'joined the chat') {
            st = 'Robot> ' + self.data.name + ' joined the chat';
            self.addUserList(self.data.list[self.data.list.length - 1]);
          } else {
            st = self.data.name + '> ' + self.data.massage;
          }
          self.addMassage(st);
        } else {

        };
      });

    };

    return chatObj;

  });
