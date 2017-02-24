define('cube', ['socketio'],
  function(io) {

    function cubeObj(size) {

      this.canvas = document.getElementById('space');

      this.numberOfCellsInWidth = Math.floor((this.canvas.width / size));
      this.numberOfCellsInHeight = Math.floor((this.canvas.height / size));

      this.x = Math.round(Math.random() * (this.numberOfCellsInWidth - 1));
      this.y = Math.round(Math.random() * (this.numberOfCellsInHeight - 1));

      this.r = Math.floor(255 - Math.random() * 200);
      this.g = Math.floor(255 - Math.random() * 200);
      this.b = Math.floor(255 - Math.random() * 200);

      this.color = "rgb(" + this.r + "," + this.g + "," + this.b + ")";

      if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x * size, this.y * size, size, size);
      }
      this.socket = io();
      this.size = size;
    }


    cubeObj.prototype.start = function() {
      var self = this;
      document.addEventListener('keydown', function(event) {
        var keyCode = event.keyCode;
        if (self.canvas.getContext) {
          if (keyCode == 37 && self.x > 0) {
            self.x -= 1;
          }
          if (keyCode == 38 && self.y > 0) {
            self.y -= 1;
          }
          if (keyCode == 39 && self.x < self.numberOfCellsInWidth - 1) {
            self.x += 1;
          }
          if (keyCode == 40 && self.y < self.numberOfCellsInHeight - 1) {
            self.y += 1;
          }

          self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
          self.ctx.fillRect(
            self.x * self.size,
            self.y * self.size,
            self.size,
            self.size
          );
        };
      });
    }

    return cubeObj;

  });
