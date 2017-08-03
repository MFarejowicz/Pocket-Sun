function Lion(size, speed, runScale, alpha) {
  this.x = random(width)
  this.y = random(height)
  this.radius = size
  this.speed = speed
  this.alpha = alpha
  this.dirX = random([-1, 0, 1])
  this.dirY = (this.dirX == 0 ? random([-1,1]) : random([-1,0,1]))
  this.runDistance = 100
  this.runScale = runScale

  this.show = function() {
    fill(255, 255, 255, this.alpha)
    ellipse(this.x, this.y, this.radius * 2)
  }

  this.hits = function(sun) {
    if (this.distance(sun) < sun.radius) {
      return true
    }
    // for (let i = sun.bullets.length-1; i >= 0; i--){
    //   if (this.distance(sun.bullets[i]) < sun.bullets[i].radius) {
    //     sun.bullets[i].hp -= 1
    //     if (sun.bullets[i].hp <= 0){
    //       sun.bullets.splice(i,1)
    //     }
    //     return {hit: true, heal: false}
    //   }
    // }
    // return {hit: false, heal: false}
  }

  this.update = function(sun) {
    if (this.x < 0){
      this.x = width
      this.dirX = -1
    }
    if (this.x > width) {
      this.x = 0
      this.dirX = 1
    }
    if (this.y < 0) {
      this.y = height
      this.dirY = -1
    }
    if (this.y > height) {
      this.y = 0
      this.dirY = 1
    }
    if (this.distance(sun) < this.runDistance + sun.radius) {
      if (this.x < sun.x - (sun.radius / sqrt(2))) {
        this.dirX = -1
      } else if (this.x > sun.x + (sun.radius / sqrt(2))){
        this.dirX = 1
      } else {
        this.dirX = 0
      }
      if (this.y < sun.y - (sun.radius / sqrt(2))) {
        this.dirY = -1
      } else if (this.y > sun.y + (sun.radius / sqrt(2))){
        this.dirY = 1
      } else {
        this.dirY = 0
      }
      if (this.dirX == 0 || this.dirY == 0){
        this.x += this.dirX * this.speed / this.runScale
        this.y += this.dirY * this.speed / this.runScale
      } else {
        this.x += this.dirX * this.speed / this.runScale / sqrt(2)
        this.y += this.dirY * this.speed / this.runScale / sqrt(2)
      }
    } else {
      if (this.dirX == 0 || this.dirY == 0){
        this.x += this.dirX * this.speed
        this.y += this.dirY * this.speed
      } else {
        this.x += this.dirX * this.speed / sqrt(2)
        this.y += this.dirY * this.speed / sqrt(2)
      }
    }
  }

  this.distance = function(sun) {
    let distance = sqrt(pow(this.x - sun.x, 2) + pow(sun.y - this.y, 2))
    return distance
  }
}
