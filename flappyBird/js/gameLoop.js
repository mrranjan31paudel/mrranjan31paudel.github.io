;(function (){

  function Bird(parentElement){
    this.height = 32;
    this.width = 40;
    this.posX = 100;
    this.posY = 250;
    this.speedY = 0;
    this.speedX = 2;
    this.directionFlag = 0;
    this.spaceEffectHeight = 0;
    this.parentElement = parentElement;
    var that = this;

    this.init = function(){
      var bird = document.createElement('div');
      bird.style.height = this.height+'px';
      bird.style.width = this.width+'px';
      bird.classList.add('bird');
      this.parentElement.appendChild(bird);
      this.element = bird;
      document.addEventListener('keydown', this.spacePressed.bind(this));
      this.draw();

      return this;
    }

    this.draw = function(){
      this.element.style.position = 'absolute';
      this.element.style.zIndex = 15;
      this.element.style.backgroundImage = 'url(images/bird3.gif)';
      this.element.style.backgroundRepeat = 'no-repeat';
      this.element.style.top = this.posY+'px';
      this.element.style.left = this.posX+'px';
    }

    this.spacePressed = function(event){
      var pressedkey = event.code;
      if(pressedkey=='Space'){
        this.directionFlag = 1;
      }
    }

    this.shiftBird = function(){ 
      if(this.directionFlag==0){
        this.posY += 2;
        this.element.style.top = this.posY+'px';
        this.element.style.transform = 'rotate(60deg)';
      }
      if(this.directionFlag==1){
        this.posY -= 2;
        this.element.style.top = this.posY+'px';
        this.element.style.transform = 'rotate(-30deg)';
        this.spaceEffectHeight +=2;
        if(this.spaceEffectHeight>=64){
          this.spaceEffectHeight = 0;
          this.directionFlag = 0;
        }
      }
    }
    this.fall = function(){
      this.speedX = 0;
      var localInterval = setInterval(function(){
        that.posY +=1;
        that.element.style.top = this.posY+'px';
        if(that.posY>=500){
          clearInterval(localInterval);
        }
        
      },10);
      clearInterval(gameLoop);
    }

    this.collisionDetection = function(pipesUp, pipesDown, gameLoop){
      for(var i=0; i<pipesUp.length; i++){
        if(this.posX+this.width>=pipesUp[i].posX && this.posX<=pipesUp[i].posX+pipesUp[i].width){
          if(this.posY+this.height>=pipesUp[i].posY || this.posY<=pipesDown[i].posY+pipesDown[i].height){
            this.element.style.backgroundImage = 'url(images/birdStat.png)';
            this.fall();
          }
        }
        
      }
      if(this.posY+this.height>=500){
        this.element.style.backgroundImage = 'url(images/birdStat.png)';
        clearInterval(gameLoop);
        
      }
    }
  }

  function Pipe(parentElement){
    this.height = 460;
    this.width = 125;
    this.posX = 0;
    this.posY = 0;
    this.speedX = 0;
    this.parentElement = parentElement;
    var that = this;

    this.init = function(){
      var pipe = document.createElement('div');
      pipe.style.height = this.height+'px';
      pipe.style.width = this.width+'px';
      pipe.classList.add('pipe');
      this.parentElement.appendChild(pipe);
      this.element = pipe;
      this.draw();

      return this;
    }
    this.draw = function(pipeOrientation){
      this.element.style.position = 'absolute';
      this.element.style.zIndex = 10;
      if(pipeOrientation==0){
        this.posY -= 460;
        this.element.style.top = this.posY+'px';
        this.element.style.left = this.posX+'px';
        this.element.style.backgroundImage = 'url(images/pipedown.png)';
      }
      else{
        this.posY += 145;
        this.element.style.top = this.posY+'px';
        this.element.style.left = this.posX+'px';
        this.element.style.backgroundImage = 'url(images/pipeup.png)';
      }
      
    }

    this.setPosition = function(xPos, yIndex){
      var yPos = [100, 131, 162, 193, 224, 255];
      this.posX = xPos;
      this.posY = yPos[yIndex];
    }

    this.movePipes = function(){
      this.posX -=2;
      this.element.style.left = this.posX+'px';
    }
  }

  function randomNumGen(min, max){
    return parseInt(Math.random() * (max - min) + min);
  }

  function MainGame(parentElement, farBackground,nearBackground, gameLoop){
    
    var nearBackPos = 0;
    this.nearBackground = nearBackground;
    this.farBackground = farBackground;
    var thatGame = this;

    var pipesUp = [];
    var pipesDown = [];
    var timeCount = 0;
    var downYpos;

    var flappyBird = new Bird(parentElement).init();

    this.startGame = function(){
      gameLoop = setInterval(function(){
        if(timeCount>=2000){
          timeCount = 0;

          var pipeDown = new Pipe(parentElement).init();
          pipeDown.setPosition(
            705,
            downYpos = randomNumGen(0, 6)
          );
          pipesDown.push(pipeDown);

          var pipeUp = new Pipe(parentElement).init();
          pipeUp.setPosition(
            705,
            downYpos
          );
          pipesUp.push(pipeUp);
          pipeDown.draw(0);
          pipeUp.draw(1);
        }
        flappyBird.shiftBird();
        flappyBird.collisionDetection(pipesUp, pipesDown, gameLoop);
        timeCount += 10;
        thatGame.movement();
      }, 10);
    }
    
    this.movement = function(){
      if(nearBackPos<=-200){
        nearBackPos = 0;
      }
      else{
        nearBackPos -=flappyBird.speedX;
      }
      this.nearBackground.style.left = nearBackPos+'px';
      for(var i=0; i<pipesUp.length; i++){
        pipesUp[i].movePipes();
        pipesDown[i].movePipes();
        if(pipesUp[i].posX<-pipesUp[i].width){
          lostPipe = pipesUp.shift();
          lostPipe.element.remove();
        }
        if(pipesDown[i].posX<-pipesDown[i].width){
          lostPipe = pipesDown.shift();
          lostPipe.element.remove();
        }
      }
    }
  }

  var parentElement = document.getElementById('flappy-bird-container');
  var farBackground = document.getElementById('far-background');
  var nearBackground = document.getElementById('near-background');
  var gameLoop;
  new MainGame(parentElement, farBackground, nearBackground, gameLoop).startGame()
  // var newGame = new MainGame(parentElement, farBackground, nearBackground, gameLoop);
  // parentElement.onkeydown = newGame.startGame();
})();