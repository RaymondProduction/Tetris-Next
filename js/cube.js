define('cube', ['socketio'],
  function(io) {

    function cubeObj() {
      this.canvas = document.getElementById('space');
      this.x = this.canvas.width / 2 - 10;
      this.y = this.canvas.height / 2 - 10;
      if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'orange';
        this.ctx.fillRect(this.x, this.y, 20, 20);
        //this.ctx.fill(this.rectangle);
      }
      var self = this;
      document.addEventListener('keydown', function(e) {
        var keyCode = e.keyCode;
     //   this.canvas = document.getElementById('space');
     //   this.ctx = this.canvas.getContext('2d');
     //   this.rectangle = new Path2D();
          if (keyCode == 37 && self.x > 0) {
            self.x -= 1;
          }
          if (keyCode == 38 && self.y > 0) {
            self.y -= 1;
          }
          if (keyCode == 39 && self.x < self.canvas.width - 20) {
            self.x += 1;
          }
          if (keyCode == 40 && self.y < self.canvas.height - 20) {
            self.y += 1;
          }

          self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
          self.ctx.fillRect(self.x, self.y, 20, 20);
          console.log(keyCode);
      })
    }

    return cubeObj;

  });
