require(['chat', 'cube', 'session'],
  function(chatModule, cubeModule, sessionModule) {

    document.addEventListener("DOMContentLoaded", start());

    function start() {
      // // активация чата
       chat = new chatModule();
       chat.start();
      // создаем куб
      cube = new cubeModule(20);
     cube.start();


      // Experiment for session

 /*     session = new sessionModule(['chat', 'cube']);

      session.authorize('Petro', function(data) {
        console.log(data);
      });

      session.someoneJoined(function(data) {
        console.log(data);
      });

      session.someoneLeaveBecauseTime(function(id) {
        console.log('Leave because time =>', id);
      })

      session.sendData('cube', this.id);

      session.arrivedData('cube', function(data) {
        console.log('Data =>', data);
      });

      session.sendData('chat', '=)');

      session.arrivedData('chat', function(data) {
        console.log('Data =>', data);
      });

      // setTimeout(function() {
      //   session.iLeave();
      // }, 2000);

      session.someoneLeave(function(id) {
        console.log('I leave  =>', id);
      })*/
    };

  });
