define('socketioTest', function(){
    function socketObj() {
      this.massage = 'test';
    };

    socketObj.prototype.setMassage = function(msg) {
      this.massage = msg;
    };

    socketObj.prototype.emit = function(a, b) {
      console.log('emit:', a, b);
    };

    socketObj.prototype.on = function(a, callback) {
      callback(this.massage);
    };

    return socketObj;

  });
