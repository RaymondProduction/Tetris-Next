define(['cube', 'chat', 'socketio'],
  function(cubeModule, chatModule, socketioModule) {
/*
    describe('Test for cube module', function() {
      beforeEach(function() {
        spyOn(document, 'getElementById').and.callFake(function(id) {
          return {
            width: 100,
            height: 150
          }
        });
      });

      it('test for random position', function() {
        for (var i = 0; i < 100; i++) {
          cube = new cubeModule();
          console.log(cube.x, cube.y);
          expect(cube.x).toBeLessThan(cube.canvas.width - 10);
          expect(cube.x).toBeGreaterThan(-1);
        }

      });

      it('test for keydown', function() {
        spyOn(document, 'addEventListener').and.callFake(function(f, call) {
          var event = {
            keyCode: 37
          }
          call(event);
        });
        cube = new cubeModule();
        expect(document.addEventListener).toHaveBeenCalled();
      });
    });

*/
    describe('Test for chat module', function() {

      var chat;

      beforeEach(function() {

        chat = new chatModule();

        // делаем фейковые функции для DOM
        spyOn(document, 'getElementById').and.callFake(function(id) {
          return {
            appendChild: function(a) {
              console.log(a);
            },
            getElementsByTagName: function() {
              return [{}];
            },
            removeChild: function() {
              return {};
            },
            insertBefore: function() {
              return {};
            }
          }
        });

        spyOn(document, 'getElementsByName').and.callFake(function(id) {
          var obj = {
            appendChild: function(a) {
              console.log(a);
            },
            addEventListener: function(a, callback) {

            }
          }
          return [obj];
        });

        spyOn(document, 'getElementsByClassName').and.callFake(function(id) {
          var obj = {
            appendChild: function(a) {
              console.log(a);
            },
            addEventListener: function(a, callback) {

            }
          }
          return [obj];
        });

        spyOn(document, 'createElement').and.callFake(function(id) {
          var obj = {
            appendChild: function() {},
            addEventListener: function(a, callback) {},
            getElementsByTagName: function() {
              return [{}];
            }
          }
          return obj;
        });
      });


      it('test init chat', function() {
        var socketio = socketioModule();
        spyOn(socketio, 'emit');
        var chat = new chatModule();
        chat.start();
        expect(socketio.emit).toHaveBeenCalled();
      });

      it('test askName', function() {

        spyOn(document, 'createTextNode');
        chat.askName();
        expect(document.createTextNode).toHaveBeenCalledWith(
          'Robot> What is your  name?'
        );
        expect(document.getElementById).toHaveBeenCalledWith(
          'messages'
        );
        expect(document.createElement).toHaveBeenCalledWith('li');
      });

      it('test addMassage', function() {
        spyOn(document, 'createTextNode');
        chat.addMassage();
        expect(document.getElementById).toHaveBeenCalledWith(
          'messages'
        );
        expect(document.createTextNode).toHaveBeenCalled();
      });

      it('test deleteUserList', function() {
        chat.deleteUserList('test');
        expect(document.getElementById.calls.argsFor(0)).toEqual(
          ['test']
        );
        expect(document.getElementById.calls.argsFor(1)).toEqual(
          ['users']
        );

      });

      it('test addUserList', function() {
        chat.addUserList('test');
        expect(document.getElementById).toHaveBeenCalledWith(
          'users'
        );
        expect(document.createTextNode);
        expect(document.createElement).toHaveBeenCalledWith('li');
      });

      it('test reStart', function() {
        chat.reStart();
        expect(document.getElementById).toHaveBeenCalled();
      });

      it('test start', function() {
        var socketio = socketioModule();
        spyOn(socketio,'on');
        spyOn(socketio,'emit');
        chat.start();
        expect(document.getElementsByName.calls.argsFor(0)).toEqual(
          ['close']
        );
        expect(document.getElementsByName.calls.argsFor(1)).toEqual(
          ['open']
        );
        expect(document.getElementsByName.calls.argsFor(2)).toEqual(
          ['min']
        );
        // 5 раз был вызов метода on модуля socket
        expect(socketio.on.calls.count()).toBe(5);
        //вызов происходит изнутри socket.on
        //expect(socketio.emit.calls.count()).toBe(5);
        // вызов происохдит внутри addEventListener, не работает
        //expect(document.getElementsByClassName).toHaveBeenCalled();
      });
    });

  });
