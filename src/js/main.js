require(['chat', 'cube', 'session'],
  function(ChatModule, CubeModule) {
    function getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
      });
      return vars;
    }

    document.addEventListener('DOMContentLoaded', start());

    function start() {

      console.log(getUrlVars()['t']);

      // активация чат
      chat = new ChatModule();
      chat.start();
      // создаем куб
      cube = new CubeModule(20);
      cube.start();
    };

  });
