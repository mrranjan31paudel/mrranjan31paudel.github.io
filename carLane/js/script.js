;(function(){
  function PlayerCar(parentElement){
    this.posX = 182;
    this.posY = 655;
    this.height = 100;
    this.width = 65;
    this.parentElement = parentElement;
    this.gun = null;
    this.gunSpeed = 6;
    this.bulletPosY = [];
    this.bulletPosX = [];
    this.bulletArr = [];
    var that = this;
    this.init = function() {
      var car = document.createElement('div');
      car.style.height = this.height + 'px';
      car.style.width = this.width + 'px';     
      car.classList.add('playercar');
      this.parentElement.appendChild(car);
      this.element = car;
      document.addEventListener('keydown', this.shiftPosition.bind(this));
      document.addEventListener('keyup', this.fireGun.bind(this));
      this.draw();

      return this;
    }
    this.draw = function(){
      this.element.style.position = 'absolute';
      this.element.style.zIndex = 10;
      this.carImg = document.createElement('img');
      this.carImg.src = 'images/car1.png';
      this.element.appendChild(this.carImg);
      this.element.style.left = this.posX+'px';
      this.element.style.top = this.posY+'px';
      this.element.style.borderRadius = '20px';
    }
    this.fireGun = function(event){
      var pressedKey = event.key;
      
      if(pressedKey=='ArrowUp' || pressedKey=='w'){
        this.gun = document.createElement('img');
        this.gun.setAttribute('class', 'bulletImgs');
        this.gun.style.position = 'absolute';
        this.gun.style.zIndex = 10;
        this.bulletPosX.push(this.posX+25);
        this.gun.style.left = this.posX+25+'px';
        this.gun.src = 'images/bullet.png';
        this.parentElement.appendChild(this.gun);
        this.bulletPosY.push(627);
        this.bulletArr.push(this.gun);
      }
    }
    this.shiftPosition = function(event){
      var pressedKey = event.key;
      if((pressedKey=='d' || pressedKey=='ArrowRight') && this.posX!=289 ){
        this.posX += 107;
        this.element.style.left = this.posX+'px';
      }
      if((pressedKey=='a' || pressedKey=='ArrowLeft') && this.posX!=75){
        this.posX -= 107;
        this.element.style.left = this.posX+'px';
      }
    }
    this.collisionDetection = function(cars, gameLoop){
      for(var i=0; i<cars.length; i++){
        if(cars[i].posX==this.posX && cars[i].posY+cars[i].height >= this.posY && cars[i].posY+cars[i].height<this.posY+this.height){
          cars[i].carImg.src = 'images/blast.png';
          this.carImg.src = 'images/blast.png';
          clearInterval(gameLoop);
        }     
        else{
          for(var j=0; j<this.bulletArr.length; j++){
            // console.log(cars[i].posX)
            if(cars[i].posX+25==this.bulletPosX[j] && cars[i].posY+cars[i].height>=this.bulletPosY[j] && cars[i]!=undefined){
              console.log('bang!!')
              // carTemp = cars[i];
              // cars[i]=cars[0];
              // cars[0]=carTemp;
              // 
              //lostCar = cars.shift();
              cars[i].carImg.src = 'images/blast.png';
              // 

              bulletTemp = this.bulletArr[j];
              bulletXpos = this.bulletPosX[j];
              bulletYpos = this.bulletPosY[j];

              this.bulletArr[j] = this.bulletArr[0];
              this.bulletArr[0] = bulletTemp;

              this.bulletPosX[j] = this.bulletPosX[0];
              this.bulletPosX[0] = bulletXpos;

              this.bulletPosY[j] = this.bulletPosY[0];
              this.bulletPosY[0] = bulletYpos;

              this.bulletPosX.shift();
              this.bulletPosY.shift();

              shiftedBullet = this.bulletArr.shift();
              // lostCar.element.remove();
              shiftedBullet.remove();
              break;
            }
          }
        }   
      }
    }
  }
  function Car(parentElement){
    this.posX = 0;
    this.posY = 0;
    this.height = 100;
    this.width = 65;
    this.speedXdir = 0;
    this.speedYdir = 0;
    this.color = null;
    this.flagHolder = 0;
    this.parentElement = parentElement;
    var that = this;
    
    this.init = function() {
      var car = document.createElement('div');
      car.style.height = this.height + 'px';
      car.style.width = this.width + 'px';
      car.classList.add('car');
      this.parentElement.appendChild(car);
      this.element = car;
      
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
      var colorTable = ['green', 'blue', 'red', 'cyan', 'magenta', 'yellow', 'brown'];
      this.color = colorTable[colorIndex];
    }

    this.move = function(){
      this.posY += this.speedYdir;
      this.element.style.top = this.posY+'px';
    }

    this.draw = function(){
      this.element.style.position = 'absolute';
      this.element.style.zIndex = 10;
      this.carImg = document.createElement('img');
      this.carImg.src = 'images/car4.png';
      this.element.style.transform = 'rotate(180deg)';
      this.element.appendChild(this.carImg);
      this.element.style.left = this.posX+'px';
      this.element.style.top = this.posY+'px';
      this.element.style.borderRadius = '20px';
    }

  }
  function randomNumGen(min, max){
    return parseInt(Math.random() * (max - min) + min);
  }

  function Game(parentElement, roadLane){
    var cars = [];
    var thatGame = this;
    var roadLaneSpeed = 4;
    var roadLaneYpos = -1600;
    var randomTime = 0;
    var timeCount = 0;
    var carCount = 0;
    var laneFlag = [0, 0, 0];
    
    this.parentElement = parentElement;
    this.roadLane = roadLane;

    var myCar = new PlayerCar(parentElement).init();

    this.startGame = function() {
      var gameLoop = setInterval(function(){
        randomTime = randomNumGen(1,3);
        chooseThis = randomNumGen(0, 10);
        if(timeCount>=500 && timeCount%(randomTime*1000)==0){
          carCount = 0;
          laneFlag = [0, 0, 0];
          var carOpp = new Car(parentElement).init();
          carOpp.setPosition(
            carOpp.flagHolder =randomNumGen(0, 3),
            200
          );
          laneFlag[carOpp.flagHolder]=1;
          for(var i=0; i<cars.length; i++){
            if(cars[i].posY>=800){
              // laneFlag[cars[i].flagHolder] = 0;
              lostCar = cars.shift();
              lostCar.element.remove();
            }
          }
          carOpp.setSpeed(5);
          carOpp.draw();
          cars.push(carOpp);
          carCount++;
          timeCount = 0;
        }
        else if(timeCount<60 && carCount<2 && chooseThis<5){
          var carOpp = new Car(parentElement).init();
          carOpp.setPosition(
            carOpp.flagHolder =randomNumGen(0, 3),
            200
          );
         
          if(laneFlag[carOpp.flagHolder]!=1){
            laneFlag[carOpp.flagHolder]=1;
            for(var i=0; i<cars.length; i++){
              if(cars[i].posY>=800){
                lostCar = cars.shift();
                lostCar.element.remove();
              }
            }
            carOpp.setSpeed(5);
            carOpp.draw();
            cars.push(carOpp);
            carCount++;
          }
          else{
            carOpp.element.remove();
          }
        }

        myCar.collisionDetection(cars, gameLoop);
        timeCount +=10;
        thatGame.moveCars();
      },10);
    }

    this.moveCars = function(){
      for(var i=0; i<cars.length; i++){
        cars[i].move();
      }
      roadLaneYpos += roadLaneSpeed;
      this.roadLane[0].style.top = roadLaneYpos+'px';
      if(roadLaneYpos==0){
        roadLaneYpos= -1600;
      }
      for(var j=0; j<myCar.bulletArr.length; j++){
        myCar.bulletPosY[j] -= myCar.gunSpeed;
        myCar.bulletArr[j].style.top = myCar.bulletPosY[j]+'px';
        if(myCar.bulletPosY[j]<-28){
          myCar.bulletPosY.shift();
          myCar.bulletPosX.shift();
          lostBullet = myCar.bulletArr.shift();
          lostBullet.remove();
        }
      }
    }
  }

  var parentRoad = document.getElementById('lane-container');
  var roadLane = document.getElementsByClassName('road-dec');
  
  new Game(parentRoad, roadLane).startGame();

})();