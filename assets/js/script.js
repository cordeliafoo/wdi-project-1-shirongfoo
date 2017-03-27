$(document).ready(function () {
  var myFish
  var mouseX = 0
  var mouseY = 0
  var myFishSize = 20
  var fishArray = []
  var score = $('#score')
  var counter = 0
  var gameSpeed = 20

// start game function
  function startGame () {
    myGameArea.start()
    myFish = new MyFish('tomato', myFishSize, myFishSize)
    populateFishTank()
  }

// myGameArea object
  var myGameArea = {
    canvas: $('canvas'),
    start: function () {
      // this.canvas.width(900)
      // this.canvas.height(600)
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
  function MyFish (color, width, height) {
    this.width = width
    this.height = height
    this.context = myGameArea.context
    this.update = function () {
      this.context.fillStyle = color
      this.context.beginPath()
      this.context.fillRect(mouseX - this.width / 2, mouseY - this.height / 2, this.width, this.height)
      // requestAnimationFrame(this.update);
    }
    this.remove = function () {
      this.width = 0
    }
  }

// OtherFish constructor
  function OtherFish (x, y, width, color, xspeed, yspeed) {
    this.x = x
    this.y = y
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.width = width
    this.context = myGameArea.context
    this.display = function () {
      this.context.fillStyle = color
      this.context.beginPath()
      this.context.fillRect(this.x, this.y, this.width, this.width)
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
    for (var i = 0; i < 15; i++) {
      fishArray.push(new OtherFish(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500), Math.floor(Math.random() * 20), 'white', randomIntFromInterval(-1, 1), 0))
    }
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
          fishArray.push(new OtherFish(0, Math.floor(Math.random() * 500), Math.floor(Math.random() * 50), 'white', randomIntFromInterval(-1,1), 0))
          console.log('add fish')
        console.log(fishArray.length)
      }
    })
  }

  function updateGameArea () {
    myGameArea.clear()
    myFish.update()
    fishArray.forEach(function (eachFish) {
      eachFish.display()
      eachFish.move()
      eachFish.wrap()
    })
    anyOverlap()
    score.text('Score: ' + counter)
  }
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

// ////////////////////////Panning the background/////////////////////////
  // function draw (delta) {
  //   totalSeconds += delta
  //   var vx = 100 // background scrolls with a speed of 100pixels/second
  //   var numImages = Math.ceil(canvas.width / img.width) + 1
  //   var xpos = totalSeconds * vx % img.width // current x position
  //   console.log(context)
  //   context.save()
  //   context.translate(-xpos, 0)
  //   for (var i = 0; i < numImages; i++) {
  //     context.drawImage(img, i * img.width, 0)
  //   }
  //   context.restore()
  // }
  //
  // (function () {
  //   window.requestAnimationFrame = window.requestAnimationFrame
  //           || window.webkitRequestAnimationFrame
  //           || window.mozRequestAnimationFrame
  //           || function (callback) { window.setTimeout(callback, 1000 / 60) }
  //
  //   var canvas = document.querySelector('canvas')
  //   var context = canvas.getContext('2d')
  //   var looping = false
  //   var totalSeconds = 0
  //
  //   var img = new Image()
  //   img.onload = imageLoaded
  //   img.src = 'assets/aquarium.png'
  //
  //   function imageLoaded () {
  //     draw(0)
  //
  //     var btn = document.getElementById('btnStart')
  //     btn.addEventListener('click', function () {
  //       startStop()
  //     })
  //   }
  //
  //   var lastFrameTime = 0
  //
  //   function startStop () {
  //     looping = !looping
  //
  //     if (looping) {
  //       lastFrameTime = Date.now()
  //       requestAnimationFrame(loop)
  //     }
  //   }
  //
  //   function loop () {
  //     if (!looping) {
  //       return
  //     }
  //
  //     requestAnimationFrame(loop)
  //
  //     var now = Date.now()
  //     var deltaSeconds = (now - lastFrameTime) / 1000
  //     lastFrameTime = now
  //     draw(deltaSeconds)
  //   }
  //
  //   function draw (delta) {
  //       /* Here happens some magic. */
  //   }
  // }())


//   function draw(delta) {
//     totalSeconds += delta;
//     var x = -1 * (img.width - canvas.width) / 2 * (1 + Math.cos(totalSeconds / Math.PI));
//     var y = -1 * (img.height - canvas.height) / 2 * (1 + -Math.sin(totalSeconds / Math.PI));
//
//     context.drawImage(img, x, y);
// }
}) // end of document.ready
