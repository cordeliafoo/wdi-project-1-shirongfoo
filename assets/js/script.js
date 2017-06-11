$(document).ready(function () {
  // # Game Canvas and Environment variables
  var canvas = $('#canvas')[0]
  var context = canvas.getContext('2d')
  canvas.width = window.innerWidth * 0.95
  canvas.height = window.innerHeight * 0.85
  var winner = []
  var loser = []

  // sound variables
  var biteSound = document.querySelector('.biteSound')
  var fishtankBubbles = document.querySelector('.fishtankBubbles')
  fishtankBubbles.volume = 0.1
  var loseSound = document.querySelector('.loseSound')
  var winSound = document.querySelector('.winSound')
  var aquariumMusic = document.querySelector('.aquariumMusic')

  var myGameArea = {
    width: canvas.width,
    height: canvas.height,
    posX: 0,
    posY: 0,
    image: 'background/aquarium3.png'
  }

  // # Game Status variables
  var pause = false
  var gameOver = false

  // # Fish Obstacle Variables
  var fishObstacleArray = []
  // var fishObstacleSpawnDuration = 20
  // var fishObstacleRemovalDuration = 5

  // # Player Selection variables
  var playerOneControl = 1
  var playerTwoControl = 2
  var startingPlayerCount = 1
  var playerFishArray = []

  // # Create playerFishOne and playerFishTwo
     // (posX, posY, width, height, faceRight, imageFolder, imageFormat, velocity, playerControl)
  var playerFishOne = new PlayerFish(canvas.width / 4 * 3, canvas.height / 2, 30, 30, false, 'fish1', '.png', 5, playerOneControl)
  var playerFishTwo = new PlayerFish(canvas.width / 4, canvas.height / 2, 30, 30, true, 'fish1', '.png', 5, playerTwoControl)
  playerFishArray.push(playerFishOne, playerFishTwo)

  // # Draw Image and Text on on Canvas functions
  function display (item) {
    var image = new Image()
    image.src = 'assets/images/' + item.image
    image.addEventListener('load', function () {
      context.drawImage(image, item.posX, item.posY, item.width, item.height)
    })
  }

  function displayPlayerScore () {
    context.font = '28px Bubbler One'
    context.fillStyle = '#000000'
    context.fillText('Player 1:  ' + playerFishOne.score, (0.03 * canvas.width), (0.07 * canvas.height))
    context.fillText('Player 2:  ' + playerFishTwo.score, (0.85 * canvas.width), (0.07 * canvas.height))
  }

 // # PlayerFish functions
  function drawPlayerFish () {
    playerFishArray.forEach(function (playerFish) {
      display(playerFish)
    })
  }

  // # Fish Obstacle Sizes
  var fishObstacleSizeArray = [10, 20, 30, 60, 70, 80, 90]

 // # Fish Obstacles' functions
  function spawnFishObstacle () {
   // (posX, posY, width, height, imageFolder, imageFormat, velocity, faceRight, fishObstacleRemovalDuration)
    for (var i = 0; i < 1; i++) {
      fishObstacleArray.push(new FishObstacle(0, 0, fishObstacleSizeArray[0], fishObstacleSizeArray[0], 'fish', '.png', 1, 20))
      fishObstacleArray.push(new FishObstacle(0, 0, fishObstacleSizeArray[1], fishObstacleSizeArray[1], 'fish', '.png', 1, 20))
      fishObstacleArray.push(new FishObstacle(0, 0, fishObstacleSizeArray[2], fishObstacleSizeArray[2], 'fish', '.png', 1, 20))
      fishObstacleArray.push(new FishObstacle(0, 0, fishObstacleSizeArray[3], fishObstacleSizeArray[3], 'fish', '.png', 1, 20))
      fishObstacleArray.push(new FishObstacle(0, 0, fishObstacleSizeArray[4], fishObstacleSizeArray[4], 'fish', '.png', 1, 20))
      fishObstacleArray.push(new FishObstacle(0, 0, fishObstacleSizeArray[5], fishObstacleSizeArray[5], 'fish', '.png', 1, 20))
      fishObstacleArray.push(new FishObstacle(0, 0, fishObstacleSizeArray[6], fishObstacleSizeArray[6], 'fish', '.png', 1, 20))

      // fishObstacleArray.push(fishObstacle)
    }
  }

  function removeFishObstacle () {
    fishObstacleArray.forEach(function (fishObstacle) {
      if (fishObstacle.posX > canvas.width || fishObstacle.posX < 0) {
        fishObstacleArray.splice(fishObstacleArray.indexOf(fishObstacle), 1)
      }
    })
    // fishObstacleArray.splice(fishObstacleArray[0], 5)
  }

  function moveFishObstacle () {
    fishObstacleArray.forEach(function (fishObstacle) {
      fishObstacle.move()
    })
  }

  function drawFishObstacle () {
    fishObstacleArray.forEach(function (fishObstacle) {
      display(fishObstacle)
    })
  }

  function checkForCollision () {
    fishObstacleArray.forEach(function (fishObstacle) {
      fishObstacle.collisionDetection(playerFishArray)
    })
  }

  function checkPlayerOrObstacleDies () {
    fishObstacleArray.forEach(function (fishObstacle) {
      if (fishObstacle.alive === false) {
        biteSound.play()
        setTimeout(function () {
          biteSound.pause()
          biteSound.currentTime = 0
        }, 300)
        fishObstacleArray.splice(fishObstacleArray.indexOf(fishObstacle), 1)
      } else if (fishObstacle.killedPlayerFish === true) {
        gameOver = true
      }
    })
  }

  function checkWhichPlayerDied () {
    if (gameOver) {
      loseSound.play()
      winner = playerFishArray.filter(function (playerFish) {
        return playerFish.alive != true
      })
      loser = playerFishArray.filter(function (playerFish) {
        return playerFish.alive == true
      })
      pause = true
      swal(
        {
          title: 'oops sorry Player ' + loser[0].playerControl + '.   you got eaten.',
          text: 'Player ' + winner[0].playerControl + ' won!',
          confirmButtonText: 'play again?'
        }, function () {
        window.location.reload(true)
      }
      )
    }
  }

  // # Pause Function
  function pauseToggle () {
    if (!gameOver) {
      if (pause) {
        $(document).on('keydown', function (e) {
          if (e.keyCode === 32) {
            console.log('trying to pause')
            pause = false
          }
        })
      } else {
        $(document).on('keydown', function (e) {
          if (e.keyCode === 32) {
            pause = true
          }
        })
      }
    }
  }

  function pauseCanvas () {
    // context.clearRect(0, 0, canvas.width, canvas.height)
    pauseToggle()
    display(myGameArea)
    drawPlayerFish()
    drawFishObstacle()
    displayPlayerScore()
    aquariumMusic.pause()
    fishtankBubbles.pause()
    if (pause) {
      requestAnimationFrame(pauseCanvas)
    } else {
      requestAnimationFrame(runCanvas)
    }
  }

  setInterval(spawnFishObstacle, 5000)
  setInterval(removeFishObstacle, 1000)

// # Pre-game swal
  swal(
    {
      // title: 'how to play?',
      // text: 'Player 1 uses W-A-S-D.  Player 2 uses Up-Down-Left-Right arrows. Eat smaller fish, and avoid bigger ones.',
      // confirmButtonText: 'let the battle begin!'
      title: 'how to play fat fishy?',
      // type: 'info',
      html: true,
      text:
            'Player 1 uses <b>W-A-S-D</b>, ' +
            '</br> ' +
            'Player 2 uses <b>Up Down Left Right</b>, ' +
            '</br> ' +
            '</br> ' +
            'Move around and eat smaller fish to grow. ' +
            '</br> ' +
            'Take care to avoid the bigger fishys!',
      confirmButtonText: 'let the battle begin!'

    }, // # Main GameRunning Function
    function runCanvas () {
      display(myGameArea)

      playerFishOne.control()
      playerFishTwo.control()
      playerFishOne.increaseSize()
      playerFishTwo.increaseSize()
      drawPlayerFish()

      drawFishObstacle()
      moveFishObstacle()
      checkForCollision()
      checkPlayerOrObstacleDies()
      displayPlayerScore()

      pauseToggle()
      checkWhichPlayerDied()

      if (pause) {
        requestAnimationFrame(pauseCanvas)
      } else {
        requestAnimationFrame(runCanvas)
      }

      // requestAnimationFrame(runCanvas)
    }

)

  requestAnimationFrame(runCanvas)
})// end of document.ready
