define('cube', ['session'],
  function(sessionModule) {

    function cubeObj(size) {
      this.session = new sessionModule('cube');
      console.log('id', this.session.id);
      this.size = size;
      this.motionless = true;
      this.canvas = document.getElementById('space');

      this.numberOfCellsInWidth = Math.floor((this.canvas.width / size));
      this.numberOfCellsInHeight = Math.floor((this.canvas.height / size));

      this.x = Math.round(Math.random() * (this.numberOfCellsInWidth - 2)) + 1;
      this.y = Math.round(Math.random() * (this.numberOfCellsInHeight - 2)) + 1;

      this.r = Math.floor(255 - Math.random() * 200);
      this.g = Math.floor(255 - Math.random() * 200);
      this.b = Math.floor(255 - Math.random() * 200);

      this.color = "rgb(" + this.r + "," + this.g + "," + this.b + ")";

      if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext('2d');
        this.draw();
      }

      var self = this;
      // если при авторизации отправляем объект, то у других
      // клиетов сроботает метод someoneJoinedMoreInformation
      // будет передано больше информации
      this.session.authorize(this.color, {
        color: this.color,
        x: this.x,
        y: this.y,
      });

      this.session.someoneJoinedMoreInformation(function(otherCube) {
        self.otherDarw(otherCube);
      });

      this.session.giveMoreInformation({
          color: this.color,
          x: this.x,
          y: this.y,
        },
        function(otherCube) {
          self.otherDarw(otherCube);
        });

    }



    cubeObj.prototype.draw = function() {
      console.log('i am draw');
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(
        this.x * this.size,
        this.y * this.size,
        this.size,
        this.size
      );
      this.ctx.strokeStyle = 'black';
      this.ctx.strokeRect(
        this.x * this.size + 1,
        this.y * this.size + 1,
        this.size - 2,
        this.size - 2
      );
    };
    cubeObj.prototype.otherDarw = function(c) {
      this.ctx.fillStyle = c.color;
      this.ctx.fillRect(
        c.x * this.size,
        c.y * this.size,
        this.size,
        this.size
      );
      this.ctx.strokeStyle = 'black';
      this.ctx.strokeRect(
        c.x * this.size + 1,
        c.y * this.size + 1,
        this.size - 2,
        this.size - 2
      );
    }
    cubeObj.prototype.start = function() {
      var self = this;


      document.addEventListener('keydown', function(event) {
        if (self.motionless) {

          var keyCode = event.keyCode;
          if (keyCode == 37 ||
            keyCode == 38 ||
            keyCode == 39 ||
            keyCode == 40
          ) {
            self.motionless = false;
            var dataOfcube = {
                k: keyCode,
                x: self.x,
                y: self.y,
                color: self.color
              }
              // self.socket.emit('move cube', JSON.stringify(dataOfcube));
            self.session.sendData(dataOfcube);
          }
        }
      });

      this.session.arrivedData(function(id, dataOfcube) {
        if (dataOfcube.color == self.color) {
          self.x = dataOfcube.x;
          self.y = dataOfcube.y;
          self.motionless = true;
        };

        if (dataOfcube.ex != undefined && dataOfcube.ey != undefined) {
          self.ctx.fillStyle = 'white';
          self.ctx.fillRect(
            dataOfcube.ex * self.size,
            dataOfcube.ey * self.size,
            self.size,
            self.size
          );
        }

        self.otherDarw(dataOfcube);


      })


      // если куб в оффлайн стереть всех и нарисовать заново
      this.session.someoneLeaveBecauseTime(function() {
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
        self.session.giveMoreInformation({
            color: self.color,
            x: self.x,
            y: self.y,
          },
          function(otherCube) {
           // self.ctx.fillStyle = 'white';
            self.otherDarw(otherCube);
          });
      });

    }

    return cubeObj;

  });
