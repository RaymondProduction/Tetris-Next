require(['canvas', 'chat','cube'], function(canvas, chatModule,cubeModule) {

  var x;
  var y;
  var canvas;
  var rectangle;

  document.addEventListener("DOMContentLoaded", start());

  function start(){
    // активация чата
    chat = new chatModule();
    chat.start();
    // создаем куб
    cube = new cubeModule();
  };

});
