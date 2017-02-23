define('socketio', function(){
    var socketObj = {};

    function socketObjFunc() {
      this.message = '{"name":"","massage":"","list":[],"status":""}';

      return socketObj;
    };

    socketObj.setMassage = function(msg) {
      this.massage = msg;
    };

    socketObj.emit = function(a, b) {
      console.log('emit:', a, b);
    };

    socketObj.on = function(a, callback) {
      callback(this.massage);
    };

    return socketObjFunc;

  });
