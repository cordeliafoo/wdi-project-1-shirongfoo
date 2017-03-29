$(document).ready(function () {
  var myFish
  var mouseX = 0
  var mouseY = 0
  var myFishSize = 50
  var fishArray = []
  var fishArrayTemplate = []
  var score = $('#score')
  var counter = 0
  var gameSpeed = 20
  var images = []
  var canvas = document.querySelector('canvas')
  var context = canvas.getContext('2d')
  var infdexPlusFishWidth = {}
  var imageCheck=[0,0,0,0,0,0,0,0]

// function to include image source
  function createNewImage (number) {
    switch (number) {
      case 1:
        var img1 = new Image()
        img1.addEventListener('load', function (){
          imageCheck[0] = 1
        })
        img1.src = 'assets/images/fish1.png'
        return img1
       // return document.querySelector('#fish1')
        break
      case 2:
        var img2 = new Image()
        img2.addEventListener('load', function (){
          imageCheck[1] = 1
        })
        img2.src = 'assets/images/fish2.png'
        return img2
      // return document.querySelector('#fish2')
        break
      case 3:
        var img3 = new Image()
        img3.addEventListener('load', function (){
          imageCheck[2] = 1
        })
        img3.src = 'assets/images/fish3.png'
        return img3
      // return document.querySelector('#fish3')
        break
      case 4:
        var img4 = new Image()
        img4.addEventListener('load', function (){
          imageCheck[3] = 1
        })
        img4.src = 'assets/images/fish4.png'
        return img4
      // return document.querySelector('#fish4')
        break
      case 5:
        var img5 = new Image()
        img5.addEventListener('load', function (){
          imageCheck[4] = 1
        })
        img5.src = 'assets/images/fish5.png'
        return img5
      // return document.querySelector('#fish5')
        break
      case 6:
        var img6 = new Image()
        img6.addEventListener('load', function (){
          imageCheck[5] = 1
        })
        img6.src = 'assets/images/fish6.png'
        return img6
      // return document.querySelector('#fish6')
        break
      case 7:
        var img7 = new Image()
        img7.addEventListener('load', function (){
          imageCheck[6] = 1
        })
        img7.src = 'assets/images/fish7.png'
        return img7
      // return document.querySelector('#fish7')
        break
      case 8:
        var img8 = new Image()
        img8.addEventListener('load', function (){
          imageCheck[7] = 1
        })
        img8.src = 'assets/images/fish8.png'
        return img8
      // return document.querySelector('#fish8')
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
      this.canvas.css('background-image', 'url("assets/images/aquarium3.png")')
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
    var imageCheckVar = imageCheck.every(function(element){
        return element === 1
      })
      if(imageCheckVar){
      this.context.drawImage(this.image, mouseX - this.width / 2, mouseY - this.height / 2, this.width, this.height)
    }
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
      var imageCheckVar = imageCheck.every(function(element){
          return element === 1
        })
      if(imageCheckVar){
      this.context.drawImage(this.image, this.x, this.y, this.width, this.width)
    }
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
    this.stop = function () {
      this.xspeed = 0
      this.yspeed = 0
    }
  }

  function populateFishTank () {
    fish1 = new OtherFish(0, Math.floor(Math.random() * 565), 40, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(1))
    fish2 = new OtherFish(0, Math.floor(Math.random() * 565), 60, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(2))
    fish3 = new OtherFish(0, Math.floor(Math.random() * 565), 80, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(3))
    fish4 = new OtherFish(0, Math.floor(Math.random() * 565), 100, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(4))
    fish5 = new OtherFish(0, Math.floor(Math.random() * 565), 120, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(5))
    fish6 = new OtherFish(0, Math.floor(Math.random() * 565), 140, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(6))
    fish7 = new OtherFish(0, Math.floor(Math.random() * 565), 170, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(7))
    fish8 = new OtherFish(0, Math.floor(Math.random() * 565), 300, 'white', randomIntFromInterval(-1, 1), 0, createNewImage(8))

    fishArrayTemplate.push(fish1, fish2, fish3, fish4, fish5, fish6, fish7, fish8)

    for (var i = 0; i < 10; i++) {
      fishArray.push(new OtherFish(-1, Math.floor(Math.random() * 565), Math.floor(Math.random() * 100), 'white', randomIntFromInterval(-1, 1) * (Math.floor(Math.random() * 4) + 1), 0, createNewImage(Math.floor(Math.random() * 7) + 1)))
    }
  }

// check if myfish overlaps with any fish in the fishArray
  function anyOverlap () {
    var index
    var fishWidth
    fishArray.forEach(function (eachFishInArray) {
      myFishLeft = mouseX
      myFishRight = mouseX + myFish.width
      myFishTop = mouseY
      myFishBottom = mouseY + myFish.height

      eachFishInArrayWidth = eachFishInArray.width / 4

      eachFishInArrayLeft = eachFishInArray.x + eachFishInArrayWidth
      eachFishInArrayRight = eachFishInArrayLeft + eachFishInArrayWidth * 2

      eachFishInArrayTop = eachFishInArray.y + eachFishInArrayWidth
      eachFishInArrayBottom = eachFishInArrayTop + eachFishInArrayWidth * 2

      overlap = !(myFishRight < eachFishInArrayLeft ||
                   myFishLeft >= eachFishInArrayRight ||
                   myFishBottom <= eachFishInArrayTop ||
                   myFishTop >= eachFishInArrayBottom)
       // if any expression in paranthesis are true, there is no overlap
       // if all are false, there is overlap

      if (overlap) {
        index = fishArray.indexOf(eachFishInArray)
        fishWidth = fishArray[index].width
      }
    })
    return {
      index: index,
      fishWidth: fishWidth
    }
  }

// function to splice overlapped fish, and replace spliced fish with a new fish
  function spliceAddIncreaseScore (indexOfOverlap) {
    fishArray.splice(indexOfOverlap, 1)
    fishArray.push(fishArrayTemplate[Math.floor(Math.random() * 8)])
    counter += 1
  }

// change myfish size based on counter
  function changeFishSize () {

    if (counter === 210) {
      youWon()
    } else if (counter > 160) {
      myFish.image = fishArrayTemplate[7].image
      myFish.width = fishArrayTemplate[7].width
      myFish.height = fishArrayTemplate[7].width
    } else if (counter > 140) {
      myFish.image = fishArrayTemplate[6].image
      myFish.width = fishArrayTemplate[6].width
      myFish.height = fishArrayTemplate[6].width
    } else if (counter > 110) {
      myFish.image = fishArrayTemplate[5].image
      myFish.width = fishArrayTemplate[5].width
      myFish.height = fishArrayTemplate[5].width
    } else if (counter > 80) {
      myFish.image = fishArrayTemplate[4].image
      myFish.width = fishArrayTemplate[4].width
      myFish.height = fishArrayTemplate[4].width
    } else if (counter > 50) {
      myFish.image = fishArrayTemplate[3].image
      myFish.width = fishArrayTemplate[3].width
      myFish.height = fishArrayTemplate[3].width
    } else if (counter > 30) {
      myFish.image = fishArrayTemplate[2].image
      myFish.width = fishArrayTemplate[2].width
      myFish.height = fishArrayTemplate[2].width
    } else if (counter > 5) {
      myFish.image = fishArrayTemplate[1].image
      myFish.width = fishArrayTemplate[1].width
      myFish.height = fishArrayTemplate[1].width
    }
  }

// stop fish, display alert box, and reload game
  function gameOver () {
    myFish.width = 0
    myFish.height = 0
    fishArray.forEach(function (eachFish) {
      eachFish.stop()
    })
    clearInterval(setIntervalReturn)
    overlap = false
    swal(
      {title: 'oops you got eaten',
        text: 'play again?'
      },
   function () {
     window.location.reload()
     window.location.href = 'https://wdi-sg.github.io/wdi-project-1-shirongfoo/';
   })
  }

  function youWon () {
    // fishArray = []
    myFish.width += 5
    myFish.width += 5
    swal(
      {title: 'YOU WON!',
        text: 'play again?'
      },
   function () {
     location.reload()
   }) // error! page not realoading after clicking sweetalert ok
  }

  function updateGameArea () {
    myGameArea.clear()
    myFish.display()
    fishArray.forEach(function (eachFish) {
      eachFish.display()
      eachFish.move()
      eachFish.wrap()
    })
    var indexAndWidthOfOverlap = anyOverlap()
    if (indexAndWidthOfOverlap.index === 0 || indexAndWidthOfOverlap.index && indexAndWidthOfOverlap.fishWidth <= myFish.width) {
      spliceAddIncreaseScore(indexAndWidthOfOverlap.index)
      changeFishSize()
    } else if (indexAndWidthOfOverlap.index === 0 || indexAndWidthOfOverlap.index && indexAndWidthOfOverlap.fishWidth >= myFish.width) {
      gameOver()
    }
    score.text('Score: ' + counter)
  }

  // start game function
  function startGame () {
    populateFishTank()
    myFish = new MyFish(createNewImage(1), myFishSize, myFishSize)
    myGameArea.start()
    setIntervalReturn = setInterval(populateFishTank, 10000)
  }

  startGame()












// //////////////////////////////Helper functions////////////////////////////////////
  var canvasElement = document.querySelector('canvas')
  var canvasPos = getPosition(canvasElement)

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

  function checkKeyPress (e) {
    switch (e.keyCode) {
      case 37:
        console.log(myFish.x)

        break
      case 38: console.log('up keyp pressed')
        break
      case 39:
        console.log('right keyp pressed')
        break
      case 40:
        console.log('down keyp pressed')
        break

    }
  }
}) // end of document.ready
