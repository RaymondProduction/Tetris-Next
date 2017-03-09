define('cube', ['session'],
  function(SessionModule) {

    function cubeObj(size) {
      this.session = new SessionModule('cube');
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

      this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';

      if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext('2d');
        this.draw();
      }

      // авторизация нового куба, в качестве имени цвет куба
      this.session.authorize(this.color);

      // отправить координаты нового куба чтобы, поставили другие
      // клиенты себе на карте
      this.session.sendData({
        why: 'put',
        color: this.color,
        x: this.x,
        y: this.y,
      });
      // запрос на список кубов которые в "онлайн"
      this.session.sendData({
        why: 'list',
        color: this.color,
      });
    };

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
    };

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
              why: 'move',
              k: keyCode,
              x: self.x,
              y: self.y,
              color: self.color,
            };
            self.session.sendData(dataOfcube);
          }
        }
      });

      this.session.arrivedData(function(id, dataOfcube) {
        // при передвижении  куба, поменять координаты
        if (dataOfcube.why == 'move') {
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
        }

        // поставить куб
        if (dataOfcube.why == 'put') {
          self.otherDarw(dataOfcube);
        }

        // нарисовать все кубы на карте по запросу "список"
        if (dataOfcube.why == 'list' && self.id != id) {
          self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
          dataOfcube.list.forEach(function(c) {
            self.otherDarw(c);
          });
        }

        // если куб ушел по фактору времени
        // или закрыли окно то уберем его
        if (dataOfcube.why == 'leave') {
          self.ctx.fillStyle = 'white';
          self.ctx.fillRect(
            dataOfcube.x * self.size,
            dataOfcube.y * self.size,
            self.size,
            self.size
          );
        }

      });

    };

    return cubeObj;

  });
