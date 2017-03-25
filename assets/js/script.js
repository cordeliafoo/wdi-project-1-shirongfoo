$(document).ready(function () {
  var myFish
  var mouseX = 0
  var mouseY = 0

//start game
  function startGame () {
    myGameArea.start()
    myFish = new MyFish('tomato', 10, 10)
    otherFish = new OtherFish(10, 10, 20, 20, 'black', 10, 5)
  }


//create myGameArea object
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
      this.interval = setInterval(updateGameArea, 20)
      this.canvas.on('mousemove', setMousePosition)

    },
    clear: function(){
      this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height())
    }

  }// end of myGameArea object

//create myFish constructor
  function MyFish (color, width, height) {
    this.width = width
    this.height = height
    this.context = myGameArea.context
    this.update = function(){
      this.context.fillStyle = color
      this.context.beginPath()
      this.context.fillRect(mouseX - this.width/2,  mouseY - this.width/2, this.width, this.height)
      //requestAnimationFrame(this.update);
    }
  }

  function OtherFish(x, y, width, height, color, xspeed, yspeed){
    this.x = x
    this.y = y
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.width = width
    this.height = height
    this.context = myGameArea.context
    this.move = function(){
      this.context.fillStyle = color
      this.context.beginPath()
      this.context.fillRect(this.x, this.y, this.width, this.height)
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
  }

  function updateGameArea(){
    myGameArea.clear()
    myFish.update()
    otherFish.move()
    otherFish.bounce()
  }

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


  startGame()
}) // end of document.ready
