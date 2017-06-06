// # fishObstacle Constructor and Prototype
function FishObstacle (posX, posY, width, height, imageFolder, imageFormat, velocity, fishObstacleRemovalDuration) {
  this.posX = 0
  this.posY = this.randomY()
  this.width = width
  this.height = height
  this.imageFolder = imageFolder
  this.imageFormat = imageFormat
  this.randomImageFolder = this.randomImageFolder()
  this.orientation = 1
  this.image = this.imageFolder + this.randomImageFolder + '/' + this.orientation + this.imageFormat
  this.velocity = this.randomVelocity()
  this.collided = false
  this.alive = true
  this.fishObstacleRemovalDuration = fishObstacleRemovalDuration
  this.faceRight = this.randomFaceRightDirection()
  this.killedPlayerFish = false
}

FishObstacle.prototype.randomImageFolder = function () {
   // return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(Math.random() * (8 - 1 + 1)) + 1
}

FishObstacle.prototype.randomVelocity = function () {
   // return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(Math.random() * (5 - 1 + 1)) + 1
}

FishObstacle.prototype.randomFaceRightDirection = function () {
    // return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(Math.random() * (1 - 0 + 1)) + 0
}

FishObstacle.prototype.randomY = function () {
  return Math.round(Math.random() * canvas.height)
}

FishObstacle.prototype.randomX = function () {
  return Math.round(Math.random() * canvas.width)
}

FishObstacle.prototype.move = function () {
  if (this.faceRight == 1 && this.posX < canvas.width) {
    this.posX += this.velocity
    this.faceRight = true
  } else if (this.faceRight == 1 && this.posX > canvas.width) {
    this.posX = 0 - this.width
    this.posX += this.velocity
    this.faceRight = true
  } else if (this.faceRight == 0 && this.posX + this.width > 0) {
    this.posX -= this.velocity
    this.faceRight = false
  } else if (this.faceRight == 0 && this.posX < 0) {
    this.posX = canvas.width
    this.posX -= this.velocity
    this.faceRight = false
  }

  this.faceOrientation()
}

FishObstacle.prototype.faceOrientation = function () {
  if (this.faceRight) {
    this.orientation = 0
  } else if (!this.faceRight) {
    this.orientation = 1
  }
  this.image = this.imageFolder + this.randomImageFolder + '/' + this.orientation + this.imageFormat
}

FishObstacle.prototype.collisionDetection = function (playerFishArray) {
  playerFishArray.forEach(function (playerFish) {
    // console.log((this))
    if (!this.collided &&
      this.posX > playerFish.posX &&
      this.posX + this.width < playerFish.posX + playerFish.width &&
      this.posY > playerFish.posY &&
      this.posY + this.height < playerFish.posY + playerFish.height
      ) {
      this.collided = true
      this.alive = false
      playerFish.score += 1
      console.log(playerFish.score);
    } else if (
      this.posX < playerFish.posX &&
      playerFish.posX + playerFish.width < this.posX + this.width &&
      this.posY < playerFish.posY &&
      playerFish.posY + playerFish.height < this.posY + this.height
      ) {
      this.collided = true
      this.alive = true
      this.killedPlayerFish = true
      playerFish.alive = false
    }
  }.bind(this))
}
