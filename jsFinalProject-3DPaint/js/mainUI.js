;(function(){

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
      // shapeButton.style.display = 'table-column';
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

      colorId = 14;

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

  function MainDesign(drawingCanvasContainer, drawingCanvas, shapeContainer, colorContainer, colorPalette){
    this.init = function(){
      var shapeButtons = [];
      var colorButtons = [];
      for(var i=0; i<4; i++){
        var newButton = new ShapeButton(shapeContainer).init();
        newButton.iconImg = i;
        newButton.placeIcon();
        shapeButtons.push(newButton);
      }
      for(var i=0; i<18; i++){
        var newButton = new ColorButton(colorPalette).init();
        newButton.backgroundColor = colorTable[i];
        newButton.setColor();
        colorButtons.push(newButton);
      }
      selectedColor.style.backgroundColor = colorTable[colorId];
      selectedColor.children[0].innerHTML = colorTable[colorId];
    }
  }

  var drawingCanvasContainer = document.getElementById('drawing-canvas-container');
  var drawingCanvas = document.getElementById('drawing-canvas');
  var shapeContainer = document.getElementById('shape-container');
  var colorContainer = document.getElementById('color-container');
  var colorPalette = document.getElementById('color-palette');
  var selectedColor = document.getElementById('selected-color');

  var shapeId = null;
  var colorId = null;
  
  var colorTable = ['white', 'lightgray', 'darkgray', 'black', 'darkred', 'red',
                    'orange', 'gold', 'lightyellow', 'yellow', 'lime', 'green',
                    'aqua', 'turquoise', 'blue', 'indigo', 'pink', 'brown'];

  new MainDesign(drawingCanvasContainer, drawingCanvas, shapeContainer, colorContainer, colorPalette).init();

})();