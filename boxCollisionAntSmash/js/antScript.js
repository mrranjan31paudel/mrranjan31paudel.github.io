
; (function () {
    function Box(parentElement) {
      this.x = 10;
      this.y = 10;
      this.speedXdir = 0;
      this.speedYdir = 0;
      this.width = 30;
      this.height = 30;
      this.backImgName = '';
      this.element = null;
      this.parentElement = parentElement;
      var that = this;
  
      this.init = function () {
        var box = document.createElement('div');
        box.style.height = this.height + 'px';
        box.style.width = this.width + 'px';
        box.classList.add('box');
        this.parentElement.appendChild(box);
        this.element = box;
        this.element.onclick = this.boxClicked.bind(this);
        this.draw();
  
        return this;
      }
  
      this.setPostion = function(x, y) {
        this.x = x;
        this.y = y;
      }

      this.setDirection = function(xDir , yDir) {
        if(xDir >= 0){
          xDir = 1;
        }
        else{
          xDir = -1;
        }
        this.speedXdir = xDir;
        if(yDir >= 0){
          yDir = 1;
        }
        else{
          yDir = -1;
        }
        this.speedYdir = yDir;
        
        if(this.speedXdir==1 && this.speedYdir==1 ){
          this.element.style.backgroundImage = 'url(imgs/ant11.gif)';
        }
        else if(this.speedXdir==1 && this.speedYdir==-1 ){
          this.element.style.backgroundImage = 'url(imgs/ant1-1.gif)';
        }
        else if(this.speedXdir==-1 && this.speedYdir==1 ){
          this.element.style.backgroundImage = 'url(imgs/ant-11.gif)';
        }
        else if(this.speedXdir==-1 && this.speedYdir==-1 ){
          this.element.style.backgroundImage = 'url(imgs/ant-1-1.gif)';
        }
      }
  
      this.boxClicked = function () {
        this.move = function(){};
        this.element.style.backgroundImage = 'none';
        setTimeout(function(){
            that.element.remove();
        }, 100);
        
      }
  
      this.draw = function () {
        this.element.style.position = 'absolute';
        this.element.style.zIndex = '5';
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
      }
      
      this.move = function() {
        this.x += this.speedXdir;
        this.y += this.speedYdir;
        this.draw();
      }
  
      this.checkCollision = function(boxes, currBoxInd, maxH, maxW) {
        var flag = 0;

        if(this.x + this.width >= maxW || this.x <= 0){
          this.speedXdir = -this.speedXdir;
          
          if(this.x<0){
            this.x=0;
          }
          if(this.x+this.width>maxW){
            this.x = maxW - this.width;
          }
          
        }
        if(this.y + this.height >= maxH || this.y <= 0){
          this.speedYdir = -this.speedYdir;

          if(this.y<0){
            this.y=0;
          }
          if(this.y+this.height>maxH){
            this.y = maxH - this.height;
          }
          
        }

        var flag = 0;
        for(var j=0; j<boxes.length; ++j){
          if(j != currBoxInd){
            
            var wD = Math.abs(this.x-boxes[j].x);
            var hD = Math.abs(this.y-boxes[j].y);
            if(wD<=this.width && hD<=this.height){
              if(this.x+this.width>=boxes[j].x && this.speedXdir==1 && boxes[j].speedXdir==-1 && hD<this.height 
                || this.x-this.width<=boxes[j].x && this.speedXdir==-1 && boxes[j].speedXdir==1 && hD<this.height){
                if(flag==0){
                  this.speedXdir = -this.speedXdir;
                  boxes[j].speedXdir = -boxes[j].speedXdir;
                  flag = 1;
                }
              }
              if(this.y+this.height>=boxes[j].y && this.speedYdir==1 && boxes[j].speedYdir==-1 && wD<this.width
                ||this.y-this.height<=boxes[j].y && this.speedYdir==-1 && boxes[j].speedYdir==1 && wD<this.width){
                  if(flag == 0){
                    this.speedYdir = -this.speedYdir;
                    boxes[j].speedYdir = -boxes[j].speedYdir;
                    flag = 1;
                  }
              }
            }  
          }
        }
        if(this.speedXdir==1 && this.speedYdir==1 ){
          this.element.style.backgroundImage = 'url(imgs/ant11.gif)';
        }
        else if(this.speedXdir==1 && this.speedYdir==-1 ){
          this.element.style.backgroundImage = 'url(imgs/ant1-1.gif)';
        }
        else if(this.speedXdir==-1 && this.speedYdir==1 ){
          this.element.style.backgroundImage = 'url(imgs/ant-11.gif)';
        }
        else if(this.speedXdir==-1 && this.speedYdir==-1 ){
          this.element.style.backgroundImage = 'url(imgs/ant-1-1.gif)';
        }
      }
    }
    
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function Collision(parentElement, boxCount) {
      var boxes = [];
      var MAX_WIDTH = parentElement.getBoundingClientRect().width;
      var MAX_HEIGHT = parentElement.getBoundingClientRect().height;
      this.parentElement = parentElement;
      this.boxCount = boxCount || 10;
  
      this.startCollision = function() {
        for(var i=0; i < this.boxCount; i++) {
          var box = new Box(parentElement).init();
          box.setPostion(
            getRandomArbitrary(0, MAX_WIDTH-box.width),
            getRandomArbitrary(0, MAX_HEIGHT-box.height)
          )
          for(var j=0; j<i; j++){
            if(Math.abs(box.x-boxes[j].x)<=box.width && Math.abs(box.y-boxes[j].y)<=box.height){
              box.setPostion(
                getRandomArbitrary(0, MAX_WIDTH-box.width),
                getRandomArbitrary(0, MAX_HEIGHT-box.height)
              )
              j=0;
            }
          }
          box.setDirection(
            getRandomArbitrary(-1, 1),
            getRandomArbitrary(-1, 1)
          )
          box.draw();
          boxes.push(box);
        }
  
        setInterval(this.moveBoxes.bind(this), 30);
      }
  
      this.moveBoxes = function() {
        for(var i=0; i< this.boxCount; i++) {
          boxes[i].move();
          boxes[i].checkCollision(boxes, i, MAX_HEIGHT, MAX_WIDTH)
        }
      }
    }
  
    var parentBox = document.getElementById('ant-container');
  
    new Collision(parentBox).startCollision();
  })();