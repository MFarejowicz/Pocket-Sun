function Sun() {
  this.health = 100
  this.healthCap = 100
  this.x = width / 2
  this.y = height / 2
  this.radius = 25
  this.speed = 5
  this.drain = .25 //decrease to slow drain
  this.healRate = 5
  this.totalKills = 0
  this.kills = 500
  this.bullets = []
  this.fireDelay = 0
  this.fireRate = .2 //decrease to increase fire rate
  this.bulletSpeed = 10
  this.bulletSize = 5
  this.bulletHP = 1

  this.show = function() {
    for (let i = 0; i < this.bullets.length; i++){
      this.bullets[i].show()
    }
    fill(204, 102, 0)
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
    fill(255, 0 , 0)
    rect(30, 30, 2 * this.health, 40)
    textSize(25)
    text("Total kills: " + this.totalKills, 550, 40)
    text("Unspent kills: " + this.kills, 550, 70)
  }

  this.update = function() {
    for (let i = this.bullets.length-1; i >=0; i--){
      this.bullets[i].update()
      if (this.bullets[i].offscreen()){
        this.bullets.splice(i,1)
      }
    }
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
    this.fireDelay -=.01
  }

  this.upkills = function() {
    this.totalKills += 1
    this.kills += 1
  }

  this.heal = function() {
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
    this.x -= (this.speed/sqrt(2))
    this.y -= (this.speed/sqrt(2))
  }
  this.moveUpRight = function() {
    this.x += (this.speed/sqrt(2))
    this.y -= (this.speed/sqrt(2))
  }
  this.moveDownLeft = function() {
    this.x -= (this.speed/sqrt(2))
    this.y += (this.speed/sqrt(2))
  }
  this.moveDownRight = function() {
    this.x += (this.speed/sqrt(2))
    this.y += (this.speed/sqrt(2))
  }
  this.shootUp = function() {
    if (this.fireDelay <= 0) {
      this.bullets.push(new Bullet(this.x, this.y - this.radius, 0, -1, this.bulletSpeed, this.bulletSize, this.bulletHP))
      this.fireDelay = this.fireRate
    }
  }
  this.shootDown = function() {
    if (this.fireDelay <= 0) {
      this.bullets.push(new Bullet(this.x, this.y + this.radius, 0, 1, this.bulletSpeed, this.bulletSize, this.bulletHP))
      this.fireDelay = this.fireRate
    }
  }
  this.shootRight = function() {
    if (this.fireDelay <= 0) {
      this.bullets.push(new Bullet(this.x + this.radius, this.y, 1, 0, this.bulletSpeed, this.bulletSize, this.bulletHP))
      this.fireDelay = this.fireRate
    }
  }
  this.shootLeft = function() {
    if (this.fireDelay <= 0) {
      this.bullets.push(new Bullet(this.x - this.radius, this.y, -1, 0, this.bulletSpeed, this.bulletSize, this.bulletHP))
      this.fireDelay = this.fireRate
    }
  }
}

function Bullet(x, y, dirX, dirY, speed, size, hp) {
  this.x = x
  this.y = y
  this.dirX = dirX
  this.dirY = dirY
  this.speed = speed
  this.radius = size
  this.hp = hp

  this.show = function() {
    fill(204, 102, 0)
    ellipse(this.x,this.y, this.radius*2, this.radius*2)
  }

  this.offscreen = function() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > width){
      return true
    }
  }

  this.update = function() {
    this.x += this.dirX * this.speed
    this.y += this.dirY * this.speed
  }

}
