define('cube', [],
  function() {

    function cubeObj() {
      this.canvas = document.getElementById('space');

      var numberOfCellsInWidth = Math.floor((this.canvas.width / 20));
      var numberOfCellsInHeight = Math.floor((this.canvas.height / 20));

      this.x = Math.round(Math.random() * (numberOfCellsInWidth - 1)) * 20;
      this.y = Math.round(Math.random() * (numberOfCellsInHeight - 1)) * 20;


      if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'orange';
        this.ctx.fillRect(this.x, this.y, 20, 20);
      }
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
          if (keyCode == 39 && self.x < self.canvas.width - 20) {
            self.x += 1;
          }
          if (keyCode == 40 && self.y < self.canvas.height - 20) {
            self.y += 1;
          }

          self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
          self.ctx.fillRect(self.x, self.y, 20, 20);
        };
      });
    }

    return cubeObj;

  });
