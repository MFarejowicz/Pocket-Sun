function Lion() {
  this.x = random(width)
  this.y = random(height)
  this.radius = 15
  this.speed = 2
  this.dirX = random([-1,0,1])
  this.dirY = random([-1,0,1])

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
    if (this.distance(sun) < 100) {
      if (this.x < sun.x) {
        this.x -= this.speed/sqrt(2)
      } else {
        this.x += this.speed/sqrt(2)
      }
      if (this.y < sun.y) {
        this.y -= this.speed/sqrt(2)
      } else {
        this.y += this.speed/sqrt(2)
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
