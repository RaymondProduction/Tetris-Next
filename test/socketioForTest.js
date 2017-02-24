define('socketio', function(){
    var socketObj = {};

    function socketObjFunc() {
      return socketObj;
    };

    socketObj.setMassage = function() {
    };

    socketObj.emit = function() {
    };

    socketObj.on = function(a, callback) {
      callback('{"name":"","massage":"","list":[],"status":""}');
    };

    return socketObjFunc;

  });
