define('socketio', function(){
    var socketObj = {};
    socketObj.event = {};

    function socketObjFunc() {
      return socketObj;
    };

    socketObj.setMassage = function() {
    };

    socketObj.emit = function() {
    };

    socketObj.on = function(eventName, callback) {
      // строка для триггера
      socketObj.event[eventName]=callback;
      //callback('{"name":"","massage":"","list":[],"status":""}');
    };
    socketObj.trigger = function(eventName,param){
      // триггер
      socketObj.event[eventName](param);
    }

    return socketObjFunc;

  });
