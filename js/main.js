require(['jquery','jcanvas'], function(){

	var x,y,canvas,rectangle,ctx;


	$(document).ready(function () {
	 canvas = document.getElementById('space');
	 x=canvas.width/2-10;
	 y=canvas.height/2-10;
		$('#space').drawRect({
		  fillStyle: '#000',
		  x: x, y: y,
		  width: 20,
		  height: 20
	  });

	});

	$(document).keydown(function( event ) {
       console.log(event.keyCode);
       $('#space').clearCanvas();
       if (event.keyCode==37 && x>0) x-=1;
       if (event.keyCode==38 && y>0) y-=1;
       if (event.keyCode==39 && x<canvas.width-20) x+=1
       if (event.keyCode==40 && y<canvas.height-20) y+=1;
      $('#space').drawRect({
			  fillStyle: '#000',
			  x: x, y: y,
			  width: 20,
			  height: 20
		  });
	});
});
