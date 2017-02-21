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

      // chatEl = document.createElement('div').className='chat';
      // buttonCloseEl = document.createElement('button').
      // buttonCloseEl.setAttribute('name', 'close');
      // sendEl = document.createElement('div').className='send';
      // formEl = document.createElement('form');



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
      this.socket.emit('connected', '');
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

    // удалить юзера с списка юзеров
    chatObj.prototype.deleteUserList = function(u) {
      // найдем по id элемент списка
      var user = document.getElementById(u);
      // получим список юзеров
      var users = document.getElementById('users');
      // удалим элемент списка из списка юзеров
      users.removeChild(user);
    }

    chatObj.prototype.addUserList = function(u) {
      // подготовим список (ul), пользователей
      var users = document.getElementById('users');
      // добавим имя пользователя
      var nameUser = document.createTextNode(u);
      // подготовим елемент списка пользователей
      user = document.createElement('li');
      user.id = u;
      // добавим имя пользователя в элемент списка
      user.appendChild(nameUser);

      // узнамем первый элемент списка,
      // будем вместо него со здвигом вниз ставить
      // записи о новых клиентах
      var firstLi = users.getElementsByTagName('li')[0]
        // если такого элемента не существует (не определен)
      if (firstLi == undefined) {
        // то тогда вставим новый иначе ...
        users.appendChild(user);
      } else {
        // вставляем элемент списка перед предыдущим
        users.insertBefore(user, firstLi);
      };
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

      var closeButton = document.getElementsByName("close")[0];
      closeButton.addEventListener("click", function(event) {
        // закрыть чат
        chatDIV = document.getElementsByClassName('chat')[0];
        chatDIV.className = 'hidden';

        // отправим серверу что клиент покинул чат
        self.socket.emit('the user leaves', name);

        openButton = document.getElementsByName("open")[0];
        openButton.className = 'open';
        openButton.name = 'open';
        openButton.addEventListener("click", function(event) {
          chatDIV.className = 'chat';
          openButton.className = 'hidden';
        });
      });



      // если только что подключился ...
      this.socket.on('someone connected', function(msg) {
        console.log(msg);
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

      // если пришел запрос на проверку онлайн ли клиент
      this.socket.on('are you online', function(name) {
        // узнаем речь ли идет про этого клиента
        if (self.name == name) {
          // ответить серверу что да, онлайн!
          self.socket.emit('i am online', name);
        }
      });

      // сервер сказал что пора удалить со списка
      this.socket.on('the user leaves', function(name) {
        // данный юзер удаляется со списка
        self.deleteUserList(name);
      });

    };

    return chatObj;

  });
