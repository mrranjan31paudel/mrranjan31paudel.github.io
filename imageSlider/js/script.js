var heading = document.getElementById('info');
heading.setAttribute('style', 'text-align:center');

var container = document.getElementById('carousel-container');
var wrapper = document.getElementById('image-wrapper');
 
var imgArr = document.getElementById('image-wrapper').getElementsByTagName('img');
var noOfImg = imgArr.length;
var imgWidth = imgArr[0].width;
var imgHeight = imgArr[0].height;
var buttonPos = Math.abs(imgHeight/2)+15;
wrapper.style.width = (noOfImg*320)+'px';

container.style.width = imgWidth+'px';

var buttonNindicatorHolder = document.createElement('div');
buttonNindicatorHolder.setAttribute('id', 'butNindContainer');
buttonNindicatorHolder.setAttribute('style', 'margin:0px auto; position:relative');
buttonNindicatorHolder.style.width = imgWidth+'px';
document.body.appendChild(buttonNindicatorHolder);

var buttonContainer = document.createElement('div');
buttonContainer.setAttribute('id', 'buttonContainer');
buttonContainer.setAttribute('style', 'height:30px; margin: 0px auto; position:absolute; left:0px; z-index:5');
buttonContainer.style.width = imgWidth+'px'; 
buttonContainer.style.top = '-'+buttonPos+'px';
document.getElementById('butNindContainer').appendChild(buttonContainer);

var indicatorContainer = document.createElement('div');
indicatorContainer.setAttribute('id', 'indicatorContainer');
indicatorContainer.setAttribute('style', 'height:30px; margin: 0px auto; text-align: center; background-color: rgba(217, 228, 226, 0.2); box-shadow:0px 0px 10px rgba(217, 228, 226, 0.2); position:absolute; left:0px; z-index:10');
indicatorContainer.style.width = imgWidth+'px'; 
indicatorContainer.style.top = '-30px';
document.getElementById('butNindContainer').appendChild(indicatorContainer);


var indicatorButton;

for(var i=0; i<noOfImg; i++){
  indicatorButton =  document.createElement('button');
  indicatorButton.setAttribute('class', 'indicatorBut'+i);
  indicatorButton.setAttribute('style', 'border:0px; height: 10px; width:8px; border-radius:5px; margin:11px; background-color:rgba(64, 149, 170, 0.514); display:inline-block');
  document.getElementById('indicatorContainer').appendChild(indicatorButton);
  indicatorButton.onclick = function(){indClick(this);};
}

var indicatorArr = document.getElementById('indicatorContainer').getElementsByTagName('button');

var leftButton = document.createElement('button');
var rightButton = document.createElement('button');

leftButton.setAttribute('id', 'leftBut');
rightButton.setAttribute('id', 'rightBut');
leftButton.setAttribute('style', 
'width:30px; height:30px; background-image:url(imgs/butLeft.png); background-color:rgba(64, 149, 170, 0.514); border:0px; background-repeat:no-repeat; float:left');
document.getElementById('buttonContainer').appendChild(leftButton);
rightButton.setAttribute('style', 
'width:30px; height:30px; background-image:url(imgs/butRight.png); background-color:rgba(64, 149, 170, 0.514);; border:0px; background-repeat:no-repeat; float:right');
document.getElementById('buttonContainer').appendChild(rightButton);

var currMargin = 0;
var displacement =0;
var del = 10;

var currIndex = 0;
var nextIndex = 0;
var prevIndex = 0;

var localintervalHandle;
// document.getElementsByClassName('indicatorBut'+prevIndex)[0].style.backgroundColor = 'rgba(64, 149, 170, 0.514)';
document.getElementsByClassName('indicatorBut'+currIndex)[0].style.backgroundColor = 'white';
leftButton.onclick = function(){leftClick();};
rightButton.onclick = function(){rightClick();};

function rightClick(){
  clearInterval(localintervalHandle);
  if(currIndex == noOfImg - 1){
    directToFirst();
  }
  else{
    leftSlide();
  }
}

function leftClick(){
  clearInterval(localintervalHandle);
  if(currIndex == 0){
    directToLast();
  }
  else{
    rightSlide();
  }
}

function indClick(indiObj){
  prevIndex = currIndex;
  var strIndex = indiObj.getAttribute('class');
  var indiIndex = strIndex.replace('indicatorBut','');
  var newDel = del;
  nextIndex = parseInt(indiIndex);
 
  displacement = Math.abs(nextIndex - currIndex) * imgWidth;
  if(nextIndex>=currIndex){
    newDel = - del;
  }
  if(displacement!=0){
    localintervalHandle = setInterval(function(){
      currMargin += newDel;
      wrapper.style.marginLeft = currMargin+'px';
      displacement -=del;
      if(displacement==0){
        clearInterval(localintervalHandle);
      }
    }, 5);
    currIndex = nextIndex;
    document.getElementsByClassName('indicatorBut'+prevIndex)[0].style.backgroundColor = 'rgba(64, 149, 170, 0.514)';
    document.getElementsByClassName('indicatorBut'+currIndex)[0].style.backgroundColor = 'white';
  }

}

function directToFirst(){
  prevIndex = currIndex;
  nextIndex = 0;
  displacement = Math.abs(nextIndex - currIndex) * imgWidth;
  localintervalHandle = setInterval(function(){
    currMargin += del;
    wrapper.style.marginLeft = currMargin+'px';
    displacement -=del;
    if(displacement==0){
      clearInterval(localintervalHandle);
    }
  }, 5);
  currIndex = 0;
  document.getElementsByClassName('indicatorBut'+prevIndex)[0].style.backgroundColor = 'rgba(64, 149, 170, 0.514)';
  document.getElementsByClassName('indicatorBut'+currIndex)[0].style.backgroundColor = 'white';
}

function directToLast(){
  prevIndex = currIndex;
  nextIndex = noOfImg - 1;
  displacement = Math.abs(nextIndex - currIndex) * imgWidth;
  localintervalHandle = setInterval(function(){
    currMargin -= del;
    wrapper.style.marginLeft = currMargin+'px';
    displacement -=del;
    if(displacement==0){
      clearInterval(localintervalHandle);
    }
  }, 5);
  currIndex = noOfImg - 1;
  document.getElementsByClassName('indicatorBut'+prevIndex)[0].style.backgroundColor = 'rgba(64, 149, 170, 0.514)';
  document.getElementsByClassName('indicatorBut'+currIndex)[0].style.backgroundColor = 'white';
}

function leftSlide(){  
  prevIndex = currIndex;
  displacement = imgWidth;
    localintervalHandle = setInterval(function(){
      currMargin -= del;
      wrapper.style.marginLeft = currMargin+'px';
      displacement -=del;
      if(displacement==0){
        clearInterval(localintervalHandle);
      }
    }, 5);
    currIndex += 1;
    document.getElementsByClassName('indicatorBut'+prevIndex)[0].style.backgroundColor = 'rgba(64, 149, 170, 0.514)';
    document.getElementsByClassName('indicatorBut'+currIndex)[0].style.backgroundColor = 'white';
}

function rightSlide(){
  prevIndex = currIndex;
  displacement = imgWidth;
  localintervalHandle = setInterval(function(){
    currMargin += del;
    wrapper.style.marginLeft = currMargin+'px';
    displacement -=del;
    if(displacement==0){
      clearInterval(localintervalHandle);
    }
  }, 5);
  currIndex -= 1;
  document.getElementsByClassName('indicatorBut'+prevIndex)[0].style.backgroundColor = 'rgba(64, 149, 170, 0.514)';
  document.getElementsByClassName('indicatorBut'+currIndex)[0].style.backgroundColor = 'white';
}