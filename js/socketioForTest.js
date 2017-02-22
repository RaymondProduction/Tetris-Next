define('soketioTest', function(){
    function soketio() {
      this.massage = 'test';
    };

    soketio.prototype.setMassage = function(msg) {
      this.massage = msg;
    };

    soketio.prototype.emit = function(a, b) {
      console.log('emit:', a, b);
    };

    soketio.prototype.on = function(a, callback) {
      callback(this.massage);
    };

    return soketio;

  });
