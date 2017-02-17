define('chat', [
    'socketio'
  ],
  function(io) {

    // Module for organization chat
    function chatObj() {
      // объект с данными, для пересилки
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

      // сообщить серверу что кто то подключается
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
      // подготовим блок (div), пользователей
      var users = document.getElementById('users');
      // добавим имя пользователя
      var nameUser = document.createTextNode(u);
      // подготовим елемент списка пользователей
      user = document.createElement('li');
      // добавим имя пользователя в элемент списка
      user.appendChild(nameUser);
      // вставляем элемент списка перед предыдущим
      users.insertBefore(user, this.user);
      // теперь этот элемент списка будет предыдущим
      this.user = user;
    }


    // старт чата
    chatObj.prototype.start = function() {
      // делаем ссылку сам на себя, так как часто
      // придется обращатся из функций обратного вызова
      var self = this;
      // задать вопрос новому пользователю
      this.askName();
      // подготовим слушателя на форму нажатия кнопки
      window.captureEvents(Event.SUBMIT);
      // если нажали кнопку сработает событие
      window.onsubmit = function() {
        // если имени не было  то ...
        if (self.name == '') {
          // узнаем имя, и запишем в поле name
          self.name = self.input.value;
          // обрадуем пользователя что он подключен
          self.addMassage('Robot> Oк. Your name in chat ' + self.name);
          // добави к данным сообщения, имя данного пользователя
          self.data.name = self.name;
          // скажем серверу что он подключился и отправим его имя
          self.socket.emit('joined the chat', JSON.stringify(self.data));
          // уберем теперь имя пользователя
          // с тектового поля для ввода текста
          self.input.value = '';
        } else {
          // если имя есть значит, запишем его к сообщению
          self.data.name = self.name;
          // сообщение сохраним в данные для отправки
          self.data.massage = self.input.value;
          // превращаем в строку JSON и оправляем
          self.socket.emit('chat message', JSON.stringify(self.data));
          // уберем теперь сообщение
          // с тектового поля для ввода текста
          self.input.value = '';
        }
        return false;
      };

      // если только что подключился ...
      this.socket.on('someone connected', function(msg) {
        self.data = JSON.parse(msg);
        //.. и у текущего юзера нет имени то ..
        if (self.name == '') {
          // покажем ему список всех клиентов
          self.data.list.forEach(function(user) {
            // добавть клиента в список
            self.addUserList(user);
          });
        }
      });

      // если пользователь подключился
      this.socket.on('joined the chat', function(msg) {
        // переведем строку JSON в объект данных
        self.data = JSON.parse(msg);
        // подготовим строку для того чтоб
        // всему "миру" сказать что есть этот пользователь
        st = 'Robot> ' + self.data.name + ' joined the chat';
        // добавим сконца списка
        self.addUserList(self.data.list[self.data.list.length - 1]);
        // добавим подготовленую строку как сообщение
        self.addMassage(st);
      });

      // оброботка пришедших сообщений
      this.socket.on('chat message', function(msg) {
        //если имя известно то ...
        if (self.name != '') {
          // переведем строку JSON в объект данных
          self.data = JSON.parse(msg);
          // подготовим строку
          st = self.data.name + '> ' + self.data.massage;
          // добавим сообщение
          self.addMassage(st);
        }
      });

      this.socket.on('are you online', function(n) {
        var online = {
          name: n,
          online: false
        }
        if (n == self.name) {
          online.online = true;
        };

       console.log('n',n,'on',online)

        self.socket.emit('you are online',  JSON.stringify(online));
      });

    };

    return chatObj;

  });
