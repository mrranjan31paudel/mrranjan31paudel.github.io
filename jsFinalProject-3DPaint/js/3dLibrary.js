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

  this.core_pointXZ = [positionPoint[0] + cubeWidth/2, positionPoint[1], positionPoint[2] + cubeDepth/2];
  this.core_pointXY = [positionPoint[0] + cubeWidth/2, positionPoint[1] + cubeHeight/2, positionPoint[2]];
  this.core_pointYZ = [positionPoint[0], positionPoint[1] + cubeHeight/2, positionPoint[2] + cubeDepth/2];

  this.core_point = [positionPoint[0] + cubeWidth/2, positionPoint[1] + cubeHeight/2, positionPoint[2] + cubeDepth/2];

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
    // context.strokeStyle = context.setLineDash([]);
    context.beginPath();
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    context.lineTo(this.point_DLT[0] , this.point_DLT[1]);
    context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
    context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    
    context.fill();
    context.beginPath();
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
    context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
    context.lineTo(this.point_FLT[0] , this.point_FLT[1]);
    
    context.fill();
    context.beginPath();
    context.moveTo(this.point_FRT[0] , this.point_FRT[1]);
    context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
    context.lineTo(this.point_DRB[0] , this.point_DRB[1]); 
    context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
    
    context.fill();
    context.beginPath();
    context.moveTo(this.point_DLT[0] , this.point_DLT[1]);
    context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
    context.lineTo(this.point_DRB[0] , this.point_DRB[1]);
    context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
    context.moveTo(this.point_DLT[0] , this.point_DLT[1]);
    
    context.fill();
    context.beginPath();
    context.moveTo(this.point_FLT[0] , this.point_FLT[1]);
    context.lineTo(this.point_FRT[0] , this.point_FRT[1]);
    context.lineTo(this.point_DRT[0] , this.point_DRT[1]);
    context.lineTo(this.point_DLT[0] , this.point_DLT[1]);
    context.lineTo(this.point_FLT[0] , this.point_FLT[1]);
    
    context.fill();
    context.beginPath();
    context.moveTo(this.point_FLB[0] , this.point_FLB[1]);
    context.lineTo(this.point_FRB[0] , this.point_FRB[1]);
    context.lineTo(this.point_DRB[0] , this.point_DRB[1]);
    context.lineTo(this.point_DLB[0] , this.point_DLB[1]);
    context.lineTo(this.point_FLB[0] , this.point_FLB[1]);
    context.closePath();
    
    context.fill();
    
  }
// ***********************************************************Stretch***********
  this.stretchShape = function(butId, shift){
    var ang45 = Math.PI/4;
    if(Math.abs(this.axisBangXY)>=Math.abs(this.axisAangXY) && Math.abs(this.axisBangXY)>=Math.abs(this.axisCangXY)){
      var slopeA = (this.point_FRT[1]-this.point_FLT[1])/(this.point_FRT[0]-this.point_FLT[0]);
      var slopeC = (this.point_DLT[1]-this.point_FLT[1])/(this.point_DLT[0]-this.point_FLT[0]);

      var slopeXz = -(this.point_FLB[2]-this.point_FLT[2])/(this.point_FLB[0]-this.point_FLT[0]);
      var slopeYz = -(this.point_FLB[2]-this.point_FLT[2])/(this.point_FLB[1]-this.point_FLT[1]);    
      
      var angA = Math.atan(Math.abs(slopeA));
      var angC = Math.atan(Math.abs(slopeC));

      if(butId==1){  //OK
        if(Math.abs(slopeYz) == 0){
          slopeYz = Infinity;
        }
        if(angA<=ang45 && this.point_FLT[1]>=this.point_DLT[1]){
          if(slopeC==0){
            slopeC=Infinity;
          }
          this.point_DLT = [this.point_DLT[0] - shift/slopeC , this.point_DLT[1] - shift, this.point_DLT[2]- shift/slopeYz];
          this.point_DLB = [this.point_DLB[0] - shift/slopeC , this.point_DLB[1] - shift, this.point_DLB[2]- shift/slopeYz];
          this.point_DRT = [this.point_DRT[0] - shift/slopeC , this.point_DRT[1] - shift, this.point_DRT[2]- shift/slopeYz];
          this.point_DRB = [this.point_DRB[0] - shift/slopeC , this.point_DRB[1] - shift, this.point_DRB[2]- shift/slopeYz];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeC, this.core_point[1] - 0.5*shift, this.core_point[2]- 0.5*shift/slopeYz];
        }
        else if(angA<=ang45 && this.point_FLT[1]<this.point_DLT[1]){
          this.point_FLT = [this.point_FLT[0] - shift/slopeC , this.point_FLT[1] - shift,this.point_FLT[2] - shift/slopeYz ];
          this.point_FLB = [this.point_FLB[0] - shift/slopeC , this.point_FLB[1] - shift,this.point_FLB[2] - shift/slopeYz ];
          this.point_FRT = [this.point_FRT[0] - shift/slopeC , this.point_FRT[1] - shift,this.point_FRT[2] - shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] - shift/slopeC , this.point_FRB[1] - shift,this.point_FRB[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeC, this.core_point[1] - 0.5*shift, this.core_point[2]- 0.5*shift/slopeYz];
        }
        else if(angC<=ang45 && this.point_FLT[1]>=this.point_FRT[1]){
          if(slopeA==0){
            slopeA=Infinity;
          }
          this.point_FRT = [this.point_FRT[0] - shift/slopeA, this.point_FRT[1] - shift,this.point_FRT[2] - shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] - shift/slopeA, this.point_DRT[1] - shift,this.point_DRT[2] - shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] - shift/slopeA, this.point_FRB[1] - shift,this.point_FRB[2] - shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] - shift/slopeA, this.point_DRB[1] - shift,this.point_DRB[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeA, this.core_point[1] - 0.5*shift, this.core_point[2]- 0.5*shift/slopeYz];
        }
        else if(angC<=ang45 && this.point_FLT[1]<this.point_FRT[1]){
          this.point_FLT = [this.point_FLT[0] - shift/slopeA, this.point_FLT[1] - shift,this.point_FLT[2] - shift/slopeYz ];
          this.point_DLT = [this.point_DLT[0] - shift/slopeA, this.point_DLT[1] - shift,this.point_DLT[2] - shift/slopeYz ];
          this.point_FLB = [this.point_FLB[0] - shift/slopeA, this.point_FLB[1] - shift,this.point_FLB[2] - shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] - shift/slopeA, this.point_DLB[1] - shift,this.point_DLB[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeA, this.core_point[1] - 0.5*shift, this.core_point[2]- 0.5*shift/slopeYz];
        }
      }
      else if(butId==2){  //OK
        if(Math.abs(slopeXz) == 0){
          slopeXz = Infinity;
        }
        if(angA<=ang45 && this.point_FLT[0]>=this.point_FRT[0]){
          if(slopeA==Infinity){
            slopeA=0;
          }
          this.point_FLT = [this.point_FLT[0] + shift, this.point_FLT[1] + shift*slopeA,this.point_FLT[2] + shift/slopeXz ];
          this.point_DLT = [this.point_DLT[0] + shift, this.point_DLT[1] + shift*slopeA,this.point_DLT[2] + shift/slopeXz ];
          this.point_FLB = [this.point_FLB[0] + shift, this.point_FLB[1] + shift*slopeA,this.point_FLB[2] + shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] + shift, this.point_DLB[1] + shift*slopeA,this.point_DLB[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeA, this.core_point[2] + 0.5*shift/slopeXz];
        }
        else if(angA<=ang45 && this.point_FLT[0]<this.point_FRT[0]){
          this.point_FRT = [this.point_FRT[0] + shift, this.point_FRT[1] + shift*slopeA,this.point_FRT[2] + shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] + shift, this.point_DRT[1] + shift*slopeA,this.point_DRT[2] + shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] + shift, this.point_FRB[1] + shift*slopeA,this.point_FRB[2] + shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] + shift, this.point_DRB[1] + shift*slopeA,this.point_DRB[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeA, this.core_point[2] + 0.5*shift/slopeXz];
          
        }
        else if(angC<=ang45 && this.point_FLT[0]>=this.point_DLT[0]){
          if(slopeC==Infinity){
            slopeC=0;
          }
          this.point_FLT = [this.point_FLT[0] + shift , this.point_FLT[1] + shift*slopeC,this.point_FLT[2] + shift/slopeXz ];
          this.point_FLB = [this.point_FLB[0] + shift , this.point_FLB[1] + shift*slopeC,this.point_FLB[2] + shift/slopeXz ];
          this.point_FRT = [this.point_FRT[0] + shift , this.point_FRT[1] + shift*slopeC,this.point_FRT[2] + shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] + shift , this.point_FRB[1] + shift*slopeC,this.point_FRB[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeC, this.core_point[2] + 0.5*shift/slopeXz];
        }
        else if(angC<=ang45 && this.point_FLT[0]<this.point_DLT[0]){
          this.point_DLT = [this.point_DLT[0] + shift , this.point_DLT[1] + shift*slopeC, this.point_DLT[2] + shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] + shift , this.point_DLB[1] + shift*slopeC, this.point_DLB[2] + shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] + shift , this.point_DRT[1] + shift*slopeC, this.point_DRT[2] + shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] + shift , this.point_DRB[1] + shift*slopeC, this.point_DRB[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeC, this.core_point[2] + 0.5*shift/slopeXz];
        }
      }
      else if(butId==3){  //OK
        if(Math.abs(slopeYz) == 0){
          slopeYz = Infinity;
        }
        if(angA<=ang45 && this.point_FLT[1]>=this.point_DLT[1]){
          if(slopeC==0){
            slopeC=Infinity;
          }
          this.point_FLT = [this.point_FLT[0] + shift/slopeC , this.point_FLT[1] + shift,this.point_FLT[2] + shift/slopeYz ];
          this.point_FLB = [this.point_FLB[0] + shift/slopeC , this.point_FLB[1] + shift,this.point_FLB[2] + shift/slopeYz ];
          this.point_FRT = [this.point_FRT[0] + shift/slopeC , this.point_FRT[1] + shift,this.point_FRT[2] + shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] + shift/slopeC , this.point_FRB[1] + shift,this.point_FRB[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeC, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
        else if(angA<=ang45 && this.point_FLT[1]<this.point_DLT[1]){
          this.point_DLT = [this.point_DLT[0] + shift/slopeC , this.point_DLT[1] + shift,this.point_DLT[2] + shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] + shift/slopeC , this.point_DLB[1] + shift,this.point_DLB[2] + shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] + shift/slopeC , this.point_DRT[1] + shift,this.point_DRT[2] + shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] + shift/slopeC , this.point_DRB[1] + shift,this.point_DRB[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeC, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
        else if(angC<=ang45 && this.point_FLT[1]>=this.point_FRT[1]){
          if(slopeA==0){
            slopeA=Infinity;
          }
          this.point_FLT = [this.point_FLT[0] + shift/slopeA, this.point_FLT[1] + shift,this.point_FLT[2] + shift/slopeYz ];
          this.point_DLT = [this.point_DLT[0] + shift/slopeA, this.point_DLT[1] + shift,this.point_DLT[2] + shift/slopeYz ];
          this.point_FLB = [this.point_FLB[0] + shift/slopeA, this.point_FLB[1] + shift,this.point_FLB[2] + shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] + shift/slopeA, this.point_DLB[1] + shift,this.point_DLB[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeA, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
        else if(angC<=ang45 && this.point_FLT[1]<this.point_FRT[1]){
          this.point_FRT = [this.point_FRT[0] + shift/slopeA, this.point_FRT[1] + shift,this.point_FRT[2] + shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] + shift/slopeA, this.point_DRT[1] + shift,this.point_DRT[2] + shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] + shift/slopeA, this.point_FRB[1] + shift,this.point_FRB[2] + shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] + shift/slopeA, this.point_DRB[1] + shift,this.point_DRB[2] + shift/slopeYz ];  

          this.core_point = [this.core_point[0] + 0.5*shift/slopeA, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
      }
      else if(butId==4){  //OK
        if(Math.abs(slopeXz) == 0){
          slopeXz = Infinity;
        }
        if(angA<=ang45 && this.point_FLT[0]>=this.point_FRT[0]){
          if(slopeA==Infinity){
            slopeA=0;
          }
          this.point_FRT = [this.point_FRT[0] - shift, this.point_FRT[1] - shift*slopeA,this.point_FRT[2] - shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] - shift, this.point_DRT[1] - shift*slopeA,this.point_DRT[2] - shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] - shift, this.point_FRB[1] - shift*slopeA,this.point_FRB[2] - shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] - shift, this.point_DRB[1] - shift*slopeA,this.point_DRB[2] - shift/slopeXz ];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeA, this.core_point[2] - 0.5*shift/slopeXz];
        }
        else if(angA<=ang45 && this.point_FLT[0]<this.point_FRT[0]){
          this.point_FLT = [this.point_FLT[0] - shift, this.point_FLT[1] - shift*slopeA,this.point_FLT[2] - shift/slopeXz ];
          this.point_DLT = [this.point_DLT[0] - shift, this.point_DLT[1] - shift*slopeA,this.point_DLT[2] - shift/slopeXz ];
          this.point_FLB = [this.point_FLB[0] - shift, this.point_FLB[1] - shift*slopeA,this.point_FLB[2] - shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] - shift, this.point_DLB[1] - shift*slopeA,this.point_DLB[2] - shift/slopeXz ];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeA, this.core_point[2] - 0.5*shift/slopeXz];
        }
        else if(angC<=ang45 && this.point_FLT[0]>=this.point_DLT[0]){
          if(slopeC==Infinity){
            slopeC=0;
          }
          this.point_DLT = [this.point_DLT[0] - shift , this.point_DLT[1] - shift*slopeC, this.point_DLT[2] - shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] - shift , this.point_DLB[1] - shift*slopeC, this.point_DLB[2] - shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] - shift , this.point_DRT[1] - shift*slopeC, this.point_DRT[2] - shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] - shift , this.point_DRB[1] - shift*slopeC, this.point_DRB[2] - shift/slopeXz ];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeC, this.core_point[2] - 0.5*shift/slopeXz];
        }
        else if(angC<=ang45 && this.point_FLT[0]<this.point_DLT[0]){
          this.point_FLT = [this.point_FLT[0] - shift , this.point_FLT[1] - shift*slopeC,this.point_FLT[2] - shift/slopeXz];
          this.point_FLB = [this.point_FLB[0] - shift , this.point_FLB[1] - shift*slopeC,this.point_FLB[2] - shift/slopeXz];
          this.point_FRT = [this.point_FRT[0] - shift , this.point_FRT[1] - shift*slopeC,this.point_FRT[2] - shift/slopeXz];
          this.point_FRB = [this.point_FRB[0] - shift , this.point_FRB[1] - shift*slopeC,this.point_FRB[2] - shift/slopeXz];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeC, this.core_point[2] - 0.5*shift/slopeXz];
        }
      }
    }
    else if(Math.abs(this.axisAangXY)>=Math.abs(this.axisBangXY) && Math.abs(this.axisAangXY)>=Math.abs(this.axisCangXY)){
      var slopeB = (this.point_FLB[1]-this.point_FLT[1])/(this.point_FLB[0]-this.point_FLT[0]);
      var slopeC = (this.point_DLT[1]-this.point_FLT[1])/(this.point_DLT[0]-this.point_FLT[0]);

      var slopeXz = -(this.point_FRT[2]-this.point_FLT[2])/(this.point_FRT[0]-this.point_FLT[0]);
      var slopeYz = -(this.point_FRT[2]-this.point_FLT[2])/(this.point_FRT[1]-this.point_FLT[1]);
      
      var angB = Math.atan(Math.abs(slopeB));
      var angC = Math.atan(Math.abs(slopeC));

      if(butId==1){
        if(Math.abs(slopeYz) == 0){
          slopeYz = Infinity;
        }
        if(angB<=ang45 && this.point_FLT[1]>=this.point_DLT[1]){
          if(slopeC==0){
            slopeC=Infinity;
          }
          this.point_DLT = [this.point_DLT[0] - shift/slopeC , this.point_DLT[1] - shift,this.point_DLT[2] - shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] - shift/slopeC , this.point_DLB[1] - shift,this.point_DLB[2] - shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] - shift/slopeC , this.point_DRT[1] - shift,this.point_DRT[2] - shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] - shift/slopeC , this.point_DRB[1] - shift,this.point_DRB[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeC, this.core_point[1] - 0.5*shift, this.core_point[2] - 0.5*shift/slopeYz];
        }
        else if(angB<=ang45 && this.point_FLT[1]<this.point_DLT[1]){
          this.point_FLT = [this.point_FLT[0] - shift/slopeC , this.point_FLT[1] - shift,this.point_FLT[2] - shift/slopeYz ];
          this.point_FLB = [this.point_FLB[0] - shift/slopeC , this.point_FLB[1] - shift,this.point_FLB[2] - shift/slopeYz ];
          this.point_FRT = [this.point_FRT[0] - shift/slopeC , this.point_FRT[1] - shift,this.point_FRT[2] - shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] - shift/slopeC , this.point_FRB[1] - shift,this.point_FRB[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeC, this.core_point[1] - 0.5*shift, this.core_point[2] - 0.5*shift/slopeYz];
        }
        else if(angC<=ang45 && this.point_FLT[1]>=this.point_FLB[1]){
          if(slopeB==0){
            slopeB=Infinity;
          }
          this.point_FLB = [this.point_FLB[0] - shift/slopeB, this.point_FLB[1] - shift,this.point_FLB[2] - shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] - shift/slopeB, this.point_DLB[1] - shift,this.point_DLB[2] - shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] - shift/slopeB, this.point_FRB[1] - shift,this.point_FRB[2] - shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] - shift/slopeB, this.point_DRB[1] - shift,this.point_DRB[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeB, this.core_point[1] - 0.5*shift, this.core_point[2] - 0.5*shift/slopeYz];
        }
        else if(angC<=ang45 && this.point_FLT[1]<this.point_FLB[1]){
          this.point_FLT = [this.point_FLT[0] - shift/slopeB, this.point_FLT[1] - shift,this.point_FLT[2] - shift/slopeYz ];
          this.point_DLT = [this.point_DLT[0] - shift/slopeB, this.point_DLT[1] - shift,this.point_DLT[2] - shift/slopeYz ];
          this.point_FRT = [this.point_FRT[0] - shift/slopeB, this.point_FRT[1] - shift,this.point_FRT[2] - shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] - shift/slopeB, this.point_DRT[1] - shift,this.point_DRT[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeB, this.core_point[1] - 0.5*shift, this.core_point[2] - 0.5*shift/slopeYz];
        }
      }
      else if(butId==2){
        if(Math.abs(slopeXz) == 0){
          slopeXz = Infinity;
        }
        if(angB<=ang45 && this.point_FLT[0]>=this.point_FLB[0]){
          if(slopeB==Infinity){
            slopeB=0;
          }
          this.point_FLT = [this.point_FLT[0] + shift, this.point_FLT[1] + shift*slopeB,this.point_FLT[2] + shift/slopeXz ];
          this.point_DLT = [this.point_DLT[0] + shift, this.point_DLT[1] + shift*slopeB,this.point_DLT[2] + shift/slopeXz ];
          this.point_FRT = [this.point_FRT[0] + shift, this.point_FRT[1] + shift*slopeB,this.point_FRT[2] + shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] + shift, this.point_DRT[1] + shift*slopeB,this.point_DRT[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeB, this.core_point[2] + 0.5*shift/slopeXz];
        }
        else if(angB<=ang45 && this.point_FLT[0]<this.point_FLB[0]){
          this.point_FLB = [this.point_FLB[0] + shift, this.point_FLB[1] + shift*slopeB,this.point_FLB[2] + shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] + shift, this.point_DLB[1] + shift*slopeB,this.point_DLB[2] + shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] + shift, this.point_FRB[1] + shift*slopeB,this.point_FRB[2] + shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] + shift, this.point_DRB[1] + shift*slopeB,this.point_DRB[2] + shift/slopeXz ];
          
          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeB, this.core_point[2] + 0.5*shift/slopeXz];
        }
        else if(angC<=ang45 && this.point_FLT[0]>=this.point_DLT[0]){
          if(slopeC==Infinity){
            slopeC=0;
          }
          this.point_FLT = [this.point_FLT[0] + shift , this.point_FLT[1] + shift*slopeC,this.point_FLT[2] + shift/slopeXz ];
          this.point_FLB = [this.point_FLB[0] + shift , this.point_FLB[1] + shift*slopeC,this.point_FLB[2] + shift/slopeXz ];
          this.point_FRT = [this.point_FRT[0] + shift , this.point_FRT[1] + shift*slopeC,this.point_FRT[2] + shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] + shift , this.point_FRB[1] + shift*slopeC,this.point_FRB[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeC, this.core_point[2] + 0.5*shift/slopeXz];
        }
        else if(angC<=ang45 && this.point_FLT[0]<this.point_DLT[0]){
          this.point_DLT = [this.point_DLT[0] + shift , this.point_DLT[1] + shift*slopeC, this.point_DLT[2] + shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] + shift , this.point_DLB[1] + shift*slopeC, this.point_DLB[2] + shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] + shift , this.point_DRT[1] + shift*slopeC, this.point_DRT[2] + shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] + shift , this.point_DRB[1] + shift*slopeC, this.point_DRB[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeC, this.core_point[2] + 0.5*shift/slopeXz];
        }
      }
      else if(butId==3){
        if(Math.abs(slopeYz) == 0){
          slopeYz = Infinity;
        }
        if(angB<=ang45 && this.point_FLT[1]>=this.point_DLT[1]){
          if(slopeC==0){
            slopeC=Infinity;
          }
          this.point_FLT = [this.point_FLT[0] + shift/slopeC , this.point_FLT[1] + shift,this.point_FLT[2] + shift/slopeYz ];
          this.point_FLB = [this.point_FLB[0] + shift/slopeC , this.point_FLB[1] + shift,this.point_FLB[2] + shift/slopeYz ];
          this.point_FRT = [this.point_FRT[0] + shift/slopeC , this.point_FRT[1] + shift,this.point_FRT[2] + shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] + shift/slopeC , this.point_FRB[1] + shift,this.point_FRB[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeC, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
          
        }
        else if(angB<=ang45 && this.point_FLT[1]<this.point_DLT[1]){
          this.point_DLT = [this.point_DLT[0] + shift/slopeC , this.point_DLT[1] + shift,this.point_DLT[2] + shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] + shift/slopeC , this.point_DLB[1] + shift,this.point_DLB[2] + shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] + shift/slopeC , this.point_DRT[1] + shift,this.point_DRT[2] + shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] + shift/slopeC , this.point_DRB[1] + shift,this.point_DRB[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeC, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
        else if(angC<=ang45 && this.point_FLT[1]>=this.point_FLB[1]){
          if(slopeB==0){
            slopeB=Infinity;
          }
          this.point_FLT = [this.point_FLT[0] + shift/slopeB, this.point_FLT[1] + shift,this.point_FLT[2] + shift/slopeYz ];
          this.point_DLT = [this.point_DLT[0] + shift/slopeB, this.point_DLT[1] + shift,this.point_DLT[2] + shift/slopeYz ];
          this.point_FRT = [this.point_FRT[0] + shift/slopeB, this.point_FRT[1] + shift,this.point_FRT[2] + shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] + shift/slopeB, this.point_DRT[1] + shift,this.point_DRT[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeB, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
        else if(angC<=ang45 && this.point_FLT[1]<this.point_FLB[1]){
          this.point_FLB = [this.point_FLB[0] + shift/slopeB, this.point_FLB[1] + shift,this.point_FLB[2] + shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] + shift/slopeB, this.point_DLB[1] + shift,this.point_DLB[2] + shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] + shift/slopeB, this.point_FRB[1] + shift,this.point_FRB[2] + shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] + shift/slopeB, this.point_DRB[1] + shift,this.point_DRB[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeB, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
          
        }
      }
      else if(butId==4){
        if(Math.abs(slopeXz) == 0){
          slopeXz = Infinity;
        }
        if(angB<=ang45 && this.point_FLT[0]>=this.point_FLB[0]){
          if(slopeB==Infinity){
            slopeB=0;
          }
          this.point_FLB = [this.point_FLB[0] - shift, this.point_FLB[1] - shift*slopeB,this.point_FLB[2] - shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] - shift, this.point_DLB[1] - shift*slopeB,this.point_DLB[2] - shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] - shift, this.point_FRB[1] - shift*slopeB,this.point_FRB[2] - shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] - shift, this.point_DRB[1] - shift*slopeB,this.point_DRB[2] - shift/slopeXz ];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeB, this.core_point[2] - 0.5*shift/slopeXz];
          
        }
        else if(angB<=ang45 && this.point_FLT[0]<this.point_FLB[0]){
          this.point_FLT = [this.point_FLT[0] - shift, this.point_FLT[1] - shift*slopeB,this.point_FLT[2] - shift/slopeXz ];
          this.point_DLT = [this.point_DLT[0] - shift, this.point_DLT[1] - shift*slopeB,this.point_DLT[2] - shift/slopeXz ];
          this.point_FRT = [this.point_FRT[0] - shift, this.point_FRT[1] - shift*slopeB,this.point_FRT[2] - shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] - shift, this.point_DRT[1] - shift*slopeB,this.point_DRT[2] - shift/slopeXz ];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeB, this.core_point[2] - 0.5*shift/slopeXz];
        }
        else if(angC<=ang45 && this.point_FLT[0]>=this.point_DLT[0]){
          if(slopeC==Infinity){
            slopeC=0;
          }
          this.point_DLT = [this.point_DLT[0] - shift , this.point_DLT[1] - shift*slopeC, this.point_DLT[2] - shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] - shift , this.point_DLB[1] - shift*slopeC, this.point_DLB[2] - shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] - shift , this.point_DRT[1] - shift*slopeC, this.point_DRT[2] - shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] - shift , this.point_DRB[1] - shift*slopeC, this.point_DRB[2] - shift/slopeXz ];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeC, this.core_point[2] - 0.5*shift/slopeXz];
        }
        else if(angC<=ang45 && this.point_FLT[0]<this.point_DLT[0]){
          this.point_FLT = [this.point_FLT[0] - shift , this.point_FLT[1] - shift*slopeC,this.point_FLT[2]  - shift/slopeXz];
          this.point_FLB = [this.point_FLB[0] - shift , this.point_FLB[1] - shift*slopeC,this.point_FLB[2]  - shift/slopeXz];
          this.point_FRT = [this.point_FRT[0] - shift , this.point_FRT[1] - shift*slopeC,this.point_FRT[2]  - shift/slopeXz];
          this.point_FRB = [this.point_FRB[0] - shift , this.point_FRB[1] - shift*slopeC,this.point_FRB[2]  - shift/slopeXz]; 

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeC, this.core_point[2] - 0.5*shift/slopeXz];
        }
      }

    }
    else if(Math.abs(this.axisCangXY)>=Math.abs(this.axisBangXY) && Math.abs(this.axisCangXY)>=Math.abs(this.axisAangXY)){
      var slopeA = (this.point_FRT[1]-this.point_FLT[1])/(this.point_FRT[0]-this.point_FLT[0]);
      var slopeB = (this.point_FLB[1]-this.point_FLT[1])/(this.point_FLB[0]-this.point_FLT[0]);

      var slopeXz = -(this.point_DLT[2]-this.point_FLT[2])/(this.point_DLT[0]-this.point_FLT[0]);
      var slopeYz = -(this.point_DLT[2]-this.point_FLT[2])/(this.point_DLT[1]-this.point_FLT[1]);      
      
      var angA = Math.atan(Math.abs(slopeA));
      var angB = Math.atan(Math.abs(slopeB));
      
      if(butId==1){
        if(Math.abs(slopeYz) == 0){
          slopeYz = Infinity;
        }
        if(angA<=ang45 && this.point_FLT[1]>=this.point_FLB[1]){
          if(slopeB==0){
            slopeB=Infinity;
          }
          this.point_FLB = [this.point_FLB[0] - shift/slopeB , this.point_FLB[1] - shift,this.point_FLB[2] - shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] - shift/slopeB , this.point_DLB[1] - shift,this.point_DLB[2] - shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] - shift/slopeB , this.point_FRB[1] - shift,this.point_FRB[2] - shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] - shift/slopeB , this.point_DRB[1] - shift,this.point_DRB[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeB, this.core_point[1] - 0.5*shift, this.core_point[2] - 0.5*shift/slopeYz];
        }
        else if(angA<=ang45 && this.point_FLT[1]<this.point_FLB[1]){
          this.point_FLT = [this.point_FLT[0] - shift/slopeB , this.point_FLT[1] - shift,this.point_FLT[2] - shift/slopeYz ];
          this.point_FRT = [this.point_FRT[0] - shift/slopeB , this.point_FRT[1] - shift,this.point_FRT[2] - shift/slopeYz ];
          this.point_DLT = [this.point_DLT[0] - shift/slopeB , this.point_DLT[1] - shift,this.point_DLT[2] - shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] - shift/slopeB , this.point_DRT[1] - shift,this.point_DRT[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeB, this.core_point[1] - 0.5*shift, this.core_point[2] - 0.5*shift/slopeYz];
        }
        else if(angB<=ang45 && this.point_FLT[1]>=this.point_FRT[1]){
          if(slopeA==0){
            slopeA=Infinity;
          }
          this.point_FRT = [this.point_FRT[0] - shift/slopeA, this.point_FRT[1] - shift,this.point_FRT[2] - shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] - shift/slopeA, this.point_DRT[1] - shift,this.point_DRT[2] - shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] - shift/slopeA, this.point_FRB[1] - shift,this.point_FRB[2] - shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] - shift/slopeA, this.point_DRB[1] - shift,this.point_DRB[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeA, this.core_point[1] - 0.5*shift, this.core_point[2] - 0.5*shift/slopeYz];
        }
        else if(angB<=ang45 && this.point_FLT[1]<this.point_FRT[1]){
          this.point_FLT = [this.point_FLT[0] - shift/slopeA, this.point_FLT[1] - shift,this.point_FLT[2] - shift/slopeYz ];
          this.point_DLT = [this.point_DLT[0] - shift/slopeA, this.point_DLT[1] - shift,this.point_DLT[2] - shift/slopeYz ];
          this.point_FLB = [this.point_FLB[0] - shift/slopeA, this.point_FLB[1] - shift,this.point_FLB[2] - shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] - shift/slopeA, this.point_DLB[1] - shift,this.point_DLB[2] - shift/slopeYz ];

          this.core_point = [this.core_point[0] - 0.5*shift/slopeA, this.core_point[1] - 0.5*shift, this.core_point[2] - 0.5*shift/slopeYz];
        }
      }
      else if(butId==2){
        if(Math.abs(slopeXz) == 0){
          slopeXz = Infinity;
        }
        if(angA<=ang45 && this.point_FLT[0]>=this.point_FRT[0]){
          if(slopeA==Infinity){
            slopeA=0;
          }
          this.point_FLT = [this.point_FLT[0] + shift, this.point_FLT[1] + shift*slopeA,this.point_FLT[2] + shift/slopeXz ];
          this.point_DLT = [this.point_DLT[0] + shift, this.point_DLT[1] + shift*slopeA,this.point_DLT[2] + shift/slopeXz ];
          this.point_FLB = [this.point_FLB[0] + shift, this.point_FLB[1] + shift*slopeA,this.point_FLB[2] + shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] + shift, this.point_DLB[1] + shift*slopeA,this.point_DLB[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeA, this.core_point[2] + 0.5*shift/slopeXz];
        }
        else if(angA<=ang45 && this.point_FLT[0]<this.point_FRT[0]){
          this.point_FRT = [this.point_FRT[0] + shift, this.point_FRT[1] + shift*slopeA,this.point_FRT[2] + shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] + shift, this.point_DRT[1] + shift*slopeA,this.point_DRT[2] + shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] + shift, this.point_FRB[1] + shift*slopeA,this.point_FRB[2] + shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] + shift, this.point_DRB[1] + shift*slopeA,this.point_DRB[2] + shift/slopeXz ];
          
          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeA, this.core_point[2] + 0.5*shift/slopeXz];
        }
        else if(angB<=ang45 && this.point_FLT[0]>=this.point_FLB[0]){
          if(slopeB==Infinity){
            slopeB=0;
          }
          this.point_FLT = [this.point_FLT[0] + shift , this.point_FLT[1] + shift*slopeB, this.point_FLT[2] + shift/slopeXz ];
          this.point_FRT = [this.point_FRT[0] + shift , this.point_FRT[1] + shift*slopeB, this.point_FRT[2] + shift/slopeXz ];
          this.point_DLT = [this.point_DLT[0] + shift , this.point_DLT[1] + shift*slopeB, this.point_DLT[2] + shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] + shift , this.point_DRT[1] + shift*slopeB, this.point_DRT[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeB, this.core_point[2] + 0.5*shift/slopeXz];
        }
        else if(angB<=ang45 && this.point_FLT[0]<this.point_FLB[0]){
          this.point_FLB = [this.point_FLB[0] + shift , this.point_FLB[1] + shift*slopeB, this.point_FLB[2] + shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] + shift , this.point_FRB[1] + shift*slopeB, this.point_FRB[2] + shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] + shift , this.point_DLB[1] + shift*slopeB, this.point_DLB[2] + shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] + shift , this.point_DRB[1] + shift*slopeB, this.point_DRB[2] + shift/slopeXz ];

          this.core_point = [this.core_point[0] + 0.5*shift, this.core_point[1] + 0.5*shift*slopeB, this.core_point[2] + 0.5*shift/slopeXz];
        }
      }
      else if(butId==3){
        if(Math.abs(slopeYz) == 0){
          slopeYz = Infinity;
        }
        if(angA<=ang45 && this.point_FLT[1]>=this.point_FLB[1]){
          if(slopeB==0){
            slopeB=Infinity;
          }
          this.point_FLT = [this.point_FLT[0] + shift/slopeB , this.point_FLT[1] + shift,this.point_FLT[2] + shift/slopeYz ];
          this.point_FRT = [this.point_FRT[0] + shift/slopeB , this.point_FRT[1] + shift,this.point_FRT[2] + shift/slopeYz ];
          this.point_DLT = [this.point_DLT[0] + shift/slopeB , this.point_DLT[1] + shift,this.point_DLT[2] + shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] + shift/slopeB , this.point_DRT[1] + shift,this.point_DRT[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeB, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
        else if(angA<=ang45 && this.point_FLT[1]<this.point_FLB[1]){
          this.point_FLB = [this.point_FLB[0] + shift/slopeB , this.point_FLB[1] + shift,this.point_FLB[2] + shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] + shift/slopeB , this.point_DLB[1] + shift,this.point_DLB[2] + shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] + shift/slopeB , this.point_FRB[1] + shift,this.point_FRB[2] + shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] + shift/slopeB , this.point_DRB[1] + shift,this.point_DRB[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeB, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
        else if(angB<=ang45 && this.point_FLT[1]>=this.point_FRT[1]){
          if(slopeA==0){
            slopeA=Infinity;
          }
          this.point_FLT = [this.point_FLT[0] + shift/slopeA, this.point_FLT[1] + shift,this.point_FLT[2] + shift/slopeYz ];
          this.point_DLT = [this.point_DLT[0] + shift/slopeA, this.point_DLT[1] + shift,this.point_DLT[2] + shift/slopeYz ];
          this.point_FLB = [this.point_FLB[0] + shift/slopeA, this.point_FLB[1] + shift,this.point_FLB[2] + shift/slopeYz ];
          this.point_DLB = [this.point_DLB[0] + shift/slopeA, this.point_DLB[1] + shift,this.point_DLB[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeA, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
        else if(angB<=ang45 && this.point_FLT[1]<this.point_FRT[1]){
          this.point_FRT = [this.point_FRT[0] + shift/slopeA, this.point_FRT[1] + shift,this.point_FRT[2] + shift/slopeYz ];
          this.point_DRT = [this.point_DRT[0] + shift/slopeA, this.point_DRT[1] + shift,this.point_DRT[2] + shift/slopeYz ];
          this.point_FRB = [this.point_FRB[0] + shift/slopeA, this.point_FRB[1] + shift,this.point_FRB[2] + shift/slopeYz ];
          this.point_DRB = [this.point_DRB[0] + shift/slopeA, this.point_DRB[1] + shift,this.point_DRB[2] + shift/slopeYz ];

          this.core_point = [this.core_point[0] + 0.5*shift/slopeA, this.core_point[1] + 0.5*shift, this.core_point[2] + 0.5*shift/slopeYz];
        }
      }
      else if(butId==4){
        if(Math.abs(slopeXz) == 0){
          slopeXz = Infinity;
        }
        if(angA<=ang45 && this.point_FLT[0]>=this.point_FRT[0]){
          if(slopeA==Infinity){
            slopeA=0;
          }
          this.point_FRT = [this.point_FRT[0] - shift, this.point_FRT[1] - shift*slopeA,this.point_FRT[2] - shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] - shift, this.point_DRT[1] - shift*slopeA,this.point_DRT[2] - shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] - shift, this.point_FRB[1] - shift*slopeA,this.point_FRB[2] - shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] - shift, this.point_DRB[1] - shift*slopeA,this.point_DRB[2] - shift/slopeXz ];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeA, this.core_point[2] - 0.5*shift/slopeXz];
        }
        else if(angA<=ang45 && this.point_FLT[0]<this.point_FRT[0]){
          this.point_FLT = [this.point_FLT[0] - shift, this.point_FLT[1] - shift*slopeA,this.point_FLT[2] - shift/slopeXz ];
          this.point_DLT = [this.point_DLT[0] - shift, this.point_DLT[1] - shift*slopeA,this.point_DLT[2] - shift/slopeXz ];
          this.point_FLB = [this.point_FLB[0] - shift, this.point_FLB[1] - shift*slopeA,this.point_FLB[2] - shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] - shift, this.point_DLB[1] - shift*slopeA,this.point_DLB[2] - shift/slopeXz ];  
          
          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeA, this.core_point[2] - 0.5*shift/slopeXz];
        }
        else if(angB<=ang45 && this.point_FLT[0]>=this.point_FLB[0]){
          if(slopeB==Infinity){
            slopeB=0;
          }
          this.point_FLB = [this.point_FLB[0] - shift , this.point_FLB[1] - shift*slopeB, this.point_FLB[2] - shift/slopeXz ];
          this.point_FRB = [this.point_FRB[0] - shift , this.point_FRB[1] - shift*slopeB, this.point_FRB[2] - shift/slopeXz ];
          this.point_DLB = [this.point_DLB[0] - shift , this.point_DLB[1] - shift*slopeB, this.point_DLB[2] - shift/slopeXz ];
          this.point_DRB = [this.point_DRB[0] - shift , this.point_DRB[1] - shift*slopeB, this.point_DRB[2] - shift/slopeXz ];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeB, this.core_point[2] - 0.5*shift/slopeXz];
        }
        else if(angB<=ang45 && this.point_FLT[0]<this.point_FLB[0]){
          this.point_FLT = [this.point_FLT[0] - shift , this.point_FLT[1] - shift*slopeB, this.point_FLT[2] - shift/slopeXz ];
          this.point_FRT = [this.point_FRT[0] - shift , this.point_FRT[1] - shift*slopeB, this.point_FRT[2] - shift/slopeXz ];
          this.point_DLT = [this.point_DLT[0] - shift , this.point_DLT[1] - shift*slopeB, this.point_DLT[2] - shift/slopeXz ];
          this.point_DRT = [this.point_DRT[0] - shift , this.point_DRT[1] - shift*slopeB, this.point_DRT[2] - shift/slopeXz ];

          this.core_point = [this.core_point[0] - 0.5*shift, this.core_point[1] - 0.5*shift*slopeB, this.core_point[2] - 0.5*shift/slopeXz];
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
    this.axisAangXY = Math.asin((this.point_FRT[2]-this.point_FLT[2])/axisAmag);
    this.axisBangXY = Math.asin((this.point_FLB[2]-this.point_FLT[2])/axisBmag);
    this.axisCangXY = Math.asin((this.point_DLT[2]-this.point_FLT[2])/axisCmag);
  }
// ****************************************************************Rotate 
  this.rotateShape = function(butId, degAngle){
    var radAngle = degAngle*Math.PI/180;
    var pi = Math.PI;

    var sinShift = Math.sin(radAngle);
    var cosShift = Math.cos(radAngle);

    if(butId==1){ //About Z axis 

      this.point_FLT = [ this.core_point[0]+(this.point_FLT[0]-this.core_point[0])*cosShift - (this.point_FLT[1]-this.core_point[1])*sinShift, this.core_point[1]+(this.point_FLT[1]-this.core_point[1])*cosShift + (this.point_FLT[0]-this.core_point[0])*sinShift, this.point_FLT[2]];
      this.point_DLT = [ this.core_point[0]+(this.point_DLT[0]-this.core_point[0])*cosShift - (this.point_DLT[1]-this.core_point[1])*sinShift, this.core_point[1]+(this.point_DLT[1]-this.core_point[1])*cosShift + (this.point_DLT[0]-this.core_point[0])*sinShift, this.point_DLT[2]];
      this.point_FRT = [ this.core_point[0]+(this.point_FRT[0]-this.core_point[0])*cosShift - (this.point_FRT[1]-this.core_point[1])*sinShift, this.core_point[1]+(this.point_FRT[1]-this.core_point[1])*cosShift + (this.point_FRT[0]-this.core_point[0])*sinShift, this.point_FRT[2]];
      this.point_DRT = [ this.core_point[0]+(this.point_DRT[0]-this.core_point[0])*cosShift - (this.point_DRT[1]-this.core_point[1])*sinShift, this.core_point[1]+(this.point_DRT[1]-this.core_point[1])*cosShift + (this.point_DRT[0]-this.core_point[0])*sinShift, this.point_DRT[2]];
      this.point_FLB = [ this.core_point[0]+(this.point_FLB[0]-this.core_point[0])*cosShift - (this.point_FLB[1]-this.core_point[1])*sinShift, this.core_point[1]+(this.point_FLB[1]-this.core_point[1])*cosShift + (this.point_FLB[0]-this.core_point[0])*sinShift, this.point_FLB[2]];
      this.point_DLB = [ this.core_point[0]+(this.point_DLB[0]-this.core_point[0])*cosShift - (this.point_DLB[1]-this.core_point[1])*sinShift, this.core_point[1]+(this.point_DLB[1]-this.core_point[1])*cosShift + (this.point_DLB[0]-this.core_point[0])*sinShift, this.point_DLB[2]];
      this.point_FRB = [ this.core_point[0]+(this.point_FRB[0]-this.core_point[0])*cosShift - (this.point_FRB[1]-this.core_point[1])*sinShift, this.core_point[1]+(this.point_FRB[1]-this.core_point[1])*cosShift + (this.point_FRB[0]-this.core_point[0])*sinShift, this.point_FRB[2]];
      this.point_DRB = [ this.core_point[0]+(this.point_DRB[0]-this.core_point[0])*cosShift - (this.point_DRB[1]-this.core_point[1])*sinShift, this.core_point[1]+(this.point_DRB[1]-this.core_point[1])*cosShift + (this.point_DRB[0]-this.core_point[0])*sinShift, this.point_DRB[2]];

        
    }
    if(butId==2){ //About X axis 

    this.point_FLT = [ this.point_FLT[0], this.core_point[1]+(this.point_FLT[1]-this.core_point[1])*cosShift + (this.point_FLT[2]-this.core_point[2])*sinShift,  this.core_point[2]+(this.point_FLT[2]-this.core_point[2])*cosShift - (this.point_FLT[1]-this.core_point[1])*sinShift];
    this.point_DLT = [ this.point_DLT[0], this.core_point[1]+(this.point_DLT[1]-this.core_point[1])*cosShift + (this.point_DLT[2]-this.core_point[2])*sinShift,  this.core_point[2]+(this.point_DLT[2]-this.core_point[2])*cosShift - (this.point_DLT[1]-this.core_point[1])*sinShift];
    this.point_FRT = [ this.point_FRT[0], this.core_point[1]+(this.point_FRT[1]-this.core_point[1])*cosShift + (this.point_FRT[2]-this.core_point[2])*sinShift,  this.core_point[2]+(this.point_FRT[2]-this.core_point[2])*cosShift - (this.point_FRT[1]-this.core_point[1])*sinShift];
    this.point_DRT = [ this.point_DRT[0], this.core_point[1]+(this.point_DRT[1]-this.core_point[1])*cosShift + (this.point_DRT[2]-this.core_point[2])*sinShift,  this.core_point[2]+(this.point_DRT[2]-this.core_point[2])*cosShift - (this.point_DRT[1]-this.core_point[1])*sinShift];
    this.point_FLB = [ this.point_FLB[0], this.core_point[1]+(this.point_FLB[1]-this.core_point[1])*cosShift + (this.point_FLB[2]-this.core_point[2])*sinShift,  this.core_point[2]+(this.point_FLB[2]-this.core_point[2])*cosShift - (this.point_FLB[1]-this.core_point[1])*sinShift];
    this.point_DLB = [ this.point_DLB[0], this.core_point[1]+(this.point_DLB[1]-this.core_point[1])*cosShift + (this.point_DLB[2]-this.core_point[2])*sinShift,  this.core_point[2]+(this.point_DLB[2]-this.core_point[2])*cosShift - (this.point_DLB[1]-this.core_point[1])*sinShift];
    this.point_FRB = [ this.point_FRB[0], this.core_point[1]+(this.point_FRB[1]-this.core_point[1])*cosShift + (this.point_FRB[2]-this.core_point[2])*sinShift,  this.core_point[2]+(this.point_FRB[2]-this.core_point[2])*cosShift - (this.point_FRB[1]-this.core_point[1])*sinShift];
    this.point_DRB = [ this.point_DRB[0], this.core_point[1]+(this.point_DRB[1]-this.core_point[1])*cosShift + (this.point_DRB[2]-this.core_point[2])*sinShift,  this.core_point[2]+(this.point_DRB[2]-this.core_point[2])*cosShift - (this.point_DRB[1]-this.core_point[1])*sinShift];

    }
    if(butId==3){ //About Y axis

      this.point_FLT = [ this.core_point[0]+(this.point_FLT[0]-this.core_point[0])*cosShift - (this.point_FLT[2]-this.core_point[2])*sinShift, this.point_FLT[1],  this.core_point[2]+(this.point_FLT[2]-this.core_point[2])*cosShift + (this.point_FLT[0]-this.core_point[0])*sinShift];
      this.point_DLT = [ this.core_point[0]+(this.point_DLT[0]-this.core_point[0])*cosShift - (this.point_DLT[2]-this.core_point[2])*sinShift, this.point_DLT[1],  this.core_point[2]+(this.point_DLT[2]-this.core_point[2])*cosShift + (this.point_DLT[0]-this.core_point[0])*sinShift];
      this.point_FRT = [ this.core_point[0]+(this.point_FRT[0]-this.core_point[0])*cosShift - (this.point_FRT[2]-this.core_point[2])*sinShift, this.point_FRT[1],  this.core_point[2]+(this.point_FRT[2]-this.core_point[2])*cosShift + (this.point_FRT[0]-this.core_point[0])*sinShift];
      this.point_DRT = [ this.core_point[0]+(this.point_DRT[0]-this.core_point[0])*cosShift - (this.point_DRT[2]-this.core_point[2])*sinShift, this.point_DRT[1],  this.core_point[2]+(this.point_DRT[2]-this.core_point[2])*cosShift + (this.point_DRT[0]-this.core_point[0])*sinShift];
      this.point_FLB = [ this.core_point[0]+(this.point_FLB[0]-this.core_point[0])*cosShift - (this.point_FLB[2]-this.core_point[2])*sinShift, this.point_FLB[1],  this.core_point[2]+(this.point_FLB[2]-this.core_point[2])*cosShift + (this.point_FLB[0]-this.core_point[0])*sinShift];
      this.point_DLB = [ this.core_point[0]+(this.point_DLB[0]-this.core_point[0])*cosShift - (this.point_DLB[2]-this.core_point[2])*sinShift, this.point_DLB[1],  this.core_point[2]+(this.point_DLB[2]-this.core_point[2])*cosShift + (this.point_DLB[0]-this.core_point[0])*sinShift];
      this.point_FRB = [ this.core_point[0]+(this.point_FRB[0]-this.core_point[0])*cosShift - (this.point_FRB[2]-this.core_point[2])*sinShift, this.point_FRB[1],  this.core_point[2]+(this.point_FRB[2]-this.core_point[2])*cosShift + (this.point_FRB[0]-this.core_point[0])*sinShift];
      this.point_DRB = [ this.core_point[0]+(this.point_DRB[0]-this.core_point[0])*cosShift - (this.point_DRB[2]-this.core_point[2])*sinShift, this.point_DRB[1],  this.core_point[2]+(this.point_DRB[2]-this.core_point[2])*cosShift + (this.point_DRB[0]-this.core_point[0])*sinShift];
    }
    this.findAngle();
    
  }

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
    
    this.core_point = [this.core_point[0] + xShift, this.core_point[1] + yShift, this.core_point[2]];
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

/***************************************Sphere */
function Sphere(context, centerPoint, radius, sphereColor){
  this.center = centerPoint;
  this.radiusA = radius; //For ellipsoid
  this.radiusB = radius; //For ellipsoid

  var that = this;

  this.axisX = [[this.center[0]-this.radiusA, this.center[1], this.center[2]]
                ,[this.center[0]+this.radiusA, this.center[1], this.center[2]]];
  this.axisY = [[this.center[0], this.center[1]-this.radiusB, this.center[2]]
                ,[this.center[0], this.center[1]+this.radiusB, this.center[2]]];
  this.axisZ = [[this.center[0], this.center[1], this.center[2]-this.radiusB]
                ,[this.center[0], this.center[1], this.center[2]+this.radiusB]];

  this.vertices = [];

  init(that);
  
  function init(sph){
    var piVal = Math.PI;

    var stackCount = 18;
    var sectorCount = 54;
    var point = [];
    for(var i=0; i<stackCount; ++i){
      for(var j=0; j<sectorCount; ++j){
        
        sectorAngle = j*2*piVal/sectorCount;
        stackAngle = piVal/2 - i*piVal/stackCount;

        temppointX = sph.radiusA * Math.cos(stackAngle) * Math.cos(sectorAngle);
        temppointY = sph.radiusB * Math.cos(stackAngle) * Math.sin(sectorAngle);
        temppointZ = sph.radiusB * Math.sin(stackAngle);
        
        point = [temppointX, temppointY, temppointZ];

        sph.vertices.push(point);
      }
    }
  }

  this.boundingRect = [];

  this.drawShape = function(){
    var stackCount = 18;
    var sectorCount = 54;
    var k1, k2;
    
    context.beginPath();
    context.strokeStyle = sphereColor;
    context.moveTo(this.center[0]-this.vertices[0][0], this.center[1]-this.vertices[0][1]);
    for(var i=0; i<stackCount-2; ++i){
      k1 = i*(sectorCount+1);
      k2 = k1 + sectorCount+ 1;
      for(var j=0; j<sectorCount; ++j, ++k1, ++k2){
        if(i!=0){
          context.lineTo(this.center[0]-this.vertices[k1][0], this.center[1]-this.vertices[k1][1]);
          context.lineTo(this.center[0]-this.vertices[k2][0], this.center[1]-this.vertices[k2][1]);
          context.lineTo(this.center[0]-this.vertices[k1+1][0], this.center[1]-this.vertices[k1+1][1]);
          context.lineTo(this.center[0]-this.vertices[k1][0], this.center[1]-this.vertices[k1][1]); 
        }  

        if(i<(stackCount-1)){
          context.lineTo(this.center[0]-this.vertices[k1+1][0], this.center[1]-this.vertices[k1+1][1]);
          context.lineTo(this.center[0]-this.vertices[k2][0], this.center[1]-this.vertices[k2][1]);
          context.lineTo(this.center[0]-this.vertices[k2+1][0], this.center[1]-this.vertices[k2+1][1]); 
          context.lineTo(this.center[0]-this.vertices[k1+1][0], this.center[1]-this.vertices[k1+1][1]); 
        }
      }
    }
    context.stroke();
  }

  this.stretchShape = function(butId, shift){

  }

  this.rotateShape = function(butId, degAngle){
    var radAngle = degAngle*Math.PI/180;

    var sinShift = Math.sin(radAngle);
    var cosShift = Math.cos(radAngle);

    if(butId==1){ //About Z axis 
      console.log(this.center);
      for(var i=0; i<this.vertices.length; ++i){
        this.vertices[i] = [(this.vertices[i][0])*cosShift-(this.vertices[i][1])*sinShift, 
                            (this.vertices[i][1])*cosShift+(this.vertices[i][0])*sinShift, 
                            this.vertices[i][2]];
      } 
      this.axisX = [[this.center[0]+(this.axisX[0][0]-this.center[0])*cosShift-(this.axisX[0][1]-this.center[1])*sinShift, this.center[1]+(this.axisX[0][1]-this.center[1])*cosShift+(this.axisX[0][0]-this.center[0])*sinShift, this.axisX[0][2]],
                    [this.center[0]+(this.axisX[1][0]-this.center[0])*cosShift-(this.axisX[1][1]-this.center[1])*sinShift, this.center[1]+(this.axisX[1][1]-this.center[1])*cosShift+(this.axisX[1][0]-this.center[0])*sinShift, this.axisX[1][2]]];

      this.axisY = [[this.center[0]+(this.axisY[0][0]-this.center[0])*cosShift-(this.axisY[0][1]-this.center[1])*sinShift, this.center[1]+(this.axisY[0][1]-this.center[1])*cosShift+(this.axisY[0][0]-this.center[0])*sinShift, this.axisY[0][2]],
                    [this.center[0]+(this.axisY[1][0]-this.center[0])*cosShift-(this.axisY[1][1]-this.center[1])*sinShift, this.center[1]+(this.axisY[1][1]-this.center[1])*cosShift+(this.axisY[1][0]-this.center[0])*sinShift, this.axisY[1][2]]];
      
      this.axisZ = [[this.center[0]+(this.axisZ[0][0]-this.center[0])*cosShift-(this.axisZ[0][1]-this.center[1])*sinShift, this.center[1]+(this.axisZ[0][1]-this.center[1])*cosShift+(this.axisZ[0][0]-this.center[0])*sinShift, this.axisZ[0][2]],
                    [this.center[0]+(this.axisZ[1][0]-this.center[0])*cosShift-(this.axisZ[1][1]-this.center[1])*sinShift, this.center[1]+(this.axisZ[1][1]-this.center[1])*cosShift+(this.axisZ[1][0]-this.center[0])*sinShift, this.axisZ[1][2]]];
    }
    if(butId==2){ //About X axis 
      for(var i=0; i<this.vertices.length; ++i){
        this.vertices[i] = [this.vertices[i][0], 
                            (this.vertices[i][1])*cosShift+(this.vertices[i][2])*sinShift, 
                            (this.vertices[i][2])*cosShift-(this.vertices[i][1])*sinShift];
      }

      this.axisX = [[this.axisX[0][0], this.center[1]+(this.axisX[0][1]-this.center[1])*cosShift+(this.axisX[0][2]-this.center[2])*sinShift, this.center[2]+(this.axisX[0][2]-this.center[2])*cosShift-(this.axisX[0][1]-this.center[1])*sinShift],
                    [this.axisX[1][0], this.center[1]+(this.axisX[1][1]-this.center[1])*cosShift+(this.axisX[1][2]-this.center[2])*sinShift, this.center[2]+(this.axisX[1][2]-this.center[2])*cosShift-(this.axisX[1][1]-this.center[1])*sinShift]];

      this.axisY = [[this.axisY[0][0], this.center[1]+(this.axisY[0][1]-this.center[1])*cosShift+(this.axisY[0][2]-this.center[2])*sinShift, this.center[2]+(this.axisY[0][2]-this.center[2])*cosShift-(this.axisY[0][1]-this.center[1])*sinShift],
                    [this.axisY[1][0], this.center[1]+(this.axisY[1][1]-this.center[1])*cosShift+(this.axisY[1][2]-this.center[2])*sinShift, this.center[2]+(this.axisY[1][2]-this.center[2])*cosShift-(this.axisY[1][1]-this.center[1])*sinShift]];

      this.axisZ = [[this.axisZ[0][0], this.center[1]+(this.axisZ[0][1]-this.center[1])*cosShift+(this.axisZ[0][2]-this.center[2])*sinShift, this.center[2]+(this.axisZ[0][2]-this.center[2])*cosShift-(this.axisZ[0][1]-this.center[1])*sinShift],
                    [this.axisZ[1][0], this.center[1]+(this.axisZ[1][1]-this.center[1])*cosShift+(this.axisZ[1][2]-this.center[2])*sinShift, this.center[2]+(this.axisZ[1][2]-this.center[2])*cosShift-(this.axisZ[1][1]-this.center[1])*sinShift]];
    }
    if(butId==3){ //About Y axis
      for(var i=0; i<this.vertices.length; ++i){
        this.vertices[i] = [(this.vertices[i][0])*cosShift-(this.vertices[i][2])*sinShift, 
                            this.vertices[i][1], 
                            (this.vertices[i][2])*cosShift+(this.vertices[i][0])*sinShift];
      }

      this.axisX = [[this.center[0]+(this.axisX[0][0]-this.center[0])*cosShift-(this.axisX[0][2]-this.center[2])*sinShift, this.axisX[0][1], this.center[2]+(this.axisX[0][2]-this.center[2])*cosShift+(this.axisX[0][0]-this.center[0])*sinShift],
                    [this.center[0]+(this.axisX[1][0]-this.center[0])*cosShift-(this.axisX[1][2]-this.center[2])*sinShift, this.axisX[1][1], this.center[2]+(this.axisX[1][2]-this.center[2])*cosShift+(this.axisX[1][0]-this.center[0])*sinShift]];

      this.axisY = [[this.center[0]+(this.axisY[0][0]-this.center[0])*cosShift-(this.axisY[0][2]-this.center[2])*sinShift, this.axisY[0][1], this.center[2]+(this.axisY[0][2]-this.center[2])*cosShift+(this.axisY[0][0]-this.center[0])*sinShift],
                    [this.center[0]+(this.axisY[1][0]-this.center[0])*cosShift-(this.axisY[1][2]-this.center[2])*sinShift, this.axisY[1][1], this.center[2]+(this.axisY[1][2]-this.center[2])*cosShift+(this.axisY[1][0]-this.center[0])*sinShift]];

      this.axisZ = [[this.center[0]+(this.axisZ[0][0]-this.center[0])*cosShift-(this.axisZ[0][2]-this.center[2])*sinShift, this.axisZ[0][1], this.center[2]+(this.axisZ[0][2]-this.center[2])*cosShift+(this.axisZ[0][0]-this.center[0])*sinShift],
                    [this.center[0]+(this.axisZ[1][0]-this.center[0])*cosShift-(this.axisZ[1][2]-this.center[2])*sinShift, this.axisZ[1][1], this.center[2]+(this.axisZ[1][2]-this.center[2])*cosShift+(this.axisZ[1][0]-this.center[0])*sinShift]];
    }
    // this.findAngle();
  }

  this.findAngle = function(){
    var axisXmag = Math.sqrt(Math.pow(this.axisX[1][0]-this.axisX[0][0],2) + Math.pow(this.axisX[1][1]-this.axisX[0][1],2) + Math.pow(this.axisX[1][2]-this.axisX[0][2],2));
    var axisYmag = Math.sqrt(Math.pow(this.axisY[1][0]-this.axisY[0][0],2) + Math.pow(this.axisY[1][1]-this.axisY[0][1],2) + Math.pow(this.axisY[1][2]-this.axisY[0][2],2));
    var axisZmag = Math.sqrt(Math.pow(this.axisZ[1][0]-this.axisZ[0][0],2) + Math.pow(this.axisZ[1][1]-this.axisZ[0][1],2) + Math.pow(this.axisZ[1][2]-this.axisZ[0][2],2));
    this.axisXangXY = Math.asin((this.point_FRT[2]-this.point_FLT[2])/axisXmag);
    this.axisYangXY = Math.asin((this.point_FLB[2]-this.point_FLT[2])/axisYmag);
    this.axisZangXY = Math.asin((this.point_DLT[2]-this.point_FLT[2])/axisZmag);
  }

  this.moveShape = function(xShift, yShift){
    this.center = [this.center[0] + xShift, this.center[1] + yShift, this.center[2]];

    this.axisX = [[this.axisX[0][0] + xShift, this.axisX[0][1]+yShift, this.axisX[0][2]], [this.axisX[1][0] + xShift, this.axisX[1][1]+yShift, this.axisX[1][2]]];
    this.axisY = [[this.axisY[0][0] + xShift, this.axisY[0][1]+yShift, this.axisY[0][2]], [this.axisY[1][0] + xShift, this.axisY[1][1]+yShift, this.axisY[1][2]]];
    this.axisZ = [[this.axisZ[0][0] + xShift, this.axisZ[0][1]+yShift, this.axisZ[0][2]], [this.axisZ[1][0] + xShift, this.axisZ[1][1]+yShift, this.axisZ[1][2]]];
  }

  this.getBoundingRect = function(){
    var maxXPoint = 0;
    var minXPoint = 1000;

    var maxYPoint = 0;
    var minYPoint = 1000;

    for(var j=0; j<this.vertices.length; ++j){

      if(maxXPoint< this.vertices[j][0]){
        maxXPoint = this.vertices[j][0];
      }
      if(minXPoint>= this.vertices[j][0]){
        minXPoint = this.vertices[j][0];
      }
      if(maxYPoint< this.vertices[j][1]){
        maxYPoint = this.vertices[j][1];
      }
      if(minYPoint>= this.vertices[j][1]){
        minYPoint = this.vertices[j][1];
      }
    }

    this.boundingRect = [this.center[0]+minXPoint, this.center[1]+minYPoint, maxXPoint-minXPoint, maxYPoint-minYPoint];

    return this.boundingRect;
  }

  this.isInside = function(pointX, pointY){
    var distanceA = Math.sqrt( Math.pow(this.center[0]-pointX, 2)+Math.pow(this.center[1]-pointY, 2));

    var A = -(this.axisX[1][1]-this.axisX[0][1])/(this.axisX[1][0]-this.axisX[0][0]);
    var B = 1;
    var C = -this.axisX[0][1] - A * this.axisX[0][0];

    var perpDist = Math.abs(A*pointX + B*pointY + C)/Math.sqrt(Math.pow(A, 2)+Math.pow(B, 2));

    var angleTheta = Math.asin(perpDist/distanceA);

    var aPointX = this.center[0] + (this.axisX[1][0] - this.center[0]) * Math.cos(angleTheta) - this.radiusA * (this.axisX[1][1] - this.center[1]) * Math.sin(angleTheta) / this.radiusB;
    var aPointY = this.center[1] + (this.axisX[1][1] - this.center[1]) * Math.cos(angleTheta) + this.radiusB * (this.axisX[1][0] - this.center[0]) * Math.sin(angleTheta) / this.radiusA;
    
    var centerToApoint = Math.sqrt( Math.pow(this.center[0]-aPointX, 2)+Math.pow(this.center[1]-aPointY, 2));
    if(distanceA<=centerToApoint){
      return true;
    }
    else{
      return false;
    }
  }
}