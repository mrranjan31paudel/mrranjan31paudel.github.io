;(function(){
  function Dot(parentElement){
    this.height = 40;
    this.width = 40;
    this.posY = 0;
    this.posX = 0;
    this.Radius = 20;
    this.parentElement = parentElement;

    this.init = function(){
      var aDot = document.createElement('div');
      aDot.classList.add('dots');
      aDot.style.position = 'absolute';
      aDot.style.height = this.height+'px';
      aDot.style.width = this.width+'px';
      aDot.style.zIndex = 5;
      this.parentElement.appendChild(aDot);
      this.element = aDot;
      this.draw();
      
      return this;
    }
    this.draw = function(){
      this.element.style.top = this.posY+'px';
      this.element.style.left = this.posX+'px';
      this.element.style.borderRadius = this.Radius+'px';
    }

    this.setPosition = function(xpos, ypos){
      this.posX = xpos;
      this.posY = ypos;
      this.element.style.left = this.posX+'px';
      this.element.style.top = this.posY+'px';
    }

    this.setColor = function(color){
      this.element.style.backgroundColor = color;
    }

    this.setSize = function(){
      this.element.style.width = this.width+'px';
      this.element.style.height = this.height+'px';
      this.element.style.borderRadius = this.Radius+'px';
    }

    this.moveDot = function(){
      this.element.style.top = this.posY+'px';
    }

  }

  function MainLoop(parentElement){
    this.parentElement = parentElement;
    var thatLoop = this;
    var timeCount = 0;
    var nextPosH = 38;
    var nextPosV = 25;
    var amplitude = 80;
    var newDotOne
    var newDotTwo
    var nones = [];
    var ntwos = [];
    var newDotsOne = [];
    var newDotsTwo = [];
    var angleRad = 0.01745;
    var animLoop;
    for(var i=0; i<11; i++){
      for(var j=0; j<15; j++){
        newDotOne = new Dot(parentElement).init();
        newDotTwo = new Dot(parentElement).init();
        newDotOne.setPosition(j*nextPosH, (amplitude*Math.sin(Math.PI/2+j*angleRad)+amplitude)+nextPosV*i);
        newDotOne.setColor('red');
        newDotTwo.setPosition(j*nextPosH, (amplitude*Math.cos(j*angleRad)+amplitude)+nextPosV*i);
        newDotTwo.setColor('yellow');
        ntwos.push(newDotTwo);
        nones.push(newDotOne);
      }
      newDotsOne.push(nones);
      newDotsTwo.push(ntwos);
      nones = [];
      ntwos = [];
    }
    
    this.startAnimation = function(){
        animLoop = setInterval(function(){
            thatLoop.moveDots(timeCount);
            timeCount +=  angleRad;
        }, 10);
    }

    this.moveDots = function(timeCount){
        
        for(var i=0; i<11; i++){
          for(var j=0; j<15; j++){
            newDotsOne[i][j].posY = amplitude*Math.sin(timeCount-j*12*angleRad)+amplitude+nextPosV*i;
            newDotsTwo[i][j].posY = amplitude*Math.cos(Math.PI/2+timeCount-j*12*angleRad)+amplitude+nextPosV*i;
           
            newDotsOne[i][j].moveDot();
            newDotsTwo[i][j].moveDot();

          }
        }
        // for(var j=0; j<15; j++){
        //   for(var i=0; i<11; i++){
        //     newDotsOne[i][j].width = Math.sin(timeCount-j*12*angleRad)*40;
        //     newDotsOne[i][j].height = newDotsOne[i][j].width;
        //     newDotsOne[i][j].Radius = newDotsOne[i][j].width/2;
        //     newDotsOne[i][j].setSize();

        //     newDotsTwo[i][j].width = Math.cos(Math.PI/2+timeCount-j*12*angleRad)*40;
        //     newDotsTwo[i][j].height = newDotsTwo[i][j].width;
        //     newDotsTwo[i][j].Radius = newDotsTwo[i][j].width/2;
        //     newDotsTwo[i][j].setSize();
        //   }
        // }
    }
  }

  var parentElement = document.getElementsByClassName('animation-container')[0];

  new MainLoop(parentElement).startAnimation();
  

})();