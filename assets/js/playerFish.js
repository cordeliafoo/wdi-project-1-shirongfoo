// # PlayerFish Constructor and Prototype
function PlayerFish (posX, posY, width, height, faceRight, imageFolder, imageFormat, velocity, playerControl) {
  this.posX = posX
  this.posY = posY
  this.width = width
  this.height = height
  this.orientation = 0 // orientation: 0 is right and 1 is left
  this.imageFolder = imageFolder
  this.imageFormat = imageFormat
  this.image = this.imageFolder + '/' + this.orientation + this.imageFormat

  this.faceRight = faceRight
  this.velocity = velocity

  this.playerControl = playerControl
  this.rightPressed = false
  this.leftPressed = false
  this.upPressed = false
  this.downPressed = false
  this.score = 0
  this.alive = true
}

// #Controls: left/right arrows: 1, WASD: 2
PlayerFish.prototype.control = function () {
  if (this.playerControl === 1) {
    $(document).on('keydown', function (e) {
      if (e.keyCode === 39) {
        this.rightPressed = true
      } else if (e.keyCode === 37) {
        this.leftPressed = true
      } else if (e.keyCode === 38) {
        this.upPressed = true
      } else if (e.keyCode === 40) {
        this.downPressed = true
      }
    }.bind(this))

    $(document).on('keyup', function (e) {
      e.preventDefault()
      if (e.keyCode === 39) {
        this.rightPressed = false
      } else if (e.keyCode === 37) {
        this.leftPressed = false
      } else if (e.keyCode === 38) {
        this.upPressed = false
      } else if (e.keyCode === 40) {
        this.downPressed = false
      }
    }.bind(this))
  } else if (this.playerControl === 2) {
    $(document).on('keydown', function (e) {
      if (e.keyCode === 68) {
        this.rightPressed = true
      } else if (e.keyCode === 65) {
        this.leftPressed = true
      } else if (e.keyCode === 87) {
        this.upPressed = true
      } else if (e.keyCode === 83) {
        this.downPressed = true
      }
    }.bind(this))

    $(document).on('keyup', function (e) {
      e.preventDefault()
      if (e.keyCode === 68) {
        this.rightPressed = false
      } else if (e.keyCode === 65) {
        this.leftPressed = false
      } else if (e.keyCode === 87) {
        this.upPressed = false
      } else if (e.keyCode === 83) {
        this.downPressed = false
      }
    }.bind(this))
  }
  this.move()
  this.faceOrientation()
}

PlayerFish.prototype.move = function () {
  if (this.rightPressed && this.posX < canvas.width - this.width) {
    this.posX += this.velocity
    this.faceRight = true
  } else if (this.leftPressed && this.posX > 0) {
    this.posX -= this.velocity
    this.faceRight = false
  } else if (this.upPressed && this.posY > 0) {
    this.posY -= this.velocity
  } else if (this.downPressed && this.posY < canvas.height - this.height) {
    this.posY += this.velocity
  }
}

PlayerFish.prototype.faceOrientation = function () {
  if (this.faceRight) {
    this.orientation = 0
  } else if (!this.faceRight) {
    this.orientation = 1
  }
  this.image = this.imageFolder + '/' + this.orientation + this.imageFormat
}

PlayerFish.prototype.increaseSize = function () {
  switch (this.score) {
    case 10:
      console.log('changing size to 40');
      this.width = 50
      this.height = 50
      break
    case 20:
      this.width = 70
      this.height = 70
      break
    case 40:
      this.width = 90
      this.height = 90
      break
    case 60:
      this.width = 110
      this.height = 110
      break
  }

}
