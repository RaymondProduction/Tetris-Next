  function funcTest() {
    return 5;
  }

  var globModule1 = null;


describe('Test 2', function(){
     debugger;
    it('Add test', function(done) {
      debugger;

      require(["module1"], function(module1) {
        debugger;

        globModule1 = module1

        expect(globModule1.add(5, 6)).toEqual(11);

        done();
      });
    });

    it('funcTest 2', function() {
      debugger;

      expect(globModule1.add(7, 1)).toEqual(8);
    }); 
});
