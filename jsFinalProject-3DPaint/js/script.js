;(function(){

  function Cube(context, positionPoint, cubeHeight, cubeWidth, cubeDepth){
    this.positionPoint = positionPoint;
    this.height = cubeHeight;
    this.width = cubeWidth;
    this.depth = cubeDepth;
    this.context =  context;

    
    this.point_FLT = [positionPoint[0], positionPoint[1], positionPoint[2]];
    this.point_FRT = [positionPoint[0] + cubeWidth, positionPoint[1], positionPoint[2]];
    this.point_FLB = [positionPoint[0], positionPoint[1] + cubeHeight, positionPoint[2]];
    this.point_FRB = [positionPoint[0] + cubeWidth, positionPoint[1] + cubeHeight, positionPoint[2]];
    this.point_DLT = [positionPoint[0], positionPoint[1], positionPoint[2] + cubeDepth];
    this.point_DRT = [positionPoint[0] + cubeWidth, positionPoint[1], positionPoint[2] + cubeDepth];
    this.point_DLB = [positionPoint[0], positionPoint[1] + cubeHeight, positionPoint[2] + cubeDepth];
    this.point_DRB = [positionPoint[0] + cubeWidth, positionPoint[1] + cubeHeight, positionPoint[2] + cubeDepth];

    this.factor = Math.sqrt(2);

    this.point_centroidY = [positionPoint[0] + cubeWidth/2, positionPoint[1], positionPoint[2] + cubeDepth/2];
    this.point_centroidZ = [positionPoint[0] + cubeWidth/2, positionPoint[1] + cubeHeight/2, positionPoint[2]];
    this.point_centroidX = [positionPoint[0], positionPoint[1] + cubeHeight/2, positionPoint[2] + cubeDepth/2];

    this.r = Math.sqrt(Math.pow((this.point_FLT[0]-this.point_DRT[0]), 2) + Math.pow( (this.point_FLT[2]-this.point_DRT[2]), 2))/2;

    this.drawCube = function(){
      var posX = this.positionPoint[0];
      var posY = this.positionPoint[1];
      var posZ = this.positionPoint[2];
  
      var varWidth = this.width //- this.positionPoint[2]/this.factor;
      var varHeight = this.height //- this.positionPoint[2]/this.factor;
      var varDepth = this.depth //- this.positionPoint[2]/this.factor;

      context.beginPath();
      context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
      context.lineTo(this.point_DLT[0] , this.point_DLT[1]);
      context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
      context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
      context.lineTo(this.point_FLT[0] , this.point_FLT[1]);
      context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
      context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
      context.lineTo(this.point_DRB[0] , this.point_DRB[1]); 
      context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
      context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
      context.moveTo(this.point_DLT[0] , this.point_DLT[1]);
      context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
      context.moveTo(this.point_DLB[0] , this.point_DLB[1]);
      context.lineTo(this.point_DRB[0] , this.point_DRB[1]);
      context.moveTo(this.point_FLB[0] , this.point_FLB[1]);
      context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
 
      context.stroke();
      
    }
// ***********************************************************Stretch***********
    this.stretchCubeXdir = function(xShift){
      context.clearRect(0, 0 , 400, 400);
      // this.point_FLT[0] = this.point_FLT[0] + xShift;
      this.point_FRT[0] = this.point_FRT[0] + xShift;
      // this.point_FLB[0] = this.point_FLB[0] + xShift;
      this.point_FRB[0] = this.point_FRB[0] + xShift;
      // this.point_DLT[0] = this.point_DLT[0] + xShift;
      this.point_DRT[0] = this.point_DRT[0] + xShift;
      // this.point_DLB[0] = this.point_DLB[0] + xShift;
      this.point_DRB[0] = this.point_DRB[0] + xShift;

      this.drawCube();
    }

    // this.stretchCubeYdir = function(){

    //   this.point_FLT = ;
    //   this.point_FRT = ;
    //   this.point_FLB = ;
    //   this.point_FRB = ;
    //   this.point_DLT = ;
    //   this.point_DRT = ;
    //   this.point_DLB = ;
    //   this.point_DRB = ;

    //   this.drawCube();
    // }
// ****************************************************************Rotation****
    this.rotateCubeAbtY = function(radAngle){
      
      var pi = Math.PI;

      var sinShift = Math.sin(radAngle);
      var cosShift = Math.cos(radAngle);

      // this.positionPoint[0] = this.point_centroidY[0]+(this.positionPoint[0]-this.point_centroidY[0])*cosShift - (this.positionPoint[2]-this.point_centroidY[2])*sinShift;
      // this.positionPoint[2] = this.point_centroidY[2]+(this.positionPoint[2]-this.point_centroidY[2])*cosShift + (this.positionPoint[0]-this.point_centroidY[0])*sinShift;  
      context.clearRect(0, 0, 400, 400);
      this.point_FLT = [ this.point_centroidY[0]+(this.point_FLT[0]-this.point_centroidY[0])*cosShift - (this.point_FLT[2]-this.point_centroidY[2])*sinShift, this.point_FLT[1],  this.point_centroidY[2]+(this.point_FLT[2]-this.point_centroidY[2])*cosShift + (this.point_FLT[0]-this.point_centroidY[0])*sinShift];
      this.point_DLT = [ this.point_centroidY[0]+(this.point_DLT[0]-this.point_centroidY[0])*cosShift - (this.point_DLT[2]-this.point_centroidY[2])*sinShift, this.point_DLT[1],  this.point_centroidY[2]+(this.point_DLT[2]-this.point_centroidY[2])*cosShift + (this.point_DLT[0]-this.point_centroidY[0])*sinShift];
      this.point_FRT = [ this.point_centroidY[0]+(this.point_FRT[0]-this.point_centroidY[0])*cosShift - (this.point_FRT[2]-this.point_centroidY[2])*sinShift, this.point_FRT[1],  this.point_centroidY[2]+(this.point_FRT[2]-this.point_centroidY[2])*cosShift + (this.point_FRT[0]-this.point_centroidY[0])*sinShift];
      this.point_DRT = [ this.point_centroidY[0]+(this.point_DRT[0]-this.point_centroidY[0])*cosShift - (this.point_DRT[2]-this.point_centroidY[2])*sinShift, this.point_DRT[1],  this.point_centroidY[2]+(this.point_DRT[2]-this.point_centroidY[2])*cosShift + (this.point_DRT[0]-this.point_centroidY[0])*sinShift];
      this.point_FLB = [ this.point_centroidY[0]+(this.point_FLB[0]-this.point_centroidY[0])*cosShift - (this.point_FLB[2]-this.point_centroidY[2])*sinShift, this.point_FLB[1],  this.point_centroidY[2]+(this.point_FLB[2]-this.point_centroidY[2])*cosShift + (this.point_FLB[0]-this.point_centroidY[0])*sinShift];
      this.point_DLB = [ this.point_centroidY[0]+(this.point_DLB[0]-this.point_centroidY[0])*cosShift - (this.point_DLB[2]-this.point_centroidY[2])*sinShift, this.point_DLB[1],  this.point_centroidY[2]+(this.point_DLB[2]-this.point_centroidY[2])*cosShift + (this.point_DLB[0]-this.point_centroidY[0])*sinShift];
      this.point_FRB = [ this.point_centroidY[0]+(this.point_FRB[0]-this.point_centroidY[0])*cosShift - (this.point_FRB[2]-this.point_centroidY[2])*sinShift, this.point_FRB[1],  this.point_centroidY[2]+(this.point_FRB[2]-this.point_centroidY[2])*cosShift + (this.point_FRB[0]-this.point_centroidY[0])*sinShift];
      this.point_DRB = [ this.point_centroidY[0]+(this.point_DRB[0]-this.point_centroidY[0])*cosShift - (this.point_DRB[2]-this.point_centroidY[2])*sinShift, this.point_DRB[1],  this.point_centroidY[2]+(this.point_DRB[2]-this.point_centroidY[2])*cosShift + (this.point_DRB[0]-this.point_centroidY[0])*sinShift];
      this.drawCube();
    }

    this.rotateCubeAbtZ = function(radAngle){
      var pi = Math.PI;

      var sinShift = Math.sin(radAngle);
      var cosShift = Math.cos(radAngle);
      context.clearRect(0, 0, 400, 400);
      // this.positionPoint[0] = relativeX * Math.sin(radAngle);
      // this.positionPoint[2] = relativeZ * Math.cos(radAngle);  

      this.point_FLT = [ this.point_centroidZ[0]+(this.point_FLT[0]-this.point_centroidZ[0])*cosShift - (this.point_FLT[1]-this.point_centroidZ[1])*sinShift, this.point_centroidZ[1]+(this.point_FLT[1]-this.point_centroidZ[1])*cosShift + (this.point_FLT[0]-this.point_centroidZ[0])*sinShift, this.point_FLT[2]];
      this.point_DLT = [ this.point_centroidZ[0]+(this.point_DLT[0]-this.point_centroidZ[0])*cosShift - (this.point_DLT[1]-this.point_centroidZ[1])*sinShift, this.point_centroidZ[1]+(this.point_DLT[1]-this.point_centroidZ[1])*cosShift + (this.point_DLT[0]-this.point_centroidZ[0])*sinShift, this.point_DLT[2]];
      this.point_FRT = [ this.point_centroidZ[0]+(this.point_FRT[0]-this.point_centroidZ[0])*cosShift - (this.point_FRT[1]-this.point_centroidZ[1])*sinShift, this.point_centroidZ[1]+(this.point_FRT[1]-this.point_centroidZ[1])*cosShift + (this.point_FRT[0]-this.point_centroidZ[0])*sinShift, this.point_FRT[2]];
      this.point_DRT = [ this.point_centroidZ[0]+(this.point_DRT[0]-this.point_centroidZ[0])*cosShift - (this.point_DRT[1]-this.point_centroidZ[1])*sinShift, this.point_centroidZ[1]+(this.point_DRT[1]-this.point_centroidZ[1])*cosShift + (this.point_DRT[0]-this.point_centroidZ[0])*sinShift, this.point_DRT[2]];
      this.point_FLB = [ this.point_centroidZ[0]+(this.point_FLB[0]-this.point_centroidZ[0])*cosShift - (this.point_FLB[1]-this.point_centroidZ[1])*sinShift, this.point_centroidZ[1]+(this.point_FLB[1]-this.point_centroidZ[1])*cosShift + (this.point_FLB[0]-this.point_centroidZ[0])*sinShift, this.point_FLB[2]];
      this.point_DLB = [ this.point_centroidZ[0]+(this.point_DLB[0]-this.point_centroidZ[0])*cosShift - (this.point_DLB[1]-this.point_centroidZ[1])*sinShift, this.point_centroidZ[1]+(this.point_DLB[1]-this.point_centroidZ[1])*cosShift + (this.point_DLB[0]-this.point_centroidZ[0])*sinShift, this.point_DLB[2]];
      this.point_FRB = [ this.point_centroidZ[0]+(this.point_FRB[0]-this.point_centroidZ[0])*cosShift - (this.point_FRB[1]-this.point_centroidZ[1])*sinShift, this.point_centroidZ[1]+(this.point_FRB[1]-this.point_centroidZ[1])*cosShift + (this.point_FRB[0]-this.point_centroidZ[0])*sinShift, this.point_FRB[2]];
      this.point_DRB = [ this.point_centroidZ[0]+(this.point_DRB[0]-this.point_centroidZ[0])*cosShift - (this.point_DRB[1]-this.point_centroidZ[1])*sinShift, this.point_centroidZ[1]+(this.point_DRB[1]-this.point_centroidZ[1])*cosShift + (this.point_DRB[0]-this.point_centroidZ[0])*sinShift, this.point_DRB[2]];

      this.drawCube();
    }

    this.rotateCubeAbtX = function(radAngle){
      var pi = Math.PI;

      var sinShift = Math.sin(radAngle);
      var cosShift = Math.cos(radAngle);
      context.clearRect(0, 0, 400, 400);
      // this.positionPoint[0] = relativeX * Math.sin(radAngle);
      // this.positionPoint[2] = relativeZ * Math.cos(radAngle);  

      this.point_FLT = [ this.point_FLT[0], this.point_centroidX[1]+(this.point_FLT[1]-this.point_centroidX[1])*cosShift + (this.point_FLT[2]-this.point_centroidX[2])*sinShift,  this.point_centroidX[2]+(this.point_FLT[2]-this.point_centroidX[2])*cosShift - (this.point_FLT[1]-this.point_centroidX[1])*sinShift];
      this.point_DLT = [ this.point_DLT[0], this.point_centroidX[1]+(this.point_DLT[1]-this.point_centroidX[1])*cosShift + (this.point_DLT[2]-this.point_centroidX[2])*sinShift,  this.point_centroidX[2]+(this.point_DLT[2]-this.point_centroidX[2])*cosShift - (this.point_DLT[1]-this.point_centroidX[1])*sinShift];
      this.point_FRT = [ this.point_FRT[0], this.point_centroidX[1]+(this.point_FRT[1]-this.point_centroidX[1])*cosShift + (this.point_FRT[2]-this.point_centroidX[2])*sinShift,  this.point_centroidX[2]+(this.point_FRT[2]-this.point_centroidX[2])*cosShift - (this.point_FRT[1]-this.point_centroidX[1])*sinShift];
      this.point_DRT = [ this.point_DRT[0], this.point_centroidX[1]+(this.point_DRT[1]-this.point_centroidX[1])*cosShift + (this.point_DRT[2]-this.point_centroidX[2])*sinShift,  this.point_centroidX[2]+(this.point_DRT[2]-this.point_centroidX[2])*cosShift - (this.point_DRT[1]-this.point_centroidX[1])*sinShift];
      this.point_FLB = [ this.point_FLB[0], this.point_centroidX[1]+(this.point_FLB[1]-this.point_centroidX[1])*cosShift + (this.point_FLB[2]-this.point_centroidX[2])*sinShift,  this.point_centroidX[2]+(this.point_FLB[2]-this.point_centroidX[2])*cosShift - (this.point_FLB[1]-this.point_centroidX[1])*sinShift];
      this.point_DLB = [ this.point_DLB[0], this.point_centroidX[1]+(this.point_DLB[1]-this.point_centroidX[1])*cosShift + (this.point_DLB[2]-this.point_centroidX[2])*sinShift,  this.point_centroidX[2]+(this.point_DLB[2]-this.point_centroidX[2])*cosShift - (this.point_DLB[1]-this.point_centroidX[1])*sinShift];
      this.point_FRB = [ this.point_FRB[0], this.point_centroidX[1]+(this.point_FRB[1]-this.point_centroidX[1])*cosShift + (this.point_FRB[2]-this.point_centroidX[2])*sinShift,  this.point_centroidX[2]+(this.point_FRB[2]-this.point_centroidX[2])*cosShift - (this.point_FRB[1]-this.point_centroidX[1])*sinShift];
      this.point_DRB = [ this.point_DRB[0], this.point_centroidX[1]+(this.point_DRB[1]-this.point_centroidX[1])*cosShift + (this.point_DRB[2]-this.point_centroidX[2])*sinShift,  this.point_centroidX[2]+(this.point_DRB[2]-this.point_centroidX[2])*cosShift - (this.point_DRB[1]-this.point_centroidX[1])*sinShift];

      this.drawCube();
    }

// ****************************************************************Move or shift
    this.moveCube = function(xShift, yShift){
      context.clearRect(0, 0 , 400, 400);
      this.point_FLT = [this.point_FLT[0] + xShift, this.point_FLT[1] + yShift, this.point_FLT[2]];
      this.point_FRT = [this.point_FRT[0] + xShift, this.point_FRT[1] + yShift, this.point_FRT[2]];
      this.point_FLB = [this.point_FLB[0] + xShift, this.point_FLB[1] + yShift, this.point_FLB[2]];
      this.point_FRB = [this.point_FRB[0] + xShift, this.point_FRB[1] + yShift, this.point_FRB[2]];
      this.point_DLT = [this.point_DLT[0] + xShift, this.point_DLT[1] + yShift, this.point_DLT[2]];
      this.point_DRT = [this.point_DRT[0] + xShift, this.point_DRT[1] + yShift, this.point_DRT[2]];
      this.point_DLB = [this.point_DLB[0] + xShift, this.point_DLB[1] + yShift, this.point_DLB[2]];
      this.point_DRB = [this.point_DRB[0] + xShift, this.point_DRB[1] + yShift, this.point_DRB[2]];
      this.drawCube();
    }
    
  }

    function MainFunc(parentContainer, newCanvas){
      
      var pos = [100, 100, 0];
      var ht = 100;
      var wd = 100;
      var dt = 100;

      var posDel = -1;
      
      var context = newCanvas.getContext('2d');
      
      var cube = new Cube(context, pos, ht, wd, dt);
      cube.drawCube();
      var angle = 0.01745;

      // cube.stretchCubeXdir(40);
      // cube.rotateCubeAbtX(angle*45);
      // cube.rotateCubeAbtY(-angle*45)
      // cube.rotateCubeAbtZ(angle*45);
      // cube.stretchCubeXdir(40);

      setInterval(function(){
        // context.clearRect(0, 0, 400, 400);
        cube.rotateCubeAbtX(angle);
        cube.rotateCubeAbtY(-angle);
        cube.rotateCubeAbtZ(angle);
        // cube.moveCube(1, 1);
      }, 20)    

    }

    var parentContainer = document.getElementById('canvas-container');
    var newCanvas = document.getElementsByClassName('new-canvas')[0];
    // newCanvas.setAttribute('width', '400');
    // newCanvas.setAttribute('height', '400');
    newCanvas.style.position = 'absolute';
    newCanvas.style.left = '0px';
    newCanvas.style.top = '0px';
    newCanvas.style.overflow = 'auto';

    new MainFunc(parentContainer, newCanvas); 
})();
