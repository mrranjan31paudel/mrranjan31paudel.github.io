;(function (){

  function Bird(parentElement){
    this.height = 32;
    this.width = 40;
    this.posX = 100;
    this.posY = 250;
    this.speedY = 0;
    this.speedX = 2;
    this.directionFlag = 0;
    this.regionInFlag = 0;
    this.score = 0;
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
        this.speedY = 5;
      }
    }

    this.shiftBird = function(){ 
      if(this.directionFlag==0){
        this.speedY +=0.1;
        
        this.posY += this.speedY;
        this.element.style.top = this.posY+'px';
        this.element.style.transform = 'rotate(60deg)';
      }
      if(this.directionFlag==1){

        this.speedY -= 0.2;
        this.posY -= this.speedY;
        this.element.style.top = this.posY+'px';
        this.element.style.transform = 'rotate(-30deg)';
        if(this.speedY<= 0){
          this.directionFlag = 0;
          this.speedY = 1;
        }
      }
    }
    this.fall = function(){
      
      var localInterval = setInterval(function(){
        that.posY +=2;
        that.element.style.top = this.posY+'px';
        if(that.posY>=500){
          clearInterval(localInterval);
        }  
      },10);
      clearInterval(gameLoop);
      startButton.style.display = 'block';
    }

    this.collisionDetection = function(pipesUp, pipesDown, gameLoop){
      for(var i=0; i<pipesUp.length; i++){
        if(this.posX+this.width>=pipesUp[i].posX && this.posX<=pipesUp[i].posX+pipesUp[i].width){
          this.regionInFlag = 1;
          if(this.posY+this.height>=pipesUp[i].posY || this.posY<=pipesDown[i].posY+pipesDown[i].height){
            this.element.style.backgroundImage = 'url(images/birdStat.png)';
            this.fall();
          }
        }
        if(pipesDown[i].posX+pipesDown[i].width<=this.posX && this.regionInFlag==1){
          this.score ++;
          this.regionInFlag = 0;
        }
      }
      if(this.posY+this.height>=500){
        this.element.style.backgroundImage = 'url(images/birdStat.png)';
        clearInterval(gameLoop);
        startButton.style.display = 'block';
        
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

  function ScoreDig(parentElement){
    this.parentElement = parentElement;

    this.init = function(){
      var scorePlate = document.createElement('img');
      scorePlate.classList.add('score-img');
      this.parentElement.appendChild(scorePlate);
      this.element = scorePlate;

      return this;
    }
  }

  function randomNumGen(min, max){
    return parseInt(Math.random() * (max - min) + min);
  }

  function MainGame(parentElement, farBackground, nearBackground, scoreBoard, scorePlateArr, gameLoop){
    
    var nearBackPos = 0;
    this.nearBackground = nearBackground;
    this.farBackground = farBackground;
    this.scoreBoard = scoreBoard;
    this.scorePlateArr = scorePlateArr;
    
    var thatGame = this;

    var pipesUp = [];
    var pipesDown = [];
    var timeCount = 0;
    var scoreLevel = 10;
    var prevScore = 0;
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
        prevScore = flappyBird.score;
        flappyBird.collisionDetection(pipesUp, pipesDown, gameLoop);
        if(flappyBird.score>prevScore){
          thatGame.drawScore();
        }
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

    this.drawScore = function(){
      var prevLevel = scoreLevel;
      var temp = flappyBird.score;
      if(flappyBird.score>=scoreLevel){
        scoreLevel *= 10;
      }
      if(scoreLevel>prevLevel){
        var newPlate = new ScoreDig(scoreBoard).init();
        scorePlateArr.push(newPlate);
      }
      for(var i=0; i<scorePlateArr.length; i++){
        var rem = temp % 10;
        scorePlateArr[scorePlateArr.length-1-i].element.src = 'images/'+rem+'.png';
        temp = parseInt(temp / 10);
      }
    }
  }

  function MainClass(parentElement){
    
    farBackground = document.createElement('div');
    nearBackground = document.createElement('div');
    scoreBoard = document.createElement('div');
    
    scorePlateArr = [];

    scoreDigit = new ScoreDig(scoreBoard).init();
    scoreDigit.element.src = 'images/0.png';
    scorePlateArr.push(scoreDigit);

    parentElement.appendChild(farBackground);
    parentElement.appendChild(nearBackground);
    parentElement.appendChild(scoreBoard);

    farBackground.setAttribute('class', 'far-background');
    farBackground.style.height = '500px';
    farBackground.style.width = '900px';
    farBackground.style.position = 'absolute';
    farBackground.style.top = '0px';
    farBackground.style.left = '0px';
    farBackground.style.zIndex = 5;
    farBackground.style.backgroundImage = 'url(images/backgroundImg.png)';

    nearBackground.setAttribute('class', 'near-background');
    nearBackground.style.height = '100px';
    nearBackground.style.width = '900px';
    nearBackground.style.position = 'absolute';
    nearBackground.style.top = '500px';
    nearBackground.style.left = '0px';
    nearBackground.style.zIndex = 15;
    nearBackground.style.backgroundImage = 'url(images/pipePlatform.png)';

    scoreBoard.setAttribute('class', 'score-board');
    scoreBoard.style.position = 'absolute';
    scoreBoard.style.top = '100px';
    scoreBoard.style.left = '296px';
    scoreBoard.style.zIndex = 15; 
  }
  var parentElement = document.getElementById('flappy-bird-container');
  var gameLoop;
  var farBackground;
  var nearBackground;
  var scoreBoard;
  var scorePlateArr;
  var scoreDigit

  var startButton = document.createElement('div');

  startButton.style.backgroundColor = 'orange';
  startButton.style.color = 'white';
  startButton.style.height = '40px';
  startButton.style.width = '300px';
  startButton.style.border = '0px';
  startButton.style.fontSize = '25px';
  startButton.style.zIndex = 25;
  startButton.style.borderRadius = '25px';
  startButton.style.position = 'absolute';
  startButton.style.left = '200px';
  startButton.style.top = '200px';
  startButton.innerHTML = 'START';
  startButton.style.textAlign = 'center';
  startButton.style.lineHeight = '40px'
  document.body.appendChild(startButton);

  new MainClass(parentElement);
  startButton.onclick = function(){
    parentElement.innerHTML = '';
    new MainClass(parentElement);
    startButton.style.display = 'none';
    
    new MainGame(parentElement, farBackground, nearBackground, scoreBoard, scorePlateArr, gameLoop).startGame();
  };
})();