define(['cube', 'chat', 'socketio'],
  function(cubeModule, chatModule, socketioModule) {

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

      /*
          it('test for clearRect', function() {
            var cube;
            spyOn(cubeModule.prototype.ctx, 'fillRect');
            var cube = new cubeModule();
            expect(cubeModule.prototype.ctx.fillRect.calls.argsFor(0)).toEqual([cube.x, cube.y, 20, 20]);

          });
      */
    });


    describe('Test for chat module', function() {

      var chat;

      beforeEach(function() {

        chat = new chatModule();

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

    });

  });
