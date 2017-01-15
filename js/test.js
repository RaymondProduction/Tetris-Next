function funcTest(){
  return 5;
}

describe('test.js', function() { 
    it('funcTest', function () {
       expect(funcTest()).toEqual(5);
     });
 });
