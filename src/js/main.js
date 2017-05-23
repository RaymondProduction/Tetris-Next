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

      var request = new XMLHttpRequest();
      request.open("POST", "https://tetris-next.net/test", true);
      request.setRequestHeader('accept', 'application/json');
      request.onload = function() {
        var res = JSON.parse(request.responseText);
        console.log('Login:', res.login);
        console.log('name: ', res.name);
        console.log('id:', res.id);
        chat.setUserData(res);
      }
      request.send(null);
    };

  });
