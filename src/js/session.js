define('session', ['socketio'],
  function(io) {

    // Module for organization session client <--> server
    function sessionObj(cl) {
      this.cl = cl;
      this.listIsNotReceived = true;
      this.id = Math.floor(Math.random() * 7000000000);
      this.socket = io();
       var self = this;
      this.socket.emit('connected', JSON.stringify({
        id: self.id,
        cl: self.cl,
      }));

      console.log({
        id: self.id,
        cl: self.cl,
      });

      // если пришел запрос на проверку онлайн ли клиент
      this.socket.on('are you online', function(id) {
        // узнаем речь ли идет про этого клиента
        if (self.id == id) {
          // ответить серверу что да, онлайн!
          self.socket.emit('i am online', id);

        }
      });
    };

    sessionObj.prototype.authorize = function(name) {
      var self = this;
      this.name = name;
      this.socket.emit('joined', JSON.stringify({
        id: this.id,
        name: this.name,
        cl : this.cl,
      }));
    };

    sessionObj.prototype.getList = function(call) {
      this.listIsNotReceived = true;
      var self = this;
      this.socket.emit('get list', this.id);
      this.socket.on('list clients', function(list) {
        if (self.listIsNotReceived) {
          call(JSON.parse(list));
          self.listIsNotReceived = false;
        }
      });
    }


    sessionObj.prototype.someoneJoined = function(call) {
      var self = this;
      this.socket.on('someone joined', function(msg) {
        var data = JSON.parse(msg);
        if (data.id != self.id && data.cl == self.cl) {
          call(data);
        };
      });
    }

    sessionObj.prototype.iLeave = function() {
      this.socket.emit('the client leaves', this.id);
    }

    sessionObj.prototype.someoneLeave = function(call) {
      var self = this;
      this.socket.on('the client delete from list', function(msg) {
        data = JSON.parse(msg);
        if (self.cl == data.cl) {
          call(data.id);
        }
      });
    }

    sessionObj.prototype.someoneLeaveBecauseTime = function(call) {
      var self = this;
      this.socket.on('the client leaves because time', function(msg) {
        data = JSON.parse(msg);
        if (self.cl == data.cl) {
          call(data.id);
        }
      });
    }

    sessionObj.prototype.arrivedData = function(call) {
      var self = this;
      this.socket.on('data', function(msg) {
        data = JSON.parse(msg);
        if (data.cl == self.cl /*&& data.id != self.id*/ ) {
          call(data.id, data.obj);
        };
      });
    }

    sessionObj.prototype.sendData = function(obj) {
      data = {
        cl: this.cl,
        id: this.id,
        obj: obj,
      }
      this.socket.emit('send', JSON.stringify(data));
    }
    return sessionObj;
  });
