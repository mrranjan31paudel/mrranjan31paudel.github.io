var container = document.getElementById('carousel-container');
var wrapper = document.getElementById('image-wrapper');
 
var imgArr = document.getElementById('image-wrapper').getElementsByTagName('img');
var noOfImg = imgArr.length;
wrapper.style.width = (noOfImg*320)+'px';

var buttonContainer = document.createElement('div');
buttonContainer.setAttribute('id', 'buttonContainer');
buttonContainer.setAttribute('style', 'width:100px; height:30px; margin: 0px auto');
document.body.appendChild(buttonContainer);

var leftButton = document.createElement('button');
var rightButton = document.createElement('button');
leftButton.setAttribute('id', 'leftBut');
rightButton.setAttribute('id', 'rightBut');
leftButton.setAttribute('style', 
'width:30px; height:30px; background-image:url(imgs/butLeft.png); background-color:cyan; border:0px; background-repeat:no-repeat; float:left');
document.getElementById('buttonContainer').appendChild(leftButton);
rightButton.setAttribute('style', 
'width:30px; height:30px; background-image:url(imgs/butRight.png); background-color:cyan; border:0px; background-repeat:no-repeat; float:right');
document.getElementById('buttonContainer').appendChild(rightButton);

var inc = 10;
var limitLeft = 320 * noOfImg-320;
var limitRight = 320;
var xShift = 0;

var intervalHandle;
var timeOutHandle;

leftButton.onclick = function(){leftClick()};
rightButton.onclick = function(){rightClick()};

function slide (){
  intervalHandle = setInterval(function(){
    wrapper.style.marginLeft = xShift+'px';
    if(xShift==-limitLeft){
      xShift = 320;
    }
    if(xShift%320==0){
      clearInterval(intervalHandle);
      timeOutHandle = setTimeout(function(){
        slide();
      }, 2000)
    }
    xShift -= inc;
  }, 25)
}

function rightClick(){
  clearTimeout(timeOutHandle);
  slide();
  
}

function leftClick(){
  clearTimeout(timeOutHandle);
  var prevXshift = xShift;
  var localIntervalHandle = setInterval(function(){
    wrapper.style.marginLeft = xShift+'px';
    xShift += inc;
    if(xShift-prevXshift==320){
      clearInterval(localIntervalHandle);
    }
  }, 25)
  slide();
}

slide();