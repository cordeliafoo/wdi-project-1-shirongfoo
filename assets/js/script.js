$(document).ready(function () {
  // # Game Canvas and Environment variables
  var canvas = $('#canvas')[0]
  var context = canvas.getContext('2d')
  canvas.width = window.innerWidth * 0.95
  canvas.height = window.innerHeight * 0.95

  var myGameArea = {
    width: canvas.width,
    height: canvas.height,
    posX: 0,
    posY: 0,
    image: 'background/aquarium3.png'
  }

  // # Game Status variables
  var pause = false
  var gameOver = true

  // # Fish Obstacle Variables
  var fishObstacleArray = []
  var fishObstacleSpawnDuration = 20
  var fishObstacleRemovalDuration = 5

  // # Player Selection variables
  var playerOneControl = 1
  var playerTwoControl = 2
  var startingPlayerCount = 1
  var playerFishArray = []


  // # Create playerFishOne and playerFishTwo
     // (posX, posY, width, height, faceRight, imageFolder, imageFormat, velocity, playerControl)
  var playerFishOne = new PlayerFish(canvas.width/4 *3, canvas.height/2, 50, 50, false, 'fish1', '.png', 5, playerOneControl)
  var playerFishTwo = new PlayerFish(canvas.width/4, canvas.height/2, 50, 50, true, 'fish1', '.png', 5, playerTwoControl)
  playerFishArray.push(playerFishOne, playerFishTwo)

  // # Draw Image and Text on on Canvas functions
  function display (item) {
    var image = new Image()
    image.src = 'assets/images/' + item.image
    image.addEventListener('load', function () {
      context.drawImage(image, item.posX, item.posY, item.width, item.height)
    })
  }

 // # PlayerFish functions
  function drawPlayerFish (){
   playerFishArray.forEach(function(playerFish){
     display(playerFish)
   })
 }

 // # Fish Obstacles' functions
 function spawnFishObstacle(){
   //(posX, width, height, imageFolder, imageFormat, velocity, faceRight, fishObstacleRemovalDuration)
   for(var i = 0; i < 5; i ++){
     var fishObstacle = new FishObstacle(0, 40, 40, 'fish', '.png', 5, 20)
     fishObstacleArray.push(fishObstacle)
   }

 }

 function moveFishObstacle(){
   fishObstacleArray.forEach(function(fishObstacle){
     fishObstacle.move()
   })
 }

 function drawFishObstacle(){
   fishObstacleArray.forEach(function(fishObstacle){
     display(fishObstacle)
   })
 }

 function checkForCollision(){
   fishObstacleArray.forEach(function(fishObstacle){
     fishObstacle.collisionDetection()
   })
 }
 setInterval(spawnFishObstacle, 1000)

// # Main GameRunning Function
function runCanvas () {
  display(myGameArea)

  playerFishOne.control()
  playerFishTwo.control()
  drawPlayerFish()

  drawFishObstacle()
  moveFishObstacle()
  checkForCollision()

  requestAnimationFrame(runCanvas)
}
//context.clearRect(0, 0, canvas.width, canvas.height)
requestAnimationFrame(runCanvas)



})// end of document.ready































//
// $(document).ready(function () {
//
// //declare game variables
//   var myFish
//   var mouseX = 0
//   var mouseY = 0
//   var fishArray = []
//   var fishArrayTemplate = []
//   var score = $('#score')
//   var counter = 0
//   var gameSpeed = 60
//   var images = []
//   var canvas = document.querySelector('canvas')
//   var context = canvas.getContext('2d')
//   var imageCheck = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//   var myFishSize = canvas.width/23
//   var fish1
//   var fish1a
//   var fish2
//   var fish2a
//   var fish3
//   var fish3a
//   var fish4
//   var fish4a
//   var fish5
//   var fish5a
//   var fish6
//   var fish6a
//   var fish7
//   var fish7a
//   var fish8
//   var fish8a
//   var resultFromRandomFunction
//
//   //declare sound variables
//   var biteSound = document.querySelector('.biteSound')
//   var fishtankBubbles = document.querySelector('.fishtankBubbles')
//   fishtankBubbles.volume = 0.1
//   var loseSound = document.querySelector('.loseSound')
//   var winSound = document.querySelector('.winSound')
//
// // functions to create and load images
//   function createNewImage (number) {
//     switch (number) {
//       case 1:
//         var img1 = new Image()
//         img1.addEventListener('load', function () {
//           imageCheck[0] = 1
//         })
//         img1.src = 'assets/images/fish1.png'
//         return img1
//         break
//       case 2:
//         var img2 = new Image()
//         img2.addEventListener('load', function () {
//           imageCheck[1] = 1
//         })
//         img2.src = 'assets/images/fish2.png'
//         return img2
//         break
//       case 3:
//         var img3 = new Image()
//         img3.addEventListener('load', function () {
//           imageCheck[2] = 1
//         })
//         img3.src = 'assets/images/fish3.png'
//         return img3
//         break
//       case 4:
//         var img4 = new Image()
//         img4.addEventListener('load', function () {
//           imageCheck[3] = 1
//         })
//         img4.src = 'assets/images/fish4.png'
//         return img4
//         break
//       case 5:
//         var img5 = new Image()
//         img5.addEventListener('load', function () {
//           imageCheck[4] = 1
//         })
//         img5.src = 'assets/images/fish5.png'
//         return img5
//         break
//       case 6:
//         var img6 = new Image()
//         img6.addEventListener('load', function () {
//           imageCheck[5] = 1
//         })
//         img6.src = 'assets/images/fish6.png'
//         return img6
//         break
//       case 7:
//         var img7 = new Image()
//         img7.addEventListener('load', function () {
//           imageCheck[6] = 1
//         })
//         img7.src = 'assets/images/fish7.png'
//         return img7
//         break
//       case 8:
//         var img8 = new Image()
//         img8.addEventListener('load', function () {
//           imageCheck[7] = 1
//         })
//         img8.src = 'assets/images/fish8.png'
//         return img8
//         break
//       default:
//         return
//     }
//   }
//
//   function createNewImageMirror(number){
//     switch (number) {
//     case 1:
//         var img9 = new Image()
//         img9.addEventListener('load', function () {
//           imageCheck[8] = 1
//         })
//         img9.src = 'assets/images/fish1a.png'
//         return img9
//         break
//     case 2:
//           var img10 = new Image()
//           img10.addEventListener('load', function () {
//             imageCheck[9] = 1
//           })
//           img10.src = 'assets/images/fish2a.png'
//           return img10
//           break
//      case 3:
//           var img11 = new Image()
//           img11.addEventListener('load', function () {
//             imageCheck[10] = 1
//           })
//           img11.src = 'assets/images/fish3a.png'
//           return img11
//           break
//      case 4:
//           var img12 = new Image()
//           img12.addEventListener('load', function () {
//             imageCheck[11] = 1
//           })
//           img12.src = 'assets/images/fish4a.png'
//           return img12
//           break
//      case 5:
//           var img13 = new Image()
//           img13.addEventListener('load', function () {
//             imageCheck[12] = 1
//           })
//           img13.src = 'assets/images/fish5a.png'
//           return img13
//           break
//      case 6:
//           var img14 = new Image()
//           img14.addEventListener('load', function () {
//             imageCheck[13] = 1
//           })
//           img14.src = 'assets/images/fish6a.png'
//           return img14
//           break
//      case 7:
//           var img15 = new Image()
//           img15.addEventListener('load', function () {
//             imageCheck[14] = 1
//           })
//           img15.src = 'assets/images/fish7a.png'
//           return img15
//           break
//      case 8:
//           var img16 = new Image()
//           img16.addEventListener('load', function () {
//             imageCheck[15] = 1
//           })
//           img16.src = 'assets/images/fish8a.png'
//           return img16
//           break
//           default:
//             return
//           }
//   }
// // myGameArea object
//   var myGameArea = {
//     // canvas: $('#canvas'),
//     canvas: canvas,
//     context: canvas.getContext('2d'),
//     // start: function () {
//     //   this.canvas.css('background-image', 'url("assets/images/aquarium3.png")')
//     //   this.interval = setInterval(updateGameArea, gameSpeed)
//     //   this.canvas.on('mousemove', setMousePosition)
//     // },
//     // clear: function () {
//     //   this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height())
//     // }
//
//     start: function () {
//       this.canvas.style.backgroundImage =  "url('assets/images/aquarium3.png')"
//       this.interval = setInterval(updateGameArea, gameSpeed)
//       this.canvas.addEventListener('mousemove', setMousePosition)
//     },
//
//     clear: function () {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
//     }
//   }// end of myGameArea object
//
// // MyFish constructor
//   function MyFish (image, width, height) {
//     this.image = image
//     this.width = width
//     this.height = height
//     this.context = myGameArea.context
//     this.display = function () {
//       var imageCheckVar = imageCheck.every(function (element) {
//         return element === 1
//       })
//       if (imageCheckVar) {
//         this.context.drawImage(this.image, mouseX - this.width / 2, mouseY - this.height / 2, this.width, this.height)
//       }
//     }
//     this.remove = function () {
//       this.width = 0
//     }
//   }
//
// // OtherFish constructor
//   function OtherFish (x, y, width, xspeed, yspeed, image) {
//     this.x = x
//     this.y = y
//     this.xspeed = xspeed
//     this.yspeed = yspeed
//     this.width = width
//     this.image = image
//     this.context = myGameArea.context
//
//     this.display = function () {
//       var imageCheckVar = imageCheck.every(function (element) {
//         return element === 1
//       })
//       if (imageCheckVar) {
//         this.context.drawImage(this.image, this.x, this.y, this.width, this.width)
//       }
//     }
//     this.move = function () {
//       this.x = this.x + this.xspeed
//       this.y = this.y + this.yspeed
//     }
//     this.wrap = function () {
//       if (this.x > canvasElement.width) {
//         this.x = 0 - this.width
//       }
//
//       if (this.x + this.width < 0) {
//         this.x = canvasElement.width
//       }
//     }
//     this.stop = function () {
//       this.xspeed = 0
//       this.yspeed = 0
//     }
//   }
//
//   function populateFishTank () {
//     fish1 = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/30, randomIntFromInterval(-1, 1), 0, createNewImage(1))
//     fish2 = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/20, randomIntFromInterval(-1, 1), 0, createNewImage(2))
//     fish3 = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/15, randomIntFromInterval(-1, 1), 0, createNewImage(3))
//     fish4 = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/11.5, randomIntFromInterval(-1, 1), 0, createNewImage(4))
//     fish5 = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/9.5, randomIntFromInterval(-1, 1), 0, createNewImage(5))
//     fish6 = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/8.2, randomIntFromInterval(-1, 1), 0, createNewImage(6))
//     fish7 = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/6.7, randomIntFromInterval(-1, 1), 0, createNewImage(7))
//     fish8 = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/3.8, randomIntFromInterval(-1, 1), 0, createNewImage(8))
//     fish1a = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/30, randomIntFromInterval(-1, 1), 0, createNewImage(9))
//     fish2a = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/20, randomIntFromInterval(-1, 1), 0, createNewImage(10))
//     fish3a = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/15, randomIntFromInterval(-1, 1), 0, createNewImage(11))
//     fish4a = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/11.5, randomIntFromInterval(-1, 1), 0, createNewImage(12))
//     fish5a = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/9.5, randomIntFromInterval(-1, 1), 0, createNewImage(13))
//     fish6a = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/8.2, randomIntFromInterval(-1, 1), 0, createNewImage(14))
//     fish7a = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/6.7, randomIntFromInterval(-1, 1), 0, createNewImage(15))
//     fish8a = new OtherFish(0, Math.floor(Math.random() * canvas.height-100), canvas.width/3.8, randomIntFromInterval(-1, 1), 0, createNewImage(16))
//
//     fishArrayTemplate.push(fish1, fish2, fish3, fish4, fish5, fish6, fish7, fish8)
//
//
//
//     resultFromRandomFunction = randomIntFromInterval(-1, 1)
//     if(resultFromRandomFunction === -1){
//       //console.log('left')
//       fishArray.push(new OtherFish(-1, Math.floor(Math.random() * 450), Math.floor(Math.random() * canvas.width/11), resultFromRandomFunction * (Math.floor(Math.random() * 4) + 1), 0, createNewImageMirror(Math.floor(Math.random() * 7) + 1)))
//     } else if(resultFromRandomFunction === 1 ) {
//       //console.log('right')
//       fishArray.push(new OtherFish(-1, Math.floor(Math.random() * 450), Math.floor(Math.random() * 100), resultFromRandomFunction * (Math.floor(Math.random() * 4) + 1), 0, createNewImage(Math.floor(Math.random() * 7) + 1)))
//     }
//   }
//
// // check if myfish overlaps with any fish in the fishArray
//   function anyOverlap () {
//     var index
//     var fishWidth
//     fishArray.forEach(function (eachFishInArray) {
//       myFishLeft = mouseX-myFish.width/2
//       myFishRight = myFishLeft + myFish.width
//       myFishTop = mouseY - myFish.width/2
//       myFishBottom = myFishTop + myFish.width
//
//       eachFishInArrayWidth1 = eachFishInArray.width / 10
//
//
//       eachFishInArrayLeft = eachFishInArray.x + eachFishInArrayWidth1 * 3
//       eachFishInArrayRight = eachFishInArray.x + eachFishInArray.width - eachFishInArrayWidth1 * 3
//
//       eachFishInArrayTop = eachFishInArray.y + eachFishInArrayWidth1 * 3
//       eachFishInArrayBottom = eachFishInArray.y + eachFishInArray.width - eachFishInArrayWidth1 * 3
//
//
//
//       overlap = !(myFishRight < eachFishInArrayLeft ||
//                    myFishLeft > eachFishInArrayRight ||
//                    myFishBottom < eachFishInArrayTop ||
//                    myFishTop > eachFishInArrayBottom)
//        // if any expression in paranthesis are true, there is no overlap
//        // if all are false, there is overlap
//
//       if (overlap) {
//         //  console.log('fish obstacle width is ' + eachFishInArray.width)
//         index = fishArray.indexOf(eachFishInArray)
//         fishWidth = fishArray[index].width
//         // console.log('my fish width is ' + myFish.width + ' ' + 'fish obstacle width is ' + fishWidth)
//
//       }
//     })
//     return {
//       index: index,
//       fishWidth: fishWidth
//     }
//   }
//
// // function to splice overlapped fish, and replace spliced fish with a new fish
//   function spliceAddIncreaseScore (indexOfOverlap) {
//     fishArray.splice(indexOfOverlap, 1)
//     fishArray.push(fishArrayTemplate[Math.floor(Math.random() * 8)])
//     counter += 1
//   }
//
// // change myfish size based on counter
//   function changeFishSize () {
//     if (counter === 80) {
//       youWon()
//     } else if (counter > 65) {
//       myFish.image = fishArrayTemplate[7].image
//       myFish.width = fishArrayTemplate[7].width
//       myFish.height = fishArrayTemplate[7].width
//     } else if (counter > 55) {
//       myFish.image = fishArrayTemplate[6].image
//       myFish.width = fishArrayTemplate[6].width
//       myFish.height = fishArrayTemplate[6].width
//     } else if (counter > 45) {
//       myFish.image = fishArrayTemplate[5].image
//       myFish.width = fishArrayTemplate[5].width
//       myFish.height = fishArrayTemplate[5].width
//     } else if (counter > 35) {
//       myFish.image = fishArrayTemplate[4].image
//       myFish.width = fishArrayTemplate[4].width
//       myFish.height = fishArrayTemplate[4].width
//     } else if (counter > 25) {
//       myFish.image = fishArrayTemplate[3].image
//       myFish.width = fishArrayTemplate[3].width
//       myFish.height = fishArrayTemplate[3].width
//     } else if (counter > 15) {
//       myFish.image = fishArrayTemplate[2].image
//       myFish.width = fishArrayTemplate[2].width
//       myFish.height = fishArrayTemplate[2].width
//     } else if (counter > 5) {
//       myFish.image = fishArrayTemplate[1].image
//       myFish.width = fishArrayTemplate[1].width
//       myFish.height = fishArrayTemplate[1].width
//     }
//   }
//
// // stop fish, display alert box, and reload page
//   function gameOver () {
//     myFish.width = 0
//     myFish.height = 0
//     fishArray.forEach(function (eachFish) {
//       eachFish.stop()
//     })
//
//     clearInterval(setIntervalReturn)
//     clearInterval(myGameArea.interval)
//     loseSound.play()
//
//     overlap = false
//
//     swal(
//       {
//         title: 'oops you got eaten :(',
//         confirmButtonText: 'play again?',
//       }, function () {
//       //window.location.reload(true);
//       startGame()
//
//     }
//   )
//  }
//
// //stop fish, display alert box, and reload page
//   function youWon () {
//     // fishArray = []
//     myFish.width += 5
//     myFish.width += 5
//     winSound.play()
//     fishArray.forEach(function (eachFish) {
//       eachFish.stop()
//     })
//
//     clearInterval(setIntervalReturn)
//     clearInterval(myGameArea.interval)
//     swal(
//       {
//         title: 'YOU WON!',
//         confirmButtonText: 'play again?',
//       }, function () {
//       window.location.reload(true);
//
//     }
//   )
//   }
//
//   function updateGameArea () {
//     myGameArea.clear()
//     myFish.display()
//     fishArray.forEach(function (eachFish) {
//
//       eachFish.display()
//       eachFish.move()
//       eachFish.wrap()
//     })
//
//     var indexAndWidthOfOverlap = anyOverlap()
//     // console.log('obstacle at end, width:', indexAndWidthOfOverlap.fishWidth);
//     // console.log('my fish at end', myFish.width);
//
//     if (indexAndWidthOfOverlap.fishWidth <= myFish.width) {
//       biteSound.play()
//       setTimeout(function(){
//         biteSound.pause()
//         biteSound.currentTime = 0
//       }, 300)
//       spliceAddIncreaseScore(indexAndWidthOfOverlap.index)
//       changeFishSize()
//     } else if (indexAndWidthOfOverlap.fishWidth >= myFish.width) {
//       gameOver()
//     }
//     score.text('Score: ' + counter)
//
//   }
//
//   // start game function
//   function startGame () {
//     mouseX = 0
//     mouseY = 0
//     myFishSize = 50
//     fishArray = []
//     fishArrayTemplate = []
//     score = $('#score')
//     counter = 0
//     gameSpeed = 20
//     images = []
//     canvas = document.querySelector('canvas')
//     context = canvas.getContext('2d')
//     imageCheck = [0, 0, 0, 0, 0, 0, 0, 0]
//     myGameArea.clear()
//     myGameArea.start()
//     populateFishTank()
//     myFish = new MyFish(createNewImage(1), myFishSize, myFishSize)
//     setIntervalReturn = setInterval(populateFishTank, 500)
//   }
//
//
//   //load instructions and start game
//     swal(
//       {
//         title: "how to play?",
//         text: "move the mouse around to eat smaller fishes.  avoid the bigger ones, they'll eat you up!",
//         confirmButtonText: 'start game',
//       }, function () {
//       startGame()
//
//     }
//    )
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // //////////////////////////////Helper functions////////////////////////////////////
//   var canvasElement = document.querySelector('canvas')
//   var canvasPos = getPosition(canvasElement)
//
//
//   function setMousePosition (e) {
//     mouseX = e.clientX - canvasPos.x
//     mouseY = e.clientY - canvasPos.y
//     console.log(mouseX, mouseY)
//
//     return {
//       mouseX: mouseX,
//       mouseY: mouseY
//     }
//   }
//
// // getPosition figures out where the canvas element is on the page
//   function getPosition (e2) {
//     var xPos = 0
//     var yPos = 0
//
//     while (e2) {
//       xPos += (e2.offsetLeft - e2.scrollLeft + e2.clientLeft)
//       yPos += (e2.offsetTop - e2.scrollTop + e2.clientTop)
//       e2 = e2.offsetParent
//     }
//
//     return {
//       x: xPos,
//       y: yPos
//     }
//   }
//
//
//   function randomIntFromInterval (min, max) {
//     // console.log(Math.floor(Math.random() * (max - min + 1) + min))
//     var randomInt = Math.floor(Math.random() * (max - min + 1) + min)
//     if (randomInt === 1) {
//       return 1
//     } else if (randomInt === -1) {
//       return -1
//     } else if (randomInt === 0) {
//       return 2
//     }
//   }
//
//
//   // Returns a random integer between min (included) and max (included)
//   function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
//
//
//
// ///////////////////////////////Unused functions for future development///////////////
// $(window).on("resize", function(event){
//   function getXY(canvas, event){
//
//       var rect = canvas.getBoundingClientRect(), /// get absolute rect. of canvas
//           x = event.clientX - rect.left,         /// adjust for x
//           y = event.clientY - rect.top;          /// adjust for y
//
//         mouseX = x
//         mouseY = y
//   }
// })
//
//   function checkKeyPress (e) {
//     switch (e.keyCode) {
//       case 37:
//         console.log(myFish.x)
//
//         break
//       case 38: console.log('up keyp pressed')
//         break
//       case 39:
//         console.log('right keyp pressed')
//         break
//       case 40:
//         console.log('down keyp pressed')
//         break
//
//     }
//   }
// }) // end of document.ready
