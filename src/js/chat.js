define('chat', ['session'],
  function(sessionModule) {

    // Module for organization chat
    function chatObj() {

      this.input = document.getElementById('m');
      this.session = new sessionModule(['chat', 'cube']);

      this.text = null;
      this.massages = null;
      this.message = null;
      this.firstLi = null;
      this.user = null;
      this.users = null;
      this.nameUser = null;
      this.closeButton = null;
      this.openButton = null;
      this.minButton = null;
      this.name = '';

      this.data = {
        name: '',
        massage: '',
        list: [],
        status: ''
      }

      var self = this;

      this.session.getList(function(list) {
        console.log('=========>',list);
        self.data.list = list;
        // покажем ему список всех клиентов
        list.forEach(function(user) {
          // добавть клиента в список
          self.addUserList(user);
        });
      });
    }

    chatObj.prototype.askName = function() {
      // текст сообщения
      this.text = document.createTextNode('Robot> What is your  name?');
      this.messages = document.getElementById('messages');
      // элемент списка, сообщение
      this.message = document.createElement('li');
      // добавить текст в элемент списка
      this.message.appendChild(this.text);
      // добавить элемент списка в список сообщений
      this.messages.appendChild(this.message);
    };

    chatObj.prototype.addMassage = function(msg) {
      // элемент со списком сообщений
      this.messages = document.getElementById('messages');

      // создаем текст сообщения
      this.text = document.createTextNode(msg);
      // создаем сообщение, елемент списка
      this.message = document.createElement('li');
      // добавляем текст в сообщение
      this.message.appendChild(this.text);

      this.firstLi = this.messages.getElementsByTagName('li')[0];
      // если такого элемента не существует (не определен)
      if (this.firstLi == undefined) {
        // то тогда вставим новый иначе ...
        this.messages.appendChild(message);
      } else {
        // вставляем элемент списка перед предыдущим
        this.messages.insertBefore(this.message, this.firstLi);
      };
    };

    // удалить юзера с списка юзеров
    chatObj.prototype.deleteUserList = function(u) {
      // найдем по id элемент списка
      this.user = document.getElementById(u);
      // получим список юзеров
      this.users = document.getElementById('users');
      // удалим элемент списка из списка юзеров
      this.users.removeChild(this.user);
    };

    chatObj.prototype.addUserList = function(u) {
      // подготовим список (ul), пользователей
      this.users = document.getElementById('users');
      // добавим имя пользователя
      this.nameUser = document.createTextNode(u);
      // подготовим елемент списка пользователей
      this.user = document.createElement('li');
      this.user.id = u;
      // добавим имя пользователя в элемент списка
      this.user.appendChild(this.nameUser);

      // узнамем первый элемент списка,
      // будем вместо него со здвигом вниз ставить
      // записи о новых клиентах
      this.firstLi = this.users.getElementsByTagName('li')[0];
      // если такого элемента не существует (не определен)
      if (this.firstLi == undefined) {
        // то тогда вставим новый иначе ...
        this.users.appendChild(this.user);
      } else {
        // вставляем элемент списка перед предыдущим
        this.users.insertBefore(this.user, this.firstLi);
      };
    };


    chatObj.prototype.reStart = function() {
      this.name = '';
      // элемент со списком сообщений
      this.massages = document.getElementById('messages');
      this.massages.innerHTML = '';
      this.askName();
    };

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
          self.session.authorize(self.name);
          // добавть клиента в список
          self.addUserList(self.name);

          // уберем теперь имя пользователя
          // с тектового поля для ввода текста
          self.input.value = '';
        } else {
          // если имя есть значит, запишем его к сообщению
          self.data.name = self.name;
          // сообщение сохраним в данные для отправки
          self.data.massage = self.input.value;
          // превращаем в строку JSON и оправляем
          self.session.sendData('chat', JSON.stringify(self.data));
          // уберем теперь сообщение
          // с тектового поля для ввода текста
          self.input.value = '';
        }
        return false;
      };

      // элемент кнопки для закрытия чата
      this.closeButton = document.getElementsByName('close')[0];
      // элемент кнопки для открытия
      this.openButton = document.getElementsByName('open')[0];
      // элемент кнопки для вернуть
      this.minButton = document.getElementsByName('min')[0];
      // слушатель на кнопку закрыть
      this.closeButton.addEventListener('click', function(event) {
        // закрыть чат
        chatDIV = document.getElementsByClassName('chat')[0];
        // спрятать
        chatDIV.className = 'hidden';
        // отправим серверу что клиент покинул чат
        // главное чтоб он был зарегестрирован
        if (self.name != '') {
          self.session.iLeave();
        }
        // легкий рестарт чата
        self.reStart();

        // покажем кнопку "открыть чат"
        self.openButton.className = 'open';
        self.openButton.innerHTML = 'Open Chat';
      });

      // слушатель на кнопку свернуть
      this.minButton.addEventListener('click', function(event) {
        //  чат
        chatDIV = document.getElementsByClassName('chat')[0];
        // спрятать
        chatDIV.className = 'hidden';
        // покажем кнопку "открыть чат"
        self.openButton.className = 'open';
        self.openButton.innerHTML = 'Show Chat';
      });


      // слушатель на кнопку открыть чат
      this.openButton.addEventListener('click', function(event) {
        // скрыть кнопку
        self.openButton.className = 'hidden';
        // показать чат
        chatDIV.className = 'chat';
      });

      // если пользователь подключился
      this.session.someoneJoined(function(data) {
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
      this.session.arrivedData('chat', function(data) {
        // если имя известно то ...
        if (self.name != '') {
          // переведем строку JSON в объект данных
          self.data = JSON.parse(msg);
          // подготовим строку
          st = self.data.name + '> ' + self.data.massage;
          // добавим сообщение
          self.addMassage(st);
        }
      });


      // сервер сказал что пора удалить со списка
      this.session.someoneLeave(function(id) {
        // данный юзер удаляется со списка
        self.deleteUserList(id);
      });

      // сервер сказал что пора удалить со списка
      this.session.someoneLeaveBecauseTime(function(id) {
        // данный юзер удаляется со списка
        self.deleteUserList(name);
      });
    };

    return chatObj;

  });
