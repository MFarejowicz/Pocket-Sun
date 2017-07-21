function Sun() {
  this.health = 100
  this.healthCap = 100
  this.y = height / 2
  this.x = width / 2
  this.radius = 25
  this.speed = 5
  this.drain = .25 //decrease to slow drain
  this.healRate = 5
  this.totalKills = 0
  this.kills = 0

  this.show = function() {
    fill(204, 102, 0)
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
    fill(255, 0 , 0)
    rect(30, 30, 2 * this.health, 40)
    textSize(32)
    text(this.kills, 750, 60)
    text(this.totalKills, 750, 20)
  }

  this.update = function() {
    if (frameCount % 2 == 0){
      this.health -= this.drain
    }
    if (this.health <= 0) {
      this.health = 0
    }
    if (this.x <= 0) {
      this.x = 0
    }
    if (this.x >= width) {
      this.x = width
    }
    if (this.y <= 0) {
      this.y = 0
    }
    if (this.y >= height) {
      this.y = height
    }
  }

  this.heal = function() {
    this.totalKills += 1
    this.kills += 1
    if (this.health + this.healRate > this.healthCap){
      this.health = this.healthCap
    } else {
      this.health += this.healRate
    }
  }

  this.moveUp = function() {
    this.y -= this.speed
  }
  this.moveDown = function() {
    this.y += this.speed
  }
  this.moveRight = function() {
    this.x += this.speed
  }
  this.moveLeft = function() {
    this.x -= this.speed
  }
  this.moveUpLeft = function() {
    this.x -= this.speed/sqrt(2)
    this.y -= this.speed/sqrt(2)
  }
  this.moveUpRight = function() {
    this.x += this.speed/sqrt(2)
    this.y -= this.speed/sqrt(2)
  }
  this.moveDownLeft = function() {
    this.x -= this.speed/sqrt(2)
    this.y += this.speed/sqrt(2)
  }
  this.moveDownRight = function() {
    this.x += this.speed/sqrt(2)
    this.y += this.speed/sqrt(2)
  }
}
