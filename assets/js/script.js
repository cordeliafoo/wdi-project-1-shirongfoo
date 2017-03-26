$(document).ready(function () {
  var myFish
  var mouseX = 0
  var mouseY = 0
  var myFishSize = 20
  var fishArray = []

//start game function
  function startGame () {
    myGameArea.start()
    myFish = new MyFish('tomato', myFishSize, myFishSize)
    populateFishTank()
  }


//myGameArea object
  var myGameArea = {
    canvas: $('canvas'),
    start: function () {
      this.canvas.width(600)
      this.canvas.height(400)
      this.canvas.css('background-color', 'rgb(155, 155, 155)')
      // console.log(this.canvas.get(0).getContext('2d'))
      this.context = this.canvas.get(0).getContext('2d')
      // .get() grants access to the DOM nodes underlying the canvas jquery object.
      // getContext returns an object that provides methods and properties for drawing on the canvas
      this.interval = setInterval(updateGameArea, 50)
      this.canvas.on('mousemove', setMousePosition)

    },
    clear: function(){
      this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height())
    }

  }// end of myGameArea object

//myFish constructor
  function MyFish (color, width, height) {
    this.width = width
    this.height = height
    this.context = myGameArea.context
    this.update = function(){
      this.context.fillStyle = color
      this.context.beginPath()
      this.context.fillRect(mouseX - this.width/2,  mouseY - this.height/2, this.width, this.height)
      //requestAnimationFrame(this.update);
    }
  }

//otherFish constructor
  function OtherFish(x, y, width, color, xspeed, yspeed){
    this.x = x
    this.y = y
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.width = width
    this.context = myGameArea.context
    this.display = function(){
      this.context.fillStyle = color
      this.context.beginPath()
      this.context.fillRect(this.x, this.y, this.width, this.width)
    }
    this.move = function(){

      this.x = this.x + this.xspeed
      this.y = this.y + this.yspeed
    }
    this.bounce = function(){
       if(this.x > canvasElement.width || this.x < 0){
         this.xspeed = this.xspeed * -1
       }
       if(this.y > canvasElement.height || this.y < 0 ){
         this.yspeed = this.yspeed * -1
       }
      }
    this.remove = function(){
      this.width = 0
    }

  }

  function populateFishTank(){
     for (var i = 0; i < 10; i++){
       fishArray.push(new OtherFish(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500), Math.floor(Math.random() *50), 'black', 1, 0))
     }

  }

  function anyOverlap(eachFish){

      myFishLeft = mouseX
      myFishRight = mouseX + myFish.width
      myFishTop = mouseY
      myFishBottom = mouseY + myFish.width
      otherFishLeft = eachFish.x
      otherFishRight = eachFish.x + eachFish.width
      otherFishTop = eachFish.y
      otherFishBottom = eachFish.y + eachFish.width

      var overlap = !(myFishRight < otherFishLeft ||
                 myFishLeft >= otherFishRight ||
                 myFishBottom <= otherFishTop ||
                 myFishTop >= otherFishBottom )
       //if any expression in paranthesis are true, there is no overlap
       //if all are false, there is overlap

       var myFishIsBigger = (myFish.width > eachFish.width)

       if(overlap && myFishIsBigger){
         eachFish.remove()
       }


} //end of anyOverlap function




  function updateGameArea(){
    myGameArea.clear()
    myFish.update()
    fishArray.forEach(function(eachFish){
      eachFish.display()
      eachFish.move()
      eachFish.bounce()
      anyOverlap(eachFish)
    })


  }























////////////////////////////////Helper functions////////////////////////////////////
  function setMousePosition(e){

    mouseX = e.clientX - canvasPos.x
    mouseY = e.clientY - canvasPos.y

    return {
      mouseX: mouseX,
      mouseY: mouseY
    }
  }

//getPosition figures out where the canvas element is on the page
  function getPosition(e2){
    var xPos = 0
    var yPos = 0

    xPos += (e2.offsetLeft  + e2.clientLeft)
    yPos += (e2.offsetTop + e2.clientTop)

    return {
      x: xPos,
      y: yPos
    }
  }

  var canvasElement = (document.querySelector('canvas'))
  var canvasPos = getPosition(canvasElement)

/////////////////////////Start the Game!/////////////////////////////////////////
  startGame()
}) // end of document.ready
