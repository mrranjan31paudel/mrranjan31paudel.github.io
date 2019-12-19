;(function(){

  function DrawingCanvas(parentContainer){
    this.height = 600;
    this.width = 1090;

    this.parentContainer = parentContainer;

    this.init = function(){
      var drawingCanvas = document.createElement('canvas');
      drawingCanvas.height = this.height;
      drawingCanvas.width = this.width;
      drawingCanvas.classList.add('drawing-canvas');
      this.parentContainer.appendChild(drawingCanvas);
      this.element = drawingCanvas;

      drawingCanvas.addEventListener('click', this.controlShape.bind(this));
      drawingCanvas.addEventListener('mousedown', this.holdShape.bind(this));
      drawingCanvas.addEventListener('mousemove', this.moveShapes.bind(this));
      drawingCanvas.addEventListener('mouseup', this.releaseShape.bind(this));
      document.addEventListener('keyup', this.deleteShape.bind(this));

      return this;
    }

    this.controlShape = function(){
      onClickPointX = event.clientX;
      onClickPointY = event.clientY;
      
      var pos = [onClickPointX, onClickPointY, 0]
      
      if(shapeId==null){
        for(var i=0; i<drawnShapeList.length; i++){
          if(drawnShapeList[i].isInside(onClickPointX, onClickPointY)){
            var selectionRect = drawnShapeList[i].getBoundingRect();
            shapeControlFlag = i;
            redrawAll();
            shapeOnControl = i;
            selectionBorder.drawSelectionBorder(selectionRect[0], selectionRect[1], selectionRect[2], selectionRect[3]);
          }
          
        }
      }
      else{
        selectionBorder.hideSelectionBorder();
        if(shapeId==0){
          var cube = new Cube(canvasContext, pos, 100, 100, 100, colorTable[colorId]);
          
          drawnShapeList.push(cube);
          shapeButtons[shapeId].element.style.backgroundColor = 'whitesmoke';
          redrawAll();
          shapeId=null;
        }
        else if(shapeId==1){
          var center = [pos[0], pos[1], pos[2]+50];
          var sphere = new Sphere(canvasContext, center, 100, colorTable[colorId]);
          drawnShapeList.push(sphere);
          shapeButtons[shapeId].element.style.backgroundColor = 'whitesmoke';
          redrawAll();
          shapeId=null;
        }
        // else if(shapeId==2){
        //   var cylinder = new Cylinder(canvasContext, pos, 100, 100, 100, colorTable[colorId]);
        //   cylinder.drawCylinder();
        //   shapeButtons[shapeId].element.style.backgroundColor = 'whitesmoke';
        //   shapeId=null;
        // }
        // else if(shapeId==3){
        //   var cone = new Cone(canvasContext, pos, 100, 100, 100, colorTable[colorId]);
        //   cone.drawCone();
        //   shapeButtons[shapeId].element.style.backgroundColor = 'whitesmoke';
        //   shapeId=null;
        // }
      }
    }

    this.holdShape = function(){
      if(shapeControlFlag!=null){
        shapeHoldFlag = shapeControlFlag; 
      }
    }

    this.moveShapes = function(){
      if(shapeHoldFlag!=null){
        var xpos = event.clientX;
        var ypos = event.clientY;
        var selectionRect = drawnShapeList[shapeHoldFlag].getBoundingRect();

        drawnShapeList[shapeHoldFlag].moveShape(xpos-onClickPointX, ypos-onClickPointY);
        onClickPointY = ypos;
        onClickPointX = xpos;
        selectionBorder.drawSelectionBorder(selectionRect[0], selectionRect[1], selectionRect[2], selectionRect[3]);
        redrawAll();

      }
    }

    this.releaseShape = function(){
      if(shapeControlFlag!=null){
        shapeHoldFlag=null;
      } 
    }

    this.deleteShape = function(){
      var pressedKey = event.key;
      
      if(pressedKey == 'Delete' && shapeControlFlag!=null){

        var selectionRect = drawnShapeList[shapeControlFlag].getBoundingRect();
        canvasContext.clearRect(selectionRect[0], selectionRect[1], selectionRect[2], selectionRect[3]);

        selectionBorder.hideSelectionBorder();

        var tempShape = drawnShapeList[0];
        drawnShapeList[0] = drawnShapeList[shapeControlFlag];
        drawnShapeList[shapeControlFlag] = tempShape;
        drawnShapeList.shift();

        shapeControlFlag=null
        shapeHoldFlag=null;

        redrawAll();
      }
    }
  }

  function ShapeButton(parentContainer){
    this.height = 50;
    this.width = 50;
    this.iconImg = 0;
    
    this.backgroundColor = 'rgba(44, 121, 236, 0.7)'
    
    this.parentContainer = parentContainer;

    this.init = function(){
      var shapeButton = document.createElement('img');
      shapeButton.style.height = this.height+'px';
      shapeButton.style.width = this.width+'px';
      shapeButton.style.margin = '10px';
      shapeButton.style.border = '1px solid rgb(205, 205, 205)';
      shapeButton.style.borderRadius = '5px';
      shapeButton.classList.add('shape-button');
      this.parentContainer.appendChild(shapeButton);
      shapeButton.addEventListener('click', this.shapeSelector.bind(this));
      this.element = shapeButton;

      return this;
    }
    this.placeIcon = function(){
      this.element.src = 'images/'+this.iconImg+'.png';
      
    }

    this.shapeSelector = function(){
      shapeId = this.iconImg;

      var butArr = document.getElementsByClassName('shape-button');
      for(var i=0; i<butArr.length; i++){
        
        if(i==this.iconImg){
          butArr[i].style.backgroundColor = this.backgroundColor;
        }
        else{
          butArr[i].style.backgroundColor = 'whitesmoke';
        }
      }
    }
  }

  function ColorButton(parentContainer) {
    this.height = 32;
    this.width = 32;
    this.colorIndex = 14;
    
    this.backgroundColor = '';
    
    this.parentContainer = parentContainer;

    this.init = function(){
      var colorButton = document.createElement('div');
      colorButton.style.height = this.height+'px';
      colorButton.style.width = this.width+'px';
      colorButton.style.borderRadius = '5px';
      colorButton.style.display = 'inline-block';
      colorButton.classList.add('color-button');
      this.parentContainer.appendChild(colorButton);
      this.element = colorButton;

      colorButton.addEventListener('click', this.colorSelector.bind(this));

      return this;
    }

    this.setColor = function(){
      this.element.style.backgroundColor = this.backgroundColor;
    }

    this.colorSelector = function(){
      var colorArr = document.getElementsByClassName('color-button');

      for(var i=0; i<18; i++){
        if(colorArr[i]==this.element){
          colorId = i;
          selectedColor.style.backgroundColor = colorTable[colorId];
          selectedColor.children[0].innerHTML = colorTable[colorId];
        }
      }
    }
  }

  function StretchButton(parentContainer){
    this.height = 10;
    this.width = 10;
    this.butId = 0;
    this.parentContainer = parentContainer;
    this.holdFlag = 0;

    this.init = function(){
      var stretchButton = document.createElement('button');
      stretchButton.style.height = this.height+'px';
      stretchButton.style.width = this.width+'px';
      stretchButton.style.position = 'absolute';
      stretchButton.style.zIndex = 50;
      stretchButton.style.display = 'none';
      stretchButton.classList.add('stretch-button');
      this.element = stretchButton;

      this.parentContainer.appendChild(stretchButton);

      stretchButton.addEventListener('mousedown', this.holdStretchButton.bind(this));
      document.addEventListener('mousemove', this.dragStretchButton.bind(this));
      document.addEventListener('mouseup', this.releaseStretchButton.bind(this));

      return this;
    }

    this.holdStretchButton = function(){
      if(this.holdFlag==0){
        onClickPointX = event.clientX;
        onClickPointY = event.clientY;  
      }
      this.holdFlag = 1;
      
    }

    this.dragStretchButton = function(){
      
      if(this.holdFlag==1){
        
        var xpos = event.clientX; 
        var ypos = event.clientY;

        if(this.butId==1){
          drawnShapeList[shapeOnControl].stretchShape(this.butId, -(ypos-onClickPointY));
        }
        else if(this.butId==2){
          drawnShapeList[shapeOnControl].stretchShape(this.butId, (xpos-onClickPointX));
        }
        else if(this.butId==3){
          drawnShapeList[shapeOnControl].stretchShape(this.butId, (ypos-onClickPointY));
        }
        else if(this.butId==4){
          drawnShapeList[shapeOnControl].stretchShape(this.butId, -(xpos-onClickPointX));
        }
        onClickPointX = xpos;
        onClickPointY = ypos;
        var selectionRect = drawnShapeList[shapeOnControl].getBoundingRect();
        redrawAll();
        selectionBorder.drawSelectionBorder(selectionRect[0], selectionRect[1], selectionRect[2], selectionRect[3]);
      }
    }

    this.releaseStretchButton = function(){
      this.holdFlag = 0;
    }
  }

  function RotateButton(parentContainer){
    this.height = 20;
    this.width = 20;
    this.butId = 0;
    this.holdFlag = 0;
    this.parentContainer = parentContainer;

    this.init = function(){
      var rotateButton = document.createElement('button');
      rotateButton.style.height = this.height+'px';
      rotateButton.style.width = this.width+'px';
      rotateButton.style.position = 'absolute';
      rotateButton.style.zIndex = 50;
      rotateButton.style.display = 'none';
      rotateButton.classList.add('rotate-button');
      this.element = rotateButton;
      this.parentContainer.appendChild(rotateButton);

      rotateButton.addEventListener('mousedown', this.holdRotateButton.bind(this));
      document.addEventListener('mousemove', this.dragRotateButton.bind(this));
      document.addEventListener('mouseup', this.releaseRotateButton.bind(this));

      return this;
    }
    this.holdRotateButton = function(){
      if(this.holdFlag==0){
        onClickPointX = event.clientX;
        onClickPointY = event.clientY;  
      }
      this.holdFlag = 1;
      
    }

    this.dragRotateButton = function(){
      
      if(this.holdFlag==1){
        
        var xpos = event.clientX; 
        var ypos = event.clientY;

        if(this.butId==1){
          drawnShapeList[shapeOnControl].rotateShape(this.butId, (xpos-onClickPointX));
        }
        else if(this.butId==2){
          drawnShapeList[shapeOnControl].rotateShape(this.butId, (ypos-onClickPointY));
        }
        else if(this.butId==3){
          drawnShapeList[shapeOnControl].rotateShape(this.butId, -(xpos-onClickPointX));
        }
        
        onClickPointX = xpos;
        onClickPointY = ypos;
        var selectionRect = drawnShapeList[shapeOnControl].getBoundingRect();
        redrawAll();
        selectionBorder.drawSelectionBorder(selectionRect[0], selectionRect[1], selectionRect[2], selectionRect[3]);
      }
    }

    this.releaseRotateButton = function(){
      this.holdFlag = 0;
    }
    // this.pressButton = function(){
    //   console.log(this.butId);
    //   drawnShapeList[shapeOnControl].rotateShape(this.butId, 0.01745);
    //   redrawAll();
    //   var selectionRect = drawnShapeList[shapeOnControl].getBoundingRect();
    //   selectionBorder.drawSelectionBorder(selectionRect[0], selectionRect[1], selectionRect[2], selectionRect[3]);
      
    // }
  }

  function SelectionBorder(){
    this.left = 0;
    this.top = 0;
    this.height = 0;
    this.width = 0;

    this.drawSelectionBorder = function(pointLeft, pointTop, boxWidth, boxHeight){
      this.left = pointLeft-20;
      this.top = pointTop-20;
      this.height = boxHeight+40;
      this.width = boxWidth+40;
      canvasContext.strokeStyle = canvasContext.setLineDash([5]);
      canvasContext.beginPath();
      canvasContext.strokeRect(this.left, this.top, this.width, this.height);
      canvasContext.strokeStyle = canvasContext.setLineDash([]);
      canvasContext.moveTo(this.left+this.width/2, this.top);
      canvasContext.lineTo(this.left+this.width/2, this.top-20);
      canvasContext.moveTo(this.left+this.width, this.top+this.height/2);
      canvasContext.lineTo(this.left+this.width+20, this.top+this.height/2);
      canvasContext.moveTo(this.left+this.width/2, this.top+this.height);
      canvasContext.lineTo(this.left+this.width/2, this.top+this.height+20);
      canvasContext.stroke();

      for(var i=0; i<3; i+=2){
        stretchButtons[i].element.style.display = 'block';
        stretchButtons[i].element.style.left = this.left+this.width/2-5+'px';
        stretchButtons[i].element.style.top = this.top+this.height*i/2-5+'px';
        
        stretchButtons[3-i].element.style.display = 'block';
        stretchButtons[3-i].element.style.left = this.left+this.width*i/2-5+'px';
        stretchButtons[3-i].element.style.top = this.top+this.height/2-5+'px';
      }

      var rotYpos = -40;
      for(var i=0; i<3; i++){
        var mulFactor = 2;
        var rotXpos = -10;
        if(i%2==0){
          mulFactor = 1;
        }
        else{
          var rotXpos = 20;
        }
        rotateButtons[i].element.style.display = 'block';
        rotateButtons[i].element.style.left = this.left+this.width*mulFactor/2+rotXpos+'px';
        rotateButtons[i].element.style.top = this.top+this.height*i/2+rotYpos+'px';
        rotYpos += 30;
      }
    }

    this.hideSelectionBorder = function(){
      for(var i=0; i<4; i++){
        stretchButtons[i].element.style.display = 'none';        
      }
      for(var i=0; i<3; i++){
        rotateButtons[i].element.style.display = 'none';
      }
    }
  }

  function redrawAll(){
    canvasContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    for(var i=0; i<drawnShapeList.length; ++i){
      drawnShapeList[i].drawShape();
    }
  }

  function MainDesign(drawingCanvasContainer, shapeContainer, colorContainer, colorPalette){
    this.init = function(){
      drawingCanvas = new DrawingCanvas(drawingCanvasContainer).init();
      canvasContext = drawingCanvas.element.getContext('2d');
      colorId = 14;
      for(var i=0; i<4; i++){
        var newButton = new ShapeButton(shapeContainer).init();
        newButton.iconImg = i;
        newButton.placeIcon();
        shapeButtons.push(newButton);

        var newStretchButton = new StretchButton(drawingCanvasContainer).init();
        newStretchButton.butId = i+1;
        stretchButtons.push(newStretchButton);
      }

      for(var i=0; i<3; i++){
        var newRotateButton = new RotateButton(drawingCanvasContainer).init();
        newRotateButton.butId = i+1;
        rotateButtons.push(newRotateButton);
      }
      
      for(var i=0; i<18; i++){
        var newButton = new ColorButton(colorPalette).init();
        newButton.backgroundColor = colorTable[i];
        newButton.setColor();
        colorButtons.push(newButton);
      }
      selectedColor.style.backgroundColor = colorTable[colorId];
      selectedColor.children[0].innerHTML = colorTable[colorId];

      selectionBorder = new SelectionBorder();
    }
  }

  var drawingCanvasContainer = document.getElementById('drawing-canvas-container');
  var shapeContainer = document.getElementById('shape-container');
  var colorContainer = document.getElementById('color-container');
  var colorPalette = document.getElementById('color-palette');
  var selectedColor = document.getElementById('selected-color');

  var drawingCanvas;
  var canvasContext;
  var selectionBorder;
  var shapeOnControl;

  var onClickPointX = 0;
  var onClickPointY = 0;

  var shapeButtons = [];
  var colorButtons = [];
  var stretchButtons = [];
  var rotateButtons = [];

  var drawnShapeList = [];

  var shapeId = null;
  var colorId = null;
  var shapeControlFlag = null;
  var shapeHoldFlag = null;
  
  var colorTable = ['white', 'lightgray', 'darkgray', 'black', 'darkred', 'red',
                    'orange', 'gold', 'lightyellow', 'yellow', 'lime', 'green',
                    'aqua', 'turquoise', 'blue', 'indigo', 'pink', 'brown'];

  new MainDesign(drawingCanvasContainer, shapeContainer, colorContainer, colorPalette).init();

})();