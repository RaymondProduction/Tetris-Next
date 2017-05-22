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

      console.log('Cookie: ',document.cookie);

      console.log(getUrlVars()['t']);
      var request = new XMLHttpRequest();
      request.open("GET", "https://api.github.com/user", true);
      request.setRequestHeader('authorization', 'token ' + getUrlVars()['t']);
      request.setRequestHeader('accept', 'application/json');
      request.onload = function() {
        //alert(request.responseText);
        //console.log(request.responseText);
        var res = JSON.parse(request.responseText);
        console.log('Login:',res.login);
        console.log('name: ', res.name);
        console.log('id:', res.id);
      }
      request.send(null);

      // активация чат
      chat = new ChatModule();
      chat.start();
      // создаем куб
      cube = new CubeModule(20);
      cube.start();
    };

  });
