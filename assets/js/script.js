$(document).ready(function () {
  var myFish
  var mouseX = 0
  var mouseY = 0
  var myFishSize = 80
  var fishArray = []
  var score = $('#score')
  var counter = 0
  var gameSpeed = 10
  var images  = []

  var createImage = function(src){
    var img = new Image()
    img.src = src
    return img
  }
  images.push(createImage('assets/fish1.png'))
  images.push(createImage('assets/fish2.png'))
  images.push(createImage('assets/fish3.png'))
  images.push(createImage('assets/fish4.png'))
  images.push(createImage('assets/fish5.png'))
  images.push(createImage('assets/fish6.png'))
  images.push(createImage('assets/fish7.png'))
  images.push(createImage('assets/fish8.png'))

// start game function
  function startGame () {
    myGameArea.start()
    myFish = new MyFish(images[0], myFishSize, myFishSize)
    populateFishTank()
  }

// myGameArea object
  var myGameArea = {
    canvas: $('canvas'),
    start: function () {
      this.canvas.css('background-image', 'url("../assets/aquarium.png")')
      this.context = this.canvas.get(0).getContext('2d')
      // .get() grants access to the DOM nodes underlying the canvas jquery object.
      // getContext returns an object that provides methods and properties for drawing on the canvas
      this.interval = setInterval(updateGameArea, gameSpeed)
      this.canvas.on('mousemove', setMousePosition)
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height())
    }
  }// end of myGameArea object


// MyFish constructor
  function MyFish (image, width, height) {
    this.width = width
    this.height = height
    this.context = myGameArea.context
    this.display = function () {
      // this.context.fillStyle = color
      // this.context.beginPath()
      // this.context.fillRect(mouseX - this.width / 2, mouseY - this.height / 2, this.width, this.height)
      this.context.drawImage(image, mouseX-this.width/2, mouseY-this.height/2, this.width, this.height)
      // requestAnimationFrame(this.update);
    }
    this.remove = function () {
      this.width = 0
    }
  }

// OtherFish constructor
  function OtherFish (x, y, width, color, xspeed, yspeed, image) {
    this.x = x
    this.y = y
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.width = width
    this.image = image
    this.context = myGameArea.context
    this.display = function () {
      // this.context.fillStyle = color
      // this.context.beginPath()
      // this.context.fillRect(this.x, this.y, this.width, this.width)
      return this.context.drawImage(image, this.x, this.y, this.width, this.width)
    }
    this.move = function () {
      this.x = this.x + this.xspeed
      this.y = this.y + this.yspeed
    }
    this.wrap = function () {
      if (this.x > canvasElement.width) {
        this.x = 0 - this.width
      }

      if (this.x + this.width < 0) {
        this.x = canvasElement.width
      }
    }
    this.remove = function (index) {
      // console.log('index is', index);
      fishArray.splice(index, 1)
    }
  }



  function populateFishTank () {
    fish1 = new OtherFish(0,5,30, 'white', randomIntFromInterval(-1, 1), 0, images[1])
    fish2 = new OtherFish(0,50,55, 'white', randomIntFromInterval(-1, 1), 0, images[2])
    fish3 = new OtherFish(0,100,60, 'white', randomIntFromInterval(-1, 1), 0, images[3])
    fish4 = new OtherFish(0,150,70, 'white', randomIntFromInterval(-1, 1), 0, images[4])
    fish5 = new OtherFish(0,180,90, 'white', randomIntFromInterval(-1, 1), 0, images[5])
    fish6 = new OtherFish(0,300,110, 'white', randomIntFromInterval(-1, 1), 0, images[6])
    fish7 = new OtherFish(0,300,110, 'white', randomIntFromInterval(-1, 1), 0, images[7])
    fish8 = new OtherFish(0,400,160, 'white', randomIntFromInterval(-1, 1), 0, images[8])
    fishArray.push(fish1, fish2, fish3, fish4, fish5, fish6, fish7, fish8)

    // for (var i = 0; i < 15; i++) {
    //   fishArray.push(new OtherFish(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500), Math.floor(Math.random() * 200), 'white', randomIntFromInterval(-1, 1), 0, images[Math.floor(Math.random()*8)]))
    // }
  }

  function anyOverlap () {
    fishArray.forEach(function (eachFishInArray) {
      myFishLeft = mouseX
      myFishRight = mouseX + myFish.width
      myFishTop = mouseY
      myFishBottom = mouseY + myFish.height
      eachFishInArrayLeft = eachFishInArray.x
      eachFishInArrayRight = eachFishInArray.x + eachFishInArray.width
      eachFishInArrayTop = eachFishInArray.y
      eachFishInArrayBottom = eachFishInArray.y + eachFishInArray.width

      overlap = !(myFishRight < eachFishInArrayLeft ||
                   myFishLeft >= eachFishInArrayRight ||
                   myFishBottom <= eachFishInArrayTop ||
                   myFishTop >= eachFishInArrayBottom)
       // if any expression in paranthesis are true, there is no overlap
       // if all are false, there is overlap
       console.log(overlap)
      var myFishIsBigger = (myFish.width > eachFishInArray.width && myFish.height > eachFishInArray.width)
      var myFishIsSmaller = (myFish.width < eachFishInArray.width && myFish.height < eachFishInArray.width)

      if (overlap && myFishIsBigger) {
        removeOtherFish()
        console.log(fishArray.length)
        addMoreFish()
        increaseMyFishSize()
        increaseScore()
      } else if (overlap && myFishIsSmaller) {
        myFish.remove()
        console.log('you got eaten up')
      }

      function removeOtherFish () {
        index = fishArray.indexOf(eachFishInArray)
        eachFishInArray.remove(index)
      }
      function increaseMyFishSize () {
        myFish.width += 0.2
        myFish.height += 0.2
      }
      function increaseScore () {
        counter += 1
      }
      function addMoreFish () {
          fishArray.push(new OtherFish(0, Math.floor(Math.random() * 500), Math.floor(Math.random() * 50), 'white', randomIntFromInterval(-1,1), 0), images[0])
          console.log('add fish')
        console.log(fishArray.length)
      }
    })
  }

  function updateGameArea () {
    myGameArea.clear()
    myFish.display()
    console.log(fishArray)
    fishArray.forEach(function (eachFish) {
      console.log(eachFish.x)
      console.log(mouseX)
      eachFish.display()
      eachFish.move()
      eachFish.wrap()
    })
    anyOverlap()
    score.text('Score: ' + counter)
  }

  //The error message is saying that cowpies is not an image element.
  // You can only draw image elements onto the canvas.
//When you called cowpies.push(new Cowpie); ]
//you added something that was not an image to the array, which caused this error.

  // ///////////////////////Start the Game!/////////////////////////////////////////
  startGame()






















// //////////////////////////////Helper functions////////////////////////////////////
  function setMousePosition (e) {
    mouseX = e.clientX - canvasPos.x
    mouseY = e.clientY - canvasPos.y

    return {
      mouseX: mouseX,
      mouseY: mouseY
    }
  }

// getPosition figures out where the canvas element is on the page
  function getPosition (e2) {
    var xPos = 0
    var yPos = 0

    while (e2) {
      xPos += (e2.offsetLeft - e2.scrollLeft + e2.clientLeft)
      yPos += (e2.offsetTop - e2.scrollTop + e2.clientTop)
      e2 = e2.offsetParent
    }

    return {
      x: xPos,
      y: yPos
    }
  }

  var canvasElement = (document.querySelector('canvas'))
  var canvasPos = getPosition(canvasElement)

  function randomIntFromInterval (min, max) {
    // console.log(Math.floor(Math.random() * (max - min + 1) + min))
    var randomInt = Math.floor(Math.random() * (max - min + 1) + min)
    if (randomInt === 1) {
      return 1
    } else if (randomInt === -1) {
      return -1
    } else if (randomInt === 0) {
      return 1
    }
  }

}) // end of document.ready

// $(document).ready(function(){
//
// var createImage = function(src){
//   var img = new Image()
//   img.src = src
//   return img
// }
//
// var images  = []
//
// images.push(createImage('assets/fish1.png'))
// images.push(createImage('assets/fish2.png'))
// images.push(createImage('assets/fish3.png'))
// images.push(createImage('assets/fish4.png'))
// images.push(createImage('assets/fish5.png'))
// images.push(createImage('assets/fish6.png'))
// images.push(createImage('assets/fish7.png'))
// images.push(createImage('assets/fish8.png'))
//
//
// function startGame(){
//   myGameArea.start()
//   player1Fish = new PlayerFish()
//   player2Fish = new PlayerFish()
//   // populateFishTank()
// }
//
// var myGameArea = {
//   gameAreaDiv: $('#myGameArea'),
//   start: function(){
//     this.gameAreaDiv.css('background-image', 'url("../assets/aquarium.png")')
//     this.interval = setInterval(updateGame, 100)
//   }
//
//
// }
//
//
// var PlayerFish = function(x, y){
//   this.x = x
//   this.y = y
//   this.display = function(){
//     console.log(images[0])
//   }
//
// }
//
// function updateGame(){
//   player1Fish.display()
// }
// startGame()

















// })
