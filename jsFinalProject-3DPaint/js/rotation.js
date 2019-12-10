;(function(){

  function mainFunc(parentContainer, newCanvas){
    var context = newCanvas.getContext('2d');

    var rotationLoop = setInterval(function(){
      
    });
  }

  var parentContainer = document.getElementById('canvas-container');
  var newCanvas = document.getElementById('new-canvas');
  newCanvas.setAttribute('width', '400');
  newCanvas.setAttribute('height', '400');
  newCanvas.style.position = 'absolute';
  newCanvas.style.left = '0px';
  newCanvas.style.top = '0px';
  newCanvas.style.overflow = 'auto';

  mainFunc(parentContainer, newCanvas);
})();