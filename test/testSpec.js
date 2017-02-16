define(['cube'], function(cubeModule) {

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
        expect(cube.x).toBeLessThan(cube.canvas.width - 10);
        expect(cube.x).toBeGreaterThan(-1);
      }

    });

    it('test for keydown', function() {
      spyOn(document, 'addEventListener').and.callFake(function(f,call) {
        var event ={
          keyCode : 37
        }
        call(event);
      });
      cube = new cubeModule();
      expect(document.addEventListener).toHaveBeenCalled();
    });

    it('test for clearRect',function(){
       var cube;
       spyOn(cube.ctx, 'fillRect');
       cube = new cubeModule();
       expect(cube.ctx.fillRect.calls.argsFor(0)).toEqual([cube.x, cube.y, 20, 20]);

    });

  });

});
