require(['chat', 'cube', 'session'],
  function(ChatModule, CubeModule) {

    document.addEventListener('DOMContentLoaded', start());

    function start() {
      // активация чат
       chat = new ChatModule();
       chat.start();
      // создаем куб
      cube = new CubeModule(20);
      cube.start();
    };

  });
