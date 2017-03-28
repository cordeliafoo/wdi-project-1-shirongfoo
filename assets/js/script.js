$(document).ready(function () {
  var myFish
  var mouseX = 0
  var mouseY = 0
  var myFishSize = 80
  var fishArray = []
  var fishArrayTemplate = []
  var score = $('#score')
  var counter = 0
  var gameSpeed = 20
  var images  = []
  var canvas = document.querySelector('canvas')
  var context = canvas.getContext('2d')


  function createNewImage(number) {
    switch (number) {
      case 1:
      return document.querySelector('#fish1')
      break
      case 2:
      return document.querySelector('#fish2')
      break
      case 3:
      return document.querySelector('#fish3')
      break
      case 4:
      return document.querySelector('#fish4')
      break
      case 5:
      return document.querySelector('#fish5')
      break
      case 6:
      return document.querySelector('#fish6')
      break
      case 7:
      return document.querySelector('#fish7')
      break
      case 8:
      return document.querySelector('#fish8')
      break
      default:
      return
    }
  }

// myGameArea object
  var myGameArea = {
    canvas: $('#canvas'),
    context: canvas.getContext('2d'),
    start: function () {
      this.canvas.css('background-image', 'url("../assets/images/aquarium.png")')

      // .get() grants access to the DOM nodes underlying the canvas jquery object.
      // getContext returns an object that provides methods and properties for drawing on the canvas
      this.interval = setInterval(updateGameArea, gameSpeed)
      // this.canvas.on('mousemove', setMousePosition)
      this.canvas.on('mousemove', setMousePosition)
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height())
    }
  }// end of myGameArea object

// MyFish constructor
  function MyFish (image, width, height) {
    this.image = image
    this.width = width
    this.height = height
    this.context = myGameArea.context
    this.display = function () {
      this.context.drawImage(this.image, mouseX-this.width/2, mouseY-this.height/2, this.width, this.height)
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
      this.context.drawImage(this.image, this.x, this.y, this.width, this.width)
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
      // fishArray.splice(index, 1, 0)
    }
  }



  function populateFishTank () {
    fish1 = new OtherFish(0, Math.floor(Math.random()*600),30, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(1))
    fish2 = new OtherFish(0, Math.floor(Math.random()*600),20, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(2))
    fish3 = new OtherFish(0, Math.floor(Math.random()*600),30, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(3))
    fish4 = new OtherFish(0, Math.floor(Math.random()*600),40, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(4))
    fish5 = new OtherFish(0, Math.floor(Math.random()*600), 50, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(5))
    fish6 = new OtherFish(0, Math.floor(Math.random()*600), 70, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(6))
    fish7 = new OtherFish(0, Math.floor(Math.random()*600), 100, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(7))
    fish8 = new OtherFish(0, Math.floor(Math.random()*600),200, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(8))
    fishArrayTemplate.push(fish1, fish2, fish3, fish4, fish5, fish6, fish7, fish8)

    fishArray.push(fish1, fish2, fish3, fish4, fish5, fish6, fish7, fish8)


    // for (var i = 0; i < 15; i++) {
    //   fishArray.push(new OtherFish(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500), Math.floor(Math.random() * 200), 'white', randomIntFromInterval(-1, 1), 0, images[Math.floor(Math.random()*8)]))
    // }
  }

  function anyOverlap () {
    var index
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

       if(overlap){
       index = fishArray.indexOf(eachFishInArray)

     }




     })
     return index
   }


      // var myFishIsBigger = (myFish.width > eachFishInArray.width && myFish.height > eachFishInArray.width)
      // var myFishIsSmaller = (myFish.width < eachFishInArray.width && myFish.height < eachFishInArray.width)

      // if (overlap && myFishIsBigger) {
      //   //removeOtherFish()
      //   // console.log(fishArray.length)
      //   //addMoreFish()
      //   //increaseMyFishSize()
      //   //increaseScore()
      // } else if (overlap && myFishIsSmaller) {
      //   myFish.remove()
      //   console.log('you got eaten up')
      // }

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
          // fishArray.push(new OtherFish(0, Math.floor(Math.random() * 500), Math.floor(Math.random() * 50), 'white', randomIntFromInterval(-1,1), 0), createNewImage(1))
        //   console.log('add fish')
        // console.log(fishArray.length)
      }

  function spliceAddScore(indexOfOverlap){
    fishArray.splice(indexOfOverlap, 1)
    fishArray.push(fishArrayTemplate[Math.floor(Math.random()*8)])
    counter += 1
  }

  function updateGameArea () {
    myGameArea.clear()
    myFish.display()
    fishArray.forEach(function (eachFish) {
      eachFish.display()
      eachFish.move()
      eachFish.wrap()
    })
    var indexOfOverlap = anyOverlap()

    if(indexOfOverlap === 0  || indexOfOverlap){
     spliceAddScore(indexOfOverlap)
    }

    score.text('Score: ' + counter)

  }

  /////////////////////////Start the Game!/////////////////////////////////////////

  // start game function
  function startGame () {
      populateFishTank()
      myFish = new MyFish(createNewImage(1), myFishSize, myFishSize)
      myGameArea.start()

    }
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


  function checkKeyPress(e){
    switch(e.keyCode){
      case 37:
      console.log(myFish.x)
      break;
      case 38: console.log('up keyp pressed')
      break;
      case 39:
       console.log('right keyp pressed')
       break;
      case 40:
      console.log('down keyp pressed')
       break;

    }
  }
}) // end of document.ready
