function Cube(context, positionPoint, cubeHeight, cubeWidth, cubeDepth, cubeColor) {
  this.point_FLT = [positionPoint[0], positionPoint[1], positionPoint[2]];
  this.point_FRT = [positionPoint[0] + cubeWidth, positionPoint[1], positionPoint[2]];
  this.point_FLB = [positionPoint[0], positionPoint[1] + cubeHeight, positionPoint[2]];
  this.point_FRB = [positionPoint[0] + cubeWidth, positionPoint[1] + cubeHeight, positionPoint[2]];
  this.point_DLT = [positionPoint[0], positionPoint[1], positionPoint[2] + cubeDepth];
  this.point_DRT = [positionPoint[0] + cubeWidth, positionPoint[1], positionPoint[2] + cubeDepth];
  this.point_DLB = [positionPoint[0], positionPoint[1] + cubeHeight, positionPoint[2] + cubeDepth];
  this.point_DRB = [positionPoint[0] + cubeWidth, positionPoint[1] + cubeHeight, positionPoint[2] + cubeDepth];

  this.factor = Math.sqrt(2);

  this.core_pointXZ = [positionPoint[0] + cubeWidth / 2, positionPoint[1], positionPoint[2] + cubeDepth / 2];
  this.core_pointXY = [positionPoint[0] + cubeWidth / 2, positionPoint[1] + cubeHeight / 2, positionPoint[2]];
  this.core_pointYZ = [positionPoint[0], positionPoint[1] + cubeHeight / 2, positionPoint[2] + cubeDepth / 2];

  this.core_point = [positionPoint[0] + cubeWidth / 2, positionPoint[1] + cubeHeight / 2, positionPoint[2] + cubeDepth / 2];

  this.axisAangXY = 0;
  this.axisBangXY = 0;
  this.axisCangXY = Math.PI / 2;

  this.r = Math.sqrt(Math.pow((this.point_FLT[0] - this.point_DRT[0]), 2) + Math.pow((this.point_FLT[2] - this.point_DRT[2]), 2)) / 2;

  this.boundingRect = [];

  this.drawShape = function () {
    context.fillStyle = cubeColor;
    // context.strokeStyle = context.setLineDash([]);
    context.beginPath();
    context.moveTo(this.point_FLT[0], this.point_FLT[1]);
    context.lineTo(this.point_DLT[0], this.point_DLT[1]);
    context.lineTo(this.point_DLB[0], this.point_DLB[1]);
    context.lineTo(this.point_FLB[0], this.point_FLB[1]);
    context.lineTo(this.point_FLT[0], this.point_FLT[1]);

    context.fill();
    context.beginPath();
    context.moveTo(this.point_FLT[0], this.point_FLT[1]);
    context.lineTo(this.point_FRT[0], this.point_FRT[1]);
    context.lineTo(this.point_FRB[0], this.point_FRB[1]);
    context.lineTo(this.point_FLB[0], this.point_FLB[1]);
    context.lineTo(this.point_FLT[0], this.point_FLT[1]);

    context.fill();
    context.beginPath();
    context.moveTo(this.point_FRT[0], this.point_FRT[1]);
    context.lineTo(this.point_DRT[0], this.point_DRT[1]);
    context.lineTo(this.point_DRB[0], this.point_DRB[1]);
    context.lineTo(this.point_FRB[0], this.point_FRB[1]);
    context.lineTo(this.point_FRT[0], this.point_FRT[1]);

    context.fill();
    context.beginPath();
    context.moveTo(this.point_DLT[0], this.point_DLT[1]);
    context.lineTo(this.point_DRT[0], this.point_DRT[1]);
    context.lineTo(this.point_DRB[0], this.point_DRB[1]);
    context.lineTo(this.point_DLB[0], this.point_DLB[1]);
    context.lineTo(this.point_DLT[0], this.point_DLT[1]);

    context.fill();
    context.beginPath();
    context.moveTo(this.point_FLT[0], this.point_FLT[1]);
    context.lineTo(this.point_FRT[0], this.point_FRT[1]);
    context.lineTo(this.point_DRT[0], this.point_DRT[1]);
    context.lineTo(this.point_DLT[0], this.point_DLT[1]);
    context.lineTo(this.point_FLT[0], this.point_FLT[1]);

    context.fill();
    context.beginPath();
    context.moveTo(this.point_FLB[0], this.point_FLB[1]);
    context.lineTo(this.point_FRB[0], this.point_FRB[1]);
    context.lineTo(this.point_DRB[0], this.point_DRB[1]);
    context.lineTo(this.point_DLB[0], this.point_DLB[1]);
    context.lineTo(this.point_FLB[0], this.point_FLB[1]);
    context.closePath();

    context.fill();

  }
  // ***********************************************************Stretch***********
  this.stretchShape = function (butId, shift) {
    var ang45 = Math.PI / 4;
    if (Math.abs(this.axisBangXY) >= Math.abs(this.axisAangXY) && Math.abs(this.axisBangXY) >= Math.abs(this.axisCangXY)) {
      var slopeA = (this.point_FRT[1] - this.point_FLT[1]) / (this.point_FRT[0] - this.point_FLT[0]);
      var slopeC = (this.point_DLT[1] - this.point_FLT[1]) / (this.point_DLT[0] - this.point_FLT[0]);

      var slopeXz = -(this.point_FLB[2] - this.point_FLT[2]) / (this.point_FLB[0] - this.point_FLT[0]);
      var slopeYz = -(this.point_FLB[2] - this.point_FLT[2]) / (this.point_FLB[1] - this.point_FLT[1]);

      var angA = Math.atan(Math.abs(slopeA));
      var angC = Math.atan(Math.abs(slopeC));

      if (butId == 1) {  //OK
        if (Math.abs(slopeYz) == 0) {
          slopeYz = Infinity;
        }
        if (angA <= ang45 && this.point_FLT[1] >= this.point_DLT[1]) {
          if (slopeC == 0) {
            slopeC = Infinity;
          }
          let factors = [-1 / slopeC, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_DLT, this.point_DLB, this.point_DRT, this.point_DRB, shift, factors);
        }
        else if (angA <= ang45 && this.point_FLT[1] < this.point_DLT[1]) {
          let factors = [-1 / slopeC, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_FRT, this.point_FRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[1] >= this.point_FRT[1]) {
          if (slopeA == 0) {
            slopeA = Infinity;
          }
          let factors = [-1 / slopeA, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FRT, this.point_FRB, this.point_DRT, this.point_DRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[1] < this.point_FRT[1]) {
          let factors = [-1 / slopeA, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_DLT, this.point_DLB, shift, factors);
        }
      }
      else if (butId == 2) {  //OK
        if (Math.abs(slopeXz) == 0) {
          slopeXz = Infinity;
        }
        if (angA <= ang45 && this.point_FLT[0] >= this.point_FRT[0]) {
          if (slopeA == Infinity) {
            slopeA = 0;
          }
          let factors = [1, slopeA, 1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_DLT, this.point_DLB, shift, factors);
        }
        else if (angA <= ang45 && this.point_FLT[0] < this.point_FRT[0]) {
          let factors = [1, slopeA, 1 / slopeXz];
          this.stretchUpdate(this.point_FRT, this.point_FRB, this.point_DRT, this.point_DRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[0] >= this.point_DLT[0]) {
          if (slopeC == Infinity) {
            slopeC = 0;
          }
          let factors = [1, slopeC, 1 / slopeXz];
          this.stretchUpdate(this.point_FRT, this.point_FRB, this.point_FLT, this.point_FLB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[0] < this.point_DLT[0]) {
          let factors = [1, slopeC, 1 / slopeXz];
          this.stretchUpdate(this.point_DLT, this.point_DLB, this.point_DRT, this.point_DRB, shift, factors);
        }
      }
      else if (butId == 3) {  //OK
        if (Math.abs(slopeYz) == 0) {
          slopeYz = Infinity;
        }
        if (angA <= ang45 && this.point_FLT[1] >= this.point_DLT[1]) {
          if (slopeC == 0) {
            slopeC = Infinity;
          }
          let factors = [1 / slopeC, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_FRT, this.point_FRB, shift, factors);
        }
        else if (angA <= ang45 && this.point_FLT[1] < this.point_DLT[1]) {
          let factors = [1 / slopeC, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_DLT, this.point_DLB, this.point_DRT, this.point_DRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[1] >= this.point_FRT[1]) {
          if (slopeA == 0) {
            slopeA = Infinity;
          }
          let factors = [1 / slopeA, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_DLT, this.point_DLB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[1] < this.point_FRT[1]) {
          let factors = [1 / slopeA, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FRT, this.point_FRB, this.point_DRT, this.point_DRB, shift, factors);
        }
      }
      else if (butId == 4) {  //OK
        if (Math.abs(slopeXz) == 0) {
          slopeXz = Infinity;
        }
        if (angA <= ang45 && this.point_FLT[0] >= this.point_FRT[0]) {
          if (slopeA == Infinity) {
            slopeA = 0;
          }
          let factors = [-1, -slopeA, -1 / slopeXz];
          this.stretchUpdate(this.point_FRT, this.point_FRB, this.point_DRT, this.point_DRB, shift, factors);
        }
        else if (angA <= ang45 && this.point_FLT[0] < this.point_FRT[0]) {
          let factors = [-1, -slopeA, -1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_DLT, this.point_DLB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[0] >= this.point_DLT[0]) {
          if (slopeC == Infinity) {
            slopeC = 0;
          }
          let factors = [-1, -slopeC, -1 / slopeXz];
          this.stretchUpdate(this.point_DLT, this.point_DLB, this.point_DRT, this.point_DRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[0] < this.point_DLT[0]) {
          let factors = [-1, -slopeC, -1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_FRT, this.point_FRB, shift, factors);
        }
      }
    }
    else if (Math.abs(this.axisAangXY) >= Math.abs(this.axisBangXY) && Math.abs(this.axisAangXY) >= Math.abs(this.axisCangXY)) {
      var slopeB = (this.point_FLB[1] - this.point_FLT[1]) / (this.point_FLB[0] - this.point_FLT[0]);
      var slopeC = (this.point_DLT[1] - this.point_FLT[1]) / (this.point_DLT[0] - this.point_FLT[0]);

      var slopeXz = -(this.point_FRT[2] - this.point_FLT[2]) / (this.point_FRT[0] - this.point_FLT[0]);
      var slopeYz = -(this.point_FRT[2] - this.point_FLT[2]) / (this.point_FRT[1] - this.point_FLT[1]);

      var angB = Math.atan(Math.abs(slopeB));
      var angC = Math.atan(Math.abs(slopeC));

      if (butId == 1) {
        if (Math.abs(slopeYz) == 0) {
          slopeYz = Infinity;
        }
        if (angB <= ang45 && this.point_FLT[1] >= this.point_DLT[1]) {
          if (slopeC == 0) {
            slopeC = Infinity;
          }
          let factors = [-1 / slopeC, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_DLT, this.point_DLB, this.point_DRT, this.point_DRB, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[1] < this.point_DLT[1]) {
          let factors = [-1 / slopeC, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_FRT, this.point_FRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[1] >= this.point_FLB[1]) {
          if (slopeB == 0) {
            slopeB = Infinity;
          }
          let factors = [-1 / slopeB, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FLB, this.point_DLB, this.point_FRB, this.point_DRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[1] < this.point_FLB[1]) {
          let factors = [-1 / slopeB, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_DLT, this.point_FRT, this.point_DRT, shift, factors);
        }
      }
      else if (butId == 2) {
        if (Math.abs(slopeXz) == 0) {
          slopeXz = Infinity;
        }
        if (angB <= ang45 && this.point_FLT[0] >= this.point_FLB[0]) {
          if (slopeB == Infinity) {
            slopeB = 0;
          }
          let factors = [1, slopeB, 1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_DLT, this.point_FRT, this.point_DRT, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[0] < this.point_FLB[0]) {
          let factors = [1, slopeB, 1 / slopeXz];
          this.stretchUpdate(this.point_FLB, this.point_DLB, this.point_FRB, this.point_DRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[0] >= this.point_DLT[0]) {
          if (slopeC == Infinity) {
            slopeC = 0;
          }
          let factors = [1, slopeC, 1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_FRT, this.point_FRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[0] < this.point_DLT[0]) {
          let factors = [1, slopeC, 1 / slopeXz];
          this.stretchUpdate(this.point_DLT, this.point_DLB, this.point_DRT, this.point_DRB, shift, factors);
        }
      }
      else if (butId == 3) {
        if (Math.abs(slopeYz) == 0) {
          slopeYz = Infinity;
        }
        if (angB <= ang45 && this.point_FLT[1] >= this.point_DLT[1]) {
          if (slopeC == 0) {
            slopeC = Infinity;
          }
          let factors = [1 / slopeC, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_FRT, this.point_FRB, shift, factors);

        }
        else if (angB <= ang45 && this.point_FLT[1] < this.point_DLT[1]) {
          let factors = [1 / slopeC, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_DLT, this.point_DLB, this.point_DRT, this.point_DRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[1] >= this.point_FLB[1]) {
          if (slopeB == 0) {
            slopeB = Infinity;
          }
          let factors = [1 / slopeB, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_DLT, this.point_FRT, this.point_DRT, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[1] < this.point_FLB[1]) {
          let factors = [1 / slopeB, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FLB, this.point_DLB, this.point_FRB, this.point_DRB, shift, factors);

        }
      }
      else if (butId == 4) {
        if (Math.abs(slopeXz) == 0) {
          slopeXz = Infinity;
        }
        if (angB <= ang45 && this.point_FLT[0] >= this.point_FLB[0]) {
          if (slopeB == Infinity) {
            slopeB = 0;
          }
          let factors = [-1, -slopeB, -1 / slopeXz];
          this.stretchUpdate(this.point_FLB, this.point_DLB, this.point_FRB, this.point_DRB, shift, factors);

        }
        else if (angB <= ang45 && this.point_FLT[0] < this.point_FLB[0]) {
          let factors = [-1, -slopeB, -1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_DLT, this.point_FRT, this.point_DRT, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[0] >= this.point_DLT[0]) {
          if (slopeC == Infinity) {
            slopeC = 0;
          }
          let factors = [-1, -slopeC, -1 / slopeXz];
          this.stretchUpdate(this.point_DLT, this.point_DLB, this.point_DRT, this.point_DRB, shift, factors);
        }
        else if (angC <= ang45 && this.point_FLT[0] < this.point_DLT[0]) {
          let factors = [-1, -slopeC, -1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_FLB, this.point_FRT, this.point_FRB, shift, factors);
        }
      }

    }
    else if (Math.abs(this.axisCangXY) >= Math.abs(this.axisBangXY) && Math.abs(this.axisCangXY) >= Math.abs(this.axisAangXY)) {
      var slopeA = (this.point_FRT[1] - this.point_FLT[1]) / (this.point_FRT[0] - this.point_FLT[0]);
      var slopeB = (this.point_FLB[1] - this.point_FLT[1]) / (this.point_FLB[0] - this.point_FLT[0]);

      var slopeXz = -(this.point_DLT[2] - this.point_FLT[2]) / (this.point_DLT[0] - this.point_FLT[0]);
      var slopeYz = -(this.point_DLT[2] - this.point_FLT[2]) / (this.point_DLT[1] - this.point_FLT[1]);

      var angA = Math.atan(Math.abs(slopeA));
      var angB = Math.atan(Math.abs(slopeB));

      if (butId == 1) {
        if (Math.abs(slopeYz) == 0) {
          slopeYz = Infinity;
        }
        if (angA <= ang45 && this.point_FLT[1] >= this.point_FLB[1]) {
          if (slopeB == 0) {
            slopeB = Infinity;
          }
          let factors = [-1 / slopeB, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FLB, this.point_DLB, this.point_FRB, this.point_DRB, shift, factors);
        }
        else if (angA <= ang45 && this.point_FLT[1] < this.point_FLB[1]) {
          let factors = [-1 / slopeB, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_FRT, this.point_DLT, this.point_DRT, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[1] >= this.point_FRT[1]) {
          if (slopeA == 0) {
            slopeA = Infinity;
          }
          let factors = [-1 / slopeA, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FRT, this.point_DRT, this.point_FRB, this.point_DRB, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[1] < this.point_FRT[1]) {
          let factors = [-1 / slopeA, -1, -1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_DLT, this.point_FLB, this.point_DLB, shift, factors);
        }
      }
      else if (butId == 2) {
        if (Math.abs(slopeXz) == 0) {
          slopeXz = Infinity;
        }
        if (angA <= ang45 && this.point_FLT[0] >= this.point_FRT[0]) {
          if (slopeA == Infinity) {
            slopeA = 0;
          }
          let factors = [1, slopeA, 1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_DLT, this.point_FLB, this.point_DLB, shift, factors);
        }
        else if (angA <= ang45 && this.point_FLT[0] < this.point_FRT[0]) {
          let factors = [1, slopeA, 1 / slopeXz];
          this.stretchUpdate(this.point_FRT, this.point_DRT, this.point_FRB, this.point_DRB, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[0] >= this.point_FLB[0]) {
          if (slopeB == Infinity) {
            slopeB = 0;
          }
          let factors = [1, slopeB, 1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_FRT, this.point_DLT, this.point_DRT, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[0] < this.point_FLB[0]) {
          let factors = [1, slopeB, 1 / slopeXz];
          this.stretchUpdate(this.point_FLB, this.point_FRB, this.point_DLB, this.point_DRB, shift, factors);
        }
      }
      else if (butId == 3) {
        if (Math.abs(slopeYz) == 0) {
          slopeYz = Infinity;
        }
        if (angA <= ang45 && this.point_FLT[1] >= this.point_FLB[1]) {
          if (slopeB == 0) {
            slopeB = Infinity;
          }
          let factors = [1 / slopeB, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_FRT, this.point_DLT, this.point_DRT, shift, factors);
        }
        else if (angA <= ang45 && this.point_FLT[1] < this.point_FLB[1]) {
          let factors = [1 / slopeB, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FLB, this.point_DLB, this.point_FRB, this.point_DRB, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[1] >= this.point_FRT[1]) {
          if (slopeA == 0) {
            slopeA = Infinity;
          }
          let factors = [1 / slopeA, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FLT, this.point_DLT, this.point_FLB, this.point_DLB, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[1] < this.point_FRT[1]) {
          let factors = [1 / slopeA, 1, 1 / slopeYz];
          this.stretchUpdate(this.point_FRT, this.point_DRT, this.point_FRB, this.point_DRB, shift, factors);
        }
      }
      else if (butId == 4) {
        if (Math.abs(slopeXz) == 0) {
          slopeXz = Infinity;
        }
        if (angA <= ang45 && this.point_FLT[0] >= this.point_FRT[0]) {
          if (slopeA == Infinity) {
            slopeA = 0;
          }
          let factors = [-1, -slopeA, -1 / slopeXz];
          this.stretchUpdate(this.point_FRT, this.point_DRT, this.point_FRB, this.point_DRB, shift, factors);
        }
        else if (angA <= ang45 && this.point_FLT[0] < this.point_FRT[0]) {
          let factors = [-1, -slopeA, -1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_DLT, this.point_FLB, this.point_DLB, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[0] >= this.point_FLB[0]) {
          if (slopeB == Infinity) {
            slopeB = 0;
          }
          let factors = [-1, -slopeB, -1 / slopeXz];
          this.stretchUpdate(this.point_FLB, this.point_DLB, this.point_FRB, this.point_DRB, shift, factors);
        }
        else if (angB <= ang45 && this.point_FLT[0] < this.point_FLB[0]) {
          let factors = [-1, -slopeB, -1 / slopeXz];
          this.stretchUpdate(this.point_FLT, this.point_DLT, this.point_FRT, this.point_DRT, shift, factors);
        }
      }
    }

    // this.drawShape();
  }

  this.stretchUpdate = function (toBeUpdated_0, toBeUpdated_1, toBeUpdated_2, toBeUpdated_3, shift, factors) {
    let xShift = shift * factors[0];
    let yShift = shift * factors[1];
    let zShift = shift * factors[2];

    toBeUpdated_0[0] = toBeUpdated_0[0] + xShift;
    toBeUpdated_0[1] = toBeUpdated_0[1] + yShift;
    toBeUpdated_0[2] = toBeUpdated_0[2] + zShift;

    toBeUpdated_1[0] = toBeUpdated_1[0] + xShift;
    toBeUpdated_1[1] = toBeUpdated_1[1] + yShift;
    toBeUpdated_1[2] = toBeUpdated_1[2] + zShift;

    toBeUpdated_2[0] = toBeUpdated_2[0] + xShift;
    toBeUpdated_2[1] = toBeUpdated_2[1] + yShift;
    toBeUpdated_2[2] = toBeUpdated_2[2] + zShift;

    toBeUpdated_3[0] = toBeUpdated_3[0] + xShift;
    toBeUpdated_3[1] = toBeUpdated_3[1] + yShift;
    toBeUpdated_3[2] = toBeUpdated_3[2] + zShift;

    this.core_point = [this.core_point[0] + 0.5 * xShift, this.core_point[1] + 0.5 * yShift, this.core_point[2] + 0.5 * zShift];
  }

  // ****************************************************************FIND ANGLE
  this.findAngle = function () {
    var axisAmag = Math.sqrt(Math.pow(this.point_FRT[0] - this.point_FLT[0], 2) + Math.pow(this.point_FRT[1] - this.point_FLT[1], 2) + Math.pow(this.point_FRT[2] - this.point_FLT[2], 2));
    var axisBmag = Math.sqrt(Math.pow(this.point_FLB[0] - this.point_FLT[0], 2) + Math.pow(this.point_FLB[1] - this.point_FLT[1], 2) + Math.pow(this.point_FLB[2] - this.point_FLT[2], 2));
    var axisCmag = Math.sqrt(Math.pow(this.point_DLT[0] - this.point_FLT[0], 2) + Math.pow(this.point_DLT[1] - this.point_FLT[1], 2) + Math.pow(this.point_DLT[2] - this.point_FLT[2], 2));
    this.axisAangXY = Math.asin((this.point_FRT[2] - this.point_FLT[2]) / axisAmag);
    this.axisBangXY = Math.asin((this.point_FLB[2] - this.point_FLT[2]) / axisBmag);
    this.axisCangXY = Math.asin((this.point_DLT[2] - this.point_FLT[2]) / axisCmag);
  }
  // ****************************************************************Rotate 
  this.rotateShape = function (butId, degAngle) {
    var radAngle = degAngle * Math.PI / 180;
    var pi = Math.PI;

    var sinShift = Math.sin(radAngle);
    var cosShift = Math.cos(radAngle);

    if (butId == 1) { //About Z axis 
      this.point_FLT = [this.core_point[0] + (this.point_FLT[0] - this.core_point[0]) * cosShift - (this.point_FLT[1] - this.core_point[1]) * sinShift, this.core_point[1] + (this.point_FLT[1] - this.core_point[1]) * cosShift + (this.point_FLT[0] - this.core_point[0]) * sinShift, this.point_FLT[2]];
      this.point_DLT = [this.core_point[0] + (this.point_DLT[0] - this.core_point[0]) * cosShift - (this.point_DLT[1] - this.core_point[1]) * sinShift, this.core_point[1] + (this.point_DLT[1] - this.core_point[1]) * cosShift + (this.point_DLT[0] - this.core_point[0]) * sinShift, this.point_DLT[2]];
      this.point_FRT = [this.core_point[0] + (this.point_FRT[0] - this.core_point[0]) * cosShift - (this.point_FRT[1] - this.core_point[1]) * sinShift, this.core_point[1] + (this.point_FRT[1] - this.core_point[1]) * cosShift + (this.point_FRT[0] - this.core_point[0]) * sinShift, this.point_FRT[2]];
      this.point_DRT = [this.core_point[0] + (this.point_DRT[0] - this.core_point[0]) * cosShift - (this.point_DRT[1] - this.core_point[1]) * sinShift, this.core_point[1] + (this.point_DRT[1] - this.core_point[1]) * cosShift + (this.point_DRT[0] - this.core_point[0]) * sinShift, this.point_DRT[2]];
      this.point_FLB = [this.core_point[0] + (this.point_FLB[0] - this.core_point[0]) * cosShift - (this.point_FLB[1] - this.core_point[1]) * sinShift, this.core_point[1] + (this.point_FLB[1] - this.core_point[1]) * cosShift + (this.point_FLB[0] - this.core_point[0]) * sinShift, this.point_FLB[2]];
      this.point_DLB = [this.core_point[0] + (this.point_DLB[0] - this.core_point[0]) * cosShift - (this.point_DLB[1] - this.core_point[1]) * sinShift, this.core_point[1] + (this.point_DLB[1] - this.core_point[1]) * cosShift + (this.point_DLB[0] - this.core_point[0]) * sinShift, this.point_DLB[2]];
      this.point_FRB = [this.core_point[0] + (this.point_FRB[0] - this.core_point[0]) * cosShift - (this.point_FRB[1] - this.core_point[1]) * sinShift, this.core_point[1] + (this.point_FRB[1] - this.core_point[1]) * cosShift + (this.point_FRB[0] - this.core_point[0]) * sinShift, this.point_FRB[2]];
      this.point_DRB = [this.core_point[0] + (this.point_DRB[0] - this.core_point[0]) * cosShift - (this.point_DRB[1] - this.core_point[1]) * sinShift, this.core_point[1] + (this.point_DRB[1] - this.core_point[1]) * cosShift + (this.point_DRB[0] - this.core_point[0]) * sinShift, this.point_DRB[2]];
    }
    else if (butId == 2) { //About X axis 
      this.point_FLT = [this.point_FLT[0], this.core_point[1] + (this.point_FLT[1] - this.core_point[1]) * cosShift + (this.point_FLT[2] - this.core_point[2]) * sinShift, this.core_point[2] + (this.point_FLT[2] - this.core_point[2]) * cosShift - (this.point_FLT[1] - this.core_point[1]) * sinShift];
      this.point_DLT = [this.point_DLT[0], this.core_point[1] + (this.point_DLT[1] - this.core_point[1]) * cosShift + (this.point_DLT[2] - this.core_point[2]) * sinShift, this.core_point[2] + (this.point_DLT[2] - this.core_point[2]) * cosShift - (this.point_DLT[1] - this.core_point[1]) * sinShift];
      this.point_FRT = [this.point_FRT[0], this.core_point[1] + (this.point_FRT[1] - this.core_point[1]) * cosShift + (this.point_FRT[2] - this.core_point[2]) * sinShift, this.core_point[2] + (this.point_FRT[2] - this.core_point[2]) * cosShift - (this.point_FRT[1] - this.core_point[1]) * sinShift];
      this.point_DRT = [this.point_DRT[0], this.core_point[1] + (this.point_DRT[1] - this.core_point[1]) * cosShift + (this.point_DRT[2] - this.core_point[2]) * sinShift, this.core_point[2] + (this.point_DRT[2] - this.core_point[2]) * cosShift - (this.point_DRT[1] - this.core_point[1]) * sinShift];
      this.point_FLB = [this.point_FLB[0], this.core_point[1] + (this.point_FLB[1] - this.core_point[1]) * cosShift + (this.point_FLB[2] - this.core_point[2]) * sinShift, this.core_point[2] + (this.point_FLB[2] - this.core_point[2]) * cosShift - (this.point_FLB[1] - this.core_point[1]) * sinShift];
      this.point_DLB = [this.point_DLB[0], this.core_point[1] + (this.point_DLB[1] - this.core_point[1]) * cosShift + (this.point_DLB[2] - this.core_point[2]) * sinShift, this.core_point[2] + (this.point_DLB[2] - this.core_point[2]) * cosShift - (this.point_DLB[1] - this.core_point[1]) * sinShift];
      this.point_FRB = [this.point_FRB[0], this.core_point[1] + (this.point_FRB[1] - this.core_point[1]) * cosShift + (this.point_FRB[2] - this.core_point[2]) * sinShift, this.core_point[2] + (this.point_FRB[2] - this.core_point[2]) * cosShift - (this.point_FRB[1] - this.core_point[1]) * sinShift];
      this.point_DRB = [this.point_DRB[0], this.core_point[1] + (this.point_DRB[1] - this.core_point[1]) * cosShift + (this.point_DRB[2] - this.core_point[2]) * sinShift, this.core_point[2] + (this.point_DRB[2] - this.core_point[2]) * cosShift - (this.point_DRB[1] - this.core_point[1]) * sinShift];
    }
    else if (butId == 3) { //About Y axis
      this.point_FLT = [this.core_point[0] + (this.point_FLT[0] - this.core_point[0]) * cosShift - (this.point_FLT[2] - this.core_point[2]) * sinShift, this.point_FLT[1], this.core_point[2] + (this.point_FLT[2] - this.core_point[2]) * cosShift + (this.point_FLT[0] - this.core_point[0]) * sinShift];
      this.point_DLT = [this.core_point[0] + (this.point_DLT[0] - this.core_point[0]) * cosShift - (this.point_DLT[2] - this.core_point[2]) * sinShift, this.point_DLT[1], this.core_point[2] + (this.point_DLT[2] - this.core_point[2]) * cosShift + (this.point_DLT[0] - this.core_point[0]) * sinShift];
      this.point_FRT = [this.core_point[0] + (this.point_FRT[0] - this.core_point[0]) * cosShift - (this.point_FRT[2] - this.core_point[2]) * sinShift, this.point_FRT[1], this.core_point[2] + (this.point_FRT[2] - this.core_point[2]) * cosShift + (this.point_FRT[0] - this.core_point[0]) * sinShift];
      this.point_DRT = [this.core_point[0] + (this.point_DRT[0] - this.core_point[0]) * cosShift - (this.point_DRT[2] - this.core_point[2]) * sinShift, this.point_DRT[1], this.core_point[2] + (this.point_DRT[2] - this.core_point[2]) * cosShift + (this.point_DRT[0] - this.core_point[0]) * sinShift];
      this.point_FLB = [this.core_point[0] + (this.point_FLB[0] - this.core_point[0]) * cosShift - (this.point_FLB[2] - this.core_point[2]) * sinShift, this.point_FLB[1], this.core_point[2] + (this.point_FLB[2] - this.core_point[2]) * cosShift + (this.point_FLB[0] - this.core_point[0]) * sinShift];
      this.point_DLB = [this.core_point[0] + (this.point_DLB[0] - this.core_point[0]) * cosShift - (this.point_DLB[2] - this.core_point[2]) * sinShift, this.point_DLB[1], this.core_point[2] + (this.point_DLB[2] - this.core_point[2]) * cosShift + (this.point_DLB[0] - this.core_point[0]) * sinShift];
      this.point_FRB = [this.core_point[0] + (this.point_FRB[0] - this.core_point[0]) * cosShift - (this.point_FRB[2] - this.core_point[2]) * sinShift, this.point_FRB[1], this.core_point[2] + (this.point_FRB[2] - this.core_point[2]) * cosShift + (this.point_FRB[0] - this.core_point[0]) * sinShift];
      this.point_DRB = [this.core_point[0] + (this.point_DRB[0] - this.core_point[0]) * cosShift - (this.point_DRB[2] - this.core_point[2]) * sinShift, this.point_DRB[1], this.core_point[2] + (this.point_DRB[2] - this.core_point[2]) * cosShift + (this.point_DRB[0] - this.core_point[0]) * sinShift];
    }
    this.findAngle();
  }

  // ****************************************************************Move or shift
  this.moveShape = function (xShift, yShift) {
    this.point_FLT = [this.point_FLT[0] + xShift, this.point_FLT[1] + yShift, this.point_FLT[2]];
    this.point_FRT = [this.point_FRT[0] + xShift, this.point_FRT[1] + yShift, this.point_FRT[2]];
    this.point_FLB = [this.point_FLB[0] + xShift, this.point_FLB[1] + yShift, this.point_FLB[2]];
    this.point_FRB = [this.point_FRB[0] + xShift, this.point_FRB[1] + yShift, this.point_FRB[2]];
    this.point_DLT = [this.point_DLT[0] + xShift, this.point_DLT[1] + yShift, this.point_DLT[2]];
    this.point_DRT = [this.point_DRT[0] + xShift, this.point_DRT[1] + yShift, this.point_DRT[2]];
    this.point_DLB = [this.point_DLB[0] + xShift, this.point_DLB[1] + yShift, this.point_DLB[2]];
    this.point_DRB = [this.point_DRB[0] + xShift, this.point_DRB[1] + yShift, this.point_DRB[2]];

    this.core_point = [this.core_point[0] + xShift, this.core_point[1] + yShift, this.core_point[2]];
  }

  // ***********************************************Resize********
  // *************************************************************  
  this.isInside = function (pointX, pointY) {
    var countHit = 0;

    context.beginPath();
    context.moveTo(this.point_FLT[0], this.point_FLT[1]);
    context.lineTo(this.point_DLT[0], this.point_DLT[1]);
    context.lineTo(this.point_DLB[0], this.point_DLB[1]);
    context.lineTo(this.point_FLB[0], this.point_FLB[1]);
    context.lineTo(this.point_FLT[0], this.point_FLT[1]);
    if (context.isPointInPath(pointX, pointY)) {
      countHit++;
    }

    context.beginPath();
    context.lineTo(this.point_FLT[0], this.point_FLT[1]);
    context.lineTo(this.point_FRT[0], this.point_FRT[1]);
    context.lineTo(this.point_FRB[0], this.point_FRB[1]);
    context.lineTo(this.point_FLB[0], this.point_FLB[1]);
    context.lineTo(this.point_FLT[0], this.point_FLT[1]);
    if (context.isPointInPath(pointX, pointY)) {
      countHit++;
    }

    context.beginPath();
    context.moveTo(this.point_FRT[0], this.point_FRT[1]);
    context.lineTo(this.point_DRT[0], this.point_DRT[1]);
    context.lineTo(this.point_DRB[0], this.point_DRB[1]);
    context.lineTo(this.point_FRB[0], this.point_FRB[1]);
    context.lineTo(this.point_FRT[0], this.point_FRT[1]);
    if (context.isPointInPath(pointX, pointY)) {
      countHit++;
    }

    context.beginPath();
    context.moveTo(this.point_DLT[0], this.point_DLT[1]);
    context.lineTo(this.point_DRT[0], this.point_DRT[1]);
    context.lineTo(this.point_DRB[0], this.point_DRB[1]);
    context.lineTo(this.point_DLB[0], this.point_DLB[1]);
    context.lineTo(this.point_DLT[0], this.point_DLT[1]);
    if (context.isPointInPath(pointX, pointY)) {
      countHit++;
    }

    context.beginPath();
    context.moveTo(this.point_FLT[0], this.point_FLT[1]);
    context.lineTo(this.point_FRT[0], this.point_FRT[1]);
    context.lineTo(this.point_DRT[0], this.point_DRT[1]);
    context.lineTo(this.point_DLT[0], this.point_DLT[1]);
    context.lineTo(this.point_FLT[0], this.point_FLT[1]);
    if (context.isPointInPath(pointX, pointY)) {
      countHit++;
    }

    context.beginPath();
    context.moveTo(this.point_FLB[0], this.point_FLB[1]);
    context.lineTo(this.point_FRB[0], this.point_FRB[1]);
    context.lineTo(this.point_DRB[0], this.point_DRB[1]);
    context.lineTo(this.point_DLB[0], this.point_DLB[1]);
    context.lineTo(this.point_FLB[0], this.point_FLB[1]);
    if (context.isPointInPath(pointX, pointY)) {
      countHit++;
    }

    if (countHit > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  this.getBoundingRect = function () {
    var vertices = [this.point_FLT, this.point_FRT, this.point_FLB, this.point_FRB,
    this.point_DLT, this.point_DRT, this.point_DLB, this.point_DRB];
    var maxXpoint = 0;
    var minXpoint = 1000;

    var maxYpoint = 0;
    var minYpoint = 1000;
    for (var i = 0; i < 8; ++i) {
      if (vertices[i][0] > maxXpoint) {
        maxXpoint = vertices[i][0];
      }
      if (vertices[i][0] < minXpoint) {
        minXpoint = vertices[i][0];
      }
      if (vertices[i][1] > maxYpoint) {
        maxYpoint = vertices[i][1];
      }
      if (vertices[i][1] < minYpoint) {
        minYpoint = vertices[i][1];
      }
    }
    this.boundingRect = [minXpoint, minYpoint, maxXpoint - minXpoint, maxYpoint - minYpoint];
    return this.boundingRect;
  }
}