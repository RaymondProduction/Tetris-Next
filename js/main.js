require(['chat','cube'], function(chatModule,cubeModule) {

  document.addEventListener("DOMContentLoaded", start());

  function start(){
    // активация чата
    chat = new chatModule();
    chat.start();
    // создаем куб
    cube = new cubeModule();
  };

});
