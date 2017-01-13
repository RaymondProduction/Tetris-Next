require(['jquery','jcanvas'], function(){

  var x,y,canvas,rectangle,height,width;

  showSquare();
  //window.onload = showSquare();
  //$(window).load(showSquare());
  //$(document).ready(showSquare());

  function showSquare(){
    canvas = $('#space');
    height=canvas.height();
    width=canvas.width();
    x=width/2;
    y=height/2;
    canvas.drawRect({
        fillStyle: '#000',
        x: x, y: y,
        width: 20,
        height: 20
      });
  };

	$(document).keydown(function( event ){
       canvas.clearCanvas();
       if (event.keyCode==37 && x>10) x-=1;
       if (event.keyCode==38 && y>10) y-=1;
       if (event.keyCode==39 && x<width-10) x+=1
       if (event.keyCode==40 && y<height-10) y+=1;
      canvas.drawRect({
			  fillStyle: '#000',
			  x: x, y: y,
			  width: 20,
			  height: 20
		  });
	});
});
