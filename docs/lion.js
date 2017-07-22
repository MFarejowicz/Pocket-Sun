function Lion(runScale) {
  this.x = random(width)
  this.y = random(height)
  this.radius = 15
  this.speed = 2
  this.dirX = random([-1, 0, 1])
  this.dirY = (this.dirX == 0 ? random([-1,1]) : random([-1,0,1]))
  this.runDistance = 100
  this.runScale = runScale

  this.show = function() {
    fill(255)
    ellipse(this.x, this.y, this.radius, this.radius)
  }

  this.hits = function(sun) {
    if (this.distance(sun) < sun.radius) {
      return {hit: true, heal: true}
    }
    for (let i = sun.bullets.length-1; i >= 0; i--){
      if (this.distance(sun.bullets[i]) < sun.bullets[i].radius) {
        sun.bullets.splice(i,1)
        return {hit: true, heal: false}
      }
    }
    return {hit: false, heal: false}
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
      if (this.x < sun.x) {
        this.x -= this.speed/this.runScale
      } else {
        this.x += this.speed/this.runScale
      }
      if (this.y < sun.y) {
        this.y -= this.speed/this.runScale
      } else {
        this.y += this.speed/this.runScale
      }
    } else {
      this.x += this.dirX * this.speed
      this.y += this.dirY * this.speed
    }
  }

  this.distance = function(sun) {
    let distance = sqrt(pow(this.x - sun.x, 2) + pow(sun.y - this.y, 2))
    return distance
  }
}
