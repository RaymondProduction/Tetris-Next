define('session', ['socketio'],
  function(io) {

    // Module for organization session client <--> server
    function sessionObj(classes) {
      this.listIsNotReceived = true;
      this.classes = classes;
      this.id = Math.floor(Math.random() * 7000000000);
      this.socket = io();
      this.socket.emit('connected', JSON.stringify({
        id: this.id,
        classes: this.classes,
      }));
      // если пришел запрос на проверку онлайн ли клиент
      this.socket.on('are you online', function(id) {
        // узнаем речь ли идет про этого клиента
        if (self.id == id) {
          // ответить серверу что да, онлайн!
          self.socket.emit('i am online', id);
        }
      });
    };

    sessionObj.prototype.authorize = function(name, call) {
      var self = this;
      this.name = name;
      this.socket.emit('joined', JSON.stringify({
        id: this.id,
        name: this.name,
      }));
      this.socket.on('list clients', function(msg) {
        if (self.listIsNotReceived) {
          call(msg);
          self.listIsNotReceived = false;
        }
      });
    };
    sessionObj.prototype.someoneJoined = function(call) {
      var self = this;
      this.socket.on('someone joined', function(msg) {
        var date = JSON.parse(msg);
        if (date.id != self.id) {
          call(msg);
        };
      });
    }

    sessionObj.prototype.iLeave = function() {
      this.socket.emit('the client leaves', this.id);
    }

    sessionObj.prototype.someoneLeave = function(call) {
      var self = this;
      this.socket.on('the client leaves', function(id) {
        call(id);
      });
    }

    sessionObj.prototype.someoneLeaveBecauseTime = function(call) {
      var self = this;
      this.socket.on('the client leaves because time', function(id) {
        call(id);
      });
    }

    sessionObj.prototype.arrivedData = function(cl, call) {
      var self = this;
      this.socket.on('data', function(msg) {
        data=JSON.parse(msg);
        if (data.cl==cl && data.id != self.id) {
          call(data.obj);
        };
      });
    }

    sessionObj.prototype.sendData = function(cl,obj) {
      data = {
        id: this.id,
        obj : obj,
      }
      this.socket.emit('send for '+cl,JSON.stringify(data));
    }
    return sessionObj;
  });
