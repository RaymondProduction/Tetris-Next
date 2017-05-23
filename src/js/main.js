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

      // Запрос на дополнительную информацию, о пользователе
      var request = new XMLHttpRequest();
      request.open("POST", "https://tetris-next.net/addinf", true);
      request.setRequestHeader('accept', 'application/json');
      request.onload = function() {
        // результат запроса на дополнительную информацию
        var res = JSON.parse(request.responseText);
        // вызов метода для передачи дополнительной
        // информации о пользователе в чат
        chat.setUserData(res);
        // отобразим в заголовке на странице имя юзера
        document.getElementById('name').innerHTML = res.name;
      }
      request.send(null);
    };

  });
