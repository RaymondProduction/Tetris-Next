requirejs.config({
  baseUrl: './js/',     // select root directory for external JS files
  deps: ['main'],      // Main script when use external files

  // Parametr for short id
  paths: {
    'canvas': '../bower_components/canvas-5-polyfill/canvas',
   'socketio': '../socket.io/socket.io'
   // фейк для тестирования
   //'socketio': '/test/socketioForTest'
  }
});
