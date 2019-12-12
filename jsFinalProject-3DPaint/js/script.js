;(function(){
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

      cube.rotateCubeAbtX(angle*5);
      cube.rotateCubeAbtY(-angle*25)
      cube.rotateCubeAbtZ(angle*44);

      // cube.rotateCubeAbtX(-Math.PI/2);
      // cube.rotateCubeAbtZ(Math.PI/4);
      // cube.stretchCubeXdir(-2, 40);
      
      // cube.rotateCubeAbtX(angle*5);
      // cube.rotateCubeAbtY(-angle*25)
      // cube.rotateCubeAbtZ(angle*45);
      // var count = 1;
      // cube.stretchCubeXdir(1, 40);
      // setInterval(function(){
      //   cube.rotateCubeAbtX(angle);
      //   cube.rotateCubeAbtY(-angle)
      //   cube.rotateCubeAbtZ(angle);
        
      // }, 20)    
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
