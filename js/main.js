require(['jquery', 'canvas', 'chat'], function(jQ, canvas, chatModule) {

  var x;
  var y;
  var canvas;
  var rectangle;

  jQ.noConflict();

  jQ(document).ready(showSquare);

  function showSquare() {
    canvas = document.getElementById('space');
    x = canvas.width / 2 - 10;
    y = canvas.height / 2 - 10;
    if (canvas.getContext) {
      ctx = canvas.getContext('2d');
      rectangle = new Path2D();
      rectangle.rect(x, y, 20, 20);
      ctx.fill(rectangle);
    }

    // активация чата
    chat = new chatModule();
    chat.start();

    jQ(document).keydown(function(event) {

      canvas = document.getElementById('space');
      ctx = canvas.getContext('2d');
      rectangle = new Path2D();

      if (canvas.getContext) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (event.keyCode == 37 && x > 0) x -= 1;
        if (event.keyCode == 38 && y > 0) y -= 1;
        if (event.keyCode == 39 && x < canvas.width - 20) x += 1;
        if (event.keyCode == 40 && y < canvas.height - 20) y += 1;
        rectangle.rect(x, y, 20, 20);
        ctx.fill(rectangle);
      }
    });
  };
});
