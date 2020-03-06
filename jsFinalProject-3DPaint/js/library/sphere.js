function Sphere(context, centerPoint, radius, sphereColor) {
  this.center = centerPoint;
  this.radiusA = radius; //For ellipsoid
  this.radiusB = radius; //For ellipsoid
  this.radiusC = radius;

  this.stackCount = 18;
  this.sectorCount = 54;

  this.boundingRect = [];

  var that = this;

  this.axisX = [[this.center[0] - this.radiusA, this.center[1], this.center[2]]
    , [this.center[0] + this.radiusA, this.center[1], this.center[2]]];
  this.axisY = [[this.center[0], this.center[1] - this.radiusB, this.center[2]]
    , [this.center[0], this.center[1] + this.radiusB, this.center[2]]];
  this.axisZ = [[this.center[0], this.center[1], this.center[2] - this.radiusC]
    , [this.center[0], this.center[1], this.center[2] + this.radiusC]];

  this.axisXangXY = 0;
  this.axisYangXY = 0;
  this.axisZangXY = Math.PI / 2;

  this.vertices = [];

  populateVertices(that);
  loadVertices(that);

  function populateVertices(sph) {
    var limit = this.sectorCount * this.stackCount;
    for (var i = 0; i < limit; ++i) {
      sph.vertices.push([]);
    }
  }

  function loadVertices(sph) {
    var piVal = Math.PI;
    var vertexArrayIndex = 0;
    console.log('loading');

    for (var i = 0; i <= sph.stackCount; ++i) {
      for (var j = 0; j <= sph.sectorCount; ++j) {

        sectorAngle = j * 2 * piVal / sph.sectorCount;
        stackAngle = piVal / 2 - i * piVal / sph.stackCount;

        temppointX = sph.radiusA * Math.cos(stackAngle) * Math.cos(sectorAngle);
        temppointY = sph.radiusB * Math.cos(stackAngle) * Math.sin(sectorAngle);
        temppointZ = sph.radiusC * Math.sin(stackAngle);

        sph.vertices[vertexArrayIndex] = [temppointX, temppointY, temppointZ];
        vertexArrayIndex++;
      }
    }
  }

  this.drawShape = function () {

    var k1, k2;

    context.beginPath();
    context.strokeStyle = sphereColor;

    for (var i = 0; i < this.stackCount; ++i) {
      k1 = i * (this.sectorCount + 1);
      k2 = k1 + this.sectorCount + 1;
      context.moveTo(this.center[0] + this.vertices[k1][0], this.center[1] + this.vertices[k1][1]);
      for (var j = 0; j < this.sectorCount; ++j, ++k1, ++k2) {
        if (i != 0) {
          context.lineTo(this.center[0] + this.vertices[k1][0], this.center[1] + this.vertices[k1][1]);
          context.lineTo(this.center[0] + this.vertices[k2][0], this.center[1] + this.vertices[k2][1]);
          context.lineTo(this.center[0] + this.vertices[k1 + 1][0], this.center[1] + this.vertices[k1 + 1][1]);
        }

        if (i != (this.stackCount - 1)) {
          context.lineTo(this.center[0] + this.vertices[k1 + 1][0], this.center[1] + this.vertices[k1 + 1][1]);
          context.lineTo(this.center[0] + this.vertices[k2][0], this.center[1] + this.vertices[k2][1]);
          context.lineTo(this.center[0] + this.vertices[k2 + 1][0], this.center[1] + this.vertices[k2 + 1][1]);
        }
      }
    }
    context.stroke();
  }

  this.stretchShape = function (butId, shift) {
    var ang45 = Math.PI / 4;

    var magXaxis = Math.sqrt(Math.pow(this.axisX[1][0] - this.axisX[0][0], 2) + Math.pow(this.axisX[1][1] - this.axisX[0][1], 2) + Math.pow(this.axisX[1][2] - this.axisX[0][2], 2));
    var magYaxis = Math.sqrt(Math.pow(this.axisY[1][0] - this.axisY[0][0], 2) + Math.pow(this.axisY[1][1] - this.axisY[0][1], 2) + Math.pow(this.axisY[1][2] - this.axisY[0][2], 2));
    var magZaxis = Math.sqrt(Math.pow(this.axisZ[1][0] - this.axisZ[0][0], 2) + Math.pow(this.axisZ[1][1] - this.axisZ[0][1], 2) + Math.pow(this.axisZ[1][2] - this.axisZ[0][2], 2));

    var axisXang = Math.atan(Math.abs((this.axisX[1][1] - this.axisX[0][1]) / (this.axisX[1][0] - this.axisX[0][0])));
    var axisYang = Math.atan(Math.abs((this.axisY[1][1] - this.axisY[0][1]) / (this.axisY[1][0] - this.axisY[0][0])));
    var axisZang = Math.atan(Math.abs((this.axisZ[1][1] - this.axisZ[0][1]) / (this.axisZ[1][0] - this.axisZ[0][0])));

    var shiftFactorX = shift / magXaxis;
    var shiftFactorY = 0.5 * shift / magYaxis;
    var shiftFactorZ = 0.5 * shift / magZaxis;

    var unitVectorX = [(this.axisX[1][0] - this.axisX[0][0]) / magXaxis, (this.axisX[1][1] - this.axisX[0][1]) / magXaxis, (this.axisX[1][2] - this.axisX[0][2]) / magXaxis];
    var unitVectorY = [(this.axisY[1][0] - this.axisY[0][0]) / magYaxis, (this.axisY[1][1] - this.axisY[0][1]) / magYaxis, (this.axisY[1][2] - this.axisY[0][2]) / magYaxis];
    var unitVectorZ = [(this.axisZ[1][0] - this.axisZ[0][0]) / magZaxis, (this.axisZ[1][1] - this.axisZ[0][1]) / magZaxis, (this.axisZ[1][2] - this.axisZ[0][2]) / magZaxis];

    if (Math.abs(this.axisXangXY) >= Math.abs(this.axisYangXY) && Math.abs(this.axisXangXY) >= Math.abs(this.axisZangXY)) {
      if (butId == 1) {
        if (axisYang >= ang45 && this.axisY[1][1] > this.axisY[0][1]) {
          this.stretchUpdate(this.axisY[1], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
        else if (axisYang >= ang45 && this.axisY[0][1] > this.axisY[1][1]) {
          unitVectorY = [-unitVectorY[0], -unitVectorY[1], -unitVectorY[2]];
          this.stretchUpdate(this.axisY[0], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
        else if (axisZang >= ang45 && this.axisZ[1][1] > this.axisZ[0][1]) {
          this.stretchUpdate(this.axisZ[1], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }
        else if (axisZang >= ang45 && this.axisZ[0][1] > this.axisZ[1][1]) {
          unitVectorZ = [-unitVectorZ[0], -unitVectorZ[1], -unitVectorZ[2]];
          this.stretchUpdate(this.axisZ[0], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);

        }
      }
      else if (butId == 2) {
        if (axisYang >= ang45 && this.axisZ[0][0] > this.axisZ[1][0]) {
          this.stretchUpdate(this.axisZ[1], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }
        else if (axisYang >= ang45 && this.axisZ[1][0] > this.axisZ[0][0]) {
          unitVectorZ = [-unitVectorZ[0], -unitVectorZ[1], -unitVectorZ[2]];
          this.stretchUpdate(this.axisZ[0], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }

        else if (axisZang >= ang45 && this.axisY[0][0] > this.axisY[1][0]) {
          this.stretchUpdate(this.axisY[1], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
        else if (axisZang >= ang45 && this.axisY[1][0] > this.axisY[0][0]) {
          unitVectorY = [-unitVectorY[0], -unitVectorY[1], -unitVectorY[2]];
          this.stretchUpdate(this.axisY[0], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
      }
      else if (butId == 3) {
        if (axisYang >= ang45 && this.axisY[0][1] > this.axisY[1][1]) {
          this.stretchUpdate(this.axisY[1], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
        else if (axisYang >= ang45 && this.axisY[1][1] > this.axisY[0][1]) {
          unitVectorY = [-unitVectorY[0], -unitVectorY[1], -unitVectorY[2]];
          this.stretchUpdate(this.axisY[0], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
        else if (axisZang >= ang45 && this.axisZ[0][1] > this.axisZ[1][1]) {
          this.stretchUpdate(this.axisZ[1], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }
        else if (axisZang >= ang45 && this.axisZ[1][1] > this.axisZ[0][1]) {
          unitVectorZ = [-unitVectorZ[0], -unitVectorZ[1], -unitVectorZ[2]];
          this.stretchUpdate(this.axisZ[0], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }
      }
      else if (butId == 4) {
        if (axisYang >= ang45 && this.axisZ[1][0] > this.axisZ[0][0]) {
          this.stretchUpdate(this.axisZ[1], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }

        else if (axisYang >= ang45 && this.axisZ[0][0] > this.axisZ[1][0]) {
          unitVectorZ = [-unitVectorZ[0], -unitVectorZ[1], -unitVectorZ[2]];
          this.stretchUpdate(this.axisZ[0], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }

        else if (axisZang >= ang45 && this.axisY[1][0] > this.axisY[0][0]) {
          this.stretchUpdate(this.axisY[1], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
        else if (axisZang >= ang45 && this.axisY[0][0] > this.axisY[1][0]) {
          unitVectorY = [-unitVectorY[0], -unitVectorY[1], -unitVectorY[2]];
          this.stretchUpdate(this.axisY[0], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
      }
    }

    else if (Math.abs(this.axisYangXY) > Math.abs(this.axisZangXY) && Math.abs(this.axisYangXY) > Math.abs(this.axisXangXY)) {
      if (butId == 1) {
        if (axisXang >= ang45 && this.axisX[1][1] > this.axisX[0][1]) {
          this.stretchUpdate(this.axisX[1], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisXang >= ang45 && this.axisX[0][1] > this.axisX[1][1]) {
          unitVectorX = [-unitVectorX[0], -unitVectorX[1], -unitVectorX[2]];
          this.stretchUpdate(this.axisX[0], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisZang >= ang45 && this.axisZ[1][1] > this.axisZ[0][1]) {
          this.stretchUpdate(this.axisZ[1], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }
        else if (axisZang >= ang45 && this.axisZ[0][1] > this.axisZ[1][1]) {
          unitVectorZ = [-unitVectorZ[0], -unitVectorZ[1], -unitVectorZ[2]];
          this.stretchUpdate(this.axisZ[0], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }
      }
      else if (butId == 2) {
        if (axisXang >= ang45 && this.axisZ[0][0] > this.axisZ[1][0]) {
          this.stretchUpdate(this.axisZ[1], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }

        else if (axisXang >= ang45 && this.axisZ[1][0] > this.axisZ[0][0]) {
          unitVectorZ = [-unitVectorZ[0], -unitVectorZ[1], -unitVectorZ[2]];
          this.stretchUpdate(this.axisZ[0], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }

        else if (axisZang >= ang45 && this.axisX[0][0] > this.axisX[1][0]) {
          this.stretchUpdate(this.axisX[1], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisZang >= ang45 && this.axisX[1][0] > this.axisX[0][0]) {
          unitVectorX = [-unitVectorX[0], -unitVectorX[1], -unitVectorX[2]];
          this.stretchUpdate(this.axisX[0], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
      }
      else if (butId == 3) {
        if (axisXang >= ang45 && this.axisX[1][1] > this.axisX[0][1]) {
          unitVectorX = [-unitVectorX[0], -unitVectorX[1], -unitVectorX[2]];
          this.stretchUpdate(this.axisX[0], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisXang >= ang45 && this.axisX[0][1] > this.axisX[1][1]) {
          this.stretchUpdate(this.axisX[1], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisZang >= ang45 && this.axisZ[1][1] > this.axisZ[0][1]) {
          unitVectorZ = [-unitVectorZ[0], -unitVectorZ[1], -unitVectorZ[2]];
          this.stretchUpdate(this.axisZ[0], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }
        else if (axisZang >= ang45 && this.axisZ[0][1] > this.axisZ[1][1]) {
          this.stretchUpdate(this.axisZ[1], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }
      }
      else if (butId == 4) {
        if (axisXang >= ang45 && this.axisZ[0][0] > this.axisZ[1][0]) {
          unitVectorZ = [-unitVectorZ[0], -unitVectorZ[1], -unitVectorZ[2]];
          this.stretchUpdate(this.axisZ[0], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }

        else if (axisXang >= ang45 && this.axisZ[1][0] > this.axisZ[0][0]) {
          this.stretchUpdate(this.axisZ[1], unitVectorZ, shiftFactorZ, this.radiusC, 4, 4, 2);
        }

        else if (axisZang >= ang45 && this.axisX[0][0] > this.axisX[1][0]) {
          unitVectorX = [-unitVectorX[0], -unitVectorX[1], -unitVectorX[2]];
          this.stretchUpdate(this.axisX[0], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisZang >= ang45 && this.axisX[1][0] > this.axisX[0][0]) {

          this.stretchUpdate(this.axisX[1], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
      }
    }

    else if (Math.abs(this.axisZangXY) > Math.abs(this.axisXangXY) && Math.abs(this.axisZangXY) > Math.abs(this.axisYangXY)) {
      if (butId == 1) {
        if (axisXang >= ang45 && this.axisX[1][1] > this.axisX[0][1]) {
          this.stretchUpdate(this.axisX[1], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisXang >= ang45 && this.axisX[0][1] > this.axisX[1][1]) {
          unitVectorX = [-unitVectorX[0], -unitVectorX[1], -unitVectorX[2]];
          this.stretchUpdate(this.axisX[0], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisYang >= ang45 && this.axisY[1][1] > this.axisY[0][1]) {
          this.stretchUpdate(this.axisY[1], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
        else if (axisYang >= ang45 && this.axisY[0][1] > this.axisY[1][1]) {
          unitVectorY = [-unitVectorY[0], -unitVectorY[1], -unitVectorY[2]];
          this.stretchUpdate(this.axisY[0], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
      }
      else if (butId == 2) {
        if (axisXang >= ang45 && this.axisY[0][0] > this.axisY[1][0]) {
          this.stretchUpdate(this.axisY[1], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }

        else if (axisXang >= ang45 && this.axisY[1][0] > this.axisY[0][0]) {
          unitVectorY = [-unitVectorY[0], -unitVectorY[1], -unitVectorY[2]];
          this.stretchUpdate(this.axisY[0], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }

        else if (axisYang >= ang45 && this.axisX[0][0] > this.axisX[1][0]) {
          this.stretchUpdate(this.axisX[1], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisYang >= ang45 && this.axisX[1][0] > this.axisX[0][0]) {
          unitVectorX = [-unitVectorX[0], -unitVectorX[1], -unitVectorX[2]];
          this.stretchUpdate(this.axisX[0], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
      }
      else if (butId == 3) {
        if (axisXang >= ang45 && this.axisX[1][1] > this.axisX[0][1]) {
          unitVectorX = [-unitVectorX[0], -unitVectorX[1], -unitVectorX[2]];
          this.stretchUpdate(this.axisX[0], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisXang >= ang45 && this.axisX[0][1] > this.axisX[1][1]) {
          this.stretchUpdate(this.axisX[1], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisYang >= ang45 && this.axisY[1][1] > this.axisY[0][1]) {
          unitVectorY = [-unitVectorY[0], -unitVectorY[1], -unitVectorY[2]];
          this.stretchUpdate(this.axisY[0], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
        else if (axisYang >= ang45 && this.axisY[0][1] > this.axisY[1][1]) {
          this.stretchUpdate(this.axisY[1], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }
      }
      else if (butId == 4) {
        if (axisXang >= ang45 && this.axisY[0][0] > this.axisY[1][0]) {
          unitVectorY = [-unitVectorY[0], -unitVectorY[1], -unitVectorY[2]];
          this.stretchUpdate(this.axisY[0], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }

        else if (axisXang >= ang45 && this.axisY[1][0] > this.axisY[0][0]) {
          this.stretchUpdate(this.axisY[1], unitVectorY, shiftFactorY, this.radiusB, 4, 2, 4);
        }

        else if (axisYang >= ang45 && this.axisX[0][0] > this.axisX[1][0]) {
          unitVectorX = [-unitVectorX[0], -unitVectorX[1], -unitVectorX[2]];
          this.stretchUpdate(this.axisX[0], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
        else if (axisYang >= ang45 && this.axisX[1][0] > this.axisX[0][0]) {

          this.stretchUpdate(this.axisX[1], unitVectorX, shiftFactorX, this.radiusA, 2, 4, 4);
        }
      }
    }
  }

  this.stretchUpdate = function (statPoint, unitVector, shiftFactor, radius, XupdateFactor, YupdateFactor, ZupdateFactor) {
    for (var i = 0; i < this.vertices.length; ++i) {

      var dotProduct = unitVector[0] * (this.vertices[i][0] + this.center[0] - statPoint[0]) + unitVector[1] * (this.vertices[i][1] + this.center[1] - statPoint[1]) + unitVector[2] * (this.vertices[i][2] + this.center[2] - statPoint[2]);
      var projectedPoint = [unitVector[0] * dotProduct, unitVector[1] * dotProduct, unitVector[2] * dotProduct];

      var newDistance = Math.sqrt(Math.pow(statPoint[0] - projectedPoint[0] - this.center[0], 2) + Math.pow(statPoint[1] - projectedPoint[1] - this.center[1], 2) + Math.pow(statPoint[2] - projectedPoint[2] - this.center[2], 2)) * shiftFactor;

      this.vertices[i] = [this.vertices[i][0] - newDistance * unitVector[0], this.vertices[i][1] - newDistance * unitVector[1], this.vertices[i][2] - newDistance * unitVector[2]];
    }
    this.axisX = [[this.axisX[0][0] - XupdateFactor * radius * shiftFactor * unitVector[0], this.axisX[0][1] - XupdateFactor * radius * shiftFactor * unitVector[1], this.axisX[0][2] - XupdateFactor * radius * shiftFactor * unitVector[2]],
    [this.axisX[1][0] - XupdateFactor * radius * shiftFactor * unitVector[0], this.axisX[1][1] - XupdateFactor * radius * shiftFactor * unitVector[1], this.axisX[1][2] - XupdateFactor * radius * shiftFactor * unitVector[2]]];

    this.axisY = [[this.axisY[0][0] - YupdateFactor * radius * shiftFactor * unitVector[0], this.axisY[0][1] - YupdateFactor * radius * shiftFactor * unitVector[1], this.axisY[0][2] - YupdateFactor * radius * shiftFactor * unitVector[2]],
    [this.axisY[1][0] - YupdateFactor * radius * shiftFactor * unitVector[0], this.axisY[1][1] - YupdateFactor * radius * shiftFactor * unitVector[1], this.axisY[1][2] - YupdateFactor * radius * shiftFactor * unitVector[2]]];

    this.axisZ = [[this.axisZ[0][0] - ZupdateFactor * radius * shiftFactor * unitVector[0], this.axisZ[0][1] - ZupdateFactor * radius * shiftFactor * unitVector[1], this.axisZ[0][2] - ZupdateFactor * radius * shiftFactor * unitVector[2]],
    [this.axisZ[1][0] - ZupdateFactor * radius * shiftFactor * unitVector[0], this.axisZ[1][1] - ZupdateFactor * radius * shiftFactor * unitVector[1], this.axisZ[1][2] - ZupdateFactor * radius * shiftFactor * unitVector[2]]];

    this.center = [this.center[0] - radius * shiftFactor * unitVector[0], this.center[1] - radius * shiftFactor * unitVector[1], this.center[2] - radius * shiftFactor * unitVector[2]];
    radius = radius - shiftFactor * radius;
  }

  this.rotateShape = function (butId, degAngle) {
    var radAngle = degAngle * Math.PI / 180;

    var sinShift = Math.sin(radAngle);
    var cosShift = Math.cos(radAngle);

    if (butId == 1) { //About Z axis 

      for (var i = 0; i < this.vertices.length; ++i) {
        this.vertices[i] = [(this.vertices[i][0]) * cosShift - (this.vertices[i][1]) * sinShift,
        (this.vertices[i][1]) * cosShift + (this.vertices[i][0]) * sinShift,
        this.vertices[i][2]];
      }
      this.axisX = [[this.center[0] + (this.axisX[0][0] - this.center[0]) * cosShift - (this.axisX[0][1] - this.center[1]) * sinShift, this.center[1] + (this.axisX[0][1] - this.center[1]) * cosShift + (this.axisX[0][0] - this.center[0]) * sinShift, this.axisX[0][2]],
      [this.center[0] + (this.axisX[1][0] - this.center[0]) * cosShift - (this.axisX[1][1] - this.center[1]) * sinShift, this.center[1] + (this.axisX[1][1] - this.center[1]) * cosShift + (this.axisX[1][0] - this.center[0]) * sinShift, this.axisX[1][2]]];

      this.axisY = [[this.center[0] + (this.axisY[0][0] - this.center[0]) * cosShift - (this.axisY[0][1] - this.center[1]) * sinShift, this.center[1] + (this.axisY[0][1] - this.center[1]) * cosShift + (this.axisY[0][0] - this.center[0]) * sinShift, this.axisY[0][2]],
      [this.center[0] + (this.axisY[1][0] - this.center[0]) * cosShift - (this.axisY[1][1] - this.center[1]) * sinShift, this.center[1] + (this.axisY[1][1] - this.center[1]) * cosShift + (this.axisY[1][0] - this.center[0]) * sinShift, this.axisY[1][2]]];

      this.axisZ = [[this.center[0] + (this.axisZ[0][0] - this.center[0]) * cosShift - (this.axisZ[0][1] - this.center[1]) * sinShift, this.center[1] + (this.axisZ[0][1] - this.center[1]) * cosShift + (this.axisZ[0][0] - this.center[0]) * sinShift, this.axisZ[0][2]],
      [this.center[0] + (this.axisZ[1][0] - this.center[0]) * cosShift - (this.axisZ[1][1] - this.center[1]) * sinShift, this.center[1] + (this.axisZ[1][1] - this.center[1]) * cosShift + (this.axisZ[1][0] - this.center[0]) * sinShift, this.axisZ[1][2]]];
    }
    if (butId == 2) { //About X axis 
      for (var i = 0; i < this.vertices.length; ++i) {
        this.vertices[i] = [this.vertices[i][0],
        (this.vertices[i][1]) * cosShift + (this.vertices[i][2]) * sinShift,
        (this.vertices[i][2]) * cosShift - (this.vertices[i][1]) * sinShift];
      }

      this.axisX = [[this.axisX[0][0], this.center[1] + (this.axisX[0][1] - this.center[1]) * cosShift + (this.axisX[0][2] - this.center[2]) * sinShift, this.center[2] + (this.axisX[0][2] - this.center[2]) * cosShift - (this.axisX[0][1] - this.center[1]) * sinShift],
      [this.axisX[1][0], this.center[1] + (this.axisX[1][1] - this.center[1]) * cosShift + (this.axisX[1][2] - this.center[2]) * sinShift, this.center[2] + (this.axisX[1][2] - this.center[2]) * cosShift - (this.axisX[1][1] - this.center[1]) * sinShift]];

      this.axisY = [[this.axisY[0][0], this.center[1] + (this.axisY[0][1] - this.center[1]) * cosShift + (this.axisY[0][2] - this.center[2]) * sinShift, this.center[2] + (this.axisY[0][2] - this.center[2]) * cosShift - (this.axisY[0][1] - this.center[1]) * sinShift],
      [this.axisY[1][0], this.center[1] + (this.axisY[1][1] - this.center[1]) * cosShift + (this.axisY[1][2] - this.center[2]) * sinShift, this.center[2] + (this.axisY[1][2] - this.center[2]) * cosShift - (this.axisY[1][1] - this.center[1]) * sinShift]];

      this.axisZ = [[this.axisZ[0][0], this.center[1] + (this.axisZ[0][1] - this.center[1]) * cosShift + (this.axisZ[0][2] - this.center[2]) * sinShift, this.center[2] + (this.axisZ[0][2] - this.center[2]) * cosShift - (this.axisZ[0][1] - this.center[1]) * sinShift],
      [this.axisZ[1][0], this.center[1] + (this.axisZ[1][1] - this.center[1]) * cosShift + (this.axisZ[1][2] - this.center[2]) * sinShift, this.center[2] + (this.axisZ[1][2] - this.center[2]) * cosShift - (this.axisZ[1][1] - this.center[1]) * sinShift]];
    }
    if (butId == 3) { //About Y axis
      for (var i = 0; i < this.vertices.length; ++i) {
        this.vertices[i] = [(this.vertices[i][0]) * cosShift - (this.vertices[i][2]) * sinShift,
        this.vertices[i][1],
        (this.vertices[i][2]) * cosShift + (this.vertices[i][0]) * sinShift];
      }

      this.axisX = [[this.center[0] + (this.axisX[0][0] - this.center[0]) * cosShift - (this.axisX[0][2] - this.center[2]) * sinShift, this.axisX[0][1], this.center[2] + (this.axisX[0][2] - this.center[2]) * cosShift + (this.axisX[0][0] - this.center[0]) * sinShift],
      [this.center[0] + (this.axisX[1][0] - this.center[0]) * cosShift - (this.axisX[1][2] - this.center[2]) * sinShift, this.axisX[1][1], this.center[2] + (this.axisX[1][2] - this.center[2]) * cosShift + (this.axisX[1][0] - this.center[0]) * sinShift]];

      this.axisY = [[this.center[0] + (this.axisY[0][0] - this.center[0]) * cosShift - (this.axisY[0][2] - this.center[2]) * sinShift, this.axisY[0][1], this.center[2] + (this.axisY[0][2] - this.center[2]) * cosShift + (this.axisY[0][0] - this.center[0]) * sinShift],
      [this.center[0] + (this.axisY[1][0] - this.center[0]) * cosShift - (this.axisY[1][2] - this.center[2]) * sinShift, this.axisY[1][1], this.center[2] + (this.axisY[1][2] - this.center[2]) * cosShift + (this.axisY[1][0] - this.center[0]) * sinShift]];

      this.axisZ = [[this.center[0] + (this.axisZ[0][0] - this.center[0]) * cosShift - (this.axisZ[0][2] - this.center[2]) * sinShift, this.axisZ[0][1], this.center[2] + (this.axisZ[0][2] - this.center[2]) * cosShift + (this.axisZ[0][0] - this.center[0]) * sinShift],
      [this.center[0] + (this.axisZ[1][0] - this.center[0]) * cosShift - (this.axisZ[1][2] - this.center[2]) * sinShift, this.axisZ[1][1], this.center[2] + (this.axisZ[1][2] - this.center[2]) * cosShift + (this.axisZ[1][0] - this.center[0]) * sinShift]];
    }
    this.findAngle();
  }

  this.findAngle = function () {
    var axisXmag = Math.sqrt(Math.pow(this.axisX[1][0] - this.axisX[0][0], 2) + Math.pow(this.axisX[1][1] - this.axisX[0][1], 2) + Math.pow(this.axisX[1][2] - this.axisX[0][2], 2));
    var axisYmag = Math.sqrt(Math.pow(this.axisY[1][0] - this.axisY[0][0], 2) + Math.pow(this.axisY[1][1] - this.axisY[0][1], 2) + Math.pow(this.axisY[1][2] - this.axisY[0][2], 2));
    var axisZmag = Math.sqrt(Math.pow(this.axisZ[1][0] - this.axisZ[0][0], 2) + Math.pow(this.axisZ[1][1] - this.axisZ[0][1], 2) + Math.pow(this.axisZ[1][2] - this.axisZ[0][2], 2));
    this.axisXangXY = Math.asin((this.axisX[1][2] - this.axisX[0][2]) / axisXmag);
    this.axisYangXY = Math.asin((this.axisY[1][2] - this.axisY[0][2]) / axisYmag);
    this.axisZangXY = Math.asin((this.axisZ[1][2] - this.axisZ[0][2]) / axisZmag);
  }

  this.moveShape = function (xShift, yShift) {
    this.center = [this.center[0] + xShift, this.center[1] + yShift, this.center[2]];

    this.axisX = [[this.axisX[0][0] + xShift, this.axisX[0][1] + yShift, this.axisX[0][2]], [this.axisX[1][0] + xShift, this.axisX[1][1] + yShift, this.axisX[1][2]]];
    this.axisY = [[this.axisY[0][0] + xShift, this.axisY[0][1] + yShift, this.axisY[0][2]], [this.axisY[1][0] + xShift, this.axisY[1][1] + yShift, this.axisY[1][2]]];
    this.axisZ = [[this.axisZ[0][0] + xShift, this.axisZ[0][1] + yShift, this.axisZ[0][2]], [this.axisZ[1][0] + xShift, this.axisZ[1][1] + yShift, this.axisZ[1][2]]];
  }

  this.getBoundingRect = function () {
    var maxXPoint = 0;
    var minXPoint = 1000;

    var maxYPoint = 0;
    var minYPoint = 1000;

    for (var j = 0; j < this.vertices.length; ++j) {

      if (maxXPoint < this.vertices[j][0]) {
        maxXPoint = this.vertices[j][0];
      }
      if (minXPoint >= this.vertices[j][0]) {
        minXPoint = this.vertices[j][0];
      }
      if (maxYPoint < this.vertices[j][1]) {
        maxYPoint = this.vertices[j][1];
      }
      if (minYPoint >= this.vertices[j][1]) {
        minYPoint = this.vertices[j][1];
      }
    }

    this.boundingRect = [this.center[0] + minXPoint, this.center[1] + minYPoint, maxXPoint - minXPoint, maxYPoint - minYPoint];

    return this.boundingRect;
  }

  this.isInside = function (pointX, pointY) {

    var k1, k2;

    context.beginPath();

    for (var i = 0; i < this.stackCount; ++i) {
      k1 = i * (this.sectorCount + 1);
      k2 = k1 + this.sectorCount + 1;
      context.moveTo(this.center[0] - this.vertices[k1][0], this.center[1] - this.vertices[k1][1]);
      for (var j = 0; j < this.sectorCount; ++j, ++k1, ++k2) {
        if (i != 0) {
          context.lineTo(this.center[0] - this.vertices[k1][0], this.center[1] - this.vertices[k1][1]);
          context.lineTo(this.center[0] - this.vertices[k2][0], this.center[1] - this.vertices[k2][1]);
          context.lineTo(this.center[0] - this.vertices[k1 + 1][0], this.center[1] - this.vertices[k1 + 1][1]);
        }

        if (i != (this.stackCount - 1)) {
          context.lineTo(this.center[0] - this.vertices[k1 + 1][0], this.center[1] - this.vertices[k1 + 1][1]);
          context.lineTo(this.center[0] - this.vertices[k2][0], this.center[1] - this.vertices[k2][1]);
          context.lineTo(this.center[0] - this.vertices[k2 + 1][0], this.center[1] - this.vertices[k2 + 1][1]);
        }
      }
    }
    context.closePath();
    if (context.isPointInPath(pointX, pointY)) {
      return true;
    }
    else {
      return false;
    }
  }
}