require(['jquery','jcanvas'], function(){

	var x,y,canvas,rectangle,height,width;


	$(window).ready(function () {
   height=$('#space').height();
   width=$('#space').width();
	 x=width/2;
	 y=height/2;
		$('#space').drawRect({
		  fillStyle: '#000',
		  x: x, y: y,
		  width: 20,
		  height: 20
	  });
	});
	$(window).keydown(function( event ){
       $('#space').clearCanvas();
       if (event.keyCode==37 && x>10) x-=1;
       if (event.keyCode==38 && y>10) y-=1;
       if (event.keyCode==39 && x<width-10) x+=1
       if (event.keyCode==40 && y<height-10) y+=1;
      $('#space').drawRect({
			  fillStyle: '#000',
			  x: x, y: y,
			  width: 20,
			  height: 20
		  });
	});
});
