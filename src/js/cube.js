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

      var dataOfcube = {
        x: self.x,
        y: self.y,
        color: self.color
      }

      this.socket.emit('create cube', JSON.stringify(dataOfcube));
    }


    cubeObj.prototype.start = function() {
      var self = this;
      document.addEventListener('keydown', function(event) {
        var keyCode = event.keyCode;
        if (keyCode == 37 ||
          keyCode == 38 ||
          keyCode == 39 ||
          keyCode == 40
        ) {
          var dataOfcube = {
            k: keyCode,
            x: self.x,
            y: self.y,
            color: self.color
          }

          self.socket.emit('move cube', JSON.stringify(dataOfcube));
        }
        // if (self.canvas.getContext) {
        //   if (keyCode == 37 && self.x > 0) {
        //     self.x -= 1;
        //   }
        //   if (keyCode == 38 && self.y > 0) {
        //     self.y -= 1;
        //   }
        //   if (keyCode == 39 && self.x < self.numberOfCellsInWidth - 1) {
        //     self.x += 1;
        //   }
        //   if (keyCode == 40 && self.y < self.numberOfCellsInHeight - 1) {
        //     self.y += 1;
        //   }

      });

      this.socket.on('server move', function(dataOfcube) {
        c = JSON.parse(dataOfcube);
        if (c.color == self.color) {
          self.x = c.x;
          self.y = c.y;
        };

        self.ctx.fillStyle = 'white';
        self.ctx.fillRect(
          c.ex * self.size,
          c.ey * self.size,
          self.size,
          self.size
        );

        // self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.ctx.fillStyle = c.color;
        self.ctx.fillRect(
          c.x * self.size,
          c.y * self.size,
          self.size,
          self.size
        );

      })


    }

    return cubeObj;

  });
