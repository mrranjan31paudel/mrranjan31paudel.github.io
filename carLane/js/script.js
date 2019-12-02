;(function(){
  function Car(parentElement){
    this.posX = 0;
    this.posY = 0;
    this.height = 135;
    this.width = 65;
    this.speedXdir = 0;
    this.speedYdir = 0;
    this.color = null;
    this.parentElement = parentElement;
    var that = this;

    this.init = function() {
      var car = document.createElement('div');
      car.style.height = this.height + 'px';
      car.style.width = this.width + 'px';
      car.classList.add('car');
      this.parentElement.appendChild(car);
      this.element = car;
      // this.draw();

      return this;
    }

    this.setPosition = function(xIndex, ypos){
      var positionTable = [75, 182, 289];
      this.posX = positionTable[xIndex];
      this.posY = -ypos;
    }

    this.setSpeed = function(v){
      this.speedYdir = v;
    }

    this.setColor = function(colorIndex){
      var colorTable = ['green', 'blue', 'red', 'cyan', 'magenta', 'yellow'];
      this.color = colorTable[colorIndex];
    }

    this.move = function(){
      // this.posX += this.speedXdir;
      this.posY += this.speedYdir;
      this.element.style.top = this.posY+'px';
      // this.draw();
    }

    this.draw = function(){
      this.element.style.position = 'absolute';
      this.element.style.zIndex = 10;
      var carImg = document.createElement('img');
      carImg.src = 'images/carSkeletonEnemy.png';
      this.element.appendChild(carImg);
      this.element.style.left = this.posX+'px';
      this.element.style.top = this.posY+'px';
      this.element.style.borderRadius = '20px';
      this.element.style.backgroundColor = this.color;
    }

    this.collisionDetection = function(){
      

    }
  }
  function randomNumGen(min, max){
    return parseInt(Math.random() * (max - min) + min);
  }

  function Game(parentElement, roadLane){
    var cars = [];
    var thatGame = this;
    var roadLanes = [];
    var roadLaneSpeed = 1;
    var roadLaneYpos = 0;
    // var GameLoopHandle = null;
    
    this.parentElement = parentElement;

    this.startGame = function() {
      
      setInterval(function(){
        var carOpp = new Car(parentElement).init();
        carOpp.setPosition(
          randomNumGen(0, 3),
          randomNumGen(400, 50)
        );
        
        if(cars.length<10){
          for(var i=0; i<cars.length; i++){
            if(carOpp.posX==cars[i].posX){
              if(Math.abs(carOpp.posY-cars[i].posY)<=2*carOpp.height){
                carOpp.setPosition(
                  randomNumGen(0, 3),
                  randomNumGen(50, 1000)
                );
                i=0;
              }
            }
            
          }
        
        carOpp.setColor(
          randomNumGen(0, 6)
        );
        carOpp.setSpeed(1);
        carOpp.draw();
        cars.push(carOpp);
        }
        thatGame.moveCars();
      },10);
    }
    this.moveCars = function(){
      
      for(var i=0; i<cars.length; i++){
        cars[i].move();
      }
      roadLaneYpos++;
      for(var j=0; j<3; j++){
        console.log(roadLane[i]);
        // roadLane[i] = roadLaneYpos+'px';
      }
      
    }

    // var gameLoop = setInterval();
  }

  var parentRoad = document.getElementById('lane-container');

  var roadLane = document.getElementsByClassName('road-dec');
  
  new Game(parentRoad, roadLane).startGame();

})();