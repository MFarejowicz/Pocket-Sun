function Lion() {
  this.x = random(width)
  this.y = random(height)
  this.radius = 15
  this.speed = 2
  this.dirX = random([-1, 0, 1])
  this.dirY = (this.dirX == 0 ? random([-1,1]) : random([-1,0,1]))
  this.runDistance = 100
  this.runScale = .8

  this.show = function() {
    fill(255)
    ellipse(this.x, this.y, this.radius, this.radius)
  }

  this.hits = function(sun) {
    if (this.x < sun.x + sun.radius && this.x > sun.x - sun.radius){
      if (this.y < sun.y + sun.radius && this.y > sun.y - sun.radius){
        return true
      }
    }
  }

  this.update = function(sun) {
    if (this.x < 0 || this.x > width){
      this.dirX = -this.dirX
    }
    if (this.y < 0 || this.y > height) {
      this.dirY = -this.dirY
    }
    if (this.distance(sun) < this.runDistance) {
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
