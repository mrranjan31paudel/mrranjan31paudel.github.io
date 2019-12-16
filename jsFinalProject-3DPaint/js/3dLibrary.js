function Cube(context, positionPoint, cubeHeight, cubeWidth, cubeDepth, cubeColor){
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

  this.axisAangXY = 0;
  this.axisBangXY = 0;
  this.axisCangXY = Math.PI/2;

  this.r = Math.sqrt(Math.pow((this.point_FLT[0]-this.point_DRT[0]), 2) + Math.pow( (this.point_FLT[2]-this.point_DRT[2]), 2))/2;

  this.boundingRect = [];

  this.drawShape = function(){
    var posX = this.positionPoint[0];
    var posY = this.positionPoint[1];
    var posZ = this.positionPoint[2];

    var varWidth = this.width //- this.positionPoint[2]/this.factor;
    var varHeight = this.height //- this.positionPoint[2]/this.factor;
    var varDepth = this.depth //- this.positionPoint[2]/this.factor;
    
    context.fillStyle = cubeColor;
    context.strokeStyle = context.setLineDash([]);
    context.beginPath();
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    context.lineTo(this.point_DLT[0] , this.point_DLT[1]);
    context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
    context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    context.stroke();
    context.fill();
    context.beginPath();
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
    context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
    context.lineTo(this.point_FLT[0] , this.point_FLT[1]);
    context.stroke();
    context.fill();
    context.beginPath();
    context.moveTo(this.point_FRT[0] , this.point_FRT[1]);
    context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
    context.lineTo(this.point_DRB[0] , this.point_DRB[1]); 
    context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
    context.stroke();
    context.fill();
    context.beginPath();
    context.moveTo(this.point_DLT[0] , this.point_DLT[1]);
    context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
    context.lineTo(this.point_DRB[0] , this.point_DRB[1]);
    context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
    context.moveTo(this.point_DLT[0] , this.point_DLT[1]);
    context.stroke();
    context.fill();
    context.beginPath();
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
    context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
    context.lineTo(this.point_DLT[0] , this.point_DLT[1]);
    context.lineTo(this.point_FLT[0] , this.point_FLT[1]);
    context.stroke();
    context.fill();
    context.beginPath();
    context.moveTo(this.point_FLB[0] , this.point_FLB[1]);
    context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    context.lineTo(this.point_DRB[0] , this.point_DRB[1]);
    context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
    context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
    context.closePath();
    context.stroke();
    context.fill();
    // context.moveTo(this.point_DLB[0] , this.point_DLB[1]);
    // context.lineTo(this.point_DRB[0] , this.point_DRB[1]);
    // context.fill();
    // context.moveTo(this.point_FLB[0] , this.point_FLB[1]);
    // context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    // context.fill();
    // context.moveTo(this.point_centroidX[0], this.point_centroidX[1]);
    // context.lineTo(this.point_centroidX[0]+1, this.point_centroidX[1]+1);
    // context.strokeStyle = cubeColor;
    // context.stroke();
    
  }
// ***********************************************************Stretch***********
  this.stretchShape = function(butId, shift){

    if(this.axisBangXY>=Math.PI/4){
      var slope = (this.point_FRB[1]-this.point_FLB[1])/(this.point_FRB[0]-this.point_FLB[0]);
      
      if(butId==2){
        if(slope<1 && slope>=0){
          if(this.point_FRB[0]>this.point_FLB[0]){
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]+shift*slope, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]+shift*slope, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]+shift*slope, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]+shift*slope, this.point_DRB[2]];
          }
          else{
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]+shift*slope, this.point_FLB[2]];
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]+shift*slope, this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]+shift*slope, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]+shift*slope, this.point_DLB[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FRB[0]>this.point_FLB[0]){
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]-shift*slope, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]-shift*slope, this.point_FRT[2]];
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]-shift*slope, this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]-shift*slope, this.point_FLB[2]];
          }
          else if(this.point_FRB[0]==this.point_FLB[0]){
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1], this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1], this.point_FRT[2]];
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1], this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1], this.point_FLB[2]];
          }
          else{
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]-shift*slope, this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]-shift*slope, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]-shift*slope, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]-shift*slope, this.point_DLB[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FRB[1]>=this.point_FLB[1]){
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]+shift*Math.abs(slope), this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]+shift*Math.abs(slope), this.point_FRT[2]];
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]+shift*Math.abs(slope), this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]+shift*Math.abs(slope), this.point_FLB[2]];
          }
          else if(this.point_FLB[0]==this.point_FRB[0]){
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1], this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1], this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1], this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1], this.point_DLB[2]];
          }
          else{
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]+shift*Math.abs(slope), this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]+shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]+shift*Math.abs(slope), this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]+shift*Math.abs(slope), this.point_DLB[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FRB[1]>=this.point_FLB[1]){
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]-shift*Math.abs(slope), this.point_FLB[2]];
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]-shift*Math.abs(slope), this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]-shift*Math.abs(slope), this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]-shift*Math.abs(slope), this.point_DLB[2]];
          }
          else{
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]-shift*Math.abs(slope), this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]-shift*Math.abs(slope), this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]-shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]-shift*Math.abs(slope), this.point_DRB[2]];
          }
        }
      }
      if(butId==4){
        if(slope<1 && slope>=0){
          if(this.point_FRB[0]>this.point_FLB[0]){     
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]-shift*slope, this.point_FLB[2]];
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]-shift*slope, this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]-shift*slope, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]-shift*slope, this.point_DLB[2]];              
          }
          else{
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]-shift*slope, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]-shift*slope, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]-shift*slope, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]-shift*slope, this.point_DRB[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FRB[0]>this.point_FLB[0]){
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]+shift*slope, this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]+shift*slope, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]+shift*slope, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]+shift*slope, this.point_DLB[2]];
          }
          else if(this.point_FRB[0]==this.point_FLB[0]){
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1], this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1], this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1], this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1], this.point_DLB[2]];
          }
          else{
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]+shift*slope, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]+shift*slope, this.point_FRT[2]];
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]+shift*slope, this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]+shift*slope, this.point_FLB[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FRB[1]>=this.point_FLB[1]){
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]-shift*Math.abs(slope), this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]-shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]-shift*Math.abs(slope), this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]-shift*Math.abs(slope), this.point_DLB[2]];
          }
          else if(this.point_FLB[0]==this.point_FRB[0]){
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1], this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1], this.point_FRT[2]];
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1], this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1], this.point_FLB[2]];
          }
          else{
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]-shift*Math.abs(slope), this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]-shift*Math.abs(slope), this.point_FRT[2]];
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]-shift*Math.abs(slope), this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]-shift*Math.abs(slope), this.point_FLB[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FRB[1]>=this.point_FLB[1]){
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]+shift*Math.abs(slope), this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]+shift*Math.abs(slope), this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]+shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]+shift*Math.abs(slope), this.point_DRB[2]];
          }
          else{
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]+shift*Math.abs(slope), this.point_FLB[2]];
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]+shift*Math.abs(slope), this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]+shift*Math.abs(slope), this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]+shift*Math.abs(slope), this.point_DLB[2]];
          }
        }
      }
      if(butId==1){
        if(slope<1 && slope>=0){
          if(slope==0){
            slope = Infinity;
          }
          if(this.point_FRB[0]>this.point_FLB[0]){
            this.point_FLB = [this.point_FLB[0]+shift/slope, this.point_FLB[1]-shift, this.point_FLB[2]];
            this.point_FLT = [this.point_FLT[0]+shift/slope, this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_FRB = [this.point_FRB[0]+shift/slope, this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]+shift/slope, this.point_FRT[1]-shift, this.point_FRT[2]];
          }
          else{
            this.point_DRT = [this.point_DRT[0]+shift/slope, this.point_DRT[1]-shift, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift/slope, this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_DLT = [this.point_DLT[0]+shift/slope, this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift/slope, this.point_DLB[1]-shift, this.point_DLB[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FRB[0]>=this.point_FLB[0]){
            this.point_DLT = [this.point_DLT[0]-shift/slope, this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift/slope, this.point_DLB[1]-shift, this.point_DLB[2]];
            this.point_FLT = [this.point_FLT[0]-shift/slope, this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]-shift/slope, this.point_FLB[1]-shift, this.point_FLB[2]];
          }
          else{
            this.point_FRB = [this.point_FRB[0]-shift/slope, this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]-shift/slope, this.point_FRT[1]-shift, this.point_FRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift/slope, this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]-shift/slope, this.point_DRT[1]-shift, this.point_DRT[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FRB[1]>=this.point_FLB[1]){
            this.point_DLT = [this.point_DLT[0]+shift/Math.abs(slope), this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift/Math.abs(slope), this.point_DLB[1]-shift, this.point_DLB[2]];
            this.point_FLT = [this.point_FLT[0]+shift/Math.abs(slope), this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]+shift/Math.abs(slope), this.point_FLB[1]-shift, this.point_FLB[2]];
          }
          else{
            this.point_FRB = [this.point_FRB[0]+shift/Math.abs(slope), this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]+shift/Math.abs(slope), this.point_FRT[1]-shift, this.point_FRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift/Math.abs(slope), this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]+shift/Math.abs(slope), this.point_DRT[1]-shift, this.point_DRT[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FRB[1]>=this.point_FLB[1]){
            this.point_DRT = [this.point_DRT[0]-shift/Math.abs(slope), this.point_DRT[1]-shift, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift/Math.abs(slope), this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_DLT = [this.point_DLT[0]-shift/Math.abs(slope), this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift/Math.abs(slope), this.point_DLB[1]-shift, this.point_DLB[2]];
          }
          else{
            this.point_FLB = [this.point_FLB[0]-shift/Math.abs(slope), this.point_FLB[1]-shift, this.point_FLB[2]];
            this.point_FLT = [this.point_FLT[0]-shift/Math.abs(slope), this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_FRB = [this.point_FRB[0]-shift/Math.abs(slope), this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]-shift/Math.abs(slope), this.point_FRT[1]-shift, this.point_FRT[2]];
          }
        }
      }
      if(butId==3){
        if(slope<1 && slope>=0){
          if(slope==0){
            slope = Infinity;
          }
          if(this.point_FRB[0]>this.point_FLB[0]){
            this.point_DRT = [this.point_DRT[0]-shift/slope, this.point_DRT[1]+shift, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift/slope, this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_DLT = [this.point_DLT[0]-shift/slope, this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift/slope, this.point_DLB[1]+shift, this.point_DLB[2]];
          }
          else{
            this.point_FLB = [this.point_FLB[0]-shift/slope, this.point_FLB[1]+shift, this.point_FLB[2]];
            this.point_FLT = [this.point_FLT[0]-shift/slope, this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_FRB = [this.point_FRB[0]-shift/slope, this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]-shift/slope, this.point_FRT[1]+shift, this.point_FRT[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FRB[0]>=this.point_FLB[0]){
            this.point_FRB = [this.point_FRB[0]+shift/slope, this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]+shift/slope, this.point_FRT[1]+shift, this.point_FRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift/slope, this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]+shift/slope, this.point_DRT[1]+shift, this.point_DRT[2]];
          }
          else{
            this.point_DLT = [this.point_DLT[0]+shift/slope, this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift/slope, this.point_DLB[1]+shift, this.point_DLB[2]];
            this.point_FLT = [this.point_FLT[0]+shift/slope, this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]+shift/slope, this.point_FLB[1]+shift, this.point_FLB[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FRB[1]>=this.point_FLB[1]){
            this.point_FRB = [this.point_FRB[0]-shift/Math.abs(slope), this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]-shift/Math.abs(slope), this.point_FRT[1]+shift, this.point_FRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift/Math.abs(slope), this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_DRT = [this.point_DRT[0]-shift/Math.abs(slope), this.point_DRT[1]+shift, this.point_DRT[2]];
          }
          else{
            this.point_DLT = [this.point_DLT[0]-shift/Math.abs(slope), this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift/Math.abs(slope), this.point_DLB[1]+shift, this.point_DLB[2]];
            this.point_FLT = [this.point_FLT[0]-shift/Math.abs(slope), this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_FLB = [this.point_FLB[0]-shift/Math.abs(slope), this.point_FLB[1]+shift, this.point_FLB[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FRB[1]>=this.point_FLB[1]){
            this.point_FLB = [this.point_FLB[0]+shift/Math.abs(slope), this.point_FLB[1]+shift, this.point_FLB[2]];
            this.point_FLT = [this.point_FLT[0]+shift/Math.abs(slope), this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_FRB = [this.point_FRB[0]+shift/Math.abs(slope), this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_FRT = [this.point_FRT[0]+shift/Math.abs(slope), this.point_FRT[1]+shift, this.point_FRT[2]];
          }
          else{
            this.point_DRT = [this.point_DRT[0]+shift/Math.abs(slope), this.point_DRT[1]+shift, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift/Math.abs(slope), this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_DLT = [this.point_DLT[0]+shift/Math.abs(slope), this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift/Math.abs(slope), this.point_DLB[1]+shift, this.point_DLB[2]];
          }
        }
      }
    }
    else if(this.axisAangXY>=Math.PI/4){
      var slope = (this.point_FLT[1]-this.point_DLT[1])/(this.point_FLT[0]-this.point_DLT[0]);
      if(butId==2){
        if(slope<1 && slope>=0){
          if(this.point_FLT[0]>this.point_DLT[0]){
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]+shift*slope, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]+shift*slope, this.point_FRT[2]];
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]+shift*slope, this.point_FRB[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]+shift*slope, this.point_FLB[2]];
          }
          else{
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]+shift*slope, this.point_DLT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]+shift*slope, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]+shift*slope, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]+shift*slope, this.point_DLB[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FLT[0]>this.point_DLT[0]){
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]-shift*slope, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]-shift*slope, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]-shift*slope, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]-shift*slope, this.point_DLT[2]];
          }
          else if(this.point_FLT[0]==this.point_DLT[0]){
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1], this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1], this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1], this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1], this.point_DLT[2]];
          }
          else{
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]-shift*slope, this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]-shift*slope, this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]-shift*slope, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]-shift*slope, this.point_DLB[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FLT[1]>=this.point_DLT[1]){
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]+shift*Math.abs(slope), this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]+shift*Math.abs(slope), this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]+shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]+shift*Math.abs(slope), this.point_DLT[2]];
          }
          else if(this.point_DLT[0]==this.point_FLT[0]){
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1], this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1], this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1], this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1], this.point_DLB[2]];
          }
          else{
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]+shift*Math.abs(slope), this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]+shift*Math.abs(slope), this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]+shift*Math.abs(slope), this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]+shift*Math.abs(slope), this.point_DLB[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FLT[1]>=this.point_DLT[1]){
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]-shift*Math.abs(slope), this.point_DLT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]-shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]-shift*Math.abs(slope), this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]-shift*Math.abs(slope), this.point_DLB[2]];
          }
          else{
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]-shift*Math.abs(slope), this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]-shift*Math.abs(slope), this.point_FRT[2]];
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]-shift*Math.abs(slope), this.point_FRB[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]-shift*Math.abs(slope), this.point_FLB[2]];
          }
        }
      }
      if(butId==4){
        if(slope<1 && slope>=0){
          if(this.point_FLT[0]>this.point_DLT[0]){     
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]-shift*slope, this.point_DLT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]-shift*slope, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]-shift*slope, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]-shift*slope, this.point_DLB[2]];              
          }
          else{
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]-shift*slope, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]-shift*slope, this.point_FRT[2]];
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]-shift*slope, this.point_FRB[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]-shift*slope, this.point_FLB[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FLT[0]>this.point_DLT[0]){
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]+shift*slope, this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]+shift*slope, this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]+shift*slope, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]+shift*slope, this.point_DLB[2]];
          }
          else if(this.point_FLT[0]==this.point_DLT[0]){
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1], this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1], this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1], this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1], this.point_DLB[2]];
          }
          else{
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]+shift*slope, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]+shift*slope, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]+shift*slope, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]+shift*slope, this.point_DLT[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FLT[1]>=this.point_DLT[1]){
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]-shift*Math.abs(slope), this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]-shift*Math.abs(slope), this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]-shift*Math.abs(slope), this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]-shift*Math.abs(slope), this.point_DLB[2]];
          }
          else if(this.point_DLT[0]==this.point_FLT[0]){
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1], this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1], this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1], this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1], this.point_DLT[2]];
          }
          else{
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]-shift*Math.abs(slope), this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]-shift*Math.abs(slope), this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]-shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]-shift*Math.abs(slope), this.point_DLT[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FLT[1]>=this.point_DLT[1]){
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]+shift*Math.abs(slope), this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]+shift*Math.abs(slope), this.point_FRT[2]];
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]+shift*Math.abs(slope), this.point_FRB[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]+shift*Math.abs(slope), this.point_FLB[2]];
          }
          else{
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]+shift*Math.abs(slope), this.point_DLT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]+shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]+shift*Math.abs(slope), this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]+shift*Math.abs(slope), this.point_DLB[2]];
          }
        }
      }
      if(butId==1){
        if(slope<1 && slope>=0){
          if(slope==0){
            slope = Infinity;
          }
          if(this.point_FLT[0]>this.point_DLT[0]){
            this.point_DLT = [this.point_DLT[0]+shift/slope, this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_DRT = [this.point_DRT[0]+shift/slope, this.point_DRT[1]-shift, this.point_DRT[2]];
            this.point_FLT = [this.point_FLT[0]+shift/slope, this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift/slope, this.point_FRT[1]-shift, this.point_FRT[2]];
          }
          else{
            this.point_FRB = [this.point_FRB[0]+shift/slope, this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_FLB = [this.point_FLB[0]+shift/slope, this.point_FLB[1]-shift, this.point_FLB[2]];
            this.point_DRB = [this.point_DRB[0]+shift/slope, this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift/slope, this.point_DLB[1]-shift, this.point_DLB[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FLT[0]>=this.point_DLT[0]){
            this.point_DRB = [this.point_DRB[0]-shift/slope, this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift/slope, this.point_DLB[1]-shift, this.point_DLB[2]];
            this.point_DRT = [this.point_DRT[0]-shift/slope, this.point_DRT[1]-shift, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift/slope, this.point_DLT[1]-shift, this.point_DLT[2]];
          }
          else{
            this.point_FLT = [this.point_FLT[0]-shift/slope, this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift/slope, this.point_FRT[1]-shift, this.point_FRT[2]];
            this.point_FLB = [this.point_FLB[0]-shift/slope, this.point_FLB[1]-shift, this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]-shift/slope, this.point_FRB[1]-shift, this.point_FRB[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FLT[1]>=this.point_DLT[1]){
            this.point_DRB = [this.point_DRB[0]+shift/Math.abs(slope), this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift/Math.abs(slope), this.point_DLB[1]-shift, this.point_DLB[2]];
            this.point_DRT = [this.point_DRT[0]+shift/Math.abs(slope), this.point_DRT[1]-shift, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift/Math.abs(slope), this.point_DLT[1]-shift, this.point_DLT[2]];
          }
          else{
            this.point_FLT = [this.point_FLT[0]+shift/Math.abs(slope), this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift/Math.abs(slope), this.point_FRT[1]-shift, this.point_FRT[2]];
            this.point_FLB = [this.point_FLB[0]+shift/Math.abs(slope), this.point_FLB[1]-shift, this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]+shift/Math.abs(slope), this.point_FRB[1]-shift, this.point_FRB[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FLT[1]>=this.point_DLT[1]){
            this.point_FRB = [this.point_FRB[0]-shift/Math.abs(slope), this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_FLB = [this.point_FLB[0]-shift/Math.abs(slope), this.point_FLB[1]-shift, this.point_FLB[2]];
            this.point_DRB = [this.point_DRB[0]-shift/Math.abs(slope), this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift/Math.abs(slope), this.point_DLB[1]-shift, this.point_DLB[2]];
          }
          else{
            this.point_DLT = [this.point_DLT[0]-shift/Math.abs(slope), this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_DRT = [this.point_DRT[0]-shift/Math.abs(slope), this.point_DRT[1]-shift, this.point_DRT[2]];
            this.point_FLT = [this.point_FLT[0]-shift/Math.abs(slope), this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift/Math.abs(slope), this.point_FRT[1]-shift, this.point_FRT[2]];
          }
        }
      }
      if(butId==3){
        if(slope<1 && slope>=0){
          if(slope==0){
            slope = Infinity;
          }
          if(this.point_FLT[0]>this.point_DLT[0]){
            this.point_FRB = [this.point_FRB[0]-shift/slope, this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_FLB = [this.point_FLB[0]-shift/slope, this.point_FLB[1]+shift, this.point_FLB[2]];
            this.point_DRB = [this.point_DRB[0]-shift/slope, this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift/slope, this.point_DLB[1]+shift, this.point_DLB[2]];
          }
          else{
            this.point_DLT = [this.point_DLT[0]-shift/slope, this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_DRT = [this.point_DRT[0]-shift/slope, this.point_DRT[1]+shift, this.point_DRT[2]];
            this.point_FLT = [this.point_FLT[0]-shift/slope, this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift/slope, this.point_FRT[1]+shift, this.point_FRT[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FLT[0]>=this.point_DLT[0]){
            this.point_FLT = [this.point_FLT[0]+shift/slope, this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift/slope, this.point_FRT[1]+shift, this.point_FRT[2]];
            this.point_FLB = [this.point_FLB[0]+shift/slope, this.point_FLB[1]+shift, this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]+shift/slope, this.point_FRB[1]+shift, this.point_FRB[2]];
          }
          else{
            this.point_DRB = [this.point_DRB[0]+shift/slope, this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift/slope, this.point_DLB[1]+shift, this.point_DLB[2]];
            this.point_DRT = [this.point_DRT[0]+shift/slope, this.point_DRT[1]+shift, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift/slope, this.point_DLT[1]+shift, this.point_DLT[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FLT[1]>=this.point_DLT[1]){
            this.point_FLT = [this.point_FLT[0]-shift/Math.abs(slope), this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift/Math.abs(slope), this.point_FRT[1]+shift, this.point_FRT[2]];
            this.point_FLB = [this.point_FLB[0]-shift/Math.abs(slope), this.point_FLB[1]+shift, this.point_FLB[2]];
            this.point_FRB = [this.point_FRB[0]-shift/Math.abs(slope), this.point_FRB[1]+shift, this.point_FRB[2]];
          }
          else{
            this.point_DRB = [this.point_DRB[0]-shift/Math.abs(slope), this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift/Math.abs(slope), this.point_DLB[1]+shift, this.point_DLB[2]];
            this.point_DRT = [this.point_DRT[0]-shift/Math.abs(slope), this.point_DRT[1]+shift, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift/Math.abs(slope), this.point_DLT[1]+shift, this.point_DLT[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FLT[1]>=this.point_DLT[1]){
            this.point_DLT = [this.point_DLT[0]+shift/Math.abs(slope), this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_DRT = [this.point_DRT[0]+shift/Math.abs(slope), this.point_DRT[1]+shift, this.point_DRT[2]];
            this.point_FLT = [this.point_FLT[0]+shift/Math.abs(slope), this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift/Math.abs(slope), this.point_FRT[1]+shift, this.point_FRT[2]];
          }
          else{
            this.point_FRB = [this.point_FRB[0]+shift/Math.abs(slope), this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_FLB = [this.point_FLB[0]+shift/Math.abs(slope), this.point_FLB[1]+shift, this.point_FLB[2]];
            this.point_DRB = [this.point_DRB[0]+shift/Math.abs(slope), this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift/Math.abs(slope), this.point_DLB[1]+shift, this.point_DLB[2]];
          }
        }
      }

    }
    else if(this.axisCangXY>=Math.PI/4){
      var slope = (this.point_FRT[1]-this.point_FLT[1])/(this.point_FRT[0]-this.point_FLT[0]);
      if(butId==2){
        if(slope<1 && slope>=0){
          if(this.point_FRT[0]>this.point_FLT[0]){
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]+shift*slope, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]+shift*slope, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]+shift*slope, this.point_DRB[2]];
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]+shift*slope, this.point_FRB[2]];
          }
          else{
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]+shift*slope, this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]+shift*slope, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]+shift*slope, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]+shift*slope, this.point_FLB[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FRT[0]>this.point_FLT[0]){
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]-shift*slope, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]-shift*slope, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]-shift*slope, this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]-shift*slope, this.point_FLT[2]];
          }
          else if(this.point_FRT[0]==this.point_FLT[0]){
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1], this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1], this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1], this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1], this.point_FLT[2]];
          }
          else{
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]-shift*slope, this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]-shift*slope, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]-shift*slope, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]-shift*slope, this.point_FLB[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FRT[1]>=this.point_FLT[1]){
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]+shift*Math.abs(slope), this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]+shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]+shift*Math.abs(slope), this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]+shift*Math.abs(slope), this.point_FLT[2]];
          }
          else if(this.point_FLT[0]==this.point_FRT[0]){
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1], this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1], this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1], this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1], this.point_FLB[2]];
          }
          else{
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]+shift*Math.abs(slope), this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]+shift*Math.abs(slope), this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]+shift*Math.abs(slope), this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]+shift*Math.abs(slope), this.point_FLB[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FRT[1]>=this.point_FLT[1]){
            this.point_FLT = [this.point_FLT[0]+shift, this.point_FLT[1]-shift*Math.abs(slope), this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]+shift, this.point_DLT[1]-shift*Math.abs(slope), this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]+shift, this.point_DLB[1]-shift*Math.abs(slope), this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]+shift, this.point_FLB[1]-shift*Math.abs(slope), this.point_FLB[2]];
          }
          else{
            this.point_FRT = [this.point_FRT[0]+shift, this.point_FRT[1]-shift*Math.abs(slope), this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift, this.point_DRT[1]-shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]+shift, this.point_DRB[1]-shift*Math.abs(slope), this.point_DRB[2]];
            this.point_FRB = [this.point_FRB[0]+shift, this.point_FRB[1]-shift*Math.abs(slope), this.point_FRB[2]];
          }
        }
      }
      if(butId==4){
        if(slope<1 && slope>=0){
          if(this.point_FRT[0]>this.point_FLT[0]){     
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]-shift*slope, this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]-shift*slope, this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]-shift*slope, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]-shift*slope, this.point_FLB[2]];              
          }
          else{
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]-shift*slope, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]-shift*slope, this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]-shift*slope, this.point_DRB[2]];
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]-shift*slope, this.point_FRB[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FRT[0]>this.point_FLT[0]){
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]+shift*slope, this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]+shift*slope, this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]+shift*slope, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]+shift*slope, this.point_FLB[2]];
          }
          else if(this.point_FRT[0]==this.point_FLT[0]){
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1], this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1], this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1], this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1], this.point_FLB[2]];
          }
          else{
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]+shift*slope, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]+shift*slope, this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]+shift*slope, this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]+shift*slope, this.point_FLT[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FRT[1]>=this.point_FLT[1]){
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]-shift*Math.abs(slope), this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]-shift*Math.abs(slope), this.point_DRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]-shift*Math.abs(slope), this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]-shift*Math.abs(slope), this.point_FLB[2]];
          }
          else if(this.point_FLT[0]==this.point_FRT[0]){
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1], this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1], this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1], this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1], this.point_FLT[2]];
          }
          else{
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]-shift*Math.abs(slope), this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]-shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]-shift*Math.abs(slope), this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]-shift*Math.abs(slope), this.point_FLT[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FRT[1]>=this.point_FLT[1]){
            this.point_FRT = [this.point_FRT[0]-shift, this.point_FRT[1]+shift*Math.abs(slope), this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift, this.point_DRT[1]+shift*Math.abs(slope), this.point_DRT[2]];
            this.point_DRB = [this.point_DRB[0]-shift, this.point_DRB[1]+shift*Math.abs(slope), this.point_DRB[2]];
            this.point_FRB = [this.point_FRB[0]-shift, this.point_FRB[1]+shift*Math.abs(slope), this.point_FRB[2]];
          }
          else{
            this.point_FLT = [this.point_FLT[0]-shift, this.point_FLT[1]+shift*Math.abs(slope), this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]-shift, this.point_DLT[1]+shift*Math.abs(slope), this.point_DLT[2]];
            this.point_DLB = [this.point_DLB[0]-shift, this.point_DLB[1]+shift*Math.abs(slope), this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]-shift, this.point_FLB[1]+shift*Math.abs(slope), this.point_FLB[2]];
          }
        }
      }
      if(butId==1){
        if(slope<1 && slope>=0){
          if(slope==0){
            slope = Infinity;
          }
          if(this.point_FRT[0]>this.point_FLT[0]){
            this.point_FLT = [this.point_FLT[0]+shift/slope, this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]+shift/slope, this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift/slope, this.point_FRT[1]-shift, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift/slope, this.point_DRT[1]-shift, this.point_DRT[2]];
          }
          else{
            this.point_DRB = [this.point_DRB[0]+shift/slope, this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_FRB = [this.point_FRB[0]+shift/slope, this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift/slope, this.point_DLB[1]-shift, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]+shift/slope, this.point_FLB[1]-shift, this.point_FLB[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FRT[0]>=this.point_FLT[0]){
            this.point_DLB = [this.point_DLB[0]-shift/slope, this.point_DLB[1]-shift, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]-shift/slope, this.point_FLB[1]-shift, this.point_FLB[2]];
            this.point_DLT = [this.point_DLT[0]-shift/slope, this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]-shift/slope, this.point_FLT[1]-shift, this.point_FLT[2]];
          }
          else{
            this.point_FRT = [this.point_FRT[0]-shift/slope, this.point_FRT[1]-shift, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift/slope, this.point_DRT[1]-shift, this.point_DRT[2]];
            this.point_FRB = [this.point_FRB[0]-shift/slope, this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]-shift/slope, this.point_DRB[1]-shift, this.point_DRB[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FRT[1]>=this.point_FLT[1]){
            this.point_DLB = [this.point_DLB[0]+shift/Math.abs(slope), this.point_DLB[1]-shift, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]+shift/Math.abs(slope), this.point_FLB[1]-shift, this.point_FLB[2]];
            this.point_DLT = [this.point_DLT[0]+shift/Math.abs(slope), this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]+shift/Math.abs(slope), this.point_FLT[1]-shift, this.point_FLT[2]];
          }
          else{
            this.point_FRT = [this.point_FRT[0]+shift/Math.abs(slope), this.point_FRT[1]-shift, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift/Math.abs(slope), this.point_DRT[1]-shift, this.point_DRT[2]];
            this.point_FRB = [this.point_FRB[0]+shift/Math.abs(slope), this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]+shift/Math.abs(slope), this.point_DRB[1]-shift, this.point_DRB[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FRT[1]>=this.point_FLT[1]){
            this.point_DRB = [this.point_DRB[0]-shift/Math.abs(slope), this.point_DRB[1]-shift, this.point_DRB[2]];
            this.point_FRB = [this.point_FRB[0]-shift/Math.abs(slope), this.point_FRB[1]-shift, this.point_FRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift/Math.abs(slope), this.point_DLB[1]-shift, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]-shift/Math.abs(slope), this.point_FLB[1]-shift, this.point_FLB[2]];
          }
          else{
            this.point_FLT = [this.point_FLT[0]-shift/Math.abs(slope), this.point_FLT[1]-shift, this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]-shift/Math.abs(slope), this.point_DLT[1]-shift, this.point_DLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift/Math.abs(slope), this.point_FRT[1]-shift, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift/Math.abs(slope), this.point_DRT[1]-shift, this.point_DRT[2]];
          }
        }
      }
      if(butId==3){
        if(slope<1 && slope>=0){
          if(slope==0){
            slope = Infinity;
          }
          if(this.point_FRT[0]>this.point_FLT[0]){
            this.point_DRB = [this.point_DRB[0]-shift/slope, this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_FRB = [this.point_FRB[0]-shift/slope, this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_DLB = [this.point_DLB[0]-shift/slope, this.point_DLB[1]+shift, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]-shift/slope, this.point_FLB[1]+shift, this.point_FLB[2]];
          }
          else{
            this.point_FLT = [this.point_FLT[0]-shift/slope, this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]-shift/slope, this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_FRT = [this.point_FRT[0]-shift/slope, this.point_FRT[1]+shift, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift/slope, this.point_DRT[1]+shift, this.point_DRT[2]];
          }
        }
        else if(slope>=1){
          if(this.point_FRT[0]>=this.point_FLT[0]){
            this.point_FRT = [this.point_FRT[0]+shift/slope, this.point_FRT[1]+shift, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift/slope, this.point_DRT[1]+shift, this.point_DRT[2]];
            this.point_FRB = [this.point_FRB[0]+shift/slope, this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]+shift/slope, this.point_DRB[1]+shift, this.point_DRB[2]];
          }
          else{
            this.point_DLB = [this.point_DLB[0]+shift/slope, this.point_DLB[1]+shift, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]+shift/slope, this.point_FLB[1]+shift, this.point_FLB[2]];
            this.point_DLT = [this.point_DLT[0]+shift/slope, this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]+shift/slope, this.point_FLT[1]+shift, this.point_FLT[2]];
          }
        }
        else if(slope<=-1){
          if(this.point_FRT[1]>=this.point_FLT[1]){
            this.point_FRT = [this.point_FRT[0]-shift/Math.abs(slope), this.point_FRT[1]+shift, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]-shift/Math.abs(slope), this.point_DRT[1]+shift, this.point_DRT[2]];
            this.point_FRB = [this.point_FRB[0]-shift/Math.abs(slope), this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_DRB = [this.point_DRB[0]-shift/Math.abs(slope), this.point_DRB[1]+shift, this.point_DRB[2]];
          }
          else{
            this.point_DLB = [this.point_DLB[0]-shift/Math.abs(slope), this.point_DLB[1]+shift, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]-shift/Math.abs(slope), this.point_FLB[1]+shift, this.point_FLB[2]];
            this.point_DLT = [this.point_DLT[0]-shift/Math.abs(slope), this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_FLT = [this.point_FLT[0]-shift/Math.abs(slope), this.point_FLT[1]+shift, this.point_FLT[2]];
          }
        }
        else if(slope>-1 && slope<0){
          if(this.point_FRT[1]>=this.point_FLT[1]){
            this.point_FLT = [this.point_FLT[0]+shift/Math.abs(slope), this.point_FLT[1]+shift, this.point_FLT[2]];
            this.point_DLT = [this.point_DLT[0]+shift/Math.abs(slope), this.point_DLT[1]+shift, this.point_DLT[2]];
            this.point_FRT = [this.point_FRT[0]+shift/Math.abs(slope), this.point_FRT[1]+shift, this.point_FRT[2]];
            this.point_DRT = [this.point_DRT[0]+shift/Math.abs(slope), this.point_DRT[1]+shift, this.point_DRT[2]];
          }
          else{
            this.point_DRB = [this.point_DRB[0]+shift/Math.abs(slope), this.point_DRB[1]+shift, this.point_DRB[2]];
            this.point_FRB = [this.point_FRB[0]+shift/Math.abs(slope), this.point_FRB[1]+shift, this.point_FRB[2]];
            this.point_DLB = [this.point_DLB[0]+shift/Math.abs(slope), this.point_DLB[1]+shift, this.point_DLB[2]];
            this.point_FLB = [this.point_FLB[0]+shift/Math.abs(slope), this.point_FLB[1]+shift, this.point_FLB[2]];
          }
        }
      }

    }

    // this.drawShape();
  }

// ****************************************************************FIND ANGLE
  this.findAngle = function(){
    var axisAmag = Math.sqrt(Math.pow(this.point_FRT[0]-this.point_FLT[0],2) + Math.pow(this.point_FRT[1]-this.point_FLT[1],2) + Math.pow(this.point_FRT[2]-this.point_FLT[2],2));
    var axisBmag = Math.sqrt(Math.pow(this.point_FLB[0]-this.point_FLT[0],2) + Math.pow(this.point_FLB[1]-this.point_FLT[1],2) + Math.pow(this.point_FLB[2]-this.point_FLT[2],2));
    var axisCmag = Math.sqrt(Math.pow(this.point_DLT[0]-this.point_FLT[0],2) + Math.pow(this.point_DLT[1]-this.point_FLT[1],2) + Math.pow(this.point_DLT[2]-this.point_FLT[2],2));
    this.axisAangXY = Math.asin(Math.abs(this.point_FRT[2]-this.point_FLT[2])/axisAmag);
    this.axisBangXY = Math.asin(Math.abs(this.point_FLB[2]-this.point_FLT[2])/axisBmag);
    this.axisCangXY = Math.asin(Math.abs(this.point_DLT[2]-this.point_FLT[2])/axisCmag);
  }
// ****************************************************************Rotate 
  this.rotateShape = function(butId, degAngle){
    var radAngle = degAngle*Math.PI/180;
    var pi = Math.PI;

    var sinShift = Math.sin(radAngle);
    var cosShift = Math.cos(radAngle);

    if(butId==1){ //About Z axis
      // context.clearRect(this.positionPoint[0], this.positionPoint[1], this.height, this.width);
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

        
    }
    if(butId==2){ //About X axis
    // context.clearRect(this.positionPoint[0], this.positionPoint[1], this.height, this.width);
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

    }
    if(butId==3){ //About Y axis
      // this.positionPoint[0] = this.point_centroidY[0]+(this.positionPoint[0]-this.point_centroidY[0])*cosShift - (this.positionPoint[2]-this.point_centroidY[2])*sinShift;
      // this.positionPoint[2] = this.point_centroidY[2]+(this.positionPoint[2]-this.point_centroidY[2])*cosShift + (this.positionPoint[0]-this.point_centroidY[0])*sinShift;  
      // context.clearRect(this.positionPoint[0], this.positionPoint[1], this.height, this.width);
      this.point_FLT = [ this.point_centroidY[0]+(this.point_FLT[0]-this.point_centroidY[0])*cosShift - (this.point_FLT[2]-this.point_centroidY[2])*sinShift, this.point_FLT[1],  this.point_centroidY[2]+(this.point_FLT[2]-this.point_centroidY[2])*cosShift + (this.point_FLT[0]-this.point_centroidY[0])*sinShift];
      this.point_DLT = [ this.point_centroidY[0]+(this.point_DLT[0]-this.point_centroidY[0])*cosShift - (this.point_DLT[2]-this.point_centroidY[2])*sinShift, this.point_DLT[1],  this.point_centroidY[2]+(this.point_DLT[2]-this.point_centroidY[2])*cosShift + (this.point_DLT[0]-this.point_centroidY[0])*sinShift];
      this.point_FRT = [ this.point_centroidY[0]+(this.point_FRT[0]-this.point_centroidY[0])*cosShift - (this.point_FRT[2]-this.point_centroidY[2])*sinShift, this.point_FRT[1],  this.point_centroidY[2]+(this.point_FRT[2]-this.point_centroidY[2])*cosShift + (this.point_FRT[0]-this.point_centroidY[0])*sinShift];
      this.point_DRT = [ this.point_centroidY[0]+(this.point_DRT[0]-this.point_centroidY[0])*cosShift - (this.point_DRT[2]-this.point_centroidY[2])*sinShift, this.point_DRT[1],  this.point_centroidY[2]+(this.point_DRT[2]-this.point_centroidY[2])*cosShift + (this.point_DRT[0]-this.point_centroidY[0])*sinShift];
      this.point_FLB = [ this.point_centroidY[0]+(this.point_FLB[0]-this.point_centroidY[0])*cosShift - (this.point_FLB[2]-this.point_centroidY[2])*sinShift, this.point_FLB[1],  this.point_centroidY[2]+(this.point_FLB[2]-this.point_centroidY[2])*cosShift + (this.point_FLB[0]-this.point_centroidY[0])*sinShift];
      this.point_DLB = [ this.point_centroidY[0]+(this.point_DLB[0]-this.point_centroidY[0])*cosShift - (this.point_DLB[2]-this.point_centroidY[2])*sinShift, this.point_DLB[1],  this.point_centroidY[2]+(this.point_DLB[2]-this.point_centroidY[2])*cosShift + (this.point_DLB[0]-this.point_centroidY[0])*sinShift];
      this.point_FRB = [ this.point_centroidY[0]+(this.point_FRB[0]-this.point_centroidY[0])*cosShift - (this.point_FRB[2]-this.point_centroidY[2])*sinShift, this.point_FRB[1],  this.point_centroidY[2]+(this.point_FRB[2]-this.point_centroidY[2])*cosShift + (this.point_FRB[0]-this.point_centroidY[0])*sinShift];
      this.point_DRB = [ this.point_centroidY[0]+(this.point_DRB[0]-this.point_centroidY[0])*cosShift - (this.point_DRB[2]-this.point_centroidY[2])*sinShift, this.point_DRB[1],  this.point_centroidY[2]+(this.point_DRB[2]-this.point_centroidY[2])*cosShift + (this.point_DRB[0]-this.point_centroidY[0])*sinShift];
    }
    this.findAngle();
    
  }

  // this.rotateShapeAbtZ = function(radAngle){
  //   var pi = Math.PI;

  //   var sinShift = Math.sin(radAngle);
  //   var cosShift = Math.cos(radAngle);
  // }

  // this.rotateShapeAbtX = function(radAngle){
  //   var pi = Math.PI;
    
  //   var sinShift = Math.sin(radAngle);
  //   var cosShift = Math.cos(radAngle);
    
  //   this.drawShape();
    
  // }

// ****************************************************************Move or shift
  this.moveShape = function(xShift, yShift){
    
    this.point_FLT = [this.point_FLT[0] + xShift, this.point_FLT[1] + yShift, this.point_FLT[2]];
    this.point_FRT = [this.point_FRT[0] + xShift, this.point_FRT[1] + yShift, this.point_FRT[2]];
    this.point_FLB = [this.point_FLB[0] + xShift, this.point_FLB[1] + yShift, this.point_FLB[2]];
    this.point_FRB = [this.point_FRB[0] + xShift, this.point_FRB[1] + yShift, this.point_FRB[2]];
    this.point_DLT = [this.point_DLT[0] + xShift, this.point_DLT[1] + yShift, this.point_DLT[2]];
    this.point_DRT = [this.point_DRT[0] + xShift, this.point_DRT[1] + yShift, this.point_DRT[2]];
    this.point_DLB = [this.point_DLB[0] + xShift, this.point_DLB[1] + yShift, this.point_DLB[2]];
    this.point_DRB = [this.point_DRB[0] + xShift, this.point_DRB[1] + yShift, this.point_DRB[2]];
    // this.drawShape();
  }

// ***********************************************Resize********

  this.resizeCube = function(){
    // context.clearRect(0, 0 , 400, 400);
    var resizeFactor = 40;

    this.point_FLT = [this.point_FLT[0], this.point_FLT[1]-resizeFactor, this.point_FLT[2]+resizeFactor];
    this.point_FRT = [this.point_FRT[0]+resizeFactor, this.point_FRT[1]-resizeFactor, this.point_FRT[2]+resizeFactor];
    // this.point_FLB = [this.point_FLB[0]+resizeFactor, this.point_FLB[1]+resizeFactor, this.point_FLB[2]+resizeFactor];
    this.point_FRB = [this.point_FRB[0]+resizeFactor, this.point_FRB[1], this.point_FRB[2]+resizeFactor];
    this.point_DLT = [this.point_DLT[0], this.point_DLT[1]-resizeFactor, this.point_DLT[2]+resizeFactor];
    this.point_DRT = [this.point_DRT[0]+resizeFactor, this.point_DRT[1]-resizeFactor, this.point_DRT[2]+resizeFactor];
    // this.point_DLB = [this.point_DLB[0]+resizeFactor, this.point_DLB[1]+resizeFactor, this.point_DLB[2]+resizeFactor];
    this.point_DRB = [this.point_DRB[0]+resizeFactor, this.point_DRB[1], this.point_DRB[2]+resizeFactor];

    this.drawShape();
  }
// *************************************************************  
  this.isInside = function(pointX, pointY){
    var countHit = 0;
    
    context.beginPath();
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    context.lineTo(this.point_DLT[0] , this.point_DLT[1]);
    context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
    context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    if(context.isPointInPath(pointX, pointY)){
      countHit++;
    }
    
    context.beginPath();
    context.lineTo(this.point_FLT[0] , this.point_FLT[1]);
    context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
    context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
    context.lineTo(this.point_FLT[0] , this.point_FLT[1]);
    if(context.isPointInPath(pointX, pointY)){
      countHit++;
    }
   
    context.beginPath();
    context.moveTo(this.point_FRT[0] , this.point_FRT[1]);
    context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
    context.lineTo(this.point_DRB[0] , this.point_DRB[1]); 
    context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
    if(context.isPointInPath(pointX, pointY)){
      countHit++;
    }
   
    context.beginPath();
    context.moveTo(this.point_DLT[0] , this.point_DLT[1]);
    context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
    context.lineTo(this.point_DRB[0] , this.point_DRB[1]);
    context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
    context.moveTo(this.point_DLT[0] , this.point_DLT[1]);
    if(context.isPointInPath(pointX, pointY)){
      countHit++;
    }
    
    context.beginPath();
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
    context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
    context.lineTo(this.point_DLT[0] , this.point_DLT[1]);
    context.lineTo(this.point_FLT[0] , this.point_FLT[1]);
    if(context.isPointInPath(pointX, pointY)){
      countHit++;
    }
    
    context.beginPath();
    context.moveTo(this.point_FLB[0] , this.point_FLB[1]);
    context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    context.lineTo(this.point_DRB[0] , this.point_DRB[1]);
    context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
    context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
    
    if(context.isPointInPath(pointX, pointY)){
      countHit++;
    }

    if(countHit>0){
      return true;
    }
    else{
      return false;
    }
  }

  this.getBoundingRect = function(){
    var vertices = [this.point_FLT, this.point_FRT, this.point_FLB, this.point_FRB,
                    this.point_DLT, this.point_DRT, this.point_DLB, this.point_DRB];
    var maxXpoint = 0;
    var minXpoint = 1000;

    var maxYpoint = 0;
    var minYpoint = 1000;
    for(var i=0; i<8; ++i){
      if(vertices[i][0]>maxXpoint){
        maxXpoint = vertices[i][0];
      }
      if(vertices[i][0]<minXpoint){
        minXpoint = vertices[i][0];
      }
      if(vertices[i][1]>maxYpoint){
        maxYpoint = vertices[i][1];
      }
      if(vertices[i][1]<minYpoint){
        minYpoint = vertices[i][1];
      }
    }
    this.boundingRect = [minXpoint, minYpoint, maxXpoint-minXpoint, maxYpoint-minYpoint];
    return this.boundingRect;
  }
}